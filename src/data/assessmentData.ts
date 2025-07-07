export interface Practice {
  id: string;
  name: string;
  levels: string[];
}

export interface Dimension {
  id: string;
  name: string;
  description: string; // Nova propriedade para descrição da dimensão
  weight: number;
  practices: string[]; // Agora é uma lista de IDs
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

export const assessmentData: AssessmentData = {
  dimensions: [
    {
      id: 'estrategica',
      name: 'Dimensão Estratégica',
      description: 'Esta dimensão avalia como a TI está alinhada com a estratégia organizacional e como contribui para os objetivos de negócio. Engloba o planejamento estratégico de TI, gestão de portfólio, projetos, recursos financeiros, análise de negócios, gestão de riscos, fornecedores, arquitetura corporativa e relacionamentos com stakeholders. Uma dimensão estratégica madura garante que a TI seja uma parceira do negócio, direcionando investimentos de forma inteligente e criando valor sustentável.',
      weight: 0.30,
      practices: [
        'gestao_estrategia',
        'gestao_portfolio',
        'gestao_projetos',
        'gestao_financeira',
        'analise_negocios',
        'gestao_riscos',
        'gestao_fornecedores',
        'gestao_arquitetura',
        'gestao_relacionamentos',
      ]
    },
    {
      id: 'operacional',
      name: 'Dimensão Operacional Core',
      description: 'Esta dimensão foca na excelência operacional dos serviços de TI no dia a dia. Abrange desde o atendimento ao usuário final (Central de Serviços) até a gestão proativa de incidentes, problemas, disponibilidade, capacidade, mudanças e ativos. Também inclui práticas de desenvolvimento, implantação e monitoramento. Uma operação madura garante serviços estáveis, confiáveis e alinhados às expectativas do negócio, com foco na experiência do usuário e na prevenção de problemas.',
      weight: 0.25,
      practices: [
        'central_servicos',
        'gestao_incidentes',
        'gestao_solicitacoes',
        'gestao_nivel_servico',
        'gestao_disponibilidade',
        'gestao_capacidade_desempenho',
        'monitoramento_eventos',
        'gestao_problemas',
        'gestao_implantacao',
        'gestao_infra_plataforma',
        'gestao_ativos',
        'dev_gerenciamento_software',
      ]
    },
    {
      id: 'governanca',
      name: 'Dimensão Governança e Controle',
      description: 'Esta dimensão estabelece os mecanismos de controle, conformidade e governança necessários para garantir que a TI opere de forma segura, controlada e alinhada às políticas organizacionais. Inclui gestão de mudanças organizacionais e técnicas, segurança da informação, configuração, continuidade, testes, catálogo de serviços e medição. Uma governança madura assegura que os riscos sejam gerenciados, as mudanças sejam controladas e os serviços sejam entregues com qualidade e conformidade.',
      weight: 0.20,
      practices: [
        'gestao_mudanca',
        'controle_mudancas',
        'gestao_seguranca',
        'gestao_configuracao',
        'gestao_continuidade',
        'validacao_teste',
        'gestao_catalogo',
        'medicao_relatorios',
      ]
    },
    {
      id: 'capacidade',
      name: 'Dimensão Capacidade e Conhecimento',
      description: 'Esta dimensão foca no desenvolvimento e gestão das capacidades humanas e organizacionais necessárias para entregar serviços de TI de qualidade. Abrange gestão de talentos, conhecimento, implementação de serviços e design centrado no usuário. Uma dimensão de capacidade madura garante que a organização tenha as competências certas, o conhecimento seja preservado e compartilhado, e que novos serviços sejam implementados com sucesso, sempre com foco na experiência e valor para o usuário final.',
      weight: 0.15,
      practices: [
        'gestao_talentos',
        'gestao_conhecimento',
        'gestao_implementacao',
        'design_servico',
      ]
    },
    {
      id: 'melhoria',
      name: 'Dimensão Melhoria',
      description: 'Esta dimensão representa o motor da evolução contínua da organização de TI. Foca na capacidade de identificar oportunidades de melhoria, implementar mudanças positivas e criar uma cultura de aprendizado e inovação. Uma dimensão de melhoria madura transforma a organização em um sistema que se auto-aperfeiçoa, sempre buscando maior eficiência, eficácia e valor para o negócio. É o que diferencia organizações que se mantêm estagnadas daquelas que evoluem constantemente.',
      weight: 0.10,
      practices: [
        'melhoria_continua',
      ]
    }
  ],
  maturityLevels: [
    { 
      level: 1, 
      name: 'Nível 1: Inicial/Caótico', 
      scoreRange: [1, 1.8],
      characteristics: 'Os processos são imprevisíveis, mal controlados e reativos. A TI opera em modo "apagar incêndio", com sucesso dependendo de esforços individuais heroicos. Não há planejamento ou visão estratégica.',
      risks: 'Alto risco de falhas de serviço, custos imprevisíveis, baixa satisfação do cliente, alta dependência de indivíduos-chave, incapacidade de suportar os objetivos de negócio.'
    },
    { 
      level: 2, 
      name: 'Nível 2: Reativo/Gerenciado', 
      scoreRange: [1.81, 2.6],
      characteristics: 'Processos básicos de gerenciamento de TI são estabelecidos, mas ainda são amplamente reativos. Há uma consciência da necessidade de processos, mas a implementação é inconsistente entre as equipes.',
      risks: 'Desempenho inconsistente dos serviços, dificuldade em escalar, as decisões ainda são táticas em vez de estratégicas, risco moderado de desalinhamento com o negócio.'
    },
    { 
      level: 3, 
      name: 'Nível 3: Proativo/Definido', 
      scoreRange: [2.61, 3.4],
      characteristics: 'Os processos são padronizados, documentados e proativos. A TI começa a se alinhar mais estreitamente com os objetivos de negócio e a fornecer serviços de forma consistente e controlada.',
      risks: 'Risco de os processos se tornarem burocráticos se não forem otimizados, necessidade de maior investimento em ferramentas e treinamento, resistência à padronização.'
    },
    { 
      level: 4, 
      name: 'Nível 4: Gerenciado/Mensurável', 
      scoreRange: [3.41, 4.2],
      characteristics: 'A TI gerencia seus serviços usando medição e análise de dados quantitativos. As decisões são baseadas em dados e o desempenho dos serviços é previsível e alinhado com as metas de negócio.',
      risks: 'Risco de focar excessivamente em métricas e perder a visão do valor para o cliente (XLAs), complexidade na coleta e análise de dados, necessidade de habilidades analíticas avançadas.'
    },
    { 
      level: 5, 
      name: 'Nível 5: Otimizado/Estratégico', 
      scoreRange: [4.21, 5],
      characteristics: 'A TI é uma parceira estratégica que impulsiona a inovação e a melhoria contínua. Os processos são otimizados dinamicamente com base em feedback quantitativo e alinhamento estratégico com o negócio.',
      risks: 'Risco de complacência, necessidade de investimento contínuo em inovação, dificuldade em manter a liderança e a vanguarda tecnológica e de processos.'
    },
  ]
};