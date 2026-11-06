@echo off
title Upload Utensil App to GitHub
echo ========================================================
echo         UPLOAD UTENSIL APP TO GITHUB FOR APK
echo ========================================================
echo.
echo 1. Go to https://github.com/new and create a new repository.
echo    (Name it e.g. "utensil-calculator")
echo 2. Copy the repository link (e.g. https://github.com/YOUR_USERNAME/utensil-calculator.git)
echo.
set /p REPO_URL="Paste your GitHub repository link here: "

if "%REPO_URL%"=="" (
    echo Error: No repository link provided.
    pause
    exit /b
)

echo.
echo Adding remote and pushing code...
git remote remove origin >nul 2>&1
git remote add origin %REPO_URL%
git branch -M main
git push -u origin main

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ========================================================
    echo SUCCESS! Code has been uploaded to GitHub!
    echo.
    echo GitHub Actions is now compiling your APK.
    echo Open your GitHub repo -> click the "Actions" tab ->
    echo Click the build -> Download "UtensilCalculator-APK"
    echo ========================================================
) else (
    echo.
    echo Push failed. Please check your GitHub link and credentials.
)

echo.
pause
