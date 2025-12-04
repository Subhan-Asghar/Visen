import { NextResponse,NextRequest } from "next/server";
import { jwtVerify } from "jose";

export async function proxy(req:NextRequest){
    const token = req.cookies.get("user_session")?.value;
    const path=req.nextUrl.pathname
   
    if (!token){
      return NextResponse.redirect(new URL("/",req.url))
    }

    if (path ==="/" && token){
        return NextResponse.redirect(new URL("/library",req.url))
    }

    try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);
    const requestHeaders = new Headers(req.headers);

    requestHeaders.set("user-id", payload.id as string);

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  } catch {
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

export const config = {
  matcher: [
    "/",
    '/library/:path*',
    '/api/video/:path*'
  ],
};