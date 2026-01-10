import {
  SendSmtpEmail,
  TransactionalEmailsApi,
  TransactionalEmailsApiApiKeys,
} from "@getbrevo/brevo";

const otpTemplate = (otp: string) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your Artora Verification Code</title>
</head>
<body style="margin: 0; padding: 0; background-color: #050505; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; color: #ffffff; -webkit-font-smoothing: antialiased;">
  <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #050505; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="100%" max-width="500" border="0" cellspacing="0" cellpadding="0" style="max-width: 500px; background-color: #121212; border: 1px solid rgba(255,255,255,0.06); border-radius: 24px; overflow: hidden; box-shadow: 0 20px 40px rgba(0,0,0,0.4);">
          
          <tr>
            <td align="center" style="padding: 40px 0 20px 0;">
              <h1 style="margin: 0; font-size: 28px; font-weight: 700; letter-spacing: -1px; color: #7c3aed; font-style: italic;">ARTORA</h1>
            </td>
          </tr>

          <tr>
            <td align="center" style="padding: 0 40px 40px 40px;">
              <div style="width: 48px; height: 48px; background-color: rgba(251, 191, 36, 0.1); border-radius: 50%; margin-bottom: 24px; display: inline-block; line-height: 48px; color: #fbbf24; font-size: 20px;">🔒</div>
              <h2 style="margin: 0 0 12px 0; font-size: 22px; font-weight: 600;">Verify your identity</h2>
              <p style="margin: 0 0 32px 0; font-size: 16px; color: #94a3b8; line-height: 1.5;">To complete your registration, please enter the following 6-digit verification code. This code is valid for <strong>5 minutes</strong>.</p>
              
              <div style="background-color: #1a1a1c; border: 1px solid rgba(251, 191, 36, 0.2); border-radius: 16px; padding: 20px; margin-bottom: 32px;">
                <span style="font-size: 42px; font-weight: 700; letter-spacing: 8px; color: #ffffff; font-family: 'Courier New', Courier, monospace;">${otp}</span>
              </div>

              <p style="margin: 0; font-size: 14px; color: #64748b;">If you did not request this code, you can safely ignore this email.</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

// Initialize the API instance
const apiInstance = new TransactionalEmailsApi();

// Set up the API key
apiInstance.setApiKey(
  TransactionalEmailsApiApiKeys.apiKey,
  process.env.BREVO_API_KEY!
);

export const sendOTP = async (email: string, otp: string) => {
  const sendSmtpEmail = new SendSmtpEmail();

  sendSmtpEmail.subject = "Your Artora Verification Code";
  sendSmtpEmail.sender = { name: "ARTORA", email: process.env.SENDER_EMAIL! };
  sendSmtpEmail.to = [{ email: email }];
  sendSmtpEmail.htmlContent = otpTemplate(otp);

  try {
    const data = await apiInstance.sendTransacEmail(sendSmtpEmail);
    return { success: true, data };
  } catch (error) {
    console.error("Brevo Error:", error);
    return { success: false, error };
  }
};
