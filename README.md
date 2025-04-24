# 💻 React Frontend (Vite)

This project includes a React app built with Vite, used to interact with the Serverless Task API.

---

## ⚙️ Environment Setup

Create a `.env` file at the root of the frontend project with the following content:

```env
VITE_API_URL=http://localhost:3000
```

This variable defines the base URL for API calls from the frontend.

---

## 🚀 How to Run the Frontend Locally

1. Go to the React project folder:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

The app will be available at `http://localhost:5173` (or the port shown in the terminal).

---

## 🔗 API Integration

Make sure your serverless backend is running (`sls offline start`) so the frontend can interact with it via the configured `VITE_API_URL`.

All API requests from the frontend will be sent to this base URL, so it's important to set it correctly in the `.env` file.

