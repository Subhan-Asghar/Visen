"use client"

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner"
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
export default function SignUp() {
    const [name, setName] = useState<string>()
    const [email, setEmail] = useState<string>()
    const [pass, setPass] = useState<string>()
    const [dis, setDis] = useState<boolean>(false)
    const router = useRouter()
    const { mutateAsync } = useMutation({
        mutationFn: async () => {
            const data = {
                name: name,
                email: email,
                password: pass
            }
            const res = await axios.post("/api/auth/signup", data)
            return res.data
        }
    })

    const submit = async (e: React.FormEvent<HTMLFormElement>) => {
        try {
            e.preventDefault();
            if (!pass || pass.length < 8) {
                toast.info("Password must be at least 8 characters")
                return
            }
            setDis(true)
            await mutateAsync()
            toast.success("Account created successfully!");
            setTimeout(() => router.push("/library"), 500);

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
                <Button variant="outline">Sign up</Button>
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
                        <DialogTitle className="sm:text-center">
                            Create new account
                        </DialogTitle>
                        <DialogDescription className="sm:text-center">
                            We just need a few details to get you started.
                        </DialogDescription>
                    </DialogHeader>
                </div>

                <form className="space-y-5" onSubmit={submit}>
                    <div className="space-y-4">
                        <div className="*:not-first:mt-2">
                            <Label htmlFor={`name`}>Full name</Label>
                            <Input
                                id={`name`}
                                placeholder="Matt Welsh"
                                required
                                type="text"
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
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
                    <Button className="w-full" type="submit" disabled={dis}>
                        Sign up
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
}
