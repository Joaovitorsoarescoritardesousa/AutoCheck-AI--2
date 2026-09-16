import React from 'react';
import { Wrench, Disc, Zap, Truck, Camera, ArrowRight } from 'lucide-react';
import { ServiceCategory } from '../types';

interface HomeHeroGridProps {
  onSelectCategory: (category: ServiceCategory) => void;
  onOpenCrashModal: () => void;
  onSelectEmergencyMode: (category?: ServiceCategory) => void;
}

export const HomeHeroGrid: React.FC<HomeHeroGridProps> = ({
  onSelectCategory,
  onOpenCrashModal,
}) => {
  return (
    <div className="space-y-3.5">
      {/* 4 Main Service Categories */}
      <div className="grid grid-cols-2 gap-3">
        {/* 1. Mecânico */}
        <button
          id="btn-category-mecanico"
          onClick={() => onSelectCategory('mecanico')}
          className="group relative bg-white hover:bg-slate-50/90 border border-slate-200 hover:border-slate-300 rounded-2xl p-4 text-left shadow-xs active:scale-[0.98] transition-all flex flex-col justify-between min-h-[132px]"
        >
          <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 text-slate-700 flex items-center justify-center mb-3 group-hover:text-amber-700 group-hover:bg-amber-50 group-hover:border-amber-200 transition-colors">
            <Wrench className="w-5 h-5 stroke-[2]" />
          </div>
          <div>
            <span className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold block mb-0.5">
              Oficina Mecânica
            </span>
            <h2 className="text-base font-bold text-slate-900 leading-snug">
              Mecânico
            </h2>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Motor, suspensão e freios
            </p>
          </div>
        </button>

        {/* 2. Borracheiro */}
        <button
          id="btn-category-borracheiro"
          onClick={() => onSelectCategory('borracheiro')}
          className="group relative bg-white hover:bg-slate-50/90 border border-slate-200 hover:border-slate-300 rounded-2xl p-4 text-left shadow-xs active:scale-[0.98] transition-all flex flex-col justify-between min-h-[132px]"
        >
          <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 text-slate-700 flex items-center justify-center mb-3 group-hover:text-amber-700 group-hover:bg-amber-50 group-hover:border-amber-200 transition-colors">
            <Disc className="w-5 h-5 stroke-[2]" />
          </div>
          <div>
            <span className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold block mb-0.5">
              Pneus & Rodas
            </span>
            <h2 className="text-base font-bold text-slate-900 leading-snug">
              Borracheiro
            </h2>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Reparo, troca e calibragem
            </p>
          </div>
        </button>

        {/* 3. Eletricista */}
        <button
          id="btn-category-eletricista"
          onClick={() => onSelectCategory('eletricista')}
          className="group relative bg-white hover:bg-slate-50/90 border border-slate-200 hover:border-slate-300 rounded-2xl p-4 text-left shadow-xs active:scale-[0.98] transition-all flex flex-col justify-between min-h-[132px]"
        >
          <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 text-slate-700 flex items-center justify-center mb-3 group-hover:text-amber-700 group-hover:bg-amber-50 group-hover:border-amber-200 transition-colors">
            <Zap className="w-5 h-5 stroke-[2]" />
          </div>
          <div>
            <span className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold block mb-0.5">
              Pane & Bateria
            </span>
            <h2 className="text-base font-bold text-slate-900 leading-snug">
              Auto Elétrica
            </h2>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Carga, motor de arranque
            </p>
          </div>
        </button>

        {/* 4. Guincho */}
        <button
          id="btn-category-guincho"
          onClick={() => onSelectCategory('guincho')}
          className="group relative bg-white hover:bg-slate-50/90 border border-slate-200 hover:border-amber-300 rounded-2xl p-4 text-left shadow-xs active:scale-[0.98] transition-all flex flex-col justify-between min-h-[132px]"
        >
          <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 text-amber-700 flex items-center justify-center mb-3 group-hover:bg-amber-500 group-hover:text-slate-950 transition-colors">
            <Truck className="w-5 h-5 stroke-[2]" />
          </div>
          <div>
            <span className="text-[10px] uppercase tracking-wider text-amber-700 font-semibold block mb-0.5">
              Reboque 24h
            </span>
            <h2 className="text-base font-bold text-slate-900 leading-snug">
              Guincho
            </h2>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Plataforma e socorro rápido
            </p>
          </div>
        </button>
      </div>

      {/* 5th Highlighted Feature: ANÁLISE DA BATIDA */}
      <button
        id="btn-analisar-batida"
        onClick={onOpenCrashModal}
        className="w-full relative overflow-hidden group bg-white hover:bg-slate-50/90 text-slate-900 rounded-2xl p-4 sm:p-5 border border-slate-200 hover:border-slate-300 shadow-xs active:scale-[0.99] transition-all text-left"
      >
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-amber-50 border border-amber-200 text-amber-700 flex items-center justify-center shrink-0 group-hover:border-amber-400 transition-colors">
              <Camera className="w-5 h-5 stroke-[2]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm sm:text-base font-bold text-slate-900 tracking-tight">
                  Análise da Batida
                </span>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-amber-100 text-amber-800 border border-amber-300/60 tracking-wider">
                  IA
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Avaliação computacional de danos, estimativa de custos e encaminhamento
              </p>
            </div>
          </div>
          <div className="w-8 h-8 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center shrink-0 text-slate-500 group-hover:text-amber-700 group-hover:border-amber-300 transition-colors">
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>
      </button>
    </div>
  );
};
