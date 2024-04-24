import nodemailer from "nodemailer";

let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: "esteban.pechuan@gmail.com",
        pass: "eeuwjbisdjpyasoh"
    }

});

transporter.verify(function (error, success) {
    if (error) {
        console.error(error);
    } else {
        console.log("Server is ready to take our messages", success);
    }
});


export default transporter