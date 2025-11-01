"use server"
import { prisma } from "@/lib/prisma";
import CheckAutenticated from "./checkAuthenticates";

export default async function CreateMessage(chatId : string , userMessage : string, aiMessage : string) {
    const response = await CheckAutenticated();
    if(response.success == false) return {
                success : false,
                message : "Authorisation Error",
                data : null
    }
    else {
        try {
                const userChats = await prisma.message.create({
                
                    data : {
                            
                                        userMessage : userMessage,
                                        ai : aiMessage,
                                        chatId : chatId
                                    
                                
                    },

                    select : {
                        
                                        userMessage : true,
                                        ai : true
                                    
                                
                            

                        
                    }
                })
    
            return {
                success : true,
                message : "Data Received",
                data : userChats
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