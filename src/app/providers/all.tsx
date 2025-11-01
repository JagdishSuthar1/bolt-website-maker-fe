import UserContextProvider from "../context/user";
import { childProps } from "../types/user";
import NextAuthProvider from "./next";

export default function AllProvider ({children} : childProps) {
    return (
        <NextAuthProvider>
            <UserContextProvider>
            {children}
            </UserContextProvider>
        </NextAuthProvider>
    )
}