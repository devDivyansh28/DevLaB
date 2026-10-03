import { UserRole } from "@/lib/generated/prisma/enums";
import { currentUserRole } from "@/modules/auth/actions";
import { error } from "console";
import { NextRequest, NextResponse } from "next/server";


export async function POST(request:NextRequest){
    try {
        const userRole = await currentUserRole();
        if(userRole!==UserRole.ADMIN){
            return NextResponse.json({error:"Unauthorized"} , {status:401});
        }

       const {
        title,
        description,
        difficulty,
        tags,
        examples,
        constraints,
        testCases,
        codeSnippets,
        referenceSolutions,
       } = await request.json();
       
        if (
          !title ||
          !description ||
          !difficulty ||
          !testCases ||
          !codeSnippets ||
          !referenceSolutions
        ) {
          return NextResponse.json(
            { error: "Missing required fields" },
            { status: 400 },
          );
        }

        if(!Array.isArray(codeSnippets) || testCases.length===0){
            return NextResponse.json({
                error : "At least One test Case is Required"
            } , {status:400});
        }

         for(const [language , solutionCode] of Object.entries(referenceSolutions)){
            // 1st : Get judge0 language id for current lang
            // 2. Prepare judge0 submission for all test cases
            // 3. Submit all test cases in one batch
            // 4. Extract tokens from response
            //5.  Poll judge0 until all submissions are done with help of tokens
            //6.  Validate for each test case that test cases passed  or not

         }

       
    } catch (error) {
        
    }
}