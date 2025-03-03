import { Button } from "@/components/ui/button";
import { HoverCard } from "@/components/ui/hover-card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useMusicStore } from "@/stores/useMusicStore";
import { PlayIcon } from "lucide-react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const AlbumPage = () => {
  const { albumId } = useParams();
  const { fetchAlbumById, currentAlbum, isLoading } = useMusicStore();
  useEffect(() => {
    if (albumId) {
      fetchAlbumById(albumId);
    }
  }, [albumId, fetchAlbumById]);

  if (isLoading) return null;
  return (
    <div className="h-full">
      <ScrollArea className="h-full">
        <div className="relative min-h-full">
          
          <div
            className="absolute inset-0 bg-gradient-to-b from-purple-500 via-gray-800 to-black pointer-events-none"
            aria-hidden="true"
          />
          <div className="relative z-10">
            <div className="flex p-6 gap-6 pb-8">
              <img
                src={currentAlbum?.imageUrl}
                alt={currentAlbum?.title}
                className="w-[240px] h-[240px] shadow-xl rounded"
              />
              <div className="flex flex-col justify-end">
                <p className="text-sm font-medium">Album</p>
                <h1 className="text-7xl font-bold my-4">
                  {currentAlbum?.title}
                </h1>
                <div className="flex items-center gap-2 text-sm text-zinc-100">
                  <span className="font-medium text-white">
                    {currentAlbum?.artist}
                  </span>
                  <span>• {currentAlbum?.songs.length} songs</span>
                  <span>• {currentAlbum?.releaseYear}</span>
                </div>
              </div>
            </div>

            <div className="px-6 pb-4 flex items-center gap-6">
              <Button size="icon" className="h-14 w-14 rounded-full bg-purple-500 hover:bg-purple-400 hover:scale-105 transition-all">
                <PlayIcon className="size-7 text-white" /> 
              </Button>
            </div>

            <div className='grid gap-4 px-10 py-2 text-sm text-zinc-400 border-b border-white/5 bg-white'>
              <HoverCard>
                
              </HoverCard>

            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};

export default AlbumPage;
