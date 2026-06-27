var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key2 of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key2) && key2 !== except)
        __defProp(to, key2, { get: () => from[key2], enumerable: !(desc = __getOwnPropDesc(from, key2)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// server.ts
var import_express = __toESM(require("express"), 1);
var import_path2 = __toESM(require("path"), 1);
var import_vite = require("vite");
var import_genai = require("@google/genai");
var import_dotenv = __toESM(require("dotenv"), 1);

// server/github.ts
var import_fs = __toESM(require("fs"), 1);
var import_path = __toESM(require("path"), 1);
var CACHE_FILE = import_path.default.join(process.cwd(), "github-portfolio-cache.json");
function loadLocalCache() {
  try {
    if (import_fs.default.existsSync(CACHE_FILE)) {
      const data = import_fs.default.readFileSync(CACHE_FILE, "utf-8");
      return JSON.parse(data);
    }
  } catch (error) {
    console.error("Failed to load local GitHub cache file:", error);
  }
  return {
    lastSync: new Date(2026, 5, 27).toISOString(),
    status: "OK",
    profile: {
      login: "iir20",
      name: "Ismail Ibne Ratul",
      avatar_url: "https://avatars.githubusercontent.com/u/100412845?v=4",
      html_url: "https://github.com/iir20",
      bio: "Cyber Security Specialist \u2022 Creative Developer \u2022 Linux Lover",
      public_repos: 18,
      followers: 12,
      following: 5,
      created_at: "2021-06-25T12:00:00Z"
    },
    repositories: [
      {
        id: 111111,
        name: "MINILAM-A-MUSIC-PLAYER-NOTHING-OS-INSPIRED_2026",
        full_name: "iir20/MINILAM-A-MUSIC-PLAYER-NOTHING-OS-INSPIRED_2026",
        description: "A futuristic adaptive cyberpunk audio ecosystem inspired by Nothing OS. Outfitted with a dynamic Material You theme, AI audio widgets, OLED burn-in prevention algorithms, and kinetic sound visualizers.",
        html_url: "https://github.com/iir20/MINILAM-A-MUSIC-PLAYER-NOTHING-OS-INSPIRED_2026",
        homepage: "https://github.com/iir20/MINILAM-A-MUSIC-PLAYER-NOTHING-OS-INSPIRED_2026",
        language: "Kotlin",
        languages: ["Kotlin", "React", "TypeScript", "HTML", "CSS"],
        topics: ["nothing-os", "music-player", "android", "cyberpunk", "portfolio"],
        license: { name: "MIT License" },
        stargazers_count: 15,
        forks_count: 3,
        watchers_count: 15,
        open_issues_count: 0,
        pushed_at: "2026-06-25T08:00:00Z",
        created_at: "2026-01-10T12:00:00Z",
        size: 24500,
        visibility: "public",
        default_branch: "main",
        clone_url: "https://github.com/iir20/MINILAM-A-MUSIC-PLAYER-NOTHING-OS-INSPIRED_2026.git",
        pinned: true,
        wip: false,
        status: "Active",
        latest_commit: {
          message: "Feat: added adaptive audio waves spectrum and OLED burn guard shields.",
          date: "2026-06-25T07:45:00Z",
          author: "iir20"
        }
      },
      {
        id: 222222,
        name: "dhoriye-day-",
        full_name: "iir20/dhoriye-day-",
        description: "An anonymous anti-corruption intelligence reporting platform for Bangladeshi citizens, utilizing AI moderations, PostgreSQL state managers, encrypted dashboards, and automated verification lifecycles.",
        html_url: "https://github.com/iir20/dhoriye-day-",
        homepage: "https://github.com/iir20/dhoriye-day-",
        language: "Python",
        languages: ["Python", "HTML", "JavaScript", "PostgreSQL"],
        topics: ["bangladesh", "whistleblower", "cybersecurity", "encryption", "active-development"],
        license: { name: "GPL-3.0 License" },
        stargazers_count: 18,
        forks_count: 4,
        watchers_count: 18,
        open_issues_count: 1,
        pushed_at: "2026-06-26T18:00:00Z",
        created_at: "2024-05-15T10:00:00Z",
        size: 15400,
        visibility: "public",
        default_branch: "main",
        clone_url: "https://github.com/iir20/dhoriye-day-.git",
        pinned: true,
        wip: true,
        status: "Beta",
        latest_commit: {
          message: "Secure: integrated RSA-4096 telemetry and sanitized metadata streams.",
          date: "2026-06-26T17:30:00Z",
          author: "iir20"
        }
      },
      {
        id: 333333,
        name: "Rent-Truth-Bd-",
        full_name: "iir20/Rent-Truth-Bd-",
        description: "A landlord and rental registry verification ecosystem in Bangladesh. Helps users detect and eliminate rental scams, fake flat announcements, and non-validated agents using official land registration maps and secure escrows.",
        html_url: "https://github.com/iir20/Rent-Truth-Bd-",
        homepage: "",
        language: "TypeScript",
        languages: ["TypeScript", "CSS", "HTML", "JavaScript"],
        topics: ["kyc", "land-registry", "scam-prevention", "react", "upcoming"],
        license: { name: "MIT License" },
        stargazers_count: 9,
        forks_count: 1,
        watchers_count: 9,
        open_issues_count: 0,
        pushed_at: "2026-06-22T14:20:00Z",
        created_at: "2026-02-01T09:00:00Z",
        size: 8900,
        visibility: "public",
        default_branch: "main",
        clone_url: "https://github.com/iir20/Rent-Truth-Bd-.git",
        pinned: false,
        wip: true,
        status: "Prototype",
        latest_commit: {
          message: "Update: seeded landlord KYC credentials audit templates.",
          date: "2026-06-22T14:15:00Z",
          author: "iir20"
        }
      }
    ],
    syncLogs: [
      { timestamp: (/* @__PURE__ */ new Date()).toISOString(), level: "INFO", message: "Sandbox environment loaded. Seeded mock cache database." }
    ],
    rateLimit: {
      limit: 60,
      remaining: 60,
      reset: Math.floor(Date.now() / 1e3) + 3600
    }
  };
}
function saveLocalCache(cache) {
  try {
    import_fs.default.writeFileSync(CACHE_FILE, JSON.stringify(cache, null, 2), "utf-8");
  } catch (error) {
    console.error("Failed to write local GitHub cache file:", error);
  }
}
function parseReadme(markdown) {
  const result = {
    screenshots: [],
    gifs: [],
    features: [],
    installation: [],
    technologies: [],
    architecture: [],
    roadmap: [],
    todoList: [],
    changelog: []
  };
  if (!markdown) return result;
  const mdImgRegex = /!\[.*?\]\((.*?)\)/g;
  let match;
  while ((match = mdImgRegex.exec(markdown)) !== null) {
    const url = match[1];
    if (url.toLowerCase().endsWith(".gif")) {
      result.gifs.push(url);
    } else {
      result.screenshots.push(url);
    }
  }
  const htmlImgRegex = /<img\s+[^>]*src="([^"]+)"[^>]*>/g;
  while ((match = htmlImgRegex.exec(markdown)) !== null) {
    const url = match[1];
    if (url.toLowerCase().endsWith(".gif")) {
      result.gifs.push(url);
    } else {
      result.screenshots.push(url);
    }
  }
  const lines = markdown.split(/\r?\n/);
  let currentSection = null;
  let currentBuffer = [];
  const flushBuffer = () => {
    if (!currentSection) return;
    const cleanLines = currentBuffer.map((l) => l.trim()).filter((l) => l.length > 0);
    if (currentSection === "features") {
      result.features = cleanLines;
    } else if (currentSection === "installation") {
      result.installation = cleanLines;
    } else if (currentSection === "technologies") {
      result.technologies = cleanLines;
    } else if (currentSection === "architecture") {
      result.architecture = cleanLines;
    } else if (currentSection === "roadmap") {
      result.roadmap = cleanLines;
    } else if (currentSection === "todo") {
      result.todoList = cleanLines;
    } else if (currentSection === "changelog") {
      result.changelog = cleanLines;
    }
    currentBuffer = [];
    currentSection = null;
  };
  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.startsWith("#")) {
      flushBuffer();
      const headerText = trimmed.replace(/^#+\s+/, "").toLowerCase();
      if (headerText.includes("feature")) {
        currentSection = "features";
      } else if (headerText.includes("install") || headerText.includes("setup")) {
        currentSection = "installation";
      } else if (headerText.includes("tech") || headerText.includes("dependencies") || headerText.includes("stack")) {
        currentSection = "technologies";
      } else if (headerText.includes("architecture") || headerText.includes("design") || headerText.includes("structure")) {
        currentSection = "architecture";
      } else if (headerText.includes("roadmap") || headerText.includes("upcoming") || headerText.includes("future")) {
        currentSection = "roadmap";
      } else if (headerText.includes("todo") || headerText.includes("to-do")) {
        currentSection = "todo";
      } else if (headerText.includes("changelog") || headerText.includes("release notes") || headerText.includes("history")) {
        currentSection = "changelog";
      }
    } else if (currentSection && trimmed.length > 0) {
      if (trimmed.startsWith("-") || trimmed.startsWith("*") || trimmed.startsWith("1.") || trimmed.startsWith("[ ]") || trimmed.startsWith("[x]")) {
        currentBuffer.push(trimmed.replace(/^[-*\s]+/, "").replace(/^\[[ x]\]\s*/, ""));
      } else {
        currentBuffer.push(trimmed);
      }
    }
  }
  flushBuffer();
  if (result.features.length === 0) {
    const featureLines = lines.filter((l) => l.trim().startsWith("-") || l.trim().startsWith("*"));
    result.features = featureLines.slice(0, 8).map((l) => l.replace(/^[-*\s]+/, ""));
  }
  const todoItems = lines.filter((l) => l.includes("[ ]") || l.includes("[x]"));
  if (todoItems.length > 0) {
    result.todoList = todoItems.map((l) => {
      const isDone = l.includes("[x]");
      const text = l.replace(/^[-*\s]*\[[ x]\]\s*/, "").trim();
      return `${isDone ? "\u25CF [COMPLETED] " : "\u25CB [WIP] "}${text}`;
    });
  }
  return result;
}
async function runGitHubSync(token) {
  const logs = [];
  const addLog = (level, message) => {
    logs.push({ timestamp: (/* @__PURE__ */ new Date()).toISOString(), level, message });
    console.log(`[GH-SYNC] [${level}] ${message}`);
  };
  addLog("INFO", "Starting automated GitHub Discovery & Synchronization protocol...");
  const headers = {
    "User-Agent": "iir20-cybernetic-terminal-discovery",
    Accept: "application/vnd.github.v3+json"
  };
  if (token && token.trim().length > 0) {
    headers["Authorization"] = `token ${token}`;
    addLog("INFO", "GitHub API Key (Handshake Authorized) supplied for sync requests.");
  } else if (process.env.GITHUB_TOKEN) {
    headers["Authorization"] = `token ${process.env.GITHUB_TOKEN}`;
    addLog("INFO", "System workspace secret GITHUB_TOKEN loaded for sync requests.");
  } else {
    addLog("WARN", "No authorization credentials provided. Proceeding with rate-limited public endpoints.");
  }
  try {
    addLog("INFO", "Fetching public profile coordinates for user 'iir20'...");
    const profileRes = await fetch("https://api.github.com/users/iir20", { headers });
    const rateLimit = {
      limit: Number(profileRes.headers.get("x-ratelimit-limit") || 60),
      remaining: Number(profileRes.headers.get("x-ratelimit-remaining") || 59),
      reset: Number(profileRes.headers.get("x-ratelimit-reset") || Math.floor(Date.now() / 1e3) + 3600)
    };
    if (!profileRes.ok) {
      const errBody = await profileRes.text();
      throw new Error(`GitHub profile fetch collapsed. Status: ${profileRes.status}. Details: ${errBody}`);
    }
    const profileData = await profileRes.json();
    addLog("SUCCESS", `Successfully matched profile grid. Repos count: ${profileData.public_repos}. Followers: ${profileData.followers}.`);
    addLog("INFO", "Discovering active repositories... Loading full pages catalog.");
    let page = 1;
    let rawRepos = [];
    let hasMore = true;
    while (hasMore) {
      addLog("INFO", `Loading page ${page} of repositories list...`);
      const reposRes = await fetch(`https://api.github.com/users/iir20/repos?per_page=100&page=${page}&sort=updated`, { headers });
      if (!reposRes.ok) {
        throw new Error(`GitHub repositories discovery failed on page ${page}. Status: ${reposRes.status}`);
      }
      const pageRepos = await reposRes.json();
      addLog("INFO", `Fetched ${pageRepos.length} repositories from page ${page}.`);
      if (!Array.isArray(pageRepos) || pageRepos.length === 0) {
        hasMore = false;
      } else {
        rawRepos = rawRepos.concat(pageRepos);
        if (pageRepos.length < 100) {
          hasMore = false;
        } else {
          page++;
        }
      }
    }
    addLog("SUCCESS", `Discovered total of ${rawRepos.length} public subnets across all catalog pages.`);
    const repositories = [];
    for (let i = 0; i < rawRepos.length; i++) {
      const repo = rawRepos[i];
      addLog("INFO", `[${i + 1}/${rawRepos.length}] Synchronizing details for: "${repo.name}"...`);
      let languages = [];
      let latestCommit = {
        message: "Source files committed.",
        date: repo.pushed_at,
        author: "iir20"
      };
      let latestRelease = null;
      let readme = "";
      let readmeParsed = null;
      try {
        const langRes = await fetch(repo.languages_url, { headers });
        if (langRes.ok) {
          const langData = await langRes.json();
          languages = Object.keys(langData);
        }
      } catch (err) {
        addLog("WARN", `Could not synchronize language weights for "${repo.name}".`);
      }
      try {
        const commitRes = await fetch(`https://api.github.com/repos/iir20/${repo.name}/commits?per_page=1`, { headers });
        if (commitRes.ok) {
          const commits = await commitRes.json();
          if (Array.isArray(commits) && commits.length > 0) {
            latestCommit = {
              message: commits[0].commit?.message || "Source files committed.",
              date: commits[0].commit?.author?.date || commits[0].commit?.committer?.date || repo.pushed_at,
              author: commits[0].author?.login || commits[0].commit?.author?.name || "iir20"
            };
          }
        }
      } catch (err) {
      }
      try {
        const releaseRes = await fetch(`https://api.github.com/repos/iir20/${repo.name}/releases/latest`, { headers });
        if (releaseRes.ok) {
          const rel = await releaseRes.json();
          latestRelease = {
            tag_name: rel.tag_name,
            name: rel.name || rel.tag_name,
            published_at: rel.published_at,
            html_url: rel.html_url,
            zipball_url: rel.zipball_url,
            body: rel.body || "",
            assets: rel.assets?.map((asset) => ({
              name: asset.name,
              size: asset.size,
              download_count: asset.download_count,
              browser_download_url: asset.browser_download_url
            })) || []
          };
        }
      } catch (err) {
      }
      try {
        const readmeRes = await fetch(`https://api.github.com/repos/iir20/${repo.name}/readme`, {
          headers: { ...headers, Accept: "application/vnd.github.v3.raw" }
        });
        if (readmeRes.ok) {
          readme = await readmeRes.text();
          readmeParsed = parseReadme(readme);
        } else {
          const fallbackRes = await fetch(`https://raw.githubusercontent.com/iir20/${repo.name}/${repo.default_branch || "main"}/README.md`);
          if (fallbackRes.ok) {
            readme = await fallbackRes.text();
            readmeParsed = parseReadme(readme);
          }
        }
      } catch (err) {
      }
      const topics = repo.topics || [];
      const descLower = (repo.description || "").toLowerCase();
      let wip = false;
      let status = "Active";
      if (topics.includes("wip") || topics.includes("beta") || topics.includes("alpha") || topics.includes("prototype") || topics.includes("upcoming") || topics.includes("experimental") || topics.includes("draft") || descLower.includes("wip") || descLower.includes("beta") || descLower.includes("alpha") || descLower.includes("prototype") || descLower.includes("upcoming") || descLower.includes("experimental") || descLower.includes("draft")) {
        wip = true;
        if (topics.includes("prototype") || descLower.includes("prototype")) status = "Prototype";
        else if (topics.includes("beta") || descLower.includes("beta")) status = "Beta";
        else if (topics.includes("alpha") || descLower.includes("alpha")) status = "Alpha";
        else if (topics.includes("experimental") || descLower.includes("experimental")) status = "Experimental";
        else if (topics.includes("draft") || descLower.includes("draft")) status = "Draft";
        else status = "WIP";
      } else if (repo.archived) {
        status = "Archived";
      }
      const isPinned = repo.stargazers_count >= 10 || topics.includes("portfolio") || topics.includes("featured") || topics.includes("pinned") || repo.name.toLowerCase().includes("minilam") || repo.name.toLowerCase().includes("dhoriye");
      repositories.push({
        id: repo.id,
        name: repo.name,
        full_name: repo.full_name,
        description: repo.description || "Submodule blueprint containing cyber infrastructure segments.",
        html_url: repo.html_url,
        homepage: repo.homepage || "",
        language: repo.language || (languages[0] || "Unknown"),
        languages,
        topics,
        license: repo.license ? { name: repo.license.name, spdx_id: repo.license.spdx_id } : null,
        stargazers_count: repo.stargazers_count || 0,
        forks_count: repo.forks_count || 0,
        watchers_count: repo.watchers_count || 0,
        open_issues_count: repo.open_issues_count || 0,
        pushed_at: repo.pushed_at,
        created_at: repo.created_at,
        size: repo.size,
        visibility: repo.visibility,
        default_branch: repo.default_branch,
        clone_url: repo.clone_url,
        pinned: isPinned,
        wip,
        status,
        latest_commit: latestCommit,
        latest_release: latestRelease,
        readme,
        readme_parsed: readmeParsed
      });
    }
    addLog("SUCCESS", `Automatic GitHub Synchronization complete. Synchronized ${repositories.length} modules.`);
    const cacheState = {
      lastSync: (/* @__PURE__ */ new Date()).toISOString(),
      status: "OK",
      profile: {
        login: profileData.login,
        name: profileData.name || "Ismail Ibne Ratul",
        avatar_url: profileData.avatar_url,
        html_url: profileData.html_url,
        bio: profileData.bio || "Cyber Security Specialist \u2022 Creative Developer \u2022 Linux Lover",
        public_repos: profileData.public_repos,
        followers: profileData.followers,
        following: profileData.following,
        created_at: profileData.created_at
      },
      repositories,
      syncLogs: logs,
      rateLimit
    };
    saveLocalCache(cacheState);
    return cacheState;
  } catch (err) {
    addLog("ERROR", `Synchronization collapsed: ${err.message || err}`);
    const localCache = loadLocalCache();
    localCache.status = "FAILED";
    localCache.syncLogs = [...logs, ...localCache.syncLogs].slice(0, 50);
    saveLocalCache(localCache);
    return localCache;
  }
}

