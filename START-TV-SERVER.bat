@echo off
title NaazTV server
:: ask for admin once (needed so the TV can reach the laptop)
net session >nul 2>&1
if %errorlevel% neq 0 (
  powershell -NoProfile -Command "Start-Process -FilePath '%~f0' -Verb RunAs"
  exit /b
)
cd /d "%~dp0"
:: allow port 8080 through Windows Firewall (only added the first time)
netsh advfirewall firewall show rule name="NaazTV 8080" >nul 2>&1 || netsh advfirewall firewall add rule name="NaazTV 8080" dir=in action=allow protocol=TCP localport=8080 profile=any >nul
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0serve.ps1" -Port 8080
pause
