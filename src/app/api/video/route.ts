import { NextResponse, NextRequest } from "next/server";
import { createClient } from "@supabase/supabase-js"
import { db } from "@/db/db";
import { videos } from "@/db/schema";
import { eq } from "drizzle-orm";

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: NextRequest) {
    try {
        const id = req.headers.get("user-id")
        if (!id) {
            return NextResponse.json({ error: "Missing user ID" }, { status: 400 });
        }

        const formData = await req.formData()


        const video = formData.get("video") as File;
        const poster = formData.get("poster") as File;
        const videoTitle = formData.get("title") as string | null;

        const videoBuffer = Buffer.from(await video.arrayBuffer());
        const posterBuffer = Buffer.from(await poster.arrayBuffer());
        const videoFileName = `${Date.now()}-${video.name}`;
        const posterFileName = `${Date.now()}-poster.jpg`;

        const { error: videoError } = await supabase.storage
            .from("videos")
            .upload(videoFileName, videoBuffer, {
                contentType: video.type,
            });

        if (videoError) throw videoError;

        const { error: posterError } = await supabase.storage
            .from("posters")
            .upload(posterFileName, posterBuffer, {
                contentType: "image/jpeg",
            });

        if (posterError) throw posterError;

        const { data: videoUrlData } = supabase.storage
            .from("videos")
            .getPublicUrl(videoFileName);

        const { data: posterUrlData } = supabase.storage
            .from("posters")
            .getPublicUrl(posterFileName);

        const videoUrl = videoUrlData.publicUrl;
        const posterUrl = posterUrlData.publicUrl;

        const uuid = crypto.randomUUID();
        await db.insert(videos).values({
            id: uuid,
            videoTitle: videoTitle,
            videoUrl: videoUrl,
            posterUrl: posterUrl,
            user_id: id
        })
        return NextResponse.json({ messgae: "Upload successful" }, { status: 200 })
    }
    catch {
        return NextResponse.json({ message: "Server Error" }, { status: 500 })
    }

}

export async function GET(req: NextRequest) {
    try {
        const id = req.headers.get("user-id")
        if (!id) {
            return NextResponse.json({ error: "Missing user ID" }, { status: 400 });
        }

        const data=await db.select().from(videos).where(eq(videos.user_id,id))
        return NextResponse.json({
            data:data
        },{status:200})
    }
    catch {
        return NextResponse.json({ message: "Server Error" }, { status: 500 })
    }
}