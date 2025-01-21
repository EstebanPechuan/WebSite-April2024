<script>
    import Icon from '@iconify/svelte';
    import { enhance } from '$app/forms';
    import { language, dataLang } from '../store/store'
    import { data } from '$lib/data.js';

    $: $dataLang = data.find((item) => item.lang === $language)?.data || {};

    export let form
</script>

<section id="contact">
    <div class="section_wrapper">
        <div class="contact_info">
            <div class="title">
                <h2>{$dataLang.contact.title}</h2>
                <span class="underline"></span>
            </div>

            <p>{$dataLang.contact.description}</p>


            <div class="contact_data">
                <span>
                    <Icon icon="ph:phone" />
                    <p>+61 491 712 535</p>
                </span>

                <span>
                    <Icon icon="ic:outline-mail" />
                    <p>esteban.pechuan@gmail.com</p>
                </span>

                <span>
                    <Icon icon="ion:location-outline" />
                    <p>Perth, WA 6062</p>
                </span>
            </div>
        </div>
        
        <form method="POST" use:enhance>
            <div class="input_group">
                <input placeholder="" name="name" id="name" type="text">
                <label for="name">{$dataLang.contact.form.name}</label>

                <p>{ form?.nameError || '' }</p>
            </div>
    
            <div class="input_group">
                <input placeholder="" name="email" id="email" type="email">
                <label for="email">{$dataLang.contact.form.email}</label>
            </div>
    
            <div class="input_group">
                <input placeholder="" name="assunto" id="assunto" type="text">
                <label for="assunto">{$dataLang.contact.form.assunto}</label>
            </div>
    
            <div class="input_group">
                <textarea placeholder="" rows="5" name="message" id="message"></textarea>
                <label for="message">{$dataLang.contact.form.message}</label>
            </div>
    
            <button type="submit">{$dataLang.contact.form.button}</button>
            <p class="email_sent">{form?.success || ''}</p>
        </form>
    </div>
</section>


<style>
    section {
        background: var(--background-color-2);
    }

    .section_wrapper {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 40px;
    }

    .contact_info {
        display: flex;
        flex-direction: column;
        gap: 20px;
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

    .contact_data {
        display: flex;
        flex-direction: column;
        gap: 5px;
    }

    .contact_data span {
        display: flex;
        align-items: center;
        gap: 10px;
        font-size: 16px;
    }

    .contact_data p {
        font-size: 12px;
    }

    form {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }

    .input_group {
        position: relative;
    }

    input,
    textarea {
        width: 100%;
        padding: 18px 10px 7px;
        border-radius: 8px;
        border: 2px solid var(--text-color);
        background: var(--background-color-2);
        color: var(--text-color);
    }

    textarea {
        resize: vertical;
    }

    label {
        position: absolute;
        top: 13px;
        left: 10px;
        z-index: 100;
        transition: 0.4s;
    }

    input:focus + label,
    input:not(:placeholder-shown) + label,
    textarea:focus + label,
    textarea:not(:placeholder-shown) + label {
        top: 5px;
        font-size: 12px;
        opacity: 0.4;
    }

    button {
        width: fit-content;
        padding: 10px 20px;
        background: var(--pry-color);
        color: var(--text-color);
        border-radius: 8px;
        place-self: end;
    }
</style>