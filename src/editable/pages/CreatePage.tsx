'use client'

import { FormEvent, useMemo, useState } from 'react'
import Link from 'next/link'
import { ArrowRight, CheckCircle2, FileText, ImageIcon, Lock, PlusCircle, Send, Sparkles } from 'lucide-react'
import { SITE_CONFIG, type TaskKey } from '@/lib/site-config'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'
import { useEditableLocalAuthSession } from '@/editable/components/EditableLocalAuthForms'
import { pagesContent } from '@/editable/content/pages.content'

type DraftPost = {
  id: string
  task: TaskKey
  title: string
  category: string
  summary: string
  url: string
  image: string
  body: string
  createdAt: string
}

const STORE_KEY = 'slot4:created-posts'

const taskIcon: Record<string, typeof FileText> = {
  article: FileText,
  listing: Sparkles,
  classified: PlusCircle,
  image: ImageIcon,
  profile: Sparkles,
  pdf: FileText,
  sbm: ArrowRight,
}

const fieldClass = 'w-full border border-black/30 bg-white px-4 py-3 text-sm text-black outline-none transition placeholder:text-black/40 focus:border-[#e87f24] focus:ring-2 focus:ring-[#ffc81e]/45'

const saveDraft = (draft: DraftPost) => {
  try {
    const existing = JSON.parse(window.localStorage.getItem(STORE_KEY) || '[]')
    const list = Array.isArray(existing) ? existing : []
    window.localStorage.setItem(STORE_KEY, JSON.stringify([draft, ...list].slice(0, 50)))
  } catch {
    window.localStorage.setItem(STORE_KEY, JSON.stringify([draft]))
  }
}

