import clientServer from "@/app/config/clientServer";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();

    const { data } = await clientServer.post(`/api/user/login`, 
      body,
      { headers: { "Content-Type": "application/json" } }
    );

    const cookieStore = await cookies();

    cookieStore.set("token", data.token, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
    });

    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ message: "Login failed" }, { status: 500 });
  }
}
