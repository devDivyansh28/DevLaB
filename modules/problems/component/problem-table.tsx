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
import { useProblemFilters } from '../hooks/use-problem-filter';
import { ProblemsFilters } from './problem-filter';
import { usePagination } from '../hooks/use-pagination';

const ProblemsTable = ({problems=[] , user}: any) => {
    const filters = useProblemFilters(problems);
    const pagination = usePagination(filters.filteredProblems);

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

      <Card>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Solved</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Tags</TableHead>
                <TableHead className="w-[120px]">Difficulty</TableHead>
                <TableHead className="w-[200px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pagination.paginatedItems.length > 0 ? (
                pagination.paginatedItems.map((problem) => (
                  <ProblemRow
                    key={problem.id}
                    problem={problem}
                    user={user}
                    onDelete={() => {}}
                    onSave={playlist.openAddToPlaylist}
                  />
                ))
              ) : (
                <ProblemsEmpty />
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>


    </div>
  );
}

export default ProblemsTable
