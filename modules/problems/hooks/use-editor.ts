'use client'
import { useEffect, useState } from "react";


export function useEditor({problem , initialLanguage="JAVASCRIPT"}:any){
    const [selectedLanguage, setSelectedLanguage] = useState(initialLanguage);
    const [code, setCode] = useState("");
    const [isRunning, setIsRunning] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [executionResponse, setExecutionResponse] = useState(null);

    useEffect(()=>{
        if(problem?.codeSnippets?.[selectedLanguage]){
            setCode(problem?.codeSnippets?.[selectedLanguage])
        }
    },[selectedLanguage , problem])

    const handleRun=()=>{};
    const handleSubmit=()=>{};

    return {
        selectedLanguage,
        setSelectedLanguage,
        code,
        setCode,
        isRunning,
        setIsRunning,
        isSubmitting,
        executionResponse,
        handleRun,
        handleSubmit,
    }
}