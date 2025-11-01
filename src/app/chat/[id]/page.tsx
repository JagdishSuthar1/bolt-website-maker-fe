import UserBlock from "@/components/user-chat-page/user";
import { Card, CardHeader } from "@/components/ui/card";
import WebContainerBlock from "@/components/webContainerPage";


export default function Home({params} : {params : {id : string}}) {
    const chatId = params?.id
    return (
         <div className="w-screen h-screen flex flex-col p-4 md:p-6 bg-gray-100" style={{ fontFamily: 'Inter, sans-serif' }}>
            
            <Card className="h-12 flex-shrink-0 mb-4 shadow-xl border-indigo-200 flex p-0 ">
                <CardHeader className="text-center text-[17px] font-extrabold text-indigo-700 p-2 pt-3  hover:text-blue-600 transition-colors">
                    Your Collaborative App Workspace is Live
                </CardHeader>
            </Card>
            
            <div className="flex flex-1 min-h-0 gap-4 md:gap-6">
                
                <div className="h-full flex-shrink-0 w-full md:w-[35%]">
                    <Card className="h-full w-full shadow-2xl border-indigo-200">
                        <UserBlock id={chatId}/> 
                    </Card>
                </div>
                
                <div className="flex-1 min-w-0 h-full w-full md:w-[65%]">
                    <Card className="h-full w-full shadow-2xl border-indigo-200">
                        <WebContainerBlock id={chatId}/>
                    </Card>
                </div>
            </div>
        </div>
    )
}