import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = NextResponse.json({
      message: "Logout successful",
      success: true,
    });

    res.cookies.set(
      "token",
      "",
      {
        httpOnly: true,
        expires: new Date(0),
      } // Set expiration to the past to clear the cookie
    );
    
    return res;



  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
