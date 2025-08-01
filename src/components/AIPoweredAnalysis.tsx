import React, { useState } from 'react';
import { BarChart3, AlertTriangle, Target, Users, Lightbulb, CheckCircle, Shield } from 'lucide-react';
import { AIAnalysis, Scores } from '../utils/calculations';

interface AIPoweredAnalysisProps {
  analysis: AIAnalysis;
  isLoading: boolean;
  scores?: Scores;
}

export const AIPoweredAnalysis: React.FC<AIPoweredAnalysisProps> = ({ analysis, isLoading, scores }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'critical' | 'roadmap' | 'executive'>('overview');

  if (isLoading) {
    return (
      <div className="bg-white rounded-xl p-8 shadow-lg">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-6"></div>
          <div className="space-y-4">
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        </div>
      </div>
    );
  }

  const tabs = [
    { key: 'overview', label: 'Visão Geral', icon: BarChart3 },
    { key: 'critical', label: 'Análise Detalhada', icon: AlertTriangle },
    { key: 'roadmap', label: 'Roadmap', icon: Target },
    { key: 'executive', label: 'Resumo Executivo', icon: Users },
  ];

  return (
    <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 shadow-xl border border-gray-200">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center">
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-3 rounded-xl shadow-lg mr-4">
            <Lightbulb className="text-white" size={24} />
          </div>
          🤖 Análise Personalizada por IA
        </h2>
        <p className="text-lg text-gray-600">
          Insights inteligentes baseados na sua avaliação de maturidade
        </p>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-4 mb-8 p-2 bg-gray-100 rounded-xl">
        {tabs.map(({ key, label, icon: Icon }) => (
        <button
            key={key}
            onClick={() => setActiveTab(key as any)}
            className={`flex items-center space-x-2 px-4 py-3 rounded-lg font-semibold transition-all duration-200 ${
              activeTab === key
                ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg'
                : 'text-gray-600 hover:bg-white hover:shadow-md'
            }`}
          >
            <Icon size={18} />
            <span>{label}</span>
        </button>
        ))}
      </div>

      {/* Content */}
      <div className="bg-white rounded-xl p-6 shadow-lg">
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <BarChart3 className="mr-3 text-blue-600" size={24} />
                🔍 Visão Geral da Maturidade
              </h3>
              
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Informações Gerais</h4>
                  <div className="space-y-3 text-base">
                      <div><span className="font-medium">Organização:</span> {analysis.organization}</div>
                      <div><span className="font-medium">Segmento:</span> {analysis.segment}</div>
                      <div><span className="font-medium">Score de Maturidade:</span> 
                      <span className="ml-2 px-3 py-1 bg-blue-100 text-blue-800 rounded font-bold">
                          {analysis.maturity_score}/5
                        </span>
                      </div>
                      <div><span className="font-medium">Nível:</span> {analysis.maturity_level}</div>
            </div>
          </div>
                  
                  <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Destaques por Dimensão</h4>
                  <div className="space-y-4">
                    {analysis.dimension_highlights?.fortes?.length > 0 && (
                        <div>
                        <span className="text-base font-medium text-green-700">✅ Dimensões Fortes:</span>
                        <div className="flex flex-wrap gap-2 mt-2">
                            {analysis.dimension_highlights.fortes.map((dim, idx) => (
                            <span key={idx} className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded">
                                {dim}
                              </span>
                            ))}
                          </div>
        </div>
      )}

                    {analysis.dimension_highlights?.criticas?.length > 0 && (
                        <div>
                        <span className="text-base font-medium text-red-700">⚠️ Dimensões Críticas:</span>
                        <div className="flex flex-wrap gap-2 mt-2">
                            {analysis.dimension_highlights.criticas.map((dim, idx) => (
                            <span key={idx} className="px-3 py-1 bg-red-100 text-red-800 text-sm rounded">
                                {dim}
                              </span>
                            ))}
            </div>
          </div>
                      )}
            </div>
                  </div>
                </div>
            </div>

            {/* Pontuação Média por Dimensão */}
            {scores && (
              <div className="mt-8 bg-white rounded-lg p-6 border border-blue-200">
                <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <BarChart3 className="mr-2 text-blue-600" size={20} />
                  📊 Pontuação Média por Dimensão
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {Object.values(scores.byDimension).map((dimension, idx) => {
                    const percentage = ((dimension.score / 5) * 100).toFixed(1);
                    const getScoreColor = (score: number) => {
                      if (score >= 4) return 'text-green-600 bg-green-50 border-green-200';
                      if (score >= 3) return 'text-blue-600 bg-blue-50 border-blue-200';
                      if (score >= 2) return 'text-yellow-600 bg-yellow-50 border-yellow-200';
                      return 'text-red-600 bg-red-50 border-red-200';
                    };
                    
                    const getProgressColor = (score: number) => {
                      if (score >= 4) return 'from-green-500 to-green-600';
                      if (score >= 3) return 'from-blue-500 to-blue-600';
                      if (score >= 2) return 'from-yellow-500 to-yellow-600';
                      return 'from-red-500 to-red-600';
                    };

                    return (
                      <div key={idx} className={`border-2 rounded-xl p-4 ${getScoreColor(dimension.score)}`}>
                        <div className="flex items-center justify-between mb-2">
                          <h5 className="font-semibold text-sm">{dimension.name.replace('Dimensão ', '')}</h5>
                          <span className="text-lg font-bold">{percentage}%</span>
                        </div>
                        <div className="mb-2">
                          <div className="flex justify-between text-xs mb-1">
                            <span>Score: {dimension.score.toFixed(2)}/5</span>
                            <span>Peso: {(dimension.weight * 100).toFixed(1)}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full bg-gradient-to-r ${getProgressColor(dimension.score)}`}
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                        </div>
                        <div className="text-xs opacity-75">
                          Contribuição: {(dimension.score * dimension.weight).toFixed(3)}
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
            )}
          </div>
        )}

        {/* Critical Analysis Tab */}
        {activeTab === 'critical' && (
          <div className="space-y-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <AlertTriangle className="mr-3 text-red-600" size={24} />
                Análise Detalhada
              </h3>
            
              <div className="bg-gray-50 rounded-lg p-6">
              <div className="bg-gradient-to-br from-white to-blue-50 rounded-xl p-8 border-2 border-blue-200 shadow-lg">
                <div className="mb-6">
                  <h4 className="text-2xl font-bold text-gray-900 mb-2 flex items-center">
                    <div className="bg-gradient-to-r from-yellow-400 to-orange-500 p-2 rounded-lg shadow-md mr-4">
                      <Lightbulb className="text-white" size={20} />
                    </div>
                    Análise Estratégica Personalizada
                    <span className="ml-3 px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                      IA Powered
                    </span>
                  </h4>
                  <p className="text-gray-600 text-base">
                    Insights específicos para {analysis.segment || 'sua empresa'} baseados na sua avaliação
                  </p>
                  </div>
                
                {analysis.analysis && (
                  <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                    <div className="prose prose-gray max-w-none">
                      <div className="text-gray-700 leading-relaxed text-justify whitespace-pre-wrap">
                        {analysis.analysis}
                  </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Roadmap Tab */}
        {activeTab === 'roadmap' && (
          <div className="space-y-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <Target className="mr-3 text-green-600" size={24} />
                🧭 Roadmap Estratégico
              </h3>
              
              <div className="space-y-6">
              {analysis.roadmap && analysis.roadmap.map((phase, idx) => (
                <div key={idx} className="bg-gradient-to-r from-gray-50 to-blue-50 border-2 border-blue-200 rounded-xl p-6">
            <div className="flex items-center mb-4">
                    <span className="text-2xl mr-3">📅</span>
                    <div>
                        <h4 className="text-xl font-bold text-gray-900">{phase.phase}</h4>
                      <p className="text-base text-gray-600 font-medium">{phase.timeframe}</p>
                    </div>
                    </div>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div>
                      <h5 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                        <CheckCircle size={18} className="mr-2 text-blue-600" />
                          Ações Estratégicas
                        </h5>
                      <ul className="space-y-3">
                          {phase.actions.map((action, actionIdx) => (
                          <li key={actionIdx} className="flex items-start text-base text-gray-700">
                            <span className="text-blue-600 mr-3 mt-1">•</span>
                              {action}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                      <h5 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                        <BarChart3 size={18} className="mr-2 text-green-600" />
                          KPIs de Acompanhamento
                        </h5>
                      <ul className="space-y-3">
                          {phase.kpis.map((kpi, kpiIdx) => (
                          <li key={kpiIdx} className="flex items-start text-base text-gray-700">
                            <span className="text-green-600 mr-3 mt-1">📊</span>
                              {kpi}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* Executive Summary Tab */}
        {activeTab === 'executive' && (
          <div className="space-y-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <Users className="mr-3 text-purple-600" size={24} />
                👔 Resumo Executivo
              </h3>
              
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-lg p-6">
                <h4 className="text-xl font-semibold text-purple-900 mb-4 flex items-center">
                  <Lightbulb className="mr-2" size={22} />
                    Mensagem para o CIO/CTO
                  </h4>
                <div className="bg-white rounded-lg p-6 border border-purple-100 shadow-sm">
                  <div className="prose prose-gray max-w-none">
                    {analysis.executive_summary ? (
                      <div className="text-gray-800 leading-relaxed text-base whitespace-pre-wrap">
                    {analysis.executive_summary}
                      </div>
                    ) : (
                      <p className="text-gray-600 italic">
                        Resumo executivo não disponível no momento.
                      </p>
                    )}
                  </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                  <h4 className="text-xl font-semibold text-blue-900 mb-4 flex items-center">
                    <Target className="mr-2" size={22} />
                      Top 3 Prioridades Estratégicas
                    </h4>
                  <ul className="space-y-4">
                    {analysis.strategic_priorities && analysis.strategic_priorities.slice(0, 3).map((priority, idx) => (
                      <li key={idx} className="flex items-start text-base text-blue-800">
                        <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-4 mt-0.5">
                            {idx + 1}
                          </span>
                          {priority}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                  <h4 className="text-xl font-semibold text-red-900 mb-4 flex items-center">
                    <Shield className="mr-2" size={22} />
                      Principais Riscos Operacionais
                    </h4>
                  <ul className="space-y-4">
                    {analysis.main_risks && analysis.main_risks.slice(0, 3).map((risk, idx) => (
                      <li key={idx} className="flex items-start text-base text-red-800">
                        <span className="text-red-600 mr-3 mt-1">⚠️</span>
                          {risk}
                        </li>
                      ))}
                    </ul>
            </div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Seção de Upsell - Análise Completa */}
      <div className="mt-8 bg-gradient-to-r from-orange-50 via-red-50 to-pink-50 border-2 border-orange-300 rounded-xl p-6">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full mb-4">
            <Lightbulb className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-3">
            🚀 Esta é Apenas uma Amostra do Poder da IA!
          </h3>
          <div className="bg-white rounded-xl p-6 mb-6 border-2 border-orange-200 shadow-lg">
            <div className="text-center mb-4">
              <span className="bg-orange-500 text-white px-4 py-2 rounded-full text-sm font-bold">
                AMOSTRA DEMO
              </span>
            </div>
            <p className="text-lg text-gray-700 mb-3 text-center">
              <span className="font-bold text-orange-600">Você acabou de ver a análise de apenas 6 práticas</span> das <span className="font-bold text-blue-600">34 práticas completas</span> do nosso framework ITIL v4.
            </p>
            <p className="text-base text-gray-600 text-center leading-relaxed">
              Imagine o valor de uma análise completa com <strong>IA avançada</strong>, incluindo correlações entre todas as práticas, 
              benchmarks detalhados do seu setor, e um <strong>roadmap estratégico personalizado</strong> para sua realidade específica.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border-2 border-blue-200 shadow-lg">
              <div className="flex items-center mb-4">
                <div className="bg-blue-500 rounded-lg p-2 mr-3">
                  <BarChart3 className="w-5 h-5 text-white" />
                </div>
                <h4 className="font-bold text-blue-900 text-lg">📊 Análise POC (Atual)</h4>
              </div>
              <ul className="space-y-3">
                <li className="flex items-center text-sm text-blue-800">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                  <span><strong>6 práticas essenciais</strong></span>
                </li>
                <li className="flex items-center text-sm text-blue-800">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                  <span>Análise básica com IA</span>
                </li>
                <li className="flex items-center text-sm text-blue-800">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                  <span>Roadmap genérico</span>
                </li>
                <li className="flex items-center text-sm text-red-600">
                  <AlertTriangle className="w-4 h-4 text-red-500 mr-2 flex-shrink-0" />
                  <span>Correlações limitadas</span>
                </li>
                <li className="flex items-center text-sm text-red-600">
                  <AlertTriangle className="w-4 h-4 text-red-500 mr-2 flex-shrink-0" />
                  <span>Benchmarks básicos</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border-2 border-green-200 shadow-lg relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-green-500 text-white px-3 py-1 rounded-bl-lg text-xs font-bold">
                COMPLETA
              </div>
              <div className="flex items-center mb-4">
                <div className="bg-green-500 rounded-lg p-2 mr-3">
                  <Target className="w-5 h-5 text-white" />
                </div>
                <h4 className="font-bold text-green-900 text-lg">🎯 Análise Completa</h4>
              </div>
              <ul className="space-y-3">
                <li className="flex items-center text-sm text-green-800">
                  <CheckCircle className="w-4 h-4 text-green-600 mr-2 flex-shrink-0" />
                  <span><strong>34 práticas</strong> de ITIL v4</span>
                </li>
                <li className="flex items-center text-sm text-green-800">
                  <CheckCircle className="w-4 h-4 text-green-600 mr-2 flex-shrink-0" />
                  <span><strong>IA avançada</strong> multi-agente</span>
                </li>
                <li className="flex items-center text-sm text-green-800">
                  <CheckCircle className="w-4 h-4 text-green-600 mr-2 flex-shrink-0" />
                  <span><strong>Roadmap personalizado</strong> 3 fases</span>
                </li>
                <li className="flex items-center text-sm text-green-800">
                  <CheckCircle className="w-4 h-4 text-green-600 mr-2 flex-shrink-0" />
                  <span><strong>Correlações completas</strong></span>
                </li>
                <li className="flex items-center text-sm text-green-800">
                  <CheckCircle className="w-4 h-4 text-green-600 mr-2 flex-shrink-0" />
                  <span><strong>Benchmarks setoriais</strong></span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-yellow-100 to-orange-100 border-2 border-yellow-400 rounded-xl p-6 mb-6 shadow-lg">
            <div className="flex items-center justify-center mb-3">
              <div className="bg-yellow-500 rounded-full p-2 mr-3">
                <Lightbulb className="w-5 h-5 text-white" />
              </div>
              <span className="bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                INSIGHT EXCLUSIVO
              </span>
            </div>
            <p className="text-yellow-900 font-semibold text-center text-lg">
              💡 Empresas que implementam avaliações completas de maturidade 
              alcançam ROI médio de <span className="text-2xl font-bold text-orange-600">300-500%</span> em 18 meses 
              através de otimizações identificadas pela IA.
            </p>
            <p className="text-yellow-800 text-center text-sm mt-2">
              *Baseado em estudos de caso de mais de 200 organizações que implementaram frameworks completos de ITIL v4
            </p>
          </div>
          
          <p className="text-lg font-semibold text-gray-900 mb-4">
            Pronto para descobrir o potencial completo da sua TI?
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={() => window.open('mailto:comercial@timedeai.com?subject=Interesse em Avaliação Completa de Maturidade de TI&body=Olá, acabei de completar o POC e gostaria de saber mais sobre a avaliação completa com todas as 34 práticas de ITIL v4.', '_blank')}
              className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:from-blue-600 hover:to-indigo-700 transition-all duration-200 shadow-xl hover:shadow-2xl transform hover:-translate-y-2 flex items-center"
            >
              <div className="bg-white bg-opacity-20 rounded-full p-2 mr-3">
                📧
              </div>
              Solicitar Avaliação Completa
            </button>
            
            <button
              onClick={() => window.open('https://calendly.com/timedeai/demo-avaliacao-ti', '_blank')}
              className="bg-white text-blue-600 px-8 py-4 rounded-xl font-bold text-lg border-3 border-blue-500 hover:bg-blue-50 transition-all duration-200 shadow-xl hover:shadow-2xl transform hover:-translate-y-2 flex items-center"
            >
              <div className="bg-blue-100 rounded-full p-2 mr-3">
                📅
              </div>
              Agendar Demonstração
            </button>
          </div>
          
          <div className="mt-4 text-center">
            <p className="text-gray-600 text-sm">
              📞 <strong>Ou ligue diretamente:</strong> 
              <a href="tel:+5511999999999" className="text-blue-600 hover:text-blue-800 font-semibold ml-2">
                (11) 99999-9999
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
