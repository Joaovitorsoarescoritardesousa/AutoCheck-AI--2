import React from 'react';
import { Phone, ShieldAlert, X, AlertTriangle, HeartPulse, Flame, Car } from 'lucide-react';

interface EmergencyNumbersModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EmergencyNumbersModal: React.FC<EmergencyNumbersModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  const hotlines = [
    {
      number: '192',
      name: 'SAMU',
      description: 'Ambulância e socorro médico com urgência',
      icon: HeartPulse,
      color: 'bg-red-600',
    },
    {
      number: '193',
      name: 'Corpo de Bombeiros',
      description: 'Resgate de vítimas presas em ferragens e incêndio',
      icon: Flame,
      color: 'bg-amber-600',
    },
    {
      number: '190',
      name: 'Polícia Militar',
      description: 'Segurança, ocorrência policial e desacordo em batida',
      icon: ShieldAlert,
      color: 'bg-blue-600',
    },
    {
      number: '191',
      name: 'Polícia Rodoviária Federal (PRF)',
      description: 'Acidentes e socorro em rodovias federais',
      icon: Car,
      color: 'bg-emerald-600',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="w-full max-w-sm bg-white border border-slate-200 rounded-3xl p-5 shadow-2xl">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-red-600 text-white flex items-center justify-center font-bold">
              <Phone className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Telefones de Emergência
              </h3>
              <p className="text-[11px] text-slate-500">
                Ligações gratuitas de qualquer celular
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-2.5 my-4">
          {hotlines.map((item) => {
            const Icon = item.icon;
            return (
              <a
                key={item.number}
                href={`tel:${item.number}`}
                className="w-full flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-200 hover:border-red-300 hover:bg-slate-100/80 active:scale-95 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl ${item.color} text-white flex items-center justify-center shrink-0 shadow-xs`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="text-left">
                    <div className="flex items-center gap-1.5">
                      <span className="text-lg font-bold text-slate-900 group-hover:text-red-600 transition-colors">
                        {item.number}
                      </span>
                      <span className="text-xs font-semibold text-slate-700">
                        {item.name}
                      </span>
                    </div>
                    <p className="text-[10px] text-slate-500 line-clamp-1">
                      {item.description}
                    </p>
                  </div>
                </div>

                <div className="px-2.5 py-1.5 rounded-lg bg-red-600 hover:bg-red-700 text-white text-[11px] font-semibold shrink-0 transition-colors shadow-xs">
                  Ligar
                </div>
              </a>
            );
          })}
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-xl p-2.5 text-[11px] text-amber-900 flex items-start gap-2">
          <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <span>
            Se houver feridos, não mova as pessoas até a chegada da equipe de resgate.
          </span>
        </div>
      </div>
    </div>
  );
};
