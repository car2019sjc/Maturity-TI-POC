-- =====================================================
-- CONSULTAS ÚTEIS PARA ANÁLISE DO HISTÓRICO
-- Sistema: POC - Avaliação da Maturidade de TI (Boas Práticas) - ITIL v4
-- =====================================================

-- VIEW para facilitar consultas com nomes das práticas
CREATE VIEW v_assessment_summary AS
SELECT 
    id,
    assessment_date,
    company_name,
    company_sector,
    total_score,
    maturity_level,
    score_estrategica,
    score_operacional,
    score_governanca,
    score_capacidade,
    score_melhoria,
    ai_analysis_generated,
    pdf_generated,
    
    -- Contagem de práticas por nível
    (CASE WHEN gestao_estrategia = 1 THEN 1 ELSE 0 END +
     CASE WHEN gestao_portfolio = 1 THEN 1 ELSE 0 END +
     CASE WHEN gestao_projetos = 1 THEN 1 ELSE 0 END +
     CASE WHEN gestao_financeira = 1 THEN 1 ELSE 0 END +
     CASE WHEN analise_negocios = 1 THEN 1 ELSE 0 END +
     CASE WHEN gestao_riscos = 1 THEN 1 ELSE 0 END +
     CASE WHEN gestao_fornecedores = 1 THEN 1 ELSE 0 END +
     CASE WHEN gestao_arquitetura = 1 THEN 1 ELSE 0 END +
     CASE WHEN gestao_relacionamentos = 1 THEN 1 ELSE 0 END +
     CASE WHEN central_servicos = 1 THEN 1 ELSE 0 END +
     CASE WHEN gestao_solicitacoes = 1 THEN 1 ELSE 0 END +
     CASE WHEN gestao_incidentes = 1 THEN 1 ELSE 0 END +
     CASE WHEN gestao_problemas = 1 THEN 1 ELSE 0 END +
     CASE WHEN gestao_nivel_servico = 1 THEN 1 ELSE 0 END +
     CASE WHEN gestao_disponibilidade = 1 THEN 1 ELSE 0 END +
     CASE WHEN gestao_capacidade_desempenho = 1 THEN 1 ELSE 0 END +
     CASE WHEN monitoramento_eventos = 1 THEN 1 ELSE 0 END +
     CASE WHEN gestao_infra_plataforma = 1 THEN 1 ELSE 0 END +
     CASE WHEN dev_gerenciamento_software = 1 THEN 1 ELSE 0 END +
     CASE WHEN gestao_implantacao = 1 THEN 1 ELSE 0 END +
     CASE WHEN gestao_ativos = 1 THEN 1 ELSE 0 END +
     CASE WHEN gestao_catalogo = 1 THEN 1 ELSE 0 END +
     CASE WHEN design_servico = 1 THEN 1 ELSE 0 END +
     CASE WHEN controle_mudancas = 1 THEN 1 ELSE 0 END +
     CASE WHEN gestao_configuracao = 1 THEN 1 ELSE 0 END +
     CASE WHEN gestao_seguranca = 1 THEN 1 ELSE 0 END +
     CASE WHEN validacao_teste = 1 THEN 1 ELSE 0 END +
     CASE WHEN medicao_relatorios = 1 THEN 1 ELSE 0 END +
     CASE WHEN gestao_continuidade = 1 THEN 1 ELSE 0 END +
     CASE WHEN gestao_talentos = 1 THEN 1 ELSE 0 END +
     CASE WHEN gestao_conhecimento = 1 THEN 1 ELSE 0 END +
     CASE WHEN gestao_mudanca = 1 THEN 1 ELSE 0 END +
     CASE WHEN gestao_implementacao = 1 THEN 1 ELSE 0 END +
     CASE WHEN melhoria_continua = 1 THEN 1 ELSE 0 END) AS praticas_nivel_1,
     
    -- Práticas nível 5 (otimizadas)
    (CASE WHEN gestao_estrategia = 5 THEN 1 ELSE 0 END +
     CASE WHEN gestao_portfolio = 5 THEN 1 ELSE 0 END +
     CASE WHEN gestao_projetos = 5 THEN 1 ELSE 0 END +
     CASE WHEN gestao_financeira = 5 THEN 1 ELSE 0 END +
     CASE WHEN analise_negocios = 5 THEN 1 ELSE 0 END +
     CASE WHEN gestao_riscos = 5 THEN 1 ELSE 0 END +
     CASE WHEN gestao_fornecedores = 5 THEN 1 ELSE 0 END +
     CASE WHEN gestao_arquitetura = 5 THEN 1 ELSE 0 END +
     CASE WHEN gestao_relacionamentos = 5 THEN 1 ELSE 0 END +
     CASE WHEN central_servicos = 5 THEN 1 ELSE 0 END +
     CASE WHEN gestao_solicitacoes = 5 THEN 1 ELSE 0 END +
     CASE WHEN gestao_incidentes = 5 THEN 1 ELSE 0 END +
     CASE WHEN gestao_problemas = 5 THEN 1 ELSE 0 END +
     CASE WHEN gestao_nivel_servico = 5 THEN 1 ELSE 0 END +
     CASE WHEN gestao_disponibilidade = 5 THEN 1 ELSE 0 END +
     CASE WHEN gestao_capacidade_desempenho = 5 THEN 1 ELSE 0 END +
     CASE WHEN monitoramento_eventos = 5 THEN 1 ELSE 0 END +
     CASE WHEN gestao_infra_plataforma = 5 THEN 1 ELSE 0 END +
     CASE WHEN dev_gerenciamento_software = 5 THEN 1 ELSE 0 END +
     CASE WHEN gestao_implantacao = 5 THEN 1 ELSE 0 END +
     CASE WHEN gestao_ativos = 5 THEN 1 ELSE 0 END +
     CASE WHEN gestao_catalogo = 5 THEN 1 ELSE 0 END +
     CASE WHEN design_servico = 5 THEN 1 ELSE 0 END +
     CASE WHEN controle_mudancas = 5 THEN 1 ELSE 0 END +
     CASE WHEN gestao_configuracao = 5 THEN 1 ELSE 0 END +
     CASE WHEN gestao_seguranca = 5 THEN 1 ELSE 0 END +
     CASE WHEN validacao_teste = 5 THEN 1 ELSE 0 END +
     CASE WHEN medicao_relatorios = 5 THEN 1 ELSE 0 END +
     CASE WHEN gestao_continuidade = 5 THEN 1 ELSE 0 END +
     CASE WHEN gestao_talentos = 5 THEN 1 ELSE 0 END +
     CASE WHEN gestao_conhecimento = 5 THEN 1 ELSE 0 END +
     CASE WHEN gestao_mudanca = 5 THEN 1 ELSE 0 END +
     CASE WHEN gestao_implementacao = 5 THEN 1 ELSE 0 END +
     CASE WHEN melhoria_continua = 5 THEN 1 ELSE 0 END) AS praticas_nivel_5
     
