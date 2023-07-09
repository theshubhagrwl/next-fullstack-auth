import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import { sendEmail } from "@/helpers/mailer";

connect();

export async function POST(request: NextRequest) {
  const reqBody = await request.json();
  console.log(reqBody);
  const { email } = reqBody;
  console.log(email);

  //find user with email
  const user = await User.findOne({ email });

  if (!user) {
    return NextResponse.json(
      {
        error: "User not found",
      },
      { status: 400 }
    );
  }

  await sendEmail({ email, emailType: "RESET", userId: user._id });

  return NextResponse.json({
    message: "Email sent",
    success: true,
  });
}
