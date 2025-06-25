import { getDataFromToken } from "@/helpers/getDataFromToken";
import { NextResponse, NextRequest } from "next/server";
import User from "@/models/userModel";
import { connectToDatabase } from "@/dbConfig/dbConfig";

connectToDatabase();

export async function GET(req: NextRequest) {
  try {
    const userId = await getDataFromToken(req);

    const user = await User.findOne({ _id: userId }).select("-password -__v");

    return NextResponse.json(
        {
           data: user,
           message: "User details fetched successfully"
        
        }
    );


  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
