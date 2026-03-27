export const COPY = {

  c01: {
    logoSuffix: '.ai',
    badge: 'FROM IDEA TO BUSINESS',
  },

  c02: {
    // 3 memórias + 1 decisão → acção imediata
    // Total: ~200f (não 300f)
    memories: [
      { text: 'uff, ok...', size: 40, weight: 300, color: 'rgba(255,255,255,0.6)', italic: true, holdFrames: 30 },
      { text: 'friday night panic.', size: 58, weight: 700, gradient: 'linear-gradient(90deg,#F97316,#FB923C)', holdFrames: 50 },
      { text: '"who watches the kids?"', size: 44, weight: 300, color: 'rgba(255,255,255,0.7)', italic: true, holdFrames: 40 },
    ],
    decision: {
      text: "there's gotta be a better way.",
      size: 60,
      weight: 700,
      color: '#ffffffff',
      holdFrames: 30,
    },
    userCaption: '"uff, ok... friday night panic. who watches the kids?"',
  },

  c03: {
    label: 'describe your problem →',
    typewriter: "Parents in my neighbourhood waste hours every week trying to find a trusted babysitter. There's no easy way to find vetted, available sitters nearby — especially last minute.",
    pills: ['📝 Free text', '🔗 Reddit link', '📄 Document'],
    badge: 'Painstack Pro',
    userCaption: '"so I just... describe it. parents waste hours finding a sitter."',
  },

  c04: {
    steps: [
      { text: 'Searching Reddit, Hacker News & web...', active: true },
      { text: 'Analysing evidence signals...', active: false },
      { text: 'Generating blueprint with real evidence...', active: false },
      { text: 'Calibrating score against market data...', active: false },
    ],
    sources: [
      { label: 'Reddit', count: '3,241 comments read', delay: 0 },
      { label: 'Hacker News', count: '287 discussions', delay: 18 },
      { label: 'Web', count: '18,400+ results', delay: 36 },
    ],
    footer: 'This takes 30–60 seconds — real evidence takes time to gather.',
    userCaption: '"it\'s scanning reddit. actual complaints."',
    productCaption: 'analyzing 3,241 local conversations...',
  },

  c05: {
    label: 'BLUEPRINT GENERATED IN 52 SECONDS',
    score: 81,
    verdict: 'BUILD' as const,
    userCaptionPre: '"81."',
    userCaptionPost: '"this is real."',
    productCaption: 'the market wants this. move forward.',
    bullets: [
      'real problem: 74% of parents struggle to find trusted sitters on short notice',
      'market: $4.8B globally, growing 22%/year',
      'no neighbourhood-first mobile solution exists',
      'validated model: subscription €19/month + booking fee',
    ],
  },

  c06: {
    line1: 'verdict: build.',
    line2: 'your team enters now.',
    productCaption: 'your team is ready.',
    agents: [
      { label: 'Market', border: '#94A3B8' },
      { label: 'CEO', border: '#F97316' },
      { label: 'CMO', border: '#818CF8' },
      { label: 'CTO', border: '#38BDF8' },
    ],
  },

  c07: {
    market: {
      label: 'Market Agent',
      accentColor: '#94A3B8',
      lines: [
        { text: 'Competitors: Care.com, Sittercity, Superprof' },
        { text: '→ none are neighbourhood-first', indent: true, dimmed: true },
        { text: '→ none work offline or by referral', indent: true, dimmed: true },
        { text: 'Growth: childcare apps +28% YoY since 2022' },
        { text: 'Willingness to pay: €15–35/month' },
        { text: '(1,200 Reddit threads confirm this)', indent: true, dimmed: true },
        { text: 'Early adopters: parents with children under 8' },
      ],
    },
    ceo: {
      label: 'AI CEO',
      accentColor: '#F97316',
      lines: [
        { text: '90-day plan:' },
        { text: 'Week 1–2: Landing + waitlist (target: 200 signups)', indent: true },
        { text: 'Week 3–6: MVP — 10 beta families', indent: true },
        { text: 'Week 7–10: First paid subscriptions', indent: true },
        { text: 'Week 11–13: Retention + NPS iteration', indent: true },
        { text: 'Model: Freemium → €19/month per family' },
        { text: 'North star: 50 paying families in 90 days' },
      ],
    },
    userCaption: '"no one is doing this locally."',
  },

  c08: {
    cmo: {
      label: 'AI CMO',
      accentColor: '#818CF8',
      lines: [
        { text: 'Channel #1: Facebook parent groups · ROI 310%' },
        { text: 'Local groups: "Porto Mamãs", "Pais BCN"', indent: true, dimmed: true },
        { text: 'Hook copy — ready to use:' },
        { text: '"Tired of last-minute babysitter panic?', indent: true },
        { text: ' Your neighbourhood sitter is one tap away."', indent: true, dimmed: true },
        { text: '7-day plan: Landing → 80 DMs → Analyse responses' },
        { text: 'Welcome email sequence: generated' },
      ],
    },
    landing: {
      headline: 'Stop panicking about last-minute babysitters.',
      sub: 'Trusted sitters in your neighbourhood. Booked in 60 seconds.',
      cta: 'Join the waitlist',
      social: '84 parents already on the list · Porto',
    },
    userCaption: '"i can send this today."',
  },

  c09: {
    cto: {
      label: 'AI CTO',
      accentColor: '#38BDF8',
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
        { name: 'Sofia M.', sub: '0.3km · Available tonight · ★4.9', dot: 'green' },
        { name: 'Ana R.', sub: '0.6km · Available weekends · ★4.8', dot: 'green' },
        { name: 'Carla T.', sub: '1.1km · Busy today · ★5.0', dot: 'amber' },
      ],
    },
    userCaption: '"i don\'t know how to code. i can do this."',
  },

  c10: {
    line1: 'the agents built the plan.',
    line2: 'the roadmap executes it.',
    productCaption: 'the roadmap is clear.',
  },

  c11: {
    header: 'Roadmap — 90 days',
    progress: 'Week 3 of 13 · 23% complete',
    progressPct: 23,
    userCaption: '"i know exactly what to do tomorrow."',
    weeks: [
      {
        label: 'Week 1', status: 'done' as const,
        tasks: [{ text: 'Landing page live', done: true }, { text: 'Waitlist form active', done: true }]
      },
      {
        label: 'Week 2', status: 'done' as const,
        tasks: [{ text: '80 Facebook group DMs', done: true }, { text: '5 interviews with parents', done: true }]
      },
      {
        label: 'Week 3', status: 'active' as const,
        tasks: [{ text: 'MVP sitter profiles', done: false, active: true }, { text: 'Onboard 10 beta families', done: false, active: true }]
      },
      {
        label: 'Week 4', status: 'pending' as const,
        tasks: [{ text: 'First paid booking', done: false }, { text: 'NPS survey', done: false }]
      },
    ],
  },

  c12: {
    line1: 'when the time comes',
    line2: 'to talk to investors',
    line3: "you're ready.",
    productCaption: "you're ready.",
  },

  c13: {
    topLabel: 'EXECUTIVE SUMMARY',
    topPreview: 'Problem: Parents in PT/ES spend 3+ hours per week searching for trusted babysitters. No neighbourhood-first mobile solution exists. 74% report this as a weekly frustration...',
    topBadge: '1 page · Ready to share',
    stackLabels: [
      'PITCH DECK OUTLINE', 'MARKET ANALYSIS',
      'FINANCIAL PROJECTIONS 3 YEARS', 'BUSINESS MODEL CANVAS',
      'SWOT ANALYSIS', 'GO-TO-MARKET OVERVIEW', 'PROBLEM STATEMENT',
    ],
    footer: '8 documents · Auto-generated · Any language',
    userCaption: '"eight documents. i didn\'t write a single one."',
  },

  c14: {
    nodes: [
      { label: 'Idea', color: '#F97316' },
      { label: 'Blueprint · Score 81 · BUILD', color: '#22C55E' },
      { label: '4 Agents · Market · CEO · CMO · CTO', color: '#818CF8' },
      { label: 'Roadmap · 90 days · 23% complete', color: '#38BDF8' },
      { label: 'Dataroom · 8 documents', color: '#C084FC' },
      { label: 'Business with paying customers', color: '#F97316' },
    ],
    userCaption: '"from a friday panic. a real startup."',
  },

  c15: {
    stats: [
      { value: '< 60s', label: 'to get an honest verdict on your idea', color: '#F97316' },
      { value: '90 days', label: 'from zero to first paying customers', color: '#818CF8' },
      { value: '0', label: 'lines of code required to build your MVP', color: '#38BDF8' },
    ],
    userCaption: '"it\'s real. we have a clear path."',
  },

  c16: {
    line1: "you don't need a team.",
    line2: "you don't need to code.",
    line3: 'you need a real problem.',
    punchline: {
      text: 'your idea is waiting.',
      gradient: 'linear-gradient(90deg, #FFFFFF, #FFEDD5)', // White to very light orange
    },
    userCaption: '"from idea..."',
    productCaption: 'to business.',
  },

  c17: {
    tagline: 'from idea to business.',
    url: 'painstack.ai',
  },
};
