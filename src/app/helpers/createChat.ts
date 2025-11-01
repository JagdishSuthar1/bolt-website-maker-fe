"use server"
import { prisma } from "@/lib/prisma";
import CheckAutenticated from "./checkAuthenticates";

export default async function CreateChat(title : string) {
    const response = await CheckAutenticated();
    if(response.success == false || response.data == null) return {
                success : false,
                message : "Authorisation Error",
                data : null
    }
    else {
        
        try {
                const userChats = await prisma.chat.create({
                   
                    data : {
                        title : title,
                        userId : response.data?.id
                             
                    }
                    ,
                    select : {    
                       id : true
                    }
                })
    
            return {
                success : true,
                message : "Data Received",
                data : userChats.id
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