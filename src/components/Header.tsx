import React from 'react';
import { 
  Terminal, 
  HelpCircle, 
  Sliders, 
  Volume2, 
  VolumeX, 
  Rocket, 
  ShieldAlert, 
  Sparkles,
  Lock,
  Search
} from 'lucide-react';
import { soundManager } from '../utils/audio';

interface HeaderProps {
  activeTab: 'facts' | 'terminal' | 'quiz' | 'tools' | 'secrets';
  setActiveTab: (tab: 'facts' | 'terminal' | 'quiz' | 'tools' | 'secrets') => void;
  isWarpSpeed: boolean;
  setIsWarpSpeed: (val: boolean | ((prev: boolean) => boolean)) => void;
  soundOn: boolean;
  setSoundOn: (val: boolean | ((prev: boolean) => boolean)) => void;
  onOpenDontPanic: () => void;
  onOpenEasterEggs: () => void;
  easterEggsCount: number;
  totalEasterEggs: number;
  quizPoints: number;
  onFocusSearch: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  isWarpSpeed,
  setIsWarpSpeed,
  soundOn,
  setSoundOn,
  onOpenDontPanic,
  onOpenEasterEggs,
  easterEggsCount,
  totalEasterEggs,
  quizPoints,
  onFocusSearch,
}) => {
  const handleTabChange = (tab: 'facts' | 'terminal' | 'quiz' | 'tools' | 'secrets') => {
    soundManager.playClick();
    setActiveTab(tab);
  };

  const toggleSound = () => {
    const newState = soundManager.toggle();
    setSoundOn(newState);
  };

  const toggleWarp = () => {
    soundManager.playWarp();
    setIsWarpSpeed((prev) => !prev);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-[#07080f]/85 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo & Identity */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => handleTabChange('facts')}>
            <div className="relative group flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-cyan-500/20 via-purple-500/20 to-blue-600/30 border border-cyan-500/40 group-hover:border-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.3)] transition-all">
              <span className="font-display font-black text-xl sm:text-2xl text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-sky-200 to-amber-300">
                42
              </span>
              <div className="absolute -inset-0.5 rounded-xl bg-cyan-400/20 blur opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>

            <div>
              <div className="flex items-center space-x-2">
                <span className="font-display font-bold text-base sm:text-lg text-slate-100 tracking-wide">
                  42<span className="text-cyan-400">.nsi.xyz</span>
                </span>
                <span className="hidden md:inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-mono font-medium bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
                  Spécialité NSI
                </span>
              </div>
              <p className="hidden sm:block text-xs text-slate-400 font-sans truncate max-w-[220px] lg:max-w-none">
                La Grande Réponse sur la vie, l'univers et le reste
              </p>
            </div>
          </div>

          {/* Desktop Navigation Tabs */}
          <nav className="hidden lg:flex items-center space-x-1 p-1 bg-slate-900/60 rounded-xl border border-slate-800">
            <button
              id="nav-tab-facts"
              onClick={() => handleTabChange('facts')}
              className={`flex items-center space-x-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'facts'
                  ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-300 border border-cyan-500/40 shadow-[0_0_10px_rgba(6,182,212,0.2)]'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span>L'Encyclopédie 42</span>
            </button>

            <button
              id="nav-tab-terminal"
              onClick={() => handleTabChange('terminal')}
              className={`flex items-center space-x-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'terminal'
                  ? 'bg-gradient-to-r from-emerald-500/20 to-teal-500/20 text-emerald-300 border border-emerald-500/40 shadow-[0_0_10px_rgba(16,185,129,0.2)]'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <Terminal className="w-4 h-4 text-emerald-400" />
              <span>Terminal Pensée Profonde</span>
            </button>

            <button
              id="nav-tab-tools"
              onClick={() => handleTabChange('tools')}
              className={`flex items-center space-x-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'tools'
                  ? 'bg-gradient-to-r from-amber-500/20 to-orange-500/20 text-amber-300 border border-amber-500/40 shadow-[0_0_10px_rgba(245,158,11,0.2)]'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <Sliders className="w-4 h-4 text-amber-400" />
              <span>Simulateurs Cosmiques</span>
            </button>

            <button
              id="nav-tab-quiz"
              onClick={() => handleTabChange('quiz')}
              className={`flex items-center space-x-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'quiz'
                  ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 border border-purple-500/40 shadow-[0_0_10px_rgba(168,85,247,0.2)]'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <HelpCircle className="w-4 h-4 text-purple-400" />
              <span>Quiz Galactique</span>
              {quizPoints > 0 && (
                <span className="ml-1 px-1.5 py-0.5 text-[10px] font-mono font-bold bg-purple-500/30 text-purple-200 rounded">
                  {quizPoints} pts
                </span>
              )}
            </button>

            <button
              id="nav-tab-secrets"
              onClick={() => handleTabChange('secrets')}
              className={`flex items-center space-x-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'secrets'
                  ? 'bg-gradient-to-r from-yellow-500/20 to-amber-500/20 text-yellow-300 border border-yellow-500/40'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <Lock className="w-4 h-4 text-yellow-400" />
              <span>Dossiers Secrets</span>
            </button>
          </nav>

          {/* Quick Action Controls */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Quick Search Shortcut Trigger */}
            <button
              id="header-search-btn"
              onClick={onFocusSearch}
              title="Rechercher une notion"
              className="p-2 sm:px-3 sm:py-2 rounded-lg bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 text-slate-300 hover:text-cyan-300 flex items-center space-x-1.5 transition-all text-xs"
            >
              <Search className="w-4 h-4" />
              <span className="hidden sm:inline font-mono">Recherche</span>
            </button>

            {/* DON'T PANIC Button */}
            <button
              id="btn-dont-panic"
              onClick={onOpenDontPanic}
              title="Procédure d'Urgence Galactique"
              className="relative group overflow-hidden px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl bg-gradient-to-r from-red-600 via-rose-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white font-display font-black text-xs sm:text-sm tracking-wider uppercase shadow-[0_0_20px_rgba(225,29,72,0.4)] border border-rose-400/50 active:scale-95 transition-all flex items-center space-x-1.5"
            >
              <ShieldAlert className="w-4 h-4 animate-pulse text-amber-200" />
              <span className="whitespace-nowrap">DON'T PANIC</span>
            </button>

            {/* Easter Egg Counter */}
            <button
              id="header-easter-eggs-btn"
              onClick={onOpenEasterEggs}
              title="Easter Eggs découverts"
              className="p-2 sm:px-2.5 sm:py-2 rounded-lg bg-slate-800/60 hover:bg-slate-800 border border-slate-700/80 text-amber-400 flex items-center space-x-1 text-xs font-mono transition-all"
            >
              <span>🥚</span>
              <span className="font-bold">{easterEggsCount}/{totalEasterEggs}</span>
            </button>

            {/* Warp Speed Toggle */}
            <button
              id="header-warp-toggle"
              onClick={toggleWarp}
              title={isWarpSpeed ? "Désactiver l'hyperespace" : "Enclencher l'hyperespace (Vitesse Lumière)"}
              className={`p-2 rounded-lg border transition-all ${
                isWarpSpeed 
                  ? 'bg-cyan-500 text-slate-950 border-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.6)] animate-pulse' 
                  : 'bg-slate-800/80 text-slate-400 hover:text-cyan-300 border-slate-700'
              }`}
            >
              <Rocket className="w-4 h-4" />
            </button>

            {/* Sound Toggle */}
            <button
              id="header-sound-toggle"
              onClick={toggleSound}
              title={soundOn ? "Désactiver les sons rétro" : "Activer les sons rétro"}
              className="p-2 rounded-lg bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 text-slate-300 hover:text-cyan-300 transition-all"
            >
              {soundOn ? <Volume2 className="w-4 h-4 text-cyan-400" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
            </button>
          </div>

        </div>

        {/* Mobile Navigation bar */}
        <div className="lg:hidden flex items-center justify-between overflow-x-auto py-2.5 gap-1 border-t border-slate-800/80 scrollbar-none">
          <button
            onClick={() => handleTabChange('facts')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap ${
              activeTab === 'facts' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30' : 'text-slate-400'
            }`}
          >
            🌌 Encyclopédie
          </button>
          <button
            onClick={() => handleTabChange('terminal')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap ${
              activeTab === 'terminal' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'text-slate-400'
            }`}
          >
            💻 Terminal CLI
          </button>
          <button
            onClick={() => handleTabChange('tools')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap ${
              activeTab === 'tools' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' : 'text-slate-400'
            }`}
          >
            📐 Simulateurs
          </button>
          <button
            onClick={() => handleTabChange('quiz')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap ${
              activeTab === 'quiz' ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30' : 'text-slate-400'
            }`}
          >
            ❓ Quiz ({quizPoints} pts)
          </button>
          <button
            onClick={() => handleTabChange('secrets')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap ${
              activeTab === 'secrets' ? 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30' : 'text-slate-400'
            }`}
          >
            🔒 Secrets
          </button>
        </div>

      </div>
    </header>
  );
};
