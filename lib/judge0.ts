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

const getHeaders = () => {
  if (process.env.JUDGE0_USE_RAPIDAPI === "true") {
    return {
      "x-rapidapi-key": process.env.RAPIDAPI_KEY || "",
      "x-rapidapi-host":
        process.env.RAPIDAPI_HOST || "judge0-extra-ce1.p.rapidapi.com",
      "Content-Type": "application/json",
    };
  }
  // Central Codebox
  return {
    "X-Auth-Token": process.env.JUDGE0_AUTH_TOKEN || "dev-token",
    "Content-Type": "application/json",
  };
};


const getBaseUrl = () => {
  if (process.env.JUDGE0_USE_RAPIDAPI === "true") {
    return "https://judge0-extra-ce1.p.rapidapi.com";
  }
  return process.env.JUDGE0_API_URL || "http://localhost:2358";
};


export async function submitBatch(submissions: any) {
  const baseUrl = getBaseUrl();
  try {
    const options = {
      method: "POST",
      url: `${baseUrl}/submissions/batch`, // ✅ Uses dynamic baseUrl
      params: {
        base64_encoded: "false",
      },
      headers: getHeaders(), // ✅ Uses dynamic headers (X-Auth-Token for Codebox)
      data: {
        submissions: submissions,
      },
    };
    const { data } = await axios.request(options);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Execution status:", error.response?.status);
      console.error("Execution response:", error.response?.data);
      console.error("Execution headers:", error.response?.headers);
    }
    console.log({ error: error, reason: "In submitting Batch" });
    throw error;
  }
}


export async function pollBatchResults(tokens: string[]) {
  const baseUrl = getBaseUrl(); // ✅ Added baseUrl

  try {
    while (true) {
      const options = {
        method: "GET",
        url: `${baseUrl}/submissions/batch`, // ✅ Uses dynamic baseUrl
        params: { tokens: tokens.join(",") },
        headers: getHeaders(), // ✅ Uses dynamic headers
      };

      const { data } = await axios.request(options);
      const results = data.submissions;

      const isAllDone = results.every(
        (r: any) => r.status.id !== 1 && r.status.id !== 2,
      );
      if (isAllDone) return results;

      await sleep(1000);
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Execution status:", error.response?.status);
      console.error("Execution response:", error.response?.data);
      console.error("Execution headers:", error.response?.headers);
    }

    console.log({ error: error, reason: "In Poll Batch Results" });
    throw error;
  }
}


export  const sleep = (ms:number)=>new Promise((resolve)=> setTimeout(resolve,ms));