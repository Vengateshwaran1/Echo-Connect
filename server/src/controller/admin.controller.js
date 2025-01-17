import cloudinary from "../lib/cloudinary.js"
import {Album} from "../models/album.model.js"; 
import {Song} from "../models/song.model.js";

const uploadToCloudinary = async (file) => {
    try {
        const result = await cloudinary.uploader.upload(file.tempFilePath, {
            resource_type: "auto",
        });
        return result.secure_url
    } catch (error) {
        console.log("Error in uploadCloudinary",error);
            throw new Error("Could not upload to cloudinary");
            
        }
    };

export const createSong = async (req, res, next) => {
    try {
        if(!req.files || !req.files.audioFile || !req.files.imageFile){
            return res.status(400).json({message: "Please provide all audio and image files"});
        }   
        const {title, artist, aulbumId, duration}=req.body;
        const audioFile=req.files.audioFile
        const imageFile=req.files.imageFile

        const audioUrl= await uploadToCloudinary(audioFile);
        const imageUrl= await uploadToCloudinary(imageFile);

        const song = new Song({
            title,
            artist,
            audioUrl,
            imageUrl,
            duration,
            albumId: albumId || null,
        })

        await song.save();

        if(albumId){
            await Album.findByIdAndUpdate(albumId, {
                $push: {songs: song._id},
            })
        }
        res.status(201).json(song)
    } catch (error) {
        console.log("Error in createSong", error);
        next(error);
    }
}

export const deleteSong = async (req, res, next) => {
    try {
        const {id} = req.params;
        const song = await Song.findById(id);


        if(song.albumId){
            await Album.findByIdAndUpdate(song.albumId, {
                $pull: {songs: song._id},
            })
        }
        await Song.findByIdAndDelete(id);

        res.status(200).json
        
    } catch (error) {
        console.log("Error in deleteSong", error);
        next(error);
    }
}

export const createAlbum = async (req, res, next) => {
    try {
        const {title, artist, releaseYear}=req.body;
        const {imageFile}=req.files;
        const imageUrl= await uploadToCloudinary(imageFile);
        const album = new Album({
            title:title,
            artist:artist,
            releaseYear,
            imageUrl,
        });

        await album.save();
        res.status(201).json(album);
        
    } catch (error) {
        console.log("Error in createAlbum", error); 
        next(error);
    }
}

export const deleteAlbum = async (req, res, next) => {
    try {
        const {id} = req.params;
        await song.deleteMany({albumId: id});
        await Album.findByIdAndDelete(id);
        res.status(200).json({message: "Album deleted successfully"});
    } catch (error) {
        console.log("Error in deleteAlbum", error);
        next(error);
    }
}

export const checkAdmin = async (req, res, next) => {
    try {
        res.status(200).json({message: "Admin is authorized"});
    } catch (error) {
        console.log("Error in checkAdmin", error);
        next(error);
    }
}
