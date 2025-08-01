import React, { useMemo, useState, useEffect } from 'react';
import { Brain, FileDown } from 'lucide-react';
import { Scores, getMaturityLevel, AIAnalysis } from '../utils/calculations';
import { generateProfessionalPDF } from '../utils/pdfGenerator';

import { assessmentData } from '../data/pocAssessmentData';
import { AIPoweredAnalysis } from './AIPoweredAnalysis';
import { PracticeLevelModal } from './PracticeLevelModal';
import { UpsellSection } from './UpsellSection';

interface CompanyInfo {
  name: string;
  sector: string;
}

interface SummaryReportProps {
  scores: Scores;
  companyInfo: CompanyInfo;
  onNavigateToAssessment: () => void;
  aiAnalysis?: AIAnalysis | null;
  isLoadingAi?: boolean;
  onGenerateAIAnalysis: () => void;
  answers?: Record<string, number>;
}

export const SummaryReport: React.FC<SummaryReportProps> = ({
  scores,
  companyInfo,
  onNavigateToAssessment,
  aiAnalysis,
  isLoadingAi,
  onGenerateAIAnalysis,
  answers = {}
}) => {
  const maturityLevel = getMaturityLevel(scores.total);

  // Função para garantir que arrays sejam arrays de strings puras
  const sanitizeAIAnalysis = (analysis: AIAnalysis | null | undefined): AIAnalysis | null => {
    if (!analysis) return null;
    
    // Clonar profundamente e garantir que todos os arrays sejam de strings
    const sanitized = JSON.parse(JSON.stringify(analysis));
    
    // Sanitizar arrays em critical_points
    if (sanitized.critical_points && Array.isArray(sanitized.critical_points)) {
      sanitized.critical_points = sanitized.critical_points.map((point: any) => ({
        ...point,
        risks: Array.isArray(point.risks) ? point.risks.map((r: any) => String(r)) : [],
        mitigations: Array.isArray(point.mitigations) ? point.mitigations.map((m: any) => String(m)) : []
      }));
    }
    
    // Sanitizar main_risks
    if (sanitized.main_risks && Array.isArray(sanitized.main_risks)) {
      sanitized.main_risks = sanitized.main_risks.map((r: any) => String(r));
    }
    
    // Sanitizar roadmap
    if (sanitized.roadmap && Array.isArray(sanitized.roadmap)) {
      sanitized.roadmap = sanitized.roadmap.map((phase: any) => ({
        ...phase,
        actions: Array.isArray(phase.actions) ? phase.actions.map((a: any) => String(a)) : [],
        kpis: Array.isArray(phase.kpis) ? phase.kpis.map((k: any) => String(k)) : []
      }));
    }
    
    // Sanitizar strategic_priorities
    if (sanitized.strategic_priorities && Array.isArray(sanitized.strategic_priorities)) {
      sanitized.strategic_priorities = sanitized.strategic_priorities.map((p: any) => String(p));
    }
    
    return sanitized;
  };

  // Usar análise sanitizada
  const sanitizedAiAnalysis = useMemo(() => sanitizeAIAnalysis(aiAnalysis), [aiAnalysis]);

  // Estados para controlar o modal de detalhes da prática
  const [selectedPracticeModal, setSelectedPracticeModal] = useState<{
    isOpen: boolean;
    practiceId: string;
    practiceLevel: number;
    practiceName: string;
  }>({
    isOpen: false,
    practiceId: '',
    practiceLevel: 1,
    practiceName: ''
  });

  // Estado para controlar se está processando um clique
  const [isProcessingClick, setIsProcessingClick] = useState(false);

  // Limpar estado do modal quando o componente for desmontado
  useEffect(() => {
    return () => {
      setSelectedPracticeModal({
        isOpen: false,
        practiceId: '',
        practiceLevel: 1,
        practiceName: ''
      });
    };
  }, []);

  // Função para abrir o modal
  const handleShowPracticeLevel = (practiceId: string, level: number, name: string) => {
    // Prevenir cliques múltiplos
    if (isProcessingClick) {
      console.log('handleShowPracticeLevel - Clique ignorado, ainda processando');
      return;
    }

    setIsProcessingClick(true);

    // Debug logging e validação
    console.log('handleShowPracticeLevel - Dados recebidos:', {
      practiceId,
      level,
      name,
      typeOfPracticeId: typeof practiceId,
      typeOfLevel: typeof level,
      typeOfName: typeof name
    });

    // Validação básica
    if (!practiceId || !name || !level || level < 1 || level > 5) {
      console.error('handleShowPracticeLevel - Dados inválidos detectados:', {
        practiceId,
        level,
        name
      });
      alert('Erro: Dados da prática inválidos. Por favor, recarregue a página e tente novamente.');
      setIsProcessingClick(false);
      return;
    }

    // Garantir que o modal anterior esteja fechado antes de abrir um novo
    setSelectedPracticeModal({
      isOpen: false,
      practiceId: '',
      practiceLevel: 1,
      practiceName: ''
    });

    // Usar setTimeout para garantir que o estado seja limpo antes de abrir o novo modal
    setTimeout(() => {
      try {
        setSelectedPracticeModal({
          isOpen: true,
          practiceId: String(practiceId),
          practiceLevel: Number(level),
          practiceName: String(name)
        });
      } catch (error) {
        console.error('handleShowPracticeLevel - Erro ao abrir modal:', error);
        alert('Erro ao abrir detalhes da prática. Por favor, tente novamente.');
      } finally {
        // Liberar o processamento após um pequeno delay
        setTimeout(() => setIsProcessingClick(false), 300);
      }
    }, 50);
  };

  // Função para fechar o modal
  const handleClosePracticeModal = () => {
    setSelectedPracticeModal({
      isOpen: false,
      practiceId: '',
      practiceLevel: 1,
      practiceName: ''
    });
    // Garantir que o processamento seja liberado
    setIsProcessingClick(false);
  };

  // Criar mapa de práticas para a tabela consolidada
  const practicesMap: Record<string, string> = {
    'gestao_estrategia': 'Gestão de Estratégia',
    'gestao_portfolio': 'Gestão de Portfólio',
    'gestao_projetos': 'Gestão de Projetos',
    'gestao_financeira': 'Gestão Financeira',
    'analise_negocios': 'Análise de Negócios',
    'gestao_riscos': 'Gestão de Riscos',
    'gestao_fornecedores': 'Gestão de Fornecedores',
    'gestao_arquitetura': 'Gestão da Arquitetura de TI',
    'gestao_relacionamentos': 'Gestão de Relacionamentos',
    'central_servicos': 'Central de Serviços',
    'gestao_incidentes': 'Gestão de Incidentes',
    'gestao_solicitacoes': 'Gestão de Solicitações de Serviço',
    'gestao_nivel_servico': 'Gestão do Nível de Serviço',
    'gestao_disponibilidade': 'Gestão da Disponibilidade',
    'gestao_capacidade_desempenho': 'Gestão de Capacidade e Desempenho',
    'monitoramento_eventos': 'Monitoramento e Gerenciamento de Eventos',
    'gestao_problemas': 'Gestão de Problemas',
    'gestao_implantacao': 'Gestão de Implantação',
    'gestao_infra_plataforma': 'Gestão de Infraestrutura e Plataforma',
    'gestao_ativos': 'Gestão de Ativos de TI',
    'dev_gerenciamento_software': 'Desenvolvimento e Gerenciamento de Software',
    'gestao_mudanca': 'Gestão da Mudança',
    'controle_mudancas': 'Controle de Mudanças',
    'gestao_seguranca': 'Gestão de Segurança da Informação',
    'gestao_configuracao': 'Gestão de Configuração de Serviço',
    'gestao_continuidade': 'Gestão da Continuidade do Serviço',
    'validacao_teste': 'Validação e Teste de Serviço',
    'gestao_catalogo': 'Gestão do Catálogo de Serviços',
    'medicao_relatorios': 'Medição e Relatórios',
    'gestao_talentos': 'Gestão de Talentos e Força de Trabalho',
    'gestao_conhecimento': 'Gestão do Conhecimento',
    'gestao_implementacao': 'Gestão de Implementação de Serviços',
    'design_servico': 'Design de Serviço',
    'melhoria_continua': 'Melhoria Contínua'
  };

  const handlePrint = () => {
    try {
      // Adicionar um pequeno delay para garantir que o estado esteja estável
      setTimeout(() => {
        generateProfessionalPDF(
          scores,
          companyInfo,
          maturityLevel,
          answers,
          practicesMap,
          sanitizedAiAnalysis
        );
      }, 100);
    } catch (error) {
      console.error('Erro ao gerar PDF:', error);
      alert('Erro ao gerar o PDF. Por favor, tente novamente.');
    }
  };

  return (
    <div className="max-w-7xl mx-auto summary-report-content">
      <div className="flex flex-wrap justify-between items-center gap-4 mb-8">
        <div>
          <h2 className="text-4xl font-bold text-blue-900 mb-2">
            Resumo da Avaliação
          </h2>
          <p className="text-xl text-gray-600">
            {companyInfo.name} - {companyInfo.sector}
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button 
            onClick={onNavigateToAssessment} 
            className="bg-gray-200 text-gray-800 font-semibold py-3 px-6 rounded-lg hover:bg-gray-300 transition-all duration-200"
          >
            ← Ver Avaliação
          </button>
          <button 
            onClick={handlePrint} 
            className="bg-gradient-to-r from-green-600 to-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:from-green-700 hover:to-blue-700 flex items-center gap-2 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            <Brain size={18}/> Baixar PDF
          </button>
        </div>
      </div>

      {/* Score Card */}
      <div className="mb-8">
        <div className="bg-gradient-to-br from-blue-500 to-purple-600 text-white p-8 rounded-2xl shadow-xl max-w-md">
          <h3 className="text-lg font-semibold opacity-90 mb-2">Pontuação Final</h3>
          <p className="text-5xl font-bold mb-2">{scores.total}</p>
          <p className="text-sm opacity-75">de 5.0 pontos</p>
        </div>
      </div>

      {/* Maturity Level Details */}
      <div className="bg-gradient-to-br from-white to-gray-50 p-8 rounded-2xl shadow-xl mb-8 border border-gray-200">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2 flex items-center">
            <div className={`w-8 h-8 rounded-full mr-4 flex items-center justify-center text-white font-bold text-xl ${
                  maturityLevel.level === 1 ? 'bg-red-500' :
                  maturityLevel.level === 2 ? 'bg-orange-500' :
                  maturityLevel.level === 3 ? 'bg-yellow-500' :
                  maturityLevel.level === 4 ? 'bg-blue-500' : 'bg-green-500'
            }`}>
              {maturityLevel.level}
            </div>
            📊 Análise de Maturidade
          </h2>
          <p className="text-gray-600 text-lg">
            Análise detalhada do nível de maturidade atual e recomendações para evolução
          </p>
          </div>

        {/* Card do Nível Atual */}
        <div className={`p-6 rounded-xl border-2 mb-8 ${
          maturityLevel.level === 1 ? 'bg-red-50 border-red-300' :
          maturityLevel.level === 2 ? 'bg-orange-50 border-orange-300' :
          maturityLevel.level === 3 ? 'bg-yellow-50 border-yellow-300' :
          maturityLevel.level === 4 ? 'bg-blue-50 border-blue-300' : 'bg-green-50 border-green-300'
        }`}>
          <div className="flex items-center justify-between mb-4">
            <h3 className={`text-2xl font-bold ${
              maturityLevel.level === 1 ? 'text-red-700' :
              maturityLevel.level === 2 ? 'text-orange-700' :
              maturityLevel.level === 3 ? 'text-yellow-700' :
              maturityLevel.level === 4 ? 'text-blue-700' : 'text-green-700'
            }`}>
              {maturityLevel.name}
            </h3>
            <div className="text-right">
              <div className={`text-2xl font-bold ${
                maturityLevel.level === 1 ? 'text-red-600' :
                maturityLevel.level === 2 ? 'text-orange-600' :
                maturityLevel.level === 3 ? 'text-yellow-600' :
                maturityLevel.level === 4 ? 'text-blue-600' : 'text-green-600'
              }`}>
                {((scores.total / 5) * 100).toFixed(1)}%
              </div>
              <div className="text-sm text-gray-600">
                {scores.total.toFixed(2)}/5 pontos
              </div>
        </div>
      </div>

          {/* Barra de Progresso */}
          <div className="mb-4">
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className={`h-3 rounded-full transition-all duration-300 ${
                maturityLevel.level === 1 ? 'bg-red-500' :
                maturityLevel.level === 2 ? 'bg-orange-500' :
                maturityLevel.level === 3 ? 'bg-yellow-500' :
                maturityLevel.level === 4 ? 'bg-blue-500' : 'bg-green-500'
                }`}
                style={{ width: `${(scores.total / 5) * 100}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>Nível 1</span>
              <span>Nível 2</span>
              <span>Nível 3</span>
              <span>Nível 4</span>
              <span>Nível 5</span>
            </div>
          </div>
        </div>

        {/* Características e Riscos */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
            <h3 className="font-bold text-xl mb-4 text-gray-900 flex items-center">
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                📋
              </div>
              Características do Nível Atingido
            </h3>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-700 leading-relaxed text-justify">{maturityLevel.characteristics}</p>
          </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
            <h3 className="font-bold text-xl mb-4 text-red-700 flex items-center">
              <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center mr-3">
                ⚠️
              </div>
              Riscos Associados
            </h3>
            <div className="bg-red-50 p-4 rounded-lg border border-red-200">
              <p className="text-red-800 leading-relaxed text-justify">{maturityLevel.risks}</p>
            </div>
          </div>
        </div>

        {/* Próximo Nível de Maturidade */}
        {maturityLevel.level < 5 && (
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-xl border border-green-200 mb-8">
            <h3 className="font-bold text-xl mb-4 text-green-700 flex items-center">
              <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-3">
                🎯
              </div>
              Próximo Nível de Maturidade
            </h3>
            {(() => {
              const nextLevel = assessmentData.maturityLevels.find(level => level.level === maturityLevel.level + 1);
              if (!nextLevel) return null;
              
              return (
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="flex items-center mb-3">
                    <div className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center font-bold mr-3">
                      {nextLevel.level}
                    </div>
                    <h4 className="text-lg font-semibold text-green-700">{nextLevel.name}</h4>
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed text-justify">{nextLevel.characteristics}</p>
                </div>
              );
            })()}
          </div>
        )}

        {/* Recomendações para Evolução */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-200">
          <h3 className="font-bold text-xl mb-4 text-blue-700 flex items-center">
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
              💡
            </div>
            Recomendações para Evolução
          </h3>
          
          <div className="space-y-6">
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                Ações Prioritárias
              </h4>
              <ul className="space-y-2 text-sm text-gray-700">
                {(() => {
                  const recommendations = [];
                  if (maturityLevel.level === 1) {
                    recommendations.push('Estabelecer processos básicos documentados para as principais operações de TI');
                    recommendations.push('Implementar controles mínimos de segurança da informação');
                    recommendations.push('Criar estrutura básica de atendimento ao usuário (Service Desk)');
                    recommendations.push('Definir responsabilidades claras para a equipe de TI');
                  } else if (maturityLevel.level === 2) {
                    recommendations.push('Padronizar processos existentes e integrá-los com ferramentas de ITSM');
                    recommendations.push('Implementar medição básica de desempenho (SLAs)');
                    recommendations.push('Estabelecer processos formais de gestão de mudanças');
                    recommendations.push('Desenvolver programas de capacitação da equipe');
                  } else if (maturityLevel.level === 3) {
                    recommendations.push('Implementar automação de processos repetitivos');
                    recommendations.push('Estabelecer métricas avançadas e dashboards gerenciais');
                    recommendations.push('Integrar TI mais estreitamente com objetivos de negócio');
                    recommendations.push('Implementar gestão de portfólio de projetos');
                  } else if (maturityLevel.level === 4) {
                    recommendations.push('Implementar analytics avançados e inteligência artificial');
                    recommendations.push('Estabelecer cultura de inovação e experimentação');
                    recommendations.push('Otimizar processos baseado em dados quantitativos');
                    recommendations.push('Desenvolver capacidades de transformação digital');
                  } else {
                    recommendations.push('Manter excelência operacional e buscar inovação contínua');
                    recommendations.push('Liderar transformação digital no seu setor');
                    recommendations.push('Desenvolver parcerias estratégicas em tecnologia');
                    recommendations.push('Investir em pesquisa e desenvolvimento');
                  }
                  
                  return recommendations.map((rec, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-blue-500 mr-3 mt-1">•</span>
                      <span>{rec}</span>
                    </li>
                  ));
                })()}
              </ul>
            </div>


          </div>
        </div>
      </div>

      {/* AI Analysis */}
      {sanitizedAiAnalysis && (
        <AIPoweredAnalysis 
          analysis={sanitizedAiAnalysis}
          isLoading={isLoadingAi || false}
          scores={scores}
        />
      )}
      
      {isLoadingAi && !sanitizedAiAnalysis && (
        <AIPoweredAnalysis 
          analysis={{} as AIAnalysis}
          isLoading={true}
          scores={scores}
        />
      )}
      
      {!sanitizedAiAnalysis && !isLoadingAi && (
        <div className="bg-gradient-to-br from-purple-50 to-blue-50 border border-purple-200 rounded-2xl p-8 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-3 rounded-xl">
                <Brain className="text-white" size={32} />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-blue-900">Análise com IA & Roadmap Estratégico</h3>
                <p className="text-gray-600">Gere insights personalizados para o seu segmento</p>
              </div>
            </div>
            <button
              onClick={onGenerateAIAnalysis}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center"
            >
              <Brain size={20} className="mr-2" />
              Gerar Análise Inteligente
            </button>
          </div>
        </div>
      )}

      {/* Tabela Consolidada de Maturidade */}
      <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 mb-8">
        <h3 className="font-bold text-2xl mb-6 text-blue-900">📊 Tabela Consolidada de Maturidade</h3>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b-2 border-gray-200">
                <th className="text-left py-3 px-3 font-bold text-gray-900 border-r border-gray-200">Prática</th>
                <th className="text-center py-3 px-2 font-bold text-gray-900 border-r border-gray-200">Peso</th>
                <th className="text-center py-3 px-2 font-bold text-gray-900 border-r border-gray-200">Nível</th>
                <th className="text-center py-3 px-2 font-bold text-gray-900 border-r border-gray-200">PP</th>
                <th className="text-center py-3 px-2 font-bold text-gray-900 border-r border-gray-200">PM</th>
                <th className="text-center py-3 px-2 font-bold text-gray-900 border-r border-gray-200">Gap</th>
                <th className="text-center py-3 px-2 font-bold text-gray-900">Status</th>
              </tr>
            </thead>
            <tbody>
              {assessmentData.dimensions.map((dimension) => 
                dimension.practices.map((practiceId, practiceIndex) => {
                  const answer = answers[practiceId] || 1;
                  const pp = (answer * dimension.weight).toFixed(3);
                  const pm = (5 * dimension.weight).toFixed(3);
                  const gap = ((5 - answer) * dimension.weight).toFixed(3);
                  
                  return (
                    <tr key={practiceId} className="border-b border-gray-100 hover:bg-gray-50 transition-colors duration-200">
                      <td className="py-3 px-3 font-medium text-gray-900 border-r border-gray-100">
                        {practicesMap[practiceId] || practiceId}
                      </td>
                      <td className="py-3 px-2 text-center text-gray-600 border-r border-gray-100">
                        {(dimension.weight * 100).toFixed(1)}%
                      </td>
                      <td className="py-3 px-2 text-center font-bold border-r border-gray-100">
                        <span className={`${
                          answer >= 4 ? 'text-green-600' :
                          answer >= 3 ? 'text-blue-600' :
                          answer >= 2 ? 'text-yellow-600' : 'text-red-600'
                        }`}>
                          {answer}
                        </span>
                      </td>
                      <td className="py-3 px-2 text-center text-gray-600 font-mono text-sm border-r border-gray-100">
                        {pp}
                      </td>
                      <td className="py-3 px-2 text-center text-gray-600 font-mono text-sm border-r border-gray-100">
                        {pm}
                      </td>
                      <td className="py-3 px-2 text-center font-mono text-sm border-r border-gray-100">
                        <span className={`${
                          parseFloat(gap) <= 0.02 ? 'text-green-600' :
                          parseFloat(gap) <= 0.05 ? 'text-yellow-600' : 'text-red-600'
                        }`}>
                          {gap}
                        </span>
                      </td>
                      <td className="py-3 px-2 text-center">
                        <div className={`w-3 h-3 rounded-full mx-auto ${
                          answer >= 4 ? 'bg-green-500' :
                          answer >= 3 ? 'bg-yellow-500' :
                          answer >= 2 ? 'bg-orange-500' : 'bg-red-500'
                        }`}></div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
        
        {/* Legenda */}
        <div className="mt-6 bg-gray-50 rounded-lg p-4">
          <h4 className="font-semibold text-gray-900 mb-3">📋 Legenda da Tabela:</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
            <div>
              <span className="font-medium text-gray-700">Peso:</span> Importância relativa da prática
            </div>
            <div>
              <span className="font-medium text-gray-700">Nível:</span> Maturidade atual (1-5)
            </div>
            <div>
              <span className="font-medium text-gray-700">PP:</span> Pontuação Ponderada atual
            </div>
            <div>
              <span className="font-medium text-gray-700">PM:</span> Pontuação Máxima possível
            </div>
            <div>
              <span className="font-medium text-gray-700">Gap:</span> Diferença para máxima maturidade
            </div>
            <div className="flex items-center space-x-2">
              <span className="font-medium text-gray-700">Status:</span>
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-xs">Excelente</span>
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <span className="text-xs">Bom</span>
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                <span className="text-xs">Regular</span>
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <span className="text-xs">Crítico</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* TOP 10 PRÁTICAS COM MAIOR GAP */}
      <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 mb-8">
        <h3 className="font-bold text-2xl mb-6 text-red-900 flex items-center">
          🔥 TOP 10 PRÁTICAS COM MAIOR GAP
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-red-50 border-b-2 border-red-200">
                <th className="text-center py-3 px-3 font-bold text-red-900 border-r border-red-200">Ranking</th>
                <th className="text-left py-3 px-4 font-bold text-red-900 border-r border-red-200">Prática</th>
                <th className="text-center py-3 px-3 font-bold text-red-900 border-r border-red-200">Gap</th>
                <th className="text-left py-3 px-4 font-bold text-red-900 border-r border-red-200">Impacto Estratégico</th>
                <th className="text-center py-3 px-3 font-bold text-red-900">Detalhes</th>
              </tr>
            </thead>
            <tbody>
              {(() => {
                // Calcular gaps para todas as práticas
                const practiceGaps: Array<{
                  id: string;
                  name: string;
                  gap: number;
                  level: number;
                  dimension: string;
                }> = [];

                assessmentData.dimensions.forEach(dimension => {
                  dimension.practices.forEach(practiceId => {
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

                // Ordenar por gap (maior primeiro) e pegar top 10
                const top10Gaps = practiceGaps
                  .sort((a, b) => b.gap - a.gap)
                  .slice(0, 10);

                // Função para determinar impacto estratégico
                const getStrategicImpact = (practiceId: string, level: number) => {
                  const impactMap: Record<string, string> = {
                    'gestao_talentos': 'Déficit de competências',
                    'gestao_implantacao': 'Velocidade de entrega comprometida',
                    'gestao_continuidade': 'Risco de interrupção operacional',
                    'gestao_riscos': 'Exposição regulatória/normativa',
                    'gestao_ativos': 'Ineficiência de recursos',
                    'gestao_mudanca': 'Resistência organizacional',
                    'gestao_capacidade_desempenho': 'Gargalos operacionais',
                    'melhoria_continua': 'Estagnação competitiva',
                    'gestao_incidentes': 'Disponibilidade de sistemas',
                    'gestao_problemas': 'Recorrência de falhas',
                    'gestao_estrategia': 'Desalinhamento estratégico',
                    'gestao_portfolio': 'ROI de investimentos',
                    'gestao_projetos': 'Entrega de projetos',
                    'gestao_financeira': 'Controle orçamentário',
                    'analise_negocios': 'Requisitos inadequados',
                    'gestao_fornecedores': 'Dependência de terceiros',
                    'gestao_arquitetura': 'Complexidade técnica',
                    'gestao_relacionamentos': 'Satisfação stakeholders',
                    'central_servicos': 'Experiência do usuário',
                    'gestao_solicitacoes': 'Eficiência operacional',
                    'gestao_nivel_servico': 'Cumprimento de SLAs',
                    'gestao_disponibilidade': 'Continuidade de negócio',
                    'monitoramento_eventos': 'Visibilidade operacional',
                    'gestao_infra_plataforma': 'Estabilidade da infraestrutura',
                    'dev_gerenciamento_software': 'Qualidade de software',
                    'controle_mudancas': 'Controle de alterações',
                    'gestao_seguranca': 'Segurança da informação',
                    'gestao_configuracao': 'Rastreabilidade de ativos',
                    'validacao_teste': 'Qualidade de entrega',
                    'gestao_catalogo': 'Transparência de serviços',
                    'medicao_relatorios': 'Tomada de decisão',
                    'gestao_conhecimento': 'Retenção de conhecimento',
                    'gestao_implementacao': 'Go-to-market de serviços',
                    'design_servico': 'Inovação em serviços'
                  };
                  return impactMap[practiceId] || 'Impacto operacional';
                };

                // Função para determinar cor do impacto
                const getImpactColor = (level: number) => {
                  if (level === 1) return 'text-red-700 font-bold';
                  if (level === 2) return 'text-orange-600 font-semibold';
                  return 'text-yellow-600 font-medium';
                };

                // Função para determinar severidade
                const getSeverity = (level: number) => {
                  if (level === 1) return { text: 'Crítico', color: 'bg-red-500' };
                  if (level === 2) return { text: 'Alto', color: 'bg-orange-500' };
                  return { text: 'Médio', color: 'bg-yellow-500' };
                };

                return top10Gaps.map((practice, index) => {
                  const severity = getSeverity(practice.level);
                  return (
                    <tr key={practice.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors duration-200">
                      <td className="py-3 px-3 text-center font-bold text-gray-900 border-r border-gray-100">
                        <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-sm font-bold">
                          {index + 1}º
                        </span>
                      </td>
                      <td className="py-3 px-4 font-medium text-gray-900 border-r border-gray-100">
                        {practice.name}
                      </td>
                      <td className="py-3 px-3 text-center font-mono text-sm border-r border-gray-100">
                        <span className="text-red-600 font-bold">
                          {practice.gap.toFixed(3)}
                        </span>
                      </td>
                      <td className="py-3 px-4 border-r border-gray-100">
                        <div className="flex items-center space-x-2">
                          <span className={`${severity.color} text-white px-2 py-1 rounded text-xs font-bold`}>
                            {severity.text}
                          </span>
                          <span className={getImpactColor(practice.level)}>
                            {getStrategicImpact(practice.id, practice.level)}
                          </span>
                        </div>
                      </td>
                      <td className="py-3 px-3 text-center">
                        {(practice.level <= 2) && (
                          <button
                            onClick={() => handleShowPracticeLevel(practice.id, practice.level, practice.name)}
                            disabled={isProcessingClick}
                            className={`${
                              isProcessingClick 
                                ? 'bg-gray-400 cursor-not-allowed' 
                                : 'bg-blue-600 hover:bg-blue-700'
                            } text-white text-xs font-medium px-3 py-1 rounded-lg transition-colors duration-200 flex items-center space-x-1 mx-auto`}
                          >
                            <span>📋</span>
                            <span>{isProcessingClick ? 'Carregando...' : 'Ver Nível'}</span>
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                });
              })()}
            </tbody>
          </table>
        </div>
        
        {/* Legenda do TOP 10 */}
        <div className="mt-6 bg-red-50 rounded-lg p-4 border border-red-200">
          <h4 className="font-semibold text-red-900 mb-3">🎯 Interpretação dos Gaps:</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-medium text-red-700">Gap:</span> Diferença entre nível máximo (5) e atual, ponderado pelo peso da dimensão
            </div>
            <div className="flex items-center space-x-2">
              <span className="font-medium text-red-700">Severidade:</span>
              <div className="flex items-center space-x-1">
                <span className="bg-red-500 text-white px-2 py-1 rounded text-xs font-bold">Crítico</span>
                <span className="bg-orange-500 text-white px-2 py-1 rounded text-xs font-bold">Alto</span>
                <span className="bg-yellow-500 text-white px-2 py-1 rounded text-xs font-bold">Médio</span>
              </div>
            </div>
          </div>
          <div className="mt-3 text-sm text-red-800">
            <strong>Priorização:</strong> As práticas listadas representam as maiores oportunidades de melhoria, 
            considerando tanto o gap de maturidade quanto o peso estratégico da dimensão.
          </div>
          <div className="mt-3 text-sm text-red-800">
            <strong>💡 Dica:</strong> Práticas com severidade "Crítico" ou "Alto" possuem o botão "Ver Nível" 
            que mostra as características do nível selecionado na avaliação, ajudando você a lembrar o contexto.
              </div>
        </div>
      </div>

      {/* Detailed Scores */}
      <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 mb-8">
        <h3 className="font-bold text-2xl mb-6 text-gray-900">Detalhamento por Dimensão</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-4 px-2 font-semibold text-gray-900">Dimensão</th>
                <th className="text-center py-4 px-2 font-semibold text-gray-900">Peso</th>
                <th className="text-center py-4 px-2 font-semibold text-gray-900">Pontuação</th>
                <th className="text-center py-4 px-2 font-semibold text-gray-900">Contribuição</th>
                <th className="text-center py-4 px-2 font-semibold text-gray-900">Status</th>
              </tr>
            </thead>
            <tbody>
              {Object.values(scores.byDimension).map((dim, index) => (
                <tr key={index} className="border-b border-gray-100 hover:bg-gray-50 transition-colors duration-200">
                  <td className="py-4 px-2 font-medium text-gray-900">{dim.name}</td>
                  <td className="py-4 px-2 text-center text-gray-600">{Math.round(dim.weight * 100)}%</td>
                  <td className="py-4 px-2 text-center">
                    <span className={`font-bold ${
                      dim.score >= 4 ? 'text-green-600' :
                      dim.score >= 3 ? 'text-blue-600' :
                      dim.score >= 2 ? 'text-yellow-600' : 'text-red-600'
                    }`}>
                      {dim.score}
                    </span>
                  </td>
                  <td className="py-4 px-2 text-center text-gray-600">
                    {(dim.score * dim.weight).toFixed(2)}
                  </td>
                  <td className="py-4 px-2 text-center">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      dim.score >= 4 ? 'bg-green-100 text-green-800' :
                      dim.score >= 3 ? 'bg-blue-100 text-blue-800' :
                      dim.score >= 2 ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {dim.score >= 4 ? 'Excelente' :
                       dim.score >= 3 ? 'Bom' :
                       dim.score >= 2 ? 'Regular' : 'Crítico'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* PDF-only sections - Diagnóstico Crítico e Roadmap */}
      {sanitizedAiAnalysis && (
        <>
          {/* Diagnóstico Crítico para PDF */}
          <div className="print:block hidden bg-white p-8 rounded-2xl shadow-xl border border-gray-100 mb-8">
            <h3 className="font-bold text-2xl mb-6 text-gray-900 flex items-center">
              📌 Diagnóstico Crítico
            </h3>
            
            {sanitizedAiAnalysis.critical_points.length > 0 ? (
              <div className="space-y-6">
                <div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-4">Áreas Críticas Identificadas</h4>
                  <div className="space-y-4">
                    {sanitizedAiAnalysis.critical_points.map((point, idx) => (
                      <div key={idx} className="border border-red-200 rounded-lg p-4 bg-red-50">
                                                 <div className="flex items-center justify-between mb-2">
                           <h5 className="font-semibold text-blue-900">{point.dimension}</h5>
                           <span className="px-2 py-1 bg-red-200 text-red-800 text-sm rounded font-bold">
                             Score: {point.score}/5
                           </span>
                         </div>
                        <p className="text-gray-800 text-sm mb-3"><strong>Diagnóstico:</strong> {point.diagnosis}</p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <h6 className="font-medium text-red-900 mb-2">Principais Riscos</h6>
                            <ul className="text-sm text-red-800 space-y-1">
                              {point.risks.map((risk, riskIdx) => (
                                <li key={riskIdx} className="flex items-start">
                                  <span className="text-red-600 mr-2">•</span>
                                  {risk}
                                </li>
                              ))}
                            </ul>
                          </div>
                          
                          <div>
                            <h6 className="font-medium text-gray-900 mb-2">Recomendações de Mitigação</h6>
                            <ul className="text-sm text-blue-800 space-y-1">
                              {point.mitigations.map((mitigation, mitIdx) => (
                                <li key={mitIdx} className="flex items-start">
                                  <span className="text-blue-600 mr-2">•</span>
                                  {mitigation}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8">
                  <h4 className="text-xl font-semibold text-gray-900 mb-4">Resumo dos Principais Riscos</h4>
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <ul className="space-y-2">
                      {sanitizedAiAnalysis.main_risks.map((risk, idx) => (
                        <li key={idx} className="flex items-start text-sm text-red-800">
                          <span className="text-red-600 mr-2 mt-1">⚠️</span>
                          {risk}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
                <h4 className="text-xl font-semibold text-green-900 mb-2">✅ Excelente Desempenho!</h4>
                <p className="text-green-800">
                  Todas as dimensões apresentam desempenho satisfatório (≥3). 
                  Continue focando na melhoria contínua e otimização dos processos.
                </p>
              </div>
            )}
          </div>

          {/* Roadmap Estratégico para PDF */}
          <div className="print:block hidden bg-white p-8 rounded-2xl shadow-xl border border-gray-100 mb-8">
            <h3 className="font-bold text-2xl mb-6 text-gray-900 flex items-center">
              🧭 Roadmap Estratégico
            </h3>
            
            <div className="space-y-6">
              {sanitizedAiAnalysis.roadmap.map((phase, idx) => (
                <div key={idx} className="border-2 border-gray-200 rounded-xl p-6">
                  <div className="flex items-center mb-4">
                    <div className="ml-3">
                      <h4 className="text-xl font-bold text-gray-900">{phase.phase}</h4>
                      <p className="text-gray-600 font-medium">{phase.timeframe}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                      <h5 className="font-semibold text-gray-900 mb-3">✅ Ações Estratégicas</h5>
                      <ul className="space-y-2">
                        {phase.actions.map((action, actionIdx) => (
                          <li key={actionIdx} className="flex items-start text-sm text-gray-700">
                            <span className="text-blue-600 mr-2 mt-1">•</span>
                            {action}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h5 className="font-semibold text-gray-900 mb-3">📊 KPIs de Acompanhamento</h5>
                      <ul className="space-y-2">
                        {phase.kpis.map((kpi, kpiIdx) => (
                          <li key={kpiIdx} className="flex items-start text-sm text-gray-700">
                            <span className="text-green-600 mr-2 mt-1">📈</span>
                            {kpi}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h4 className="text-lg font-semibold text-blue-900 mb-3">🎯 Top 3 Prioridades Estratégicas</h4>
              <ul className="space-y-2">
                {sanitizedAiAnalysis.strategic_priorities.map((priority, idx) => (
                  <li key={idx} className="flex items-start text-sm text-blue-800">
                    <span className="bg-blue-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold mr-3 mt-0.5">
                      {idx + 1}
                    </span>
                    {priority}
                  </li>
                ))}
              </ul>
            </div>

            {sanitizedAiAnalysis.executive_summary && (
              <div className="mt-8 bg-purple-50 border border-purple-200 rounded-lg p-6">
                <h4 className="text-lg font-semibold text-purple-900 mb-3">👔 Resumo Executivo</h4>
                <div className="text-gray-800 leading-relaxed">
                  {sanitizedAiAnalysis.executive_summary}
                </div>
              </div>
            )}
          </div>
        </>
      )}

      {/* Seção de Upsell - POC */}
      <UpsellSection companyInfo={companyInfo} />

      {/* Rodapé OnSet Tecnologia */}
      <footer className="text-center py-6 border-t border-gray-200">
        <p className="text-gray-600 text-sm">
          © 2025 OnSet Tecnologia. Todos os direitos reservados.
        </p>
      </footer>

      {/* Modal de Detalhes da Prática */}
      <PracticeLevelModal
        isOpen={selectedPracticeModal.isOpen}
        onClose={handleClosePracticeModal}
        practiceId={selectedPracticeModal.practiceId}
        practiceLevel={selectedPracticeModal.practiceLevel}
        practiceName={selectedPracticeModal.practiceName}
      />
    </div>
  );
};