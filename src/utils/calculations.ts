import { assessmentData } from '../data/assessmentData';

export interface Scores {
  total: number;
  byDimension: Record<string, {
    name: string;
    score: number;
    weight: number;
  }>;
}

export interface CompanyInfo {
  name: string;
  sector: string;
}

export interface CriticalPoint {
  dimension: string;
  score: number;
  diagnosis: string;
  risks: string[];
  mitigations: string[];
}

export interface RoadmapPhase {
  phase: string;
  timeframe: string;
  actions: string[];
  kpis: string[];
}

export interface AIAnalysis {
  segment: string;
  organization: string;
  maturity_score: number;
  maturity_level: string;
  dimension_highlights: {
    fortes: string[];
    criticas: string[];
  };
  critical_points: CriticalPoint[];
  strategic_priorities: string[];
  main_risks: string[];
  roadmap: RoadmapPhase[];
  executive_summary: string;
  analysis: string;
  priorities: string[];
  risks: string[];
}

export const calculateScores = (answers: Record<string, number>): Scores => {
  const scores: Scores = {
    total: 0,
    byDimension: {}
  };

  assessmentData.dimensions.forEach(dim => {
    let dimensionScore = 0;
    const numPractices = dim.practices.length;
    if (numPractices === 0) return;

    dim.practices.forEach(practiceId => {
      const level = answers[practiceId] || 0;
      dimensionScore += level;
    });

    const avgDimensionScore = dimensionScore / numPractices;
    scores.byDimension[dim.id] = {
      name: dim.name,
      score: parseFloat(avgDimensionScore.toFixed(2)),
      weight: dim.weight,
    };
    
    scores.total += avgDimensionScore * dim.weight;
  });

  scores.total = parseFloat(scores.total.toFixed(2));
  return scores;
};

export const getMaturityLevel = (totalScore: number) => {
  return assessmentData.maturityLevels.find(l => 
    totalScore >= l.scoreRange[0] && totalScore <= l.scoreRange[1]
  ) || assessmentData.maturityLevels[0];
};

// Função para analisar pontos críticos (Agente 1: Analisador de Diagnóstico)
const analyzeAgent1 = (scores: Scores, companyInfo: CompanyInfo): CriticalPoint[] => {
  const criticalPoints: CriticalPoint[] = [];
  
  Object.values(scores.byDimension).forEach(dim => {
    if (dim.score < 3) {
      let diagnosis = '';
      let risks: string[] = [];
      let mitigations: string[] = [];
      
      // Análise específica por dimensão
      switch (dim.name) {
        case 'Dimensão Estratégica':
          diagnosis = 'Baixo alinhamento entre TI e negócio, falta de planejamento estratégico e gestão de portfólio inadequada.';
          risks = [
            'Investimentos em TI sem retorno mensurável',
            'Desalinhamento com objetivos organizacionais',
            'Dificuldade em justificar orçamento de TI'
          ];
          mitigations = [
            'Implementar governança de TI com comitê estratégico',
            'Criar metodologia de gestão de portfólio de projetos',
            'Estabelecer métricas de valor de negócio para TI'
          ];
          break;
          
        case 'Dimensão Operacional Core':
          diagnosis = 'Processos operacionais imaturos, alta reatividade e baixa previsibilidade na entrega de serviços.';
          risks = [
            'Interrupções frequentes nos serviços críticos',
            'Baixa satisfação dos usuários internos',
            'Custos operacionais elevados e imprevisíveis'
          ];
          mitigations = [
            'Implementar ITSM com foco em gestão de incidentes',
            'Estabelecer SLAs claros para serviços críticos',
            'Criar central de serviços estruturada'
          ];
          break;
          
        case 'Dimensão Governança e Controle':
          diagnosis = 'Controles inadequados, baixa rastreabilidade e riscos de conformidade não gerenciados.';
          risks = [
            'Exposição a riscos regulatórios e legais',
            'Mudanças descontroladas causando instabilidade',
            'Falta de evidências para auditorias'
          ];
          mitigations = [
            'Implementar controle de mudanças formal (CAB)',
            'Estabelecer políticas de segurança da informação',
            'Criar processos de gestão de configuração'
          ];
          break;
          
        case 'Dimensão Capacidade e Conhecimento':
          diagnosis = 'Dependência excessiva de pessoas-chave, conhecimento não documentado e baixa capacitação da equipe.';
          risks = [
            'Perda de conhecimento crítico com saída de colaboradores',
            'Baixa capacidade de resposta a demandas',
            'Dificuldade em escalar a operação'
          ];
          mitigations = [
            'Criar base de conhecimento estruturada',
            'Implementar programas de capacitação continuada',
            'Estabelecer processos de gestão de talentos'
          ];
          break;
          
        case 'Dimensão Melhoria':
          diagnosis = 'Ausência de cultura de melhoria contínua e processos iterativos estruturados.';
          risks = [
            'Estagnação dos processos e práticas',
            'Perda de competitividade organizacional',
            'Repetição de falhas e problemas'
          ];
          mitigations = [
            'Implementar ciclos de melhoria contínua (PDCA)',
            'Estabelecer métricas e indicadores de performance',
            'Criar cultura de feedback e aprendizado'
          ];
          break;
      }
      
      criticalPoints.push({
        dimension: dim.name,
        score: dim.score,
        diagnosis,
        risks,
        mitigations
      });
    }
  });
  
  return criticalPoints;
};

