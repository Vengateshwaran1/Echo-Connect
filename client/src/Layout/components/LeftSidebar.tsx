import { cn } from "@/lib/utils";
import { BoomBox, HomeIcon, Library, Menu, MessageSquareQuoteIcon } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { SignedIn } from '@clerk/clerk-react';
import { ScrollArea } from "@/components/ui/scroll-area";
import PlaylistSkeleton from "@/components/skeletons/PlaylistSkeleton";
import { useMusicStore } from "@/stores/useMusicStore";
import { useEffect } from "react";

const LeftSidebar = () => {
  const { albums, fetchAlbums, isLoading } = useMusicStore();
  const location = useLocation();

  useEffect(() => {
    fetchAlbums();
  }, [fetchAlbums]);

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 bg-black/40 backdrop-blur-xl border-r border-purple-800 p-4">
        {location.pathname !== "/" && (
          <div className="flex items-center gap-3 px-2 mb-8">
            <BoomBox className="h-8 w-8 text-purple-400" />
            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500 hidden md:block">
              Echo Connect
            </h1>
          </div>
        )}

        <div className="space-y-2 mb-6">
          <div className="flex px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 gap-2 items-center">
            <Menu className="h-5 w-5" />
            <span className="hidden md:inline">Menu</span>
          </div>
          <Link to={"/"}
            className={cn(
              "w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors text-gray-300 hover:text-white hover:bg-purple-500/20"
            )}
          >
            <HomeIcon className="h-5 w-5" />
            <span className="hidden md:inline">Home</span>
          </Link>

          <SignedIn>
            <Link to={"/chat"}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors text-gray-300 hover:text-white hover:bg-purple-500/20"
              )}
            >
              <MessageSquareQuoteIcon className="h-5 w-5" />
              <span className="hidden md:inline">Message</span>
            </Link>
          </SignedIn>
        </div>

        <div className="space-y-4">
          <div className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">
            <div className="flex items-center gap-2 mb-2">
              <Library className="h-5 w-5" />
              <span className="hidden md:inline">Playlists</span>
            </div>
          </div>
        </div>
        <ScrollArea className="h-[calc(100vh-300px)] mt-2">
          <div className="space-y-2">
            {isLoading ? (
              <PlaylistSkeleton />
            ) : (
              albums.map((album) => (
                <div key={album._id} className="mt-4 group relative gap-4">
                  <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg blur opacity-0 group-hover:opacity-75 transition duration-400"></div>
                  <Link
                    to={`/albums/${album._id}`}
                    className="relative flex items-center gap-3 p-2 rounded-lg bg-black/40 backdrop-blur-sm hover:bg-black/60 transition duration-300"
                  >
                    <img
                      src={album.imageUrl}
                      alt={album.title}
                      className="h-12 w-12 rounded-md object-cover"
                    />
                    <div className="flex-1 min-w-0 hidden md:block">
                      <p className="font-medium text-gray-200 truncate">
                        {album.title}
                      </p>
                      <p className="text-gray-400 text-sm truncate">
                        Album • {album.artist}
                      </p>
                    </div>
                  </Link>
                </div>
              ))
            )}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}

export default LeftSidebar;