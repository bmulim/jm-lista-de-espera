// Script para iniciar o servidor em produção
// Remove o "type": "module" temporariamente para executar CommonJS
const fs = require('fs');
const { exec } = require('child_process');

// Lê o package.json atual
const packageJson = JSON.parse(fs.readFileSync('./package.json', 'utf8'));

// Remove o type module temporariamente
delete packageJson.type;

// Escreve o package.json temporário
fs.writeFileSync('./package-temp.json', JSON.stringify(packageJson, null, 2));

// Renomeia os arquivos
fs.renameSync('./package.json', './package-original.json');
fs.renameSync('./package-temp.json', './package.json');

// Inicia o servidor
const server = exec('node dist-server/server.js', (error, stdout, stderr) => {
  // Restaura o package.json original
  fs.renameSync('./package.json', './package-temp.json');
  fs.renameSync('./package-original.json', './package.json');
  
  if (error) {
    console.error(`Erro: ${error}`);
    return;
  }
  if (stderr) {
    console.error(`stderr: ${stderr}`);
    return;
  }
  console.log(`stdout: ${stdout}`);
});

server.stdout.on('data', (data) => {
  console.log(data.toString());
});

server.stderr.on('data', (data) => {
  console.error(data.toString());
});

process.on('SIGINT', () => {
  server.kill('SIGINT');
  process.exit();
});