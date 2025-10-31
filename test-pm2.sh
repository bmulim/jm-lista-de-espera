#!/bin/bash

echo "🧪 TESTE PM2 - ECOSYSTEM CONFIG"
echo "================================"

# Verificar se o arquivo existe
if [ -f "ecosystem.config.cjs" ]; then
    echo "✅ Arquivo ecosystem.config.cjs encontrado!"
else
    echo "❌ Arquivo ecosystem.config.cjs não encontrado!"
    exit 1
fi

# Testar sintaxe do arquivo
echo ""
echo "🔍 Testando sintaxe do arquivo..."
node -e "const config = require('./ecosystem.config.cjs'); console.log('✅ Sintaxe válida:', config.apps[0].name);"

if [ $? -eq 0 ]; then
    echo "✅ Arquivo PM2 válido!"
else
    echo "❌ Erro na configuração PM2!"
    exit 1
fi

echo ""
echo "🎉 Configuração PM2 pronta!"
echo "📋 Para usar no VPS:"
echo "    pm2 start ecosystem.config.cjs"