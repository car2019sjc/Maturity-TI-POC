export interface Practice {
    id: string;
    name: string;
    levels: string[];
}

export interface Dimension {
    id: string;
    name: string;
    description: string;
    weight: number;
    practices: string[];
}

export interface MaturityLevel {
    level: number;
    name: string;
    scoreRange: [number, number];
    characteristics: string;
    risks: string;
}

export interface AssessmentData {
    dimensions: Dimension[];
    maturityLevels: MaturityLevel[];
}

// Práticas selecionadas para o POC (versão demo)
export const pocSelectedPractices = [
    'gestao_estrategia',      // Dimensão Estratégica
    'central_servicos',       // Dimensão Operacional
    'gestao_incidentes',      // Dimensão Operacional
    'gestao_problemas',       // Dimensão Operacional
    'gestao_ativos',          // Dimensão Operacional
    'controle_mudancas'       // Dimensão Governança
];

// Práticas completas (todas as 34) para mostrar no upsell
export const allPractices = [
    // Estratégica (9 práticas)
    { id: 'gestao_estrategia', name: 'Gestão de Estratégia', dimension: 'Estratégica', included: true },
    { id: 'gestao_portfolio', name: 'Gestão de Portfolio', dimension: 'Estratégica', included: false },
    { id: 'gestao_projetos', name: 'Gestão de Projetos', dimension: 'Estratégica', included: false },
    { id: 'gestao_financeira', name: 'Gestão Financeira', dimension: 'Estratégica', included: false },
    { id: 'analise_negocios', name: 'Análise de Negócios', dimension: 'Estratégica', included: false },
    { id: 'gestao_riscos', name: 'Gestão de Riscos', dimension: 'Estratégica', included: false },
    { id: 'gestao_fornecedores', name: 'Gestão de Fornecedores', dimension: 'Estratégica', included: false },
    { id: 'gestao_arquitetura', name: 'Gestão de Arquitetura', dimension: 'Estratégica', included: false },
    { id: 'gestao_relacionamentos', name: 'Gestão de Relacionamentos', dimension: 'Estratégica', included: false },

    // Operacional Core (12 práticas)
    { id: 'central_servicos', name: 'Central de Serviços', dimension: 'Operacional Core', included: true },
    { id: 'gestao_incidentes', name: 'Gestão de Incidentes', dimension: 'Operacional Core', included: true },
    { id: 'gestao_problemas', name: 'Gestão de Problemas', dimension: 'Operacional Core', included: true },
    { id: 'gestao_ativos', name: 'Gestão de Ativos de TI', dimension: 'Operacional Core', included: true },
    { id: 'gestao_solicitacoes', name: 'Gestão de Solicitações', dimension: 'Operacional Core', included: false },
    { id: 'gestao_nivel_servico', name: 'Gestão de Nível de Serviço', dimension: 'Operacional Core', included: false },
    { id: 'gestao_disponibilidade', name: 'Gestão de Disponibilidade', dimension: 'Operacional Core', included: false },
    { id: 'gestao_capacidade_desempenho', name: 'Gestão de Capacidade e Desempenho', dimension: 'Operacional Core', included: false },
    { id: 'monitoramento_eventos', name: 'Monitoramento e Gestão de Eventos', dimension: 'Operacional Core', included: false },
    { id: 'gestao_implantacao', name: 'Gestão de Implantação', dimension: 'Operacional Core', included: false },
    { id: 'gestao_infra_plataforma', name: 'Gestão de Infraestrutura e Plataforma', dimension: 'Operacional Core', included: false },
    { id: 'dev_gerenciamento_software', name: 'Desenvolvimento e Gerenciamento de Software', dimension: 'Operacional Core', included: false },

    // Governança e Controle (8 práticas)
    { id: 'controle_mudancas', name: 'Controle de Mudanças (Técnico)', dimension: 'Governança e Controle', included: true },
    { id: 'gestao_mudanca', name: 'Gestão de Mudança', dimension: 'Governança e Controle', included: false },
    { id: 'gestao_seguranca', name: 'Gestão de Segurança da Informação', dimension: 'Governança e Controle', included: false },
    { id: 'gestao_configuracao', name: 'Gestão de Configuração', dimension: 'Governança e Controle', included: false },
    { id: 'gestao_continuidade', name: 'Gestão de Continuidade do Serviço', dimension: 'Governança e Controle', included: false },
    { id: 'validacao_teste', name: 'Validação e Teste', dimension: 'Governança e Controle', included: false },
    { id: 'gestao_catalogo', name: 'Gestão de Catálogo', dimension: 'Governança e Controle', included: false },
    { id: 'medicao_relatorios', name: 'Medição e Relatórios', dimension: 'Governança e Controle', included: false },

    // Capacidade e Conhecimento (4 práticas)
    { id: 'gestao_talentos', name: 'Gestão de Talentos e Força de Trabalho', dimension: 'Capacidade e Conhecimento', included: false },
    { id: 'gestao_conhecimento', name: 'Gestão do Conhecimento', dimension: 'Capacidade e Conhecimento', included: false },
    { id: 'gestao_implementacao', name: 'Gestão de Implementação', dimension: 'Capacidade e Conhecimento', included: false },
    { id: 'design_servico', name: 'Design de Serviço', dimension: 'Capacidade e Conhecimento', included: false },

    // Melhoria (1 prática)
    { id: 'melhoria_continua', name: 'Melhoria Contínua', dimension: 'Melhoria', included: false }
];

