# 🔧 Diagnóstico e Correção - ERR_CONNECTION_REFUSED

## 🚨 Problema Identificado

O site `jmfitnessstudio.com.br` está retornando `ERR_CONNECTION_REFUSED`, indicando que:

- O servidor pode estar offline
- O PM2 pode ter parado
- O Nginx pode estar com problemas
- As portas podem estar bloqueadas

## 🔍 Comandos para Diagnóstico

### 1. Conectar ao VPS e Verificar Status Geral

```bash
ssh root@147.79.86.73

# Verificar se o servidor está online
uptime

# Verificar uso de recursos
htop
# (pressione 'q' para sair)
```

### 2. Verificar Status do PM2

```bash
# Ver status de todos os processos
pm2 status

# Ver logs da aplicação
pm2 logs lista-de-espera

# Se não estiver rodando, reiniciar
cd /root/jm-lista-de-espera
pm2 start ecosystem.config.cjs
```

### 3. Verificar Status do Nginx

```bash
# Verificar se Nginx está rodando
systemctl status nginx

# Se não estiver ativo, iniciar
sudo systemctl start nginx
sudo systemctl enable nginx

# Testar configuração do Nginx
sudo nginx -t

# Reiniciar Nginx se necessário
sudo systemctl restart nginx
```

### 4. Verificar Portas e Conexões

```bash
# Verificar se as portas estão sendo escutadas
netstat -tlnp | grep :80
netstat -tlnp | grep :443
netstat -tlnp | grep :3000

# Ou usando ss (mais moderno)
ss -tlnp | grep :80
ss -tlnp | grep :443
ss -tlnp | grep :3000
```

### 5. Verificar Firewall

```bash
# Status do UFW
sudo ufw status

# Se estiver bloqueando, permitir as portas
sudo ufw allow 80
sudo ufw allow 443
sudo ufw allow 22
```

### 6. Verificar DNS (Do seu computador local)

```bash
# Testar resolução DNS
nslookup jmfitnessstudio.com.br
ping jmfitnessstudio.com.br

# Testar acesso direto ao IP
curl http://147.79.86.73
curl https://147.79.86.73
```

## 🛠️ Soluções Mais Comuns

### Solução 1: Reiniciar Tudo

```bash
ssh root@147.79.86.73

# Ir para o diretório
cd /root/jm-lista-de-espera

# Parar tudo
pm2 stop all
sudo systemctl stop nginx

# Verificar se nada está usando as portas
sudo fuser -k 80/tcp
sudo fuser -k 443/tcp
sudo fuser -k 3000/tcp

# Iniciar novamente
pm2 start ecosystem.config.cjs
sudo systemctl start nginx

# Verificar status
pm2 status
systemctl status nginx
```

### Solução 2: Recriar Configuração do Nginx

```bash
# Verificar configuração atual
sudo cat /etc/nginx/sites-available/lista-de-espera.conf

# Se necessário, recriar o arquivo
sudo nano /etc/nginx/sites-available/lista-de-espera.conf
```

**Conteúdo do arquivo Nginx:**

```nginx
server {
    listen 80;
    server_name jmfitnessstudio.com.br www.jmfitnessstudio.com.br;

    # Redirecionar HTTP para HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl;
    server_name jmfitnessstudio.com.br www.jmfitnessstudio.com.br;

    # Certificados SSL
    ssl_certificate /etc/letsencrypt/live/jmfitnessstudio.com.br/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/jmfitnessstudio.com.br/privkey.pem;

    # Configurações SSL
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;

    # Proxy para a aplicação Node.js
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### Solução 3: Verificar Certificado SSL

```bash
# Verificar status do certificado
sudo certbot certificates

# Se expirado, renovar
sudo certbot renew

# Reiniciar Nginx após renovação
sudo systemctl restart nginx
```

## ⚡ Script de Diagnóstico Rápido

```bash
#!/bin/bash
echo "🔍 Diagnóstico Rápido do Servidor"
echo "================================="

echo "📊 Status do Sistema:"
uptime

echo -e "\n🔄 Status do PM2:"
pm2 status

echo -e "\n🌐 Status do Nginx:"
systemctl status nginx --no-pager -l

echo -e "\n🔌 Portas em Uso:"
ss -tlnp | grep -E ':80|:443|:3000'

echo -e "\n🛡️ Status do Firewall:"
sudo ufw status

echo -e "\n📋 Processos da Aplicação:"
ps aux | grep -E 'node|nginx' | grep -v grep

echo -e "\n🗂️ Arquivos de Log Recentes:"
sudo tail -5 /var/log/nginx/error.log
```

## 🎯 Passos Recomendados

1. **Execute o diagnóstico completo**
2. **Reinicie os serviços** (PM2 e Nginx)
3. **Verifique os logs** para erros específicos
4. **Teste o acesso** novamente

Se ainda não funcionar, me envie a saída dos comandos de diagnóstico para uma análise mais detalhada!
