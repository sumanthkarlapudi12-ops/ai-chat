# Deployment Guide

This guide shows you how to deploy your AI chat app for **100% free** with public URLs.

## Prerequisites

- [x] GitHub account
- [x] Groq API key ([get one here](https://console.groq.com))
- [x] Code pushed to GitHub repository

---

## Step 1: Deploy Backend to Render (Free)

### 1.1 Create Render Account
Go to [https://render.com](https://render.com) and sign up.

### 1.2 Create Web Service
1. Click **New +** → **Web Service**
2. Connect your GitHub repository
3. Select your repository

### 1.3 Configure Service
- **Name**: `ai-chat-backend` (or your choice)
- **Region**: Choose closest to your users
- **Branch**: `main`
- **Root Directory**: `server`
- **Runtime**: `Node`
- **Build Command**: `npm install`
- **Start Command**: `npm start`

### 1.4 Add Environment Variables
In the **Environment** section:

```
GROQ_API_KEY=your_groq_api_key_here
```

### 1.5 Deploy
Click **Create Web Service**

Wait 2-3 minutes for deployment. You'll get a URL like:
```
https://ai-chat-backend-xxxx.onrender.com
```

**Copy this URL** - you'll need it for the frontend!

---

## Step 2: Update Frontend API URL

### 2.1 Edit App.jsx
Open `client/src/App.jsx` and update line 6:

**Before:**
```js
const API_URL = "http://localhost:5000/chat";
```

**After:**
```js
const API_URL = "https://ai-chat-backend-xxxx.onrender.com/chat";
```

Replace `xxxx` with your actual Render URL.

### 2.2 Commit and Push
```bash
git add client/src/App.jsx
git commit -m "Update API URL for production"
git push
```

---

## Step 3: Deploy Frontend to Netlify (Free)

### Option A: Drag & Drop (Fastest)

1. Build the frontend locally:
   ```bash
   cd client
   npm run build
   ```

2. Go to [https://app.netlify.com/drop](https://app.netlify.com/drop)

3. Drag the `client/dist` folder to the upload area

4. Done! You'll get a URL like:
   ```
   https://amazing-name-123456.netlify.app
   ```

### Option B: GitHub Auto-Deploy (Recommended)

1. Go to [https://app.netlify.com](https://app.netlify.com)

2. Click **Add new site** → **Import an existing project**

3. Connect to GitHub and select your repository

4. Configure build settings:
   - **Base directory**: `client`
   - **Build command**: `npm run build`
   - **Publish directory**: `client/dist`

5. Click **Deploy site**

6. Get your public URL:
   ```
   https://your-app.netlify.app
   ```

### Custom Domain (Optional)
Netlify allows free custom domains:
1. Go to **Site settings** → **Domain management**
2. Add your custom domain
3. Follow DNS configuration steps

---

## Step 4: Test Your Deployment

1. Open your Netlify URL: `https://your-app.netlify.app`
2. Type a message and send
3. Verify the AI responds

**If it doesn't work:**
- Check browser console (F12) for errors
- Verify the API_URL in App.jsx is correct
- Check Render logs for backend errors
- Ensure GROQ_API_KEY is set in Render

---

## Alternative Platforms (Also Free)

### Backend Alternatives
| Platform | Free Tier | Notes |
|----------|-----------|-------|
| Render | 750 hrs/month | Sleeps after 15 min inactivity |
| Railway | 5$/month credit | More generous than Render |
| Fly.io | 3 VMs free | Good global performance |

### Frontend Alternatives
| Platform | Free Tier | Notes |
|----------|-----------|-------|
| Netlify | 100 GB bandwidth | Auto HTTPS, custom domains |
| Cloudflare Pages | Unlimited | Fast global CDN |
| Vercel | 100 GB bandwidth | Great for React apps |

---

## Important Notes

### Render Free Tier Limitations
- Server **sleeps after 15 minutes** of inactivity
- First request after sleep takes 30-60 seconds
- **Solution**: Use [UptimeRobot](https://uptimerobot.com) to ping every 5 minutes (also free)

### Memory Persistence
Current setup uses **in-memory storage**:
- Conversations reset when server restarts
- Render free tier restarts periodically

**Upgrade to persistent storage:**
- Upstash Redis (free tier)
- Supabase PostgreSQL (free tier)
- MongoDB Atlas (free tier)

---

## Cost Summary

| Service | Cost |
|---------|------|
| Groq API | FREE |
| Render Backend | FREE |
| Netlify Frontend | FREE |
| Custom Domain (optional) | ~$10/year |

**Total: $0/month** (or $10/year with custom domain)

---

## Monitoring

### Check Backend Health
```bash
curl https://your-backend.onrender.com/
# Should return: "AI Chat API running"
```

### View Logs
- **Render**: Dashboard → Logs tab
- **Netlify**: Site → Functions → Logs (if using functions)

---

## Next Steps

Once deployed:
1. Share your public URL
2. Monitor usage on Groq dashboard
3. Add analytics (Google Analytics, Plausible)
4. Consider adding authentication
5. Implement rate limiting
6. Add persistent storage

---

## Troubleshooting

### "Failed to fetch" Error
- CORS issue: Check backend CORS settings
- Wrong API URL: Verify API_URL in App.jsx

### "AI Chat API running" in browser
- You're visiting the backend URL directly
- Use the **frontend** URL instead

### Slow responses
- Render free tier may be sleeping
- First request wakes it up (30-60s)
- Use UptimeRobot to prevent sleep

### API Key errors
- Check Render environment variables
- Verify Groq API key is valid
- Check Groq dashboard for quota

---

## Success!

Your AI chat app is now:
- ✅ Publicly accessible
- ✅ Running on free hosting
- ✅ Using free LLM API
- ✅ Ready to share

Share your URL and start chatting!
