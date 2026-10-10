"use client"
import { Spinner } from '@/components/ui/spinner';
import { ProblemHeader } from '@/modules/problems/component/problem-header';
import { useProblem } from '@/modules/problems/hooks/use-problem';
import { useParams } from 'next/navigation'
import React from 'react'

const ProblemIdPage = () => {
    const params = useParams<{id:string}>();
    const {problem , isLoading } = useProblem(params.id)
    if(isLoading){
        return <div className='flex flex-col items-center justify-center h-screen'>
           <Spinner/>
        </div>
    }   
  return (
    <div className='min-h-screen bg-background'>
        <div className='max-w-7xl mx-auto p-6'>
             <ProblemHeader problem = {problem} />
        </div>
      
    </div>
  )
}

export default ProblemIdPage
