export interface SlangEntry {
  term: string;
  replacement: string;
  variations: string[];
  explanation?: string;
}

export const SLANG_DICTIONARY: SlangEntry[] = [
  {
    term: "no cap",
    replacement: "I am being completely honest and not exaggerating",
    variations: ["nocap", "no-cap", "no cap fr", "straight no cap"],
    explanation: "Used to emphasize authenticity or truthfulness, meaning 'no lie'."
  },
  {
    term: "cap",
    replacement: "a falsehood or lie",
    variations: ["capping", "capped", "that's cap", "thats cap", "straight cap"],
    explanation: "Refers to a falsehood, deceit, or exaggeration."
  },
  {
    term: "fr",
    replacement: "genuinely and truly",
    variations: ["fr fr", "for real", "frfr", "fr tho"],
    explanation: "Short for 'for real', used for genuine agreement or emphasis."
  },
  {
    term: "sigma",
    replacement: "an independent, confident individual who succeeds autonomously",
    variations: ["sigma male", "sigma grindset", "sigma vibe"],
    explanation: "Describes an introverted, autonomous leader outside typical social hierarchies."
  },
  {
    term: "delulu",
    replacement: "delusional or harboring unrealistically optimistic expectations",
    variations: ["delulu is the solulu", "so delulu", "pure delulu"],
    explanation: "Derived from 'delusional', often used humorously about optimistic fantasies."
  },
  {
    term: "cooked",
    replacement: "in serious trouble or facing inevitable failure",
    variations: ["bro is cooked", "we are cooked", "im cooked", "i'm cooked", "you're cooked", "he is cooked"],
    explanation: "Means someone is in an inescapable, compromised, or ruined situation."
  },
  {
    term: "ate",
    replacement: "executed flawlessly and delivered a magnificent performance",
    variations: ["ate that", "ate down", "ate and left no crumbs", "left no crumbs"],
    explanation: "High praise for when someone does an outstanding job with impeccable style."
  },
  {
    term: "skibidi",
    replacement: "chaotic, surreal, or absurd internet pop-culture phenomenon",
    variations: ["skibidi toilet", "skibidi rizz"],
    explanation: "A viral meme catchphrase originating from Source Filmmaker animations."
  },
  {
    term: "touch grass",
    replacement: "disconnect from the internet and experience the real world",
    variations: ["go touch grass", "needs to touch grass"],
    explanation: "A reminder to someone spending excessive time online to take a break outdoors."
  },
  {
    term: "fanum tax",
    replacement: "taking a portion of a companion's food without prior consent",
    variations: ["fanum taxed", "paying the fanum tax"],
    explanation: "Popularized by streamer Fanum, describing sneaking bites from someone's meal."
  },
  {
    term: "rizz",
    replacement: "natural charm and romantic appeal",
    variations: ["unspoken rizz", "w rizz", "rizzler", "rizzing", "maximum rizz"],
    explanation: "Short for 'charisma', referring to charming social or romantic prowess."
  },
  {
    term: "aura",
    replacement: "personal charisma, prestige, or cool factor",
    variations: ["infinite aura", "+1000 aura", "-1000 aura", "lost aura", "aura points"],
    explanation: "The perceived presence or prestige an individual projects."
  },
  {
    term: "lock in",
    replacement: "concentrate intensely and eliminate all distractions",
    variations: ["locked in", "locking in", "we need to lock in"],
    explanation: "Entering a state of deep focus or serious commitment."
  },
  {
    term: "let him cook",
    replacement: "give him space and uninterrupted freedom to perform his ideas",
    variations: ["let bro cook", "let them cook", "hold on let him cook"],
    explanation: "Allowing someone the opportunity to show what they are capable of."
  },
  {
    term: "gyatt",
    replacement: "an exuberant exclamation of astonishment or admiration",
    variations: ["gyat", "level 10 gyatt"],
    explanation: "A phonetic abbreviation of 'god damn' expressing excitement or shock."
  },
  {
    term: "main character",
    replacement: "someone behaving as though the universe revolves entirely around them",
    variations: ["main character energy", "main character syndrome"],
    explanation: "Believing one is at the epicenter of attention and dramatic focus."
  },
  {
    term: "rent free",
    replacement: "obsessively lingering in one's thoughts without resolution",
    variations: ["living rent free", "lives rent free in my head"],
    explanation: "When an idea, person, or song occupies someone's persistent thoughts."
  },
  {
    term: "bussin",
    replacement: "extraordinarily delicious or exceptionally well-crafted",
    variations: ["bussing", "bussin bussin", "so bussin"],
    explanation: "Originally AAVE, heavily used to describe exceptionally delectable food."
  },
  {
    term: "bet",
    replacement: "agreed, deal confirmed, or consider it done",
    variations: ["say less bet", "bet say less"],
    explanation: "An affirmative acknowledgement confirming plans, bets, or agreement."
  },
  {
    term: "sus",
    replacement: "suspicious, untrustworthy, or dubious",
    variations: ["acting sus", "super sus", "hella sus"],
    explanation: "Short for suspicious, popularized by the multiplayer game Among Us."
  },
  {
    term: "periodt",
    replacement: "and that is final, with no further discussion needed",
    variations: ["period", "and that's on periodt"],
    explanation: "Used at the conclusion of a statement to declare it incontrovertible."
  },
  {
    term: "lowkey",
    replacement: "discreetly, somewhat, or secretly",
    variations: ["low key", "low-key"],
    explanation: "Used to moderate intensity or keep sentiments subdued."
  },
  {
    term: "highkey",
    replacement: "openly, overtly, and unmistakably",
    variations: ["high key", "high-key"],
    explanation: "Opposite of lowkey; completely public and unreserved."
  },
  {
    term: "mid",
    replacement: "mediocre, unimpressive, or unremarkable",
    variations: ["so mid", "pretty mid"],
    explanation: "Derogatory evaluation meaning something fails to meet high expectations."
  },
  {
    term: "slay",
    replacement: "to excel brilliantly or present oneself with supreme confidence",
    variations: ["slayed", "slaying", "slay queen"],
    explanation: "Celebratory praise for remarkable presentation or achievement."
  },
  {
    term: "yap",
    replacement: "to talk excessively, ramble, or chatter aimlessly",
    variations: ["yapping", "yapper", "yapped", "yap session", "stop yapping"],
    explanation: "Complaining that someone is talking too long without substance."
  },
  {
    term: "mewing",
    replacement: "maintaining tongue posture against the palate to accentuate jawline definition",
    variations: ["mew", "looksmaxxing"],
    explanation: "A viral physical posture technique purported to alter facial structure."
  },
  {
    term: "glazing",
    replacement: "overwhelming someone with excessive sycophancy and exaggerated praise",
    variations: ["glaze", "meat riding", "glazer", "stop glazing"],
    explanation: "Criticism for praising another person beyond reasonable proportions."
  },
  {
    term: "crash out",
    replacement: "losing all self-control in an explosive, reckless temper tantrum",
    variations: ["crashed out", "crashing out"],
    explanation: "Risking everything or acting violently over an impulsive provocation."
  },
  {
    term: "bop",
    replacement: "an exceptionally catchy, high-quality music track",
    variations: ["certified bop", "such a bop"],
    explanation: "A song so rhythmically appealing that it compels rhythmic head nodding."
  },
  {
    term: "ratio",
    replacement: "receiving far more critical replies than positive approvals",
    variations: ["ratio'd", "ratioed", "l + ratio"],
    explanation: "An online metric indicating widespread disagreement from an audience."
  },
  {
    term: "simp",
    replacement: "someone exhibiting subservient, one-sided devotion",
    variations: ["simping", "simped"],
    explanation: "Demeaning term for someone overly deferential in hopes of affection."
  },
  {
    term: "sheesh",
    replacement: "an exuberant exclamation of astonishment, shock, or approval",
    variations: ["sheeeesh", "sheeesh"],
    explanation: "Drawn-out exclamation expressing awe or disbelief."
  },
  {
    term: "it's giving",
    replacement: "it radiates the distinct aesthetic or aura of",
    variations: ["its giving", "giving"],
    explanation: "A phrase to describe the impression, vibe, or aesthetic of something."
  },
  {
    term: "side eye",
    replacement: "a look of silent judgment, skepticism, or disapproval",
    variations: ["bombastic side eye", "criminal offensive side eye"],
    explanation: "Looking sideways at someone to convey sharp skepticism."
  },
  {
    term: "stan",
    replacement: "an ardent, obsessive fan of a public figure or brand",
    variations: ["stanning", "stanned"],
    explanation: "Portmanteau of stalker and fan, popularized by Eminem's song."
  },
  {
    term: "valid",
    replacement: "completely legitimate, understandable, and reasonable",
    variations: ["so valid", "super valid"],
    explanation: "Affirming that a choice, reaction, or perspective makes good sense."
  },
  {
    term: "deadass",
    replacement: "with complete earnestness and absolute seriousness",
    variations: ["dead ass", "dead-ass"],
    explanation: "Emphasizes sincerity, equivalent to 'I swear' or 'seriously'."
  },
  {
    term: "brainrot",
    replacement: "low-quality, repetitive digital media content that diminishes cognitive focus",
    variations: ["brain rot", "pure brainrot"],
    explanation: "Refers to hyper-stimulating, mindless online memes and media."
  },
  {
    term: "drip",
    replacement: "impeccable, fashionable attire and personal style",
    variations: ["drippy", "drip check"],
    explanation: "Refers to a stylish, cool outfit and confident demeanor."
  },
  {
    term: "glow up",
    replacement: "a remarkable personal transformation or aesthetic improvement",
    variations: ["glowup", "glowing up"],
    explanation: "Significant positive change in physical appearance, style, or maturity."
  },
  {
    term: "hits different",
    replacement: "resonates on a significantly deeper or more poignant emotional level",
    variations: ["hit different", "hitting different"],
    explanation: "Describes an experience that feels uniquely impactful or satisfying."
  },
  {
    term: "iykyk",
    replacement: "if you know, you know (implying insider knowledge)",
    variations: ["if you know you know"],
    explanation: "Short for 'if you know, you know', denoting an inside reference."
  },
  {
    term: "caught in 4k",
    replacement: "caught committing a blunder with indisputable, high-definition evidence",
    variations: ["caught in 4k fr", "in 4k"],
    explanation: "Being caught doing something embarrassing with clear photographic or video proof."
  },
  {
    term: "we are so back",
    replacement: "our circumstances have experienced a glorious and triumphant turnaround",
    variations: ["we're so back", "so back"],
    explanation: "Exclamation of revived optimism following a string of setbacks."
  },
  {
    term: "it's over for bro",
    replacement: "his circumstances have collapsed beyond any conceivable hope of recovery",
    variations: ["its over for bro", "it's over"],
    explanation: "Humorous declaration of someone's total doom or defeat."
  },
  {
    term: "opps",
    replacement: "adversaries, rivals, or opposing forces",
    variations: ["the opps", "opp"],
    explanation: "Short for opposition, referring to rivals or enemies."
  },
  {
    term: "vibe check",
    replacement: "an assessment of someone's current mood, attitude, or positive energy",
    variations: ["vibe checking", "vibe checked"],
    explanation: "Checking whether someone's attitude matches the social atmosphere."
  },
  {
    term: "tea",
    replacement: "sensational gossip or confidential interpersonal information",
    variations: ["spill the tea", "what's the tea"],
    explanation: "Sharing dramatic gossip or confidential details."
  },
  {
    term: "w",
    replacement: "a resounding victory or commendable achievement",
    variations: ["massive w", "big w", "common w"],
    explanation: "Stands for 'Win', celebrating positive news or praiseworthy actions."
  },
  {
    term: "l",
    replacement: "an unfortunate loss, embarrassment, or failure",
    variations: ["massive l", "big l", "common l", "take the l"],
    explanation: "Stands for 'Loss', expressing defeat or awkward embarrassment."
  }
];

