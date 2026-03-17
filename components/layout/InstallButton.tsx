'use client'

import React, { useState, useEffect } from 'react'
import { useTranslation } from '@/context/LanguageContext'

export default function InstallButton() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null)
  const [showButton, setShowButton] = useState(false)
  const [isIOS, setIsIOS] = useState(false)
  const { t } = useTranslation()

  useEffect(() => {
    // Detect iOS
    const isIOSDevice = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream
    setIsIOS(isIOSDevice)

    const handler = (e: any) => {
      e.preventDefault()
      setDeferredPrompt(e)
      setShowButton(true)
    }

    window.addEventListener('beforeinstallprompt', handler)

    // Also show button if it's iOS (since prompt never fires there)
    if (isIOSDevice) {
      setShowButton(true)
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handler)
    }
  }, [])

  const handleInstallClick = async () => {
    if (isIOS) {
      alert(t('pwa.iosInstructions') || 'To install: Tap the "Share" icon and then "Add to Home Screen" 📲')
      return
    }

    if (!deferredPrompt) {
      alert(t('pwa.alreadyInstalled') || 'App is ready or already installed! Check your app drawer. 🏠')
      return
    }

    deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice
    
    if (outcome === 'accepted') {
      console.log('User accepted the install prompt')
    }

    setDeferredPrompt(null)
    setShowButton(false)
  }

  // Always show the button as requested, or at least keep it functional
  return (
    <button
      onClick={handleInstallClick}
      title={t('pwa.install')}
      className="neo-btn p-2 bg-neo-accent text-lg flex items-center justify-center min-w-[44px] min-h-[44px] animate-pulse hover:animate-none"
    >
      <span className="leading-none mt-[-2px]">📲</span>
    </button>
  )
}
