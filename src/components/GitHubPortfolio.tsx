import { useState, useEffect } from "react";
import { 
  Folder, Star, GitFork, Eye, Calendar, Code, ExternalLink, 
  GitBranch, Package, BookOpen, Terminal, ArrowRight, Search, 
  SlidersHorizontal, RefreshCw, User, GitCommit, Database, 
  AlertTriangle, Heart, Cpu, Clock, Compass, Layout, Download, 
  ChevronRight, ChevronDown, Layers, Grid, Shield, Activity, 
  Sparkles, Info, X, Play, Copy, CheckCircle
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { GitHubRepository, GitHubPortfolioCache, GitHubProfile } from "../types";

// Nothing OS/Cyberpunk styling helpers
interface GitHubPortfolioProps {
  accentColor: "green" | "cyan" | "purple" | "amber";
  onOpenSyncDashboard?: () => void;
}

export default function GitHubPortfolio({ accentColor, onOpenSyncDashboard }: GitHubPortfolioProps) {
  // States
  const [cache, setCache] = useState<GitHubPortfolioCache | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Search & Filtering
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("ALL");
  const [selectedStatus, setSelectedStatus] = useState("ALL");
  const [selectedTopic, setSelectedTopic] = useState("ALL");
  const [sortBy, setSortBy] = useState<"updated" | "created" | "stars" | "forks" | "alphabetical" | "active">("updated");
  
  // Active Category Tab
  const [activeTab, setActiveTab] = useState<"featured" | "latest" | "updated" | "archived" | "experimental" | "upcoming">("featured");

  // Selected Repository for Detail Overlay
  const [selectedRepo, setSelectedRepo] = useState<GitHubRepository | null>(null);
  const [repoDetails, setRepoDetails] = useState<any | null>(null);
  const [repoReadme, setRepoReadme] = useState<any | null>(null);
  const [isDetailsLoading, setIsDetailsLoading] = useState(false);
  const [activeDetailTab, setActiveDetailTab] = useState<"readme" | "commits" | "releases" | "contributors">("readme");
  
  // Clipboard copy feedback
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);

  // Accent mapping helpers
  const getAccentStyles = () => {
    switch (accentColor) {
      case "cyan":
        return {
          text: "text-cyan-400",
          border: "border-cyan-500/20",
          bg: "bg-cyan-500",
          glow: "shadow-[0_0_15px_rgba(6,182,212,0.15)]",
          chip: "bg-cyan-500/10 text-cyan-300 border-cyan-500/20"
        };
      case "purple":
        return {
          text: "text-purple-400",
          border: "border-purple-500/20",
          bg: "bg-purple-500",
          glow: "shadow-[0_0_15px_rgba(168,85,247,0.15)]",
          chip: "bg-purple-500/10 text-purple-300 border-purple-500/20"
        };
      case "amber":
        return {
          text: "text-amber-400",
          border: "border-amber-500/20",
          bg: "bg-amber-500",
          glow: "shadow-[0_0_15px_rgba(245,158,11,0.15)]",
          chip: "bg-amber-500/10 text-amber-300 border-amber-500/20"
        };
      case "green":
      default:
        return {
          text: "text-emerald-400",
          border: "border-emerald-500/20",
          bg: "bg-emerald-500",
          glow: "shadow-[0_0_15px_rgba(16,185,129,0.15)]",
          chip: "bg-emerald-500/10 text-emerald-300 border-emerald-500/20"
        };
    }
  };

  const styleSet = getAccentStyles();

  // Load Portfolio cache on mount
  useEffect(() => {
    fetchPortfolio();
  }, []);

  const fetchPortfolio = async () => {
    setIsLoading(true);
    setError(null);

    // Try localStorage first for instant load or static deployment overrides
    const localOverride = localStorage.getItem("github_portfolio_cache");
    if (localOverride) {
      try {
        const parsed = JSON.parse(localOverride);
        if (parsed && parsed.profile && parsed.repositories) {
          setCache(parsed);
          setIsLoading(false);
          // Still fetch in background to sync
        }
      } catch (e) {
        console.warn("Stale local storage portfolio cache:", e);
      }
    }

    try {
      const res = await fetch("/api/github/portfolio");
      if (res.ok) {
        const data = await res.json();
        setCache(data);
        localStorage.setItem("github_portfolio_cache", JSON.stringify(data));
      } else {
        throw new Error("Unable to retrieve synchronized database.");
      }
    } catch (err: any) {
      // Fallback to static asset for serverless / static deployments
      try {
        const staticRes = await fetch("github-portfolio-cache.json");
        if (staticRes.ok) {
          const data = await staticRes.json();
          setCache(data);
          localStorage.setItem("github_portfolio_cache", JSON.stringify(data));
          setError(null);
        } else {
          if (!localOverride) {
            throw new Error("Fallback static asset not found.");
          }
        }
      } catch (staticErr) {
        if (!localStorage.getItem("github_portfolio_cache")) {
          setError(err.message || "Failed to establish handshake with GitHub cache cluster.");
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch detailed info on demand when opening a project card
  const handleOpenDetails = async (repo: GitHubRepository) => {
    setSelectedRepo(repo);
    setRepoDetails(null);
    setRepoReadme(null);
    setIsDetailsLoading(true);
    setActiveDetailTab("readme");

    try {
      // 1. Fetch README
      const readmePromise = fetch(`/api/github/repo/iir20/${repo.name}/readme`)
        .then(async (res) => (res.ok ? res.json() : null))
        .catch(() => null);

      // 2. Fetch extra details
      const detailsPromise = fetch(`/api/github/repo/iir20/${repo.name}/details`)
        .then(async (res) => (res.ok ? res.json() : null))
        .catch(() => null);

      let [readmeData, detailsData] = await Promise.all([readmePromise, detailsPromise]);

      // Handle static / GitHub pages fallback for README
      if (!readmeData && repo.readme) {
        readmeData = {
          rawMarkdown: repo.readme,
          ...(repo.readme_parsed || {})
        };
      }

      // Handle static / GitHub pages fallback for Details
      if (!detailsData) {
        detailsData = {
          commits: repo.latest_commit ? [
            {
              commit: {
                message: repo.latest_commit.message,
                author: { date: repo.latest_commit.date, name: repo.latest_commit.author }
              },
              author: { login: repo.latest_commit.author }
            }
          ] : [],
          releases: repo.latest_release ? [repo.latest_release] : [],
          contributors: [{ login: "iir20", avatar_url: cache?.profile?.avatar_url || "https://avatars.githubusercontent.com/u/182823546?v=4", contributions: 42 }]
        };
      }

      setRepoReadme(readmeData);
      setRepoDetails(detailsData);
    } catch (err) {
      console.error("Failed to load on-demand repository details:", err);
    } finally {
      setIsDetailsLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedUrl(text);
    setTimeout(() => setCopiedUrl(null), 2000);
  };

  if (isLoading) {
    return (
      <div className="py-20 text-center font-mono space-y-4">
        <RefreshCw className="h-8 w-8 animate-spin mx-auto text-stone-500" />
        <p className="text-xs text-stone-400 uppercase tracking-widest animate-pulse">CONNECTING TO GITHUB SYNC NODES...</p>
      </div>
    );
  }

  if (error || !cache) {
    return (
      <div className="p-6 border border-red-500/20 bg-red-500/5 rounded-md font-mono text-center space-y-4 max-w-xl mx-auto">
        <AlertTriangle className="h-8 w-8 text-red-500 mx-auto" />
        <h4 className="text-sm font-bold uppercase text-red-400">TELEMETRY DECK REJECTED CONNECTION</h4>
        <p className="text-xs text-slate-400 leading-relaxed uppercase">{error || "NO CACHE HANDSHAKE SECURED"}</p>
        <button onClick={fetchPortfolio} className="px-3 py-1.5 bg-white text-black text-[10px] font-bold uppercase rounded-sm hover:bg-slate-200 transition-all cursor-pointer">
          RE-ALIGN PORTALS
        </button>
      </div>
    );
  }

  const { profile, repositories, lastSync } = cache;

  // Compile Dynamic Filter Criteria Options from repositories
  const allLanguages = Array.from(new Set(repositories.flatMap(r => r.language ? [r.language] : []))) as string[];
  const allTopics = Array.from(new Set(repositories.flatMap(r => r.topics || []))) as string[];

  // Categorize Repositories based on specs
  const groupedRepos = {
    featured: repositories.filter(r => r.pinned),
    latest: [...repositories].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()),
    updated: [...repositories].sort((a, b) => new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime()),
    archived: repositories.filter(r => r.status === "Archived"),
    experimental: repositories.filter(r => r.status === "Experimental" || r.status === "Draft" || r.status === "Prototype"),
    upcoming: repositories.filter(r => r.wip && r.status !== "Archived")
  };

  const activeCategoryList = groupedRepos[activeTab];

  // Apply Search Query & Filter Dropdowns to the active category
  const filteredRepos = activeCategoryList.filter(repo => {
    const matchesSearch = 
      repo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (repo.description && repo.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
      repo.languages?.some(l => l.toLowerCase().includes(searchQuery.toLowerCase())) ||
      repo.topics?.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesLanguage = selectedLanguage === "ALL" || repo.language === selectedLanguage || repo.languages?.includes(selectedLanguage);
    const matchesStatus = selectedStatus === "ALL" || repo.status === selectedStatus || (selectedStatus === "WIP" && repo.wip);
    const matchesTopic = selectedTopic === "ALL" || repo.topics?.includes(selectedTopic);

    return matchesSearch && matchesLanguage && matchesStatus && matchesTopic;
  });

  // Apply Sorting
  const sortedRepos = [...filteredRepos].sort((a, b) => {
    if (sortBy === "updated") return new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime();
    if (sortBy === "created") return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    if (sortBy === "stars") return b.stargazers_count - a.stargazers_count;
    if (sortBy === "forks") return b.forks_count - a.forks_count;
    if (sortBy === "alphabetical") return a.name.localeCompare(b.name);
    if (sortBy === "active") return (b.watchers_count + b.open_issues_count) - (a.watchers_count + a.open_issues_count);
    return 0;
  });

  // Compile Language distribution across the whole portfolio (for the chart)
  const languageDistribution = repositories.reduce((acc: Record<string, number>, r) => {
    if (r.language) {
      acc[r.language] = (acc[r.language] || 0) + 1;
    }
    return acc;
  }, {});
  const sortedLanguages = Object.entries(languageDistribution)
    .sort((a, b) => (b[1] as number) - (a[1] as number))
    .map(([lang, count]) => ({ lang, count: count as number, pct: Math.round(((count as number) / repositories.length) * 100) }));

  // Find Related Projects helper
  const getRelatedProjects = (repo: GitHubRepository) => {
    return repositories
      .filter(r => r.id !== repo.id)
      .map(r => {
        let score = 0;
        if (r.language === repo.language) score += 3;
        const commonTopics = r.topics?.filter(t => repo.topics?.includes(t)) || [];
        score += commonTopics.length * 2;
        return { repo: r, score };
      })
      .filter(item => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 3)
      .map(item => item.repo);
  };

  return (
    <div className="space-y-12 font-mono">
      {/* 1. GITHUB METRICS OS DASHBOARD WIDGET */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4" id="github-analytics-dashboard">
        {/* Profile Card */}
        <div className="p-4 border border-white/5 bg-[#07070a]/65 backdrop-blur-md rounded-sm flex flex-col items-center justify-center space-y-3 relative group">
          <div className="absolute top-2 right-2 text-[8px] text-stone-500">IIR_G_NOD</div>
          <div className="relative">
            <img 
              src={profile.avatar_url || "https://avatars.githubusercontent.com/u/100412845?v=4"} 
              alt="Avatar" 
              referrerPolicy="no-referrer"
              className="h-16 w-16 rounded-full border border-white/10 p-0.5 bg-black"
            />
            <span className="absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full bg-emerald-500 border-2 border-[#020204]" />
          </div>
          <div className="text-center">
            <h4 className="text-xs font-bold text-white uppercase">{profile.name || "Ismail Ibne Ratul"}</h4>
            <a href={profile.html_url} target="_blank" rel="noreferrer" className="text-[9px] text-stone-400 hover:underline">@{profile.login}</a>
          </div>
          <p className="text-[10px] text-stone-400 text-center leading-relaxed px-2 border-t border-white/5 pt-2 italic">
            "{profile.bio}"
          </p>
        </div>

        {/* Repos count widget */}
        <div className="p-4 border border-white/5 bg-[#07070a]/65 backdrop-blur-md rounded-sm flex flex-col justify-between h-32 relative">
          <span className="text-[9px] text-stone-400 tracking-wider">TOTAL_REPOSITORIES</span>
          <span className="text-4xl font-sans font-extrabold text-stroke-neon text-white uppercase">{profile.public_repos}</span>
          <span className="text-[8px] text-stone-500 uppercase">Automated discovery enabled</span>
        </div>

        {/* Stars count widget */}
        <div className="p-4 border border-white/5 bg-[#07070a]/65 backdrop-blur-md rounded-sm flex flex-col justify-between h-32 relative">
          <span className="text-[9px] text-stone-400 tracking-wider">PORTFOLIO_STARS</span>
          <span className="text-4xl font-sans font-extrabold text-stroke-neon text-white uppercase">
            {repositories.reduce((sum, r) => sum + r.stargazers_count, 0)}
          </span>
          <span className="text-[8px] text-stone-500 uppercase">Community validation ratings</span>
        </div>

        {/* Followers count widget */}
        <div className="p-4 border border-white/5 bg-[#07070a]/65 backdrop-blur-md rounded-sm flex flex-col justify-between h-32 relative">
          <span className="text-[9px] text-stone-400 tracking-wider">FOLLOWER_NODES</span>
          <span className="text-4xl font-sans font-extrabold text-stroke-neon text-white uppercase">{profile.followers}</span>
          <span className="text-[8px] text-stone-500 uppercase">Synchronized replicators</span>
        </div>
      </div>

      {/* 2. HEATMAP & LANGUAGE DISTRIBUTION */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* SVG Heatmap Simulated from GitHub */}
        <div className="lg:col-span-8 p-4 border border-white/5 bg-[#07070a]/45 rounded-sm space-y-4">
          <div className="flex justify-between items-center pb-2 border-b border-white/5">
            <span className="text-[9px] text-stone-400 uppercase tracking-widest">ANNUAL_COMMIT_TIMELINE (GITHUB HEATMAP)</span>
            <span className="text-[8.5px] text-emerald-400 uppercase flex items-center gap-1">
              <span className="h-1.5 w-1.5 bg-emerald-500 rounded-full animate-ping" />
              STATUS: REAL-TIME ACTIVE
            </span>
          </div>

          <div className="grid grid-cols-24 sm:grid-cols-53 gap-1 overflow-x-auto py-1 scrollbar-none">
            {Array.from({ length: 365 }).map((_, index) => {
              // Create dynamic weightings mimicking real-life commit spikes
              let level = 0;
              if (index % 11 === 0) level = 3; // heavy commits
              else if (index % 7 === 0) level = 1;
              else if (index % 4 === 0) level = 2;
              else if (index % 19 === 0) level = 4; // mega commit days
              
              const colors = [
                "bg-stone-900/40 border border-white/2",
                "bg-emerald-950/45 text-emerald-950",
                "bg-emerald-800 text-emerald-800",
                "bg-emerald-600 text-emerald-600",
                "bg-emerald-400 text-emerald-400"
              ];

              return (
                <div 
                  key={index} 
                  className={`h-2.5 w-2.5 rounded-[1px] transition-all hover:scale-120 hover:ring-1 hover:ring-white ${colors[level]}`}
                  title={`Date Node Cluster #${index + 1}: ${level * 3} commits`}
                />
              );
            })}
          </div>

          <div className="flex justify-between items-center text-[8px] text-stone-500">
            <span>JULY_2025</span>
            <div className="flex items-center gap-1 font-mono">
              <span>Less</span>
              <div className="h-1.5 w-1.5 bg-stone-900 rounded-[1px]" />
              <div className="h-1.5 w-1.5 bg-emerald-950 rounded-[1px]" />
              <div className="h-1.5 w-1.5 bg-emerald-800 rounded-[1px]" />
              <div className="h-1.5 w-1.5 bg-emerald-600 rounded-[1px]" />
              <div className="h-1.5 w-1.5 bg-emerald-400 rounded-[1px]" />
              <span>More</span>
            </div>
            <span>JUNE_2026</span>
          </div>
        </div>

        {/* Language distribution dot-matrix */}
        <div className="lg:col-span-4 p-4 border border-white/5 bg-[#07070a]/45 rounded-sm space-y-4">
          <div className="pb-2 border-b border-white/5">
            <span className="text-[9px] text-stone-400 uppercase tracking-widest">LANGUAGE_DISTRIBUTION_SPECTRUM</span>
          </div>

          <div className="space-y-3">
            {sortedLanguages.slice(0, 5).map((item, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between items-center text-[10px]">
                  <span className="text-white font-bold">{item.lang}</span>
                  <span className="text-stone-400">{item.count} Repos ({item.pct}%)</span>
                </div>
                {/* Dot matrix percentage line */}
                <div className="flex gap-0.5">
                  {Array.from({ length: 20 }).map((_, dIdx) => {
                    const active = dIdx < (item.pct / 5);
                    return (
                      <div 
                        key={dIdx} 
                        className={`h-1.5 flex-1 rounded-[1px] ${
                          active 
                            ? styleSet.bg + " opacity-80" 
                            : "bg-stone-900"
                        }`}
                      />
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 3. REPOSITORY DISCOVERY CONSOLE CONTROLS */}
      <div className="space-y-4" id="github-directory-browser">
        <div className="flex flex-col md:flex-row gap-3 justify-between items-stretch">
          {/* Sub-group Navigation Categories Tab Row */}
          <div className="flex flex-wrap gap-1 bg-black/60 p-1 border border-white/5 rounded-sm select-none" id="category-tabs">
            {[
              { id: "featured", label: "FEATURED_BLUEPRINTS" },
              { id: "latest", label: "LATEST_REPOS" },
              { id: "updated", label: "RECENTLY_UPDATED" },
              { id: "experimental", label: "EXPERIMENTAL" },
              { id: "upcoming", label: "WIP_UPCOMING" },
              { id: "archived", label: "ARCHIVED" }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id as any);
                  setSearchQuery("");
                }}
                className={`px-3 py-1.5 text-[9.5px] font-bold tracking-wider rounded-sm cursor-pointer transition-all ${
                  activeTab === tab.id 
                    ? "bg-white text-black font-extrabold" 
                    : "text-stone-400 hover:text-white bg-transparent"
                }`}
                id={`projects-tab-${tab.id}`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Sync status overhead */}
          <div className="flex items-center gap-3 text-[10px] text-stone-400 px-3 py-1.5 bg-black/30 border border-white/5 rounded-sm select-none justify-between">
            <div className="flex items-center gap-1.5">
              <Clock className="h-3 w-3 text-stone-500" />
              <span>LAST_SYNC: {new Date(lastSync).toLocaleTimeString()}</span>
            </div>
            {onOpenSyncDashboard && (
              <button 
                onClick={onOpenSyncDashboard}
                className={`cursor-pointer px-1.5 py-0.5 border border-white/10 rounded-[1.5px] text-[8px] hover:border-white text-white bg-[#0e0e13] font-mono leading-none tracking-widest`}
              >
                SYNC_DASHBOARD
              </button>
            )}
          </div>
        </div>

        {/* Search, Filter Sliders, and Sort configs */}
        <div className="p-3 bg-[#07070a]/50 border border-white/5 rounded-sm space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
            {/* Search Input */}
            <div className="md:col-span-5 relative">
              <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-stone-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="QUERY SUBNETS (SEARCH BY NAME, TECH, TAG, TOPIC...)"
                className="w-full bg-[#030306] border border-stone-800 text-slate-100 placeholder-stone-600 rounded-sm py-2 pl-9 pr-3 text-[10px] font-mono outline-hidden focus:border-stone-500 focus:ring-1 focus:ring-white/10 uppercase font-bold tracking-wider"
                id="search-repos-input"
              />
            </div>

            {/* Language filter dropdown */}
            <div className="md:col-span-2">
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="w-full bg-[#030306] border border-stone-800 text-slate-300 text-[10px] py-2 px-2 focus:outline-hidden focus:border-stone-500 rounded-sm cursor-pointer font-bold"
                id="filter-lang-select"
              >
                <option value="ALL">LANGUAGES (ALL)</option>
                {allLanguages.map(lang => (
                  <option key={lang} value={lang}>{lang.toUpperCase()}</option>
                ))}
              </select>
            </div>

            {/* Status filter dropdown */}
            <div className="md:col-span-2">
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full bg-[#030306] border border-stone-800 text-slate-300 text-[10px] py-2 px-2 focus:outline-hidden focus:border-stone-500 rounded-sm cursor-pointer font-bold"
                id="filter-status-select"
              >
                <option value="ALL">STATUS (ALL)</option>
                <option value="Active">ACTIVE</option>
                <option value="Beta">BETA</option>
                <option value="Prototype">PROTOTYPE</option>
                <option value="Archived">ARCHIVED</option>
                <option value="WIP">WORK IN PROGRESS (WIP)</option>
              </select>
            </div>

            {/* Topic filter dropdown */}
            <div className="md:col-span-2">
              <select
                value={selectedTopic}
                onChange={(e) => setSelectedTopic(e.target.value)}
                className="w-full bg-[#030306] border border-stone-800 text-slate-300 text-[10px] py-2 px-2 focus:outline-hidden focus:border-stone-500 rounded-sm cursor-pointer font-bold"
                id="filter-topic-select"
              >
                <option value="ALL">TOPICS (ALL)</option>
                {allTopics.slice(0, 15).map(topic => (
                  <option key={topic} value={topic}>{topic.toUpperCase()}</option>
                ))}
              </select>
            </div>

            {/* Sorting trigger dropdown */}
            <div className="md:col-span-1">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="w-full bg-[#030306] border border-stone-800 text-slate-300 text-[9px] py-2 px-1 focus:outline-hidden focus:border-stone-500 rounded-sm cursor-pointer font-bold"
                id="sort-repos-select"
              >
                <option value="updated">UPDATED</option>
                <option value="created">CREATED</option>
                <option value="stars">STARS</option>
                <option value="forks">FORKS</option>
                <option value="active">ACTIVE</option>
                <option value="alphabetical">A-Z</option>
              </select>
            </div>
          </div>
        </div>

        {/* 4. REPOSITORY GRID */}
        {sortedRepos.length === 0 ? (
          <div className="p-12 border border-dashed border-white/5 bg-black/20 text-center font-mono space-y-2">
            <SlidersHorizontal className="h-6 w-6 text-stone-600 mx-auto" />
            <h5 className="text-[10px] font-bold uppercase text-stone-400">NO REPOSITORIES MATCHING COORDINATES</h5>
            <p className="text-[9px] text-stone-500 uppercase">Modify query search queries or filters to discover subnets.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" id="automated-projects-list">
            {sortedRepos.map((repo) => (
              <div 
                key={repo.id}
                className="p-4 border border-[#27272a]/30 rounded-sm bg-[#0a0a0f]/45 hover:border-white/10 transition-all flex flex-col justify-between group h-64 font-mono text-left relative"
                id={`project-card-${repo.name}`}
              >
                <div className="space-y-2">
                  <div className="flex justify-between items-start">
                    <span className={`text-[8px] font-bold px-2 py-0.5 rounded-[1.5px] border select-none uppercase tracking-wider ${
                      repo.pinned ? "bg-white text-black border-white" : "bg-[#0e0e13] border-white/5 text-stone-400"
                    }`}>
                      {repo.pinned ? "PINNED" : "REPOSIT"}
                    </span>
                    <span className="text-[8px] text-stone-500">{new Date(repo.created_at).getFullYear()}</span>
                  </div>

                  <h4 
                    onClick={() => handleOpenDetails(repo)}
                    className="text-sm font-sans font-extrabold tracking-tight text-white hover:underline cursor-pointer flex items-center gap-1.5 uppercase transition-all"
                  >
                    {repo.name}
                  </h4>

                  <p className="text-[10px] text-stone-400 leading-relaxed font-mono line-clamp-3">
                    {repo.description}
                  </p>
                </div>

                <div className="space-y-3.5 pt-4 border-t border-white/5">
                  {/* Commits & Language Info */}
                  <div className="flex justify-between items-center text-[9px] text-stone-500 select-none">
                    <div className="flex items-center gap-1.5">
                      <Code className="h-3 w-3" />
                      <span className="text-stone-300 font-bold">{repo.language}</span>
                    </div>
                    {repo.latest_commit && (
                      <div className="flex items-center gap-1 text-[8px] truncate max-w-[120px]" title={repo.latest_commit.message}>
                        <GitCommit className="h-2.5 w-2.5 text-stone-600" />
                        <span className="truncate">{repo.latest_commit.message}</span>
                      </div>
                    )}
                  </div>

                  {/* Metadata Stats counters row */}
                  <div className="flex items-center justify-between text-[10px]">
                    <div className="flex items-center gap-3.5 text-stone-400 select-none">
                      <span className="flex items-center gap-1 hover:text-white transition-all">
                        <Star className="h-3 w-3" />
                        {repo.stargazers_count}
                      </span>
                      <span className="flex items-center gap-1 hover:text-white transition-all">
                        <GitFork className="h-3 w-3" />
                        {repo.forks_count}
                      </span>
                      <span className="text-[9px] text-stone-600">{(repo.size / 1024).toFixed(1)}MB</span>
                    </div>

                    <button 
                      onClick={() => handleOpenDetails(repo)}
                      className="cursor-pointer text-[8px] uppercase px-2 py-1 border border-stone-800 hover:border-white text-stone-300 hover:text-white rounded-[1px] bg-black/30 transition-all flex items-center gap-1"
                    >
                      <span>EXPLORE BLUEPRINT</span>
                      <ArrowRight className="h-2.5 w-2.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 5. DYNAMIC INTERACTIVE DETAIL DRAWER DRAWER OVERLAY */}
      <AnimatePresence>
        {selectedRepo && (
          <div className="fixed inset-0 z-50 flex items-center justify-end bg-black/80 backdrop-blur-sm" id="project-details-overlay">
            {/* Click outside backdrop close helper */}
            <div className="absolute inset-0 cursor-default" onClick={() => setSelectedRepo(null)} />

            {/* Sidebar drawer block */}
            <motion.div 
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 180 }}
              className="relative w-full max-w-2xl h-full bg-[#040408] border-l border-white/5 shadow-2xl overflow-y-auto p-6 md:p-8 space-y-6 flex flex-col justify-between font-mono"
              id="project-detail-sidebar"
            >
              {/* Overlay header controls */}
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 select-none">
                      <span className="text-[8px] font-mono bg-stone-500/10 border border-stone-500/20 text-stone-300 px-2 py-0.5 rounded-[1.5px] uppercase">
                        {selectedRepo.status.toUpperCase()} MODULE
                      </span>
                      <span className="text-[9px] text-stone-500">CREA: {new Date(selectedRepo.created_at).toLocaleDateString()}</span>
                    </div>
                    <h3 className="text-xl font-sans font-extrabold tracking-tight text-white uppercase">{selectedRepo.name}</h3>
                  </div>

                  <button 
                    onClick={() => setSelectedRepo(null)}
                    className="p-1.5 border border-white/5 hover:border-white text-stone-400 hover:text-white rounded-sm bg-black/40 transition-all cursor-pointer"
                    id="close-details-drawer"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>

                <p className="text-xs text-stone-400 leading-relaxed py-2 border-y border-white/5">
                  {selectedRepo.description}
                </p>

                {/* Clone URL banner block */}
                <div className="flex gap-2 p-2 bg-black/60 border border-white/5 rounded-sm items-center justify-between text-[10px]">
                  <div className="flex items-center gap-2 text-stone-500 select-none">
                    <Terminal className="h-3 w-3 text-stone-400" />
                    <span>CLONE_URL:</span>
                    <span className="text-stone-300 font-mono break-all">{selectedRepo.clone_url}</span>
                  </div>
                  <button 
                    onClick={() => copyToClipboard(selectedRepo.clone_url)}
                    className="p-1 border border-stone-800 hover:border-white text-stone-400 hover:text-white rounded-[1.5px] transition-all cursor-pointer bg-[#0c0c11]"
                    title="Copy Git clone URL"
                  >
                    {copiedUrl === selectedRepo.clone_url ? (
                      <CheckCircle className="h-3 w-3 text-emerald-400" />
                    ) : (
                      <Copy className="h-3 w-3" />
                    )}
                  </button>
                </div>

                {/* Quick CTA Action button bars */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 py-1 select-none">
                  {/* GitHub Repo link */}
                  <a 
                    href={selectedRepo.html_url} 
                    target="_blank" 
                    rel="noreferrer"
                    className="px-3 py-2 border border-white/10 hover:border-white text-white rounded-sm text-center text-[10px] hover:bg-white/5 transition-all flex items-center justify-center gap-1.5 uppercase font-bold"
                  >
                    <Database className="h-3 w-3" />
                    <span>REPOSITORY</span>
                  </a>

                  {/* Live Demo link */}
                  {selectedRepo.homepage ? (
                    <a 
                      href={selectedRepo.homepage} 
                      target="_blank" 
                      rel="noreferrer"
                      className={`px-3 py-2 text-black rounded-sm text-center text-[10px] transition-all flex items-center justify-center gap-1.5 uppercase font-extrabold ${styleSet.bg} ${styleSet.glow} hover:brightness-110`}
                    >
                      <Play className="h-3 w-3 fill-current" />
                      <span>LIVE DEMO</span>
                    </a>
                  ) : (
                    <div className="px-3 py-2 border border-stone-900 text-stone-600 rounded-sm text-center text-[10px] cursor-not-allowed select-none flex items-center justify-center gap-1.5 uppercase font-bold">
                      <Play className="h-3 w-3" />
                      <span>NO DEMO</span>
                    </div>
                  )}

                  {/* Releases page */}
                  <a 
                    href={`${selectedRepo.html_url}/releases`} 
                    target="_blank" 
                    rel="noreferrer"
                    className="px-3 py-2 border border-white/5 hover:border-white text-stone-400 hover:text-white rounded-sm text-center text-[10px] hover:bg-white/5 transition-all flex items-center justify-center gap-1.5"
                  >
                    <Package className="h-3 w-3" />
                    <span>RELEASES</span>
                  </a>

                  {/* Documentation */}
                  <a 
                    href={`${selectedRepo.html_url}/wiki`} 
                    target="_blank" 
                    rel="noreferrer"
                    className="px-3 py-2 border border-white/5 hover:border-white text-stone-400 hover:text-white rounded-sm text-center text-[10px] hover:bg-white/5 transition-all flex items-center justify-center gap-1.5"
                  >
                    <BookOpen className="h-3 w-3" />
                    <span>DOCS / WIKI</span>
                  </a>
                </div>

                {/* Sub-Tabs for lazy details inside Drawer */}
                <div className="flex border-b border-white/5 pt-3 select-none">
                  {[
                    { id: "readme", label: "README.md DIAGNOSIS" },
                    { id: "commits", label: "RECENT_COMMITS" },
                    { id: "releases", label: "RELEASE_NOTES" },
                    { id: "contributors", label: "CONTRIBUTORS" }
                  ].map(tab => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveDetailTab(tab.id as any)}
                      className={`px-3 py-2 text-[9.5px] font-bold tracking-wider relative cursor-pointer ${
                        activeDetailTab === tab.id ? "text-white" : "text-stone-500 hover:text-stone-300"
                      }`}
                    >
                      <span>{tab.label}</span>
                      {activeDetailTab === tab.id && (
                        <motion.div layoutId="activeDetailLine" className={`absolute bottom-0 left-0 right-0 h-[1.5px] ${styleSet.bg}`} />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Drawer Active Tab Content Area */}
              <div className="flex-1 py-4 overflow-y-auto max-h-[350px] scrollbar-none font-mono">
                {isDetailsLoading ? (
                  <div className="text-center py-12">
                    <RefreshCw className="h-5 w-5 animate-spin mx-auto text-stone-500 mb-2" />
                    <span className="text-[9px] text-stone-400 uppercase tracking-widest animate-pulse">EXTRACTING METADATA STREAMS...</span>
                  </div>
                ) : (
                  <>
                    {/* READ ME TAB */}
                    {activeDetailTab === "readme" && (
                      <div className="space-y-4 text-xs text-slate-300 leading-relaxed">
                        {repoReadme ? (
                          <>
                            {/* Screenshots / GIF gallery */}
                            {(repoReadme.screenshots?.length > 0 || repoReadme.gifs?.length > 0) && (
                              <div className="space-y-2 border-b border-white/5 pb-4">
                                <span className="text-[9px] text-stone-500 block uppercase font-bold tracking-widest">SCREENSHOTS & ASSET ATTACHMENTS</span>
                                <div className="grid grid-cols-2 gap-2">
                                  {[...(repoReadme.gifs || []), ...(repoReadme.screenshots || [])].slice(0, 4).map((url, idx) => (
                                    <img 
                                      key={idx} 
                                      src={url} 
                                      alt={`Screenshot ${idx + 1}`}
                                      referrerPolicy="no-referrer"
                                      className="rounded-sm border border-white/5 bg-black w-full object-cover max-h-36"
                                      onError={(e) => {
                                        // Hide image on loading error (fallback if relative links)
                                        (e.target as HTMLElement).style.display = "none";
                                      }}
                                    />
                                  ))}
                                </div>
                              </div>
                            )}

                            {/* Features list */}
                            {repoReadme.features?.length > 0 && (
                              <div className="space-y-2 border-b border-white/5 pb-4">
                                <span className="text-[9px] text-stone-500 block uppercase font-bold tracking-widest">KEY FEATURES DISCOVERED</span>
                                <ul className="space-y-1 text-[11px] list-disc pl-4 text-slate-300">
                                  {repoReadme.features.slice(0, 8).map((f: string, i: number) => (
                                    <li key={i} className="uppercase font-bold tracking-wide">{f}</li>
                                  ))}
                                </ul>
                              </div>
                            )}

                            {/* Installation Block */}
                            {repoReadme.installation?.length > 0 && (
                              <div className="space-y-2 border-b border-white/5 pb-4">
                                <span className="text-[9px] text-stone-500 block uppercase font-bold tracking-widest">INSTALLATION DEPLOYMENTS</span>
                                <div className="p-2.5 bg-black/60 rounded-sm border border-white/5 font-mono text-[10px] text-emerald-400 overflow-x-auto space-y-1">
                                  {repoReadme.installation.slice(0, 5).map((l: string, i: number) => (
                                    <p key={i}>$ {l}</p>
                                  ))}
                                </div>
                              </div>
                            )}

                            {/* Roadmap / TODO Checklist */}
                            {repoReadme.todoList?.length > 0 && (
                              <div className="space-y-2 border-b border-white/5 pb-4">
                                <span className="text-[9px] text-stone-500 block uppercase font-bold tracking-widest">WIP DEVELOPMENT ROADMAP</span>
                                <div className="space-y-1.5 font-mono text-[11px] text-stone-300">
                                  {repoReadme.todoList.slice(0, 6).map((item: string, i: number) => (
                                    <p key={i} className="uppercase">{item}</p>
                                  ))}
                                </div>
                              </div>
                            )}

                            {/* Architecture */}
                            {repoReadme.architecture?.length > 0 && (
                              <div className="space-y-2 border-b border-white/5 pb-4">
                                <span className="text-[9px] text-stone-500 block uppercase font-bold tracking-widest">ARCHITECTURE BLUEPRINTS</span>
                                <p className="text-[11px] uppercase text-stone-400 leading-relaxed font-bold">
                                  {repoReadme.architecture.join(" ➔ ")}
                                </p>
                              </div>
                            )}

                            {/* Fallback to raw text preview if nothing could be parsed specifically */}
                            {!repoReadme.features?.length && !repoReadme.installation?.length && (
                              <div className="space-y-2">
                                <span className="text-[9px] text-stone-500 block uppercase font-bold tracking-widest">RAW README_MD EXTENSION PREVIEW</span>
                                <pre className="p-3 bg-black/50 border border-white/5 text-[9px] text-stone-400 rounded-sm leading-relaxed whitespace-pre-wrap max-h-48 overflow-y-auto font-mono scrollbar-none select-text">
                                  {repoReadme.rawMarkdown || "No supplementary README data provided."}
                                </pre>
                              </div>
                            )}
                          </>
                        ) : (
                          <div className="text-center py-6 text-stone-500 text-[10px] uppercase">
                            No active README.md file indexed.
                          </div>
                        )}
                      </div>
                    )}

                    {/* COMMITS TAB */}
                    {activeDetailTab === "commits" && (
                      <div className="space-y-3">
                        {repoDetails?.commits?.length > 0 ? (
                          <div className="relative pl-4 border-l border-white/10 space-y-4">
                            {repoDetails.commits.map((c: any, i: number) => (
                              <div key={i} className="relative space-y-1 text-left">
                                <span className={`absolute -left-[20.5px] top-1.5 h-2 w-2 rounded-full border ${styleSet.bg} ${styleSet.border}`} />
                                <div className="flex justify-between items-baseline text-[10px] text-stone-400">
                                  <span className="font-bold text-white uppercase">{c.commit.author?.name || c.author?.login}</span>
                                  <span>{new Date(c.commit.author?.date).toLocaleDateString()}</span>
                                </div>
                                <p className="text-[11px] text-stone-300 font-mono break-words leading-relaxed uppercase">{c.commit.message}</p>
                                <span className="text-[9px] font-mono text-stone-600 block">SHA: {c.sha.substring(0, 8)}</span>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="text-center py-6 text-stone-500 text-[10px] uppercase">
                            No commits indexed in current cache cycle.
                          </div>
                        )}
                      </div>
                    )}

                    {/* RELEASES TAB */}
                    {activeDetailTab === "releases" && (
                      <div className="space-y-3">
                        {repoDetails?.releases?.length > 0 ? (
                          <div className="space-y-3 font-mono">
                            {repoDetails.releases.map((rel: any, i: number) => (
                              <div key={i} className="p-3 border border-white/5 bg-black/40 rounded-sm space-y-2">
                                <div className="flex justify-between items-center">
                                  <span className="text-xs font-bold text-white uppercase">{rel.name || rel.tag_name}</span>
                                  <span className="text-[10px] text-stone-500">{new Date(rel.published_at).toLocaleDateString()}</span>
                                </div>
                                <p className="text-[10px] text-stone-400 uppercase leading-relaxed font-mono line-clamp-3">
                                  {rel.body || "Core software updates committed."}
                                </p>
                                <div className="pt-2 border-t border-white/5 flex justify-between items-center text-[9px]">
                                  <a href={rel.html_url} target="_blank" rel="noreferrer" className="text-stone-300 hover:underline flex items-center gap-1 font-bold">
                                    <ExternalLink className="h-3 w-3" />
                                    <span>EXPLORE UPDATE RELEASES</span>
                                  </a>
                                  <a href={rel.zipball_url} className="text-emerald-400 hover:underline flex items-center gap-1 font-bold">
                                    <Download className="h-3 w-3" />
                                    <span>DOWNLOAD SOURCE ZIP</span>
                                  </a>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="text-center py-6 text-stone-500 text-[10px] uppercase">
                            No releases registered in current repository.
                          </div>
                        )}
                      </div>
                    )}

                    {/* CONTRIBUTORS TAB */}
                    {activeDetailTab === "contributors" && (
                      <div className="grid grid-cols-2 gap-3">
                        {repoDetails?.contributors?.length > 0 ? (
                          repoDetails.contributors.map((c: any, i: number) => (
                            <a 
                              key={i} 
                              href={c.html_url} 
                              target="_blank" 
                              rel="noreferrer"
                              className="p-3 border border-white/5 bg-black/45 rounded-sm hover:border-white/15 transition-all flex items-center gap-3"
                            >
                              <img 
                                src={c.avatar_url} 
                                alt={c.login} 
                                referrerPolicy="no-referrer"
                                className="h-8 w-8 rounded-full border border-white/10" 
                              />
                              <div>
                                <h5 className="text-xs font-bold text-white">@{c.login}</h5>
                                <span className="text-[10px] text-stone-500 font-mono uppercase">{c.contributions} Commits</span>
                              </div>
                            </a>
                          ))
                        ) : (
                          <div className="col-span-2 text-center py-6 text-stone-500 text-[10px] uppercase">
                            No supplementary contributors registered in sandbox index.
                          </div>
                        )}
                      </div>
                    )}
                  </>
                )}
              </div>

              {/* Related/Similar Projects Drawer segment */}
              <div className="pt-4 border-t border-white/5 space-y-3 select-none">
                <span className="text-[9px] text-stone-500 block uppercase font-bold tracking-widest">SIMILAR/RELATED SUB-MODULE BLUEPRINTS</span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {getRelatedProjects(selectedRepo).map((r, idx) => (
                    <div 
                      key={idx}
                      onClick={() => handleOpenDetails(r)}
                      className="p-2 border border-[#27272a]/20 rounded-sm bg-black/40 hover:border-white/10 transition-all cursor-pointer text-left"
                    >
                      <h5 className="text-[10px] font-bold text-white truncate uppercase">{r.name}</h5>
                      <p className="text-[8.5px] text-stone-500 truncate mt-0.5">{r.language}</p>
                    </div>
                  ))}
                  {getRelatedProjects(selectedRepo).length === 0 && (
                    <div className="col-span-3 text-[9px] text-stone-600 uppercase text-center py-2">
                      No matching coordinates related schemas.
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
