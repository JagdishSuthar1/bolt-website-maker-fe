"use client"
import { createContext, Dispatch, ReactNode, SetStateAction, useState } from "react";
import { ChatMessages, childProps, Step, UserChatType, UserProvider} from "../types/user";


export const userContext = createContext<UserProvider | null>(null);

export default function UserContextProvider({children} : childProps) {
    const [allMessages, setAllMessages] = useState<ChatMessages[] | null>(null);
    const [userPrompt , setUserPrompt] = useState<string>("");
    const [userChats, setUserChats] = useState<UserChatType[]>([])
    const [webContainerState , setWebContainerState] = useState<string | null>(null)
    return (
        <userContext.Provider value={{allMessages, setAllMessages, userPrompt , setUserPrompt,userChats, setUserChats, webContainerState , setWebContainerState}}>
            {children}
        </userContext.Provider>
    )
}
