# Savings & Investment Dashboard

A full-stack web app to manage investment fund savings — deposit money into funds and track portfolio performance over time.

## Stack

**Frontend** — Next.js 15, TailwindCSS, Redux Toolkit, SWR, Recharts, Framer Motion, next-intl

**Backend** — Express.js, MongoDB, Mongoose, Joi, Helmet, express-rate-limit, bcryptjs


## Prerequisites

- Node.js 18+
- MongoDB (local) — `brew install mongodb-community`

## Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/sele-nap/savings-dashboard.git
cd savings-dashboard
npm install
```

### 2. Configure environment variables

Create a `.env` file in `/backend`:

```env
MONGODB_URI=mongodb://localhost:27017/savings-dashboard
PORT=5001
# Optionnel — origines CORS séparées par des virgules (défaut : http://localhost:3000)
# CORS_ORIGIN=http://localhost:3000,http://192.168.1.xx:3000
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
cd backend
npm run seed       # funds & valuations
npm run seed:user  # creates the demo user
```

### 5. Run the app

From the root:

```bash
npm run dev
```

Frontend → [http://localhost:3000](http://localhost:3000)

Backend → [http://localhost:5001](http://localhost:5001)

## Login

```
Email    : user@epargne.fr
Password : password123
```

## Run Tests

```bash
cd frontend && npm test
```
