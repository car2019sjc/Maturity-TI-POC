import React from 'react';
import { X, Info, AlertTriangle } from 'lucide-react';
import { practiceDetails } from '../data/practiceDetails';

interface PracticeLevelModalProps {
  isOpen: boolean;
  onClose: () => void;
  practiceId: string;
  practiceLevel: number;
  practiceName: string;
}

export const PracticeLevelModal: React.FC<PracticeLevelModalProps> = ({
  isOpen,
  onClose,
  practiceId,
  practiceLevel,
  practiceName
}) => {
  if (!isOpen) return null;

  // Debug logging
  console.log('PracticeLevelModal - Debug Info:', {
    practiceId,
    practiceLevel,
    practiceName,
    practiceExists: !!practiceDetails[practiceId],
    availablePractices: Object.keys(practiceDetails)
  });

  // Verificação de segurança
  if (!practiceId || !practiceName) {
    console.error('PracticeLevelModal - Dados inválidos:', { practiceId, practiceName });
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
          <div className="text-center">
            <h2 className="text-xl font-bold text-red-600 mb-4">⚠️ Erro</h2>
            <p className="text-gray-700 mb-4">Dados da prática inválidos ou não encontrados.</p>
            <button
              onClick={onClose}
              className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Fechar
            </button>
          </div>
        </div>
      </div>
    );
  }

  const practice = practiceDetails[practiceId];
  
  // Verificação se a prática existe
  if (!practice) {
    console.error('PracticeLevelModal - Prática não encontrada:', practiceId);
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
          <div className="text-center">
            <h2 className="text-xl font-bold text-red-600 mb-4">⚠️ Prática Não Encontrada</h2>
            <p className="text-gray-700 mb-2">A prática "{practiceName}" (ID: {practiceId}) não foi encontrada.</p>
            <p className="text-sm text-gray-500 mb-4">Por favor, reporte este erro ao administrador.</p>
            <button
              onClick={onClose}
              className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Fechar
            </button>
          </div>
        </div>
      </div>
    );
  }

  const levelInfo = practice.levels?.find(level => level.level === practiceLevel);

  // Verificação se o nível existe
  if (!levelInfo) {
    console.error('PracticeLevelModal - Nível não encontrado:', { practiceId, practiceLevel, availableLevels: practice.levels?.map(l => l.level) });
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
          <div className="text-center">
            <h2 className="text-xl font-bold text-red-600 mb-4">⚠️ Nível Não Encontrado</h2>
            <p className="text-gray-700 mb-2">O nível {practiceLevel} para a prática "{practiceName}" não foi encontrado.</p>
            <p className="text-sm text-gray-500 mb-4">Níveis disponíveis: {practice.levels?.map(l => l.level).join(', ') || 'Nenhum'}</p>
            <button
              onClick={onClose}
              className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Fechar
            </button>
          </div>
        </div>
      </div>
    );
  }

  const getLevelColor = (level: number) => {
    switch (level) {
      case 1: return 'border-red-500 bg-red-50';
      case 2: return 'border-orange-500 bg-orange-50';
      case 3: return 'border-yellow-500 bg-yellow-50';
      case 4: return 'border-blue-500 bg-blue-50';
      case 5: return 'border-green-500 bg-green-50';
      default: return 'border-gray-500 bg-gray-50';
    }
  };

  const getLevelIcon = (level: number) => {
    if (level <= 2) return <AlertTriangle className="text-red-600" size={24} />;
    return <Info className="text-blue-600" size={24} />;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {getLevelIcon(practiceLevel)}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-1">{practiceName}</h2>
                <p className="text-lg text-gray-600">Nível {practiceLevel} - {levelInfo.name}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="text-gray-600" size={24} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-8">
          {/* Nível Selecionado */}
          <div className={`border-2 rounded-xl p-6 ${getLevelColor(practiceLevel)}`}>
            <div className="flex items-center space-x-4 mb-6">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-xl ${
                practiceLevel <= 2 ? 'bg-red-500' : 
                practiceLevel === 3 ? 'bg-yellow-500' :
                practiceLevel === 4 ? 'bg-blue-500' : 'bg-green-500'
              }`}>
                {practiceLevel}
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">Nível Atual Selecionado</h3>
                <p className="text-gray-700 font-semibold text-lg">{levelInfo.name}</p>
              </div>
            </div>
            
            <div className="mb-6">
              <h4 className="font-semibold text-gray-900 mb-3 text-base">📝 Descrição do Nível:</h4>
              <p className="text-gray-800 leading-relaxed text-sm">{levelInfo.description}</p>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-4 text-base">✨ Características Identificadas:</h4>
              <ul className="space-y-3">
                {levelInfo.characteristics.map((characteristic, idx) => (
                  <li key={idx} className="flex items-start space-x-3">
                    <span className="text-blue-600 mt-1 font-bold">•</span>
                    <span className="text-gray-800 text-sm leading-relaxed flex-1">{characteristic}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Por que está com gap alto */}
          <div className="bg-gradient-to-r from-red-50 to-orange-50 border-2 border-red-200 rounded-xl p-6">
            <h4 className="font-bold text-red-900 mb-4 flex items-center text-base">
              <AlertTriangle className="mr-2 text-red-600" size={20} />
              🎯 Por que esta prática tem gap alto?
            </h4>
            <div className="space-y-4 text-sm text-red-800">
              <div>
                <p className="mb-2">
                  <strong>Nível Atual:</strong> {practiceLevel}/5 - Há espaço significativo para evolução
                </p>
              </div>
              
              <div>
                <p className="mb-3">
                  <strong>Impacto no Negócio:</strong> Práticas com baixa maturidade podem gerar:
                </p>
                <ul className="ml-6 space-y-2">
                  {practiceLevel <= 2 && (
                    <>
                      <li className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>Riscos operacionais elevados</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>Ineficiências nos processos</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>Falta de previsibilidade</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>Dependência de pessoas específicas</span>
                      </li>
                    </>
                  )}
                  {practiceLevel === 3 && (
                    <>
                      <li className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>Oportunidades de otimização não exploradas</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>Processos ainda não totalmente integrados</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>Potencial de automação não realizado</span>
                      </li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          </div>

          {/* Próximos passos */}
          {practiceLevel < 5 && (
            <div className="bg-gradient-to-r from-blue-50 to-green-50 border-2 border-blue-200 rounded-xl p-6">
              <h4 className="font-bold text-blue-900 mb-4 text-base">
                🚀 Próximo Nível de Maturidade
              </h4>
              {practice.levels[practiceLevel] && (
                <div className="space-y-3">
                  <p className="font-semibold text-blue-800 text-base mb-2">
                    Nível {practiceLevel + 1}: {practice.levels[practiceLevel].name}
                  </p>
                  <p className="text-blue-700 text-sm leading-relaxed">
                    {practice.levels[practiceLevel].description}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Descrição geral da prática */}
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
            <h4 className="font-bold text-gray-900 mb-4 text-base">
              📚 Sobre esta Prática
            </h4>
            <p className="text-gray-700 text-sm leading-relaxed">
              {practice.description}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 p-6 rounded-b-2xl">
          <div className="flex justify-end">
            <button
              onClick={onClose}
              className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Fechar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};  