FROM assessment_history;

-- =====================================================
-- CONSULTAS DE EXEMPLO
-- =====================================================

-- 1. Últimas 10 avaliações realizadas
SELECT 
    company_name,
    company_sector,
    total_score,
    maturity_level,
    assessment_date
FROM assessment_history 
ORDER BY assessment_date DESC 
LIMIT 10;

-- 2. Média de maturidade por setor
SELECT 
    company_sector,
    COUNT(*) as total_avaliacoes,
    ROUND(AVG(total_score), 2) as score_medio,
    ROUND(AVG(maturity_level), 1) as nivel_medio,
    MIN(total_score) as menor_score,
    MAX(total_score) as maior_score
FROM assessment_history 
GROUP BY company_sector 
ORDER BY score_medio DESC;

-- 3. Empresas com maior maturidade (nível 4 ou 5)
SELECT 
    company_name,
    company_sector,
    total_score,
    maturity_level,
    assessment_date
FROM assessment_history 
WHERE maturity_level >= 4 
ORDER BY total_score DESC;

-- 4. Análise de dimensões mais fracas
SELECT 
    'Estratégica' as dimensao,
    ROUND(AVG(score_estrategica), 2) as score_medio
FROM assessment_history
UNION ALL
SELECT 
    'Operacional',
    ROUND(AVG(score_operacional), 2)
