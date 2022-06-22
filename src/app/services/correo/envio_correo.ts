'use strict';

import nodemailer from "nodemailer";


export const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "petplanet7sa@gmail.com", // generated ethereal user
      pass: "adqwaghuxrunmofs", // generated ethereal password
    },
  });

transporter.verify().then(()=> {
    console.log("listo para enviar correos");
});
