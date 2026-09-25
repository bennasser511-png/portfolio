// Single source for project cards (home) and detail pages (/projects/:slug).
// Section kinds: text | images | code | video | model

const T = '/projects/ticketing'
const F = '/projects/financial'
const K = '/projects/kpi'
const C = '/projects/cars'

export const projects = [
  {
    slug: 'ticketing',
    title: 'Inbound Ticketing System',
    subtitle: 'Business Requirements · Process Redesign · UI Mockups',
    img: '/img/ticketing-swimlane.png',
    alt: 'Swimlane diagram of the inbound ticketing process',
    problem: 'Support agents were repeating the same manual checks for issues already reported in their area.',
    points: [
      'Mapped the as-is workflow and elicited requirements from both support tiers.',
      'Core rule: auto-flag any area-wide issue reported in the previous 72 hours — no duplicate work.',
      'Target: 30% reduction in Average Handling Time.',
    ],
    tags: ['BRD', 'Use cases', 'BPMN', 'UI mockups', 'Figma', 'Draw.io', 'Jira'],
    meta: [
      ['Role', 'Business Analyst (solo)'],
      ['Domain', 'Telecom customer support'],
      ['Tools', 'Draw.io, Figma, Jira'],
      ['Deliverables', 'As-is / to-be maps, BRD (9 pages), use case diagram, 3 UI mockups'],
    ],
    sections: [
      {
        kind: 'text',
        title: 'Problem',
        body: [
          'When a customer calls about an internet outage, the frontline agent follows the standard protocol, then checks the city/district manually. If a ticket already exists for that area, the agent has no way to know — so the same issue gets diagnosed again, escalated again, and sometimes a duplicate ticket is opened.',
          'Result: inflated Average Handling Time (AHT) on issues that were already known, and duplicate tickets in the queue of advanced support.',
        ],
      },
      {
        kind: 'images',
        title: 'As-is process',
        body: ['Current flow across four lanes: customer, frontline service, reports system, advanced service. The manual city/district check and the transfer to advanced support are where time is lost.'],
        images: [{ src: `${T}/as-is.png`, alt: 'As-is swimlane diagram' }],
      },
      {
        kind: 'images',
        title: 'To-be process',
        body: ['One rule changes the flow: the system displays any ticket in the same area opened in the last 72 hours. If one exists, the agent apologizes and closes — no re-diagnosis, no transfer. Target: 30% reduction in AHT on area-wide issues.'],
        images: [{ src: `${T}/to-be.png`, alt: 'To-be swimlane diagram' }],
      },
      {
        kind: 'images',
        title: 'Business Requirements Document',
        body: ['Executive summary, scope, stakeholders, business objectives, 15+ functional requirements with priority, and non-functional requirements (performance, usability, security).'],
        images: Array.from({ length: 9 }, (_, i) => ({ src: `${T}/brd-0${i + 1}.png`, alt: `BRD page ${i + 1}` })),
        cols: 3,
        download: { href: `${T}/BRD.pdf`, label: 'Download BRD (PDF)' },
      },
      {
        kind: 'images',
        title: 'Use case diagram',
        body: ['Actors: customer service, technical support, admin. Includes open ticket → generate ticket ID, update ticket, close, reports.'],
        images: [{ src: `${T}/use-cases.png`, alt: 'Use case diagram', portrait: true }],
      },
      {
        kind: 'images',
        title: 'UI mockups — Complaints Hub',
        body: ['Low-fidelity screens for the designed solution: sign-in, add complaint, complaint status.'],
        images: [1, 2, 3].map(i => ({ src: `${T}/ui-${i}.png`, alt: `UI mockup ${i}` })),
        cols: 3,
      },
      {
        kind: 'text',
        title: 'Outcome',
        body: ['Submitted to management as a formal process-improvement proposal with the documented solution design. The 72-hour rule is the single highest-leverage change: it removes an entire diagnosis-and-transfer loop for every repeat caller in an affected area.'],
      },
    ],
  },
  {
    slug: 'financial',
    title: 'Financial Performance Analysis Dashboard',
    subtitle: 'Power BI · Star Schema · DAX Time Intelligence',
    img: '/img/financial-dashboard.png',
    alt: 'Financial performance dashboard in Power BI',
    problem: 'Three years of transactional data (2023–2025) with no executive view of revenue, expenses and profitability.',
    points: [
      'KPI cards, monthly trends, expense breakdown by category and department, customer-level revenue.',
      'Account-type filtering to isolate income or expense views.',
      'Built the star-schema model and all DAX measures: YTD, YoY growth, running totals.',
    ],
    tags: ['Power BI', 'DAX', 'Power Query', 'Star schema'],
    meta: [
      ['Role', 'Data modeler & report author'],
      ['Data', '7,960 transactions · 1,096 days (2023–2025) · 17 accounts · 6 departments · 14 vendors'],
      ['Model', '1 fact table, 4 dimensions, 4 many-to-one relationships'],
      ['Measures', '11 DAX measures'],
    ],
    sections: [
      {
        kind: 'images',
        title: 'Dashboard',
        body: ['Executive overview: revenue, expenses, net profit and margin as KPI cards; monthly trend; expenses by category and department; revenue by customer. Slicers for year, quarter and account type.'],
        images: [
          { src: `${F}/01-overview-2024.png`, alt: 'Overview, 2024' },
          { src: `${F}/02-filtered-q4-operations.png`, alt: 'Filtered: Q4, Operations department' },
          { src: `${F}/03-filtered-expense-only.png`, alt: 'Filtered: expense accounts only' },
        ],
      },
      {
        kind: 'model',
        title: 'Data model',
        body: ['Star schema. Every measure filters through Dim_Date, so time intelligence works on any visual without extra logic.'],
        fact: { name: 'Fact_Transactions', cols: ['TransactionID', 'DateKey', 'AccountID', 'DepartmentID', 'VendorID', 'Amount', 'TransactionType'] },
        dims: [
          { name: 'Dim_Date', key: 'DateKey', cols: ['Date', 'Year', 'Quarter', 'MonthNumber', 'MonthName', 'IsWeekend'] },
          { name: 'Dim_Account', key: 'AccountID', cols: ['AccountName', 'AccountCategory', 'AccountType'] },
          { name: 'Dim_Department', key: 'DepartmentID', cols: ['Department'] },
          { name: 'Dim_Vendor', key: 'VendorID', cols: ['VendorName', 'VendorType'] },
        ],
      },
      {
        kind: 'code',
        title: 'DAX measures',
        body: ['Base measures first, then time intelligence built on top of them. Arabic measure names are kept as authored in the report.'],
        code: `Total Revenue  = CALCULATE(SUM(Fact_Transactions[Amount]), Fact_Transactions[TransactionType] = "إيراد")
Total Expenses = CALCULATE(SUM(Fact_Transactions[Amount]), Fact_Transactions[TransactionType] = "مصروف")
Net Profit     = [Total Revenue] - [Total Expenses]
Profit Margin  = DIVIDE([Net Profit], [Total Revenue], 0)

YTD Revenue    = TOTALYTD([Total Revenue], Dim_Date[Date])
MTD Revenue    = TOTALMTD([Total Revenue], Dim_Date[Date])
QTD Revenue    = TOTALQTD([Total Revenue], Dim_Date[Date])
PY Revenue     = CALCULATE([Total Revenue], SAMEPERIODLASTYEAR(Dim_Date[Date]))
YoY Growth %   = DIVIDE([Total Revenue] - [PY Revenue], [PY Revenue], 0)

% of Total     = DIVIDE([Total Revenue] + [Total Expenses],
                        CALCULATE([Total Revenue] + [Total Expenses], ALL(Dim_Account)), 0)
Running Total  = CALCULATE([Total Revenue],
                        FILTER(ALLSELECTED(Dim_Date), Dim_Date[Date] <= MAX(Dim_Date[Date])))`,
        download: { href: `${F}/financial-analysis.pbix`, label: 'Download .pbix (training data)' },
      },
    ],
  },
  {
    slug: 'kpi',
    title: 'Customer Service KPI Dashboard',
    subtitle: 'Power BI · Contact Center Metrics · Prototype',
    img: '/img/kpi-dashboard.png',
    alt: 'Contact center KPI dashboard in Power BI',
    problem: 'Managers could not see where complaint bottlenecks cluster geographically or when demand peaks.',
    points: [
      'Executive KPI view tracking AHT, FCR and CSAT.',
      'Regional heat map of complaint density plus weekly trend analysis.',
      'Authored the DAX measures behind each KPI and the region-mapping logic.',
    ],
    tags: ['Power BI', 'DAX', 'Excel', 'Prototype'],
    meta: [
      ['Role', 'Report author'],
      ['Data', '189 conversations · service type, problem type, line system, handling time, contact count, customer city'],
      ['Measures', 'AHT, FCR, CSAT + 5 calculated columns'],
      ['Status', 'Prototype on a training sample — see data note'],
    ],
    sections: [
      {
        kind: 'video',
        title: 'Walkthrough',
        body: ['45-second recording of the interactive dashboard: KPI cards, map of complaint density by region, weekly trend, breakdown by service and problem type.'],
        src: `${K}/kpi-demo.mp4`,
        poster: `${K}/kpi-poster.png`,
      },
      {
        kind: 'images',
        title: 'Dashboard',
        images: [{ src: `${K}/kpi-dashboard.png`, alt: 'KPI dashboard overview' }],
      },
      {
        kind: 'code',
        title: 'DAX measures',
        body: ['Three KPI measures plus a SWITCH column that maps 20+ cities to the 13 administrative regions so the map aggregates correctly.'],
        code: `AHT (minutes) =
VAR AvgValue = AVERAGE(Conversations[HandlingTime])
RETURN FORMAT(AvgValue * 24, "0.0") & " min"

FCR =
VAR ResolvedFirstTime = COUNTROWS(FILTER(Conversations, Conversations[ContactCount] <= 2))
VAR TotalConversations = COUNTROWS(Conversations)
RETURN DIVIDE(ResolvedFirstTime, TotalConversations, 0)

CSAT =
VAR TotalResponses = COUNTROWS(Conversations)
VAR Satisfied = CALCULATE(COUNTROWS(Conversations), Conversations[Rating] >= 3)
RETURN DIVIDE(Satisfied, TotalResponses, 0)

Region = SWITCH(TRUE(),
  Conversations[City] IN {"الرياض", "الخرج", "الدرعية"}, "منطقة الرياض",
  Conversations[City] IN {"جدة", "مكة المكرمة", "الطائف", "القنفذة"}, "منطقة مكة المكرمة",
  ...)`,
      },
      {
        kind: 'text',
        title: 'Data note',
        body: [
          'This is a prototype built on a 189-row training sample. Service type, problem type, line system, handling time, contact count and city are from the sample. Customer rating and conversation date were simulated (RANDBETWEEN) to prototype the CSAT card and the weekly trend — those two visuals demonstrate the mechanics, not real performance.',
          'The model is a single flat table, which is adequate at this size. The Financial Analysis project shows the star-schema approach I use for larger datasets.',
        ],
      },
    ],
  },
  {
    slug: 'cars',
    title: 'Used Cars Market Analysis',
    subtitle: 'Power BI · Snowflake Schema · Market Insights',
    img: `${C}/dashboard.png`,
    alt: 'Used cars market dashboard for Saudi Arabia in Power BI',
    problem: 'Used-car listings for Saudi Arabia sat in a flat spreadsheet with no view of how price and mileage move by brand, region, or model year.',
    points: [
      'Interactive filters for year range, make, city, category and gear type, with a regional sales map.',
      'Price trend by model year, and average price and mileage compared across 10 brands.',
      'Modeled a snowflake schema (1 fact + 6 dimensions) and wrote the DAX measures behind every KPI.',
    ],
    tags: ['Power BI', 'DAX', 'Power Query', 'Snowflake schema'],
    meta: [
      ['Role', 'Data modeler & report author'],
      ['Data', '5,159 listings · 61 makes · 27 regions · years 1980–2021 (public dataset)'],
      ['Model', '1 fact table, 6 dimensions, 7 many-to-one relationships'],
      ['Measures', '4 DAX measures + 2 calculated columns'],
    ],
    sections: [
      {
        kind: 'video',
        title: 'Walkthrough',
        body: ['Recording of the interactive dashboard: filtering by year range and make, the regional sales map, and the price-by-year trend responding live.'],
        src: `${C}/cars-demo.mp4`,
        poster: `${C}/cars-poster.png`,
      },
      {
        kind: 'images',
        title: 'Dashboard',
        body: ['Slicers for year, make, city, category and gear type. KPI cards for listing count, top-selling make, average mileage and average price. Regional sales map, price-by-year trend, brand comparison table, and a stacked chart of sales by make and category.'],
        images: [{ src: `${C}/dashboard.png`, alt: 'Used cars market dashboard, full view' }],
      },
      {
        kind: 'model',
        title: 'Data model',
        body: ['Snowflake schema: one fact table, six single-column dimension tables. Simpler than a star schema per dimension, but it keeps the fact table narrow and each filter (make, region, color, fuel type, gear type, year, options) independent.'],
        fact: { name: 'Cars', cols: ['Make', 'Region', 'Color', 'Fuel_Type', 'Gear_Type', 'Year', 'Options', 'Price', 'Mileage'] },
        dims: [
          { name: 'Dim_Maker', key: 'Make', cols: ['61 makes'] },
          { name: 'Dim_Region', key: 'Region', cols: ['27 regions'] },
          { name: 'Dim_year', key: 'Year', cols: ['47 years, 1980–2021'] },
          { name: 'Dim_color', key: 'Color', cols: ['14 colors'] },
          { name: 'Dim_FuelType', key: 'Fuel_Type', cols: ['Petrol, Diesel, Hybrid'] },
          { name: 'Dim_GearType', key: 'Gear_Type', cols: ['Automatic, Manual'] },
        ],
      },
      {
        kind: 'code',
        title: 'DAX measures',
        body: ['Core aggregates plus a ranking measure for "top-selling make," and two calculated columns that bin price and mileage into 10K brackets for the distribution visuals.'],
        code: `Avg Price    = AVERAGE(Cars[Price])
Avg Mileage  = AVERAGE(Cars[Mileage])
Listing Count = COUNTROWS(Cars)

Top Make =
VAR MakeCounts =
    ADDCOLUMNS(VALUES(Cars[Make]), "Count", CALCULATE(COUNTROWS(Cars)))
VAR MaxCount = MAXX(MakeCounts, [Count])
RETURN MAXX(FILTER(MakeCounts, [Count] = MaxCount), Cars[Make])

Price (bins)   = IF(ISBLANK(Cars[Price]), BLANK(), INT(Cars[Price] / 10000) * 10000)
Mileage (bins) = IF(ISBLANK(Cars[Mileage]), BLANK(), INT(Cars[Mileage] / 10000) * 10000)`,
      },
      {
        kind: 'text',
        title: 'Data note',
        body: ['Listings are a public used-car dataset for Saudi Arabia (Kaggle), used here for training. Not live market data or scraped from any specific platform.'],
      },
    ],
  },
]

export const bySlug = slug => projects.find(p => p.slug === slug)
