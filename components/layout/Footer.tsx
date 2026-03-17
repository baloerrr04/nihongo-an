'use client'

import React from 'react'
import { useTranslation } from '@/context/LanguageContext'

export default function Footer() {
  const { lang, t } = useTranslation()

  return (
    <footer className="w-full border-t-4 border-neo-border bg-white py-6 px-4 flex-shrink-0">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="text-lg font-black italic flex items-center">
          <span className="bg-neo-secondary p-1 border-2 border-neo-border shadow-[2px_2px_0_0_#111111] mr-2 text-sm">に</span>
          Nihongo
        </div>

        <div className="group relative">
          <div className="py-2 px-6 bg-neo-accent font-black text-sm sm:text-base border-b-4 border-r-4 transition-all group-hover:translate-x-1 group-hover:translate-y-1 group-hover:shadow-none">
            {t('footer.madeBy')} <span className="underline italic text-neo-primary group-hover:text-neo-text transition-colors">baloerdev</span>
          </div>
          {/* Fun floating emoji on hover */}
          <span className="absolute -top-6 -right-2 text-2xl opacity-0 group-hover:opacity-100 group-hover:-translate-y-2 transition-all duration-300">
            🚀
          </span>
        </div>

        <p className="text-[10px] font-bold opacity-40 uppercase tracking-widest">
          © {new Date().getFullYear()} baloerdev labs
        </p>
      </div>
    </footer>
  )
}
