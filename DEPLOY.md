# Deploy na Vercel - Lista de Espera

## 🚀 Passos para Deploy

### 🎯 Opção 1: Deploy Rápido via CLI

```bash
# 1. Fazer build
npm run deploy

# 2. Instalar Vercel CLI (se não tiver)
npm i -g vercel

# 3. Login na Vercel
vercel login

# 4. Deploy
vercel --prod
```

### 🎯 Opção 2: Deploy via GitHub (Recomendado)

1. **Criar repositório no GitHub**:

   ```bash
   git init
   git add .
   git commit -m "Initial commit - Lista de Espera"
   git branch -M main
   git remote add origin https://github.com/SEU_USERNAME/jm-lista-de-espera.git
   git push -u origin main
   ```

2. **Conectar na Vercel**:
   - Acesse [vercel.com](https://vercel.com)
   - Faça login com GitHub
   - Clique em "New Project"
   - Importe o repositório `jm-lista-de-espera`
   - A Vercel detectará automaticamente as configurações

### 📁 Arquivos de Configuração Criados

✅ **vercel.json** - Configurações da Vercel
✅ **vite.config.ts** - Otimizado para produção
✅ **manifest.json** - PWA configurado
✅ **deploy.sh/deploy.bat** - Scripts de deploy
✅ **.gitignore** - Arquivos ignorados
✅ **package.json** - Script `npm run deploy`

### 🔧 Configurações Automáticas

A Vercel detectará automaticamente:

- ✅ **Framework**: Vite
- ✅ **Build Command**: `npm run build`
- ✅ **Output Directory**: `dist`
- ✅ **Install Command**: `npm install`
- ✅ **Node Version**: Latest LTS

### 📱 Funcionalidades Pós-Deploy

- ✅ **PWA**: Pode ser instalada como app
- ✅ **HTTPS**: Certificado automático
- ✅ **CDN Global**: Entrega rápida
- ✅ **SPA Routing**: Navegação funcionando
- ✅ **Responsivo**: Mobile/Tablet/Desktop
- ✅ **Offline**: LocalStorage funciona offline

## 🌐 URLs Após Deploy

- **Produção**: `https://jm-lista-de-espera.vercel.app`
- **Preview**: `https://jm-lista-de-espera-git-branch.vercel.app`

## ⚡ Scripts Disponíveis

```bash
npm run dev      # Desenvolvimento
npm run build    # Build de produção
npm run preview  # Preview local do build
npm run deploy   # Build + instrução de deploy
npm run lint     # Verificar código
```

## 🛠️ Build Information

```
✓ 41 modules transformed.
dist/index.html                   0.74 kB │ gzip:  0.40 kB
dist/assets/index-DRJNxuLz.css   10.81 kB │ gzip:  2.59 kB
dist/assets/vendor-Dfoqj1Wf.js   11.69 kB │ gzip:  4.17 kB
dist/assets/index-BOUCMKef.js   194.98 kB │ gzip: 61.19 kB
```

## 🎨 Recursos Incluídos

- **Tema**: Fundo escuro com detalhes dourados
- **Responsividade**: Mobile-first design
- **PWA**: Installable web app
- **TypeScript**: Tipagem completa
- **CSS Modules**: Estilos isolados
- **LocalStorage**: Persistência offline

## 🔄 Atualizações Automáticas

Após conectar com GitHub:

- ✅ **Auto-deploy** em push para `main`
- ✅ **Preview** automático para PRs
- ✅ **Rollback** com um clique
- ✅ **Analytics** de performance

## 📞 Suporte e Links

- [Documentação Vercel](https://vercel.com/docs)
- [Vite + Vercel Guide](https://vercel.com/guides/deploying-vite-to-vercel)
- [PWA Documentation](https://web.dev/progressive-web-apps/)

---

## ✅ Checklist Final

- [x] Build sem erros
- [x] Preview funcionando
- [x] Responsividade testada
- [x] PWA configurado
- [x] Arquivos de deploy criados
- [x] Scripts automatizados
- [x] Documentação completa

**🎉 Projeto pronto para deploy!**
