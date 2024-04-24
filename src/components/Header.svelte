<script>
    import Icon from "@iconify/svelte";
    import { page } from "$app/stores";
    import { language, dataLang } from '../store/store'
    import { data } from '$lib/data.js';
    import { browser } from "$app/environment";

    let idioma = 'es'

    $: $language = idioma
    $: $dataLang = data.find((item) => item.lang === $language).data;
    
    const handleLang = (lang) => {
        idioma = lang
    }

    if (browser) {
        idioma = window.localStorage.getItem("languageSite") || "es";
        handleLang(idioma)
    }

    $: if (browser) {
        window.localStorage.setItem("languageSite", $language);
    }
    
    $: liActive = $page.url.hash.substring(1) || 'about';

    export const handleLi = (listItem) => {
        liActive = listItem
    }

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
    
        <ul>
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
    </nav>
</header>

<style>
    header {
        width: 100%;
        padding: 10px 0;
        position: sticky;
        top: 0;
        z-index: 9999;
        background: var(--background-color);
        box-shadow: 0 4px 4px #0004;
    }
    
    nav {
        width: 100%;
        max-width: 1100px;
        margin: 0 auto;
        padding: 0 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    ul {
        display: flex;
        gap: 20px;
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
</style>