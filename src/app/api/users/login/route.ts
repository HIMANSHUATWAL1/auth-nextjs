import { connectToDatabase } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connectToDatabase();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();

    const { email, password } = reqBody;

    console.log(reqBody);

    //if user exists or not-->

    const user = await User.findOne({ email });

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

    //if user exists, check password-->

    const isPasswordValid = await bcryptjs.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        {
          error: "Invalid password",
        },
        {
          status: 401,
        }
      );
    }

    // create token data--->

    const tokenData = {
      id: user._id,
      email: user.email,
      username: user.username,
    };

    // create token using jwt--->

    const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
      expiresIn: "1d",
    });

    // set to this token to users cookies--->

    const res = NextResponse.json({
      message: "Login successful",
      success: true,
    });

    res.cookies.set("token", token, {
      httpOnly: true,
    });

    return res;
    

  } catch (err: any) {
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
