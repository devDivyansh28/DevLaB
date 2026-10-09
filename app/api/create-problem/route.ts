import { prisma } from "@/lib/db";
import { UserRole } from "@/lib/generated/prisma/enums";
import { getJudge0languageId, pollBatchResults, submitBatch } from "@/lib/judge0";
import { currentUserRole, getCurrentUserData } from "@/modules/auth/actions";
import { error } from "console";
import { NextRequest, NextResponse } from "next/server";


export async function POST(request:NextRequest){
    try {
        const userRole = await currentUserRole();
        
        if(userRole.userRole?.role!==UserRole.ADMIN){
            return NextResponse.json({error:"Unauthorized"} , {status:401});
        }
        const userData = await getCurrentUserData();
        if(!userData?.userData){
          return NextResponse.json({error: "User not found" } , {status: 401 })
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
          console.log({ error: "Missing required fields" });
          return NextResponse.json(
            { error: "Missing required fields" },
            { status: 400 },
          );
        }

        if(!Array.isArray(testCases) || testCases.length===0){
          console.log({ error: "At least One test Case is Required" });
            return NextResponse.json({
                error : "At least One test Case is Required"
            } , {status:400});
        }

         for(const [language , solutionCode] of Object.entries(referenceSolutions)){
           // 1st : Get judge0 language id for current lang

           const languageId = getJudge0languageId(language);
           // 2. Prepare judge0 submission for all test cases

           const submissions = testCases.map(({ input, output }: any) => ({
             source_code: solutionCode,
             language_id: languageId,
             stdin: input,
             expected_output: output,
           }));

           // 3. Submit all test cases in one batch
          const submissionResults = await submitBatch(submissions);
           // 4. Extract tokens from response
           const tokens = submissionResults.map((res:any)=>res.token);
           //5.  Poll judge0 until all submissions are done with help of tokens
           const results = await pollBatchResults(tokens);
           //6.  Validate for each test case that test cases passed  or not

           for(let i = 0 ; i< results.length ;i++){
            const result = results[i];
            
            if(result.status.id !==3 ){
              console.log({ error: `Validation failed for ${language}` , result });
              return NextResponse.json({
                error: `Validation failed for ${language}`,
                testCase: {
                  input: submissions[i].stdin,
                  expectedOutput: submissions[i].expected_output,
                  actualOutput: result.stdout,
                  error: result.stderr || result.compile_output,
                },
                details: result,
              },
            {status:400}
          );

            }
           }
         }

         const newProblem = await prisma.problem.create({
          data: {
            title,
            description,
            difficulty,
            tags,
            examples,
            constraints,
            testCases,
            codeSnippets,
            referenceSolutions,
            userId: userData.userData.id
          }
         });

         return NextResponse.json({
          success: true,
          message:"Problem Created Successfully"
         })

       
    } catch (error) {
       console.log({error})
        return NextResponse.json({
          success: false,
          error
        })
    }
}