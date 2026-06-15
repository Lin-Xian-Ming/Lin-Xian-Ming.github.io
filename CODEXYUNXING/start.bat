@echo off
title Bazi Website Server
echo ============================================
echo   ?????? - ???...
echo ============================================
echo.
echo [1/2] ???????...
start /B "" "C:\Users\86172\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe" "D:\CODEXYUNXING\server.js"
timeout /t 2 /nobreak >nul
echo       ????: http://localhost:8080
echo.
echo [2/2] ??????...
echo       ????????...
echo.
ssh -o StrictHostKeyChecking=no -o ServerAliveInterval=10 -o ConnectTimeout=5 -R 80:localhost:8080 serveo.net
