"use server"

import { prisma } from "@/lib/db";
import { UserRole } from "@/lib/generated/prisma/enums";
import { getCurrentUserData } from "@/modules/auth/actions";
import { success } from "zod";


export const getAllProblems = async()=>{
    try {
        const {userData} = await getCurrentUserData();

        const problems = await prisma.problem.findMany({
            orderBy: {
                createdAt: "desc"
            }
        });

        return {
            success: true,
            data: problems
        }
    } catch (error) {
        console.log(error,"In fetching problems");
       return {success: false , error: "Failed to fetch problems"};
    }
}