// Função para criar roadmap estratégico (Agente 2: Estratégia e Roadmap)
const analyzeAgent2 = (scores: Scores, criticalPoints: CriticalPoint[], companyInfo: CompanyInfo): RoadmapPhase[] => {
  const roadmap: RoadmapPhase[] = [
    {
      phase: 'Curto Prazo',
      timeframe: '1-3 meses',
      actions: [
        'Implementar ferramenta de Service Desk para centralização de atendimento',
        'Definir SLAs básicos para os 3 serviços mais críticos',
        'Estabelecer reuniões semanais de controle de mudanças',
        'Criar documentação básica dos processos principais'
      ],
      kpis: [
        'Tempo médio de resolução de incidentes',
        'Taxa de cumprimento de SLA',
        'Número de mudanças com falha',
        'Satisfação do usuário (NPS)'
      ]
    },
    {
      phase: 'Médio Prazo',
      timeframe: '4-6 meses',
      actions: [
        'Implementar gestão proativa de problemas e análise de causa raiz',
        'Estruturar catálogo de serviços de TI',
        'Desenvolver programa de capacitação técnica da equipe',
        'Estabelecer métricas de disponibilidade e capacidade'
      ],
      kpis: [
        'Redução de incidentes recorrentes (%)',
        'Cobertura do catálogo de serviços (%)',
        'Horas de treinamento por colaborador',
        'Disponibilidade dos serviços críticos (%)'
      ]
    },
    {
      phase: 'Longo Prazo',
      timeframe: '7-12 meses',
      actions: [
        'Implementar automação de processos repetitivos',
        'Desenvolver dashboards executivos com KPIs estratégicos',
        'Estabelecer programa de melhoria contínua estruturado',
        'Integrar TI com objetivos estratégicos do negócio'
      ],
      kpis: [
        'Índice de automação de processos (%)',
        'ROI dos investimentos em TI',
        'Número de melhorias implementadas/mês',
        'Alinhamento estratégico TI-Negócio (score)'
      ]
    }
  ];
  
  return roadmap;
};

