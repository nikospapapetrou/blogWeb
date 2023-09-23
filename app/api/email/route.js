import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request) {
  try {
    const data = await request.json();
    const { name, email, message } = data;
    var transporter = nodemailer.createTransport({
      host: "smtppro.zoho.eu",
      port: 465,
      secure: true,
      auth: {
        user: "contact@nikospap.blog",
        pass: "yWZXEtsrr6Dj",
      },
    });
    var mailOptions = {
      from: "contact@nikospap.blog",
      to: "contact@nikospap.blog",
      subject: name,
      text: `Message from ${name}: ${email} \n \n Message: \n \n ${message}`,
    };
    await transporter.sendMail(mailOptions);
    return NextResponse.json({ name, email, message }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to Send Email" },
      { status: 500 }
    );
  }
}
