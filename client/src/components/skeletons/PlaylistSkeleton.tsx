
const PlaylistSkeleton = () => {
  return (
    <div className="space-y-3">
      {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
        <div key={i} className="flex items-center gap-3 p-2">
          <div className="h-12 w-12 rounded-md bg-purple-500/20 animate-pulse" />
          <div className="flex-1 hidden md:block space-y-2">
            <div className="h-4 w-3/4 bg-purple-500/20 rounded animate-pulse" />
            <div className="h-3 w-1/2 bg-purple-500/20 rounded animate-pulse" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default PlaylistSkeleton;