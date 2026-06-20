import type { Metadata } from 'next'
import Link from 'next/link'
import { buildPageMetadata } from '@/lib/seo'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'
import { EditableLocalLoginForm } from '@/editable/components/EditableLocalAuthForms'
import { pagesContent } from '@/editable/content/pages.content'

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({ path: '/login', title: 'Login', description: pagesContent.auth.login.metadataDescription })
}

export default function LoginPage() {
  return (
    <EditableSiteShell>
      <main className="min-h-screen bg-[var(--slot4-page-bg)] px-4 py-8 text-[#111] sm:px-6 lg:px-8 lg:py-10">
        <section className="mx-auto grid max-w-[980px] overflow-hidden border border-black bg-[var(--slot4-surface-bg)] lg:grid-cols-[.86fr_1.14fr]">
          <div className="flex min-h-64 flex-col justify-center border-b border-black bg-[#73a5ca] p-7 text-white sm:p-9 lg:min-h-[500px] lg:border-b-0 lg:border-r">
            <p className="publication-kicker text-[#fefddf]">{pagesContent.auth.login.badge}</p>
            <h1 className="editorial-serif mt-4 max-w-xl text-4xl font-black leading-[.94] tracking-[-.05em] sm:text-5xl">{pagesContent.auth.login.title}</h1>
            <p className="mt-5 max-w-lg text-sm leading-7 text-white/80">{pagesContent.auth.login.description}</p>
          </div>
          <div className="flex flex-col justify-center p-7 sm:p-9">
            <p className="publication-kicker text-[#e87f24]">Member access</p>
            <h2 className="editorial-serif mt-2 text-3xl font-black">{pagesContent.auth.login.formTitle}</h2>
            <EditableLocalLoginForm />
            <p className="mt-5 border-t border-black pt-5 text-sm text-black/65">New here? <Link href="/signup" className="font-black text-[#e87f24] underline-offset-4 hover:underline">{pagesContent.auth.login.createCta}</Link></p>
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}
