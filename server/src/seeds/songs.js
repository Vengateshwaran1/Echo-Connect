import mongoose from "mongoose";
import { Song } from "../models/song.model.js";
import { config } from "dotenv";

config();

const songs = [
	{
		title: "Why This Kolaveri Di",
		artist: "Dhanush",
		imageUrl: "/cover-images/1.jpg",
		audioUrl: "/songs/1.mp3",
		duration: 246, // 4:06
	},
	{
		title: "Aalaporan Tamizhan",
		artist: "Anirudh Ravichander",
		imageUrl: "/cover-images/2.jpg",
		audioUrl: "/songs/2.mp3",
		duration: 241, // 4:01
	},
	{
		title: "Kannazhaga",
		artist: "Anirudh Ravichander, Shruti Haasan",
		imageUrl: "/cover-images/3.jpg",
		audioUrl: "/songs/3.mp3",
		duration: 224, // 3:44
	},
	{
		title: "Maruvaarthai",
		artist: "Sid Sriram",
		imageUrl: "/cover-images/4.jpg",
		audioUrl: "/songs/4.mp3",
		duration: 324, // 5:24
	},
	{
		title: "Tum Tum",
		artist: "Sid Sriram, Sruthy Sasidharan",
		imageUrl: "/cover-images/5.jpg",
		audioUrl: "/songs/5.mp3",
		duration: 336, // 5:36
	},
	{
		title: "Rowdy Baby",
		artist: "Yuvan Shankar Raja, Dhanush, Sai Pallavi",
		imageUrl: "/cover-images/6.jpg",
		audioUrl: "/songs/6.mp3",
		duration: 240, // 4:00
	},
	{
		title: "Chellamma",
		artist: "Anirudh Ravichander, Jonita Gandhi",
		imageUrl: "/cover-images/7.jpg",
		audioUrl: "/songs/7.mp3",
		duration: 239, // 3:59
	},
	{
		title: "Vaathi Coming",
		artist: "Anirudh Ravichander, Gana Balachandar",
		imageUrl: "/cover-images/8.jpg",
		audioUrl: "/songs/8.mp3",
		duration: 228, // 3:48
	},
	{
		title: "Kutty Story",
		artist: "Anirudh Ravichander, Dhanush, Jonita Gandhi",
		imageUrl: "/cover-images/9.jpg",
		audioUrl: "/songs/9.mp3",
		duration: 228, // 3:48
	},
	{
		title: "Megham Karukatha",
		artist: "Dhanush, Anirudh Ravichander",
		imageUrl: "/cover-images/10.jpg",
		audioUrl: "/songs/10.mp3",
		duration: 230, // 3:50
	},
	{
		title: "Kadhal Psycho",
		artist: "Anirudh Ravichander, Jonita Gandhi",
		imageUrl: "/cover-images/11.jpg",
		audioUrl: "/songs/11.mp3",
		duration: 229, // 3:49
	},
	{
		title: "Sirikkadhey",
		artist: "Anirudh Ravichander, Adithya RK",
		imageUrl: "/cover-images/12.jpg",
		audioUrl: "/songs/12.mp3",
		duration: 217, // 3:37
	},
	{
		title: "Visiri",
		artist: "Sid Sriram, Dhee",
		imageUrl: "/cover-images/13.jpg",
		audioUrl: "/songs/13.mp3",
		duration: 239, // 3:59
	},
	{
		title: "Kaattu Payale",
		artist: "G.V. Prakash Kumar, Anthony Daasan",
		imageUrl: "/cover-images/14.jpg",
		audioUrl: "/songs/14.mp3",
		duration: 227, // 3:47
	},
	{
		title: "Jigarthanda",
		artist: "Santhosh Narayanan",
		imageUrl: "/cover-images/15.jpg",
		audioUrl: "/songs/15.mp3",
		duration: 236, // 3:56
	},
	{
		title: "Otha Sollala",
		artist: "Anirudh Ravichander, Arivu",
		imageUrl: "/cover-images/16.jpg",
		audioUrl: "/songs/16.mp3",
		duration: 239, // 3:59
	},
	{
		title: "Kannamma",
		artist: "Anirudh Ravichander, Dhanush",
		imageUrl: "/cover-images/17.jpg",
		audioUrl: "/songs/17.mp3",
		duration: 239, // 3:59
	},
	{
		title: "Enna Solla",
		artist: "G.V. Prakash Kumar, Shweta Mohan",
		imageUrl: "/cover-images/18.jpg",
		audioUrl: "/songs/18.mp3",
		duration: 229, // 3:49
	},
];

const seedSongs = async () => {
	try {
		await mongoose.connect(process.env.MONGODB_URI);

		await Song.deleteMany({});

		await Song.insertMany(songs);

		console.log("Tamil songs seeded successfully!");
	} catch (error) {
		console.error("Error seeding Tamil songs:", error);
	} finally {
		mongoose.connection.close();
	}
};

seedSongs();