import React from 'react';
import { FileText, Zap } from 'lucide-react';

interface TestHelperProps {
  onGoToReport: (testData: any) => void;
}

export const TestHelper: React.FC<TestHelperProps> = ({ onGoToReport }) => {
  // Dados de teste para simular uma avaliação completa
  const generateTestData = () => {
    const testCompanyInfo = {
      name: 'TechCorp Brasil',
      sector: 'Tecnologia'
    };

    // Respostas fictícias para todas as práticas (variando entre 1-5 para ter diversidade)
    const testAnswers = {
      // Dimensão Estratégica
      'gestao_estrategia': 2,
      'gestao_portfolio': 3,
      'gestao_arquitetura': 1,
      'gestao_relacionamentos': 4,
      
      // Dimensão Operacional Core
      'central_servicos': 3,
      'gestao_incidentes': 2,
      'gestao_solicitacoes': 4,
      'gestao_nivel_servico': 1,
      'gestao_disponibilidade': 3,
      'gestao_capacidade_desempenho': 2,
      'monitoramento_eventos': 1,
      'gestao_problemas': 4,
      'gestao_implantacao': 2,
      'gestao_infra_plataforma': 3,
      'gestao_ativos': 1,
      'dev_gerenciamento_software': 4,
      'gestao_continuidade': 2,
      'validacao_teste': 3,
      
      // Dimensão Governança e Controle
      'gestao_mudanca': 1,
      'controle_mudancas': 2,
      'gestao_seguranca': 4,
      'gestao_configuracao': 3,
      'gestao_riscos': 1,
      
      // Dimensão Capacidade e Conhecimento
      'gestao_catalogo': 2,
      'design_servico': 3,
      'medicao_relatorios': 1,
      'gestao_talentos': 4,
      'gestao_conhecimento': 2,
      
      // Dimensão Melhoria
      'gestao_implementacao': 3,
      'melhoria_continua': 1,
      
      // Dimensão Transversal
      'gestao_projetos': 2,
      'gestao_financeira': 4,
      'analise_negocios': 3,
      'gestao_fornecedores': 1
    };

    return {
      companyInfo: testCompanyInfo,
      answers: testAnswers
    };
  };

  const handleGoToReport = () => {
    const testData = generateTestData();
    onGoToReport(testData);
  };

  return (
    <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-200 rounded-xl p-6 mb-8 shadow-lg">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="bg-yellow-500 p-3 rounded-xl shadow-md">
            <Zap className="text-white" size={32} />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-yellow-900 mb-1">
              🧪 Modo de Teste - Desenvolvimento
            </h3>
            <p className="text-yellow-700 text-sm">
              Botão temporário para avaliar o relatório final e formatação PDF
            </p>
            <p className="text-yellow-600 text-xs mt-1">
              <strong>Empresa Teste:</strong> TechCorp Brasil (Setor: Tecnologia) • 
              <strong>Dados:</strong> 34 práticas com scores variados (1-5)
            </p>
          </div>
        </div>
        
        <button
          onClick={handleGoToReport}
          className="bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700 text-white font-bold py-4 px-8 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center space-x-3"
        >
          <FileText size={24} />
          <div className="text-left">
            <div className="text-lg">🚀 Ir Direto ao Relatório</div>
            <div className="text-xs opacity-90">Com dados de teste completos</div>
          </div>
        </button>
      </div>
      
      {/* Detalhes dos dados de teste */}
      <div className="mt-4 bg-white bg-opacity-60 rounded-lg p-4 border border-yellow-300">
        <h4 className="font-bold text-yellow-900 mb-2">📊 Dados de Teste Inclusos:</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div>
            <span className="font-semibold text-yellow-800">Empresa:</span>
            <p className="text-yellow-700">TechCorp Brasil</p>
          </div>
          <div>
            <span className="font-semibold text-yellow-800">Setor:</span>
            <p className="text-yellow-700">Tecnologia</p>
          </div>
          <div>
            <span className="font-semibold text-yellow-800">Práticas:</span>
            <p className="text-yellow-700">34 avaliadas (mix de scores 1-5)</p>
          </div>
        </div>
        <div className="mt-3 text-xs text-yellow-600">
          ⚠️ <strong>Lembrete:</strong> Este é um arquivo temporário para testes. 
          Será removido após a avaliação da formatação PDF.
        </div>
      </div>
    </div>
  );
}; 