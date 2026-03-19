'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { NavBar } from '@/components/ui/NavBar'
import { Button } from '@/components/ui/Button'
import { WIZARD_QUESTIONS, TOTAL_STEPS } from '@/lib/wizard/questions'
import type { WizardAnswers, GeneratedFileKey } from '@/types'

const INITIAL_ANSWERS: WizardAnswers = {
  q1_projectType: '',
  q2_language: '',
  q3_teamSize: '',
  q4_reviewStyle: '',
  q5_tools: [],
  q6_instructionStyle: '',
  q7_files: ['CLAUDE.md', 'settings.json'],
}

export default function WizardPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [answers, setAnswers] = useState<WizardAnswers>(INITIAL_ANSWERS)
  const [loading, setLoading] = useState(false)

  const currentQ = WIZARD_QUESTIONS[step - 1]
  const progress = Math.round((step / TOTAL_STEPS) * 100)

  const isAnswered = () => {
    const key = currentQ.id
    if (currentQ.mode === 'multi') {
      const val = answers[key] as string[]
      return val.length > 0
    }
    return Boolean(answers[key])
  }

  const handleSingle = (value: string) => {
    setAnswers((prev) => ({ ...prev, [currentQ.id]: value }))
    if (step < TOTAL_STEPS) {
      setTimeout(() => setStep((s) => s + 1), 280)
    }
  }

  const handleMulti = (value: string) => {
    const key = currentQ.id as 'q5_tools' | 'q7_files'
    const current = answers[key] as string[]
    const next = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value]
    setAnswers((prev) => ({ ...prev, [key]: next }))
  }

  const handleNext = () => {
    if (step < TOTAL_STEPS) setStep((s) => s + 1)
  }

  const handleBack = () => {
    if (step > 1) setStep((s) => s - 1)
  }

  const handleGenerate = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/wizard/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answers }),
      })
      const data = await res.json()
      if (data.success) {
        sessionStorage.setItem('wizard_files', JSON.stringify(data.files))
        sessionStorage.setItem('wizard_answers', JSON.stringify(answers))
        router.push('/wizard/preview')
      }
    } catch {
      alert('生成中にエラーが発生しました。もう一度お試しください。')
    } finally {
      setLoading(false)
    }
  }

  const isMultiQ = currentQ.mode === 'multi'
  const multiVal = isMultiQ ? (answers[currentQ.id] as string[]) : []

  return (
    <div className="flex flex-col min-h-screen">
      <NavBar backHref="/account" backLabel="✕ 終了" />

      <div className="flex-1 max-w-2xl mx-auto w-full px-6 py-10">
        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-slate-500 mb-2">
            <span>ステップ {step} / {TOTAL_STEPS}</span>
            <span>{progress}%</span>
          </div>
          <div className="h-1 bg-slate-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-orange-500 rounded-full transition-all duration-400"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Question */}
        <div className="animate-fade-slide-in">
          <h2 className="section-title mb-1">{currentQ.title}</h2>
          <p className="section-sub mb-6">{currentQ.subtitle}</p>

          {/* Options */}
          {currentQ.mode === 'single' ? (
            <div className={currentQ.options.length <= 3 ? 'space-y-3' : 'grid grid-cols-2 gap-3'}>
              {currentQ.options.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => handleSingle(opt.value)}
                  className={`wizard-option text-left ${
                    answers[currentQ.id] === opt.value ? 'selected' : ''
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      {opt.emoji && (
                        <div className="text-xl mb-1 font-bold text-slate-600">{opt.emoji}</div>
                      )}
                      <div className="font-semibold text-sm">{opt.label}</div>
                      {opt.description && (
                        <div className="text-xs text-slate-500 mt-0.5">{opt.description}</div>
                      )}
                    </div>
                    {answers[currentQ.id] === opt.value && (
                      <svg className="w-5 h-5 text-orange-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" />
                      </svg>
                    )}
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 gap-3">
                {currentQ.options.map((opt) => {
                  const checked = multiVal.includes(opt.value)
                  return (
                    <button
                      key={opt.value}
                      onClick={() => handleMulti(opt.value)}
                      className={`wizard-option text-left ${checked ? 'selected' : ''}`}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          {opt.emoji && (
                            <div className="text-xl mb-1">{opt.emoji}</div>
                          )}
                          <div className="font-semibold text-sm">{opt.label}</div>
                          {opt.description && (
                            <div className="text-xs text-slate-500 mt-0.5">{opt.description}</div>
                          )}
                          {opt.proOnly && (
                            <span className="inline-block mt-1 text-xs font-bold text-orange-600 bg-orange-50 px-2 py-0.5 rounded-full">
                              Pro
                            </span>
                          )}
                        </div>
                        {checked && (
                          <svg className="w-5 h-5 text-orange-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" />
                          </svg>
                        )}
                      </div>
                    </button>
                  )
                })}
              </div>

              {/* Generate button on last step */}
              {step === TOTAL_STEPS ? (
                <Button
                  className="w-full mt-6"
                  onClick={handleGenerate}
                  loading={loading}
                  disabled={!isAnswered()}
                >
                  設定ファイルを生成する ✨
                </Button>
              ) : (
                <Button
                  className="w-full mt-6"
                  onClick={handleNext}
                  disabled={!isAnswered()}
                >
                  次へ →
                </Button>
              )}
            </>
          )}
        </div>

        {/* Nav buttons */}
        <div className="flex justify-between mt-8">
          {step > 1 ? (
            <Button variant="outline" onClick={handleBack}>
              ← 戻る
            </Button>
          ) : (
            <div />
          )}
        </div>
      </div>
    </div>
  )
}
