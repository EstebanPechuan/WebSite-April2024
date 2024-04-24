<script>
    import { language, dataLang } from '../store/store'
    import { data } from '$lib/data.js';

    $: $dataLang = data.find((item) => item.lang === $language).data;
</script>

<section class="section_wrapper" id="about">
    <h3>{$dataLang.hero.h3}</h3>

    <h2>{$dataLang.hero.h2}</h2>
    
    <h1>{$dataLang.hero.h1}</h1>

    <div class="about_me">
        <p>{$dataLang.hero.paragraph[0]}</p>
        <p>{$dataLang.hero.paragraph[1]}</p>
        <p>{$dataLang.hero.paragraph[2]}</p>
        <p>{$dataLang.hero.paragraph[3]}</p>
    </div>

    <div class="going_down">
        <a href="#skills">
            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" fill-rule="evenodd" d="m6 7l6 6l6-6l2 2l-8 8l-8-8z"/></svg>

            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" fill-rule="evenodd" d="m6 7l6 6l6-6l2 2l-8 8l-8-8z"/></svg>
        </a>
    </div>

    <div class="buttons">
        <button>{$dataLang.hero.buttons[0]}</button>
        <a href="#contact">{$dataLang.hero.buttons[1]}</a>
    </div>
</section>

<style>
    .section_wrapper {
        min-height: calc(100vh - 60px);
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        position: relative;
    }

    h1, h2, h3 {
        line-height: 1;
        margin-top: -5px;
    }

    h2 {
        font-size: 60px;
    }

    h1 {
        letter-spacing: 12px;
        word-spacing: 2px;
    }

    .about_me {
        width: 90%;
        padding: 20px 0;
        display: flex;
        flex-direction: column;
        gap: 10px;
    }

    .going_down {
        width: 100%;
        position: absolute;
        bottom: 20px;
        display: flex;
        justify-content: center;
    }

    .going_down a {
        width: fit-content;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .going_down svg {
        font-size: 30px;
        margin-top: -20px;
        transform: scaleX(1.2);
        opacity: 0.8;
    }

    .buttons {
        display: flex;
        align-items: center;
        gap: 20px;
    }

    .buttons button {
        background: var(--pry-color);
        border: 2px solid var(--pry-color);
        border-radius: 8px;
        padding: 10px 15px;
    }

    .buttons a {
        color: var(--pry-color);
        border: 2px solid var(--pry-color);
        border-radius: 8px;
        padding: 10px 15px;
        font-size: 14px;
    }
</style>