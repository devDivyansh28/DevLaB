import { useEffect, useState } from "react";
import { getAllSubmissionByCurrentUserForProblem } from "../actions";

export function useSubmissionHistory(id:string , submission: any){
    const [submissionHistory , setSubmissionHistory] = useState([]);


    useEffect(()=>{
        const fetchSubmissionHistory = async()=>{
            try {
                const response = await getAllSubmissionByCurrentUserForProblem(id);
                if(response.success){
                    setSubmissionHistory(response.data);
                }
            } catch (error) {
                console.error('Error in fetching submission History',error);
            }
        }

        fetchSubmissionHistory();
    },[id , submission])

    return {
        submissionHistory
    }
}