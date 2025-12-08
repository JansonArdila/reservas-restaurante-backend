const BrevoApi = require('sib-api-v3-sdk');

// Configura la API Key de Brevo
BrevoApi.ApiClient.instance.authentications['api-key'].apiKey = process.env.BREVO_API_KEY;

// Función para enviar el correo
async function sendMail(to, subject, html) {
    try {
        const apiInstance = new BrevoApi.TransactionalEmailsApi();
        const sender = { name: 'Reservas Presik ', email: 'juice.aestheticscol@gmail.com' };

        const sendSmtpEmail = new BrevoApi.SendSmtpEmail({
            sender: sender,// El remitente
            to: [{ email: to }], // El destinatario
            subject: subject, // El asunto
            htmlContent: html, // El contenido HTML
        });

        console.log("Enviando un correo con los siguientes datos", sendSmtpEmail);

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
