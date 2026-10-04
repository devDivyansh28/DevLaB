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

export async function submitBatch(submissions : any){
    const options = {
      method: "POST",
      url: "https://judge0-extra-ce1.p.rapidapi.com/submissions/batch",
      params: {
        base64_encoded: "false",
      },
      headers: {
        "x-rapidapi-key": "276049348cmshae1414f34ca7e6bp1a3f5djsnedf20af336fa",
        "x-rapidapi-host": "judge0-extra-ce1.p.rapidapi.com",
        "Content-Type": "application/json",
      },
      data: {
        submissions: submissions,
      },
    };
    
    const { data } = await axios.request(options);

    return data;
}