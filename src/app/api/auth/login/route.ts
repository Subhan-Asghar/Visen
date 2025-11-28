import { NextResponse,NextRequest } from "next/server";
import { db } from "@/db/db";
import { user } from "@/db/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"

export async function POST(req:NextRequest){
    try{
        const {email,password}=await req.json()
        const get_user=await db.select().from(user)
        .where(eq(email,user.email))

        if(!(get_user.length>0)){
            return NextResponse.json({
                message:"Invalid email or password"
            })
        }
        const check =await bcrypt.compare(password,get_user[0].password)
        if (!check){
            return NextResponse.json({
                message:"Invalid email or password"
            })
        }
        const token=jwt.sign({ id: get_user[0].id },process.env.JWT_SECRET!,{
                 expiresIn: "7d"
            })
        
            const res=NextResponse.json({message:"User Login"},{status:200})
        
            res.cookies.set("user_id",token,{
                httpOnly:true,
                path:'/',
                maxAge: 60 * 60 * 24 * 7
            })
            return res  
    }
    catch{
         return NextResponse.json({message:"Server Error"},{status:500})
    }
}

export async function DELETE(){
    try{
        const res=NextResponse.json({message:"User LogOut"},{status:200})

        res.cookies.set("user_id","",{
                httpOnly:true,
                path:'/',
                maxAge: 0
            })

         return res
    }
    catch{
         return NextResponse.json({message:"Server Error"},{status:500})
    }
}