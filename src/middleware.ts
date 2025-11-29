import { NextResponse,NextRequest } from "next/server";
import { jwtVerify } from "jose";

export function middleware(req:NextRequest){
    const token = req.cookies.get("user_session")?.value;
    const path=req.nextUrl.pathname
    if(path.startsWith("/library")&& token){
        return NextResponse.next()
    }
    if (path.startsWith("/")&& token){
        return NextResponse.redirect(new URL("/library",req.url))
    }
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};