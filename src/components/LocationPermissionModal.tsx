import React from 'react';
import { MapPin, ShieldCheck, Compass, Navigation } from 'lucide-react';

interface LocationPermissionModalProps {
  isOpen: boolean;
  onRequestPermission: () => void;
  onDenyPermission: () => void;
}

export const LocationPermissionModal: React.FC<LocationPermissionModalProps> = ({
  isOpen,
  onRequestPermission,
  onDenyPermission,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="w-full max-w-sm bg-white border border-slate-200 rounded-3xl p-6 shadow-2xl space-y-5 text-center">
        {/* Animated icon indicator */}
        <div className="mx-auto w-16 h-16 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center relative">
          <span className="animate-ping absolute inline-flex h-10 w-10 rounded-full bg-amber-400 opacity-20"></span>
          <MapPin className="w-8 h-8 text-amber-600 animate-bounce" />
        </div>

        {/* Header and prompt text as specified */}
        <div className="space-y-2">
          <h3 className="text-xl font-bold text-slate-900 flex items-center justify-center gap-2">
            <span>📍</span> Permitir acesso à sua localização?
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed text-balance px-1">
            Usaremos sua localização para mostrar sua posição no mapa e encontrar mecânicos, borracheiros, eletricistas e serviços de guincho próximos.
          </p>
        </div>

        {/* Benefits badge */}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3 text-left space-y-1.5 text-[11px] text-slate-600">
          <div className="flex items-center gap-2 text-slate-800 font-semibold">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span>Usado somente com sua autorização</span>
          </div>
          <div className="flex items-center gap-2">
            <Navigation className="w-3.5 h-3.5 text-amber-700 shrink-0" />
            <span>Cálculo automático da oficina mais rápida</span>
          </div>
          <div className="flex items-center gap-2">
            <Compass className="w-3.5 h-3.5 text-blue-600 shrink-0" />
            <span>Rotas em 1 toque até o socorrista</span>
          </div>
        </div>

        {/* Action Buttons as requested */}
        <div className="space-y-2.5 pt-1">
          <button
            id="btn-permitir-localizacao"
            onClick={onRequestPermission}
            className="w-full py-3.5 px-4 bg-amber-500 hover:bg-amber-400 active:scale-[0.98] text-slate-950 font-bold rounded-xl text-sm shadow-xs transition-all flex items-center justify-center gap-2"
          >
            <MapPin className="w-4 h-4 fill-slate-950" />
            <span>Permitir localização</span>
          </button>

          <button
            id="btn-agora-nao"
            onClick={onDenyPermission}
            className="w-full py-2.5 px-4 bg-slate-100 hover:bg-slate-200 active:scale-[0.98] text-slate-600 hover:text-slate-900 font-semibold rounded-xl text-xs border border-slate-200 transition-all"
          >
            Agora não
          </button>
        </div>
      </div>
    </div>
  );
};
