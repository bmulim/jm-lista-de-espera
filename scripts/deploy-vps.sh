#!/bin/bash

echo "🚀 Executando deploy no VPS..."

# Configurações
APP_DIR="/var/www/lista-de-espera"
BACKUP_DIR="/var/backups/lista-de-espera"
LOG_DIR="$APP_DIR/logs"

# Criar diretórios necessários
sudo mkdir -p $BACKUP_DIR
sudo mkdir -p $LOG_DIR
sudo chown $USER:$USER $LOG_DIR

# Fazer backup do banco de dados (se existir)
if [ -f "$APP_DIR/data/students.db" ]; then
    echo "📦 Fazendo backup do banco de dados..."
    sudo cp "$APP_DIR/data/students.db" "$BACKUP_DIR/students_$(date +%Y%m%d_%H%M%S).db"
fi

# Parar a aplicação
echo "⏹️ Parando aplicação..."
pm2 stop lista-de-espera || echo "App não estava rodando"

# Instalar dependências
echo "📦 Instalando dependências..."
cd $APP_DIR
npm ci --production

# Build da aplicação
echo "🏗️ Fazendo build..."
npm run build

# Configurar variáveis de ambiente
echo "⚙️ Configurando ambiente..."
if [ ! -f ".env" ]; then
    cp .env.example .env
    echo "⚠️ Configure o arquivo .env com suas configurações!"
fi

# Verificar se o diretório de dados existe
mkdir -p data

# Iniciar aplicação
echo "🎯 Iniciando aplicação..."
pm2 start ecosystem.config.js

# Configurar para iniciar automaticamente
pm2 startup
pm2 save

echo "✅ Deploy concluído!"
echo "📱 Aplicação rodando em: http://localhost:3000"
echo "📊 Monitorar com: pm2 monit"
echo "📋 Logs: pm2 logs lista-de-espera"