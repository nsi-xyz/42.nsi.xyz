import { QuizQuestion, QuizTierInfo, SecretDocument } from '../types';

export const QUIZ_TIERS: QuizTierInfo[] = [
  {
    id: 'novice',
    name: 'Palier 1 : Auto-Stoppeur Débutant',
    levelTitle: 'Auto-Stoppeur Galactique',
    badge: '🎒',
    minPoints: 60,
    description: 'Les fondamentaux du 42, du binaire et de l\'univers de Douglas Adams.',
    unlockedContentTitle: 'Dossier Secret N°1 : Le Protocole de la Serviette'
  },
  {
    id: 'voyager',
    name: 'Palier 2 : Navigateur de l\'Improbabilité',
    levelTitle: 'Navigateur Stellaire NSI',
    badge: '🚀',
    minPoints: 160,
    description: 'Arithmétique modulaire, ASCII, optique et combinatoire de Catalan.',
    unlockedContentTitle: 'Dossier Secret N°2 : Les Équations Oubliées de Magrathéa'
  },
  {
    id: 'magrathean',
    name: 'Palier 3 : Ingénieur Magratéen',
    levelTitle: 'Bâtisseur de Planètes',
    badge: '🪐',
    minPoints: 300,
    description: 'Somme des trois cubes, BigInt, physique gravitationnelle et secrets système.',
    unlockedContentTitle: 'Dossier Secret N°3 : Le Schéma Directeur de Pensée Profonde'
  },
  {
    id: 'deepthought',
    name: 'Palier 4 : Grand Maître Pensée Profonde',
    levelTitle: 'Oracle Cosmique Ultime',
    badge: '🌌',
    minPoints: 460,
    description: 'Le test suprême de connaissances croisées NSI, mathématiques et H2G2.',
    unlockedContentTitle: 'Archive Ultime : Le Véritable Texte de la Grande Question'
  }
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  // --- PALIER 1 : NOVICE ---
  {
    id: 'q1',
    tier: 'novice',
    question: 'Combien de temps l\'ordinateur Pensée Profonde a-t-il calculé pour donner la Réponse 42 ?',
    options: [
      '42 jours terrestres',
      '7,5 millions d\'années',
      '10 000 siècles',
      '42 minutes et 12 secondes'
    ],
    correctIndex: 1,
    explanation: 'Dans le roman de Douglas Adams, Pensée Profonde calcule pendant 7,5 millions d\'années avant de révéler solennellement que la réponse est 42.',
    nsiRelation: 'En NSI, cela illustre avec humour la complexité temporelle d\'un algorithme à durée exponentielle !',
    points: 20
  },
  {
    id: 'q2',
    tier: 'novice',
    question: 'Quel est le caractère représenté par le code ASCII 42 ?',
    options: [
      'L\'astérisque (*)',
      'Le point d\'interrogation (?)',
      'Le dièse (#)',
      'L\'esperluette (&)'
    ],
    correctIndex: 0,
    explanation: 'En table ASCII décimale, 42 correspond à "*", le symbole wildcard qui représente "tous les caractères possibles" dans les commandes Unix et les regex.',
    nsiRelation: 'En Python : chr(42) == "*". En NSI, ord("*") == 42.',
    points: 20
  },
  {
    id: 'q3',
    tier: 'novice',
    question: 'Comment s\'écrit le nombre 42 en binaire sur 6 bits ?',
    options: [
      '110011',
      '101010',
      '010101',
      '111100'
    ],
    correctIndex: 1,
    explanation: '42 = 32 + 8 + 2 = 2^5 + 2^3 + 2^1, ce qui donne la séquence binaire parfaite "101010".',
    nsiRelation: 'La conversion décimal-binaire par divisions successives est au cœur du programme de Première NSI.',
    points: 20
  },
  {
    id: 'q4',
    tier: 'novice',
    question: 'Quelle est la date officielle du "Towel Day" célébré dans le monde entier ?',
    options: [
      '4 février (04/02)',
      '25 mai',
      '42 octobre',
      '15 avril'
    ],
    correctIndex: 1,
    explanation: 'Le Towel Day (Journée de la Serviette) a lieu chaque 25 mai depuis 2001 en hommage à Douglas Adams.',
    nsiRelation: 'Rappelez-vous toujours : un bon développeur sait toujours où se trouve sa serviette !',
    points: 20
  },

  // --- PALIER 2 : VOYAGER ---
  {
    id: 'q5',
    tier: 'voyager',
    question: 'Pourquoi l\'égalité 6 × 9 = 42 est-elle mathématiquement exacte en base 13 ?',
    options: [
      'Car 6 x 9 = 54 en décimal, et 54 = 4 x 13 + 2 = 42 en base 13',
      'Car en base 13, les chiffres s\'arrêtent à 9',
      'Car 42 est un nombre premier en base 13',
      'C\'est une illusion due à l\'improbabilité quantique'
    ],
    correctIndex: 0,
    explanation: 'En base 13 : 42 représente 4 × 13¹ + 2 × 13⁰ = 52 + 2 = 54 en décimal, qui est exactement le produit de 6 par 9.',
    nsiRelation: 'L\'arithmétique en base quelconque (Hexadécimal, Octal, Base 13) teste la compréhension de la numération de position en NSI.',
    points: 30
  },
  {
    id: 'q6',
    tier: 'voyager',
    question: 'Quel nombre de Catalan vaut 42 ?',
    options: [
      'Le 3e nombre de Catalan (C₃)',
      'Le 4e nombre de Catalan (C₄)',
      'Le 5e nombre de Catalan (C₅)',
      'Le 7e nombre de Catalan (C₇)'
    ],
    correctIndex: 2,
    explanation: 'La suite des nombres de Catalan commence par 1, 1, 2, 5, 14, 42. Le 5e terme C₅ = 42 compte les arbres binaires à 5 nœuds.',
    nsiRelation: 'Les arbres binaires et leur dénombrement font partie intégrante des structures de données en Terminale NSI.',
    points: 30
  },
  {
    id: 'q7',
    tier: 'voyager',
    question: 'Pourquoi les arcs-en-ciel primaires ont-ils un angle de 42° par rapport à l\'observateur ?',
    options: [
      'C\'est la température d\'ébullition de la pluie',
      'C\'est l\'angle de réfraction et réflexion interne maximal dans les gouttes d\'eau selon Descartes',
      'C\'est l\'inclinaison de l\'axe de rotation de la Terre',
      'C\'est la vitesse de dispersion de la lumière dans le vide'
    ],
    correctIndex: 1,
    explanation: 'Selon les lois de Snell-Descartes avec l\'indice de l\'eau n ≈ 1,333, la concentration maximale de rayons renvoyés vers l\'œil se produit à 42°.',
    points: 30
  },
  {
    id: 'q8',
    tier: 'voyager',
    question: 'Quel est le numéro magique (magic number) obligatoire dans l\'en-tête d\'un fichier TIFF ?',
    options: [
      '0xFF 0xD8 (JPEG)',
      '0x89 0x50 (PNG)',
      '0x002A (valeur 42)',
      '0x4242'
    ],
    correctIndex: 2,
    explanation: 'Dans la norme TIFF, les octets 2 et 3 doivent valoir 42 (0x002A) en hommage explicite à Douglas Adams.',
    nsiRelation: 'L\'identification des fichiers binaires par leur magic number est une technique fondamentale en cybersécurité et analyse système.',
    points: 30
  },

  // --- PALIER 3 : MAGRATHEAN ---
  {
    id: 'q9',
    tier: 'magrathean',
    question: 'En 2019, la solution à l\'équation x³ + y³ + z³ = 42 a été trouvée. Combien de chiffres comportent chacun des entiers x, y et z ?',
    options: [
      '3 chiffres chacun',
      '7 chiffres chacun',
      '17 chiffres chacun',
      '42 chiffres chacun'
    ],
    correctIndex: 2,
    explanation: 'Andrew Booker et Andrew Sutherland ont découvert des entiers gigantesques de 17 chiffres chacun, comme x = -80 538 738 812 075 974 !',
    nsiRelation: 'En Python 3, la gestion automatique des entiers non bornés (BigInt) permet d\'élever ces nombres au cube sans overflow.',
    points: 40
  },
  {
    id: 'q10',
    tier: 'magrathean',
    question: 'Pourquoi 42 est-il qualifié de "nombre abondant" en arithmétique ?',
    options: [
      'Car il possède une infinité de décimales',
      'Car la somme de ses diviseurs stricts (54) est strictement supérieure à 42',
      'Car il est divisible par tous les nombres premiers inférieurs à 10',
      'Car il dépasse la constante de Planck'
    ],
    correctIndex: 1,
    explanation: 'Les diviseurs stricts de 42 sont 1, 2, 3, 6, 7, 14, 21. Leur somme fait 54. Comme 54 > 42, c\'est un nombre abondant.',
    nsiRelation: 'Écrire une fonction Python vérifiant si un entier n est abondant, déficient ou parfait est un exercice algorithmique classique.',
    points: 40
  },
  {
    id: 'q11',
    tier: 'magrathean',
    question: 'Si on perce un tunnel gravitationnel sous vide traversant la Terre en ligne droite, combien de temps prend la chute sans propulsion ?',
    options: [
      '7 jours',
      '42 minutes et 12 secondes',
      '3 heures et 14 minutes',
      '12 secondes'
    ],
    correctIndex: 1,
    explanation: 'L\'oscillation harmonique gravitationnelle à travers une sphère terrestre homogène donne une demi-période t = π√(R/g) ≈ 42 minutes.',
    points: 40
  },
  {
    id: 'q12',
    tier: 'magrathean',
    question: 'Dans quelle œuvre de Lewis Carroll la "Règle 42" oblige-t-elle les personnes de plus d\'un mille de haut à quitter la cour ?',
    options: [
      'De l\'autre côté du miroir',
      'Les Aventures d\'Alice au pays des merveilles',
      'La Chasse au Snark',
      'Sylvie et Bruno'
    ],
    correctIndex: 1,
    explanation: 'Lors du procès du Valet de Cœur dans Alice au pays des merveilles, le Roi invoque la "Règle Quarante-Deux" pour tenter d\'expulser Alice.',
    points: 40
  },

  // --- PALIER 4 : DEEP THOUGHT ULTIME ---
  {
    id: 'q13',
    tier: 'deepthought',
    question: 'Quelle est la seule et unique pensée formulée par le pot de pétunias en tombant du ciel sur Magrathéa ?',
    options: [
      '"J\'espère que le sol sera doux avec moi !"',
      '"Oh non, pas encore..."',
      '"42 !"',
      '"Où est ma serviette ?"'
    ],
    correctIndex: 1,
    explanation: 'Tandis que le cachalot s\'émerveille de tout ce qui l\'entoure, le pot de pétunias pense simplement : "Oh non, pas encore...", car il est la réincarnation éternellement malchanceuse d\'Agrajag.',
    points: 50
  },
  {
    id: 'q14',
    tier: 'deepthought',
    question: 'Quelle opération de décalage binaire (bit-shift) permet de transformer 42 (101010) en 21 (010101) ?',
    options: [
      '42 << 1',
      '42 >> 1',
      '42 ^ 1',
      '42 & 21'
    ],
    correctIndex: 1,
    explanation: 'Le décalage à droite de 1 bit (42 >> 1) divise l\'entier par 2 en arithmétique binaire et inverse la parité des positions.',
    nsiRelation: 'Les opérateurs de décalage binaire (<< et >>) sont des instructions machines directes exécutées en 1 cycle d\'horloge.',
    points: 50
  },
  {
    id: 'q15',
    tier: 'deepthought',
    question: 'Quel nom porte la célèbre nébuleuse stellaire numéro 42 du catalogue Messier ?',
    options: [
      'La Nébuleuse du Crabe',
      'La Nébuleuse d\'Orion',
      'La Nébuleuse d\'Andromède',
      'La Nébuleuse de la Tête de Cheval'
    ],
    correctIndex: 1,
    explanation: 'Messier 42 (M42) est la grande nébuleuse d\'Orion, visible à l\'œil nu dans la constellation d\'Orion à 1344 années-lumière.',
    points: 50
  },
  {
    id: 'q16',
    tier: 'deepthought',
    question: 'Dans la philosophie de Douglas Adams, pourquoi la Terre a-t-elle été créée ?',
    options: [
      'Pour servir d\'abri aux dauphins',
      'Pour être un ordinateur matrice vivant calculant la véritable Question dont la réponse est 42',
      'Pour construire une voie de contournement hyperspatiale',
      'Pour cultiver des serviettes en coton'
    ],
    correctIndex: 1,
    explanation: 'Pensée Profonde a conçu la Terre comme un gigantesque super-ordinateur organique programmée sur 10 millions d\'années pour formuler la Question Ultime.',
    nsiRelation: 'Cette idée métaphorique anticipe le calcul distribué moderne et les réseaux de neurones bio-inspirés.',
    points: 50
  }
];

