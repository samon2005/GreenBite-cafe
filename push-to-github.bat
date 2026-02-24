@echo off
echo ===================================
echo Subiendo codigo a GitHub
echo ===================================

REM Agregar el remote de GitHub (reemplaza TU-USUARIO con tu nombre de usuario)
echo.
echo Ingrese su nombre de usuario de GitHub:
set /p GITHUB_USER=

echo.
echo Agregando remote de GitHub...
git remote add origin https://github.com/%GITHUB_USER%/greenbite-cafe.git

echo.
echo Verificando branch actual...
git branch -M main

echo.
echo Subiendo codigo a GitHub...
git push -u origin main

echo.
echo ===================================
echo Codigo subido exitosamente!
echo ===================================
echo.
echo Tu repositorio esta en: https://github.com/%GITHUB_USER%/greenbite-cafe
echo.
pause
