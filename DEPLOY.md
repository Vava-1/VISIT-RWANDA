# Deploying Visit Rwanda to Vercel (Free Tier)

This guide deploys the app to Vercel using only free tiers. No paid plans required.

---

## What works on Vercel as-is

- Next.js 16 App Router (native Vercel support)
- All UI: hero, destinations, experiences, invest, travel essentials, health & community, persona hubs, live news
- AI concierge "RWANDA" (server-side, via z-ai-web-dev-sdk)
- Image search and live web search (server-side)
- Browsing all institutions (education, sports, arts, tourism, investment, health)
- Itinerary planner, feedback dialog, analytics

## Two things that need attention

1. **GitHub authentication** — GitHub removed password auth for git push in August 2021. You must use a Personal Access Token (PAT), not a password. See step 1.
2. **Database + ZAI SDK credentials** — Vercel's serverless filesystem is ephemeral, so the local SQLite file won't persist, and the ZAI SDK credentials (which live in a system file here) must be provided as env vars. See step 4.

---

## Step 1: Create a GitHub Personal Access Token

GitHub no longer accepts passwords for pushing code. You need a token:

1. Go to https://github.com/settings/tokens?type=beta (Fine-grained tokens).
2. Click **Generate new token**.
3. Token name: `visit-rwanda-deploy`.
4. Expiration: 30 days (or whatever you prefer).
5. Repository access: **Only select repositories** → choose `Vava-1/VISIT-RWANDA`.
6. Permissions → Repository permissions:
   - **Contents**: Read and write
   - **Metadata**: Read (auto-selected)
7. Click **Generate token** and COPY the token (you won't see it again).

The token looks like `github_pat_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`.

---

## Step 2: Push the code to GitHub

The code is already committed locally in this project. From the project folder, run:

```bash
git remote add origin https://github.com/Vava-1/VISIT-RWANDA.git
git branch -M main
git push -u origin main
```

When prompted:
- **Username**: your GitHub username (`Vava-1`)
- **Password**: paste the PAT from step 1 (NOT your account password)

Alternatively, if you give the PAT to the assistant in this chat, the assistant can run the push for you. (But sharing tokens in chat is also a risk — running it yourself is safest.)

---

## Step 3: Import the repo into Vercel

1. Go to https://vercel.com and sign in with your GitHub account.
2. Click **Add New** → **Project**.
3. Find the `Vava-1/VISIT-RWANDA` repo and click **Import**.
4. Vercel auto-detects Next.js. Leave the Build & Development Settings on default.
5. Do NOT click Deploy yet — first add the environment variables (step 4).

---

## Step 4: Set environment variables in Vercel

In the Vercel import screen, open **Environment Variables** and add each of these. Set them for **Production**, **Preview**, and **Development** (check all three boxes).

### 4a. Database (required)

**Quick option (no persistence, app fully works as a demo):**
```
DATABASE_URL = file:/tmp/visit-rwanda.db
```
The app runs perfectly. Chat history, feedback and analytics won't survive serverless restarts, but every feature works and nothing crashes.

**Recommended option (real persistence, free):**
1. Create a free Turso account at https://turso.tech (sign in with GitHub).
2. Create a database: `turso db create visit-rwanda`.
3. Get the URL: `turso db show visit-rwanda --url` → gives `libsql://visit-rwanda-xxxxxx.turso.io`.
4. Create an auth token: `turso db tokens create visit-rwanda`.
5. Push the schema: `bun run db:push` (with the Turso URL set locally).
6. In Vercel set:
   ```
   DATABASE_URL = libsql://visit-rwanda-xxxxxx.turso.io
   DATABASE_AUTH_TOKEN = <your-turso-token>
   ```
7. Note: full Turso support needs the tiny migration in the "Turso migration" section below. The quick option needs no code change.

### 4b. ZAI SDK credentials (required for the AI concierge, image search and live news)

The AI features depend on `z-ai-web-dev-sdk`. Locally it reads from a system config file; on Vercel you must provide the same values as env vars. Get them from your ZAI account / the local `/etc/.z-ai-config` file:

```
ZAI_API_KEY = <your-zai-api-key>
ZAI_BASE_URL = <your-zai-base-url>
ZAI_TOKEN = <your-zai-token>
ZAI_USER_ID = <your-zai-user-id>
```

Without these, the AI concierge and live news will return errors (the rest of the app still works).

---

## Step 5: Deploy

Click **Deploy** in Vercel. The build takes 2 to 4 minutes. Vercel runs `next build` automatically.

When it finishes, Vercel gives you a URL like `visit-rwanda-xxxx.vercel.app`. That's your live app.

---

## (Optional) Turso migration for real database persistence

Only needed if you chose the "Recommended option" in 4a. Three small changes:

1. Install the libSQL Prisma adapter:
   ```bash
   bun add @prisma/adapter-libsql
   ```

2. In `prisma/schema.prisma`, change the generator to enable drivers:
   ```
   generator client {
     provider = "prisma-client-js"
     previewFeatures = ["driverAdapters"]
   }
   ```

3. In `src/lib/db.ts`, instantiate Prisma with the libSQL adapter:
   ```ts
   import { PrismaClient } from "@prisma/client";
   import { PrismaLibSQL } from "@prisma/adapter-libsql";
   import { createClient } from "@libsql/client";

   const libsql = createClient({
     url: process.env.DATABASE_URL!,
     authToken: process.env.DATABASE_AUTH_TOKEN,
   });
   const adapter = new PrismaLibSQL(libsql);
   const prisma = new PrismaClient({ adapter });
   export const db = prisma;
   ```

Then `bun run db:push` to create the tables in Turso, and redeploy.

---

## Troubleshooting

- **Build fails with "Environment variable not found: DATABASE_URL"** → you didn't set DATABASE_URL in Vercel env vars. Set it (even the quick `file:/tmp/...` option works).
- **AI concierge returns errors** → the ZAI_* env vars are missing or wrong in Vercel.
- **Images broken** → they're loaded from `sfile.chatglm.cn`, which is public. Should work fine.
- **404 on /api routes** → make sure Vercel detected the project as Next.js (not a static site).

---

## Security checklist

- [ ] Changed your GitHub password (it was shared in chat)
- [ ] The PAT is scoped to only the `VISIT-RWANDA` repo
- [ ] `.env` and `db/custom.db` are in `.gitignore` (they are)
- [ ] No secrets are committed to the repo
