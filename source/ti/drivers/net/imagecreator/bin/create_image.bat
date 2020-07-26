set JSON_FILE=%1
set SLI_FILE=%2

set BATFILEPATH=%~dp0
set BACKENDEXE=%BATFILEPATH%/SLImageCreator.exe
set SDK_PATH=%~dp0\..\..\..\..\..\..\.

echo.
echo SDK	-- %SDK_PATH%
echo.

start /wait cmd.exe /c %BACKENDEXE% syscfg create_image --json %JSON_FILE% --sdk_path %SDK_PATH% --file %SLI_FILE%
rem %BACKENDEXE% syscfg create_image --json %JSON_FILE% --sdk_path %SDK_PATH% --file %SLI_FILE%

echo %errorlevel%
exit /B 1