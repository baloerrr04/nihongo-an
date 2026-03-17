'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { useTranslation } from '@/context/LanguageContext'

type Question = {
  id: string
  question: string
  answer: string
  options: string[]
}

export default function QuizClient({ 
  questions, 
  userId, 
  moduleType 
}: { 
  questions: Question[], 
  userId: string, 
  moduleType: string 
}) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [showResult, setShowResult] = useState(false)
  
  const [currentOptions, setCurrentOptions] = useState<string[]>([])
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)
  const [savingLoading, setSavingLoading] = useState(false)

  const { lang, t } = useTranslation()
  const router = useRouter()
  const supabase = createClient()
  const currentQ = questions[currentIndex]

  useEffect(() => {
    if (currentQ) {
      // mix correct answer with the false options
      const allOptions = [...currentQ.options, currentQ.answer]
      // shuffle randomly
      setCurrentOptions(allOptions.sort(() => Math.random() - 0.5))
      setSelectedAnswer(null)
      setIsCorrect(null)
    }
  }, [currentIndex, currentQ])

  const handleAnswer = (option: string) => {
    if (selectedAnswer !== null) return // prevent multiple clicks
    
    setSelectedAnswer(option)
    const correct = option === currentQ.answer
    setIsCorrect(correct)
    
    if (correct) {
      setScore(prev => prev + 10)
    }

    // Move to next question after small delay
    setTimeout(() => {
      if (currentIndex + 1 < questions.length) {
        setCurrentIndex(prev => prev + 1)
      } else {
        finishQuiz()
      }
    }, 1500)
  }

  const finishQuiz = async () => {
    setShowResult(true)
    setSavingLoading(true)

    // Check if progress already exists
    const { data: existingProgress } = await supabase
      .from('learning_progress')
      .select('*')
      .eq('user_id', userId)
      .eq('module_type', moduleType)
      .single()

    if (existingProgress) {
        // Update
        await supabase
        .from('learning_progress')
        .update({ 
            score: (existingProgress.score || 0) + score, 
            completed_at: new Date().toISOString() 
        })
        .eq('id', existingProgress.id)
    } else {
        // Insert
        await supabase
        .from('learning_progress')
        .insert({
            user_id: userId,
            module_type: moduleType,
            level: 'basic',
            score: score,
            completed_at: new Date().toISOString()
        })
    }
    
    setSavingLoading(false)
  }

  if (showResult) {
    return (
      <div className="neo-card w-full max-w-lg flex flex-col items-center gap-6 text-center">
        <h2 className="text-3xl font-bold border-b-4 border-neo-border pb-2 w-full">{t('quiz.complete')}</h2>
        
        <div className="text-7xl font-black my-4">
          {score} <span className="text-2xl font-bold">{t('quiz.pts')}</span>
        </div>
        
        <p className="text-lg">
          {lang === 'en' 
            ? `${t('quiz.answered')} ${score / 10} ${t('quiz.outOf')} ${questions.length} ${t('quiz.correctly')}`
            : `${questions.length}${t('quiz.outOf')}${score / 10}${t('quiz.correctly')}`}
        </p>

        {savingLoading ? (
            <p className="text-sm italic">{t('quiz.saving')}</p>
        ) : (
            <button 
                onClick={() => router.push('/')}
                className="neo-btn w-full py-4 text-xl mt-4"
            >
             {t('quiz.backToDashboard')}
            </button>
        )}
      </div>
    )
  }

  if (!currentQ) return null;

  return (
    <div className="neo-card w-full max-w-lg flex flex-col gap-6 relative overflow-hidden">
      
      {/* Progress Bar */}
      <div className="w-full bg-neutral-200 h-4 border-2 border-neo-border absolute top-0 left-0">
        <div 
          className="h-full bg-neo-primary border-r-2 border-neo-border transition-all duration-300"
          style={{ width: `${((currentIndex) / questions.length) * 100}%` }}
        ></div>
      </div>

      <div className="mt-4 flex justify-between items-center text-sm font-bold opacity-60">
        <span>{t('quiz.question')} {currentIndex + 1} {t('quiz.of')} {questions.length}</span>
        <div className="flex items-center gap-4">
          <span>{t('quiz.score')}: {score}</span>
          <button 
            onClick={() => {
              if (confirm(lang === 'en' ? 'Are you sure you want to exit? Your progress will not be saved.' : '中断してもよろしいですか？進捗は保存されません。')) {
                router.push('/')
              }
            }}
            className="text-[10px] uppercase tracking-wider bg-neo-primary text-white px-2 py-1 border border-neo-border shadow-[1px_1px_0_0_#111111] hover:bg-black transition-colors"
          >
            {t('quiz.exit')}
          </button>
        </div>
      </div>
      
      <div className="flex flex-col items-center justify-center py-10">
        <span className="text-8xl font-black mb-4">{currentQ.question}</span>
        <span className="text-sm font-semibold uppercase tracking-widest text-neutral-500">
            {t('quiz.whatIsReading')}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {currentOptions.map((option, i) => {
          
          let btnClass = "neo-btn w-full h-16 text-2xl "
          
          if (selectedAnswer !== null) {
            if (option === currentQ.answer) {
              btnClass += " bg-[#b8e994] pointer-events-none" // Correct
            } else if (option === selectedAnswer) {
              btnClass += " bg-neo-primary text-white pointer-events-none" // Wrong guess
            } else {
              btnClass += " opacity-50 pointer-events-none" // Other disabled
            }
          } else {
             btnClass += " bg-white hover:bg-neo-accent"
          }

          return (
            <button
              key={i}
              onClick={() => handleAnswer(option)}
              className={btnClass}
              disabled={selectedAnswer !== null}
            >
              {option}
            </button>
          )
        })}
      </div>

      {isCorrect !== null && (
         <div className={`mt-4 p-4 border-2 border-neo-border font-bold text-center ${isCorrect ? 'bg-[#b8e994]' : 'bg-neo-primary text-white'}`}>
            {isCorrect ? t('quiz.correctPoints') : `${t('quiz.incorrect')} ${currentQ.answer}.`}
         </div>
      )}

    </div>
  )
}
