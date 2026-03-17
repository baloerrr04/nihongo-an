'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

type Language = 'en' | 'jp'

type Translations = {
  [key in Language]: {
    [key: string]: string
  }
}

const translations: Translations = {
  en: {
    'nav.home': 'Home',
    'nav.logout': 'Logout',
    'nav.login': 'Login',
    'nav.streak': 'DAY STREAK',
    'hero.title': 'Nihongo App',
    'hero.subtitle': 'Empowering your Japanese journey through Neobrutalist simplicity.',
    'hero.getStarted': 'Get Started',
    'dashboard.journey': 'My Journey',
    'dashboard.roadmap': 'Follow the path to mastery.',
    'dashboard.todaysPick': "TODAY'S PICK",
    'dashboard.letsGo': "LET'S GO!",
    'dashboard.roadmap.title': 'Learning Journey',
    'roadmap.completed': 'COMPLETED',
    'roadmap.locked': 'Locked',
    'roadmap.ready': 'Ready for your first session?',
    'roadmap.lockedDesc': 'Complete previous steps to unlock',
    'roadmap.completedDesc': 'Challenge again to keep the streak!',
    'footer.madeBy': 'made by',
    'quiz.setup': 'Setup',
    'quiz.configure': 'Configure your quiz before starting.',
    'quiz.selectLevel': 'Select JLPT Level',
    'quiz.questionCount': 'Number of Questions',
    'quiz.start': 'START QUIZ',
    'quiz.return': 'Return to Dashboard',
    'quiz.back': 'Back',
    'quiz.exit': 'Exit Quiz',
    'quiz.complete': 'Quiz Complete!',
    'quiz.pts': 'PTS',
    'quiz.answered': 'You answered',
    'quiz.outOf': 'out of',
    'quiz.correctly': 'questions correctly.',
    'quiz.saving': 'Saving your progress...',
    'quiz.backToDashboard': 'Back to Dashboard',
    'quiz.question': 'Question',
    'quiz.of': 'of',
    'quiz.score': 'Score',
    'quiz.whatIsReading': 'What is the reading?',
    'quiz.correctPoints': 'Correct! +10 Points',
    'quiz.incorrect': 'Incorrect. The answer is',
    'pwa.install': 'Install App',
  },
  jp: {
    'nav.home': 'ホーム',
    'nav.logout': 'ログアウト',
    'nav.login': 'ログイン',
    'nav.streak': '日連続',
    'hero.title': '日本語アプリ',
    'hero.subtitle': 'ネオブライタリズムなデザインで、楽しく日本語をマスターしましょう。',
    'hero.getStarted': 'はじめる',
    'dashboard.journey': 'マイ・ジャーニー',
    'dashboard.roadmap': 'マスターへの道。',
    'dashboard.todaysPick': '今日のオススメ',
    'dashboard.letsGo': 'スタート！',
    'dashboard.roadmap.title': '学習ロードマップ',
    'roadmap.completed': '完了',
    'roadmap.locked': 'ロック中',
    'roadmap.ready': '最初のセッションを始めましょう',
    'roadmap.lockedDesc': '前のステップを完了するとロックが解除されます',
    'roadmap.completedDesc': '復習して記録を伸ばそう！',
    'footer.madeBy': '制作：',
    'quiz.setup': '設定',
    'quiz.configure': 'クイズを開始する前に設定してください。',
    'quiz.selectLevel': 'JLPTレベルを選択',
    'quiz.questionCount': '問題数',
    'quiz.start': 'クイズ開始',
    'quiz.return': 'ダッシュボードに戻る',
    'quiz.back': '戻る',
    'quiz.exit': '中断する',
    'quiz.complete': 'クイズ完了！',
    'quiz.pts': '点',
    'quiz.answered': '',
    'quiz.outOf': '問中',
    'quiz.correctly': '問正解しました！',
    'quiz.saving': '保存中...',
    'quiz.backToDashboard': 'ダッシュボードに戻る',
    'quiz.question': '問題',
    'quiz.of': '集',
    'quiz.score': 'スコア',
    'quiz.whatIsReading': '読み方は何ですか？',
    'quiz.correctPoints': '正解！ +10点',
    'quiz.incorrect': '不正解。正解は',
    'pwa.install': 'アプリをインストール',
  }
}

type LanguageContextType = {
  lang: Language
  setLang: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Language>('en')

  // Load from local storage
  useEffect(() => {
    const savedLang = localStorage.getItem('app-lang') as Language
    if (savedLang && (savedLang === 'en' || savedLang === 'jp')) {
      setLang(savedLang)
    }
  }, [])

  const handleSetLang = (newLang: Language) => {
    setLang(newLang)
    localStorage.setItem('app-lang', newLang)
  }

  const t = (key: string) => {
    return translations[lang][key] || key
  }

  return (
    <LanguageContext.Provider value={{ lang, setLang: handleSetLang, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useTranslation() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useTranslation must be used within a LanguageProvider')
  }
  return context
}
