import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { token } = await req.json();

    if (!token || typeof token !== "string") {
      return NextResponse.json({ data: { errorMessage: "Token inválido." }}, { status: 400 });
    }

    const cookieStore = await cookies();
    cookieStore.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 6
    });

    return new NextResponse(null, { status: 204});
  } catch (error) {
    console.error("Failed to set token cookie:", error);
    return NextResponse.json({ data: { errorMessage: "Erro ao inserir token." }}, { status: 500 });
  }
}