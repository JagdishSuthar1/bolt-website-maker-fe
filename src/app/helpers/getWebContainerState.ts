"use server"
import { prisma } from "@/lib/prisma";
import CheckAutenticated from "./checkAuthenticates";

export default async function getWebcontainerState(chatId : string) {
    const response = await CheckAutenticated();
    if(response.success == false) return {
                success : false,
                message : "Authorisation Error",
                data : null
    }
    else {
        try {
                const webState = await prisma.chat.findFirst({
                    where : {
                            id : chatId,                        
                    },
                     
                    select : {  
                        state : {
                            select : {
                                files : true
                            }
                        }
                    }
                })
    
            return {
                success : true,
                message : "files Received",
                data : webState
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