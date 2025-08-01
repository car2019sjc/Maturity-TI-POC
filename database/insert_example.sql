-- =====================================================
-- EXEMPLO DE INSERÇÃO DE DADOS
-- Sistema: POC - Avaliação da Maturidade de TI (Boas Práticas) - ITIL v4
-- =====================================================

-- Exemplo de inserção de uma avaliação completa
INSERT INTO assessment_history (
    -- Informações da empresa
    company_name,
    company_sector,
    total_score,
    maturity_level,
    
    -- Dimensão Estratégica (9 práticas)
    gestao_estrategia,
    gestao_portfolio,
    gestao_projetos,
    gestao_financeira,
    analise_negocios,
    gestao_riscos,
    gestao_fornecedores,
    gestao_arquitetura,
    gestao_relacionamentos,
    
    -- Dimensão Operacional Core (12 práticas)
    central_servicos,
    gestao_solicitacoes,
    gestao_incidentes,
    gestao_problemas,
    gestao_nivel_servico,
    gestao_disponibilidade,
    gestao_capacidade_desempenho,
    monitoramento_eventos,
    gestao_infra_plataforma,
    dev_gerenciamento_software,
    gestao_implantacao,
    gestao_ativos,
    
    -- Dimensão Governança e Controle (8 práticas)
    gestao_catalogo,
    design_servico,
    controle_mudancas,
    gestao_configuracao,
    gestao_seguranca,
    validacao_teste,
    medicao_relatorios,
    gestao_continuidade,
    
    -- Dimensão Capacidade e Conhecimento (4 práticas)
    gestao_talentos,
    gestao_conhecimento,
    gestao_mudanca,
    gestao_implementacao,
    
    -- Dimensão Melhoria (1 prática)
    melhoria_continua,
    
    -- Scores por dimensão
    score_estrategica,
    score_operacional,
    score_governanca,
    score_capacidade,
    score_melhoria,
    
    -- Metadados
    ai_analysis_generated,
    pdf_generated
) VALUES (
    -- Informações da empresa
    'TechCorp Ltda',
    'Tecnologia',
    3.45,
    3,
    
    -- Dimensão Estratégica (9 práticas)
    4, -- gestao_estrategia
    3, -- gestao_portfolio
    4, -- gestao_projetos
    3, -- gestao_financeira
    3, -- analise_negocios
    2, -- gestao_riscos
    3, -- gestao_fornecedores
    4, -- gestao_arquitetura
    3, -- gestao_relacionamentos
    
    -- Dimensão Operacional Core (12 práticas)
    4, -- central_servicos
    3, -- gestao_solicitacoes
    4, -- gestao_incidentes
    3, -- gestao_problemas
    3, -- gestao_nivel_servico
    2, -- gestao_disponibilidade
    3, -- gestao_capacidade_desempenho
    3, -- monitoramento_eventos
    3, -- gestao_infra_plataforma
    4, -- dev_gerenciamento_software
    3, -- gestao_implantacao
    3, -- gestao_ativos
    
    -- Dimensão Governança e Controle (8 práticas)
    3, -- gestao_catalogo
    3, -- design_servico
    4, -- controle_mudancas
    3, -- gestao_configuracao
    4, -- gestao_seguranca
    3, -- validacao_teste
    2, -- medicao_relatorios
    2, -- gestao_continuidade
    
    -- Dimensão Capacidade e Conhecimento (4 práticas)
    3, -- gestao_talentos
    3, -- gestao_conhecimento
    2, -- gestao_mudanca
    3, -- gestao_implementacao
    
    -- Dimensão Melhoria (1 prática)
    3, -- melhoria_continua
    
    -- Scores por dimensão (calculados)
    3.22, -- score_estrategica
    3.17, -- score_operacional
    3.00, -- score_governanca
    2.75, -- score_capacidade
    3.00, -- score_melhoria
    
    -- Metadados
    TRUE,  -- ai_analysis_generated
    TRUE   -- pdf_generated
);

-- =====================================================
-- FUNÇÃO PARA CALCULAR SCORES AUTOMATICAMENTE
-- =====================================================

DELIMITER //

