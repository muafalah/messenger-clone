import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

import prisma from "@/libs/prismadb";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, password } = body;

    if (!name || !email || !password) {
      return new NextResponse("Missing info", { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        hashedPassword,
      },
    });

    return NextResponse.json(user, { status: 201 });
  } catch (error: any) {
    console.log("[REGISTRATION_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