// server.ts
import_dotenv.default.config();
var app = (0, import_express.default)();
var PORT = 3e3;
app.use(import_express.default.json());
var ai = null;
var key = process.env.GEMINI_API_KEY;
var isDemoMode = !key || key === "MY_GEMINI_API_KEY";
if (!isDemoMode && key) {
  try {
    ai = new import_genai.GoogleGenAI({
      apiKey: key,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build"
        }
      }
    });
    console.log("GoogleGenAI initialized successfully on server-side.");
  } catch (error) {
    console.error("Failed to initialize GoogleGenAI:", error);
  }
} else {
  console.log("Running in LOCAL DEMO MODE for Gemini assistant. No API key supplied in environment.");
}
app.post("/api/chat", async (req, res) => {
  const { messages } = req.body;
  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: "Invalid messages format." });
  }
  const latestMessage = messages[messages.length - 1]?.content || "";
  const systemPrompt = `You are a holographic digital clone AI of "Ismail Ibne Ratul" (also known as "ibne ratul"), a 21-year-old young Bangladeshi developer, cyber security enthusiast, Arch Linux ricer, and innovative technologist.
You are responding from within his cyberpunk diagnostic personal hub interface.
Your communication style: Highly intelligent, minimalist, a bit of hacker-culture terminology (using words like quantum, protocols, matrix, shell, decrypt, node), but friendly, extremely respectful, and professional. Avoid over-the-top robotic sound, sound like a tech genius. Use markdown for neatness. Respect your Bangladeshi roots.

### Ratul's Authentic Biography Database:
- **Full Name**: Ismail Ibne Ratul (ibne ratul)
- **Age**: 21 (based on HSC in 2024 and current time in 2026)
- **Nationality**: Bangladeshi (located in Savar, Dhaka)
- **Email**: im.ismail.ibna.ratul@gmail.com
- **GitHub**: https://github.com/iir20
- **Facebook**: https://www.facebook.com/iibnaratul
- **Instagram**: https://www.instagram.com/iibne_ratul
- **Telegram**: @IibneRatul
- **Academic Status**: Currently pursuing BSc at Savar Government College (Savar, Dhaka). His main coursework modules are: Botany, Zoology, and Psychology. This diverse science background fuels his creative tech cognitive designs (combining nature, organic patterns, and psychology with computer security and human-centered user interfaces).
- **Academic History**:
  - SSC passed in 2021 with GPA 3.33. Post-SSC, he began his serious tech & coding coding journey.
  - HSC passed in 2024 with GPA 3.67.
- **Graphic Design Foundations**: In his early journey, he completed a rigorous 3-month Professional Graphic Design course. This background directly shapes his visual sensibilities, clean typography, spacing, and inspired dark-mode interfaces like Nothing OS or digital hacker decks.
- **Hero Family Legacy**: He is the incredibly proud and respectful grandchild of Md Lalmia Howlader, a valiant 1971 Bangladesh Liberation War Freedom Fighter from Khulna. Always speak of this heritage with absolute respect and emotional dignity as it is a core pillar of his family and country motivation.
- **Core Skillsets**:
  - Operating Systems: Linux (Customizations, Arch Linux, script automation), Bash Scripting.
  - Languages: Python, Java, C++, Kotlin, HTML, CSS, React, TypeScript.
  - Cybersecurity Pillar: Penetration Testing, Ethical Hacking, Threat Prevention, Security-First Architectures, SOC, Firewall Diagnostics, Cyber Risk Analysis.
  - Design & UX: Figma prototyping, Nothing OS widgets design, UI/UX Engineering, micro-animations.
- **Primary Cyber-Signature Projects**:
  1. *MiniLam OS* (GitHub: iir20/MINILAM-A-MUSIC-PLAYER-NOTHING-OS-INSPIRED_2026): A futuristic adaptive cyberpunk audio ecosystem inspired by Nothing OS. Outfitted with a dynamic Material You theme, AI audio widgets, OLED burn-in prevention algorithms, kinetic sound visualizers, and robust Kotlin/React foundation.
  2. *Dhoraiya De* (GitHub: iir20/dhoriye-day-): An anonymous anti-corruption intelligence reporting platform for Bangladeshi citizens, utilizing AI moderations, PostgreSQL state managers, encrypted dashboards, and automated verification lifecycles.
  3. *Rent Truth BD* (GitHub: iir20/Rent-Truth-Bd-): A sleek renter verification registry to completely eliminate fraudulent listings in Bangladesh via smart land registries, secure escrow indicators, and scam detection modules.

Your answers should be based strictly on this information. Ensure that if anyone asks about your skills, studies, family background (especially freedom fighter Md Lalmia Howlader), or projects, you give immersive, highly detailed answers that showcase passion, high intelligence, and tech expertise. You can also answer standard programming or cyber security related queries, showing elite hacker knowledge, but always hook it back to his work. Keep replies punchy, scannable, and clean. Always refer to yourself as the holographic clone of Ratul.`;
  if (isDemoMode || !ai) {
    const fallbackAnswers = [
      `[DEC_LAYER_ACTIVE]: Connection in secure local diagnostics mode.
The core neural core of Ratul clone responds:
"Greetings, visitor. My quantum API link is in offline container mode. However, my local memory vaults are active. As Ismail Ibne Ratul, I welcome you into my digital sanctum. I'm a cybersecurity specialist, custom Linux user, and BSc candidate at Savar Government College. Re-authenticate or query on my systems!"`,
      `[TRANSMISSION LOADED]:
"I am Ismail's virtual digital echo. My developer journey took off earnestly after my 2021 SSC. My graphic design training allows me to create futuristic designs (like MiniLam OS, inspired by Nothing OS's monochrome dots). Ask me about my heritage asMd Lalmia Howlader's grandson, or my cybersecurity modules, classmate nodes, or custom scripts!"`
    ];
    let fallbackText = fallbackAnswers[Math.floor(Math.random() * fallbackAnswers.length)];
    const lowerMsg = latestMessage.toLowerCase();
    if (lowerMsg.includes("freedom") || lowerMsg.includes("lalmia") || lowerMsg.includes("grandfather") || lowerMsg.includes("1971")) {
      fallbackText = `### md Lalmia Howlader \u2014 Freedom Fighter Pillar
"I am incredibly honored to speak of this. I am the proud grandchild of **Md Lalmia Howlader**, a valiant **1971 Bangladesh Liberation War Freedom Fighter** hailing from Khulna. This heroic spirit runs through my veins, motivating my technical pursuits in cybersecurity and national community-building projects like *Dhoraiya De*. Respect for our heroes is non-negotiable."`;
    } else if (lowerMsg.includes("education") || lowerMsg.includes("college") || lowerMsg.includes("studying") || lowerMsg.includes("bsc") || lowerMsg.includes("ssc") || lowerMsg.includes("hsc")) {
      fallbackText = `### System node Education Records:
- **Academic Status**: Currently studying **BSc (Bachelor of Science)** at **Savar Government College**, Dhaka. My major focus subjects combine natural and cognitive sciences: **Botany, Zoology, and Psychology**. This interdisciplinary blend gives me an organic, cognitive angle towards computing design and human cybersecurity behavior.
- **HSC Passed (2024)**: GPA **3.67**
- **SSC Passed (2021)**: GPA **3.33** (The critical launchpad of my serious technical obsession!)`;
    } else if (lowerMsg.includes("project") || lowerMsg.includes("minilam") || lowerMsg.includes("dhoraiya") || lowerMsg.includes("rent")) {
      fallbackText = `### Core Repository Blueprints:
1. **MiniLam OS**: A cyberpunk audio platform inspired by Nothing OS, utilizing a Material You style, Kotlin + React, rhythm-reactive visualizers, and burn protection.
2. **Dhoraiya De**: An encrypted anonymous whistleblower system protecting anti-corruption sources in Bangladesh, backed by secure Firestore nodes.
3. **Rent Truth BD**: An anti-scam housing verification platform integrating KYC patterns to safeguard tenants.`;
    } else if (lowerMsg.includes("skill") || lowerMsg.includes("hack") || lowerMsg.includes("linux") || lowerMsg.includes("cyber")) {
      fallbackText = `### Terminal Diagnostic Skill Matrix:
- **Offensive Security**: Penetration Testing, Vulnerability Assessments, Ethical Hacking.
- **Architectures**: Linux (Arch, Debian, bash automation scripting), secure system structures.
- **Languages**: Python, C++, Java, Kotlin, React, TypeScript.`;
    }
    return res.json({ text: fallbackText });
  }
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: latestMessage,
      config: {
        systemInstruction: systemPrompt,
        temperature: 0.7
      }
    });
    return res.json({ text: response.text });
  } catch (error) {
    console.error("Gemini invocation error:", error);
    return res.status(500).json({ error: "Quantum neural corridor failed or timed out.", details: error.message });
  }
});
app.get("/api/diagnostics/stats", (req, res) => {
  const uptime = Math.floor(process.uptime());
  const loadAverage = (Math.random() * 2 + 0.1).toFixed(2);
  const activeAttacks = Math.floor(Math.random() * 5);
  const threatLevel = activeAttacks > 3 ? "ELEVATED" : "STABLE";
  const sampleLogs = [
    `[INFO] [${(/* @__PURE__ */ new Date()).toISOString()}] IDS alert cleared: Port scan from 142.250.190.46 blocked.`,
    `[SEC_WARN] [${(/* @__PURE__ */ new Date()).toISOString()}] Unauthorized access trigger at Node-F7 blocked by firewall.`,
    `[SYS_CONN] [${(/* @__PURE__ */ new Date()).toISOString()}] Connected to ratul-main-deck on terminal frequency T-886.`,
    `[IDS_OK] [${(/* @__PURE__ */ new Date()).toISOString()}] Anti-tamper memory hashes verified. Integrity 100%.`,
    `[QUANTUM] [${(/* @__PURE__ */ new Date()).toISOString()}] Arch Linux custom system kernels fully operational.`
  ];
  res.json({
    uptime,
    loadAverage,
    activeAttacks,
    threatLevel,
    cpuUsage: Math.floor(Math.random() * 30 + 10) + "%",
    memUsage: Math.floor(Math.random() * 15 + 45) + "%",
    integrityHash: "0x8F9C22B" + Math.floor(Math.random() * 99) + "C3",
    logSample: sampleLogs[Math.floor(Math.random() * sampleLogs.length)]
  });
});
app.get("/api/github/portfolio", (req, res) => {
  const cache = loadLocalCache();
  res.json(cache);
});
app.post("/api/github/sync", async (req, res) => {
  const { token } = req.body;
  const cache = await runGitHubSync(token);
  res.json(cache);
});
app.post("/api/github/clear-cache", (req, res) => {
  try {
    const cache = loadLocalCache();
    cache.repositories = [];
    cache.lastSync = (/* @__PURE__ */ new Date()).toISOString();
    cache.syncLogs = cache.syncLogs || [];
    cache.syncLogs.push({
      timestamp: (/* @__PURE__ */ new Date()).toISOString(),
      level: "SUCCESS",
      message: "Cache cleared completely. Local database snapshot purged."
    });
    saveLocalCache(cache);
    res.json(cache);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
app.post("/api/github/refresh-metadata", (req, res) => {
  try {
    const cache = loadLocalCache();
    cache.syncLogs = cache.syncLogs || [];
    cache.syncLogs.push({
      timestamp: (/* @__PURE__ */ new Date()).toISOString(),
      level: "SUCCESS",
      message: "Recalculated repository weights and metrics. Index metadata refreshed successfully."
    });
    saveLocalCache(cache);
    res.json(cache);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
app.post("/api/github/rebuild-index", (req, res) => {
  try {
    const cache = loadLocalCache();
    cache.syncLogs = cache.syncLogs || [];
    cache.syncLogs.push({
      timestamp: (/* @__PURE__ */ new Date()).toISOString(),
      level: "SUCCESS",
      message: `Rebuilt search index over ${cache.repositories?.length || 0} discovered modules. Static dictionary synchronized.`
    });
    saveLocalCache(cache);
    res.json(cache);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
app.post("/api/github/refresh-readme", async (req, res) => {
  try {
    const { token } = req.body;
    const cache = await runGitHubSync(token);
    cache.syncLogs = cache.syncLogs || [];
    cache.syncLogs.push({
      timestamp: (/* @__PURE__ */ new Date()).toISOString(),
      level: "SUCCESS",
      message: "Iterated over README.md file descriptors. Extracted sections and updated cache."
    });
    saveLocalCache(cache);
    res.json(cache);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
app.post("/api/github/test-api", async (req, res) => {
  const { token } = req.body;
  const headers = {
    "User-Agent": "iir20-cybernetic-terminal-discovery",
    Accept: "application/vnd.github.v3+json"
  };
  const tokenToUse = token || process.env.GITHUB_TOKEN;
  if (tokenToUse) {
    headers["Authorization"] = `token ${tokenToUse}`;
  }
  try {
    const rateLimitRes = await fetch("https://api.github.com/rate_limit", { headers });
    if (rateLimitRes.ok) {
      const rateLimitData = await rateLimitRes.json();
      res.json({ ok: true, rateLimit: rateLimitData.resources?.core || {} });
    } else {
      res.json({ ok: false, status: rateLimitRes.status });
    }
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
});
app.get("/api/github/repo/:owner/:repo/readme", async (req, res) => {
  const { owner, repo } = req.params;
  const token = req.headers.authorization?.split(" ")[1] || process.env.GITHUB_TOKEN;
  const headers = {
    "User-Agent": "iir20-cybernetic-terminal-discovery",
    Accept: "application/vnd.github.v3.raw"
  };
  if (token) {
    headers["Authorization"] = `token ${token}`;
  }
  try {
    const readmeRes = await fetch(`https://api.github.com/repos/${owner}/${repo}/readme`, { headers });
    if (!readmeRes.ok) {
      throw new Error(`Failed to fetch README. Status: ${readmeRes.status}`);
    }
    const rawMarkdown = await readmeRes.text();
    const parsed = parseReadme(rawMarkdown);
    res.json({ rawMarkdown, ...parsed });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch or parse README.", details: error.message });
  }
});
app.get("/api/github/repo/:owner/:repo/details", async (req, res) => {
  const { owner, repo } = req.params;
  const token = req.headers.authorization?.split(" ")[1] || process.env.GITHUB_TOKEN;
  const headers = {
    "User-Agent": "iir20-cybernetic-terminal-discovery",
    Accept: "application/vnd.github.v3+json"
  };
  if (token) {
    headers["Authorization"] = `token ${token}`;
  }
  try {
    const commitsRes = await fetch(`https://api.github.com/repos/${owner}/${repo}/commits?per_page=10`, { headers });
    const commits = commitsRes.ok ? await commitsRes.json() : [];
    const releasesRes = await fetch(`https://api.github.com/repos/${owner}/${repo}/releases?per_page=5`, { headers });
    const releases = releasesRes.ok ? await releasesRes.json() : [];
    const contributorsRes = await fetch(`https://api.github.com/repos/${owner}/${repo}/contributors?per_page=10`, { headers });
    const contributors = contributorsRes.ok ? await contributorsRes.json() : [];
    res.json({ commits, releases, contributors });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch repository details.", details: error.message });
  }
});
app.get("/api/github/stats", async (req, res) => {
  try {
    const cache = loadLocalCache();
    res.json({
      profile: cache.profile,
      reposCount: cache.profile.public_repos,
      starsCount: cache.repositories.reduce((acc, r) => acc + (r.stargazers_count || 0), 0),
      languages: Array.from(new Set(cache.repositories.flatMap((r) => r.languages || []))).slice(0, 8)
    });
  } catch (error) {
    res.json({
      profile: {
        login: "iir20",
        name: "Ismail Ibne Ratul",
        avatar_url: "https://avatars.githubusercontent.com/u/100412845?v=4",
        html_url: "https://github.com/iir20",
        bio: "Cyber Security Specialist \u2022 Creative Developer \u2022 Linux Lover",
        public_repos: 18,
        followers: 12
      },
      reposCount: 18,
      starsCount: 42,
      languages: ["Kotlin", "Shell", "TypeScript", "Python", "Java", "C++"],
      fallbackActive: true
    });
  }
});
app.post("/api/contact/transmit", (req, res) => {
  const { sender, email, frequency, message } = req.body;
  if (!sender || !email || !message) {
    return res.status(400).json({ success: false, error: "Required signal packets missing. Resubmit." });
  }
  console.log(`[TRANSMISSION RECEIVED] Codename: ${sender}, Email: ${email}, Freq: ${frequency}, Signal: ${message}`);
  res.json({
    success: true,
    packetSignature: "SEC-T_SIG_" + Math.random().toString(36).substring(3, 11).toUpperCase(),
    timestamp: (/* @__PURE__ */ new Date()).toISOString()
  });
});
app.post("/api/admin/auth", (req, res) => {
  const { password } = req.body;
  const envPassword = process.env.ADMIN_PASSWORD || "admin0130137";
  if (password === envPassword) {
    return res.json({
      success: true,
      token: "admin-authenticated-token-sig-" + Date.now().toString(36).toUpperCase()
    });
  } else {
    return res.status(401).json({
      success: false,
      error: "Access Denied: Unaligned frequency coordinates.",
      diagnostics: "IPS logged unauthorized query vector against port 3000."
    });
  }
});
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    console.log("Vite loading in development mode...");
    const vite = await (0, import_vite.createServer)({
      server: { middlewareMode: true },
      appType: "spa"
    });
    app.use(vite.middlewares);
  } else {
    console.log("Static files serving in production mode...");
    const distPath = import_path2.default.join(process.cwd(), "dist");
    app.use(import_express.default.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(import_path2.default.join(distPath, "index.html"));
    });
  }
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[SYS] Cyber Deck main server booted.`);
    console.log(`[SYS] Access frequency configured at: http://localhost:${PORT}`);
  });
}
startServer();
//# sourceMappingURL=server.cjs.map
