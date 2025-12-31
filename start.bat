@echo off
echo Starting AI Chat Application...
echo.

REM Check if .env exists
if not exist "server\.env" (
    echo ERROR: server\.env file not found!
    echo Please create server\.env with your GROQ_API_KEY
    echo.
    echo Example:
    echo GROQ_API_KEY=your_key_here
    echo PORT=5000
    pause
    exit /b 1
)

echo Starting backend server...
start cmd /k "cd server && npm start"

timeout /t 3 /nobreak > nul

echo Starting frontend dev server...
start cmd /k "cd client && npm run dev"

echo.
echo Both servers are starting!
echo Backend: http://localhost:5000
echo Frontend: http://localhost:5173
echo.
