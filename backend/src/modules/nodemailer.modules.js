const sendMailActivate = async (nodemailer, host, targetMail) => {
  try {
    const config = {
      service: 'gmail',
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.GMAIL_MAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD
      }
    };
    const transporter = nodemailer.createTransport(config);
    let activationLink = host;
    let message = {
      from: 'noreply@novitafaandi.com', // sender address
      to: targetMail, // list of receivers
      subject: 'Verfication Account', // Subject line
      html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
              <h2 style="text-align: center; color: #4CAF50;">Welcome to Our App!</h2>
              <p>Hallo ${targetMail},</p>
              <p>Thank you for registering on our app. Please click the link below to activate your account:</p>
              <p style="text-align: center;">
                <a href="${activationLink}" style="display: inline-block; background-color: #4CAF50; color: white; padding: 10px 20px; text-decoration: none; border-radius: 4px;">
                  Activate Account
                </a>
              </p>
              <p>If you can't click the button above, copy and paste the following URL into your browser:</p>
              <p><a href="${activationLink}">${activationLink}</a></p>
              <p>Thank you,</p>
              <p>NovitAfaandi App Teams</p>
            </div>
          `
    };
    const send = await transporter.sendMail(message);
    return send;
  } catch (error) {
    throw { ...error };
  }
};

module.exports = { sendMailActivate };
