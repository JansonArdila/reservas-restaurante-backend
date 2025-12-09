const BrevoApi = require('@getbrevo/brevo');

// Configura la API Key de Brevo
const apiKey = process.env.BREVO_API_KEY;
if (!apiKey) {
    throw new Error('La API Key de Brevo no está definida en el archivo .env');
}

// Crear una instancia de la API con la autenticación correcta
const apiInstance = new BrevoApi.TransactionalEmailsApi();
apiInstance.setApiKey('api-key', apiKey);  // Configura la clave API

// Función para enviar el correo
async function sendMail(to, subject, html) {
    try {
        // Configurar el remitente
        const sender = {
            email: 'juice.aestheticscol@gmail.com',  // Asegúrate de que este correo esté verificado
            name: 'Prueba PRESIK'
        };

        const sendSmtpEmail = new BrevoApi.SendSmtpEmail({
            sender: sender,  // El remitente
            to: [{ email: to }],  // El destinatario
            subject: subject,  // El asunto
            htmlContent: html,  // El contenido HTML
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

