import transporter from "../lib/emailSet.server";

export const actions  = {
    default: async ({request}) => {
        const formData = await request.formData()
        const name = formData.get('name')
        const email = formData.get('email')
        const assunto = formData.get('assunto')
        const body = formData.get('message')

        if ( name.lenght <= '0' ) {
            return {
                nameError: "Your name is invalid"
            }
        }

        email.lenght <= '0' ?? { emailError: "Your email is invalid" }

        if ( body.lenght == '' ) {
            return {
                messageError: "Your email is invalid"
            }
        }
        
        let html = `
            <h2>Hi! I'm ${name}</h2>
            <h3>My mail is ${email}</h3>
            <p>I'm writing you from your website, and my message is:</p>
            <p>${body}</p>
        `

        const message = {
            from: "juan.pechuan@gmail.com",
            to: "esteban.pechuan@gmail.com",
            bcc: "esteban.pechuan@gmail.com",
            subject: assunto,
            html: html
        };

        const sendMail = async (message) => {
            await new Promise((resolve, reject) => {
                transporter.sendMail(message, (err, info) => {
                    if (err) {
                        console.error(err);
                        reject(err)
                    } else {
                        resolve(info)
                    }
                })
            })
        };

        await sendMail(message);

        return {
            success: 'Your mail has been send.'
        }
    }
}