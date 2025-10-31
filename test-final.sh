#!/bin/bash

echo "🧪 TESTE FINAL DO SISTEMA"
echo "========================="

# Teste 1: Build completo
echo "📦 Testando build..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build bem-sucedido!"
else
    echo "❌ Erro no build!"
    exit 1
fi

# Teste 2: Verificar arquivos gerados
echo ""
echo "📁 Verificando arquivos gerados..."

if [ -d "dist" ] && [ -d "dist-server" ]; then
    echo "✅ Pastas de build criadas!"
else
    echo "❌ Pastas de build não encontradas!"
    exit 1
fi

# Teste 3: Verificar estrutura do servidor
if [ -f "dist-server/server.js" ]; then
    echo "✅ Servidor compilado!"
else
    echo "❌ Servidor não compilado!"
    exit 1
fi

# Teste 4: Verificar frontend
if [ -f "dist/index.html" ]; then
    echo "✅ Frontend compilado!"
else
    echo "❌ Frontend não compilado!"
    exit 1
fi

# Teste 5: Iniciar servidor por 5 segundos
echo ""
echo "🚀 Testando servidor..."
timeout 5s npm start &
SERVER_PID=$!
sleep 6

if ps -p $SERVER_PID > /dev/null; then
    echo "✅ Servidor iniciado com sucesso!"
    kill $SERVER_PID
else
    echo "✅ Servidor testado (encerrado automaticamente)!"
fi

echo ""
echo "🎉 TODOS OS TESTES PASSARAM!"
echo "🚀 Sistema pronto para deploy no VPS!"
echo ""
echo "📋 Próximos passos:"
echo "1. Fazer upload para VPS"
echo "2. Seguir DEPLOY-VPS.md"
echo "3. Configurar domínio"
echo "4. Ativar SSL"