// Dados de avaliação para o POC (apenas as 6 práticas selecionadas)
export const pocAssessmentData: AssessmentData = {
    dimensions: [
        {
            id: 'estrategica',
            name: 'Dimensão Estratégica',
            description: 'Esta dimensão avalia como a TI está alinhada com a estratégia organizacional e como contribui para os objetivos de negócio. No POC, avaliamos apenas a Gestão de Estratégia como amostra desta dimensão crítica.',
            weight: 0.30,
            practices: [
                'gestao_estrategia'
            ]
        },
        {
            id: 'operacional',
            name: 'Dimensão Operacional Core',
            description: 'Esta dimensão foca na excelência operacional dos serviços de TI no dia a dia. No POC, avaliamos 4 práticas fundamentais: Central de Serviços, Gestão de Incidentes, Gestão de Problemas e Gestão de Ativos de TI.',
            weight: 0.40, // Aumentado pois tem mais práticas no POC
            practices: [
                'central_servicos',
                'gestao_incidentes',
                'gestao_problemas',
                'gestao_ativos'
            ]
        },
        {
            id: 'governanca',
            name: 'Dimensão Governança e Controle',
            description: 'Esta dimensão estabelece os mecanismos de controle, conformidade e governança. No POC, avaliamos o Controle de Mudanças (Técnico) como amostra desta dimensão essencial.',
            weight: 0.30,
            practices: [
                'controle_mudancas'
            ]
        }
    ],
    maturityLevels: [
        {
            level: 1,
            name: 'Nível 1: Inicial/Caótico',
            scoreRange: [1, 1.8],
            characteristics: 'Os processos são imprevisíveis, mal controlados e reativos. A TI opera em modo "apagar incêndio", com sucesso dependendo de esforços individuais heroicos.',
            risks: 'Alto risco de falhas de serviço, custos imprevisíveis, baixa satisfação do cliente, alta dependência de indivíduos-chave.'
        },
        {
            level: 2,
            name: 'Nível 2: Reativo/Gerenciado',
            scoreRange: [1.81, 2.6],
            characteristics: 'Processos básicos de gerenciamento de TI são estabelecidos, mas ainda são amplamente reativos. Há consciência da necessidade de processos.',
            risks: 'Desempenho inconsistente dos serviços, dificuldade em escalar, decisões ainda são táticas em vez de estratégicas.'
        },
        {
            level: 3,
            name: 'Nível 3: Proativo/Definido',
            scoreRange: [2.61, 3.4],
            characteristics: 'Os processos são padronizados, documentados e proativos. A TI começa a se alinhar mais estreitamente com os objetivos de negócio.',
            risks: 'Risco de os processos se tornarem burocráticos se não forem otimizados, necessidade de maior investimento em ferramentas.'
        },
        {
            level: 4,
            name: 'Nível 4: Gerenciado/Mensurável',
            scoreRange: [3.41, 4.2],
            characteristics: 'A TI gerencia seus serviços usando medição e análise de dados quantitativos. As decisões são baseadas em dados.',
            risks: 'Risco de focar excessivamente em métricas, complexidade na coleta e análise de dados, necessidade de habilidades analíticas.'
        },
        {
            level: 5,
            name: 'Nível 5: Otimizado/Estratégico',
            scoreRange: [4.21, 5],
            characteristics: 'A TI é uma parceira estratégica que impulsiona a inovação e a melhoria contínua. Os processos são otimizados dinamicamente.',
            risks: 'Risco de complacência, necessidade de investimento contínuo em inovação, dificuldade em manter a liderança tecnológica.'
        },
    ]
};

// Export com o nome esperado pelos outros componentes
export const assessmentData = pocAssessmentData;