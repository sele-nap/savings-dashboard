# Dashboard Épargne & Investissement

A full-stack web app to manage investment fund savings — deposit money into funds and track portfolio performance over time.

## Stack

**Frontend** — Next.js 15, TailwindCSS, Redux Toolkit, SWR, Recharts, Framer Motion

**Backend** — Express.js, MongoDB, Mongoose, Joi, Helmet, express-rate-limit

## Prerequisites

- Node.js 18+
- MongoDB (local) — `brew install mongodb-community`

## Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/sele-nap/dashboard-epargne.git
cd dashboard-epargne
npm install
```

### 2. Configure environment variables

Create a `.env` file in `/backend`:

```env
MONGODB_URI=mongodb://localhost:27017/dashboard-epargne
PORT=5001
```

Create a `.env.local` file in `/frontend`:

```env
NEXT_PUBLIC_API_URL=http://localhost:5001/api
```

### 3. Start MongoDB

```bash
brew services start mongodb-community
```

### 4. Seed the database

```bash
cd backend && npm run seed
```

### 5. Run the app

From the root:

```bash
npm run dev
```

Frontend → [http://localhost:3000](http://localhost:3000)

Backend → [http://localhost:5001](http://localhost:5001)

## Run Tests

```bash
cd frontend && npm test
```