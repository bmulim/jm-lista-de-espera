# Lista de Espera - Sistema de Matrículas

Sistema completo de gerenciamento de lista de espera para matrículas com backend Express + SQLite e frontend React.

## 🚀 Principais Funcionalidades

✅ **Backend API Completa** com Express + SQLite  
✅ **Frontend React** responsivo e moderno  
✅ **Banco de dados SQLite** com persistência real  
✅ **Deploy VPS** preparado para Hostinger  
✅ **Backup automático** do banco de dados  
✅ **PM2** para gerenciamento de processos  
✅ **Nginx** configurado com SSL

## 🏗️ Arquitetura

- **Frontend**: React 19.1.1 + TypeScript + Vite
- **Backend**: Express.js + SQLite3 + TypeScript
- **Banco**: SQLite (arquivo único, fácil backup)
- **Deploy**: VPS com PM2 + Nginx + SSL

## 🚀 Execução Local

```bash
# Instalar dependências
npm install

# Desenvolvimento (frontend + backend)
npm run dev
```

- Frontend: http://localhost:5173
- Backend: http://localhost:3000
- API: http://localhost:3000/api

## 📦 Deploy no VPS

### Resumo Rápido:

```bash
# 1. No VPS
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt install -y nodejs nginx
sudo npm install -g pm2

# 2. Upload do projeto
scp -r . usuario@ip:/var/www/lista-de-espera/

# 3. No servidor
cd /var/www/lista-de-espera
npm install
npm run build
pm2 start ecosystem.config.cjs

# 4. Configurar Nginx
sudo cp nginx/lista-de-espera.conf /etc/nginx/sites-available/
sudo ln -s /etc/nginx/sites-available/lista-de-espera.conf /etc/nginx/sites-enabled/
sudo systemctl restart nginx
```

### Guia Completo:

📖 **[Ver DEPLOY-VPS.md](./DEPLOY-VPS.md)** - Guia passo a passo completo

## 📁 Estrutura

```
├── src/                # Frontend React
├── server/             # Backend Express
├── data/               # Banco SQLite
├── scripts/            # Scripts deploy
├── nginx/              # Config Nginx
└── ecosystem.config.cjs # Config PM2
```

## 🔗 API Endpoints

- `GET /api/students` - Listar estudantes
- `POST /api/students` - Criar estudante
- `PUT /api/students/:id/enroll` - Matricular
- `PUT /api/students/:id/unenroll` - Desmatricular
- `GET /health` - Health check

## 💾 Banco de Dados

SQLite com tabela `students`:

- ID único
- Nome, email (único), WhatsApp
- Objetivo, restrições de saúde
- Turno, status de matrícula
- Timestamps automáticos

## 🛠️ Scripts

```bash
npm run dev          # Desenvolvimento
npm run build        # Build produção
npm start            # Iniciar produção
npm run deploy       # Build + instrução
```

## 🔧 Configuração

Arquivo `.env`:

```env
PORT=3000
NODE_ENV=production
DB_PATH=./data/students.db
CORS_ORIGIN=https://seudominio.com
```

## 📱 Responsivo

- ✅ Desktop (grid 2 colunas)
- ✅ Tablet (layout adaptado)
- ✅ Mobile (otimizado para toque)

## 🎨 Design

- Tema escuro com detalhes dourados
- CSS Modules isolados
- Notificações em tempo real
- Interface intuitiva

## 🔐 Segurança

- Validação frontend + backend
- CORS configurado
- Headers de segurança
- SSL via Certbot
- Backup automático

## 📊 Recursos Incluídos

- Sistema de notificações
- Estatísticas em tempo real
- Ordenação cronológica
- Health check endpoint
- Logs estruturados
- Monitoramento PM2

---

## 🎯 Deploy VPS - Resumo

**Hostinger VPS pronto em 15 minutos:**

1. **Conectar**: `ssh user@ip`
2. **Instalar**: Node.js + PM2 + Nginx
3. **Upload**: Código para `/var/www/lista-de-espera`
4. **Build**: `npm install && npm run build`
5. **Iniciar**: `pm2 start ecosystem.config.cjs`
6. **Nginx**: Configurar proxy reverso
7. **SSL**: `sudo certbot --nginx`

**📖 Guia completo: [DEPLOY-VPS.md](./DEPLOY-VPS.md)**

---

**🎉 Sistema completo e pronto para produção!**
