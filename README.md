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
- ✅ **Integration Tests** - Full stack testing with PostgreSQL
- ✅ **Environment Configuration** - Proper environment variable management
- ✅ **Build Validation** - Automated build and API testing
- ✅ **Deployment Monitoring** - Real-time deployment status

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

The project includes comprehensive GitHub Actions workflows:

### 🎨 Frontend Pipeline (`.github/workflows/frontend.yml`)
- **Triggers**: Push/PR to `frontend/**` or workflow file changes
- **Tests**: Package validation, build testing, artifact upload
- **Build**: Creates optimized production build with environment variables
- **Deploy**: Auto-deploy to Render Static Site

### 🚀 Backend Pipeline (`.github/workflows/backend.yml`)
- **Triggers**: Push/PR to `backend/**` or workflow file changes
- **Tests**: Syntax validation, API health checks, endpoint testing
- **Validation**: Ensures all API endpoints respond correctly
- **Deploy**: Auto-deploy to Render Web Service

### 🔗 Integration Tests (`.github/workflows/integration-test.yml`)
- **Full Stack Testing**: Tests complete application flow
- **Database**: Spins up PostgreSQL for realistic testing
- **API Testing**: Validates all endpoints including contact form
- **Build Validation**: Ensures frontend builds with backend integration

### 🧪 Local Testing
```bash
# Run local tests before pushing
test-local.bat        # Windows
./test-local.sh       # Linux/Mac

# Or test individual components
npm run dev           # Start both frontend and backend
```

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
curl https://devopsfinal1.onrender.com/api/health
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

## 🔗 Live URLs

### Production Deployment
- **Frontend**: https://devopsfinal-frontend1.onrender.com
- **Backend API**: https://devopsfinal1.onrender.com
- **API Health Check**: https://devopsfinal1.onrender.com/api/health

### API Endpoints
- **Profile**: https://devopsfinal1.onrender.com/api/profile
- **Skills**: https://devopsfinal1.onrender.com/api/skills
- **Projects**: https://devopsfinal1.onrender.com/api/projects
- **Blog**: https://devopsfinal1.onrender.com/api/blog
- **Testimonials**: https://devopsfinal1.onrender.com/api/testimonials

## 📄 License

This project is open source and available under the MIT License.
