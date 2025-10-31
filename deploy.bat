@echo off
echo 🚀 Preparando deploy para Vercel...

REM Verificar se está no diretório correto
if not exist "package.json" (
    echo ❌ Erro: Execute este script no diretório raiz do projeto
    pause
    exit /b 1
)

echo 📦 Instalando dependências...
call npm install

echo 🔍 Verificando código...
call npm run lint

echo 🏗️ Fazendo build...
call npm run build

if %errorlevel% equ 0 (
    echo ✅ Build realizado com sucesso!
    echo.
    echo 📋 Próximos passos para deploy:
    echo 1. Instalar Vercel CLI: npm i -g vercel
    echo 2. Fazer login: vercel login
    echo 3. Deploy: vercel --prod
    echo.
    echo 🌐 Ou conecte o repositório GitHub na Vercel:
    echo    https://vercel.com/new
    echo.
    echo 📁 Arquivos gerados em: ./dist/
    dir dist
) else (
    echo ❌ Erro no build!
    pause
    exit /b 1
)

echo.
echo Pressione qualquer tecla para continuar...
pause > nul