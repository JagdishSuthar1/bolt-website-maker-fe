"use client";
import { userContext } from "@/app/context/user";
import { BoltAction, ChatMessages, FileSystemTree, Step } from "@/app/types/user";
import { useContext, useEffect, useRef, useState } from "react";
import { Card, CardContent } from "../ui/card";
import { ListChecksIcon, SendIcon, TicketCheckIcon } from "lucide-react";
import { toast } from "sonner";
import getWebcontainerState from "@/app/helpers/getWebContainerState";
import getMessages from "@/app/helpers/getAllMessages";
import { ScrollArea } from "../ui/scroll-area";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { axiosInstance } from "@/app/axiosInstance";
import { ResponseForTemplate } from "@/app/types/response";
import CreateMessage from "@/app/helpers/createMessage";
import { buildTreeUI } from "@/app/helpers/buildTree";
import UpdateWebContainerState from "@/app/helpers/updateWebContainerState";
import { Scrollbar } from "@radix-ui/react-scroll-area";
import xmltostring from "@/app/helpers/xmltostring";

// function xmlToString(xml : string, ind : number ,store : string , newStep : Step, boltActionOpenCome  : number, boltActionOpenClose: number , boltActionCloseCome : number) {
//         const n = xml.length;
//         if(ind == n) return;

//         let i = ind;

//         while(i < n){

//             if(boltActionOpenCome == 1 && xml[i] == ">") {
//                         let stepTitle = "";
//                         let dummy = store.split(" ");
//                         stepTitle = dummy[1].split("=")[1];
//                         newStep.content = stepTitle;
//                         boltActionOpenClose = 1;
//                         xmlToString(xml , i ,"",  newStep, boltActionOpenCome, boltActionOpenClose, boltActionCloseCome);
//                 }
//             if(boltActionOpenClose == 1 && xml[i] == "<") {
//                         let stepTitle = "";
//                         let dummy = store.split(" ");
//                         stepTitle = dummy[1].split("=")[1];
//                         newStep.content = stepTitle;
//                         boltActionOpenClose = 1;
//                         xmlToString(xml , i ,"",  newStep, boltActionOpenCome, boltActionOpenClose, boltActionCloseCome);
//                 }
//             else if(xml[i] != " " || boltActionOpenCome == 1 || boltActionOpenClose == 1) {
//                 store = store + xml[i];
//             }
//             else if(xml[i] == " " && store.length != 0) {
//                     if(store == "<boltAction" && boltActionOpenCome == 0) {
//                         boltActionOpenCome = 1;
//                         xmlToString(xml , i ,"",  newStep, boltActionOpenCome, boltActionOpenClose, boltActionCloseCome);
//                     }
//             }
//             i = i + 1;

//         }

//         return;

// }


