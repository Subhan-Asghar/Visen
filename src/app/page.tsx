"use client"
import {ModeToggle} from "@/components/theme-button"
import SignIn from "@/components/auth/signin"
import SignUp from "@/components/auth/signup"
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
export default function Home() {
  const router =useRouter()
  return (
    <>
    <h1>Home PAge</h1>
    <ModeToggle/>
    <SignIn></SignIn>
    <SignUp></SignUp>
    <Button  onClick={()=>router.push("/library")}>Library</Button>
    </>
  );
}
