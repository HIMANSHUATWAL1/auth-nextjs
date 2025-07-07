import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { sendEmail } from "@/helpers/mailor";
import jwt from "jsonwebtoken";

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();
    const reqBody = await req.json();

    const { email } = reqBody;

    console.log(reqBody);

    const user = await User.findOne({ email });

    // if user exist or not--->

    if (!user) {
      return NextResponse.json(
        {
          error: "User not found",
        },
        {
          status: 404,
        }
      );
    }

    console.log(user);

    // Generate new token for security
    const tokenData = {
      id: user._id,
      email: user.email,
      username: user.username,
    };

    const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
      expiresIn: "1d",
    });

    user.forgotPasswordToken = token;
    user.forgotPasswordTokenExpire = Date.now() + 3600000;

    await user.save();

    // send mail to mailtraper-->

    await sendEmail({
      email: user.email,
      emailType: "RESET",
      userId: user._id,
    });

    console.log("reset Link send :");
    

    return NextResponse.json(
      { message: "Reset link sent to email" },
      { status: 200 }
    );

  } catch (err: any) {
    console.log("forgot password route error :---> \n" + err);

    return NextResponse.json(
      { error: err.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
