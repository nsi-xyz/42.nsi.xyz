import React, { useState } from 'react';
import { 
  Terminal, 
  Binary, 
  Calculator, 
  FileCode, 
  Cpu, 
  GraduationCap, 
  Box, 
  Network, 
  Layers, 
  Sparkles, 
  Bot, 
  Compass, 
  ShieldAlert, 
  MessageSquare, 
  Sun, 
  Globe, 
  BookOpen, 
  Feather, 
  Activity, 
  Scale, 
  Award,
  ChevronDown,
  ChevronUp,
  Copy,
  Check,
  Play,
  Share2
} from 'lucide-react';
import { FactItem } from '../types';
import { soundManager } from '../utils/audio';

interface FactCardProps {
  fact: FactItem;
  onOpenTool?: (toolId: 'converter' | 'sumcubes' | 'rainbow' | 'whale' | 'babel' | 'terminal') => void;
}

const ICON_MAP: Record<string, React.ElementType> = {
  Terminal,
  Binary,
  Calculator,
  FileCode,
  Cpu,
  GraduationCap,
  Box,
  Network,
  Layers,
  Sparkles,
  Bot,
  Compass,
  ShieldAlert,
  MessageSquare,
  Sun,
  Globe,
  BookOpen,
  Feather,
  Activity,
  Scale,
  Award
};

const CATEGORY_COLORS: Record<string, string> = {
  nsi: 'from-emerald-500/20 to-teal-500/10 text-emerald-300 border-emerald-500/30',
  math: 'from-amber-500/20 to-orange-500/10 text-amber-300 border-amber-500/30',
  h2g2: 'from-purple-500/20 to-indigo-500/10 text-purple-300 border-purple-500/30',
  science: 'from-sky-500/20 to-blue-500/10 text-sky-300 border-sky-500/30',
  culture: 'from-rose-500/20 to-pink-500/10 text-rose-300 border-rose-500/30',
};

export const FactCard: React.FC<FactCardProps> = ({ fact, onOpenTool }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  const IconComponent = ICON_MAP[fact.icon] || Sparkles;

  const toggleExpand = () => {
    soundManager.playClick();
    setIsExpanded(!isExpanded);
  };

  const handleCopyCode = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!fact.codeSnippet) return;
    soundManager.playClick();
    navigator.clipboard.writeText(fact.codeSnippet.code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <article
      id={`fact-card-${fact.id}`}
      className="glass-panel glass-panel-hover rounded-3xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 group"
    >
      <div>
        {/* Header Badges */}
        <div className="flex items-center justify-between gap-2 mb-4">
          <div className="flex items-center space-x-2">
            <div className={`p-2.5 rounded-2xl bg-gradient-to-br ${CATEGORY_COLORS[fact.category] || 'from-cyan-500/20 to-blue-500/20'} border`}>
              <IconComponent className="w-5 h-5" />
            </div>
            
            <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-slate-900/80 border border-slate-700/80 text-slate-300">
              {fact.level}
            </span>
          </div>

          <div className="flex items-center space-x-1.5">
            {fact.tags.slice(0, 2).map((t) => (
              <span key={t} className="text-[10px] font-mono text-slate-400 bg-slate-950/60 px-2 py-0.5 rounded-md border border-slate-800">
                #{t}
              </span>
            ))}
          </div>
        </div>

        {/* Title & Subtitle */}
        <h3 className="text-xl sm:text-2xl font-display font-bold text-white group-hover:text-cyan-300 transition-colors leading-snug">
          {fact.title}
        </h3>
        
        <p className="text-xs sm:text-sm font-sans text-cyan-400/90 font-medium mt-1 mb-3">
          {fact.subtitle}
        </p>

        {/* Summary text */}
        <p className="text-sm text-slate-300 leading-relaxed font-sans">
          {fact.summary}
        </p>

        {/* Expandable Deep Dive Area */}
        {isExpanded && (
          <div className="mt-5 pt-5 border-t border-slate-800/80 space-y-4 animate-fadeIn">
            
            {/* Full Explanation */}
            <div className="text-xs sm:text-sm text-slate-300 leading-relaxed whitespace-pre-line font-sans">
              {fact.fullExplanation}
            </div>

            {/* NSI Curiosity Box */}
            {fact.nsiCuriosity && (
              <div className="p-4 rounded-2xl bg-cyan-950/30 border border-cyan-500/30 flex items-start space-x-3">
                <span className="text-cyan-400 text-lg">💡</span>
                <div className="text-xs sm:text-sm text-slate-200">
                  <strong className="text-cyan-300 font-mono block mb-1">LE COIN NSI :</strong>
                  {fact.nsiCuriosity}
                </div>
              </div>
            )}

            {/* Code Snippet */}
            {fact.codeSnippet && (
              <div className="rounded-2xl overflow-hidden bg-slate-950 border border-slate-800">
                <div className="flex items-center justify-between px-4 py-2 bg-slate-900/90 border-b border-slate-800 text-xs font-mono text-slate-400">
                  <span>{fact.codeSnippet.filename || `${fact.codeSnippet.language}.py`}</span>
                  <button
                    onClick={handleCopyCode}
                    className="flex items-center space-x-1 hover:text-cyan-300 transition-colors"
                  >
                    {copiedCode ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400 text-[11px]">Copié !</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span className="text-[11px]">Copier le code</span>
                      </>
                    )}
                  </button>
                </div>
                <pre className="p-4 text-xs font-mono text-emerald-300 overflow-x-auto leading-relaxed">
                  <code>{fact.codeSnippet.code}</code>
                </pre>
              </div>
            )}

          </div>
        )}
      </div>

      {/* Card Action Footer */}
      <div className="mt-6 pt-4 border-t border-slate-800/60 flex items-center justify-between gap-2">
        <button
          onClick={toggleExpand}
          className="flex items-center space-x-1.5 text-xs font-medium text-cyan-400 hover:text-cyan-300 transition-colors"
        >
          <span>{isExpanded ? 'Réduire la fiche' : 'Lire l\'explication complète'}</span>
          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>

        {fact.interactiveToolId && onOpenTool && (
          <button
            onClick={() => {
              soundManager.playClick();
              onOpenTool(fact.interactiveToolId!);
            }}
            className="flex items-center space-x-1 px-3 py-1.5 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-xs font-medium transition-all"
          >
            <Play className="w-3 h-3" />
            <span>Tester l'outil</span>
          </button>
        )}
      </div>
    </article>
  );
};
