#!/bin/bash

echo "🚀 Configurando Lista de Espera no VPS..."

# Verificar se Node.js está instalado
if ! command -v node &> /dev/null; then
    echo "❌ Node.js não está instalado. Instalando..."
    curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
    sudo apt-get install -y nodejs
fi

# Verificar se PM2 está instalado
if ! command -v pm2 &> /dev/null; then
    echo "📦 Instalando PM2..."
    sudo npm install -g pm2
fi

# Criar diretório da aplicação
APP_DIR="/var/www/lista-de-espera"
sudo mkdir -p $APP_DIR
sudo chown $USER:$USER $APP_DIR

echo "📁 Diretório da aplicação: $APP_DIR"
echo "✅ Configuração inicial concluída!"
echo ""
echo "Próximos passos:"
echo "1. Faça upload dos arquivos para $APP_DIR"
echo "2. Execute: cd $APP_DIR && npm install"
echo "3. Configure o arquivo .env"
echo "4. Execute: npm run build"
echo "5. Execute: pm2 start ecosystem.config.js"