'use client'
import { Spinner } from '@/components/ui/spinner';
import CodeEditorPanel from '@/modules/problems/component/code-editor-panel';
import { ProblemDescription } from '@/modules/problems/component/problem-description';
import { ProblemHeader } from '@/modules/problems/component/problem-header';
import { ProblemTabs } from '@/modules/problems/component/problem-tabs';
import { useEditor } from '@/modules/problems/hooks/use-editor';
import { useProblem } from '@/modules/problems/hooks/use-problem';
import { useParams } from 'next/navigation'
import React from 'react'

const ProblemIdPage = () => {
    const params = useParams<{id:string}>();
    const {problem , isLoading } = useProblem(params.id);
    console.log("Problem is not undefinded" ,problem)
    const {
      selectedLanguage,
      setSelectedLanguage,
      code,
      setCode,
      isRunning,
      isSubmitting,
      handleRun,
      handleSubmit,
    } = useEditor(problem);
    
    console.log("Recieved Selected language in page.tsx file" , selectedLanguage)
    if(isLoading){
        return <div className='flex flex-col items-center justify-center h-screen'>
           <Spinner/>
        </div>
    }   
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto p-6">
        <ProblemHeader problem={problem} />
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Left Panel */}
          <div className="space-y-6">
            <ProblemDescription problem={problem} />
            <ProblemTabs problem={problem} />
          </div>

          {/* Right Panel */}
          <div className="space-y-6">
            <CodeEditorPanel
            code = {code}
            onCodeChange={setCode}
            selectedLanguage={selectedLanguage}
            onLanguageChange={setSelectedLanguage}
            onRun = {handleRun}
            onSubmit ={handleSubmit}
            isRunning = {isRunning}
            isSubmitting = {isSubmitting}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProblemIdPage
