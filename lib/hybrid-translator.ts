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
    replacement: "a lie or falsehood",
    variations: ["capping", "capped", "that's cap", "thats cap"],
    explanation: "Refers to a falsehood, deceit, or exaggeration."
  },
  {
    term: "fr",
    replacement: "genuinely / for real",
    variations: ["fr fr", "for real", "frfr", "fr tho"],
    explanation: "Short for 'for real', used for genuine agreement or emphasis."
  },
  {
    term: "sigma",
    replacement: "an independent, confident individual who succeeds on their own terms",
    variations: ["sigma male", "sigma grindset", "sigma vibe"],
    explanation: "Describes an introverted, autonomous leader outside typical social hierarchies."
  },
  {
    term: "delulu",
    replacement: "delusional or entertaining unrealistic expectations",
    variations: ["delulu is the solulu", "so delulu"],
    explanation: "Derived from 'delusional', often used humorously about optimistic fantasies."
  },
  {
    term: "cooked",
    replacement: "in serious trouble, exhausted, or facing inevitable failure",
    variations: ["bro is cooked", "we are cooked", "im cooked", "i'm cooked"],
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
    replacement: "chaotic, weird, or surreal internet phenomenon",
    variations: ["skibidi toilet", "skibidi rizz"],
    explanation: "A viral meme catchphrase originating from Source Filmmaker animations."
  },
  {
    term: "touch grass",
    replacement: "step outside and reconnect with real-world physical reality",
    variations: ["go touch grass", "needs to touch grass"],
    explanation: "A reminder to someone spending excessive time online to take a break outdoors."
  },
  {
    term: "fanum tax",
    replacement: "stealing a portion of a friend's food without permission",
    variations: ["fanum taxed", "paying the fanum tax"],
    explanation: "Popularized by streamer Fanum, describing sneaking bites from someone's meal."
  },
  {
    term: "rizz",
    replacement: "natural charisma and romantic appeal",
    variations: ["unspoken rizz", "w rizz", "rizzler", "rizzing"],
    explanation: "Short for 'charisma', referring to charming social or romantic prowess."
  },
  {
    term: "gyatt",
    replacement: "an expression of intense amazement or physical admiration",
    variations: ["gyat", "level 10 gyatt"],
    explanation: "A phonetic abbreviation of 'god damn' expressing excitement or shock."
  },
  {
    term: "main character",
    replacement: "someone behaving as though they are the central protagonist of a film",
    variations: ["main character energy", "main character syndrome"],
    explanation: "Believing one is at the epicenter of attention and dramatic focus."
  },
  {
    term: "rent free",
    replacement: "obsessively lingering in one's mind without resolution",
    variations: ["living rent free", "lives rent free in my head"],
    explanation: "When an idea, person, or song occupies someone's persistent thoughts."
  },
  {
    term: "bussin",
    replacement: "extraordinarily delicious or exceptionally great",
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
    replacement: "suspicious or dubious in character",
    variations: ["acting sus", "super sus"],
    explanation: "Short for suspicious, popularized by the multiplayer game Among Us."
  },
  {
    term: "periodt",
    replacement: "and that is final, with no further debate",
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
    replacement: "mediocre, uninspired, or average",
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
    replacement: "to talk excessively, ramble, or babble about trivia",
    variations: ["yapping", "yapper", "yapped", "yap session"],
    explanation: "Complaining that someone is talking too long without substance."
  },
  {
    term: "mewing",
    replacement: "maintaining tongue posture against the palate to sharpen jawline aesthetics",
    variations: ["mew", "looksmaxxing"],
    explanation: "A viral physical posture technique purported to alter facial structure."
  },
  {
    term: "glazing",
    replacement: "overwhelming someone with excessive sycophancy and flattery",
    variations: ["glaze", "meat riding", "glazer"],
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
    replacement: "an ardent, obsessive fan of a celebrity or brand",
    variations: ["stanning", "stanned"],
    explanation: "Portmanteau of stalker and fan, popularized by Eminem's song."
  },
  {
    term: "valid",
    replacement: "completely legitimate, understandable, and reasonable",
    variations: ["so valid", "super valid"],
    explanation: "Affirming that a choice, reaction, or perspective makes good sense."
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
      // Capitalize first letter
      const result = formal.charAt(0).toUpperCase() + formal.slice(1) + ".";
      return { translation: result, confidence: 0.98 };
    }
  }

  // Handle common idiomatic patterns
  const wholeSentencePatterns: Array<{ regex: RegExp; replace: (match: RegExpMatchArray) => string }> = [
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
      regex: /^he\s+has\s+unspoken\s+rizz$/i,
      replace: () => "He possesses effortless charm and natural interpersonal charisma."
    },
    {
      regex: /^you\s+need\s+to\s+touch\s+grass$/i,
      replace: () => "You should step away from your digital screen and spend time in the real world."
    },
    {
      regex: /^that\s+is\s+so\s+delulu$/i,
      replace: () => "That perspective is completely detached from reality and unrealistic."
    },
    {
      regex: /^it'?s\s+giving\s+(.+)$/i,
      replace: (m) => `It conveys the distinct aesthetic and atmosphere of ${m[1]}.`
    }
  ];

  for (const pattern of wholeSentencePatterns) {
    const match = trimmed.match(pattern.regex);
    if (match) {
      return { translation: pattern.replace(match), confidence: 0.95 };
    }
  }

  // Token and phrase substitution engine
  let processed = trimmed;
  let matchesCount = 0;

  // Sort by term length descending so multi-word idioms are replaced before single words
  const sortedDictionary = [...SLANG_DICTIONARY].sort((a, b) => b.term.length - a.term.length);

  for (const item of sortedDictionary) {
    const termsToMatch = [item.term, ...item.variations].sort((a, b) => b.length - a.length);
    for (const phrase of termsToMatch) {
      // Escape regex special chars
      const escaped = phrase.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const regex = new RegExp(`\\b${escaped}\\b`, "gi");
      if (regex.test(processed)) {
        processed = processed.replace(regex, item.replacement);
        matchesCount++;
      }
    }
  }

  // Clean up punctuation and capitalization
  let cleaned = processed.replace(/\s{2,}/g, " ").trim();
  if (cleaned.length > 0) {
    cleaned = cleaned.charAt(0).toUpperCase() + cleaned.slice(1);
    if (!/[.!?]$/.test(cleaned)) {
      cleaned += ".";
    }
  }

  if (matchesCount > 0) {
    return { translation: cleaned, confidence: 0.9 };
  }

  // If no slang detected, return clear polite English paraphrase
  return {
    translation: cleaned,
    confidence: 0.7
  };
}
