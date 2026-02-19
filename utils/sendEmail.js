


const nodemailer = require("nodemailer");

const sendEmail = async (email, score, customMessage = "") => {
  try {
    console.log("📧 Preparing to send email to:", email);

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "thakursinghgourav@gmail.com",
        pass: "xnej rgey pbvh nnrt"
      }
    });

    const info = await transporter.sendMail({
      from: '"Aptitude Test" <thakursinghgourav@gmail.com>',
      to: email,
      subject: "Test Result Update",
      html: `
        <div style="font-family: Arial; padding:20px; border:1px solid #ddd; border-radius: 10px;">
          <h2 style="color: #2c3e50;">Test Performance Report</h2>
          <p style="font-size: 16px;">${customMessage}</p>
          <h3 style="color: #27ae60;">Final Score: ${score}</h3>
          <p>Login to your dashboard to view detailed results.</p>
          <hr style="margin-top: 20px; border: none; border-top: 1px solid #eee;">
          <p style="color: #7f8c8d; font-size: 12px;">This is an automated email. Please do not reply.</p>
        </div>`
    });

    console.log(" Email sent successfully! Message ID:", info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error(" Email Error:", error.message);
    console.error("Full Error:", error);
    return { success: false, error: error.message };
  }
};

module.exports = sendEmail;