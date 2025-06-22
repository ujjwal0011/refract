// Constants
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
export const MAX_CODE_LENGTH = 5000;

export const DEFAULT_CODE = `// Welcome to Fun Code Reviewer!
// Paste or write your code here and get entertaining feedback

function greetDeveloper(name) {
    return \`Hello \${name}! Ready for some fun code review?\`;
}

console.log(greetDeveloper("Developer"));`;

export const LANGUAGE_MAP = {
  JavaScript: "javascript",
  TypeScript: "typescript",
  Python: "python",
  Java: "java",
  "C++": "cpp",
  Go: "go",
  Rust: "rust",
  PHP: "php",
  Ruby: "ruby",
  Swift: "swift",
};

export const STYLE_EMOJI_MAP = {
  "Doctor Doom": "👑",
  "Iron Man": "🤖",
  "Captain America": "🛡️",
  Hulk: "💚",
  Thor: "⚡",
  "Spider-Man": "🕷️",
  "Black Widow": "🕸️",
  "Doctor Strange": "🔮",
  "Black Panther": "🐾",
  "Captain Marvel": "⭐",
  "Sentry/Void": "☀️",
  Superman: "🦸",
  Batman: "🦇",
  "Wonder Woman": "⚔️",
  "The Flash": "⚡",
  Aquaman: "🔱",
  Ultron: "🤖",
  Darkseid: "👁️",
  "Lex Luthor": "🧠",
  Mysterio: "🎭",
  Joker: "🃏",
  Thanos: "🪐",
  Gorr: "🗡️",
  "Sherlock Holmes": "🕵️",
  "James Bond": "🕴️",
  "Captain Jack Sparrow": "🏴‍☠️",
  "Walter White": "🧪",
  "Tony Montana": "💼",
  Deadpool: "🗡️",
  Wolverine: "🗡️",
  Loki: "🪄",
  "Green Lantern": "💚",
  Shazam: "⚡",
  "Scarlet Witch": "🌀",
  "Green Goblin": "🎃",
  Magneto: "🧲",
  "Reverse Flash": "🔁",
  "Two-Face": "🌓",
  "Harley Quinn": "🩷",
  "Rick Sanchez": "🧬",
  "Tony Soprano": "🍝",
  "John Wick": "🐶",
  "The Mandalorian": "🛡️",
  Gandalf: "🧙",
};