export function hybridTranslate(text: string): { translation: string; confidence: number } {
  if (!text || !text.trim()) {
    return { translation: "", confidence: 1 };
  }

  const trimmed = text.trim();
  const lower = trimmed.toLowerCase();

  // Direct match lookup
  for (const item of SLANG_DICTIONARY) {
    if (lower === item.term || item.variations.some((v) => lower === v)) {
      const formal = item.replacement;
      const result = formal.charAt(0).toUpperCase() + formal.slice(1) + ".";
      return { translation: result, confidence: 0.98 };
    }
  }

  // Idiomatic pattern engine
  const idiomaticPatterns: Array<{ regex: RegExp; replace: (match: RegExpMatchArray) => string }> = [
    {
      regex: /^(bro|dude|he|she|they|we|i)\s+(is|are|am)\s+cooked$/i,
      replace: (m) => `${m[1].charAt(0).toUpperCase() + m[1].slice(1)} ${m[2]} in a disastrous situation with little hope of recovery.`
    },
    {
      regex: /^no cap\s*,\s*(.+)$/i,
      replace: (m) => `I am being completely honest: ${m[1]}.`
    },
    {
      regex: /^(.+)\s+no cap$/i,
      replace: (m) => `${m[1]}, without any exaggeration.`
    },
    {
      regex: /^she\s+ate\s+and\s+left\s+no\s+crumbs$/i,
      replace: () => "She performed flawlessly and executed her role to absolute perfection."
    },
    {
      regex: /^he\s+has\s+(unspoken\s+)?rizz$/i,
      replace: () => "He possesses effortless charm and natural interpersonal charisma."
    },
    {
      regex: /^you\s+need\s+to\s+touch\s+grass$/i,
      replace: () => "You should step away from your digital screen and reconnect with real life."
    },
    {
      regex: /^that\s+is\s+so\s+delulu$/i,
      replace: () => "That perspective is completely detached from reality and unrealistic."
    },
    {
      regex: /^it'?s\s+giving\s+(.+)$/i,
      replace: (m) => `It conveys the distinct aesthetic and aura of ${m[1]}.`
    },
    {
      regex: /^(hold on|wait)?\s*let\s+(him|them|bro)\s+cook$/i,
      replace: (m) => `Allow ${m[2]} the freedom to pursue the idea without premature interruption.`
    },
    {
      regex: /^we\s+are\s+so\s+back$/i,
      replace: () => "Our fortunes have miraculously reversed and we are in an overwhelmingly favorable position."
    },
    {
      regex: /^it'?s\s+over\s+for\s+(him|bro|us)$/i,
      replace: (m) => `Circumstances for ${m[1]} have deteriorated beyond any conceivable hope of redemption.`
    }
  ];

  for (const pattern of idiomaticPatterns) {
    const match = trimmed.match(pattern.regex);
    if (match) {
      return { translation: pattern.replace(match), confidence: 0.95 };
    }
  }

  // Token substitution with phrase precedence
  let processed = trimmed;
  let matchesCount = 0;

  const sortedDictionary = [...SLANG_DICTIONARY].sort((a, b) => b.term.length - a.term.length);

  for (const item of sortedDictionary) {
    const termsToMatch = [item.term, ...item.variations].sort((a, b) => b.length - a.length);
    for (const phrase of termsToMatch) {
      const escaped = phrase.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const regex = new RegExp(`\\b${escaped}\\b`, "gi");
      if (regex.test(processed)) {
        processed = processed.replace(regex, item.replacement);
        matchesCount++;
      }
    }
  }

  let cleaned = processed.replace(/\s{2,}/g, " ").trim();
  if (cleaned.length > 0) {
    cleaned = cleaned.charAt(0).toUpperCase() + cleaned.slice(1);
    if (!/[.!?]$/.test(cleaned)) {
      cleaned += ".";
    }
  }

  return {
    translation: cleaned,
    confidence: matchesCount > 0 ? 0.92 : 0.75
  };
}
