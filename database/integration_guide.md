# Guia de Integração - Banco de Dados

## 📋 Estrutura da Tabela

A tabela `assessment_history` foi criada para armazenar o histórico completo das avaliações de maturidade de TI, incluindo:

### 🏢 Informações da Empresa
- `company_name` - Nome da empresa
- `company_sector` - Setor de atuação

### 📊 Todas as 34 Práticas de TI
**Dimensão Estratégica (9 práticas):**
- gestao_estrategia, gestao_portfolio, gestao_projetos, gestao_financeira
- analise_negocios, gestao_riscos, gestao_fornecedores, gestao_arquitetura, gestao_relacionamentos

**Dimensão Operacional Core (12 práticas):**
- central_servicos, gestao_solicitacoes, gestao_incidentes, gestao_problemas
- gestao_nivel_servico, gestao_disponibilidade, gestao_capacidade_desempenho, monitoramento_eventos
- gestao_infra_plataforma, dev_gerenciamento_software, gestao_implantacao, gestao_ativos

**Dimensão Governança e Controle (8 práticas):**
- gestao_catalogo, design_servico, controle_mudancas, gestao_configuracao
- gestao_seguranca, validacao_teste, medicao_relatorios, gestao_continuidade

**Dimensão Capacidade e Conhecimento (4 práticas):**
- gestao_talentos, gestao_conhecimento, gestao_mudanca, gestao_implementacao

**Dimensão Melhoria (1 prática):**
- melhoria_continua

### 📈 Scores Calculados
- `total_score` - Score total ponderado
- `maturity_level` - Nível de maturidade (1-5)
- `score_estrategica`, `score_operacional`, `score_governanca`, `score_capacidade`, `score_melhoria`

## 🔧 Integração com React App

### 1. Função para Salvar Avaliação

```typescript
// src/utils/database.ts
export interface AssessmentRecord {
  companyName: string;
  companySector: string;
  answers: Record<string, number>;
  scores: Scores;
  aiAnalysisGenerated: boolean;
  pdfGenerated: boolean;
}

export const saveAssessmentToDatabase = async (data: AssessmentRecord) => {
  const payload = {
    company_name: data.companyName,
    company_sector: data.companySector,
    
    // Dimensão Estratégica
    gestao_estrategia: data.answers['gestao_estrategia'],
    gestao_portfolio: data.answers['gestao_portfolio'],
    gestao_projetos: data.answers['gestao_projetos'],
    gestao_financeira: data.answers['gestao_financeira'],
    analise_negocios: data.answers['analise_negocios'],
    gestao_riscos: data.answers['gestao_riscos'],
    gestao_fornecedores: data.answers['gestao_fornecedores'],
    gestao_arquitetura: data.answers['gestao_arquitetura'],
    gestao_relacionamentos: data.answers['gestao_relacionamentos'],
    
    // Dimensão Operacional Core
    central_servicos: data.answers['central_servicos'],
    gestao_solicitacoes: data.answers['gestao_solicitacoes'],
    gestao_incidentes: data.answers['gestao_incidentes'],
    gestao_problemas: data.answers['gestao_problemas'],
    gestao_nivel_servico: data.answers['gestao_nivel_servico'],
    gestao_disponibilidade: data.answers['gestao_disponibilidade'],
    gestao_capacidade_desempenho: data.answers['gestao_capacidade_desempenho'],
    monitoramento_eventos: data.answers['monitoramento_eventos'],
    gestao_infra_plataforma: data.answers['gestao_infra_plataforma'],
    dev_gerenciamento_software: data.answers['dev_gerenciamento_software'],
    gestao_implantacao: data.answers['gestao_implantacao'],
    gestao_ativos: data.answers['gestao_ativos'],
    
    // Dimensão Governança e Controle
    gestao_catalogo: data.answers['gestao_catalogo'],
    design_servico: data.answers['design_servico'],
    controle_mudancas: data.answers['controle_mudancas'],
    gestao_configuracao: data.answers['gestao_configuracao'],
    gestao_seguranca: data.answers['gestao_seguranca'],
    validacao_teste: data.answers['validacao_teste'],
    medicao_relatorios: data.answers['medicao_relatorios'],
    gestao_continuidade: data.answers['gestao_continuidade'],
    
    // Dimensão Capacidade e Conhecimento
    gestao_talentos: data.answers['gestao_talentos'],
    gestao_conhecimento: data.answers['gestao_conhecimento'],
    gestao_mudanca: data.answers['gestao_mudanca'],
    gestao_implementacao: data.answers['gestao_implementacao'],
    
    // Dimensão Melhoria
    melhoria_continua: data.answers['melhoria_continua'],
    
    // Metadados
    ai_analysis_generated: data.aiAnalysisGenerated,
    pdf_generated: data.pdfGenerated
  };

  try {
    const response = await fetch('/api/assessments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      throw new Error('Erro ao salvar avaliação');
    }

    return await response.json();
  } catch (error) {
    console.error('Erro ao salvar no banco:', error);
    throw error;
  }
};
```

