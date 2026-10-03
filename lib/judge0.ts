import axios from "axios";

export function getJudge0languageId(language:string){
    const languageMap = {
        "PYTHON":71,
        "JAVASCRIPT":63,
        "JAVA":62,
        "C++":54
    }
    
    return languageMap[language.toUpperCase() as keyof typeof languageMap];
}