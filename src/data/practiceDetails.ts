export interface PracticeDetail {
  id: string;
  name: string;
  description: string;
  levels: {
    level: number;
    name: string;
    description: string;
    characteristics: string[];
  }[];
}

export const practiceDetails: Record<string, PracticeDetail> = {
  gestao_estrategia: {
    id: 'gestao_estrategia',
    name: 'Gestão de Estratégia',
    description: 'A Gestão de Estratégia é uma prática central na área de Tecnologia da Informação (TI) que envolve o planejamento, desenvolvimento, implementação e gestão de estratégias que alinham as capacidades de TI com os objetivos gerais da organização. Através da gestão estratégica, as organizações podem garantir que os investimentos em TI sejam direcionados de forma a maximizar o valor, promover a inovação e manter a competitividade em um ambiente de negócios em constante evolução.',
    levels: [
      {
        level: 1,
        name: 'Estratégia Organizacional Não é Documentada',
        description: 'Neste nível inicial, a organização não possui uma estratégia formal ou documentada. As decisões de TI são tomadas de forma reativa e ad-hoc, sem um direcionamento claro ou alinhamento com objetivos de longo prazo.',
        characteristics: [
          'Ausência de Planejamento Estratégico: Não há processos formais para desenvolver ou documentar a estratégia de TI.',
          'Decisões Reativas: As ações são direcionadas por necessidades imediatas, problemas ou demandas pontuais.',
          'Falta de Alinhamento: As iniciativas de TI podem não estar alinhadas com os objetivos do negócio, resultando em esforços fragmentados.',
          'Dependência de Indivíduos: O conhecimento e a direção estratégica dependem de indivíduos específicos, sem compartilhamento ou consenso organizacional.',
          'Baixa Visibilidade: A organização não tem uma visão clara do futuro desejado ou dos caminhos para alcançá-lo.'
        ]
      },
      {
        level: 2,
        name: 'Estratégia é Definida, mas Não é Formalizada',
        description: 'A organização começa a reconhecer a importância da estratégia e define objetivos e metas, mas não há formalização ou documentação adequada. A estratégia existe de forma implícita ou informal, limitando sua eficácia.',
        characteristics: [
          'Definição Informal de Objetivos: Objetivos e metas são discutidos, mas não formalizados em documentos estratégicos.',
          'Comunicação Limitada: A estratégia não é amplamente comunicada ou compreendida pelos colaboradores.',
          'Aplicação Inconsistente: A implementação da estratégia é inconsistente, com iniciativas que podem não estar totalmente alinhadas.',
          'Falta de Processos Estruturados: Não há processos formais para revisão, atualização ou acompanhamento da estratégia.',
          'Riscos de Desalinhamento: As ações podem divergir dos objetivos estratégicos devido à falta de clareza e formalização.'
        ]
      },
      {
        level: 3,
        name: 'Estratégia é Documentada e Comunicada',
        description: 'A organização desenvolve e documenta formalmente sua estratégia de TI, alinhando-a com os objetivos de negócio. A estratégia é comunicada aos colaboradores, promovendo compreensão e engajamento.',
        characteristics: [
          'Documentação Formal: Desenvolvimento de um plano estratégico de TI que detalha objetivos, metas, iniciativas e indicadores.',
          'Alinhamento com o Negócio: A estratégia de TI é alinhada à estratégia corporativa, suportando os objetivos organizacionais.',
          'Comunicação Estruturada: A estratégia é comunicada a todos os níveis da organização, promovendo clareza e direção.',
          'Engajamento dos Stakeholders: Envolvimento de líderes e colaboradores na elaboração e implementação da estratégia.',
          'Processos de Implementação: Definição de planos de ação para executar as iniciativas estratégicas.',
          'Melhoria da Coesão Organizacional: A estratégia compartilhada promove alinhamento e colaboração entre equipes.'
        ]
      },
      {
        level: 4,
        name: 'Estratégia é Monitorada e Adaptada Regularmente',
        description: 'A organização implementa processos para monitorar o progresso da estratégia e adaptá-la conforme necessário. A estratégia é dinâmica, respondendo às mudanças internas e externas, e é integrada aos processos de gestão.',
        characteristics: [
          'Monitoramento Contínuo: Uso de indicadores-chave de desempenho (KPIs) para acompanhar o progresso em relação aos objetivos estratégicos.',
          'Processos de Revisão: Revisões periódicas da estratégia para avaliar sua relevância e eficácia.',
          'Flexibilidade e Adaptabilidade: Capacidade de ajustar a estratégia em resposta a mudanças no ambiente de negócios ou tecnológico.',
          'Integração com Gestão Operacional: A estratégia influencia e é influenciada pelas operações diárias e projetos de TI.',
          'Feedback Estruturado: Mecanismos para coletar feedback dos stakeholders e incorporar insights na estratégia.',
          'Transparência: Relatórios regulares sobre o progresso estratégico são compartilhados com a organização.'
        ]
      },
      {
        level: 5,
        name: 'Estratégia é uma Parte Fundamental do Processo Decisório',
        description: 'No nível mais avançado, a estratégia de TI é integral ao processo decisório em todos os níveis. As decisões são tomadas com base no alinhamento estratégico, e a estratégia orienta a cultura organizacional, a inovação e a vantagem competitiva.',
        characteristics: [
          'Decisões Estratégicas Informadas: Todas as decisões significativas consideram o impacto estratégico e contribuem para os objetivos de longo prazo.',
          'Cultura Orientada por Estratégia: A estratégia é incorporada na cultura organizacional, influenciando comportamentos e práticas.',
          'Inovação Estratégica: A estratégia promove e direciona a inovação para criar valor e vantagem competitiva.',
          'Alinhamento Total: As iniciativas, projetos e operações de TI estão totalmente alinhados com a estratégia.',
          'Engajamento Total dos Stakeholders: Colaboradores em todos os níveis compreendem e contribuem para a estratégia.',
          'Gestão Estratégica Avançada: Uso de metodologias avançadas para planejamento estratégico, como Balanced Scorecard, e integração com a gestão de riscos e desempenho.',
          'Monitoramento e Adaptação Dinâmica: A estratégia é continuamente refinada com base em insights e mudanças no ambiente.'
        ]
      }
    ]
  },
  gestao_portfolio: {
    id: 'gestao_portfolio',
    name: 'Gestão de Portfólio',
    description: 'A Gestão de Portfólio é uma prática estratégica essencial na área de Tecnologia da Informação (TI) que envolve a seleção, priorização e controle dos projetos e serviços de TI alinhados aos objetivos organizacionais. O objetivo principal é maximizar o valor entregue ao negócio, garantindo que os recursos sejam alocados de forma eficiente e que as iniciativas de TI suportem a estratégia corporativa.',
    levels: [
      {
        level: 1,
        name: 'Portfólio de Serviços Não é Gerenciado Formalmente',
        description: 'Neste nível inicial, a organização não possui uma abordagem formal para gerenciar seu portfólio de serviços e projetos de TI. As iniciativas são conduzidas de forma isolada, sem alinhamento claro com a estratégia organizacional.',
        characteristics: [
          'Falta de Visibilidade: Não há uma visão consolidada dos projetos e serviços em andamento ou planejados.',
          'Decisões Ad-hoc: As iniciativas são aprovadas e iniciadas sem critérios definidos ou análise de impacto.',
          'Alocação Ineficiente de Recursos: Recursos são distribuídos sem priorização, levando a conflitos e sobrecarga de equipes.',
          'Baixo Alinhamento Estratégico: As iniciativas de TI podem não contribuir para os objetivos de negócio, resultando em desperdício de recursos.',
          'Riscos Elevados: A falta de coordenação aumenta o risco de duplicação de esforços e falhas nos projetos.'
        ]
      },
      {
        level: 2,
        name: 'Portfólio é Documentado, mas com Pouca Priorização',
        description: 'A organização começa a documentar o portfólio de serviços e projetos de TI, mas ainda carece de uma priorização efetiva. As iniciativas são listadas, mas a tomada de decisão sobre quais projetos prosseguir é limitada.',
        characteristics: [
          'Registro Básico: Existência de um catálogo ou lista de projetos e serviços, mas sem detalhes aprofundados.',
          'Priorização Limitada: Falta de critérios claros para priorizar iniciativas; decisões baseadas em urgência percebida ou influência individual.',
          'Comunicação Inconsistente: As partes interessadas não têm acesso fácil às informações do portfólio.',
          'Processos Informais: Ausência de processos padronizados para avaliar, aprovar e monitorar iniciativas.',
          'Desalinhamento Estratégico: Algumas iniciativas podem estar alinhadas à estratégia, mas isso ocorre de forma não sistemática.'
        ]
      },
      {
        level: 3,
        name: 'Portfólio é Gerenciado Ativamente e Alinhado à Estratégia',
        description: 'A organização adota uma abordagem proativa para gerenciar o portfólio de TI, com processos definidos para seleção, priorização e monitoramento das iniciativas. Há um alinhamento claro entre o portfólio e a estratégia organizacional.',
        characteristics: [
          'Processos Estruturados: Implementação de metodologias para gestão do portfólio, incluindo critérios de seleção e priorização.',
          'Alinhamento Estratégico: As iniciativas são avaliadas quanto ao seu alinhamento com os objetivos estratégicos do negócio.',
          'Participação das Partes Interessadas: Envolvimento de executivos e stakeholders na tomada de decisão sobre o portfólio.',
          'Transparência: Comunicação clara sobre o status e priorização das iniciativas para todas as partes relevantes.',
          'Monitoramento Regular: Acompanhamento contínuo do progresso dos projetos e serviços, com ajustes conforme necessário.',
          'Gestão de Benefícios: Foco na realização dos benefícios esperados das iniciativas.'
        ]
      },
      {
        level: 4,
        name: 'Gestão de Portfólio é Integrada com Planejamento de Recursos',
        description: 'A gestão do portfólio está integrada com o planejamento de recursos, permitindo uma alocação otimizada de pessoal, orçamento e tecnologia. As decisões são baseadas em análises detalhadas de capacidade e demanda.',
        characteristics: [
          'Integração com Gestão de Recursos: Sincronização entre o portfólio e a disponibilidade de recursos humanos e financeiros.',
          'Análise de Capacidade: Avaliação da capacidade da organização para executar as iniciativas planejadas.',
          'Otimização de Recursos: Alocação eficiente de recursos para maximizar a produtividade e evitar sobrecargas.',
          'Previsão e Planejamento: Utilização de ferramentas e técnicas para prever demandas futuras e planejar antecipadamente.',
          'Gestão de Riscos: Identificação e mitigação de riscos relacionados à capacidade e recursos.',
          'Flexibilidade e Adaptabilidade: Capacidade de ajustar rapidamente o portfólio em resposta a mudanças nos recursos ou prioridades.'
        ]
      },
      {
        level: 5,
        name: 'Gestão de Portfólio Maximiza o Valor Estratégico',
        description: 'No nível mais avançado, a gestão de portfólio é altamente madura e focada em maximizar o valor estratégico para a organização. As decisões são orientadas por valor, e há uma cultura de melhoria contínua e inovação.',
        characteristics: [
          'Foco em Valor: Seleção e priorização de iniciativas com base em seu potencial de gerar valor estratégico.',
          'Medição de Performance: Uso de KPIs avançados para medir o desempenho do portfólio e o retorno sobre o investimento (ROI).',
          'Inovação Estratégica: O portfólio inclui iniciativas inovadoras que posicionam a organização à frente dos concorrentes.',
          'Governança Eficaz: Estruturas de governança robustas garantem a responsabilidade e a transparência nas decisões.',
          'Engajamento de Stakeholders: Alto nível de envolvimento e colaboração com todas as partes interessadas.',
          'Aprendizado Organizacional: Uso de lições aprendidas para aprimorar continuamente a gestão do portfólio.',
          'Alinhamento Dinâmico: O portfólio é continuamente ajustado para se alinhar às mudanças na estratégia e no ambiente de negócios.'
        ]
      }
    ]
  },
  gestao_projetos: {
    id: 'gestao_projetos',
    name: 'Gestão de Projetos',
    description: 'A Gestão de Projetos de Tecnologia da Informação (TI) é uma disciplina que envolve o planejamento, organização, controle e alocação de recursos para alcançar objetivos específicos de TI dentro de prazos e orçamentos definidos. A eficácia na gestão de projetos de TI é crucial para o sucesso organizacional, pois os projetos de TI frequentemente têm impacto significativo nos processos de negócio, inovação e vantagem competitiva.',
    levels: [
      {
        level: 1,
        name: 'Projetos Não Têm Metodologias Formais e Frequentemente Falham',
        description: 'Neste nível inicial, a organização não possui metodologias ou processos formais para gerenciar projetos de TI. As iniciativas são conduzidas de forma ad-hoc, sem planejamento adequado, resultando em frequentes falhas ou resultados insatisfatórios.',
        characteristics: [
          'Planejamento Insuficiente: Falta de definição clara de objetivos, escopo, cronograma e orçamento.',
          'Comunicação Ineficiente: Ausência de canais estruturados para comunicação entre membros da equipe e stakeholders.',
          'Recursos Mal Alocados: Alocação inadequada de recursos humanos, financeiros e tecnológicos.',
          'Gestão de Riscos Inexistente: Não há identificação ou mitigação de riscos potenciais.',
          'Falta de Controle: Ausência de monitoramento e controle do progresso do projeto.',
          'Resultados Negativos: Projetos frequentemente excedem o orçamento, atrasam ou não atendem aos requisitos.'
        ]
      },
      {
        level: 2,
        name: 'Metodologias Básicas Implementadas; Sucesso Inconsistente',
        description: 'A organização reconhece a necessidade de métodos formais e começa a implementar práticas básicas de gestão de projetos. No entanto, a aplicação é inconsistente, e o sucesso dos projetos varia.',
        characteristics: [
          'Introdução de Metodologias Simples: Uso inicial de ferramentas e técnicas básicas, como cronogramas e listas de tarefas.',
          'Processos Informais: Procedimentos não são padronizados ou documentados formalmente.',
          'Treinamento Limitado: Equipes podem não estar totalmente familiarizadas com as metodologias adotadas.',
          'Comunicação Melhorada: Alguns esforços para melhorar a comunicação, mas sem estratégias abrangentes.',
          'Gestão de Riscos Básica: Riscos são identificados, mas não gerenciados de forma sistemática.',
          'Sucesso Variável: Alguns projetos têm sucesso, enquanto outros continuam enfrentando problemas significativos.'
        ]
      },
      {
        level: 3,
        name: 'Gestão de Projetos Formalizada com Metodologias Padrão',
        description: 'A organização adota metodologias padrão de gestão de projetos, como PMI, Scrum etc. e as aplica consistentemente. Os projetos são planejados e executados de acordo com processos definidos, aumentando a taxa de sucesso.',
        characteristics: [
          'Processos Padronizados: Implementação de práticas e procedimentos documentados para todas as fases do projeto.',
          'Formação e Capacitação: Equipes recebem treinamento nas metodologias adotadas.',
          'Gestão de Riscos Estruturada: Riscos são identificados, analisados e mitigados de forma sistemática.',
          'Ferramentas de Gestão: Utilização de software e ferramentas especializadas para apoiar o planejamento e controle.',
          'Melhoria na Comunicação: Planos de comunicação são desenvolvidos, e stakeholders são mantidos informados.',
          'Monitoramento e Controle: Progresso dos projetos é monitorado regularmente, e ações corretivas são tomadas quando necessário.',
          'Resultados Consistentes: A maioria dos projetos atende aos objetivos definidos dentro dos prazos e orçamentos.'
        ]
      },
      {
        level: 4,
        name: 'Gestão de Projetos é Integrada e Monitorada',
        description: 'A gestão de projetos é integrada aos processos organizacionais e ao portfólio de projetos. Há monitoramento contínuo e ajustes são feitos para garantir o alinhamento com os objetivos estratégicos.',
        characteristics: [
          'Integração Organizacional: Gestão de projetos é alinhada com outras funções de gestão, como portfólio e programas.',
          'Governança Eficaz: Estruturas de governança são estabelecidas para supervisionar e orientar os projetos.',
          'Indicadores de Desempenho: Uso de KPIs para avaliar o desempenho dos projetos e da gestão de projetos como um todo.',
          'Gestão de Recursos Otimizada: Alocação eficiente de recursos com base nas prioridades estratégicas.',
          'Aprendizado e Melhoria Contínua: Lições aprendidas são capturadas e aplicadas em projetos futuros.',
          'Ferramentas Avançadas: Implementação de sistemas integrados de gestão de projetos (PMIS).',
          'Engajamento dos Stakeholders: Alto nível de envolvimento e comunicação com todas as partes interessadas.'
        ]
      },
      {
        level: 5,
        name: 'Excelência em Gestão de Projetos; Práticas de Melhoria Contínua',
        description: 'No nível mais avançado, a organização atinge excelência em gestão de projetos. Práticas de melhoria contínua são incorporadas, e a organização é ágil e adaptativa, com capacidade de inovar e se ajustar rapidamente às mudanças.',
        characteristics: [
          'Cultura de Melhoria Contínua: Processos são constantemente avaliados e aprimorados com base em feedback e métricas.',
          'Inovação e Agilidade: Capacidade de implementar novas abordagens e metodologias conforme necessário (por exemplo, Agile, DevOps).',
          'Benchmarking: Comparação com melhores práticas da indústria para identificar oportunidades de melhoria.',
          'Gestão do Conhecimento: Conhecimento e experiências são compartilhados e utilizados para aprimorar a gestão de projetos.',
          'Alinhamento Estratégico Dinâmico: Projetos são continuamente alinhados aos objetivos estratégicos em evolução.',
          'Excelência Operacional: Altos níveis de eficiência, eficácia e qualidade nos projetos entregues.',
          'Reconhecimento Externo: A organização é reconhecida como líder em gestão de projetos no setor.'
        ]
      }
    ]
  },
  gestao_financeira: {
    id: 'gestao_financeira',
    name: 'Gestão Financeira',
    description: 'A Gestão Financeira é uma função essencial na área de Tecnologia da Informação (TI) que envolve o planejamento, controle e monitoramento dos recursos financeiros associados às atividades de TI. Com o crescente investimento em tecnologia como um motor para a inovação e a vantagem competitiva, é crucial que as organizações gerenciem efetivamente os custos, orçamentos e investimentos em TI.',
    levels: [
      {
        level: 1,
        name: 'Gestão Financeira é Reativa; Orçamento Não é Controlado',
        description: 'Neste nível inicial, a gestão financeira em TI é inexistente ou extremamente limitada. Os custos são incorridos sem planejamento ou controle, e as despesas são reativas às necessidades imediatas. Não há orçamento formal, e os gastos podem exceder significativamente as expectativas sem justificativa ou monitoramento.',
        characteristics: [
          'Ausência de Planejamento Financeiro: Não há orçamento estabelecido para TI; despesas são aprovadas caso a caso.',
          'Controle Financeiro Ineficiente: Falta de monitoramento dos gastos reais em comparação com previsões ou expectativas.',
          'Decisões Reativas: Compras e investimentos são feitos em resposta a necessidades imediatas, sem avaliação de longo prazo.',
          'Falta de Transparência: Não há relatórios financeiros ou documentação adequada das despesas de TI.',
          'Riscos Elevados: Possibilidade de custos descontrolados, desperdício de recursos e impactos negativos no desempenho financeiro geral da organização.',
          'Dependência de Indivíduos: O conhecimento financeiro está concentrado em indivíduos específicos, sem processos ou sistemas formais.'
        ]
      },
      {
        level: 2,
        name: 'Orçamento é Controlado, mas Sem Estratégias',
        description: 'A organização reconhece a necessidade de controlar os gastos de TI e estabelece um orçamento básico. No entanto, não há estratégias financeiras ou alinhamento com os objetivos de negócios. O foco é na conformidade com o orçamento, em vez de otimizar o valor ou o ROI.',
        characteristics: [
          'Estabelecimento de Orçamento Básico: Um orçamento anual ou periódico é definido para TI, mas sem detalhes aprofundados.',
          'Monitoramento de Gastos: Gastos são rastreados em relação ao orçamento, com foco em não exceder os limites estabelecidos.',
          'Falta de Estratégia Financeira: Não há planejamento financeiro de longo prazo ou consideração de como os investimentos em TI suportam os objetivos de negócios.',
          'Decisões Táticas: As decisões financeiras são tomadas com base em necessidades imediatas, sem avaliação estratégica.',
          'Comunicação Limitada: Relatórios financeiros são esporádicos e podem não ser compartilhados amplamente.',
          'Controle de Custos Simples: Enfoque em cortar custos, em vez de otimizar investimentos para gerar valor.'
        ]
      },
      {
        level: 3,
        name: 'Gestão Financeira é Integrada ao Planejamento de Negócios',
        description: 'A gestão financeira de TI é formalizada e integrada ao planejamento de negócios. Os investimentos em TI são alinhados aos objetivos organizacionais, e há um planejamento financeiro mais robusto, incluindo previsões e análises de custos e benefícios.',
        characteristics: [
          'Planejamento Financeiro Estruturado: Desenvolvimento de planos financeiros detalhados que consideram custos operacionais e de capital.',
          'Alinhamento com Objetivos de Negócios: Os investimentos em TI são avaliados quanto ao suporte aos objetivos estratégicos.',
          'Análise de Custos e Benefícios: Avaliação sistemática dos benefícios esperados em relação aos custos associados.',
          'Processos de Aprovação Formais: Estabelecimento de procedimentos para aprovação de gastos e investimentos em TI.',
          'Relatórios Financeiros Regulares: Comunicação periódica do desempenho financeiro de TI para a gestão e partes interessadas.',
          'Monitoramento e Controle: Uso de sistemas e ferramentas para rastrear despesas e comparar com o orçamento e previsões.',
          'Engajamento das Partes Interessadas: Colaboração entre TI, finanças e outras áreas de negócios no planejamento financeiro.'
        ]
      },
      {
        level: 4,
        name: 'Gestão Financeira é Estratégica e Orientada por Valor',
        description: 'A gestão financeira de TI torna-se estratégica, com foco na maximização do valor e do retorno sobre o investimento. As decisões financeiras são orientadas por análises de valor, e a gestão financeira está integrada aos processos de governança e gestão de portfólio.',
        characteristics: [
          'Orientação por Valor: Decisões de investimento em TI são baseadas em seu potencial de gerar valor para a organização.',
          'Análise de ROI e TCO: Uso de métricas avançadas como Retorno sobre o Investimento (ROI) e Custo Total de Propriedade (TCO) para avaliar iniciativas.',
          'Integração com Governança: A gestão financeira está alinhada com a governança de TI e gestão de portfólio, garantindo que os investimentos suportem a estratégia organizacional.',
          'Planejamento Financeiro de Longo Prazo: Desenvolvimento de planos financeiros que consideram tendências futuras e mudanças tecnológicas.',
          'Gestão de Riscos Financeiros: Identificação e mitigação de riscos financeiros associados a investimentos em TI.',
          'Transparência Financeira: Relatórios detalhados e acessíveis que comunicam o desempenho financeiro de TI e o valor entregue.',
          'Colaboração Interdepartamental: Trabalho conjunto entre TI, finanças e outras áreas para otimizar investimentos e alinhamento estratégico.'
        ]
      },
      {
        level: 5,
        name: 'Excelência Financeira; Maximização de Valor e ROI',
        description: 'No nível mais avançado, a gestão financeira em TI atinge excelência, com processos otimizados que maximizam o valor e o ROI dos investimentos. A gestão financeira é proativa, inovadora e fundamental para a estratégia organizacional, contribuindo para a vantagem competitiva.',
        characteristics: [
          'Maximização do Valor: Foco contínuo em aumentar o valor dos investimentos em TI para a organização.',
          'Inovação Financeira: Uso de abordagens inovadoras para financiamento, alocação de recursos e gestão de custos.',
          'Análise Financeira Avançada: Aplicação de técnicas sofisticadas de análise financeira, incluindo modelagem financeira e previsão avançada.',
          'Gestão de Portfólio Otimizada: Alocação de recursos baseada em priorização estratégica e potencial de valor.',
          'Medição de Desempenho Financeiro: KPIs financeiros abrangentes são utilizados para monitorar e melhorar continuamente o desempenho.',
          'Cultura Financeira Madura: Todos os níveis da organização entendem a importância da gestão financeira e contribuem para a otimização dos recursos.',
          'Agilidade Financeira: Capacidade de ajustar rapidamente os planos financeiros em resposta a mudanças no mercado ou na estratégia.',
          'Sustentabilidade Financeira: Equilíbrio entre investimentos de curto e longo prazo, garantindo a sustentabilidade financeira.'
        ]
      }
    ]
  },
  gestao_fornecedores: {
    id: 'gestao_fornecedores',
    name: 'Gestão de Fornecedores',
    description: 'A Gestão de Fornecedores é uma prática vital na área de Tecnologia da Informação (TI) que envolve a administração eficaz das relações com fornecedores de produtos, serviços e soluções tecnológicas. Com a crescente dependência de terceiros para fornecer componentes críticos de infraestrutura, software e serviços de TI, a capacidade de gerenciar fornecedores de forma estratégica é crucial para garantir a qualidade, a eficiência operacional e a inovação.',
    levels: [
      {
        level: 1,
        name: 'Relações com Fornecedores São Reativas e Não Gerenciadas',
        description: 'Neste nível inicial, a organização não possui processos formais para gerenciar fornecedores. As interações são reativas, ocorrendo apenas quando surgem problemas ou necessidades imediatas. Não há critérios claros para a seleção de fornecedores, e os contratos são estabelecidos sem uma avaliação abrangente.',
        characteristics: [
          'Processos Informais: Ausência de políticas ou procedimentos para seleção, contratação e gestão de fornecedores.',
          'Comunicação Limitada: Contato com fornecedores ocorre esporadicamente e é centrado em questões operacionais.',
          'Falta de Avaliação: Não há critérios estabelecidos para avaliar o desempenho ou a qualidade dos fornecedores.',
          'Riscos Elevados: Possibilidade de problemas como atrasos, produtos de baixa qualidade ou não conformidade com requisitos.',
          'Dependência de Indivíduos: Relações baseadas em contatos pessoais, sem documentação ou registros adequados.'
        ]
      },
      {
        level: 2,
        name: 'Gestão de Fornecedores é Básica e Não Estratégica',
        description: 'A organização reconhece a necessidade de gerenciar fornecedores e implementa práticas básicas. No entanto, a gestão é tática e focada em transações específicas, sem alinhamento estratégico ou foco em melhoria contínua.',
        characteristics: [
          'Processos Básicos: Existência de procedimentos para contratação e pagamento, mas sem padronização completa.',
          'Seleção Simplificada: Critérios básicos, como preço e disponibilidade, são considerados na escolha de fornecedores.',
          'Contratos Simples: Estabelecimento de contratos básicos, mas sem cláusulas detalhadas sobre desempenho ou penalidades.',
          'Comunicação Reativa: Interações ocorrem principalmente em resposta a problemas ou solicitações.',
          'Monitoramento Limitado: Avaliação de desempenho é esporádica e não sistemática.',
          'Baixo Alinhamento Estratégico: Fornecedores não são vistos como parte integral da estratégia de negócios.'
        ]
      },
      {
        level: 3,
        name: 'Fornecedores São Gerenciados Formalmente com SLAs Definidos',
        description: 'A organização implementa processos formais de gestão de fornecedores, incluindo a definição de Acordos de Nível de Serviço (SLAs). Há um foco maior na qualidade, desempenho e conformidade, com monitoramento regular e comunicação estruturada.',
        characteristics: [
          'Processos Padronizados: Políticas e procedimentos claros para seleção, contratação e gestão de fornecedores.',
          'Critérios de Seleção Definidos: Avaliação dos fornecedores com base em critérios como qualidade, experiência, capacidade e estabilidade financeira.',
          'Contratos Detalhados: Estabelecimento de contratos formais com SLAs que definem expectativas de desempenho, qualidade e penalidades por não conformidade.',
          'Monitoramento Regular: Avaliação contínua do desempenho dos fornecedores em relação aos SLAs.',
          'Comunicação Estruturada: Reuniões periódicas e canais de comunicação definidos para resolução de problemas e alinhamento.',
          'Gestão de Riscos: Identificação e mitigação de riscos associados aos fornecedores.',
          'Conformidade Legal e Regulatória: Garantia de que os fornecedores atendem às exigências legais e normativas relevantes.'
        ]
      },
      {
        level: 4,
        name: 'Fornecedores São Parceiros Estratégicos',
        description: 'A organização desenvolve relações estratégicas com fornecedores-chave, tratando-os como parceiros que contribuem para o sucesso mútuo. Há colaboração ativa para melhoria contínua, inovação e alinhamento com os objetivos de negócios.',
        characteristics: [
          'Alinhamento Estratégico: Fornecedores são selecionados e gerenciados com base em sua capacidade de suportar a estratégia organizacional.',
          'Colaboração Próxima: Compartilhamento de informações, planejamento conjunto e desenvolvimento de soluções.',
          'Programas de Melhoria Contínua: Iniciativas conjuntas para aprimorar processos, qualidade e eficiência.',
          'Integração de Processos: Sistemas e processos são integrados para facilitar a colaboração e troca de informações.',
          'Gestão de Desempenho Avançada: Uso de KPIs e métricas para avaliar e melhorar o desempenho dos fornecedores.',
          'Comunicação Aberta: Diálogo contínuo e transparente para antecipar e resolver desafios.',
          'Gestão de Relacionamentos: Foco na construção de relacionamentos de longo prazo baseados em confiança e benefício mútuo.'
        ]
      },
      {
        level: 5,
        name: 'Gestão de Fornecedores Maximiza Valor e Promove Inovação',
        description: 'No nível mais avançado, a gestão de fornecedores é estratégica e orientada para maximizar o valor entregue à organização e promover a inovação. Os fornecedores são parceiros críticos na criação de vantagem competitiva e diferenciação no mercado.',
        characteristics: [
          'Co-criação de Valor: Desenvolvimento conjunto de produtos, serviços e soluções inovadoras.',
          'Inovação Colaborativa: Incentivo e suporte a iniciativas de inovação dos fornecedores que beneficiem ambas as partes.',
          'Alinhamento Cultural e Estratégico: Seleção de fornecedores que compartilham valores, cultura e visão estratégica.',
          'Compartilhamento de Riscos e Benefícios: Estruturas contratuais que refletem a natureza colaborativa e estratégica da relação.',
          'Governança Conjunta: Estabelecimento de comitês ou estruturas de governança para supervisionar iniciativas conjuntas.',
          'Flexibilidade e Agilidade: Capacidade de adaptar rapidamente as parcerias em resposta a mudanças no mercado ou na tecnologia.',
          'Sustentabilidade e Responsabilidade Social: Enfoque em práticas sustentáveis e éticas na cadeia de suprimentos.',
          'Reconhecimento de Fornecedores: Programas para reconhecer e recompensar fornecedores que excedem as expectativas.'
        ]
      }
    ]
  },
  gestao_arquitetura: {
    id: 'gestao_arquitetura',
    name: 'Gestão de Arquitetura de TI',
    description: 'A Gestão de Arquitetura é uma prática essencial no campo da Tecnologia da Informação (TI) que envolve a definição, manutenção e governança da arquitetura dos sistemas e infraestrutura de TI de uma organização. Ela assegura que os recursos tecnológicos estejam alinhados com os objetivos estratégicos do negócio, permitindo que a organização responda eficazmente às mudanças do mercado e às demandas dos clientes.',
    levels: [
      {
        level: 1,
        name: 'Arquitetura Não Documentada',
        description: 'Neste nível inicial, a organização não possui documentação formal da sua arquitetura de TI. As decisões são tomadas de forma reativa, geralmente em resposta a problemas imediatos, e dependem fortemente do conhecimento individual dos colaboradores.',
        characteristics: [
          'Decisões Reativas: Soluções são implementadas apenas quando surgem problemas críticos.',
          'Dependência de Indivíduos: O conhecimento sobre sistemas e processos reside em pessoas específicas, aumentando o risco de perda de conhecimento em caso de rotatividade.',
          'Falta de Padrões: Ausência de diretrizes e padrões estabelecidos para o desenvolvimento e integração de sistemas.',
          'Riscos Elevados: Maior propensão a falhas de segurança, incompatibilidades e ineficiências operacionais.'
        ]
      },
      {
        level: 2,
        name: 'Áreas de Arquitetura Parcialmente Definidas',
        description: 'A organização começa a reconhecer a importância da arquitetura de TI e inicia esforços para definir algumas áreas, mas a formalização é limitada e não abrangente.',
        characteristics: [
          'Documentação Parcial: Alguns sistemas e processos são documentados, mas de forma inconsistente.',
          'Iniciativas Isoladas: Projetos de padronização ocorrem em silos, sem uma visão integrada.',
          'Comunicação Limitada: Falta de comunicação efetiva entre equipes sobre decisões arquiteturais.',
          'Baixa Governança: Não há processos claros para governar ou atualizar a arquitetura existente.'
        ]
      },
      {
        level: 3,
        name: 'Arquitetura Documentada e Revisada Periodicamente',
        description: 'A organização possui uma arquitetura de TI documentada que é revisada e atualizada regularmente para refletir mudanças nos negócios e na tecnologia.',
        characteristics: [
          'Padrões Estabelecidos: Existência de normas e diretrizes para o desenvolvimento, integração e manutenção de sistemas.',
          'Processos de Revisão: Procedimentos formais para revisar e atualizar a arquitetura conforme necessário.',
          'Melhoria na Comunicação: Colaboração entre equipes de TI e outras áreas da organização para alinhar soluções tecnológicas com necessidades de negócio.',
          'Ferramentas de Gestão: Utilização de ferramentas e repositórios para gerenciar artefatos arquiteturais.'
        ]
      },
      {
        level: 4,
        name: 'Arquitetura Monitorada e Integrada ao Planejamento Estratégico',
        description: 'A arquitetura de TI é ativamente monitorada e está alinhada com o planejamento estratégico da organização. Decisões tecnológicas são tomadas com base em análises detalhadas e impactam positivamente os objetivos de negócio.',
        characteristics: [
          'Alinhamento Estratégico: A arquitetura de TI reflete e suporta a estratégia corporativa.',
          'Governança Eficaz: Estruturas de governança estão em vigor para garantir a conformidade com padrões e para facilitar a tomada de decisões.',
          'Monitoramento Contínuo: Uso de métricas e indicadores para avaliar o desempenho e a eficácia da arquitetura.',
          'Gestão de Riscos: Identificação e mitigação proativa de riscos relacionados à arquitetura de TI.'
        ]
      },
      {
        level: 5,
        name: 'Arquitetura Suporta Inovação Contínua e Automação de Processos',
        description: 'No nível mais avançado, a arquitetura de TI não apenas suporta as operações atuais, mas também impulsiona a inovação contínua e a automação de processos. A organização é ágil e capaz de adaptar-se rapidamente às mudanças do mercado.',
        characteristics: [
          'Inovação Integrada: Processos estabelecidos para incorporar novas tecnologias e soluções inovadoras.',
          'Automação Avançada: Alto grau de automação em processos operacionais e de desenvolvimento.',
          'Arquitetura Adaptativa: Capacidade de ajustar rapidamente a arquitetura em resposta a mudanças internas e externas.',
          'Cultura Colaborativa: Ambiente que incentiva a colaboração interdisciplinar e o compartilhamento de conhecimento.'
        ]
      }
    ]
  },
  gestao_relacionamentos: {
    id: 'gestao_relacionamentos',
    name: 'Gestão de Relacionamentos',
    description: 'A Gestão de Relacionamentos é uma prática essencial no campo da Tecnologia da Informação (TI) que se concentra em estabelecer, manter e melhorar as interações entre a organização de TI e seus stakeholders, incluindo clientes, fornecedores, parceiros e outras partes interessadas. Uma gestão eficaz de relacionamentos permite que a organização compreenda melhor as necessidades e expectativas de seus stakeholders, promovendo colaboração, confiança e co-criação de valor.',
    levels: [
      {
        level: 1,
        name: 'Relacionamentos São Informais e Não Estruturados',
        description: 'Neste nível inicial, a organização não possui processos ou estruturas formais para gerenciar relacionamentos. As interações com stakeholders são informais, esporádicas e dependem principalmente de iniciativas individuais.',
        characteristics: [
          'Comunicação Ad-hoc: Contatos são feitos quando surgem problemas ou necessidades imediatas.',
          'Falta de Processos: Não há procedimentos definidos para interação com stakeholders.',
          'Dependência de Indivíduos: Relacionamentos dependem de pessoas específicas, aumentando o risco de perda de conhecimento em caso de saída de colaboradores.',
          'Baixa Visibilidade: A organização tem pouca ou nenhuma visão das necessidades e expectativas dos stakeholders.',
          'Riscos Elevados: Possibilidade de mal-entendidos, conflitos e insatisfação devido à falta de comunicação estruturada.'
        ]
      },
      {
        level: 2,
        name: 'Comunicação com Stakeholders é Limitada e Reativa',
        description: 'A organização começa a reconhecer a importância dos stakeholders e estabelece canais básicos de comunicação. No entanto, as interações são principalmente reativas, ocorrendo em resposta a solicitações ou problemas específicos.',
        characteristics: [
          'Canais de Comunicação Básicos: Implementação de meios simples para contato, como e-mail ou telefone.',
          'Reatividade: A organização responde às necessidades somente quando abordada pelos stakeholders.',
          'Informação Limitada: Compartilhamento mínimo de informações, sem estratégias de comunicação proativas.',
          'Falta de Feedback Estruturado: Ausência de mecanismos para coletar e analisar feedback dos stakeholders.',
          'Engajamento Limitado: Pouco envolvimento dos stakeholders em decisões ou planejamentos.'
        ]
      },
      {
        level: 3,
        name: 'Gestão Formal de Relacionamentos Implementada',
        description: 'A organização estabelece processos formais para a gestão de relacionamentos, incluindo a identificação dos stakeholders, definição de estratégias de comunicação e atribuição de responsabilidades claras.',
        characteristics: [
          'Mapeamento de Stakeholders: Identificação e categorização dos stakeholders com base em sua influência e interesse.',
          'Estratégias de Comunicação: Desenvolvimento de planos para comunicação regular e estruturada com diferentes grupos de stakeholders.',
          'Designação de Responsabilidades: Nomeação de gestores de relacionamento ou pontos de contato dedicados.',
          'Feedback Sistemático: Implementação de pesquisas, reuniões e outros meios para coletar feedback.',
          'Documentação: Registros das interações e acordos estabelecidos com os stakeholders.',
          'Melhoria na Satisfação: Aumento da satisfação dos stakeholders devido à comunicação mais eficaz e responsiva.'
        ]
      },
      {
        level: 4,
        name: 'Parcerias Estratégicas São Estabelecidas e Gerenciadas',
        description: 'A organização passa a desenvolver parcerias estratégicas com stakeholders-chave, buscando alinhamento mútuo de objetivos e colaboração para benefícios compartilhados.',
        characteristics: [
          'Alinhamento Estratégico: Os objetivos dos stakeholders são alinhados aos objetivos organizacionais.',
          'Colaboração Ativa: Trabalho conjunto em projetos, iniciativas e resolução de problemas.',
          'Gestão de Contratos e Acordos: Estabelecimento de acordos formais que definem responsabilidades, expectativas e métricas de desempenho.',
          'Comunicação Bidirecional: Fluxo contínuo de informações entre a organização e os stakeholders.',
          'Gestão de Expectativas: Clareza sobre o que cada parte espera alcançar, com monitoramento regular do progresso.',
          'Mitigação de Riscos: Identificação e gerenciamento de riscos relacionados aos relacionamentos.'
        ]
      },
      {
        level: 5,
        name: 'Relacionamentos São Maximizados para Co-criação de Valor',
        description: 'No nível mais avançado, a organização e os stakeholders trabalham juntos de forma integrada para co-criar valor. Os relacionamentos são vistos como ativos estratégicos que impulsionam inovação, crescimento e vantagem competitiva.',
        characteristics: [
          'Co-criação de Valor: Desenvolvimento conjunto de novos produtos, serviços ou soluções que beneficiam todas as partes.',
          'Inovação Colaborativa: Compartilhamento de conhecimentos e recursos para fomentar a inovação.',
          'Cultura de Parceria: Ambiente organizacional que promove confiança, transparência e comprometimento mútuo.',
          'Métricas Compartilhadas: Definição de indicadores de desempenho que refletem os objetivos conjuntos.',
          'Flexibilidade e Adaptabilidade: Capacidade de ajustar os relacionamentos e estratégias em resposta a mudanças no ambiente de negócios.',
          'Reconhecimento de Benefícios Mútuos: Todas as partes reconhecem e valorizam os benefícios advindos da colaboração.'
        ]
      }
    ]
  },
  central_servicos: {
    id: 'central_servicos',
    name: 'Central de Serviços',
    description: 'A Central de Serviços ou Service Desk é uma função central na área de Tecnologia da Informação (TI) que atua como o ponto único de contato entre os usuários finais e a equipe de TI. Seu principal objetivo é facilitar a comunicação, resolver incidentes e atender às solicitações dos usuários de maneira eficiente e eficaz.',
    levels: [
      {
        level: 1,
        name: 'Atendimento Não é Centralizado; Suporte é Inconsistente',
        description: 'Neste nível inicial, o atendimento ao usuário não é centralizado, o que resulta em suporte fragmentado e inconsistências na resolução de problemas. Os usuários podem contatar diferentes membros da equipe de TI de maneira ad-hoc, levando a respostas variadas e tempos de resolução imprevisíveis.',
        characteristics: [
          'Atendimento Fragmentado: Suporte fornecido por diferentes membros da equipe sem uma estrutura centralizada.',
          'Falta de Padrões: Ausência de processos e procedimentos padronizados para atendimento e resolução de incidentes.',
          'Registros Inconsistentes: Incidentes e solicitações não são registrados de forma uniforme, dificultando o rastreamento e a análise.',
          'Alta Variabilidade na Qualidade do Suporte: A qualidade do atendimento varia dependendo do indivíduo que está fornecendo o suporte.',
          'Comunicação Ineficiente: Falta de canais estruturados para comunicação entre usuários e equipe de TI.',
          'Tempo de Resolução Prolongado: Respostas e soluções demoradas devido à ausência de processos claros.',
          'Dependência de Conhecimento Individual: Resolução de problemas depende do conhecimento e da disponibilidade de indivíduos específicos.',
          'Baixa Satisfação dos Usuários: Usuários insatisfeitos devido à inconsistência e à ineficiência no suporte.'
        ]
      },
      {
        level: 2,
        name: 'Central Básica Implementada; Registros Manuais',
        description: 'A organização reconhece a necessidade de centralizar o atendimento e implementa uma central básica de Service Desk. No entanto, o suporte ainda é limitado e os registros são mantidos manualmente, resultando em melhorias pontuais, mas ainda com desafios significativos na eficiência e na consistência do suporte.',
        characteristics: [
          'Implementação Inicial de um Service Desk Centralizado: Estabelecimento de um ponto único de contato para atendimento ao usuário.',
          'Registros Manuais de Incidentes e Solicitações: Utilização de planilhas ou formulários físicos para registrar incidentes e solicitações.',
          'Processos Básicos de Atendimento: Definição de procedimentos simples para o registro e a resolução de incidentes.',
          'Comunicação Restrita: Informações sobre o suporte são compartilhadas apenas com as equipes diretamente envolvidas.',
          'Monitoramento Limitado: Acompanhamento básico do número de incidentes e tempos de resposta.',
          'Redução Parcial de Falhas: Algumas melhorias na eficiência do suporte, mas ainda com alta incidência de problemas devido à gestão manual.',
          'Treinamento Básico da Equipe: Capacitação inicial da equipe em práticas de atendimento e registro de incidentes.',
          'Falta de Integração com Outros Processos: Service Desk não está integrado com outros processos de TI, como gestão de mudanças ou gestão de problemas.'
        ]
      },
      {
        level: 3,
        name: 'Processos Formalizados; Monitoramento de SLAs',
        description: 'A organização formaliza os processos do Service Desk, estabelecendo procedimentos claros e documentados para o atendimento ao usuário e a resolução de incidentes. São definidos Acordos de Nível de Serviço (SLAs) para garantir que os incidentes sejam tratados dentro de prazos específicos, melhorando a eficiência e a satisfação dos usuários.',
        characteristics: [
          'Processos Estruturados: Implementação de workflows padronizados para registro, classificação, priorização e resolução de incidentes e solicitações.',
          'Definição de SLAs: Estabelecimento de metas de tempo para resposta e resolução de incidentes com base em prioridades.',
          'Uso de Ferramentas de ITSM: Adoção de sistemas de Gestão de Serviços de TI (IT Service Management) para automatizar e gerenciar o registro de incidentes.',
          'Monitoramento e Relatórios de SLAs: Acompanhamento contínuo do cumprimento dos SLAs e geração de relatórios para avaliação de desempenho.',
          'Documentação Completa: Registros detalhados de todos os incidentes e solicitações, incluindo histórico e soluções aplicadas.',
          'Treinamento Avançado da Equipe: Capacitação mais aprofundada da equipe em processos de ITSM e melhores práticas de suporte.',
          'Comunicação Estruturada: Informações sobre o status dos incidentes são comunicadas de forma consistente aos usuários.',
          'Redução de Tempo de Resolução: Melhoria na eficiência da equipe de suporte, resultando em tempos de resolução mais rápidos.',
          'Feedback dos Usuários: Mecanismos para coletar feedback dos usuários sobre a qualidade do suporte recebido.'
        ]
      },
      {
        level: 4,
        name: 'Gestão Proativa com Autosserviço e Melhoria Contínua',
        description: 'Neste nível, a organização oferece canais de autosserviço (portal, chatbot, app), com formulários inteligentes e workflows automatizados para atender grande parte das solicitações sem intervenção humana. A gestão é orientada por dados, com análise contínua das solicitações para melhoria do catálogo e dos processos.',
        characteristics: [
          'Portal de autosserviço e/ou chatbot ativo para abertura e acompanhamento de solicitações.',
          'Workflows automatizados para aprovações, execução e comunicação.',
          'Catálogo de serviços é atualizado com base nas análises de recorrência.',
          'Equipes atuam com foco em melhorar a experiência do usuário.',
          'Integração com processos de gestão de acesso, ativos e segurança.',
          'Feedback do usuário ao final do atendimento é coletado e utilizado.',
          'Indicadores de desempenho são utilizados para melhorar continuamente os fluxos.',
          'Redução de erros humanos e aumento da previsibilidade nos atendimentos.'
        ]
      },
      {
        level: 5,
        name: 'Atendimento Automatizado, Personalizado e Antecipado às Necessidades',
        description: 'No estágio mais maduro, a Gestão de Solicitações utiliza inteligência artificial, analytics e automação para prever necessidades dos usuários, sugerir soluções antes da solicitação e realizar atendimentos personalizados. A prática se integra profundamente à estratégia de experiência digital da organização.',
        characteristics: [
          'Sistema inteligente que recomenda ou antecipa solicitações com base no perfil do usuário e histórico.',
          'Integração com ferramentas de RPA (automação robótica de processos) para execução automática de tarefas.',
          'Resolução de solicitações via assistentes virtuais, com linguagem natural.',
          'Autosserviço contextualizado: o portal oferece sugestões com base no comportamento do usuário.',
          'Relatórios avançados com insights sobre oportunidades de otimização dos serviços.',
          'Gestão orientada por experience-level agreements (XLAs), além de SLAs.',
          'Evolução contínua do catálogo e dos canais de atendimento.',
          'Alinhamento com os objetivos estratégicos de inovação e transformação digital.'
        ]
      }
    ]
  },
  gestao_solicitacoes: {
    id: 'gestao_solicitacoes',
    name: 'Gestão de Solicitações em TI',
    description: 'A Gestão de Solicitações é uma prática essencial de TI que trata pedidos de serviço dos usuários, promovendo agilidade, padronização e rastreabilidade no atendimento.',
    levels: [
      {
        level: 1,
        name: 'Solicitações Atendidas de Forma Ad Hoc e Sem Controle',
        description: 'Neste estágio inicial, não há distinção clara entre incidentes e solicitações. Os pedidos dos usuários são tratados de forma reativa, sem registro formal, o que gera inconsistência, atrasos e dependência de pessoas específicas. Não há métricas, priorização ou gestão efetiva das demandas.',
        characteristics: [
          'Ausência de processos e categorização das solicitações.',
          'Não existe ferramenta específica para acompanhamento.',
          'As solicitações são feitas de maneira informal (telefone, e-mail, presencial).',
          'Atendimentos dependem da disponibilidade ou boa vontade de técnicos.',
          'Não há prazos definidos nem expectativas gerenciadas.',
          'Falta de histórico, rastreabilidade e controle de qualidade.'
        ]
      },
      {
        level: 2,
        name: 'Registro e Rastreio Formal das Solicitações com Atendimento Básico',
        description: 'A organização começa a reconhecer a importância da gestão de solicitações e passa a registrá-las formalmente em um sistema, ainda que de forma limitada. Há uma separação inicial entre incidentes e solicitações, mas os processos são rudimentares e sem padronização clara.',
        characteristics: [
          'Uso de ferramenta básica para abertura e acompanhamento de solicitações.',
          'Registro padronizado com campos mínimos (ex: nome, tipo de solicitação, descrição).',
          'Separação inicial entre incidentes e solicitações no catálogo.',
          'Comunicação com o usuário é pontual e reativa.',
          'Atendimento ainda depende de conhecimento tácito.',
          'Falta de SLAs ou de gestão de prazos.',
          'Pouca análise sobre a natureza ou recorrência dos pedidos.'
        ]
      },
      {
        level: 3,
        name: 'Catálogo de Serviços Formalizado e SLAs Definidos para as Solicitações',
        description: 'A gestão das solicitações passa a ser estruturada com um catálogo de serviços publicado, processos padronizados e SLAs definidos. Os tipos de solicitações são claramente categorizados, permitindo melhor gestão, atendimento mais ágil e comunicação mais efetiva com os usuários.',
        characteristics: [
          'Catálogo de serviços publicado, com tipos de solicitações e prazos estimados.',
          'SLAs para resposta e resolução definidos com base em critérios de complexidade.',
          'Sistema ITSM permite triagem, priorização e encaminhamento automático.',
          'Comunicação estruturada com o usuário durante todo o ciclo da solicitação.',
          'Papéis e responsabilidades bem definidos.',
          'Equipe treinada para atuar com foco em experiência do usuário.',
          'Dados e relatórios básicos são extraídos para acompanhamento de volume e desempenho.'
        ]
      },
      {
        level: 4,
        name: 'Gestão Proativa com Autosserviço e Melhoria Contínua',
        description: 'Neste nível, a organização oferece canais de autosserviço (portal, chatbot, app), com formulários inteligentes e workflows automatizados para atender grande parte das solicitações sem intervenção humana. A gestão é orientada por dados, com análise contínua das solicitações para melhoria do catálogo e dos processos.',
        characteristics: [
          'Portal de autosserviço e/ou chatbot ativo para abertura e acompanhamento de solicitações.',
          'Workflows automatizados para aprovações, execução e comunicação.',
          'Catálogo de serviços é atualizado com base nas análises de recorrência.',
          'Equipes atuam com foco em melhorar a experiência do usuário.',
          'Integração com processos de gestão de acesso, ativos e segurança.',
          'Feedback do usuário ao final do atendimento é coletado e utilizado.',
          'Indicadores de desempenho são utilizados para melhorar continuamente os fluxos.',
          'Redução de erros humanos e aumento da previsibilidade nos atendimentos.'
        ]
      },
      {
        level: 5,
        name: 'Atendimento Automatizado, Personalizado e Antecipado às Necessidades',
        description: 'No estágio mais maduro, a Gestão de Solicitações utiliza inteligência artificial, analytics e automação para prever necessidades dos usuários, sugerir soluções antes da solicitação e realizar atendimentos personalizados. A prática se integra profundamente à estratégia de experiência digital da organização.',
        characteristics: [
          'Sistema inteligente que recomenda ou antecipa solicitações com base no perfil do usuário e histórico.',
          'Integração com ferramentas de RPA (automação robótica de processos) para execução automática de tarefas.',
          'Resolução de solicitações via assistentes virtuais, com linguagem natural.',
          'Autosserviço contextualizado: o portal oferece sugestões com base no comportamento do usuário.',
          'Relatórios avançados com insights sobre oportunidades de otimização dos serviços.',
          'Gestão orientada por experience-level agreements (XLAs), além de SLAs.',
          'Evolução contínua do catálogo e dos canais de atendimento.',
          'Alinhamento com os objetivos estratégicos de inovação e transformação digital.'
        ]
      }
    ]
  },
  gestao_incidentes: {
    id: 'gestao_incidentes',
    name: 'Gestão de Incidentes em TI',
    description: 'A Gestão de Incidentes é um processo fundamental em TI que visa restaurar rapidamente a operação normal dos serviços após um incidente, minimizando impactos nos negócios e garantindo a qualidade dos serviços.',
    levels: [
      {
        level: 1,
        name: 'Registro de Incidentes é Inconsistente e Dependente de Esforços Individuais',
        description: 'Neste nível inicial, a organização não possui processos ou ferramentas formais para a gestão de incidentes. O registro e a resolução de incidentes dependem de esforços individuais, resultando em inconsistências e lacunas no atendimento. A falta de padronização leva a tempos de resolução prolongados e impacto negativo na satisfação dos usuários.',
        characteristics: [
          'Ausência de Processos Formais: Não há procedimentos definidos para registrar, classificar ou resolver incidentes.',
          'Dependência de Indivíduos: Solução de problemas depende do conhecimento e iniciativa de colaboradores específicos.',
          'Registro Inconsistente: Incidentes podem ou não ser registrados, e as informações são frequentemente incompletas.',
          'Comunicação Ineficiente: Falta de canais estruturados para informar usuários sobre o status dos incidentes.',
          'Prioritização Ineficaz: Incidentes não são priorizados com base em impacto ou urgência, levando a atrasos na resolução.',
          'Falta de Documentação: Ausência de histórico ou dados para análise futura e melhoria dos processos.',
          'Impacto Negativo nos Negócios: Interrupções frequentes afetam a produtividade e podem causar perdas financeiras.'
        ]
      },
      {
        level: 2,
        name: 'Registro Formal Implementado; Análise de Incidentes Limitada',
        description: 'A organização reconhece a necessidade de registrar incidentes de forma estruturada e implementa um sistema básico de registro. No entanto, a análise dos incidentes é limitada, e os dados coletados não são plenamente utilizados para melhorar os processos ou prevenir recorrências.',
        characteristics: [
          'Implementação de Ferramentas Básicas: Uso de sistemas simples para registrar e rastrear incidentes.',
          'Processos de Registro Padronizados: Procedimentos definidos para registrar informações essenciais sobre os incidentes.',
          'Comunicação Melhorada: Usuários são informados sobre o recebimento dos incidentes e recebem atualizações básicas.',
          'Análise Limitada: Dados coletados não são sistematicamente analisados para identificar tendências ou causas raiz.',
          'Prioritização Básica: Incidentes são classificados com base em critérios simples, mas podem carecer de precisão.',
          'Foco na Resolução: Esforços concentrados em resolver incidentes individuais sem considerar melhorias a longo prazo.',
          'Documentação Inadequada: Registros podem carecer de detalhes suficientes para análises aprofundadas.'
        ]
      },
      {
        level: 3,
        name: 'Processos de Gestão de Incidentes São Formalizados; SLAs Definidos',
        description: 'A organização formaliza os processos de gestão de incidentes, estabelecendo procedimentos claros, responsabilidades definidas e Acordos de Nível de Serviço (SLAs). Há uma estrutura organizada para registrar, classificar, priorizar e resolver incidentes, com o objetivo de melhorar a eficiência e a satisfação dos usuários.',
        characteristics: [
          'Processos Estruturados: Implementação de um fluxo de trabalho padronizado para a gestão de incidentes.',
          'Definição de SLAs: Estabelecimento de metas de tempo para resposta e resolução de incidentes com base em prioridades.',
          'Ferramentas Avançadas: Uso de sistemas de gestão de serviços (ITSM) para rastrear e gerenciar incidentes.',
          'Classificação e Prioritização: Incidentes são categorizados e priorizados com base em impacto e urgência.',
          'Comunicação Estruturada: Informações regulares e detalhadas são fornecidas aos usuários sobre o status dos incidentes.',
          'Responsabilidades Claras: Papéis e responsabilidades são definidos para todos os envolvidos no processo.',
          'Documentação Detalhada: Registros completos dos incidentes são mantidos para referência futura e conformidade.',
          'Treinamento e Capacitação: Equipe é treinada nos processos e no uso das ferramentas de gestão de incidentes.'
        ]
      },
      {
        level: 4,
        name: 'Gestão Proativa com Análise de Tendências e Prevenção de Incidentes',
        description: 'A gestão de incidentes torna-se proativa, com foco não apenas na resolução, mas também na prevenção de incidentes futuros. A organização realiza análises de tendências e causas raiz, implementando ações corretivas e preventivas. Há colaboração com outros processos, como gestão de problemas e capacidade, para melhorar a estabilidade e a qualidade dos serviços.',
        characteristics: [
          'Análise de Tendências: Dados de incidentes são analisados para identificar padrões e tendências recorrentes.',
          'Gestão de Problemas Integrada: Incidentes recorrentes ou significativos são investigados para identificar causas raiz.',
          'Ações Preventivas: Medidas são implementadas para prevenir a recorrência de incidentes, melhorando a infraestrutura e processos.',
          'Monitoramento Proativo: Ferramentas de monitoramento são utilizadas para detectar e resolver problemas antes que afetem os usuários.',
          'Colaboração Interdepartamental: Trabalho conjunto com outras áreas para abordar questões subjacentes.',
          'Melhoria Contínua: Feedback é utilizado para aprimorar processos, ferramentas e habilidades da equipe.',
          'Comunicação Proativa: Usuários são informados antecipadamente sobre ações preventivas e manutenção programada.',
          'KPIs e Métricas: Estabelecimento de indicadores-chave para medir a eficácia da gestão de incidentes.'
        ]
      },
      {
        level: 5,
        name: 'Automação de Resposta a Incidentes; Resolução Proativa Antes do Impacto no Usuário',
        description: 'No nível mais avançado, a organização utiliza automação e inteligência artificial para detectar, diagnosticar e resolver incidentes automaticamente, muitas vezes antes que os usuários sejam afetados. A gestão de incidentes é altamente eficiente, com foco na melhoria contínua e inovação, suportando diretamente os objetivos estratégicos da organização.',
        characteristics: [
          'Automação Avançada: Uso de scripts, bots e ferramentas de automação para resolver incidentes comuns automaticamente.',
          'Inteligência Artificial e Machine Learning: Aplicação de tecnologias avançadas para prever incidentes e recomendar soluções.',
          'Monitoramento em Tempo Real: Sistemas monitoram continuamente a infraestrutura e serviços, identificando anomalias imediatamente.',
          'Resolução Proativa: Problemas são resolvidos antes de causar impacto significativo nos usuários.',
          'Integração com DevOps: Processos de gestão de incidentes estão alinhados com práticas de DevOps para entregas contínuas e rápidas.',
          'Cultura de Inovação: Ambiente que incentiva a experimentação e adoção de novas tecnologias e métodos.',
          'Experiência do Usuário Otimizada: Usuários percebem um serviço mais confiável e consistente, com menos interrupções.',
          'Relatórios e Dashboards Avançados: Visibilidade completa do ambiente de TI para suporte à tomada de decisões estratégicas.'
        ]
      }
    ]
  },
  gestao_nivel_servico: {
    id: 'gestao_nivel_servico',
    name: 'Gestão de Nível de Serviço em TI (SLA)',
    description: 'A Gestão de Nível de Serviço (SLA) define, monitora e aprimora os níveis de serviço de TI, alinhando expectativas dos clientes e promovendo eficiência, transparência e confiança.',
    levels: [
      {
        level: 1,
        name: 'Níveis de Serviço Não Definidos; Expectativas Não Gerenciadas',
        description: 'Neste nível inicial, a organização não possui definições formais de níveis de serviço. As expectativas dos clientes e usuários não são gerenciadas de forma estruturada, resultando em inconsistências na entrega dos serviços e insatisfação dos usuários.',
        characteristics: [
          'Ausência de SLAs: Não há acordos formais que definam os níveis de serviço esperados.',
          'Expectativas Não Claras: Falta de comunicação clara sobre o que os clientes podem esperar dos serviços de TI.',
          'Resolução Ad-hoc de Problemas: Incidentes e solicitações são tratados de maneira reativa, sem referência a padrões de serviço.',
          'Alta Variabilidade na Qualidade do Serviço: Inconsistências na entrega dos serviços, levando a experiências variáveis para os usuários.',
          'Falta de Monitoramento: Ausência de métricas e indicadores para avaliar a performance dos serviços.',
          'Dependência de Conhecimento Individual: A qualidade do serviço depende do conhecimento e das ações de indivíduos específicos.',
          'Insatisfação dos Usuários: Usuários frequentemente enfrentam serviços que não atendem às suas expectativas, resultando em baixa satisfação.'
        ]
      },
      {
        level: 2,
        name: 'SLAs Básicos Estabelecidos para Serviços Principais',
        description: 'A organização começa a reconhecer a importância de definir níveis de serviço e estabelece SLAs básicos para os serviços de TI mais críticos. No entanto, esses SLAs ainda são simples e focados apenas nos serviços principais, com pouca formalização e monitoramento.',
        characteristics: [
          'Estabelecimento de SLAs Básicos: Definição de acordos de nível de serviço para os principais serviços de TI.',
          'Documentação Inicial: Criação de documentos de SLA que descrevem os níveis de serviço acordados, embora possam faltar detalhes.',
          'Foco em Serviços Críticos: SLAs são aplicados principalmente aos serviços mais importantes para as operações de negócios.',
          'Monitoramento Manual: Acompanhamento dos SLAs é realizado de forma manual, com pouca automação.',
          'Comunicação Limitada: Informações sobre os SLAs são compartilhadas apenas com as equipes diretamente envolvidas.',
          'Resolução de Incidentes Baseada em SLAs: Incidentes são priorizados com base nos SLAs estabelecidos, mas a aplicação pode ser inconsistente.',
          'Redução Parcial de Variabilidade: Melhoria na consistência dos serviços principais, mas ainda há variações significativas.'
        ]
      },
      {
        level: 3,
        name: 'SLAs Formalizados e Alinhados com Expectativas de Clientes',
        description: 'A organização formaliza os processos de Gestão de Nível de Serviço, garantindo que os SLAs sejam detalhados, documentados e alinhados com as expectativas dos clientes. Os SLAs são amplamente comunicados e integrados aos processos de gestão de incidentes e mudanças.',
        characteristics: [
          'Formalização dos SLAs: Desenvolvimento de SLAs detalhados que especificam claramente os níveis de serviço esperados.',
          'Alinhamento com Expectativas dos Clientes: SLAs são desenvolvidos em colaboração com os clientes para garantir que atendam às suas necessidades e expectativas.',
          'Documentação Completa: SLAs são documentados de forma abrangente, incluindo métricas, indicadores de desempenho e responsabilidades.',
          'Monitoramento Automatizado: Implementação de ferramentas para monitorar automaticamente o cumprimento dos SLAs.',
          'Relatórios Regulares: Geração de relatórios periódicos que mostram o desempenho dos serviços em relação aos SLAs.',
          'Gestão de Incidentes e Mudanças Integrada: Processos de gestão de incidentes e mudanças são alinhados com os SLAs para garantir uma resposta eficiente.',
          'Treinamento da Equipe: Capacitação das equipes de TI para entender e cumprir os SLAs estabelecidos.',
          'Melhoria da Transparência: Maior transparência na comunicação dos níveis de serviço, aumentando a confiança dos clientes.'
        ]
      },
      {
        level: 4,
        name: 'Relatórios de Desempenho São Usados para Ajustes',
        description: 'A gestão de nível de serviço torna-se proativa, utilizando relatórios de desempenho detalhados para analisar o cumprimento dos SLAs e implementar ajustes necessários. A organização utiliza dados e insights para otimizar continuamente os serviços de TI, alinhando-os ainda mais às necessidades dos negócios e dos clientes.',
        characteristics: [
          'Uso de Relatórios de Desempenho: Análise contínua dos relatórios de desempenho dos SLAs para identificar áreas de melhoria.',
          'Ajustes Proativos nos SLAs: Revisão e ajuste dos SLAs com base nos dados de desempenho e nas mudanças nas necessidades dos negócios.',
          'Análise de Tendências: Identificação de padrões e tendências nos dados de desempenho para prever e mitigar potenciais problemas.',
          'Otimização dos Serviços de TI: Implementação de melhorias nos serviços de TI com base nos insights obtidos dos relatórios de desempenho.',
          'Feedback Contínuo dos Clientes: Coleta regular de feedback dos clientes para informar ajustes nos SLAs e nos serviços.',
          'Integração com Estratégias de Negócios: Garantia de que os SLAs estejam alinhados com as estratégias e objetivos de negócios da organização.',
          'Automatização de Relatórios: Utilização de ferramentas que automatizam a geração e distribuição de relatórios de desempenho.',
          'Melhoria Contínua: Processo contínuo de avaliação e aprimoramento dos SLAs e dos serviços de TI.'
        ]
      },
      {
        level: 5,
        name: 'SLAs Dinâmicos e Ajustados em Tempo Real',
        description: 'No nível mais avançado, a gestão de nível de serviço é altamente dinâmica e adaptativa. Os SLAs são ajustados em tempo real com base em dados em tempo real e insights avançados, utilizando tecnologias como inteligência artificial e machine learning para prever demandas e otimizar os níveis de serviço de forma contínua. Este nível garante uma experiência de serviço excepcional e alinhamento estratégico total com as necessidades de negócios.',
        characteristics: [
          'SLAs Dinâmicos: SLAs que se adaptam automaticamente às mudanças nas necessidades dos negócios e nas condições operacionais.',
          'Ajustes em Tempo Real: Modificação imediata dos SLAs com base em dados em tempo real e análises preditivas.',
          'Uso de Inteligência Artificial e Machine Learning: Aplicação de tecnologias avançadas para analisar grandes volumes de dados e prever demandas futuras, ajustando os SLAs de acordo.',
          'Monitoramento e Resposta em Tempo Real: Sistemas que monitoram continuamente o desempenho dos serviços e respondem instantaneamente a desvios dos SLAs.',
          'Personalização de SLAs: Definição de SLAs personalizados para diferentes grupos de usuários ou serviços, melhorando a satisfação e a eficiência.',
          'Automatização Completa: Processos de gestão de SLAs totalmente automatizados, reduzindo a necessidade de intervenção manual e aumentando a precisão.',
          'Experiência de Cliente Excepcional: Oferecimento de serviços altamente confiáveis e alinhados com as expectativas dos clientes, promovendo alta satisfação e fidelização.',
          'Alinhamento Estratégico Total: SLAs que suportam diretamente os objetivos e metas estratégicas da organização, facilitando a inovação e a competitividade.',
          'Análise Preditiva e Prescritiva: Utilização de análises avançadas para não apenas prever, mas também recomendar ações para otimizar os SLAs e os serviços de TI.',
          'Resiliência e Flexibilidade: Capacidade de adaptar rapidamente os SLAs e os serviços para responder a mudanças repentinas nas demandas de negócios ou nas condições do mercado.'
        ]
      }
    ]
  },
  gestao_disponibilidade: {
    id: 'gestao_disponibilidade',
    name: 'Gestão de Disponibilidade em TI',
    description: 'A Gestão de Disponibilidade garante que os serviços de TI estejam disponíveis conforme as necessidades do negócio, minimizando interrupções e impactos nas operações.',
    levels: [
      {
        level: 1,
        name: 'Disponibilidade dos Serviços Não é Monitorada; Falhas São Identificadas Tardiamente',
        description: 'Neste nível inicial, a organização não monitora a disponibilidade dos serviços de TI. As falhas são identificadas apenas após serem reportadas pelos usuários ou quando causam impactos significativos nas operações. Não há processos ou ferramentas estabelecidos para detectar ou responder a interrupções, resultando em tempos de inatividade prolongados e insatisfação dos clientes.',
        characteristics: [
          'Ausência de Monitoramento: Não há sistemas ou procedimentos para acompanhar o status dos serviços.',
          'Detecção Tardia de Falhas: Problemas são descobertos somente quando já afetaram os usuários.',
          'Reatividade: Respostas a incidentes são improvisadas e não seguem procedimentos padronizados.',
          'Comunicação Ineficiente: Falta de canais estruturados para informar stakeholders sobre interrupções.',
          'Impacto Negativo nos Negócios: Interrupções frequentes afetam a produtividade e podem causar perdas financeiras.',
          'Dependência de Indivíduos: Solução de problemas depende do conhecimento de pessoas específicas.'
        ]
      },
      {
        level: 2,
        name: 'Monitoramento Básico Implementado; Registros de Indisponibilidade São Manuais',
        description: 'A organização reconhece a necessidade de monitorar a disponibilidade e implementa ferramentas básicas de monitoramento. Os registros de incidentes são mantidos manualmente, o que pode levar a inconsistências. A detecção de falhas melhora, mas ainda há uma dependência significativa de relatos dos usuários.',
        characteristics: [
          'Ferramentas Básicas de Monitoramento: Implementação de sistemas simples para acompanhar a disponibilidade.',
          'Registros Manuais: Incidentes e tempos de inatividade são documentados manualmente.',
          'Detecção Parcial de Falhas: Algumas falhas são identificadas pelo monitoramento, mas muitas ainda dependem dos usuários.',
          'Processos Informais: Não há procedimentos padronizados para resposta a incidentes.',
          'Comunicação Limitada: Informações sobre interrupções são compartilhadas de forma ad-hoc.',
          'Melhoria Marginal na Disponibilidade: Redução limitada nos tempos de inatividade.'
        ]
      },
      {
        level: 3,
        name: 'SLAs de Disponibilidade São Formalizados; Gestão Reativa de Falhas',
        description: 'A organização estabelece Acordos de Nível de Serviço (SLAs) que definem metas claras de disponibilidade. Há processos formais para responder a incidentes, embora a abordagem ainda seja predominantemente reativa. O monitoramento é mais abrangente, e há esforços para analisar e aprender com as falhas.',
        characteristics: [
          'SLAs Definidos: Metas de disponibilidade são acordadas com clientes internos e externos.',
          'Monitoramento Aprimorado: Uso de ferramentas que fornecem alertas em tempo real.',
          'Processos de Resposta a Incidentes: Procedimentos documentados para lidar com falhas.',
          'Registro Estruturado: Incidentes são registrados em sistemas centralizados.',
          'Análise de Causa Raiz: Investigação sistemática das causas das falhas.',
          'Comunicação Estruturada: Protocolos para informar stakeholders sobre o status dos serviços.',
          'Gestão Reativa: Foco em resolver problemas após sua ocorrência.'
        ]
      },
      {
        level: 4,
        name: 'Disponibilidade é Gerenciada Proativamente, com Redundâncias Implementadas',
        description: 'A gestão de disponibilidade torna-se proativa, com implementação de redundâncias e sistemas resilientes para prevenir falhas. Há um foco na melhoria contínua e na antecipação de problemas antes que afetem os usuários. Processos e ferramentas avançadas são utilizados para monitorar e manter os níveis de disponibilidade.',
        characteristics: [
          'Gestão Proativa: Identificação e mitigação de riscos antes que se tornem incidentes.',
          'Redundância e Resiliência: Implementação de sistemas redundantes para evitar pontos únicos de falha.',
          'Gestão Proativa: Identificação e mitigação de riscos antes que se tornem incidentes.',
          'Redundância e Resiliência: Implementação de sistemas redundantes para evitar pontos únicos de falha.'
        ]
      },
      {
        level: 5,
        name: 'Alta Disponibilidade Otimizada; Monitoramento Contínuo e Prevenção de Falhas',
        description: 'No nível mais avançado, a organização alcança alta disponibilidade otimizada, com serviços operando praticamente sem interrupções. A prevenção de falhas é baseada em análises preditivas e inteligência artificial. A disponibilidade é alinhada estrategicamente aos objetivos de negócio, e a organização é capaz de se adaptar rapidamente a mudanças.',
        characteristics: [
          'Alta Disponibilidade: Sistemas projetados para oferecer disponibilidade próxima de 100%.',
          'Análises Preditivas: Uso de inteligência artificial para prever e prevenir falhas.',
          'Automação Avançada: Respostas automatizadas a uma ampla gama de incidentes potenciais.',
          'Alinhamento Estratégico: Disponibilidade é considerada um ativo estratégico.',
          'Cultura de Excelência: Foco contínuo na melhoria e inovação na gestão de disponibilidade.',
          'Feedback em Tempo Real: Uso de dashboards e alertas para monitoramento contínuo.',
          'Parcerias Estratégicas: Colaboração com fornecedores e parceiros para manter altos níveis de disponibilidade.'
        ]
      }
    ]
  },
  gestao_capacidade_desempenho: {
    id: 'gestao_capacidade_desempenho',
    name: 'Gestão de Capacidade e Desempenho',
    description: 'A Gestão de Capacidade e Desempenho é uma prática essencial na área de Tecnologia da Informação (TI) que visa garantir que a infraestrutura, os sistemas e os serviços de TI sejam capazes de atender às demandas atuais e futuras do negócio de maneira eficiente e eficaz. Isso envolve o planejamento, monitoramento e ajuste dos recursos de TI para assegurar que o desempenho dos sistemas seja otimizado, evitando sobrecargas, gargalos e desperdícios de recursos. Em um ambiente empresarial dinâmico, onde a escalabilidade e a resposta rápida às mudanças são cruciais, a gestão adequada da capacidade e desempenho é fundamental para manter a competitividade, a satisfação do cliente e a eficiência operacional.',
    levels: [
      {
        level: 1,
        name: 'Capacidade Não é Gerenciada Formalmente; Ajustes São Reativos',
        description: 'Neste nível inicial, a organização não possui processos ou práticas formais para gerenciar a capacidade e o desempenho dos sistemas de TI. Os ajustes são feitos de forma reativa, geralmente em resposta a problemas ou falhas que já ocorreram, o que pode levar a interrupções nos serviços, desempenho inadequado e insatisfação dos usuários.',
        characteristics: [
          'Ausência de Planejamento: Não há planejamento prévio para atender às demandas de capacidade.',
          'Reatividade: Ajustes são feitos somente após a ocorrência de problemas de desempenho ou capacidade.',
          'Falta de Monitoramento: Não há ferramentas ou processos para monitorar a utilização dos recursos.',
          'Impacto Negativo nos Negócios: Possibilidade de interrupções e degradação do desempenho que afetam as operações.',
          'Dependência de Indivíduos: Conhecimento sobre os sistemas reside em pessoas específicas, sem documentação adequada.',
          'Sem Gestão de Riscos: Riscos relacionados à capacidade não são identificados ou mitigados.'
        ]
      },
      {
        level: 2,
        name: 'Planejamento Básico de Capacidade; Monitoramento Limitado',
        description: 'A organização reconhece a necessidade de planejar a capacidade e começa a implementar práticas básicas. Há algum nível de monitoramento dos recursos, mas é limitado e não abrangente. O planejamento é feito de forma simples, geralmente baseado em históricos recentes, sem previsões detalhadas ou análise aprofundada.',
        characteristics: [
          'Planejamento Básico: Planejamento de capacidade é realizado, mas de forma limitada e sem detalhes.',
          'Monitoramento Limitado: Utilização de ferramentas básicas para monitorar alguns recursos críticos.',
          'Reatividade Reduzida: Ainda há respostas reativas, mas com algumas ações preventivas.',
          'Documentação Inicial: Início da documentação dos sistemas e recursos.',
          'Comunicação Limitada: Informações sobre capacidade e desempenho não são amplamente compartilhadas.',
          'Falta de Padronização: Ausência de processos e procedimentos padronizados para gestão de capacidade.'
        ]
      },
      {
        level: 3,
        name: 'Planejamento Formalizado, com Previsões e Relatórios de Desempenho',
        description: 'A organização implementa um planejamento de capacidade formalizado, incluindo previsões baseadas em tendências e demandas previstas. O monitoramento torna-se mais abrangente, e relatórios regulares de desempenho são gerados para informar a gestão e apoiar a tomada de decisões.',
        characteristics: [
          'Planejamento Estruturado: Desenvolvimento de planos de capacidade detalhados que consideram demandas futuras.',
          'Previsões Baseadas em Dados: Uso de dados históricos e tendências para prever necessidades de capacidade.',
          'Monitoramento Abrangente: Implementação de ferramentas e processos para monitorar todos os recursos críticos.',
          'Relatórios Regulares: Geração de relatórios de desempenho e capacidade para a gestão.',
          'Processos Padronizados: Estabelecimento de procedimentos para gestão de capacidade e desempenho.',
          'Comunicação Melhorada: Compartilhamento de informações com as partes interessadas relevantes.',
          'Análise de Desempenho: Avaliação regular do desempenho dos sistemas para identificar áreas de melhoria.'
        ]
      },
      {
        level: 4,
        name: 'Capacidade é Gerenciada de Forma Proativa e Alinhada aos Objetivos',
        description: 'A gestão de capacidade torna-se proativa, com alinhamento claro aos objetivos estratégicos da organização. A capacidade é gerenciada de forma a antecipar demandas futuras, suportar planos de negócios e garantir que os recursos de TI estejam preparados para atender às necessidades em evolução do negócio.',
        characteristics: [
          'Alinhamento Estratégico: Planejamento de capacidade está alinhado com a estratégia e objetivos de negócios.',
          'Gestão Proativa: Ações são tomadas antecipadamente para evitar problemas de capacidade e desempenho.',
          'Análise de Impacto: Avaliação do impacto das mudanças nos requisitos de capacidade.',
          'Integração com Outros Processos: Gestão de capacidade está integrada com gestão de mudanças, projetos e portfólio.',
          'Engajamento das Partes Interessadas: Colaboração com diferentes áreas para entender necessidades futuras.',
          'Otimização de Recursos: Uso eficiente dos recursos, evitando excesso ou falta de capacidade.',
          'Gestão de Riscos: Identificação e mitigação de riscos relacionados à capacidade e desempenho.'
        ]
      },
      {
        level: 5,
        name: 'Capacidade é Automatizada e Ajustada Dinamicamente para Atender às Demandas',
        description: 'No nível mais avançado, a gestão de capacidade é altamente automatizada, com sistemas que ajustam dinamicamente os recursos para atender às demandas em tempo real. Tecnologias como computação em nuvem e orquestração são utilizadas para escalar recursos automaticamente, garantindo desempenho otimizado e eficiência operacional.',
        characteristics: [
          'Automação Avançada: Uso de ferramentas e scripts para automatizar o provisionamento e ajuste de recursos.',
          'Escalabilidade Dinâmica: Capacidade de aumentar ou reduzir recursos automaticamente com base na demanda.',
          'Inteligência Artificial e Machine Learning: Aplicação de técnicas avançadas para prever demandas e otimizar recursos.',
          'Alinhamento Total com Negócios: Recursos de TI são ajustados em tempo real para suportar objetivos de negócio em evolução.',
          'Eficiência Máxima: Minimização de custos e desperdícios através de otimização contínua.',
          'Monitoramento em Tempo Real: Visibilidade instantânea do desempenho e utilização dos recursos.',
          'Cultura de Inovação: Foco contínuo em melhorar processos e adotar tecnologias emergentes.'
        ]
      }
    ]
  },
  analise_negocios: {
    id: 'analise_negocios',
    name: 'Análise de Negócios',
    description: `A Análise de Negócios é uma disciplina fundamental na área de Tecnologia da Informação (TI) que envolve a identificação das necessidades de negócios e a determinação de soluções para problemas empresariais. Isso inclui o desenvolvimento de novos sistemas ou melhorias nos processos existentes. A análise de negócios atua como uma ponte entre as partes interessadas do negócio e a equipe técnica, garantindo que os requisitos sejam claramente compreendidos e que as soluções propostas estejam alinhadas aos objetivos estratégicos da organização.\nEm um ambiente empresarial cada vez mais complexo e competitivo, a capacidade de realizar análises de negócios eficazes é crucial para impulsionar a inovação, otimizar processos e manter a vantagem competitiva.`,
    levels: [
      {
        level: 1,
        name: 'Requisitos de Negócios Não São Claramente Compreendidos',
        description: 'Neste nível inicial, a organização não possui processos ou práticas formais para a análise de negócios. Os requisitos de negócios não são claramente compreendidos ou documentados, resultando em soluções de TI que não atendem às necessidades reais da organização.',
        characteristics: [
          'Falta de Comunicação: Comunicação ineficiente entre as partes interessadas e a equipe de TI.',
          'Ausência de Documentação: Requisitos não são registrados ou são mal documentados.',
          'Implementações Ineficazes: Soluções desenvolvidas não resolvem os problemas de negócios ou criam novos problemas.',
          'Reatividade: Respostas a problemas são improvisadas, sem uma análise aprofundada.',
          'Desconexão Estratégica: Falta de alinhamento entre as soluções de TI e os objetivos estratégicos da organização.',
          'Dependência de Indivíduos: Conhecimento sobre necessidades de negócios está concentrado em poucas pessoas.'
        ]
      },
      {
        level: 2,
        name: 'Requisitos São Coletados Informalmente e com Pouca Comunicação',
        description: 'A organização começa a reconhecer a importância de entender os requisitos de negócios, mas a coleta de informações é informal e não estruturada. A comunicação entre as partes interessadas é limitada, e os requisitos podem ser incompletos ou inconsistentes.',
        characteristics: [
          'Coleta Informal de Requisitos: Reuniões ad-hoc e conversas informais são usadas para entender as necessidades.',
          'Documentação Limitada: Requisitos são registrados de forma básica, sem detalhes suficientes.',
          'Comunicação Ineficaz: Falta de canais estruturados para comunicação entre equipes.',
          'Implementações Inconsistentes: Soluções podem atender parcialmente aos requisitos, mas carecem de eficiência.',
          'Falta de Padronização: Ausência de métodos ou ferramentas padrão para análise de negócios.',
          'Feedback Limitado: Pouca ou nenhuma validação dos requisitos com as partes interessadas.'
        ]
      },
      {
        level: 3,
        name: 'Processos de Análise de Negócios São Formalizados; Análises Documentadas',
        description: 'A organização estabelece processos formais para a análise de negócios, incluindo métodos e ferramentas padronizadas. Os requisitos são documentados de forma clara e detalhada, e há uma melhor comunicação entre as partes interessadas e a equipe de TI.',
        characteristics: [
          'Processos Estruturados: Implementação de metodologias de análise de negócios, como BABOK.',
          'Documentação Detalhada: Requisitos são registrados de forma abrangente, incluindo especificações funcionais e não funcionais.',
          'Ferramentas de Análise: Uso de ferramentas e técnicas, como diagramas de fluxo de processos e casos de uso.',
          'Validação dos Requisitos: Requisitos são revistos e aprovados pelas partes interessadas.',
          'Comunicação Melhorada: Estabelecimento de canais formais para comunicação e colaboração.',
          'Treinamento e Capacitação: Desenvolvimento de habilidades de análise de negócios na equipe.',
          'Melhoria na Qualidade das Soluções: As soluções de TI começam a atender melhor às necessidades de negócios.'
        ]
      },
      {
        level: 4,
        name: 'Análise de Negócios é Proativa, com Foco em Alinhamento Estratégico',
        description: 'A análise de negócios torna-se uma função proativa, antecipando necessidades futuras e alinhando soluções de TI com os objetivos estratégicos da organização. Há um foco na otimização de processos e na identificação de oportunidades de melhoria e inovação.',
        characteristics: [
          'Alinhamento Estratégico: Análises consideram a visão e os objetivos de longo prazo da organização.',
          'Engajamento das Partes Interessadas: Colaboração estreita com stakeholders para entender profundamente as necessidades.',
          'Análise de Valor: Avaliação do impacto das soluções propostas no valor do negócio.',
          'Otimização de Processos: Identificação e implementação de melhorias nos processos de negócios.',
          'Gestão de Requisitos: Processos para gerenciar mudanças nos requisitos ao longo do ciclo de vida do projeto.',
          'Comunicação Efetiva: Informações são compartilhadas de forma transparente e oportuna.',
          'Uso de Técnicas Avançadas: Aplicação de técnicas como análise SWOT, modelagem de processos e análise de gap.'
        ]
      },
      {
        level: 5,
        name: 'Análise de Negócios é Integrada e Utilizada para Inovação e Competitividade',
        description: 'No nível mais avançado, a análise de negócios é totalmente integrada aos processos organizacionais e é usada como um impulsionador estratégico para a inovação e vantagem competitiva. A organização utiliza insights da análise de negócios para desenvolver novos produtos, serviços e modelos de negócios.',
        characteristics: [
          'Inovação Orientada por Análise: Identificação de oportunidades para inovação baseada em insights profundos.',
          'Integração Total: Análise de negócios faz parte integrante da governança e da cultura organizacional.',
          'Uso de Dados e Analytics: Aplicação de análise de dados para prever tendências e comportamentos do mercado.',
          'Alinhamento Total com Estratégia: Soluções de TI são desenvolvidas para suportar e habilitar a estratégia de negócios.',
          'Colaboração Interfuncional: Trabalho conjunto entre diferentes áreas para soluções holísticas.',
          'Melhoria Contínua: Processos são continuamente avaliados e aprimorados com base em feedback e resultados.',
          'Vantagem Competitiva: A análise de negócios contribui diretamente para o posicionamento competitivo da organização.'
        ]
      }
    ]
  },
  gestao_riscos: {
    id: 'gestao_riscos',
    name: 'Gestão de Riscos',
    description: `A Gestão de Riscos é uma prática fundamental na área de Tecnologia da Informação (TI) que envolve a identificação, avaliação, monitoramento e mitigação de riscos que possam afetar negativamente os ativos, projetos e operações de TI. Em um ambiente tecnológico em constante evolução, com ameaças cibernéticas crescentes e dependência crítica de sistemas de informação, a capacidade de gerenciar riscos de forma eficaz é crucial para garantir a continuidade dos negócios, a conformidade regulatória e a proteção dos ativos organizacionais.`,
    levels: [
      {
        level: 1,
        name: 'Riscos Não São Formalmente Identificados ou Gerenciados',
        description: 'Neste nível inicial, a organização não possui processos ou práticas formais para identificar ou gerenciar riscos. As ameaças potenciais não são reconhecidas de maneira sistemática, e as ações de resposta são reativas, geralmente ocorrendo somente após a materialização de um problema.',
        characteristics: [
          'Ausência de Processos: Não há políticas, procedimentos ou frameworks estabelecidos para gestão de riscos.',
          'Desconhecimento dos Riscos: Os colaboradores não têm consciência das ameaças que podem impactar as operações de TI.',
          'Reatividade: As respostas aos riscos são improvisadas e ocorrem somente após a ocorrência de incidentes.',
          'Dependência de Indivíduos: O conhecimento sobre possíveis riscos reside em pessoas específicas, sem documentação ou compartilhamento.',
          'Riscos Elevados: A organização está exposta a falhas operacionais, violações de segurança e outras ameaças sem medidas preventivas.'
        ]
      },
      {
        level: 2,
        name: 'Riscos São Identificados de Maneira Básica e Reativa',
        description: 'A organização começa a reconhecer a importância de identificar riscos e implementa práticas básicas, geralmente em resposta a incidentes passados. A identificação é limitada e não sistemática, e as ações de mitigação são frequentemente insuficientes.',
        characteristics: [
          'Identificação Limitada: Riscos são identificados de forma esporádica, sem uma abordagem estruturada.',
          'Documentação Básica: Alguns riscos são registrados, mas sem detalhes abrangentes ou atualizações regulares.',
          'Mitigação Reativa: Ações para mitigar riscos são tomadas somente após eventos adversos.',
          'Falta de Priorização: Não há classificação ou priorização dos riscos com base em seu impacto ou probabilidade.',
          'Comunicação Restrita: Informações sobre riscos não são amplamente compartilhadas dentro da organização.'
        ]
      },
      {
        level: 3,
        name: 'Gestão de Riscos é Formalizada e Integrada',
        description: 'A organização implementa um programa formal de gestão de riscos, integrando-o aos processos de TI. Riscos são identificados, avaliados e mitigados de forma sistemática, com envolvimento das partes interessadas e uso de frameworks reconhecidos.',
        characteristics: [
          'Processos Estruturados: Adoção de políticas e procedimentos claros para a gestão de riscos.',
          'Identificação Sistemática: Utilização de metodologias para identificar riscos em todas as áreas de TI.',
          'Avaliação de Riscos: Riscos são avaliados quanto à probabilidade e impacto, permitindo priorização eficaz.',
          'Planos de Mitigação: Desenvolvimento de estratégias e planos para mitigar riscos identificados.',
          'Engajamento das Partes Interessadas: Envolvimento de gestores, equipes técnicas e outros stakeholders no processo.',
          'Ferramentas de Suporte: Uso de ferramentas e sistemas para registrar e acompanhar riscos.',
          'Comunicação e Treinamento: Divulgação das políticas de gestão de riscos e treinamento dos colaboradores.'
        ]
      },
      {
        level: 4,
        name: 'Riscos São Monitorados Continuamente e Mitigados Proativamente',
        description: 'A gestão de riscos torna-se um processo contínuo e proativo. A organização monitora regularmente os riscos, atualiza avaliações e implementa ações preventivas antes que os riscos se materializem.',
        characteristics: [
          'Monitoramento Contínuo: Implementação de mecanismos para acompanhar os riscos em tempo real.',
          'Atualização Regular: Revisão periódica dos registros de riscos e planos de mitigação.',
          'Mitigação Proativa: Ações preventivas são implementadas para reduzir a probabilidade ou impacto dos riscos.',
          'Análise de Tendências: Uso de dados históricos e tendências para prever e antecipar riscos emergentes.',
          'Integração com Outros Processos: Gestão de riscos está alinhada com outros processos de TI, como gestão de mudanças e continuidade de negócios.',
          'Relatórios Regulares: Comunicação frequente sobre o status dos riscos para a alta administração e outras partes interessadas.',
          'Cultura de Risco: Colaboradores são incentivados a reportar riscos e participar ativamente do processo.'
        ]
      },
      {
        level: 5,
        name: 'Gestão de Riscos é Estratégica e Alinhada aos Objetivos de Negócios',
        description: 'No nível mais avançado, a gestão de riscos é totalmente integrada à estratégia organizacional. Riscos são considerados nas decisões de negócios, e a gestão de riscos contribui para a criação de valor e vantagem competitiva.',
        characteristics: [
          'Alinhamento Estratégico: Riscos são gerenciados em alinhamento com os objetivos e estratégias de negócios.',
          'Tomada de Decisão Informada: Decisões estratégicas incorporam análises de riscos, balanceando oportunidades e ameaças.',
          'Gestão de Riscos Empresarial (ERM): Abordagem abrangente que considera riscos em todas as áreas da organização.',
          'Apetite ao Risco Definido: A organização define claramente seu nível de tolerância e apetite ao risco.',
          'Inovação Responsável: Gestão de riscos suporta iniciativas inovadoras, garantindo que riscos associados sejam adequadamente gerenciados.',
          'Relatórios Estratégicos: Informações sobre riscos são incluídas em relatórios estratégicos e de desempenho.',
          'Cultura Organizacional Madura: A gestão de riscos é parte integrante da cultura organizacional, com compromisso da alta administração.'
        ]
      }
    ]
  },
  monitoramento_eventos: {
    id: 'monitoramento_eventos',
    name: 'Monitoramento e Gerenciamento de Eventos',
    description: 'A prática de Monitoramento e Gerenciamento de Eventos é responsável por observar continuamente o ambiente de TI, identificando alterações significativas nos componentes de serviços e infraestrutura. Seu papel é detectar comportamentos anômalos, gerar alertas e permitir respostas rápidas antes que ocorram falhas ou impactos aos usuários. Essa prática é a base para uma TI proativa e confiável, permitindo que as equipes de suporte ajam com agilidade, reduzindo o tempo de inatividade e antecipando problemas.',
    levels: [
      {
        level: 1,
        name: 'Monitoramento Manual e Reativo',
        description: 'O ambiente de TI não possui mecanismos de observação estruturados. Os problemas são identificados apenas quando os usuários percebem e reportam falhas.',
        characteristics: [
          'Monitoramento inexistente ou visual/manual',
          'Detecção de falhas apenas por reclamações de usuários',
          'Ausência de ferramentas ou processos definidos',
          'Respostas sempre reativas e com impacto direto nos serviços'
        ]
      },
      {
        level: 2,
        name: 'Monitoramento Básico com Geração de Alertas',
        description: 'Ferramentas simples começam a ser utilizadas para observar os componentes críticos da infraestrutura. Alertas são gerados, mas há excesso de ruído.',
        characteristics: [
          'Implantação inicial de ferramentas como Zabbix, Nagios, etc.',
          'Alertas para eventos simples como uso de CPU ou espaço em disco',
          'Equipe ainda responde de forma manual a cada alerta',
          'Sem categorização ou correlação de eventos'
        ]
      },
      {
        level: 3,
        name: 'Gerenciamento de Eventos Estruturado e Classificação de Alertas',
        description: 'A prática é estruturada com regras de filtragem, categorização e priorização de eventos. Os alertas são integrados à central de serviços.',
        characteristics: [
          'Classificação de eventos por criticidade (informativo, advertência, exceção)',
          'Integração com sistemas ITSM',
          'Redução de ruído com regras de supressão e correlação',
          'Indicadores de eventos recorrentes ou críticos'
        ]
      },
      {
        level: 4,
        name: 'Monitoramento Preditivo e Atuação Proativa',
        description: 'O ambiente de TI é monitorado em tempo real com análise de tendências e previsão de falhas. A equipe age de forma proativa para mitigar riscos.',
        characteristics: [
          'Dashboards em tempo real com dados correlacionados',
          'Uso de analytics para prever degradações',
          'Atuação preventiva com base em padrões identificados',
          'Integração com gestão de problemas e capacidade'
        ]
      },
      {
        level: 5,
        name: 'Monitoramento Inteligente com Automação de Respostas',
        description: 'A prática é totalmente automatizada com uso de inteligência artificial e automação para identificar, interpretar e agir sobre eventos.',
        characteristics: [
          'Correlação automática com múltiplas fontes (infra, apps, rede)',
          'Respostas automatizadas com scripts e bots',
          'Aprendizado contínuo de padrões e falhas',
          'Apoio direto à estratégia de resiliência e continuidade'
        ]
      }
    ]
  },
  gestao_problemas: {
    id: 'gestao_problemas',
    name: 'Gestão de Problemas',
    description: 'A Gestão de Problemas é a prática que busca identificar e eliminar as causas-raiz de incidentes, prevenindo sua recorrência e reduzindo impactos negativos nos serviços de TI. Enquanto a gestão de incidentes foca na restauração rápida do serviço, a gestão de problemas atua para que os mesmos erros não voltem a ocorrer. Uma prática eficaz de gestão de problemas contribui para a estabilidade do ambiente de TI, a redução de falhas críticas e o aumento da confiança dos usuários.',
    levels: [
      {
        level: 1,
        name: 'Problemas Tratados de Forma Reativa e Não Documentada',
        description: 'A organização não diferencia claramente incidentes de problemas. As causas das falhas não são investigadas e não há histórico para análise posterior.',
        characteristics: [
          'Problemas recorrentes tratados como novos incidentes',
          'Falta de registros formais de causas ou sintomas',
          'Soluções paliativas sem análise aprofundada',
          'Ausência de base de erros conhecidos (KEDB)'
        ]
      },
      {
        level: 2,
        name: 'Registro de Problemas Iniciado com Investigações Básicas',
        description: 'Inicia-se o registro formal de problemas críticos ou recorrentes, com investigações superficiais e sem processo estruturado de priorização ou categorização.',
        characteristics: [
          'Problemas identificados por frequência de incidentes',
          'Início da documentação em ferramentas ITSM',
          'Investigações realizadas por equipe técnica sob demanda',
          'Soluções definitivas ainda não priorizadas'
        ]
      },
      {
        level: 3,
        name: 'Processo Formal de Gestão de Problemas com Base de Erros Conhecidos',
        description: 'A prática é formalizada com critérios de priorização, fluxo estruturado e base de erros conhecidos. Os problemas são gerenciados com foco na eliminação de causas-raiz.',
        characteristics: [
          'Metodologia de análise de causa (ex: 5 porquês, Ishikawa)',
          'Priorização baseada em impacto e urgência',
          'Registro e atualização de KEDB com soluções definitivas e alternativas',
          'Monitoramento dos resultados das correções implementadas'
        ]
      },
      {
        level: 4,
        name: 'Gestão Proativa de Problemas e Ações Preventivas',
        description: 'A prática atua de forma proativa, identificando potenciais falhas antes que causem incidentes. Existe integração com monitoramento, mudanças e capacidade.',
        characteristics: [
          'Análise de tendências de incidentes e alertas',
          'Abertura de problemas sem incidentes associados',
          'Implementação de melhorias estruturais com foco na estabilidade',
          'Avaliação de riscos técnicos recorrentes'
        ]
      },
      {
        level: 5,
        name: 'Eliminação Sistêmica de Causas com Suporte à Inovação e Continuidade',
        description: 'A gestão de problemas é orientada por dados e inteligência, colaborando diretamente para a resiliência da operação, inovação de serviços e redução de custo de falhas.',
        characteristics: [
          'Correlação com análise preditiva de falhas',
          'Automação da detecção e abertura de problemas',
          'Alinhamento com objetivos estratégicos e melhoria de CX',
          'Contribuição ativa para a inovação e confiabilidade dos serviços'
        ]
      }
    ]
  },
  gestao_implantacao: {
    id: 'gestao_implantacao',
    name: 'Gestão de Implantação',
    description: 'A Gestão de Implantação é a prática responsável por planejar, agendar e controlar a movimentação de versões de software, hardware ou qualquer item de configuração para ambientes operacionais. Seu objetivo é garantir que as mudanças sejam entregues com sucesso, sem impactar a continuidade dos serviços. Essa prática assegura que as implantações ocorram de forma controlada, com validações, testes, comunicação e reversão planejadas.',
    levels: [
      {
        level: 1,
        name: 'Implantações Ocorrem Sem Planejamento ou Controle',
        description: 'As mudanças são implantadas diretamente em produção, sem testes, validações ou procedimentos formais. As falhas são frequentes e geram impacto significativo nos usuários.',
        characteristics: [
          'Mudanças aplicadas manualmente e sem aprovação',
          'Falta de documentação ou planos de reversão',
          'Baixa previsibilidade de erros e interrupções',
          'Nenhuma comunicação estruturada com os usuários'
        ]
      },
      {
        level: 2,
        name: 'Planejamento Básico de Implantações Críticas',
        description: 'As mudanças críticas começam a ser planejadas com datas definidas e testes pontuais. Ainda há muitas exceções e pouco envolvimento das áreas de negócio.',
        characteristics: [
          'Registro inicial das janelas de implantação',
          'Testes realizados em ambiente não representativo',
          'Comunicação básica com os usuários',
          'Ausência de integração com gestão de mudanças'
        ]
      },
      {
        level: 3,
        name: 'Processo Formalizado com Padrões e Procedimentos',
        description: 'A prática é formalizada com etapas padronizadas, critérios de aprovação e processos de validação, teste e reversão definidos. Há envolvimento de áreas impactadas.',
        characteristics: [
          'Checklists de implantação e validação pós-implantação',
          'Ambientes de homologação representativos',
          'Aprovação formal e comunicação com stakeholders',
          'Integração com gestão de mudanças e liberações'
        ]
      },
      {
        level: 4,
        name: 'Automatização e Implantação Contínua com Governança',
        description: 'A implantação é automatizada, com ciclos de entrega contínua e alta governança. A TI consegue entregar melhorias com velocidade e segurança.',
        characteristics: [
          'Ferramentas de CI/CD em uso (ex: Jenkins, GitLab)',
          'Monitoramento contínuo do sucesso das implantações',
          'Baixo índice de rollback',
          'Governança para ambientes de produção e testes'
        ]
      },
      {
        level: 5,
        name: 'Integração Estratégica com Inovação e Time-to-Market',
        description: 'A implantação é parte do core estratégico da organização, suportando inovação ágil com segurança, previsibilidade e escala.',
        characteristics: [
          'Entregas alinhadas com roadmaps estratégicos',
          'Avaliação contínua de impacto, valor e experiência do usuário',
          'Feedback loops automatizados',
          'Cultura DevOps consolidada'
        ]
      }
    ]
  },
  gestao_infra_plataforma: {
    id: 'gestao_infra_plataforma',
    name: 'Gestão de Infraestrutura e Plataforma',
    description: 'A Gestão de Infraestrutura e Plataforma é a prática que assegura o funcionamento estável, seguro e eficiente de todos os componentes físicos e virtuais que suportam os serviços de TI, incluindo servidores, redes, sistemas operacionais, bancos de dados, nuvem e plataformas tecnológicas. Seu foco é garantir que a base tecnológica da organização esteja sempre disponível, atualizada, escalável e aderente aos requisitos do negócio.',
    levels: [
      {
        level: 1,
        name: 'Gestão Ad Hoc com Atuação Reativa',
        description: 'A infraestrutura é gerida sem planejamento ou padrões definidos. As ações são realizadas de forma emergencial, sem documentação ou controle.',
        characteristics: [
          'Infraestrutura subdimensionada ou obsoleta',
          'Falta de inventário atualizado',
          'Ações corretivas sem causa-raiz',
          'Baixa integração entre sistemas e plataformas'
        ]
      },
      {
        level: 2,
        name: 'Gestão Inicial com Procedimentos Básicos',
        description: 'Passa-se a registrar componentes e criar procedimentos de manutenção. A equipe começa a padronizar configurações e práticas operacionais.',
        characteristics: [
          'Criação de inventário técnico',
          'Procedimentos manuais documentados',
          'Consolidação parcial de servidores e recursos',
          'Início da padronização de ambientes'
        ]
      },
      {
        level: 3,
        name: 'Infraestrutura Padronizada e Monitorada',
        description: 'A prática torna-se estruturada, com ambientes padronizados, controle de versões, monitoramento contínuo e foco em performance e disponibilidade.',
        characteristics: [
          'Monitoramento em tempo real de servidores, rede e sistemas',
          'Controle de mudanças e documentação atualizada',
          'Ambientes segregados (produção, testes, homologação)',
          'Processos de backup e recuperação validados'
        ]
      },
      {
        level: 4,
        name: 'Infraestrutura Automatizada e Escalável',
        description: 'A organização automatiza a gestão da infraestrutura, adota recursos escaláveis em nuvem e integra a gestão com práticas ágeis e DevOps.',
        characteristics: [
          'Uso de infraestrutura como código (IaC)',
          'Provisionamento automático de recursos',
          'Escalabilidade vertical e horizontal sob demanda',
          'Integração com CI/CD e segurança'
        ]
      },
      {
        level: 5,
        name: 'Plataforma Estratégica, Resiliente e Inovadora',
        description: 'A infraestrutura torna-se uma plataforma estratégica, com alta resiliência, capacidade preditiva e suporte direto à inovação, agilidade e segurança da organização.',
        characteristics: [
          'Governança de nuvem híbrida/multicloud',
          'Automatização baseada em inteligência preditiva',
          'Alinhamento direto com a estratégia digital',
          'Plataforma como serviço (PaaS) para aceleração da entrega'
        ]
      }
    ]
  },
  gestao_ativos: {
    id: 'gestao_ativos',
    name: 'Gestão de Ativos de TI',
    description: 'A Gestão de Ativos de TI é a prática responsável por controlar o ciclo de vida dos ativos tecnológicos da organização, desde a aquisição até o descarte. Inclui hardware, software, licenças, dispositivos, contratos e qualquer item necessário à operação dos serviços de TI. Essa prática visa garantir que os ativos sejam utilizados de forma eficiente, segura e conforme as políticas organizacionais.',
    levels: [
      {
        level: 1,
        name: 'Ausência de Controle Formal dos Ativos',
        description: 'Os ativos são gerenciados de forma informal, sem registros centralizados. Não há visibilidade sobre a localização, uso ou status dos recursos, o que compromete a segurança e o controle financeiro.',
        characteristics: [
          'Falta de inventário confiável',
          'Ativos adquiridos sem processo padronizado',
          'Recursos ociosos, perdidos ou utilizados indevidamente',
          'Riscos de não conformidade com licenças'
        ]
      },
      {
        level: 2,
        name: 'Inventário Básico e Processos Manuais de Registro',
        description: 'A organização inicia um controle básico por meio de planilhas ou ferramentas simples. A entrada e saída de ativos são registradas manualmente, mas sem integração entre áreas.',
        characteristics: [
          'Registro inicial de ativos críticos',
          'Processos manuais e suscetíveis a erro',
          'Visibilidade parcial da utilização',
          'Início do controle de licenciamento'
        ]
      },
      {
        level: 3,
        name: 'Sistema Integrado de Gestão de Ativos e Conformidade',
        description: 'A gestão é padronizada com uso de ferramentas especializadas. Há rastreabilidade, processos formais e controle de conformidade com auditorias periódicas.',
        characteristics: [
          'Uso de software de gestão de ativos (ITAM)',
          'Integração com central de serviços e financeiro',
          'Políticas de aquisição, movimentação e descarte',
          'Indicadores de uso, renovação e inventário'
        ]
      },
      {
        level: 4,
        name: 'Gestão Otimizada e Baseada em Dados',
        description: 'A organização utiliza dados para otimizar o uso, reduzir custos e tomar decisões estratégicas. A prática é integrada à segurança, orçamento e sustentabilidade.',
        characteristics: [
          'Análise de ciclo de vida e ROI dos ativos',
          'Previsão de substituições e renovação automática',
          'Integração com gestão de riscos e compliance',
          'Controle de ativos móveis, licenças e contratos'
        ]
      },
      {
        level: 5,
        name: 'Gestão Inteligente, Sustentável e Estratégica dos Ativos',
        description: 'A gestão é automatizada e inteligente, com uso de IA, IoT e automação para controle em tempo real. Os ativos são geridos como parte da estratégia organizacional de inovação, ESG e eficiência operacional.',
        characteristics: [
          'Rastreamento em tempo real com sensores e IA',
          'Otimização baseada em machine learning',
          'Gestão de ativos com foco em ESG (descarte sustentável, economia circular)',
          'Apoio direto à inovação e transformação digital'
        ]
      }
    ]
  },
  dev_gerenciamento_software: {
    id: 'dev_gerenciamento_software',
    name: 'Desenvolvimento e Gerenciamento de Software',
    description: 'O Desenvolvimento e Gerenciamento de Software é a prática que organiza todas as etapas envolvidas na criação, manutenção e evolução de aplicações, desde o levantamento de requisitos até a entrega e suporte em produção. Essa prática garante que os sistemas entregues estejam alinhados às necessidades do negócio, sejam seguros, escaláveis, funcionais e com alta qualidade. Quando bem estruturada, permite acelerar o time-to-market, reduzir erros em produção e aumentar o valor entregue ao usuário.',
    levels: [
      {
        level: 1,
        name: 'Desenvolvimento Não Padronizado e Sem Processo Formal',
        description: 'As aplicações são desenvolvidas de maneira desorganizada, com baixo controle de versões e sem documentação adequada. Problemas são recorrentes e não há alinhamento com as demandas do negócio.',
        characteristics: [
          'Desenvolvimento baseado em iniciativas isoladas',
          'Falta de versionamento, testes e validação',
          'Código-fonte sem documentação ou repositório',
          'Alto retrabalho e tempo excessivo de entrega'
        ]
      },
      {
        level: 2,
        name: 'Processo Inicial de Desenvolvimento com Ferramentas Básicas',
        description: 'A organização começa a adotar um processo básico com uso de repositórios de código e definição inicial de requisitos. O controle ainda é manual e a integração entre equipes é limitada.',
        characteristics: [
          'Adoção de ferramentas como Git, Jira ou Trello',
          'Processos definidos para novas funcionalidades e correções',
          'Reuniões de planejamento pontuais',
          'Validações iniciais de qualidade e testes manuais'
        ]
      },
      {
        level: 3,
        name: 'Processo Padronizado com Integração e Qualidade de Código',
        description: 'A prática é formalizada com uso de pipelines, testes automatizados, integração entre desenvolvimento, QA e operações. Os requisitos são documentados e rastreáveis.',
        characteristics: [
          'Integração contínua (CI) e controle de versões',
          'Padronização de estrutura de código e revisões técnicas',
          'Práticas ágeis com sprints, backlog e entregas iterativas',
          'Monitoramento de falhas e cobertura de testes'
        ]
      },
      {
        level: 4,
        name: 'Desenvolvimento Ágil, Automatizado e Alinhado ao Negócio',
        description: 'O desenvolvimento é conduzido por squads multidisciplinares com forte integração ao negócio. A entrega é contínua (CD), com qualidade monitorada em tempo real.',
        characteristics: [
          'Ciclos curtos de entrega com validação de valor por sprint',
          'Automatização de testes, builds e deploys',
          'Feedback do cliente em tempo real',
          'Ferramentas de APM (Application Performance Monitoring)'
        ]
      },
      {
        level: 5,
        name: 'Engenharia de Software Inteligente com Inovação Contínua',
        description: 'A prática atinge a maturidade máxima ao incorporar inteligência artificial, analytics e engenharia de software orientada a dados, com foco em inovação, experiência e resultados de negócio.',
        characteristics: [
          'Engenharia de confiabilidade (SRE) e DevSecOps',
          'Tomada de decisão baseada em dados de uso real',
          'Automação inteligente de todo o ciclo de vida',
          'Entregas com foco em experiência do usuário e diferenciação estratégica'
        ]
      }
    ]
  },
  gestao_mudanca: {
    id: 'gestao_mudanca',
    name: 'Gestão da Mudança (Organizacional)',
    description: 'A Gestão da Mudança Organizacional é a prática responsável por preparar e apoiar pessoas, equipes e áreas da empresa na adoção de mudanças em processos, tecnologia, estrutura ou cultura. Seu objetivo é garantir que as mudanças sejam compreendidas, aceitas e sustentadas, reduzindo resistências e maximizando o sucesso da transformação. Ela envolve comunicação clara, capacitação, engajamento, gestão de impacto e suporte contínuo.',
    levels: [
      {
        level: 1,
        name: 'Mudanças Ocorrem sem Gestão das Pessoas',
        description: 'Mudanças são implementadas com foco apenas técnico ou operacional. A adesão dos colaboradores não é planejada, o que gera resistência, retrabalho e baixa eficácia.',
        characteristics: [
          'Falta de comunicação estruturada',
          'Ausência de envolvimento dos usuários',
          'Alto índice de rejeição e falhas de adoção',
          'Nenhum plano de transição ou suporte comportamental'
        ]
      },
      {
        level: 2,
        name: 'Ações Básicas de Comunicação e Treinamento',
        description: 'A organização passa a realizar comunicações e treinamentos pontuais nas mudanças mais relevantes. Ainda falta abordagem estruturada e análise de impactos.',
        characteristics: [
          'Planejamento básico de comunicação',
          'Treinamento introdutório para usuários-chave',
          'Ausência de análise de prontidão ou impactos organizacionais',
          'Equipes de projeto responsáveis por toda a transição'
        ]
      },
      {
        level: 3,
        name: 'Processo Estruturado de Gestão da Mudança',
        description: 'A prática é formalizada com planos de mudança, análise de stakeholders, ações de engajamento e suporte contínuo. As mudanças passam a ser acompanhadas de forma sistemática.',
        characteristics: [
          'Metodologias como ADKAR, Kotter ou Prosci aplicadas',
          'Mapeamento de riscos e resistência',
          'Suporte à liderança para comunicação e influência',
          'Planos de capacitação e reforço pós-implantação'
        ]
      },
      {
        level: 4,
        name: 'Mudança Integrada à Estratégia e Cultura Organizacional',
        description: 'A gestão da mudança é integrada aos programas estratégicos da empresa, com envolvimento ativo da liderança, cultura adaptativa e suporte constante aos colaboradores.',
        characteristics: [
          'Apoio da alta liderança como patrocinadores das mudanças',
          'Mudança como competência organizacional',
          'Avaliação de prontidão organizacional antes de cada transição',
          'Métricas de adoção e engajamento'
        ]
      },
      {
        level: 5,
        name: 'Gestão de Mudança Contínua, Ágil e Centrada no Colaborador',
        description: 'A prática atinge a maturidade ao se tornar contínua, baseada em dados e focada na experiência do colaborador. Mudanças ocorrem com fluidez, apoiadas por cultura de aprendizado e melhoria.',
        characteristics: [
          'Monitoramento de adoção em tempo real',
          'Design da mudança centrado nas jornadas das pessoas',
          'Equipes capacitadas em agilidade e gestão de transição',
          'Cultura organizacional adaptativa e resiliente'
        ]
      }
    ]
  },
  controle_mudancas: {
    id: 'controle_mudancas',
    name: 'Controle de Mudanças (Técnico)',
    description: 'O Controle de Mudanças (Técnico) é a prática responsável por planejar, avaliar, aprovar e implementar alterações técnicas nos serviços, sistemas, infraestrutura ou configurações da TI de forma segura e controlada. O objetivo é garantir que todas as mudanças ocorram com o mínimo de risco, mantendo a estabilidade e a continuidade operacional. Essa prática atua como um mecanismo de governança, reduzindo falhas em produção, evitando retrabalhos e assegurando que as alterações estejam alinhadas com os objetivos técnicos e de negócio.',
    levels: [
      {
        level: 1,
        name: 'Mudanças Técnicas Sem Registro ou Avaliação Formal',
        description: 'As mudanças são aplicadas diretamente em ambientes produtivos, sem documentação, comunicação ou validação. Isso gera interrupções frequentes e perda de confiança nos serviços de TI.',
        characteristics: [
          'Ausência de planejamento ou autorização',
          'Alterações realizadas fora de janelas adequadas',
          'Falta de rastreabilidade e histórico',
          'Alto índice de falhas após mudanças'
        ]
      },
      {
        level: 2,
        name: 'Registro Inicial com Avaliação Pontual',
        description: 'As mudanças começam a ser registradas, com algum nível de aprovação informal. Os riscos ainda não são plenamente avaliados e os planos de reversão são incompletos.',
        characteristics: [
          'Registro de mudanças em planilhas ou ferramentas básicas',
          'Aprovação por líderes técnicos',
          'Falta de categorização clara das mudanças',
          'Planos de reversão genéricos ou ausentes'
        ]
      },
      {
        level: 3,
        name: 'Processo Formalizado com Comitê de Mudanças (CAB)',
        description: 'A prática é estruturada com formulários de mudança, avaliação de riscos, impacto, aprovação por comitê e comunicação pré-implementação.',
        characteristics: [
          'Classificação em mudanças padrão, normais e emergenciais',
          'Avaliação de impacto técnico e de negócio',
          'Adoção de planos de reversão e testes obrigatórios',
          'Reuniões regulares de aprovação (CAB)'
        ]
      },
      {
        level: 4,
        name: 'Automação e Integração com DevOps e ITSM',
        description: 'As mudanças passam a ser automatizadas e integradas a ferramentas de desenvolvimento, testes e ITSM. A prática promove entregas mais rápidas com riscos controlados.',
        characteristics: [
          'Automatização de fluxos para mudanças padrão',
          'Integração com ferramentas CI/CD',
          'Indicadores de sucesso, falha e rollback',
          'Priorização baseada em dados históricos e criticidade'
        ]
      },
      {
        level: 5,
        name: 'Governança Inteligente e Inovação com Segurança',
        description: 'O Controle de Mudanças se torna estratégico, com análise preditiva, automação inteligente e integração com objetivos de inovação e continuidade do negócio.',
        characteristics: [
          'Avaliação baseada em IA e aprendizado de padrões',
          'Resposta automatizada a falhas pós-mudança',
          'Monitoramento contínuo de impacto',
          'Alinhamento com cultura DevSecOps e práticas de SRE'
        ]
      }
    ]
  },
  gestao_seguranca: {
    id: 'gestao_seguranca',
    name: 'Gestão de Segurança da Informação',
    description: 'A Gestão de Segurança da Informação é a prática responsável por proteger as informações e os ativos de TI contra acessos não autorizados, uso indevido, divulgação, alteração ou destruição. Essa prática visa garantir a confidencialidade, integridade e disponibilidade das informações, alinhando controles técnicos, administrativos e legais às necessidades da organização. Quando bem estruturada, ela contribui para a redução de riscos, a conformidade com regulamentações e a preservação da reputação da empresa.',
    levels: [
      {
        level: 1,
        name: 'Segurança Reativa e Fragmentada',
        description: 'A segurança é tratada apenas após a ocorrência de incidentes. Não existem políticas formalizadas, controles consistentes ou equipe dedicada à proteção da informação.',
        characteristics: [
          'Falta de políticas ou procedimentos documentados',
          'Proteção limitada a antivírus e firewall',
          'Resposta apenas após ataques ou falhas',
          'Acesso aos sistemas pouco controlado'
        ]
      },
      {
        level: 2,
        name: 'Início da Estruturação com Políticas Básicas',
        description: 'A organização cria as primeiras políticas de segurança e começa a conscientizar os usuários. São implementados controles básicos, mas ainda sem padronização.',
        characteristics: [
          'Políticas de segurança definidas e divulgadas',
          'Controle de acesso por senha e perfis de usuário',
          'Conscientização básica em campanhas pontuais',
          'Início do registro de incidentes de segurança'
        ]
      },
      {
        level: 3,
        name: 'Segurança Formalizada com Controles e Processos',
        description: 'A segurança é institucionalizada com processos documentados, ferramentas especializadas, resposta a incidentes estruturada e auditorias regulares.',
        characteristics: [
          'Políticas e normas aplicadas em todos os departamentos',
          'Ferramentas de proteção perimetral, endpoint e acesso lógico',
          'Processos de resposta a incidentes definidos',
          'Monitoramento ativo e relatórios de segurança'
        ]
      },
      {
        level: 4,
        name: 'Gestão Integrada de Riscos e Conformidade',
        description: 'A segurança é integrada à gestão de riscos, auditorias e compliance. Há um comitê de segurança e envolvimento da alta direção nas decisões.',
        characteristics: [
          'Análise de riscos baseada em frameworks (ISO 27001, NIST)',
          'Gestão de identidade e autenticação multifator (MFA)',
          'Testes periódicos de vulnerabilidades e simulações',
          'Indicadores de maturidade e painéis para executivos'
        ]
      },
      {
        level: 5,
        name: 'Segurança Inteligente, Preditiva e Estratégica',
        description: 'A prática atinge seu nível máximo com uso de inteligência artificial, automação e cultura de segurança difundida em toda a organização. A segurança é estratégica, proativa e adaptativa.',
        characteristics: [
          'Análise preditiva de ameaças com IA',
          'Resposta automatizada a incidentes (SOAR)',
          'Cultura de segurança embutida nas rotinas de negócio',
          'Segurança como diferencial competitivo e elemento ESG'
        ]
      }
    ]
  },
  gestao_configuracao: {
    id: 'gestao_configuracao',
    name: 'Gestão de Configuração de Serviço',
    description: 'A Gestão de Configuração de Serviço é a prática responsável por identificar, controlar e manter informações atualizadas sobre todos os itens de configuração (CIs) e suas relações ao longo do ciclo de vida dos serviços de TI. Esses itens incluem hardware, software, documentação, contratos e componentes relacionados. Seu objetivo é fornecer visibilidade, rastreabilidade e controle sobre os ativos de TI e suas interdependências, garantindo suporte eficaz à gestão de mudanças, incidentes, problemas e liberações.',
    levels: [
      {
        level: 1,
        name: 'Ausência de Controle e Registro de Configurações',
        description: 'Não existe mapeamento dos ativos e suas relações. As equipes não têm clareza sobre a estrutura dos serviços, o que dificulta o diagnóstico e a resolução de falhas.',
        characteristics: [
          'Não há CMDB ou inventário formal',
          'Equipes dependem do conhecimento tácito',
          'Dificuldade em avaliar o impacto de mudanças',
          'Suporte técnico com alto retrabalho'
        ]
      },
      {
        level: 2,
        name: 'Registro Parcial e Inventário Manual',
        description: 'Inicia-se a criação de um inventário básico dos itens de configuração, mas sem padronização ou integração. A rastreabilidade é limitada e atualizações são manuais.',
        characteristics: [
          'Planilhas ou ferramentas simples de inventário',
          'Mapeamento parcial de ativos e relacionamentos',
          'Atualização eventual, sem governança definida',
          'Início da utilização em incidentes e mudanças'
        ]
      },
      {
        level: 3,
        name: 'CMDB Estruturada e Relacionamentos Documentados',
        description: 'Uma base de dados de configuração (CMDB) é implantada, com controle de versões, relacionamentos e integrações com outras práticas de ITSM.',
        characteristics: [
          'CMDB integrada a ferramentas ITSM',
          'Relacionamentos entre CIs documentados',
          'Suporte direto às análises de impacto',
          'Atualizações controladas por processo de mudança'
        ]
      },
      {
        level: 4,
        name: 'Governança da Configuração e Integração com Operações',
        description: 'A CMDB se torna fonte confiável para decisões operacionais e estratégicas. Há governança formal e integração com monitoramento e segurança.',
        characteristics: [
          'Governança ativa da qualidade da CMDB',
          'Auditorias periódicas e reconciliação de dados',
          'Integração com ferramentas de discovery automático',
          'Uso em capacity planning e resposta a incidentes'
        ]
      },
      {
        level: 5,
        name: 'Inteligência Operacional Baseada em Configuração',
        description: 'A gestão de configuração é estratégica, com análise preditiva, visualização dinâmica dos serviços e suporte à automação de operações.',
        characteristics: [
          'Visão em tempo real das dependências dos serviços',
          'Suporte à decisão com base em dados de configuração',
          'Correlação com riscos, segurança e continuidade',
          'Integração com IA para previsão de falhas'
        ]
      }
    ]
  },
  gestao_continuidade: {
    id: 'gestao_continuidade',
    name: 'Gestão da Continuidade do Serviço',
    description: 'A Gestão da Continuidade do Serviço é a prática responsável por garantir que os serviços de TI possam ser mantidos ou restaurados rapidamente diante de incidentes graves, interrupções ou desastres. Seu objetivo é preservar a operação essencial dos negócios mesmo em situações adversas, protegendo ativos críticos, dados e processos. Essa prática é parte vital da resiliência organizacional e deve estar alinhada com a continuidade de negócios, sendo sustentada por planos de contingência, recuperação e testes periódicos.',
    levels: [
      {
        level: 1,
        name: 'Ausência de Planos ou Procedimentos de Continuidade',
        description: 'Não há preparação formal para eventos disruptivos. A recuperação depende de esforço individual e decisões improvisadas, gerando longas paralisações.',
        characteristics: [
          'Nenhum plano documentado de recuperação',
          'Falta de definição dos serviços críticos',
          'Dependência de conhecimento tácito',
          'Alto impacto nos negócios em caso de falhas'
        ]
      },
      {
        level: 2,
        name: 'Planos Básicos Criados, mas Pouco Testados',
        description: 'A organização começa a desenvolver planos de continuidade e recuperação para os principais serviços, mas a prática ainda é pouco integrada e não testada regularmente.',
        characteristics: [
          'Planos de recuperação de desastres (DRP) para áreas críticas',
          'Contatos de emergência e checklists definidos',
          'Testes esporádicos e limitados',
          'Baixo envolvimento da alta direção'
        ]
      },
      {
        level: 3,
        name: 'Processo Formalizado com Testes e Monitoramento',
        description: 'Os planos são formalizados, atualizados e testados regularmente. Existe governança para revisar a continuidade com base em mudanças nos serviços e estrutura organizacional.',
        characteristics: [
          'Planos de continuidade alinhados ao negócio (BCP/DRP)',
          'Testes regulares (simulações e DR drills)',
          'Acompanhamento de riscos e impacto',
          'Processos definidos para comunicação e decisão em crise'
        ]
      },
      {
        level: 4,
        name: 'Integração com Gestão de Riscos e Serviços de TI',
        description: 'A continuidade é parte do planejamento estratégico de TI e está integrada com gestão de risco, segurança da informação, mudanças e fornecedores.',
        characteristics: [
          'Análise de impacto nos negócios (BIA)',
          'Monitoramento de disponibilidade e falhas em tempo real',
          'Validação com stakeholders internos e externos',
          'Continuidade incluída em contratos e SLAs'
        ]
      },
      {
        level: 5,
        name: 'Resiliência Organizacional Inteligente e Automatizada',
        description: 'A prática evolui para um modelo de resiliência contínua, com uso de automação, inteligência preditiva e resposta adaptativa a eventos. A TI torna-se autossustentável mesmo em crises.',
        characteristics: [
          'Resposta automatizada a falhas com failover e replicação',
          'Avaliação contínua de risco e impacto',
          'Simulações com IA e machine learning',
          'Governança de continuidade integrada à cultura organizacional'
        ]
      }
    ]
  },
  validacao_teste: {
    id: 'validacao_teste',
    name: 'Validação e Teste de Serviço',
    description: 'A prática de Validação e Teste de Serviço é responsável por assegurar que os serviços, sistemas, aplicações e mudanças atendam aos requisitos funcionais e não funcionais antes de sua entrada em produção. Seu objetivo é garantir que tudo que for implantado realmente agregue valor ao negócio e funcione conforme o esperado. Essa prática é essencial para minimizar falhas, retrabalhos, riscos e impactos aos usuários.',
    levels: [
      {
        level: 1,
        name: 'Ausência de Testes Padronizados',
        description: 'Os testes são realizados de forma improvisada, sem planejamento, critérios ou documentação. As falhas em produção são recorrentes e o retrabalho é elevado.',
        characteristics: [
          'Testes feitos diretamente em produção',
          'Ausência de casos de teste documentados',
          'Nenhum ambiente de testes ou homologação',
          'Validação baseada apenas na percepção de quem desenvolve'
        ]
      },
      {
        level: 2,
        name: 'Planejamento Básico de Testes em Projetos Críticos',
        description: 'Testes começam a ser planejados em projetos maiores. São definidos critérios mínimos de aceitação e alguns registros são mantidos.',
        characteristics: [
          'Criação inicial de roteiros de teste',
          'Realização de testes em ambiente isolado',
          'Início da documentação de defeitos e validações',
          'Falta de integração com os ciclos de desenvolvimento'
        ]
      },
      {
        level: 3,
        name: 'Processo Formalizado com Tipos de Testes e Ciclos Definidos',
        description: 'A prática é estruturada com testes funcionais, não funcionais, unitários, de integração, homologação e regressão. Existe controle sobre defeitos, ciclos e aprovações.',
        characteristics: [
          'Documentação completa de planos e casos de teste',
          'Registro e rastreabilidade de defeitos',
          'Ciclos de teste com critérios de entrada e saída',
          'Ambientes dedicados para cada tipo de teste'
        ]
      },
      {
        level: 4,
        name: 'Testes Automatizados e Integração com DevOps',
        description: 'Grande parte dos testes é automatizada e integrada aos pipelines de desenvolvimento e implantação. A qualidade é mensurada de forma contínua.',
        characteristics: [
          'Testes automatizados com ferramentas especializadas',
          'Validação contínua com feedback rápido',
          'Métricas de cobertura, sucesso e falhas de testes',
          'Integração com CI/CD e controle de qualidade contínua'
        ]
      },
      {
        level: 5,
        name: 'Validação Inteligente Focada em Experiência e Valor',
        description: 'A prática evolui para validar continuamente a experiência real do usuário, valor entregue ao negócio e confiabilidade. A IA apoia a priorização, testes inteligentes e preditivos.',
        characteristics: [
          'Priorização de testes baseada em uso real e criticidade',
          'Simulações automatizadas do comportamento do usuário',
          'Correlação entre qualidade e impacto no negócio',
          'IA aplicada à análise de falhas e geração de cenários de teste'
        ]
      }
    ]
  },
  gestao_catalogo: {
    id: 'gestao_catalogo',
    name: 'Gestão do Catálogo de Serviços',
    description: 'A Gestão do Catálogo de Serviços é a prática responsável por definir, documentar, manter e disponibilizar um catálogo atualizado com todos os serviços oferecidos pela TI aos seus clientes e usuários. Esse catálogo serve como uma fonte única de informação sobre as características, SLAs, responsáveis e formas de solicitação dos serviços. Seu objetivo é garantir transparência, facilitar o acesso aos serviços, melhorar a comunicação entre TI e negócio, e apoiar a padronização e a governança da entrega de valor.',
    levels: [
      {
        level: 1,
        name: 'Ausência de Catálogo Formal',
        description: 'Os serviços prestados pela TI não estão documentados de forma estruturada. Os usuários desconhecem os serviços disponíveis e como solicitá-los, o que gera confusão e ineficiência.',
        characteristics: [
          'Falta de padronização na oferta de serviços',
          'Alto número de solicitações manuais e improdutivas',
          'Dificuldade de gestão e medição de desempenho',
          'Dependência de pessoas para repassar informações'
        ]
      },
      {
        level: 2,
        name: 'Catálogo Inicial com Serviços Críticos Listados',
        description: 'Um catálogo começa a ser montado com os serviços mais comuns ou críticos. Ele é acessado por planilhas ou documentos simples e sem integração com o portal de atendimento.',
        characteristics: [
          'Lista básica de serviços com breve descrição',
          'Não há padronização de prazos ou critérios de atendimento',
          'Baixa atualização e falta de visibilidade',
          'Pouco utilizado pelos usuários'
        ]
      },
      {
        level: 3,
        name: 'Catálogo Padronizado e Publicado em Portal de Serviços',
        description: 'O catálogo é estruturado, publicado em um portal acessível ao usuário e utilizado como base para a abertura de solicitações. Cada serviço possui descrição clara, critérios de elegibilidade, SLAs e responsáveis.',
        characteristics: [
          'Portal de autoatendimento com formulário por serviço',
          'Definição de SLAs e critérios de priorização',
          'Integração com o sistema de gestão de serviços (ITSM)',
          'Atualização periódica com base em melhorias contínuas'
        ]
      },
      {
        level: 4,
        name: 'Catálogo Dinâmico com Gestão Ativa de Demanda e Valor',
        description: 'O catálogo é gerido de forma dinâmica, com análise de demanda, evolução de serviços, avaliação de valor percebido e automação de processos recorrentes.',
        characteristics: [
          'Serviços priorizados com base em análise de uso',
          'Automação de solicitações simples e repetitivas',
          'Acompanhamento da experiência do usuário por serviço',
          'Comunicação clara das responsabilidades e prazos'
        ]
      },
      {
        level: 5,
        name: 'Catálogo Inteligente e Alinhado à Estratégia de Negócio',
        description: 'A prática atinge sua maturidade com um catálogo inteligente, adaptável às necessidades do negócio, com uso de IA para sugestões de serviços, personalização por perfil e integração com iniciativas de inovação.',
        characteristics: [
          'Catálogo adaptável por área, perfil ou histórico',
          'Sugestão automatizada de serviços com base em IA',
          'Acompanhamento contínuo do ciclo de vida dos serviços',
          'Planejamento estratégico de novos serviços baseado em dados'
        ]
      }
    ]
  },
  medicao_relatorios: {
    id: 'medicao_relatorios',
    name: 'Medição e Relatórios',
    description: 'A prática de Medição e Relatórios é responsável por definir, coletar, analisar e apresentar dados que permitam avaliar o desempenho, a eficiência e o valor dos serviços de TI. Essa prática fornece a base objetiva para tomada de decisão, melhoria contínua, prestação de contas e alinhamento estratégico. Seu papel é assegurar que as informações sejam relevantes, precisas, tempestivas e compreensíveis, apoiando a governança, a gestão por indicadores (KPIs) e o acompanhamento da maturidade dos processos.',
    levels: [
      {
        level: 1,
        name: 'Ausência de Indicadores e Relatórios',
        description: 'Não existem métricas padronizadas ou relatórios sistemáticos. As decisões são tomadas com base em percepções, e não há dados confiáveis sobre a performance da TI.',
        characteristics: [
          'Falta de definição do que medir',
          'Relatórios eventuais e não padronizados',
          'Baixa confiabilidade dos dados coletados',
          'Dificuldade em justificar investimentos ou melhorias'
        ]
      },
      {
        level: 2,
        name: 'Indicadores Básicos e Relatórios Manuais',
        description: 'São definidos alguns indicadores operacionais simples e os relatórios passam a ser elaborados manualmente, ainda com foco limitado.',
        characteristics: [
          'KPIs básicos como volume de chamados ou tempo médio de atendimento',
          'Relatórios mensais gerados em planilhas',
          'Foco em dados operacionais, não estratégicos',
          'Pouca análise crítica dos resultados'
        ]
      },
      {
        level: 3,
        name: 'Sistema de Medição Estruturado com Indicadores por Processo',
        description: 'A prática é formalizada com um conjunto de indicadores por prática de ITSM, metas definidas e análise sistemática dos dados com foco em melhoria contínua.',
        characteristics: [
          'Relatórios regulares com análise de desvios',
          'Painéis com visualização por processo e área',
          'Uso de ferramentas de BI e dashboards automatizados',
          'Indicadores alinhados com SLAs e OLAs'
        ]
      },
      {
        level: 4,
        name: 'Medição Integrada com o Negócio e Análise Preditiva',
        description: 'Os indicadores de TI são integrados aos objetivos do negócio e há uso de analytics para previsão de tendências e riscos.',
        characteristics: [
          'Métricas de valor e impacto no negócio',
          'Correlação entre indicadores de experiência, desempenho e custo',
          'Acompanhamento preditivo de capacidade, riscos e falhas',
          'Envolvimento da alta gestão nas análises'
        ]
      },
      {
        level: 5,
        name: 'Cultura Orientada a Dados e Inteligência de Serviços',
        description: 'A prática atinge a maturidade ao estabelecer uma cultura orientada por dados, com uso intensivo de inteligência artificial e indicadores estratégicos para guiar a inovação e a excelência operacional.',
        characteristics: [
          'IA para análise de causa raiz, previsões e otimizações',
          'Indicadores estratégicos com impacto em ESG, CX e governança',
          'Automação de relatórios com insights acionáveis',
          'Tomada de decisão baseada em evidências em todos os níveis'
        ]
      }
    ]
  },
  gestao_talentos: {
    id: 'gestao_talentos',
    name: 'Gestão de Talentos e Força de Trabalho',
    description: 'A Gestão de Talentos e Força de Trabalho é a prática responsável por atrair, desenvolver, engajar e reter os profissionais de TI, assegurando que a organização tenha as competências certas, no momento certo, para entregar seus serviços com excelência. Essa prática vai além da gestão de RH tradicional, promovendo a capacitação contínua, a valorização dos talentos e a criação de um ambiente de aprendizado e alta performance.',
    levels: [
      {
        level: 1,
        name: 'Gestão Reativa e Não Planejada da Equipe',
        description: 'A alocação de pessoas ocorre conforme urgências. Não há planejamento de competências ou desenvolvimento estruturado, gerando sobrecarga e rotatividade.',
        characteristics: [
          'Falta de mapeamento de competências',
          'Recrutamento baseado apenas em demanda emergencial',
          'Baixo investimento em capacitação',
          'Desmotivação e alta rotatividade'
        ]
      },
      {
        level: 2,
        name: 'Processos Básicos de Recrutamento e Treinamento',
        description: 'A organização começa a adotar processos de recrutamento mais estruturados e programas pontuais de treinamento, ainda desconectados da estratégia de TI.',
        characteristics: [
          'Descrições de cargo e perfis básicos definidos',
          'Treinamentos realizados por iniciativa dos gestores',
          'Baixa mensuração de resultados de capacitação',
          'Ausência de trilhas de desenvolvimento'
        ]
      },
      {
        level: 3,
        name: 'Planejamento Estratégico de Talentos e Capacitação',
        description: 'A prática é formalizada com planos de carreira, trilhas de capacitação e avaliação de desempenho. As competências são alinhadas aos objetivos da área de TI.',
        characteristics: [
          'Plano de desenvolvimento individual (PDI)',
          'Avaliações regulares de desempenho',
          'Capacitações alinhadas aos gaps de competência',
          'Programas de retenção e reconhecimento'
        ]
      },
      {
        level: 4,
        name: 'Cultura de Aprendizado Contínuo e Alta Performance',
        description: 'A organização cria uma cultura voltada ao aprendizado, inovação e desempenho. A gestão da força de trabalho passa a ser baseada em dados e engajamento.',
        characteristics: [
          'Plataformas de aprendizado e trilhas personalizadas',
          'KPIs de engajamento, capacitação e produtividade',
          'Programas de mentoria, coaching e sucessão',
          'Alinhamento com práticas de ESG e diversidade'
        ]
      },
      {
        level: 5,
        name: 'Força de Trabalho Inteligente, Ágil e Estratégica',
        description: 'A gestão de talentos atinge maturidade com uso de analytics, IA e modelos ágeis para formar times dinâmicos e estratégicos, promovendo inovação e diferenciação de mercado.',
        characteristics: [
          'People analytics para predição de performance e riscos',
          'Modelos flexíveis de alocação e squads multidisciplinares',
          'Inteligência artificial para recomendação de desenvolvimento',
          'Alinhamento integral com estratégia digital e de negócios'
        ]
      }
    ]
  },
  gestao_conhecimento: {
    id: 'gestao_conhecimento',
    name: 'Gestão do Conhecimento',
    description: 'A Gestão do Conhecimento é a prática que garante a identificação, captura, organização, compartilhamento e reutilização do conhecimento dentro da organização. Seu objetivo é assegurar que as informações e experiências relevantes estejam disponíveis para os profissionais de TI e demais usuários no momento certo, promovendo eficiência, inovação e melhoria contínua. Quando bem estruturada, essa prática reduz a dependência de indivíduos, acelera a resolução de problemas e promove uma cultura colaborativa e orientada ao aprendizado.',
    levels: [
      {
        level: 1,
        name: 'Conhecimento Fragmentado e Não Documentado',
        description: 'O conhecimento reside na cabeça dos colaboradores. Não há processos formais para registro ou compartilhamento, o que causa dependência de indivíduos e perda de conhecimento com desligamentos.',
        characteristics: [
          'Ausência de repositórios de conhecimento',
          'Resolução de problemas depende da experiência individual',
          'Informações dispersas em e-mails ou conversas',
          'Repetição frequente de erros por falta de histórico'
        ]
      },
      {
        level: 2,
        name: 'Registro Básico e Compartilhamento Pontual',
        description: 'A organização inicia o registro de procedimentos e soluções, principalmente em documentos ou planilhas. Ainda há pouca padronização e acesso restrito.',
        characteristics: [
          'Manuais e checklists criados por áreas específicas',
          'Compartilhamento entre equipes ainda informal',
          'Repositórios desconectados dos sistemas de atendimento',
          'Falta de curadoria e validação do conteúdo'
        ]
      },
      {
        level: 3,
        name: 'Base de Conhecimento Estruturada e Integrada ao ITSM',
        description: 'A prática é formalizada com base de conhecimento centralizada, processos de curadoria e integração com o atendimento, incidentes e solicitações.',
        characteristics: [
          'Artigos de conhecimento com estrutura padronizada',
          'Integração com a central de serviços e ferramentas ITSM',
          'Validação, revisão e versionamento de conteúdo',
          'Métricas de uso e eficácia do conhecimento'
        ]
      },
      {
        level: 4,
        name: 'Gestão Proativa e Colaborativa do Conhecimento',
        description: 'A organização promove uma cultura de compartilhamento e aprendizado contínuo. O conhecimento é gerado de forma colaborativa e mantido vivo e atualizado.',
        characteristics: [
          'Incentivo ao compartilhamento entre áreas e níveis',
          'Comunidades de prática e fóruns internos',
          'Gamificação, reconhecimento e engajamento dos contribuidores',
          'Ciclo de melhoria contínua da base de conhecimento'
        ]
      },
      {
        level: 5,
        name: 'Conhecimento Inteligente e Personalizado com Apoio da IA',
        description: 'A prática atinge maturidade com uso de inteligência artificial para organizar, recomendar e gerar conteúdo com base no contexto do usuário e nas tendências organizacionais.',
        characteristics: [
          'IA para sugestão e criação automática de artigos',
          'Personalização do conteúdo por perfil, função ou histórico',
          'Integração com assistentes virtuais e chatbots',
          'Conhecimento como ativo estratégico para inovação'
        ]
      }
    ]
  },
  gestao_implementacao: {
    id: 'gestao_implementacao',
    name: 'Gestão de Implementação de Serviços',
    description: 'A Gestão de Implementação é a prática responsável por planejar, coordenar e executar a transição de novos serviços, sistemas ou mudanças significativas para o ambiente operacional. Seu objetivo é garantir que as implementações ocorram com segurança, qualidade e alinhamento aos requisitos acordados, minimizando impactos e riscos para o negócio. Essa prática está intimamente conectada à gestão de mudanças, testes e liberação, sendo crucial para assegurar que os serviços de TI entreguem valor com estabilidade desde sua entrada em operação.',
    levels: [
      {
        level: 1,
        name: 'Implementações Não Planejadas e com Alto Risco',
        description: 'As mudanças são implementadas de forma desorganizada, sem planejamento, testes ou validações consistentes. As falhas em produção são frequentes e geram impactos negativos aos usuários.',
        characteristics: [
          'Falta de plano de implementação ou reversão',
          'Ausência de comunicação sobre mudanças',
          'Alta dependência de esforço individual',
          'Repetição de falhas operacionais após mudanças'
        ]
      },
      {
        level: 2,
        name: 'Planejamento Inicial para Projetos Específicos',
        description: 'A organização inicia a criação de planos de implementação para projetos relevantes. No entanto, os processos ainda são inconsistentes e pouco integrados.',
        characteristics: [
          'Definição de datas e escopos básicos',
          'Alguns testes prévios realizados',
          'Comunicação com usuários é pontual',
          'Falta de padronização e documentação formal'
        ]
      },
      {
        level: 3,
        name: 'Processo Padronizado de Implementação com Validação Prévia',
        description: 'A prática é formalizada com fluxos padronizados, testes obrigatórios, critérios de entrada e saída bem definidos e envolvimento das áreas impactadas.',
        characteristics: [
          'Plano de implementação aprovado com critérios técnicos e de negócio',
          'Ambientes de homologação configurados para validação',
          'Checklist de validação e reversão',
          'Monitoramento pós-implementação estabelecido'
        ]
      },
      {
        level: 4,
        name: 'Implementação Integrada, Automatizada e com Acompanhamento Contínuo',
        description: 'A implementação é parte de um processo integrado com outras práticas (mudança, liberação, testes) e parte das etapas é automatizada para reduzir falhas humanas.',
        characteristics: [
          'Pipelines automatizados para implantação contínua (CI/CD)',
          'Monitoramento ativo de desempenho após implementação',
          'Revisões pós-implementação e lições aprendidas',
          'Baixo índice de rollback'
        ]
      },
      {
        level: 5,
        name: 'Implementação Estratégica com Foco em Valor e Experiência',
        description: 'A prática atinge maturidade com foco em entrega de valor, experiência do usuário e impacto estratégico. A TI garante agilidade com qualidade e previsibilidade.',
        characteristics: [
          'Análise de valor e impacto como critério de aprovação',
          'Feedback contínuo do usuário e ajuste em tempo real',
          'Implementações planejadas como parte da jornada do cliente',
          'Apoio direto à inovação e diferenciação de mercado'
        ]
      }
    ]
  },
  design_servico: {
    id: 'design_servico',
    name: 'Design de Serviço',
    description: 'O Design de Serviço é a prática responsável por planejar e estruturar novos serviços ou mudanças significativas em serviços existentes, assegurando que estejam alinhados com os objetivos do negócio, sejam viáveis tecnicamente e sustentáveis operacionalmente. Seu foco é garantir que a experiência do usuário, os requisitos funcionais e não funcionais, os recursos e os riscos sejam considerados desde a concepção. Essa prática integra processos, pessoas, tecnologias e governança desde o início, promovendo entregas mais eficazes, com maior valor percebido e menor retrabalho ao longo do ciclo de vida dos serviços.',
    levels: [
      {
        level: 1,
        name: 'Ausência de Planejamento Formal na Criação de Serviços',
        description: 'Novos serviços são criados sem etapas de design estruturadas. A entrega ocorre com base na urgência ou demanda operacional, o que compromete a qualidade, sustentabilidade e aderência aos objetivos do negócio.',
        characteristics: [
          'Falta de definição de requisitos de negócio e técnicos',
          'Serviços desenvolvidos de forma improvisada',
          'Pouca consideração da capacidade ou impacto na operação',
          'Baixo envolvimento dos usuários e stakeholders'
        ]
      },
      {
        level: 2,
        name: 'Planejamento Inicial com Foco em Requisitos Básicos',
        description: 'A organização começa a definir requisitos mínimos de negócio e técnicos para novos serviços. Ainda há pouco foco na jornada do usuário e integração com outras práticas.',
        characteristics: [
          'Levantamento inicial de requisitos e dependências',
          'Especificações funcionais documentadas',
          'Pouca ou nenhuma consideração sobre riscos, custos ou escalabilidade',
          'Entregas ainda com ajustes recorrentes em produção'
        ]
      },
      {
        level: 3,
        name: 'Processo Estruturado de Design com Validação Interdisciplinar',
        description: 'A prática é formalizada com etapas definidas de design, incluindo análise de capacidade, riscos, custos, suporte, segurança e experiência do usuário.',
        characteristics: [
          'Workshops e reuniões com áreas técnicas e de negócio',
          'Prototipagem e validação prévia com usuários',
          'Documentação de arquitetura de serviço e plano de suporte',
          'Integração com práticas de segurança, continuidade e implementação'
        ]
      },
      {
        level: 4,
        name: 'Design Orientado à Experiência e Sustentabilidade Operacional',
        description: 'O design considera a jornada completa do usuário, a operação contínua do serviço, a escalabilidade e o retorno sobre investimento. O serviço é projetado para entrega de valor consistente.',
        characteristics: [
          'Mapas de jornada e personas utilizados no design',
          'Modelagem de custos e dimensionamento de capacidade',
          'Revisão contínua de padrões de arquitetura e qualidade',
          'Colaboração entre times ágeis, de infraestrutura e negócio'
        ]
      },
      {
        level: 5,
        name: 'Design Inteligente e Inovador com Apoio Estratégico',
        description: 'O Design de Serviço é estratégico, centrado em valor, inovação e adaptabilidade. Utiliza dados, automação e inteligência para antecipar necessidades e diferenciar os serviços no mercado.',
        characteristics: [
          'Design thinking, co-criação com clientes e times multifuncionais',
          'Simulações com IA e dados históricos de uso',
          'Design adaptativo e contínuo (serviços evoluem com o contexto)',
          'Conexão direta com a estratégia e cultura de inovação da organização'
        ]
      }
    ]
  },
  melhoria_continua: {
    id: 'melhoria_continua',
    name: 'Melhoria Contínua',
    description: 'A prática de Melhoria Contínua é responsável por garantir que os serviços de TI, processos, práticas e resultados sejam revisados, ajustados e aprimorados de forma sistemática e recorrente. Seu objetivo é sustentar o progresso organizacional com base em evidências, promover a inovação incremental e garantir que a TI continue alinhada com as necessidades do negócio ao longo do tempo. Essa prática se aplica a todas as outras práticas de ITIL, funcionando como uma engrenagem que impulsiona a eficiência, a experiência do usuário e a geração de valor com base em lições aprendidas e feedback contínuo.',
    levels: [
      {
        level: 1,
        name: 'Ausência de Revisões e Aprendizado Sistemático',
        description: 'Não há uma abordagem estruturada para revisar a performance ou aprender com os erros. As melhorias são reativas, ocasionais e não documentadas.',
        characteristics: [
          'Falta de indicadores ou metas de melhoria',
          'Problemas são tratados pontualmente sem análise de causa raiz',
          'Nenhuma documentação de lições aprendidas',
          'A repetição de falhas é comum'
        ]
      },
      {
        level: 2,
        name: 'Ações de Melhoria Iniciadas com Base em Feedbacks Isolados',
        description: 'A organização começa a capturar feedbacks e aplicar melhorias pontuais em alguns processos, ainda de forma pouco sistemática.',
        characteristics: [
          'Feedbacks coletados de forma informal',
          'Iniciativas de melhoria baseadas em urgência',
          'Pouco acompanhamento de resultados',
          'Documentação ainda inconsistente'
        ]
      },
      {
        level: 3,
        name: 'Processo Estruturado de Melhoria Contínua',
        description: 'A prática é formalizada com um ciclo de melhoria (como o PDCA ou o Modelo de Melhoria Contínua do ITIL), definição de metas, KPIs e planos de ação rastreáveis.',
        characteristics: [
          'Processos regulares de revisão e análise de dados',
          'Identificação e priorização de oportunidades de melhoria',
          'Comunicação estruturada sobre resultados e aprendizados',
          'Registro e rastreamento das ações de melhoria'
        ]
      },
      {
        level: 4,
        name: 'Melhoria Integrada com Estratégia e Inovação',
        description: 'A melhoria contínua é conectada aos objetivos estratégicos da organização. Os resultados são usados para direcionar investimentos e inovações sustentáveis.',
        characteristics: [
          'Ligação direta entre KPIs e metas organizacionais',
          'Revisões periódicas com foco em valor entregue',
          'Análise de tendência e projeções futuras baseadas em dados',
          'Participação ativa da alta gestão no processo de melhoria'
        ]
      },
      {
        level: 5,
        name: 'Cultura de Melhoria Contínua com Inteligência e Automação',
        description: 'A melhoria contínua se torna parte da cultura organizacional. Inteligência artificial e automação são utilizadas para identificar padrões, recomendar ações e acelerar os resultados.',
        characteristics: [
          'Feedback contínuo automatizado (voz do cliente, analytics)',
          'Repositório vivo de lições aprendidas e boas práticas',
          'Sugestões de melhoria geradas por IA e machine learning',
          'Times ágeis, multidisciplinares e orientados por valor'
        ]
      }
    ]
  }
};