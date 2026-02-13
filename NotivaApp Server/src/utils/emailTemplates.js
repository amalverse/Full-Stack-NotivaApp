// Email templates for NotivaApp with branding

const getEmailTemplate = (content) => {
  // Base email template with common styling (header, footer, styles)
  // Takes the specific content as an argument and injects it into the body
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>NotivaApp</title>
      <style>
        body {
          margin: 0;
          padding: 0;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
          background: linear-gradient(135deg, #f5f3ff 0%, #eff6ff 50%, #fdf2f8 100%);
        }
        .email-container {
          max-width: 600px;
          margin: 40px auto;
          background: #ffffff;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
        }
        .header {
          background: linear-gradient(135deg, #9333ea 0%, #3b82f6 100%);
          padding: 40px 30px;
          text-align: center;
        }
        .logo {
          width: 60px;
          height: 60px;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 12px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 16px;
          backdrop-filter: blur(10px);
        }
        .logo-icon {
          font-size: 32px;
          color: #ffffff;
        }
        .app-name {
          color: #ffffff;
          font-size: 28px;
          font-weight: 700;
          margin: 0;
          letter-spacing: -0.5px;
        }
        .content {
          padding: 40px 30px;
        }
        .content h1 {
          color: #1f2937;
          font-size: 24px;
          font-weight: 700;
          margin: 0 0 16px 0;
        }
        .content p {
          color: #6b7280;
          font-size: 16px;
          line-height: 1.6;
          margin: 0 0 24px 0;
        }
        .button {
          display: inline-block;
          padding: 14px 32px;
          background: linear-gradient(135deg, #9333ea 0%, #3b82f6 100%);
          color: #ffffff !important;
          text-decoration: none;
          border-radius: 10px;
          font-weight: 600;
          font-size: 16px;
          box-shadow: 0 4px 12px rgba(147, 51, 234, 0.3);
          transition: all 0.3s ease;
        }
        .button:hover {
          box-shadow: 0 6px 16px rgba(147, 51, 234, 0.4);
          transform: translateY(-2px);
        }
        .link-box {
          background: #f9fafb;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          padding: 16px;
          margin: 24px 0;
          word-break: break-all;
        }
        .link-box a {
          color: #3b82f6;
          text-decoration: none;
          font-size: 14px;
        }
        .footer {
          background: #f9fafb;
          padding: 30px;
          text-align: center;
          border-top: 1px solid #e5e7eb;
        }
        .footer p {
          color: #9ca3af;
          font-size: 14px;
          margin: 8px 0;
        }
        .footer a {
          color: #9333ea;
          text-decoration: none;
        }
        .divider {
          height: 1px;
          background: linear-gradient(90deg, transparent, #e5e7eb, transparent);
          margin: 24px 0;
        }
        .feature-list {
          list-style: none;
          padding: 0;
          margin: 24px 0;
        }
        .feature-list li {
          padding: 12px 0;
          color: #6b7280;
          font-size: 15px;
          display: flex;
          align-items: center;
        }
        .feature-list li:before {
          content: "✓";
          display: inline-block;
          width: 24px;
          height: 24px;
          background: linear-gradient(135deg, #9333ea 0%, #3b82f6 100%);
          color: white;
          border-radius: 50%;
          text-align: center;
          line-height: 24px;
          margin-right: 12px;
          font-weight: bold;
          font-size: 14px;
        }
        @media only screen and (max-width: 600px) {
          .email-container {
            margin: 20px;
            border-radius: 12px;
          }
          .header {
            padding: 30px 20px;
          }
          .content {
            padding: 30px 20px;
          }
          .content h1 {
            font-size: 20px;
          }
          .button {
            display: block;
            text-align: center;
          }
        }
      </style>
    </head>
    <body>
      <div class="email-container">
        <div class="header">
          <div class="logo">
            <span class="logo-icon">📝</span>
          </div>
          <h1 class="app-name">NotivaApp</h1>
        </div>
        ${content}
        <div class="footer">
          <p>© ${new Date().getFullYear()} NotivaApp. All rights reserved.</p>
          <p>Organize your thoughts, tasks, and ideas in one beautiful place.</p>
          <p style="margin-top: 16px;">
            <a href="${process.env.CLIENT_URL || "http://localhost:5173"}">Visit NotivaApp</a>
          </p>
        </div>
      </div>
    </body>
    </html>
  `;
};

// Email Verification Template
// Generates the email content for verifying a user's email address
// Includes the OTP and a clickable verification link
export const getVerificationEmailTemplate = (verifyUrl, userName, otp) => {
  const content = `
    <div class="content">
      <h1>Welcome to NotivaApp! 🎉</h1>
      <p>Hi${userName ? ` ${userName}` : ""},</p>
      <p>Thank you for signing up! We're excited to have you on board. To get started, please verify your email address by entering the code below or clicking the button:</p>
      
      <div style="background: #f3f4f6; border-radius: 12px; padding: 24px; text-align: center; margin: 24px 0;">
        <div style="font-size: 14px; color: #6b7280; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 1px;">Verification Code</div>
        <div style="font-size: 32px; font-weight: 800; letter-spacing: 4px; color: #4f46e5;">${otp}</div>
      </div>

      <div style="text-align: center; margin: 32px 0;">
        <a href="${verifyUrl}" class="button" clicktracking="off">Verify Email Address</a>
      </div>
      
      <p style="font-size: 14px; color: #9ca3af;">If the button doesn't work, copy and paste this link into your browser:</p>
      <div class="link-box">
        <a href="${verifyUrl}" clicktracking="off">${verifyUrl}</a>
      </div>
      
      <div class="divider"></div>
      
      <p style="font-size: 14px;"><strong>What you can do with NotivaApp:</strong></p>
      <ul class="feature-list">
        <li>Create beautiful text notes and checklists</li>
        <li>Organize with smart search and archive</li>
        <li>Pin important notes for quick access</li>
        <li>Access your notes from anywhere</li>
      </ul>
      
      <p style="font-size: 14px; color: #9ca3af; margin-top: 32px;">
        If you didn't create an account with NotivaApp, you can safely ignore this email.
      </p>
    </div>
  `;

  return getEmailTemplate(content);
};

// Password Reset Template
// Generates the email content for resetting a password
// Includes the reset OTP and a link to the reset page
export const getPasswordResetEmailTemplate = (resetUrl, userName, otp) => {
  const content = `
    <div class="content">
      <h1>Password Reset Request 🔐</h1>
      <p>Hi${userName ? ` ${userName}` : ""},</p>
      <p>We received a request to reset your password. Use the code below or click the button to proceed:</p>
      
      <div style="background: #f3f4f6; border-radius: 12px; padding: 24px; text-align: center; margin: 24px 0;">
        <div style="font-size: 14px; color: #6b7280; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 1px;">Reset Code</div>
        <div style="font-size: 32px; font-weight: 800; letter-spacing: 4px; color: #4f46e5;">${otp}</div>
      </div>

      <div style="text-align: center; margin: 32px 0;">
        <a href="${resetUrl}" class="button" clicktracking="off">Reset Password</a>
      </div>
      
      <p style="font-size: 14px; color: #9ca3af;">If the button doesn't work, copy and paste this link into your browser:</p>
      <div class="link-box">
        <a href="${resetUrl}" clicktracking="off">${resetUrl}</a>
      </div>
      
      <div class="divider"></div>
      
      <p style="font-size: 14px; color: #ef4444; background: #fef2f2; padding: 16px; border-radius: 8px; border-left: 4px solid #ef4444;">
        <strong>⚠️ Important:</strong> This password reset link and code will expire in 10 minutes.
      </p>
      
      <p style="font-size: 14px; color: #9ca3af; margin-top: 24px;">
        If you didn't request a password reset, please ignore this email.
      </p>
    </div>
  `;

  return getEmailTemplate(content);
};

// Welcome Email Template (optional - for after verification)
// Sent after successful email verification to welcome the user
export const getWelcomeEmailTemplate = (userName) => {
  const content = `
    <div class="content">
      <h1>Welcome to NotivaApp! 🎊</h1>
      <p>Hi ${userName},</p>
      <p>Your email has been verified successfully! You're all set to start organizing your thoughts and tasks.</p>
      
      <div style="text-align: center; margin: 32px 0;">
        <a href="${process.env.CLIENT_URL || "http://localhost:5173"}" class="button">Get Started</a>
      </div>
      
      <div class="divider"></div>
      
      <p style="font-size: 14px;"><strong>Quick Start Guide:</strong></p>
      <ul class="feature-list">
        <li>Click "Create Note" to add your first note</li>
        <li>Use checklists for tasks and to-dos</li>
        <li>Pin important notes to keep them at the top</li>
        <li>Archive notes you want to keep but don't need daily</li>
      </ul>
      
      <p style="margin-top: 32px;">Happy note-taking! 📝</p>
    </div>
  `;

  return getEmailTemplate(content);
};

export default {
  getVerificationEmailTemplate,
  getPasswordResetEmailTemplate,
  getWelcomeEmailTemplate,
};
