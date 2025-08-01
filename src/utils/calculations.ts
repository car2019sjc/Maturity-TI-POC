import { assessmentData } from '../data/pocAssessmentData';

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

// Função aprimorada para criar roadmap estratégico premium (Agente 2: Estratégia e Roadmap)
const analyzeAgent2 = (scores: Scores, criticalPoints: CriticalPoint[], companyInfo: CompanyInfo): RoadmapPhase[] => {
  const totalScore = scores.total;
  const hasStrategicIssues = scores.byDimension['estrategica']?.score < 3;
  const hasOperationalIssues = scores.byDimension['operacional']?.score < 3;
  const hasGovernanceIssues = scores.byDimension['governanca']?.score < 3;
  
  const roadmap: RoadmapPhase[] = [
    {
      phase: 'Fase 1: Estabilização Crítica',
      timeframe: '1-3 meses (Investimento: Baixo a Médio)',
      actions: [
        `Implementar Service Desk estruturado com ferramenta ITSM (ServiceNow/Freshservice) - ROI esperado: 200% em 6 meses`,
        `Definir e implementar SLAs para os 5 serviços mais críticos de ${companyInfo.sector} - Redução de 40-60% em reclamações`,
        `Estabelecer CAB (Change Advisory Board) com reuniões semanais - Redução de 70% em incidentes por mudança`,
        `Criar documentação ITIL dos 10 processos mais críticos - Economia de 30% no tempo de onboarding`,
        `Implementar monitoramento básico 24/7 dos sistemas críticos - Redução de 50% no MTTR`
      ],
      kpis: [
        'MTTR (Mean Time to Resolution): Meta < 4 horas para incidentes críticos',
        'Taxa de cumprimento de SLA: Meta > 95% para serviços críticos',
        'Taxa de sucesso de mudanças: Meta > 90%',
        'First Call Resolution Rate: Meta > 70%',
        'Disponibilidade de sistemas críticos: Meta > 99.5%'
      ]
    },
    {
      phase: 'Fase 2: Otimização e Automação',
      timeframe: '4-8 meses (Investimento: Médio a Alto)',
      actions: [
        `Implementar gestão proativa de problemas com análise de causa raiz - Redução de 60% em incidentes recorrentes`,
        `Estruturar catálogo completo de serviços de TI com precificação - Transparência de 100% dos custos`,
        `Desenvolver programa de capacitação ITIL Foundation para 100% da equipe - ROI de 150-250%`,
        `Implementar automação de processos repetitivos (RPA) - Economia de 40-60% em FTE`,
        `Estabelecer CMDB (Configuration Management Database) atualizado - Redução de 50% no tempo de diagnóstico`,
        `Implementar gestão de ativos de TI com inventário automatizado - Economia de 20-30% em licenciamento`
      ],
      kpis: [
        'Redução de incidentes recorrentes: Meta > 60%',
        'Cobertura do catálogo de serviços: Meta 100%',
        'Certificações ITIL da equipe: Meta > 80%',
        'Índice de automação: Meta > 40% dos processos manuais',
        'Precisão do CMDB: Meta > 95%',
        'Otimização de custos de licenciamento: Meta 20-30% de economia'
      ]
    },
    {
      phase: 'Fase 3: Excelência e Inovação',
      timeframe: '9-18 meses (Investimento: Alto)',
      actions: [
        `Implementar IA/ML para análise preditiva de incidentes - Prevenção de 70-80% dos problemas`,
        `Desenvolver dashboards executivos em tempo real com KPIs estratégicos - Visibilidade 100% para C-Level`,
        `Estabelecer programa de melhoria contínua com metodologia Lean Six Sigma - Melhoria de 25-35% em KPIs anuais`,
        `Integrar TI com objetivos estratégicos através de OKRs - Alinhamento estratégico > 90%`,
        `Implementar DevSecOps para acelerar entrega de software - Aumento de 200-300% na velocidade de deploy`,
        `Estabelecer centro de excelência em ${companyInfo.sector} para inovação digital - Diferenciação competitiva`
      ],
      kpis: [
        'Prevenção de incidentes por IA: Meta > 70%',
        'Tempo de geração de relatórios executivos: Meta < 1 hora (tempo real)',
        'Projetos de melhoria implementados: Meta > 12 por ano',
        'Alinhamento estratégico TI-Negócio: Meta > 90%',
        'Velocidade de deploy: Meta < 1 dia (vs. semanas anteriormente)',
        'ROI total dos investimentos em TI: Meta > 300% em 24 meses'
      ]
    }
  ];
  
  // Ajustar roadmap baseado nas dimensões críticas identificadas
  if (hasStrategicIssues) {
    roadmap[0].actions.unshift(`URGENTE: Estabelecer governança de TI com comitê executivo - Risco significativo de investimentos mal direcionados`);
    roadmap[0].kpis.unshift('Aprovação de projetos pelo comitê de governança: Meta 100%');
  }
  
  if (hasOperationalIssues) {
    roadmap[1].actions.unshift(`CRÍTICO: Implementar monitoramento avançado com alertas preditivos - Redução de 80% em downtime não planejado`);
    roadmap[1].kpis.unshift('Downtime não planejado: Meta < 2 horas/mês');
  }
  
  if (hasGovernanceIssues) {
    roadmap[0].actions.push(`COMPLIANCE: Implementar controles de segurança baseados em ISO 27001 - Mitigação de riscos regulatórios`);
    roadmap[0].kpis.push('Conformidade com controles de segurança: Meta > 95%');
  }
  
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
      const aiPrompt = `Você é um consultor sênior especialista em ITIL v4 e transformação digital, com 15+ anos de experiência no setor ${companyInfo.sector}. Sua missão é criar uma análise de alto valor que demonstre expertise profunda e incentive o cliente a buscar uma avaliação completa.

**DADOS DA AVALIAÇÃO POC (6 de 34 práticas ITIL v4):**
- Empresa: ${companyInfo.name}
- Setor: ${companyInfo.sector}
- Pontuação Total de Maturidade: ${scores.total.toFixed(2)}/5.0 (${Math.round((scores.total/5)*100)}%)
- Nível de Maturidade: ${maturityLevel.name}
- Práticas Avaliadas: Gestão de Estratégia, Central de Serviços, Gestão de Incidentes, Gestão de Problemas, Gestão de Ativos de TI, Controle de Mudanças

**DIMENSÕES COM BOM DESEMPENHO:** ${strongDimensions.length > 0 ? strongDimensions.join(', ') : 'Nenhuma dimensão com pontuação >= 3.0'}

**DIMENSÕES CRÍTICAS (Score < 3.0):** ${criticalDimensions.length > 0 ? criticalDimensions.join(', ') : 'Nenhuma dimensão crítica identificada'}

**DIAGNÓSTICO DETALHADO POR DIMENSÃO:**
${criticalPoints.map(cp => `• ${cp.dimension} (Score: ${cp.score.toFixed(1)}): ${cp.diagnosis}\n  Principais Riscos: ${cp.risks.slice(0,3).join('; ')}\n  Mitigações Recomendadas: ${cp.mitigations.slice(0,2).join('; ')}`).join('\n\n')}

**INSTRUÇÕES PARA ANÁLISE PREMIUM:**

**CONTEXTO CRÍTICO:**
- Esta é uma avaliação POC que deve impressionar pela qualidade e profundidade
- O cliente precisa perceber o valor imenso de uma análise completa (34 práticas)
- Foque em insights acionáveis e impactos financeiros/estratégicos mensuráveis
- Use linguagem executiva, dados específicos e benchmarks do setor

**ESTRUTURA OBRIGATÓRIA:**

1. **DIAGNÓSTICO EXECUTIVO (4-5 parágrafos robustos):**
   - **Situação Atual**: Avaliação direta da maturidade no contexto competitivo de ${companyInfo.sector}
   - **Impacto Financeiro**: Quantifique custos de ineficiência e oportunidades perdidas (use % e valores estimados)
   - **Riscos Estratégicos**: Identifique 3-4 riscos críticos específicos do setor com consequências tangíveis
   - **Posicionamento Competitivo**: Compare com benchmarks típicos do setor
   - **Urgência de Ação**: Justifique por que a melhoria é crítica AGORA

2. **ANÁLISE TÉCNICA APROFUNDADA (5-6 parágrafos detalhados):**
   - **Correlação de Práticas**: Como as 6 práticas avaliadas se interconectam e amplificam problemas
   - **Gaps Críticos**: Análise específica dos déficits mais impactantes com exemplos práticos
   - **Cascata de Problemas**: Como deficiências em uma prática afetam outras áreas
   - **Quick Wins**: 2-3 melhorias de alto impacto e baixo esforço
   - **ROI Projetado**: Estimativas de investimento vs retorno esperado
   - **Roadmap Estratégico**: Visão de evolução da maturidade em 12-18 meses

**DIRETRIZES DE QUALIDADE PREMIUM:**
- Use percentuais, proporções e métricas de eficiência (EVITE valores monetários específicos)
- Inclua benchmarks ou estatísticas do setor ${companyInfo.sector}
- Mencione frameworks complementares (COBIT, ISO 27001, etc.)
- Cite tendências tecnológicas relevantes (Cloud, IA, DevOps, etc.)
- Use terminologia executiva (ROI, TCO, CAPEX, OPEX, KPIs, etc.) sem valores específicos
- Demonstre conhecimento profundo do setor
- Inclua pelo menos 3 métricas quantificadas em percentuais
- Mencione riscos regulatórios/compliance específicos do setor
- Foque em impactos relativos e proporcionais, não valores absolutos

**FORMATO DE RESPOSTA:**
DIAGNÓSTICO EXECUTIVO
[Sua análise executiva detalhada aqui - 4-5 parágrafos]

ANÁLISE TÉCNICA APROFUNDADA  
[Sua análise técnica detalhada aqui - 5-6 parágrafos]

Responda em português brasileiro com linguagem executiva e consultiva profissional.`;

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
  const totalScore = scores.total;
  const sector = companyInfo.sector;
  
  // Determinar investimento baseado na maturidade atual e setor
  const getInvestmentRange = (phase: string) => {
    const baseInvestment = totalScore < 2 ? 'alto' : totalScore < 3 ? 'médio' : 'baixo';
    const ranges = {
      'Fase 1': baseInvestment === 'alto' ? 'Alto' : baseInvestment === 'médio' ? 'Médio' : 'Baixo',
      'Fase 2': baseInvestment === 'alto' ? 'Alto' : baseInvestment === 'médio' ? 'Médio a Alto' : 'Médio',
      'Fase 3': baseInvestment === 'alto' ? 'Muito Alto' : baseInvestment === 'médio' ? 'Alto' : 'Médio a Alto'
    };
    return ranges[phase as keyof typeof ranges] || 'Médio';
  };
  
  const roadmap: RoadmapPhase[] = [
    {
      phase: 'Fase 1: Estabilização e Quick Wins',
      timeframe: `1-3 meses (Investimento: ${getInvestmentRange('Fase 1')})`,
      actions: [
        `🚨 CRÍTICO: Implementar Service Desk estruturado para ${sector} com SLAs específicos do setor - ROI esperado: 250-350% em 6 meses`,
        `📊 Estabelecer métricas básicas para as ${topCriticalPractices.length} práticas mais críticas identificadas - Visibilidade imediata de 100% dos gaps`,
        `🔧 Implementar controles de mudança emergenciais para ${topCriticalPractices.map(p => p.name).slice(0,3).join(', ')} - Redução de 60-80% em incidentes`,
        `📋 Criar documentação ITIL básica dos 10 processos mais impactantes para ${sector} - Economia de 40% no tempo de resolução`,
        `⚡ Quick Win: Automação das 3 tarefas mais repetitivas identificadas - Economia imediata de 20-30 horas/semana`,
        `🎯 Estabelecer governança mínima com reuniões semanais de priorização - Alinhamento de 100% das ações críticas`
      ],
      kpis: [
        `MTTR para incidentes críticos: Meta < 2 horas (atual: estimado 4-8 horas)`,
        `Taxa de cumprimento de SLA: Meta > 90% (baseline atual: ${Math.round(totalScore * 18)}%)`,
        `Redução de incidentes recorrentes: Meta > 50% nas práticas críticas`,
        `Satisfação interna (NPS): Meta > 50 (melhoria de 30-40 pontos)`,
        `Economia operacional mensal: Meta significativa através de eficiências`,
        `Cobertura de documentação: Meta > 80% dos processos críticos`
      ]
    },
    {
      phase: 'Fase 2: Otimização e Automação Avançada',
      timeframe: `4-8 meses (Investimento: ${getInvestmentRange('Fase 2')})`,
      actions: [
        `🤖 Implementar automação inteligente (RPA + IA) para ${sector} - Economia de 40-60% em FTE operacional`,
        `📈 Desenvolver dashboards executivos em tempo real específicos para ${sector} - Visibilidade C-Level 24/7`,
        `🔍 Implementar análise preditiva para as práticas com maior gap identificadas - Prevenção de 70% dos problemas`,
        `🏆 Estabelecer centro de excelência em ITIL para ${sector} - Benchmark interno e externo`,
        `🔐 Implementar segurança avançada baseada em Zero Trust - Conformidade 100% com regulamentações do setor`,
        `📚 Programa de capacitação avançada: ITIL Expert para líderes - ROI de 200-300% em produtividade`,
        `🌐 Integração completa com ecossistema digital do ${sector} - Interoperabilidade 100%`
      ],
      kpis: [
        `Índice de automação: Meta > 60% dos processos manuais identificados`,
        `Tempo de geração de relatórios: Meta < 15 minutos (vs. horas atuais)`,
        `Prevenção de incidentes: Meta > 70% através de análise preditiva`,
        `Certificações da equipe: Meta > 90% com ITIL Foundation mínimo`,
        `Conformidade regulatória: Meta 100% com normas específicas de ${sector}`,
        `ROI acumulado: Meta > 300% do investimento total`,
        `Disponibilidade de sistemas críticos: Meta > 99.9%`
      ]
    },
    {
      phase: 'Fase 3: Excelência e Diferenciação Competitiva',
      timeframe: `9-18 meses (Investimento: ${getInvestmentRange('Fase 3')})`,
      actions: [
        `🚀 Implementar IA generativa para otimização contínua específica de ${sector} - Melhoria autônoma de 25-35% em KPIs`,
        `🏅 Estabelecer programa de inovação digital com foco em ${sector} - Diferenciação competitiva sustentável`,
        `🔄 Implementar DevSecOps completo com CI/CD avançado - Velocidade de entrega 500% superior`,
        `📊 Business Intelligence avançado com ML para tomada de decisão - Insights preditivos para C-Level`,
        `🌍 Expandir modelo de excelência para outras unidades/filiais - Escalabilidade organizacional`,
        `🤝 Estabelecer parcerias estratégicas com fornecedores líderes em ${sector} - Acesso a inovações de ponta`,
        `🎖️ Buscar certificações de excelência (ISO 20000, COBIT) - Reconhecimento de mercado`
      ],
      kpis: [
        `Maturidade ITIL: Meta Nível 5 (Otimizado) em todas as práticas avaliadas`,
        `Inovação digital: Meta > 5 projetos disruptivos implementados/ano`,
        `Velocidade de deploy: Meta < 4 horas (vs. dias/semanas atuais)`,
        `ROI total do programa: Meta > 500% em 24 meses`,
        `Benchmark setorial: Meta Top 10% em maturidade de TI no ${sector}`,
        `Satisfação executiva: Meta NPS > 80 da alta direção`,
        `Redução de custos operacionais: Meta 40-60% vs. baseline inicial`
      ]
    }
  ];
  
  // Personalizar baseado nas práticas mais críticas identificadas
  const criticalPracticeNames = topCriticalPractices.map(p => p.name);
  
  if (criticalPracticeNames.includes('Central de Serviços')) {
    roadmap[0].actions[0] = `🚨 URGENTE: Reestruturar Central de Serviços (identificada como crítica) - Implementar tiers de atendimento e automação - ROI: 300-400%`;
  }
  
  if (criticalPracticeNames.includes('Gestão de Estratégia')) {
    roadmap[0].actions.unshift(`⚠️ PRIORIDADE MÁXIMA: Estabelecer governança estratégica de TI (gap crítico identificado) - Risco substancial de investimentos mal direcionados`);
  }
  
  if (criticalPracticeNames.includes('Controle de Mudanças')) {
    roadmap[0].actions[2] = `🔧 CRÍTICO: Implementar CAB (Change Advisory Board) emergencial - Gap identificado representa risco significativo de downtime`;
  }
  
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
  let financialImpact = '';
  let benchmarks = '';
  let technologies = '';
  let compliance = '';
  
  if (sectorLower.includes('financ') || sectorLower.includes('banco')) {
    sectorContext = 'No setor financeiro brasileiro, a maturidade de TI é fundamental para atender requisitos regulatórios rigorosos (BACEN, CVM, LGPD) e manter competitividade frente a fintechs que capturam 15-20% do market share anualmente.';
    sectorRisks = 'Riscos críticos incluem multas regulatórias significativas (LGPD), vazamentos de dados com impacto substancial, perda de confiança dos clientes (redução de 25-40% na base) e desvantagem competitiva frente a instituições digitais que operam com custos operacionais 60% menores.';
    sectorOpportunities = 'Oportunidades incluem automação de processos (redução de 40-60% nos custos operacionais), Open Banking para novos produtos, IA para análise de crédito (redução de 30% na inadimplência), e experiência digital que pode aumentar NPS em 25-35 pontos.';
    financialImpact = 'Instituições com baixa maturidade de TI apresentam custos operacionais 35-50% superiores e ROE 15-20% inferior aos líderes do setor.';
    benchmarks = 'Bancos líderes como Nubank e Inter operam com maturidade nível 4-5, enquanto instituições tradicionais frequentemente permanecem no nível 2-3.';
    technologies = 'Tecnologias críticas: Cloud-first (AWS/Azure), APIs RESTful, microserviços, IA/ML para análise de risco, blockchain para pagamentos, e DevSecOps.';
    compliance = 'Conformidade obrigatória: BACEN 4893/2021 (gestão de riscos), Resolução 4658/2018 (segurança cibernética), LGPD, e PCI-DSS.';
  } else if (sectorLower.includes('saúde') || sectorLower.includes('hospital') || sectorLower.includes('médic')) {
    sectorContext = 'Na área da saúde, TI madura é essencial para garantir continuidade do atendimento 24/7, proteção de dados sensíveis (LGPD + regulamentações específicas) e eficiência operacional em um setor que cresce 8-12% ao ano.';
    sectorRisks = 'Riscos incluem interrupções no atendimento (custo significativo por hora de downtime), não conformidade com LGPD (multas substanciais), impactos na segurança do paciente, e ineficiências que podem representar 20-30% dos custos operacionais.';
    sectorOpportunities = 'Oportunidades incluem telemedicina (crescimento de 300% pós-pandemia), prontuário eletrônico integrado (redução de 25% nos erros médicos), IA para diagnósticos (precisão 15-20% superior), e otimização de leitos (aumento de 20-30% na ocupação eficiente).';
    financialImpact = 'Hospitais com TI madura apresentam margem operacional 15-25% superior e redução de 30-40% nos custos administrativos.';
    benchmarks = 'Líderes como Hospital Israelita Albert Einstein e Sírio-Libanês operam com maturidade nível 4-5, enquanto hospitais regionais frequentemente permanecem no nível 2.';
    technologies = 'Tecnologias críticas: FHIR para interoperabilidade, IA para diagnóstico por imagem, IoT para monitoramento de pacientes, cloud híbrida para dados sensíveis, e RPA para processos administrativos.';
    compliance = 'Conformidade obrigatória: LGPD, CFM 2227/2018 (telemedicina), ANVISA RDC 302/2005 (sistemas informatizados), e ISO 27001 para segurança.';
  } else if (sectorLower.includes('manufat') || sectorLower.includes('indust') || sectorLower.includes('produção')) {
    sectorContext = 'Na indústria brasileira, TI madura é crucial para manter competitividade global, integração com automação industrial (Indústria 4.0) e eficiência operacional em um setor que representa 20% do PIB nacional.';
    sectorRisks = 'Riscos incluem paradas de produção (custo significativo por hora), perda de matéria-prima por ineficiências (5-15% do total), atrasos na cadeia de suprimentos, e perda de competitividade frente a indústrias digitalizadas (diferencial de 25-40% em produtividade).';
    sectorOpportunities = 'Oportunidades incluem Indústria 4.0 (aumento de 20-35% na produtividade), IoT para manutenção preditiva (redução de 30-50% nos custos de manutenção), otimização de processos com IA, e diferenciação através de produtos inteligentes conectados.';
    financialImpact = 'Indústrias com TI madura apresentam OEE (Overall Equipment Effectiveness) 15-25% superior e redução de 20-30% nos custos operacionais.';
    benchmarks = 'Líderes como Embraer e Vale operam com maturidade nível 4-5, enquanto indústrias tradicionais frequentemente permanecem no nível 2-3.';
    technologies = 'Tecnologias críticas: IIoT (Industrial IoT), edge computing, digital twins, MES integrado ao ERP, IA para qualidade, e cybersecurity industrial.';
    compliance = 'Conformidade obrigatória: ISO 27001, IEC 62443 (segurança industrial), LGPD, e regulamentações ambientais específicas do setor.';
  } else if (sectorLower.includes('varejo') || sectorLower.includes('comércio') || sectorLower.includes('e-commerce')) {
    sectorContext = 'No varejo brasileiro, TI madura é vital para experiência omnichannel, competitividade no mercado digital (que cresce 20-25% ao ano) e adaptação às mudanças aceleradas do comportamento do consumidor pós-pandemia.';
    sectorRisks = 'Riscos incluem perda de vendas por indisponibilidade (cada hora de downtime tem custo substancial), insatisfação do cliente (NPS baixo reduz vendas em 15-25%), perda de market share para concorrentes digitais, e ineficiências operacionais que podem representar 10-20% dos custos.';
    sectorOpportunities = 'Oportunidades incluem personalização com IA (aumento de 15-30% na conversão), analytics de comportamento para otimização de estoque, automação de marketing (ROI de 300-500%), e novos canais de vendas digitais (social commerce, live commerce).';
    financialImpact = 'Varejistas com TI madura apresentam margem líquida 10-20% superior e crescimento de vendas 25-40% maior que concorrentes tradicionais.';
    benchmarks = 'Líderes como Magazine Luiza e Mercado Livre operam com maturidade nível 4-5, enquanto varejistas tradicionais frequentemente permanecem no nível 2-3.';
    technologies = 'Tecnologias críticas: e-commerce headless, CDP (Customer Data Platform), IA para recomendações, chatbots, realidade aumentada, e omnichannel integrado.';
    compliance = 'Conformidade obrigatória: LGPD, Marco Civil da Internet, Código de Defesa do Consumidor digital, e PCI-DSS para pagamentos.';
  } else {
    sectorContext = `Para empresas de ${sector}, TI madura é fundamental para eficiência operacional, competitividade digital e adaptação às mudanças aceleradas do mercado brasileiro.`;
    sectorRisks = 'Riscos incluem ineficiências operacionais (15-25% dos custos), perda de oportunidades de mercado, vulnerabilidades de segurança, e desvantagem competitiva frente a concorrentes digitalizados.';
    sectorOpportunities = 'Oportunidades incluem automação de processos (redução de 30-50% nos custos operacionais), analytics para tomada de decisão, diferenciação competitiva através de inovação digital, e novos modelos de negócio habilitados por tecnologia.';
    financialImpact = 'Empresas com TI madura apresentam produtividade 20-35% superior e crescimento de receita 15-25% maior que concorrentes tradicionais.';
    benchmarks = 'Empresas líderes no setor operam com maturidade nível 4-5, enquanto organizações tradicionais frequentemente permanecem no nível 2-3.';
    technologies = 'Tecnologias críticas: cloud computing, analytics avançado, automação de processos (RPA), IA/ML, e cybersecurity avançada.';
    compliance = 'Conformidade obrigatória: LGPD, regulamentações específicas do setor, ISO 27001 para segurança, e frameworks de governança corporativa.';
  }
  
  const summary = `DIAGNÓSTICO EXECUTIVO ESTRATÉGICO

${sectorContext} A avaliação POC revela maturidade de TI no ${maturityLevel}, posicionando a organização ${criticalDimensions.length > 0 ? 'abaixo do benchmark setorial' : 'em linha com líderes do setor'} com ${criticalDimensions.length} dimensão(ões) crítica(s) identificada(s).

${financialImpact} ${benchmarks} Esta análise de 6 práticas essenciais (de 34 totais do framework ITIL v4) indica necessidade urgente de ação para ${criticalDimensions.length > 0 ? 'mitigar riscos operacionais e financeiros significativos' : 'manter posição competitiva e acelerar crescimento'}.

${criticalDimensions.length > 0 ? `As dimensões críticas (${criticalDimensions.join(', ')}) representam exposição significativa a riscos operacionais e custos substanciais de ineficiência e oportunidades perdidas.` : 'A organização demonstra base sólida de maturidade, com oportunidades de otimização para alcançar excelência operacional.'} ${strongDimensions.length > 0 ? `As dimensões fortes (${strongDimensions.join(', ')}) podem servir como alavancas para acelerar melhorias nas áreas críticas, criando sinergia operacional.` : ''}

${compliance} A conformidade regulatória é crítica e requer atenção imediata para evitar exposição legal e financeira.`;
  
  const analysis = `ANÁLISE TÉCNICA EXECUTIVA

${sectorRisks} A análise detalhada das 6 práticas avaliadas revela correlações críticas entre deficiências operacionais que amplificam riscos e custos. ${criticalDimensions.length > 0 ? 'As dimensões críticas criam efeito cascata, onde falhas em uma área impactam diretamente outras operações essenciais.' : 'A organização possui base sólida, mas pode otimizar integrações entre práticas para maximizar eficiência.'}

${sectorOpportunities} O investimento necessário para elevação da maturidade varia conforme o escopo e complexidade do ambiente, com ROI projetado de 200-400% em 18 meses através de redução de custos operacionais, aumento de produtividade e mitigação de riscos.

${technologies} A implementação deve seguir roadmap estruturado: Fase 1 (0-6 meses) - estabilização de processos críticos; Fase 2 (6-12 meses) - automação e integração; Fase 3 (12-18 meses) - otimização e inovação. Cada fase deve incluir KPIs específicos para mensuração de valor.

Quick wins identificados incluem: implementação de Service Desk estruturado (ROI em 3 meses), automação de processos manuais críticos (economia de 20-30% em FTE), e estabelecimento de SLAs para serviços essenciais (redução de 40-60% em incidentes recorrentes).

Esta avaliação POC representa apenas 18% das práticas totais do framework ITIL v4. Uma análise completa revelaria insights adicionais sobre práticas como Gestão de Portfolio, Arquitetura Empresarial, DevOps, Segurança Avançada, e Inovação Digital, fundamentais para transformação completa e vantagem competitiva sustentável.`;
  
  return { summary, analysis };
};

