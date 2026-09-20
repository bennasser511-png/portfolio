import { useEffect, useState } from 'react'
import { Routes, Route, Link, useLocation } from 'react-router-dom'
import { projects } from './projects'
import ProjectPage from './ProjectPage'
import Aurora from './bits/Aurora'
import SplitText from './bits/SplitText'
import BlurText from './bits/BlurText'
import ShinyText from './bits/ShinyText'
import SpotlightCard from './bits/SpotlightCard'

const LINKEDIN = 'https://www.linkedin.com/in/al-waleed-al-otaibi-89557026b'
const EMAIL = 'mailto:alwaleedalotaibi71@gmail.com'
const CV = { href: '/cv.pdf', download: 'Alwaleed-Alotaibi-Business-Analyst.pdf' }
const SPOT = 'rgba(55,225,188,.18)'


const toolkit = {
  Analysis: ['Requirements elicitation', 'Gap analysis', 'Use cases & user stories', 'Acceptance criteria'],
  Documentation: ['BRD / FRD', 'BPMN (as-is / to-be)', 'Data flow diagrams', 'Traceability'],
  Data: ['SQL', 'Power BI & DAX', 'Star-schema modeling', 'Advanced Excel'],
  Technical: ['Python (pandas)', 'Git & GitHub', 'GitHub Actions', 'Relational DB design'],
  Tools: ['Jira & Confluence', 'Bizagi / draw.io', 'Figma', 'Tableau (learning)'],
}

const experience = [
  {
    current: true,
    date: 'Feb 2024 – Present',
    role: 'Customer Service Agent',
    company: 'Upsource by Solutions — client: ccc by stc',
    points: [
      'Resolve 40–50 internet-service and billing conversations per day within an SLA-driven contact center handling over 10,000 daily conversations.',
      'Identify recurring fault patterns across conversations and report root causes to support process-improvement initiatives.',
      'Work daily inside CRM and billing systems, tracing how case data moves between teams and where tickets stall or reopen.',
      'Authored and submitted a formal process-improvement proposal to management, including a documented solution design for complaint handling.',
    ],
  },
  {
    date: 'Aug 2023 – Oct 2023',
    role: 'Management Information Systems Trainee',
    company: 'Municipality of Al-Muwayh',
    points: [
      'Gathered and documented system requirements, mapping financial data flows to improve internal reporting processes.',
      'Designed logical relational database schemas and authored technical documentation, including system use cases.',
      'Evaluated existing software tools to identify operational bottlenecks and recommended data-driven solutions to management.',
    ],
  },
]

const domains = [
  { eyebrow: 'Telecom operations', title: 'Complaint handling', text: 'Traced why tickets reopen across support tiers and proposed a redesigned complaint flow to management.', tags: ['As-is / To-be', 'Root cause', 'Solution design'] },
  { eyebrow: 'Public sector', title: 'Financial reporting', text: "Mapped financial data flows and designed the relational schema for a municipality's internal reporting.", tags: ['Requirements', 'Data flow diagrams', 'ERD'] },
  { eyebrow: 'Executive reporting', title: 'KPI dashboards', text: 'Defined KPIs, modeled the data and wrote the DAX behind contact-center and financial dashboards.', tags: ['KPI definition', 'Star schema', 'DAX'] },
]

const certs = [
  { badge: 'IIBA', title: 'Entry Certificate in Business Analysis (ECBA)', org: 'International Institute of Business Analysis', year: '2026', img: '/img/ecba-cert.png' },
  { badge: 'BI', title: 'Business Intelligence Track', org: 'Satr Platform (Tuwaiq Academy) — SQL 101/102/103, Tableau, Power BI', year: '2026', status: 'in progress' },
  { badge: 'BA', title: 'Business Analysis Program', org: 'Misk Foundation' },
  { badge: 'XL', title: 'Data Analysis with Excel', org: 'Professional course' },
]