export default function CreatePage() {
  const { session } = useEditableLocalAuthSession()
  const enabledTasks = useMemo(() => SITE_CONFIG.tasks.filter((task) => task.enabled), [])
  const [task, setTask] = useState<TaskKey>((enabledTasks[0]?.key || 'article') as TaskKey)
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('')
  const [summary, setSummary] = useState('')
  const [url, setUrl] = useState('')
  const [image, setImage] = useState('')
  const [body, setBody] = useState('')
  const [created, setCreated] = useState<DraftPost | null>(null)

  const activeTask = enabledTasks.find((item) => item.key === task) || enabledTasks[0]

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const draft: DraftPost = {
      id: `draft-${Date.now()}`,
      task,
      title: title.trim(),
      category: category.trim() || 'uncategorized',
      summary: summary.trim(),
      url: url.trim(),
      image: image.trim(),
      body: body.trim(),
      createdAt: new Date().toISOString(),
    }
    saveDraft(draft)
    setCreated(draft)
    setTitle('')
    setCategory('')
    setSummary('')
    setUrl('')
    setImage('')
    setBody('')
  }

  if (!session) {
    return (
      <EditableSiteShell>
        <main className="min-h-screen bg-[var(--slot4-page-bg)] px-4 py-10 text-black sm:px-6 lg:px-8 lg:py-14">
          <section className="mx-auto grid max-w-4xl overflow-hidden border border-black bg-[var(--slot4-surface-bg)] md:grid-cols-[.8fr_1.2fr]">
            <div className="flex min-h-56 items-center justify-center bg-[#73a5ca] text-white md:min-h-full">
              <Lock className="h-20 w-20 opacity-80" />
            </div>
            <div className="self-center p-7 sm:p-10">
              <p className="publication-kicker text-[#e87f24]">{pagesContent.create.locked.badge}</p>
              <h1 className="editorial-serif mt-4 text-4xl font-black leading-[.96] tracking-[-.05em] sm:text-5xl">{pagesContent.create.locked.title}</h1>
              <p className="mt-5 max-w-xl text-base leading-7 text-black/65">{pagesContent.create.locked.description}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/login" className="inline-flex items-center gap-2 bg-black px-6 py-3 text-xs font-black uppercase tracking-[.14em] text-white">Login <ArrowRight className="h-4 w-4" /></Link>
                <Link href="/signup" className="inline-flex items-center gap-2 border border-black bg-white px-6 py-3 text-xs font-black uppercase tracking-[.14em]">Sign up</Link>
              </div>
            </div>
          </section>
        </main>
      </EditableSiteShell>
    )
  }

  return (
    <EditableSiteShell>
      <main className="min-h-screen bg-[var(--slot4-page-bg)] text-black">
        <section className="border-b border-black bg-[var(--slot4-surface-bg)]">
          <div className="mx-auto max-w-[1120px] px-4 py-9 sm:px-6 lg:px-8 lg:py-12">
            <p className="publication-kicker text-[#e87f24]">{pagesContent.create.hero.badge}</p>
            <div className="mt-3 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"><div><h1 className="editorial-serif text-4xl font-black leading-none tracking-[-.05em] sm:text-5xl">{pagesContent.create.hero.title}</h1><p className="mt-4 max-w-2xl text-sm leading-7 text-black/65">{pagesContent.create.hero.description}</p></div><span className="border border-black bg-[#ffc81e] px-4 py-2 text-xs font-black uppercase tracking-[.14em]">{session.name}</span></div>
          </div>
        </section>
        <section className="mx-auto max-w-[1120px] px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
          <div className="grid gap-7 lg:grid-cols-[240px_minmax(0,1fr)] lg:items-start">
            <aside className="border-t-4 border-black pt-4">
              <p className="publication-kicker text-black/55">Choose a format</p>
              <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-1">
                {enabledTasks.map((item) => {
                  const Icon = taskIcon[item.key] || FileText
                  const active = item.key === task
                  return (
                    <button key={item.key} type="button" onClick={() => setTask(item.key)} className={`border p-4 text-left transition ${active ? 'border-black bg-black text-white' : 'border-black/25 bg-[var(--slot4-surface-bg)] hover:border-[#e87f24] hover:bg-[#fff7c7]'}`}>
                      <Icon className="h-5 w-5" />
                      <span className="mt-2 block text-sm font-black">{item.label}</span>
                      <span className="mt-1 block text-xs leading-5 opacity-65">{item.description}</span>
                    </button>
                  )
                })}
              </div>
            </aside>

            <form onSubmit={submit} className="border border-black bg-[var(--slot4-surface-bg)] p-5 shadow-[8px_8px_0_#ffc81e] sm:p-7">
              <div className="flex flex-wrap items-start justify-between gap-3 border-b border-black pb-5">
                <div>
                  <p className="publication-kicker text-[#e87f24]">Create {activeTask?.label || 'post'}</p>
                  <h2 className="mt-2 text-3xl font-black tracking-[-.055em]">{pagesContent.create.formTitle}</h2>
                </div>
                <span className="bg-[#d8e7f0] px-3 py-2 text-[10px] font-black uppercase tracking-[.14em]">Required fields marked by form</span>
              </div>

              <div className="mt-6 grid gap-4">
                <input className={fieldClass} value={title} onChange={(event) => setTitle(event.target.value)} placeholder="Post title" required />
                <div className="grid gap-4 sm:grid-cols-2">
                  <input className={fieldClass} value={category} onChange={(event) => setCategory(event.target.value)} placeholder="Category" />
                  <input className={fieldClass} value={url} onChange={(event) => setUrl(event.target.value)} placeholder="Website or source URL" />
                </div>
                <input className={fieldClass} value={image} onChange={(event) => setImage(event.target.value)} placeholder="Featured image URL" />
                <textarea className={`${fieldClass} min-h-24 resize-y`} value={summary} onChange={(event) => setSummary(event.target.value)} placeholder="Short summary" required />
                <textarea className={`${fieldClass} min-h-40 resize-y`} value={body} onChange={(event) => setBody(event.target.value)} placeholder="Main content, details, notes, or description" required />
              </div>

              {created ? (
                <div className="mt-5 border border-emerald-700 bg-emerald-50 p-4 text-emerald-900">
                  <p className="flex items-center gap-2 text-sm font-black"><CheckCircle2 className="h-5 w-5" /> {pagesContent.create.successTitle}</p>
                  <p className="mt-1 text-sm font-semibold opacity-80">{created.title}</p>
                </div>
              ) : null}

              <button type="submit" className="mt-5 inline-flex h-12 w-full items-center justify-center gap-2 bg-[#e87f24] px-6 text-sm font-black uppercase tracking-[0.18em] text-white transition hover:bg-black">
                <Send className="h-4 w-4" /> {pagesContent.create.submitLabel}
              </button>
            </form>
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}
