import LeftSidebar from "@/Layout/components/LeftSidebar";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"
import { Outlet } from "react-router-dom"
const MainLayout = () => {
    const isMobile = false;
  return (
    <div className="h-screen flex flex-col text-white bg-black">
        <ResizablePanelGroup direction="horizontal" className="flex-1 flex h-full overflow-hidden p-2">
            <ResizablePanel defaultSize={20} minSize={isMobile ? 0 : 10} maxSize={30}>
                <LeftSidebar />
            </ResizablePanel>
            <ResizableHandle withHandle className="w-2 bg-black rounded-lg transition-colors"/>
            <ResizablePanel defaultSize={isMobile ? 80 : 60}>
                <Outlet />
            </ResizablePanel>
            <ResizableHandle withHandle className="w-2 bg-black rounded-lg transition-colors"/>
            <ResizablePanel defaultSize={20} maxSize={25} minSize={0} collapsedSize={0}>
                friends activity
            </ResizablePanel>
        </ResizablePanelGroup>
    </div>
  )
}

export default MainLayout