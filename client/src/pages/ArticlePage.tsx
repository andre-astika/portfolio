import { Link } from "wouter";
import SplashCursor from "@/components/SplashCursor";
import { AndrePhotoProvider, useSiteWeekend } from "@/components/AndrePhoto";
import { useRevealObserver } from "@/hooks/useKinetic";
import { ARTICLES, getArticle, type Article } from "@/data/articles";
import { siteAsset } from "@/lib/siteAsset";

type ArticlePageProps = {
  slug: string;
};

function ArticleModeSwitch() {
  const { weekend, setWeekend } = useSiteWeekend();

  return (
    <div className="mode-switch inline-flex items-center gap-1 border border-white/20 bg-black/20 p-1 font-label text-[9px] uppercase tracking-[0.18em] backdrop-blur-sm">
      <button
        type="button"
        aria-selected={!weekend}
        onClick={() => setWeekend(false)}
        className={`px-3 py-2 transition-colors ${!weekend ? "bg-white text-black" : "text-white/55 hover:text-white"}`}
      >
        Developer
      </button>
      <button
        type="button"
        aria-selected={weekend}
        onClick={() => setWeekend(true)}
        className={`px-3 py-2 transition-colors ${weekend ? "text-[var(--paper)]" : "text-white/55 hover:text-white"}`}
        style={weekend ? { backgroundColor: "var(--ink)" } : undefined}
      >
        Weekend
      </button>
    </div>
  );
}

function ArticleNavigation({ article }: { article: Article }) {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[oklch(0.08_0_0/0.82)] backdrop-blur-xl">
      <div className="container flex h-16 items-center justify-between gap-4 md:h-20">
        <Link href="/" className="flex shrink-0 items-center gap-2" aria-label="Return to Andre Astika portfolio">
          <img
            src={siteAsset("/manus-storage/logo-crosshair_5d137a18.png")}
            alt="Andre Astika mark"
            className="h-7 w-7 md:h-8 md:w-8"
          />
          <span className="font-display text-sm font-extrabold uppercase tracking-[0.25em] text-white md:text-base">
            Andre<span className="text-stroke">A</span>
          </span>
        </Link>

        <p className="hidden font-label text-[10px] uppercase tracking-[0.28em] text-white/45 lg:block">
          Thinking archive / {article.index}
        </p>

        <div className="flex items-center gap-3 md:gap-5">
          <Link href="/#case-studies" className="font-label hidden text-[10px] uppercase tracking-[0.22em] text-white/65 transition-colors hover:text-white sm:inline">
            All studies
          </Link>
          <ArticleModeSwitch />
        </div>
      </div>
    </header>
  );
}

