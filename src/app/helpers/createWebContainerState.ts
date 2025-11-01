"use server"
import { prisma } from "@/lib/prisma";
import CheckAutenticated from "./checkAuthenticates";

export default async function createWebContainerState(chatId : string , files : string) {
    
    const response = await CheckAutenticated();
    if(response.success == false) return {
                success : false,
                message : "Authorisation Error",
                data : null
    }
    else {
        try {
                const newState = await prisma.webContainerState.create({
                    data : {
                                chatId : chatId,
                                files : files
                            
                        }
                    
            ,

                    select : {
                        
                                files : true
                            
                        
                    }
                
                })
    
            return {
                success : true,
                message : "Updated the State",
                data : newState
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