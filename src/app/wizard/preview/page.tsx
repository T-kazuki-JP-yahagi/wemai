'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { NavBar } from '@/components/ui/NavBar'
import { Button } from '@/components/ui/Button'
import type { GeneratedFile } from '@/types'

const PREVIEW_LINES = 5

export default function PreviewPage() {
  const [files, setFiles] = useState<GeneratedFile[]>([])
  const [activeTab, setActiveTab] = useState(0)

  useEffect(() => {
    const raw = sessionStorage.getItem('wizard_files')
    if (raw) setFiles(JSON.parse(raw))
  }, [])

  const handleDownloadZip = async () => {
    const { default: JSZip } = await import('jszip')
    const zip = new JSZip()
    const folder = zip.folder('.claude')!

    files.forEach((f) => {
      if (f.key === 'CLAUDE.md') {
        zip.file('CLAUDE.md', f.content)
      } else {
        folder.file(f.filename, f.content)
      }
    })

    const blob = await zip.generateAsync({ type: 'blob' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'wemai_config.zip'
    a.click()
    URL.revokeObjectURL(url)
  }

  if (files.length === 0) {
    return (
      <div className="flex flex-col min-h-screen">
        <NavBar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <p className="text-slate-500 mb-4">ファイルが見つかりません</p>
            <Link href="/wizard" className="btn-primary">
              ウィザードに戻る
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const active = files[activeTab]
  const lines = active?.content?.split('\n') ?? []
  const visibleLines = lines.slice(0, PREVIEW_LINES)
  const hiddenLines = lines.slice(PREVIEW_LINES)
  const hasHidden = hiddenLines.length > 0

  return (
    <div className="flex flex-col min-h-screen">
      <NavBar backHref="/account" backLabel="マイページへ" />

      <div className="flex-1 max-w-4xl mx-auto w-full px-6 py-10 animate-fade-slide-in">
        {/* Header */}
        <div className="flex items-center gap-3 mb-2">
          <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600 text-lg">
            ✓
          </div>
          <h1 className="section-title">設定ファイルを生成しました！</h1>
        </div>
        <p className="section-sub mb-8 ml-11">
          回答内容をもとに {files.length} ファイルを生成しました。Pro にアップグレードして全内容をダウンロードしてください。
        </p>

        {/* File tabs */}
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm mb-6">
          <div className="flex border-b border-slate-200 bg-slate-50 overflow-x-auto">
            {files.map((f, i) => (
              <button
                key={f.key}
                onClick={() => setActiveTab(i)}
                className={`px-4 py-2.5 text-sm font-semibold whitespace-nowrap transition-colors ${
                  activeTab === i
                    ? 'bg-[#0f172a] text-orange-400'
                    : 'bg-[#1e293b] text-slate-400 hover:text-slate-200'
                }`}
              >
                {f.filename}
              </button>
            ))}
          </div>

          {/* Preview area */}
          <div className="bg-[#0f172a] font-mono text-sm text-slate-200 relative overflow-hidden">
            {/* Visible first 5 lines */}
            <div className="p-5 pb-2">
              {visibleLines.map((line, i) => (
                <div key={i} className="whitespace-pre-wrap leading-6">
                  {line || '\u00a0'}
                </div>
              ))}
            </div>

            {/* Blurred hidden lines */}
            {hasHidden && (
              <div className="relative">
                {/* Blurred content (not selectable) */}
                <div
                  className="p-5 pt-0 whitespace-pre-wrap leading-6"
                  style={{
                    filter: 'blur(5px)',
                    userSelect: 'none',
                    WebkitUserSelect: 'none',
                    MozUserSelect: 'none',
                    msUserSelect: 'none',
                    pointerEvents: 'none',
                  }}
                  aria-hidden="true"
                >
                  {hiddenLines.join('\n')}
                </div>

                {/* Overlay with CTA */}
                <div
                  className="absolute inset-0 flex flex-col items-center justify-center"
                  style={{
                    background:
                      'linear-gradient(to bottom, rgba(15,23,42,0.2) 0%, rgba(15,23,42,0.82) 35%, rgba(15,23,42,0.97) 100%)',
                  }}
                >
                  <div className="text-center px-6 py-4">
                    <div className="text-3xl mb-2">🔒</div>
                    <p className="text-white font-bold text-base mb-1">
                      続きは Pro で確認できます
                    </p>
                    <p className="text-slate-400 text-sm mb-4">
                      残り {hiddenLines.length} 行 — Pro を購入して全ファイルをダウンロード
                    </p>
                    <Link
                      href="/upgrade"
                      className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm px-6 py-2.5 rounded-lg transition-colors"
                    >
                      Pro を購入する ¥980（買い切り）→
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-4 flex-wrap">
          <Button
            onClick={handleDownloadZip}
            className="flex items-center gap-2 opacity-40 cursor-not-allowed"
            disabled
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            ZIP でダウンロード（Pro のみ）
          </Button>
          <Link href="/upgrade" className="btn-primary px-6 py-3">
            ⭐ Pro を購入して全データをDL
          </Link>
          <Link href="/wizard" className="btn-secondary px-6 py-3">
            🔄 設定を変えて再生成
          </Link>
        </div>

        {/* Summary */}
        <div className="mt-8 bg-slate-50 rounded-xl p-5 border border-slate-200">
          <h3 className="font-bold text-[#0f2744] mb-3">生成サマリー</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-black text-orange-500">{files.length}</div>
              <div className="text-xs text-slate-500">生成ファイル数</div>
            </div>
            <div>
              <div className="text-2xl font-black text-orange-500">7</div>
              <div className="text-xs text-slate-500">回答した質問数</div>
            </div>
            <div>
              <div className="text-2xl font-black text-orange-500">2.1s</div>
              <div className="text-xs text-slate-500">生成時間</div>
            </div>
            <div>
              <div className="text-2xl font-black text-orange-500">ZIP</div>
              <div className="text-xs text-slate-500">ダウンロード形式</div>
            </div>
          </div>
        </div>

        {/* Contact */}
        <div className="mt-6 text-center">
          <a
            href="https://x.com/yahagi_kongou"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-600 transition-colors"
          >
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.738l7.73-8.835L1.254 2.25H8.08l4.259 5.631 5.905-5.631zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
            お問い合わせは @yahagi_kongou まで
          </a>
        </div>

        {/* Powered by badge */}
        <p className="text-xs text-slate-400 text-center mt-3">
          Generated by WeMAI — Powered by{' '}
          <a href="https://claude.ai" className="text-orange-400 underline" target="_blank" rel="noopener noreferrer">
            Claude
          </a>{' '}
          (Anthropic)
        </p>
      </div>
    </div>
  )
}
