# Expense Tracker UI - Frontend

This is the frontend application for the Fenmo AI Assessment Expense Tracker. It is a React-based single-page application (SPA) built with Vite and styled using Tailwind CSS.

## Tech Stack

- **Framework:** React (with Vite)
- **Styling:** Tailwind CSS (v4)
- **State Management:** React Context API (AuthContext)
- **Routing:** React Router DOM (v6)
- **HTTP Client:** Axios

## Features

- **Modern UI:** Clean, responsive design with Indigo/Slate theme.
- **Authentication:**
  - Login and Signup pages with form validation.
  - Protected routes to restrict access to authenticated users.
  - Session persistence using local storage.
- **Expense Dashboard:**
  - View a list of expenses with amount, category, date, and description.
  - **Add Expense:** Form to add new expenses with category selection.
  - **Filter:** Filter expenses by category.
  - **Sort:** Sort expenses by date (Newest/Oldest).
  - **Total Calculation:** Real-time calculation of total expenses based on current filters.
- **Edge Case Handling:**
  - **Loading States:** Visual feedback during data fetching and submission.
  - **Error Handling:** Graceful handling of API errors and network issues.
  - **404 Page:** Custom "Not Found" page for invalid routes.
  - **Sticky Footer:** Layout ensures footer stays at the bottom even with short content.

## Getting Started

### Prerequisites

- Node.js (v14 or higher)

### Installation

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```
   *Note: If you encounter peer dependency warnings, you can use `npm install --legacy-peer-deps`.*

3. creates a `.env` file in the root of the frontend directory:
   ```env
   VITE_API_URL=http://localhost:3000/api/v1
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Build for production:
   ```bash
   npm run build
   ```

## Project Structure

```
src/
├── components/   # Reusable UI components (Header, Footer, ExpenseList, etc.)
├── context/      # React Context for global state (Auth)
├── utils/        # Helper functions and API configuration
├── App.jsx       # Main application component and routing
├── index.css     # Global styles and Tailwind directives
└── main.jsx      # Application entry point
```

## Fenmo AI Assessment Notes

- The UI handles multiple submissions gracefully by disabling buttons during loading states.
- Idempotency keys are generated per submission to ensure data integrity on the backend.
- The layout is fully responsive and optimized for both desktop and mobile views.
