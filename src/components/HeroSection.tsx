import React, { useState } from 'react';
import { Sparkles, Terminal, Rocket, Play, Info, CheckCircle2, Award } from 'lucide-react';
import { soundManager } from '../utils/audio';
import confetti from 'canvas-confetti';

interface HeroSectionProps {
  onOpenTerminal: () => void;
  onOpenQuiz: () => void;
  onSelectCategory: (cat: string) => void;
  onTriggerEasterEgg: (id: string) => void;
  click42Count: number;
  setClick42Count: React.Dispatch<React.SetStateAction<number>>;
}

const QUOTES = [
  {
    text: "La réponse à la Grande Question sur la vie, l'univers et le reste est... Quarante-Deux.",
    author: "Pensée Profonde (Deep Thought), après 7,5 millions d'années de calcul",
  },
  {
    text: "Un cerveau de la taille d'une planète, et on me demande d'ouvrir une porte...",
    author: "Marvin l'Androïde Paranoïaque",
  },
  {
    text: "Une serviette est à peu près la chose la plus massivement utile qu'un auto-stoppeur interstellaire puisse posséder.",
    author: "Le Guide du Voyageur Galactique (H2G2)",
  },
  {
    text: "J'ai regardé par la fenêtre de mon bureau, j'ai vu le jardin et j'ai pensé : 42 fera très bien l'affaire.",
    author: "Douglas Adams (1952 - 2001)",
  },
  {
    text: "6 × 9 = 42 en Base 13. Coïncidence cosmique ou génie arithmétique ?",
    author: "Spécialité NSI — nsi.xyz",
  }
];

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenTerminal,
  onOpenQuiz,
  onTriggerEasterEgg,
  click42Count,
  setClick42Count,
}) => {
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const [justClicked, setJustClicked] = useState(false);

  const handle42Click = () => {
    soundManager.playClick();
    setJustClicked(true);
    setTimeout(() => setJustClicked(false), 300);

    const nextCount = click42Count + 1;
    setClick42Count(nextCount);
    if (nextCount === 42) {
      soundManager.playUnlock();
      confetti({
        particleCount: 150,
        spread: 90,
        origin: { y: 0.6 },
        colors: ['#38bdf8', '#a855f7', '#fbbf24', '#34d399', '#f43f5e']
      });
      onTriggerEasterEgg('clicks-42');
    }
  };

  const nextQuote = () => {
    soundManager.playClick();
    setCurrentQuoteIndex((prev) => (prev + 1) % QUOTES.length);
  };

  return (
    <section className="relative overflow-hidden pt-8 pb-12 sm:pt-14 sm:pb-18">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-cyan-500/10 via-purple-600/10 to-blue-500/10 blur-3xl pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Badges */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-6">
          <a 
            href="https://nsi.xyz" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-slate-900/80 hover:bg-slate-800 border border-cyan-500/30 hover:border-cyan-400 text-cyan-300 text-xs font-mono backdrop-blur-sm shadow-[0_0_15px_rgba(6,182,212,0.15)] transition-all group"
          >
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            <span>NSI.XYZ &bull; RESSOURCE PÉDAGOGIQUE DU LYCÉE</span>
            <span className="opacity-60 group-hover:opacity-100 text-[10px]">&rarr;</span>
          </a>

          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-purple-950/60 border border-purple-500/30 text-purple-300 text-xs font-mono">
            <span>🪐 H2G2 &bull; HOMMAGE À DOUGLAS ADAMS</span>
          </div>
        </div>

        {/* Main Title with Display Typography */}
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-black tracking-tight text-white mb-6 leading-tight">
            La réponse à la{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-200 to-purple-300 drop-shadow-[0_0_25px_rgba(56,189,248,0.35)]">
              Grande Question
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-300 font-sans max-w-3xl mx-auto leading-relaxed mb-8">
            Sur la vie, l'univers et le reste. Une exploration interactive, rigoureuse et humoristique 
            pour les passionnés d'informatique <a href="https://nsi.xyz" target="_blank" rel="noopener noreferrer" className="text-cyan-300 hover:text-cyan-200 font-semibold underline underline-offset-4 decoration-cyan-500/50 hover:decoration-cyan-400">NSI</a>, 
            de mathématiques et de science-fiction galactique.
          </p>

          {/* Giant Interactive 42 Emblem Button */}
          <div className="flex flex-col items-center justify-center my-6">
            <div className="relative group">
              <button
                id="hero-42-emblem-btn"
                onClick={handle42Click}
                className={`relative flex flex-col items-center justify-center w-36 h-36 sm:w-44 sm:h-44 rounded-3xl bg-gradient-to-b from-slate-900 via-[#0a0f1d] to-[#0d1527] border-2 transition-all duration-300 cursor-pointer select-none ${
                  justClicked
                    ? 'scale-95 border-cyan-300 shadow-[0_0_50px_rgba(56,189,248,0.6)]'
                    : 'border-cyan-500/40 hover:border-cyan-400 hover:shadow-[0_0_40px_rgba(56,189,248,0.35)] shadow-[0_0_25px_rgba(15,23,42,0.8)]'
                }`}
              >
                <span className="font-display font-black text-6xl sm:text-7xl text-transparent bg-clip-text bg-gradient-to-br from-cyan-300 via-sky-100 to-amber-200 tracking-tighter">
                  42
                </span>
                
                <span className="text-[10px] font-mono tracking-widest uppercase text-cyan-400/80 mt-1">
                  {click42Count >= 42 ? '✨ COSMIQUE ✨' : `${click42Count}/42 CLICS`}
                </span>

                {/* Orbiting ring */}
                <div className="absolute -inset-2 rounded-3xl border border-cyan-500/20 border-dashed pointer-events-none group-hover:rotate-12 transition-transform duration-700" />
              </button>

              {click42Count < 42 && click42Count > 0 && (
                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-[11px] font-mono text-cyan-300/80 bg-slate-900/90 px-2 py-0.5 rounded-full border border-cyan-500/20">
                  {42 - click42Count} clics avant supernova !
                </div>
              )}
            </div>
          </div>

          {/* Quick Real-Time Facet Conversion Ticker */}
          <div className="mt-8 max-w-4xl mx-auto p-3.5 rounded-2xl bg-slate-900/70 border border-slate-800/80 backdrop-blur-md">
            <div className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2 flex items-center justify-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>Les Multiples Visages Immédiats du 42</span>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 text-center text-xs font-mono">
              <div className="p-2 rounded-xl bg-slate-950/60 border border-cyan-500/20">
                <div className="text-slate-400 text-[10px]">Binaire (6 bits)</div>
                <div className="text-cyan-300 font-bold mt-0.5">101010₂</div>
              </div>
              <div className="p-2 rounded-xl bg-slate-950/60 border border-emerald-500/20">
                <div className="text-slate-400 text-[10px]">Code ASCII</div>
                <div className="text-emerald-300 font-bold mt-0.5">'*' (Wildcard)</div>
              </div>
              <div className="p-2 rounded-xl bg-slate-950/60 border border-purple-500/20">
                <div className="text-slate-400 text-[10px]">Hexadécimal</div>
                <div className="text-purple-300 font-bold mt-0.5">0x2A</div>
              </div>
              <div className="p-2 rounded-xl bg-slate-950/60 border border-amber-500/20">
                <div className="text-slate-400 text-[10px]">5e Catalan</div>
                <div className="text-amber-300 font-bold mt-0.5">C₅ = 42</div>
              </div>
              <div className="p-2 rounded-xl bg-slate-950/60 border border-sky-500/20">
                <div className="text-slate-400 text-[10px]">Arc-en-ciel</div>
                <div className="text-sky-300 font-bold mt-0.5">42,0° Optique</div>
              </div>
              <div className="p-2 rounded-xl bg-slate-950/60 border border-rose-500/20">
                <div className="text-slate-400 text-[10px]">Base 13 (6×9)</div>
                <div className="text-rose-300 font-bold mt-0.5">54₁₀ = 42₁₃</div>
              </div>
            </div>
          </div>

          {/* Interactive Quote Carousel */}
          <div 
            onClick={nextQuote}
            className="mt-6 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-slate-900/60 via-purple-950/20 to-slate-900/60 border border-purple-500/20 hover:border-purple-500/40 cursor-pointer transition-all max-w-3xl mx-auto group min-h-[110px] sm:min-h-[105px] flex flex-col justify-between"
            title="Cliquer pour une autre citation galactique"
          >
            <div className="flex items-center min-h-[48px] sm:min-h-[52px]">
              <p className="text-sm sm:text-base text-slate-200 italic font-sans leading-relaxed">
                "{QUOTES[currentQuoteIndex].text}"
              </p>
            </div>
            <div className="flex items-center justify-between text-xs text-purple-300/80 font-mono pt-2 border-t border-purple-500/10">
              <span className="truncate pr-2">— {QUOTES[currentQuoteIndex].author}</span>
              <span className="text-[10px] text-slate-500 group-hover:text-cyan-400 transition-colors whitespace-nowrap">
                Suivant (clic) &rarr;
              </span>
            </div>
          </div>

          {/* Call to Actions */}
          <div className="flex flex-wrap items-center justify-center gap-3.5 mt-8">
            <button
              id="hero-start-terminal-btn"
              onClick={onOpenTerminal}
              className="flex items-center space-x-2 px-5 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-medium text-sm shadow-[0_0_20px_rgba(16,185,129,0.3)] transition-all hover:scale-105 active:scale-95"
            >
              <Terminal className="w-4 h-4" />
              <span>Ouvrir Pensée Profonde CLI</span>
            </button>

            <button
              id="hero-start-quiz-btn"
              onClick={onOpenQuiz}
              className="flex items-center space-x-2 px-5 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-medium text-sm shadow-[0_0_20px_rgba(168,85,247,0.3)] transition-all hover:scale-105 active:scale-95"
            >
              <Award className="w-4 h-4" />
              <span>Relever le Quiz Galactique</span>
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
