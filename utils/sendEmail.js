


const nodemailer = require("nodemailer");

const sendEmail = async (email, score, customMessage = "", details = {}) => {
  try {
    console.log("📧 Preparing to send email to:", email);

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      },
      tls: {
        rejectUnauthorized: false
      }
    });

    const { userName = "Student", correct = 0, wrong = 0, skipped = 0, total = 0, aiFeedback = "", isAiResult = false, perQuestionScores = [], totalScore = 0 } = details;

    const scoreTableRows = perQuestionScores.map((item, i) => `
      <tr style="background:${i % 2 === 0 ? '#f9f9f9' : '#fff'}">
        <td style="padding:10px; border:1px solid #ddd; font-weight:bold;">Q${i + 1}</td>
        <td style="padding:10px; border:1px solid #ddd; max-width:250px;">${item.question}</td>
        <td style="padding:10px; border:1px solid #ddd; max-width:200px; color:#555;">${item.userAnswer.substring(0, 100)}${item.userAnswer.length > 100 ? '...' : ''}</td>
        <td style="padding:10px; border:1px solid #ddd; text-align:center; font-weight:bold; color:${item.score >= 7 ? '#27ae60' : item.score >= 4 ? '#f39c12' : '#e74c3c'}">${item.score}/10</td>
      </tr>`).join("");

    const htmlBody = isAiResult
      ? `<div style="font-family: Arial; padding:20px; border:1px solid #ddd; border-radius:10px; max-width:700px;">
          <h2 style="color:#2c3e50;">Hello, ${userName}! 👋</h2>
          <p style="font-size:16px;">${customMessage}</p>
          <h3 style="color:#27ae60;">🤖 AI Score: ${totalScore} / 10</h3>

          ${perQuestionScores.length > 0 ? `
          <h4 style="margin-top:20px; color:#2c3e50;">📊 Score Table</h4>
          <table style="width:100%; border-collapse:collapse; margin-top:8px; font-size:13px;">
            <thead>
              <tr style="background:#2c3e50; color:#fff;">
                <th style="padding:10px; border:1px solid #ddd;">#</th>
                <th style="padding:10px; border:1px solid #ddd;">Question</th>
                <th style="padding:10px; border:1px solid #ddd;">Your Answer</th>
                <th style="padding:10px; border:1px solid #ddd;">Score</th>
              </tr>
            </thead>
            <tbody>${scoreTableRows}</tbody>
          </table>` : ''}

          <h4 style="margin-top:20px; color:#2c3e50;">📝 AI Feedback</h4>
          <div style="background:#f8f9fa; padding:16px; border-radius:8px; white-space:pre-wrap; font-size:13px; line-height:1.7;">${aiFeedback}</div>
          <p style="margin-top:16px;">Login to your dashboard to view detailed results.</p>
          <hr style="margin-top:20px; border:none; border-top:1px solid #eee;">
          <p style="color:#7f8c8d; font-size:12px;">This is an automated email. Please do not reply.</p>
        </div>`
      : `<div style="font-family: Arial; padding:20px; border:1px solid #ddd; border-radius:10px; max-width:500px;">
          <h2 style="color:#2c3e50;">Hello, ${userName}! 👋</h2>
          <p style="font-size:16px;">${customMessage}</p>
          ${score ? `<h3 style="color:#27ae60;">Final Score: ${score}</h3>
          <table style="width:100%; border-collapse:collapse; margin-top:12px;">
            <tr style="background:#f0fdf4;">
              <td style="padding:8px; border:1px solid #ddd;">✅ Correct</td>
              <td style="padding:8px; border:1px solid #ddd; font-weight:bold;">${correct} / ${total}</td>
            </tr>
            <tr>
              <td style="padding:8px; border:1px solid #ddd;">❌ Wrong</td>
              <td style="padding:8px; border:1px solid #ddd; font-weight:bold;">${wrong}</td>
            </tr>
            <tr style="background:#fefce8;">
              <td style="padding:8px; border:1px solid #ddd;">⏭️ Skipped</td>
              <td style="padding:8px; border:1px solid #ddd; font-weight:bold;">${skipped}</td>
            </tr>
          </table>` : ``}
          <p style="margin-top:16px;">Login to your dashboard to view detailed results.</p>
          <hr style="margin-top:20px; border:none; border-top:1px solid #eee;">
          <p style="color:#7f8c8d; font-size:12px;">This is an automated email. Please do not reply.</p>
        </div>`;

    const info = await transporter.sendMail({
      from: `"Aptitude Test" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Test Result Update",
      html: htmlBody
    });

    console.log(" Email sent successfully! Message ID:", info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error(" Email Error:", error.message);
    return { success: false, error: error.message };
  }
};

module.exports = sendEmail;