import { Dispatch, ReactNode, SetStateAction } from "react"

export type Step = {
    title : string, 
    status : "Pending" | "Complete",
    content : string,
}

export type ChatMessages = {
    user : string,
    ai : Step[]
}

export type UserProvider  = {
    allMessages : ChatMessages[] | null, 
    setAllMessages : Dispatch<SetStateAction<ChatMessages[] | null>>,
    userPrompt  : string, 
    setUserPrompt : Dispatch<SetStateAction<string>>,
    userChats : UserChatType[] , 
    setUserChats : Dispatch<SetStateAction<UserChatType[]>>,
    webContainerState  : string | null,
    setWebContainerState : Dispatch<SetStateAction<string | null>>
}

export type childProps = {
    children : ReactNode
}

export type BoltAction = {
  type: string;
  filePath: string;
  content: string;
};

export type UserChatType = {
        id: string;
        title: string;
}

export interface FileSystemTree {
  [name: string]: DirectoryNode | FileNode;
}

interface DirectoryNode {
  directory: FileSystemTree;
}

interface FileNode {
  file: {
    contents: string | Uint8Array;
  };
}