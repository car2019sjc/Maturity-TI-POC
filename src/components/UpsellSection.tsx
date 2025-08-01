import React from 'react';
import { Star, CheckCircle, XCircle, ArrowRight, Phone, Mail, Calendar } from 'lucide-react';
import { allPractices } from '../data/pocAssessmentData';

interface UpsellSectionProps {
  companyInfo: {
    name: string;
    sector: string;
  };
}

export const UpsellSection: React.FC<UpsellSectionProps> = ({ companyInfo }) => {
  const includedPractices = allPractices.filter(p => p.included);
  const excludedPractices = allPractices.filter(p => !p.included);
  
  const practicesByDimension = excludedPractices.reduce((acc, practice) => {
    if (!acc[practice.dimension]) {
      acc[practice.dimension] = [];
    }
    acc[practice.dimension].push(practice);
    return acc;
  }, {} as Record<string, typeof excludedPractices>);

  const handleContactSales = () => {
    // Aqui você pode integrar com seu sistema de CRM ou formulário
    window.open('mailto:comercial@timedeai.com?subject=Interesse em Avaliação Completa de Maturidade de TI&body=Olá, gostaria de saber mais sobre a avaliação completa de maturidade de TI para a empresa ' + companyInfo.name + ' do setor ' + companyInfo.sector + '.', '_blank');
  };

  const handleScheduleDemo = () => {
    // Integração com Calendly ou sistema de agendamento
    window.open('https://calendly.com/timedeai/demo-avaliacao-ti', '_blank');
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 rounded-2xl p-8 mt-8 border border-blue-200">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full mb-4">
          <Star className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Quer uma Análise Completa?
        </h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Você acabou de experimentar apenas <span className="font-semibold text-blue-600">{includedPractices.length} das 34 práticas</span> do nosso framework completo de avaliação de maturidade de TI baseado em ITIL v4.
        </p>
      </div>

      {/* Comparação */}
      <div className="grid md:grid-cols-2 gap-8 mb-8">
        {/* Avaliação Gratuita */}
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center mb-4">
            <div className="w-3 h-3 bg-orange-500 rounded-full mr-3"></div>
            <h3 className="text-xl font-semibold text-gray-900">Avaliação Gratuita (POC)</h3>
          </div>
          <div className="space-y-3">
            <div className="flex items-center text-green-600">
              <CheckCircle className="w-5 h-5 mr-2" />
              <span>{includedPractices.length} práticas avaliadas</span>
            </div>
            <div className="flex items-center text-green-600">
              <CheckCircle className="w-5 h-5 mr-2" />
              <span>Relatório básico com IA</span>
            </div>
            <div className="flex items-center text-green-600">
              <CheckCircle className="w-5 h-5 mr-2" />
              <span>Visão geral da maturidade</span>
            </div>
            <div className="flex items-center text-red-500">
              <XCircle className="w-5 h-5 mr-2" />
              <span>Análise limitada por dimensão</span>
            </div>
            <div className="flex items-center text-red-500">
              <XCircle className="w-5 h-5 mr-2" />
              <span>Roadmap genérico</span>
            </div>
          </div>
        </div>

        {/* Avaliação Completa */}
        <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl p-6 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-yellow-400 text-blue-900 px-3 py-1 rounded-bl-lg font-semibold text-sm">
            COMPLETA
          </div>
          <div className="flex items-center mb-4">
            <div className="w-3 h-3 bg-yellow-400 rounded-full mr-3"></div>
            <h3 className="text-xl font-semibold">Avaliação Completa</h3>
          </div>
          <div className="space-y-3">
            <div className="flex items-center">
              <CheckCircle className="w-5 h-5 mr-2 text-green-300" />
              <span><strong>34 práticas</strong> de ITIL v4</span>
            </div>
            <div className="flex items-center">
              <CheckCircle className="w-5 h-5 mr-2 text-green-300" />
              <span><strong>5 dimensões</strong> estratégicas</span>
            </div>
            <div className="flex items-center">
              <CheckCircle className="w-5 h-5 mr-2 text-green-300" />
              <span>Relatório executivo <strong>detalhado</strong></span>
            </div>
            <div className="flex items-center">
              <CheckCircle className="w-5 h-5 mr-2 text-green-300" />
              <span>Roadmap <strong>personalizado</strong> em 3 fases</span>
            </div>
            <div className="flex items-center">
              <CheckCircle className="w-5 h-5 mr-2 text-green-300" />
              <span>Análise de <strong>gaps críticos</strong></span>
            </div>
            <div className="flex items-center">
              <CheckCircle className="w-5 h-5 mr-2 text-green-300" />
              <span>KPIs específicos por setor</span>
            </div>
          </div>
        </div>
      </div>

      {/* Práticas não incluídas */}
      <div className="bg-white rounded-xl p-6 mb-8 border border-gray-200">
        <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
          <ArrowRight className="w-5 h-5 mr-2 text-blue-500" />
          Práticas Adicionais na Versão Completa ({excludedPractices.length} práticas)
        </h3>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(practicesByDimension).map(([dimension, practices]) => (
            <div key={dimension} className="space-y-2">
              <h4 className="font-semibold text-gray-800 text-sm uppercase tracking-wide border-b border-gray-200 pb-1">
                {dimension}
              </h4>
              <div className="space-y-1">
                {practices.map((practice) => (
                  <div key={practice.id} className="flex items-center text-sm text-gray-600">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mr-2 flex-shrink-0"></div>
                    <span>{practice.name}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="text-center">
        <h3 className="text-2xl font-bold text-gray-900 mb-4">
          Pronto para a Análise Completa?
        </h3>
        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
          Nossa equipe de especialistas em ITIL v4 pode ajudar <strong>{companyInfo.name}</strong> a obter insights profundos sobre todas as 34 práticas e criar um roadmap estratégico personalizado para o setor de <strong>{companyInfo.sector}</strong>.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={handleContactSales}
            className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-blue-600 hover:to-indigo-700 transition-all duration-200 flex items-center shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            <Mail className="w-5 h-5 mr-2" />
            Falar com Especialista
          </button>
          
          <button
            onClick={handleScheduleDemo}
            className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold border-2 border-blue-500 hover:bg-blue-50 transition-all duration-200 flex items-center shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            <Calendar className="w-5 h-5 mr-2" />
            Agendar Demo
          </button>
          
          <a
            href="tel:+5511999999999"
            className="text-blue-600 hover:text-blue-800 font-semibold flex items-center transition-colors duration-200"
          >
            <Phone className="w-5 h-5 mr-2" />
            (11) 99999-9999
          </a>
        </div>
        
        <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
          <p className="text-sm text-yellow-800">
            <strong>💡 Oferta Especial:</strong> Mencione este POC e ganhe 20% de desconto na avaliação completa!
          </p>
        </div>
      </div>
    </div>
  );
};