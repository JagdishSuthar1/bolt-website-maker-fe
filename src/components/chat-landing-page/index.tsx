"use client"
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";


export default function ChatPage() {
  const router = useRouter();
  
  return (
    // <div className="/-h-screen min-w-screen">
        <Button onClick={()=>{router.push("/chat")}}>Chat</Button>
    // </div>
  );
}
