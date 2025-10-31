#!/bin/bash

echo "🚀 Preparando deploy para Vercel..."

# Verificar se está no diretório correto
if [ ! -f "package.json" ]; then
    echo "❌ Erro: Execute este script no diretório raiz do projeto"
    exit 1
fi

echo "📦 Instalando dependências..."
npm install

echo "🔍 Verificando código..."
npm run lint

echo "🏗️ Fazendo build..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build realizado com sucesso!"
    echo ""
    echo "📋 Próximos passos para deploy:"
    echo "1. Instalar Vercel CLI: npm i -g vercel"
    echo "2. Fazer login: vercel login"
    echo "3. Deploy: vercel --prod"
    echo ""
    echo "🌐 Ou conecte o repositório GitHub na Vercel:"
    echo "   https://vercel.com/new"
    echo ""
    echo "📁 Arquivos gerados em: ./dist/"
    ls -la dist/
else
    echo "❌ Erro no build!"
    exit 1
fi