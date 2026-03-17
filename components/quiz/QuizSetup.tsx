'use client'

import React from 'react'
import { useTranslation } from '@/context/LanguageContext'
import Link from 'next/link'

export default function QuizSetup({ 
  module, 
  count, 
  level, 
  resolvedSearchParams 
}: { 
  module: string, 
  count: number | null, 
  level: string | null, 
  resolvedSearchParams: any 
}) {
  const { t } = useTranslation()

  return (
    <div className="flex-1 w-full flex flex-col items-center pt-10 sm:pt-20 px-4 pb-32">
      <div className="neo-card w-full max-w-2xl space-y-8 relative">
        {/* Back Button */}
        <Link 
          href="/" 
          className="absolute -top-12 left-0 font-black flex items-center gap-2 hover:translate-x-1 transition-transform group"
        >
          <span className="bg-white border-2 border-neo-border p-1 shadow-[2px_2px_0_0_#111111] group-hover:bg-neo-accent transition-colors">←</span>
          {t('quiz.back')}
        </Link>

        <div className="text-center">
          <h1 className="text-4xl font-black capitalize mb-2">{module} {t('quiz.setup')}</h1>
          <p>{t('quiz.configure')}</p>
        </div>

        <div className="space-y-8">
          {module === 'kanji' && (
            <div className="space-y-4">
              <h3 className="text-xl font-bold border-b-2 border-neo-border pb-2">{t('quiz.selectLevel')}</h3>
              <div className="grid grid-cols-5 gap-2">
                {['N5', 'N4', 'N3', 'N2', 'N1'].map((l) => {
                  const isSelected = resolvedSearchParams.level === l
                  const href = `/quiz/${module}?${new URLSearchParams({
                    ...(count ? { count: count.toString() } : {}),
                    ...(isSelected ? {} : { level: l })
                  }).toString()}`

                  return (
                    <Link
                      key={l}
                      href={href}
                      className={`neo-btn py-2 text-center text-sm sm:text-base transition-all no-underline ${
                        isSelected ? '!bg-neo-accent' : '!bg-neo-primary'
                      }`}
                    >
                      {l}
                    </Link>
                  )
                })}
              </div>
            </div>
          )}

          <div className="space-y-4">
            <h3 className="text-xl font-bold border-b-2 border-neo-border pb-2">{t('quiz.questionCount')}</h3>
            <div className="grid grid-cols-3 gap-4">
              {[10, 20, 30].map((c) => {
                const isSelected = count === c
                const href = `/quiz/${module}?${new URLSearchParams({
                   ...(resolvedSearchParams.level ? { level: resolvedSearchParams.level } : {}),
                   ...(isSelected ? {} : { count: c.toString() })
                }).toString()}`

                return (
                  <Link
                    key={c}
                    href={href}
                    className={`neo-btn py-4 text-xl transition-all no-underline ${
                      isSelected ? '!bg-neo-accent' : '!bg-neo-primary'
                    }`}
                  >
                    {c}
                  </Link>
                )
              })}
            </div>
          </div>

          {count && (resolvedSearchParams.level || module !== 'kanji') && (
            <div className="pt-4 flex justify-center">
              <Link
                href={`/quiz/${module}?count=${count}&level=${level}&start=true`}
                className="neo-btn px-12 py-4 text-2xl bg-neo-primary text-white hover:text-black w-full sm:w-auto text-center no-underline"
              >
                {t('quiz.start')}
              </Link>
            </div>
          )}
        </div>

        <Link href="/" className="block text-center text-sm font-bold underline">
          {t('quiz.return')}
        </Link>
      </div>
    </div>
  )
}
