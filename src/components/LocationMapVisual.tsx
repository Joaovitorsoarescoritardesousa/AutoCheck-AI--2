import React, { useState } from 'react';
import { MapPin, Navigation, ExternalLink, Wrench, Disc, Zap, Truck } from 'lucide-react';
import { UserLocation, ServiceProvider, ServiceCategory } from '../types';

interface LocationMapVisualProps {
  location: UserLocation;
  providers: ServiceProvider[];
  onSelectCategory: (category: ServiceCategory) => void;
}

export const LocationMapVisual: React.FC<LocationMapVisualProps> = ({
  location,
  providers,
  onSelectCategory,
}) => {
  const [activeMarker, setActiveMarker] = useState<ServiceProvider | null>(null);

  // Group closest service for each main category with clean vector icons
  const categories: { cat: ServiceCategory; Icon: typeof Wrench; label: string }[] = [
    { cat: 'mecanico', Icon: Wrench, label: 'Mecânico' },
    { cat: 'borracheiro', Icon: Disc, label: 'Borracheiro' },
    { cat: 'eletricista', Icon: Zap, label: 'Eletricista' },
    { cat: 'guincho', Icon: Truck, label: 'Guincho' },
  ];

  // Find nearest provider for each category
  const nearestByCategory = categories.map(({ cat, Icon, label }) => {
    const found = providers.find((p) => p.category === cat);
    return {
      cat,
      Icon,
      label,
      distanceKm: found ? found.distanceKm : 1.5,
      providerName: found?.name || 'Serviço Próximo',
      isOpenNow: found ? found.isOpenNow : true,
    };
  });

  const getOpenMapUrl = () => {
    return `https://www.google.com/maps/search/auto+socorro+mecanico+guincho/@${location.lat},${location.lng},15z`;
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
      {/* Map visual stage (Stylized GPS radar view with interactive markers) */}
      <div className="relative h-44 sm:h-48 w-full bg-slate-100 overflow-hidden select-none border-b border-slate-200">
        {/* Radar radar grid pattern */}
        <div 
          className="absolute inset-0 opacity-40 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle at center, #f59e0b 1px, transparent 1px), linear-gradient(to right, #cbd5e1 1px, transparent 1px), linear-gradient(to bottom, #cbd5e1 1px, transparent 1px)`,
            backgroundSize: '24px 24px, 24px 24px, 24px 24px',
          }}
        />

        {/* Pulse radius circles centered at user */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-56 h-56 rounded-full border border-slate-300 animate-ping opacity-30"></div>
          <div className="w-44 h-44 rounded-full border border-slate-300/80 absolute"></div>
          <div className="w-24 h-24 rounded-full border border-emerald-500/30 bg-emerald-500/10 absolute"></div>
        </div>

        {/* Map Header Overlay */}
        <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between pointer-events-auto z-20">
          <div className="bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-xl border border-slate-200 flex items-center gap-1.5 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span className="text-[10px] font-semibold text-slate-700 uppercase tracking-wider">
              {location.isAutoDetected ? 'Radar GPS Sincronizado' : 'Posição Definida'}
            </span>
          </div>

          <a
            id="btn-open-google-maps"
            href={getOpenMapUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white/95 hover:bg-white backdrop-blur-md px-2.5 py-1 rounded-xl border border-slate-200 text-[10px] font-medium text-slate-700 hover:text-amber-700 flex items-center gap-1 shadow-xs transition-colors"
          >
            <span>Google Maps</span>
            <ExternalLink className="w-3 h-3 text-slate-400" />
          </a>
        </div>

        {/* Center: User Marker */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-auto z-10">
          <div className="relative flex flex-col items-center -mt-2 cursor-default group">
            {/* Marker tooltip tag */}
            <div className="bg-white border border-slate-200 text-slate-800 px-2 py-0.5 rounded-full text-[10px] font-semibold shadow-xs flex items-center gap-1.5 whitespace-nowrap mb-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              <span>Sua Localização</span>
            </div>

            {/* Pin head with ripple */}
            <div className="relative">
              <div className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold shadow-xs">
                <Navigation className="w-3 h-3 fill-white rotate-45" />
              </div>
            </div>
          </div>
        </div>

        {/* Scattered Provider Markers around center */}
        {providers.slice(0, 4).map((p, idx) => {
          const positions = [
            { top: '24%', left: '20%' },
            { top: '26%', right: '16%' },
            { bottom: '22%', left: '24%' },
            { bottom: '24%', right: '20%' },
          ];
          const pos = positions[idx % positions.length];
          const isSelected = activeMarker?.id === p.id;

          const getCategoryIcon = (cat: string) => {
            switch (cat) {
              case 'mecanico': return <Wrench className="w-3 h-3" />;
              case 'borracheiro': return <Disc className="w-3 h-3" />;
              case 'eletricista': return <Zap className="w-3 h-3" />;
              default: return <Truck className="w-3 h-3" />;
            }
          };

          return (
            <div
              key={p.id}
              style={pos}
              className="absolute z-10 cursor-pointer pointer-events-auto"
              onClick={() => setActiveMarker(isSelected ? null : p)}
            >
              <div
                className={`px-2 py-1 rounded-xl border flex items-center gap-1.5 text-[10px] font-semibold transition-all shadow-xs ${
                  isSelected
                    ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-sm scale-105'
                    : 'bg-white/95 text-slate-800 border-slate-200 hover:border-slate-300'
                }`}
              >
                <span>{getCategoryIcon(p.category)}</span>
                <span>{p.distanceKm} km</span>
              </div>
            </div>
          );
        })}

        {/* Floating details when a map pin is tapped */}
        {activeMarker && (
          <div className="absolute bottom-2 left-2 right-2 z-30 bg-white/95 border border-slate-200 p-2.5 rounded-xl text-xs flex items-center justify-between gap-2 shadow-lg animate-in fade-in">
            <div className="truncate">
              <span className="text-[10px] text-amber-700 font-semibold block truncate">
                {activeMarker.categoryLabel}
              </span>
              <p className="font-semibold text-slate-900 truncate text-xs">
                {activeMarker.name}
              </p>
              <p className="text-[10px] text-slate-500">
                {activeMarker.distanceKm} km • Chegada em ~{activeMarker.estimatedArrivalMin} min
              </p>
            </div>
            <button
              onClick={() => onSelectCategory(activeMarker.category)}
              className="px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 text-[11px] font-bold rounded-lg shrink-0 transition-colors"
            >
              Ver perfil
            </button>
          </div>
        )}
      </div>

      {/* Structured Services in Radius */}
      <div className="p-3.5 space-y-3 bg-white">
        <div className="flex items-center justify-between pb-2 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-emerald-600" />
              <span className="text-xs font-semibold text-slate-900">Localização Confirmada</span>
            </div>
            <p className="text-[11px] text-slate-500 truncate max-w-[280px] mt-0.5">
              {location.addressName} {location.cityState ? `• ${location.cityState}` : ''}
            </p>
          </div>

          <div className="text-right shrink-0">
            <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
              {location.isAutoDetected ? 'GPS Conectado' : 'Manual'}
            </span>
          </div>
        </div>

        {/* Quick Nearest Services Row */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">
              Profissionais mais próximos:
            </span>
            <span className="text-[10px] text-slate-400 font-medium">Atendimento rápido</span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {nearestByCategory.map((item) => {
              const ServiceIcon = item.Icon;
              return (
                <button
                  key={item.cat}
                  id={`btn-nearest-${item.cat}`}
                  onClick={() => onSelectCategory(item.cat)}
                  className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-200 hover:bg-slate-100 active:scale-[0.98] transition-all text-left group"
                >
                  <div className="flex items-center gap-2 truncate">
                    <div className="w-7 h-7 rounded-lg bg-white border border-slate-200 text-slate-700 group-hover:text-amber-700 flex items-center justify-center shrink-0 transition-colors">
                      <ServiceIcon className="w-3.5 h-3.5" />
                    </div>
                    <div className="truncate">
                      <span className="text-xs font-semibold text-slate-900 group-hover:text-amber-700 block truncate">
                        {item.label}
                      </span>
                      <span className="text-[10px] text-slate-500">
                        {item.distanceKm} km
                      </span>
                    </div>
                  </div>
                  <Navigation className="w-3 h-3 text-slate-400 group-hover:text-amber-700 shrink-0 ml-1 transition-colors" />
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
