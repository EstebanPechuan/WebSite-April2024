<script>
    import { gsap } from 'gsap'
    import { onMount } from "svelte";
    import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
    import { language, dataLang } from '../store/store'
    import { data } from '$lib/data.js';

    $: $dataLang = data.find((item) => item.lang === $language).data;
    
	onMount(() => {
        gsap.registerPlugin(ScrollTrigger);

        const fillArray = document.querySelectorAll('.fill')

        fillArray.forEach((item) => {
            gsap.fromTo(item, {
                scale: 0
            },
            {
                duration: 0.6,
                scale: 0.8,
                ease: 'back.out(10)',
                scrollTrigger: {
                    trigger: item,
                    start: 'top bottom-=100',
                    toggleActions: 'play none none reverse',
                }
            })
        })
    });


</script>

<section class="section_wrapper" id="experience">
    <h2>{$dataLang.experience.title}</h2>

    <div class="timeline">
        
        <div class="experience">
            <div class="draw">
                <div class="circle">
                    <span class="fill"></span>
                </div>

                <div class="line"></div>
            </div>

            <div class="texts">
                <h3>{$dataLang.experience.jobs[0].position}</h3>

                <h4>{$dataLang.experience.jobs[0].company}</h4>

                <p>{$dataLang.experience.jobs[0].description}</p>
            </div>
        </div>

        <div class="experience">
            <div class="draw">
                <div class="circle">
                    <span class="fill"></span>
                </div>

                <div class="line"></div>
            </div>

            <div class="texts">
                <h3>{$dataLang.experience.jobs[1].position}</h3>

                <h4>{$dataLang.experience.jobs[1].company}</h4>

                <p>{$dataLang.experience.jobs[1].description}</p>
            </div>
        </div>

        <div class="experience">
            <div class="draw">
                <div class="circle">
                    <span class="fill"></span>
                </div>

                <div class="line"></div>
            </div>

            <div class="texts">
                <h3>{$dataLang.experience.jobs[2].position}</h3>

                <h4>{$dataLang.experience.jobs[2].company}</h4>

                <p>{$dataLang.experience.jobs[2].description}</p>

                <ul>
                    <li>{$dataLang.experience.jobs[2].list[0]}</li>
                    <li>{$dataLang.experience.jobs[2].list[1]}</li>
                    <li>{$dataLang.experience.jobs[2].list[2]}</li>
                </ul>

                <p>{$dataLang.experience.jobs[2].underParagraph}</p>
            </div>
        </div>
    </div>
</section>

<style>
    :root {
        --circle_size: 20px;
    }
    
    h2 {
        width: fit-content;
        position: relative;
        margin: 0 auto 20px;
    }

    h2::before {
        content: '';
        width: 100%;
        height: 2px;
        position: absolute;
        bottom: -2px;
        background-color: var(--pry-color);
        transform: scaleX(0.6);
        transition: 0.6s;
    }
    
    h2:hover::before {
        transform: scaleX(1);
    }

    .timeline {
        display: flex;
        flex-direction: column;
        gap: 20px;
    }

    .experience {
        display: flex;
        gap: 20px;
    }

    .draw {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 10px;
    }

    .circle {
        width: var(--circle_size);
        height: var(--circle_size);
        border-radius: 50%;
        border: 1px solid var(--pry-color);
        position: relative;
        opacity: 1;
    }

    .fill {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: var(--pry-color);
        border-radius: 50%;
    }

    .line {
        height: calc(100% - var(--circle_size) - 10px);
        border-left: 1px solid var(--pry-color);
    }

    .texts {
        display: flex;
        flex-direction: column;
        gap: 10px;
        padding-bottom: 10px;
    }

    li {
        list-style: initial;
        margin-left: 20px;
    }
</style>