@echo off
set SLI_FILE=%1
set KEY_FILE=%2
set VENDOR=%3
set USE_OTP=%4
set OTP_FILE=%5

set BATFILEPATH=%~dp0
set BACKENDEXE=%BATFILEPATH%/program__v10.bat
set BACKENDLOG=%BATFILEPATH%/plog.txt

echo start /wait cmd.exe /c %BACKENDEXE% %SLI_FILE% %KEY_FILE% %VENDOR% %USE_OTP% %OTP_FILE% >%BACKENDLOG%
start /wait cmd.exe /c %BACKENDEXE% %SLI_FILE% %KEY_FILE% %VENDOR% %USE_OTP% %OTP_FILE%
echo %ERRORLEVEL% >> %BACKENDLOG%
exit /B %ERRORLEVEL%