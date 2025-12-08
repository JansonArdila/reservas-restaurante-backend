const { Resend } = require("resend");

// Inicializa Resend con tu API Key desde variables de entorno
const resend = new Resend(process.env.RESEND_API_KEY);

async function sendMail(to, subject, html) {
    try {
        const response = await resend.emails.send({
            from: "Reservas Restaurante <onboarding@resend.dev>",
            to,
            subject,
            html
        });

        console.log("Correo enviado:", response);
        return response;
    } catch (error) {
        console.error("ERROR enviando correo:", error);
        throw error;
    }
}

module.exports = { sendMail };
