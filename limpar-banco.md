# Como Limpar o Banco de Dados no VPS

## 🗃️ Opções para Limpar Dados de Teste

### Opção 1: Via SSH - Deletar Arquivo do Banco (Mais Simples)

```bash
# Conectar ao VPS
ssh root@147.79.86.73

# Parar a aplicação
cd /root/jm-lista-de-espera
pm2 stop ecosystem.config.cjs

# Fazer backup do banco atual (por segurança)
cp data/students.db data/backup_$(date +%Y%m%d_%H%M%S).db

# Deletar o banco atual
rm data/students.db

# Reiniciar a aplicação (ela criará um novo banco vazio)
pm2 start ecosystem.config.cjs

# Verificar se funcionou
pm2 logs
```

### Opção 2: Via SSH - Comando SQL para Limpar Tabela

```bash
# Conectar ao VPS
ssh root@147.79.86.73

# Parar a aplicação
cd /root/jm-lista-de-espera
pm2 stop ecosystem.config.cjs

# Acessar o banco SQLite
sqlite3 data/students.db

# Dentro do SQLite, executar:
DELETE FROM students;
.quit

# Reiniciar a aplicação
pm2 start ecosystem.config.cjs
```

### Opção 3: Via API - Script para Limpar (Mais Seguro)

```bash
# Criar script temporário no servidor
ssh root@147.79.86.73
cd /root/jm-lista-de-espera

# Criar arquivo de limpeza
cat > clean_database.js << 'EOF'
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, 'data', 'students.db');
const db = new sqlite3.Database(dbPath);

console.log('🗑️ Limpando banco de dados...');

db.run('DELETE FROM students', function(err) {
    if (err) {
        console.error('❌ Erro ao limpar:', err);
    } else {
        console.log(`✅ ${this.changes} registros removidos`);
    }

    // Verificar se está vazio
    db.all('SELECT COUNT(*) as total FROM students', (err, rows) => {
        if (err) {
            console.error('Erro ao verificar:', err);
        } else {
            console.log(`📊 Total de registros restantes: ${rows[0].total}`);
        }
        db.close();
    });
});
EOF

# Executar o script
node clean_database.js

# Remover o script
rm clean_database.js
```

## 🛡️ Recomendação de Segurança

**Use a Opção 1** (deletar arquivo) por ser mais simples e segura:

```bash
ssh root@147.79.86.73
cd /root/jm-lista-de-espera
pm2 stop ecosystem.config.cjs
cp data/students.db data/backup_$(date +%Y%m%d_%H%M%S).db
rm data/students.db
pm2 start ecosystem.config.cjs
```

## 🔍 Verificar se Funcionou

Após limpar, acesse:

- https://jmfitnessstudio.com.br
- A lista deve estar vazia
- Teste adicionar um novo estudante

## 📋 Comandos Rápidos de Verificação

```bash
# Ver status da aplicação
pm2 status

# Ver logs em tempo real
pm2 logs lista-de-espera

# Verificar se o banco existe
ls -la /root/jm-lista-de-espera/data/

# Verificar tamanho do arquivo de banco
du -h /root/jm-lista-de-espera/data/students.db
```

## ⚠️ Importante

- Sempre faça backup antes de limpar
- A aplicação criará automaticamente um novo banco vazio quando reiniciada
- O banco será recriado com a estrutura correta (tabela students)
- Não se preocupe, o sistema está preparado para isso
