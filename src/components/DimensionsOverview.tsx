import React, { useState } from 'react';
import { ArrowRight, ArrowLeft, BookOpen, Target, Users, Shield, TrendingUp, ChevronDown, ChevronUp } from 'lucide-react';
import { assessmentData } from '../data/assessmentData';
import { practiceDetails } from '../data/practiceDetails';

interface DimensionsOverviewProps {
  companyInfo: { name: string; sector: string };
  onNavigateToWelcome: () => void;
  onStartAssessment: () => void;
}

const getDimensionIcon = (dimensionId: string) => {
  switch (dimensionId) {
    case 'estrategica':
      return Target;
    case 'operacional':
      return BookOpen;
    case 'governanca':
      return Shield;
    case 'capacidade':
      return Users;
    case 'melhoria':
      return TrendingUp;
    default:
      return BookOpen;
  }
};

const getDimensionColor = (dimensionId: string) => {
  switch (dimensionId) {
    case 'estrategica':
      return {
        bg: 'from-blue-500 to-indigo-600',
        card: 'from-blue-50 to-indigo-50',
        border: 'border-blue-200',
        icon: 'bg-blue-600',
        text: 'text-blue-900'
      };
    case 'operacional':
      return {
        bg: 'from-green-500 to-emerald-600',
        card: 'from-green-50 to-emerald-50',
        border: 'border-green-200',
        icon: 'bg-green-600',
        text: 'text-green-900'
      };
    case 'governanca':
      return {
        bg: 'from-purple-500 to-violet-600',
        card: 'from-purple-50 to-violet-50',
        border: 'border-purple-200',
        icon: 'bg-purple-600',
        text: 'text-purple-900'
      };
    case 'capacidade':
      return {
        bg: 'from-orange-500 to-red-600',
        card: 'from-orange-50 to-red-50',
        border: 'border-orange-200',
        icon: 'bg-orange-600',
        text: 'text-orange-900'
      };
    case 'melhoria':
      return {
        bg: 'from-pink-500 to-rose-600',
        card: 'from-pink-50 to-rose-50',
        border: 'border-pink-200',
        icon: 'bg-pink-600',
        text: 'text-pink-900'
      };
    default:
      return {
        bg: 'from-gray-500 to-gray-600',
        card: 'from-gray-50 to-gray-50',
        border: 'border-gray-200',
        icon: 'bg-gray-600',
        text: 'text-gray-900'
      };
  }
};

