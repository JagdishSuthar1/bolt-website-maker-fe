"use server"
import { prisma } from "@/lib/prisma";
import CheckAutenticated from "./checkAuthenticates";

export default async function getAllChats() {

    const response = await CheckAutenticated();
    if (response.success == false) return {
        success: false,
        message: "Authorisation Error",
        data: null
    }
    else {
        try {
            const userMessages = await prisma.user.findFirst({
                where: {
                    id: response.data?.id,
                },

                select: {
                    id : true,
                    chats: {
                        select : {
                            id  : true,
                            title : true
                        }
                    }
                }
            })

            return {
                success: true,
                message: "Messages Received",
                data: userMessages
            }

        }
        catch (err) {
            console.log(err)
            return {
                success: false,
                message: "Database Error",
                data: null
            }
        }
    }
}