@echo off
echo Starting Bazi server...
start /B "" "C:\Users\86172\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe" "D:\CODEXYUNXING\server.js"
timeout /t 3 /nobreak >nul
echo Creating public tunnel...
echo.
echo === Public URLs will appear below ===
echo.
ssh -o StrictHostKeyChecking=no -o ServerAliveInterval=30 -R 80:localhost:8080 nokey@localhost.run
pause
