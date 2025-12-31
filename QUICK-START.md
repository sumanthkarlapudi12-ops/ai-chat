# Quick Start Guide

Get your AI chat running in 5 minutes!

## 1. Get Groq API Key

1. Go to: [https://console.groq.com](https://console.groq.com)
2. Sign up (free)
3. Create an API key
4. Copy the key

## 2. Configure Backend

Create `server/.env`:

```env
GROQ_API_KEY=paste_your_key_here
PORT=5000
```

## 3. Install Dependencies

```bash
# Backend
cd server
npm install

# Frontend
cd ../client
npm install
```

## 4. Start the App

### Windows
```bash
# From root directory
start.bat
```

### Mac/Linux
```bash
# Terminal 1 - Backend
cd server
npm start

# Terminal 2 - Frontend
cd client
npm run dev
```

## 5. Open Browser

Go to: [http://localhost:5173](http://localhost:5173)

Start chatting!

---

## What You Can Do Now

### Test the Chat
- Ask questions
- Have a conversation
- Test memory (it remembers context!)

### Customize
- Edit the system prompt in `server/index.js` (line 44)
- Change UI colors in `client/src/App.jsx`
- Add more features

### Deploy (Free!)
See [DEPLOYMENT.md](DEPLOYMENT.md) for step-by-step deployment guide.

---

## Troubleshooting

### Backend won't start
- Check if `.env` file exists in `server/` directory
- Verify GROQ_API_KEY is set
- Make sure port 5000 is not in use

### Frontend can't connect
- Check if backend is running on port 5000
- Open `http://localhost:5000` - should see "AI Chat API running"
- Check browser console (F12) for errors

### API errors
- Verify Groq API key is valid
- Check your Groq dashboard for quota
- Look at server logs for error messages

---

## File Structure

```
ai-chat/
├── client/              # React frontend
│   ├── src/
│   │   └── App.jsx     # Main chat UI
│   └── package.json
├── server/              # Node.js backend
│   ├── index.js        # Express API
│   ├── .env            # Your API keys (don't commit!)
│   └── package.json
├── README.md           # Full documentation
├── DEPLOYMENT.md       # Deployment guide
└── start.bat          # Quick start script (Windows)
```

---

## Next Steps

Choose your path:

### 1. Make it Public (Free Hosting)
Follow [DEPLOYMENT.md](DEPLOYMENT.md) to deploy to Render + Netlify

### 2. Customize for Your Use Case
- Support bot: Add knowledge base
- QA bot: Upload documents
- Sales assistant: Add product info

### 3. Add Features
- Persistent memory (Redis/Supabase)
- User authentication
- File upload
- Streaming responses
- Voice input

### 4. Improve UI
- Add Tailwind CSS
- Use shadcn/ui components
- Make it responsive
- Add dark mode

---

## Want Help?

Pick a number and I'll implement it for you:

1. **Deploy it** - Full deployment setup
2. **Add knowledge base** - Turn it into a support bot
3. **Persistent memory** - Remember conversations after restart
4. **Better UI** - Tailwind CSS + modern design
5. **Streaming** - See AI responses as they're generated
6. **Auth** - Add user login
7. **Rate limiting** - Prevent abuse

Just say: **"do step X"** and I'll code it!
