@echo off
echo 🧪 Testing Production URLs
echo ==========================
echo.

echo 🔗 Current Production URLs:
echo Frontend: https://devopsfinal-frontend1.onrender.com
echo Backend:  https://devopsfinal1.onrender.com
echo.

echo 📋 Test Options:
echo 1. Test All API Endpoints
echo 2. Open Frontend in Browser
echo 3. Open Backend Health Check
echo 4. Test New Blog API
echo 5. Test New Testimonials API
echo 6. Test All URLs in Browser
echo 7. Check Service Status
echo.

set /p choice="Choose option (1-7): "

if "%choice%"=="1" goto test_all_apis
if "%choice%"=="2" goto open_frontend
if "%choice%"=="3" goto open_health
if "%choice%"=="4" goto test_blog
if "%choice%"=="5" goto test_testimonials
if "%choice%"=="6" goto open_all
if "%choice%"=="7" goto check_status
goto invalid

:test_all_apis
echo.
echo 🧪 Testing All API Endpoints...
echo.

echo 1. Health Check:
curl -s https://devopsfinal1.onrender.com/api/health
echo.

echo 2. Profile:
curl -s https://devopsfinal1.onrender.com/api/profile
echo.

echo 3. Skills:
curl -s https://devopsfinal1.onrender.com/api/skills
echo.

echo 4. Projects:
curl -s https://devopsfinal1.onrender.com/api/projects
echo.

echo 5. Blog:
curl -s https://devopsfinal1.onrender.com/api/blog
echo.

echo 6. Testimonials:
curl -s https://devopsfinal1.onrender.com/api/testimonials
echo.

echo ✅ All API tests completed!
goto end

:open_frontend
echo.
echo 🎨 Opening Frontend...
start https://devopsfinal-frontend1.onrender.com
goto end

:open_health
echo.
echo 🏥 Opening Backend Health Check...
start https://devopsfinal1.onrender.com/api/health
goto end

:test_blog
echo.
echo 📝 Testing Blog API...
echo.
curl -s https://devopsfinal1.onrender.com/api/blog | jq .
echo.
echo Testing single blog post:
curl -s https://devopsfinal1.onrender.com/api/blog/1 | jq .
goto end

:test_testimonials
echo.
echo 💬 Testing Testimonials API...
echo.
curl -s https://devopsfinal1.onrender.com/api/testimonials | jq .
goto end

:open_all
echo.
echo 🌐 Opening all URLs in browser...
start https://devopsfinal-frontend1.onrender.com
timeout /t 2 /nobreak > nul
start https://devopsfinal1.onrender.com/api/health
timeout /t 2 /nobreak > nul
start https://devopsfinal1.onrender.com/api/profile
timeout /t 2 /nobreak > nul
start https://devopsfinal1.onrender.com/api/blog
goto end

:check_status
echo.
echo 📊 Service Status Check...
echo.
echo Frontend Status:
curl -I https://devopsfinal-frontend1.onrender.com 2>nul | findstr "HTTP"
echo.
echo Backend Status:
curl -I https://devopsfinal1.onrender.com/api/health 2>nul | findstr "HTTP"
echo.
echo ✅ Status check completed!
goto end

:invalid
echo.
echo ❌ Invalid choice. Please run the script again.
goto end

:end
echo.
echo 🔗 Production URLs:
echo Frontend: https://devopsfinal-frontend1.onrender.com
echo Backend:  https://devopsfinal1.onrender.com
echo.
echo Press any key to exit...
pause > nul
