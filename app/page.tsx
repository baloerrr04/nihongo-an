import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import RecommendationCard from '@/components/dashboard/RecommendationCard'
import LearningRoadmap from '@/components/dashboard/LearningRoadmap'
import DashboardHero from '@/components/dashboard/DashboardHero'

export default async function Index() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return (
      <div className="flex-1 w-full flex flex-col items-center pt-20 px-4">
        <DashboardHero user={null} />
      </div>
    )
  }

  // Fetch data for authenticated user
  const { data: progress } = await supabase
    .from('learning_progress')
    .select('*')
    .eq('user_id', user.id)

  // 1. Recommendation Logic
  const modulesMeta = [
    { id: 'hiragana', title: 'Hiragana', description: 'The foundation of Japanese reading.', color: 'bg-neo-secondary' },
    { id: 'katakana', title: 'Katakana', description: 'Specialized alphabet for foreign words.', color: 'bg-neo-primary' },
    { id: 'kanji', title: 'Kanji N5', description: 'Essential characters for daily life.', color: 'bg-[#ff9f43]' },
    { id: 'vocabulary', title: 'Vocabulary', description: 'Expand your word bank.', color: 'bg-neo-accent' },
    { id: 'grammar', title: 'Grammar', description: 'Connect words into sentences.', color: 'bg-[#b8e994]' },
  ]

  const completedModules = progress?.map(p => p.module_type) || []
  const notPracticed = modulesMeta.filter(m => !completedModules.includes(m.id))
  
  let recommended = notPracticed.length > 0 
    ? notPracticed[0]
    : modulesMeta.sort((a, b) => {
        const pA = progress?.find(p => p.module_type === a.id)
        const pB = progress?.find(p => p.module_type === b.id)
        return new Date(pA?.completed_at || 0).getTime() - new Date(pB?.completed_at || 0).getTime()
      })[0]

  // 2. Roadmap Logic
  const roadmapModules = modulesMeta.map((m, index) => {
    const isCompleted = completedModules.includes(m.id)
    const isLocked = index === 0 ? false : !completedModules.includes(modulesMeta[index-1].id)
    return { ...m, isCompleted, isLocked }
  })

  return (
    <div className="flex-1 w-full flex flex-col items-center pt-8 sm:pt-12 px-4 pb-20 overflow-x-hidden">
      <RecommendationCard recommendation={recommended} />
      <DashboardHero user={user} />
      <LearningRoadmap modules={roadmapModules} />
    </div>
  )
}

