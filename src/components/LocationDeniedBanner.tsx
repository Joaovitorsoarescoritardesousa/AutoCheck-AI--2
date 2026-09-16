import React from 'react';
import { ShieldAlert, MapPin, Edit3, Navigation } from 'lucide-react';

interface LocationDeniedBannerProps {
  onRequestPermission: () => void;
  onOpenManualModal: () => void;
}

export const LocationDeniedBanner: React.FC<LocationDeniedBannerProps> = ({
  onRequestPermission,
  onOpenManualModal,
}) => {
  return (
    <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-4 shadow-xs space-y-3.5 animate-in fade-in duration-200">
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 border border-amber-200 flex items-center justify-center shrink-0 mt-0.5">
          <ShieldAlert className="w-5 h-5" />
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
            <span>📍</span> Localização não autorizada
          </h3>
          <p className="text-xs text-slate-600 mt-1 leading-relaxed">
            Para encontrar serviços próximos, permita o acesso à sua localização.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 border-t border-amber-200/80">
        {/* Main button: Permitir localização */}
        <button
          id="btn-permitir-localizacao-banner"
          onClick={onRequestPermission}
          className="w-full py-2.5 px-3 bg-amber-500 hover:bg-amber-400 active:scale-[0.98] text-slate-950 font-bold rounded-xl text-xs shadow-xs flex items-center justify-center gap-1.5 transition-all"
        >
          <MapPin className="w-3.5 h-3.5 fill-slate-950" />
          <span>Permitir localização</span>
        </button>

        {/* Alternative: Informar localização manualmente */}
        <button
          id="btn-informar-manualmente-banner"
          onClick={onOpenManualModal}
          className="w-full py-2.5 px-3 bg-white hover:bg-slate-100 active:scale-[0.98] text-slate-800 font-bold rounded-xl text-xs border border-slate-200 shadow-xs flex items-center justify-center gap-1.5 transition-all"
        >
          <Edit3 className="w-3.5 h-3.5 text-amber-700" />
          <span>Informar localização manualmente</span>
        </button>
      </div>
    </div>
  );
};
