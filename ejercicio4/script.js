require("dotenv").config(); 
const nodemailer = require("nodemailer");


const destinatarios = [
  "vale.rodriguez.palacios@gmail.com",
  "Santiganan219@gmail.com",
  "yulsyay19@gmail.com"
];

// transportador SMTP
const transporter = nodemailer.createTransport({
  service: "gmail", // tipo correo
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS // para el .env
  }
});

// Contenido
const mailOptions = {
  from: process.env.EMAIL_USER,
  to: "", //uno por uno
  subject: "holii soy yuli ejercicio 4",
  text: "muy mal ",
};

// Función enviando coreos
async function enviarCorreos() {
  for (let destinatario of destinatarios) {
    try {
      mailOptions.to = destinatario;
      const info = await transporter.sendMail(mailOptions);
      console.log(`Correo enviado a ${destinatario}: ${info.response}`);
    } catch (error) {
      console.error(`Error al enviar a ${destinatario}:`, error.message);
    }
  }
}

enviarCorreos();
// comandos que se necesita npm init -y
//npm install nodemailer dotenv
