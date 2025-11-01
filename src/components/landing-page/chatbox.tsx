"use client"
import { PlusIcon, Router, SendIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Input } from "../ui/input";
import { useContext, useEffect, useRef } from "react";
import { axiosInstance } from "@/app/axiosInstance";
import { toast, Toaster } from "sonner";
import { userContext } from "@/app/context/user";
import { useRouter } from "next/navigation";
import { XMLParser } from "fast-xml-parser";
import { BoltAction, ChatMessages, Step } from "@/app/types/user";
import { useSession } from "next-auth/react";
import CreateChat from "@/app/helpers/createChat";

import CreateMessage from "@/app/helpers/createMessage";
import UpdateWebContainerState from "@/app/helpers/updateWebContainerState";
import xmltostring from "@/app/helpers/xmltostring";
import { ResponseForTemplate } from "@/app/types/response";
import { buildTreeUI } from "@/app/helpers/buildTree";


export default function ChatboxLanding() {
  const session = useSession();

  const router = useRouter();

  // if(session == null || session.data?.user != null) {
  //     return 
  // }


  const { setUserPrompt, userChats, setUserChats, allMessages, setAllMessages } = useContext(userContext)!;
  const prompt = useRef<HTMLInputElement | null>(null)




  async function handlePrompt(userPrompt: string) {
    try {
      const response = await axiosInstance.post("/template", {
        userPrompt
      })

      console.log(response.data);
      return response.data.message.prompts
    }
    catch (err) {
      console.log(err);
      return { BASE_PROMPT: "", uiPrompt: "", userPrompt: "" }
    }
  }






  

  async function promptResponseFromAi(payload: ResponseForTemplate, prompt: string, chatId : string) {
    try {
      const response = await axiosInstance.post("/take-prompt", { ...payload, userPrompt: prompt });

      //removing the unwanted characters
      const modifiedXML = response.data.message.slice(7, -4);

      //we got the xml file in response , now we convert into steps
      await UpdateWebContainerState(chatId,modifiedXML);
      
      const correctedXML = await xmltostring(modifiedXML);
      console.log(correctedXML)
      //here i am updating the state of the webContainer
      //here i am creating the message of user and ai(first message)
      await CreateMessage(chatId, prompt, JSON.stringify(correctedXML))
      // if (messageResponse.data != null) {

      //   let messages: ChatMessages[] = [];
      //   for (let i = 0; i < messageResponse.data.messages.length; i++) {
      //     const obj = {
      //       user: messageResponse.data.messages[i].userMessage,
      //       ai: JSON.parse(messageResponse.data.messages[i].ai)
      //     }

      //     messages.push(obj);
      //   }

      //   //now i am setting the message(updating the state)
      //   setAllMessages(messages);
      // }

    } catch (err) {
      console.log(err)
      toast.error("Ai Model is not Running");
    }
  }

async function handleSendPrompt() {
  if (prompt.current != null && prompt.current.value.trim() !== "") {
    setUserPrompt(prompt.current.value);
    console.log(prompt.current.value);

    const chats = await CreateChat(prompt.current.value);
    console.log(chats);

    if (chats.success === false) {
      if (chats.message === "Authorisation Error") router.push("/");
      else toast.error("Chat not Created");
    } else if (chats.success === true && chats.data != null) {
      const response = await handlePrompt(prompt.current.value);
      console.log("response", { ...response, userPrompt: prompt.current.value });

      const chatId = chats.data;
      const response2 = await promptResponseFromAi(
        response,
        prompt.current.value,
        chatId
      );
      router.push(`/chat/${chatId}`);
    }
  } else {
    toast.error("Prompt is Empty. Write Correct Prompt");
  }
}


return (
  <div
    className="w-130 h-45 bg-cover bg-center rounded-2xl shadow-lg"
    style={{
      backgroundImage:
      "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80')",
    }}
    >
    <Toaster />
    <div className="bg-white/70 backdrop-blur-sm p-4 rounded-2xl">
      <Card>
        <CardHeader className="text-[15px] font-semibold">
          Create Any Website by Just Prompting..
        </CardHeader>
        <CardContent>
          <div className="flex gap-3">
            <Input
              ref={prompt}
              className="h-19"
              placeholder="What you are creating today? Just paste your thoughts."
              onKeyDown={async (e) => {
                if (e.key === "Enter") {
                  await handleSendPrompt();
                }
              }}
            />
            <div className="flex flex-col gap-1 justify-end">
              <Button onClick={handleSendPrompt}>
                <SendIcon />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
)
}