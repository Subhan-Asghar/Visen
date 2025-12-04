import {
    Card,
    CardAction,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { HeroVideoDialog } from "@/components/ui/hero-video-dialog"
import { Play } from 'lucide-react';
import { Button } from "../ui/button";

type VideoProps = {
    title: string,
    poster: string,
    src: string
}

export function VideoCard({ title, poster, src }: VideoProps) {
    return (
        <>
            <Card className="max-w-sm m-3 pb-1">
                <CardHeader>
                    <CardTitle>{title}</CardTitle>
                    <CardAction className="cursor-pointer">
                        <button
                            type="button"
                            aria-label="Play video"
                            className="group relative cursor-pointer border-0 bg-transparent p-0"

                        >
                            <div
                                className="from-primary/30 to-primary relative flex size-10 scale-100 items-center justify-center rounded-full bg-gradient-to-b shadow-md transition-all duration-200 ease-out group-hover:scale-[1.1]"
                            >
                                <Play
                                    className="size-5 scale-100 fill-white text-white transition-transform duration-200 ease-out group-hover:scale-110"
                                />
                            </div>
                        </button>

                    </CardAction>
                </CardHeader>
                <CardContent className="px-1 ">
                    <div className="relative ">
                        <HeroVideoDialog
                            className="block dark:hidden"
                            animationStyle="top-in-bottom-out"
                            videoSrc={src}
                            thumbnailSrc={poster}
                            thumbnailAlt={title}
                        />
                        <HeroVideoDialog
                            className="hidden dark:block "
                            animationStyle="top-in-bottom-out"
                            videoSrc={src}
                            thumbnailSrc={poster}
                            thumbnailAlt={title}
                        />
                    </div>
                </CardContent>
            </Card>
        </>
    )
}