import React from 'react';
import { MapPin, RefreshCw, Edit3, Navigation } from 'lucide-react';
import { UserLocation } from '../types';

interface LocationBarProps {
  location: UserLocation;
  isDetecting: boolean;
  onRefreshLocation: () => void;
  onOpenManualModal: () => void;
  onRequestPermission: () => void;
}

export const LocationBar: React.FC<LocationBarProps> = ({
  location,
  isDetecting,
  onRefreshLocation,
  onOpenManualModal,
  onRequestPermission,
}) => {
  const isGpsActive = location.permissionStatus === 'granted' && location.isAutoDetected;
  const isDenied = location.permissionStatus === 'denied';

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-3.5 shadow-xs space-y-2">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          {isGpsActive ? (
            <div className="flex items-center gap-1.5">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-[10px] uppercase tracking-wider text-emerald-700 font-semibold">
                GPS Ativo • Alta Precisão
              </span>
            </div>
          ) : isDenied ? (
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-500"></span>
              <span className="text-[10px] uppercase tracking-wider text-amber-700 font-semibold">
                Localização Manual
              </span>
            </div>
          ) : (
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-slate-400"></span>
              <span className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold">
                Localização Aproximada
              </span>
            </div>
          )}
        </div>

        <div className="flex items-center gap-1">
          {isGpsActive && (
            <button
              id="btn-refresh-location"
              onClick={onRefreshLocation}
              disabled={isDetecting}
              className="px-2 py-1 text-slate-500 hover:text-slate-800 rounded-lg hover:bg-slate-100 transition-colors flex items-center gap-1 text-[11px] font-medium"
              title="Atualizar posição GPS"
            >
              <RefreshCw className={`w-3 h-3 ${isDetecting ? 'animate-spin text-amber-600' : ''}`} />
              <span>Atualizar</span>
            </button>
          )}

          {isDenied && (
            <button
              id="btn-switch-to-gps"
              onClick={onRequestPermission}
              className="px-2 py-1 bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 rounded-lg text-[10px] font-semibold flex items-center gap-1 transition-colors"
              title="Autorizar GPS nativo"
            >
              <Navigation className="w-3 h-3" />
              <span>Ativar GPS</span>
            </button>
          )}

          <button
            id="btn-edit-location"
            onClick={onOpenManualModal}
            className="p-1 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors"
            title="Alterar endereço ou cidade"
          >
            <Edit3 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <div className="flex items-start gap-2.5">
        <MapPin className={`w-4 h-4 shrink-0 mt-0.5 ${isGpsActive ? 'text-emerald-600' : 'text-amber-600'}`} />
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-slate-900 truncate">
            {location.addressName}
          </p>
          <div className="flex items-center gap-2 text-[11px] text-slate-500 mt-0.5">
            {location.cityState && <span>{location.cityState}</span>}
            <span className="text-slate-300">•</span>
            <span className={isGpsActive ? 'text-slate-600 font-medium' : 'text-slate-500'}>
              {isGpsActive ? 'Raio local automático' : 'Busca por aproximação'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
