@echo off
title Utensil App - Phone Server
echo ========================================================
echo        UTENSIL APP - RUN DIRECTLY ON YOUR PHONE
echo ========================================================
echo.
echo Opening QR Code on your screen...
start msedge.exe --app="file:///%~dp0scan_phone.html" --window-size=500,750
if %ERRORLEVEL% NEQ 0 (
    start chrome.exe --app="file:///%~dp0scan_phone.html" --window-size=500,750
)
echo.
echo Server is running on port 8080.
echo Scan the QR code on your screen with your phone camera!
echo.
echo Keep this black window open while using the app.
echo ========================================================
python -m http.server 8080 --bind 0.0.0.0
pause
