# Alwaleed Alotaibi — Portfolio

Personal portfolio site of a Business Analyst (ECBA-certified): requirements documentation, process mapping, Power BI dashboards, SQL and Python automation. Each project has its own detail page.

## Projects shown

| Route | Project |
|---|---|
| `/projects/ticketing` | Support ticketing system: BRD, use cases, as-is and to-be process flows, UI mockups |
| `/projects/kpi` | KPI dashboard (Power BI) |
| `/projects/financial` | Financial performance analysis (Power BI, DAX time intelligence) |
| `/projects/cars` | Used-cars market analysis |

## Stack

React 19, Vite, React Router, GSAP, OGL and Motion for animation. Static output, no backend.

## Run locally

```
npm install
npm run dev        # dev server
npm run build      # production build in dist/
npm run preview    # serve the build
npm run lint       # oxlint
```

## Deploy

Hosted on Netlify. Build command `npm run build`, publish directory `dist`. `public/_redirects` sends every path to `index.html` so the project routes work on direct load.

## Layout

```
src/App.jsx           home page
src/ProjectPage.jsx   shared template for project pages
public/projects/      screenshots, demo videos, BRD, Power BI file per project
public/cv.pdf         CV
```
