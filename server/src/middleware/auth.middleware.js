import { clerkClient } from "@clerk/express";
import dotenv from "dotenv";
dotenv.config();
export const protectRoute = async (req, res, next) => {
    if (!req.auth.userId){
        return res.status(401).json({message:"Unauthorized - You must be logged in to access this resource"});
        

    }
    next();
};


export const requireAdmin = async (req, res, next) => {
    try {
        const currentUser = await clerkClient.users.getUser(req.auth.userId);
        const isAdmin=process.env.ADMIN_EMAIL===currentUser.primaryEmailAddress?.emailAddress;
        if(!isAdmin){
            return res.status(403).json({message:"Forbidden - You must be an admin to access this resource"});
        }
        next();
    } catch (error) {
        next(error);
    }
};