### 2. Integração no App.tsx

```typescript
// No App.tsx, adicionar após gerar o relatório final
const handleSaveAssessment = async () => {
  if (allQuestionsAnswered && companyInfo.name && companyInfo.sector) {
    try {
      await saveAssessmentToDatabase({
        companyName: companyInfo.name,
        companySector: companyInfo.sector,
        answers: answers,
        scores: scores,
        aiAnalysisGenerated: !!aiAnalysis,
        pdfGenerated: true // ou controlar quando PDF é gerado
      });
      
      console.log('Avaliação salva com sucesso!');
    } catch (error) {
      console.error('Erro ao salvar avaliação:', error);
    }
  }
};

// Chamar automaticamente quando chegar no summary
useEffect(() => {
  if (step === 'summary' && allQuestionsAnswered) {
    handleSaveAssessment();
  }
}, [step, allQuestionsAnswered]);
```

### 3. API Backend (Node.js/Express exemplo)

```javascript
// server/routes/assessments.js
const express = require('express');
const mysql = require('mysql2/promise');
const router = express.Router();

// Configuração do banco
const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
};

// POST - Salvar nova avaliação
router.post('/', async (req, res) => {
  try {
    const connection = await mysql.createConnection(dbConfig);
    
    const query = `
      INSERT INTO assessment_history (
        company_name, company_sector,
        gestao_estrategia, gestao_portfolio, gestao_projetos, gestao_financeira,
        analise_negocios, gestao_riscos, gestao_fornecedores, gestao_arquitetura,
        gestao_relacionamentos, central_servicos, gestao_solicitacoes, gestao_incidentes,
        gestao_problemas, gestao_nivel_servico, gestao_disponibilidade, 
        gestao_capacidade_desempenho, monitoramento_eventos, gestao_infra_plataforma,
        dev_gerenciamento_software, gestao_implantacao, gestao_ativos, gestao_catalogo,
        design_servico, controle_mudancas, gestao_configuracao, gestao_seguranca,
        validacao_teste, medicao_relatorios, gestao_continuidade, gestao_talentos,
        gestao_conhecimento, gestao_mudanca, gestao_implementacao, melhoria_continua,
        ai_analysis_generated, pdf_generated
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    
    const values = [
      req.body.company_name,
      req.body.company_sector,
      req.body.gestao_estrategia,
      req.body.gestao_portfolio,
      // ... todos os outros campos
      req.body.ai_analysis_generated,
      req.body.pdf_generated
    ];
    
    const [result] = await connection.execute(query, values);
    await connection.end();
    
    res.json({ 
      success: true, 
      id: result.insertId,
      message: 'Avaliação salva com sucesso!' 
    });
    
  } catch (error) {
    console.error('Erro ao salvar avaliação:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Erro interno do servidor' 
    });
  }
});

// GET - Buscar histórico de avaliações
router.get('/', async (req, res) => {
  try {
    const connection = await mysql.createConnection(dbConfig);
    
    const [rows] = await connection.execute(`
      SELECT * FROM v_assessment_summary 
      ORDER BY assessment_date DESC 
      LIMIT 50
    `);
    
    await connection.end();
    res.json(rows);
    
  } catch (error) {
    console.error('Erro ao buscar avaliações:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

module.exports = router;
```

## 🚀 Próximos Passos

1. **Configurar banco de dados** (MySQL/PostgreSQL)
2. **Executar scripts SQL** na ordem:
   - `create_assessment_history.sql`
   - `insert_example.sql` (para testar)
3. **Implementar API backend** para salvar/buscar dados
4. **Integrar no React app** para salvar automaticamente
5. **Criar dashboard** para visualizar histórico
6. **Implementar comparações** entre avaliações

## 📊 Consultas Úteis Disponíveis

- Últimas avaliações realizadas
- Média de maturidade por setor
- Empresas com maior maturidade
- Análise de dimensões mais fracas
- Evolução temporal de uma empresa
- Práticas mais problemáticas
- Relatório executivo por período
- Benchmark por porte de empresa

## 🔒 Considerações de Segurança

- Validar todos os inputs antes de inserir
- Usar prepared statements (já implementado)
- Implementar autenticação se necessário
- Backup regular dos dados
- Logs de auditoria para alterações

## 📈 Métricas e Analytics

Com essa estrutura, você poderá:
- Acompanhar evolução da maturidade de TI no mercado
- Identificar tendências por setor
- Criar benchmarks de mercado
- Gerar insights para melhorias no produto
- Oferecer comparações históricas para clientes