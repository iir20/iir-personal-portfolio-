export interface Project {
  id: string;
  title: string;
  description: string;
  github: string;
  features: string[];
  tags: string[];
  demoVisualType: "music" | "intel" | "rent";
  repositoryStats: {
    commits: number;
    stars: number;
    forks: number;
    testCoverage: string;
  };
}

export interface GitHubRepository {
  id: number;
  name: string;
  full_name: string;
  description: string;
  html_url: string;
  homepage: string;
  language: string;
  languages: string[];
  topics: string[];
  license: { name: string; spdx_id?: string } | null;
  stargazers_count: number;
  forks_count: number;
  watchers_count: number;
  open_issues_count: number;
  pushed_at: string;
  created_at: string;
  size: number;
  visibility: string;
  default_branch: string;
  clone_url: string;
  pinned: boolean;
  wip: boolean;
  status: string;
  latest_commit: {
    message: string;
    date: string;
    author: string;
  };
  latest_release: {
    tag_name: string;
    name: string;
    published_at: string;
    html_url: string;
    zipball_url: string;
  } | null;
  readme?: string;
  readme_parsed?: any;
}

export interface GitHubProfile {
  login: string;
  name: string;
  avatar_url: string;
  html_url: string;
  bio: string;
  public_repos: number;
  followers: number;
  following: number;
  created_at: string;
}

export interface GitHubPortfolioCache {
  lastSync: string;
  status: "OK" | "FAILED" | "PENDING";
  profile: GitHubProfile;
  repositories: GitHubRepository[];
  syncLogs: { timestamp: string; level: string; message: string }[];
  rateLimit: {
    limit: number;
    remaining: number;
    reset: number;
  };
}

export interface Skill {
  name: string;
  level: number;
  category: "Language" | "Cyber Security" | "Systems & OS" | "Design & UX";
  status: "SECURED" | "ACTIVE" | "INTEGRATED";
  metrics: string;
}

export interface ChatMessage {
  id: string;
  sender: "user" | "assistant" | "system";
  content: string;
  timestamp: string;
}

export interface LogEntry {
  id: string;
  timestamp: string;
  level: "INFO" | "WARN" | "CRITICAL" | "SUCCESS";
  node: string;
  message: string;
}

export interface SOCStats {
  uptime: number;
  loadAverage: string;
  activeAttacks: number;
  threatLevel: "STABLE" | "ELEVATED" | "CRITICAL";
  cpuUsage: string;
  memUsage: string;
  integrityHash: string;
  logSample: string;
}