// Funções aprimoradas para análise premium quando IA não está disponível
const getGenericDiagnosis = (dimension: string): string => {
  const premiumDiagnoses: Record<string, string> = {
    'Dimensão Estratégica': 'Desalinhamento crítico entre TI e objetivos de negócio, ausência de governança de portfólio estruturada, e planejamento estratégico inadequado. Investimentos em TI sem métricas de ROI claras, resultando em desperdício de recursos estimado em 25-40% do orçamento anual de TI.',
    'Dimensão Operacional Core': 'Processos operacionais imaturos com alta variabilidade na entrega de serviços, baixa previsibilidade operacional, e ausência de SLAs estruturados. Tempo médio de resolução de incidentes 60-80% superior ao benchmark setorial, impactando diretamente a produtividade organizacional.',
    'Dimensão Governança e Controle': 'Controles inadequados com exposição significativa a riscos regulatórios, ausência de rastreabilidade de mudanças, e processos de compliance não estruturados. Vulnerabilidade significativa com potencial para multas substanciais e custos consideráveis de remediação.',
    'Dimensão Capacidade e Conhecimento': 'Dependência crítica de pessoas-chave (single points of failure), conhecimento não documentado representando 70-80% dos processos críticos, e ausência de programas estruturados de capacitação. Risco significativo de perda de conhecimento crítico por colaborador-chave.',
    'Dimensão Melhoria': 'Ausência de cultura de melhoria contínua, processos iterativos não estruturados, e métricas de performance inadequadas. Estagnação operacional resultando em perda de competitividade estimada em 15-25% ao ano frente a concorrentes com processos maduros.'
  };
  
  return premiumDiagnoses[dimension] || 'Diagnóstico específico não disponível para esta dimensão - recomenda-se avaliação detalhada.';
};

