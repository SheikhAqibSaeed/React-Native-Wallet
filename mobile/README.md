# Wallet App – Full Stack Documentation

## Overview
A full-stack expense tracker app with a Node.js/Express backend (API, DB, rate limiting) and a React Native (Expo) mobile frontend (authentication, transaction management, summary dashboard).

---

## Backend (Node.js/Express)

### **Structure & Main Files**
- **src/server.js**: Entry point, sets up Express server, connects to DB, applies middleware, and routes.
- **src/config/db.js**: Initializes and connects to Neon database, ensures `transactions` table exists.
- **src/config/cron.js**: Sets up a cron job to ping an API endpoint periodically.
- **src/config/upstash.js**: Configures Upstash Redis for rate limiting.
- **src/middleware/rateLimiter.js**: Middleware to limit API requests using Upstash.
- **src/routes/transactionsRoutes.js**: Defines transaction-related API endpoints.
- **src/controllers/transactionsController.js**: Implements logic for CRUD and summary of transactions.

### **How to Run Backend**
1. `cd backend`
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set environment variables in a `.env` file:
   - `DATABASE_URL` (NeonDB connection string)
   - `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` (Upstash Redis)
   - `API_URL` (for cron job health check)
4. Start server:
   ```bash
   node src/server.js
   ```

### **API Endpoints**
- `GET /api/health`: Health check.
- `POST /api/transactions`: Create a transaction.
- `GET /api/transactions/:userId`: Get all transactions for a user.
- `DELETE /api/transactions/:id`: Delete a transaction.
- `GET /api/transactions/summary/:userId`: Get balance, income, and expense summary for a user.

---

## Mobile App (React Native/Expo)

### **Structure & Main Files**
- **app/_layout.tsx**: Root layout, sets up ClerkProvider and SafeScreen.
- **app/(auth)/sign-in.tsx & sign-up.tsx**: Authentication screens using Clerk.
- **app/(root)/index.tsx**: Home screen, shows transactions, balance, and allows adding/deleting.
- **app/(root)/create.tsx**: Form to add a new transaction.
- **components/**: Reusable UI components (BalanceCard, NoTransactionsFound, PageLoader, etc.).
- **hooks/useTransactions.ts**: Custom hook for fetching, creating, and deleting transactions.
- **constants/api.ts**: API base URL.
- **constants/colors.ts**: Theme color definitions.

### **How to Run Mobile App**
1. `cd mobile`
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start app:
   ```bash
   npx expo start
   ```
4. Open in Expo Go, Android/iOS emulator, or web.

### **Main Features**
- User authentication (sign up/in with Clerk)
- View, add, and delete transactions
- View balance, income, and expenses
- Responsive, themed UI

---

## Implementation Details

### **Backend**
- Uses Express, NeonDB, Upstash Redis
- Rate limiting via Upstash
- Cron job for periodic API health check
- Transaction CRUD and summary endpoints

### **Mobile**
- Built with Expo, React Native, TypeScript
- Clerk for authentication
- Custom hooks for API interaction
- Themed UI with reusable components

---

## Project Structure

```
Wallet/
  backend/
    src/
      config/
        cron.js
        db.js
        upstash.js
      controllers/
        transactionsController.js
      middleware/
        rateLimiter.js
      routes/
        transactionsRoutes.js
      server.js
  mobile/
    app/
      _layout.tsx
      (auth)/
        _layout.tsx
        sign-in.tsx
        sign-up.tsx
      (root)/
        _layout.tsx
        create.tsx
        index.tsx
      about.tsx
    components/
      BalanceCard.tsx
      NoTransactionsFound.tsx
      PageLoader.tsx
      safeScreen.tsx
      SignOutButton.tsx
      TransationItems.tsx
    hooks/
      useTransactions.ts
    constants/
      api.ts
      colors.ts
    assets/
      fonts/
      images/
      styles/
```

---

## Credits
- Backend: Node.js, Express, NeonDB, Upstash
- Mobile: React Native, Expo, Clerk

---

## License
MIT