export const SECRET_DOCUMENTS: SecretDocument[] = [
  {
    id: 'doc-1',
    title: 'Protocole de la Serviette & Antisèche NSI',
    unlockedAtPoints: 60,
    icon: 'Shield',
    badge: 'Palier 1 Débloqué',
    content: `FÉLICITATIONS, AUTO-STOPPEUR EN HERBE !

Voici la règle d'or pour tout élève de NSI :
1. Toujours tester les cas limites (n=0, n=1, listes vides).
2. Toujours se souvenir que ord('*') == 42.
3. Toujours garder sa serviette et ne jamais paniquer face à une erreur "IndexError: list index out of range".

Commandement secret : Dans le terminal rétro Pensée Profonde, tapez la commande "towel" ou "tea" pour recevoir des encouragements cosmiques.`,
    nsiInsight: 'En NSI, le débogage méthodique et le calme absolu sont 42 fois plus efficaces que de récrire le code au hasard !'
  },
  {
    id: 'doc-2',
    title: 'Le Grimoire des Nombres de Catalan & Arbres Binaires',
    unlockedAtPoints: 160,
    icon: 'Network',
    badge: 'Palier 2 Débloqué',
    content: `POURQUOI C_5 = 42 EST LE CŒUR DE L'ALGORITHMIQUE :

Le 5e nombre de Catalan (42) régit :
- Le nombre de façons d'évaluer une expression arithmétique contenant 5 opérateurs binaires sans ambiguïté.
- Le nombre d'arbres binaires stricts contenant 5 nœuds internes.
- La structure même des parseurs et compilateurs de code comme Python !

Quand votre interpréteur Python lit du code source, il génère un Arbre de Syntaxe Abstraite (AST). C_5 = 42 est l'hommage des mathématiques pures à la syntaxe des ordinateurs.`,
    nsiInsight: 'La récurrence de Catalan : C_{n+1} = sum(C_i * C_{n-i}) se programme très élégamment en programmation dynamique ou mémoïsation !'
  },
  {
    id: 'doc-3',
    title: 'La Découverte Ultime de 2019 : Booker & Sutherland',
    unlockedAtPoints: 300,
    icon: 'Cpu',
    badge: 'Palier 3 Débloqué',
    content: `LE CODE SECRET DU CALCUL DISTRIBUÉ MONDIAL :

Pour résoudre x³ + y³ + z³ = 42, les chercheurs n'ont pas utilisé un seul supercalculateur, mais ont mobilisé Charity Engine, un réseau de 500 000 ordinateurs bénévoles connectés par Internet.

Les valeurs exactes gravées dans le marbre du panthéon mathématique :
x = -80 538 738 812 075 974
y =  80 435 758 145 817 515
z =  12 602 123 297 335 631

x³ + y³ + z³ = 42 (au cent-milliardième près, sans arrondi).

Douglas Adams, décédé en 2001, aurait jubilé en voyant que la somme des 3 cubes de son 42 a nécessité l'alliance de la planète entière.`,
    nsiInsight: 'Cet exploit a été rendu possible par des optimisations algorithmiques géométriques réduisant l\'espace de recherche d\'un facteur 10^12 !'
  },
  {
    id: 'doc-4',
    title: 'L\'Archive Suprême de Pensée Profonde & La Grande Question',
    unlockedAtPoints: 460,
    icon: 'Sparkles',
    badge: 'Grand Maître Cosmique',
    content: `ACCÈS MAÎTRE CONFIRMÉ.

Vous avez atteint le sommet de la compréhension galactique.
Vous comprenez désormais pourquoi 42 n'est pas une simple réponse, mais une passerelle :
- En NSI, c'est l'étoile * qui sélectionne tout.
- En Binaire, c'est la cadence d'alternance 101010.
- En Mathématiques, c'est le 5e nombre de Catalan et la somme de trois cubes à 17 chiffres.
- En Physique, c'est l'arc-en-ciel de Descartes et le temps de traversée terrestre.
- En Philosophie, c'est le rappel bienveillant qu'avant de chercher une réponse avec angoisse, il faut d'abord apprendre à formuler la bonne Question.

Votre diplôme officiel de "Maître Cosmique de Pensée Profonde" est déverrouillé !`,
    nsiInsight: 'Félicitations de la part de l\'équipe nsi.xyz ! Utilisez vos super-pouvoirs d\'algorithmique pour bâtir un univers meilleur.'
  }
];
