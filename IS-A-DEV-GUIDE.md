# 🌐 Connecting your free `is-a.dev` custom domain

To map your **Cyberspace OS** portfolio to the free custom domain **`ratul.is-a.dev`** (or any other subdomain you prefer), follow these steps:

---

## 🛠️ Step 1: Submit a Registration Request to `is-a.dev`

`is-a.dev` is a free DNS service for developers. To claim your domain, you need to add your record to their registry on GitHub:

1. Go to the official registry repository on GitHub: **[github.com/is-a-dev/register](https://github.com/is-a-dev/register)**
2. Click **Fork** in the top-right corner to create your own copy of the repository.
3. In your forked repository, navigate to the `domains/` directory.
4. Create a new file inside the `domains/` folder named exactly after your desired subdomain (e.g., `ratul.json`).
5. Paste the following configuration into that file:

```json
{
  "owner": {
    "username": "iir20",
    "email": "ibnaratul.2025@gmail.com"
  },
  "record": {
    "CNAME": "iir20.github.io"
  }
}
```

*Note: If your GitHub Pages username/repository owner is different, update the `"username"` and the `"CNAME"` target accordingly (e.g., `"CNAME": "your-username.github.io"`).*

6. Commit the changes and open a **Pull Request (PR)** back to the main branch of `is-a.dev/register`.
7. Once the automated checks pass, their maintainers will merge your PR, and your domain will be active within 24 hours!

---

## ⚙️ Step 2: Configure your Repository Settings

Once your Pull Request is merged by `is-a.dev`:

1. Go to your GitHub repository where you uploaded this portfolio.
2. Navigate to **Settings** ➡️ **Pages** (under the "Code and automation" section).
3. Under **Custom domain**, type your registered domain: `ratul.is-a.dev`
4. Click **Save**.
5. Check **Enforce HTTPS** to secure your portfolio with an SSL certificate.

---

## 🔁 Changing your Subdomain

If you decide to use a different subdomain (e.g., `ismail.is-a.dev` or `ibnaratul.is-a.dev`):
1. Rename and modify the `.json` file in the `is-a-dev/register` fork.
2. Edit the file `/public/CNAME` in **this** repository to match your new subdomain.
3. Push the changes. The CI/CD deploy pipeline will automatically adjust your search indexes, sitemap, and release coordinates dynamically to your new domain!
