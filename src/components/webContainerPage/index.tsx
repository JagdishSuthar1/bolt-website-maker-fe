"use client";
import { userContext } from "@/app/context/user";
import { JSX, ReactNode, useContext, useEffect, useState } from "react";
import { Card, CardContent } from "../ui/card";
import getWebcontainerState from "@/app/helpers/getWebContainerState";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";
import { ScrollArea } from "../ui/scroll-area";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { DirectoryNode, FileNode, WebContainer } from "@webcontainer/api"
import { FileSystemTree, Step } from "@/app/types/user";
import { buildTreeUI } from "@/app/helpers/buildTree";
import xmltostring from "@/app/helpers/xmltostring";




function WrapperOfString({ code }: { code: string }) {
    return (

      <SyntaxHighlighter language="tsx">
        
        {code}
      
      </SyntaxHighlighter>

    )
}


function IframeComponent({ url }: { url: string }) {
  return (
    <iframe src={url} className="w-full h-full"></iframe>
  )
}

export default function WebContainerBlock({ id }: { id: string }) {
  const { webContainerState, setWebContainerState } = useContext(userContext)!;
  const [webContainerFileTreeState, setWebcontainerFileTreeState] = useState<FileSystemTree>()
  const [codePreview, setCodePreview] = useState<string>("");
  const [finalArray, setFinalArray] = useState<ReactNode>(<></>);
  const [webContainerInstance, setWebContainerInstance] = useState<WebContainer>()
  const [iframURL, setIframeURL] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string>("code");

  function FilesShowing({ files, parser }: { files: FileSystemTree, parser: DOMParser }) {

    return (
      <div className="flex flex-col gap-3 w-full h-full">
        {Object.entries(files).map(([item, node]) =>

          "file" in node ?
            <span key={item} onClick={() => (setCodePreview((node as FileNode).file.contents as string))} className="hover:cursor-pointer bg-indigo-100 rounded-[11px] p-3">{item}</span>

            :
            <Accordion key={item} type="single" collapsible>
              <AccordionItem value={`${Math.random()}`} className="hover:cursor-pointer bg-indigo-100 rounded-[11px] p-3">
                <AccordionTrigger>{item}</AccordionTrigger>
                <ScrollArea>
                  <AccordionContent>
                    <FilesShowing files={((node as DirectoryNode).directory) as FileSystemTree} parser={parser} />
                  </AccordionContent>

                </ScrollArea>

              </AccordionItem>
            </Accordion>
        )
        }
      </div>
    )
  }



  useEffect(() => {
    async function getwebstate() {
      const messages = await getWebcontainerState(id);

      let convertedMessagesForMounting;
      if (messages.data != null) {
        convertedMessagesForMounting = messages.data?.state?.files!;
        console.log(convertedMessagesForMounting);
        //file structure in string
        setWebContainerState(convertedMessagesForMounting);
        const correctedXML : Step[] = await xmltostring(convertedMessagesForMounting);
        console.log("finalXML",correctedXML)
        const webContainerFileStructure = buildTreeUI(correctedXML);
        //here i am updating the state of the webContainer

        console.log("tree ...", webContainerFileStructure)
        setWebcontainerFileTreeState(webContainerFileStructure);
        const parser = new DOMParser();
        setFinalArray(<FilesShowing files={webContainerFileStructure} parser={parser} />);


          const conatiner = await WebContainer.boot();
          setWebContainerInstance(conatiner);
          if (webContainerFileStructure != null) {
            console.log("Mounting")
            await conatiner.mount(webContainerFileStructure);
            console.log("Mounting finished")
          }
        
      }

    }

    getwebstate()
  }, []);


  useEffect(() => {

    async function moutingFiles(webContainerState: FileSystemTree, webContainerInstance: WebContainer) {
      console.log("state : ", webContainerState)
      console.log("Mounting")
      await webContainerInstance?.mount(webContainerState!);
      console.log("Mounting finished")
      const packageJSON = await webContainerInstance?.fs.readFile('package.json', 'utf-8');
      console.log(packageJSON);
      return 
    }

    async function updateTheWebcontainerState(webContainerState : string, webContainerInstance :WebContainer ) {
        const correctedXML = await xmltostring(webContainerState);
        console.log(correctedXML)
        const webContainerFileStructure = buildTreeUI(correctedXML);
        setWebcontainerFileTreeState(webContainerFileStructure)
        return moutingFiles(webContainerFileStructure, webContainerInstance);
    }

     if (webContainerState != null && webContainerInstance != null) {
      console.log("Updating new files...")
       updateTheWebcontainerState(webContainerState, webContainerInstance)
     }

  }, [webContainerState])


  async function startDevSever() {
    
    const installProcess1 = await webContainerInstance?.spawn("npm", ["install"])
    installProcess1?.output.pipeTo(new WritableStream({
      write(data) {
        
        console.log(data);
      }
    }))
    

    const installProcess2 = await webContainerInstance?.spawn("npm", ["run", "dev"])
    webContainerInstance?.on("server-ready", (port, url) => {
      setIframeURL(url)
    })

    installProcess2?.output.pipeTo(new WritableStream({
      write(data) {

        console.log(data);
      }
    }))

  }

  return (
     <div className="w-full h-full p-4 bg-gray-50">
      <Tabs defaultValue="code" className="w-full h-full flex flex-col" value={activeTab} onValueChange={setActiveTab}>
        
        {/* Tab Header */}
        <TabsList className="mb-4 self-start">
          <TabsTrigger value="code" onClick={() => setActiveTab("code")}>
            Code & Files
          </TabsTrigger>
          <TabsTrigger value="preview" onClick={() => { startDevSever(); setActiveTab("preview"); }}>
            Live Preview
          </TabsTrigger>
        </TabsList>

        {/* Code View Content */}
        <TabsContent value="code" className="flex gap-4 flex-1 min-h-0">
          
          {/* File Explorer (30%) */}
          <Card className="w-1/3 min-w-[280px] h-full shadow-lg border border-gray-200">
            <h3 className="text-lg font-bold p-4 pb-0 text-gray-800">File Explorer</h3>
            <ScrollArea className="h-[calc(100%-48px)] p-4 pt-2">
              <CardContent className="w-full h-full p-0">
                {finalArray ? finalArray : <p className="text-gray-500 italic text-sm">No files found or loading...</p>}
              </CardContent>
            </ScrollArea>
          </Card>

          {/* Code Viewer (70%) */}
          <Card className="flex-1 h-full shadow-lg border border-gray-200">
            <ScrollArea className="h-full">
              <CardContent className="h-full p-0">
                <WrapperOfString code={codePreview} />
              </CardContent>
            </ScrollArea>
          </Card>
        </TabsContent>

        {/* Preview Content */}
        <TabsContent value="preview" className="flex-1 min-h-0">
          <Card className="w-full h-full shadow-lg border border-gray-200">
            <CardContent className="w-full h-full p-0 flex items-center justify-center">
              {iframURL ? 
                <IframeComponent url={iframURL} /> 
                : 
                <div className="text-center p-8 text-gray-600 font-medium">
                  <p>Preview is loading...</p>
                  <p className="text-sm mt-2 text-gray-500">Starting WebContainer and dev server. This may take a moment.</p>
                </div>
              }
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}



