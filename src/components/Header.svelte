<script>
    import Icon from "@iconify/svelte";
    import { page } from "$app/stores";
    import { language, dataLang, themeColor } from '../store/store'
    import { data } from '$lib/data.js';
    import { browser } from "$app/environment";
    import { onMount } from 'svelte'

    let idioma = 'es'
    let themeColorStorage = 'dark'

    let openMenu = true

    $: $language = idioma
    $: $dataLang = data.find((item) => item.lang === $language).data;
    
    const handleLang = (lang) => {
        idioma = lang
    }
    
    const handleTheme = (e) => {
        e.target.checked ? $themeColor = 'light' : $themeColor = 'dark'
        
        let body = document.querySelector('body')

        body.setAttribute('class', $themeColor)
    }

    if (browser) {
        idioma = window.localStorage.getItem("languageSite") || "es";
        themeColorStorage = window.localStorage.getItem("themeSite") || "dark";
        handleLang(idioma)

        let body = document.querySelector('body')

        body.setAttribute('class', `${themeColorStorage}`)
    }

    $: if (browser) {
        window.localStorage.setItem("languageSite", $language);
        window.localStorage.setItem("themeSite", $themeColor);
    }
    
    $: liActive = $page.url.hash.substring(1) || 'about';

    export const handleLi = (listItem) => {
        liActive = listItem
    }
    
    // onMount(() => {
    //     let body = document.querySelector('body')
    //     body.addEventListener('click', (e) => closeMenu(e))
    // })
    
    // const closeMenu = (e) => {
    //     console.log(e)
    // }
</script>

<header>
    <nav>
        <div class="languages">
            <button on:click={ () => handleLang('en') } class={ idioma === 'en' ? 'active' : '' }>
                <Icon icon="twemoji:flag-united-states" />
            </button>
            <button on:click={ () => handleLang('es') } class={ idioma === 'es' ? 'active' : '' }>
                <Icon icon="twemoji:flag-argentina" />
            </button>
        </div>

        <label class="switch">
            <input type="checkbox" on:change={(e) => handleTheme(e)}>
            <span class="slider"></span>
        </label>
    
        <ul class={ openMenu ? 'active' : '' }>
            <li>
                <a on:click={ () => handleLi('about') } class={ liActive === 'about' ? 'active' : '' } href="#about">
                    {$dataLang.header[0]}
                </a>
            </li>
            <li>
                <a on:click={ () => handleLi('skills') } class={ liActive === 'skills' ? 'active' : '' } href="#skills">
                    {$dataLang.header[1]}
                </a>
            </li>
            <li>
                <a on:click={ () => handleLi('projects') } class={ liActive === 'projects' ? 'active' : '' } href="#projects">
                    {$dataLang.header[2]}
                </a>
            </li>
            <li>
                <a on:click={ () => handleLi('experience') } class={ liActive === 'experience' ? 'active' : '' } href="#experience">
                    {$dataLang.header[3]}
                </a>
            </li>
            <li>
                <a on:click={ () => handleLi('contact') } class={ liActive === 'contact' ? 'active' : '' } href="#contact">
                    {$dataLang.header[4]}
                </a>
            </li>
        </ul>

        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <!-- svelte-ignore a11y-no-static-element-interactions -->
        <div class="burger" on:click={ () => openMenu = !openMenu }>
            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...$$props}>
                <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 6h18M3 12h18M3 18h18" />
            </svg>
        </div>
    </nav>

</header>

<style>
    header {
        width: 100%;
        position: sticky;
        top: 0;
        z-index: 9999;
        background: var(--background-color);
        filter: drop-shadow(0 4px 4px #0004);
        /* overflow-y: hidden; */
    }
    
    nav {
        width: 100%;
        max-width: 1100px;
        margin: 0 auto;
        padding: 10px 20px;
        background: var(--background-color);
        display: flex;
        align-items: center;
        gap: 20px;
        position: relative;
    }

    .switch {
        --secondary-container: #d6d6d6;
        --primary: rgb(143, 143, 143);
        font-size: 12px;
        position: relative;
        display: inline-block;
        width: 3.7em;
        height: 1.8em;
        margin-right: auto;
    }

    .switch input {
        display: none;
        opacity: 0;
        width: 0;
        height: 0;
    }

    .slider {
        position: absolute;
        cursor: pointer;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #313033;
        transition: .2s;
        border-radius: 30px;
    }

    .slider:before {
        position: absolute;
        content: "";
        height: 1.4em;
        width: 1.4em;
        border-radius: 20px;
        left: 0.2em;
        bottom: 0.2em;
        background-color: #aeaaae;
        transition: .4s;
    }

    :global(body.light) input:checked + .slider::before {
        background-color: var(--primary);
    }

    :global(body.light) input:checked + .slider {
        background-color: var(--secondary-container);
    }

    input:focus + .slider {
        box-shadow: 0 0 1px var(--secondary-container);
    }

    input:checked + .slider:before {
        transform: translateX(1.9em);
    }

    .burger {
        font-size: 20px;
        cursor: pointer;
        display: block;
    }

    ul {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        background: var(--background-color);
        position: absolute;
        top: -650px;
        /* right: -100%; */
        transition: 0.4s;
        z-index: -1;
    }

    ul.active {
        top: 50px;
    }

    li {
        width: fit-content;
        height: 40px;
        display: flex;
        align-items: center;
        overflow: hidden;
    }

    a {
        position: relative;
    }
    
    a::before {
        content: '';
        width: 100%;
        height: 2px;
        position: absolute;
        bottom: -2px;
        left: -90%;
        background-color: rgba(var(--pry-color-rgb), 0.4);
        transition: 0.8s;
    }

    a:hover::before {
        left: 90%;
    }

    a.active::before {
        left: 0%;
        transition: 0.2;
        background-color: rgba(var(--pry-color-rgb), 1);
    }

    .languages {
        display: flex;
        gap: 10px;
    }

    button {
        padding: 0 4px;
        font-size: 30px;
        border: none;
        background-color: transparent;
        display: flex;
        align-items: center;
    }

    button.active {
        outline: 2px solid rgba(var(--pry-color-rgb), 0.4);
        border-radius: 8px;
    }

    @media (min-width: 700px) {
        .burger {
            display: none;
        }

        ul {
            width: fit-content;
            flex-direction: row;
            gap: 20px;
            position: initial;
            top: 50px;
            right: 0;
            z-index: 0;
        }
    }
</style>