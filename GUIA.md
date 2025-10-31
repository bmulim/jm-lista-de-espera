# Lista de Espera - Sistema de Matrículas

Sistema de gerenciamento de lista de espera para matrículas desenvolvido com React + TypeScript + Vite.

## 🚀 Funcionalidades

- **Cadastro de Alunos**: Formulário completo com validação

  - Nome completo
  - E-mail
  - WhatsApp (com formatação automática)
  - Objetivo das aulas
  - Restrições de saúde (opcional)
  - Turno preferido (manhã, tarde, noite)

- **Lista de Espera Ordenada**:

  - Ordem cronológica de cadastro
  - Posição na fila para alunos não matriculados
  - Status visual de matriculado/aguardando

- **Gerenciamento de Matrículas**:

  - Marcar/desmarcar como matriculado
  - Data de matrícula automática
  - Estatísticas em tempo real

- **Persistência de Dados**:

  - Armazenamento no localStorage
  - Dados preservados entre sessões

- **Interface Responsiva**:
  - Design adaptável para PC, tablet e smartphone
  - Tema escuro com detalhes dourados
  - Notificações visuais de feedback

## 🎨 Design

- **Cores**: Fundo preto/cinza escuro com detalhes em dourado (#d4af37) e texto branco
- **Layout**: Header para logo, área principal flexível e footer
- **Responsividade**: Compatível com dispositivos móveis, tablets e desktop
- **CSS Modules**: Estilização isolada por componente

## 🛠️ Tecnologias

- React 19.1.1
- TypeScript 5.9.3
- Vite 7.1.7
- CSS Modules
- LocalStorage API

## 📱 Responsividade

O sistema foi desenvolvido com foco em responsividade:

- **Desktop**: Layout em grid com 2 colunas no formulário
- **Tablet** (≤768px): Layout em coluna única, botões adaptados
- **Smartphone** (≤480px): Interface otimizada para toque, texto reduzido

## 🚀 Executando o Projeto

```bash
# Instalar dependências
npm install

# Executar em desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview do build
npm run preview
```

## 📁 Estrutura do Projeto

```
src/
├── components/           # Componentes React
│   ├── Header/          # Cabeçalho com espaço para logo
│   ├── Footer/          # Rodapé
│   ├── StudentForm/     # Formulário de cadastro
│   ├── StudentList/     # Lista de estudantes
│   └── Notification/    # Notificações de feedback
├── services/            # Serviços (localStorage)
├── types/              # Tipos TypeScript
├── App.tsx             # Componente principal
└── main.tsx           # Ponto de entrada
```

## 💾 Armazenamento de Dados

Os dados são salvos automaticamente no localStorage do navegador com a chave `jm-lista-espera-students`. Isso permite que:

- Os dados persistam entre sessões
- Não seja necessário servidor/banco de dados
- O sistema funcione offline

## 🔧 Personalização

### Adicionando Logo

Para adicionar uma logo no header, coloque o arquivo de imagem na pasta `public/` e atualize o componente `App.tsx`:

```tsx
<Header logoSrc="/sua-logo.png" logoAlt="Sua Logo" />
```

### Modificando Cores

As cores principais estão definidas nos arquivos CSS. Para alterar:

- Cor dourada: `#d4af37`
- Fundo escuro: `#1a1a1a`
- Fundo principal: `#0d0d0d`

## 📋 Funcionalidades da Lista

1. **Ordenação Automática**: Alunos são organizados por data de cadastro
2. **Posição na Fila**: Exibe posição apenas para alunos não matriculados
3. **Status Visual**: Diferenciação clara entre matriculados e aguardando
4. **Ações Rápidas**: Botões para matricular, desmatricular e remover
5. **Estatísticas**: Contadores de aguardando, matriculados e total

## 🎯 Casos de Uso

- Academias e estúdios de dança
- Escolas de idiomas
- Cursos técnicos e profissionalizantes
- Qualquer negócio com lista de espera para matrículas

## 📝 Validações do Formulário

- **Nome**: Obrigatório
- **E-mail**: Obrigatório com formato válido
- **WhatsApp**: Obrigatório com formatação brasileira
- **Objetivo**: Obrigatório
- **Restrições de Saúde**: Opcional
- **Turno**: Seleção obrigatória

## 🔄 Fluxo de Uso

1. Acesse a aplicação
2. Clique em "Entrar na fila de espera"
3. Preencha o formulário
4. O aluno é adicionado à lista de espera
5. Na lista, gerencie as matrículas com os botões de ação
6. Acompanhe as estatísticas em tempo real

## 📞 Suporte

Para dúvidas ou sugestões, entre em contato através dos dados fornecidos na aplicação.
