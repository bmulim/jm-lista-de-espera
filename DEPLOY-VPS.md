# Deploy no VPS Hostinger - Lista de Espera

## 🎯 Visão Geral

Este guia explica como fazer deploy da aplicação Lista de Espera em um VPS da Hostinger usando SQLite como banco de dados.

## 📋 Pré-requisitos

- VPS Hostinger com Ubuntu/Debian
- Domínio configurado (opcional)
- Acesso SSH ao servidor

## 🚀 Passo a Passo para Deploy

### 1. **Conectar ao VPS**

```bash
ssh root@SEU_IP_VPS
# ou
ssh usuario@SEU_IP_VPS
```

### 2. **Atualizar o Sistema**

```bash
sudo apt update && sudo apt upgrade -y
sudo apt install curl wget git nginx -y
```

### 3. **Instalar Node.js (LTS)**

```bash
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt-get install -y nodejs
node --version  # Verificar instalação
npm --version   # Verificar npm
```

### 4. **Instalar PM2 (Process Manager)**

```bash
sudo npm install -g pm2
pm2 --version  # Verificar instalação
```

### 5. **Configurar Diretório da Aplicação**

```bash
sudo mkdir -p /var/www/lista-de-espera
sudo chown $USER:$USER /var/www/lista-de-espera
cd /var/www/lista-de-espera
```

### 6. **Upload dos Arquivos**

**Opção A: Via Git (Recomendado)**

```bash
git clone https://github.com/SEU_USUARIO/jm-lista-de-espera.git .
```

**Opção B: Via SCP/SFTP**

```bash
# Do seu computador local:
scp -r . usuario@SEU_IP:/var/www/lista-de-espera/
```

### 7. **Instalar Dependências**

```bash
cd /var/www/lista-de-espera
npm install
```

### 8. **Configurar Variáveis de Ambiente**

```bash
cp .env.example .env
nano .env
```

Edite o arquivo `.env`:

```env
PORT=3000
NODE_ENV=production
DB_PATH=./data/students.db
CORS_ORIGIN=https://seudominio.com
```

### 9. **Fazer Build da Aplicação**

```bash
npm run build
```

### 10. **Configurar PM2**

```bash
# Iniciar aplicação
pm2 start ecosystem.config.cjs

# Configurar para iniciar automaticamente
pm2 startup
pm2 save

# Verificar status
pm2 status
pm2 logs lista-de-espera
```

### 11. **Configurar Nginx**

```bash
sudo cp nginx/lista-de-espera.conf /etc/nginx/sites-available/
sudo ln -s /etc/nginx/sites-available/lista-de-espera.conf /etc/nginx/sites-enabled/
sudo rm /etc/nginx/sites-enabled/default
```

**Editar configuração:**

```bash
sudo nano /etc/nginx/sites-available/lista-de-espera.conf
```

Altere `seudominio.com` para seu domínio real.

**Testar e reiniciar Nginx:**

```bash
sudo nginx -t
sudo systemctl restart nginx
sudo systemctl enable nginx
```

### 12. **Configurar SSL (Opcional mas Recomendado)**

```bash
# Instalar Certbot
sudo apt install certbot python3-certbot-nginx -y

# Obter certificado SSL
sudo certbot --nginx -d seudominio.com -d www.seudominio.com

# Configurar renovação automática
sudo crontab -e
# Adicionar linha:
0 12 * * * /usr/bin/certbot renew --quiet
```

### 13. **Configurar Firewall**

```bash
sudo ufw allow OpenSSH
sudo ufw allow 'Nginx Full'
sudo ufw enable
sudo ufw status
```

## 🔧 Comandos Úteis

### **Gerenciamento da Aplicação**

```bash
# Ver status
pm2 status

# Ver logs
pm2 logs lista-de-espera

# Reiniciar
pm2 restart lista-de-espera

# Parar
pm2 stop lista-de-espera

# Monitoramento
pm2 monit
```

### **Deploy de Atualizações**

```bash
cd /var/www/lista-de-espera

# Fazer backup do banco
cp data/students.db data/backup_$(date +%Y%m%d_%H%M%S).db

# Atualizar código
git pull origin main

# Instalar dependências
npm install

# Build
npm run build

# Reiniciar
pm2 restart lista-de-espera
```

### **Backup do Banco de Dados**

```bash
# Backup manual
cp /var/www/lista-de-espera/data/students.db ~/backup_$(date +%Y%m%d_%H%M%S).db

# Backup automático (adicionar ao crontab)
0 2 * * * cp /var/www/lista-de-espera/data/students.db /var/backups/students_$(date +\%Y\%m\%d).db
```

## 📁 Estrutura no Servidor

```
/var/www/lista-de-espera/
├── dist/                 # Frontend buildado
├── dist-server/         # Backend buildado
├── data/               # Banco SQLite
│   └── students.db
├── logs/               # Logs da aplicação
├── nginx/              # Config Nginx
├── scripts/            # Scripts de deploy
├── server/             # Código do backend
├── src/                # Código do frontend
├── .env                # Variáveis de ambiente
├── ecosystem.config.cjs # Config PM2
└── package.json
```

## 🌐 URLs de Acesso

- **Frontend**: `https://seudominio.com`
- **API**: `https://seudominio.com/api/students`
- **Health Check**: `https://seudominio.com/health`

## 🛠️ Troubleshooting

### **Aplicação não inicia**

```bash
pm2 logs lista-de-espera
# Verificar erro nos logs
```

### **Erro 502 Bad Gateway**

```bash
# Verificar se a aplicação está rodando
pm2 status

# Verificar logs do Nginx
sudo tail -f /var/log/nginx/error.log
```

### **Banco de dados não funciona**

```bash
# Verificar permissões
ls -la /var/www/lista-de-espera/data/
sudo chown -R $USER:$USER /var/www/lista-de-espera/data/
```

### **Aplicação consumindo muita memória**

```bash
# Verificar uso de memória
pm2 monit

# Configurar limite no ecosystem.config.cjs
max_memory_restart: '500M'
```

## 📊 Monitoramento

### **Logs da Aplicação**

```bash
# Logs em tempo real
pm2 logs lista-de-espera --lines 50

# Logs do Nginx
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log
```

### **Métricas do Sistema**

```bash
# Uso de CPU e memória
htop

# Espaço em disco
df -h

# Status dos serviços
systemctl status nginx
systemctl status pm2-$USER
```

## 🔐 Segurança

### **Configurações Básicas**

```bash
# Alterar porta SSH (opcional)
sudo nano /etc/ssh/sshd_config
# Port 2222

# Desabilitar login root via SSH
sudo nano /etc/ssh/sshd_config
# PermitRootLogin no

# Reiniciar SSH
sudo systemctl restart sshd
```

### **Atualizações Automáticas**

```bash
sudo apt install unattended-upgrades -y
sudo dpkg-reconfigure unattended-upgrades
```

## 📞 Suporte

Para problemas específicos:

- Logs da aplicação: `pm2 logs lista-de-espera`
- Logs do sistema: `/var/log/syslog`
- Status dos serviços: `systemctl status nginx`

---

## ✅ Checklist Final

- [ ] VPS configurado
- [ ] Node.js instalado
- [ ] PM2 instalado
- [ ] Aplicação rodando
- [ ] Nginx configurado
- [ ] SSL configurado (se aplicável)
- [ ] Firewall configurado
- [ ] Backup automático configurado
- [ ] Monitoramento funcionando

**🎉 Aplicação pronta para produção!**
