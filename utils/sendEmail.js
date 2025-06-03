import nodemailer from "nodemailer";

export const sendOtpEmail = async (to, otp) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "zoulkifirousabiadam@gmail.com",
      pass: "fahv iobk jgsv wadd",
    },
  });

  const mailOptions = {
    from: `"Tutorat" <${process.env.MAIL_USER}>`,
    to,
    subject: "Code de vérification (OTP)",
    html: `<p>Bonjour,</p>
           <p>Voici votre code de vérification :</p>
           <h2>${otp}</h2>
           <p>Ce code expire dans 10 minutes.</p>`,
  };

  await transporter.sendMail(mailOptions);
};
