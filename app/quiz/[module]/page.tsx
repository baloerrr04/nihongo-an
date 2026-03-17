import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import QuizClient from '@/components/quiz/QuizClient'
import QuizSetup from '@/components/quiz/QuizSetup'

export default async function QuizPage({
  params,
  searchParams,
}: {
  params: Promise<{ module: string }>
  searchParams: Promise<{ count?: string; level?: string; start?: string }>
}) {
  const resolvedParams = await params
  const resolvedSearchParams = await searchParams
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const module = resolvedParams.module
  const count = resolvedSearchParams.count ? parseInt(resolvedSearchParams.count) : null
  const level = resolvedSearchParams.level || (module === 'kanji' ? null : 'basic')

  // If configuration is missing OR start is not present, show the setup screen
  if (!count || (module === 'kanji' && !resolvedSearchParams.level) || !resolvedSearchParams.start) {
    return (
      <QuizSetup 
        module={module}
        count={count}
        level={level}
        resolvedSearchParams={resolvedSearchParams}
      />
    )
  }

  // Fetch questions based on configuration
  let query = supabase
    .from('quiz_questions')
    .select('*')
    .eq('module_type', module)

  if (module === 'kanji' || module === 'grammar') {
    query = query.eq('level', level as string)
  }

  const { data: questionsPool, error } = await query

  if (error || !questionsPool || questionsPool.length === 0) {
    return (
      <div className="flex-1 w-full flex flex-col items-center pt-20">
        <div className="neo-card text-center gap-4 flex flex-col items-center">
          <h1 className="text-2xl font-bold">{error ? 'Database Error' : 'No Questions Found'}</h1>
          <p>
            {error 
              ? `There was an error fetching questions: ${error.message}` 
              : `We couldn't find any questions for the module: ${module} at level: ${level}`}
          </p>
          <Link href={`/quiz/${module}`} className="neo-btn px-4 py-2 mt-4">Try different settings</Link>
        </div>
      </div>
    )
  }

  // Shuffle and limit on the server
  const shuffled = [...questionsPool].sort(() => 0.5 - Math.random())
  const questions = shuffled.slice(0, count)

  return (
    <div className="flex-1 w-full flex flex-col items-center pt-10 px-4 pb-32">
      <h1 className="text-4xl font-black mb-8 capitalize">{module} Quiz ({level})</h1>

      {/* Client Component for the interactive quiz */}
      <QuizClient
        questions={questions}
        userId={user.id}
        moduleType={module}
      />
    </div>
  )
}


