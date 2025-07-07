import React, { useState, useMemo, useEffect } from 'react';
import { WelcomeScreen } from './components/WelcomeScreen';
import { DimensionsOverview } from './components/DimensionsOverview';
import { AssessmentForm } from './components/AssessmentForm';
import { SummaryReport } from './components/SummaryReport';
import { ReportPreviewModal } from './components/ReportPreviewModal';
import { LevelDetailsModal } from './components/LevelDetailsModal';
import { PracticeDetailModal } from './components/PracticeDetailModal';
import { AILoadingModal } from './components/AILoadingModal';
import { assessmentData, Practice } from './data/assessmentData';
import { practiceDetails } from './data/practiceDetails';
import { calculateScores, CompanyInfo, AIAnalysis, generateAIAnalysis, generateEnhancedAIAnalysis } from './utils/calculations';

type Step = 'welcome' | 'overview' | 'assessment' | 'summary';

export default function App() {
  // Começar na tela de boas-vindas para interação completa com o usuário
  const [step, setStep] = useState<Step>('welcome');
  const [companyInfo, setCompanyInfo] = useState<CompanyInfo>({ 
    name: '', 
    sector: '' 
  });
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [selectedPractice, setSelectedPractice] = useState<Practice | null>(null);
  const [selectedPracticeDetail, setSelectedPracticeDetail] = useState<string | null>(null);
  const [aiAnalysis, setAiAnalysis] = useState<AIAnalysis | null>(null);
  const [isLoadingAi, setIsLoadingAi] = useState(false);
  const [aiAnalysisStarted, setAiAnalysisStarted] = useState(false); // Flag para evitar múltiplas execuções
  const [showReportPreview, setShowReportPreview] = useState(false);

  const handleStart = (e: React.FormEvent) => {
    e.preventDefault();
    if (companyInfo.name && companyInfo.sector) {
      setStep('overview');
    } else {
      alert('Por favor, preencha o nome da empresa e o setor de atuação.');
    }
  };

  const handleStartAssessment = () => {
    setStep('assessment');
  };

  const handleAnswerChange = (practiceId: string, value: number) => {
    setAnswers(prev => ({ ...prev, [practiceId]: value }));
  };
  
  const handleShowDetails = (practice: Practice) => {
    setSelectedPractice(practice);
  };

  const handleShowPracticeDetails = (practiceId: string) => {
    setSelectedPracticeDetail(practiceId);
  };

  const handleCloseModal = () => {
    setSelectedPractice(null);
  };

  const handleClosePracticeDetailModal = () => {
    setSelectedPracticeDetail(null);
  };

  const handleCloseReportPreview = () => {
    setShowReportPreview(false);
  };

  const handleGenerateFullReport = () => {
    setShowReportPreview(false);
    setStep('summary');
  };

  // Função temporária para teste - ir direto ao relatório
  const handleGoToTestReport = (testData: any) => {
    setCompanyInfo(testData.companyInfo);
    setAnswers(testData.answers);
    setAiAnalysisStarted(false); // Reset para permitir nova análise
    setAiAnalysis(null); // Limpar análise anterior
    setStep('summary');
  };

  const scores = useMemo(() => calculateScores(answers), [answers]);

  const allQuestionsAnswered = useMemo(() => {
    const totalPractices = assessmentData.dimensions.reduce((acc, dim) => acc + dim.practices.length, 0);
    return Object.keys(answers).length === totalPractices;
  }, [answers]);

  const handleGenerateAIAnalysis = async () => {
    // Evitar múltiplas execuções simultâneas
    if (isLoadingAi || aiAnalysisStarted) return;
    
    setIsLoadingAi(true);
    setAiAnalysisStarted(true);
    setAiAnalysis(null);
    
    try {
      // Usar a função aprimorada que inclui análise das práticas com maior gap
      const analysis = await generateEnhancedAIAnalysis(scores, companyInfo, answers);
      setAiAnalysis(analysis);
    } catch (error) {
      console.error('Error generating enhanced AI analysis:', error);
      // Fallback para análise padrão
      try {
        const analysis = await generateAIAnalysis(scores, companyInfo);
        setAiAnalysis(analysis);
      } catch (fallbackError) {
        console.error('Error generating fallback AI analysis:', fallbackError);
        // Se falhar completamente, permitir nova tentativa
        setAiAnalysisStarted(false);
      }
    } finally {
      setIsLoadingAi(false);
    }
  };
  
  // Auto-gerar análise de IA apenas quando entrar no resumo com todas as respostas
  useEffect(() => {
    if (step === 'summary' && allQuestionsAnswered && !aiAnalysis && !isLoadingAi && !aiAnalysisStarted) {
      handleGenerateAIAnalysis();
    }
  }, [step, allQuestionsAnswered, aiAnalysis, isLoadingAi, aiAnalysisStarted]);

  // Reset da flag quando sair do resumo (para permitir nova análise se necessário)
  useEffect(() => {
    if (step !== 'summary') {
      setAiAnalysisStarted(false);
    }
  }, [step]);

  // Efeito para rolar para o topo quando mudar de tela
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, [step]);

  const renderContent = () => {
    switch (step) {
      case 'overview':
        return (
          <DimensionsOverview
            companyInfo={companyInfo}
            onNavigateToWelcome={() => setStep('welcome')}
            onStartAssessment={handleStartAssessment}
          />
        );
      case 'assessment':
        return (
          <AssessmentForm
            answers={answers}
            onAnswerChange={handleAnswerChange}
            onShowDetails={handleShowDetails}
            onShowPracticeDetails={handleShowPracticeDetails}
            onNavigateToWelcome={() => setStep('welcome')}
            onNavigateToSummary={() => setShowReportPreview(true)}
            allQuestionsAnswered={allQuestionsAnswered}
            companyInfo={companyInfo}
          />
        );
      case 'summary':
        return (
          <SummaryReport 
            scores={scores}
            companyInfo={companyInfo}
            onNavigateToAssessment={() => setStep('assessment')}
            aiAnalysis={aiAnalysis}
            isLoadingAi={isLoadingAi}
            onGenerateAIAnalysis={handleGenerateAIAnalysis}
            answers={answers}
          />
        );
      default: // welcome
        return (
          <WelcomeScreen
            companyInfo={companyInfo}
            setCompanyInfo={setCompanyInfo}
            onStart={handleStart}
            onGoToTestReport={handleGoToTestReport}
          />
        );
    }
  };

  return (
    <div className="bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 min-h-screen font-sans">
      <div className="container mx-auto p-4 sm:p-6 lg:p-8">
        {renderContent()}
      </div>
      {selectedPractice && (
        <LevelDetailsModal practice={selectedPractice} onClose={handleCloseModal} />
      )}
      {selectedPracticeDetail && practiceDetails[selectedPracticeDetail] && (
        <PracticeDetailModal 
          practice={practiceDetails[selectedPracticeDetail]} 
          onClose={handleClosePracticeDetailModal} 
        />
      )}
      {showReportPreview && (
        <ReportPreviewModal
          isOpen={showReportPreview}
          onClose={handleCloseReportPreview}
          onGenerateReport={handleGenerateFullReport}
          scores={scores}
          companyInfo={companyInfo}
          answers={answers}
          assessmentData={assessmentData}
          practicesMap={{
            'gestao_estrategia': 'Gestão de Estratégia',
            'gestao_portfolio': 'Gestão de Portfolio',
            'gestao_arquitetura': 'Gestão de Arquitetura',
            'gestao_projetos': 'Gestão de Projetos',
            'gestao_financeira': 'Gestão Financeira',
            'analise_negocios': 'Análise de Negócios',
            'gestao_fornecedores': 'Gestão de Fornecedores',
            'gestao_relacionamentos': 'Gestão de Relacionamentos',
            'gestao_talentos': 'Gestão de Talentos e Força de Trabalho',
            'central_servicos': 'Central de Serviços',
            'gestao_solicitacoes': 'Gestão de Solicitações',
            'gestao_incidentes': 'Gestão de Incidentes',
            'gestao_problemas': 'Gestão de Problemas',
            'gestao_nivel_servico': 'Gestão de Nível de Serviço',
            'gestao_disponibilidade': 'Gestão de Disponibilidade',
            'gestao_capacidade_desempenho': 'Gestão de Capacidade e Desempenho',
            'monitoramento_eventos': 'Monitoramento e Gestão de Eventos',
            'gestao_infra_plataforma': 'Gestão de Infraestrutura e Plataforma',
            'dev_gerenciamento_software': 'Desenvolvimento e Gerenciamento de Software',
            'gestao_implantacao': 'Gestão de Implantação',
            'gestao_catalogo': 'Gestão de Catálogo',
            'design_servico': 'Design de Serviço',
            'controle_mudancas': 'Controle de Mudanças',
            'gestao_ativos': 'Gestão de Ativos de TI',
            'gestao_configuracao': 'Gestão de Configuração',
            'gestao_seguranca': 'Gestão de Segurança da Informação',
            'validacao_teste': 'Validação e Teste',
            'gestao_riscos': 'Gestão de Riscos',
            'medicao_relatorios': 'Medição e Relatórios',
            'gestao_conhecimento': 'Gestão do Conhecimento',
            'gestao_mudanca': 'Gestão de Mudança',
            'gestao_continuidade': 'Gestão de Continuidade do Serviço',
            'gestao_implementacao': 'Gestão de Implementação',
            'melhoria_continua': 'Melhoria Contínua'
          }}
        />
      )}
      
      {/* Modal de loading da IA - Muito mais visível e destacado */}
      <AILoadingModal
        isOpen={isLoadingAi}
        companyName={companyInfo.name}
        sector={companyInfo.sector}
        onComplete={() => setIsLoadingAi(false)}
      />
    </div>
  );
}