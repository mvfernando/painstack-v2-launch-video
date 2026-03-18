// voiceover-scripts.ts
// Scripts de narração para os dois vídeos do Painstack V2
// Alinhados frame a frame com as cenas Remotion @ 30fps

export const VIDEO1_SCRIPTS = [
  {
    scene: 'Scene1Hook',
    startFrame: 0,
    durationFrames: 90,
    startSeconds: 0,
    text: 'Stop guessing. Start building.',
    pauseAfter: 0.3,
  },
  {
    scene: 'Scene2Problem',
    startFrame: 90,
    durationFrames: 150,
    startSeconds: 3,
    text: 'Most founders build the wrong thing. Not because they\'re lazy. Because they validated with opinions instead of evidence.',
    pauseAfter: 0.2,
  },
  {
    scene: 'Scene3Input',
    startFrame: 240,
    durationFrames: 180,
    startSeconds: 8,
    text: 'With Painstack, you describe your idea or paste a Reddit link. That\'s it.',
    pauseAfter: 0.3,
  },
  {
    scene: 'Scene4Agents',
    startFrame: 420,
    durationFrames: 210,
    startSeconds: 14,
    text: 'Four AI agents go to work. They find where people are already screaming about this problem — in real communities, real conversations.',
    pauseAfter: 0.2,
  },
  {
    scene: 'Scene5Verdict',
    startFrame: 630,
    durationFrames: 180,
    startSeconds: 21,
    text: 'In minutes, you get a Blueprint Score and a clear verdict. Build. Improve. Or don\'t.',
    pauseAfter: 0.3,
  },
  {
    scene: 'Scene6CTA',
    startFrame: 810,
    durationFrames: 90,
    startSeconds: 27,
    text: 'Painstack dot A I. Free to start. No card required.',
    pauseAfter: 0,
  },
];

export const VIDEO2_SCRIPTS = [
  {
    scene: 'SceneA_Hero',
    startFrame: 0,
    durationFrames: 120,
    startSeconds: 0,
    text: 'From idea to launched product. Your AI team, from day zero.',
    pauseAfter: 0.3,
  },
  {
    scene: 'SceneB_Problem',
    startFrame: 120,
    durationFrames: 150,
    startSeconds: 4,
    text: 'Ninety percent of startups fail. The number one reason? They built something nobody wanted. Painstack fixes the starting point.',
    pauseAfter: 0.2,
  },
  {
    scene: 'SceneC_Input',
    startFrame: 270,
    durationFrames: 180,
    startSeconds: 9,
    text: 'Start with a problem or an idea. Describe it in your own words, paste a Reddit link, or upload research you already have.',
    pauseAfter: 0.2,
  },
  {
    scene: 'SceneD_Evidence',
    startFrame: 450,
    durationFrames: 210,
    startSeconds: 15,
    text: 'The Evidence Hub finds real pain signals. Not surveys. Not assumptions. Actual people, in actual communities, describing their actual problems.',
    pauseAfter: 0.2,
  },
  {
    scene: 'SceneE_Agents',
    startFrame: 660,
    durationFrames: 210,
    startSeconds: 22,
    text: 'Four agents work your idea simultaneously. Evidence. Market structure. Blueprint. Build plan. Twenty-four seven.',
    pauseAfter: 0.2,
  },
  {
    scene: 'SceneF_Blueprint',
    startFrame: 870,
    durationFrames: 690,
    startSeconds: 29,
    text: 'The result is a Startup Blueprint. A clear score, three solution directions, market size, competition gap, and a roadmap to your first version.',
    pauseAfter: 0.3,
  },
  {
    scene: 'SceneG_CTA',
    startFrame: 1680,
    durationFrames: 120,
    startSeconds: 56,
    text: 'Real problems. Real data. Clear decisions. Painstack dot A I.',
    pauseAfter: 0,
  },
];

export const VIDEO3_SCRIPTS = [
  { id: 'v3_s1_hook', text: "You have an idea. Is it worth building?" },
  { id: 'v3_s2_problem', text: "Ninety percent of startups fail. Number one reason: wrong product." },
  { id: 'v3_s3_solution', text: "Painstack scans real communities for evidence before you write a single line of code." },
  { id: 'v3_s4_result', text: "In sixty seconds: a Blueprint Score and a clear verdict. Build. Or don't." },
  { id: 'v3_s5_cta', text: "Painstack dot A I. Free to start." },
];
