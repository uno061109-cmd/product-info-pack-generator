# 留材库 Product Pack

留材库 Product Pack 是一个面向中国跨境电商卖家的 SKU 资料包代整理服务。卖家提供零散商品资料，我们整理成交付给上架、包装说明、客户展示和内部归档使用的英文 Product Info Pack。

The site is now Chinese-first with English terminology kept for cross-border documentation workflows.

The previous site content has been backed up in:

```text
backup/old-liucaiku-2026-06-03/
```

## What Changed

- The homepage `/` now shows 留材库 Product Pack.
- The UI is Chinese-first with English helper labels.
- A local SVG logo has been added at `public/images/liucai-pack-logo.svg`.
- A premium generated hero image has been added at `public/images/liucai-product-pack-hero.jpg`.
- Product categories have been expanded with Chinese labels, hints and initial-letter search.
- `/pricing` and `/contact` have been added for commercial validation and lead capture.
- Free self-service usage is limited to 3 SKU drafts before the pricing path is shown.
- Pricing now routes paid plans to `/checkout`, where customers add WeChat to confirm subscription activation.
- Email/password registration and login, `/account`, and `/admin` support manual subscription activation by customer email.
- Product image handling supports uploaded local images, image URLs, and an auto-generated SKU visual fallback.
- Old public routes redirect to the new product workflow:
  - `/talents` and `/companies` -> `/dashboard`
  - `/student-submit` and `/company-submit` -> `/create`
  - `/about` -> `/`
- The public site is positioned as a product information pack service, not a software roadmap.
- SKU records can be prepared through the create flow and shared as Product Info Pack links.
- Lead capture can send to `LEAD_DESTINATION_URL`; without it, submissions are kept as a local fallback.
- PDF export uses browser Print / Save as PDF.
- QR code generation is currently represented by a product page link.

## Pages

- `/` landing page
- `/dashboard` SKU list and product pack actions
- `/create` create or edit product SKU information
- `/create?sku=SKU-001` edit an existing local SKU
- `/pack/[sku]` generated English listing, product card, packaging text, checklist and missing information list
- `/product/[sku]` public product information page for QR use
- `/print/[sku]` printable / Save as PDF page
- `/pricing` pricing and service packages
- `/checkout` WeChat consultation and plan activation page
- `/contact` lead capture and consultation form
- `/login` email/password registration and login
- `/account` customer subscription and quota view
- `/admin` admin subscription management

## Tech Stack

- Next.js 14 App Router
- React 18
- TypeScript
- Tailwind CSS
- Client-side draft persistence
- Local SVG assets in `public/images`

No Google Fonts, external CDN scripts or remote fonts are required.

## File Structure

```text
.
├── app
│   ├── dashboard/page.tsx
│   ├── create/page.tsx
│   ├── pack/[sku]/page.tsx
│   ├── product/[sku]/page.tsx
│   ├── print/[sku]/page.tsx
│   ├── page.tsx
│   ├── layout.tsx
│   ├── globals.css
│   ├── pricing/page.tsx
│   ├── checkout/page.tsx
│   ├── contact/page.tsx
│   ├── login/page.tsx
│   ├── account/page.tsx
│   ├── admin/page.tsx
│   ├── api/leads/route.ts
│   ├── api/auth/register/route.ts
│   ├── api/admin/users/route.ts
│   ├── about/page.tsx
│   ├── companies/page.tsx
│   ├── company-submit/page.tsx
│   ├── student-submit/page.tsx
│   └── talents/page.tsx
├── backup/old-liucaiku-2026-06-03
├── components
│   ├── Field.tsx
│   ├── MissingInfoPanel.tsx
│   └── ProductImageStrip.tsx
├── lib
│   ├── generatePack.ts
│   ├── productStorage.ts
│   ├── productVisual.ts
│   ├── subscriptionPlans.ts
│   ├── supabaseAdmin.ts
│   ├── supabaseClient.ts
│   └── productTypes.ts
├── public
│   ├── assets
│   └── images
│       ├── liucai-pack-logo.svg
│       ├── liucai-product-pack-hero.jpg
│       ├── dashboard-preview.svg
│       ├── printable-pack-preview.svg
│       ├── product-pack-hero.svg
│       ├── qr-product-page-preview.svg
│       └── contact/wechat-contact.jpg
├── scripts/deploy-vercel.js
├── supabase/schema.sql
├── preview-server.js
├── next.config.mjs
├── .env.example
├── package.json
├── tailwind.config.ts
└── tsconfig.json
```

## Local Development

```bash
npm install
npm run dev
```

Open:

```text
http://localhost:3000
```

