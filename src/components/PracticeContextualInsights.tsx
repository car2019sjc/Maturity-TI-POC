import React, { useState, useEffect } from 'react';
import { Brain, Lightbulb, TrendingUp, AlertTriangle, Target, Loader } from 'lucide-react';
import { CompanyInfo } from '../utils/calculations';

interface PracticeContextualInsightsProps {
  practiceId: string;
  practiceName: string;
  practiceDescription: string;
  companyInfo: CompanyInfo;
  selectedLevel?: number;
  currentDimension: string;
}

interface PracticeInsight {
  sectorRelevance: string;
  businessImpact: string;
  levelGuidance: {
    [level: number]: {
      meaning: string;
      sectorExample: string;
      risks: string;
      benefits: string;
    };
  };
  recommendedActions: string[];
}

export const PracticeContextualInsights: React.FC<PracticeContextualInsightsProps> = ({
  practiceId,
  practiceName,
  practiceDescription,
  companyInfo,
  selectedLevel,
  currentDimension
}) => {
  const [insights, setInsights] = useState<PracticeInsight | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Função para gerar insights de fallback específicos por prática e setor
  const generateFallbackInsights = (): PracticeInsight => {
    const practiceInsights = getPracticeSpecificInsights(practiceId, practiceName, companyInfo.sector);
    
    // Gerar ações específicas baseadas no nível atual selecionado
    const levelBasedActions = getLevelBasedActions(practiceId, practiceName, selectedLevel || 1, companyInfo.sector);
    
    return {
      sectorRelevance: practiceInsights.relevance,
      businessImpact: practiceInsights.impact,
      levelGuidance: practiceInsights.levelGuidance,
      recommendedActions: levelBasedActions
    };
  };

  // Função principal para obter insights específicos de cada prática
  const getPracticeSpecificInsights = (practiceId: string, practiceName: string, sector: string) => {
    
    // Insights específicos para Gestão de Estratégia
    if (practiceId === 'gestao_estrategia') {
      return {
        relevance: `A Gestão de Estratégia é o alicerce que conecta TI aos objetivos de negócio. Para empresas de ${sector}, isso significa garantir que cada investimento tecnológico gere valor mensurável e vantagem competitiva no mercado.`,
        impact: `Sem estratégia clara, organizações de ${sector} desperdiçam recursos em tecnologias desalinhadas, perdem oportunidades de mercado e ficam vulneráveis a concorrentes mais organizados estrategicamente.`,
        levelGuidance: {
          1: {
            meaning: "TI opera sem direcionamento estratégico claro",
            sectorExample: `Em ${sector}: Decisões de tecnologia tomadas por demanda isolada, sem visão de conjunto`,
            risks: "Investimentos dispersos e baixo ROI em TI",
            benefits: "Reconhecimento da necessidade de alinhamento estratégico"
          },
          2: {
            meaning: "Início do alinhamento TI-negócio com práticas básicas",
            sectorExample: `Em ${sector}: Algumas iniciativas conectadas aos objetivos, mas sem metodologia formal`,
            risks: "Alinhamento inconsistente e gaps de comunicação",
            benefits: "Primeiros passos rumo à governança estratégica"
          },
          3: {
            meaning: "Estratégia de TI formalizada e comunicada",
            sectorExample: `Em ${sector}: Plano estratégico de TI documentado e revisado anualmente`,
            risks: "Estratégia pode ficar estática sem adaptação contínua",
            benefits: "Direcionamento claro para investimentos e iniciativas"
          },
          4: {
            meaning: "Estratégia dinâmica com monitoramento ativo",
            sectorExample: `Em ${sector}: KPIs estratégicos acompanhados e estratégia ajustada conforme necessário`,
            risks: "Foco excessivo em métricas pode limitar inovação",
            benefits: "Capacidade de resposta rápida às mudanças de mercado"
          },
          5: {
            meaning: "TI como motor de transformação e inovação estratégica",
            sectorExample: `Em ${sector}: TI lidera iniciativas de transformação digital e novos modelos de negócio`,
            risks: "Complexidade da gestão estratégica pode sobrecarregar a organização",
            benefits: "Vantagem competitiva sustentável através da tecnologia"
          }
        },
        actions: [
          "Criar comitê estratégico TI-Negócio com reuniões mensais",
          "Desenvolver roadmap tecnológico alinhado aos objetivos corporativos",
          "Implementar métricas de valor de negócio para iniciativas de TI"
        ]
      };
    }

    // Insights específicos para Gestão de Portfólio
    if (practiceId === 'gestao_portfolio') {
      return {
        relevance: `A Gestão de Portfólio garante que os recursos limitados de TI sejam investidos nos projetos de maior valor. Em ${sector}, isso significa priorizar iniciativas que realmente impulsionam os resultados de negócio.`,
        impact: `Sem gestão de portfólio eficaz, empresas de ${sector} sofrem com projetos sobrepostos, recursos mal alocados e dificuldade para demonstrar o valor real dos investimentos em tecnologia.`,
        levelGuidance: {
          1: {
            meaning: "Projetos aprovados sem critérios claros de priorização",
            sectorExample: `Em ${sector}: Múltiplos projetos simultâneos sem análise de capacidade ou impacto`,
            risks: "Recursos dispersos e baixa taxa de sucesso dos projetos",
            benefits: "Reconhecimento da necessidade de priorização"
          },
          2: {
            meaning: "Lista básica de projetos com tentativas de priorização",
            sectorExample: `Em ${sector}: Planilha de projetos com classificação simples por importância`,
            risks: "Critérios subjetivos e mudanças frequentes de prioridade",
            benefits: "Visibilidade inicial do portfólio de projetos"
          },
          3: {
            meaning: "Processo formal de gestão de portfólio implementado",
            sectorExample: `Em ${sector}: Comitê de portfólio avalia e aprova projetos usando critérios definidos`,
            risks: "Processo pode ser rígido demais para mudanças necessárias",
            benefits: "Alocação eficiente de recursos e maior taxa de sucesso"
          },
          4: {
            meaning: "Portfólio otimizado com base em capacidade e valor",
            sectorExample: `Em ${sector}: Balanceamento automático do portfólio considerando recursos disponíveis`,
            risks: "Foco excessivo em eficiência pode limitar projetos inovadores",
            benefits: "Maximização do ROI e utilização otimizada de recursos"
          },
          5: {
            meaning: "Portfólio dinâmico orientado por valor estratégico",
            sectorExample: `Em ${sector}: Inteligência artificial ajuda na otimização contínua do portfólio`,
            risks: "Complexidade da gestão pode exigir ferramentas sofisticadas",
            benefits: "Agilidade estratégica e vantagem competitiva através de inovação"
          }
        },
        actions: [
          "Estabelecer critérios quantitativos para avaliação de projetos",
          "Implementar ferramenta de gestão de portfólio (PPM)",
          "Criar processo de revisão trimestral do portfólio"
        ]
      };
    }

    // Insights específicos para Gestão de Projetos
    if (practiceId === 'gestao_projetos') {
      return {
        relevance: `A Gestão de Projetos é crucial para transformar estratégias em realidade. Para ${sector}, isso significa entregar soluções tecnológicas no prazo, orçamento e qualidade esperados pelos stakeholders.`,
        impact: `Projetos mal gerenciados em ${sector} resultam em desperdício de recursos, perda de oportunidades de mercado e erosão da confiança dos stakeholders nos investimentos em TI.`,
        levelGuidance: {
          1: {
            meaning: "Projetos conduzidos sem metodologia formal",
            sectorExample: `Em ${sector}: Equipes trabalham sem cronograma definido ou controle de escopo`,
            risks: "Alta taxa de fracasso e estouro de prazo/orçamento",
            benefits: "Flexibilidade para ajustes rápidos em projetos simples"
          },
          2: {
            meaning: "Metodologias básicas aplicadas inconsistentemente",
            sectorExample: `Em ${sector}: Alguns projetos usam templates, outros seguem abordagens ad-hoc`,
            risks: "Resultados imprevisíveis e dificuldade de comparação",
            benefits: "Primeira estruturação dos processos de projeto"
          },
          3: {
            meaning: "Metodologia padrão implementada e seguida",
            sectorExample: `Em ${sector}: Todos os projetos seguem PMI/Scrum com gates de aprovação definidos`,
            risks: "Rigidez metodológica pode atrasar projetos urgentes",
            benefits: "Previsibilidade e qualidade consistente nas entregas"
          },
          4: {
            meaning: "Gestão de projetos integrada com outras disciplinas",
            sectorExample: `Em ${sector}: PMO integrado com gestão de mudanças e arquitetura corporativa`,
            risks: "Complexidade da integração pode criar overhead desnecessário",
            benefits: "Eficiência operacional e alinhamento organizacional"
          },
          5: {
            meaning: "Excelência em gestão com melhoria contínua",
            sectorExample: `Em ${sector}: IA otimiza cronogramas e machine learning prevê riscos de projetos`,
            risks: "Dependência excessiva de tecnologia pode reduzir flexibilidade humana",
            benefits: "Taxa de sucesso máxima e delivery predictable"
          }
        },
        actions: [
          "Certificar gerentes de projeto em metodologias reconhecidas",
          "Implementar ferramenta integrada de gestão de projetos",
          "Estabelecer PMO com governança clara de projetos"
        ]
      };
    }

    // Insights específicos para Gestão Financeira
    if (practiceId === 'gestao_financeira') {
      return {
        relevance: `A Gestão Financeira de TI é essencial para demonstrar valor e otimizar investimentos. Em ${sector}, isso significa transformar TI de centro de custo em parceiro estratégico que gera valor mensurável.`,
        impact: `Sem controle financeiro adequado, organizações de ${sector} enfrentam orçamentos descontrolados, dificuldade para justificar investimentos e perda de credibilidade da área de TI.`,
        levelGuidance: {
          1: {
            meaning: "Orçamento de TI gerenciado de forma reativa",
            sectorExample: `Em ${sector}: Gastos aprovados caso a caso sem planejamento anual`,
            risks: "Custos imprevisíveis e dificuldade para justificar investimentos",
            benefits: "Flexibilidade para necessidades urgentes e imprevistas"
          },
          2: {
            meaning: "Orçamento básico com controle de gastos",
            sectorExample: `Em ${sector}: Planilha de controle mensal com categorias de despesas`,
            risks: "Falta de visão estratégica e foco apenas em redução de custos",
            benefits: "Controle básico evita gastos excessivos"
          },
          3: {
            meaning: "Planejamento financeiro integrado ao planejamento de negócios",
            sectorExample: `Em ${sector}: Orçamento de TI alinhado com objetivos corporativos e ROI definido`,
            risks: "Rigidez orçamentária pode limitar aproveitamento de oportunidades",
            benefits: "Investimentos direcionados e justificativa clara de valor"
          },
          4: {
            meaning: "Gestão financeira orientada por valor e performance",
            sectorExample: `Em ${sector}: Chargeback/showback implementado com métricas de TCO e ROI`,
            risks: "Complexidade da medição pode gerar overhead administrativo",
            benefits: "Transparência total e otimização contínua de custos"
          },
          5: {
            meaning: "Excelência financeira com maximização de valor",
            sectorExample: `Em ${sector}: FinOps implementado com otimização automática de recursos cloud`,
            risks: "Sofisticação excessiva pode obscurecer decisões simples",
            benefits: "TI como driver de resultado financeiro corporativo"
          }
        },
        actions: [
          "Implementar metodologia de cálculo de TCO para todos os serviços",
          "Estabelecer chargeback para áreas consumidoras de TI",
          "Criar dashboard financeiro com KPIs de valor de negócio"
        ]
      };
    }

    // Insights específicos para Gestão de Riscos
    if (practiceId === 'gestao_riscos') {
      return {
        relevance: `A Gestão de Riscos protege ${sector} contra ameaças que podem impactar a continuidade dos negócios. Com ataques cibernéticos crescentes, é essencial ter processos maduros de identificação e mitigação de riscos.`,
        impact: `Falhas na gestão de riscos expõem empresas de ${sector} a vazamentos de dados, interrupções operacionais, multas regulatórias e perda de confiança dos clientes.`,
        levelGuidance: {
          1: {
            meaning: "Riscos não são identificados ou gerenciados sistematicamente",
            sectorExample: `Em ${sector}: Incidentes tratados apenas quando ocorrem, sem prevenção`,
            risks: "Exposição alta a ameaças conhecidas e desconhecidas",
            benefits: "Flexibilidade operacional sem burocracia de controles"
          },
          2: {
            meaning: "Alguns riscos identificados com controles básicos",
            sectorExample: `Em ${sector}: Lista de riscos principais com medidas pontuais`,
            risks: "Cobertura incompleta e controles não sistemáticos",
            benefits: "Consciência inicial dos principais riscos"
          },
          3: {
            meaning: "Processo formal de gestão de riscos implementado",
            sectorExample: `Em ${sector}: Matriz de riscos atualizada regularmente com planos de mitigação`,
            risks: "Processo pode ser burocrático e slow to respond",
            benefits: "Proteção sistemática contra riscos identificados"
          },
          4: {
            meaning: "Gestão de riscos integrada e proativa",
            sectorExample: `Em ${sector}: Monitoramento contínuo com alertas automáticos e resposta rápida`,
            risks: "Complexidade dos controles pode impactar agilidade",
            benefits: "Prevenção eficaz e resposta rápida a incidentes"
          },
          5: {
            meaning: "Gestão de riscos estratégica com inteligência de ameaças",
            sectorExample: `Em ${sector}: IA prediz novos riscos e otimiza controles automaticamente`,
            risks: "Dependência excessiva de tecnologia pode criar pontos cegos",
            benefits: "Proteção avançada e vantagem competitiva em segurança"
          }
        },
        actions: [
          "Realizar assessment completo de riscos de TI",
          "Implementar framework de gestão de riscos (ISO 31000)",
          "Estabelecer comitê de riscos com reuniões mensais"
        ]
      };
    }

    // Insights específicos para Gestão de Fornecedores
    if (practiceId === 'gestao_fornecedores') {
      return {
        relevance: `A Gestão de Fornecedores é crítica para ${sector} pois garante que parceiros externos entreguem valor sem comprometer qualidade ou segurança. Com crescente dependência de terceiros, isso se torna estratégico.`,
        impact: `Fornecedores mal gerenciados expõem empresas de ${sector} a riscos de qualidade, segurança, conformidade e podem resultar em interrupções de serviços críticos.`,
        levelGuidance: {
          1: {
            meaning: "Fornecedores gerenciados de forma reativa e informal",
            sectorExample: `Em ${sector}: Contratos básicos sem SLAs ou monitoramento de performance`,
            risks: "Qualidade inconsistente e riscos não controlados",
            benefits: "Flexibilidade para mudanças rápidas de fornecedores"
          },
          2: {
            meaning: "Alguns controles básicos e processos de seleção",
            sectorExample: `Em ${sector}: Critérios simples de seleção e contratos com termos básicos`,
            risks: "Gestão inconsistente entre diferentes fornecedores",
            benefits: "Primeira estruturação da relação com fornecedores"
          },
          3: {
            meaning: "Processo formal de gestão com SLAs definidos",
            sectorExample: `Em ${sector}: Contratos detalhados com SLAs e monitoramento regular`,
            risks: "Rigidez contratual pode limitar flexibilidade",
            benefits: "Qualidade previsível e relacionamento estruturado"
          },
          4: {
            meaning: "Parceria estratégica com gestão integrada",
            sectorExample: `Em ${sector}: Colaboração próxima com fornecedores chave em inovação`,
            risks: "Dependência excessiva de fornecedores estratégicos",
            benefits: "Vantagem competitiva através de parcerias"
          },
          5: {
            meaning: "Ecossistema de fornecedores otimizado e inovativo",
            sectorExample: `Em ${sector}: IA otimiza seleção e performance, co-inovação sistemática`,
            risks: "Complexidade do ecossistema pode ser difícil de gerenciar",
            benefits: "Inovação acelerada e valor máximo das parcerias"
          }
        },
        actions: [
          "Implementar processo formal de due diligence de fornecedores",
          "Estabelecer SLAs claros com penalidades e incentivos",
          "Criar programa de avaliação contínua de fornecedores"
        ]
      };
    }

    // Para outras práticas, usar insights genéricos melhorados
    return {
      relevance: `A prática ${practiceName} é fundamental para ${sector} pois impacta diretamente a eficiência operacional, qualidade dos serviços e competitividade no mercado.`,
      impact: `Deficiências em ${practiceName} podem resultar em riscos operacionais, custos elevados, insatisfação dos usuários e perda de oportunidades de mercado para empresas de ${sector}.`,
      levelGuidance: {
        1: {
          meaning: "Processos informais com alta dependência de pessoas",
          sectorExample: `Em ${sector}: Atividades realizadas de forma manual e reativa`,
          risks: "Inconsistências e riscos operacionais elevados",
          benefits: "Flexibilidade para mudanças rápidas"
        },
        2: {
          meaning: "Reconhecimento da necessidade com práticas básicas",
          sectorExample: `Em ${sector}: Algumas práticas documentadas com aplicação irregular`,
          risks: "Variabilidade na qualidade e eficiência",
          benefits: "Primeira estruturação dos processos"
        },
        3: {
          meaning: "Processos formalizados e aplicados consistentemente",
          sectorExample: `Em ${sector}: Procedimentos padronizados seguidos pela equipe`,
          risks: "Rigidez pode limitar adaptabilidade",
          benefits: "Operação estável e previsível"
        },
        4: {
          meaning: "Processos otimizados com monitoramento ativo",
          sectorExample: `Em ${sector}: Métricas definidas com melhorias regulares implementadas`,
          risks: "Foco em eficiência pode limitar inovação",
          benefits: "Alta performance e qualidade operacional"
        },
        5: {
          meaning: "Excelência operacional com melhoria contínua",
          sectorExample: `Em ${sector}: Automação avançada e otimização baseada em dados`,
          risks: "Complexidade excessiva se mal gerenciada",
          benefits: "Vantagem competitiva sustentável"
        }
      },
      actions: [
        `Formalizar processos de ${practiceName} com documentação clara`,
        `Estabelecer métricas específicas para monitoramento da prática`,
        `Capacitar equipe nas melhores práticas da área`
      ]
    };
  };

  // Função para gerar ações específicas baseadas no nível atual selecionado
  const getLevelBasedActions = (practiceId: string, practiceName: string, currentLevel: number, sector: string): string[] => {
    // Se está no nível 5 (máximo), focar em manter excelência
    if (currentLevel >= 5) {
      return [
        `Manter excelência em ${practiceName} através de benchmarking contínuo`,
        "Compartilhar melhores práticas com outras organizações do setor",
        "Inovar continuamente para manter liderança em maturidade"
      ];
    }

    const nextLevel = currentLevel + 1;
    
    // Ações específicas por prática e nível atual
    if (practiceId === 'gestao_estrategia') {
      switch (currentLevel) {
        case 1:
          return [
            "Formar grupo de trabalho para definir estratégia inicial de TI",
            "Mapear objetivos de negócio e identificar como TI pode apoiá-los",
            "Criar documento básico de visão e direcionamento de TI"
          ];
        case 2:
          return [
            "Formalizar plano estratégico de TI com metas SMART",
            "Apresentar estratégia para liderança e obter aprovação formal",
            "Criar cronograma de implementação das iniciativas estratégicas"
          ];
        case 3:
          return [
            "Implementar KPIs para monitorar progresso da estratégia",
            "Estabelecer revisões trimestrais da estratégia",
            "Integrar planejamento de TI com ciclo de planejamento corporativo"
          ];
        case 4:
          return [
            "Implementar dashboard executivo com indicadores estratégicos",
            "Criar capacidade de cenários e simulações estratégicas",
            "Desenvolver programa de inovação tecnológica alinhado à estratégia"
          ];
        default:
          return getGenericLevelBasedActions(practiceName, currentLevel, nextLevel, sector);
      }
    }

    if (practiceId === 'gestao_portfolio') {
      switch (currentLevel) {
        case 1:
          return [
            "Criar inventário completo de todos os projetos de TI em andamento",
            "Definir critérios básicos para classificação de projetos (alto, médio, baixo)",
            "Implementar reunião semanal para revisão do status dos projetos"
          ];
        case 2:
          return [
            "Desenvolver matriz de priorização com critérios quantitativos",
            "Criar processo formal de aprovação de novos projetos",
            "Implementar ferramenta básica para gestão do portfólio"
          ];
        case 3:
          return [
            "Integrar gestão de portfólio com planejamento de capacidade",
            "Implementar análise de interdependências entre projetos",
            "Criar processo de balanceamento dinâmico do portfólio"
          ];
        case 4:
          return [
            "Implementar otimização automática do portfólio baseada em algoritmos",
            "Criar simulações de cenários para tomada de decisão",
            "Desenvolver capacidade de portfolio analytics avançado"
          ];
        default:
          return getGenericLevelBasedActions(practiceName, currentLevel, nextLevel, sector);
      }
    }

    if (practiceId === 'gestao_projetos') {
      switch (currentLevel) {
        case 1:
          return [
            "Selecionar metodologia padrão (PMI, Scrum, etc.) para projetos",
            "Treinar equipe nos fundamentos da metodologia escolhida",
            "Implementar templates básicos para documentação de projetos"
          ];
        case 2:
          return [
            "Certificar gerentes de projeto na metodologia adotada",
            "Implementar ferramenta de gestão de projetos",
            "Criar processo formal de início e encerramento de projetos"
          ];
        case 3:
          return [
            "Estabelecer PMO (Project Management Office)",
            "Integrar gestão de projetos com gestão de mudanças",
            "Implementar métricas padronizadas para todos os projetos"
          ];
        case 4:
          return [
            "Implementar automação de relatórios e dashboards",
            "Desenvolver capacidade de gestão de programas complexos",
            "Criar centro de excelência em gestão de projetos"
          ];
        default:
          return getGenericLevelBasedActions(practiceName, currentLevel, nextLevel, sector);
      }
    }

    if (practiceId === 'gestao_financeira') {
      switch (currentLevel) {
        case 1:
          return [
            "Implementar controle básico de orçamento com categorias definidas",
            "Criar planilha de acompanhamento mensal de gastos",
            "Estabelecer processo de aprovação para despesas de TI"
          ];
        case 2:
          return [
            "Desenvolver planejamento orçamentário anual estruturado",
            "Implementar análise de TCO para principais sistemas",
            "Criar relatórios financeiros mensais para gestão"
          ];
        case 3:
          return [
            "Implementar metodologia de cálculo de ROI para projetos",
            "Estabelecer sistema de chargeback/showback",
            "Integrar planejamento financeiro de TI com planejamento corporativo"
          ];
        case 4:
          return [
            "Implementar FinOps para otimização contínua de custos",
            "Desenvolver modelos preditivos para planejamento financeiro",
            "Criar dashboard executivo com KPIs financeiros em tempo real"
          ];
        default:
          return getGenericLevelBasedActions(practiceName, currentLevel, nextLevel, sector);
      }
    }

    if (practiceId === 'gestao_riscos') {
      switch (currentLevel) {
        case 1:
          return [
            "Realizar assessment inicial de riscos de TI",
            "Criar registro básico de riscos identificados",
            "Implementar controles de segurança fundamentais"
          ];
        case 2:
          return [
            "Desenvolver matriz de riscos com probabilidade e impacto",
            "Criar planos de mitigação para riscos críticos",
            "Estabelecer processo de monitoramento mensal de riscos"
          ];
        case 3:
          return [
            "Integrar gestão de riscos com processos de mudança",
            "Implementar ferramentas de monitoramento automático",
            "Criar programa de conscientização em segurança"
          ];
        case 4:
          return [
            "Implementar inteligência de ameaças e threat hunting",
            "Desenvolver capacidade de resposta automatizada a incidentes",
            "Criar programa de resiliência cibernética avançado"
          ];
        default:
          return getGenericLevelBasedActions(practiceName, currentLevel, nextLevel, sector);
      }
    }

    if (practiceId === 'gestao_fornecedores') {
      switch (currentLevel) {
        case 1:
          return [
            "Criar inventário completo de todos os fornecedores de TI",
            "Desenvolver processo básico de seleção de fornecedores",
            "Implementar contratos com SLAs básicos"
          ];
        case 2:
          return [
            "Estabelecer critérios estruturados para avaliação de fornecedores",
            "Implementar processo de due diligence",
            "Criar sistema de monitoramento de SLAs"
          ];
        case 3:
          return [
            "Desenvolver programa de gestão de relacionamento com fornecedores",
            "Implementar avaliação contínua de performance",
            "Criar parcerias estratégicas com fornecedores chave"
          ];
        case 4:
          return [
            "Implementar plataforma integrada de gestão de fornecedores",
            "Desenvolver programa de co-inovação com parceiros",
            "Criar ecossistema otimizado de fornecedores"
          ];
        default:
          return getGenericLevelBasedActions(practiceName, currentLevel, nextLevel, sector);
      }
    }

    // Para outras práticas, gerar ações genéricas baseadas no nível
    return getGenericLevelBasedActions(practiceName, currentLevel, nextLevel, sector);
  };

  // Função para gerar ações genéricas baseadas no nível
  const getGenericLevelBasedActions = (practiceName: string, currentLevel: number, nextLevel: number, sector: string): string[] => {
    switch (currentLevel) {
      case 1:
        return [
          `Documentar processos atuais de ${practiceName}`,
          `Definir responsabilidades claras para ${practiceName}`,
          `Implementar controles básicos e procedimentos padronizados`
        ];
      case 2:
        return [
          `Formalizar metodologia para ${practiceName}`,
          `Treinar equipe nas melhores práticas`,
          `Implementar ferramentas adequadas para suportar os processos`
        ];
      case 3:
        return [
          `Estabelecer métricas e KPIs para ${practiceName}`,
          `Integrar com outros processos organizacionais`,
          `Implementar monitoramento contínuo e relatórios regulares`
        ];
      case 4:
        return [
          `Implementar automação de processos repetitivos`,
          `Desenvolver capacidades analíticas avançadas`,
          `Criar programa de melhoria contínua estruturado`
        ];
      default:
        return [
          `Manter excelência em ${practiceName}`,
          `Inovar continuamente nos processos`,
          `Compartilhar melhores práticas com o mercado`
        ];
    }
  };

  // Gerar insights quando o componente for montado ou quando o nível mudar
  useEffect(() => {
    setIsLoading(true);
    setError(null);
    
    // Simular carregamento e usar fallback inteligente
    setTimeout(() => {
      try {
        const fallbackInsights = generateFallbackInsights();
        setInsights(fallbackInsights);
      } catch (err) {
        setError('Erro ao gerar insights contextuais');
      } finally {
        setIsLoading(false);
      }
    }, 200); // Tempo de carregamento otimizado
  }, [practiceId, companyInfo.sector, selectedLevel]); // selectedLevel como dependência

  if (isLoading) {
    return (
      <div className="bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-xl p-6 mb-6">
        <div className="flex items-center justify-center space-x-3">
          <Loader className="animate-spin text-purple-600" size={20} />
          <div className="text-purple-800 font-medium">
            Gerando insights personalizados para {companyInfo.sector}...
          </div>
        </div>
      </div>
    );
  }

  if (!insights) {
    return null;
  }

  return (
    <div className="bg-gradient-to-r from-purple-50 to-blue-50 border-2 border-purple-200 rounded-xl p-6 mb-6 shadow-lg">
      {/* Header */}
      <div className="flex items-center mb-4">
        <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center mr-3">
          <Brain className="text-white" size={20} />
        </div>
        <div>
          <h6 className="text-lg font-bold text-gray-900">Análise Estratégica Personalizada</h6>
          <p className="text-sm text-gray-600">Impacto específico para {companyInfo.sector}</p>
        </div>
      </div>

      {error && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
          <div className="flex items-center">
            <AlertTriangle className="text-yellow-600 mr-2" size={16} />
            <span className="text-yellow-800 text-sm">{error}</span>
          </div>
        </div>
      )}

      {/* Impacto Crítico no Setor */}
      <div className="mb-4">
        <div className="flex items-center mb-2">
          <Target className="text-blue-600 mr-2" size={16} />
          <h6 className="font-semibold text-gray-900">🎯 Impacto Crítico para {companyInfo.sector}</h6>
        </div>
        <p className="text-gray-700 text-sm leading-relaxed bg-white bg-opacity-60 p-3 rounded-lg">
          {insights.sectorRelevance}
        </p>
      </div>

      {/* Riscos da Baixa Maturidade */}
      <div className="mb-4">
        <div className="flex items-center mb-2">
          <TrendingUp className="text-red-600 mr-2" size={16} />
          <h6 className="font-semibold text-gray-900">⚠️ Consequências da Baixa Maturidade</h6>
        </div>
        <p className="text-gray-700 text-sm leading-relaxed bg-white bg-opacity-60 p-3 rounded-lg">
          {insights.businessImpact}
        </p>
      </div>

      {/* Orientação para Nível Selecionado */}
      {selectedLevel && insights.levelGuidance[selectedLevel] && (
        <div className="mb-4">
          <div className="flex items-center mb-2">
            <Lightbulb className="text-yellow-600 mr-2" size={16} />
            <h6 className="font-semibold text-gray-900">💡 Detalhamento do Nível {selectedLevel}</h6>
          </div>
          <div className="bg-white bg-opacity-80 p-4 rounded-lg space-y-2">
            <div>
              <span className="font-medium text-gray-900">Significado:</span>
              <p className="text-gray-700 text-sm">{insights.levelGuidance[selectedLevel].meaning}</p>
            </div>
            <div>
              <span className="font-medium text-gray-900">Exemplo prático:</span>
              <p className="text-gray-700 text-sm">{insights.levelGuidance[selectedLevel].sectorExample}</p>
            </div>
            <div>
              <span className="font-medium text-red-700">⚠️ Risco:</span>
              <p className="text-red-700 text-sm">{insights.levelGuidance[selectedLevel].risks}</p>
            </div>
            <div>
              <span className="font-medium text-green-700">✅ Benefício:</span>
              <p className="text-green-700 text-sm">{insights.levelGuidance[selectedLevel].benefits}</p>
            </div>
          </div>
        </div>
      )}

      {/* Ações Recomendadas */}
      <div>
        <div className="flex items-center mb-2">
          <Target className="text-purple-600 mr-2" size={16} />
          <h6 className="font-semibold text-gray-900">
            {selectedLevel 
              ? selectedLevel >= 5 
                ? "🏆 Ações para Manter Excelência" 
                : `🚀 Próximos Passos: Evoluir do Nível ${selectedLevel} para ${selectedLevel + 1}`
              : "📋 Ações Recomendadas"
            }
          </h6>
        </div>
        {selectedLevel && selectedLevel < 5 && (
          <div className="mb-3 p-2 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-blue-800 text-xs font-medium">
              💡 Estas ações ajudarão sua organização a evoluir da situação atual (Nível {selectedLevel}) para o próximo nível de maturidade
            </p>
          </div>
        )}
        <div className="bg-white bg-opacity-60 p-3 rounded-lg">
          <ul className="space-y-1">
            {insights.recommendedActions.map((action, index) => (
              <li key={index} className="flex items-start text-sm text-gray-700">
                <span className="text-purple-600 mr-2 mt-1">•</span>
                {action}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}; 