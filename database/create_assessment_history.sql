-- =====================================================
-- TABELA PARA HISTÓRICO DE AVALIAÇÕES DE MATURIDADE TI
-- Sistema: POC - Avaliação da Maturidade de TI (Boas Práticas) - ITIL v4
-- Data: 2025-01-18
-- =====================================================

-- Tabela principal para armazenar o histórico das avaliações
CREATE TABLE assessment_history (
    -- Campos de identificação
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    assessment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    -- Informações da empresa/usuário
    company_name VARCHAR(255) NOT NULL,
    company_sector VARCHAR(100) NOT NULL,
    
    -- Scores calculados
    total_score DECIMAL(4,2) NOT NULL,
    maturity_level INT NOT NULL CHECK (maturity_level BETWEEN 1 AND 5),
    
    -- DIMENSÃO ESTRATÉGICA (9 práticas) - Peso 30%
    gestao_estrategia INT NOT NULL CHECK (gestao_estrategia BETWEEN 1 AND 5),
    gestao_portfolio INT NOT NULL CHECK (gestao_portfolio BETWEEN 1 AND 5),
    gestao_projetos INT NOT NULL CHECK (gestao_projetos BETWEEN 1 AND 5),
    gestao_financeira INT NOT NULL CHECK (gestao_financeira BETWEEN 1 AND 5),
    analise_negocios INT NOT NULL CHECK (analise_negocios BETWEEN 1 AND 5),
    gestao_riscos INT NOT NULL CHECK (gestao_riscos BETWEEN 1 AND 5),
    gestao_fornecedores INT NOT NULL CHECK (gestao_fornecedores BETWEEN 1 AND 5),
    gestao_arquitetura INT NOT NULL CHECK (gestao_arquitetura BETWEEN 1 AND 5),
    gestao_relacionamentos INT NOT NULL CHECK (gestao_relacionamentos BETWEEN 1 AND 5),
    
    -- DIMENSÃO OPERACIONAL CORE (12 práticas) - Peso 25%
    central_servicos INT NOT NULL CHECK (central_servicos BETWEEN 1 AND 5),
    gestao_solicitacoes INT NOT NULL CHECK (gestao_solicitacoes BETWEEN 1 AND 5),
    gestao_incidentes INT NOT NULL CHECK (gestao_incidentes BETWEEN 1 AND 5),
    gestao_problemas INT NOT NULL CHECK (gestao_problemas BETWEEN 1 AND 5),
    gestao_nivel_servico INT NOT NULL CHECK (gestao_nivel_servico BETWEEN 1 AND 5),
    gestao_disponibilidade INT NOT NULL CHECK (gestao_disponibilidade BETWEEN 1 AND 5),
    gestao_capacidade_desempenho INT NOT NULL CHECK (gestao_capacidade_desempenho BETWEEN 1 AND 5),
    monitoramento_eventos INT NOT NULL CHECK (monitoramento_eventos BETWEEN 1 AND 5),
    gestao_infra_plataforma INT NOT NULL CHECK (gestao_infra_plataforma BETWEEN 1 AND 5),
    dev_gerenciamento_software INT NOT NULL CHECK (dev_gerenciamento_software BETWEEN 1 AND 5),
    gestao_implantacao INT NOT NULL CHECK (gestao_implantacao BETWEEN 1 AND 5),
    gestao_ativos INT NOT NULL CHECK (gestao_ativos BETWEEN 1 AND 5),
    
    -- DIMENSÃO GOVERNANÇA E CONTROLE (8 práticas) - Peso 20%
    gestao_catalogo INT NOT NULL CHECK (gestao_catalogo BETWEEN 1 AND 5),
    design_servico INT NOT NULL CHECK (design_servico BETWEEN 1 AND 5),
    controle_mudancas INT NOT NULL CHECK (controle_mudancas BETWEEN 1 AND 5),
    gestao_configuracao INT NOT NULL CHECK (gestao_configuracao BETWEEN 1 AND 5),
    gestao_seguranca INT NOT NULL CHECK (gestao_seguranca BETWEEN 1 AND 5),
    validacao_teste INT NOT NULL CHECK (validacao_teste BETWEEN 1 AND 5),
    medicao_relatorios INT NOT NULL CHECK (medicao_relatorios BETWEEN 1 AND 5),
    gestao_continuidade INT NOT NULL CHECK (gestao_continuidade BETWEEN 1 AND 5),
    
    -- DIMENSÃO CAPACIDADE E CONHECIMENTO (4 práticas) - Peso 15%
    gestao_talentos INT NOT NULL CHECK (gestao_talentos BETWEEN 1 AND 5),
    gestao_conhecimento INT NOT NULL CHECK (gestao_conhecimento BETWEEN 1 AND 5),
    gestao_mudanca INT NOT NULL CHECK (gestao_mudanca BETWEEN 1 AND 5),
    gestao_implementacao INT NOT NULL CHECK (gestao_implementacao BETWEEN 1 AND 5),
    
    -- DIMENSÃO MELHORIA (1 prática) - Peso 10%
    melhoria_continua INT NOT NULL CHECK (melhoria_continua BETWEEN 1 AND 5),
    
    -- Scores por dimensão (calculados)
    score_estrategica DECIMAL(4,2) NOT NULL,
    score_operacional DECIMAL(4,2) NOT NULL,
    score_governanca DECIMAL(4,2) NOT NULL,
    score_capacidade DECIMAL(4,2) NOT NULL,
    score_melhoria DECIMAL(4,2) NOT NULL,
    
    -- Metadados
    ai_analysis_generated BOOLEAN DEFAULT FALSE,
    pdf_generated BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Índices para melhorar performance das consultas
CREATE INDEX idx_assessment_date ON assessment_history(assessment_date);
CREATE INDEX idx_company_name ON assessment_history(company_name);
CREATE INDEX idx_company_sector ON assessment_history(company_sector);
CREATE INDEX idx_maturity_level ON assessment_history(maturity_level);
CREATE INDEX idx_total_score ON assessment_history(total_score);

-- Comentários para documentação
ALTER TABLE assessment_history 
COMMENT = 'Histórico de avaliações de maturidade de TI baseadas em ITIL v4 - 34 práticas distribuídas em 5 dimensões';

-- Comentários nos campos principais
ALTER TABLE assessment_history 
MODIFY COLUMN company_name VARCHAR(255) NOT NULL COMMENT 'Nome da empresa avaliada',
MODIFY COLUMN company_sector VARCHAR(100) NOT NULL COMMENT 'Setor de atuação da empresa',
MODIFY COLUMN total_score DECIMAL(4,2) NOT NULL COMMENT 'Score total ponderado (1.0 a 5.0)',
MODIFY COLUMN maturity_level INT NOT NULL COMMENT 'Nível de maturidade final (1-5)';