Useful commands:

```bash
npm run dev
npm run build
npm run start
npm run lint
```

## Commercial Flow

- Free plan: 3 self-service SKU Product Info Packs.
- Starter: ¥39 / 20 SKU.
- Growth: ¥359 / 50 SKU.
- Bulk: ¥999 / 100 SKU.
- Customers select a plan on `/checkout`, add the service WeChat account, and confirm payment and requirements directly.
- Admin flow: customer registers/logs in with email and password, confirms the plan through WeChat, then admin opens `/admin` and assigns a plan/quota.
- If the customer has not logged in yet, the admin can enter the customer email in `/admin` and create/open the paid quota manually.

## Login and Admin Setup

This project uses Supabase for the first version of login and manual subscription activation.

1. Create a Supabase project.
2. Open the Supabase SQL editor and run:

```text
supabase/schema.sql
```

3. In Vercel, add these environment variables:

```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
ADMIN_EMAILS=your-admin-email@example.com
LEAD_DESTINATION_URL=optional_lead_destination_url
```

The same keys are listed in `.env.example`.

4. In Supabase Auth settings, keep the site URL configured:

```text
https://liucaiku.com
```

5. Users register with email and password through `/login`. The server-side registration route creates an already-confirmed Supabase account, so no email link is required.
6. Use the admin email in `ADMIN_EMAILS` to register or log in at `/login`, then open `/admin`.

Phone, WeChat and QQ login are not enabled in this version because they require SMS providers or platform app credentials. Email and password are the supported login method.

## Deployment and Domain

The current project can be deployed to the existing domain through the existing hosting setup. Deploying this version will replace the old public site content with 留材库 Product Pack because the homepage and old front-end routes have been replaced or redirected.

### Can it be deployed overseas?

Yes. For this project, the easiest overseas deployment options are:

- Vercel: best fit for a Next.js App Router project.
- Netlify: also works for Next.js, with a generous free plan and custom domains.
- Cloudflare Pages: good global edge network, but Next.js dynamic behavior may require extra adapter/runtime checks.

### Recommended Vercel flow

1. Push this project to the connected Git repository.
2. In Vercel, keep Framework Preset as `Next.js`.
3. Keep Build Command as `npm run build`.
4. Keep Output Directory as the default.
5. Keep the existing custom domain attached to this project.
6. Deploy.

### Does it cost money?

Usually you can start free, but production/business use may require a paid plan depending on platform policy, traffic and team needs.

- Vercel: Hobby is free; Pro starts at about $20/month plus additional usage.
- Netlify: Free is $0; Personal/Pro paid plans are available for higher usage and team features.
- Cloudflare: Free plan is available; Pro/Business plans are paid.

Always check the current pricing page before committing to a platform, because limits and plan names can change.

If the site is hosted on Vercel, Netlify, Cloudflare Pages or another overseas platform:

- Use the existing custom domain.
- Reduce third-party scripts.
- Keep fonts and images local.
- Avoid external CDNs.
- Test access speed from mainland China, Hong Kong and overseas networks.

If the site is hosted on a mainland China server, confirm the ICP filing status before serving the new product publicly.

## Rollback

The previous public site has two rollback paths:

- Git rollback: revert to the commit before the latest 留材库 Product Pack optimization.
- Manual rollback: restore files from the backup folder:

```text
backup/old-liucaiku-2026-06-03/
```

To restore the old site manually, copy the backed up `app`, `components`, `lib`, `public`, `scripts`, `preview-server.js` and old `README.md` back to the project root.

## Generation Logic

The core generator is in:

```text
lib/generatePack.ts
```

The current generation flow uses deterministic rules:

- Jewelry emphasizes materials, skin contact and care.
- Fashion accessories emphasize size, material, styling and care.
- Home goods emphasize intended use, dimensions, packaging and recycling.
- Small parts trigger choking hazard reminders.
- Battery products trigger battery safety reminders.
- Skin contact products trigger material and allergy note reminders.
- Eco claims trigger evidence verification reminders.

`generatePackWithAI()` is intentionally kept as a future AI integration point. It currently calls the rules-based generator.

## TODO

- Install and wire `qrcode.react` when dependency changes are approved, then replace the product-page link block in `/print/[sku]` with a real QR code.
- Replace placeholder SVG previews with real dashboard screenshots, product images and QR examples.
- Add server-side persistence if cross-device records are needed.

## Disclaimer

This Product Info Pack is generated for product documentation and listing preparation purposes only. It is not legal advice, compliance certification, or official Digital Product Passport certification. Sellers should verify applicable regulations and platform requirements before using the information commercially.
