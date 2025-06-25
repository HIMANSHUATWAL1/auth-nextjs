import { connectToDatabase } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

connectToDatabase();

export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json();

    const { username, email, password } = reqBody;

    console.log(reqBody);

    if (!username || !email || !password) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Check if user already exists

    const user = await User.findOne({ email });
    if (user) {
      return NextResponse.json(
        {
          error: "User already exists with this email",
        },
        { status: 400 }
      );
    }

    // hash Password-->

    const salt = await bcryptjs.genSalt(10);

    const hashPassword = await bcryptjs.hash(password, salt);

    // Create a new user-->

    const newUser = new User({
      username,
      email,
      password: hashPassword,
    });

    // Save the user to the database
    const savedUser = await newUser.save();

    console.log(savedUser);

    return NextResponse.json(
      {
        message: "User created successfully",
        success: true,
        savedUser
      },
      { status: 201 }
    );


  } catch (err: any) {
    return NextResponse.json(
      {
        error: err.message,
      },
      { status: 500 }
    );
  }
}
