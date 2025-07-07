import nodemailer from "nodemailer";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";

export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    // create a hashed token--->
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);

    // token  are updated for  verify token ---->

    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpire: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
      });
    }

    var transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: "yahoo@gmail.com",
      to: email,
      subject:
        emailType === "VERIFY" ? "Verify Your Email" : "Reset Your Password",

      html: `<p>Click <a href="${
        process.env.domain
      }/verifyEmail?token=${hashedToken}">here</a> to ${
        emailType === "VERIFY" ? "verify your email" : "reset your password"
      } Or copy and paste URL to your Browser.
       <br>
       ${process.env.domain}//${
        emailType == "VERIFY" ? "verifyEmail" : "changePassword"
      }?token=${hashedToken} 
      </p>`,
    };

    // send a email

    const mailRes = await transport.sendMail(mailOptions);

    return mailRes;
  } catch (error: any) {
    console.error("Error sending email:", error.message);
    throw new Error(error.message);
  }
};
