'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useUser } from '@clerk/nextjs'
import { NavBar } from '@/components/ui/NavBar'
import { Button } from '@/components/ui/Button'

// Dummy session history type
interface SessionSummary {
  id: string
  createdAt: string
  fileCount: number
  projectType: string
  language: string
}

export default function AccountPage() {
  const { user, isLoaded } = useUser()
  const [sessions, setSessions] = useState<SessionSummary[]>([])

  useEffect(() => {
    // TODO: Supabase からセッション履歴を取得
    // For now, check sessionStorage for the most recent session
    const raw = sessionStorage.getItem('wizard_answers')
    if (raw) {
      try {
        const answers = JSON.parse(raw)
        setSessions([
          {
            id: `sess_${Date.now()}`,
            createdAt: new Date().toISOString(),
            fileCount: 2,
            projectType: answers.q1_projectType || 'web',
            language: answers.q2_language || 'typescript',
          },
        ])
      } catch {
        // ignore
      }
    }
  }, [])

  const projectLabels: Record<string, string> = {
    web: 'Web アプリ',
    mobile: 'モバイル',
    cli: 'CLI / バックエンド',
    data: 'データ / ML',
  }

  const langLabels: Record<string, string> = {
    typescript: 'TypeScript',
    javascript: 'JavaScript',
    python: 'Python',
    go: 'Go',
  }

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <NavBar />

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-56 border-r border-slate-200 bg-white pt-8 px-4 hidden md:block">
          <nav className="space-y-1">
            <Link href="/account" className="sidebar-link active">
              🏠 マイページ
            </Link>
            <Link href="/wizard" className="sidebar-link">
              🧙 ウィザード
            </Link>
            <Link href="/upgrade" className="sidebar-link">
              ⭐ プランを見る
            </Link>
          </nav>
        </aside>

        {/* Main */}
        <main className="flex-1 px-6 py-8 max-w-4xl">
          {/* User greeting */}
          <div className="mb-8">
            <h1 className="text-2xl font-black text-[#0f2744] mb-1">
              {isLoaded && user ? `こんにちは、${user.firstName || user.emailAddresses[0]?.emailAddress}さん` : 'マイページ'}
            </h1>
            <p className="text-slate-500 text-sm">Claude Code 設定の管理・ダウンロードができます</p>
          </div>

          {/* Plan badge */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 mb-6 flex items-center justify-between">
            <div>
              <div className="text-sm text-slate-500 mb-1">現在のプラン</div>
              <div className="font-bold text-[#0f2744] text-lg flex items-center gap-2">
                Free
                <span className="text-xs font-normal text-slate-400">CLAUDE.md + settings.json のみ</span>
              </div>
            </div>
            <Link href="/upgrade" className="btn-primary px-5 py-2 text-sm">
              Pro にアップグレード ✨
            </Link>
          </div>

          {/* Quick actions */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            <Link
              href="/wizard"
              className="bg-white rounded-xl border border-slate-200 p-5 hover:border-orange-300 hover:shadow-sm transition-all group"
            >
              <div className="text-2xl mb-2">🧙</div>
              <div className="font-bold text-[#0f2744] group-hover:text-orange-600 transition-colors">
                新しい設定を生成
              </div>
              <div className="text-sm text-slate-500 mt-1">7問に答えて最適な設定ファイルを作成</div>
            </Link>
            <Link
              href="/wizard/preview"
              className="bg-white rounded-xl border border-slate-200 p-5 hover:border-orange-300 hover:shadow-sm transition-all group"
            >
              <div className="text-2xl mb-2">📄</div>
              <div className="font-bold text-[#0f2744] group-hover:text-orange-600 transition-colors">
                最新の設定を確認
              </div>
              <div className="text-sm text-slate-500 mt-1">前回生成した設定ファイルをプレビュー・再ダウンロード</div>
            </Link>
          </div>

          {/* Session history */}
          <div>
            <h2 className="font-bold text-[#0f2744] mb-4">生成履歴</h2>
            {sessions.length === 0 ? (
              <div className="bg-white rounded-xl border border-slate-200 p-8 text-center text-slate-500">
                <div className="text-3xl mb-3">📭</div>
                <p className="mb-4">まだ設定ファイルを生成していません</p>
                <Link href="/wizard" className="btn-primary px-6 py-2 text-sm">
                  ウィザードを開始する
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                {sessions.map((s) => (
                  <div key={s.id} className="bg-white rounded-xl border border-slate-200 p-4 flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-[#0f2744] text-sm">
                        {projectLabels[s.projectType] || s.projectType} /{' '}
                        {langLabels[s.language] || s.language}
                      </div>
                      <div className="text-xs text-slate-400 mt-0.5">
                        {new Date(s.createdAt).toLocaleDateString('ja-JP')} · {s.fileCount}ファイル
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Link href="/wizard/preview" className="btn-outline px-4 py-1.5 text-xs">
                        プレビュー
                      </Link>
                      <Link href="/wizard" className="btn-secondary px-4 py-1.5 text-xs">
                        再生成
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}
