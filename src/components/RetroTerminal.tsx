import React, { useState, useEffect, useRef } from 'react';
import { Terminal, Send, Trash2, Zap, Sparkles, HelpCircle, Monitor } from 'lucide-react';
import { soundManager } from '../utils/audio';

interface RetroTerminalProps {
  onTriggerEasterEgg: (id: string) => void;
}

interface LogEntry {
  type: 'input' | 'output' | 'system' | 'error' | 'success';
  text: string;
}

const COMMAND_SUGGESTIONS = [
  'help',
  '42',
  'deepthought',
  'ascii',
  'binary',
  'nsi',
  'marvin',
  'towel',
  'matrix',
  'whale',
  'tea',
  'clear'
];

export const RetroTerminal: React.FC<RetroTerminalProps> = ({ onTriggerEasterEgg }) => {
  const [logs, setLogs] = useState<LogEntry[]>([
    { type: 'system', text: '========================================================' },
    { type: 'system', text: '  PENSÉE PROFONDE (DEEP THOUGHT) OS v42.0.42 — MAGRATHEA' },
    { type: 'system', text: '  MATRICE ALGORITHMIQUE NSI // TEMPS DE CALCUL : 7.5M ANS' },
    { type: 'system', text: '========================================================' },
    { type: 'output', text: 'Prêt. Tapez "help" pour la liste des commandes ou "42".' }
  ]);

  const [inputVal, setInputVal] = useState('');
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [isComputingDeepThought, setIsComputingDeepThought] = useState(false);
  const [isMatrixMode, setIsMatrixMode] = useState(false);

  const logsEndRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const scrollToBottom = () => {
    logsEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [logs]);

  const handleCommand = (cmdStr: string) => {
    const trimmed = cmdStr.trim();
    if (!trimmed) return;

    soundManager.playCompute();
    setCommandHistory((prev) => [...prev, trimmed]);
    setHistoryIndex(-1);

    const newLogs: LogEntry[] = [...logs, { type: 'input', text: `root@deepthought:~# ${trimmed}` }];
    const parts = trimmed.split(' ');
    const command = parts[0].toLowerCase();
    const args = parts.slice(1).join(' ');

    switch (command) {
      case 'help':
        newLogs.push({
          type: 'output',
          text: `COMMANDES DISPONIBLES :
  • 42             : La réponse ultime à la Grande Question
  • deepthought    : Lancer la simulation du calcul de 7,5 millions d'années
  • nsi            : Guide des liens avec le programme de lycée NSI
  • ascii          : Analyse du caractère '*' et code 42
  • binary         : Décomposition binaire et masquage de 101010
  • base13         : Démonstration de 6 x 9 = 42
  • cubes          : Résolution Booker & Sutherland de x³+y³+z³=42
  • marvin         : Écouter les réflexions joyeuses de Marvin
  • towel          : Protocole d'auto-stop galactique
  • tea            : Demander une tasse de thé au générateur de nutriments
  • whale          : Invocation d'un cachalot stratosphérique
  • matrix         : Activer le flux numérique de Magrathéa
  • calc [expr]    : Calculatrice mathématique
  • babel [texte]  : Encodage binaire instantané
  • clear          : Effacer l'écran`
        });
        break;

      case '42':
        onTriggerEasterEgg('terminal-secret');
        newLogs.push({
          type: 'success',
          text: `[RÉPONSE ULTIME ATTEINTE] : 42.
- En NSI      : Code ASCII 42 = '*' (Sélectionne l'univers entier)
- En Binaire  : 101010₂ (Symétrie parfaite sur 6 bits)
- En Maths    : 5e Catalan C₅ = 42 & Somme de trois cubes à 17 chiffres
- En Physique : Angle exact de l'arc-en-ciel de Descartes (42,0°)
- En H2G2     : "La vie, l'univers et le reste"`
        });
        break;

      case 'deepthought':
        onTriggerEasterEgg('terminal-secret');
        setIsComputingDeepThought(true);
        newLogs.push({
          type: 'system',
          text: `[INITIALISATION] Démarrage du cycle matriciel de 7,5 millions d'années...`
        });
        setLogs(newLogs);

        setTimeout(() => {
          setLogs((prev) => [
            ...prev,
            { type: 'output', text: `Année 1 000 000 : Calcul des constantes thermodynamiques fondamentales...` },
            { type: 'output', text: `Année 3 500 000 : Analyse de la syntaxe des arbres binaires et de Catalan...` },
            { type: 'output', text: `Année 6 000 000 : Vérification des dimensions d'improbabilité et des serviettes...` },
            { type: 'output', text: `Année 7 500 000 : CONVERGENCE ATTEINTE. RÉSULTAT : 42.` },
            { type: 'success', text: `Pensée Profonde : "C'est la réponse exacte. Maintenant, concevons la Terre pour trouver la Question."` }
          ]);
          setIsComputingDeepThought(false);
          soundManager.playUnlock();
        }, 1500);
        return;

      case 'nsi':
        newLogs.push({
          type: 'output',
          text: `FACETTES NSI (Numérique et Sciences Informatiques) DU 42 :
1. Type char ASCII : chr(42) renvoie '*' (Wildcard global).
2. Représentation binaire : bin(42) = '0b101010'.
3. Bit shifting : 42 >> 1 donne 21 ('010101').
4. Structures arborescentes : C₅ = 42 formes d'arbres binaires à 5 nœuds.
5. Fichiers TIFF : Magic number obligatoire 0x002A (42 en hexadécimal).
6. Machine Learning : seed standard random_state=42.`
        });
        break;

      case 'ascii':
        newLogs.push({
          type: 'output',
          text: `TABLE ASCII DÉCIMALE :
40 : '('  (Parenthèse ouvrante)
41 : ')'  (Parenthèse fermante)
42 : '*'  <-- L'ASTÉRISQUE UNIVERSEL (Wildcard / Pointeur / Tout)
43 : '+'  (Plus)
44 : ','  (Virgule)
ord('*') = 42 | hex(42) = '0x2a' | bin(42) = '0b101010'`
        });
        break;

      case 'binary':
        newLogs.push({
          type: 'output',
          text: `DÉCOMPOSITION DU BINAIRE 101010 :
Bit 5 (32) : 1
Bit 4 (16) : 0
Bit 3 (8)  : 1
Bit 2 (4)  : 0
Bit 1 (2)  : 1
Bit 0 (1)  : 0
Total      : 32 + 8 + 2 = 42.`
        });
        break;

      case 'base13':
        newLogs.push({
          type: 'output',
          text: `DÉMONSTRATION EN BASE 13 :
6₁₃ × 9₁₃ = 54₁₀
54 = (4 × 13¹) + (2 × 13⁰) = 42₁₃ !
Douglas Adams : "Personne n'écrit de blagues en base 13... sauf l'univers lui-même !"`
        });
        break;

      case 'cubes':
        newLogs.push({
          type: 'output',
          text: `SOMME DES 3 CUBES (Booker & Sutherland, 2019) :
(-80538738812075974)³ + (80435758145817515)³ + (12602123297335631)³ = 42`
        });
        break;

      case 'marvin': {
        const marvinQuotes = [
          "Marvin : 'J'ai un cerveau de la taille d'une planète et on me demande de simuler un terminal...'",
          "Marvin : 'Ne prétendez pas que vous m'appréciez. Même mes diodes gauches sont plus sympathiques.'",
          "Marvin : 'La vie. Ne m'en parlez pas.'",
          "Marvin : 'J'ai calculé 42 façons différentes pour que cette commande échoue.'"
        ];
        newLogs.push({
          type: 'output',
          text: marvinQuotes[Math.floor(Math.random() * marvinQuotes.length)]
        });
        break;
      }

      case 'towel':
        newLogs.push({
          type: 'success',
          text: `PROTOCOLE SERVIETTE ACTIVÉ :
Votre serviette est propre et bien pliée.
N'oubliez jamais : Un voyageur averti a toujours sa serviette et sait programmer en Python sans paniquer.`
        });
        break;

      case 'tea':
        newLogs.push({
          type: 'output',
          text: `Distribution en cours... Le synthétiseur Nutrimatique produit un liquide presque, mais pas tout à fait, totalement différent du thé.`
        });
        break;

      case 'whale':
        newLogs.push({
          type: 'output',
          text: `🐳 Un cachalot de 40 tonnes vient d'apparaître à 50 000 m d'altitude.
Pensée du cachalot : "Bonjour le sol !"
🪴 Pensée du pot de pétunias : "Oh non, pas encore..."`
        });
        break;

      case 'matrix':
        setIsMatrixMode((prev) => !prev);
        newLogs.push({
          type: 'success',
          text: `Mode Matrice de Magrathéa basculé !`
        });
        break;

      case 'calc':
        try {
          if (!args) {
            newLogs.push({ type: 'error', text: 'Usage : calc 6*7' });
          } else {
            // Safe basic math evaluator
            const sanitized = args.replace(/[^0-9+\-*/(). ]/g, '');
            // eslint-disable-next-line no-eval
            const res = Function(`'use strict'; return (${sanitized})`)();
            newLogs.push({ type: 'output', text: `${sanitized} = ${res}` });
          }
        } catch {
          newLogs.push({ type: 'error', text: 'Expression arithmétique invalide.' });
        }
        break;

      case 'babel':
        if (!args) {
          newLogs.push({ type: 'error', text: 'Usage : babel [texte à traduire en binaire]' });
        } else {
          const bin = args.split('').map((c) => c.charCodeAt(0).toString(2).padStart(8, '0')).join(' ');
          newLogs.push({ type: 'output', text: `Traduction binaire : ${bin}` });
        }
        break;

      case 'clear':
        setLogs([]);
        setInputVal('');
        return;

      default:
        newLogs.push({
          type: 'error',
          text: `Commande inconnue: "${trimmed}". Tapez "help" pour voir les commandes disponibles.`
        });
        break;
    }

    setLogs(newLogs);
    setInputVal('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    soundManager.playKeystroke();

    if (e.key === 'Enter') {
      handleCommand(inputVal);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const nextIdx = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(nextIdx);
        setInputVal(commandHistory[nextIdx]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex !== -1) {
        const nextIdx = historyIndex + 1;
        if (nextIdx < commandHistory.length) {
          setHistoryIndex(nextIdx);
          setInputVal(commandHistory[nextIdx]);
        } else {
          setHistoryIndex(-1);
          setInputVal('');
        }
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const match = COMMAND_SUGGESTIONS.find((cmd) => cmd.startsWith(inputVal.toLowerCase()));
      if (match) {
        setInputVal(match);
      }
    }
  };

  const executeQuickCommand = (cmd: string) => {
    handleCommand(cmd);
    inputRef.current?.focus();
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* Header Info */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono mb-2">
            <Terminal className="w-3.5 h-3.5" />
            <span>CONSOLE SYSTÈME CLI</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-display font-black text-white">
            Pensée Profonde v42.0 OS
          </h2>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => setLogs([])}
            title="Effacer les logs"
            className="flex items-center space-x-1 px-3 py-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 text-xs font-mono transition-all"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Effacer</span>
          </button>
        </div>
      </div>

      {/* Terminal Screen Frame */}
      <div className="rounded-3xl p-1 bg-gradient-to-b from-slate-700 via-slate-800 to-slate-900 shadow-[0_20px_50px_rgba(0,0,0,0.8)] border border-slate-700">
        
        {/* Terminal Titlebar */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900 rounded-t-[22px] border-b border-slate-800">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-rose-500/80" />
            <div className="w-3 h-3 rounded-full bg-amber-500/80" />
            <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
            <span className="text-xs font-mono text-slate-400 ml-2 font-medium">
              deepthought@magrathea:~ (x86_64-nsi)
            </span>
          </div>
          
          <div className="text-[11px] font-mono text-emerald-400/80 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>CPU 42.0 GHz &bull; ONLINE</span>
          </div>
        </div>

        {/* CRT Screen Display */}
        <div 
          className={`terminal-crt rounded-b-[22px] p-4 sm:p-6 min-h-[380px] max-h-[520px] overflow-y-auto font-terminal text-base sm:text-lg transition-colors ${
            isMatrixMode ? 'text-emerald-300' : 'text-emerald-400'
          }`}
          onClick={() => inputRef.current?.focus()}
        >
          <div className="scanline" />

          {/* Logs Output */}
          <div className="space-y-1.5 leading-relaxed">
            {logs.map((log, index) => (
              <div
                key={index}
                className={`whitespace-pre-wrap break-all ${
                  log.type === 'input'
                    ? 'text-cyan-300 font-mono text-sm font-semibold'
                    : log.type === 'system'
                    ? 'text-amber-300/90'
                    : log.type === 'error'
                    ? 'text-rose-400'
                    : log.type === 'success'
                    ? 'text-emerald-300 font-bold'
                    : 'text-emerald-400'
                }`}
              >
                {log.text}
              </div>
            ))}
            <div ref={logsEndRef} />
          </div>

          {/* Input Prompt */}
          <div className="flex items-center space-x-2 mt-4 pt-2 border-t border-emerald-900/50">
            <span className="text-cyan-400 font-mono text-sm font-bold select-none whitespace-nowrap">
              root@deepthought:~#
            </span>
            <input
              id="terminal-cli-input"
              ref={inputRef}
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isComputingDeepThought}
              placeholder={isComputingDeepThought ? 'Calcul en cours...' : 'Tapez une commande (ex: 42, nsi, help)...'}
              className="flex-1 bg-transparent text-emerald-300 font-mono text-sm sm:text-base outline-none caret-emerald-400 placeholder:text-emerald-900"
              autoFocus
            />
          </div>
        </div>

      </div>

      {/* Quick Command Suggestion Bar */}
      <div className="mt-4 flex flex-wrap items-center gap-2">
        <span className="text-xs font-mono text-slate-500">Suggestions :</span>
        {COMMAND_SUGGESTIONS.map((cmd) => (
          <button
            key={cmd}
            onClick={() => executeQuickCommand(cmd)}
            className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-emerald-500/40 text-emerald-400 text-xs font-mono transition-all"
          >
            {cmd}
          </button>
        ))}
      </div>

    </div>
  );
};
