# Cine Classic Studios

Production website for a Mumbai studio rental business, built with Next.js and a rebuilt Sanity CMS architecture.

## Stack

- Next.js 15 App Router
- React 18 + TypeScript
- Sanity Studio (standalone in `sanity-studio/`)
- Sanity Content Lake for CMS-managed business content

## CMS Architecture

The frontend and Studio now share one Sanity configuration model:

- `SANITY_PROJECT_ID`
- `SANITY_DATASET`
- `SANITY_WRITE_TOKEN`
- `SANITY_REVALIDATE_SECRET`

There are no silent project or dataset fallbacks.
If required Sanity env vars are missing or invalid, the app fails clearly.

## Content Model

Managed in Sanity:

- `siteSettings`
- `homePage`
- `studio`
- `production`
- `testimonial`
- `facility`
- `faq`
- `bookingInquiry`

Code-managed by design:

- navigation structure
- motion / presentation components
- certain long-form marketing landing page copy

## Local Setup

### 1. Install dependencies

```bash
npm install
npm --prefix sanity-studio install
```

### 2. Configure environment variables

Create `.env.local` in the project root:

```env
SANITY_PROJECT_ID=your_project_id_here
SANITY_DATASET=production
SANITY_WRITE_TOKEN=your_editor_token_here
SANITY_REVALIDATE_SECRET=your_random_secret_here
```

Create `sanity-studio/.env` if you run the Studio separately:

```env
SANITY_PROJECT_ID=your_project_id_here
SANITY_DATASET=production
```

### 3. Bootstrap missing foundational CMS documents

This creates the required singleton docs and starter facilities / FAQs without touching existing studio, production, or testimonial collections.

```bash
npm run sanity:bootstrap
```

### 4. Run the apps

```bash
npm run dev
npm run sanity:dev
```

- Website: [http://localhost:3000](http://localhost:3000)
- Studio: [http://localhost:3333](http://localhost:3333)

## Build Commands

```bash
npm run build
npm run sanity:build
```

## Revalidation

Sanity publish hooks should call:

```text
POST /api/revalidate?secret=YOUR_SECRET
```

This invalidates the shared `sanity` cache tag used by frontend queries.

## Important Notes

- The frontend read client does not send a token for normal public reads.
- Homepage and studio pages use ISR with `revalidate = 30`.
- Missing CMS data is shown explicitly instead of being masked by hardcoded fallback arrays.
- `siteSettings` and `homePage` are required singleton documents.

## Project Structure

```text
src/
  app/
  components/
  lib/
    sanity/
      client.ts
      env.ts
      index.ts
      loaders.ts
      mappers.ts
      queries.ts
      types.ts
sanity-studio/
  schemas/
scripts/
  bootstrap-sanity.mjs
```