export default function UserBlock({ id }: { id: string }) {
  const { allMessages, setAllMessages, setWebContainerState, webContainerState } = useContext(userContext)!;
  const [updateTheStates, setUpdateTheStates] = useState<Boolean>(true);
  const userprompt = useRef<HTMLInputElement | null>(null)
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  async function followBackPromptResponseFromAi(payload: string, prompt: string) {
    try {
      const response = await axiosInstance.post("/follow-back-prompt", { lastWebcontainerState: payload, userPrompt: prompt });

      console.log(response.data)
      //removing the unwanted characters

      const modifiedXML = response.data.message.slice(7, -4);
      await UpdateWebContainerState(id, modifiedXML)
      setWebContainerState(modifiedXML);
      //we got the xml file in response , now we convert into steps
      const correctedXML = await xmltostring(modifiedXML);
      console.log(correctedXML)
      //here i am updating the state of the webContainer
      //here i am creating the message of user and ai(first message)
      await CreateMessage(id, prompt, JSON.stringify(correctedXML))
      setUpdateTheStates(true);
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

  useEffect(() => {
    if (updateTheStates == true) {
      async function getwebtateAndMessages() {
        const messages = await getMessages(id);
        //  console.log(messages)

        if (messages.data != null) {
          let allMessagesFromResponse = [];
          for (let i = 0; i < messages.data.messages.length; i++) {
            const newMessage = {
              user: messages.data.messages[i].userMessage,
              ai: JSON.parse(messages.data.messages[i].ai)
            }
            allMessagesFromResponse.push(newMessage)
          }

          console.log("converted Messages :", allMessagesFromResponse)
          setAllMessages(allMessagesFromResponse);
        }
      }

      getwebtateAndMessages()
      setUpdateTheStates(false);
    }

  }, [updateTheStates]);


  return (
 <div className="flex flex-col h-full w-full p-4 space-y-4">
      
      {/* --- Chat History Area --- */}
      {/* Set h-full on ScrollArea and its container to ensure it fills the flex-1 space */}
      <Card className="flex-1 min-h-0 shadow-lg border-gray-200">
        <ScrollArea className="h-full">
          <CardContent className="flex flex-col gap-6 p-4">
            {allMessages?.map((item, index) => (
              <div className="flex flex-col gap-4" key={index}>
                
                {/* User Message (Right Aligned) */}
                <div className="flex justify-end items-end gap-3">
                    {/* User Message Bubble */}
                    <div className="max-w-[80%] lg:max-w-[70%] bg-indigo-600 text-white p-3 rounded-xl rounded-br-sm shadow-md break-words">
                        <p className="text-sm font-medium">{item.user}</p>
                    </div>
                    {/* User Avatar */}
                    <Avatar className="h-8 w-8">
                        <AvatarImage src="https://ui.shadcn.com/avatars/03.png" alt="User Avatar" />
                        <AvatarFallback className="bg-indigo-200 text-indigo-700 font-bold text-sm">U</AvatarFallback>
                    </Avatar>
                </div>

                {/* AI Response (Left Aligned) */}
                <div className="flex justify-start items-start gap-3">
                    {/* AI Avatar */}
                    <Avatar className="h-8 w-8">
                        <AvatarImage src="https://ui.shadcn.com/avatars/05.png" alt="AI Avatar" />
                        <AvatarFallback className="bg-gray-200 text-gray-700 font-bold text-sm">AI</AvatarFallback>
                    </Avatar>
                    
                    {/* AI Steps Container */}
                    <div className="max-w-[80%] lg:max-w-[70%] flex flex-col gap-1 p-3 bg-gray-100 rounded-xl rounded-tl-sm shadow-sm border border-gray-200">
                        {item.ai.map((newItem, stepIndex) => (
                            <div 
                                key={stepIndex} 
                                className={`flex items-start gap-2 p-2 rounded-lg transition-colors 
                                    ${newItem.status === "Pending" 
                                        ? "bg-white border border-indigo-300 shadow-sm" 
                                        : "bg-green-50 border border-green-300"}`}
                            >
                                {/* Status Icon */}
                                <div className={`flex-shrink-0 mt-1 ${newItem.status === "Pending" ? "text-indigo-500" : "text-green-600"}`}>
                                    {newItem.status === "Pending" ? (
                                        <TicketCheckIcon className="h-4 w-4" />
                                    ) : (
                                        <ListChecksIcon className="h-4 w-4" />
                                    )}
                                </div>
                                {/* Step Title */}
                                <p className={`text-sm font-medium break-words ${newItem.status === "Pending" ? "text-gray-800" : "text-green-800"}`}>
                                    {newItem.title}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
              </div>
            ))}
            
            {/* Scroll Anchor */}
            <div ref={messagesEndRef} />
            
          </CardContent>
        </ScrollArea>
      </Card>
      
      {/* --- Input Area --- */}
      <Card className="w-full h-auto shadow-xl border-gray-300">
        <CardContent className="flex gap-4 p-4 items-center">
          <Input 
            ref={userprompt} 
            className="flex-1 h-12 text-base border-indigo-300 focus:border-indigo-500 rounded-lg shadow-inner"
            placeholder="Ask AI for help or provide instructions (e.g., 'Change the button color to red')" 
            onKeyDown={(e) => {
                if (e.key === 'Enter' && webContainerState != null && userprompt.current != null) {
                    e.preventDefault(); 
                    document.getElementById('send-prompt-button')?.click();
                }
            }}
          />
          <Button 
            id="send-prompt-button"
            onClick={async () => {
              if (webContainerState != null && userprompt.current != null && userprompt.current.value.trim() !== "") {
                console.log("re-prompting...")
                await followBackPromptResponseFromAi(webContainerState, userprompt.current.value)
                userprompt.current.value = ""
              } else if (userprompt.current != null && userprompt.current.value.trim() === "") {
                toast.error("Please enter a message to the AI.");
              }
            }} 
            className="h-12 w-12 bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-md transition-all active:scale-95"
          >
            <SendIcon className="h-5 w-5" />
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
