# Public AI Chat Agent

A production-ready AI chat application using React + Groq API + Node.js, designed to be deployed for free.

## Architecture

```
React (Vite)
  └── Netlify / Cloudflare Pages (FREE)
        ↓
Node.js (Express API)
  └── Render / Railway (FREE)
        ↓
Groq API (FREE LLM)
```

## Features

- ✅ Conversational AI with memory
- ✅ Session-based chat history
- ✅ Clean, responsive UI
- ✅ Error handling
- ✅ Real-time loading states
- ✅ Free to host publicly

## Setup

### 1. Get Groq API Key

1. Go to [https://console.groq.com](https://console.groq.com)
2. Sign up and create an API key
3. Copy the API key

### 2. Backend Setup

```bash
cd server
npm install
```

Create a `.env` file in the `server` directory:

```env
GROQ_API_KEY=your_groq_api_key_here
PORT=5000
```

Start the server:

```bash
npm start
```

The server will run on `http://localhost:5000`

### 3. Frontend Setup

```bash
cd client
npm install
```

Start the development server:

```bash
npm run dev
```

The app will run on `http://localhost:5173`

## Testing Locally

1. Start the backend server (port 5000)
2. Start the frontend dev server (port 5173)
3. Open your browser to `http://localhost:5173`
4. Start chatting with the AI!

## Deployment

### Backend (Render - Free)

1. Push your code to GitHub
2. Go to [https://render.com](https://render.com)
3. Create a new **Web Service**
4. Connect your repository
5. Settings:
   - **Build Command**: `cd server && npm install`
   - **Start Command**: `cd server && npm start`
6. Add Environment Variable:
   ```
   GROQ_API_KEY=your_key_here
   ```
7. Deploy!

You'll get a URL like: `https://your-app.onrender.com`

### Frontend (Netlify - Free)

1. Update `API_URL` in `client/src/App.jsx` to your Render backend URL
2. Build the frontend:
   ```bash
   cd client
   npm run build
   ```
3. Go to [https://netlify.com](https://netlify.com)
4. Drag and drop the `client/dist` folder
   OR connect your GitHub repo for auto-deployment

You'll get a URL like: `https://your-app.netlify.app`

## Customization

### Convert to Support/QA Bot

Edit `server/index.js` and add a knowledge base:

```js
const KNOWLEDGE_BASE = `
Product Info:
- Login uses OTP
- Refunds processed in 7 days
- Support email: support@xyz.com
`;

// In the /chat endpoint:
messages: [
  { role: "system", content: KNOWLEDGE_BASE },
  ...conversations[sessionId]
]
```

### Add Persistent Memory

The current setup uses in-memory storage (resets on server restart).

For persistent memory, consider:
- **Upstash Redis** (free tier)
- **Supabase** (free PostgreSQL)
- **SQLite** file-based storage

## Tech Stack

- **Frontend**: React 19 + Vite
- **Backend**: Node.js + Express
- **LLM**: Groq API (Llama 3)
- **Styling**: Inline styles (easy to customize)

## Next Steps

1. ✅ Add persistent memory (Redis/Supabase)
2. ✅ Implement streaming responses
3. ✅ Add authentication
4. ✅ Upload documents for QA bot
5. ✅ UI improvements (Tailwind/shadcn)

## License

MIT
