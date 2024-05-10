<script>
    import { language, dataLang } from '../store/store'
    import { data } from '$lib/data.js';
    import user from '$lib/images/user-image-removebg.png'
    import CV from '$lib/CV Front End - Esteban Pechuan.pdf'

    $: $dataLang = data.find((item) => item.lang === $language).data;
</script>

<section class="section_wrapper" id="about">
    <div class="info">
        <h3>{$dataLang.hero.h3}</h3>

        <h2>{$dataLang.hero.h2}</h2>
        
        <h1>{$dataLang.hero.h1}</h1>

        <div class="about_me">
            <div class="div">
                <img class="user_img" src={user} alt="">
                <p>{$dataLang.hero.paragraph[0]}</p>
                <p>{$dataLang.hero.paragraph[1]}</p>
                <p>{$dataLang.hero.paragraph[2]}</p>
                <p>{$dataLang.hero.paragraph[3]}</p>
            </div>

        </div>

        <div class="going_down">
            <a href="#skills">
                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" fill-rule="evenodd" d="m6 7l6 6l6-6l2 2l-8 8l-8-8z"/></svg>

                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" fill-rule="evenodd" d="m6 7l6 6l6-6l2 2l-8 8l-8-8z"/></svg>
            </a>
        </div>

        <div class="buttons">
            <a href={CV} download="Resume Esteban Pechuan Developer">{$dataLang.hero.buttons[0]}</a>
            <a href="#contact">{$dataLang.hero.buttons[1]}</a>
        </div>
    </div>
</section>

<style>
    .section_wrapper {
        min-height: calc(100vh - 60px);
        width: 100%;
        padding-bottom: 100px;
        display: grid;
        grid-template-columns: 1fr;
        gap: 40px;
        place-items: center;
        position: relative;
    }

    h1, h2, h3 {
        line-height: 1.3;
        margin-top: -5px;
    }

    h2 {
        font-size: 60px;
    }

    h1 {
        letter-spacing: 6px;
        font-weight: 400;
    }
    
    .about_me .div {
        width: 100%;
        padding: 20px 0;
    }

    .about_me .div p{
        margin-bottom: 10px;
    }

    .about_me img {
        shape-outside: url('../lib/images/user-image-removebg.png');
        shape-margin: 0px;
        float: right;
        width: 350px;
        filter: drop-shadow(8px -5px 0 rgba(var(--pry-color-rgb), 0.2));
        position: relative;
        top: -50px;
        right: -50px;
    }

    .user_img {
        display: none;
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

    .buttons a:nth-child(1) {
        background: var(--pry-color);
        border: 2px solid var(--pry-color);
        border-radius: 8px;
        padding: 10px 15px;
        color: #fff
    }

    .buttons a {
        color: var(--pry-color);
        border: 2px solid var(--pry-color);
        border-radius: 8px;
        padding: 10px 15px;
        font-size: 14px;
    }

    @media (min-width: 700px) {   
        .user_img {
            display: block;
        }
    }
</style>