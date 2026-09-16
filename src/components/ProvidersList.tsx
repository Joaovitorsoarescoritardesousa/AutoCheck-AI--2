import React, { useState } from 'react';
import {
  Phone,
  Navigation,
  MessageCircle,
  Star,
  Clock,
  MapPin,
  ChevronLeft,
  CheckCircle2,
  Filter,
} from 'lucide-react';
import { ServiceCategory, ServiceProvider } from '../types';

interface ProvidersListProps {
  category: ServiceCategory | 'todos';
  providers: ServiceProvider[];
  userAddress: string;
  onBackToHome: () => void;
  onFilterChange: (cat: ServiceCategory | 'todos') => void;
}

const CATEGORY_NAMES: Record<ServiceCategory | 'todos', string> = {
  todos: 'Todos os Profissionais',
  mecanico: 'Mecânicos',
  borracheiro: 'Borracheiros',
  eletricista: 'Eletricistas',
  guincho: 'Guinchos & Reboques',
  funilaria: 'Funilaria & Pintura',
};

export const ProvidersList: React.FC<ProvidersListProps> = ({
  category,
  providers,
  userAddress,
  onBackToHome,
  onFilterChange,
}) => {
  const [selectedSort, setSelectedSort] = useState<'distancia' | 'avaliacao' | 'abertos'>('distancia');

  const filteredAndSortedProviders = [...providers].sort((a, b) => {
    if (selectedSort === 'abertos') {
      if (a.isOpenNow !== b.isOpenNow) return a.isOpenNow ? -1 : 1;
      return a.distanceKm - b.distanceKm;
    }
    if (selectedSort === 'avaliacao') {
      return b.rating - a.rating;
    }
    // Default: distance first, then open
    return a.distanceKm - b.distanceKm;
  });

  const getWhatsappUrl = (phone: string, providerName: string) => {
    const text = encodeURIComponent(
      `Olá ${providerName}! Encontrei vocês no AutoCheck AI. Preciso de socorro com meu carro próximo a: ${userAddress}. Vocês estão atendendo agora?`
    );
    return `https://wa.me/${phone}?text=${text}`;
  };

  const getRouteUrl = (lat: number, lng: number, providerName: string) => {
    return `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}&destination_place_id=${encodeURIComponent(
      providerName
    )}`;
  };

  return (
    <div className="space-y-4 pb-20">
      {/* Top Bar with Back Button */}
      <div className="flex items-center justify-between gap-2">
        <button
          id="btn-back-to-home"
          onClick={onBackToHome}
          className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 hover:text-slate-900 px-2.5 py-1.5 rounded-xl bg-white border border-slate-200 hover:bg-slate-100 transition-colors shadow-xs"
        >
          <ChevronLeft className="w-3.5 h-3.5" />
          <span>Voltar</span>
        </button>

        <span className="text-[11px] text-amber-800 font-semibold px-2.5 py-1 rounded-lg bg-amber-50 border border-amber-200">
          {filteredAndSortedProviders.length} profissionais na região
        </span>
      </div>

      {/* Category Pills Slider */}
      <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none no-scrollbar">
        {(['todos', 'guincho', 'borracheiro', 'mecanico', 'eletricista', 'funilaria'] as const).map((cat) => (
          <button
            key={cat}
            id={`filter-pill-${cat}`}
            onClick={() => onFilterChange(cat)}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
              category === cat
                ? 'bg-amber-500 text-slate-950 font-bold shadow-xs'
                : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
            }`}
          >
            {CATEGORY_NAMES[cat]}
          </button>
        ))}
      </div>

      {/* Title & Sorting Bar */}
      <div className="flex items-center justify-between gap-2 pt-1">
        <div>
          <h2 className="text-lg font-bold text-slate-900 leading-tight">
            {CATEGORY_NAMES[category]}
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Ordenados por tempo de deslocamento estimado
          </p>
        </div>

        <div className="flex items-center gap-1 bg-slate-100 border border-slate-200 p-1 rounded-xl text-[11px] font-medium">
          <button
            onClick={() => setSelectedSort('distancia')}
            className={`px-2.5 py-1 rounded-lg transition-colors ${
              selectedSort === 'distancia' ? 'bg-white text-slate-900 shadow-xs font-semibold' : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            Distância
          </button>
          <button
            onClick={() => setSelectedSort('abertos')}
            className={`px-2.5 py-1 rounded-lg transition-colors ${
              selectedSort === 'abertos' ? 'bg-white text-slate-900 shadow-xs font-semibold' : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            Abertos
          </button>
        </div>
      </div>

      {/* Results List */}
      <div className="space-y-3">
        {filteredAndSortedProviders.map((provider) => (
          <div
            key={provider.id}
            id={`provider-card-${provider.id}`}
            className="bg-white border border-slate-200 hover:border-slate-300 rounded-2xl p-4 shadow-xs transition-all"
          >
            {/* Header: Name, Distance & Status */}
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <div className="flex items-center gap-2 mb-1.5">
                  {provider.badge && (
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-amber-50 text-amber-800 border border-amber-200">
                      {provider.badge}
                    </span>
                  )}
                  {provider.isOpenNow ? (
                    <span className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                      <span>Disponível Agora</span>
                    </span>
                  ) : (
                    <span className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-slate-100 text-slate-500">
                      Fora de horário
                    </span>
                  )}
                </div>

                <h3 className="text-base font-semibold text-slate-900 leading-snug">
                  {provider.name}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  {provider.specialty}
                </p>
              </div>

              {/* Distance block */}
              <div className="text-right shrink-0 bg-slate-50 px-2.5 py-1.5 rounded-xl border border-slate-200">
                <div className="flex items-center justify-end gap-1 text-xs font-semibold text-amber-800">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{provider.distanceKm < 1 ? `${Math.round(provider.distanceKm * 1000)} m` : `${provider.distanceKm} km`}</span>
                </div>
                <div className="flex items-center justify-end gap-1 text-[10px] text-slate-500 mt-0.5">
                  <Clock className="w-3 h-3" />
                  <span>~{provider.estimatedArrivalMin} min</span>
                </div>
              </div>
            </div>

            {/* Info Row: Rating and Address */}
            <div className="flex items-center gap-3 text-xs text-slate-600 mt-2.5 pt-2 border-t border-slate-100">
              <div className="flex items-center gap-1 font-semibold text-amber-700">
                <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                <span>{provider.rating.toFixed(1)}</span>
                <span className="text-[10px] text-slate-400 font-normal">
                  ({provider.reviewsCount} avaliações)
                </span>
              </div>
              <span className="text-slate-300">•</span>
              <div className="text-slate-500 truncate text-[11px]">
                {provider.hoursDescription}
              </div>
            </div>

            {/* Action Buttons: Ligar, Rota, WhatsApp */}
            <div className="grid grid-cols-3 gap-2 mt-3.5 pt-2 border-t border-slate-100">
              <a
                id={`btn-call-${provider.id}`}
                href={`tel:${provider.phone}`}
                className="bg-slate-100 hover:bg-slate-200 active:scale-[0.98] text-slate-900 font-semibold min-h-[44px] py-2.5 px-2 rounded-xl text-xs flex items-center justify-center gap-1.5 border border-slate-200 transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-slate-600 shrink-0" />
                <span>Ligar</span>
              </a>

              <a
                id={`btn-route-${provider.id}`}
                href={getRouteUrl(provider.lat, provider.lng, provider.name)}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-slate-100 hover:bg-slate-200 active:scale-[0.98] text-slate-900 font-semibold min-h-[44px] py-2.5 px-2 rounded-xl text-xs flex items-center justify-center gap-1.5 border border-slate-200 transition-colors"
              >
                <Navigation className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                <span>Rota</span>
              </a>

              <a
                id={`btn-whatsapp-${provider.id}`}
                href={getWhatsappUrl(provider.whatsapp, provider.name)}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-emerald-600 hover:bg-emerald-700 active:scale-[0.98] text-white font-semibold min-h-[44px] py-2.5 px-2 rounded-xl text-xs flex items-center justify-center gap-1.5 transition-colors shadow-xs"
              >
                <MessageCircle className="w-3.5 h-3.5 fill-white shrink-0" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        ))}

        {filteredAndSortedProviders.length === 0 && (
          <div className="text-center py-10 bg-white border border-slate-200 rounded-2xl p-6">
            <p className="text-sm text-slate-700 font-bold">
              Nenhum profissional encontrado nesta categoria no raio atual.
            </p>
            <button
              onClick={() => onFilterChange('todos')}
              className="mt-3 px-4 py-2 bg-amber-500 text-slate-950 text-xs font-bold rounded-xl hover:bg-amber-400 transition-colors"
            >
              Ver todos os socorristas
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
