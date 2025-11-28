import { NextRequest,NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import { db } from "@/db/db";
import { user } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function POST(req:NextRequest){
    try{

    const {name,email,password}=await req.json()
    const uuid = crypto.randomUUID();

    const mailValid=await db.select().from(user).
    where(eq(email,user.email))

    if (mailValid.length >0){
        return NextResponse.json({
            message:"User already Exist"
        },{status:400})
    }

    const salt= await bcrypt.genSalt(10);
    const hashPass=await bcrypt.hash(password,salt)

    const [new_user]= await db.insert(user).values({
        id:uuid,
        name,
        email,
        password:hashPass
    }).returning({id:user.id})


    const token=jwt.sign({ id: new_user.id },process.env.JWT_SECRET!,{
         expiresIn: "7d"
    })

    const res=NextResponse.json({message:"User Created "},{status:201})

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