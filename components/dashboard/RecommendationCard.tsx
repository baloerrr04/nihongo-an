'use client'

import Link from 'next/link'
import { useTranslation } from '@/context/LanguageContext'

type RecommendedModule = {
  id: string
  title: string
  description: string
  color: string
}

export default function RecommendationCard({ recommendation }: { recommendation: RecommendedModule }) {
  const { t } = useTranslation()

  return (
    <div className="w-full max-w-5xl mb-8">
      <div className="neo-card bg-[#f1f2f6] border-4 border-neo-border relative overflow-hidden group">
        <div className="absolute top-0 right-0 bg-neo-accent px-4 py-2 border-l-4 border-b-4 border-neo-border font-black text-xs sm:text-sm shadow-[-4px_4px_0_0_#111111]">
          🔥 {t('dashboard.todaysPick')}
        </div>
        
        <div className="flex flex-col md:flex-row items-center gap-8 py-4 sm:py-8">
          <div className={`w-24 h-24 sm:w-32 sm:h-32 flex items-center justify-center text-4xl sm:text-6xl border-4 border-neo-border shadow-[4px_4px_0_0_#111111] rounded-[var(--radius)] ${recommendation.color}`}>
             {recommendation.id === 'hiragana' || recommendation.id === 'katakana' ? 'あ' : 
              recommendation.id === 'kanji' ? '字' : 
              recommendation.id === 'vocabulary' ? '単' : '文'}
          </div>
          
          <div className="flex-1 text-center md:text-left space-y-2">
            <h2 className="text-3xl font-black">{recommendation.title}</h2>
            <p className="text-lg opacity-80">{recommendation.description}</p>
          </div>
          
          <Link 
            href={`/quiz/${recommendation.id}`}
            className="neo-btn bg-neo-primary px-10 py-4 text-xl sm:text-2xl hover:scale-105 active:scale-95"
          >
            {t('dashboard.letsGo')}
          </Link>
        </div>
      </div>
    </div>
  )
}
