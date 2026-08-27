import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { StarfieldBackground } from './components/StarfieldBackground';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { SearchBar } from './components/SearchBar';
import { FactCard } from './components/FactCard';
import { InteractiveTools } from './components/InteractiveTools';
import { RetroTerminal } from './components/RetroTerminal';
import { GalacticQuiz } from './components/GalacticQuiz';
import { SecretVault } from './components/SecretVault';
import { EasterEggsModal } from './components/EasterEggsModal';
import { DontPanicModal } from './components/DontPanicModal';
import { Footer } from './components/Footer';

import { FACTS_DATA } from './data/factsData';
import { INITIAL_EASTER_EGGS } from './data/easterEggs';
import { CategoryType, EasterEgg } from './types';
import { soundManager } from './utils/audio';
import confetti from 'canvas-confetti';

export default function App() {
  // Navigation State
  const [activeTab, setActiveTab] = useState<'facts' | 'terminal' | 'quiz' | 'tools' | 'secrets'>('facts');
  const [activeToolId, setActiveToolId] = useState<'converter' | 'sumcubes' | 'rainbow' | 'whale' | 'babel'>('converter');

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>('all');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // App Settings & Animation State
  const [isWarpSpeed, setIsWarpSpeed] = useState(false);
  const [soundOn, setSoundOn] = useState(true);

  // Gamification & Easter Eggs State
  const [quizPoints, setQuizPoints] = useState<number>(0);
  const [click42Count, setClick42Count] = useState<number>(0);
  const [easterEggs, setEasterEggs] = useState<EasterEgg[]>(INITIAL_EASTER_EGGS);
  
  // Modals
  const [isEasterEggsOpen, setIsEasterEggsOpen] = useState(false);
  const [isDontPanicOpen, setIsDontPanicOpen] = useState(false);

  const searchInputRef = useRef<HTMLInputElement | null>(null);
  const konamiSequence = useRef<string[]>([]);

  // Trigger Easter Egg Helper
  const triggerEasterEgg = (eggId: string) => {
    setEasterEggs((prev) =>
      prev.map((egg) => {
        if (egg.id === eggId && !egg.discovered) {
          soundManager.playUnlock();
          return { ...egg, discovered: true };
        }
        return egg;
      })
    );
  };

  // Konami Code Listener
  useEffect(() => {
    const konamiTarget = [
      'ArrowUp',
      'ArrowUp',
      'ArrowDown',
      'ArrowDown',
      'ArrowLeft',
      'ArrowRight',
      'ArrowLeft',
      'ArrowRight',
      'b',
      'a'
    ];

    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      konamiSequence.current.push(key);
      if (konamiSequence.current.length > konamiTarget.length) {
        konamiSequence.current.shift();
      }

      if (konamiSequence.current.join(',').toLowerCase() === konamiTarget.join(',').toLowerCase()) {
        soundManager.playWarp();
        setIsWarpSpeed(true);
        triggerEasterEgg('konami-code');
        confetti({
          particleCount: 200,
          spread: 120,
          origin: { y: 0.5 }
        });
        setTimeout(() => setIsWarpSpeed(false), 5000);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Filter facts based on search query, category, and tag
  const filteredFacts = useMemo(() => {
    return FACTS_DATA.filter((fact) => {
      // Category match
      if (selectedCategory !== 'all' && fact.category !== selectedCategory) {
        return false;
      }

      // Tag match
      if (selectedTag && !fact.tags.includes(selectedTag)) {
        return false;
      }

      // Search text match
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const inTitle = fact.title.toLowerCase().includes(query);
        const inSubtitle = fact.subtitle.toLowerCase().includes(query);
        const inSummary = fact.summary.toLowerCase().includes(query);
        const inFull = fact.fullExplanation.toLowerCase().includes(query);
        const inNsi = fact.nsiCuriosity?.toLowerCase().includes(query);
        const inTags = fact.tags.some((t) => t.toLowerCase().includes(query));

        return inTitle || inSubtitle || inSummary || inFull || inNsi || inTags;
      }

      return true;
    });
  }, [selectedCategory, selectedTag, searchQuery]);

  const handleOpenTool = (toolId: 'converter' | 'sumcubes' | 'rainbow' | 'whale' | 'babel' | 'terminal') => {
    soundManager.playClick();
    if (toolId === 'terminal') {
      setActiveTab('terminal');
    } else {
      setActiveToolId(toolId);
      setActiveTab('tools');
    }
  };

  const handleFocusSearch = () => {
    soundManager.playClick();
    setActiveTab('facts');
    setTimeout(() => {
      searchInputRef.current?.focus();
      searchInputRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);
  };

  const handleOpenDontPanic = () => {
    soundManager.playClick();
    setIsDontPanicOpen(true);
    triggerEasterEgg('towel-button');
  };

  return (
    <div className="min-h-screen bg-[#07080f] text-slate-100 flex flex-col relative selection:bg-cyan-500/30 selection:text-cyan-200">
      
      {/* Dynamic 3D Starfield Canvas */}
      <StarfieldBackground isWarpSpeed={isWarpSpeed} />

      {/* Persistent Sci-Fi Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isWarpSpeed={isWarpSpeed}
        setIsWarpSpeed={setIsWarpSpeed}
        soundOn={soundOn}
        setSoundOn={setSoundOn}
        onOpenDontPanic={handleOpenDontPanic}
        onOpenEasterEggs={() => {
          soundManager.playClick();
          setIsEasterEggsOpen(true);
        }}
        easterEggsCount={easterEggs.filter((e) => e.discovered).length}
        totalEasterEggs={easterEggs.length}
        quizPoints={quizPoints}
        onFocusSearch={handleFocusSearch}
      />

      {/* Main Content Area with Animated Transitions */}
      <main className="flex-grow relative z-10">
        
        {/* FACTS ENCYCLOPEDIA TAB */}
        {activeTab === 'facts' && (
          <motion.div
            key="tab-facts"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
          >
            <HeroSection
              onOpenTerminal={() => {
                soundManager.playClick();
                setActiveTab('terminal');
              }}
              onOpenQuiz={() => {
                soundManager.playClick();
                setActiveTab('quiz');
              }}
              onSelectCategory={(cat) => setSelectedCategory(cat as CategoryType)}
              onTriggerEasterEgg={triggerEasterEgg}
              click42Count={click42Count}
              setClick42Count={setClick42Count}
            />

            <SearchBar
              searchInputRef={searchInputRef}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              selectedTag={selectedTag}
              setSelectedTag={setSelectedTag}
              totalResults={filteredFacts.length}
            />

            {/* Fact Cards Grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
              {filteredFacts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
                  {filteredFacts.map((fact) => (
                    <FactCard
                      key={fact.id}
                      fact={fact}
                      onOpenTool={handleOpenTool}
                    />
                  ))}
                </div>
              ) : (
                <div className="p-12 text-center rounded-3xl bg-slate-900/60 border border-slate-800 backdrop-blur-md max-w-xl mx-auto">
                  <div className="text-4xl mb-3">🛸</div>
                  <h3 className="text-xl font-display font-bold text-white mb-1">
                    Aucune facette trouvée dans ce quadrant galactique
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-400 mb-5">
                    Essayez d'autres mots-clés comme "Binaire", "ASCII", "Descartes", "Catalan" ou "Marvin".
                  </p>
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('all');
                      setSelectedTag(null);
                    }}
                    className="px-4 py-2 rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-xs font-mono"
                  >
                    Réinitialiser tous les filtres
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* TERMINAL CLI TAB */}
        {activeTab === 'terminal' && (
          <motion.div
            key="tab-terminal"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.2 }}
          >
            <RetroTerminal onTriggerEasterEgg={triggerEasterEgg} />
          </motion.div>
        )}

        {/* INTERACTIVE TOOLS & SIMULATORS TAB */}
        {activeTab === 'tools' && (
          <motion.div
            key="tab-tools"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
          >
            <InteractiveTools
              initialTool={activeToolId}
              onTriggerEasterEgg={triggerEasterEgg}
            />
          </motion.div>
        )}

        {/* GALACTIC QUIZ TAB */}
        {activeTab === 'quiz' && (
          <motion.div
            key="tab-quiz"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
          >
            <GalacticQuiz
              quizPoints={quizPoints}
              setQuizPoints={setQuizPoints}
              onOpenSecrets={() => {
                soundManager.playClick();
                setActiveTab('secrets');
              }}
              onTriggerEasterEgg={triggerEasterEgg}
            />
          </motion.div>
        )}

        {/* SECRET VAULT TAB */}
        {activeTab === 'secrets' && (
          <motion.div
            key="tab-secrets"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
          >
            <SecretVault
              quizPoints={quizPoints}
              onOpenQuiz={() => {
                soundManager.playClick();
                setActiveTab('quiz');
              }}
            />
          </motion.div>
        )}

      </main>

      {/* Easter Eggs Modal */}
      <EasterEggsModal
        isOpen={isEasterEggsOpen}
        onClose={() => setIsEasterEggsOpen(false)}
        easterEggs={easterEggs}
      />

      {/* Don't Panic Emergency Towel Modal */}
      <DontPanicModal
        isOpen={isDontPanicOpen}
        onClose={() => setIsDontPanicOpen(false)}
      />

      {/* Footer */}
      <Footer
        onOpenTerminal={() => {
          soundManager.playClick();
          setActiveTab('terminal');
        }}
        onOpenQuiz={() => {
          soundManager.playClick();
          setActiveTab('quiz');
        }}
        onOpenDontPanic={handleOpenDontPanic}
      />

    </div>
  );
}
