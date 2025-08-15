# Professional Profile Landing Page

A complete full-stack professional profile landing page with ReactJS frontend, NodeJS + PostgreSQL backend, and CI/CD deployment to Render. Features a modern, responsive design with interactive elements and real backend integration.

## 🏗️ Project Structure

```
project-root/
├── backend/           ← NodeJS + Express + PostgreSQL
│   ├── index.js
│   └── package.json
├── frontend/          ← ReactJS profile page
│   ├── src/
│   │   ├── components/
│   │   │   └── ContactForm.jsx
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
├── .github/workflows/
│   ├── frontend.yml
│   └── backend.yml
└── README.md
```

## 🚀 Features

### Frontend
- ✅ **Modern React with Vite** - Fast development and build
- ✅ **Professional Profile Design** - Hero, About, Skills, Projects, Experience, Contact sections
- ✅ **Responsive Layout** - Mobile-first design with smooth animations
- ✅ **Interactive Elements** - Skill progress bars, project cards, timeline
- ✅ **Contact Form** - Functional form with validation and backend integration
- ✅ **Modern Typography** - Inter font with custom styling

### Backend
- ✅ **RESTful API** - Complete API endpoints for profile data
- ✅ **PostgreSQL Integration** - Database for messages and contact submissions
- ✅ **Contact Form Handler** - Save contact submissions to database
- ✅ **Error Handling** - Comprehensive error handling and validation
- ✅ **Health Checks** - Monitoring endpoints

### DevOps
- ✅ **CI/CD Pipeline** - GitHub Actions for automated testing and deployment
- ✅ **Auto Deploy** - Automatic deployment to Render on push
- ✅ **Environment Configuration** - Proper environment variable management

## 🛠️ Local Development

### Prerequisites
- Node.js 18+
- PostgreSQL (local or cloud)

### Backend Setup
```bash
cd backend
npm install
npm run dev
```

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

## 🌐 Deployment on Render

### Backend Deployment
1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click "New" → "Web Service"
3. Connect your GitHub repository
4. Configure:
   - **Root Directory**: `backend`
   - **Environment**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `node index.js`
   - **Environment Variables**:
     - `DATABASE_URL`: Your PostgreSQL connection string
     - `NODE_ENV`: `production`

### Frontend Deployment
1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click "New" → "Static Site"
3. Connect your GitHub repository
4. Configure:
   - **Root Directory**: `frontend`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`
   - **Environment Variables**:
     - `VITE_BACKEND_URL`: Your backend URL from Render

### Database Setup
1. Create a PostgreSQL database on Render
2. Copy the connection string
3. Add it as `DATABASE_URL` environment variable to your backend service

## 🔄 CI/CD Pipeline

The project includes GitHub Actions workflows that:

- **Frontend Pipeline**: Builds and tests the React app on every push
- **Backend Pipeline**: Tests the Node.js API and validates health endpoints
- **Auto Deploy**: Render automatically deploys when you push to main branch

## 📝 Environment Variables

### Backend
- `DATABASE_URL`: PostgreSQL connection string
- `NODE_ENV`: Set to `production` for production
- `PORT`: Port number (automatically set by Render)

### Frontend
- `VITE_BACKEND_URL`: Backend API URL

## 🧪 Testing

Run the health check endpoint:
```bash
curl https://your-backend.onrender.com/api/health
```

## 📱 API Endpoints

### Public Endpoints
- `GET /api/health` - Health check
- `GET /api/message` - Get welcome message from database
- `GET /api/profile` - Get profile information
- `GET /api/skills` - Get skills and technologies
- `GET /api/projects` - Get featured projects
- `GET /api/experience` - Get work experience
- `POST /api/contact` - Submit contact form

### Admin Endpoints
- `GET /api/admin/contacts` - Get all contact submissions (for admin use)

## 🎨 Customization

- Modify `frontend/src/App.jsx` for UI changes
- Update `backend/index.js` for API changes
- Customize styles in `frontend/src/App.css`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Push to your branch
5. Create a Pull Request

## 📄 License

This project is open source and available under the MIT License.
