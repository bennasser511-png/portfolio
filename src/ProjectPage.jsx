import { useEffect } from 'react'
import { Link, useParams, Navigate } from 'react-router-dom'
import { bySlug, projects } from './projects'
import SpotlightCard from './bits/SpotlightCard'

const SPOT = 'rgba(55,225,188,.18)'

const Images = ({ s }) => (
  <div className={`shots cols-${s.cols || 1}`}>
    {s.images.map(im => (
      <a key={im.src} href={im.src} target="_blank" rel="noopener" className={im.portrait ? 'portrait' : ''}>
        <img src={im.src} alt={im.alt} loading="lazy" />
      </a>
    ))}
  </div>
)

const Model = ({ s }) => (
  <div className="model">
    <div className="dims">
      {s.dims.map(d => (
        <div className="tbl dim" key={d.name}>
          <div className="tbl-name">{d.name}</div>
          <div className="tbl-key">🔑 {d.key}</div>
          {d.cols.map(c => <div key={c}>{c}</div>)}
        </div>
      ))}
    </div>
    <div className="fact-wrap">
      <div className="tbl fact">
        <div className="tbl-name">{s.fact.name}</div>
        {s.fact.cols.map(c => <div key={c}>{c}</div>)}
      </div>
      <div className="rel">4 × many-to-one → dimensions</div>
    </div>
  </div>
)

export default function ProjectPage() {
  const { slug } = useParams()
  const p = bySlug(slug)
  useEffect(() => { window.scrollTo(0, 0) }, [slug])
  if (!p) return <Navigate to="/" replace />

  const i = projects.indexOf(p)
  const next = projects[(i + 1) % projects.length]

  return (
    <main className="project-page">
      <div className="container">
        <Link to="/#projects" className="back">← All projects</Link>
        <h1>{p.title}</h1>
        <p className="subtitle">{p.subtitle}</p>
        <dl className="meta">
          {p.meta.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}
        </dl>

        {p.sections.map(s => (
          <section className="ps" key={s.title}>
            <h2>{s.title}</h2>
            {s.body?.map(b => <p key={b}>{b}</p>)}
            {s.kind === 'images' && <Images s={s} />}
            {s.kind === 'model' && <Model s={s} />}
            {s.kind === 'code' && <pre><code>{s.code}</code></pre>}
            {s.kind === 'video' && <video controls playsInline preload="metadata" poster={s.poster} src={s.src} />}
            {s.download && <a className="btn btn-outline dl" href={s.download.href} download>{s.download.label}</a>}
          </section>
        ))}

        <SpotlightCard className="card next" spotlightColor={SPOT}>
          <span className="eyebrow">Next project</span>
          <Link to={`/projects/${next.slug}`}>{next.title} →</Link>
        </SpotlightCard>
      </div>
    </main>
  )
}
