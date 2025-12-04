"use client"
import React from 'react'
import Logout from '@/components/auth/logout'
import { VideoCard } from '@/components/library/video-card'
import { Spinner } from "@/components/ui/spinner"
import { GetVideos } from '@/hooks/user-videos'
import UploadVideo from "@/components/library/upload-video"
  
type videoType={
  id:number,
  videoTitle:string,
  videoUrl:string,
  posterUrl:string
}

const page = () => {
 const {data:videos,isError,isLoading}=GetVideos()

    if(isLoading){
      return(
        <div className='h-screen flex justify-center items-center'>
          <Spinner />
        </div>
      )
    }
    console.log(videos)
  return (
    <>
    Library
    <Logout></Logout>
    <UploadVideo/>
    <div className='flex flex-wrap '>
 {videos?.data && videos.data.map((item:videoType,) => (
  <div key={item.id}> 
    <VideoCard
      title={item.videoTitle}
      src={item.videoUrl}
      poster={item.posterUrl}
    />
  </div>
))}
    </div>
   
    </>
  )
}

export default page