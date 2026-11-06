@echo off
echo Starting Utensil Calculator Phone App...
start msedge.exe --app="file:///%~dp0mobile_preview/index.html" --window-size=430,860
if %ERRORLEVEL% NEQ 0 (
    start chrome.exe --app="file:///%~dp0mobile_preview/index.html" --window-size=430,860
)
exit

