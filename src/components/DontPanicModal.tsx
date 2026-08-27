import React, { useState } from 'react';
import { X, ShieldAlert, Coffee, Sparkles, Heart, Smile } from 'lucide-react';
import { soundManager } from '../utils/audio';

interface DontPanicModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const COMFORT_MESSAGES = [
  "Pas de panique ! Même si votre script Python renvoie une erreur à la ligne 42, l'univers continue de tourner.",
  "Respirez calmement. Prenez votre serviette, enveloppez-vous dedans et buvez une gorgée de thé.",
  "Rappelez-vous : Pensée Profonde a mis 7,5 millions d'années pour calculer 42. Vous avez le droit de prendre 5 minutes pour déboguer votre fonction.",
  "Les Vogons n'ont pas encore détruit la Terre. Vous avez largement le temps de réussir votre bac NSI !"
];

export const DontPanicModal: React.FC<DontPanicModalProps> = ({ isOpen, onClose }) => {
  const [teaCount, setTeaCount] = useState(0);
  const [comfortIdx, setComfortIdx] = useState(0);

  if (!isOpen) return null;

  const handleTeaClick = () => {
    soundManager.playClick();
    setTeaCount((prev) => prev + 1);
  };

  const nextComfort = () => {
    soundManager.playClick();
    setComfortIdx((prev) => (prev + 1) % COMFORT_MESSAGES.length);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-xl rounded-3xl bg-gradient-to-b from-slate-900 via-[#121626] to-[#0a0d18] border-2 border-rose-500/50 shadow-[0_0_60px_rgba(244,63,94,0.3)] p-6 sm:p-8 text-center">
        
        {/* Close Button */}
        <button
          onClick={() => {
            soundManager.playClick();
            onClose();
          }}
          className="absolute top-5 right-5 p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {/* DON'T PANIC Big Friendly Letters */}
        <div className="my-2">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/40 text-xs font-mono mb-4">
            <ShieldAlert className="w-4 h-4 text-rose-400 animate-pulse" />
            <span>PROCÉDURE DE CALME COSMIQUE</span>
          </div>

          <h2 className="text-4xl sm:text-5xl font-display font-black tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-rose-300 to-cyan-300 drop-shadow-[0_0_20px_rgba(251,113,133,0.5)] uppercase">
            DON'T PANIC
          </h2>
          <p className="text-xs font-mono text-slate-400 mt-1 uppercase tracking-widest">
            En grandes lettres rondes et rassurantes
          </p>
        </div>

        {/* Comfort Advice Box */}
        <div 
          onClick={nextComfort}
          className="my-6 p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-slate-700 cursor-pointer transition-all text-left"
          title="Cliquer pour un autre conseil anti-stress"
        >
          <div className="flex items-center space-x-2 text-xs font-mono text-cyan-300 mb-2">
            <Smile className="w-4 h-4" />
            <span>CONSEIL DE L'AUTO-STOPPEUR NSI :</span>
          </div>
          <p className="text-sm text-slate-200 leading-relaxed font-sans">
            "{COMFORT_MESSAGES[comfortIdx]}"
          </p>
          <div className="text-[10px] text-slate-500 font-mono mt-2 text-right">
            (Cliquer pour un autre conseil)
          </div>
        </div>

        {/* Interactive Nutrimatic Tea Dispenser */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-amber-950/20 border border-amber-500/30 text-left">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-300 text-xl">
              ☕
            </div>
            <div>
              <div className="text-xs font-display font-bold text-slate-100">
                Distributeur Nutrimatique
              </div>
              <div className="text-[11px] text-slate-400">
                {teaCount === 0
                  ? "Prêt à servir un thé synthétique"
                  : `${teaCount} tasse(s) presque tout à fait comme du thé`}
              </div>
            </div>
          </div>

          <button
            onClick={handleTeaClick}
            className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-all shadow-[0_0_15px_rgba(245,158,11,0.3)] whitespace-nowrap"
          >
            Servir un Thé ☕
          </button>
        </div>

        {/* Action Button */}
        <div className="mt-6">
          <button
            onClick={() => {
              soundManager.playClick();
              onClose();
            }}
            className="w-full py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium text-sm transition-all"
          >
            Je suis prêt à reprendre mon voyage interstellaire &rarr;
          </button>
        </div>

      </div>
    </div>
  );
};
