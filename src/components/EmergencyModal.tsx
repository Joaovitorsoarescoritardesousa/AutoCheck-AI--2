import React from 'react';
import { AlertCircle, X, ChevronRight, ShieldAlert, PhoneCall, Car, Disc, BatteryCharging, Zap, HelpCircle } from 'lucide-react';
import { EMERGENCY_PROBLEMS } from '../data/mockProviders';
import { EmergencyProblemId, ServiceCategory } from '../types';

interface EmergencyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProblem: (problemId: EmergencyProblemId, category: ServiceCategory) => void;
  onOpenCrashModal: () => void;
}

export const EmergencyModal: React.FC<EmergencyModalProps> = ({
  isOpen,
  onClose,
  onSelectProblem,
  onOpenCrashModal,
}) => {
  if (!isOpen) return null;

  const getProblemIcon = (id: string) => {
    switch (id) {
      case 'batida': return <Car className="w-5 h-5 text-red-400" />;
      case 'pneu': return <Disc className="w-5 h-5 text-amber-400" />;
      case 'nao_liga': return <BatteryCharging className="w-5 h-5 text-blue-400" />;
      case 'eletrico': return <Zap className="w-5 h-5 text-purple-400" />;
      default: return <HelpCircle className="w-5 h-5 text-slate-300" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="w-full max-w-lg bg-white border border-slate-200 rounded-t-3xl sm:rounded-3xl p-5 shadow-2xl max-h-[92vh] flex flex-col overflow-hidden"
        role="dialog"
        aria-modal="true"
        aria-labelledby="emergency-title"
      >
        {/* Header */}
        <div className="flex items-start justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-red-50 text-red-600 border border-red-200 flex items-center justify-center font-bold">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-semibold uppercase tracking-wider text-red-700">
                Atendimento Imediato
              </span>
              <h2 id="emergency-title" className="text-lg font-bold text-slate-900 leading-tight">
                Identificação do Ocorrido
              </h2>
            </div>
          </div>

          <button
            id="btn-close-emergency-modal"
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors"
            aria-label="Fechar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-xs text-slate-500 py-2.5">
          Selecione a situação atual para localizarmos o socorro técnico adequado:
        </p>

        {/* Problems List */}
        <div className="space-y-2 overflow-y-auto pr-1 py-1">
          {EMERGENCY_PROBLEMS.map((problem) => (
            <button
              key={problem.id}
              id={`btn-emergency-${problem.id}`}
              onClick={() => {
                if (problem.id === 'batida') {
                  onClose();
                  onOpenCrashModal();
                } else {
                  onSelectProblem(problem.id, problem.recommendedCategory);
                }
              }}
              className="w-full group bg-slate-50 hover:bg-slate-100 border border-slate-200 hover:border-slate-300 rounded-2xl p-3 text-left flex items-center justify-between gap-3 active:scale-[0.99] transition-all shadow-xs"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="shrink-0 p-2.5 rounded-xl bg-white border border-slate-200 flex items-center justify-center">
                  {getProblemIcon(problem.id)}
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-semibold text-slate-900 group-hover:text-amber-700 transition-colors truncate">
                      {problem.label}
                    </h3>
                    <span className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-600 shrink-0">
                      {problem.categoryLabel}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 truncate mt-0.5">
                    {problem.subtitle}
                  </p>
                </div>
              </div>

              <div className="w-7 h-7 rounded-lg bg-white border border-slate-200 text-slate-400 group-hover:text-slate-700 flex items-center justify-center shrink-0 transition-colors">
                <ChevronRight className="w-4 h-4" />
              </div>
            </button>
          ))}
        </div>

        {/* Safety Hotline Note */}
        <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between gap-2 bg-red-50 p-2.5 rounded-xl border border-red-200">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
            <p className="text-xs text-red-900 font-medium">
              Vítimas ou risco de vida?
            </p>
          </div>
          <div className="flex gap-2">
            <a
              id="link-call-samu-emergency"
              href="tel:192"
              className="px-2.5 py-1 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors shadow-xs"
            >
              <PhoneCall className="w-3 h-3" /> SAMU (192)
            </a>
            <a
              id="link-call-bombeiros-emergency"
              href="tel:193"
              className="px-2.5 py-1 bg-red-700 hover:bg-red-800 text-white rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors shadow-xs"
            >
              193
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