export const DimensionsOverview: React.FC<DimensionsOverviewProps> = ({
  companyInfo,
  onNavigateToWelcome,
  onStartAssessment
}) => {
  const [expandedDimension, setExpandedDimension] = useState<string | null>(null);
  const totalPractices = assessmentData.dimensions.reduce((acc, dim) => acc + dim.practices.length, 0);

  const toggleDimension = (dimensionId: string) => {
    setExpandedDimension(expandedDimension === dimensionId ? null : dimensionId);
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full mb-6">
          <span className="text-3xl font-bold text-white">IT</span>
        </div>
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
          Visão Geral da Avaliação
        </h1>
        <p className="text-xl text-gray-600 mb-2">
          {companyInfo.name} - {companyInfo.sector}
        </p>
        <p className="text-lg text-gray-500">
          Conheça as {assessmentData.dimensions.length} dimensões e {totalPractices} práticas que serão avaliadas
        </p>
      </div>

      {/* Resumo Estatístico */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-100">
          <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
            <span className="text-white font-bold text-lg">{assessmentData.dimensions.length}</span>
          </div>
          <h3 className="font-semibold text-gray-900 mb-2">Dimensões</h3>
          <p className="text-gray-600 text-sm">Áreas principais de avaliação</p>
        </div>
        
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl border border-green-100">
          <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mb-4">
            <span className="text-white font-bold text-lg">{totalPractices}</span>
          </div>
          <h3 className="font-semibold text-gray-900 mb-2">{totalPractices} Práticas</h3>
          <p className="text-gray-600 text-sm">Práticas baseadas em ITIL v4</p>
        </div>
        
        <div className="bg-gradient-to-br from-purple-50 to-violet-50 p-6 rounded-xl border border-purple-100">
          <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mb-4">
            <span className="text-white font-bold text-lg">5</span>
          </div>
          <h3 className="font-semibold text-gray-900 mb-2">Níveis</h3>
          <p className="text-gray-600 text-sm">Escala de maturidade por prática</p>
        </div>
        
        <div className="bg-gradient-to-br from-orange-50 to-red-50 p-6 rounded-xl border border-orange-100">
          <div className="w-12 h-12 bg-orange-600 rounded-lg flex items-center justify-center mb-4">
            <span className="text-white font-bold">AI</span>
          </div>
          <h3 className="font-semibold text-gray-900 mb-2">Análise IA</h3>
          <p className="text-gray-600 text-sm">Insights personalizados</p>
        </div>
      </div>

      {/* Dimensões em Accordion */}
      <div className="space-y-4 mb-12">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
          Dimensões da Avaliação
        </h2>
        
        {assessmentData.dimensions.map((dimension, index) => {
          const Icon = getDimensionIcon(dimension.id);
          const colors = getDimensionColor(dimension.id);
          const isExpanded = expandedDimension === dimension.id;
          
          return (
            <div key={dimension.id} className={`bg-gradient-to-r ${colors.card} border-2 ${colors.border} rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl`}>
              {/* Header da Dimensão - Clicável */}
              <button
                onClick={() => toggleDimension(dimension.id)}
                className="w-full p-6 flex items-center justify-between hover:bg-white hover:bg-opacity-50 transition-colors duration-200"
              >
                <div className="flex items-center">
                  <div className={`w-16 h-16 ${colors.icon} rounded-xl flex items-center justify-center mr-6 shadow-lg`}>
                    <Icon size={32} className="text-white" />
                  </div>
                  <div className="text-left">
                    <h3 className={`text-2xl font-bold ${colors.text} mb-2`}>{dimension.name}</h3>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <span className="font-medium">Peso: {Math.round(dimension.weight * 100)}%</span>
                      <span>•</span>
                      <span>{dimension.practices.length} práticas</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="text-right mr-4">
                    <div className={`text-3xl font-bold ${colors.text}`}>{Math.round(dimension.weight * 100)}%</div>
                    <div className="text-sm text-gray-500">do total</div>
                  </div>
                  {isExpanded ? (
                    <ChevronUp size={24} className={colors.text} />
                  ) : (
                    <ChevronDown size={24} className={colors.text} />
                  )}
                </div>
              </button>

              {/* Conteúdo Expansível */}
              {isExpanded && (
                <div className="px-6 pb-6 bg-white bg-opacity-50">
                  <div className="border-t border-gray-200 pt-6">
                    <p className={`${colors.text} leading-relaxed mb-6 text-lg font-medium`}>
                      {dimension.description}
                    </p>

                    {/* Lista de Práticas */}
                    <div>
                      <h4 className={`font-semibold ${colors.text} mb-4 flex items-center text-lg`}>
                        <div className={`w-3 h-3 ${colors.icon} rounded-full mr-3`}></div>
                        Práticas Avaliadas ({dimension.practices.length})
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                        {dimension.practices.map((practiceId, practiceIndex) => (
                          <div key={practiceId} className="bg-white p-4 rounded-xl border border-gray-200 hover:border-gray-300 transition-all duration-200 hover:shadow-md">
                            <div className="flex items-center">
                              <div className={`w-8 h-8 bg-gradient-to-r ${colors.bg} rounded-full flex items-center justify-center mr-3 flex-shrink-0 shadow-sm`}>
                                <span className="text-white font-bold text-sm">{practiceIndex + 1}</span>
                              </div>
                              <div className="flex-1 min-w-0">
                                <h5 className="font-medium text-gray-900 text-sm leading-tight">
                                  {practiceDetails[practiceId]?.name || 'Prática não encontrada'}
                                </h5>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Informações Importantes */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-2xl p-8 mb-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">
          Como Funciona a Avaliação
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">📊 Escala de Avaliação</h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-center">
                <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white font-bold text-xs mr-3">1</div>
                <span className="text-gray-700">Inicial/Caótico - Processos inexistentes</span>
              </div>
              <div className="flex items-center">
                <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-xs mr-3">2</div>
                <span className="text-gray-700">Reativo/Gerenciado - Processos básicos</span>
              </div>
              <div className="flex items-center">
                <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center text-white font-bold text-xs mr-3">3</div>
                <span className="text-gray-700">Proativo/Definido - Processos padronizados</span>
              </div>
              <div className="flex items-center">
                <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-xs mr-3">4</div>
                <span className="text-gray-700">Gerenciado/Mensurável - Baseado em dados</span>
              </div>
              <div className="flex items-center">
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-xs mr-3">5</div>
                <span className="text-gray-700">Otimizado/Estratégico - Melhoria contínua</span>
              </div>
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">⏱️ Tempo Estimado</h4>
            <p className="text-gray-700 text-sm mb-4">
              A avaliação completa leva aproximadamente <strong>15-20 minutos</strong>. 
              Você pode pausar e retomar a qualquer momento.
            </p>
            <h4 className="font-semibold text-gray-900 mb-3">💡 Dicas Importantes</h4>
            <ul className="text-gray-700 text-sm space-y-1">
              <li>• Clique nas dimensões acima para conhecer suas práticas</li>
              <li>• Use os botões de ajuda durante a avaliação</li>
              <li>• Seja honesto na avaliação para resultados precisos</li>
              <li>• Considere a situação atual, não a desejada</li>
              <li>• A análise com IA será gerada automaticamente</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Navegação */}
      <div className="flex justify-between items-center p-6 bg-white rounded-xl shadow-md mb-8">
        <button 
          onClick={onNavigateToWelcome} 
          className="bg-gray-200 text-gray-800 font-semibold py-3 px-6 rounded-lg hover:bg-gray-300 transition-all duration-200 flex items-center"
        >
          <ArrowLeft size={18} className="mr-2" />
          Voltar
        </button>
        
        <div className="text-center">
          <p className="text-gray-600 mb-4">
            Pronto para começar a avaliação de <strong>{companyInfo.name}</strong>?
          </p>
          <button 
            onClick={onStartAssessment}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-4 px-8 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center"
          >
            Iniciar Avaliação
            <ArrowRight size={20} className="ml-2" />
          </button>
        </div>
      </div>

      {/* Rodapé OnSet Tecnologia */}
      <footer className="text-center py-6 border-t border-gray-200">
        <p className="text-gray-600 text-sm">
          © 2025 OnSet Tecnologia. Todos os direitos reservados.
        </p>
      </footer>
    </div>
  );
};