const getGenericRisks = (dimension: string): string[] => {
  const premiumRisks: Record<string, string[]> = {
    'Dimensão Estratégica': [
      'Investimentos em TI sem ROI mensurável (desperdício de 25-40% do orçamento)',
      'Desalinhamento com objetivos organizacionais (perda significativa de oportunidades)',
      'Dificuldade em justificar orçamento de TI para alta direção',
      'Perda de vantagem competitiva frente a concorrentes digitalizados'
    ],
    'Dimensão Operacional Core': [
      'Interrupções frequentes nos serviços críticos (custo significativo por hora de downtime)',
      'Baixa satisfação dos usuários internos (redução de 20-30% na produtividade)',
      'Custos operacionais elevados e imprevisíveis (15-25% acima do benchmark)',
      'SLAs não cumpridos gerando penalidades contratuais'
    ],
    'Dimensão Governança e Controle': [
      'Exposição a riscos regulatórios (multas substanciais - LGPD)',
      'Mudanças descontroladas causando instabilidade (downtime médio de 4-8 horas/mês)',
      'Falta de evidências para auditorias (custos significativos de remediação)',
      'Vulnerabilidades de segurança não identificadas'
    ],
    'Dimensão Capacidade e Conhecimento': [
      'Perda de conhecimento crítico com saída de colaboradores (impacto substancial por pessoa-chave)',
      'Baixa capacidade de resposta a demandas (aumento de 40-60% no time-to-market)',
      'Dificuldade em escalar a operação (limitação de crescimento em 20-30%)',
      'Dependência excessiva de fornecedores externos'
    ],
    'Dimensão Melhoria': [
      'Estagnação dos processos e práticas (perda de 15-25% em competitividade anual)',
      'Perda de oportunidades de otimização (economia potencial significativa anual)',
      'Repetição de falhas e problemas (custos recorrentes substanciais)',
      'Baixa adaptabilidade a mudanças do mercado'
    ]
  };
  
  return premiumRisks[dimension] || ['Riscos operacionais e de competitividade não quantificados - avaliação detalhada recomendada'];
};

