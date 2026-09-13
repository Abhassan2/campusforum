import clientServer from "@/app/config/clientServer";
import axios from "axios";
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
      maxAge: 60 * 60 * 24 * 2,
    });

    return NextResponse.json(data);
    
  } catch(error) {
    if (axios.isAxiosError(error) && error.response) {
      return NextResponse.json(
        { message: error.response.data.message},
        { status: error.response.status }
      );
    }

    return NextResponse.json(
      { message: 'Unable to reach server' },
      { status: 500 }
    );
  }
}
