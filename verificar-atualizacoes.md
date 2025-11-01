# 🔍 Diagnóstico: Atualizações Não Aparecem

## 🕵️ Possíveis Causas

1. **Cache do navegador**
2. **Código não foi atualizado no servidor**
3. **Build não foi feito**
4. **PM2 não foi reiniciado**
5. **Nginx com cache**

## 🛠️ Comandos para Verificar e Corrigir

### 1. No Servidor VPS - Verificar Estado Atual

```bash
# Conectar ao servidor
ssh root@147.79.86.73

# Ir para o diretório
cd /var/www/jm-lista-de-espera

# Verificar se o código foi atualizado
git log --oneline -5

# Verificar último commit
git show --name-only

# Verificar se as mudanças estão no arquivo
grep -n "Entrar na fila de espera" src/App.tsx
grep -n "Entrar na fila de espera" src/components/StudentForm/StudentForm.tsx
```

### 2. Atualizar Código (se necessário)

```bash
# Fazer pull das últimas mudanças
git pull origin main

# Verificar se atualizou
git log --oneline -2
```

### 3. Fazer Build Completo

```bash
# Instalar TypeScript se ainda não tiver
npm install -g typescript

# Limpar builds anteriores
rm -rf dist dist-server

# Fazer build completo
npm run build

# Verificar se o build foi criado
ls -la dist/
ls -la dist-server/
```

### 4. Reiniciar Aplicação

```bash
# Reiniciar PM2
pm2 restart ecosystem.config.cjs

# Verificar se está rodando
pm2 status

# Ver logs para verificar se carregou
pm2 logs lista-de-espera --lines 20
```

### 5. Limpar Cache do Nginx (se aplicável)

```bash
# Reiniciar Nginx para limpar qualquer cache
sudo systemctl restart nginx

# Verificar status
sudo systemctl status nginx
```

## 🌐 No Navegador - Limpar Cache

### Opção 1: Hard Refresh
- **Chrome/Edge**: `Ctrl + Shift + R`
- **Firefox**: `Ctrl + F5`

### Opção 2: Limpar Cache Manualmente
1. Abrir Developer Tools (`F12`)
2. Clicar com botão direito no botão refresh
3. Selecionar "Empty Cache and Hard Reload"

### Opção 3: Modo Incógnito
- Abrir uma aba incógnita/privada
- Acessar o site para ver se aparece

## 📋 Script Completo de Verificação

```bash
#!/bin/bash
echo "🔍 Verificando estado das atualizações..."

echo "📁 Último commit:"
git log --oneline -1

echo -e "\n🔍 Verificando arquivos alterados:"
grep -n "Entrar na fila de espera" src/App.tsx || echo "❌ Não encontrado em App.tsx"
grep -n "Entrar na fila de espera" src/components/StudentForm/StudentForm.tsx || echo "❌ Não encontrado em StudentForm.tsx"

echo -e "\n📦 Verificando builds:"
ls -la dist/ | head -5
ls -la dist-server/ | head -5

echo -e "\n🔄 Status PM2:"
pm2 status

echo -e "\n📋 Logs recentes:"
pm2 logs lista-de-espera --lines 5 --nostream
```

## 🎯 Passos Recomendados

1. **Execute o script de verificação acima**
2. **Se o código não estiver atualizado**: `git pull origin main`
3. **Se não tiver build**: `npm run build`
4. **Se PM2 não estiver rodando**: `pm2 restart ecosystem.config.cjs`
5. **Limpe o cache do navegador**: `Ctrl + Shift + R`

## 🧪 Teste Rápido

Para confirmar se funcionou:
1. Acesse: http://147.79.86.73 (direto pelo IP)
2. Procure pelo texto "Entrar na fila de espera"
3. Se aparecer, o problema é cache do navegador
4. Se não aparecer, o problema é no servidor