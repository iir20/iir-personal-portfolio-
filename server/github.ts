import fs from "fs";
import path from "path";

export interface GitHubSyncLog {
  timestamp: string;
  level: "INFO" | "WARN" | "ERROR" | "SUCCESS";
  message: string;
}

export interface GitHubPortfolioCache {
  lastSync: string;
  status: "OK" | "FAILED" | "PENDING";
  profile: any;
  repositories: any[];
  syncLogs: GitHubSyncLog[];
  rateLimit: {
    limit: number;
    remaining: number;
    reset: number;
  };
}

const CACHE_FILE = path.join(process.cwd(), "github-portfolio-cache.json");

// Helper to load cache from local storage file (offline fallback)
export function loadLocalCache(): GitHubPortfolioCache {
  try {
    if (fs.existsSync(CACHE_FILE)) {
      const data = fs.readFileSync(CACHE_FILE, "utf-8");
      return JSON.parse(data);
    }
  } catch (error) {
    console.error("Failed to load local GitHub cache file:", error);
  }
  
  // High fidelity default fallback state
  return {
    lastSync: new Date(2026, 5, 27).toISOString(),
    status: "OK",
    profile: {
      login: "iir20",
      name: "Ismail Ibne Ratul",
      avatar_url: "https://avatars.githubusercontent.com/u/100412845?v=4",
      html_url: "https://github.com/iir20",
      bio: "Cyber Security Specialist • Creative Developer • Linux Lover",
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
      { timestamp: new Date().toISOString(), level: "INFO", message: "Sandbox environment loaded. Seeded mock cache database." }
    ],
    rateLimit: {
      limit: 60,
      remaining: 60,
      reset: Math.floor(Date.now() / 1000) + 3600
    }
  };
}

export function saveLocalCache(cache: GitHubPortfolioCache) {
  try {
    fs.writeFileSync(CACHE_FILE, JSON.stringify(cache, null, 2), "utf-8");
  } catch (error) {
    console.error("Failed to write local GitHub cache file:", error);
  }
}

// Comprehensive Markdown parser that extracts images, GIFs, features, installation, etc.
export function parseReadme(markdown: string) {
  const result: {
    screenshots: string[];
    gifs: string[];
    features: string[];
    installation: string[];
    technologies: string[];
    architecture: string[];
    roadmap: string[];
    todoList: string[];
    changelog: string[];
    rawHtml?: string;
  } = {
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

  // 1. Extract Screenshots and GIFs
  // Markdown images: ![alt](url)
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

  // HTML images: <img src="url" ...>
  const htmlImgRegex = /<img\s+[^>]*src="([^"]+)"[^>]*>/g;
  while ((match = htmlImgRegex.exec(markdown)) !== null) {
    const url = match[1];
    if (url.toLowerCase().endsWith(".gif")) {
      result.gifs.push(url);
    } else {
      result.screenshots.push(url);
    }
  }

  // 2. Extract sections by analyzing headers
  const lines = markdown.split(/\r?\n/);
  let currentSection: string | null = null;
  let currentBuffer: string[] = [];

  const flushBuffer = () => {
    if (!currentSection) return;
    const cleanLines = currentBuffer
      .map(l => l.trim())
      .filter(l => l.length > 0);

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
      // Flush previous section
      flushBuffer();

      // Detect new section
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
      // Clean lists or code blocks slightly
      if (trimmed.startsWith("-") || trimmed.startsWith("*") || trimmed.startsWith("1.") || trimmed.startsWith("[ ]") || trimmed.startsWith("[x]")) {
        currentBuffer.push(trimmed.replace(/^[-*\s]+/, "").replace(/^\[[ x]\]\s*/, ""));
      } else {
        currentBuffer.push(trimmed);
      }
    }
  }
  flushBuffer();

  // If we couldn't extract list-based features, look for checklist or lists in general README
  if (result.features.length === 0) {
    // Attempt standard list item gathering
    const featureLines = lines.filter(l => l.trim().startsWith("-") || l.trim().startsWith("*"));
    result.features = featureLines.slice(0, 8).map(l => l.replace(/^[-*\s]+/, ""));
  }

  // Populate todo list with markdown checkboxes if present
  const todoItems = lines.filter(l => l.includes("[ ]") || l.includes("[x]"));
  if (todoItems.length > 0) {
    result.todoList = todoItems.map(l => {
      const isDone = l.includes("[x]");
      const text = l.replace(/^[-*\s]*\[[ x]\]\s*/, "").trim();
      return `${isDone ? "● [COMPLETED] " : "○ [WIP] "}${text}`;
    });
  }

  return result;
}

