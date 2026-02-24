# Script para crear repositorio en GitHub
Write-Host "===================================" -ForegroundColor Green
Write-Host "Setup GitHub Repository" -ForegroundColor Green
Write-Host "===================================" -ForegroundColor Green

# Verifica si GitHub CLI está instalado
$ghInstalled = Get-Command gh -ErrorAction SilentlyContinue

if (-not $ghInstalled) {
    Write-Host "GitHub CLI no está instalado." -ForegroundColor Red
    Write-Host "Descárgalo desde: https://cli.github.com/" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Presiona cualquier tecla para continuar con Git manual..."
    $null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
    
    Write-Host ""
    Write-Host "Instrucciones para configurar Git manualmente:" -ForegroundColor Cyan
    Write-Host "1. Ve a https://github.com/new" -ForegroundColor White
    Write-Host "2. Crea un repositorio llamado 'GreenBite-cafe'" -ForegroundColor White
    Write-Host "3. NO inicialices con README" -ForegroundColor White
    Write-Host "4. Copia la URL del repositorio" -ForegroundColor White
    Write-Host "5. Ejecuta estos comandos:" -ForegroundColor White
    Write-Host ""
    Write-Host "   git remote add origin https://github.com/TU-USUARIO/GreenBite-cafe.git" -ForegroundColor Yellow
    Write-Host "   git branch -M main" -ForegroundColor Yellow
    Write-Host "   git push -u origin main" -ForegroundColor Yellow
    exit
}

# Verifica autenticación
Write-Host "Verificando autenticación de GitHub..." -ForegroundColor Cyan
gh auth status

if ($LASTEXITCODE -ne 0) {
    Write-Host "No estás autenticado. Iniciando login..." -ForegroundColor Yellow
    gh auth login
}

# Crea el repositorio
Write-Host "Creando repositorio en GitHub..." -ForegroundColor Cyan
gh repo create GreenBite-cafe --public --source=. --description "Sitio web ficticio para GreenBite Café - Cafetería eco-friendly" --push

Write-Host "===================================" -ForegroundColor Green
Write-Host "¡Repositorio creado exitosamente!" -ForegroundColor Green
Write-Host "===================================" -ForegroundColor Green
