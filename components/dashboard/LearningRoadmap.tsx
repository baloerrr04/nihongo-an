'use client'

import Link from 'next/link'
import { useTranslation } from '@/context/LanguageContext'

type ModuleStatus = {
  id: string
  title: string
  isCompleted: boolean
  isLocked: boolean
  color: string
}

export default function LearningRoadmap({ modules }: { modules: ModuleStatus[] }) {
  const { t } = useTranslation()

  return (
    <div className="w-full max-w-5xl my-12 px-4">
      <h2 className="text-3xl font-black mb-10 border-b-4 border-neo-border inline-block pb-2">{t('dashboard.roadmap.title')}</h2>
      
      <div className="relative flex flex-col gap-16 items-center">
        {/* Connection Line */}
        <div className="absolute top-0 bottom-0 w-2 bg-neo-border left-1/2 -translate-x-1/2 -z-10 hidden sm:block"></div>

        {modules.map((module, index) => {
          const isEven = index % 2 === 0
          
          return (
            <div 
              key={module.id} 
              className={`flex flex-col sm:flex-row items-center w-full gap-8 ${
                isEven ? 'sm:flex-row' : 'sm:flex-row-reverse'
              }`}
            >
              {/* Module Node */}
              <div className="flex-1 flex justify-center">
                <Link 
                  href={module.isLocked ? '#' : `/quiz/${module.id}`}
                  className={`
                    neo-card p-6 w-56 text-center transition-all no-underline text-inherit
                    ${module.isLocked ? 'opacity-50 grayscale cursor-not-allowed' : 'hover:scale-105 active:scale-95 group'}
                    ${module.isCompleted ? 'border-4 border-green-500' : 'border-2'}
                    ${module.color}
                  `}
                >
                  <div className="text-4xl mb-2">
                    {module.isLocked ? '🔒' : module.isCompleted ? '✅' : '🎯'}
                  </div>
                  <h3 className="text-xl font-bold">{module.title}</h3>
                  {module.isCompleted && (
                    <span className="text-xs font-black text-green-700 bg-white/50 px-2 py-0.5 rounded-full mt-2 inline-block">
                      {t('roadmap.completed')}
                    </span>
                  )}
                </Link>
              </div>

              {/* Center Spacer for Line */}
              <div className="hidden sm:flex w-12 h-12 rounded-full border-4 border-neo-border bg-white z-10 items-center justify-center font-black">
                {index + 1}
              </div>

              {/* Description/Status side */}
              <div className={`flex-1 text-center ${isEven ? 'sm:text-left' : 'sm:text-right'} hidden sm:block`}>
                <p className="text-lg font-bold opacity-70">
                  {module.isLocked ? t('roadmap.lockedDesc') : 
                   module.isCompleted ? t('roadmap.completedDesc') : 
                   t('roadmap.ready')}
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
