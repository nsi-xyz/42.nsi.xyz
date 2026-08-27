import React, { useState } from 'react';
import { Lock, Unlock, Award, Shield, FileText, CheckCircle, Sparkles, Printer, User } from 'lucide-react';
import { SECRET_DOCUMENTS } from '../data/quizData';
import { soundManager } from '../utils/audio';

interface SecretVaultProps {
  quizPoints: number;
  onOpenQuiz: () => void;
}

export const SecretVault: React.FC<SecretVaultProps> = ({ quizPoints, onOpenQuiz }) => {
  const [activeDocId, setActiveDocId] = useState<string>(SECRET_DOCUMENTS[0].id);
  const [studentName, setStudentName] = useState('Élève Chercheur NSI');

  const selectedDoc = SECRET_DOCUMENTS.find((d) => d.id === activeDocId) || SECRET_DOCUMENTS[0];
  const isSelectedUnlocked = quizPoints >= selectedDoc.unlockedAtPoints;

  const handlePrintCertificate = () => {
    soundManager.playUnlock();
    window.print();
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-8">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 text-xs font-mono mb-3">
          <Lock className="w-3.5 h-3.5" />
          <span>ACCÈS RESTREINT MAGRATHÉEN</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-display font-black text-white">
          Les Archives & Dossiers Secrets du 42
        </h2>
        <p className="text-slate-400 text-sm sm:text-base mt-2">
          Contenus confidentiels déverrouillés grâce à vos points accumulés au Quiz Galactique.
        </p>
      </div>

      {/* Grid: Document List on left, Reader on right */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        
        {/* Left Side: Document Tabs */}
        <div className="md:col-span-4 space-y-3">
          {SECRET_DOCUMENTS.map((doc) => {
            const isUnlocked = quizPoints >= doc.unlockedAtPoints;
            const isSelected = activeDocId === doc.id;

            return (
              <button
                key={doc.id}
                onClick={() => {
                  soundManager.playClick();
                  setActiveDocId(doc.id);
                }}
                className={`w-full p-4 rounded-2xl border text-left transition-all relative ${
                  isSelected
                    ? 'bg-yellow-950/40 border-yellow-400/80 shadow-[0_0_20px_rgba(234,179,8,0.2)]'
                    : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-mono font-bold text-yellow-400">
                    {doc.badge}
                  </span>
                  {isUnlocked ? (
                    <Unlock className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Lock className="w-4 h-4 text-slate-500" />
                  )}
                </div>

                <div className="font-display font-bold text-sm text-slate-100 line-clamp-1">
                  {doc.title}
                </div>

                <div className="text-[11px] font-mono text-slate-400 mt-1">
                  {isUnlocked ? (
                    <span className="text-emerald-400">✓ Déchiffré ({quizPoints} pts)</span>
                  ) : (
                    <span className="text-slate-500">Requis : {doc.unlockedAtPoints} pts</span>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Right Side: Document Content Viewer */}
        <div className="md:col-span-8 p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-slate-800 backdrop-blur-xl shadow-2xl">
          {isSelectedUnlocked ? (
            <div className="space-y-5 animate-fadeIn">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-yellow-500/20 text-yellow-300 border border-yellow-500/30 uppercase">
                    CONFIDENTIEL NIVEAU {selectedDoc.unlockedAtPoints}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-display font-bold text-white mt-2">
                    {selectedDoc.title}
                  </h3>
                </div>
              </div>

              <div className="text-sm text-slate-200 leading-relaxed font-sans whitespace-pre-line bg-slate-950/60 p-5 rounded-2xl border border-slate-800">
                {selectedDoc.content}
              </div>

              <div className="p-4 rounded-2xl bg-cyan-950/30 border border-cyan-500/30">
                <div className="text-xs font-mono text-cyan-300 font-bold mb-1">
                  CONSEIL PÉDAGOGIQUE NSI :
                </div>
                <div className="text-xs text-slate-300 leading-relaxed">
                  {selectedDoc.nsiInsight}
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-12 space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center mx-auto text-slate-500">
                <Lock className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-display font-bold text-white">
                Document Crypté par Pensée Profonde
              </h3>
              <p className="text-sm text-slate-400 max-w-md mx-auto">
                Ce dossier requiert <strong>{selectedDoc.unlockedAtPoints} points</strong> au Quiz Galactique. Vous possédez actuellement <strong>{quizPoints} points</strong>.
              </p>
              <button
                onClick={onOpenQuiz}
                className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs sm:text-sm font-medium shadow-[0_0_15px_rgba(168,85,247,0.3)] transition-all"
              >
                <Award className="w-4 h-4" />
                <span>Gagner des points au Quiz</span>
              </button>
            </div>
          )}
        </div>

      </div>

      {/* Galactic Diploma Card (if score >= 160) */}
      {quizPoints >= 160 && (
        <div className="mt-12 p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-slate-950 via-[#0d1424] to-[#070b14] border-2 border-yellow-500/40 shadow-[0_0_40px_rgba(234,179,8,0.15)] relative overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-yellow-500/20">
            <div>
              <div className="text-xs font-mono text-yellow-400 uppercase tracking-wider">
                CERTIFICAT OFFICIEL DE L'UNIVERS ET DE <a href="https://nsi.xyz" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-yellow-200">NSI.XYZ</a>
              </div>
              <h3 className="text-2xl font-display font-black text-white mt-1">
                Diplôme d'Ambassadeur Galactique du 42
              </h3>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={handlePrintCertificate}
                className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-yellow-500/20 text-yellow-300 hover:bg-yellow-500/30 border border-yellow-500/40 text-xs font-mono transition-all"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Imprimer / Exporter</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 items-center">
            <div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Ce document atteste solennellement que le titulaire maîtrise les mystères fondamentaux du nombre 42 : le code ASCII <code className="text-cyan-300 font-mono">*</code>, l'alternance binaire <code className="text-cyan-300 font-mono">101010</code>, les 5e nombres de Catalan, la somme des trois cubes et la sagesse suprême de la serviette galactique.
              </p>

              <div className="mt-4 flex items-center space-x-2">
                <User className="w-4 h-4 text-yellow-400" />
                <span className="text-xs text-slate-400">Nom sur le diplôme :</span>
                <input
                  type="text"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  className="px-3 py-1 rounded-lg bg-slate-900 border border-yellow-500/30 text-yellow-200 text-xs font-mono outline-none"
                />
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/90 border border-yellow-500/30 text-center relative">
              <div className="text-xs font-mono text-slate-500 mb-1">TITULAIRE CERTIFIÉ</div>
              <div className="text-xl font-display font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-amber-100 to-cyan-300">
                {studentName || 'Élève NSI'}
              </div>
              <div className="text-xs font-mono text-emerald-400 mt-1">
                Score validé : {quizPoints} / 460 points
              </div>
              <div className="text-[10px] font-mono text-slate-500 mt-2">
                Sceau matriciel : MAGRATHEA-42-NSI-XYZ-{Date.now().toString(36).toUpperCase()}
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
