# AI Nutrition Tracker

A MERN nutrition tracker with login/register, meal logging, barcode lookup, AI meal analysis, daily goals, water logs, and a simple analytics dashboard.

## Tech Stack

- Frontend: React, Vite, Tailwind CSS, Redux Toolkit, Axios, Recharts, ZXing barcode scanner
- Backend: Node.js, Express, JWT, bcrypt, MVC controllers/services, Mongoose
- Database: MongoDB or MongoDB Atlas, viewable in MongoDB Compass
- External APIs: OpenFoodFacts and optional Gemini API

## Project Structure

```text
ai-nutrition-tracker/
  client/
    src/
      components/
      pages/
      redux/
      services/
      utils/
  server/
    config/
    controllers/
    middleware/
    models/
    routes/
    services/
    utils/
    server.js
```

## Local Setup

1. Install dependencies:

```bash
npm run install:all
```

2. Create environment files. On Windows PowerShell, use `Copy-Item` instead of `cp` if needed:

```bash
cp server/.env.example server/.env
cp client/.env.example client/.env
```

3. Update `server/.env`:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/ai_nutrition_tracker
JWT_SECRET=replace_with_a_long_random_secret
CLIENT_URL=http://localhost:5173
GEMINI_API_KEY=
```

4. Make sure MongoDB is running locally, or replace `MONGO_URI` with your MongoDB Atlas connection string.

5. Start the backend and frontend in two terminals:

```bash
npm run dev:server
npm run dev:client
```

If PowerShell blocks `npm`, run the same scripts with `npm.cmd`.

Frontend runs at `http://localhost:5173`.
Backend runs at `http://localhost:5000`.

## Scripts

- `npm run install:all` installs both server and client dependencies
- `npm run dev:server` starts Express with nodemon
- `npm run dev:client` starts the Vite dev server
- `npm run build:client` builds the React app for production
- `npm run start:server` runs the Express server without nodemon

## User Flows Implemented

- Authentication: register/login with bcrypt password hashing and JWT token storage
- Barcode scanning: browser camera or manual barcode entry, backend OpenFoodFacts lookup, meal saved in MongoDB
- Manual meal entry: direct macro entry, or nutrition database lookup when macros are blank
- AI meal analysis: natural language meal prompt saved as a meal record
- Dashboard: daily totals, targets, macro chart, recent meals, water progress
- Meal history: list and delete meal records
- Goal management: update calorie, macro, water, weight, and activity goals

## API Routes

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me`
- `GET /api/meals`
- `POST /api/meals/manual`
- `POST /api/meals/barcode`
- `POST /api/meals/lookup`
- `POST /api/meals/analyze`
- `DELETE /api/meals/:id`
- `GET /api/goals`
- `PUT /api/goals`
- `POST /api/water`
- `GET /api/analytics/summary`

## Deployment

- Frontend: Vercel, set `VITE_API_URL` to the Render backend URL plus `/api`
- Backend: Render, set `MONGO_URI`, `JWT_SECRET`, `CLIENT_URL`, and optional `GEMINI_API_KEY`
- Database: MongoDB Atlas
- Database viewer: MongoDB Compass

## Notes

- Barcode and typed meal lookup use OpenFoodFacts.
- Gemini is optional for local development. If `GEMINI_API_KEY` is empty, the backend uses a small local fallback for AI meal estimates.
- The app expects the backend URL in `client/.env` as `VITE_API_URL`.
