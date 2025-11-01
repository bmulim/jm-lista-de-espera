# 🛠️ Correção: tsc: not found

## ❌ Problema

O comando `tsc` não foi encontrado no servidor, impedindo o build da aplicação.

## ✅ Soluções

### Solução 1: Instalar TypeScript Globalmente (Recomendado)

```bash
# No servidor VPS
npm install -g typescript

# Verificar se foi instalado
tsc --version

# Tentar o build novamente
npm run build
```

### Solução 2: Usar npx (Alternativa)

```bash
# Modificar temporariamente o comando
npx tsc -b && npx vite build

# Ou fazer build direto
npm run build:server
```

### Solução 3: Verificar/Reinstalar Dependências

```bash
# Limpar cache e reinstalar
rm -rf node_modules package-lock.json
npm install

# Tentar build novamente
npm run build
```

## 🎯 Comandos para Executar no Servidor

### Passo 1: Instalar TypeScript

```bash
npm install -g typescript
```

### Passo 2: Verificar Instalação

```bash
tsc --version
node --version
npm --version
```

### Passo 3: Fazer Build

```bash
cd /var/www/jm-lista-de-espera
npm run build
```

### Passo 4: Se Ainda Não Funcionar

```bash
# Reinstalar dependências locais
npm install typescript --save-dev

# Ou usar npx
npx tsc -b && npx vite build
```

## 🔍 Verificação Final

```bash
# Após o build bem-sucedido
ls -la dist/
ls -la dist-server/

# Reiniciar aplicação
pm2 restart ecosystem.config.cjs
pm2 status
```

## 💡 Explicação

O TypeScript precisa estar disponível para compilar os arquivos `.ts` para `.js`. A instalação global é a mais prática para o ambiente de produção.
