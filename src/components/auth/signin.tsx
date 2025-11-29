"use client"

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner"
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios"
import { useMutation } from '@tanstack/react-query'
import { useRouter } from "next/navigation";

export default function SignIn() {
const [email, setEmail] = useState<string>()
    const [pass, setPass] = useState<string>()
    const [dis, setDis] = useState<boolean>(false)
    const router = useRouter()
    const { mutateAsync } = useMutation({
        mutationFn: async () => {
            const data = {
                email: email,
                password: pass
            }
            const res = await axios.post("/api/auth/login", data)
            return res.data
        }
    })

    const submit = async (e: React.FormEvent<HTMLFormElement>) => {
        try {
            e.preventDefault();
            setDis(true)
            await mutateAsync()
            toast.success("User Login");
            setTimeout(() => router.push("/dashboard"), 500);
          

        }
        catch (err) {
        const errorMessage = axios.isAxiosError(err) 
      ? err.response?.data?.message || "Something went wrong"
      : "Network error occurred";
        toast.error(errorMessage);
        }
        finally {
            setDis(false)
        }
    }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Sign in</Button>
      </DialogTrigger>
      <DialogContent className="w-[425px]">
        <div className="flex flex-col items-center gap-2">
          <div
            aria-hidden="true"
            className="flex size-11 shrink-0 items-center justify-center rounded-full border"
          >
            <svg
              aria-hidden="true"
              className="stroke-zinc-800 dark:stroke-zinc-100"
              height="20"
              viewBox="0 0 32 32"
              width="20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="16" cy="16" fill="none" r="12" strokeWidth="8" />
            </svg>
          </div>
          <DialogHeader>
            <DialogTitle className="sm:text-center">Welcome back</DialogTitle>
            <DialogDescription className="sm:text-center">
              Enter your credentials to login to your account.
            </DialogDescription>
          </DialogHeader>
        </div>

        <form className="space-y-5" onSubmit={submit}>
          <div className="space-y-4">
            <div className="*:not-first:mt-2">
              <Label htmlFor={`email`}>Email</Label>
              <Input
                id={`email`}
                placeholder="hi@yourcompany.com"
                required
                type="email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="*:not-first:mt-2">
              <Label htmlFor={`password`}>Password</Label>
              <Input
                id={`password`}
                placeholder="Enter your password"
                required
                type="password"
                onChange={(e) => setPass(e.target.value)}
              />
            </div>
          </div>
          <div className="flex justify-between gap-2">
            <div className="flex items-center gap-2">
              <Checkbox id={`remember`} />
              <Label
                className="font-normal text-muted-foreground"
                htmlFor={`remember`}
              >
                Remember me
              </Label>
            </div>
            <a className="text-sm underline hover:no-underline" href="#">
              Forgot password?
            </a>
          </div>
          <Button className="w-full " type="submit" disabled={dis} >
            Sign in
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
