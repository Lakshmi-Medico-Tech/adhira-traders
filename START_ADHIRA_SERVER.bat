@echo off
title ADHIRA PYROTECH BILLING & QUOTATION SYSTEM
echo ======================================================================
echo    ADHIRA PYROTECH - ADVANCED BILLING & QUOTATION SYSTEM
echo    Sivakasi, Tamil Nadu
echo ======================================================================
echo.
echo Starting Central Realtime Database Server on Port 3000...
echo.

start "" "http://localhost:3000"

node server.js

pause
