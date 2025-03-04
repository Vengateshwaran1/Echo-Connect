import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { HomeIcon, Library, MessageSquareQuoteIcon } from "lucide-react"
import { Link } from "react-router-dom"
import { SignedIn } from '@clerk/clerk-react';
import { ScrollArea } from "@/components/ui/scroll-area";
import PlaylistSkeleton from "@/components/skeletons/PlaylistSkeleton";
import { useMusicStore } from "@/stores/useMusicStore";
import { useEffect } from "react";

const LeftSidebar = () => {
  const {albums,fetchAlbums,isLoading} = useMusicStore();
  useEffect(()=>{
    fetchAlbums()
  },[fetchAlbums]);

  console.log({albums});

  return (
    <div className="h-full flex flex-col gap-2">
      <div className="rounded-lg bg-linear-to-bl from-[#360033] to-[#0b8793] p-4">
        <div className="space-y-2 ">
          <Link to={"/"} 
            className={cn(buttonVariants(
            {
              variant:"ghost",
              className:"w-full justify-start text-gray-300 hover:bg-zinc-800"
            }
          ))}
          >
            <HomeIcon className="mr-2 size-5"/>
            <span className="hidden md:inline">Home</span>
          </Link>
          <SignedIn>
          <Link to={"/chat"} 
            className={cn(buttonVariants(
            {
              variant:"ghost",
              className:"w-full justify-start text-gray-300 hover:bg-zinc-800"
            }
            
          ))}
          >
            <MessageSquareQuoteIcon className="mr-2 size-5"/>
            <span className="hidden md:inline">Message</span>
          </Link>
          </SignedIn>
        </div>
      </div>

      <div className="flex-1 rounded-lg bg-linear-to-bl from-[#360033] to-[#0b8793] p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center text-gray-300 px-2">
            <Library className="size-5 mr-2"/>
            <span className="hidden md:inline">Playlists</span>
          </div>
        </div>
        
        <ScrollArea className="h-[calc(100vh-300px)] ">
          <div className="space-y-2 ">
            {isLoading ? (<PlaylistSkeleton />) : (
              albums.map((album) => (
                <div className="w-full animate-rotate-border max-w-sm transition-all duration-500 ease-out transform-3d  rounded-lg cursor-pointer hover:scale-[1.03] hover:bg-conic/[from_var(--border-angle)] from-black via-purple-500 to-black from-80% via-90% to-100% p-px">
                <Link to={`/albums/${album._id}`}
                  key={album._id}
                  className="p-2 hover:bg-zinc-800 rounded-md flex items-center gap-3 group cursor-pointer"
                  >
                    <img src={album.imageUrl} alt="playlist img" className="size-12 rounded-md flex-shrink-0 object-cover"/>
                      <div className="flex-1 min-w-0 hidden md:block">
                        <p className="truncate font-medium">{album.title}</p>
                        <p className="text-gray-300 text-sm truncate">Album • {album.artist}</p>
                      </div>
                </Link>
                </div>
              ))
            )}

          </div>


        </ScrollArea>

      </div>
    </div>
  )
}

export default LeftSidebar