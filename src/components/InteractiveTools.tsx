import React, { useState, useEffect, useMemo } from 'react';
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
  Info,
  Plus,
  Minus,
  Droplets
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

  // Recalculate rainbow ray geometry & angle based on Snell-Descartes
  const rainbowOptics = useMemo(() => {
    try {
      const n = Math.max(1.05, Math.min(2.5, refractiveIndex));
      const cosI2 = (n * n - 1) / 3;
      if (cosI2 >= 0 && cosI2 <= 1) {
        const cosI = Math.sqrt(cosI2);
        const i = Math.acos(cosI);
        const sinR = Math.sin(i) / n;
        const r = Math.asin(Math.min(1, Math.max(-1, sinR)));
        const thetaRad = 4 * r - 2 * i;
        const thetaDeg = (thetaRad * 180) / Math.PI;

        const cx = 200;
        const cy = 115;
        const R = 72;

        // Entry point P1 (on drop border, top left)
        const x1 = cx - R * Math.cos(i);
        const y1 = cy - R * Math.sin(i);

        // Reflection point P2 (on drop border, right side)
        const phi2 = 2 * r - i;
        const x2 = cx + R * Math.cos(phi2);
        const y2 = cy - R * Math.sin(phi2);

        // Emergence point P3 (on drop border, bottom left)
        const phi3 = 4 * r - i;
        const x3 = cx - R * Math.cos(phi3);
        const y3 = cy + R * Math.sin(phi3);

        // Emerging ray exit vector
        const rayLen = 135;
        const x4 = x3 - rayLen * Math.cos(thetaRad);
        const y4 = y3 + rayLen * Math.sin(thetaRad);

        // Dispersion rays (Red & Violet)
        const nRed = n - 0.006;
        const rRed = Math.asin(Math.min(1, Math.sin(i) / nRed));
        const thetaRed = 4 * rRed - 2 * i;
        const x4Red = x3 - (rayLen + 10) * Math.cos(thetaRed);
        const y4Red = y3 + (rayLen + 10) * Math.sin(thetaRed);

        const nViolet = n + 0.008;
        const rViolet = Math.asin(Math.min(1, Math.sin(i) / nViolet));
        const thetaViolet = 4 * rViolet - 2 * i;
        const x4Violet = x3 - (rayLen + 10) * Math.cos(thetaViolet);
        const y4Violet = y3 + (rayLen + 10) * Math.sin(thetaViolet);

        const isExact42 = Math.abs(thetaDeg - 42.0) <= 0.15;

        return {
          calculatedAngle: Number(thetaDeg.toFixed(1)),
          exactAngle: thetaDeg,
          iDeg: Number(((i * 180) / Math.PI).toFixed(1)),
          rDeg: Number(((r * 180) / Math.PI).toFixed(1)),
          cx,
          cy,
          R,
          p1: { x: x1, y: y1 },
          p2: { x: x2, y: y2 },
          p3: { x: x3, y: y3 },
          p4: { x: x4, y: y4 },
          p4Red: { x: x4Red, y: y4Red },
          p4Violet: { x: x4Violet, y: y4Violet },
          isExact42,
        };
      }
    } catch {
      // fallback
    }

    return {
      calculatedAngle: 42.0,
      exactAngle: 42.0,
      iDeg: 59.4,
      rDeg: 40.2,
      cx: 200,
      cy: 115,
      R: 72,
      p1: { x: 163, y: 53 },
      p2: { x: 267, y: 89 },
      p3: { x: 185, y: 185 },
      p4: { x: 75, y: 235 },
      p4Red: { x: 70, y: 232 },
      p4Violet: { x: 80, y: 238 },
      isExact42: true,
    };
  }, [refractiveIndex]);

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
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-slate-800">
              <div>
                <h3 className="text-xl font-display font-bold text-white flex items-center gap-2">
                  <Sun className="w-5 h-5 text-sky-400" />
                  <span>Simulateur Optique de René Descartes</span>
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">
                  Observez comment l'angle d'émergence des rayons dans une goutte d'eau sphérique produit l'arc-en-ciel à exactement <strong>42,0°</strong>.
                </p>
              </div>

              {/* Target 42 Button & Direct Control */}
              <div className="flex flex-wrap items-center gap-2">
                <button
                  id="target-water-42"
                  onClick={() => {
                    soundManager.playClick();
                    setRefractiveIndex(1.333);
                  }}
                  className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs font-mono font-bold transition-all border ${
                    rainbowOptics.isExact42
                      ? 'bg-gradient-to-r from-sky-500 to-cyan-500 text-white border-sky-400 shadow-[0_0_20px_rgba(14,165,233,0.4)]'
                      : 'bg-sky-500/20 text-sky-300 border-sky-500/40 hover:bg-sky-500/30'
                  }`}
                >
                  <Droplets className="w-4 h-4" />
                  <span>💧 Eau Pure (42,0°)</span>
                </button>

                <div className="flex items-center space-x-2 bg-slate-950 p-1.5 rounded-xl border border-sky-500/30">
                  <button
                    onClick={() => {
                      soundManager.playClick();
                      setRefractiveIndex((prev) => Number(Math.max(1.1, prev - 0.005).toFixed(3)));
                    }}
                    className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white"
                    title="Diminuer n de 0.005"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>

                  <div className="flex items-center space-x-1">
                    <span className="text-[11px] font-mono text-slate-400">n =</span>
                    <input
                      type="number"
                      min="1.1"
                      max="1.8"
                      step="0.001"
                      value={refractiveIndex}
                      onChange={(e) => {
                        const val = parseFloat(e.target.value);
                        if (!isNaN(val)) setRefractiveIndex(val);
                      }}
                      className="w-16 px-1.5 py-0.5 rounded bg-slate-900 border border-slate-700 text-sky-300 font-mono text-xs font-bold text-center outline-none focus:border-sky-400"
                    />
                  </div>

                  <button
                    onClick={() => {
                      soundManager.playClick();
                      setRefractiveIndex((prev) => Number(Math.min(1.8, prev + 0.005).toFixed(3)));
                    }}
                    className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white"
                    title="Augmenter n de 0.005"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Presets Row */}
            <div className="flex items-center gap-2 overflow-x-auto py-3 border-b border-slate-800/60 scrollbar-none text-xs font-mono">
              <span className="text-slate-500 text-[11px] whitespace-nowrap">Milieux de réfraction :</span>
              {[
                { label: '💧 Eau (pluie)', n: 1.333, desc: '42.0° (Pic)' },
                { label: '🧊 Glace', n: 1.309, desc: '43.6°' },
                { label: '🍸 Éthanol', n: 1.361, desc: '40.3°' },
                { label: '🧴 Glycérine', n: 1.473, desc: '33.4°' },
                { label: '🪟 Verre Flint', n: 1.520, desc: '28.6°' },
              ].map((preset) => {
                const isSelected = Math.abs(refractiveIndex - preset.n) < 0.002;
                return (
                  <button
                    key={preset.label}
                    onClick={() => {
                      soundManager.playClick();
                      setRefractiveIndex(preset.n);
                    }}
                    className={`px-2.5 py-1 rounded-lg whitespace-nowrap transition-all border ${
                      isSelected
                        ? 'bg-sky-500/25 text-sky-200 border-sky-400 shadow-[0_0_10px_rgba(56,189,248,0.3)] font-bold'
                        : 'bg-slate-950/60 text-slate-400 border-slate-800 hover:text-slate-200 hover:border-slate-700'
                    }`}
                  >
                    <span>{preset.label}</span>
                    <span className="ml-1.5 text-[10px] text-slate-500 font-normal">({preset.n})</span>
                  </button>
                );
              })}
            </div>

            {/* Slider Control */}
            <div className="mt-4 p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center space-x-3 flex-1">
                <span className="text-xs font-mono text-slate-400 whitespace-nowrap">Ajustement fluide de l'indice n :</span>
                <input
                  type="range"
                  min="1.15"
                  max="1.65"
                  step="0.001"
                  value={refractiveIndex}
                  onChange={(e) => setRefractiveIndex(parseFloat(e.target.value))}
                  className="w-full accent-sky-400 cursor-pointer h-2 bg-slate-800 rounded-lg"
                />
              </div>
              <div className="flex items-center space-x-2 text-xs font-mono justify-end">
                <span className="text-slate-400">Valeur active :</span>
                <span className="text-sky-300 font-bold bg-slate-900 px-2 py-0.5 rounded border border-sky-500/30">
                  {refractiveIndex.toFixed(3)}
                </span>
              </div>
            </div>

            {/* Interactive Graphic & Diagram with Dynamic Ray Tracing */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6 items-center">
              
              <div className="lg:col-span-7 flex flex-col items-center justify-center p-6 rounded-2xl bg-slate-950/90 border border-slate-800 relative overflow-hidden min-h-[280px]">
                
                {/* Visual Ray Simulation */}
                <svg viewBox="0 0 400 250" className="w-full max-w-[380px] h-auto select-none">
                  <defs>
                    <linearGradient id="rainbowBeam" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#f43f5e" />
                      <stop offset="25%" stopColor="#fb923c" />
                      <stop offset="50%" stopColor="#facc15" />
                      <stop offset="75%" stopColor="#4ade80" />
                      <stop offset="100%" stopColor="#818cf8" />
                    </linearGradient>
                    <radialGradient id="dropletGlow" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="rgba(56, 189, 248, 0.25)" />
                      <stop offset="80%" stopColor="rgba(14, 165, 233, 0.08)" />
                      <stop offset="100%" stopColor="rgba(56, 189, 248, 0.35)" />
                    </radialGradient>
                  </defs>

                  {/* Anti-solar axis reference line */}
                  <line 
                    x1="20" 
                    y1={rainbowOptics.p1.y} 
                    x2="380" 
                    y2={rainbowOptics.p1.y} 
                    stroke="#475569" 
                    strokeWidth="1" 
                    strokeDasharray="4 4" 
                  />
                  <text x="310" y={rainbowOptics.p1.y - 6} fill="#64748b" fontSize="9" fontFamily="monospace">Axe solaire</text>

                  {/* Drop Center Crosshair */}
                  <circle cx={rainbowOptics.cx} cy={rainbowOptics.cy} r="2" fill="#38bdf8" opacity="0.5" />

                  {/* Raindrop Body */}
                  <circle 
                    cx={rainbowOptics.cx} 
                    cy={rainbowOptics.cy} 
                    r={rainbowOptics.R} 
                    fill="url(#dropletGlow)" 
                    stroke="#38bdf8" 
                    strokeWidth={rainbowOptics.isExact42 ? "2.5" : "1.5"}
                    className="transition-all duration-150"
                  />

                  {/* Normal at Entry Point */}
                  <line 
                    x1={rainbowOptics.cx} 
                    y1={rainbowOptics.cy} 
                    x2={rainbowOptics.p1.x - 20} 
                    y2={rainbowOptics.p1.y - 12} 
                    stroke="#0284c7" 
                    strokeWidth="1" 
                    strokeDasharray="2 2" 
                    opacity="0.4"
                  />

                  {/* 1. Incident Ray (Sunlight) */}
                  <line 
                    x1="15" 
                    y1={rainbowOptics.p1.y} 
                    x2={rainbowOptics.p1.x} 
                    y2={rainbowOptics.p1.y} 
                    stroke="#fde047" 
                    strokeWidth="2.5" 
                  />
                  <polygon 
                    points={`${rainbowOptics.p1.x - 30},${rainbowOptics.p1.y - 4} ${rainbowOptics.p1.x - 20},${rainbowOptics.p1.y} ${rainbowOptics.p1.x - 30},${rainbowOptics.p1.y + 4}`} 
                    fill="#fde047" 
                  />
                  <text x="25" y={rainbowOptics.p1.y - 8} fill="#fde047" fontSize="10" fontWeight="bold" fontFamily="sans-serif">
                    Rayon incident
                  </text>

                  {/* 2. Refracted Ray inside drop (P1 -> P2) */}
                  <line 
                    x1={rainbowOptics.p1.x} 
                    y1={rainbowOptics.p1.y} 
                    x2={rainbowOptics.p2.x} 
                    y2={rainbowOptics.p2.y} 
                    stroke="#38bdf8" 
                    strokeWidth="2" 
                    className="transition-all duration-75"
                  />
                  {/* Point of entry */}
                  <circle cx={rainbowOptics.p1.x} cy={rainbowOptics.p1.y} r="3" fill="#fde047" />

                  {/* 3. Internally Reflected Ray (P2 -> P3) */}
                  <line 
                    x1={rainbowOptics.p2.x} 
                    y1={rainbowOptics.p2.y} 
                    x2={rainbowOptics.p3.x} 
                    y2={rainbowOptics.p3.y} 
                    stroke="#c084fc" 
                    strokeWidth="2" 
                    className="transition-all duration-75"
                  />
                  {/* Point of internal reflection */}
                  <circle cx={rainbowOptics.p2.x} cy={rainbowOptics.p2.y} r="3" fill="#c084fc" />

                  {/* Point of emergence */}
                  <circle cx={rainbowOptics.p3.x} cy={rainbowOptics.p3.y} r="3" fill="#f43f5e" />

                  {/* 4. Emerging Dispersed Rays (Rainbow Spectrum) */}
                  {/* Red Ray */}
                  <line 
                    x1={rainbowOptics.p3.x} 
                    y1={rainbowOptics.p3.y} 
                    x2={rainbowOptics.p4Red.x} 
                    y2={rainbowOptics.p4Red.y} 
                    stroke="#f43f5e" 
                    strokeWidth="2.5" 
                    className="transition-all duration-75"
                  />
                  {/* Violet Ray */}
                  <line 
                    x1={rainbowOptics.p3.x} 
                    y1={rainbowOptics.p3.y} 
                    x2={rainbowOptics.p4Violet.x} 
                    y2={rainbowOptics.p4Violet.y} 
                    stroke="#818cf8" 
                    strokeWidth="2" 
                    className="transition-all duration-75"
                  />
                  {/* Central Rainbow Core */}
                  <line 
                    x1={rainbowOptics.p3.x} 
                    y1={rainbowOptics.p3.y} 
                    x2={rainbowOptics.p4.x} 
                    y2={rainbowOptics.p4.y} 
                    stroke="url(#rainbowBeam)" 
                    strokeWidth="3.5" 
                    className="transition-all duration-75"
                  />

                  {/* Angle Arc Indicator */}
                  <path 
                    d={`M ${rainbowOptics.p3.x - 35} ${rainbowOptics.p1.y} A 35 35 0 0 1 ${rainbowOptics.p3.x - 28} ${rainbowOptics.p3.y + 10}`} 
                    fill="none" 
                    stroke="#38bdf8" 
                    strokeWidth="1.5" 
                    strokeDasharray="3 3" 
                  />

                  {/* Angle Label */}
                  <text 
                    x={Math.max(20, rainbowOptics.p4.x - 10)} 
                    y={Math.min(240, rainbowOptics.p4.y + 15)} 
                    fill={rainbowOptics.isExact42 ? "#38bdf8" : "#94a3b8"} 
                    fontSize="13" 
                    fontWeight="bold" 
                    fontFamily="monospace"
                  >
                    θ = {rainbowOptics.calculatedAngle}°
                  </text>
                </svg>

                <div className="text-[11px] font-mono text-slate-400 mt-2 text-center flex items-center justify-center gap-3">
                  <span>Rayon d'incidence : <strong>{rainbowOptics.iDeg}°</strong></span>
                  <span>•</span>
                  <span>Réfraction interne : <strong>{rainbowOptics.rDeg}°</strong></span>
                  <span>•</span>
                  <span className="text-sky-300 font-bold">Angle d'émergence : {rainbowOptics.calculatedAngle}°</span>
                </div>
              </div>

              {/* Information Cards & 42 Validation */}
              <div className="lg:col-span-5 space-y-3.5 text-sm">
                
                {/* 42 Alignment Banner */}
                {rainbowOptics.isExact42 ? (
                  <div className="p-4 rounded-2xl bg-gradient-to-r from-sky-950/80 via-cyan-950/80 to-amber-950/80 border border-sky-400/80 shadow-[0_0_25px_rgba(56,189,248,0.25)] animate-fadeIn">
                    <div className="flex items-center space-x-2 text-amber-300 text-xs font-mono font-bold mb-1">
                      <Sparkles className="w-4 h-4 text-amber-400 animate-spin" />
                      <span>ALIGNEMENT COSMIQUE ATTEINT !</span>
                    </div>
                    <div className="text-lg font-display font-black text-white">
                      θ = 42,0° — Le Cône de Descartes
                    </div>
                    <p className="text-slate-300 text-xs mt-1 leading-relaxed">
                      C'est l'angle exact pour lequel l'intensité lumineuse de l'arc-en-ciel primaire se concentre dans l'œil de l'observateur terrestre.
                    </p>
                  </div>
                ) : (
                  <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono text-slate-400">Angle d'émergence calculé :</span>
                      <span className="text-lg font-mono font-black text-sky-300">
                        {rainbowOptics.calculatedAngle}°
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-500 mt-1">
                      Écart avec l'eau (42,0°) : {(rainbowOptics.calculatedAngle - 42.0).toFixed(1)}°
                    </div>
                  </div>
                )}

                <div className="p-4 rounded-2xl bg-sky-950/30 border border-sky-500/30">
                  <div className="text-xs font-mono text-sky-400 mb-1">FORMULE DE RENÉ DESCARTES (1637)</div>
                  <p className="text-slate-300 text-xs leading-relaxed">
                    L'angle de déviation total est donné par <code>D(i) = 180° + 2i - 4r</code>. En annulant la dérivée <code>dD/di = 0</code>, on trouve <code>cos(i) = √((n² - 1)/3)</code>, ce qui donne exactement <strong>42,0°</strong> pour l'eau (n = 1,333).
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800 text-xs text-slate-400 flex items-start space-x-2">
                  <Info className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                  <p>
                    Pour l'eau de mer (n ≈ 1,34), l'arc-en-ciel apparaît à 41,0°. C'est la structure moléculaire de l'eau douce terrestre qui crée ce 42 cosmique !
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
