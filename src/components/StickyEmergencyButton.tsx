import React, { useState } from 'react';
import { AlertCircle, Wrench, Disc, Zap, Truck, X, PhoneCall } from 'lucide-react';
import { ServiceCategory } from '../types';

interface StickyEmergencyButtonProps {
  onSelectCategory: (category: ServiceCategory) => void;
}

export const StickyEmergencyButton: React.FC<StickyEmergencyButtonProps> = ({
  onSelectCategory,
}) => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const handlePick = (category: ServiceCategory) => {
    setIsSheetOpen(false);
    onSelectCategory(category);
  };

  return (
    <>
      {/* Floating Bottom Emergency Action */}
      <div className="fixed bottom-4 left-0 right-0 z-40 px-4 pointer-events-none">
        <div className="max-w-md mx-auto pointer-events-auto">
          <button
            id="btn-sticky-emergency"
            onClick={() => setIsSheetOpen(true)}
            className="w-full bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-semibold text-sm py-3 px-4 rounded-xl shadow-lg border border-red-500 flex items-center justify-center gap-2 active:scale-[0.98] transition-all"
            aria-label="Acionar socorro imediato"
          >
            <AlertCircle className="w-4 h-4 text-white" />
            <span className="tracking-wide uppercase text-xs font-bold">
              Acionar Socorro de Emergência
            </span>
          </button>
        </div>
      </div>

      {/* Quick Choice Drawer */}
      {isSheetOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-slate-900/40 backdrop-blur-xs p-0 sm:p-4">
          <div className="w-full max-w-md bg-white border border-slate-200 rounded-t-3xl sm:rounded-3xl p-5 shadow-2xl animate-in slide-in-from-bottom duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-red-50 text-red-600 border border-red-200 flex items-center justify-center font-bold text-xs">
                  SOS
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 leading-tight">
                    Qual socorro você necessita?
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Selecione para localizar profissionais de prontidão
                  </p>
                </div>
              </div>
              <button
                id="btn-close-sticky-sheet"
                onClick={() => setIsSheetOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2.5 mt-4">
              <button
                id="btn-quick-guincho"
                onClick={() => handlePick('guincho')}
                className="p-3.5 rounded-xl bg-red-50/60 border border-red-200 hover:border-red-300 text-left transition-all active:scale-98 group"
              >
                <div className="w-8 h-8 rounded-lg bg-red-100 text-red-600 flex items-center justify-center mb-2.5">
                  <Truck className="w-4.5 h-4.5" />
                </div>
                <h4 className="text-sm font-bold text-slate-900 group-hover:text-red-700">Guincho 24h</h4>
                <p className="text-[11px] text-slate-500 mt-0.5">Reboque imediato</p>
              </button>

              <button
                id="btn-quick-borracheiro"
                onClick={() => handlePick('borracheiro')}
                className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 hover:border-slate-300 hover:bg-slate-100 text-left transition-all active:scale-98 group"
              >
                <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 text-slate-700 group-hover:text-amber-700 flex items-center justify-center mb-2.5">
                  <Disc className="w-4.5 h-4.5" />
                </div>
                <h4 className="text-sm font-bold text-slate-900 group-hover:text-amber-700">Borracheiro</h4>
                <p className="text-[11px] text-slate-500 mt-0.5">Pneu e roda</p>
              </button>

              <button
                id="btn-quick-mecanico"
                onClick={() => handlePick('mecanico')}
                className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 hover:border-slate-300 hover:bg-slate-100 text-left transition-all active:scale-98 group"
              >
                <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 text-slate-700 group-hover:text-amber-700 flex items-center justify-center mb-2.5">
                  <Wrench className="w-4.5 h-4.5" />
                </div>
                <h4 className="text-sm font-bold text-slate-900 group-hover:text-amber-700">Mecânica</h4>
                <p className="text-[11px] text-slate-500 mt-0.5">Falha mecânica</p>
              </button>

              <button
                id="btn-quick-eletricista"
                onClick={() => handlePick('eletricista')}
                className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 hover:border-slate-300 hover:bg-slate-100 text-left transition-all active:scale-98 group"
              >
                <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 text-slate-700 group-hover:text-amber-700 flex items-center justify-center mb-2.5">
                  <Zap className="w-4.5 h-4.5" />
                </div>
                <h4 className="text-sm font-bold text-slate-900 group-hover:text-amber-700">Auto Elétrica</h4>
                <p className="text-[11px] text-slate-500 mt-0.5">Bateria e pane</p>
              </button>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span className="flex items-center gap-1.5">
                <PhoneCall className="w-3.5 h-3.5 text-slate-400" />
                <span>Urgência pública:</span>
              </span>
              <div className="flex gap-2.5 font-semibold text-xs">
                <a href="tel:192" className="text-red-600 hover:text-red-700">SAMU (192)</a>
                <span className="text-slate-300">•</span>
                <a href="tel:193" className="text-red-600 hover:text-red-700">Bombeiros (193)</a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
