import React from 'react';
import { X } from 'lucide-react';
import { Practice } from '../data/assessmentData';

interface LevelDetailsModalProps {
  practice: Practice | null;
  onClose: () => void;
}

export const LevelDetailsModal: React.FC<LevelDetailsModalProps> = ({ practice, onClose }) => {
  if (!practice) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4 z-50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white p-6 border-b border-gray-200 rounded-t-2xl">
          <div className="flex justify-between items-center">
            <h3 className="text-2xl font-bold text-gray-900">{practice.name}</h3>
            <button 
              onClick={onClose} 
              className="text-gray-500 hover:text-gray-800 p-2 hover:bg-gray-100 rounded-full transition-all duration-200"
            >
              <X size={24} />
            </button>
          </div>
        </div>
        
        <div className="p-6">
          <h4 className="text-xl font-semibold text-gray-800 mb-6">Níveis de Maturidade</h4>
          <div className="space-y-6">
            {practice.levels.map((desc, index) => (
              <div key={index} className="flex items-start group">
                <div className={`flex-shrink-0 w-12 h-12 rounded-full text-white text-lg font-bold flex items-center justify-center mr-4 shadow-lg ${
                  index === 0 ? 'bg-red-500' :
                  index === 1 ? 'bg-orange-500' :
                  index === 2 ? 'bg-yellow-500' :
                  index === 3 ? 'bg-blue-500' : 'bg-green-500'
                }`}>
                  {index + 1}
                </div>
                <div className="flex-1 bg-gray-50 p-4 rounded-xl group-hover:bg-gray-100 transition-colors duration-200">
                  <p className="text-gray-700 leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="p-6 bg-gray-50 border-t border-gray-200 rounded-b-2xl">
          <div className="flex justify-end">
            <button 
              onClick={onClose} 
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-3 px-6 rounded-lg hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              Fechar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};