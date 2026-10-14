"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { executeCode } from "../actions";
import { getJudge0languageId } from "@/lib/judge0";

export function useEditor(problem: any, initialLanguage = "JAVASCRIPT") {
    console.log(problem , "Problem recieved in use Editor")
  const [selectedLanguage, setSelectedLanguage] = useState(initialLanguage);
  const [code, setCode] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [executionResponse, setExecutionResponse] = useState(null);

  useEffect(() => {
    if (problem?.codeSnippets?.[selectedLanguage]) {
      setCode(problem?.codeSnippets?.[selectedLanguage]);
    }
  }, [selectedLanguage, problem]);

  const handleRun = () => {
    toast.success("This is future assignment");
  };


   const handleSubmit = async () => {
     if (!problem) return;

     try {
       setIsSubmitting(true);
       const language_id = getJudge0languageId(selectedLanguage);
       const stdin = problem.testCases.map((tc) => tc.input);
       const expected_outputs = problem.testCases.map((tc) => tc.output);

       const res = await executeCode(
         code,
         language_id,
         stdin,
         expected_outputs,
         problem.id,
       );
       setExecutionResponse(res);

       if (res.success) {
         toast.success("Code executed successfully");
       }
     } catch (error) {
       console.error("Error executing code", error);
       toast.error("Error executing code");
     } finally {
       setIsSubmitting(false);
     }
   };

  return {
    selectedLanguage,
    setSelectedLanguage,
    code,
    setCode,
    isRunning,
    isSubmitting,
    executionResponse,
    handleRun,
    handleSubmit,
  };
}