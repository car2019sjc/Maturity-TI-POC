import React from 'react';
import { X, BookOpen, Target, CheckCircle } from 'lucide-react';
import { PracticeDetail } from '../data/practiceDetails';

interface PracticeDetailModalProps {
  practice: PracticeDetail | null;
  onClose: () => void;
}

// Função para formatar texto com dois pontos em negrito
const formatTextWithBoldColons = (text: string) => {
  // Regex para capturar texto antes dos dois pontos e colocar em negrito
  const formattedText = text.replace(/^([^:]+):/g, '<strong>$1:</strong>');
  return { __html: formattedText };
};

export const PracticeDetailModal: React.FC<PracticeDetailModalProps> = ({ practice, onClose }) => {
  if (!practice) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4 z-50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-[95vh] overflow-y-auto">
        <div className="sticky top-0 bg-white p-6 border-b border-gray-200 rounded-t-2xl shadow-sm">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-full mr-4">
                <BookOpen size={24} className="text-blue-600" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">{practice.name}</h3>
                <p className="text-sm text-gray-600 mt-1">Guia Completo de Maturidade</p>
              </div>
            </div>
            <button 
              onClick={onClose} 
              className="text-gray-500 hover:text-gray-800 p-2 hover:bg-gray-100 rounded-full transition-all duration-200"
            >
              <X size={24} />
            </button>
          </div>
        </div>
        
        <div className="p-6">
          {/* Descrição Geral */}
          <div className="mb-8">
            <div className="flex items-center mb-4">
              <Target size={20} className="text-blue-600 mr-2" />
              <h4 className="text-xl font-semibold text-gray-800">Descrição Geral</h4>
            </div>
            <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
              <p className="text-gray-700 leading-relaxed text-lg">{practice.description}</p>
            </div>
          </div>

          {/* Níveis de Maturidade */}
          <div className="mb-6">
            <h4 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
              <CheckCircle size={20} className="text-green-600 mr-2" />
              Níveis de Maturidade Detalhados
            </h4>
            <div className="space-y-6">
              {practice.levels.map((level, index) => (
                <div key={index} className="group">
                  <div className={`border-2 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-lg ${
                    index === 0 ? 'border-red-200 bg-red-50' :
                    index === 1 ? 'border-orange-200 bg-orange-50' :
                    index === 2 ? 'border-yellow-200 bg-yellow-50' :
                    index === 3 ? 'border-blue-200 bg-blue-50' : 'border-green-200 bg-green-50'
                  }`}>
                    {/* Cabeçalho do Nível */}
                    <div className={`p-4 ${
                      index === 0 ? 'bg-red-100 border-b border-red-200' :
                      index === 1 ? 'bg-orange-100 border-b border-orange-200' :
                      index === 2 ? 'bg-yellow-100 border-b border-yellow-200' :
                      index === 3 ? 'bg-blue-100 border-b border-blue-200' : 'bg-green-100 border-b border-green-200'
                    }`}>
                      <div className="flex items-center">
                        <div className={`w-12 h-12 rounded-full text-white text-lg font-bold flex items-center justify-center mr-4 shadow-md ${
                          index === 0 ? 'bg-red-500' :
                          index === 1 ? 'bg-orange-500' :
                          index === 2 ? 'bg-yellow-500' :
                          index === 3 ? 'bg-blue-500' : 'bg-green-500'
                        }`}>
                          {level.level}
                        </div>
                        <div className="flex-1">
                          <h5 className="text-lg font-bold text-gray-900">{level.name}</h5>
                          <p className="text-sm text-gray-600 mt-1">Nível {level.level} de 5</p>
                        </div>
                      </div>
                    </div>

                    {/* Conteúdo do Nível */}
                    <div className="p-6">
                      {/* Descrição */}
                      <div className="mb-6">
                        <h6 className="font-semibold text-gray-800 mb-3 flex items-center">
                          <div className="w-2 h-2 bg-gray-600 rounded-full mr-2"></div>
                          Descrição
                        </h6>
                        <p className="text-gray-700 leading-relaxed bg-white p-4 rounded-lg border border-gray-200">
                          {level.description}
                        </p>
                      </div>

                      {/* Características */}
                      <div>
                        <h6 className="font-semibold text-gray-800 mb-4 flex items-center">
                          <div className="w-2 h-2 bg-gray-600 rounded-full mr-2"></div>
                          Características Principais
                        </h6>
                        <div className="space-y-3">
                          {level.characteristics.map((characteristic, charIndex) => (
                            <div key={charIndex} className="flex items-start bg-white p-4 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors duration-200">
                              <div className={`w-2 h-2 rounded-full mr-3 mt-2 flex-shrink-0 ${
                                index === 0 ? 'bg-red-400' :
                                index === 1 ? 'bg-orange-400' :
                                index === 2 ? 'bg-yellow-400' :
                                index === 3 ? 'bg-blue-400' : 'bg-green-400'
                              }`}></div>
                              <div 
                                className="text-gray-700 leading-relaxed text-sm"
                                dangerouslySetInnerHTML={formatTextWithBoldColons(characteristic)}
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="p-6 bg-gray-50 border-t border-gray-200 rounded-b-2xl">
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-600">
              <p className="font-medium">💡 Dica: Use essas informações para avaliar com precisão o nível atual da sua organização</p>
            </div>
            <button 
              onClick={onClose} 
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-3 px-6 rounded-lg hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              Fechar Guia
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};