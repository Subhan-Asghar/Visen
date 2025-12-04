import React from 'react'
import Logout from '@/components/auth/logout'
import { VideoCard } from '@/components/library/video-card'
const page = () => {
 
  return (
    <>
    Library
    <Logout></Logout>
    {/* <VideoCard src='https://youtu.be/O5HQ1sZseKg?si=PD6RAlkKKt2o1rkB' title='Music' poster='./vercel.svg'></VideoCard> */}
    </>
  )
}

export default page