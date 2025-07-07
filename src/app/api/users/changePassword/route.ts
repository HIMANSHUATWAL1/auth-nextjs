import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";

export async function POST(req: NextRequest) {
  try {
    connectToDatabase();

    const reqBody = await req.json();

    const { password, token } = reqBody;

    console.log(reqBody);

    if (!token) {
      return NextResponse.json(
        {
          error: "token not found",
        },
        {
          status: 500,
        }
      );
    }

    const user = await User.findOne({
      forgotPasswordToken: token,
      forgotPasswordTokenExpire: { $gt: Date.now() },
    });

    if (!user) {
      return NextResponse.json(
        {
          error: "Invalid Token",
        },
        { status: 400 }
      );
    }

    // hashing new Password :----->

    const salt = await bcryptjs.genSalt(10);

    const hashPassword = await bcryptjs.hash(password, salt);

    user.password = hashPassword;
    user.forgotPasswordToken = undefined;
    user.forgotPasswordTokenExpire = undefined;
    await user.save();

    return NextResponse.json(
      { message: "Password changed successfully" },
      { status: 200 }
    );
    
  } catch (err: any) {
    console.log(err);
    return NextResponse.json(
      {
        error: err.message,
      },
      {
        status: 500,
      }
    );
  }
}