const Heading = ({ text, sub }) => (
  <div className="section-header">
    <BlurText text={text} className="h2" delay={80} />
    {sub && <p>{sub}</p>}
  </div>
)

const Tags = ({ items }) => (
  <div className="tags">
    {items.map((t, i) => <span key={t} className={`tag${i === 0 ? ' hl' : ''}`}>{t}</span>)}
  </div>
)

const Home = () => (
  <>
      <section className="hero" id="top">
        <div className="aurora-bg">
          <Aurora colorStops={['#37e1bc', '#4f46e5', '#37e1bc']} amplitude={1.1} blend={0.6} speed={0.6} />
        </div>
        <div className="container">
          <h1 className="hero-title">
            <SplitText text="BUSINESS" tag="span" className="line" textAlign="left" delay={40} duration={1} splitType="chars" from={{ opacity: 0, y: 60 }} rootMargin="0px" />
            <SplitText text="ANALYST" tag="span" className="line accent" textAlign="left" delay={40} duration={1} splitType="chars" from={{ opacity: 0, y: 60 }} rootMargin="0px" />
          </h1>
          <p className="location">
            <ShinyText text="Saudi Arabia · ECBA Certified (IIBA)" speed={3} color="#e0e0e0" shineColor="#37e1bc" />
          </p>
          <p className="hero-bio">
            I'm <b>Alwaleed Alotaibi</b>. I turn messy operational problems into <b>documented requirements</b>, <b>mapped processes</b> and <b>measurable dashboards</b>. Two years inside telecom customer operations, plus production Python automation and Power BI reporting built on my own time.
          </p>
          <div className="hero-cta">
            <a href="#projects" className="btn btn-primary">View Projects</a>
            <a {...CV} className="btn btn-outline">Download CV</a>
          </div>
        </div>
        <a href="#about" className="scroll-down">Scroll down<br />↓</a>
      </section>

      <section className="alt" id="about">
        <div className="container">
          <Heading text="About Me" sub="MIS graduate, ECBA-certified, working on the front line of a 10,000-conversation-a-day contact center — where process gaps show up first." />
          <div className="grid-2">
            <SpotlightCard className="card edu" spotlightColor={SPOT}>
              <div className="eyebrow">Education</div>
              <ul>
                <li><h4>Bachelor's Degree in Management Information Systems (MIS)</h4><p>Taibah University</p><small>Graduated 2023</small></li>
                <li><h4>Entry Certificate in Business Analysis (ECBA)</h4><p>International Institute of Business Analysis (IIBA)</p><small>2026</small></li>
              </ul>
            </SpotlightCard>
            <SpotlightCard className="card" spotlightColor={SPOT}>
              <div className="eyebrow">How I work</div>
              <blockquote>Anything that isn't measured is an opinion. I map the current state first, quantify the pain, then write the requirement — and I document negative results as carefully as wins.</blockquote>
            </SpotlightCard>
            <SpotlightCard className="card toolkit" spotlightColor={SPOT}>
              <div className="eyebrow">Toolkit</div>
              <div className="toolkit-grid">
                {Object.entries(toolkit).map(([k, v]) => (
                  <div key={k}><h4>{k}</h4><ul>{v.map(i => <li key={i}>{i}</li>)}</ul></div>
                ))}
              </div>
            </SpotlightCard>
          </div>
        </div>
      </section>

      <section id="experience">
        <div className="container">
          <Heading text="Work Experience" />
          <div className="timeline">
            {experience.map(e => (
              <div className="tl-item" key={e.role}>
                <div className={`marker${e.current ? ' current' : ''}`} />
                <div>
                  <small>{e.date}</small>
                  <h4>{e.role}</h4>
                  <p className="company">{e.company}</p>
                  <ul>{e.points.map(p => <li key={p}>{p}</li>)}</ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="alt" id="ba-work">
        <div className="container">
          <Heading text="Business Analysis Work" sub="Where I've applied the discipline — and which techniques each domain needed." />
          <div className="grid-3">
            {domains.map(d => (
              <SpotlightCard className="card" key={d.title} spotlightColor={SPOT}>
                <div className="eyebrow">{d.eyebrow}</div>
                <h3>{d.title}</h3>
                <p className="muted">{d.text}</p>
                <Tags items={d.tags} />
              </SpotlightCard>
            ))}
          </div>
        </div>
      </section>

      <section id="projects">
        <div className="container">
          <Heading text="Projects" sub="Each case study shows the problem, the method, the actual deliverables, and the result." />
          <div className="grid-2">
            {projects.map(p => (
              <SpotlightCard className="card project" key={p.slug} spotlightColor={SPOT}>
                <Link className="shot" to={`/projects/${p.slug}`}><img src={p.img} alt={p.alt} loading="lazy" /></Link>
                <div className="body">
                  <h3>{p.title}</h3>
                  <p>{p.problem}</p>
                  <ul>{p.points.map(x => <li key={x}>{x}</li>)}</ul>
                  <Tags items={p.tags} />
                  <div className="actions"><Link to={`/projects/${p.slug}`}>Case study →</Link></div>
                </div>
              </SpotlightCard>
            ))}
          </div>
        </div>
      </section>

      <section className="alt" id="certificates">
        <div className="container">
          <Heading text="Certificates" />
          <div className="grid-2">
            {certs.map(c => (
              <SpotlightCard className="card cert" key={c.title} spotlightColor={SPOT}>
                <div className="badge">{c.badge}</div>
                <div>
                  <h4>{c.title}{c.status && <span className="status">{c.status}</span>}</h4>
                  <p>{c.org}</p>
                  {c.year && <small>{c.year}</small>}
                  {c.img && <small> · <a className="link" href={c.img} target="_blank" rel="noopener">View certificate ↗</a></small>}
                </div>
              </SpotlightCard>
            ))}
          </div>
        </div>
      </section>

      <section id="contact">
        <div className="container contact-box">
          <BlurText text="Let's talk" className="h2" delay={100} />
          <p>Open to Business Analyst and Data Analyst roles in Saudi Arabia.</p>
          <div className="contact-links">
            <a href={EMAIL} className="btn btn-primary">Email me</a>
            <a href={LINKEDIN} className="btn btn-outline" target="_blank" rel="noopener">LinkedIn</a>
            <a {...CV} className="btn btn-outline">Download CV</a>
          </div>
        </div>
      </section>

  </>
)

function useHashScroll() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) document.getElementById(hash.slice(1))?.scrollIntoView()
    else window.scrollTo(0, 0)
  }, [pathname, hash])
}

export default function App() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  useHashScroll()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <header className={scrolled ? 'scrolled' : ''}>
        <div className="container">
          <nav>
            <Link className="brand" to="/">Alwaleed<span>.</span></Link>
            <button className="burger" aria-label="Menu" onClick={() => setOpen(o => !o)}>☰</button>
            <div className={`links${open ? ' open' : ''}`} onClick={() => setOpen(false)}>
              <Link to="/#about">About</Link>
              <Link to="/#experience">Experience</Link>
              <Link to="/#ba-work">BA Work</Link>
              <Link to="/#projects">Projects</Link>
              <Link to="/#certificates">Certificates</Link>
              <Link to="/#contact" className="btn btn-primary">Contact</Link>
            </div>
          </nav>
        </div>
      </header>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects/:slug" element={<ProjectPage />} />
      </Routes>

      <footer>
        <div className="container">
          <span>© 2026 Alwaleed Alotaibi</span>
          <span><Link to="/#about">About</Link> · <Link to="/#projects">Projects</Link> · <a href={LINKEDIN} target="_blank" rel="noopener">LinkedIn</a></span>
        </div>
      </footer>

      <a href="#top" className={`top${scrolled ? ' show' : ''}`} aria-label="Back to top">↑</a>
    </>
  )
}
