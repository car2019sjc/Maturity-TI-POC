import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, Info, BookOpen, ArrowRight, ArrowLeft, CheckCircle } from 'lucide-react';
import { assessmentData } from '../data/assessmentData';
import { Practice } from '../data/assessmentData';
import { PracticeConfirmationModal } from './PracticeConfirmationModal';
import { practiceDetails } from '../data/practiceDetails';
import { PracticeContextualInsights } from './PracticeContextualInsights';
import { EnhancedLevelCard } from './EnhancedLevelCard';
import { CompanyInfo } from '../utils/calculations';

interface AssessmentFormProps {
  answers: Record<string, number>;
  onAnswerChange: (practiceId: string, value: number) => void;
  onShowDetails: (practice: Practice) => void;
  onShowPracticeDetails: (practiceId: string) => void;
  onNavigateToWelcome: () => void;
  onNavigateToSummary: () => void;
  allQuestionsAnswered: boolean;
  companyInfo: CompanyInfo;
}

export const AssessmentForm = ({
  answers,
  onAnswerChange,
  onShowDetails,
  onShowPracticeDetails,
  onNavigateToWelcome,
  onNavigateToSummary,
  allQuestionsAnswered,
  companyInfo
}: AssessmentFormProps): JSX.Element => {
  // Estado para controlar qual prática está sendo mostrada
  const [currentPracticeIndex, setCurrentPracticeIndex] = useState(0);
  
  // Estado para o modal de confirmação
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [pendingLevel, setPendingLevel] = useState<number | null>(null);
  
  // Removendo refs não utilizadas
  const lastAnswerTimeRef = useRef<number>(0);
  const nextButtonRef = useRef<HTMLButtonElement>(null);

  // Criar lista linear de todas as práticas com informações da dimensão
  const allPractices = assessmentData.dimensions.flatMap(dim => 
    dim.practices.map(practiceId => ({
      id: practiceId,
      name: practiceDetails[practiceId]?.name || 'Prática não encontrada',
      levels: practiceDetails[practiceId]?.levels?.map(l => l.description) || [],
      dimensionName: dim.name,
      dimensionDescription: dim.description,
      dimensionId: dim.id
    }))
  );

  const currentPractice = allPractices[currentPracticeIndex];
  const progress = (Object.keys(answers).length / allPractices.length) * 100;
  const isLastPractice = currentPracticeIndex === allPractices.length - 1;

  // Verificar se mudou de dimensão
  const previousPractice = currentPracticeIndex > 0 ? allPractices[currentPracticeIndex - 1] : null;
  const isNewDimension = !previousPractice || previousPractice.dimensionId !== currentPractice.dimensionId;

  // Verificar se estamos na primeira prática de uma dimensão (exceto a primeira dimensão)
  const isFirstPracticeOfDimension = () => {
    if (currentPracticeIndex === 0) return false;
    const currentDimensionId = currentPractice.dimensionId;
    const previousPractice = allPractices[currentPracticeIndex - 1];
    return previousPractice.dimensionId !== currentDimensionId;
  };

  // Obter nome da dimensão anterior
  const getPreviousDimensionName = () => {
    if (currentPracticeIndex > 0) {
      const previousPractice = allPractices[currentPracticeIndex - 1];
      return previousPractice.dimensionName;
    }
    return '';
  };

  // Função para obter descrição resumida de cada nível ESPECÍFICA para a prática atual
  const getLevelDescription = (level: number) => {
    if (!currentPractice) return '';
    
    // Retorna a descrição específica do nível para a prática atual
    return currentPractice.levels[level - 1] || '';
  };

  const getLevelColor = (level: number) => {
    switch (level) {
      case 1: return 'from-red-100 to-red-50 border-red-200';
      case 2: return 'from-orange-100 to-orange-50 border-orange-200';
      case 3: return 'from-yellow-100 to-yellow-50 border-yellow-200';
      case 4: return 'from-blue-100 to-blue-50 border-blue-200';
      case 5: return 'from-green-100 to-green-50 border-green-200';
      default: return 'from-gray-100 to-gray-50 border-gray-200';
    }
  };

  const getLevelBadgeColor = (level: number) => {
    switch (level) {
      case 1: return 'bg-red-500';
      case 2: return 'bg-orange-500';
      case 3: return 'bg-yellow-500';
      case 4: return 'bg-blue-500';
      case 5: return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  // Função para obter a descrição específica da prática atual
  const getPracticeDescription = (practiceId: string) => {
    if (practiceId === 'gestao_estrategia') {
      return 'A Gestão de Estratégia é uma prática central na área de Tecnologia da Informação (TI) que envolve o planejamento, desenvolvimento, implementação e gestão de estratégias que alinham as capacidades de TI com os objetivos gerais da organização. Através da gestão estratégica, as organizações podem garantir que os investimentos em TI sejam direcionados de forma a maximizar o valor, promover a inovação e manter a competitividade em um ambiente de negócios em constante evolução.';
    }
    if (practiceId === 'gestao_portfolio') {
      return 'A Gestão de Portfólio é uma prática estratégica essencial na área de Tecnologia da Informação (TI) que envolve a seleção, priorização e controle dos projetos e serviços de TI alinhados aos objetivos organizacionais. O objetivo principal é maximizar o valor entregue ao negócio, garantindo que os recursos sejam alocados de forma eficiente e que as iniciativas de TI suportem a estratégia corporativa.';
    }
    if (practiceId === 'gestao_projetos') {
      return 'A Gestão de Projetos de Tecnologia da Informação (TI) é uma disciplina que envolve o planejamento, organização, controle e alocação de recursos para alcançar objetivos específicos de TI dentro de prazos e orçamentos definidos. A eficácia na gestão de projetos de TI é crucial para o sucesso organizacional, pois os projetos de TI frequentemente têm impacto significativo nos processos de negócio, inovação e vantagem competitiva.';
    }
    if (practiceId === 'gestao_financeira') {
      return 'A Gestão Financeira é uma função essencial na área de Tecnologia da Informação (TI) que envolve o planejamento, controle e monitoramento dos recursos financeiros associados às atividades de TI. Com o crescente investimento em tecnologia como um motor para a inovação e a vantagem competitiva, é crucial que as organizações gerenciem efetivamente os custos, orçamentos e investimentos em TI.';
    }
    if (practiceId === 'analise_negocios') {
      return 'A Análise de Negócios é uma disciplina fundamental na área de Tecnologia da Informação (TI) que envolve a identificação das necessidades de negócios e a determinação de soluções para problemas empresariais. Isso inclui o desenvolvimento de novos sistemas ou melhorias nos processos existentes. A análise de negócios atua como uma ponte entre as partes interessadas do negócio e a equipe técnica, garantindo que os requisitos sejam claramente compreendidos e que as soluções propostas estejam alinhadas aos objetivos estratégicos da organização.';
    }
    if (practiceId === 'gestao_riscos') {
      return 'A Gestão de Riscos é uma prática fundamental na área de Tecnologia da Informação (TI) que envolve a identificação, avaliação, monitoramento e mitigação de riscos que possam afetar negativamente os ativos, projetos e operações de TI. Em um ambiente tecnológico em constante evolução, com ameaças cibernéticas crescentes e dependência crítica de sistemas de informação, a capacidade de gerenciar riscos de forma eficaz é crucial para garantir a continuidade dos negócios, a conformidade regulatória e a proteção dos ativos organizacionais.';
    }
    if (practiceId === 'gestao_fornecedores') {
      return 'A Gestão de Fornecedores é uma prática vital na área de Tecnologia da Informação (TI) que envolve a administração eficaz das relações com fornecedores de produtos, serviços e soluções tecnológicas. Com a crescente dependência de terceiros para fornecer componentes críticos de infraestrutura, software e serviços de TI, a capacidade de gerenciar fornecedores de forma estratégica é crucial para garantir a qualidade, a eficiência operacional e a inovação.';
    }
    if (practiceId === 'gestao_arquitetura') {
      return 'A Gestão de Arquitetura é uma prática essencial no campo da Tecnologia da Informação (TI) que envolve a definição, manutenção e governança da arquitetura dos sistemas e infraestrutura de TI de uma organização. Ela assegura que os recursos tecnológicos estejam alinhados com os objetivos estratégicos do negócio, permitindo que a organização responda eficazmente às mudanças do mercado e às demandas dos clientes.';
    }
    if (practiceId === 'gestao_relacionamentos') {
      return 'A Gestão de Relacionamentos é uma prática essencial no campo da Tecnologia da Informação (TI) que se concentra em estabelecer, manter e melhorar as interações entre a organização de TI e seus stakeholders, incluindo clientes, fornecedores, parceiros e outras partes interessadas. Uma gestão eficaz de relacionamentos permite que a organização compreenda melhor as necessidades e expectativas de seus stakeholders, promovendo colaboração, confiança e co-criação de valor.';
    }
    // Para outras práticas, usar descrição genérica
    return `Esta prática avalia como sua organização gerencia e implementa os processos relacionados a ${currentPractice.name}. A avaliação considera a maturidade dos processos, a consistência da implementação e o alinhamento com as melhores práticas do mercado.`;
  };

  const handleLevelClick = (level: number) => {
    setPendingLevel(level);
    setShowConfirmationModal(true);
  };

  const handleConfirmLevel = () => {
    if (pendingLevel && currentPractice) {
      lastAnswerTimeRef.current = Date.now();
      onAnswerChange(currentPractice.id, pendingLevel);
      setShowConfirmationModal(false);
      setPendingLevel(null);
      
      // Scroll suave até o botão de prosseguir após 100ms
      setTimeout(() => {
        nextButtonRef.current?.scrollIntoView({ 
          behavior: 'smooth',
          block: 'center'
        });
      }, 100);
    }
  };

  const handleCancelLevel = () => {
    setShowConfirmationModal(false);
    setPendingLevel(null);
  };

  const goToPrevious = () => {
    if (currentPracticeIndex > 0) {
      setCurrentPracticeIndex(prev => prev - 1);
    }
  };

  const goToNext = () => {
    if (currentPracticeIndex < allPractices.length - 1) {
      setCurrentPracticeIndex(prev => prev + 1);
      // Scroll suave para o topo após a mudança de prática
      setTimeout(() => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      }, 100);
    }
  };

  const [showFullDescription, setShowFullDescription] = useState(false);

  // Função para resumir a descrição
  const getShortDescription = (desc: string) => {
    if (!desc) return '';
    if (desc.length <= 300) return desc;
    // Tenta cortar no primeiro ponto final após 200 caracteres
    const cutIndex = desc.indexOf('.', 200);
    if (cutIndex !== -1 && cutIndex < 350) {
      return desc.slice(0, cutIndex + 1);
    }
    return desc.slice(0, 300) + '...';
  };

  // Estado para controlar expansão individual dos níveis
  const [expandedLevels, setExpandedLevels] = useState<{[key: number]: boolean}>({});

  // Função para resumir a descrição dos níveis
  const getShortLevelDescription = (desc: string) => {
    if (!desc) return '';
    if (desc.length <= 180) return desc;
    const cutIndex = desc.indexOf('.', 100);
    if (cutIndex !== -1 && cutIndex < 200) {
      return desc.slice(0, cutIndex + 1);
    }
    return desc.slice(0, 180) + '...';
  };

  // Função para resumo ainda mais curto dos níveis
  const getVeryShortLevelDescription = (desc: string) => {
    if (!desc) return '';
    if (desc.length <= 90) return desc;
    const cutIndex = desc.indexOf('.', 50);
    if (cutIndex !== -1 && cutIndex < 100) {
      return desc.slice(0, cutIndex + 1);
    }
    return desc.slice(0, 90) + '...';
  };

  if (!currentPractice) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header com progresso */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-3xl font-bold text-gray-900">Questionário de Avaliação</h2>
          <div className="text-right">
            <div className="text-sm text-gray-600 mb-1">
              Progresso: {Object.keys(answers).length}/{allPractices.length}
            </div>
            <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-blue-500 to-green-500 transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Nova Dimensão - Apresentação */}
      {isNewDimension && (
        <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-2xl">
          <div className="flex items-center mb-3">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mr-4">
              <span className="text-white font-bold text-lg">
                {assessmentData.dimensions.findIndex(d => d.id === currentPractice.dimensionId) + 1}
              </span>
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">{currentPractice.dimensionName}</h3>
              <p className="text-sm text-gray-600">
                {assessmentData.dimensions.find(d => d.id === currentPractice.dimensionId)?.practices.length} práticas para avaliar
              </p>
            </div>
          </div>
          <p className="text-gray-700 leading-relaxed text-sm">
            {currentPractice.dimensionDescription}
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Coluna Principal - Prática Atual */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
            {/* Header da Prática */}
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-6 border-b border-gray-200">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <div className="flex items-center mb-3">
                    <span className="bg-blue-600 text-white text-sm font-bold px-3 py-1 rounded-full mr-3">
                      {currentPracticeIndex + 1} de {allPractices.length}
                    </span>
                    <span className="text-sm text-gray-600">{currentPractice.dimensionName}</span>
                  </div>
                  <h4 className="text-2xl font-bold text-gray-900 mb-2">{currentPractice.name}</h4>
                </div>
              </div>
            </div>

            {/* Conteúdo da Prática */}
            <div className="p-6">
              {/* Box "Sobre esta prática" - FONTE REDUZIDA */}
              <div className="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 border-2 border-blue-200 rounded-2xl p-8 mb-6 shadow-lg">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mr-4 shadow-lg">
                    <Info size={24} className="text-white" />
                  </div>
                  <h6 className="text-xl font-bold text-gray-900">📋 Sobre esta Prática</h6>
                </div>
                <p className="text-gray-800 leading-relaxed text-base font-medium mb-6">
                  {getShortDescription(practiceDetails[currentPractice.id]?.description || getPracticeDescription(currentPractice.id))}
                </p>
                <div className="bg-white bg-opacity-70 rounded-xl p-4 border border-blue-200">
                  <p className="text-blue-800 text-sm font-semibold text-center">
                    💡 Selecione o nível que melhor representa sua organização nos cards ao lado
                  </p>
                </div>
              </div>

              {/* Insights Contextuais com IA */}
              <PracticeContextualInsights
                practiceId={currentPractice.id}
                practiceName={currentPractice.name}
                practiceDescription={practiceDetails[currentPractice.id]?.description || getPracticeDescription(currentPractice.id)}
                companyInfo={companyInfo}
                selectedLevel={answers[currentPractice.id]}
                currentDimension={currentPractice.dimensionName}
              />

              {/* Descrição do nível selecionado */}
              {answers[currentPractice.id] ? (
                <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                  <div className="flex items-center mb-3">
                    <CheckCircle size={20} className="text-green-600 mr-2" />
                    <h6 className="font-semibold text-green-800 text-lg">
                      Nível {answers[currentPractice.id]} Confirmado
                    </h6>
                  </div>
                  <p className="text-green-700 leading-relaxed">
                    {currentPractice.levels[answers[currentPractice.id] - 1]}
                  </p>
                  {!isLastPractice && (
                    <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                      <p className="text-blue-700 text-sm font-medium text-center">
                        ✨ Próxima prática será carregada automaticamente em alguns segundos...
                      </p>
                    </div>
                  )}
                </div>
              ) : null}
            </div>
          </div>

          {/* Navegação */}
          <div className="flex justify-end items-center mt-6 p-4 bg-white rounded-xl shadow-md">
            <div className="flex items-center gap-4">
              {currentPracticeIndex > 0 && (
                <button 
                  onClick={goToPrevious}
                  className="bg-blue-100 text-blue-700 font-semibold py-3 px-6 rounded-lg hover:bg-blue-200 transition-all duration-200 flex items-center"
                  title={isFirstPracticeOfDimension() ? `Voltar para ${getPreviousDimensionName()}` : 'Prática anterior'}
                >
                  <ArrowLeft size={18} className="mr-2" />
                  Anterior
                </button>
              )}

              {!isLastPractice && (
                <button 
                  ref={nextButtonRef}
                  onClick={goToNext}
                  disabled={!answers[currentPractice.id]}
                  className="bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all duration-200 flex items-center"
                >
                  Próxima
                  <ArrowRight size={18} className="ml-2" />
                </button>
              )}

              {allQuestionsAnswered && isLastPractice && (
                <button 
                  onClick={onNavigateToSummary} 
                  className="bg-gradient-to-r from-green-600 to-blue-600 text-white font-bold py-3 px-8 rounded-lg hover:from-green-700 hover:to-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center"
                >
                  Ver Resumo da Avaliação
                  <ArrowRight size={18} className="ml-2" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Coluna Lateral - Níveis de Maturidade */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-4 sticky top-4">
            <h3 className="text-lg font-bold text-gray-900 mb-4 text-center">Níveis de Maturidade</h3>
            
            <div className="space-y-3">
              {[1, 2, 3, 4, 5].map(level => (
                <EnhancedLevelCard
                  key={level} 
                  level={level}
                  description={getLevelDescription(level)}
                  isSelected={answers[currentPractice.id] === level}
                  onClick={() => handleLevelClick(level)}
                  companyInfo={companyInfo}
                  practiceName={currentPractice.name}
                />
              ))}
            </div>

            {/* Status da avaliação */}
            <div className="mt-4 text-center p-3 bg-gray-50 rounded-lg">
              {!answers[currentPractice.id] ? (
                <p className="text-gray-600 text-sm">
                  Clique em um nível para avaliar esta prática
                </p>
              ) : !isLastPractice ? (
                <p className="text-green-600 text-sm font-medium">
                  ✅ Resposta confirmada! {allPractices.length - Object.keys(answers).length} práticas restantes
                </p>
              ) : (
                <p className="text-blue-600 text-sm font-medium">
                  🎉 Todas as práticas avaliadas! Clique em "Ver Resumo" para continuar
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Modal de Confirmação */}
      <PracticeConfirmationModal
        practice={currentPractice}
        selectedLevel={pendingLevel}
        onConfirm={handleConfirmLevel}
        onCancel={handleCancelLevel}
        onShowDetails={() => onShowDetails(currentPractice)}
        onShowPracticeDetails={() => onShowPracticeDetails(currentPractice.id)}
      />

      {/* Rodapé OnSet Tecnologia */}
      <footer className="text-center py-6 mt-8 border-t border-gray-200">
        <p className="text-gray-600 text-sm">
          © 2025 OnSet Tecnologia. Todos os direitos reservados.
        </p>
      </footer>
    </div>
  );
};