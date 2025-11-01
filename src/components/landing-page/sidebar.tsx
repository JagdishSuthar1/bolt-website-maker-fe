"use client"
import Link from "next/link";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "../ui/sidebar";
import { useContext, useEffect, useState } from "react";
import { userContext } from "@/app/context/user";
import getAllChats from "@/app/helpers/getAllChats";
import { DeleteIcon } from "lucide-react";
import DeleteChat from "@/app/helpers/deleteChat";
import { toast } from "sonner";

export default function SidebarLanding() {

        const {userChats, setUserChats} = useContext(userContext)!;
        const [fetchChat , setFetchChat] = useState<Boolean>(true);

     async function chats() {
        try {
            const response = await getAllChats();
            setUserChats(response.data?.chats!)
            setFetchChat(false);

        }
        catch(err) {
            console.log(err)
        }
        }

    useEffect(()=>{

        if(fetchChat == true) {
            chats()
        } 
    }, [fetchChat])

return (
  <Sidebar className="bg-white/80 backdrop-blur-md shadow-lg rounded-xl">
    <SidebarContent className="p-3 font-sans text-gray-800">
      <SidebarGroup>
        <SidebarGroupLabel className="text-[17px] font-bold">
          Chats
        </SidebarGroupLabel>

        <SidebarGroupContent className="p-1 gap-3">
          <SidebarMenu>
            {userChats && userChats.length > 0 ? (
              userChats.map((item, index) => (
                <SidebarMenuItem
                  key={index}
                  className="flex gap-3 items-center hover:bg-blue-100 rounded-lg transition-all duration-200 p-2"
                >
                  <SidebarMenuButton asChild>
                    <Link
                      href={`/chat/${item.id}`}
                      className="text-[13px] font-semibold text-gray-800 hover:text-blue-600 transition-colors"
                    >
                      {item.title}
                    </Link>
                  </SidebarMenuButton>

                  <DeleteIcon
                    className="mt-1 text-gray-500 hover:text-red-500 hover:cursor-pointer transition-colors"
                    onClick={async () => {
                      const response = await DeleteChat(item.id);
                      if (response.success === true) {
                        toast.success("Chat Deleted");
                        setFetchChat(true);
                      } else {
                        toast.error("Chat Not Deleted");
                      }
                      setFetchChat(true);
                    }}
                  />
                </SidebarMenuItem>
              ))
            ) : (
              <p className="text-[13px] text-gray-500 italic">No data found</p>
            )}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
  </Sidebar>

)
}

