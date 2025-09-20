// pages/api/subscribe.js
import sendgrid from "@sendgrid/mail";

sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: "El email es obligatorio" });
  }

  try {
    await sendgrid.send({
      to: email,
      from: process.env.FROM_EMAIL, // tu correo verificado en SendGrid (ej: info@lustrix.tech)
      subject: "¡Bienvenido a LUSTIRX!",
      html: `
        <h1>Bienvenido a LUSTRIX 🚀</h1>
        <p>Gracias por unirte. Tu acceso ya está disponible:</p>
        <a href="${process.env.APP_URL}" target="_blank">👉 Entra a la App</a>
      `,
    });

    return res.status(200).json({ message: "Correo enviado correctamente" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error al enviar el correo" });
  }
}