// Função para chamar API de IA (OpenAI ou Anthropic)
const callAIAPI = async (prompt: string, useAnthropic: boolean = false): Promise<string> => {
  const openaiKey = import.meta.env.VITE_OPENAI_API_KEY;
  const anthropicKey = import.meta.env.VITE_ANTHROPIC_API_KEY;
  
  if (useAnthropic && anthropicKey && anthropicKey !== 'your_anthropic_api_key_here') {
    try {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': anthropicKey,
          'anthropic-version': '2023-06-01'
        },
        body: JSON.stringify({
          model: 'claude-3-sonnet-20240229',
          max_tokens: 2000,
          messages: [
            {
              role: 'user',
              content: prompt
            }
          ]
        })
      });

      if (!response.ok) {
        throw new Error(`Erro na API Anthropic: ${response.status}`);
      }

      const data = await response.json();
      return data.content[0]?.text || '';
    } catch (error) {
      console.warn('Erro ao chamar Anthropic, tentando OpenAI...', error);
    }
  }
  
  if (openaiKey && openaiKey !== 'your_openai_api_key_here') {
    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${openaiKey}`
        },
        body: JSON.stringify({
          model: 'gpt-4',
          messages: [
            {
              role: 'system',
              content: 'Você é um consultor especialista em ITIL v4 e governança de TI. Responda sempre em português brasileiro com análises detalhadas e práticas.'
            },
            {
              role: 'user',
              content: prompt
            }
          ],
          temperature: 0.7,
          max_tokens: 2000
        })
      });

      if (!response.ok) {
        throw new Error(`Erro na API OpenAI: ${response.status}`);
      }

      const data = await response.json();
      return data.choices[0]?.message?.content || '';
    } catch (error) {
      console.warn('Erro ao chamar OpenAI:', error);
    }
  }
  
  throw new Error('Nenhuma API de IA configurada ou disponível');
};

export const generateAIAnalysis = async (scores: Scores, companyInfo: CompanyInfo): Promise<AIAnalysis> => {
  const maturityLevel = getMaturityLevel(scores.total);
  
  // Classificar dimensões
  const strongDimensions = Object.values(scores.byDimension)
    .filter(d => d.score >= 3)
    .map(d => d.name.replace('Dimensão ', ''));
    
  const criticalDimensions = Object.values(scores.byDimension)
    .filter(d => d.score < 3)
    .map(d => d.name.replace('Dimensão ', ''));

  // Executar análise dos agentes
  const criticalPoints = analyzeAgent1(scores, companyInfo);
  const roadmap = analyzeAgent2(scores, criticalPoints, companyInfo);

  // Verificar se APIs estão configuradas
  const openaiKey = import.meta.env.VITE_OPENAI_API_KEY;
  const anthropicKey = import.meta.env.VITE_ANTHROPIC_API_KEY;
  
  let executiveSummary = '';
  let enhancedAnalysis = '';
  
  if ((openaiKey && openaiKey !== 'your_openai_api_key_here') || 
      (anthropicKey && anthropicKey !== 'your_anthropic_api_key_here')) {
    
    try {
      const aiPrompt = `Como consultor sênior especialista em ITIL v4, governança de TI e transformação digital, analise os seguintes dados da avaliação de maturidade de TI:

**DADOS DA AVALIAÇÃO:**
- Empresa: ${companyInfo.name}
- Setor: ${companyInfo.sector}
- Pontuação Total de Maturidade: ${scores.total}/5 (${Math.round((scores.total/5)*100)}%)
- Nível de Maturidade: ${maturityLevel.name}

**DIMENSÕES COM BOM DESEMPENHO:** ${strongDimensions.length > 0 ? strongDimensions.join(', ') : 'Nenhuma dimensão com pontuação >= 3'}

**DIMENSÕES CRÍTICAS (Score < 3):** ${criticalDimensions.length > 0 ? criticalDimensions.join(', ') : 'Nenhuma dimensão crítica identificada'}

**DIAGNÓSTICO DETALHADO:**
${criticalPoints.map(cp => `• ${cp.dimension}: ${cp.diagnosis}\n  Riscos: ${cp.risks.slice(0,2).join('; ')}`).join('\n')}

**INSTRUÇÕES PARA ANÁLISE:**

1. **RESUMO EXECUTIVO (3-4 parágrafos):**
   - Inicie com uma avaliação direta da situação atual específica para ${companyInfo.sector}
   - Identifique os 2-3 principais desafios críticos para este setor
   - Destaque as implicações estratégicas da maturidade atual no contexto competitivo
   - Finalize com uma recomendação clara de priorização

2. **ANÁLISE DETALHADA (4-5 parágrafos):**
   - **Contexto Setorial**: Como a maturidade atual impacta especificamente empresas de ${companyInfo.sector}
   - **Gaps Críticos**: Análise dos déficits mais impactantes considerando os riscos do setor
   - **Correlações de Risco**: Como as dimensões críticas se relacionam e amplificam riscos
   - **Oportunidades Específicas**: Benefícios tangíveis que a melhoria da maturidade trará para ${companyInfo.sector}
   - **Timeline de Valor**: Como os investimentos em maturidade impactarão os resultados no setor

**DIRETRIZES DE RESPOSTA:**
- Seja específico e assertivo, evite generalidades
- Use dados concretos da avaliação para fundamentar análises
- Considere características típicas do setor ${companyInfo.sector}
- Foque em impactos de negócio, não apenas técnicos
- Mantenha tom consultivo e orientado a resultados

**FORMATO DE RESPOSTA:**
RESUMO EXECUTIVO
[Sua análise executiva aqui]

ANÁLISE DETALHADA
[Sua análise detalhada aqui]

Responda em português brasileiro com linguagem clara e profissional.`;

      const aiResponse = await callAIAPI(aiPrompt, true);
      
      // Função para limpar formatação markdown
      const cleanMarkdown = (text: string): string => {
        return text
          .replace(/\*\*([^*]*)\*\*/g, '$1') // Remove **texto** (incluindo vazios)
          .replace(/\*([^*]*)\*/g, '$1') // Remove *texto* (incluindo vazios)
          .replace(/\*{2,}/g, '') // Remove múltiplos asteriscos ****, ***, etc
          .replace(/\*/g, '') // Remove asteriscos restantes
          .replace(/#{1,6}\s*/g, '') // Remove # ## ### etc
          .replace(/^\s*-\s*/gm, '• ') // Converte - em bullet points
          .replace(/^\s*\d+\.\s*/gm, '') // Remove numeração 1. 2. etc
          .replace(/\n{3,}/g, '\n\n') // Remove quebras de linha excessivas
          .replace(/\s+/g, ' ') // Remove espaços múltiplos
          .replace(/\n\s*\n/g, '\n\n') // Remove espaços em branco entre parágrafos
          .trim();
      };
      
      // Processar resposta da IA e limpar formatação
      let cleanResponse = cleanMarkdown(aiResponse);
      
      // Tentar dividir em seções
      const sections = cleanResponse.split(/(?:ANÁLISE DETALHADA|RESUMO EXECUTIVO|RECOMENDAÇÕES)/i);
      
      if (sections.length >= 2) {
        // Tentar extrair resumo executivo
        const summaryMatch = cleanResponse.match(/RESUMO EXECUTIVO[:\s]*(.*?)(?=ANÁLISE DETALHADA|RECOMENDAÇÕES|$)/is);
        if (summaryMatch) {
          executiveSummary = cleanMarkdown(summaryMatch[1]).trim();
        }

        // Tentar extrair análise detalhada
        const analysisMatch = cleanResponse.match(/ANÁLISE DETALHADA[:\s]*(.*?)(?=RECOMENDAÇÕES|$)/is);
        if (analysisMatch) {
          enhancedAnalysis = cleanMarkdown(analysisMatch[1]).trim();
        }

        // Dividir análise detalhada em subtópicos
        const analysisSections = enhancedAnalysis.split(/•\s*/);
        enhancedAnalysis = analysisSections.map(section => {
          const [title, ...content] = section.split(':');
          return `• **${title.trim()}**: ${content.join(':').trim()}`;
        }).join('\n\n');
      }
      
      // Fallback: usar resposta completa se não conseguir dividir
      if (!executiveSummary || !enhancedAnalysis) {
        const parts = cleanResponse.split('\n\n');
        executiveSummary = parts[0] || cleanResponse.substring(0, 300) + '...';
        enhancedAnalysis = parts.slice(1).join('\n\n') || cleanResponse;
      }
      
      // Garantir que não há asteriscos restantes
      executiveSummary = cleanMarkdown(executiveSummary);
      enhancedAnalysis = cleanMarkdown(enhancedAnalysis);
      
    } catch (error) {
      console.warn('Erro na análise com IA, usando análise padrão:', error);
    }
  }
  
  // Fallback para análise padrão se IA não estiver disponível
  if (!executiveSummary) {
    const sectorSpecificFallback = generateSectorSpecificFallback(companyInfo.sector, maturityLevel.name, criticalDimensions, strongDimensions);
    executiveSummary = sectorSpecificFallback.summary;
  }
  
  if (!enhancedAnalysis) {
    const sectorSpecificFallback = generateSectorSpecificFallback(companyInfo.sector, maturityLevel.name, criticalDimensions, strongDimensions);
    enhancedAnalysis = sectorSpecificFallback.analysis;
  }

  return {
    segment: companyInfo.sector,
    organization: companyInfo.name,
    maturity_score: scores.total,
    maturity_level: maturityLevel.name,
    dimension_highlights: {
      fortes: strongDimensions,
      criticas: criticalDimensions
    },
    critical_points: criticalPoints,
    strategic_priorities: criticalPoints.slice(0, 3).map(cp => 
      `Estruturar ${cp.dimension.replace('Dimensão ', '')}: ${cp.mitigations[0]}`
    ),
    main_risks: criticalPoints.flatMap(cp => cp.risks).slice(0, 3),
    roadmap,
    executive_summary: executiveSummary,
    analysis: enhancedAnalysis,
    priorities: criticalPoints.slice(0, 3).map(cp => cp.mitigations[0]),
    risks: criticalPoints.flatMap(cp => cp.risks).slice(0, 3)
  };
};

// Função personalizada para análise crítica baseada nas práticas com maior gap
const analyzeAgent1Enhanced = (
  scores: Scores, 
  companyInfo: CompanyInfo, 
  topGaps: Array<{id: string; name: string; gap: number; level: number; dimension: string}>
): CriticalPoint[] => {
  const criticalPoints: CriticalPoint[] = [];
  
  Object.values(scores.byDimension).forEach(dim => {
    if (dim.score < 3) {
      // Encontrar práticas críticas desta dimensão
      const dimensionGaps = topGaps.filter(gap => gap.dimension === dim.name);
      const criticalPractices = dimensionGaps.slice(0, 3); // Top 3 da dimensão
      
      let diagnosis = '';
      let risks: string[] = [];
      let mitigations: string[] = [];
      
      // Análise personalizada baseada nas práticas específicas com gap
      if (criticalPractices.length > 0) {
        const practiceNames = criticalPractices.map(p => p.name).join(', ');
        
        // Diagnóstico personalizado
        diagnosis = `Déficits críticos identificados em: ${practiceNames}. `;
        
        // Adicionar contexto específico por setor
        const sectorContext = getSectorSpecificContext(companyInfo.sector, dim.name);
        diagnosis += sectorContext.diagnosis;
        
        // Riscos específicos baseados nas práticas críticas
        risks = generateSpecificRisks(criticalPractices, companyInfo.sector);
        
        // Mitigações específicas baseadas nas práticas críticas
        mitigations = generateSpecificMitigations(criticalPractices, companyInfo.sector);
      } else {
        // Fallback para análise genérica
        diagnosis = getGenericDiagnosis(dim.name);
        risks = getGenericRisks(dim.name);
        mitigations = getGenericMitigations(dim.name);
      }
      
      if (risks.length === 0) {
        risks = getGenericRisks(dim.name);
      }
      
      criticalPoints.push({
        dimension: dim.name,
        score: dim.score,
        diagnosis,
        risks,
        mitigations
      });
    }
  });
  
  return criticalPoints;
};

// Função personalizada para roadmap baseado nas práticas críticas
const analyzeAgent2Enhanced = (
  scores: Scores, 
  criticalPoints: CriticalPoint[], 
  companyInfo: CompanyInfo,
  topGaps: Array<{id: string; name: string; gap: number; level: number; dimension: string}>
): RoadmapPhase[] => {
  const topCriticalPractices = topGaps.slice(0, 5);
  
  const roadmap: RoadmapPhase[] = [
    {
      phase: 'Curto Prazo',
      timeframe: '1-3 meses',
      actions: generatePhaseActions('short', topCriticalPractices, companyInfo.sector),
      kpis: generatePhaseKPIs('short', topCriticalPractices, companyInfo.sector)
    },
    {
      phase: 'Médio Prazo',
      timeframe: '4-6 meses',
      actions: generatePhaseActions('medium', topCriticalPractices, companyInfo.sector),
      kpis: generatePhaseKPIs('medium', topCriticalPractices, companyInfo.sector)
    },
    {
      phase: 'Longo Prazo',
      timeframe: '7-12 meses',
      actions: generatePhaseActions('long', topCriticalPractices, companyInfo.sector),
      kpis: generatePhaseKPIs('long', topCriticalPractices, companyInfo.sector)
    }
  ];
  
  return roadmap;
};

// Funções auxiliares para personalização
const getSectorSpecificContext = (sector: string, dimension: string) => {
  const contexts: Record<string, Record<string, {diagnosis: string}>> = {
    'Saúde': {
      'Dimensão Estratégica': {
        diagnosis: 'No setor de saúde, isso compromete a capacidade de investir em tecnologias emergentes e atender regulamentações específicas como LGPD e normas do CFM.'
      },
      'Dimensão Operacional Core': {
        diagnosis: 'Para organizações de saúde, isso impacta diretamente a qualidade do atendimento ao paciente e a disponibilidade de sistemas críticos.'
      },
      'Dimensão Governança e Controle': {
        diagnosis: 'No setor de saúde, isso representa riscos significativos de conformidade com HIPAA, LGPD e regulamentações específicas do setor.'
      }
    },
    'Financeiro': {
      'Dimensão Estratégica': {
        diagnosis: 'No setor financeiro, isso compromete a capacidade de inovação digital e compliance com regulamentações do Banco Central.'
      },
      'Dimensão Governança e Controle': {
        diagnosis: 'Para instituições financeiras, isso representa riscos críticos de conformidade com BACEN, CVM e normas de segurança financeira.'
      }
    }
  };
  
  return contexts[sector]?.[dimension] || {
    diagnosis: `Para empresas do setor ${sector}, isso representa riscos operacionais e de competitividade.`
  };
};

const generateSpecificRisks = (practices: Array<{name: string; level: number}>, sector: string): string[] => {
  const risks: string[] = [];
  
  practices.forEach(practice => {
    if (practice.name.includes('Gestão Financeira')) {
      risks.push('Orçamentos de TI desalinhados com objetivos estratégicos');
      risks.push('ROI de investimentos em tecnologia não mensurável');
    }
    if (practice.name.includes('Gestão de Incidentes')) {
      risks.push('Tempo de resolução de problemas críticos elevado');
      risks.push('Impacto na disponibilidade de serviços essenciais');
    }
    if (practice.name.includes('Gestão de Riscos')) {
      risks.push('Exposição a vulnerabilidades de segurança');
      risks.push('Falta de planos de contingência adequados');
    }
    if (practice.name.includes('Gestão de Projetos')) {
      risks.push('Entregas de projetos fora do prazo e orçamento');
      risks.push('Baixa taxa de sucesso em iniciativas de TI');
    }
  });
  
  // Adicionar riscos específicos do setor
  if (sector === 'Saúde') {
    risks.push('Comprometimento da qualidade do atendimento ao paciente');
    risks.push('Riscos de conformidade com regulamentações de saúde');
  } else if (sector === 'Financeiro') {
    risks.push('Exposição a riscos regulatórios do Banco Central');
    risks.push('Vulnerabilidades em transações financeiras críticas');
  }
  
  return risks.slice(0, 3); // Limitar a 3 riscos principais
};

const generateSpecificMitigations = (practices: Array<{name: string; level: number}>, sector: string): string[] => {
  const mitigations: string[] = [];
  
  practices.forEach(practice => {
    if (practice.name.includes('Gestão Financeira')) {
      mitigations.push('Implementar metodologia de gestão de portfólio de TI com métricas de ROI');
      mitigations.push('Estabelecer comitê de investimentos em TI com participação do negócio');
    }
    if (practice.name.includes('Gestão de Incidentes')) {
      mitigations.push('Implementar ferramenta ITSM com automação de workflows');
      mitigations.push('Estabelecer SLAs específicos por criticidade de serviço');
    }
    if (practice.name.includes('Gestão de Riscos')) {
      mitigations.push('Desenvolver matriz de riscos de TI com planos de mitigação');
      mitigations.push('Implementar programa de gestão de continuidade de negócios');
    }
    if (practice.name.includes('Gestão de Projetos')) {
      mitigations.push('Adotar metodologia ágil com gates de aprovação por fase');
      mitigations.push('Implementar PMO com governança de projetos estruturada');
    }
  });
  
  return mitigations.slice(0, 3); // Limitar a 3 mitigações principais
};

const generatePhaseActions = (phase: 'short' | 'medium' | 'long', practices: Array<{name: string}>, sector: string): string[] => {
  const actions: string[] = [];
  
  if (phase === 'short') {
    practices.slice(0, 2).forEach(practice => {
      if (practice.name.includes('Gestão de Incidentes')) {
        actions.push('Implementar ferramenta de Service Desk para centralização de incidentes');
      }
      if (practice.name.includes('Gestão Financeira')) {
        actions.push('Estruturar processo básico de aprovação de investimentos em TI');
      }
      if (practice.name.includes('Gestão de Riscos')) {
        actions.push('Criar inventário de riscos críticos de TI');
      }
    });
    
    // Adicionar ações genéricas se necessário
    if (actions.length < 3) {
      actions.push('Definir SLAs básicos para os 3 serviços mais críticos');
      actions.push('Estabelecer reuniões semanais de acompanhamento de TI');
    }
  }
  
  if (phase === 'medium') {
    actions.push('Implementar gestão proativa baseada nas práticas críticas identificadas');
    actions.push('Desenvolver programa de capacitação focado nas competências em déficit');
    actions.push('Estabelecer métricas de acompanhamento das práticas prioritárias');
  }
  
  if (phase === 'long') {
    actions.push('Implementar automação de processos nas áreas críticas identificadas');
    actions.push('Desenvolver dashboards executivos com KPIs das práticas prioritárias');
    actions.push('Estabelecer programa de melhoria contínua estruturado');
  }
  
  return actions.slice(0, 4);
};

const generatePhaseKPIs = (phase: 'short' | 'medium' | 'long', practices: Array<{name: string}>, sector: string): string[] => {
  const kpis: string[] = [];
  
  if (phase === 'short') {
    kpis.push('Tempo médio de resolução de incidentes críticos');
    kpis.push('Taxa de cumprimento de SLA dos serviços prioritários');
    kpis.push('Número de práticas críticas com melhoria de nível');
  }
  
  if (phase === 'medium') {
    kpis.push('Redução do gap médio das práticas prioritárias (%)');
    kpis.push('Índice de satisfação dos stakeholders de TI');
    kpis.push('Cobertura de processos documentados (%)');
  }
  
  if (phase === 'long') {
    kpis.push('Score geral de maturidade de TI');
    kpis.push('ROI dos investimentos em melhoria de processos');
    kpis.push('Alinhamento estratégico TI-Negócio (score)');
  }
  
  return kpis.slice(0, 4);
};

// Função para gerar análise específica por setor quando IA não está disponível
const generateSectorSpecificFallback = (sector: string, maturityLevel: string, criticalDimensions: string[], strongDimensions: string[]) => {
  const sectorLower = sector.toLowerCase();
  
  let sectorContext = '';
  let sectorRisks = '';
  let sectorOpportunities = '';
  
  if (sectorLower.includes('financ') || sectorLower.includes('banco')) {
    sectorContext = 'No setor financeiro, a maturidade de TI é fundamental para atender requisitos regulatórios rigorosos (BACEN, CVM) e manter competitividade frente a fintechs.';
    sectorRisks = 'Riscos incluem multas regulatórias, vazamentos de dados, perda de confiança dos clientes e desvantagem competitiva frente a instituições mais digitais.';
    sectorOpportunities = 'Oportunidades incluem automação de processos, melhoria na experiência do cliente, redução de custos operacionais e novos produtos digitais.';
  } else if (sectorLower.includes('saúde') || sectorLower.includes('hospital') || sectorLower.includes('médic')) {
    sectorContext = 'Na área da saúde, TI madura é essencial para garantir continuidade do atendimento, proteção de dados sensíveis e conformidade com regulamentações específicas.';
    sectorRisks = 'Riscos incluem interrupções no atendimento, não conformidade com LGPD, impactos na segurança do paciente e ineficiências operacionais críticas.';
    sectorOpportunities = 'Oportunidades incluem telemedicina, prontuário eletrônico integrado, inteligência artificial para diagnósticos e melhoria na qualidade do atendimento.';
  } else if (sectorLower.includes('manufat') || sectorLower.includes('indust') || sectorLower.includes('produção')) {
    sectorContext = 'Na indústria, TI madura é crucial para manter eficiência produtiva, integração com automação industrial e competitividade no mercado global.';
    sectorRisks = 'Riscos incluem paradas de produção, perda de matéria-prima, atrasos na cadeia de suprimentos e perda de competitividade operacional.';
    sectorOpportunities = 'Oportunidades incluem Indústria 4.0, IoT para manutenção preditiva, otimização de processos e diferenciação através de produtos inteligentes.';
  } else if (sectorLower.includes('varejo') || sectorLower.includes('comércio') || sectorLower.includes('e-commerce')) {
    sectorContext = 'No varejo, TI madura é vital para experiência omnichannel, competitividade no mercado digital e adaptação às mudanças do comportamento do consumidor.';
    sectorRisks = 'Riscos incluem perda de vendas, insatisfação do cliente, perda de market share para concorrentes digitais e ineficiências operacionais.';
    sectorOpportunities = 'Oportunidades incluem personalização com IA, analytics de comportamento, automação de marketing e novos canais de vendas digitais.';
  } else {
    sectorContext = `Para empresas de ${sector}, TI madura é fundamental para eficiência operacional, competitividade e adaptação às mudanças do mercado.`;
    sectorRisks = 'Riscos incluem ineficiências operacionais, custos elevados, perda de oportunidades de mercado e vulnerabilidades competitivas.';
    sectorOpportunities = 'Oportunidades incluem automação de processos, melhoria na produtividade, diferenciação competitiva e inovação digital.';
  }
  
  const summary = `${sectorContext} A avaliação revela maturidade de TI no nível ${maturityLevel}, com ${criticalDimensions.length} dimensão(ões) crítica(s) identificada(s). ${criticalDimensions.length > 0 ? `É essencial priorizar ${criticalDimensions.join(' e ')} para reduzir riscos operacionais específicos do setor.` : 'A organização demonstra boa maturidade geral, com oportunidades de otimização estratégica.'} ${strongDimensions.length > 0 ? `As dimensões fortes (${strongDimensions.join(', ')}) podem servir como base para impulsionar melhorias nas áreas críticas.` : ''}`;
  
  const analysis = `${sectorRisks} A análise detalhada revela que ${criticalDimensions.length > 0 ? 'as dimensões críticas requerem atenção imediata para evitar impactos significativos no negócio' : 'a organização possui uma base sólida de maturidade'}. ${sectorOpportunities} O foco deve ser na implementação de controles específicos para o setor, padronização de processos críticos e estabelecimento de métricas de acompanhamento alinhadas aos desafios de ${sector}.`;
  
  return { summary, analysis };
};

// Funções de fallback para análise genérica
const getGenericDiagnosis = (dimension: string): string => {
  const genericDiagnoses: Record<string, string> = {
    'Dimensão Estratégica': 'Ausência de planejamento estratégico e gestão de portfólio inadequada.',
    'Dimensão Operacional Core': 'Processos operacionais imaturos e baixa previsibilidade na entrega de serviços.',
    'Dimensão Governança e Controle': 'Controles inadequados e riscos de conformidade não gerenciados.',
    'Dimensão Capacidade e Conhecimento': 'Dependência excessiva de pessoas-chave e conhecimento não documentado.',
    'Dimensão Melhoria': 'Ausência de cultura de melhoria contínua e processos iterativos estruturados.'
  };
  
  return genericDiagnoses[dimension] || 'Ausência de diagnóstico específico para esta dimensão.';
};

const getGenericRisks = (dimension: string): string[] => {
  const genericRisks: Record<string, string[]> = {
    'Dimensão Estratégica': ['Investimentos em TI sem retorno mensurável'],
    'Dimensão Operacional Core': ['Interrupções frequentes nos serviços críticos'],
    'Dimensão Governança e Controle': ['Exposição a riscos regulatórios e legais'],
    'Dimensão Capacidade e Conhecimento': ['Perda de conhecimento crítico com saída de colaboradores'],
    'Dimensão Melhoria': ['Estagnação dos processos e práticas']
  };
  
  return genericRisks[dimension] || ['Riscos operacionais e de competitividade'];
};

const getGenericMitigations = (dimension: string): string[] => {
  const genericMitigations: Record<string, string[]> = {
    'Dimensão Estratégica': ['Implementar governança de TI com comitê estratégico'],
    'Dimensão Operacional Core': ['Implementar ITSM com foco em gestão de incidentes'],
    'Dimensão Governança e Controle': ['Implementar controle de mudanças formal (CAB)'],
    'Dimensão Capacidade e Conhecimento': ['Criar base de conhecimento estruturada'],
    'Dimensão Melhoria': ['Implementar ciclos de melhoria contínua (PDCA)']
  };
  
  return genericMitigations[dimension] || ['Implementar controles básicos'];
};

// Nova função aprimorada que inclui análise das práticas com maior gap
export const generateEnhancedAIAnalysis = async (
  scores: Scores, 
  companyInfo: CompanyInfo, 
  answers: Record<string, number>
): Promise<AIAnalysis> => {
  console.log('🚀 Iniciando análise IA aprimorada...', { scores, companyInfo, answersCount: Object.keys(answers).length });
  
  const maturityLevel = getMaturityLevel(scores.total);
  
  // Calcular práticas com maior gap
  const practiceGaps: Array<{
    id: string;
    name: string;
    gap: number;
    level: number;
    dimension: string;
  }> = [];

  // Mapa de práticas
  const practicesMap: Record<string, string> = {
    'gestao_estrategia': 'Gestão de Estratégia',
    'gestao_portfolio': 'Gestão de Portfolio',
    'gestao_arquitetura': 'Gestão de Arquitetura',
    'gestao_projetos': 'Gestão de Projetos',
    'gestao_financeira': 'Gestão Financeira',
    'analise_negocios': 'Análise de Negócios',
    'gestao_fornecedores': 'Gestão de Fornecedores',
    'gestao_relacionamentos': 'Gestão de Relacionamentos',
    'gestao_talentos': 'Gestão de Talentos e Força de Trabalho',
    'central_servicos': 'Central de Serviços',
    'gestao_solicitacoes': 'Gestão de Solicitações',
    'gestao_incidentes': 'Gestão de Incidentes',
    'gestao_problemas': 'Gestão de Problemas',
    'gestao_nivel_servico': 'Gestão de Nível de Serviço',
    'gestao_disponibilidade': 'Gestão de Disponibilidade',
    'gestao_capacidade_desempenho': 'Gestão de Capacidade e Desempenho',
    'monitoramento_eventos': 'Monitoramento e Gestão de Eventos',
    'gestao_infra_plataforma': 'Gestão de Infraestrutura e Plataforma',
    'dev_gerenciamento_software': 'Desenvolvimento e Gerenciamento de Software',
    'gestao_implantacao': 'Gestão de Implantação',
    'gestao_catalogo': 'Gestão de Catálogo',
    'design_servico': 'Design de Serviço',
    'controle_mudancas': 'Controle de Mudanças',
    'gestao_ativos': 'Gestão de Ativos de TI',
    'gestao_configuracao': 'Gestão de Configuração',
    'gestao_seguranca': 'Gestão de Segurança da Informação',
    'validacao_teste': 'Validação e Teste',
    'gestao_riscos': 'Gestão de Riscos',
    'medicao_relatorios': 'Medição e Relatórios',
    'gestao_conhecimento': 'Gestão do Conhecimento',
    'gestao_mudanca': 'Gestão de Mudança',
    'gestao_continuidade': 'Gestão de Continuidade do Serviço',
    'gestao_implementacao': 'Gestão de Implementação',
    'melhoria_continua': 'Melhoria Contínua'
  };

  try {
    // Aguardar a importação e calcular gaps
    const { assessmentData } = await import('../data/assessmentData');
    console.log('📊 Dados de avaliação carregados:', assessmentData.dimensions.length, 'dimensões');
    
    assessmentData.dimensions.forEach((dimension: any) => {
      dimension.practices.forEach((practiceId: string) => {
        const answer = answers[practiceId] || 1;
        const gap = (5 - answer) * dimension.weight;
        practiceGaps.push({
          id: practiceId,
          name: practicesMap[practiceId] || practiceId,
          gap: gap,
          level: answer,
          dimension: dimension.name
        });
      });
    });

    console.log('📈 Gaps calculados:', practiceGaps.length, 'práticas');

    // Ordenar por gap (maior primeiro) e pegar top 10
    const top10Gaps = practiceGaps
      .sort((a, b) => b.gap - a.gap)
      .slice(0, 10);

    console.log('🔥 Top 10 gaps:', top10Gaps.map(g => `${g.name}: ${g.gap.toFixed(3)}`));

    // Classificar dimensões
    const strongDimensions = Object.values(scores.byDimension)
      .filter(d => d.score >= 3)
      .map(d => d.name.replace('Dimensão ', ''));
      
    const criticalDimensions = Object.values(scores.byDimension)
      .filter(d => d.score < 3)
      .map(d => d.name.replace('Dimensão ', ''));

    // Executar análise dos agentes personalizados
    const criticalPoints = analyzeAgent1Enhanced(scores, companyInfo, top10Gaps);
    const roadmap = analyzeAgent2Enhanced(scores, criticalPoints, companyInfo, top10Gaps);

    // Verificar se APIs estão configuradas
    const openaiKey = import.meta.env.VITE_OPENAI_API_KEY;
    const anthropicKey = import.meta.env.VITE_ANTHROPIC_API_KEY;
    
    let executiveSummary = '';
    let enhancedAnalysis = '';
    
    if ((openaiKey && openaiKey !== 'your_openai_api_key_here') || 
        (anthropicKey && anthropicKey !== 'your_anthropic_api_key_here')) {
      
      try {
        // Prompt aprimorado com dados das práticas críticas
        const aiPrompt = `Como consultor sênior especialista em ITIL v4, governança de TI e transformação digital, analise os seguintes dados da avaliação de maturidade de TI:

**DADOS DA AVALIAÇÃO:**
- Empresa: ${companyInfo.name}
- Setor: ${companyInfo.sector}
- Pontuação Total de Maturidade: ${scores.total}/5 (${Math.round((scores.total/5)*100)}%)
- Nível de Maturidade: ${maturityLevel.name}

**DIMENSÕES COM BOM DESEMPENHO:** ${strongDimensions.length > 0 ? strongDimensions.join(', ') : 'Nenhuma dimensão com pontuação >= 3'}

**DIMENSÕES CRÍTICAS (Score < 3):** ${criticalDimensions.length > 0 ? criticalDimensions.join(', ') : 'Nenhuma dimensão crítica identificada'}

**DIAGNÓSTICO DETALHADO:**
${criticalPoints.map(cp => `• ${cp.dimension}: ${cp.diagnosis}\n  Riscos: ${cp.risks.slice(0,2).join('; ')}`).join('\n')}

**INSTRUÇÕES PARA ANÁLISE:**

1. **RESUMO EXECUTIVO (3-4 parágrafos):**
   - Inicie com uma avaliação direta da situação atual específica para ${companyInfo.sector}
   - Identifique os 2-3 principais desafios críticos para este setor
   - Destaque as implicações estratégicas da maturidade atual no contexto competitivo
   - Finalize com uma recomendação clara de priorização

2. **ANÁLISE DETALHADA (4-5 parágrafos):**
   - **Contexto Setorial**: Como a maturidade atual impacta especificamente empresas de ${companyInfo.sector}
   - **Gaps Críticos**: Análise dos déficits mais impactantes considerando os riscos do setor
   - **Correlações de Risco**: Como as dimensões críticas se relacionam e amplificam riscos
   - **Oportunidades Específicas**: Benefícios tangíveis que a melhoria da maturidade trará para ${companyInfo.sector}
   - **Timeline de Valor**: Como os investimentos em maturidade impactarão os resultados no setor

**DIRETRIZES DE RESPOSTA:**
- Seja específico e assertivo, evite generalidades
- Use dados concretos da avaliação para fundamentar análises
- Considere características típicas do setor ${companyInfo.sector}
- Foque em impactos de negócio, não apenas técnicos
- Mantenha tom consultivo e orientado a resultados

**FORMATO DE RESPOSTA:**
RESUMO EXECUTIVO
[Sua análise executiva aqui]

ANÁLISE DETALHADA
[Sua análise detalhada aqui]

Responda em português brasileiro com linguagem clara e profissional.`;

        const aiResponse = await callAIAPI(aiPrompt, true);
        
        // Função para limpar formatação markdown
        const cleanMarkdown = (text: string): string => {
          return text
            .replace(/\*\*([^*]*)\*\*/g, '$1') // Remove **texto** (incluindo vazios)
            .replace(/\*([^*]*)\*/g, '$1') // Remove *texto* (incluindo vazios)
            .replace(/\*{2,}/g, '') // Remove múltiplos asteriscos ****, ***, etc
            .replace(/\*/g, '') // Remove asteriscos restantes
            .replace(/#{1,6}\s*/g, '') // Remove # ## ### etc
            .replace(/^\s*-\s*/gm, '• ') // Converte - em bullet points
            .replace(/^\s*\d+\.\s*/gm, '') // Remove numeração 1. 2. etc
            .replace(/\n{3,}/g, '\n\n') // Remove quebras de linha excessivas
            .replace(/\s+/g, ' ') // Remove espaços múltiplos
            .replace(/\n\s*\n/g, '\n\n') // Remove espaços em branco entre parágrafos
            .trim();
        };
        
        // Processar resposta da IA e limpar formatação
        let cleanResponse = cleanMarkdown(aiResponse);
        
        // Tentar dividir em seções
        const sections = cleanResponse.split(/(?:ANÁLISE DETALHADA|RESUMO EXECUTIVO|RECOMENDAÇÕES)/i);
        
        if (sections.length >= 2) {
          // Tentar extrair resumo executivo
          const summaryMatch = cleanResponse.match(/RESUMO EXECUTIVO[:\s]*(.*?)(?=ANÁLISE DETALHADA|RECOMENDAÇÕES|$)/is);
          if (summaryMatch) {
            executiveSummary = cleanMarkdown(summaryMatch[1]).trim();
          }

          // Tentar extrair análise detalhada
          const analysisMatch = cleanResponse.match(/ANÁLISE DETALHADA[:\s]*(.*?)(?=RECOMENDAÇÕES|$)/is);
          if (analysisMatch) {
            enhancedAnalysis = cleanMarkdown(analysisMatch[1]).trim();
          }

          // Dividir análise detalhada em subtópicos
          const analysisSections = enhancedAnalysis.split(/•\s*/);
          enhancedAnalysis = analysisSections.map(section => {
            const [title, ...content] = section.split(':');
            return `• **${title.trim()}**: ${content.join(':').trim()}`;
          }).join('\n\n');
        }
        
        // Fallback: usar resposta completa se não conseguir dividir
        if (!executiveSummary || !enhancedAnalysis) {
          const parts = cleanResponse.split('\n\n');
          executiveSummary = parts[0] || cleanResponse.substring(0, 300) + '...';
          enhancedAnalysis = parts.slice(1).join('\n\n') || cleanResponse;
        }
        
        // Garantir que não há asteriscos restantes
        executiveSummary = cleanMarkdown(executiveSummary);
        enhancedAnalysis = cleanMarkdown(enhancedAnalysis);
        
      } catch (error) {
        console.warn('Erro na análise com IA, usando análise padrão:', error);
      }
    }
    
    // Fallback para análise padrão se IA não estiver disponível
    if (!executiveSummary) {
      const sectorSpecificFallback = generateSectorSpecificFallback(companyInfo.sector, maturityLevel.name, criticalDimensions, strongDimensions);
      executiveSummary = sectorSpecificFallback.summary;
    }
    
    if (!enhancedAnalysis) {
      const sectorSpecificFallback = generateSectorSpecificFallback(companyInfo.sector, maturityLevel.name, criticalDimensions, strongDimensions);
      enhancedAnalysis = sectorSpecificFallback.analysis;
    }

    return {
      segment: companyInfo.sector,
      organization: companyInfo.name,
      maturity_score: scores.total,
      maturity_level: maturityLevel.name,
      dimension_highlights: {
        fortes: strongDimensions,
        criticas: criticalDimensions
      },
      critical_points: criticalPoints,
      strategic_priorities: top10Gaps.slice(0, 3).map(practice => 
        `Priorizar ${practice.name}: Gap de ${practice.gap.toFixed(3)} (Nível ${practice.level}/5)`
      ),
      main_risks: criticalPoints.flatMap(cp => cp.risks).slice(0, 3),
      roadmap,
      executive_summary: executiveSummary,
      analysis: enhancedAnalysis,
      priorities: top10Gaps.slice(0, 3).map(p => `Implementar ${p.name}`),
      risks: criticalPoints.flatMap(cp => cp.risks).slice(0, 3)
    };

  } catch (error) {
    console.error('❌ Erro na análise IA aprimorada:', error);
    // Fallback para análise padrão
    return generateAIAnalysis(scores, companyInfo);
  }
};