import React from 'react';
import { X, CheckCircle } from 'lucide-react';
import { Practice } from '../data/assessmentData';
import { practiceDetails } from '../data/practiceDetails';

interface PracticeConfirmationModalProps {
  practice: Practice | null;
  selectedLevel: number | null;
  onConfirm: () => void;
  onCancel: () => void;
  onShowDetails: () => void;
  onShowPracticeDetails: () => void;
}

export const PracticeConfirmationModal: React.FC<PracticeConfirmationModalProps> = ({
  practice,
  selectedLevel,
  onConfirm,
  onCancel,
  onShowDetails,
  onShowPracticeDetails
}) => {
  if (!practice || selectedLevel === null) return null;

  const getLevelBorderColor = (level: number) => {
    switch (level) {
      case 1: return 'border-red-500';
      case 2: return 'border-orange-500';
      case 3: return 'border-yellow-500';
      case 4: return 'border-blue-500';
      case 5: return 'border-green-500';
      default: return 'border-gray-500';
    }
  };

  const getLevelAccentColor = (level: number) => {
    switch (level) {
      case 1: return 'bg-red-50 text-red-800';
      case 2: return 'bg-orange-50 text-orange-800';
      case 3: return 'bg-yellow-50 text-yellow-800';
      case 4: return 'bg-blue-50 text-blue-800';
      case 5: return 'bg-green-50 text-green-800';
      default: return 'bg-gray-50 text-gray-800';
    }
  };

  const getLevelIconColor = (level: number) => {
    switch (level) {
      case 1: return 'bg-red-500';
      case 2: return 'bg-orange-500';
      case 3: return 'bg-yellow-500';
      case 4: return 'bg-blue-500';
      case 5: return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getLevelName = (level: number) => {
    switch (level) {
      case 1: return 'Inicial/Caótico';
      case 2: return 'Reativo/Gerenciado';
      case 3: return 'Proativo/Definido';
      case 4: return 'Gerenciado/Mensurável';
      case 5: return 'Otimizado/Estratégico';
      default: return 'Indefinido';
    }
  };

  const getLevelDotColor = (level: number) => {
    switch (level) {
      case 1: return 'bg-red-500';
      case 2: return 'bg-orange-500';
      case 3: return 'bg-yellow-500';
      case 4: return 'bg-blue-500';
      case 5: return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  // Obter detalhes específicos da prática se disponível
  const practiceDetail = practiceDetails[practice.id];
  const levelDetail = practiceDetail?.levels.find(l => l.level === selectedLevel);

  // Log para depuração
  console.log('PracticeConfirmationModal - practiceDetail:', practiceDetail);
  console.log('PracticeConfirmationModal - levelDetail:', levelDetail);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4 z-50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white p-6 border-b border-gray-200 rounded-t-2xl">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <div className={`w-12 h-12 ${getLevelIconColor(selectedLevel)} rounded-full flex items-center justify-center mr-4 shadow-lg`}>
                <span className="text-white font-bold text-lg">{selectedLevel}</span>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">{practice.name}</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Confirmação de Nível - {levelDetail?.name || getLevelName(selectedLevel)}
                </p>
              </div>
            </div>
            <button 
              onClick={onCancel} 
              className="text-gray-500 hover:text-gray-800 p-2 hover:bg-gray-100 rounded-full transition-all duration-200"
            >
              <X size={24} />
            </button>
          </div>
        </div>
        
        <div className="p-6">
          {/* Nível Selecionado - NOVO DESIGN COM BORDA TRACEJADA */}
          <div className={`border-4 border-dashed ${getLevelBorderColor(selectedLevel)} bg-white rounded-2xl p-8 mb-6 shadow-lg`}>
            <div className="flex items-center mb-6">
              <div className={`w-20 h-20 ${getLevelIconColor(selectedLevel)} rounded-2xl flex items-center justify-center mr-6 shadow-xl`}>
                <span className="text-white font-bold text-3xl">{selectedLevel}</span>
              </div>
              <div className="flex-1">
                <h4 className="text-2xl font-bold text-gray-900 mb-2">
                  Nível {selectedLevel}: {levelDetail?.name || getLevelName(selectedLevel)}
                </h4>
                <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold ${getLevelAccentColor(selectedLevel)}`}>
                  <CheckCircle size={16} className="mr-2" />
                  Você selecionou este nível para a prática
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 border-2 border-gray-200 rounded-xl p-6">
              <h5 className="font-bold text-lg text-gray-900 mb-3">Descrição do Nível</h5>
              <p className="text-gray-700 leading-relaxed text-base">
                {levelDetail?.description || practice.levels[selectedLevel - 1]}
              </p>
            </div>
          </div>

          {/* Características do Nível */}
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 mb-6">
            <h5 className="font-bold text-lg text-gray-900 mb-4 flex items-center">
              <div className={`w-3 h-3 ${getLevelDotColor(selectedLevel)} rounded-full mr-3`}></div>
              Características do Nível {selectedLevel}
            </h5>
            <div className="space-y-3">
              {levelDetail?.characteristics ? (
                // Usar características específicas da prática se disponível
                levelDetail.characteristics.map((characteristic, index) => (
                  <div key={index} className="flex items-start">
                    <div className={`w-2 h-2 rounded-full mr-3 mt-2 ${getLevelDotColor(selectedLevel)}`}></div>
                    <p className="text-gray-700 text-sm" dangerouslySetInnerHTML={{
                      __html: characteristic.replace(/^([^:]+):/g, '<strong>$1:</strong>')
                    }}></p>
                  </div>
                ))
              ) : (
                // Fallback para características genéricas
                <div className="space-y-2">
                  {selectedLevel === 1 && (
                    <>
                      <div className="flex items-start">
                        <div className="w-2 h-2 bg-red-500 rounded-full mr-3 mt-2"></div>
                        <p className="text-gray-700 text-sm">Processos inexistentes ou completamente ad-hoc</p>
                      </div>
                      <div className="flex items-start">
                        <div className="w-2 h-2 bg-red-500 rounded-full mr-3 mt-2"></div>
                        <p className="text-gray-700 text-sm">Dependência total de esforços individuais</p>
                      </div>
                      <div className="flex items-start">
                        <div className="w-2 h-2 bg-red-500 rounded-full mr-3 mt-2"></div>
                        <p className="text-gray-700 text-sm">Resultados imprevisíveis e inconsistentes</p>
                      </div>
                    </>
                  )}
                  {selectedLevel === 2 && (
                    <>
                      <div className="flex items-start">
                        <div className="w-2 h-2 bg-orange-500 rounded-full mr-3 mt-2"></div>
                        <p className="text-gray-700 text-sm">Processos básicos começam a ser estabelecidos</p>
                      </div>
                      <div className="flex items-start">
                        <div className="w-2 h-2 bg-orange-500 rounded-full mr-3 mt-2"></div>
                        <p className="text-gray-700 text-sm">Abordagem ainda predominantemente reativa</p>
                      </div>
                      <div className="flex items-start">
                        <div className="w-2 h-2 bg-orange-500 rounded-full mr-3 mt-2"></div>
                        <p className="text-gray-700 text-sm">Implementação inconsistente entre equipes</p>
                      </div>
                    </>
                  )}
                  {selectedLevel === 3 && (
                    <>
                      <div className="flex items-start">
                        <div className="w-2 h-2 bg-yellow-500 rounded-full mr-3 mt-2"></div>
                        <p className="text-gray-700 text-sm">Processos padronizados e documentados</p>
                      </div>
                      <div className="flex items-start">
                        <div className="w-2 h-2 bg-yellow-500 rounded-full mr-3 mt-2"></div>
                        <p className="text-gray-700 text-sm">Abordagem proativa e controlada</p>
                      </div>
                      <div className="flex items-start">
                        <div className="w-2 h-2 bg-yellow-500 rounded-full mr-3 mt-2"></div>
                        <p className="text-gray-700 text-sm">Alinhamento com objetivos de negócio</p>
                      </div>
                    </>
                  )}
                  {selectedLevel === 4 && (
                    <>
                      <div className="flex items-start">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mr-3 mt-2"></div>
                        <p className="text-gray-700 text-sm">Gestão baseada em dados e métricas</p>
                      </div>
                      <div className="flex items-start">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mr-3 mt-2"></div>
                        <p className="text-gray-700 text-sm">Desempenho previsível e controlado</p>
                      </div>
                      <div className="flex items-start">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mr-3 mt-2"></div>
                        <p className="text-gray-700 text-sm">Análise quantitativa para tomada de decisão</p>
                      </div>
                    </>
                  )}
                  {selectedLevel === 5 && (
                    <>
                      <div className="flex items-start">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-3 mt-2"></div>
                        <p className="text-gray-700 text-sm">Otimização contínua e inovação</p>
                      </div>
                      <div className="flex items-start">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-3 mt-2"></div>
                        <p className="text-gray-700 text-sm">Parceria estratégica com o negócio</p>
                      </div>
                      <div className="flex items-start">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-3 mt-2"></div>
                        <p className="text-gray-700 text-sm">Cultura de melhoria e adaptabilidade</p>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Pergunta de Confirmação */}
          <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6">
            <div className="flex items-center mb-4">
              <CheckCircle size={20} className="text-blue-600 mr-2" />
              <h5 className="font-bold text-lg text-blue-900">Confirmação</h5>
            </div>
            <p className="text-blue-800 mb-4">
              Você tem certeza de que o <strong>Nível {selectedLevel} ({levelDetail?.name || getLevelName(selectedLevel)})</strong> representa 
              adequadamente a situação atual da sua organização para a prática <strong>{practice.name}</strong>?
            </p>
            <p className="text-blue-700 text-sm">
              💡 <strong>Dica:</strong> Considere a situação real atual, não a situação desejada ou planejada.
            </p>
          </div>
        </div>
        
        {/* Footer com botões */}
        <div className="p-6 bg-gray-50 border-t border-gray-200 rounded-b-2xl">
          <div className="flex justify-between items-center">
            <button 
              onClick={onCancel} 
              className="bg-gray-200 text-gray-800 font-semibold py-3 px-6 rounded-lg hover:bg-gray-300 transition-all duration-200"
            >
              Cancelar
            </button>
            <div className="flex gap-3">
              <button 
                onClick={onCancel}
                className="bg-blue-100 text-blue-700 font-semibold py-3 px-6 rounded-lg hover:bg-blue-200 transition-all duration-200"
              >
                Escolher Outro Nível
              </button>
              <button 
                onClick={onConfirm} 
                className={`${getLevelIconColor(selectedLevel)} text-white font-bold py-3 px-8 rounded-lg hover:shadow-lg transition-all duration-200 flex items-center`}
              >
                <CheckCircle size={18} className="mr-2" />
                Confirmar Nível {selectedLevel}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};