FROM assessment_history
UNION ALL
SELECT 
    'Governança',
    ROUND(AVG(score_governanca), 2)
FROM assessment_history
UNION ALL
SELECT 
    'Capacidade',
    ROUND(AVG(score_capacidade), 2)
FROM assessment_history
UNION ALL
SELECT 
    'Melhoria',
    ROUND(AVG(score_melhoria), 2)
FROM assessment_history
ORDER BY score_medio ASC;

-- 5. Evolução temporal de uma empresa específica
SELECT 
    assessment_date,
    total_score,
    maturity_level,
    score_estrategica,
    score_operacional,
    score_governanca,
    score_capacidade,
    score_melhoria
FROM assessment_history 
WHERE company_name = 'NOME_DA_EMPRESA'
ORDER BY assessment_date ASC;

-- 6. Práticas mais problemáticas (nível 1 e 2)
SELECT 
    'Gestão de Estratégia' as pratica,
    SUM(CASE WHEN gestao_estrategia <= 2 THEN 1 ELSE 0 END) as empresas_baixo_nivel,
    ROUND(AVG(gestao_estrategia), 2) as nivel_medio
FROM assessment_history
UNION ALL
SELECT 
    'Gestão de Portfolio',
    SUM(CASE WHEN gestao_portfolio <= 2 THEN 1 ELSE 0 END),
    ROUND(AVG(gestao_portfolio), 2)
FROM assessment_history
UNION ALL
SELECT 
    'Central de Serviços',
    SUM(CASE WHEN central_servicos <= 2 THEN 1 ELSE 0 END),
    ROUND(AVG(central_servicos), 2)
FROM assessment_history
-- Adicionar outras práticas conforme necessário
ORDER BY empresas_baixo_nivel DESC;

-- 7. Relatório executivo por período
SELECT 
    DATE_FORMAT(assessment_date, '%Y-%m') as mes_ano,
    COUNT(*) as total_avaliacoes,
    ROUND(AVG(total_score), 2) as score_medio,
    COUNT(CASE WHEN maturity_level = 1 THEN 1 END) as nivel_1,
    COUNT(CASE WHEN maturity_level = 2 THEN 1 END) as nivel_2,
    COUNT(CASE WHEN maturity_level = 3 THEN 1 END) as nivel_3,
    COUNT(CASE WHEN maturity_level = 4 THEN 1 END) as nivel_4,
    COUNT(CASE WHEN maturity_level = 5 THEN 1 END) as nivel_5
FROM assessment_history 
WHERE assessment_date >= DATE_SUB(NOW(), INTERVAL 12 MONTH)
GROUP BY DATE_FORMAT(assessment_date, '%Y-%m')
ORDER BY mes_ano DESC;

-- 8. Benchmark por porte de empresa (baseado no nome/setor)
SELECT 
    CASE 
        WHEN company_sector LIKE '%Startup%' OR company_sector LIKE '%Pequena%' THEN 'Pequeno Porte'
        WHEN company_sector LIKE '%Média%' OR company_sector LIKE '%Medium%' THEN 'Médio Porte'
        WHEN company_sector LIKE '%Grande%' OR company_sector LIKE '%Large%' THEN 'Grande Porte'
        ELSE 'Não Classificado'
    END as porte_empresa,
    COUNT(*) as total_avaliacoes,
    ROUND(AVG(total_score), 2) as score_medio,
    ROUND(AVG(maturity_level), 1) as nivel_medio
FROM assessment_history 
GROUP BY 
    CASE 
        WHEN company_sector LIKE '%Startup%' OR company_sector LIKE '%Pequena%' THEN 'Pequeno Porte'
        WHEN company_sector LIKE '%Média%' OR company_sector LIKE '%Medium%' THEN 'Médio Porte'
        WHEN company_sector LIKE '%Grande%' OR company_sector LIKE '%Large%' THEN 'Grande Porte'
        ELSE 'Não Classificado'
    END
ORDER BY score_medio DESC;