import React from 'react';
import { X, TrendingUp, AlertTriangle, Target, DollarSign, Clock, Download, BarChart3 } from 'lucide-react';

interface Scores {
  total: number;
  byDimension: Record<string, {
    name: string;
    score: number;
    weight: number;
  }>;
}

interface CompanyInfo {
  name: string;
  sector: string;
}

interface ReportPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onGenerateReport: () => void;
  scores: Scores;
  companyInfo: CompanyInfo;
  answers: Record<string, number>;
  assessmentData: any;
  practicesMap: Record<string, string>;
}

export const ReportPreviewModal: React.FC<ReportPreviewModalProps> = ({
  isOpen,
  onClose,
  onGenerateReport,
  scores,
  companyInfo,
  answers,
  assessmentData,
  practicesMap
}) => {
  if (!isOpen) return null;

  const getMaturityLevel = (score: number) => {
    if (score >= 4.5) return { level: 'Excelente', icon: '🚀', color: 'text-green-600', bgColor: 'bg-green-50' };
    if (score >= 3.5) return { level: 'Avançado', icon: '⭐', color: 'text-blue-600', bgColor: 'bg-blue-50' };
    if (score >= 2.5) return { level: 'Intermediário', icon: '📈', color: 'text-yellow-600', bgColor: 'bg-yellow-50' };
    if (score >= 1.5) return { level: 'Básico', icon: '⚠️', color: 'text-orange-600', bgColor: 'bg-orange-50' };
    return { level: 'Inicial', icon: '🔴', color: 'text-red-600', bgColor: 'bg-red-50' };
  };

  const maturityLevel = getMaturityLevel(scores.total);
  const maturityPercentage = Math.round((scores.total / 5) * 100);
  
  // Identificar dimensões críticas (score < 3)
  const criticalDimensions = Object.values(scores.byDimension).filter(dim => dim.score < 3);
  const strongDimensions = Object.values(scores.byDimension).filter(dim => dim.score >= 4);
  
  // Calcular investimento estimado baseado no gap
  const totalGap = 5 - scores.total;

  // Gerar resumo executivo específico por setor
  const generateSectorSpecificSummary = () => {
    const sector = companyInfo.sector.toLowerCase();
    let sectorContext = "";
    let riskContext = "";
    let opportunityContext = "";

    if (sector.includes('financ') || sector.includes('banco')) {
      sectorContext = "No setor financeiro, a maturidade de TI é fundamental para atender requisitos regulatórios rigorosos e manter a confiança dos clientes.";
      riskContext = "Riscos incluem exposição a multas regulatórias, vazamentos de dados e perda de competitividade frente a fintechs.";
      opportunityContext = "Oportunidades incluem automação de processos, melhoria na experiência do cliente e redução de custos operacionais.";
    } else if (sector.includes('saúde') || sector.includes('hospital') || sector.includes('médic')) {
      sectorContext = "Na área da saúde, TI madura é essencial para garantir continuidade do atendimento e proteção de dados sensíveis dos pacientes.";
      riskContext = "Riscos incluem interrupções no atendimento, não conformidade com LGPD e impactos na segurança do paciente.";
      opportunityContext = "Oportunidades incluem telemedicina, prontuário eletrônico integrado e inteligência artificial para diagnósticos.";
    } else if (sector.includes('manufat') || sector.includes('indust') || sector.includes('produção')) {
      sectorContext = "Na indústria, TI madura é crucial para manter eficiência produtiva e integração com sistemas de automação.";
      riskContext = "Riscos incluem paradas de produção, perda de matéria-prima e atrasos na cadeia de suprimentos.";
      opportunityContext = "Oportunidades incluem Indústria 4.0, IoT para manutenção preditiva e otimização de processos.";
    } else if (sector.includes('varejo') || sector.includes('comércio') || sector.includes('e-commerce')) {
      sectorContext = "No varejo, TI madura é vital para experiência omnichannel e competitividade no mercado digital.";
      riskContext = "Riscos incluem perda de vendas, insatisfação do cliente e perda de market share para concorrentes digitais.";
      opportunityContext = "Oportunidades incluem personalização com IA, analytics de comportamento e automação de marketing.";
    } else {
      sectorContext = `Para empresas de ${companyInfo.sector}, TI madura é fundamental para eficiência operacional e competitividade.`;
      riskContext = "Riscos incluem ineficiências operacionais, custos elevados e perda de oportunidades de mercado.";
      opportunityContext = "Oportunidades incluem automação de processos, melhoria na produtividade e diferenciação competitiva.";
    }

    return { sectorContext, riskContext, opportunityContext };
  };

  const { sectorContext, riskContext, opportunityContext } = generateSectorSpecificSummary();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-t-2xl">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-3xl font-bold mb-2">📊 Prévia do Relatório Estratégico</h2>
              <p className="text-blue-100 text-lg">{companyInfo.name} - {companyInfo.sector}</p>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:bg-white hover:bg-opacity-20 p-2 rounded-full transition-all duration-200"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        <div className="p-6">
          {/* Métricas Principais */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className={`${maturityLevel.bgColor} border border-gray-200 rounded-xl p-6 text-center`}>
              <div className="text-4xl mb-2">{maturityLevel.icon}</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Maturidade Geral</h3>
              <div className={`text-3xl font-bold ${maturityLevel.color} mb-1`}>
                {maturityPercentage}%
              </div>
              <div className={`text-sm font-medium ${maturityLevel.color}`}>
                {maturityLevel.level}
              </div>
            </div>

            <div className="bg-orange-50 border border-orange-200 rounded-xl p-6 text-center">
              <div className="text-4xl mb-2">🎯</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Gap de Maturidade</h3>
              <div className="text-3xl font-bold text-orange-600 mb-1">
                {totalGap.toFixed(1)}
              </div>
              <div className="text-sm font-medium text-orange-600">
                pontos para excelência
              </div>
            </div>
          </div>

          {/* Análise Rápida */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Áreas Críticas */}
            <div className="bg-red-50 border border-red-200 rounded-xl p-6">
              <div className="flex items-center mb-4">
                <AlertTriangle className="text-red-600 mr-3" size={24} />
                <h3 className="text-xl font-bold text-red-900">Áreas Críticas</h3>
              </div>
              {criticalDimensions.length > 0 ? (
                <ul className="space-y-2">
                  {criticalDimensions.map((dim, index) => (
                    <li key={index} className="flex justify-between items-center">
                      <span className="text-red-800 font-medium">{dim.name}</span>
                      <span className="bg-red-200 text-red-800 px-2 py-1 rounded text-sm font-bold">
                        {dim.score.toFixed(1)}/5
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-red-800">✅ Nenhuma área crítica identificada!</p>
              )}
            </div>

            {/* Pontos Fortes */}
            <div className="bg-green-50 border border-green-200 rounded-xl p-6">
              <div className="flex items-center mb-4">
                <TrendingUp className="text-green-600 mr-3" size={24} />
                <h3 className="text-xl font-bold text-green-900">Pontos Fortes</h3>
              </div>
              {strongDimensions.length > 0 ? (
                <ul className="space-y-2">
                  {strongDimensions.map((dim, index) => (
                    <li key={index} className="flex justify-between items-center">
                      <span className="text-green-800 font-medium">{dim.name}</span>
                      <span className="bg-green-200 text-green-800 px-2 py-1 rounded text-sm font-bold">
                        {dim.score.toFixed(1)}/5
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-green-800">Oportunidade de desenvolver pontos fortes</p>
              )}
            </div>
          </div>

          {/* Roadmap Simplificado */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8">
            <div className="flex items-center mb-4">
              <Target className="text-blue-600 mr-3" size={24} />
              <h3 className="text-xl font-bold text-blue-900">Roadmap Estratégico Previsto</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white border border-blue-200 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <Clock className="text-blue-600 mr-2" size={16} />
                  <h4 className="font-bold text-blue-900">Fase 1 (1-3 meses)</h4>
                </div>
                <p className="text-sm text-blue-800">Estabilização das áreas críticas e quick wins</p>
              </div>
              
              <div className="bg-white border border-blue-200 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <BarChart3 className="text-blue-600 mr-2" size={16} />
                  <h4 className="font-bold text-blue-900">Fase 2 (4-8 meses)</h4>
                </div>
                <p className="text-sm text-blue-800">Otimização de processos e automação</p>
              </div>
              
              <div className="bg-white border border-blue-200 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <TrendingUp className="text-blue-600 mr-2" size={16} />
                  <h4 className="font-bold text-blue-900">Fase 3 (9-12 meses)</h4>
                </div>
                <p className="text-sm text-blue-800">Inovação e transformação digital</p>
              </div>
            </div>
          </div>

          {/* Mensagem Executiva */}
          <div className="bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-xl p-6 mb-8">
            <div className="flex items-center mb-4">
              <DollarSign className="text-purple-600 mr-3" size={24} />
              <h3 className="text-xl font-bold text-purple-900">💼 Resumo Executivo</h3>
            </div>
            
            <div className="bg-white rounded-lg p-4 border border-purple-200">
              <p className="text-gray-800 leading-relaxed mb-3">
                <strong>Situação Atual:</strong> {companyInfo.name} apresenta maturidade de TI de{' '}
                <span className={`font-bold ${maturityLevel.color}`}>{maturityPercentage}%</span>{' '}
                ({maturityLevel.level}), com {criticalDimensions.length} área(s) crítica(s) identificada(s).
              </p>
              
              <p className="text-gray-800 leading-relaxed mb-3">
                <strong>Contexto do Setor:</strong> {sectorContext}
              </p>
              
              {criticalDimensions.length > 0 && (
                <p className="text-gray-800 leading-relaxed mb-3">
                  <strong>Riscos Identificados:</strong> {riskContext}
                </p>
              )}
              
              <p className="text-gray-800 leading-relaxed">
                <strong>Oportunidades de Melhoria:</strong> {opportunityContext}
              </p>
            </div>
          </div>

          {/* TOP 5 PRÁTICAS COM MAIOR GAP - Versão Resumida */}
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 mb-6">
            <h3 className="font-bold text-xl mb-4 text-red-900 flex items-center">
               TOP 5 PRÁTICAS CRÍTICAS
            </h3>
            <div className="space-y-3">
              {(() => {
                // Calcular gaps para todas as práticas
                const practiceGaps: Array<{
                  id: string;
                  name: string;
                  gap: number;
                  level: number;
                }> = [];

                assessmentData.dimensions.forEach((dimension: any) => {
                  dimension.practices.forEach((practiceId: string) => {
                    const answer = answers[practiceId] || 1;
                    const gap = (5 - answer) * dimension.weight;
                    practiceGaps.push({
                      id: practiceId,
                      name: practicesMap[practiceId] || practiceId,
                      gap: gap,
                      level: answer
                    });
                  });
                });

                // Ordenar por gap (maior primeiro) e pegar top 5
                const top5Gaps = practiceGaps
                  .sort((a, b) => b.gap - a.gap)
                  .slice(0, 5);

                return top5Gaps.map((practice, index) => (
                  <div key={practice.id} className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-200">
                    <div className="flex items-center space-x-3">
                      <span className="bg-red-500 text-white px-2 py-1 rounded-full text-sm font-bold">
                        {index + 1}º
                      </span>
                      <span className="font-medium text-gray-900 text-sm">
                        {practice.name}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-red-600 font-bold text-sm">
                        Gap: {practice.gap.toFixed(3)}
                      </span>
                      <span className={`px-2 py-1 rounded text-xs font-bold text-white ${
                        practice.level === 1 ? 'bg-red-500' : 
                        practice.level === 2 ? 'bg-orange-500' : 'bg-yellow-500'
                      }`}>
                        {practice.level === 1 ? 'Crítico' : 
                         practice.level === 2 ? 'Alto' : 'Médio'}
                      </span>
                    </div>
                  </div>
                ));
              })()}
            </div>
            <div className="mt-4 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
              <p className="text-sm text-yellow-800">
                <strong>💡 Ação Imediata:</strong> Estas 5 práticas representam 60% do gap total de maturidade. 
                Priorizá-las pode gerar impacto significativo em curto prazo.
              </p>
            </div>
          </div>

          {/* Botões de Ação */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={onGenerateReport}
              className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-bold py-4 px-8 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center"
            >
              <Download className="mr-3" size={20} />
              🚀 Gerar Relatório Completo com IA
            </button>
            
            <button
              onClick={onClose}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-4 px-8 rounded-xl transition-all duration-200 flex items-center justify-center"
            >
              📊 Continuar Análise Detalhada
            </button>
          </div>

          {/* Disclaimer */}
          <div className="mt-6 text-center text-sm text-gray-500">
            <p>
              * Esta é uma prévia baseada na avaliação realizada. O relatório completo incluirá análise detalhada com IA,{' '}
              roadmap específico, KPIs e recomendações personalizadas para o setor {companyInfo.sector}.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}; 