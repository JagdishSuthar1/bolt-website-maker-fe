"use client"
import ChatboxLanding from "@/components/landing-page/chatbox";
import SidebarLanding from "@/components/landing-page/sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default function Home() {
    return (
            <div  className="bg-cover bg-center w-screen h-screen shadow-lg"
  style={{
    backgroundImage: "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80')"
  }}>
        <SidebarProvider className="w-full h-full">
        <SidebarLanding />
        <main className="w-full min-h-screen">
          <SidebarTrigger />
          <div className="flex justify-center pt-70 h-full">
            <ChatboxLanding />
          </div>
        </main>
      </SidebarProvider>
      </div>

    )
}
