import { EasterEgg } from '../types';

export const INITIAL_EASTER_EGGS: EasterEgg[] = [
  {
    id: 'towel-button',
    title: 'Le Réflexe de la Serviette',
    hint: 'Cliquez sur le bouton d\'urgence "PAS DE PANIQUE" en haut de la page.',
    discovered: false,
    reward: 'Médaille "Serviette Propre" : Vous êtes immunisé contre les poèmes Vogons !',
    icon: 'Shield'
  },
  {
    id: 'clicks-42',
    title: 'Le Rituel des 42 Clics',
    hint: 'Cliquez 42 fois sur l\'insigne lumineux 42 dans la bannière principale.',
    discovered: false,
    reward: 'Mode Supernova Galactique débloqué avec pluie stellaire d\'or !',
    icon: 'Sparkles'
  },
  {
    id: 'konami-code',
    title: 'Le Code Ancestral des Pionniers',
    hint: 'Tapez au clavier la séquence légendaire : Haut, Haut, Bas, Bas, Gauche, Droite, Gauche, Droite, B, A.',
    discovered: false,
    reward: 'Saut d\'Urgence en Hyperespace immédiat vers Magrathéa !',
    icon: 'Zap'
  },
  {
    id: 'terminal-secret',
    title: 'L\'Oracle Pensée Profonde',
    hint: 'Ouvrez le Terminal rétro et exécutez la commande "deepthought" ou "matrix".',
    discovered: false,
    reward: 'Accès aux registres cryptés du calcul des 7,5 millions d\'années.',
    icon: 'Terminal'
  },
  {
    id: 'whale-freefall',
    title: 'La Philosophie du Cachalot',
    hint: 'Lancez la simulation du Cachalot et du Pot de Pétunias dans les outils interactifs.',
    discovered: false,
    reward: 'Médaille "Ami du Sol" et citation philosophique de Marvin !',
    icon: 'Compass'
  },
  {
    id: 'base13-trick',
    title: 'L\'Arithmétique à 13 Doigts',
    hint: 'Dans le Convertisseur Magique, saisissez le nombre 54 pour voir son écriture en Base 13.',
    discovered: false,
    reward: 'Découverte de l\'équation 6 × 9 = 42 en base 13 !',
    icon: 'Calculator'
  }
];
