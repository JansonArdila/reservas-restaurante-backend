const BrevoApi = require('sib-api-v3-sdk');

// Configura la API Key de Brevo
BrevoApi.ApiClient.instance.authentications['api-key'].apiKey = process.env.BREVO_API_KEY;

// Función para enviar el correo
async function sendMail(to, subject, html) {
    try {
        const apiInstance = new BrevoApi.TransactionalEmailsApi();
        const sender = { email: 'juice.aestheticscol@gmail.com' }; // Aquí va tu dirección de correo de Brevo

        const sendSmtpEmail = new BrevoApi.SendSmtpEmail({
            to: [{ email: to }], // El destinatario
            sender: sender, // El remitente
            subject: subject, // El asunto
            htmlContent: html, // El contenido HTML
        });

        // Enviar el correo
        const response = await apiInstance.sendTransacEmail(sendSmtpEmail);
        console.log("Correo enviado:", response);
        return response;
    } catch (error) {
        console.error("ERROR enviando correo:", error);
        throw error;
    }
}

module.exports = { sendMail };
