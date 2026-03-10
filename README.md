# EventFlow

A full-stack event management and booking platform built with Next.js 15, Prisma, Clerk, and Stripe.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router, Turbopack) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Database | PostgreSQL (Neon) |
| ORM | Prisma 7 |
| Auth | Clerk |
| Payments | Stripe Checkout |
| Server State | TanStack Query v5 |
| Notifications | Sonner |
| Receipt Generation | Handlebars + Puppeteer + QRCode |
| Icons | Lucide React |
| Fonts | Syne + DM Sans (Google Fonts) |

---

## Features

- **Event Discovery** — Browse, filter, and search events by category (Tech, Sports, Academic, Social)
- **Event Details** — Full event page with description, capacity bar, organizer info, date/time/duration/location
- **Booking Flow** — Stripe Checkout for paid events; direct booking for free events
- **Capacity Tracking** — Real-time remaining capacity with sold-out detection; freshness check at booking time to prevent overbooking
- **Receipts** — Auto-generated PDF receipts via Handlebars + Puppeteer, with QR code encoding the receipt ID
- **Auth** — Clerk-powered sign-in/sign-up with webhook sync to PostgreSQL
- **Admin Dashboard** — Event CRUD table with capacity stats, price display, edit/delete with confirmation modals, skeleton loading
- **Profile Page** — Avatar upload with live preview, profile info editing
- **Payment Pages** — Stripe success page (with verifying → generating → ready loading states) and cancel page
- **Error States** — Dedicated error components for payment failures, missing event ID, fetch errors

---

## Project Structure

```
src/
├── app/
│   ├── (root)/               # Public-facing pages
│   │   ├── page.tsx          # Home — event listing with filters
│   │   ├── events/[id]/      # Event detail page
│   │   └── profile/          # User profile page
│   ├── admin/                # Admin dashboard (email-gated)
│   ├── payment/
│   │   ├── success/          # Stripe success redirect
│   │   └── cancel/           # Stripe cancel redirect
│   └── api/
│       ├── checkout/
│       │   ├── create/       # POST — create Stripe Checkout session
│       │   └── success/      # POST — verify session + create booking
│       └── webhooks/
│           └── clerk/        # Clerk user.created / user.updated webhook
├── components/               # Shared UI components
├── hooks/                    # TanStack Query hooks (use-events, etc.)
├── lib/
│   ├── actions/              # Prisma server actions
│   ├── prisma.ts             # Prisma client singleton
│   ├── receipt.ts            # generateReceiptId() utility
│   └── utils.ts              # formatDate, isUpcoming, etc.
├── generated/prisma/         # Prisma generated client
└── templates/
    └── receipt.hbs           # Handlebars receipt template
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- A [Neon](https://neon.tech) PostgreSQL database
- A [Clerk](https://clerk.com) application
- A [Stripe](https://stripe.com) account

### 1. Clone and install

```bash
git clone https://github.com/your-username/event-manager.git
cd event-manager
npm install
```

### 2. Environment variables

Create a `.env` file in the root:

```dotenv
# Database — Neon (pooled for runtime, direct for migrations)
DATABASE_URL=postgresql://user:password@ep-xxx-pooler.region.aws.neon.tech/neondb?sslmode=require&pgbouncer=true&connection_limit=1
DIRECT_URL=postgresql://user:password@ep-xxx.region.aws.neon.tech/neondb?sslmode=require

# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_...
CLERK_SECRET_KEY=sk_...
CLERK_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

# Stripe
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...

# App
NEXT_PUBLIC_URL=http://localhost:3000
NEXT_PUBLIC_ADMIN_EMAIL=your-admin@email.com
```

### 3. Database setup

```bash
npx prisma migrate dev --name init
```

### 4. Run the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Database Schema

```prisma
model User {
  id           String         @id @default(cuid())
  clerkId      String         @unique
  email        String         @unique
  firstName    String?
  lastName     String?
  phone        String?
  profileImage String?
  bookedEvents BookedEvents[]
}

model Event {
  id                String         @id @default(cuid())
  title             String         @unique
  description       String         @unique
  fullDescription   String         @unique
  date              DateTime
  time              String
  duration          Int
  category          Category
  location          String
  organizer         String
  image             String
  price             Int
  capacity          Int
  remainingCapacity Int
  bookedEvents      BookedEvents[]
}

model BookedEvents {
  id        String  @id @default(cuid())
  userId    String
  eventId   String
  sessionId String  @unique
  reciptId  String  @unique
  reciept   String  @unique
  user      User    @relation(...)
  event     Event   @relation(...)
}

enum Category {
  Tech
  Sports
  Academic
  Social
}
```

---

## Booking Flow

```
User clicks "Register"
  → Freshness check: GET /api/events/[id]/availability
  → If paid:  POST /api/checkout/create → redirect to Stripe
              Stripe → POST /payment/success?session_id=xxx
              POST /api/checkout/success → verify session, create BookedEvents, generate receipt PDF
  → If free:  mutateAsync bookEvent() directly
              → creates BookedEvents with sessionId = "Free-{userId}"
              → generates receipt PDF
              → router.replace /payment/success?session_id=xxx
```

---

## Receipt Generation

Receipts are generated server-side as PDFs using:

1. **`generateReceiptId()`** — produces a unique ID in the format `RCP-{YEAR}-{SEQUENCE}-{HEX}` (e.g. `RCP-2025-84729-A3F2`)
2. **Handlebars** (`templates/receipt.hbs`) — compiles the dark-themed HTML receipt with event details, attendee info, price breakdown, and QR code
3. **QRCode** — generates a base64 PNG encoding the `reciptId`, embedded inline in the HTML
4. **Puppeteer** — renders the HTML to a PDF with `printBackground: true`

The PDF URL is stored in `BookedEvents.reciept` and served from `/api/receipt/[reciptId]`.

---

## Admin Access

The admin dashboard at `/admin` is gated by email address:

```dotenv
NEXT_PUBLIC_ADMIN_EMAIL=your-admin@email.com
```

Any signed-in user whose primary email does not match is redirected to `/` with an "Access denied" toast.

---

## Clerk Webhook Setup

1. In your Clerk dashboard go to **Webhooks → Add Endpoint**
2. Set the URL to `https://your-domain.com/api/webhooks/clerk`
3. Subscribe to `user.created` and `user.updated` events
4. Copy the **Signing Secret** into `CLERK_WEBHOOK_SECRET`

The webhook uses `upsert` so Clerk retries are safe and idempotent.

---

## Scripts

```bash
npm run dev          # Start dev server with Turbopack
npm run build        # Production build
npm run lint         # ESLint
npx prisma studio    # Open Prisma database GUI
npx prisma migrate dev --name <name>   # Create and apply a migration
npx prisma db push   # Push schema without migration history
```

---

## Deployment

### Vercel

1. Push to GitHub
2. Import in [vercel.com](https://vercel.com)
3. Add all environment variables from `.env`
4. Set `NEXT_PUBLIC_URL` to your production domain
5. Deploy

> Make sure your Neon database is **not suspended** before deploying. Free tier branches suspend after 5 minutes of inactivity — upgrade or ping the database before your first deployment.

---

## License

MIT
