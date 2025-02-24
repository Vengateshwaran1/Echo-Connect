import mongoose from "mongoose";
import { Song } from "../models/song.model.js";
import { Album } from "../models/album.model.js";
import { config } from "dotenv";

config();

const seedDatabase = async () => {
	try {
		await mongoose.connect(process.env.MONGODB_URI);

		// Clear existing data
		await Album.deleteMany({});
		await Song.deleteMany({});

		// First, create all songs
		const createdSongs = await Song.insertMany([
			{
				title: "Why This Kolaveri Di",
				artist: "Dhanush",
				imageUrl: "/cover-images/1.jpg",
				audioUrl: "/songs/1.mp3",
				plays: Math.floor(Math.random() * 5000),
				duration: 246, // 4:06
			},
			{
				title: "Aalaporan Tamizhan",
				artist: "Anirudh Ravichander",
				imageUrl: "/cover-images/2.jpg",
				audioUrl: "/songs/2.mp3",
				plays: Math.floor(Math.random() * 5000),
				duration: 241, // 4:01
			},
			{
				title: "Kannazhaga",
				artist: "Anirudh Ravichander, Shruti Haasan",
				imageUrl: "/cover-images/3.jpg",
				audioUrl: "/songs/3.mp3",
				plays: Math.floor(Math.random() * 5000),
				duration: 224, // 3:44
			},
			{
				title: "Maruvaarthai",
				artist: "Sid Sriram",
				imageUrl: "/cover-images/4.jpg",
				audioUrl: "/songs/4.mp3",
				plays: Math.floor(Math.random() * 5000),
				duration: 324, // 5:24
			},
			{
				title: "Tum Tum",
				artist: "Sid Sriram, Sruthy Sasidharan",
				imageUrl: "/cover-images/5.jpg",
				audioUrl: "/songs/5.mp3",
				plays: Math.floor(Math.random() * 5000),
				duration: 336, // 5:36
			},
			{
				title: "Rowdy Baby",
				artist: "Yuvan Shankar Raja, Dhanush, Sai Pallavi",
				imageUrl: "/cover-images/6.jpg",
				audioUrl: "/songs/6.mp3",
				plays: Math.floor(Math.random() * 5000),
				duration: 240, // 4:00
			},
			{
				title: "Chellamma",
				artist: "Anirudh Ravichander, Jonita Gandhi",
				imageUrl: "/cover-images/7.jpg",
				audioUrl: "/songs/7.mp3",
				plays: Math.floor(Math.random() * 5000),
				duration: 239, // 3:59
			},
			{
				title: "Vaathi Coming",
				artist: "Anirudh Ravichander, Gana Balachandar",
				imageUrl: "/cover-images/8.jpg",
				audioUrl: "/songs/8.mp3",
				plays: Math.floor(Math.random() * 5000),
				duration: 228, // 3:48
			},
			{
				title: "Kutty Story",
				artist: "Anirudh Ravichander, Dhanush, Jonita Gandhi",
				imageUrl: "/cover-images/9.jpg",
				audioUrl: "/songs/9.mp3",
				plays: Math.floor(Math.random() * 5000),
				duration: 228, // 3:48
			},
			{
				title: "Megham Karukatha",
				artist: "Dhanush, Anirudh Ravichander",
				imageUrl: "/cover-images/10.jpg",
				audioUrl: "/songs/10.mp3",
				plays: Math.floor(Math.random() * 5000),
				duration: 230, // 3:50
			},
			{
				title: "Kadhal Psycho",
				artist: "Anirudh Ravichander, Jonita Gandhi",
				imageUrl: "/cover-images/11.jpg",
				audioUrl: "/songs/11.mp3",
				plays: Math.floor(Math.random() * 5000),
				duration: 229, // 3:49
			},
			{
				title: "Sirikkadhey",
				artist: "Anirudh Ravichander, Adithya RK",
				imageUrl: "/cover-images/12.jpg",
				audioUrl: "/songs/12.mp3",
				plays: Math.floor(Math.random() * 5000),
				duration: 217, // 3:37
			},
			{
				title: "Visiri",
				artist: "Sid Sriram, Dhee",
				imageUrl: "/cover-images/13.jpg",
				audioUrl: "/songs/13.mp3",
				plays: Math.floor(Math.random() * 5000),
				duration: 239, // 3:59
			},
			{
				title: "Kaattu Payale",
				artist: "G.V. Prakash Kumar, Anthony Daasan",
				imageUrl: "/cover-images/14.jpg",
				audioUrl: "/songs/14.mp3",
				plays: Math.floor(Math.random() * 5000),
				duration: 227, // 3:47
			},
		]);

		// Create albums with references to song IDs
		const albums = [
			{
				title: "Anirudh Hits",
				artist: "Anirudh Ravichander",
				imageUrl: "/albums/1.jpg",
				releaseYear: 2024,
				songs: createdSongs.slice(0, 4).map((song) => song._id),
			},
			{
				title: "Dhanush Favorites",
				artist: "Dhanush",
				imageUrl: "/albums/2.jpg",
				releaseYear: 2024,
				songs: createdSongs.slice(4, 8).map((song) => song._id),
			},
			{
				title: "Sid Sriram Melodies",
				artist: "Sid Sriram",
				imageUrl: "/albums/3.jpg",
				releaseYear: 2024,
				songs: createdSongs.slice(8, 12).map((song) => song._id),
			},
			{
				title: "Tamil Party Hits",
				artist: "Various Artists",
				imageUrl: "/albums/4.jpg",
				releaseYear: 2024,
				songs: createdSongs.slice(12, 14).map((song) => song._id),
			},
		];

		const createdAlbums = await Album.insertMany(albums);

		for (let i = 0; i < createdAlbums.length; i++) {
			const album = createdAlbums[i];
			const albumSongs = albums[i].songs;

			await Song.updateMany({ _id: { $in: albumSongs } }, { albumId: album._id });
		}

		console.log("Tamil songs and albums seeded successfully!");
	} catch (error) {
		console.error("Error seeding database:", error);
	} finally {
		mongoose.connection.close();
	}
};

seedDatabase();