import React from 'react';
import { Sparkles, Terminal, Heart, BookOpen, ExternalLink, Shield } from 'lucide-react';
import { soundManager } from '../utils/audio';

interface FooterProps {
  onOpenTerminal: () => void;
  onOpenQuiz: () => void;
  onOpenDontPanic: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenTerminal,
  onOpenQuiz,
  onOpenDontPanic,
}) => {
  return (
    <footer className="mt-20 border-t border-slate-800 bg-[#05060b]/90 text-slate-400 text-xs font-sans relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
            {/* Col 1: Identity */}
            <div className="md:col-span-2 space-y-3">
              <div className="flex items-center space-x-2">
                <a 
                  href="https://nsi.xyz" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center space-x-1 hover:opacity-85 transition-opacity"
                >
                  <span className="font-display font-black text-xl text-cyan-400">42</span>
                  <span className="font-display font-bold text-slate-100 text-base">.nsi.xyz</span>
                </a>
                <a 
                  href="https://nsi.xyz" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 transition-colors inline-flex items-center gap-1"
                >
                  <span>Spécialité NSI</span>
                  <ExternalLink className="w-2.5 h-2.5 opacity-70" />
                </a>
              </div>
              
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-md">
                Ressource pédagogique et culturelle conçue pour les élèves de lycée en <a href="https://nsi.xyz" target="_blank" rel="noopener noreferrer" className="text-cyan-300 hover:underline font-medium">spécialité Numérique et Sciences Informatiques (NSI)</a> et tous les explorateurs passionnés de mathématiques, d'algorithmique et de science-fiction galactique.
              </p>

              {/* Special Attribution badge */}
              <div className="p-3 rounded-xl bg-slate-900/90 border border-cyan-500/20 text-slate-300 text-[11px] leading-relaxed">
                <span className="text-cyan-300 font-semibold font-mono">💡 Conception :</span> Une idée originale de <strong>Vincent ROBERT</strong>, développée en moins de <strong>42 minutes</strong> avec <strong>AI Studio de Google</strong> et le modèle <strong>Gemini 3.7 Flash</strong> pour le projet <a href="https://nsi.xyz" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline font-mono">nsi.xyz</a>.
              </div>

              <div className="text-[11px] text-slate-500 font-mono">
                Hommage éternel à Douglas Noel Adams (1952 – 2001) &bull; N'oubliez jamais votre serviette le 25 mai !
              </div>
            </div>

          {/* Col 2: Navigation rapide */}
          <div className="space-y-2.5">
            <div className="text-slate-200 font-display font-bold text-xs uppercase tracking-wider">
              Navigation Galactique
            </div>
            <ul className="space-y-1.5 text-xs">
              <li>
                <button onClick={onOpenTerminal} className="hover:text-cyan-300 transition-colors flex items-center gap-1">
                  <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Terminal Pensée Profonde</span>
                </button>
              </li>
              <li>
                <button onClick={onOpenQuiz} className="hover:text-purple-300 transition-colors flex items-center gap-1">
                  <BookOpen className="w-3.5 h-3.5 text-purple-400" />
                  <span>Grand Quiz du 42</span>
                </button>
              </li>
              <li>
                <button onClick={onOpenDontPanic} className="hover:text-rose-300 transition-colors flex items-center gap-1">
                  <Shield className="w-3.5 h-3.5 text-rose-400" />
                  <span>Procédure DON'T PANIC</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Raccourcis Secrets & NSI */}
          <div className="space-y-2.5">
            <div className="text-slate-200 font-display font-bold text-xs uppercase tracking-wider">
              Raccourcis & Secrets
            </div>
            <div className="space-y-1.5 text-[11px] font-mono text-slate-400">
              <div>
                <span className="text-cyan-300">42 clics</span> sur le logo pour la supernova.
              </div>
              <div>
                <span className="text-amber-300">Code Konami</span> pour l'hyperespace.
              </div>
              <div>
                <span className="text-emerald-300">ASCII 42</span> = Wildcard universel <code className="text-white">*</code>.
              </div>
            </div>
          </div>

        </div>

        <div className="mt-8 pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            &copy; {new Date().getFullYear()} <a href="https://nsi.xyz" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-cyan-300 transition-colors">nsi.xyz</a> &bull; <strong>42.nsi.xyz</strong> — La Réponse Ultime
          </div>
          <div className="flex items-center space-x-2">
            <span>Fait avec passion & curiosité pour les lycéens de <a href="https://nsi.xyz" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline">spécialité NSI</a> et d'ailleurs</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
