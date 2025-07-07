# Aplicativo de Avaliação de Maturidade de TI

## 🚀 Sobre o Projeto

Ferramenta completa para avaliação do nível de maturidade de serviços de TI baseada nas melhores práticas do **ITIL v4** e frameworks de governança corporativa.

### ✨ Principais Características

- **34 Práticas de TI** completamente implementadas
- **5 Dimensões** estratégicas de avaliação
- **Análise com IA** integrada (Anthropic Claude + OpenAI)
- **Relatórios em PDF** com diagnóstico e roadmap
- **Interface moderna** com React e Tailwind CSS

## 🛠️ Tecnologias

- React 18.3.1 + TypeScript 5.5.3
- Tailwind CSS 3.4.1
- Vite 5.4.2
- Recharts (gráficos)
- Anthropic Claude 3 Sonnet (IA principal)
- OpenAI GPT-4 (IA fallback)

## 📦 Instalação

```bash
# Clone o repositório
git clone https://github.com/car2019sjc/Maturity-TI-DNX.git
cd Maturity-TI-DNX

# Instale as dependências
npm install

# Configure as variáveis de ambiente (opcional para IA)
cp .env.example .env
# Edite .env com suas chaves de API

# Execute em desenvolvimento
npm run dev
```

## 🔧 Scripts Disponíveis

```bash
npm run dev      # Servidor de desenvolvimento
npm run build    # Build para produção
npm run preview  # Preview do build
npm run lint     # Verificar código
```

## 🤖 Configuração da IA (Opcional)

Para habilitar análises com IA, configure as chaves no arquivo `.env`:

```env
# Anthropic Claude (Principal)
VITE_ANTHROPIC_API_KEY=sua-chave-aqui

# OpenAI GPT-4 (Fallback)
VITE_OPENAI_API_KEY=sk-sua-chave-aqui
```

## 📊 Dimensões Avaliadas

1. **Estratégica** (9 práticas) - 30% peso
2. **Operacional Core** (12 práticas) - 25% peso
3. **Governança e Controle** (8 práticas) - 20% peso
4. **Capacidade e Conhecimento** (4 práticas) - 15% peso
5. **Melhoria** (1 prática) - 10% peso

## 📄 Documentação

Consulte o arquivo [DOCUMENTATION.md](./DOCUMENTATION.md) para informações detalhadas sobre:
- Arquitetura do sistema
- Estrutura de componentes
- Guia de desenvolvimento
- Customização e extensão

## 🌐 Deploy

O aplicativo pode ser facilmente deployado em:
- Vercel
- Netlify
- GitHub Pages
- Qualquer servidor de arquivos estáticos

## 📝 Licença

Este projeto está sob a licença MIT.

## 👥 Contribuições

Contribuições são bem-vindas! Por favor:
1. Fork o projeto
2. Crie sua feature branch (`git checkout -b feature/MinhaFeature`)
3. Commit suas mudanças (`git commit -m 'Add: MinhaFeature'`)
4. Push para a branch (`git push origin feature/MinhaFeature`)
5. Abra um Pull Request

---

Desenvolvido com ❤️ para a comunidade de TI 