import React from 'react';
import { X, Sparkles, CheckCircle2, HelpCircle, Shield, Zap, Terminal, Compass, Calculator } from 'lucide-react';
import { EasterEgg } from '../types';
import { soundManager } from '../utils/audio';

interface EasterEggsModalProps {
  isOpen: boolean;
  onClose: () => void;
  easterEggs: EasterEgg[];
}

const ICON_MAP: Record<string, React.ElementType> = {
  Shield,
  Sparkles,
  Zap,
  Terminal,
  Compass,
  Calculator
};

export const EasterEggsModal: React.FC<EasterEggsModalProps> = ({
  isOpen,
  onClose,
  easterEggs,
}) => {
  if (!isOpen) return null;

  const discoveredCount = easterEggs.filter((e) => e.discovered).length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-2xl rounded-3xl bg-slate-900 border border-slate-700 shadow-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto">
        
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

        {/* Title */}
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-xl">
            🥚
          </div>
          <div>
            <h3 className="text-xl sm:text-2xl font-display font-bold text-white">
              Chasse aux Easter Eggs du 42
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 font-mono">
              Progression : {discoveredCount} / {easterEggs.length} secrets découverts
            </p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-2 bg-slate-800 rounded-full mb-6 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-amber-500 via-yellow-400 to-cyan-400 transition-all duration-300"
            style={{ width: `${(discoveredCount / easterEggs.length) * 100}%` }}
          />
        </div>

        {/* List of Easter Eggs */}
        <div className="space-y-3.5">
          {easterEggs.map((egg) => {
            const IconComp = ICON_MAP[egg.icon] || Sparkles;

            return (
              <div
                key={egg.id}
                className={`p-4 rounded-2xl border transition-all ${
                  egg.discovered
                    ? 'bg-amber-950/30 border-amber-500/40 shadow-[0_0_15px_rgba(245,158,11,0.15)]'
                    : 'bg-slate-950/60 border-slate-800'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start space-x-3">
                    <div
                      className={`p-2.5 rounded-xl border mt-0.5 ${
                        egg.discovered
                          ? 'bg-amber-500/20 border-amber-500/40 text-amber-300'
                          : 'bg-slate-900 border-slate-800 text-slate-600'
                      }`}
                    >
                      <IconComp className="w-4 h-4" />
                    </div>

                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-display font-bold text-sm text-slate-100">
                          {egg.title}
                        </span>
                        {egg.discovered && (
                          <span className="px-2 py-0.5 text-[10px] font-mono font-bold bg-amber-500/20 text-amber-300 rounded border border-amber-500/30">
                            TROUVÉ !
                          </span>
                        )}
                      </div>

                      <p className="text-xs text-slate-400 mt-1 font-sans">
                        <strong className="text-slate-300 font-mono">Indice :</strong> {egg.hint}
                      </p>

                      {egg.discovered && (
                        <div className="text-xs font-mono text-emerald-300 mt-2 flex items-center space-x-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>{egg.reward}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer info */}
        <div className="mt-6 pt-4 border-t border-slate-800 text-center">
          <p className="text-xs text-slate-500 font-mono">
            Astuce NSI : Testez les combinaisons de touches, le terminal et les simulateurs interactifs !
          </p>
        </div>

      </div>
    </div>
  );
};
