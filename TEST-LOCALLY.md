# Test Locally - Step by Step

Follow these steps to test your AI chat app on your local machine.

## Prerequisites Check

- [x] Node.js installed
- [x] Server `.env` file exists with GROQ_API_KEY
- [x] Dependencies installed

---

## Method 1: Using the Start Script (Easiest - Windows)

Simply double-click `start.bat` or run:

```bash
start.bat
```

This will:
1. Open a terminal for the backend (port 5000)
2. Open a terminal for the frontend (port 5173)
3. Both will start automatically

Then open: [http://localhost:5173](http://localhost:5173)

---

## Method 2: Manual Start (All Platforms)

### Step 1: Start the Backend

Open a terminal and run:

```bash
cd server
npm start
```

You should see:
```
Server running on port 5000
```

**Keep this terminal open!**

### Step 2: Test Backend is Working

Open another terminal or browser to:
```
http://localhost:5000
```

You should see:
```
AI Chat API running
```

If you see this, the backend is working!

### Step 3: Start the Frontend

Open a **new terminal** (keep backend running) and run:

```bash
cd client
npm run dev
```

You should see:
```
  VITE v5.x.x  ready in xxx ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

### Step 4: Open the App

Click the link or open your browser to:
```
http://localhost:5173
```

You should see the chat interface!

---

## Testing the Chat

### 1. Send a Test Message

Type in the input box:
```
Hello, can you help me?
```

Press Enter or click Send.

### 2. What Should Happen

1. Your message appears on the right (blue bubble)
2. "AI is typing..." appears briefly
3. AI response appears on the left (gray bubble)

### 3. Test Memory

Ask a follow-up question:
```
What did I just say?
```

The AI should remember your previous message!

---

## Troubleshooting

### Port 5000 already in use

**Fix:**
1. Find what's using port 5000:
   ```bash
   # Windows
   netstat -ano | findstr :5000

   # Mac/Linux
   lsof -i :5000
   ```

2. Either kill that process or change the port in `server/.env`:
   ```
   PORT=5001
   ```

3. Also update `client/src/App.jsx` line 6:
   ```js
   const API_URL = "http://localhost:5001/chat";
   ```

### "Failed to fetch" Error

**Causes:**
1. Backend not running
2. Backend crashed (check terminal for errors)
3. Wrong API URL in frontend

**Fix:**
1. Check backend terminal - should show "Server running"
2. Test: `http://localhost:5000` in browser
3. Check browser console (F12) for actual error

### "Invalid API Key" Error

**Fix:**
1. Check `server/.env` - make sure GROQ_API_KEY is set
2. Verify key is valid at [https://console.groq.com](https://console.groq.com)
3. Restart the backend server after changing .env

### Frontend Shows Blank Page

**Fix:**
1. Check browser console (F12) for errors
2. Make sure you ran `npm install` in client directory
3. Try clearing browser cache and reload

### Server Crashes on First Request

**Possible causes:**
1. Invalid Groq API key
2. Network issues
3. Rate limit exceeded

**Check:**
- Look at server terminal for error messages
- Verify API key at Groq console
- Check your Groq quota/limits

---

## Success Indicators

You'll know everything is working when:

1. **Backend terminal shows:**
   ```
   Server running on port 5000
   ```

2. **Frontend terminal shows:**
   ```
   ➜  Local:   http://localhost:5173/
   ```

3. **Browser at localhost:5173 shows:**
   - Clean chat interface
   - Input box at bottom
   - "Public AI Chat Agent" title

4. **Sending a message:**
   - Message appears immediately
   - Loading indicator shows
   - AI responds within 2-5 seconds
   - Response appears in chat

---

## Quick Commands Reference

### Start Everything
```bash
# Terminal 1
cd server && npm start

# Terminal 2
cd client && npm run dev
```

### Stop Everything
Just press `Ctrl+C` in each terminal

### Restart Backend
Press `Ctrl+C` in backend terminal, then:
```bash
npm start
```

### Restart Frontend
Press `Ctrl+C` in frontend terminal, then:
```bash
npm run dev
```

---

## Viewing Logs

### Backend Logs
The server terminal shows:
- Request received
- API calls to Groq
- Errors (if any)

### Frontend Logs
Press `F12` in browser → Console tab to see:
- API requests
- Errors (if any)
- Network issues

---

## Next Steps

Once local testing works:

1. **Try different questions** - Test the AI's capabilities
2. **Test memory** - Have a multi-turn conversation
3. **Customize** - Edit the system prompt (server/index.js line 44)
4. **Deploy** - Follow DEPLOYMENT.md to make it public

---

## Common Test Scenarios

### Test 1: Basic Chat
```
You: Hello
AI: [Should respond with greeting]
```

### Test 2: Memory
```
You: My name is John
AI: [Acknowledges]
You: What's my name?
AI: [Should remember "John"]
```

### Test 3: Multi-turn Conversation
```
You: I want to learn React
AI: [Gives advice]
You: What are hooks?
AI: [Explains hooks in context of React]
```

### Test 4: Error Handling
Stop the backend (Ctrl+C), then try sending a message.
- Frontend should show error message
- Should not crash

---

## Ready to Deploy?

Once local testing works perfectly:

See [DEPLOYMENT.md](DEPLOYMENT.md) for deploying to production for FREE!
