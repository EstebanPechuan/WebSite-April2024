<script>
    import Icon from "@iconify/svelte";
    import { register } from "swiper/element/bundle";
    import 'swiper/css'

    import cuppa from '$lib/images/cuppa-canada.png'
    import bioconsulting from '$lib/images/bioconsulting.png'
    import foro21 from '$lib/images/foro-21.png'
    import pechus from '$lib/images/pechus-commerce.png'

    import { language, dataLang } from '../store/store'
    import { data } from '$lib/data.js';

    $: $dataLang = data.find((item) => item.lang === $language).data;

    register();
</script>

<section class="section_wrapper" id="projects">
    <h2>Proyectos</h2>
    
    <swiper-container
        slides-per-view={1}
        centered-slides={true}
        navigation-nextEl={".swiper-button-next"}
        navigation-prevEl={".swiper-button-prev"}
        loop={true}
        autoplay={true}
        autoplay-disable-On-Interaction={true}
    >
        <swiper-slide>
            <div class="container_slide">
                <div class="container_image">
                    <img src={cuppa} alt="">
                </div>
                <div class="container_info">
                    <h3>{$dataLang.projects.jobs[0].title}</h3>

                    <p>{$dataLang.projects.jobs[0].description}</p>
                    
                    <a class="button" target="_blank" href="https://cuppacanada.com/">{$dataLang.projects.jobs[0].button}</a>
                </div>

                <div class="tech_icons">
                    <div class="skill html-fill">
                        <Icon icon="akar-icons:html-fill" />
                    </div>
                    <div class="skill css-fill">
                        <Icon icon="akar-icons:css-fill" />
                    </div>
                    <div class="skill javascript-fill">
                        <Icon icon="akar-icons:javascript-fill" />
                    </div>
                    <div class="skill react-fill">
                        <Icon icon="akar-icons:react-fill" />
                    </div>
                    <div class="skill badge-3d">
                        <Icon icon="bi:badge-3d" />
                    </div>
                </div>
                
                <div class="container_number">01</div>

            </div>
        </swiper-slide>
        
        <!-- <swiper-slide>
            <div class="container_slide">
                <div class="container_image">
                    <img src={bioconsulting} alt="">
                </div>
                <div class="container_info">
                    <h3>{$dataLang.projects.jobs[1].title}</h3>

                    <p>{@html $dataLang.projects.jobs[1].description}</p>
                    
                    <a class="button" target="_blank" href="https://estebanpechuan.github.io/bioconsulting/">{$dataLang.projects.jobs[1].button}</a>
                </div>

                <div class="tech_icons">
                    <div class="skill html-fill">
                        <Icon icon="akar-icons:html-fill" />
                    </div>
                    <div class="skill css-fill">
                        <Icon icon="akar-icons:css-fill" />
                    </div>
                    <div class="skill javascript-fill">
                        <Icon icon="akar-icons:javascript-fill" />
                    </div>
                </div>
                
                <div class="container_number">02</div>

            </div>
        </swiper-slide> -->

        <swiper-slide>
            <div class="container_slide">
                <div class="container_image">
                    <img src={foro21} alt="">
                </div>
                <div class="container_info">
                    <h3>{$dataLang.projects.jobs[2].title}</h3>

                    <p>{$dataLang.projects.jobs[2].description}</p>
                    
                    <a class="button" target="_blank" href="https://www.foro21.com.ar/">{$dataLang.projects.jobs[2].button}</a>
                </div>

                <div class="tech_icons">
                    <div class="skill html-fill">
                        <Icon icon="akar-icons:html-fill" />
                    </div>
                    <div class="skill css-fill">
                        <Icon icon="akar-icons:css-fill" />
                    </div>
                    <div class="skill javascript-fill">
                        <Icon icon="akar-icons:javascript-fill" />
                    </div>
                    <div class="skill svelte">
                        <Icon icon="cib:svelte" />
                    </div>
                </div>
                
                <div class="container_number">02</div>

            </div>
        </swiper-slide>

        <swiper-slide>
            <div class="container_slide">
                <div class="container_image">
                    <img src={pechus} alt="">
                </div>
                <div class="container_info">
                    <h3>{$dataLang.projects.jobs[3].title}</h3>

                    <p>{$dataLang.projects.jobs[3].description}</p>
                    
                    <a class="button" target="_blank" href="https://pechu-s-commerce.vercel.app/">{$dataLang.projects.jobs[3].button}</a>
                </div>

                <div class="tech_icons">
                    <div class="skill html-fill">
                        <Icon icon="akar-icons:html-fill" />
                    </div>
                    <div class="skill css-fill">
                        <Icon icon="akar-icons:css-fill" />
                    </div>
                    <div class="skill javascript-fill">
                        <Icon icon="akar-icons:javascript-fill" />
                    </div>
                    <div class="skill svelte">
                        <Icon icon="cib:svelte" />
                    </div>
                </div>
                
                <div class="container_number">03</div>

            </div>
        </swiper-slide>

        <div class="swiper-button-prev" />
        <div class="swiper-button-next" />
    </swiper-container>
</section>

<style>
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

    .container_slide {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 30px;
        position: relative;
        padding: 0 50px;
    }

    .container_image {
        width: 100%;
        max-width: 600px;
        aspect-ratio: 16 / 9;
    }

    .container_image img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .container_info {
        width: 100%;
        max-width: 600px;
        display: flex;
        flex-direction: column;
        gap: 10px;
    }

    /* .bioconsultingError {
        color: var(--pry-color);
    } */
    
    .container_info a {
        color: var(--pry-color);
    }

    .container_info a.button {
        padding: 10px 15px;
        background: var(--pry-color);
        border-radius: 8px;
        width: fit-content;
        color: var(--background-color);
        font-size: 12px;
    }

    .tech_icons {
        font-size: 30px;
        opacity: 0.8;
        position: absolute;
        bottom: 0;
        right: 50px;
        display: flex;
        gap: 10px;
    }
    
    .container_number {
        position: absolute;
        bottom: 0;
        right: 0;
        font-size: 150px;
        opacity: 0.2;
        z-index: -1;
    }

    .swiper-button-prev,
    .swiper-button-next {
        scale: 0;
    }
</style>