/// <reference types="vite/client" />

interface Html2PdfOptions {
  margin?: number | [number, number, number, number];
  filename?: string;
  image?: { type: string; quality: number };
  html2canvas?: { 
    scale: number; 
    useCORS: boolean; 
    letterRendering: boolean;
    allowTaint: boolean;
    backgroundColor: string | null;
    scrollX: number;
    scrollY: number;
  };
  jsPDF?: { 
    unit: string; 
    format: string; 
    orientation: string;
    hotfixes: string[];
  };
  pagebreak?: { mode: string[] };
}

declare module 'html2pdf.js' {
  interface Html2Pdf {
    from(element: HTMLElement): Html2Pdf;
    set(options: Html2PdfOptions): Html2Pdf;
    save(): Promise<void>;
    output(type: string): Promise<any>;
    outputPdf(): Promise<any>;
    outputImg(): Promise<string>;
    then(callback: (pdf: any) => void): Html2Pdf;
    catch(callback: (error: any) => void): Html2Pdf;
  }

  function html2pdf(): Html2Pdf;
  function html2pdf(element: HTMLElement, options?: Html2PdfOptions): Html2Pdf;

  export = html2pdf;
}
