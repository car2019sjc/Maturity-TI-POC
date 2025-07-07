import * as pdfMake from "pdfmake/build/pdfmake";
import * as vfs from "pdfmake/build/vfs_fonts";
import { Scores } from './calculations';
import { assessmentData } from '../data/assessmentData';

interface CompanyInfo {
  name: string;
  sector: string;
}

interface MaturityLevel {
  level: number;
  name: string;
  characteristics: string;
  risks: string;
}

interface AIAnalysis {
  critical_points: Array<{
    dimension: string;
    score: number;
    diagnosis: string;
    risks: string[];
    mitigations: string[];
  }>;
  main_risks: string[];
  roadmap: Array<{
    phase: string;
    timeframe: string;
    actions: string[];
    kpis: string[];
  }>;
  strategic_priorities: string[];
  executive_summary?: string;
}

export const generateProfessionalPDF = (
  scores: Scores,
  companyInfo: CompanyInfo,
  maturityLevel: MaturityLevel,
  answers: Record<string, number> = {},
  practicesMap: Record<string, string> = {},
  aiAnalysis?: AIAnalysis | null
) => {
  // Configurar PDFMake com as fontes
  try {
    (pdfMake as any).vfs = (vfs as any).pdfMake?.vfs || vfs;
  } catch (error) {
    console.warn('Erro ao configurar fontes do PDF:', error);
  }

  // Função para obter cor baseada na pontuação
  const getScoreColor = (score: number) => {
    if (score >= 4) return '#16a34a';
    if (score >= 3) return '#2563eb';  
    if (score >= 2) return '#ca8a04';
    return '#dc2626';
  };

  // Preparar dados das dimensões
  const dimensionsTableBody = Object.values(scores.byDimension).map(dim => {
    const percentage = ((dim.score / 5) * 100).toFixed(1);
    return [
      { text: dim.name.replace('Dimensão ', ''), style: 'tableCell' },
      { text: `${(dim.weight * 100).toFixed(1)}%`, style: 'tableCellCenter' },
      { text: dim.score.toFixed(2), style: 'tableCellCenter', color: getScoreColor(dim.score) },
      { text: `${percentage}%`, style: 'tableCellCenter' }
    ];
  });

  // Preparar dados das práticas para tabela consolidada
  const practicesTableBody: any[] = [];
  assessmentData.dimensions.forEach(dimension => {
    dimension.practices.forEach(practiceId => {
      const answer = answers[practiceId] || 1;
      const pp = (answer * dimension.weight).toFixed(3);
      const pm = (5 * dimension.weight).toFixed(3);
      const gap = ((5 - answer) * dimension.weight).toFixed(3);
      
      practicesTableBody.push([
        { text: practicesMap[practiceId] || practiceId, style: 'tableCell' },
        { text: `${(dimension.weight * 100).toFixed(1)}%`, style: 'tableCellCenter' },
        { text: answer.toString(), style: 'tableCellCenter', color: getScoreColor(answer) },
        { text: pp, style: 'tableCellCenter' },
        { text: pm, style: 'tableCellCenter' },
        { text: gap, style: 'tableCellCenter', color: parseFloat(gap) > 0.05 ? '#dc2626' : '#16a34a' }
      ]);
    });
  });

  // Preparar TOP 10 práticas com maior gap
  const practiceGaps: Array<{
    id: string;
    name: string;
    gap: number;
    level: number;
    impact: string;
    severity: string;
  }> = [];

  assessmentData.dimensions.forEach(dimension => {
    dimension.practices.forEach(practiceId => {
      const answer = answers[practiceId] || 1;
      const gap = (5 - answer) * dimension.weight;
      
      const getStrategicImpact = (practiceId: string) => {
        const impactMap: Record<string, string> = {
          'gestao_talentos': 'Déficit de competências',
          'gestao_implantacao': 'Velocidade de entrega comprometida',
          'gestao_continuidade': 'Risco de interrupção operacional',
          'gestao_riscos': 'Exposição regulatória/normativa',
          'gestao_ativos': 'Ineficiência de recursos',
          'gestao_mudanca': 'Resistência organizacional',
          'gestao_capacidade_desempenho': 'Gargalos operacionais',
          'melhoria_continua': 'Estagnação competitiva',
          'gestao_incidentes': 'Disponibilidade de sistemas',
          'gestao_problemas': 'Recorrência de falhas',
          'gestao_estrategia': 'Desalinhamento estratégico',
          'gestao_portfolio': 'ROI de investimentos',
          'gestao_projetos': 'Entrega de projetos',
          'gestao_financeira': 'Controle orçamentário',
          'analise_negocios': 'Requisitos inadequados',
          'gestao_fornecedores': 'Dependência de terceiros',
          'gestao_arquitetura': 'Complexidade técnica',
          'gestao_relacionamentos': 'Satisfação stakeholders',
          'central_servicos': 'Experiência do usuário',
          'gestao_solicitacoes': 'Eficiência operacional',
          'gestao_nivel_servico': 'Cumprimento de SLAs',
          'gestao_disponibilidade': 'Continuidade de negócio',
          'monitoramento_eventos': 'Visibilidade operacional',
          'gestao_infra_plataforma': 'Estabilidade da infraestrutura',
          'dev_gerenciamento_software': 'Qualidade de software',
          'controle_mudancas': 'Controle de alterações',
          'gestao_seguranca': 'Segurança da informação',
          'gestao_configuracao': 'Rastreabilidade de ativos',
          'validacao_teste': 'Qualidade de entrega',
          'gestao_catalogo': 'Transparência de serviços',
          'medicao_relatorios': 'Tomada de decisão',
          'gestao_conhecimento': 'Retenção de conhecimento',
          'gestao_implementacao': 'Go-to-market de serviços',
          'design_servico': 'Inovação em serviços'
        };
        return impactMap[practiceId] || 'Impacto operacional';
      };

      const getSeverity = (level: number) => {
        if (level === 1) return 'Crítico';
        if (level === 2) return 'Alto';
        return 'Médio';
      };

      practiceGaps.push({
        id: practiceId,
        name: practicesMap[practiceId] || practiceId,
        gap: gap,
        level: answer,
        impact: getStrategicImpact(practiceId),
        severity: getSeverity(answer)
      });
    });
  });

  const top10Gaps = practiceGaps
    .sort((a, b) => b.gap - a.gap)
    .slice(0, 10);

  // Preparar dados do detalhamento por dimensão
  const dimensionDetailTableBody = Object.values(scores.byDimension).map(dim => {
    const status = dim.score >= 4 ? 'Excelente' : 
                   dim.score >= 3 ? 'Bom' : 
                   dim.score >= 2 ? 'Regular' : 'Crítico';
    
    return [
      { text: dim.name.replace('Dimensão ', ''), style: 'tableCell' },
      { text: `${Math.round(dim.weight * 100)}%`, style: 'tableCellCenter' },
      { text: dim.score.toFixed(2), style: 'tableCellCenter', color: getScoreColor(dim.score) },
      { text: (dim.score * dim.weight).toFixed(2), style: 'tableCellCenter' },
      { text: status, style: 'tableCellCenter', color: getScoreColor(dim.score) }
    ];
  });
} 