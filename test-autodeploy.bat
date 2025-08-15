@echo off
echo 🧪 Testing Auto-Deploy via GitHub Actions
echo ==========================================
echo.

echo 📋 Available Test Options:
echo 1. Test Backend Auto-Deploy
echo 2. Test Frontend Auto-Deploy  
echo 3. Test Full Stack Auto-Deploy
echo 4. Make Small Backend Change
echo 5. Make Small Frontend Change
echo 6. View GitHub Actions Status
echo 7. View Render Dashboard
echo.

set /p choice="Choose option (1-7): "

if "%choice%"=="1" goto test_backend
if "%choice%"=="2" goto test_frontend
if "%choice%"=="3" goto test_fullstack
if "%choice%"=="4" goto change_backend
if "%choice%"=="5" goto change_frontend
if "%choice%"=="6" goto view_actions
if "%choice%"=="7" goto view_render
goto invalid

:test_backend
echo.
echo 🚀 Testing Backend Auto-Deploy...
echo Making a small change to backend...
echo.

REM Add timestamp to health endpoint
powershell -Command "(Get-Content backend/index.js) -replace 'Backend is running perfectly!', 'Backend is running perfectly! Updated at %date% %time%' | Set-Content backend/index.js"

echo ✅ Backend change made
goto commit_and_push

:test_frontend
echo.
echo 🎨 Testing Frontend Auto-Deploy...
echo Making a small change to frontend...
echo.

REM Update version in frontend
powershell -Command "(Get-Content frontend/src/App.jsx) -replace 'Version 1.1.0', 'Version 1.1.1 - Auto-Deploy Test' | Set-Content frontend/src/App.jsx"

echo ✅ Frontend change made
goto commit_and_push

:test_fullstack
echo.
echo 🔗 Testing Full Stack Auto-Deploy...
echo Making changes to both backend and frontend...
echo.

REM Update both
powershell -Command "(Get-Content backend/index.js) -replace 'Backend is running perfectly!', 'Backend is running perfectly! Full stack test at %date% %time%' | Set-Content backend/index.js"
powershell -Command "(Get-Content frontend/src/App.jsx) -replace 'Version 1.1.0', 'Version 1.2.0 - Full Stack Test' | Set-Content frontend/src/App.jsx"

echo ✅ Both backend and frontend changes made
goto commit_and_push

:change_backend
echo.
echo 🔧 Making Small Backend Change...
echo.

REM Add a new API endpoint
echo. >> backend/index.js
echo // Auto-deploy test endpoint >> backend/index.js
echo app.get('/api/test-deploy', (req, res) => { >> backend/index.js
echo   res.json({ message: 'Auto-deploy test successful!', timestamp: new Date().toISOString() }); >> backend/index.js
echo }); >> backend/index.js

echo ✅ New test endpoint added to backend
goto commit_and_push

:change_frontend
echo.
echo 🎨 Making Small Frontend Change...
echo.

REM Add a test indicator
powershell -Command "(Get-Content frontend/src/App.jsx) -replace 'CI/CD Ready!', 'CI/CD Ready! Auto-Deploy Active 🚀' | Set-Content frontend/src/App.jsx"

echo ✅ Frontend indicator updated
goto commit_and_push

:commit_and_push
echo.
echo 📤 Committing and pushing changes...
echo.

git add .
git commit -m "🧪 Auto-deploy test: %date% %time%"
git push origin main

echo.
echo ✅ Changes pushed to GitHub!
echo.
echo 🔗 GitHub Actions should now trigger auto-deployment
echo 📊 Monitor progress at: https://github.com/xuankientr/devopsfinal/actions
echo 🚀 Check Render deployment at: https://dashboard.render.com
echo.
goto end

:view_actions
echo.
echo 🔗 Opening GitHub Actions...
start https://github.com/xuankientr/devopsfinal/actions
goto end

:view_render
echo.
echo 🚀 Opening Render Dashboard...
start https://dashboard.render.com
goto end

:invalid
echo.
echo ❌ Invalid choice. Please run the script again.
goto end

:end
echo.
echo Press any key to exit...
pause > nul
