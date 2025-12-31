# Deployment Checklist

Follow these steps in order to deploy your AI Chat app without CORS errors.

---

## ✅ Pre-Deployment Checklist

- [x] CORS configuration updated for production
- [x] Model updated to `llama-3.1-8b-instant`
- [x] Environment variables configured
- [x] Code pushed to GitHub
- [ ] Backend deployed to Render
- [ ] Frontend deployed to Netlify

---

## 🚀 Step 1: Deploy Backend to Render

### 1.1 Create Web Service on Render

1. Go to [https://render.com](https://render.com)
2. Click **New +** → **Web Service**
3. Connect your GitHub account
4. Select repository: `sumanthkarlapudi12-ops/ai-chat`

### 1.2 Configure Service

**Service Name:** `ai-chat-backend` (or your choice)

**Build & Deploy Settings:**
- **Root Directory:** `server`
- **Runtime:** `Node`
- **Build Command:** `npm install`
- **Start Command:** `npm start`

**Advanced Settings:**
- **Branch:** `master`
- **Auto-Deploy:** Yes

### 1.3 Environment Variables

Click **Environment** and add:

```
GROQ_API_KEY=your_actual_groq_api_key_here
```

⚠️ Use your real Groq API key from [console.groq.com](https://console.groq.com)

### 1.4 Deploy

1. Click **Create Web Service**
2. Wait 2-3 minutes for deployment
3. Copy your backend URL (e.g., `https://ai-chat-backend-abc123.onrender.com`)

### 1.5 Test Backend

Open in browser:
```
https://your-backend-url.onrender.com/
```

Should display: **"AI Chat API running"**

✅ If you see this, backend is deployed successfully!

---

## 🌐 Step 2: Update Frontend for Production

### 2.1 Update Production Environment File

Edit `client/.env.production`:

```env
VITE_API_URL=https://your-actual-backend.onrender.com
```

Replace with your actual Render backend URL from Step 1.4

### 2.2 Build Frontend

```bash
cd client
npm run build
```

This creates a `dist/` folder with optimized production files.

---

## 📤 Step 3: Deploy Frontend to Netlify

### Option A: Drag & Drop (Quickest)

1. Go to [https://app.netlify.com/drop](https://app.netlify.com/drop)
2. Drag the `client/dist` folder to the upload area
3. Wait 30 seconds
4. Get your URL: `https://random-name-123456.netlify.app`

### Option B: GitHub Auto-Deploy (Recommended)

1. Go to [https://app.netlify.com](https://app.netlify.com)
2. Click **Add new site** → **Import an existing project**
3. Choose **GitHub**
4. Select repository: `sumanthkarlapudi12-ops/ai-chat`

**Build Settings:**
- **Base directory:** `client`
- **Build command:** `npm run build`
- **Publish directory:** `client/dist`

**Environment Variables:**
Add this in **Site settings → Environment variables**:
```
VITE_API_URL=https://your-backend.onrender.com
```

5. Click **Deploy site**
6. Wait 2-3 minutes

---

## 🧪 Step 4: Test Your Deployment

### 4.1 Open Your Frontend URL

Open: `https://your-app.netlify.app`

### 4.2 Test Chat Functionality

1. Type a message: "Hello, can you help me?"
2. Click Send
3. Wait for AI response

✅ **Success indicators:**
- No CORS errors in browser console (F12)
- AI responds within 2-5 seconds
- Messages display properly with markdown formatting

❌ **If you see errors:**
- Check browser console (F12) for actual error message
- Verify backend URL in `.env.production` matches your Render URL
- Ensure backend is running (visit backend URL directly)

---

## 🔍 Troubleshooting Deployment

### CORS Error Still Appears

**Symptoms:**
```
Access to fetch has been blocked by CORS policy
```

**Solutions:**

1. **Verify backend is running:**
   ```
   curl https://your-backend.onrender.com/
   ```
   Should return: `AI Chat API running`

2. **Test OPTIONS request:**
   ```bash
   curl -X OPTIONS https://your-backend.onrender.com/chat -i
   ```
   Should return `200 OK` with CORS headers

3. **Check Render logs:**
   - Go to Render Dashboard → Your Service → Logs
   - Look for any errors or crashes

4. **Ensure latest code is deployed:**
   - Check commit hash in Render matches GitHub
   - Click "Manual Deploy" if needed

### Backend Returns 500 Error

**Cause:** Missing or invalid `GROQ_API_KEY`

**Solution:**
1. Go to Render → Your Service → Environment
2. Check `GROQ_API_KEY` is set correctly
3. Restart service after updating

### Frontend Shows "Failed to fetch"

**Cause:** Wrong API URL

**Solution:**
1. Check `client/.env.production` has correct URL
2. Rebuild frontend: `npm run build`
3. Redeploy to Netlify

### Render Free Tier Sleeps

**Symptom:** First request after 15 minutes takes 30-60 seconds

**Solutions:**
1. Use [UptimeRobot](https://uptimerobot.com) (free) - ping every 5 minutes
2. Upgrade to Render paid tier ($7/month)
3. Accept the delay (it's normal for free tier)

---

## 🎉 Success Checklist

After deployment, verify:

- [ ] Backend URL works: `https://your-backend.onrender.com/`
- [ ] Backend health check returns: "AI Chat API running"
- [ ] Frontend loads without errors
- [ ] Can send messages and get AI responses
- [ ] No CORS errors in browser console
- [ ] Markdown formatting works (code blocks, lists, etc.)
- [ ] Messages persist within same session
- [ ] Mobile responsive (test on phone)

---

## 📝 Post-Deployment

### Custom Domain (Optional)

**Netlify:**
1. Site settings → Domain management
2. Add custom domain
3. Follow DNS configuration steps

**Render:**
1. Settings → Custom Domain
2. Add domain
3. Update DNS records

### Monitoring

**Check these regularly:**
- Groq API quota: [console.groq.com](https://console.groq.com)
- Render status: Dashboard → Logs
- Netlify deploy status: Deploys tab

### Updates

To update your deployed app:

```bash
# Make changes locally
git add .
git commit -m "Your update message"
git push origin master
```

**Render:** Auto-deploys from GitHub (if enabled)
**Netlify:** Auto-deploys from GitHub (if using GitHub integration)

---

## 🆘 Need Help?

1. Check [TROUBLESHOOTING.md](TROUBLESHOOTING.md) for common issues
2. Review Render/Netlify logs for specific errors
3. Test locally first: `npm start` (backend) and `npm run dev` (frontend)
4. Verify environment variables are set correctly

---

## 🎯 Your Deployment URLs

After deployment, update these:

**Backend URL:** `https://__________________.onrender.com`

**Frontend URL:** `https://__________________.netlify.app`

**GitHub Repo:** https://github.com/sumanthkarlapudi12-ops/ai-chat

---

## ✅ Production-Ready Features

Your deployed app includes:

✨ Modern, responsive UI with gradient design
✨ Markdown support for code blocks and formatting
✨ Session-based conversation memory
✨ Error handling and loading states
✨ CORS properly configured for all browsers
✨ Production-optimized build
✨ Free hosting (Render + Netlify)
✨ Auto-deployment from GitHub

---

**Ready to deploy? Start with Step 1!** 🚀