function ArticleView({ article }: { article: Article }) {
  const { weekend } = useSiteWeekend();
  useRevealObserver();

  const currentIndex = ARTICLES.findIndex((item) => item.slug === article.slug);
  const nextArticle = ARTICLES[(currentIndex + 1) % ARTICLES.length];

  return (
    <div className={`grain site-surface relative min-h-screen overflow-hidden bg-background ${weekend ? "weekend-theme" : "developer-theme"}`}>
      <SplashCursor
        key={weekend ? "weekend" : "developer"}
        COLOR={weekend ? "#000000" : "#ffffff"}
        RAINBOW_MODE={false}
        INK_MODE={weekend}
      />
      <ArticleNavigation article={article} />

      <main id="article-top" className="relative pt-28 md:pt-36">
        <section className="container pb-16 md:pb-24">
          <div className="reveal relative grid gap-12 border-b border-white/15 pb-14 lg:grid-cols-[minmax(0,1.35fr)_minmax(14rem,0.65fr)] lg:items-end lg:pb-20">
            <div>
              <p className="font-label mb-7 text-[10px] uppercase tracking-[0.34em] text-white/45">
                {article.category} / {article.read}
              </p>
              <h1 className="max-w-5xl font-display text-5xl font-extrabold uppercase leading-[0.93] tracking-[-0.055em] text-white sm:text-6xl md:text-8xl">
                {article.title}
              </h1>
              <p className="mt-9 max-w-2xl font-serif-accent text-2xl leading-[1.22] text-white/75 md:text-3xl">
                {article.dek}
              </p>
            </div>

            <div className="relative border-l border-white/15 pl-6 md:pl-9 lg:pb-2">
              <p className="font-label text-[10px] uppercase tracking-[0.3em] text-white/40">Editorial index</p>
              <p className="mt-2 font-display text-[6rem] font-extrabold leading-none tracking-[-0.08em] text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.4)] md:text-[8rem]">
                {article.index}
              </p>
              <p className="font-label mt-4 text-[10px] uppercase tracking-[0.22em] text-white/55">Andre Astika / 2026</p>
            </div>
          </div>
        </section>

        <section className="border-y border-white/10 bg-[oklch(0.11_0_0)]">
          <div className="container grid gap-10 py-10 md:grid-cols-[0.6fr_1.4fr] md:py-14">
            <p className="font-label text-[10px] uppercase tracking-[0.3em] text-white/40">The premise</p>
            <p className="max-w-4xl font-display text-2xl font-semibold leading-snug tracking-tight text-white md:text-4xl">
              {article.premise}
            </p>
          </div>
        </section>

        <section className="container py-20 md:py-32">
          <div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_18rem] lg:gap-24">
            <div className="space-y-20 md:space-y-28">
              {article.sections.map((section, sectionIndex) => (
                <section key={section.title} className="reveal" aria-labelledby={`section-${article.slug}-${sectionIndex}`}>
                  <p className="font-label mb-5 text-[10px] uppercase tracking-[0.28em] text-white/40">{section.eyebrow}</p>
                  <h2 id={`section-${article.slug}-${sectionIndex}`} className="max-w-3xl font-display text-3xl font-extrabold uppercase leading-[0.98] tracking-[-0.035em] text-white md:text-5xl">
                    {section.title}
                  </h2>
                  <div className="mt-8 max-w-3xl space-y-5 text-base leading-[1.78] text-white/65 md:text-lg">
                    {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                  </div>
                </section>
              ))}
            </div>

            <aside className="reveal lg:sticky lg:top-28 lg:self-start">
              <div className="border-y border-white/15 py-7">
                <p className="font-label text-[10px] uppercase tracking-[0.3em] text-white/40">Field notes</p>
                <div className="mt-7 space-y-7">
                  {article.fieldNotes.map((note) => (
                    <div key={note.label}>
                      <p className="font-label text-[9px] uppercase tracking-[0.26em] text-white/35">{note.label}</p>
                      <h3 className="mt-2 font-display text-lg font-bold uppercase leading-tight text-white">{note.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-white/55">{note.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </section>

        <section className="border-y border-white/10 bg-[oklch(0.11_0_0)]">
          <div className="container grid gap-10 py-16 md:grid-cols-[1fr_1fr] md:gap-20 md:py-24">
            <blockquote className="reveal border-l border-white/35 pl-6 font-serif-accent text-3xl leading-[1.12] text-white md:pl-10 md:text-5xl">
              “{article.pullQuote}”
            </blockquote>
            <div className="reveal">
              <p className="font-label mb-7 text-[10px] uppercase tracking-[0.3em] text-white/40">Studio checklist</p>
              <ul className="divide-y divide-white/10 border-y border-white/10">
                {article.checklist.map((item, itemIndex) => (
                  <li key={item} className="flex gap-4 py-4 text-sm leading-relaxed text-white/70">
                    <span className="font-label shrink-0 text-[10px] tracking-[0.2em] text-white/35">0{itemIndex + 1}</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="container py-20 md:py-28">
          <div className="reveal flex flex-col gap-10 border-t border-white/15 pt-8 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="font-label text-[10px] uppercase tracking-[0.3em] text-white/40">Continue reading</p>
              <h2 className="mt-4 max-w-2xl font-display text-3xl font-extrabold uppercase leading-[0.98] tracking-[-0.035em] text-white md:text-5xl">
                {nextArticle.title}
              </h2>
            </div>
            <Link href={`/${nextArticle.slug}`} className="font-label group inline-flex w-fit items-center gap-4 border border-white/30 px-5 py-4 text-[10px] uppercase tracking-[0.24em] text-white transition-all duration-200 hover:bg-white hover:text-black active:scale-[0.97]">
              Read next study <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </Link>
          </div>
          <div className="mt-12 flex flex-wrap items-center justify-between gap-5 border-t border-white/10 pt-6">
            <Link href="/#case-studies" className="font-label text-[10px] uppercase tracking-[0.24em] text-white/55 transition-colors hover:text-white">← All studies</Link>
            <Link href="/#contact" className="font-label text-[10px] uppercase tracking-[0.24em] text-white/55 transition-colors hover:text-white">Start a project →</Link>
          </div>
        </section>
      </main>
    </div>
  );
}

export default function ArticlePage({ slug }: ArticlePageProps) {
  const article = getArticle(slug);

  if (!article) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[oklch(0.08_0_0)] p-8 text-white">
        <div className="max-w-md border border-white/15 p-8">
          <p className="font-label text-[10px] uppercase tracking-[0.3em] text-white/45">Thinking archive</p>
          <h1 className="mt-4 font-display text-4xl font-extrabold uppercase">Study unavailable</h1>
          <Link href="/" className="font-label mt-7 inline-block border border-white/25 px-4 py-3 text-[10px] uppercase tracking-[0.22em]">Return to portfolio</Link>
        </div>
      </main>
    );
  }

  return (
    <AndrePhotoProvider>
      <ArticleView article={article} />
    </AndrePhotoProvider>
  );
}
