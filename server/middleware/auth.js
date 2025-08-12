//creating this so that only admin can create 
// a new show and then use it in showRoutes file

import { clerkClient } from "@clerk/express";

export const protectAdmin = async (req,res,next)=>{

    try {

        const {userId} = req.auth();

        const user = await clerkClient.users.getUser(userId)

        if (user.privateMetadata.role !== 'admin'){
            return res.json({success:false,message:"not authorized"})
        }
        
    } catch (error) {
        return res.json({success:false,message:"not authorized"})
        
    }
}