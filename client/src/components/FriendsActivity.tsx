import { useChatStore } from "@/stores/useChatStore";
import { useUser } from "@clerk/clerk-react";
import { HeadphonesIcon, Music, Users } from "lucide-react";
import { useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { ScrollArea } from "./ui/scroll-area";

const LoginPrompt = () => (
  <div className="h-full flex flex-col items-center justify-center p-6 text-center space-y-4 bg-black/40 backdrop-blur-xl">
    <div className="relative">
      <div
        className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full blur-lg opacity-75 animate-pulse"
        aria-hidden="true"
      />
      <div className="relative bg-black/40 rounded-full p-4">
        <HeadphonesIcon className="h-8 w-8 text-purple-400" />
      </div>
    </div>

    <div className="space-y-2 max-w-[250px]">
      <h3 className="text-lg font-semibold text-gray-300">
        See What Friends Are Playing
      </h3>
      <p className="text-sm text-gray-400">
        Login to discover what music your friends are enjoying right now
      </p>
    </div>
  </div>
);
const FriendsActivity = () => {
	const { users, fetchUsers, onlineUsers, userActivities } = useChatStore();
	const { user } = useUser();

	useEffect(() => {
		if (user) fetchUsers();
	}, [fetchUsers, user]);

return (
  <div className='h-full bg-black/40 backdrop-blur-xl border border-purple-500/20 rounded-lg flex flex-col'>
    <div className='p-4 flex justify-between items-center border-b border-zinc-800'>
      <div className='flex items-center gap-2'>
        <Users className='size-5 shrink-0' />
        <h2 className='font-semibold'>What they're listening to</h2>
      </div>
    </div>

    {!user && <LoginPrompt />}

    <ScrollArea className='flex-1'>
      <div className='p-4 space-y-4'>
        {users.map((user) => {
          const activity = userActivities.get(user.clerkId);
          const isPlaying = activity && activity !== "Idle";

          return (
            <div
              key={user._id}
              className='cursor-pointer hover:bg-zinc-800/50 p-3 rounded-md transition-colors group'
            >
              <div className='flex items-start gap-3'>
                <div className='relative'>
                  <Avatar className='size-10 border border-purple-500/20'>
                    <AvatarImage src={user.imageUrl} alt={user.fullName} />
                    <AvatarFallback>{user.fullName[0]}</AvatarFallback>
                  </Avatar>
                  <div
                    className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-zinc-900 
                      ${onlineUsers.has(user.clerkId) ? "bg-green-500" : "bg-zinc-500"}
                      `}
                    aria-hidden='true'
                  />
                </div>

                <div className='flex-1 min-w-0'>
                  <div className='flex items-center gap-2'>
                    <span className='font-medium text-sm text-gray-300'>{user.fullName}</span>
                    {isPlaying && <Music className='size-3.5 text-emerald-400 shrink-0' />}
                  </div>

                  {isPlaying ? (
                    <div className='mt-1'>
                      <div className='mt-1 text-sm text-gray-300 font-medium truncate'>
                        {activity.replace("Playing ", "").split(" by ")[0]}
                      </div>
                      <div className='text-xs text-zinc-400 truncate'>
                        {activity.split(" by ")[1]}
                      </div>
                    </div>
                  ) : (
                    <div className='mt-1 text-xs text-zinc-400'>Idle</div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </ScrollArea>
  </div>
);
};
export default FriendsActivity;

