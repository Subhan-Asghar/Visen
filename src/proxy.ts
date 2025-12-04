import { NextResponse,NextRequest } from "next/server";
import { jwtVerify } from "jose";

export function proxy(req:NextRequest){
    const token = req.cookies.get("user_session")?.value;
    const path=req.nextUrl.pathname
   
    if (!token){
      return NextResponse.redirect(new URL("/",req.url))
    }

    if (path ==="/" && token){
        return NextResponse.redirect(new URL("/library",req.url))
    }
  
}

export const config = {
  matcher: [
    "/",
    '/library/:path*'
  ],
};