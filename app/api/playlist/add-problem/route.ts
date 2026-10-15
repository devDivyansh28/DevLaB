import { prisma } from "@/lib/db";
import { getCurrentUserData } from "@/modules/auth/actions";
import { error } from "console";
import { NextRequest, NextResponse } from "next/server";
import { success } from "zod";

export async function POST(request: NextRequest){
    try {
        const {userData: user} = await getCurrentUserData();
        if(!user){
            return NextResponse.json({success: false , error : "Unauthorized"},{status: 401});
        }
        
        const {problemId , playlistId} = await request.json();

        if(!problemId || !playlistId){
           NextResponse.json(
             { success: false, error: "Invalid parameters passed or missing" },
             { status: 400},
           );
        }

        const playlist = await prisma.playlist.findFirst({
            where: {
                id: playlistId,
                userId: user?.id
            }
        })


          if (playlist) {
            NextResponse.json(
              { success: false, error: "Playlist Not found or is Unauthorized" },
              { status: 400 },
            );
          }
          
          
          const problemInPlaylist = await prisma.problemInPlaylist.create({
            data: {
                problemId,
                playlistId
            }
          })

          return NextResponse.json({
            success: true,
            data: problemInPlaylist
          })

    } catch (error) {
        console.error("Error in adding problem to playlist" ,error);
        return NextResponse.json(
          { success: false, error: error },
          { status: 500 },
        );
    }
}