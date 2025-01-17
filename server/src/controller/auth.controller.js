import {User} from "../models/user.model.js";

export const authCallback = async (req, res, next) => {
    try {
        const {id,firtName,lastName,imageUrl}=req.body;
        const user = await User.findOne({clerkId:id});
        if(!user){
            const newUser = new User({
                clerkId:id,
                fullName:`${firtName} ${lastName}`,
                imageUrl:imageUrl
            });
            await newUser.save();
            res.status(200).json(newUser);
        } 
    } catch (error) {
        console.log("Error in /callback",error);
        next(error);
        
    }
};