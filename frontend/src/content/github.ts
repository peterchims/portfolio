export const github = {
  user: 'peterchims',
  url: 'https://github.com/peterchims',
  blurb:
    'Solution-first thinking, system design with clear sync/async boundaries, and reliability under load — Redis for caching and rate limiting, background workers for anything that should not block a response.',
  achievements: ['Pull Shark ×3', 'Pair Extraordinaire ×2', 'YOLO'],
  organizations: [
    'BuildForSDG',
    'ClaudyGod Music Ministries',
    'The Wisdom Church',
    'DextaAfrica',
    'TmdProperties',
    '0906 Tech Consult',
    'WICC Religious Community',
  ],
  exploring: [
    'Distributed systems patterns in Go — worker pools, job queues, graceful degradation',
    'Event-driven architecture with Redis pub/sub',
    'React Server Components with Next.js',
    'Advanced TypeScript — generics, discriminated unions, branded types',
  ],
};

/** Stat-card image URLs, tuned for a transparent background in both themes. */
const streakColors =
  'background=00000000&hide_border=true&ring=4F6BF5&fire=4F6BF5&currStreakNum=9A9A96&sideNums=9A9A96&currStreakLabel=4F6BF5&sideLabels=75756F&dates=75756F&stroke=8888881f&excludeDaysLabel=75756F';
const statsColors =
  'bg_color=00000000&hide_border=true&title_color=4F6BF5&text_color=9A9A96&icon_color=4F6BF5';

export const githubImages = {
  streak: `https://streak-stats.demolab.com/?user=${github.user}&${streakColors}`,
  stats: `https://github-readme-stats.vercel.app/api?username=${github.user}&${statsColors}&show_icons=true&hide=issues`,
  langs: `https://github-readme-stats.vercel.app/api/top-langs/?username=${github.user}&${statsColors}&layout=compact&langs_count=8`,
};
