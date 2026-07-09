import nodemailer from "nodemailer";
import { EnvironmentVariables } from "../../infra/config/environment/EnvironmentVariables.js";
import { CommonConstants } from "../../infra/utils/common/Constants.js";

const transporter = nodemailer.createTransport({
  service: CommonConstants.EMAIL_SERVICE_NAME,
  auth: {
    user: EnvironmentVariables.EMAIL_SERVICE_API_KEY_NAME,
    pass: EnvironmentVariables.EMAIL_SERVICE_API_KEY_VALUE,
  },
});

export class EmailServiceAdapter {
  async sendEmail(toEmail, subject, message) {
    const mailOptions = {
      from: EnvironmentVariables.FORGET_PASSWORD_EMAIL_SENDER,
      to: toEmail,
      subject: subject,
      text: message,
    };
    try {
      await transporter.sendMail(mailOptions);
      return null;
    } catch (error) {
      console.log("failed to send password reset email, error: ", error);
      return error;
    }
  }
}
