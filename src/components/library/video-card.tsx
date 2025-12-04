import {
    Card,
    CardAction,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { HeroVideoDialog } from "@/components/ui/hero-video-dialog"
import { CirclePlay } from 'lucide-react';

type VideoProps = {
    title: string,
    poster: string,
    src: string
}

export function VideoCard({ title, poster, src }: VideoProps) {
    return (
        <>
            <Card className="max-w-sm m-3 pb-1 ">
                <CardHeader>
                    <CardTitle>{title}</CardTitle>
                    <CardAction className="cursor-pointer"><CirclePlay size={"25"} className="hover:text-primary" /></CardAction>
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