const getGenericMitigations = (dimension: string): string[] => {
  const premiumMitigations: Record<string, string[]> = {
    'Dimensão Estratégica': [
      'Implementar governança de TI com comitê estratégico (ROI esperado: 200-300% em 18 meses)',
      'Criar metodologia de gestão de portfólio baseada em COBIT 2019',
      'Estabelecer métricas de valor de negócio (KPIs financeiros e operacionais)',
      'Implementar framework de arquitetura empresarial (TOGAF ou similar)'
    ],
    'Dimensão Operacional Core': [
      'Implementar ITSM com foco em gestão de incidentes (redução de 40-60% no MTTR)',
      'Estabelecer SLAs claros para serviços críticos (melhoria de 25-35% na satisfação)',
      'Criar central de serviços estruturada com automação (economia de 30-50% em FTE)',
      'Implementar monitoramento proativo com alertas inteligentes'
    ],
    'Dimensão Governança e Controle': [
      'Implementar controle de mudanças formal - CAB (redução de 70-80% em incidentes por mudança)',
      'Estabelecer políticas de segurança da informação baseadas em ISO 27001',
      'Criar processos de gestão de configuração com CMDB atualizado',
      'Implementar framework de gestão de riscos (ISO 31000)'
    ],
    'Dimensão Capacidade e Conhecimento': [
      'Criar base de conhecimento estruturada (redução de 50-70% no tempo de resolução)',
      'Implementar programas de capacitação continuada (ROI de 150-250%)',
      'Estabelecer processos de gestão de talentos com planos de sucessão',
      'Desenvolver competências internas críticas (redução de 30-40% na dependência externa)'
    ],
    'Dimensão Melhoria': [
      'Implementar ciclos de melhoria contínua - PDCA (melhoria de 20-35% em KPIs anuais)',
      'Estabelecer métricas e indicadores de performance com dashboards executivos',
      'Criar cultura de feedback e aprendizado organizacional',
      'Implementar metodologias ágeis para adaptabilidade (aumento de 40-60% na velocidade de entrega)'
    ]
  };
  
  return premiumMitigations[dimension] || ['Implementar controles básicos - avaliação detalhada recomendada para ações específicas'];
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
        // Prompt premium aprimorado com dados das práticas críticas
        const aiPrompt = `Você é um consultor sênior especialista em ITIL v4 e transformação digital, com 15+ anos de experiência no setor ${companyInfo.sector}. Esta é uma análise POC que deve demonstrar valor excepcional para incentivar uma avaliação completa.

**DADOS DA AVALIAÇÃO POC PREMIUM (6 de 34 práticas ITIL v4):**
- Empresa: ${companyInfo.name}
- Setor: ${companyInfo.sector}
- Pontuação Total: ${scores.total.toFixed(2)}/5.0 (${Math.round((scores.total/5)*100)}% de maturidade)
- Nível Atual: ${maturityLevel.name}
- Práticas Críticas Avaliadas: Gestão de Estratégia, Central de Serviços, Gestão de Incidentes, Gestão de Problemas, Gestão de Ativos, Controle de Mudanças

**PERFORMANCE POR DIMENSÃO:**
${Object.values(scores.byDimension).map(d => `• ${d.name}: ${d.score.toFixed(1)}/5.0 (${Math.round((d.score/5)*100)}%) - ${d.score >= 3 ? 'ADEQUADO' : 'CRÍTICO'}`).join('\n')}

**TOP 5 PRÁTICAS COM MAIOR GAP:**
${top10Gaps.slice(0,5).map((gap, idx) => `${idx+1}. ${gap.name}: Gap de ${gap.gap.toFixed(3)} pontos (Nível ${gap.level}/5)`).join('\n')}

**DIAGNÓSTICO DETALHADO POR DIMENSÃO CRÍTICA:**
${criticalPoints.map(cp => `• ${cp.dimension} (${cp.score.toFixed(1)}/5.0):\n  Diagnóstico: ${cp.diagnosis}\n  Riscos Principais: ${cp.risks.slice(0,3).join('; ')}\n  Ações Recomendadas: ${cp.mitigations.slice(0,2).join('; ')}`).join('\n\n')}

**INSTRUÇÕES PARA ANÁLISE EXECUTIVA PREMIUM:**

**MISSÃO CRÍTICA:** Criar uma análise tão valiosa e insights tão profundos que o cliente perceba imediatamente a necessidade de uma avaliação completa com todas as 34 práticas.

**ESTRUTURA OBRIGATÓRIA:**

1. **RESUMO EXECUTIVO ESTRATÉGICO (4-5 parágrafos densos):**
   - **Diagnóstico Direto**: Situação atual com score ${scores.total.toFixed(1)}/5.0 no contexto competitivo de ${companyInfo.sector}
   - **Impacto Financeiro Quantificado**: Custos de ineficiência, oportunidades perdidas (use % e valores estimados específicos do setor)
   - **Riscos Estratégicos Críticos**: 4-5 riscos específicos do setor com consequências financeiras tangíveis
   - **Posicionamento vs Concorrência**: Comparação com benchmarks típicos de empresas líderes em ${companyInfo.sector}
   - **Urgência Competitiva**: Por que agir AGORA é crítico para manter relevância no setor

2. **ANÁLISE TÉCNICA EXECUTIVA (6-7 parágrafos aprofundados):**
   - **Interconexão de Práticas**: Como as 6 práticas avaliadas se correlacionam e amplificam problemas operacionais
   - **Cascata de Impactos**: Como deficiências em uma prática criam efeito dominó em outras áreas críticas
   - **Gaps vs Benchmarks**: Comparação específica com empresas de referência em ${companyInfo.sector}
   - **Quick Wins Identificados**: 3-4 melhorias de alto impacto e baixo esforço com ROI estimado
   - **Investimento vs Retorno**: Análise financeira de investimento necessário vs benefícios projetados
   - **Roadmap de Valor**: Como a maturidade evoluirá em 6, 12 e 18 meses com impactos mensuráveis
   - **Diferencial Competitivo**: Como maturidade de TI pode ser vantagem estratégica no setor

**DIRETRIZES DE QUALIDADE EXECUTIVA:**
- Use pelo menos 5 métricas quantificadas em percentuais, tempos e proporções (EVITE valores monetários específicos)
- Inclua 3+ benchmarks ou estatísticas específicas do setor ${companyInfo.sector}
- Mencione frameworks complementares (COBIT, ISO 27001, NIST, etc.)
- Cite 2-3 tendências tecnológicas relevantes (Cloud, IA, DevOps, Automação, etc.)
- Use terminologia executiva (ROI, TCO, CAPEX, OPEX, KPIs, SLA, RTO, RPO, etc.) sem valores específicos
- Inclua riscos regulatórios/compliance específicos do setor
- Demonstre conhecimento profundo das características do setor
- Mencione cases de sucesso ou fracasso relevantes
- Inclua pelo menos 2 alertas sobre consequências de inação
- CRÍTICO: Use termos como "substancial", "significativo", "considerável" em vez de valores monetários

**ELEMENTOS OBRIGATÓRIOS:**
- Pelo menos 7 métricas quantificadas em percentuais e proporções
- 4-5 riscos com descrição de impacto operacional e estratégico
- 3-4 oportunidades com potencial de melhoria em percentuais
- Comparação com "empresas líderes do setor"
- Menção a pelo menos 3 tecnologias emergentes relevantes
- 2-3 alertas sobre riscos regulatórios/compliance
- Timeline específica de implementação com marcos
- IMPORTANTE: Evite valores monetários específicos - use termos como "significativo", "substancial", "considerável"

**FORMATO DE RESPOSTA:**
RESUMO EXECUTIVO ESTRATÉGICO
[Sua análise executiva estratégica aqui - 4-5 parágrafos densos e valiosos]

ANÁLISE TÉCNICA EXECUTIVA
[Sua análise técnica executiva aqui - 6-7 parágrafos aprofundados e acionáveis]

Responda em português brasileiro com linguagem executiva, consultiva e orientada a resultados financeiros.`;

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