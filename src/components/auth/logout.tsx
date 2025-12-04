"use client"
import React from 'react'
import axios from 'axios'
import { Button } from '../ui/button'
import { useRouter } from 'next/navigation'
const Logout = () => {
    const router=useRouter()
    const submit=async()=>{
        try{
            await axios.delete("/api/auth/login")
            router.push("/")
            router.refresh();
        }
        catch{
            console.log("Something went wrong ")
        }
    }
  return (
    <>
    <Button variant={"default"} onClick={submit}>Logout</Button>
   
    </>
  )
}

export default Logout