import React, { useState } from 'react';
import { CheckCircle, Info, AlertTriangle, TrendingUp } from 'lucide-react';
import { CompanyInfo } from '../utils/calculations';

interface EnhancedLevelCardProps {
  level: number;
  description: string;
  isSelected: boolean;
  onClick: () => void;
  companyInfo: CompanyInfo;
  practiceName: string;
}

export const EnhancedLevelCard: React.FC<EnhancedLevelCardProps> = ({
  level,
  description,
  isSelected,
  onClick,
  companyInfo,
  practiceName
}) => {
  const [showDetails, setShowDetails] = useState(false);

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

  const getSectorSpecificInsight = (level: number, sector: string, practice: string) => {
    const sectorLower = sector.toLowerCase();
    const practiceLower = practice.toLowerCase();

    // Insights específicos por setor e nível
    const baseInsights = {
      1: {
        impact: "Operação altamente reativa com riscos elevados",
        example: "Processos manuais sem padronização",
        risk: "Falhas frequentes e imprevisibilidade"
      },
      2: {
        impact: "Reconhecimento da necessidade de estruturação",
        example: "Algumas práticas básicas implementadas",
        risk: "Inconsistência na aplicação"
      },
      3: {
        impact: "Operação estruturada e previsível",
        example: "Processos documentados e seguidos",
        risk: "Limitação para crescimento"
      },
      4: {
        impact: "Operação otimizada e monitorada",
        example: "Métricas ativas e melhorias regulares",
        risk: "Pode estagnar sem inovação"
      },
      5: {
        impact: "Excelência operacional com diferenciação",
        example: "Melhoria contínua e inovação",
        risk: "Complexidade se mal gerenciada"
      }
    };

    let insights = baseInsights[level as keyof typeof baseInsights];

    // Personalização por setor
    if (sectorLower.includes('financ') || sectorLower.includes('banco')) {
      switch (level) {
        case 1:
          insights.impact = "Alto risco regulatório e operacional";
          insights.example = "Controles manuais e documentação inadequada";
          insights.risk = "Multas e perda de confiança";
          break;
        case 3:
          insights.impact = "Conformidade básica estabelecida";
          insights.example = "Controles formais e auditoria regular";
          break;
        case 5:
          insights.impact = "Excelência em governança e compliance";
          insights.example = "Automação de controles e auditoria contínua";
          break;
      }
    } else if (sectorLower.includes('saúde') || sectorLower.includes('hospital')) {
      switch (level) {
        case 1:
          insights.impact = "Risco para continuidade do atendimento";
          insights.example = "Sistemas críticos sem backup adequado";
          insights.risk = "Impacto na segurança do paciente";
          break;
        case 3:
          insights.impact = "Atendimento estável e seguro";
          insights.example = "Sistemas críticos com alta disponibilidade";
          break;
        case 5:
          insights.impact = "Excelência em cuidados e eficiência";
          insights.example = "Sistemas integrados e inteligência artificial";
          break;
      }
    } else if (sectorLower.includes('manufat') || sectorLower.includes('indust')) {
      switch (level) {
        case 1:
          insights.impact = "Riscos de parada de produção";
          insights.example = "Sistemas de chão de fábrica instáveis";
          insights.risk = "Perda de produtividade e matéria-prima";
          break;
        case 3:
          insights.impact = "Produção estável e confiável";
          insights.example = "Integração TI com automação industrial";
          break;
        case 5:
          insights.impact = "Indústria 4.0 com diferenciação";
          insights.example = "IoT, analytics e manutenção preditiva";
          break;
      }
    } else if (sectorLower.includes('varejo') || sectorLower.includes('comércio')) {
      switch (level) {
        case 1:
          insights.impact = "Risco de perda de vendas";
          insights.example = "Sistemas de venda instáveis";
          insights.risk = "Insatisfação do cliente e perda de receita";
          break;
        case 3:
          insights.impact = "Experiência do cliente consistente";
          insights.example = "Omnichannel básico funcionando";
          break;
        case 5:
          insights.impact = "Experiência excepcional e personalizada";
          insights.example = "AI para personalização e analytics avançado";
          break;
      }
    }

    return insights;
  };

  const getShortDescription = (desc: string) => {
    if (desc.length <= 90) return desc;
    const cutIndex = desc.indexOf('.', 50);
    if (cutIndex !== -1 && cutIndex < 100) {
      return desc.slice(0, cutIndex + 1);
    }
    return desc.slice(0, 90) + '...';
  };

  const sectorInsight = getSectorSpecificInsight(level, companyInfo.sector, practiceName);

  return (
    <div 
      className={`bg-gradient-to-r ${getLevelColor(level)} border rounded-xl p-3 transition-all duration-200 hover:shadow-md cursor-pointer transform hover:scale-105 ${
        isSelected ? 'ring-2 ring-blue-500 shadow-lg scale-105' : ''
      }`}
      onClick={onClick}
    >
      <div className="flex items-start mb-2">
        <div className={`w-8 h-8 ${getLevelBadgeColor(level)} rounded-full flex items-center justify-center mr-3 flex-shrink-0`}>
          <span className="text-white font-bold text-sm">{level}</span>
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-gray-900 text-sm mb-1">Nível {level}</h4>
          <p className="text-gray-700 text-xs leading-relaxed">
            {getShortDescription(description)}
          </p>
        </div>
        {isSelected && (
          <CheckCircle size={16} className="text-green-600 ml-2 flex-shrink-0" />
        )}
      </div>

      {/* Insight específico do setor */}
      <div className="mt-3 p-2 bg-white bg-opacity-60 rounded-lg border border-gray-200">
        <div className="flex items-center mb-1">
          <TrendingUp size={12} className="text-blue-600 mr-1" />
          <span className="text-xs font-medium text-blue-800">Para {companyInfo.sector}:</span>
        </div>
        <p className="text-xs text-gray-700 mb-1">{sectorInsight.impact}</p>
        <p className="text-xs text-gray-600">
          <span className="font-medium">Ex:</span> {sectorInsight.example}
        </p>
        {level <= 2 && (
          <div className="mt-1 flex items-center">
            <AlertTriangle size={10} className="text-red-500 mr-1" />
            <span className="text-xs text-red-600">{sectorInsight.risk}</span>
          </div>
        )}
      </div>

      {/* Call to action */}
      <div className="text-center mt-3">
        <button className="text-blue-600 hover:text-blue-800 text-xs font-medium hover:underline">
          {isSelected ? '✅ Selecionado' : 'Clique para selecionar →'}
        </button>
      </div>
    </div>
  );
}; 