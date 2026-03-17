'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { useTranslation } from '@/context/LanguageContext'
import { useEffect, useState } from 'react'
import InstallButton from './InstallButton'

export default function Navbar({ initialUser, initialStreak }: { initialUser: any, initialStreak: number }) {
  const { lang, setLang, t } = useTranslation()
  const router = useRouter()
  const supabase = createClient()
  const [user, setUser] = useState(initialUser)
  const [streak, setStreak] = useState(initialStreak)

  const handleLogout = async () => {
    // Call the server-side signout route to clear cookies properly
    await fetch('/auth/signout', { method: 'POST' })
    router.push('/login')
    router.refresh()
  }

  const toggleLanguage = () => {
    setLang(lang === 'en' ? 'jp' : 'en')
  }

  return (
    <nav className="w-full border-b-4 border-neo-border bg-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <Link href="/" className="text-2xl font-black no-underline text-inherit flex items-center gap-2 group">
          <span className="bg-neo-primary p-1 border-2 border-neo-border shadow-[2px_2px_0_0_#111111] group-hover:rotate-12 transition-transform">
            {lang === 'en' ? 'N' : 'に'}
          </span> 
          <span className="hidden sm:inline">Nihongo</span>
        </Link>

        <div className="flex items-center gap-2 sm:gap-4">
          <InstallButton />
          {/* Language Switcher */}
          <button 
            onClick={toggleLanguage}
            className="neo-btn px-3 py-1 bg-neo-secondary text-xs sm:text-sm font-black uppercase"
          >
            {lang === 'en' ? 'JP 🇯🇵' : 'EN 🇺🇸'}
          </button>

          {user && (
            <>
              <div className="hidden md:flex flex-col items-end mr-2 text-right">
                <span className="text-[10px] font-black opacity-60 uppercase leading-none">Logged in as</span>
                <span className="text-sm font-black truncate max-w-[150px]">{user.email}</span>
              </div>

              <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-[#ff9f43] border-2 border-neo-border shadow-[2px_2px_0_0_#111111] rounded-[var(--radius)] font-black text-sm">
                <span>🔥</span> {streak} {t('nav.streak')}
              </div>
              
              <div className="flex items-center gap-2 sm:gap-4 ml-2">
                <button 
                  onClick={handleLogout}
                  className="neo-btn px-4 py-2 bg-neo-accent text-xs sm:text-sm"
                >
                  {t('nav.logout')}
                </button>
              </div>
            </>
          )}

          {!user && (
            <Link href="/login" className="neo-btn px-4 py-2 bg-neo-primary text-sm">
              {t('nav.login')}
            </Link>
          )}
        </div>
      </div>
      
      {/* Mobile Streak Bar */}
      {user && streak > 0 && (
        <div className="sm:hidden flex justify-center py-1 border-t-2 border-neo-border bg-[#ff9f43] font-black text-[10px] uppercase tracking-tighter">
           🔥 {streak} {t('nav.streak')}
        </div>
      )}
    </nav>
  )
}
