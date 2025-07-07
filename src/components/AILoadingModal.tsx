import React, { useEffect, useState } from 'react';
import { Brain, Sparkles, Zap, Target } from 'lucide-react';

interface AILoadingModalProps {
  isOpen: boolean;
  companyName: string;
  sector: string;
  onComplete?: () => void;
}

export const AILoadingModal: React.FC<AILoadingModalProps> = ({ 
  isOpen, 
  companyName, 
  sector,
  onComplete 
}) => {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  const steps = [
    { icon: Brain, label: 'Analisando dados da avaliação', color: 'text-purple-600', duration: 3000 },
    { icon: Sparkles, label: 'Identificando padrões e gaps críticos', color: 'text-blue-600', duration: 3000 },
    { icon: Target, label: 'Gerando insights personalizados', color: 'text-green-600', duration: 3000 },
    { icon: Zap, label: 'Criando roadmap estratégico', color: 'text-orange-600', duration: 3000 }
  ];

  useEffect(() => {
    if (!isOpen) {
      setProgress(0);
      setCurrentStep(0);
      setIsCompleted(false);
      return;
    }

    // Controle sequencial dos steps
    const runSteps = async () => {
      for (let i = 0; i < steps.length; i++) {
        setCurrentStep(i);
        
        // Progresso para cada step
        const stepProgressIncrement = 100 / steps.length;
        const startProgress = i * stepProgressIncrement;
        const targetProgress = (i + 1) * stepProgressIncrement;
        
        // Animar progresso durante o step
        const progressDuration = steps[i].duration;
        const progressSteps = 20;
        const progressInterval = progressDuration / progressSteps;
        
        for (let j = 0; j <= progressSteps; j++) {
          await new Promise(resolve => {
            setTimeout(() => {
              const newProgress = startProgress + (targetProgress - startProgress) * (j / progressSteps);
              setProgress(Math.min(newProgress, 100));
              resolve(undefined);
            }, j * progressInterval);
          });
        }
        
        // Step concluído
        
        // Aguardar 3 segundos antes do próximo step para mostrar o verde (exceto no último)
        if (i < steps.length - 1) {
          await new Promise(resolve => setTimeout(resolve, 3000));
        }
      }
      
      // Finalizar análise
      setProgress(100);
      setIsCompleted(true);
      
      // Aguardar 1.5 segundos antes de chamar onComplete
      setTimeout(() => {
        if (onComplete) {
          onComplete();
        }
      }, 1500);
    };

    runSteps();

    return () => {
      // Cleanup será feito automaticamente quando o componente for desmontado
    };
  }, [isOpen, onComplete]);

  if (!isOpen) return null;

  const CurrentIcon = steps[currentStep]?.icon || Brain;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full p-8 text-center">
        {/* Cabeçalho */}
        <div className="mb-8">
          <div className={`inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full mb-4 shadow-lg ${
            isCompleted ? 'animate-pulse' : 'animate-bounce'
          }`}>
            <Brain className="text-white" size={32} />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {isCompleted ? '✅ Análise Concluída!' : '🤖 Análise Inteligente em Progresso'}
          </h2>
          <p className="text-gray-600">
            {isCompleted ? 'Sua avaliação foi processada com sucesso' : 'Nossa IA está processando sua avaliação'}
          </p>
        </div>

        {/* Informações da empresa */}
        <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-4 mb-6">
          <p className="text-sm text-gray-600 mb-1">Analisando dados de:</p>
          <p className="font-bold text-purple-900">{companyName}</p>
          <p className="text-sm text-purple-700">Setor: {sector}</p>
        </div>

        {/* Progresso visual */}
        <div className="mb-8">
          {!isCompleted && (
            <div className="flex items-center justify-center mb-6">
              <CurrentIcon 
                className={`${steps[currentStep]?.color || 'text-purple-600'} animate-spin`} 
                size={24} 
              />
              <span className="ml-3 text-sm font-medium text-gray-700">
                {steps[currentStep]?.label || 'Processando...'}
              </span>
            </div>
          )}
          
          {/* Barra de progresso */}
          <div className="w-full bg-gray-200 rounded-full h-4 mb-3">
            <div 
              className={`h-4 rounded-full transition-all duration-500 ease-out ${
                isCompleted 
                  ? 'bg-gradient-to-r from-green-500 to-green-600' 
                  : 'bg-gradient-to-r from-purple-600 to-blue-600'
              }`}
              style={{ width: `${Math.min(progress, 100)}%` }}
            />
          </div>
          <p className="text-sm text-gray-600 font-medium">
            {Math.round(Math.min(progress, 100))}% concluído
          </p>
        </div>



        {/* Mensagem de espera */}
        <div className="mt-8 text-sm text-gray-600">
          {isCompleted ? (
            <p className="text-green-700 font-medium">🎉 Preparando seu relatório personalizado...</p>
          ) : (
            <div className="space-y-2">
              <p className="font-medium">⏱️ Aguarde alguns instantes...</p>
              <p className="text-xs">A análise será salva automaticamente quando concluída</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AILoadingModal; 