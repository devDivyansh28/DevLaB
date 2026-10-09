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

    const filteredProblems = useMemo(() => {
      if (!problems || !Array.isArray(problems)) return [];

      const searchLower = (search || "").toLowerCase().trim();

      return problems.filter((problem: any) => {
        const matchesSearch =
          searchLower === "" ||
          problem.title?.toLowerCase().includes(searchLower);

        // Direct comparison — no .toLowerCase() needed!
        const matchesDifficulty =
          difficulty === "ALL" || problem.difficulty === difficulty;

        const matchesTag =
          selectedTag === "ALL" || Boolean(problem.tags?.includes(selectedTag));

        return matchesSearch && matchesDifficulty && matchesTag;
      });
    }, [problems, search, difficulty, selectedTag]);

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