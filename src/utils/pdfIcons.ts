// Mapeamento de ícones profissionais para PDF usando caracteres super básicos
export const pdfIcons = {
  // Ícones principais usando apenas caracteres ASCII básicos universais
  chart: '*',         // Para 📊 (relatórios, gráficos)
  document: '-',      // Para 📋 (documentos, índices)  
  target: 'o',        // Para 🎯 (objetivos, metas)
  warning: '!',       // Para ⚠️ (avisos, riscos)
  search: '?',        // Para 🔍 (análise, pesquisa)
  roadmap: '>',       // Para 🗺️ (roadmap, direção)
  business: '$',      // Para 👔 (executivo, negócios)
  contact: '@',       // Para 📞 (contato, suporte)
  edit: '*',          // Para 📝 (edição, descrição)
  feature: '+',       // Para ✨ (características, recursos)
  
  // Ícones alternativos mais profissionais
  analytics: '#',     // Analytics/métricas
  process: '&',       // Processos
  governance: '%',    // Governança
  strategy: '^',      // Strategy
  technology: '~',    // Tecnologia
  security: '|',      // Segurança
  quality: '=',       // Qualidade
  innovation: 'i',    // Inovação
  
  // Separadores visuais
  separator: '---',
  bullet: '> ',
  checkmark: 'v',
  cross: 'x'
};

// Função para obter ícone com fallback
export const getIcon = (iconName: keyof typeof pdfIcons): string => {
  return pdfIcons[iconName] || '■';
};

// Mapeamento de cores por contexto
export const iconColors = {
  primary: '#1e40af',     // Azul principal
  secondary: '#374151',   // Cinza escuro
  success: '#16a34a',     // Verde
  warning: '#ca8a04',     // Amarelo/dourado
  danger: '#dc2626',      // Vermelho
  info: '#2563eb'         // Azul informativo
};

// Estilos específicos para títulos com ícones
export const iconTitleStyles = {
  mainTitle: {
    fontSize: 18,
    bold: true,
    color: iconColors.primary,
    margin: [0, 0, 0, 10] as [number, number, number, number]
  },
  sectionTitle: {
    fontSize: 14,
    bold: true,
    color: iconColors.primary,
    margin: [0, 0, 0, 8] as [number, number, number, number]
  },
  subTitle: {
    fontSize: 12,
    bold: true,
    color: iconColors.secondary,
    margin: [0, 0, 0, 6] as [number, number, number, number]
  },
  warningTitle: {
    fontSize: 12,
    bold: true,
    color: iconColors.danger,
    margin: [0, 0, 0, 6] as [number, number, number, number]
  }
};

// Helper para criar título com ícone
export const createIconTitle = (
  icon: keyof typeof pdfIcons, 
  text: string, 
  style: keyof typeof iconTitleStyles = 'sectionTitle'
) => {
  return {
    text: `${getIcon(icon)} ${text}`,
    style: iconTitleStyles[style]
  };
}; 