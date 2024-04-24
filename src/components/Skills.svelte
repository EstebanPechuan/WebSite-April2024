<script>
    import Icon from '@iconify/svelte';
    import { gsap } from 'gsap'
    import { onMount } from "svelte";
    import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
    import { language, dataLang } from '../store/store'
    import { data } from '$lib/data.js';

    $: $dataLang = data.find((item) => item.lang === $language).data;
    
	onMount(() => {
        gsap.registerPlugin(ScrollTrigger);

        const skillArray = document.querySelectorAll('.skill')

        skillArray.forEach((item) => {
            gsap.fromTo(item, {
                scale: 0,
            },
            {
                duration: 0.6,
                scale: 0.8,
                ease: 'back.out(2)',
                scrollTrigger: {
                    trigger: item,
                    start: 'top bottom-=100',
                    toggleActions: 'play none none reverse',
                },
            })
        })
    });


</script>

<section id="skills">
    <div class="section_wrapper">
        <div class="skills_text">
            <div class="title">
                <h2>{$dataLang.skills.title}</h2>
            </div>

            <div class="skills_description">
                <p>{$dataLang.skills.paragraph[0]}</p>
                <p>{$dataLang.skills.paragraph[1]}</p>
            </div>
        </div>

        <div class="skills_icons">
            <div class="skill html-fill">
                <Icon icon="akar-icons:html-fill" />
                <p>HTML5</p>
            </div>
            <div class="skill css-fill">
                <Icon icon="akar-icons:css-fill" />
                <p>CSS</p>
            </div>
            <div class="skill sass">
                <Icon icon="fa6-brands:sass" />
                <p>SASS</p>
            </div>
            <div class="skill bootstrap-fill">
                <Icon icon="akar-icons:bootstrap-fill" />
                <p>Bootstrap</p>
            </div>
            <div class="skill javascript-fill">
                <Icon icon="akar-icons:javascript-fill" />
                <p>Javascript</p>
            </div>
            <div class="skill react-fill">
                <Icon icon="akar-icons:react-fill" />
                <p>React</p>
            </div>
            <div class="skill svelte">
                <Icon icon="cib:svelte" />
                <p>Svelte</p>
            </div>
            <div class="skill vue-16">
                <Icon icon="nonicons:vue-16" />
                <p>Vue</p>
            </div>
            <div class="skill badge-3d">
                <Icon icon="bi:badge-3d" />
                <p>3D</p>
            </div>
            <div class="skill material-ui">
                <Icon icon="mdi:material-ui" />
                <p>Material UI</p>
            </div>
            <div class="skill tailwind">
                <Icon icon="mdi:tailwind" />
                <p>Tailwind</p>
            </div>
            <div class="skill firebase-solid">
                <Icon icon="teenyicons:firebase-solid" />
                <p>Firebase</p>
            </div>
        </div>
    </div>
</section>

<style>
    section {
        background: var(--background-color-2);
    }

    .section_wrapper {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 60px;
    }

    .title {
        width: fit-content;
        padding: 5px 0;
        overflow: hidden;
    }

    h2 {
        width: fit-content;
        position: relative;
    }

    h2::before {
        content: '';
        width: 100%;
        height: 2px;
        position: absolute;
        bottom: -2px;
        left: -50%;
        background-color: var(--pry-color);
        transition: 0.8s;
    }

    h2:hover::before {
        left: 50%;
    }

    .skills_text {
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 20px;
    }

    .skills_description {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }

    .skills_icons {
        display: grid;
        grid-template-columns: repeat(4, 70px);
        gap: 20px;
        place-content: center;
        place-items: center;
        font-size: 50px;
    }

    .skill p {
        font-size: 12px;
        text-align: center;
    }

    /* .skill:nth-child(1) {
        --skill-color: var(--pry-color);
    }

    .skill:nth-child(2) {
        --skill-color: rgb(228, 77, 38);
    }

    .skill:nth-child(3) {
        --skill-color: rgb(21, 114, 182);
    }

    .skill:nth-child(4) {
        --skill-color: rgb(205, 103, 153);
    }

    .skill:nth-child(5) {
        --skill-color: rgb(0, 216, 255);
    }

    .skill:nth-child(6) {
        --skill-color: var(--pry-color);
    }

    .skill:nth-child(7) {
        --skill-color: rgb(65, 184, 131);
    }

    .skill:nth-child(8) {
        --skill-color: rgb(126, 19, 248);
    }
    
    .skill:nth-child(9) {
        --skill-color: rgb(0, 96, 116);
    }

    .skill:nth-child(10) {
        --skill-color: rgb(0, 127, 255);
    }

    .skill:nth-child(11) {
        --skill-color: rgb(68, 168, 179);
    }

    .skill:nth-child(12) {
        --skill-color: #ffca28;
    }

    .skill:hover {
        color: var(--skill-color);
    } */
</style>