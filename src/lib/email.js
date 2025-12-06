import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: 'smtp.resend.com',
  port: 465,
  secure: true,
  auth: {
    user: 'resend',
    pass: process.env.RESEND_API_KEY,
  },
});

export async function sendOTP(email, otp) {
  if (!process.env.RESEND_API_KEY) {
    console.error('❌ RESEND_API_KEY is missing');
    throw new Error('Email service not configured');
  }

  const mailOptions = {
    from: process.env.RESEND_FROM || 'Ministry of Mobiles <onboarding@resend.dev>',
    to: email,
    subject: 'Your Login OTP',
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>Login to Ministry of Mobiles</h2>
        <p>Your One-Time Password (OTP) is:</p>
        <h1 style="color: #2563eb; letter-spacing: 5px;">${otp}</h1>
        <p>This code will expire in 10 minutes.</p>
        <p>If you didn't request this, please ignore this email.</p>
      </div>
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('📧 Email sent:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('❌ Error sending email:', error);
    return { success: false, error: error.message };
  }
}
