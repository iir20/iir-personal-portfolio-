# 🤝 CONTRIBUTING TO THE DIGITAL OPERATING SYSTEM

First off, thank you for taking the time to contribute! This digital operating system and cyberspace portfolio is engineered under strict architectural constraints to ensure zero-trust security and professional-grade performance.

Contributions are welcome via issues and pull requests that adhere to these guidelines.

---

## 💻 DEVELOPMENT GATEWAY

### Prerequisite Dependencies
To build the cyberspace system locally, ensure you have:
* **Node.js**: Version `20.x` or higher
* **npm**: Version `10.x` or higher
* **Firebase CLI**: (Optional, for deploying firestore.rules)

### Bootstrapping the Local Deck
1. **Clone the Core Repository**:
   ```bash
   git clone https://github.com/im-ismail-ibne-ratul/portfolio.git
   cd portfolio
   ```
2. **Retrieve Dependency Packages**:
   ```bash
   npm install
   ```
3. **Establish Environment Variable Handshake**:
   Create a `.env` file from the sample config:
   ```bash
   cp .env.example .env
   ```
4. **Ignite local development server**:
   ```bash
   npm run dev
   ```

---

## 🌿 BRANCH SEGMENTATION & DEPLOYMENT ROUTING

When engineering features or structural corrections, utilize these branch naming prefixes to keep actions structured:

* `feat/` — For introducing new operational features (e.g., `feat/auth-handshake`)
* `fix/` — For patching critical faults or syntax discrepancies (e.g., `fix/safari-glow`)
* `docs/` — For updating Markdown specifications and system logs (e.g., `docs/security-sast`)
* `refactor/` — For cleaning up logical blocks without visual shifts (e.g., `refactor/firebase-queries`)
* `perf/` — For enhancing Lighthouse scores and layout compression (e.g., `perf/image-lazy`)

---

## 🏷️ COMMIT SIGNATURE STYLE (SEMANTIC COMMITS)

This project strictly enforces standard **Conventional Commits** formatting to automate CHANGELOG compilation:

```
<type>(<scope>): <short description>
```

### Acceptable Commit Types:
* **`feat`**: A new functional addition to the portfolio
* **`fix`**: A bug fix or logical correction
* **`docs`**: Documentation updates only
* **`style`**: Layout changes (whitespace, formatting, semi-colons, no code changes)
* **`refactor`**: Code restructuring that neither fixes a bug nor adds a feature
* **`perf`**: A code change that improves performance metrics
* **`chore`**: Maintenance, build system configurations, or dependency bumps

### Compliant Examples:
* `feat(cv): integrate encrypted PDF mime validator`
* `fix(admin): resolve throttle timer interval leak`
* `docs(readme): update GCP security secret descriptors`

---

## 📋 PULL REQUEST INTEGRITY CHECKLIST

Before opening a pull request to merge changes into `main`, verify:

1. [ ] **TypeScript Status**: All files pass strict compilation (`npm run lint` / `npx tsc --noEmit`).
2. [ ] **ESLint Quality**: Code contains no formatting anomalies or syntax warnings.
3. [ ] **Lighthouse Benchmarks**: Interface load times and responsiveness match desktop benchmarks.
4. [ ] **Security Constraints**: No API keys or private database coordinates are hardcoded.
5. [ ] **Documentation Sync**: Any changes to schemas are reflected in `README.md` and related Markdown manifests.
6. [ ] **Commit Signatures**: Commits follow Conventional Commits formatting rules.

---

```
[SYSTEM REGISTERED]: CONTRIBUTION RULES INITIALIZED. LET'S BUILD SOMETHING SECURE.
```
