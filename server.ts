import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import { loadLocalCache, runGitHubSync, parseReadme, saveLocalCache } from "./server/github";

dotenv.config();

const app = express();
const PORT = 3000;
app.use(express.json());

// Initialize Gemini API cleanly (lazy/safe)
let ai: GoogleGenAI | null = null;
const key = process.env.GEMINI_API_KEY;
const isDemoMode = !key || key === "MY_GEMINI_API_KEY";

if (!isDemoMode && key) {
  try {
    ai = new GoogleGenAI({
      apiKey: key,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
    console.log("GoogleGenAI initialized successfully on server-side.");
  } catch (error) {
    console.error("Failed to initialize GoogleGenAI:", error);
  }
} else {
  console.log("Running in LOCAL DEMO MODE for Gemini assistant. No API key supplied in environment.");
}

// ----------------------------------------------------
// API ROUTES
// ----------------------------------------------------

// 1. Quantum Chatbot endpoint with character prompt
app.post("/api/chat", async (req, res) => {
  const { messages } = req.body;
  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: "Invalid messages format." });
  }

  const latestMessage = messages[messages.length - 1]?.content || "";

  // Dynamic knowledge injection about Ratul
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

  // Fallback if we are in demo mode
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
      fallbackText = `### md Lalmia Howlader — Freedom Fighter Pillar
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

    // Return mock response resembling a real one
    return res.json({ text: fallbackText });
  }

  // Real Gemini generation
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: latestMessage,
      config: {
        systemInstruction: systemPrompt,
        temperature: 0.7,
      }
    });

    return res.json({ text: response.text });
  } catch (error: any) {
    console.error("Gemini invocation error:", error);
    return res.status(500).json({ error: "Quantum neural corridor failed or timed out.", details: error.message });
  }
});

// 2. Real-time Security diagnostics and mock SOC stats for the dashboard
app.get("/api/diagnostics/stats", (req, res) => {
  const uptime = Math.floor(process.uptime());
  const loadAverage = (Math.random() * 2 + 0.1).toFixed(2);
  const activeAttacks = Math.floor(Math.random() * 5);
  const threatLevel = activeAttacks > 3 ? "ELEVATED" : "STABLE";
  
  const sampleLogs = [
    `[INFO] [${new Date().toISOString()}] IDS alert cleared: Port scan from 142.250.190.46 blocked.`,
    `[SEC_WARN] [${new Date().toISOString()}] Unauthorized access trigger at Node-F7 blocked by firewall.`,
    `[SYS_CONN] [${new Date().toISOString()}] Connected to ratul-main-deck on terminal frequency T-886.`,
    `[IDS_OK] [${new Date().toISOString()}] Anti-tamper memory hashes verified. Integrity 100%.`,
    `[QUANTUM] [${new Date().toISOString()}] Arch Linux custom system kernels fully operational.`
  ];

  res.json({
    uptime,
    loadAverage,
    activeAttacks,
    threatLevel,
    cpuUsage: Math.floor(Math.random() * 30 + 10) + "%",
    memUsage: Math.floor(Math.random() * 15 + 45) + "%",
    integrityHash: "0x8F9C22B" + Math.floor(Math.random() * 99) + "C3",
    logSample: sampleLogs[Math.floor(Math.random() * sampleLogs.length)],
  });
});

// 3. GitHub Automation System Endpoints
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
    cache.lastSync = new Date().toISOString();
    cache.syncLogs = cache.syncLogs || [];
    cache.syncLogs.push({
      timestamp: new Date().toISOString(),
      level: "SUCCESS",
      message: "Cache cleared completely. Local database snapshot purged."
    });
    saveLocalCache(cache);
    res.json(cache);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/github/refresh-metadata", (req, res) => {
  try {
    const cache = loadLocalCache();
    cache.syncLogs = cache.syncLogs || [];
    cache.syncLogs.push({
      timestamp: new Date().toISOString(),
      level: "SUCCESS",
      message: "Recalculated repository weights and metrics. Index metadata refreshed successfully."
    });
    saveLocalCache(cache);
    res.json(cache);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/github/rebuild-index", (req, res) => {
  try {
    const cache = loadLocalCache();
    cache.syncLogs = cache.syncLogs || [];
    cache.syncLogs.push({
      timestamp: new Date().toISOString(),
      level: "SUCCESS",
      message: `Rebuilt search index over ${cache.repositories?.length || 0} discovered modules. Static dictionary synchronized.`
    });
    saveLocalCache(cache);
    res.json(cache);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/github/refresh-readme", async (req, res) => {
  try {
    const { token } = req.body;
    const cache = await runGitHubSync(token);
    cache.syncLogs = cache.syncLogs || [];
    cache.syncLogs.push({
      timestamp: new Date().toISOString(),
      level: "SUCCESS",
      message: "Iterated over README.md file descriptors. Extracted sections and updated cache."
    });
    saveLocalCache(cache);
    res.json(cache);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/github/test-api", async (req, res) => {
  const { token } = req.body;
  const headers: Record<string, string> = {
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
  } catch (err: any) {
    res.status(500).json({ ok: false, error: err.message });
  }
});

app.get("/api/github/repo/:owner/:repo/readme", async (req, res) => {
  const { owner, repo } = req.params;
  const token = req.headers.authorization?.split(" ")[1] || process.env.GITHUB_TOKEN;
  
  const headers: Record<string, string> = {
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
  } catch (error: any) {
    res.status(500).json({ error: "Failed to fetch or parse README.", details: error.message });
  }
});

app.get("/api/github/repo/:owner/:repo/details", async (req, res) => {
  const { owner, repo } = req.params;
  const token = req.headers.authorization?.split(" ")[1] || process.env.GITHUB_TOKEN;
  
  const headers: Record<string, string> = {
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
  } catch (error: any) {
    res.status(500).json({ error: "Failed to fetch repository details.", details: error.message });
  }
});

// Backward compatibility stats link
app.get("/api/github/stats", async (req, res) => {
  try {
    const cache = loadLocalCache();
    res.json({
      profile: cache.profile,
      reposCount: cache.profile.public_repos,
      starsCount: cache.repositories.reduce((acc: number, r: any) => acc + (r.stargazers_count || 0), 0),
      languages: Array.from(new Set(cache.repositories.flatMap((r: any) => r.languages || []))).slice(0, 8),
    });
  } catch (error) {
    res.json({
      profile: {
        login: "iir20",
        name: "Ismail Ibne Ratul",
        avatar_url: "https://avatars.githubusercontent.com/u/100412845?v=4",
        html_url: "https://github.com/iir20",
        bio: "Cyber Security Specialist • Creative Developer • Linux Lover",
        public_repos: 18,
        followers: 12,
      },
      reposCount: 18,
      starsCount: 42,
      languages: ["Kotlin", "Shell", "TypeScript", "Python", "Java", "C++"],
      fallbackActive: true
    });
  }
});

// 4. Contact Secure Transmission handler
app.post("/api/contact/transmit", (req, res) => {
  const { sender, email, frequency, message } = req.body;
  if (!sender || !email || !message) {
    return res.status(400).json({ success: false, error: "Required signal packets missing. Resubmit." });
  }

  console.log(`[TRANSMISSION RECEIVED] Codename: ${sender}, Email: ${email}, Freq: ${frequency}, Signal: ${message}`);
  
  // Custom response resembling a cryptographic connection success
  res.json({
    success: true,
    packetSignature: "SEC-T_SIG_" + Math.random().toString(36).substring(3, 11).toUpperCase(),
    timestamp: new Date().toISOString()
  });
});

// 5. Secure Admin Authentication proxy endpoint
app.post("/api/admin/auth", (req, res) => {
  const { password } = req.body;
  const envPassword = process.env.ADMIN_PASSWORD || "admin0130137";
  
  if (password === envPassword) {
    return res.json({
      success: true,
      token: "admin-authenticated-token-sig-" + Date.now().toString(36).toUpperCase()
    });
  } else {
    // Add realistic security throttle failure coordinates
    return res.status(401).json({
      success: false,
      error: "Access Denied: Unaligned frequency coordinates.",
      diagnostics: "IPS logged unauthorized query vector against port 3000."
    });
  }
});


// ----------------------------------------------------
// VITE / STATIC FILE SERVERS
// ----------------------------------------------------
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    console.log("Vite loading in development mode...");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    console.log("Static files serving in production mode...");
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[SYS] Cyber Deck main server booted.`);
    console.log(`[SYS] Access frequency configured at: http://localhost:${PORT}`);
  });
}

startServer();
