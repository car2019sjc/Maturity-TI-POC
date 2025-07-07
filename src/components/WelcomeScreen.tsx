import React from 'react';
import { CompanyInfo } from '../utils/calculations';
import { TestHelper } from './TestHelper';

interface WelcomeScreenProps {
  companyInfo: CompanyInfo;
  setCompanyInfo: (info: CompanyInfo) => void;
  onStart: (e: React.FormEvent) => void;
  onGoToTestReport?: (testData: any) => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({
  companyInfo,
  setCompanyInfo,
  onStart,
  onGoToTestReport
}) => {
  return (
    <div className="max-w-4xl mx-auto text-center">
      {/* Componente de Teste Temporário */}
      {onGoToTestReport && (
        <TestHelper onGoToReport={onGoToTestReport} />
      )}

      <div className="mb-12">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full mb-6">
          <span className="text-3xl font-bold text-white">IT</span>
        </div>
        <h1 className="text-5xl font-extrabold text-gray-900 mb-4 leading-tight">
          Avaliação da Maturidade de TI
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
          Meça o nível de maturidade dos serviços de TI da sua organização com base nas 
          melhores práticas do ITIL v4 e frameworks de governança corporativa.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 text-left">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-100">
            <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
              <span className="text-white font-bold text-lg">5</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">5 Dimensões</h3>
            <p className="text-gray-600 text-sm">Estratégica, Operacional, Governança, Capacidade e Melhoria</p>
          </div>
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl border border-green-100">
            <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mb-4">
              <span className="text-white font-bold text-lg">34</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">34 Práticas</h3>
            <p className="text-gray-600 text-sm">Avaliação completa baseada em ITIL v4 e CMMI</p>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-violet-50 p-6 rounded-xl border border-purple-100">
            <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mb-4">
              <span className="text-white font-bold">AI</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Análise com IA</h3>
            <p className="text-gray-600 text-sm">Insights personalizados e roadmap estratégico</p>
          </div>
        </div>
      </div>

      <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 max-w-2xl mx-auto mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Informações da Empresa</h2>
        <form onSubmit={onStart} className="space-y-6">
          <div>
            <label htmlFor="companyName" className="block text-sm font-semibold text-gray-700 text-left mb-2">
              Nome da Empresa *
            </label>
            <input
              type="text"
              id="companyName"
              value={companyInfo.name}
              onChange={(e) => setCompanyInfo({ ...companyInfo, name: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900"
              placeholder="Digite o nome da sua empresa"
              required
            />
          </div>
          <div>
            <label htmlFor="sector" className="block text-sm font-semibold text-gray-700 text-left mb-2">
              Setor de Atuação *
            </label>
            <input
              type="text"
              id="sector"
              value={companyInfo.sector}
              onChange={(e) => setCompanyInfo({ ...companyInfo, sector: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900"
              placeholder="Ex: Tecnologia, Financeiro, Saúde, etc."
              required
            />
          </div>
          <button 
            type="submit" 
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-4 px-6 rounded-lg hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            Iniciar Avaliação
          </button>
        </form>
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