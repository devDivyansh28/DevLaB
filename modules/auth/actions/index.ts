"use server";
import {prisma} from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import { error } from "console";

export const onBoardUser = async()=>{
    try {
        const user = await currentUser();
        if(!user) {
            return {succes:false , error: "No authenticated User Found"}
        }

        const {id , firstName , lastName , imageUrl , emailAddresses} = user;

        const newUser = await prisma.user.upsert({
          where: {
            clerkId: id,
          },
          update: {
            firstName: firstName || null,
            lastName: lastName || null,
            imageUrl: imageUrl || null,
            email: emailAddresses[0].emailAddress || "",
          },
          create: {
            clerkId: id,
            firstName: firstName || null,
            lastName: lastName || null,
            imageUrl: imageUrl || null,
            email: emailAddresses[0].emailAddress || "",
          },
        });
    } catch (error) {
        return {success : false , error : error};
    }
}

export const currentUserRole = async()=>{
    try {
         const user = await currentUser();
         if (!user) {
           return { succes: false, error: "No authenticated User Found" };
         }

        const { id } = user;

        const userRole = await prisma.user.findUnique({
            where : {
                clerkId : id
            },
            select : {
                role : true
            }
        })

        return userRole?.role;

    } catch (error) {
        return {success: false , error : error}
    }
}

// export const getCurrentUserData = async()=>{
//     try {
//         const user = await currentUser();
//         if(!user){
//             return {sucess : false , error : "No user found with Given Credentials"}
//         }
        
//         const {id} = user;
        
//         const userData = await prisma.user.findUnique({
//             where : {
//                 clerkId : id,
//             },
//             select : {
//                 id : true,
//                 firstName : true , 
//                 lastName : true,
//                 email : true,
//                 imageUrl : true,
//             }
//         })
//     } catch (error) {
        
//     }
// }