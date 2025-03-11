import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useMusicStore } from "@/stores/useMusicStore";
import { PlayIcon } from "lucide-react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";


export const formatDuration = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
};

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
            className="absolute inset-0 bg-linear-to-t from-[#360033] to-[#0b8793] pointer-events-none"
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
              <Button size="icon" className="h-14 w-14 rounded-full bg-[#0b8793] hover:border-8 hover:bg-[#0b8793] hover:scale-105 transition-all cursor-pointer">
                <PlayIcon className="size-7 text-white " /> 
              </Button>
            </div>

            <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 px-10 py-2 text-sm text-zinc-400 border-b border-white/5 bg-zinc-900'>
              {currentAlbum?.songs.map((song) => (
                <div key={song._id} className="relative group">
                  <Card className="flex flex-col items-center p-2 bg-zinc-800 rounded-lg transition-transform duration-300 h-60 gap-y-2 justify-between">
                    <img
                      src={song.imageUrl}
                      alt={song.title}
                      className="w-full h-24 object-cover rounded-md"
                    />
                    <CardTitle className="text-center text-white">{song.title}</CardTitle>
                    <p className="text-zinc-300 text-sm text-center">{song.artist}</p>
                    <p className="text-zinc-400 text-center">{formatDuration(song.duration)}</p>
                  </Card>
                  <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-50 transition-opacity duration-300 rounded-lg" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Button className="h-14 w-14 rounded-full bg-[#0b8793] flex items-center justify-center">
                        <PlayIcon className="size-7 text-white" />
                      </Button>
                    </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};

export default AlbumPage;