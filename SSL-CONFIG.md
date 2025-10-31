# 🔐 Configuração SSL - Lista de Espera

## 📋 Pré-requisitos para SSL

✅ **VPS funcionando**  
✅ **Domínio apontando para o IP do VPS**  
✅ **Nginx configurado**  
✅ **Aplicação rodando (PM2)**

## 🌐 1. Configurar Domínio

**No painel da Hostinger ou seu provedor de domínio:**

```
Tipo: A
Nome: @
Valor: IP_DO_SEU_VPS

Tipo: A
Nome: www
Valor: IP_DO_SEU_VPS
```

**Aguarde propagação (até 24h, geralmente 1-2h)**

## 🔧 2. Instalar Certbot

```bash
# Conectar ao VPS
ssh root@SEU_IP_VPS

# Instalar Certbot
sudo apt update
sudo apt install certbot python3-certbot-nginx -y
```

## 🔐 3. Obter Certificado SSL

### Opção 1: SSL Automático (Recomendado)

```bash
# Substitua pelo seu domínio real (sem www duplicado)
sudo certbot --nginx -d jmfitnessstudio.com.br -d www.jmfitnessstudio.com.br
```

### Opção 2: SSL Manual

```bash
# Apenas obter certificado (sem configurar nginx)
sudo certbot certonly --nginx -d seudominio.com -d www.seudominio.com
```

## 📝 4. Exemplo de Configuração

**O Certbot perguntará:**

```
Email address: seu@email.com
Terms of Service: A (Accept)
Share email: N (No)
```

**Resultado esperado:**

```
Successfully received certificate.
Certificate is saved at: /etc/letsencrypt/live/seudominio.com/fullchain.pem
Key is saved at: /etc/letsencrypt/live/seudominio.com/privkey.pem
```

## 🔄 5. Configurar Renovação Automática

```bash
# Testar renovação
sudo certbot renew --dry-run

# Se OK, configurar cron
sudo crontab -e

# Adicionar esta linha (pressione 'i' para inserir):
0 12 * * * /usr/bin/certbot renew --quiet

# Salvar e sair (ESC, :wq, ENTER)
```

## 🏗️ 6. Configuração Nginx com SSL

**O arquivo `/etc/nginx/sites-available/lista-de-espera.conf` será automaticamente atualizado pelo Certbot para:**

```nginx
server {
    listen 80;
    server_name seudominio.com www.seudominio.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name seudominio.com www.seudominio.com;

    ssl_certificate /etc/letsencrypt/live/seudominio.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/seudominio.com/privkey.pem;
    include /etc/letsencrypt/options-ssl-nginx.conf;
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;

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

## ✅ 7. Verificar Configuração

```bash
# Testar configuração Nginx
sudo nginx -t

# Recarregar Nginx
sudo systemctl reload nginx

# Verificar status
sudo systemctl status nginx
```

## 🌐 8. Testar SSL

**Acesse no navegador:**

- ✅ `https://seudominio.com` (deve funcionar)
- ✅ `http://seudominio.com` (deve redirecionar para HTTPS)

**Ferramentas de teste:**

- SSL Labs: https://www.ssllabs.com/ssltest/
- SSL Checker: https://www.sslchecker.com/

## 🔧 9. Atualizar .env (Importante!)

```bash
# Editar arquivo de ambiente
nano /var/www/lista-de-espera/.env
```

**Atualizar para:**

```env
PORT=3000
NODE_ENV=production
DB_PATH=./data/students.db
CORS_ORIGIN=https://seudominio.com
```

```bash
# Reiniciar aplicação
pm2 restart lista-de-espera
```

## 🚨 Soluções de Problemas

### Erro: "DNS resolution failed"

```bash
# Verificar se domínio aponta para VPS
nslookup seudominio.com
ping seudominio.com
```

### Erro: "Port 80 already in use"

```bash
# Parar serviços que usam porta 80
sudo systemctl stop apache2  # se existir
sudo systemctl stop nginx
sudo systemctl start nginx
```

### Certificado não renova

```bash
# Verificar log
sudo tail -f /var/log/letsencrypt/letsencrypt.log

# Forçar renovação
sudo certbot renew --force-renewal
```

## 📋 Checklist Final SSL

- [ ] Domínio aponta para VPS
- [ ] Nginx configurado e rodando
- [ ] Certbot instalado
- [ ] Certificado SSL obtido
- [ ] Renovação automática configurada
- [ ] CORS_ORIGIN atualizado no .env
- [ ] Aplicação reiniciada
- [ ] HTTPS funcionando no navegador
- [ ] HTTP redireciona para HTTPS

## 🎉 Resultado Final

**Após seguir todos os passos:**

✅ **Site seguro com HTTPS**  
✅ **Certificado válido por 90 dias**  
✅ **Renovação automática**  
✅ **Redirecionamento HTTP → HTTPS**  
✅ **Nota A+ no SSL Labs**

**URL final: https://seudominio.com**
