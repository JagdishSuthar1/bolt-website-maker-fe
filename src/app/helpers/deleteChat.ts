"use server"
import { prisma } from "@/lib/prisma";
import CheckAutenticated from "./checkAuthenticates";

export default async function DeleteChat(chatId : string) {
    const response = await CheckAutenticated();
    if(response.success == false || response.data == null) return {
                success : false,
                message : "Authorisation Error",
                data : null
    }
    else {
        
        try {
                await prisma.chat.delete({
                    where : {
                        id : chatId,
                        userId : response.data.id
                    }
                })
    
            return {
                success : true,
                message : "Data Received",
            }

        }
        catch (err) {
            console.log(err)
            return {
                success : false,
                message : "Database Error",
                data : null
            }
        }
    }
}