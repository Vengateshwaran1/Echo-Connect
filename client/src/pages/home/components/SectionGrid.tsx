import { Song } from "@/types";
import SectionGridSkeleton from "./SectionGridSkeleton.tsx";
import { Button } from "@/components/ui/button";
import PlayButton from "./PlayButton";

type SectionGridProps = {
	title: string;
	songs: Song[];
	isLoading: boolean;
};
const SectionGrid = ({ songs, title, isLoading }: SectionGridProps) => {
	if (isLoading) return <SectionGridSkeleton />;

	return (
		<div className='mb-8'>
			<div className='flex items-center justify-between mb-4'>
				<h2 className='text-xl sm:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-t from-purple-400 to-pink-500'>{title}</h2>
				<Button variant='link' className='text-sm text-gray-300 hover:text-white cursor-pointer'>
					Show all
				</Button>
			</div>

			<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
				{songs.map((song) => (
					<div
						key={song._id}
						className='bg-purple-500/10 p-4 rounded-md hover:bg-purple-500/20 transition-all group cursor-pointer border hover:border-purple-800'
					>
						<div className='relative mb-4'>
							<div className='aspect-square rounded-md shadow-lg overflow-hidden'>
								<img
									src={song.imageUrl}
									alt={song.title}
									className='w-full h-full object-cover transition-transform duration-300 
									group-hover:scale-105'
								/>
							</div>
							<PlayButton song={song} />
						</div>
						<h3 className='font-medium mb-2 truncate'>{song.title}</h3>
						<p className='text-sm text-gray-300 truncate'>{song.artist}</p>
					</div>
				))}
			</div>
		</div>
	);
};
export default SectionGrid;