// Central Synchronizer fetch function
export async function runGitHubSync(token?: string): Promise<GitHubPortfolioCache> {
  const logs: GitHubSyncLog[] = [];
  const addLog = (level: "INFO" | "WARN" | "ERROR" | "SUCCESS", message: string) => {
    logs.push({ timestamp: new Date().toISOString(), level, message });
    console.log(`[GH-SYNC] [${level}] ${message}`);
  };

  addLog("INFO", "Starting automated GitHub Discovery & Synchronization protocol...");

  const headers: Record<string, string> = {
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
    // 1. Fetch Profile
    addLog("INFO", "Fetching public profile coordinates for user 'iir20'...");
    const profileRes = await fetch("https://api.github.com/users/iir20", { headers });
    
    // Update rate limit state from headers
    const rateLimit = {
      limit: Number(profileRes.headers.get("x-ratelimit-limit") || 60),
      remaining: Number(profileRes.headers.get("x-ratelimit-remaining") || 59),
      reset: Number(profileRes.headers.get("x-ratelimit-reset") || Math.floor(Date.now() / 1000) + 3600)
    };

    if (!profileRes.ok) {
      const errBody = await profileRes.text();
      throw new Error(`GitHub profile fetch collapsed. Status: ${profileRes.status}. Details: ${errBody}`);
    }

    const profileData = await profileRes.json();
    addLog("SUCCESS", `Successfully matched profile grid. Repos count: ${profileData.public_repos}. Followers: ${profileData.followers}.`);

    // 2. Fetch Repositories with full pagination support
    addLog("INFO", "Discovering active repositories... Loading full pages catalog.");
    let page = 1;
    let rawRepos: any[] = [];
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

    const repositories: any[] = [];

    // 3. For each repository, fetch languages, README, commits, and releases
    for (let i = 0; i < rawRepos.length; i++) {
      const repo = rawRepos[i];
      addLog("INFO", `[${i + 1}/${rawRepos.length}] Synchronizing details for: "${repo.name}"...`);

      // Default stats
      let languages: string[] = [];
      let latestCommit = {
        message: "Source files committed.",
        date: repo.pushed_at,
        author: "iir20"
      };
      let latestRelease: any = null;
      let readme = "";
      let readmeParsed: any = null;

      try {
        // Fetch languages
        const langRes = await fetch(repo.languages_url, { headers });
        if (langRes.ok) {
          const langData = await langRes.json();
          languages = Object.keys(langData);
        }
      } catch (err) {
        addLog("WARN", `Could not synchronize language weights for "${repo.name}".`);
      }

      try {
        // Fetch latest commit
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
        // fallback to default
      }

      try {
        // Fetch latest release
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
            assets: rel.assets?.map((asset: any) => ({
              name: asset.name,
              size: asset.size,
              download_count: asset.download_count,
              browser_download_url: asset.browser_download_url
            })) || []
          };
        }
      } catch (err) {
        // Releases might not exist, ignore
      }

      // Fetch README and parse it
      try {
        const readmeRes = await fetch(`https://api.github.com/repos/iir20/${repo.name}/readme`, {
          headers: { ...headers, Accept: "application/vnd.github.v3.raw" }
        });
        if (readmeRes.ok) {
          readme = await readmeRes.text();
          readmeParsed = parseReadme(readme);
        } else {
          // fallback to raw usercontent
          const fallbackRes = await fetch(`https://raw.githubusercontent.com/iir20/${repo.name}/${repo.default_branch || "main"}/README.md`);
          if (fallbackRes.ok) {
            readme = await fallbackRes.text();
            readmeParsed = parseReadme(readme);
          }
        }
      } catch (err) {
        // Ignore readme errors
      }

      // Analyze status / WIP categories from topics or descriptions
      const topics = repo.topics || [];
      const descLower = (repo.description || "").toLowerCase();
      
      let wip = false;
      let status = "Active";

      if (
        topics.includes("wip") || topics.includes("beta") || topics.includes("alpha") ||
        topics.includes("prototype") || topics.includes("upcoming") || topics.includes("experimental") ||
        topics.includes("draft") ||
        descLower.includes("wip") || descLower.includes("beta") || descLower.includes("alpha") ||
        descLower.includes("prototype") || descLower.includes("upcoming") || descLower.includes("experimental") ||
        descLower.includes("draft")
      ) {
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

      // Detect Pinned status (stargazers > 5, or topic is 'portfolio' / 'featured' or if it's the signature project)
      const isPinned = repo.stargazers_count >= 10 || 
                       topics.includes("portfolio") || 
                       topics.includes("featured") || 
                       topics.includes("pinned") ||
                       repo.name.toLowerCase().includes("minilam") ||
                       repo.name.toLowerCase().includes("dhoriye");

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

    const cacheState: GitHubPortfolioCache = {
      lastSync: new Date().toISOString(),
      status: "OK",
      profile: {
        login: profileData.login,
        name: profileData.name || "Ismail Ibne Ratul",
        avatar_url: profileData.avatar_url,
        html_url: profileData.html_url,
        bio: profileData.bio || "Cyber Security Specialist • Creative Developer • Linux Lover",
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

  } catch (err: any) {
    addLog("ERROR", `Synchronization collapsed: ${err.message || err}`);
    
    const localCache = loadLocalCache();
    localCache.status = "FAILED";
    localCache.syncLogs = [...logs, ...localCache.syncLogs].slice(0, 50);
    saveLocalCache(localCache);
    return localCache;
  }
}
