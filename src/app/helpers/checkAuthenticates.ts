"use server"
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";


export default async function CheckAutenticated() {

    const session = await getServerSession()
    if (session != null && session.user?.email != null) {
        try {
            const userData = await prisma.user.findFirst({
                where: {
                    email: session.user.email
                }
            })

            if (userData) {
                return {
                    success: true,
                    message: "Authenticated",
                    data: userData
                }
            }
            return {
                success: false,
                message: "Sign in First",
                data: null
            }
        }
        catch (err) {
            return {
                success: false,
                message: "Sign in First",
                data: null
            }
        }
    }

    else {
        return {
            success: false,
            message: "Sign in First",
            data: null
        }
    }

}