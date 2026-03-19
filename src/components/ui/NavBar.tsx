'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import { SakuraIcon } from './SakuraIcon'

interface NavBarProps {
  variant?: 'default' | 'minimal'
  backHref?: string
  backLabel?: string
}

export function NavBar({
  variant = 'default',
  backHref,
  backLabel = '← 戻る',
}: NavBarProps) {
  const pathname = usePathname()

  return (
    <nav className="nav-bar">
      {/* ロゴ */}
      <div className="flex items-center gap-3">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-white text-[1.4rem] font-black tracking-tight">
            We<span className="text-orange-500">MAI</span>
          </span>
          <SakuraIcon size={30} />
        </Link>
        {variant === 'default' && (
          <span className="text-[0.65rem] text-slate-400 border border-slate-700 px-2 py-0.5 rounded-full">
            Powered by Claude
          </span>
        )}
      </div>

      {/* 右側 */}
      <div className="flex items-center gap-3">
        {backHref ? (
          <Link
            href={backHref}
            className="text-slate-400 text-sm hover:text-white transition-colors"
          >
            {backLabel}
          </Link>
        ) : (
          <>
            <SignedOut>
              <Link href="/login" className="btn-outline text-slate-300 border-slate-600 text-sm px-4 py-1.5">
                ログイン
              </Link>
              <Link href="/signup" className="btn-primary text-sm px-4 py-2">
                無料で始める
              </Link>
            </SignedOut>
            <SignedIn>
              <Link
                href="/wizard"
                className={`text-sm transition-colors ${
                  pathname === '/wizard'
                    ? 'text-orange-400'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                ウィザード
              </Link>
              <Link
                href="/account"
                className={`text-sm transition-colors ${
                  pathname.startsWith('/account')
                    ? 'text-orange-400'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                マイページ
              </Link>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
          </>
        )}
      </div>
    </nav>
  )
}
