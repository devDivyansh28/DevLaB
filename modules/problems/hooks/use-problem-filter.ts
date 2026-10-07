import { useState , useMemo } from "react";

export function useProblemFilters(problems=[]){
    const [search , setSearch] = useState("")
    const [difficulty , setDifficulty] = useState("ALL")
    const [selectedTag , setSelectedTag] = useState("ALL")

    // Extract All the Unique tags from the problems
  // @ts-ignore
    const allTags = useMemo(()=>{
      const tagsSet = new Set();
      // @ts-ignore
      problems.forEach((p) => p.tags?.forEach((t) => tagsSet.add(t)));

      return Array.from(tagsSet);
    },[problems])

    const filteredProblems = useMemo(()=>{
        return problems
        // @ts-ignore
         .filter((problem)=>problem.title.toLowerCase().includes(search.toLowerCase()))
         // @ts-ignore
         .filter((problem)=>difficulty==="All"? true : problem.difficulty===difficulty) // @ts-ignore
         .filter((problem)=>selectedTag==="All" ? true : problem.tags?.includes(selectedTag))
    },[problems,search,difficulty,selectedTag])

    return {
        search,
        difficulty,
        selectedTag,
        allTags,

        setSearch,
        setDifficulty,
        setSelectedTag,
        filteredProblems
    }

}