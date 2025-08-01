import React from 'react';
import { Gift, Star, ArrowRight } from 'lucide-react';

export const POCBanner: React.FC = () => {
  return (
    <div className="bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 text-white py-3 px-4 shadow-lg">
      <div className="container mx-auto flex items-center justify-center text-center">
        <div className="flex items-center space-x-3">
          <Gift className="w-5 h-5 animate-bounce" />
          <span className="font-bold text-sm sm:text-base">
            🎯 Versão Demo: Experimente 6 práticas essenciais de ITIL v4
          </span>
          <div className="hidden sm:flex items-center space-x-2">
            <ArrowRight className="w-4 h-4" />
            <span className="text-sm">
              Versão completa com 34 práticas disponível
            </span>
            <Star className="w-4 h-4 text-yellow-300" />
          </div>
        </div>
      </div>
    </div>
  );
};