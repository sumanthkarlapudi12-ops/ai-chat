# Troubleshooting Guide

Common issues and solutions for the AI Chat application.

---

## CORS / Preflight Issues

### Symptom
```
Access to fetch at '...' has been blocked by CORS policy
OPTIONS /chat 404 (Not Found)
```

### Cause
The backend wasn't properly configured to handle OPTIONS preflight requests sent by browsers before POST requests.

### Solution ✅
**Already Fixed!** The backend now includes:

```js
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

app.options('*', cors());
```

### When Deploying to Production

If you still see CORS errors in production:

1. **Update the `origin` field** in `server/index.js`:
   ```js
   app.use(cors({
     origin: 'https://your-frontend-url.netlify.app', // Your actual frontend URL
     // ... rest of config
   }));
   ```

2. **Ensure your backend is deployed** and accessible at the URL specified in `client/.env.production`

3. **Update `client/.env.production`** with your actual backend URL:
   ```
   VITE_API_URL=https://your-backend.onrender.com
   ```

---

## API Key Issues

### Symptom
```
Groq API error: Invalid API key
```

### Solution
1. Check your `server/.env` file has the correct API key:
   ```
   GROQ_API_KEY=gsk_...your_actual_key...
   ```

2. Restart the backend server after updating `.env`

3. If you exposed your key in Git (GitHub blocked your push):
   - Revoke the old key at [Groq Console](https://console.groq.com)
   - Generate a new API key
   - Update `server/.env` with the new key

---

## Model Deprecated Error

### Symptom
```
The model `llama3-8b-8192` has been decommissioned
```

### Solution ✅
**Already Fixed!** Updated to `llama-3.1-8b-instant`

If you see this error, check `server/index.js` line 40:
```js
model: "llama-3.1-8b-instant"
```

---

## Port Already in Use

### Symptom
```
Error: listen EADDRINUSE: address already in use :::5000
```

### Solution

**Windows:**
```bash
netstat -ano | findstr :5000
taskkill //F //PID <PID_NUMBER>
```

**Mac/Linux:**
```bash
lsof -i :5000
kill -9 <PID_NUMBER>
```

Or change the port in `server/.env`:
```
PORT=5001
```

---

## Frontend Can't Connect to Backend

### Symptom
```
Error: Failed to fetch
TypeError: NetworkError when attempting to fetch resource
```

### Checklist

1. **Is the backend running?**
   ```bash
   curl http://localhost:5000
   # Should return: "AI Chat API running"
   ```

2. **Is the API URL correct?**
   - Development: Check `client/.env.development`
   - Production: Check `client/.env.production`

3. **Are you using the right environment?**
   ```bash
   # Development (uses .env.development)
   npm run dev

   # Production build (uses .env.production)
   npm run build
   ```

4. **Check browser console** (F12) for actual error messages

---

## Render Deployment Issues

### Backend Sleeps After 15 Minutes

**Symptom:** First request after inactivity takes 30-60 seconds

**Solution:**
- Use [UptimeRobot](https://uptimerobot.com) (free) to ping your backend every 5 minutes
- Or upgrade to Render paid tier

### Environment Variables Not Set

**Symptom:** Server crashes or API errors in production

**Solution:**
1. Go to Render Dashboard → Your Service
2. Environment → Add `GROQ_API_KEY`
3. Save and redeploy

### Build Fails

**Symptom:** Deployment fails during build

**Solution:**
Check build settings:
- **Build Command:** `npm install` (or `cd server && npm install` if using monorepo)
- **Start Command:** `npm start` (or `cd server && npm start`)
- **Root Directory:** `server` (if using monorepo structure)

---

## Netlify Deployment Issues

### API Calls Fail in Production

**Symptom:** Works locally but not on Netlify

**Checklist:**
1. Did you update `client/.env.production` with your backend URL?
2. Did you rebuild after updating `.env.production`?
   ```bash
   npm run build
   ```
3. Did you redeploy to Netlify?

### 404 on Page Refresh

**Symptom:** App works initially but refreshing gives 404

**Solution:**
Create `client/public/_redirects`:
```
/* /index.html 200
```

---

## Session/Memory Issues

### Conversations Reset

**Symptom:** AI doesn't remember previous messages

**Causes:**
1. Session ID changing (check browser console)
2. Backend restarted (in-memory storage cleared)
3. Using different browser tabs (each gets unique session ID)

**Solutions:**
- For persistence across restarts: Add Redis/Supabase (see [README.md](README.md))
- For same user across tabs: Use localStorage for session ID

---

## Markdown Not Rendering

### Symptom
AI responses show raw markdown instead of formatted text

### Solution
1. Check if `marked` package is installed:
   ```bash
   cd client
   npm install marked
   ```

2. Verify imports in `client/src/App.jsx`:
   ```js
   import { marked } from 'marked';
   ```

---

## Git Push Blocked (Secret Detection)

### Symptom
```
Push cannot contain secrets
Groq API Key detected
```

### Solution ✅
**Already Fixed!** We removed the secret from Git history.

**To prevent this:**
1. **Never commit `.env` files** (already in `.gitignore`)
2. **Use placeholders in `.env.example`:**
   ```
   GROQ_API_KEY=your_groq_api_key_here
   ```
3. **If you accidentally commit a secret:**
   - Revoke the key immediately
   - Use `git filter-branch` to remove from history
   - Force push: `git push origin master --force`

---

## Local Development Best Practices

### 1. Use Separate Terminals
```bash
# Terminal 1 - Backend
cd server
npm start

# Terminal 2 - Frontend
cd client
npm run dev
```

### 2. Check Logs
- Backend: Check the terminal running `npm start`
- Frontend: Browser console (F12)
- Network: Browser DevTools → Network tab

### 3. Environment Files
- `server/.env` - Backend secrets (NEVER commit)
- `client/.env.development` - Local frontend config
- `client/.env.production` - Production frontend config
- `server/.env.example` - Template (safe to commit)

---

## Need More Help?

1. Check the error message in:
   - Terminal (backend)
   - Browser console (F12)
   - Network tab (F12 → Network)

2. Common error patterns:
   - `CORS` → Backend CORS configuration
   - `404` → Wrong URL or route not found
   - `500` → Backend error (check server logs)
   - `Failed to fetch` → Backend not running or wrong URL

3. Review documentation:
   - [README.md](README.md) - Setup and features
   - [DEPLOYMENT.md](DEPLOYMENT.md) - Deployment guide
   - [QUICK-START.md](QUICK-START.md) - Quick start

4. Still stuck? Check:
   - Groq API status: [status.groq.com](https://status.groq.com)
   - Render status: [status.render.com](https://status.render.com)
   - Netlify status: [status.netlify.com](https://status.netlify.com)
