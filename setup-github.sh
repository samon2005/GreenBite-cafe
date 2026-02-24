#!/bin/bash

# Script para crear repositorio en GitHub
echo "==================================="
echo "Setup GitHub Repository"
echo "==================================="

# Verifica si GitHub CLI está instalado
if ! command -v gh &> /dev/null; then
    echo "GitHub CLI no está instalado."
    echo "Descárgalo desde: https://cli.github.com/"
    exit 1
fi

# Verifica autenticación
echo "Verificando autenticación de GitHub..."
gh auth status

if [ $? -ne 0 ]; then
    echo "No estás autenticado. Iniciando login..."
    gh auth login
fi

# Crea el repositorio
echo "Creando repositorio en GitHub..."
gh repo create GreenBite-cafe --public --source=. --description "Sitio web ficticio para GreenBite Café - Cafetería eco-friendly" --push

echo "==================================="
echo "¡Repositorio creado exitosamente!"
echo "==================================="
