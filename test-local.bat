@echo off
echo 🧪 Running Local Tests Before Deploy...
echo.

echo 📦 Installing dependencies...
call npm install
if %errorlevel% neq 0 (
    echo ❌ Root dependencies installation failed
    pause
    exit /b 1
)

echo.
echo 📦 Installing backend dependencies...
cd backend
call npm install
if %errorlevel% neq 0 (
    echo ❌ Backend dependencies installation failed
    pause
    exit /b 1
)

echo.
echo 📦 Installing frontend dependencies...
cd ../frontend
call npm install
if %errorlevel% neq 0 (
    echo ❌ Frontend dependencies installation failed
    pause
    exit /b 1
)

echo.
echo 🚀 Starting backend server for testing...
cd ../backend
start "Backend Test Server" cmd /k "npm start"

echo.
echo ⏳ Waiting for backend to start...
timeout /t 10 /nobreak > nul

echo.
echo 🧪 Testing backend APIs...
curl -f http://localhost:3001/api/health
if %errorlevel% neq 0 (
    echo ❌ Backend health check failed
    echo Make sure backend is running on port 3001
    pause
    exit /b 1
)

echo ✅ Backend health check passed!

curl -f http://localhost:3001/api/profile
if %errorlevel% neq 0 (
    echo ❌ Profile API test failed
    pause
    exit /b 1
)

echo ✅ Profile API test passed!

echo.
echo 🏗️ Testing frontend build...
cd ../frontend
call npm run build
if %errorlevel% neq 0 (
    echo ❌ Frontend build failed
    pause
    exit /b 1
)

echo ✅ Frontend build successful!

echo.
echo 🎉 All local tests passed!
echo 🚀 Ready to push to GitHub and trigger CI/CD
echo.
echo Press any key to continue...
pause > nul
