'use client'

import React from 'react'
import { useTranslation } from '@/context/LanguageContext'
import Link from 'next/link'

export default function DashboardHero({ user }: { user: any }) {
  const { t } = useTranslation()

  if (!user) {
    return (
      <div className="neo-card w-full max-w-2xl text-center space-y-6 bg-neo-accent">
        <h1 className="text-6xl font-black italic">{t('hero.title')}</h1>
        <p className="text-xl font-bold">{t('hero.subtitle')}</p>
        <Link href="/login" className="neo-btn px-12 py-4 text-2xl bg-white hover:bg-neo-primary no-underline text-inherit">
          {t('hero.getStarted')}
        </Link>
      </div>
    )
  }

  return (
    <div className="w-full max-w-5xl mb-12">
      <div className="flex flex-col sm:flex-row justify-between items-end gap-4">
        <div>
          <h1 className="text-4xl sm:text-6xl font-black italic mb-2">{t('dashboard.journey')}</h1>
          <p className="text-xl font-bold opacity-60">{t('dashboard.roadmap')}</p>
        </div>
      </div>
    </div>
  )
}
