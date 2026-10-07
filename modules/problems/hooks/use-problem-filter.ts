import { useState , useMemo } from "react";

export function useProblemFilters(problems=[]){
    const [search , setSearch] = useState("")
    const [difficulty , setDifficulty] = useState("ALL")
    const [selectedTag , setSelectedTag] = useState("ALL")

    // Extract All the Unique tags from the problems

    const allTags = useMemo(()=>{
        const tagsSet = new Set();
        problems.forEach((p)=>p.tags?.forEach((t)=>tagsSet.add(t)));

        return Array.from(tagsSet);
    },[problems])

    const filteredProblems = useMemo(()=>{
        return problems
         .filter((problem)=>problem.title.toLowerCase().includes(search.toLowerCase())
    },[problems,search,difficulty,selectedTag])
}