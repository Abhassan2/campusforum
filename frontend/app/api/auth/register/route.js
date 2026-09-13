import clientServer from "@/app/config/clientServer";
import axios from "axios";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();

    const res = await clientServer.post(`/api/user/register`, 
      body,
      { headers: { "Content-Type": "application/json" } }
    );

    const cookieStore = await cookies();

    cookieStore.set("token", res.data.token, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 2,
    });

    return NextResponse.json(res.data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return NextResponse.json(
        {
          message: error.response?.data?.message || "Request failed",
        },
        {
          status: error.response?.status || 500,
        }
      );
    }
    
    return NextResponse.json({
      message: error.response?.data?.message,
    });
  }
}