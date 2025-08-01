import * as pdfMake from "pdfmake/build/pdfmake";
import * as vfs from "pdfmake/build/vfs_fonts";
import { Scores } from './calculations';
import { assessmentData } from '../data/pocAssessmentData';

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
	// Validação de entrada
	if (!scores || !companyInfo || !maturityLevel) {
		console.error('generateProfessionalPDF - Dados obrigatórios ausentes');
		throw new Error('Dados obrigatórios para geração do PDF não foram fornecidos');
	}

	// Clonar profundamente todos os dados para evitar poluição do estado
	const clonedScores: Scores = JSON.parse(JSON.stringify(scores));
	const clonedCompanyInfo: CompanyInfo = JSON.parse(JSON.stringify(companyInfo));
	const clonedMaturityLevel: MaturityLevel = JSON.parse(JSON.stringify(maturityLevel));
	const clonedAnswers: Record<string, number> = JSON.parse(JSON.stringify(answers));
	const clonedPracticesMap: Record<string, string> = JSON.parse(JSON.stringify(practicesMap));
	const clonedAiAnalysis: AIAnalysis | null = aiAnalysis ? JSON.parse(JSON.stringify(aiAnalysis)) : null;

	// Configurar fontes do PDFMake
	if (typeof (pdfMake as any).vfs === 'undefined') {
		try {
			(pdfMake as any).vfs = vfs;
		} catch (error) {
			console.warn('Erro ao configurar fontes do PDF:', error);
		}
	}

	// Definir layouts customizados para as tabelas
	const tableLayouts = {
		lightBorder: {
			hLineWidth: function() { return 0.5; },
			vLineWidth: function() { return 0.5; },
			hLineColor: function() { return '#d1d5db'; },
			vLineColor: function() { return '#d1d5db'; },
			paddingLeft: function() { return 8; },
			paddingRight: function() { return 8; },
			paddingTop: function() { return 6; },
			paddingBottom: function() { return 6; }
		},
		softBorder: {
			hLineWidth: function() { return 0.3; },
			vLineWidth: function() { return 0.3; },
			hLineColor: function() { return '#e5e7eb'; },
			vLineColor: function() { return '#e5e7eb'; },
			paddingLeft: function() { return 6; },
			paddingRight: function() { return 6; },
			paddingTop: function() { return 5; },
			paddingBottom: function() { return 5; }
		},
		redBorder: {
			hLineWidth: function() { return 0.3; },
			vLineWidth: function() { return 0.3; },
			hLineColor: function() { return '#fecaca'; },
			vLineColor: function() { return '#fecaca'; },
			paddingLeft: function() { return 6; },
			paddingRight: function() { return 6; },
			paddingTop: function() { return 5; },
			paddingBottom: function() { return 5; }
		},
		stripedTable: {
			hLineWidth: function() { return 0.3; },
			vLineWidth: function() { return 0.3; },
			hLineColor: function() { return '#e5e7eb'; },
			vLineColor: function() { return '#e5e7eb'; },
			fillColor: function(rowIndex: number) {
				if (rowIndex === 0) return '#f8fafc';
				if (rowIndex % 2 === 0) return '#f9fafb';
				return null;
			},
			paddingLeft: function() { return 6; },
			paddingRight: function() { return 6; },
			paddingTop: function() { return 5; },
			paddingBottom: function() { return 5; }
		},
		redHeaderTable: {
			hLineWidth: function() { return 0.3; },
			vLineWidth: function() { return 0.3; },
			hLineColor: function() { return '#fecaca'; },
			vLineColor: function() { return '#fecaca'; },
			fillColor: function(rowIndex: number) {
				if (rowIndex === 0) return '#fef7f7';
				return null;
			},
			paddingLeft: function() { return 6; },
			paddingRight: function() { return 6; },
			paddingTop: function() { return 5; },
			paddingBottom: function() { return 5; }
		},
		blueHeaderTable: {
			hLineWidth: function() { return 0.3; },
			vLineWidth: function() { return 0.3; },
			hLineColor: function() { return '#e5e7eb'; },
			vLineColor: function() { return '#e5e7eb'; },
			fillColor: function(rowIndex: number) {
				if (rowIndex === 0) return '#f8fafc';
				return null;
			},
			paddingLeft: function() { return 6; },
			paddingRight: function() { return 6; },
			paddingTop: function() { return 5; },
			paddingBottom: function() { return 5; }
		}
	};

	// Função auxiliar para garantir que valores sejam strings
	const ensureString = (value: any): string => {
		if (typeof value === 'string') return value;
		if (value === null || value === undefined) return '';
		return String(value);
	};

	const getScoreColor = (score: number) => {
		if (score >= 4) return '#16a34a';
		if (score >= 3) return '#2563eb';  
		if (score >= 2) return '#ca8a04';
		return '#dc2626';
	};

	// Preparar dados das dimensões
	const dimensionsTableBody = Object.values(clonedScores.byDimension).map(dim => {
		const percentage = ((dim.score / 5) * 100).toFixed(1);
		return [
			{ text: dim.name.replace('Dimensão ', ''), style: 'tableCell' },
			{ text: `${(dim.weight * 100).toFixed(1)}%`, style: 'tableCellCenter' },
			{ text: dim.score.toFixed(2), style: 'tableCellCenter', color: getScoreColor(dim.score) },
			{ text: `${percentage}%`, style: 'tableCellCenter' }
		];
	});

	// Preparar dados das práticas
	const practicesTableBody: any[] = [];
	assessmentData.dimensions.forEach(dimension => {
		dimension.practices.forEach(practiceId => {
			const answer = clonedAnswers[practiceId] || 1;
			const pp = (answer * dimension.weight).toFixed(3);
			const pm = (5 * dimension.weight).toFixed(3);
			const gap = ((5 - answer) * dimension.weight).toFixed(3);
			
			practicesTableBody.push([
				{ text: clonedPracticesMap[practiceId] || practiceId, style: 'tableCell' },
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
			const answer = clonedAnswers[practiceId] || 1;
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
				name: clonedPracticesMap[practiceId] || practiceId,
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
	const dimensionDetailTableBody = Object.values(clonedScores.byDimension).map(dim => {
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

	  const docDefinition: any = {
    pageSize: 'A4',
    pageMargins: [30, 40, 30, 40],
    
    header: {
      margin: [25, 10],
      table: {
        widths: ['auto', '*', 'auto'],
        body: [[
          { 
            text: [
              { text: 'On', color: '#1e40af', fontSize: 12, bold: true },
              { text: 'Set', color: '#f59e0b', fontSize: 12, bold: true }
            ],
            margin: [0, 2, 0, 0]
          },
          { text: 'Relatório de Maturidade de TI - POC', style: 'headerTitle', alignment: 'center' },
          { text: new Date().toLocaleDateString('pt-BR'), style: 'headerDate' }
        ]]
      },
      layout: 'noBorders'
    },

    footer: (currentPage: number, pageCount: number) => ({
      margin: [25, 10],
      table: {
        widths: ['*', 'auto'],
        body: [[
          { text: [
            { text: '© 2025 ' },
            { text: 'On', color: '#1e40af', bold: true },
            { text: 'Set', color: '#f59e0b', bold: true },
            { text: ' Tecnologia - Especialistas em Transformação Digital e ITIL' }
          ], style: 'footer' },
          { text: `Página ${currentPage} de ${pageCount}`, style: 'footer' }
        ]]
      },
      layout: 'noBorders'
    }),

		content: [
			      // Capa
      {
        text: 'RELATÓRIO DE MATURIDADE DE TI - POC',
        style: 'coverTitle',
        alignment: 'center',
        margin: [0, 40, 0, 15]
      },
      {
        text: 'VERSÃO DEMO',
        style: 'coverSubtitle',
        alignment: 'center',
        color: '#dc2626',
        margin: [0, 0, 0, 10]
      },
      {
        text: 'Avaliação de 6 práticas essenciais de ITIL v4',
        style: 'coverDescription',
        alignment: 'center',
        color: '#6b7280',
        margin: [0, 0, 0, 15]
      },
      {
        text: clonedCompanyInfo.name,
        style: 'coverCompany',
        alignment: 'center',
        margin: [0, 0, 0, 20]
      },
      {
        text: `Setor: ${clonedCompanyInfo.sector}`,
        style: 'coverSector',
        alignment: 'center',
        margin: [0, 0, 0, 30]
      },
      {
        text: `Gerado em: ${new Date().toLocaleDateString('pt-BR')}`,
        style: 'coverDate',
        alignment: 'center'
      },

      // Nova página para índice
      { text: '', pageBreak: 'after' },

      // Índice
      {
        text: 'ÍNDICE',
        style: 'sectionTitle',
        margin: [0, 0, 0, 15]
      },
			{
				stack: [
					{ 
						columns: [
							{ text: '1. Resumo Executivo', style: 'indexItem', width: 'auto' },
							{ text: ' ', width: '*' },
							{ text: '3', style: 'indexPage', width: 30 }
						],
						margin: [0, 0, 0, 8]
					},
					{ 
						columns: [
							{ text: '2. Análise de Maturidade', style: 'indexItem', width: 'auto' },
							{ text: ' ', width: '*' },
							{ text: '3', style: 'indexPage', width: 30 }
						],
						margin: [0, 0, 0, 8]
					},
					{ 
						columns: [
							{ text: '3. Dashboard de Maturidade por Dimensão', style: 'indexItem', width: 'auto' },
							{ text: ' ', width: '*' },
							{ text: '4', style: 'indexPage', width: 30 }
						],
						margin: [0, 0, 0, 8]
					},
					{ 
						columns: [
							{ text: '4. Práticas Avaliadas no POC', style: 'indexItem', width: 'auto' },
							{ text: ' ', width: '*' },
							{ text: '5', style: 'indexPage', width: 30 }
						],
						margin: [0, 0, 0, 8]
					},
					{ 
						columns: [
							{ text: '5. Práticas Avaliadas - Análise de Gaps', style: 'indexItem', width: 'auto' },
							{ text: ' ', width: '*' },
							{ text: '6', style: 'indexPage', width: 30 }
						],
						margin: [0, 0, 0, 8]
					},
					{ 
						columns: [
							{ text: '6. Detalhamento por Dimensão', style: 'indexItem', width: 'auto' },
							{ text: ' ', width: '*' },
							{ text: '7', style: 'indexPage', width: 30 }
						],
						margin: [0, 0, 0, 8]
					},
					...(clonedAiAnalysis ? [
						{ 
							columns: [
								{ text: '7. Diagnóstico Crítico e Roadmap', style: 'indexItem', width: 'auto' },
								{ text: ' ', width: '*' },
								{ text: '8', style: 'indexPage', width: 30 }
							],
							margin: [0, 0, 0, 8]
						},
						{ 
							columns: [
								{ text: '8. Recomendações Estratégicas', style: 'indexItem', width: 'auto' },
								{ text: ' ', width: '*' },
								{ text: '9', style: 'indexPage', width: 30 }
							],
							margin: [0, 0, 0, 8]
						}
					] : [
						{ 
							columns: [
								{ text: '7. Recomendações Estratégicas', style: 'indexItem', width: 'auto' },
								{ text: ' ', width: '*' },
								{ text: '8', style: 'indexPage', width: 30 }
							],
							margin: [0, 0, 0, 8]
						}
					])
				]
			},

			// Nova página para conteúdo
			{ text: '', pageBreak: 'after' },

			      // 1. Resumo Executivo
      {
        text: '1. RESUMO EXECUTIVO',
        style: 'sectionTitle',
        margin: [0, 0, 0, 15]
      },
      {
        text: [
          { text: '🎯 VERSÃO DEMO: ', style: 'pocLabel' },
          { text: 'Este relatório apresenta uma avaliação gratuita baseada em 6 práticas essenciais de ITIL v4, selecionadas estrategicamente para oferecer uma visão inicial da maturidade de TI da sua organização. Para uma análise completa com todas as 34 práticas, entre em contato com nossa equipe comercial.' }
        ],
        style: 'pocDescription',
        margin: [0, 0, 0, 20]
      },
      {
        columns: [
          {
            width: '48%',
            stack: [
              { text: 'Pontuação Final', style: 'cardTitle' },
              { text: clonedScores.total.toFixed(2), style: 'scoreValue' },
              { text: 'de 5.0 pontos', style: 'cardSubtitle' }
            ],
            margin: [0, 0, 10, 0]
          },
          {
            width: '48%',
            stack: [
              { text: 'Nível de Maturidade', style: 'cardTitle' },
              { text: clonedMaturityLevel.name, style: 'levelValue' },
              { text: `Nível ${clonedMaturityLevel.level}/5`, style: 'cardSubtitle' }
            ],
            margin: [10, 0, 0, 0]
          }
        ],
        margin: [0, 0, 0, 20]
      },

      // 2. Análise de Maturidade
      {
        text: '2. ANÁLISE DE MATURIDADE',
        style: 'sectionTitle',
        margin: [0, 0, 0, 15]
      },
			
			// Card do Nível Atual
			{
				table: {
					widths: ['*'],
					body: [
						[
							{
								stack: [
									{
										columns: [
											{
												width: 'auto',
												stack: [
													{
														text: `${clonedMaturityLevel.level}`,
														style: 'levelNumber',
														color: getScoreColor(clonedMaturityLevel.level)
													}
												],
												margin: [0, 0, 20, 0]
											},
											{
												width: '*',
												stack: [
													{
														text: clonedMaturityLevel.name,
														style: 'levelTitle',
														color: getScoreColor(clonedMaturityLevel.level)
													},
													{
														text: `Pontuação Atual: ${clonedScores.total.toFixed(2)}/5 (${Math.round((clonedScores.total/5)*100)}%)`,
														style: 'levelScore',
														margin: [0, 5, 0, 0]
													}
												]
											}
										]
									}
								                ],
                fillColor: clonedMaturityLevel.level === 1 ? '#fef2f2' :
                          clonedMaturityLevel.level === 2 ? '#fff7ed' :
                          clonedMaturityLevel.level === 3 ? '#fefce8' :
                          clonedMaturityLevel.level === 4 ? '#eff6ff' : '#f0fdf4',
                margin: [15, 15, 15, 15]
              }
            ]
          ]
        },
        layout: 'lightBorder',
        margin: [0, 0, 0, 20]
      },

			// Características e Riscos
			{
				columns: [
					{
						width: '48%',
						stack: [
							              {
                text: '📋 Características do Nível Atingido',
                style: 'analysisSubTitle',
                margin: [0, 0, 0, 10]
              },
              {
                table: {
                  widths: ['*'],
                  body: [
                    [
                      {
                        text: clonedMaturityLevel.characteristics,
                        style: 'analysisContent',
                        margin: [12, 12, 12, 12]
                      }
                    ]
                  ]
                },
                layout: 'softBorder',
                margin: [0, 0, 0, 0]
              }
						]
					},
					{ width: '4%', text: '' },
					{
						width: '48%',
						stack: [
							              {
                text: '⚠️ Riscos Associados',
                style: 'analysisSubTitle',
                color: '#dc2626',
                margin: [0, 0, 0, 10]
              },
              {
                table: {
                  widths: ['*'],
                  body: [
                    [
                      {
                        text: clonedMaturityLevel.risks,
                        style: 'analysisContent',
                        margin: [12, 12, 12, 12]
                      }
                    ]
                  ]
                },
                layout: 'redBorder',
                margin: [0, 0, 0, 0]
              }
						]
					          }
        ],
        margin: [0, 0, 0, 30]
      },

      // 3. Dashboard de Maturidade por Dimensão
      {
        text: '3. DASHBOARD DE MATURIDADE POR DIMENSÃO',
        style: 'sectionTitle',
        margin: [0, 0, 0, 15]
      },
			{
				table: {
					headerRows: 1,
					widths: ['*', 70, 70, 70],
					body: [
						[
							{ text: 'Dimensão', style: 'tableHeader' },
							{ text: 'Peso (%)', style: 'tableHeader' },
							{ text: 'Pontuação', style: 'tableHeader' },
							{ text: 'Percentual', style: 'tableHeader' }
						],
						...dimensionsTableBody
					]
				},
				layout: 'stripedTable',
        margin: [0, 0, 0, 20]
      },

      // Nova página
      { text: '', pageBreak: 'after' },

      // 4. Práticas para Implementação
      {
        text: '4. PRÁTICAS AVALIADAS NO POC',
        style: 'sectionTitle',
        margin: [0, 0, 0, 15]
      },
      {
        text: [
          { text: 'As 6 práticas a seguir foram selecionadas estrategicamente para oferecer uma visão representativa da maturidade de TI da sua organização. ', style: 'bodyText' },
          { text: 'Para uma análise completa com todas as 34 práticas de ITIL v4, solicite nossa avaliação completa.', style: 'bodyText', color: '#dc2626' }
        ],
        margin: [0, 0, 0, 15]
      },
			{
				table: {
					headerRows: 1,
					widths: ['*', 60, 60, 50, 50, 50],
					body: [
						[
							{ text: 'Prática', style: 'tableHeader' },
							{ text: 'Peso (%)', style: 'tableHeader' },
							{ text: 'Pontuação', style: 'tableHeader' },
							{ text: 'PP', style: 'tableHeader' },
							{ text: 'PM', style: 'tableHeader' },
							{ text: 'Gap', style: 'tableHeader' }
						],
						...practicesTableBody
					]
				},
				layout: 'stripedTable',
				margin: [0, 0, 0, 10]
      },
      {
        text: 'Legenda: PP=Pontuação Ponderada atual | PM=Pontuação Máxima possível | Gap=Diferença para máxima maturidade',
        style: 'legend',
        margin: [0, 8, 0, 15]
      },

      // 5. TOP 10 Práticas com Maior Gap
      {
        text: '5. PRÁTICAS AVALIADAS - ANÁLISE DE GAPS',
        style: 'sectionTitle',
        margin: [0, 0, 0, 20]
      },
			{
				table: {
					headerRows: 1,
					widths: ['*', 50, '*', 70, 40],
					body: [
						[
							{ text: 'Prática', style: 'tableHeader' },
							{ text: 'Gap', style: 'tableHeader' },
							{ text: 'Impacto Estratégico', style: 'tableHeader' },
							{ text: 'Severidade', style: 'tableHeader' },
							{ text: 'Nível', style: 'tableHeader' }
						],
						...top10Gaps.map((gap, index) => [
							{ text: `${index + 1}º ${gap.name}`, style: 'tableCell' },
							{ text: gap.gap.toFixed(3), style: 'tableCellCenter', color: '#dc2626' },
							{ text: gap.impact, style: 'tableCell' },
							{ text: gap.severity, style: 'tableCellCenter', color: gap.level <= 2 ? '#dc2626' : '#ca8a04' },
							{ text: gap.level.toString(), style: 'tableCellCenter', color: getScoreColor(gap.level) }
						])
					]
				},
				layout: 'redHeaderTable',
        margin: [0, 0, 0, 20]
      },

      // 6. Detalhamento por Dimensão
      {
        text: '6. DETALHAMENTO POR DIMENSÃO',
        style: 'sectionTitle',
        margin: [0, 0, 0, 20]
      },
			{
				table: {
					headerRows: 1,
					widths: ['*', 60, 70, 80, 70],
					body: [
						[
							{ text: 'Dimensão', style: 'tableHeader' },
							{ text: 'Peso (%)', style: 'tableHeader' },
							{ text: 'Pontuação', style: 'tableHeader' },
							{ text: 'Contribuição', style: 'tableHeader' },
							{ text: 'Status', style: 'tableHeader' }
						],
						...dimensionDetailTableBody
					]
				},
				layout: 'blueHeaderTable',
        margin: [0, 0, 0, 20]
      },

			      // Análise com IA (condicional)
      ...(clonedAiAnalysis ? [
        { text: '', pageBreak: 'after' },
        {
          text: '7. DIAGNÓSTICO CRÍTICO E ROADMAP ESTRATÉGICO',
          style: 'sectionTitle',
          margin: [0, 0, 0, 20]
        },
        {
          text: 'Áreas Críticas Identificadas',
          style: 'subSectionTitle',
          margin: [0, 0, 0, 15]
        },
        ...(clonedAiAnalysis.critical_points.length > 0 ? 
          clonedAiAnalysis.critical_points.map(point => [
            {
              text: `${point.dimension} (Score: ${point.score}/5)`,
              style: 'subSectionTitle',
              margin: [0, 15, 0, 10],
              color: '#dc2626'
            },
            {
              text: `Diagnóstico: ${point.diagnosis}`,
              style: 'bodyText',
              margin: [0, 0, 0, 8]
            },
            {
              text: 'Principais Riscos:',
              style: 'bodyText',
              bold: true,
              margin: [0, 0, 0, 5]
            },
            {
              ul: point.risks,
              style: 'bodyText',
              margin: [15, 0, 0, 8]
            },
            {
              text: 'Recomendações de Mitigação:',
              style: 'bodyText',
              bold: true,
              margin: [0, 0, 0, 5]
            },
            {
              ul: point.mitigations,
              style: 'bodyText',
              margin: [15, 0, 0, 15]
            }
          ]).flat() : [
            {
              text: 'Excelente Desempenho! Todas as dimensões apresentam desempenho satisfatório (≥3).',
              style: 'bodyText',
              color: '#16a34a',
              margin: [0, 0, 0, 15]
            }
          ]
        ),
        {
          text: 'Roadmap Estratégico',
          style: 'subSectionTitle',
          margin: [0, 10, 0, 8]
        },
        ...clonedAiAnalysis.roadmap.map(phase => [
          {
            text: `${phase.phase} (${phase.timeframe})`,
            style: 'subSectionTitle',
            margin: [0, 8, 0, 4],
            color: '#2563eb'
          },
          {
            text: 'Ações Estratégicas:',
            style: 'bodyText',
            bold: true,
            margin: [0, 0, 0, 3]
          },
          {
            ul: phase.actions,
            style: 'bodyText',
            margin: [10, 0, 0, 6]
          },
          {
            text: 'KPIs de Acompanhamento:',
            style: 'bodyText',
            bold: true,
            margin: [0, 0, 0, 3]
          },
          {
            ul: phase.kpis,
            style: 'bodyText',
            margin: [10, 0, 0, 10]
          }
        ]).flat(),
        {
          text: 'Top 3 Prioridades Estratégicas',
          style: 'subSectionTitle',
          margin: [0, 15, 0, 8]
        },
        {
          ol: clonedAiAnalysis.strategic_priorities,
          style: 'bodyText',
          margin: [0, 0, 0, 15]
        },
        ...(clonedAiAnalysis.executive_summary ? [
          {
            text: 'Resumo Executivo da IA',
            style: 'subSectionTitle',
            margin: [0, 15, 0, 8]
          },
          {
            text: clonedAiAnalysis.executive_summary,
            style: 'bodyText',
            margin: [0, 0, 0, 15]
          }
        ] : [])
      ] : []),

      // Nova página para recomendações
      { text: '', pageBreak: 'after' },

      // Recomendações Estratégicas
      {
        text: `${clonedAiAnalysis ? '8' : '7'}. RECOMENDAÇÕES ESTRATÉGICAS`,
        style: 'sectionTitle',
        margin: [0, 0, 0, 15]
      },
			{
				text: 'Com base na análise realizada, recomendamos focar nas seguintes áreas prioritárias:',
				style: 'bodyText',
				margin: [0, 0, 0, 10]
			},
			{
				ol: [
					'Práticas com gaps críticos (≥0.1) devem ser priorizadas',
					'Dimensões com pontuação <2.0 requerem atenção imediata',
					'Implementar governança em práticas com nível 1',
					'Estabelecer métricas para práticas com nível 2',
					'Automatizar processos em práticas com nível 3+'
				        ],
        style: 'bodyText',
        margin: [0, 0, 0, 20]
      },
      
      // Seção sobre versão completa
      {
        text: 'QUER UMA ANÁLISE COMPLETA?',
        style: 'sectionTitle',
        alignment: 'center',
        color: '#dc2626',
        margin: [0, 20, 0, 10]
      },
      {
        text: [
          { text: 'Este POC avaliou apenas ', style: 'bodyText' },
          { text: '6 das 34 práticas', bold: true, color: '#dc2626' },
          { text: ' do nosso framework completo baseado em ITIL v4. Nossa avaliação completa oferece:', style: 'bodyText' }
        ],
        margin: [0, 0, 0, 15]
      },
      {
        ul: [
          'Análise detalhada de todas as 34 práticas de ITIL v4',
          'Avaliação completa das 5 dimensões estratégicas',
          'Roadmap personalizado em 3 fases com KPIs específicos',
          'Análise de gaps críticos e priorização de ações',
          'Relatório executivo detalhado para liderança',
          'Benchmarking com empresas do seu setor'
        ],
        style: 'bodyText',
        margin: [20, 0, 0, 15]
      },
      
      {
        text: [
          { text: 'ACELERE SUA TRANSFORMAÇÃO DIGITAL COM A ' },
          { text: 'ON', color: '#1e40af', bold: true },
          { text: 'SET', color: '#f59e0b', bold: true },
          { text: ' TECNOLOGIA' }
        ],
        style: 'sectionTitle',
        alignment: 'center',
        margin: [0, 15, 0, 10]
      },
      {
        text: [
          { text: 'A ' },
          { text: 'On', color: '#1e40af', bold: true },
          { text: 'Set', color: '#f59e0b', bold: true },
          { text: ' Tecnologia é sua parceira estratégica para implementar as melhores práticas de ITIL e elevar a maturidade de TI da sua organização. Com décadas de experiência no mercado, somos especialistas em transformação digital e governance de TI, atendendo clientes de médio e grande porte em diversos setores.' }
        ],
        style: 'bodyText',
        alignment: 'justify',
        margin: [0, 0, 0, 12]
      },
      {
        columns: [
          {
            width: '48%',
            stack: [
              {
                text: 'NOSSA EXPERTISE:',
                style: 'subSectionTitle',
                margin: [0, 0, 0, 8]
              },
              {
                ul: [
                  'Implementação completa de práticas ITIL v4',
                  'Consultoria em Governance e Strategy de TI',
                  'Automação de processos e workflows',
                  'Gestão de Portfolio e PMO de TI',
                  'Service Management e ITSM',
                  'Risk Management e Compliance'
                ],
                style: 'bodyText',
                margin: [0, 0, 0, 0]
              }
            ]
          },
          {
            width: '4%',
            text: ''
          },
          {
            width: '48%',
            stack: [
              {
                text: 'BENEFÍCIOS COMPROVADOS:',
                style: 'subSectionTitle',
                margin: [0, 0, 0, 8]
              },
              {
                ul: [
                  'Redução de até 40% nos incidentes críticos',
                  'Melhoria de 60% na satisfação dos usuários',
                  'ROI positivo em 12-18 meses',
                  'Aumento da disponibilidade dos serviços',
                  'Compliance com normas regulatórias',
                  'Otimização de custos operacionais'
                ],
                style: 'bodyText',
                margin: [0, 0, 0, 0]
              }
            ]
          }
        ],
        margin: [0, 0, 0, 15]
      },
      {
        text: 'Transforme os gaps identificados neste relatório em oportunidades estratégicas. Nossa metodologia proprietária, baseada em frameworks internacionais e experiência prática, garante resultados mensuráveis e sustentáveis.',
        style: 'bodyText',
        alignment: 'center',
        margin: [0, 0, 0, 15]
      },
      {
        text: 'ENTRE EM CONTATO E INICIE SUA JORNADA DE TRANSFORMAÇÃO',
        style: 'subSectionTitle',
        alignment: 'center',
        margin: [0, 8, 0, 12]
      },
      {
        columns: [
          {
            width: '*',
            text: 'comercial@onset.com.br',
            style: 'bodyText',
            alignment: 'center'
          },
          {
            width: '*',
            text: '+55(12) 3797-6200',
            style: 'bodyText',
            alignment: 'center'
          },
          {
            width: '*',
            text: 'www.onset.com.br',
            style: 'bodyText',
            alignment: 'center'
          }
        ],
        margin: [0, 0, 0, 0]
      }
    ],

		styles: {
			coverTitle: {
				fontSize: 28,
				bold: true,
				color: '#1e40af'
			},
			coverCompany: {
				fontSize: 24,
				bold: true,
				color: '#374151'
			},
			coverSector: {
				fontSize: 16,
				color: '#6b7280'
			},
			coverDate: {
				fontSize: 12,
				color: '#9ca3af'
			},
			coverSubtitle: {
				fontSize: 18,
				bold: true,
				color: '#dc2626'
			},
			coverDescription: {
				fontSize: 14,
				color: '#6b7280'
			},
			headerTitle: {
				fontSize: 12,
				bold: true,
				color: '#1e40af'
			},
			headerDate: {
				fontSize: 9,
				color: '#6b7280'
			},
			footer: {
				fontSize: 7,
				color: '#6b7280'
			},
			sectionTitle: {
        fontSize: 14,
        bold: true,
        color: '#1e40af'
      },
      subSectionTitle: {
        fontSize: 12,
        bold: true,
        color: '#374151'
      },
			analysisSubTitle: {
				fontSize: 12,
				bold: true,
				color: '#374151'
			},
			analysisContent: {
				fontSize: 10,
				lineHeight: 1.2,
				color: '#374151'
			},
			bodyText: {
				fontSize: 10,
				lineHeight: 1.2,
				color: '#374151',
				alignment: 'justify'
			},
			tableHeader: {
				fontSize: 9,
				bold: true,
				color: '#374151',
				alignment: 'center'
			},
			tableCell: {
				fontSize: 8,
				color: '#374151'
			},
			tableCellCenter: {
				fontSize: 8,
				color: '#374151',
				alignment: 'center'
			},
			indexItem: {
				fontSize: 11,
				color: '#374151',
				lineHeight: 1.1
			},
			pocLabel: {
				fontSize: 10,
				bold: true,
				color: '#dc2626'
			},
			pocDescription: {
				fontSize: 10,
				lineHeight: 1.4,
				color: '#374151',
				alignment: 'justify'
			},
			indexPage: {
				fontSize: 11,
				color: '#6b7280',
				alignment: 'right',
				lineHeight: 1.3
			},
			legend: {
				fontSize: 9,
				color: '#6b7280'
			},
			cardTitle: {
				fontSize: 11,
				color: '#6b7280'
			},
			scoreValue: {
				fontSize: 20,
				bold: true,
				color: '#1e40af'
			},
			levelValue: {
				fontSize: 14,
				bold: true,
				color: '#374151'
			},
			cardSubtitle: {
				fontSize: 9,
				color: '#6b7280'
			},
			levelNumber: {
				fontSize: 14,
				bold: true
			},
			levelTitle: {
				fontSize: 12,
				bold: true
			},
			levelScore: {
				fontSize: 10,
				color: '#374151'
			}
		}
	};

	const fileName = `Relatorio-Maturidade-TI-${clonedCompanyInfo.name.replace(/\s+/g, '-')}-${new Date().toISOString().split('T')[0]}.pdf`;

	try {
		// Validar docDefinition antes de criar o PDF
		if (!docDefinition || !docDefinition.content) {
			throw new Error('Definição do documento PDF inválida');
		}

		// Criar uma cópia profunda do docDefinition para garantir isolamento
		const isolatedDocDefinition = JSON.parse(JSON.stringify(docDefinition));

		// Executar geração do PDF em um contexto isolado
		setTimeout(() => {
			try {
				const pdfDocGenerator = pdfMake.createPdf(isolatedDocDefinition, tableLayouts);
				
				// Usar um método mais seguro para download
				if (pdfDocGenerator && typeof pdfDocGenerator.download === 'function') {
					pdfDocGenerator.download(fileName);
				} else {
					throw new Error('Método de download do PDF não disponível');
				}
			} catch (innerError) {
				console.error('Erro interno ao gerar PDF:', innerError);
				alert('Erro ao gerar o PDF. Por favor, tente novamente.');
			}
		}, 0);
	} catch (error) {
		console.error('Erro ao gerar PDF:', error);
		// Re-throw com mensagem mais específica
		if (error instanceof Error) {
			throw new Error(`Falha ao gerar o relatório PDF: ${error.message}`);
		} else {
			throw new Error('Falha ao gerar o relatório PDF: Erro desconhecido');
		}
	}
};
