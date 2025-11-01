"use client"
import { SessionProvider } from "next-auth/react";
import { childProps } from "../types/user";

export default function NextAuthProvider({children} : childProps) {
    return (
        <SessionProvider>
            {children}
        </SessionProvider>
    )
}