import React from 'react';
import { Shield, History, PhoneCall, Radio } from 'lucide-react';

interface HeaderProps {
  onOpenHistory: () => void;
  onOpenEmergencyCall: () => void;
  historyCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenHistory,
  onOpenEmergencyCall,
  historyCount,
}) => {
  return (
    <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-xl border-b border-slate-200 px-4 py-3 shadow-xs">
      <div className="max-w-md mx-auto flex items-center justify-between">
        {/* Brand identity */}
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600 shadow-xs">
            <Shield className="w-4.5 h-4.5 text-amber-600" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-base font-bold tracking-tight text-slate-900 font-sans">
                AutoCheck <span className="text-amber-600 font-semibold">AI</span>
              </span>
              <span className="flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-emerald-50 border border-emerald-200 text-emerald-700 text-[10px] font-semibold tracking-wide">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                24h Ativo
              </span>
            </div>
            <p className="text-[11px] text-slate-500 tracking-normal font-normal">
              Central de Assistência & Socorro Automotivo
            </p>
          </div>
        </div>

        {/* Right header actions */}
        <div className="flex items-center gap-2">
          <button
            id="btn-emergency-hotline"
            onClick={onOpenEmergencyCall}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 active:scale-95 transition-all text-xs font-semibold"
            title="Telefones de Emergência (SAMU / Bombeiros)"
          >
            <PhoneCall className="w-3.5 h-3.5 text-red-600" />
            <span className="text-[11px] font-bold">192 / 193</span>
          </button>

          <button
            id="btn-view-history"
            onClick={onOpenHistory}
            className="relative p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 active:scale-95 transition-all"
            title="Histórico de Análises"
            aria-label="Abrir histórico de batidas"
          >
            <History className="w-4 h-4" />
            {historyCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-amber-500 text-slate-950 text-[10px] font-bold flex items-center justify-center shadow-xs">
                {historyCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

