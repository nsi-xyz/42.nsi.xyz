import React, { useState } from 'react';
import { 
  HelpCircle, 
  CheckCircle2, 
  XCircle, 
  Award, 
  RotateCcw, 
  Sparkles, 
  ArrowRight, 
  Lock, 
  Unlock, 
  BookOpen,
  Zap,
  Check
} from 'lucide-react';
import { QUIZ_QUESTIONS, QUIZ_TIERS } from '../data/quizData';
import { QuizQuestion, QuizTierInfo } from '../types';
import { soundManager } from '../utils/audio';
import confetti from 'canvas-confetti';

interface GalacticQuizProps {
  quizPoints: number;
  setQuizPoints: React.Dispatch<React.SetStateAction<number>>;
  onOpenSecrets: () => void;
  onTriggerEasterEgg: (id: string) => void;
}

export const GalacticQuiz: React.FC<GalacticQuizProps> = ({
  quizPoints,
  setQuizPoints,
  onOpenSecrets,
  onTriggerEasterEgg,
}) => {
  const [selectedTier, setSelectedTier] = useState<'novice' | 'voyager' | 'magrathean' | 'deepthought'>('novice');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [answeredQuestionIds, setAnsweredQuestionIds] = useState<Set<string>>(new Set());
  const [correctCount, setCorrectCount] = useState(0);
  const [isTierCompleted, setIsTierCompleted] = useState(false);

  // Filter questions for the active tier
  const tierQuestions = QUIZ_QUESTIONS.filter((q) => q.tier === selectedTier);
  const currentQ = tierQuestions[currentQuestionIndex];
  const activeTierInfo = QUIZ_TIERS.find((t) => t.id === selectedTier)!;

  const handleSelectOption = (index: number) => {
    if (isAnswered) return;
    soundManager.playClick();
    setSelectedOption(index);
  };

  const handleValidateAnswer = () => {
    if (selectedOption === null || isAnswered) return;

    setIsAnswered(true);
    const isCorrect = selectedOption === currentQ.correctIndex;

    if (isCorrect) {
      soundManager.playUnlock();
      setCorrectCount((prev) => prev + 1);

      // Only add points if question wasn't previously scored
      if (!answeredQuestionIds.has(currentQ.id)) {
        const nextScore = quizPoints + currentQ.points;
        setQuizPoints(nextScore);
        if (nextScore >= 420) {
          onTriggerEasterEgg('konami-code');
        }
        setAnsweredQuestionIds((prev) => new Set(prev).add(currentQ.id));
      }
    } else {
      soundManager.playError();
    }
  };

  const handleNextQuestion = () => {
    soundManager.playClick();
    if (currentQuestionIndex < tierQuestions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      // Tier finished!
      setIsTierCompleted(true);
      soundManager.playUnlock();
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 }
      });
    }
  };

  const restartTier = (tierId: 'novice' | 'voyager' | 'magrathean' | 'deepthought') => {
    soundManager.playClick();
    setSelectedTier(tierId);
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setIsTierCompleted(false);
    setCorrectCount(0);
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-8">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-mono mb-3">
          <HelpCircle className="w-3.5 h-3.5" />
          <span>ÉVALUATION GALACTIQUE & NSI</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-display font-black text-white">
          Le Grand Quiz de Pensée Profonde
        </h2>
        <p className="text-slate-400 text-sm sm:text-base mt-2">
          Répondez aux énigmes pour accumuler des points galactiques et débloquer les <strong>Dossiers Secrets du 42</strong> !
        </p>
      </div>

      {/* Tiers Navigation Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
        {QUIZ_TIERS.map((tier) => {
          const isSelected = selectedTier === tier.id;
          const isUnlocked = quizPoints >= (tier.minPoints === 60 ? 0 : tier.minPoints - 80);

          return (
            <button
              key={tier.id}
              onClick={() => restartTier(tier.id)}
              className={`p-3.5 sm:p-4 rounded-2xl border text-left transition-all relative overflow-hidden ${
                isSelected
                  ? 'bg-purple-950/60 border-purple-400 shadow-[0_0_20px_rgba(168,85,247,0.3)]'
                  : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 text-slate-400'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-2xl">{tier.badge}</span>
                {quizPoints >= tier.minPoints ? (
                  <span className="flex items-center space-x-1 text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-500/30">
                    <Check className="w-3 h-3" />
                    <span>Débloqué</span>
                  </span>
                ) : (
                  <span className="text-[10px] font-mono text-slate-500">
                    {tier.minPoints} pts requis
                  </span>
                )}
              </div>
              <div className="font-display font-bold text-sm text-slate-100 truncate">
                {tier.name.split(':')[0]}
              </div>
              <div className="text-[11px] text-purple-300/80 font-sans mt-0.5 truncate">
                {tier.levelTitle}
              </div>
            </button>
          );
        })}
      </div>

      {/* Quiz Card Box */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-slate-800 backdrop-blur-xl shadow-2xl">
        
        {/* Tier Completed View */}
        {isTierCompleted ? (
          <div className="text-center py-8 animate-fadeIn">
            <div className="w-20 h-20 rounded-3xl bg-purple-500/20 border border-purple-400 flex items-center justify-center mx-auto mb-4 text-4xl shadow-[0_0_30px_rgba(168,85,247,0.4)]">
              {activeTierInfo.badge}
            </div>
            
            <h3 className="text-2xl sm:text-3xl font-display font-black text-white mb-2">
              Palier Terminé avec Succès !
            </h3>
            
            <p className="text-slate-300 text-sm sm:text-base max-w-lg mx-auto mb-6">
              Vous avez répondu correctement à <strong className="text-cyan-300">{correctCount} / {tierQuestions.length}</strong> questions de ce niveau. 
              Votre score total s'élève à <strong className="text-purple-300">{quizPoints} points galactiques</strong>.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={() => restartTier(selectedTier)}
                className="flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs sm:text-sm font-medium transition-all"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Rejouer ce palier</span>
              </button>

              <button
                onClick={onOpenSecrets}
                className="flex items-center space-x-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs sm:text-sm font-medium shadow-[0_0_20px_rgba(168,85,247,0.4)] transition-all"
              >
                <BookOpen className="w-4 h-4" />
                <span>Consulter les Dossiers Débloqués</span>
              </button>
            </div>
          </div>
        ) : (
          /* Active Question View */
          <div>
            {/* Top Progress & Score */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-800/80 text-xs font-mono text-slate-400">
              <div className="flex items-center space-x-2">
                <span className="text-purple-400 font-bold">{activeTierInfo.name}</span>
                <span>&bull;</span>
                <span>Question {currentQuestionIndex + 1} / {tierQuestions.length}</span>
              </div>

              <div className="flex items-center space-x-2">
                <span className="text-cyan-300 font-bold">+{currentQ.points} pts</span>
                <span>&bull;</span>
                <span>Score : {quizPoints} pts</span>
              </div>
            </div>

            {/* Question Text */}
            <div className="my-6">
              <h3 className="text-lg sm:text-xl font-display font-bold text-white leading-snug">
                {currentQ.question}
              </h3>
            </div>

            {/* Options List */}
            <div className="space-y-3">
              {currentQ.options.map((option, idx) => {
                const isSelected = selectedOption === idx;
                const isCorrect = idx === currentQ.correctIndex;

                let optionStyles = 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-950';

                if (isAnswered) {
                  if (isCorrect) {
                    optionStyles = 'bg-emerald-950/50 border-emerald-500 text-emerald-200 shadow-[0_0_15px_rgba(16,185,129,0.3)]';
                  } else if (isSelected && !isCorrect) {
                    optionStyles = 'bg-rose-950/50 border-rose-500 text-rose-200';
                  } else {
                    optionStyles = 'bg-slate-950/30 border-slate-900 text-slate-500 opacity-60';
                  }
                } else if (isSelected) {
                  optionStyles = 'bg-purple-950/60 border-purple-400 text-purple-100 shadow-[0_0_15px_rgba(168,85,247,0.25)]';
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleSelectOption(idx)}
                    disabled={isAnswered}
                    className={`w-full p-4 rounded-2xl border text-left flex items-center justify-between transition-all duration-200 ${optionStyles}`}
                  >
                    <div className="flex items-center space-x-3">
                      <span className="w-6 h-6 rounded-lg bg-slate-900 border border-slate-700 flex items-center justify-center text-xs font-mono font-bold text-slate-400">
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span className="text-sm sm:text-base font-sans">{option}</span>
                    </div>

                    {isAnswered && isCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />}
                    {isAnswered && isSelected && !isCorrect && <XCircle className="w-5 h-5 text-rose-400 flex-shrink-0" />}
                  </button>
                );
              })}
            </div>

            {/* Answer Explanation */}
            {isAnswered && (
              <div className="mt-6 p-4 sm:p-5 rounded-2xl bg-purple-950/30 border border-purple-500/30 animate-fadeIn space-y-2">
                <div className="flex items-center space-x-2 text-xs font-mono text-purple-300 font-bold">
                  <Sparkles className="w-4 h-4" />
                  <span>EXPLICATION SCIENTIFIQUE & COSMIQUE :</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-sans">
                  {currentQ.explanation}
                </p>
                {currentQ.nsiRelation && (
                  <div className="text-xs font-mono text-cyan-300/90 pt-2 border-t border-purple-500/20">
                    💡 <strong>Lien NSI :</strong> {currentQ.nsiRelation}
                  </div>
                )}
              </div>
            )}

            {/* Bottom Actions */}
            <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between">
              <div className="text-xs text-slate-500 font-mono">
                {answeredQuestionIds.has(currentQ.id) ? '✓ Déjà validé' : 'Non validé'}
              </div>

              {!isAnswered ? (
                <button
                  onClick={handleValidateAnswer}
                  disabled={selectedOption === null}
                  className="px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 disabled:opacity-40 text-white font-medium text-xs sm:text-sm transition-all shadow-[0_0_15px_rgba(168,85,247,0.3)]"
                >
                  Valider la réponse
                </button>
              ) : (
                <button
                  onClick={handleNextQuestion}
                  className="flex items-center space-x-2 px-6 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs sm:text-sm transition-all shadow-[0_0_15px_rgba(6,182,212,0.3)]"
                >
                  <span>{currentQuestionIndex < tierQuestions.length - 1 ? 'Question suivante' : 'Voir les résultats'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