CREATE FUNCTION calculate_dimension_score(
    p1 INT, p2 INT, p3 INT, p4 INT, p5 INT, p6 INT, p7 INT, p8 INT, p9 INT,
    p10 INT, p11 INT, p12 INT
) RETURNS DECIMAL(4,2)
READS SQL DATA
DETERMINISTIC
BEGIN
    DECLARE total_practices INT DEFAULT 0;
    DECLARE sum_scores INT DEFAULT 0;
    
    -- Contar práticas não nulas
    IF p1 IS NOT NULL THEN SET total_practices = total_practices + 1; SET sum_scores = sum_scores + p1; END IF;
    IF p2 IS NOT NULL THEN SET total_practices = total_practices + 1; SET sum_scores = sum_scores + p2; END IF;
    IF p3 IS NOT NULL THEN SET total_practices = total_practices + 1; SET sum_scores = sum_scores + p3; END IF;
    IF p4 IS NOT NULL THEN SET total_practices = total_practices + 1; SET sum_scores = sum_scores + p4; END IF;
    IF p5 IS NOT NULL THEN SET total_practices = total_practices + 1; SET sum_scores = sum_scores + p5; END IF;
    IF p6 IS NOT NULL THEN SET total_practices = total_practices + 1; SET sum_scores = sum_scores + p6; END IF;
    IF p7 IS NOT NULL THEN SET total_practices = total_practices + 1; SET sum_scores = sum_scores + p7; END IF;
    IF p8 IS NOT NULL THEN SET total_practices = total_practices + 1; SET sum_scores = sum_scores + p8; END IF;
    IF p9 IS NOT NULL THEN SET total_practices = total_practices + 1; SET sum_scores = sum_scores + p9; END IF;
    IF p10 IS NOT NULL THEN SET total_practices = total_practices + 1; SET sum_scores = sum_scores + p10; END IF;
    IF p11 IS NOT NULL THEN SET total_practices = total_practices + 1; SET sum_scores = sum_scores + p11; END IF;
    IF p12 IS NOT NULL THEN SET total_practices = total_practices + 1; SET sum_scores = sum_scores + p12; END IF;
    
    IF total_practices = 0 THEN
        RETURN 0.00;
    ELSE
        RETURN ROUND(sum_scores / total_practices, 2);
    END IF;
END //

DELIMITER ;

-- =====================================================
-- TRIGGER PARA CALCULAR SCORES AUTOMATICAMENTE
-- =====================================================

DELIMITER //

CREATE TRIGGER calculate_scores_before_insert
BEFORE INSERT ON assessment_history
FOR EACH ROW
BEGIN
    -- Calcular score da dimensão estratégica (9 práticas)
    SET NEW.score_estrategica = calculate_dimension_score(
        NEW.gestao_estrategia, NEW.gestao_portfolio, NEW.gestao_projetos,
        NEW.gestao_financeira, NEW.analise_negocios, NEW.gestao_riscos,
        NEW.gestao_fornecedores, NEW.gestao_arquitetura, NEW.gestao_relacionamentos,
        NULL, NULL, NULL
    );
    
    -- Calcular score da dimensão operacional (12 práticas)
    SET NEW.score_operacional = calculate_dimension_score(
        NEW.central_servicos, NEW.gestao_solicitacoes, NEW.gestao_incidentes,
        NEW.gestao_problemas, NEW.gestao_nivel_servico, NEW.gestao_disponibilidade,
        NEW.gestao_capacidade_desempenho, NEW.monitoramento_eventos, NEW.gestao_infra_plataforma,
        NEW.dev_gerenciamento_software, NEW.gestao_implantacao, NEW.gestao_ativos
    );
    
    -- Calcular score da dimensão governança (8 práticas)
    SET NEW.score_governanca = calculate_dimension_score(
        NEW.gestao_catalogo, NEW.design_servico, NEW.controle_mudancas,
        NEW.gestao_configuracao, NEW.gestao_seguranca, NEW.validacao_teste,
        NEW.medicao_relatorios, NEW.gestao_continuidade, NULL,
        NULL, NULL, NULL
    );
    
    -- Calcular score da dimensão capacidade (4 práticas)
    SET NEW.score_capacidade = calculate_dimension_score(
        NEW.gestao_talentos, NEW.gestao_conhecimento, NEW.gestao_mudanca,
        NEW.gestao_implementacao, NULL, NULL,
        NULL, NULL, NULL,
        NULL, NULL, NULL
    );
    
    -- Score da dimensão melhoria (1 prática)
    SET NEW.score_melhoria = NEW.melhoria_continua;
    
    -- Calcular score total ponderado
    SET NEW.total_score = ROUND(
        (NEW.score_estrategica * 0.30) +
        (NEW.score_operacional * 0.25) +
        (NEW.score_governanca * 0.20) +
        (NEW.score_capacidade * 0.15) +
        (NEW.score_melhoria * 0.10),
        2
    );
    
    -- Determinar nível de maturidade
    IF NEW.total_score >= 4.5 THEN
        SET NEW.maturity_level = 5;
    ELSEIF NEW.total_score >= 3.5 THEN
        SET NEW.maturity_level = 4;
    ELSEIF NEW.total_score >= 2.5 THEN
        SET NEW.maturity_level = 3;
    ELSEIF NEW.total_score >= 1.8 THEN
        SET NEW.maturity_level = 2;
    ELSE
        SET NEW.maturity_level = 1;
    END IF;
END //

DELIMITER ;