import {ModeToggle} from "@/components/theme-button"
import SignIn from "@/components/auth/signin"
import SignUp from "@/components/auth/signup"
export default function Home() {
  return (
    <>
    <h1>Home PAge</h1>
    <ModeToggle/>
    <SignIn></SignIn>
    <SignUp></SignUp>
    
    </>
  );
}
