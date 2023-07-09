import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/helpers/mailer";

connect();

export async function POST(request: NextRequest) {
  const reqBody = await request.json();
  const { password, token } = reqBody;
  console.log({ password, token });

  const hashedPassword = await bcryptjs.hash(password.toString(), 10);

  //find user with password token
  const user = await User.findOne({
    forgotPasswordToken: token,
    forgotPasswordTokenExpiry: { $gt: Date.now() },
  });
  console.log(user);

  if (!user) {
    return NextResponse.json(
      {
        error: "Invalid token",
      },
      { status: 400 }
    );
  }

  user.forgotPasswordToken = undefined;
  user.forgotPasswordTokenExpiry = undefined;
  user.password = hashedPassword;
  await user.save();
  console.log(user);

  return NextResponse.json({
    message: "Password Changed Successfully",
    success: true,
  });
}
