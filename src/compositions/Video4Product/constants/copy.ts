export const COPY = {

  // ── CENA 1 — Brand Open ──────────────────────────────────────
  c01: {
    logo:    'Painstack',
    logoDot: '.ai',
    badge:   'AI CO-FOUNDERS',
  },

  // ── CENA 2 — A Dor (voz interna da Sarah) ────────────────────
  c02: {
    thoughts: [
      { text: 'every friday.',          weight: 300, size: 56, pause: 60 },
      { text: 'same panic.',            weight: 700, size: 72, pause: 90,
        gradient: 'linear-gradient(90deg, #F97316, #FB923C)' },
      { text: '"who watches the kids?"', weight: 300, size: 48, pause: 75,
        italic: true },
      { text: 'there has to be',        weight: 300, size: 52, pause: 40 },
      { text: 'a better way.',          weight: 700, size: 68, pause: 90,
        gradient: 'linear-gradient(90deg, #F97316, #818CF8)' },
    ],
  },

  // ── CENA 3 — Input ───────────────────────────────────────────
  c03: {
    label:      'describe your problem →',
    typewriter: "Parents in my neighbourhood waste hours every week trying to find a trusted babysitter. There's no easy way to find vetted, available sitters nearby — especially last minute.",
    pills:      ['📝 Free text', '🔗 Reddit link', '📄 Document'],
    badge:      'Painstack Pro',
    productConfirm: 'reading 3,241 real conversations about this problem...',
  },

  // ── CENA 4 — Enquanto espera ──────────────────────────────────
  c04: {
    thoughts: [
      { text: "it's scanning Reddit.",   weight: 300, size: 36 },
      { text: 'real complaints.',        weight: 600, size: 36, color: '#38BDF8' },
      { text: 'not a guess.',            weight: 300, size: 36 },
    ],
    sources: [
      { label: 'Reddit',      count: '3,241 comments read', delay: 0  },
      { label: 'Hacker News', count: '287 discussions',      delay: 18 },
      { label: 'Web',         count: '18,400+ results',      delay: 36 },
    ],
    status: 'analysing...',
  },

  // ── CENA 5 — Resultado ───────────────────────────────────────
  c05: {
    label:          'BLUEPRINT GENERATED IN 52 SECONDS',
    score:          81,
    verdict:        'BUILD' as const,
    userThought: {
      pre:  '"81."',
      post: '"this is real."',
    },
    productConfirm: 'the market wants this. move forward.',
    bullets: [
      'real problem: 74% of parents struggle to find trusted sitters on short notice',
      'market: $4.8B globally, growing 22%/year',
      'no neighbourhood-first mobile solution exists',
      'validated model: subscription €19/month + booking fee',
    ],
  },

  // ── CENA 6 — Transição ───────────────────────────────────────
  c06: {
    thoughts: [
      { text: 'verdict: build.',       weight: 600, size: 52,
        color: '#22C55E', pause: 60 },
      { text: 'your team enters now.', weight: 300, size: 40,
        color: '#FFFFFF', pause: 40 },
    ],
    agents: [
      { label: '📊 Market', border: '#94A3B8' },
      { label: '🧠 CEO',    border: '#F97316' },
      { label: '📣 CMO',    border: '#818CF8' },
      { label: '⚙️ CTO',    border: '#38BDF8' },
    ],
  },

  // ── CENA 7 — Market + CEO ────────────────────────────────────
  c07: {
    market: {
      label:       '📊 Market Agent',
      accentColor: '#94A3B8',
      userThought: '"no one is doing this locally."',
      lines: [
        { text: '🔍  Competitors: Care.com, Sittercity, Superprof' },
        { text: '    → none are neighbourhood-first', indent: true, dimmed: true },
        { text: '    → none work offline or by referral', indent: true, dimmed: true },
        { text: '📈  Growth: childcare apps +28% YoY since 2022' },
        { text: '💰  Willingness to pay: €15–35/month' },
        { text: '    (confirmed: 1,200 Reddit threads)', indent: true, dimmed: true },
        { text: '🎯  Early adopters: parents with children under 8' },
      ],
    },
    ceo: {
      label:       '🧠 AI CEO',
      accentColor: '#F97316',
      userThought: '"this is what i\'d have paid a consultant for."',
      lines: [
        { text: '📋  90-day plan:' },
        { text: '    Week 1–2: Landing + waitlist (target: 200 signups)', indent: true },
        { text: '    Week 3–6: MVP — 10 beta families', indent: true },
        { text: '    Week 7–10: First paid subscriptions', indent: true },
        { text: '    Week 11–13: Retention + NPS iteration', indent: true },
        { text: '📊  Model: Freemium → €19/month per family' },
        { text: '🎯  North star: 50 paying families in 90 days' },
      ],
    },
  },

  // ── CENA 8 — CMO + Landing ───────────────────────────────────
  c08: {
    cmo: {
      label:       '📣 AI CMO',
      accentColor: '#818CF8',
      userThought: '"i can send this today."',
      lines: [
        { text: '🎯  Channel #1: Facebook parent groups · ROI 310%' },
        { text: '    Local groups: "Porto Mamãs", "Pais BCN"', indent: true, dimmed: true },
        { text: '💬  Hook copy — ready to use:' },
        { text: '    "Tired of last-minute babysitter panic?', indent: true },
        { text: '     Your neighbourhood sitter is one tap away."', indent: true, dimmed: true },
        { text: '🚀  7-day plan: Landing → 80 DMs → Analyse responses' },
        { text: '📧  Welcome email sequence: generated' },
      ],
    },
    landing: {
      headline: 'Stop panicking about last-minute babysitters.',
      sub:      'Trusted sitters in your neighbourhood. Booked in 60 seconds.',
      cta:      'Join the waitlist',
      social:   '84 parents already on the list · Porto',
    },
  },

  // ── CENA 9 — CTO + App ──────────────────────────────────────
  c09: {
    cto: {
      label:       '⚙️ AI CTO',
      accentColor: '#38BDF8',
      userThought: '"i don\'t know how to code.\nbut i can do this."',
      lines: [
        { text: '🏗️  Recommended stack:' },
        { text: '    Frontend: Lovable (no code needed)', indent: true },
        { text: '    Backend: Supabase · Notifications: Resend', indent: true },
        { text: '📋  Build first:' },
        { text: '✅  Sitter profile + verification flow' },
        { text: '✅  Parent search by neighbourhood radius' },
        { text: '✅  Booking request + confirmation' },
        { text: '⬜  Payments (phase 2)' },
        { text: '⬜  Background checks API (phase 3)' },
        { text: '🤖  12 Lovable prompts ready. Zero code.' },
      ],
    },
    app: {
      header: 'Babysitter Connect',
      items: [
        { name: 'Sofia M.',  sub: '0.3km · Available tonight · ★4.9', dot: 'green'  },
        { name: 'Ana R.',    sub: '0.6km · Available weekends · ★4.8', dot: 'green'  },
        { name: 'Carla T.',  sub: '1.1km · Busy today · ★5.0',        dot: 'amber'  },
      ],
    },
  },

  // ── CENA 10 — Transição 2 ────────────────────────────────────
  c10: {
    thoughts: [
      { text: 'the agents built the plan.', weight: 300, size: 40,
        color: '#FFFFFF', pause: 40 },
      { text: 'the roadmap executes it.',   weight: 600, size: 52,
        gradient: 'linear-gradient(90deg, #38BDF8, #22D3EE)', pause: 60 },
    ],
  },

  // ── CENA 11 — Roadmap ────────────────────────────────────────
  c11: {
    header:      'Roadmap — 90 days',
    progress:    'Week 3 of 13 · 23% complete',
    progressPct: 23,
    userThought: '"i know exactly what to do tomorrow."',
    weeks: [
      {
        label: 'Week 1', status: 'done' as const,
        tasks: [
          { text: 'Landing page live',     done: true  },
          { text: 'Waitlist form active',   done: true  },
        ],
      },
      {
        label: 'Week 2', status: 'done' as const,
        tasks: [
          { text: '80 Facebook group DMs',    done: true  },
          { text: '5 interviews with parents', done: true },
        ],
      },
      {
        label: 'Week 3', status: 'active' as const,
        tasks: [
          { text: 'MVP sitter profiles',      done: false, active: true },
          { text: 'Onboard 10 beta families', done: false, active: true },
        ],
      },
      {
        label: 'Week 4', status: 'pending' as const,
        tasks: [
          { text: 'First paid booking', done: false },
          { text: 'NPS survey',         done: false },
        ],
      },
    ],
  },

  // ── CENA 12 — Transição 3 ────────────────────────────────────
  c12: {
    thoughts: [
      { text: 'when the time comes',  weight: 300, size: 44,
        color: '#FFFFFF', pause: 30 },
      { text: 'to talk to investors', weight: 300, size: 44,
        color: '#FFFFFF', pause: 30 },
      { text: "you're ready.",        weight: 700, size: 60,
        gradient: 'linear-gradient(90deg, #818CF8, #C084FC)', pause: 90 },
    ],
  },

  // ── CENA 13 — Dataroom ───────────────────────────────────────
  c13: {
    topLabel:    'EXECUTIVE SUMMARY',
    topPreview:  'Problem: Parents in PT/ES spend 3+ hours per week searching for trusted babysitters. No neighbourhood-first mobile solution exists. 74% report this as a weekly frustration...',
    topBadge:    '1 page · Ready to share',
    stackLabels: [
      'PITCH DECK OUTLINE',
      'MARKET ANALYSIS',
      'FINANCIAL PROJECTIONS 3 YEARS',
      'BUSINESS MODEL CANVAS',
      'SWOT ANALYSIS',
      'GO-TO-MARKET OVERVIEW',
      'PROBLEM STATEMENT',
    ],
    footer: '8 documents · Auto-generated · Any language',
    userThought: '"eight documents.\ni didn\'t write a single one."',
  },

  // ── CENA 14 — Zoom Out ───────────────────────────────────────
  c14: {
    nodes: [
      { icon: '💡', label: 'Idea',                             color: '#F97316' },
      { icon: '📊', label: 'Blueprint · Score 81 · BUILD',     color: '#22C55E' },
      { icon: '🤖', label: '4 Agents · Market · CEO · CMO · CTO', color: '#818CF8' },
      { icon: '📅', label: 'Roadmap · 90 days · 23% complete', color: '#38BDF8' },
      { icon: '📁', label: 'Dataroom · 8 documents',           color: '#C084FC' },
      { icon: '💰', label: 'Business with paying customers',   color: '#F97316' },
    ],
    userThought: '"from a friday panic\nto a real startup."',
  },

  // ── CENA 15 — Stats ──────────────────────────────────────────
  c15: {
    stats: [
      { value: '< 60s',   label: 'to get an honest verdict on your idea',   color: '#F97316' },
      { value: '90 days', label: 'from zero to first paying customers',      color: '#818CF8' },
      { value: '0',       label: 'lines of code required to build your MVP', color: '#38BDF8' },
    ],
  },

  // ── CENA 16 — Hook Final ─────────────────────────────────────
  c16: {
    lines: [
      { text: "you don't need a team.",   weight: 300, size: 52, opacity_after: 0.15 },
      { text: "you don't need to code.",  weight: 300, size: 52, opacity_after: 0.15 },
      { text: 'you need a real problem.', weight: 300, size: 52, opacity_after: 0.15 },
    ],
    punchline: {
      text:     'your idea is waiting.',
      weight:   700,
      size:     72,
      gradient: 'linear-gradient(90deg, #F97316, #FB923C)',
    },
  },

  // ── CENA 17 — Brand Close ────────────────────────────────────
  c17: {
    logo:    'Painstack',
    logoDot: '.ai',
    url:     'painstack.ai',
    tagline: 'from idea to business. with your AI team.',
  },
};
