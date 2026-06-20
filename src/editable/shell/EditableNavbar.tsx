'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ChevronDown, Menu, Search, X } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'
import { useEditableLocalAuthSession } from '@/editable/components/EditableLocalAuthForms'

export function EditableNavbar() {
  const [open, setOpen] = useState(false)
  const { session, logout } = useEditableLocalAuthSession()

  return (
    <header className="sticky top-0 z-50 bg-[var(--slot4-surface-bg)] text-black shadow-[0_1px_0_rgba(0,0,0,.35)]">
      <div className="hidden min-h-10 items-center justify-between bg-black px-4 text-[11px] font-bold text-white lg:flex">
        <span className="tracking-[.12em] text-[#ffc81e]">MEDIA DISTRIBUTION</span>
        <p className="text-sm tracking-[.03em]">Clear stories, thoughtfully delivered.</p>
        <Link href="/signup" className="rounded-full bg-[#e87f24] px-4 py-1.5 font-black text-white">Join the update</Link>
      </div>
      <div className="mx-auto grid min-h-[92px] max-w-[1800px] grid-cols-[auto_1fr_auto] items-center gap-5 border-b border-black px-4 sm:px-8 lg:px-10">
        <div className="flex items-center gap-3">
          <button type="button" onClick={() => setOpen((value) => !value)} className="inline-flex h-10 w-10 items-center justify-center border border-black/25 lg:hidden" aria-label="Toggle navigation">
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        <Link href="/" className="flex min-w-0 items-center gap-3 text-3xl font-black tracking-[-.075em] sm:text-5xl">
          <img src="/favicon.png" alt="" className="h-9 w-9 shrink-0 object-contain sm:h-11 sm:w-11" />
          <span className="editorial-brand truncate">{SITE_CONFIG.name}</span>
        </Link>

        <div className="flex items-center justify-end gap-4">
          {session ? (
            <>
              <button type="button" onClick={logout} className="hidden text-xs font-black uppercase tracking-[.12em] sm:block">Logout</button>
            </>
          ) : <Link href="/login" className="hidden text-xs font-black uppercase tracking-[.12em] sm:block">Log in</Link>}
          <Link href={session ? '/create' : '/signup'} className="bg-[#e87f24] px-4 py-3 text-[10px] font-black uppercase tracking-[.14em] text-white sm:px-6">
            {session ? 'Publish' : 'Subscribe'}
          </Link>
        </div>
      </div>

      <div className="border-b border-black bg-[var(--slot4-surface-bg)]">
        <div className="mx-auto flex min-h-[58px] max-w-[1800px] items-center gap-8 px-4 sm:px-8 lg:px-10">
          <nav className="hidden items-center gap-8 lg:flex">
            <Link href="/" className="text-lg font-medium">Home</Link>
            <Link href="/search" className="flex items-center gap-1 text-lg font-medium">Search <ChevronDown className="h-3 w-3" /></Link>
            <Link href="/contact" className="flex items-center gap-1 text-lg font-medium">Contact <ChevronDown className="h-3 w-3" /></Link>
          </nav>
          <form action="/search" className="ml-auto flex w-full min-w-0 items-center border border-black lg:max-w-[320px]">
            <Search className="ml-4 h-4 w-4" />
            <input name="q" type="search" placeholder="Search" className="min-w-0 flex-1 bg-transparent px-3 py-3 text-sm outline-none placeholder:text-black/55" />
          </form>
        </div>
      </div>

      {open ? (
        <div className="border-t border-black/15 bg-[var(--slot4-surface-bg)] px-4 py-4 lg:hidden">
          <div className="grid gap-px bg-black/15">
            {[{ label: 'Home', href: '/' }, { label: 'Search', href: '/search' }, { label: 'Contact', href: '/contact' }, ...(session ? [] : [{ label: 'Login', href: '/login' }, { label: 'Sign up', href: '/signup' }])].map((item) => (
              <Link key={`${item.label}-${item.href}`} href={item.href} onClick={() => setOpen(false)} className="bg-white px-4 py-3 text-sm font-black uppercase tracking-[.1em]">{item.label}</Link>
            ))}
          </div>
        </div>
      ) : null}
    </header>
  )
}
