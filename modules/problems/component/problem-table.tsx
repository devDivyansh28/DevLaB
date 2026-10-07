"use client"
import React from 'react';
import {
    Table,
    TableBody,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";
import {toast} from "sonner";
import { Card , CardContent } from '@/components/ui/card';
import { ProblemsHeader } from './problem-header';

const ProblemsTable = ({problems=[] , user}: any) => {
    const filters = useProblemFilters(problems);

  return (
    <div className="w-full max-w-7xl mx-auto space-y-8 p-6">
      <ProblemsHeader onCreatePlaylist={() => {}} />

      <ProblemsFilters
        search={filters.search}
        onSearchChange={filters.setSearch}
        difficulty={filters.difficulty}
        onDifficultyChange={filters.setDifficulty}
        selectedTag={filters.selectedTag}
        onTagChange={filters.setSelectedTag}
        allTags={filters.allTags}
      />
    </div>
  );
}

export default ProblemsTable
