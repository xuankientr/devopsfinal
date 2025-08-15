# 🚀 Deployment Guide

This guide will walk you through deploying your landing page to Render with automatic CI/CD.

## 📋 Prerequisites

1. GitHub account with your code pushed to a repository
2. Render account (free tier available)
3. Basic understanding of environment variables

## 🗄️ Step 1: Setup PostgreSQL Database

1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click **"New"** → **"PostgreSQL"**
3. Configure:
   - **Name**: `landing-page-db`
   - **Database**: `landing_page`
   - **User**: `landing_user`
   - **Region**: Choose closest to your users
   - **PostgreSQL Version**: Latest
   - **Plan**: Free (or paid for production)
4. Click **"Create Database"**
5. **Copy the External Database URL** - you'll need this for the backend

## 🔧 Step 2: Deploy Backend API

1. In Render Dashboard, click **"New"** → **"Web Service"**
2. Connect your GitHub repository
3. Configure the service:
   - **Name**: `landing-page-backend`
   - **Root Directory**: `backend`
   - **Environment**: `Node`
   - **Region**: Same as your database
   - **Branch**: `main`
   - **Build Command**: `npm install`
   - **Start Command**: `node index.js`
   - **Plan**: Free (or paid for production)

4. **Add Environment Variables**:
   - `DATABASE_URL`: Paste the PostgreSQL URL from Step 1
   - `NODE_ENV`: `production`

5. Click **"Create Web Service"**
6. Wait for deployment to complete
7. **Copy your backend URL** (e.g., `https://landing-page-backend.onrender.com`)

## 🎨 Step 3: Deploy Frontend

1. In Render Dashboard, click **"New"** → **"Static Site"**
2. Connect your GitHub repository
3. Configure the site:
   - **Name**: `landing-page-frontend`
   - **Root Directory**: `frontend`
   - **Branch**: `main`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`

4. **Add Environment Variables**:
   - `VITE_BACKEND_URL`: Paste your backend URL from Step 2

5. Click **"Create Static Site"**
6. Wait for deployment to complete

## ✅ Step 4: Verify Deployment

1. **Test Backend**:
   ```bash
   curl https://your-backend-name.onrender.com/api/health
   curl https://your-backend-name.onrender.com/api/message
   ```

2. **Test Frontend**:
   - Visit your frontend URL
   - Check that the message loads from the backend
   - Verify responsive design on mobile

## 🔄 Step 5: Setup Auto-Deploy

Both services are now configured for auto-deploy:

- **Push to `main` branch** → Automatic deployment
- **GitHub Actions** will run tests before deployment
- **Render** will rebuild and redeploy automatically

## 🛠️ Troubleshooting

### Backend Issues
- Check logs in Render dashboard
- Verify `DATABASE_URL` is correct
- Ensure PostgreSQL database is running

### Frontend Issues
- Check build logs for errors
- Verify `VITE_BACKEND_URL` points to correct backend
- Test API endpoints manually

### Database Issues
- Check database connection in backend logs
- Verify database credentials
- Ensure database is in same region as backend

## 🔧 Environment Variables Summary

### Backend Service
```
DATABASE_URL=postgresql://user:pass@host:port/db
NODE_ENV=production
```

### Frontend Service
```
VITE_BACKEND_URL=https://your-backend.onrender.com
```

## 📈 Monitoring

- **Render Dashboard**: Monitor service health and logs
- **GitHub Actions**: Check CI/CD pipeline status
- **Browser DevTools**: Debug frontend issues

## 🎯 Next Steps

1. **Custom Domain**: Add your own domain in Render settings
2. **SSL Certificate**: Automatically provided by Render
3. **Monitoring**: Set up uptime monitoring
4. **Scaling**: Upgrade to paid plans for better performance
5. **Database Backups**: Configure automatic backups

## 💡 Tips

- **Free Tier Limitations**: Services may sleep after 15 minutes of inactivity
- **Cold Starts**: First request after sleep may be slow
- **Logs**: Always check logs for debugging
- **Environment Variables**: Never commit secrets to Git

## 🆘 Support

- [Render Documentation](https://render.com/docs)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- Check the project's GitHub Issues for common problems
