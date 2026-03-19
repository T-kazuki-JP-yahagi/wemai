import type { Metadata } from 'next'
import { ClerkProvider } from '@clerk/nextjs'
import './globals.css'

export const metadata: Metadata = {
  title: 'WeMAI — Welcome My AI',
  description: 'Claude Code 向け設定ウィザード。7つの質問に答えるだけで最適な設定ファイルを自動生成します。',
  keywords: ['Claude Code', 'AI', 'セットアップ', '設定ウィザード'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="ja">
        <body>{children}</body>
      </html>
    </ClerkProvider>
  )
}
