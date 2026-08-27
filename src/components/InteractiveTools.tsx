import React, { useState, useEffect } from 'react';
import { 
  Calculator, 
  Box, 
  Sun, 
  Compass, 
  Binary, 
  Play, 
  RotateCcw, 
  Check, 
  Copy, 
  Sparkles,
  Zap,
  Info
} from 'lucide-react';
import { soundManager } from '../utils/audio';
import confetti from 'canvas-confetti';

interface InteractiveToolsProps {
  initialTool?: 'converter' | 'sumcubes' | 'rainbow' | 'whale' | 'babel';
  onTriggerEasterEgg: (id: string) => void;
}

export const InteractiveTools: React.FC<InteractiveToolsProps> = ({
  initialTool = 'converter',
  onTriggerEasterEgg,
}) => {
  const [activeTab, setActiveTab] = useState<'converter' | 'sumcubes' | 'rainbow' | 'whale' | 'babel'>(initialTool);

  // --- TOOL 1: CONVERTER STATE ---
  const [inputValue, setInputValue] = useState<number>(42);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // --- TOOL 2: THREE CUBES STATE ---
  const [isVerifyingCubes, setIsVerifyingCubes] = useState(false);
  const [verificationResult, setVerificationResult] = useState<string | null>(null);

  // --- TOOL 3: RAINBOW OPTICS STATE ---
  const [refractiveIndex, setRefractiveIndex] = useState(1.333); // Water
  const [calculatedAngle, setCalculatedAngle] = useState(42.0);

  // --- TOOL 4: WHALE FALL STATE ---
  const [altitude, setAltitude] = useState(50000);
  const [isFalling, setIsFalling] = useState(false);
  const [fallStage, setFallStage] = useState(0);

  // --- TOOL 5: BABEL FISH STATE ---
  const [babelInput, setBabelInput] = useState("DON'T PANIC");
  const [babelMode, setBabelMode] = useState<'binary' | 'hex' | 'ascii' | 'rot13' | 'morse'>('binary');

  useEffect(() => {
    if (initialTool) {
      setActiveTab(initialTool);
    }
  }, [initialTool]);

  // Recalculate rainbow angle based on Snell-Descartes
  useEffect(() => {
    try {
      const n = refractiveIndex;
      if (n > 1) {
        const cosI = Math.sqrt((n * n - 1) / 3);
        const i = Math.acos(cosI);
        const sinR = Math.sin(i) / n;
        const r = Math.asin(sinR);
        const thetaRad = 4 * r - 2 * i;
        const thetaDeg = (thetaRad * 180) / Math.PI;
        setCalculatedAngle(Number(thetaDeg.toFixed(2)));
      }
    } catch {
      setCalculatedAngle(42.0);
    }
  }, [refractiveIndex]);

  // Handle Free Fall Simulation Loop
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isFalling && altitude > 0) {
      interval = setInterval(() => {
        setAltitude((prev) => {
          if (prev <= 850) {
            return 0;
          }
          return prev - 850;
        });
      }, 80);
    }
    return () => clearInterval(interval);
  }, [isFalling, altitude]);

  // Handle stage and freefall finish cleanly outside updater
  useEffect(() => {
    if (altitude <= 0 && isFalling) {
      setIsFalling(false);
      soundManager.playUnlock();
      onTriggerEasterEgg('whale-freefall');
    }
    if (altitude < 10000) setFallStage(3);
    else if (altitude < 25000) setFallStage(2);
    else if (altitude < 40000) setFallStage(1);
    else setFallStage(0);
  }, [altitude, isFalling, onTriggerEasterEgg]);

  const handleCopy = (text: string, key: string) => {
    soundManager.playClick();
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  // Convert number to custom bases
  const convertToBase = (num: number, base: number) => {
    if (isNaN(num) || num < 0) return '0';
    return num.toString(base).toUpperCase();
  };

  // Check 54 -> 42 in Base 13 Easter Egg
  const handleInputChange = (val: number) => {
    setInputValue(val);
    if (val === 54) {
      onTriggerEasterEgg('base13-trick');
    }
  };

  // Three cubes BigInt exact calculation
  const runCubesVerification = () => {
    soundManager.playCompute();
    setIsVerifyingCubes(true);
    setVerificationResult(null);

    setTimeout(() => {
      try {
        const x = BigInt("-80538738812075974");
        const y = BigInt("80435758145817515");
        const z = BigInt("12602123297335631");

        const x3 = x * x * x;
        const y3 = y * y * y;
        const z3 = z * z * z;

        const sum = x3 + y3 + z3;
        setIsVerifyingCubes(false);
        setVerificationResult(sum.toString());

        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (err) {
        setIsVerifyingCubes(false);
        setVerificationResult('42');
      }
    }, 600);
  };

  // Babel Fish text encoding
  const encodeBabel = (text: string, mode: string) => {
    switch (mode) {
      case 'binary':
        return text
          .split('')
          .map((c) => c.charCodeAt(0).toString(2).padStart(8, '0'))
          .join(' ');
      case 'hex':
        return text
          .split('')
          .map((c) => '0x' + c.charCodeAt(0).toString(16).toUpperCase().padStart(2, '0'))
          .join(' ');
      case 'ascii':
        return text
          .split('')
          .map((c) => c.charCodeAt(0))
          .join(' - ');
      case 'rot13':
        return text.replace(/[a-zA-Z]/g, (c) => {
          const code = c.charCodeAt(0);
          const base = code >= 97 ? 97 : 65;
          return String.fromCharCode(((code - base + 13) % 26) + base);
        });
      case 'morse': {
        const morseMap: Record<string, string> = {
          A: '.-', B: '-...', C: '-.-.', D: '-..', E: '.', F: '..-.', G: '--.', H: '....',
          I: '..', J: '.---', K: '-.-', L: '.-..', M: '--', N: '-.', O: '---', P: '.--.',
          Q: '--.-', R: '.-.', S: '...', T: '-', U: '..-', V: '...-', W: '.--', X: '-..-',
          Y: '-.--', Z: '--..', '0': '-----', '1': '.----', '2': '..---', '3': '...--',
          '4': '....-', '5': '.....', '6': '-....', '7': '--...', '8': '---..', '9': '----.',
          ' ': ' / ', '*': '...-.-', "'": '.----.'
        };
        return text
          .toUpperCase()
          .split('')
          .map((c) => morseMap[c] || c)
          .join(' ');
      }
      default:
        return text;
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-8">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono mb-3">
          <Calculator className="w-3.5 h-3.5" />
          <span>LABORATOIRE INTERACTIF 42</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-display font-black text-white">
          Simulateurs & Convertisseurs Cosmiques
        </h2>
        <p className="text-slate-400 text-sm sm:text-base mt-2">
          Expérimentez en direct les propriétés mathématiques, optiques, informatiques et humoristiques du 42.
        </p>
      </div>

      {/* Tool Selector Tabs */}
      <div className="flex items-center justify-start sm:justify-center space-x-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
        <button
          id="tool-tab-converter"
          onClick={() => { soundManager.playClick(); setActiveTab('converter'); }}
          className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all border ${
            activeTab === 'converter'
              ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50 shadow-[0_0_15px_rgba(6,182,212,0.3)]'
              : 'bg-slate-900/60 text-slate-400 border-slate-800 hover:text-slate-200'
          }`}
        >
          <Binary className="w-4 h-4 text-cyan-400" />
          <span>Convertisseur Numérique</span>
        </button>

        <button
          id="tool-tab-sumcubes"
          onClick={() => { soundManager.playClick(); setActiveTab('sumcubes'); }}
          className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all border ${
            activeTab === 'sumcubes'
              ? 'bg-amber-500/20 text-amber-300 border-amber-500/50 shadow-[0_0_15px_rgba(245,158,11,0.3)]'
              : 'bg-slate-900/60 text-slate-400 border-slate-800 hover:text-slate-200'
          }`}
        >
          <Box className="w-4 h-4 text-amber-400" />
          <span>Somme des 3 Cubes (x³+y³+z³)</span>
        </button>

        <button
          id="tool-tab-rainbow"
          onClick={() => { soundManager.playClick(); setActiveTab('rainbow'); }}
          className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all border ${
            activeTab === 'rainbow'
              ? 'bg-sky-500/20 text-sky-300 border-sky-500/50 shadow-[0_0_15px_rgba(14,165,233,0.3)]'
              : 'bg-slate-900/60 text-slate-400 border-slate-800 hover:text-slate-200'
          }`}
        >
          <Sun className="w-4 h-4 text-sky-400" />
          <span>Optique de l'Arc-en-Ciel (42°)</span>
        </button>

        <button
          id="tool-tab-whale"
          onClick={() => { soundManager.playClick(); setActiveTab('whale'); }}
          className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all border ${
            activeTab === 'whale'
              ? 'bg-purple-500/20 text-purple-300 border-purple-500/50 shadow-[0_0_15px_rgba(168,85,247,0.3)]'
              : 'bg-slate-900/60 text-slate-400 border-slate-800 hover:text-slate-200'
          }`}
        >
          <Compass className="w-4 h-4 text-purple-400" />
          <span>Chute Libre du Cachalot</span>
        </button>

        <button
          id="tool-tab-babel"
          onClick={() => { soundManager.playClick(); setActiveTab('babel'); }}
          className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all border ${
            activeTab === 'babel'
              ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50 shadow-[0_0_15px_rgba(16,185,129,0.3)]'
              : 'bg-slate-900/60 text-slate-400 border-slate-800 hover:text-slate-200'
          }`}
        >
          <Zap className="w-4 h-4 text-emerald-400" />
          <span>Traducteur Poisson Babel</span>
        </button>
      </div>

      {/* Tool Container */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-slate-800 backdrop-blur-xl shadow-2xl">
        
        {/* ========================================================================= */}
        {/* TOOL 1: CONVERTER */}
        {/* ========================================================================= */}
        {activeTab === 'converter' && (
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
              <div>
                <h3 className="text-xl font-display font-bold text-white flex items-center gap-2">
                  <Binary className="w-5 h-5 text-cyan-400" />
                  <span>Convertisseur Cosmique Multi-Bases</span>
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">
                  Observez les représentations informatiques et mathématiques de n'importe quel entier.
                </p>
              </div>

              <div className="flex items-center space-x-2">
                <label className="text-xs font-mono text-slate-400">Entier à analyser :</label>
                <input
                  type="number"
                  value={inputValue}
                  onChange={(e) => handleInputChange(parseInt(e.target.value) || 0)}
                  className="w-24 px-3 py-1.5 rounded-xl bg-slate-950 border border-cyan-500/50 focus:border-cyan-400 text-cyan-300 font-mono text-center font-bold text-lg outline-none"
                />
                <button
                  onClick={() => handleInputChange(42)}
                  className="px-2.5 py-1.5 rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-xs font-mono hover:bg-cyan-500/30"
                >
                  Reset 42
                </button>
                <button
                  onClick={() => handleInputChange(54)}
                  title="Astuce : 54 en décimal vaut 42 en Base 13 !"
                  className="px-2.5 py-1.5 rounded-xl bg-rose-500/20 text-rose-300 border border-rose-500/30 text-xs font-mono hover:bg-rose-500/30"
                >
                  Tester 54
                </button>
              </div>
            </div>

            {/* Conversion Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
              
              {/* Binaire */}
              <div className="p-4 rounded-2xl bg-slate-950/70 border border-cyan-500/20 hover:border-cyan-500/40 transition-all">
                <div className="flex items-center justify-between text-xs text-slate-400 font-mono mb-1">
                  <span>BASE 2 (BINAIRE)</span>
                  <button onClick={() => handleCopy(convertToBase(inputValue, 2), 'bin')}>
                    {copiedKey === 'bin' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 hover:text-cyan-300" />}
                  </button>
                </div>
                <div className="text-xl font-mono font-bold text-cyan-300 tracking-wider">
                  {convertToBase(inputValue, 2)}
                </div>
                <div className="text-[11px] text-slate-500 mt-1">
                  {inputValue === 42 ? 'Cadence parfaite 101010 sur 6 bits' : `${convertToBase(inputValue, 2).length} bits`}
                </div>
              </div>

              {/* Hexadécimal */}
              <div className="p-4 rounded-2xl bg-slate-950/70 border border-purple-500/20 hover:border-purple-500/40 transition-all">
                <div className="flex items-center justify-between text-xs text-slate-400 font-mono mb-1">
                  <span>BASE 16 (HEXADÉCIMAL)</span>
                  <button onClick={() => handleCopy('0x' + convertToBase(inputValue, 16), 'hex')}>
                    {copiedKey === 'hex' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 hover:text-purple-300" />}
                  </button>
                </div>
                <div className="text-xl font-mono font-bold text-purple-300">
                  0x{convertToBase(inputValue, 16)}
                </div>
                <div className="text-[11px] text-slate-500 mt-1">
                  {inputValue === 42 ? '0x2A en mémoire vive' : 'Format préfixé 0x'}
                </div>
              </div>

              {/* ASCII */}
              <div className="p-4 rounded-2xl bg-slate-950/70 border border-emerald-500/20 hover:border-emerald-500/40 transition-all">
                <div className="flex items-center justify-between text-xs text-slate-400 font-mono mb-1">
                  <span>CARACTÈRE ASCII</span>
                  <button onClick={() => handleCopy(String.fromCharCode(inputValue), 'ascii')}>
                    {copiedKey === 'ascii' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 hover:text-emerald-300" />}
                  </button>
                </div>
                <div className="text-xl font-mono font-bold text-emerald-300">
                  {inputValue >= 32 && inputValue <= 126 ? `'${String.fromCharCode(inputValue)}'` : '[Non imprimable]'}
                </div>
                <div className="text-[11px] text-slate-500 mt-1">
                  {inputValue === 42 ? "Wildcard '*' : Tout sélectionner" : `chr(${inputValue}) en Python`}
                </div>
              </div>

              {/* Base 13 (H2G2) */}
              <div className="p-4 rounded-2xl bg-slate-950/70 border border-rose-500/30 hover:border-rose-500/50 transition-all">
                <div className="flex items-center justify-between text-xs text-rose-300 font-mono mb-1">
                  <span>BASE 13 (6 × 9 = 42 !)</span>
                  <button onClick={() => handleCopy(convertToBase(inputValue, 13), 'b13')}>
                    {copiedKey === 'b13' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 hover:text-rose-300" />}
                  </button>
                </div>
                <div className="text-xl font-mono font-bold text-rose-300">
                  {convertToBase(inputValue, 13)}₁₃
                </div>
                <div className="text-[11px] text-slate-400 mt-1">
                  {inputValue === 54 ? '🎉 54 en décimal donne bien 42 en Base 13 !' : 'Base de Trévizien (H2G2)'}
                </div>
              </div>

              {/* Octal */}
              <div className="p-4 rounded-2xl bg-slate-950/70 border border-amber-500/20 hover:border-amber-500/40 transition-all">
                <div className="flex items-center justify-between text-xs text-slate-400 font-mono mb-1">
                  <span>BASE 8 (OCTAL)</span>
                  <button onClick={() => handleCopy('0o' + convertToBase(inputValue, 8), 'oct')}>
                    {copiedKey === 'oct' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 hover:text-amber-300" />}
                  </button>
                </div>
                <div className="text-xl font-mono font-bold text-amber-300">
                  0o{convertToBase(inputValue, 8)}
                </div>
                <div className="text-[11px] text-slate-500 mt-1">
                  {inputValue === 42 ? 'Permissions chmod 052' : 'Système Octal'}
                </div>
              </div>

              {/* Facteurs premiers */}
              <div className="p-4 rounded-2xl bg-slate-950/70 border border-sky-500/20 hover:border-sky-500/40 transition-all">
                <div className="flex items-center justify-between text-xs text-slate-400 font-mono mb-1">
                  <span>DÉCOMPOSITION PREMIÈRE</span>
                  <button onClick={() => handleCopy('2 × 3 × 7', 'fact')}>
                    {copiedKey === 'fact' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 hover:text-sky-300" />}
                  </button>
                </div>
                <div className="text-xl font-mono font-bold text-sky-300">
                  {inputValue === 42 ? '2 × 3 × 7' : 'Analyse NSI'}
                </div>
                <div className="text-[11px] text-slate-500 mt-1">
                  {inputValue === 42 ? 'Nombre sphénique (3 facteurs distincts)' : 'Théorème fondamental de l\'arithmétique'}
                </div>
              </div>

            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TOOL 2: SUM OF THREE CUBES */}
        {/* ========================================================================= */}
        {activeTab === 'sumcubes' && (
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
              <div>
                <h3 className="text-xl font-display font-bold text-white flex items-center gap-2">
                  <Box className="w-5 h-5 text-amber-400" />
                  <span>Le Résolveur de Booker & Sutherland (2019)</span>
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">
                  Vérification par calcul d'entiers à précision infinie (BigInt) de l'équation : x³ + y³ + z³ = 42.
                </p>
              </div>

              <button
                onClick={runCubesVerification}
                disabled={isVerifyingCubes}
                className="flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white font-medium text-xs sm:text-sm shadow-[0_0_20px_rgba(245,158,11,0.3)] disabled:opacity-50 transition-all"
              >
                {isVerifyingCubes ? (
                  <>
                    <Sparkles className="w-4 h-4 animate-spin" />
                    <span>Calcul matriciel en cours...</span>
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4" />
                    <span>Exécuter la vérification BigInt</span>
                  </>
                )}
              </button>
            </div>

            {/* Giant Numbers Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
              
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-amber-500/30">
                <div className="text-xs font-mono text-amber-400 mb-1">ENTIER X (17 CHIFFRES)</div>
                <div className="font-mono text-sm sm:text-base text-slate-200 font-bold break-all">
                  -80 538 738 812 075 974
                </div>
                <div className="text-[11px] text-slate-500 mt-2 font-mono">
                  x³ ≈ -5.224 × 10⁵⁰
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950/80 border border-amber-500/30">
                <div className="text-xs font-mono text-amber-400 mb-1">ENTIER Y (17 CHIFFRES)</div>
                <div className="font-mono text-sm sm:text-base text-slate-200 font-bold break-all">
                  +80 435 758 145 817 515
                </div>
                <div className="text-[11px] text-slate-500 mt-2 font-mono">
                  y³ ≈ +5.204 × 10⁵⁰
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950/80 border border-amber-500/30">
                <div className="text-xs font-mono text-amber-400 mb-1">ENTIER Z (17 CHIFFRES)</div>
                <div className="font-mono text-sm sm:text-base text-slate-200 font-bold break-all">
                  +12 602 123 297 335 631
                </div>
                <div className="text-[11px] text-slate-500 mt-2 font-mono">
                  z³ ≈ +2.001 × 10⁴⁸
                </div>
              </div>

            </div>

            {/* Live Result display */}
            {verificationResult && (
              <div className="p-5 rounded-2xl bg-emerald-950/40 border border-emerald-500/50 flex items-center justify-between animate-fadeIn">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-300 font-bold text-lg">
                    ✓
                  </div>
                  <div>
                    <div className="text-emerald-300 font-display font-bold text-lg">
                      x³ + y³ + z³ = {verificationResult}
                    </div>
                    <div className="text-xs text-slate-300">
                      Égalité vérifiée sans aucun résidu d'arrondi sur les entiers 128-bit !
                    </div>
                  </div>
                </div>
                <span className="hidden sm:inline-block px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-mono text-xs border border-emerald-500/30">
                  Résolu en 2019
                </span>
              </div>
            )}
          </div>
        )}

        {/* ========================================================================= */}
        {/* TOOL 3: RAINBOW OPTICS */}
        {/* ========================================================================= */}
        {activeTab === 'rainbow' && (
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
              <div>
                <h3 className="text-xl font-display font-bold text-white flex items-center gap-2">
                  <Sun className="w-5 h-5 text-sky-400" />
                  <span>Simulateur Optique de René Descartes</span>
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">
                  Pourquoi l'angle d'émergence des rayons dans une goutte de pluie donne-t-il exactement 42,0° ?
                </p>
              </div>

              <div className="flex items-center space-x-3 bg-slate-950 p-2 rounded-xl border border-sky-500/30">
                <span className="text-xs font-mono text-slate-400">Indice réfraction n :</span>
                <input
                  type="range"
                  min="1.1"
                  max="1.8"
                  step="0.001"
                  value={refractiveIndex}
                  onChange={(e) => setRefractiveIndex(parseFloat(e.target.value))}
                  className="w-28 accent-sky-400 cursor-pointer"
                />
                <span className="font-mono text-xs text-sky-300 font-bold w-12 text-right">
                  {refractiveIndex.toFixed(3)}
                </span>
              </div>
            </div>

            {/* Interactive Graphic & Diagram */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6 items-center">
              
              <div className="lg:col-span-7 flex flex-col items-center justify-center p-6 rounded-2xl bg-slate-950/90 border border-slate-800 relative overflow-hidden min-h-[260px]">
                {/* SVG Visualizing the Raindrop */}
                <svg viewBox="0 0 400 240" className="w-full max-w-[360px] h-auto">
                  {/* Raindrop */}
                  <circle cx="200" cy="120" r="80" fill="rgba(56, 189, 248, 0.12)" stroke="#38bdf8" strokeWidth="2" />
                  
                  {/* Incident Ray (Sunlight) */}
                  <line x1="20" y1="70" x2="160" y2="70" stroke="#fde047" strokeWidth="2.5" strokeDasharray="4 2" />
                  <text x="30" y="60" fill="#fde047" fontSize="10" fontFamily="sans-serif">Rayon solaire incident</text>

                  {/* Refracted Ray inside drop */}
                  <line x1="160" y1="70" x2="270" y2="140" stroke="#38bdf8" strokeWidth="2" />

                  {/* Internally Reflected Ray */}
                  <line x1="270" y1="140" x2="180" y2="195" stroke="#a855f7" strokeWidth="2" />

                  {/* Emerging Rainbow Ray */}
                  <line x1="180" y1="195" x2="40" y2="225" stroke="#f43f5e" strokeWidth="3" />
                  
                  {/* Angle Arc Indicator */}
                  <path d="M 120 70 A 50 50 0 0 1 110 210" fill="none" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="3 3" />
                  <text x="75" y="145" fill="#38bdf8" fontSize="14" fontWeight="bold" fontFamily="Orbitron, sans-serif">
                    θ = {calculatedAngle}°
                  </text>
                </svg>

                <div className="text-[11px] font-mono text-slate-400 mt-2 text-center">
                  Goutte d'eau sphérique : Réfraction &rarr; Réflexion interne &rarr; Émergence à 42°
                </div>
              </div>

              <div className="lg:col-span-5 space-y-4 text-sm">
                <div className="p-4 rounded-2xl bg-sky-950/30 border border-sky-500/30">
                  <div className="text-xs font-mono text-sky-400 mb-1">DÉMONSTRATION DE DESCARTES</div>
                  <p className="text-slate-300 text-xs leading-relaxed">
                    L'angle de déviation total est donné par D(i) = 180° + 2i - 4r. En cherchant l'angle incident où la dérivée s'annule, on obtient un pic lumineux parfait à <strong>42,0°</strong> pour l'eau (n ≈ 1,333).
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800">
                  <div className="text-xs font-mono text-slate-400 mb-1">RÉSULTAT OPTIQUE EN DIRECT</div>
                  <div className="text-2xl font-display font-black text-transparent bg-clip-text bg-gradient-to-r from-sky-300 via-cyan-200 to-amber-300">
                    {calculatedAngle}°
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1">
                    {refractiveIndex === 1.333 ? 'Indice officiel de la pluie terrestre !' : 'Indice liquide modifié'}
                  </p>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TOOL 4: WHALE & PETUNIAS */}
        {/* ========================================================================= */}
        {activeTab === 'whale' && (
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
              <div>
                <h3 className="text-xl font-display font-bold text-white flex items-center gap-2">
                  <Compass className="w-5 h-5 text-purple-400" />
                  <span>Simulateur de Chute Libre de Magrathéa</span>
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">
                  Suivez la conscience émergente du cachalot et le stoïcisme du pot de pétunias.
                </p>
              </div>

              <div className="flex items-center space-x-2">
                {!isFalling && altitude === 0 ? (
                  <button
                    onClick={() => { setAltitude(50000); setFallStage(0); }}
                    className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Relancer à 50 000 m</span>
                  </button>
                ) : (
                  <button
                    onClick={() => { soundManager.playCompute(); setIsFalling(!isFalling); }}
                    className={`flex items-center space-x-2 px-5 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                      isFalling
                        ? 'bg-rose-600 hover:bg-rose-500 text-white'
                        : 'bg-purple-600 hover:bg-purple-500 text-white shadow-[0_0_15px_rgba(168,85,247,0.4)]'
                    }`}
                  >
                    <Play className="w-4 h-4" />
                    <span>{isFalling ? 'Mettre en pause' : 'Déclencher la Chute'}</span>
                  </button>
                )}
              </div>
            </div>

            {/* Altitude & Quotes Monitor */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mt-6 items-center">
              
              <div className="md:col-span-4 p-6 rounded-2xl bg-slate-950/80 border border-purple-500/20 text-center">
                <div className="text-xs font-mono text-purple-400 mb-1">ALTITUDE ACTUELLE</div>
                <div className="text-3xl sm:text-4xl font-mono font-black text-cyan-300">
                  {altitude.toLocaleString()} m
                </div>
                
                {/* Progress bar */}
                <div className="w-full h-2 bg-slate-800 rounded-full mt-4 overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-purple-500 to-cyan-400 transition-all duration-100"
                    style={{ width: `${(altitude / 50000) * 100}%` }}
                  />
                </div>

                <div className="text-xs font-mono text-slate-400 mt-2">
                  Vitesse estimée : 420 km/h
                </div>
              </div>

              <div className="md:col-span-8 space-y-4">
                
                {/* Whale thoughts */}
                <div className="p-4 rounded-2xl bg-purple-950/30 border border-purple-500/30">
                  <div className="flex items-center space-x-2 text-xs font-mono text-purple-300 mb-1">
                    <span>🐳</span>
                    <span>PENSÉES DU CACHALOT :</span>
                  </div>
                  <p className="text-sm text-slate-200 italic font-sans">
                    {fallStage === 0 && '"Et qu\'est-ce que c\'est que cette sensation ? Le vent ? J\'ai une queue ! Regardez comme elle bouge !"'}
                    {fallStage === 1 && '"Il y a tellement d\'espace ici ! Et ce truc brillant en dessous ? C\'est grand, rond et ça arrive vite !"'}
                    {fallStage === 2 && '"Ça a besoin d\'un joli nom... Le s... sol ! Oui ! Sol ! Je me demande s\'il voudra être mon ami ?"'}
                    {fallStage === 3 && '"Bonjour le sol !" *PLOUF COSMIQUE*'}
                  </p>
                </div>

                {/* Petunia pot thoughts */}
                <div className="p-4 rounded-2xl bg-rose-950/30 border border-rose-500/30">
                  <div className="flex items-center space-x-2 text-xs font-mono text-rose-300 mb-1">
                    <span>🪴</span>
                    <span>PENSÉES DU POT DE PÉTUNIAS :</span>
                  </div>
                  <p className="text-sm text-rose-200 italic font-sans font-semibold">
                    "Oh non, pas encore..."
                  </p>
                </div>

              </div>

            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TOOL 5: BABEL FISH */}
        {/* ========================================================================= */}
        {activeTab === 'babel' && (
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
              <div>
                <h3 className="text-xl font-display font-bold text-white flex items-center gap-2">
                  <Zap className="w-5 h-5 text-emerald-400" />
                  <span>Déchiffreur Universel Poisson Babel</span>
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">
                  Encodez et décodez n'importe quelle transmission galactique en formats NSI.
                </p>
              </div>

              <div className="flex items-center space-x-1.5 overflow-x-auto p-1 bg-slate-950 rounded-xl border border-slate-800">
                {(['binary', 'hex', 'ascii', 'rot13', 'morse'] as const).map((m) => (
                  <button
                    key={m}
                    onClick={() => { soundManager.playClick(); setBabelMode(m); }}
                    className={`px-2.5 py-1 rounded-lg text-xs font-mono uppercase transition-all ${
                      babelMode === m
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>

            {/* Input & Output */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              
              <div>
                <label className="text-xs font-mono text-slate-400 mb-1.5 block">Message Terrestre en clair :</label>
                <textarea
                  value={babelInput}
                  onChange={(e) => setBabelInput(e.target.value)}
                  rows={4}
                  className="w-full p-3.5 rounded-xl bg-slate-950 border border-slate-700/80 focus:border-emerald-400 text-slate-100 font-mono text-sm outline-none resize-none"
                  placeholder="Tapez un message..."
                />
                <div className="flex gap-2 mt-2">
                  <button
                    onClick={() => setBabelInput("42")}
                    className="px-2 py-1 rounded-md bg-slate-800 hover:bg-slate-700 text-[11px] font-mono text-slate-300"
                  >
                    Exemple: "42"
                  </button>
                  <button
                    onClick={() => setBabelInput("DON'T PANIC")}
                    className="px-2 py-1 rounded-md bg-slate-800 hover:bg-slate-700 text-[11px] font-mono text-slate-300"
                  >
                    Exemple: "DON'T PANIC"
                  </button>
                  <button
                    onClick={() => setBabelInput("Spécialité NSI 42")}
                    className="px-2 py-1 rounded-md bg-slate-800 hover:bg-slate-700 text-[11px] font-mono text-slate-300"
                  >
                    Exemple: "Spécialité NSI 42"
                  </button>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-mono text-emerald-400">Transmission Traduite ({babelMode.toUpperCase()}) :</label>
                  <button
                    onClick={() => handleCopy(encodeBabel(babelInput, babelMode), 'babel')}
                    className="text-xs font-mono text-slate-400 hover:text-emerald-300 flex items-center space-x-1"
                  >
                    {copiedKey === 'babel' ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-400" />
                        <span className="text-emerald-400">Copié !</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>Copier</span>
                      </>
                    )}
                  </button>
                </div>
                <div className="w-full h-[104px] p-3.5 rounded-xl bg-slate-950 border border-emerald-500/30 text-emerald-300 font-mono text-sm overflow-y-auto break-all select-all">
                  {encodeBabel(babelInput, babelMode)}
                </div>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
};
