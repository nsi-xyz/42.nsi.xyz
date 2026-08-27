import { CategoryInfo, FactItem } from '../types';

export const CATEGORIES: CategoryInfo[] = [
  {
    id: 'all',
    label: 'Toutes les Facettes',
    emoji: '🌌',
    description: 'Vue panoramique complète sur le cosmos du nombre 42.',
    badgeColor: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30'
  },
  {
    id: 'nsi',
    label: 'Informatique & NSI',
    emoji: '💻',
    description: 'Code ASCII, binaire, regex, base 13, magic numbers et Data Science.',
    badgeColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
  },
  {
    id: 'math',
    label: 'Maths & Algorithmes',
    emoji: '📐',
    description: 'Somme des 3 cubes, nombres de Catalan, proniques et partitions.',
    badgeColor: 'bg-amber-500/10 text-amber-400 border-amber-500/30'
  },
  {
    id: 'h2g2',
    label: 'H2G2 & Douglas Adams',
    emoji: '🪐',
    description: 'Pensée Profonde, Marvin, le Cachalot, la serviette et Don\'t Panic.',
    badgeColor: 'bg-purple-500/10 text-purple-400 border-purple-500/30'
  },
  {
    id: 'science',
    label: 'Physique & Cosmos',
    emoji: '🔭',
    description: 'Arc-en-ciel à 42°, traversée gravitationnelle, nébuleuse M42.',
    badgeColor: 'bg-blue-500/10 text-blue-400 border-blue-500/30'
  },
  {
    id: 'culture',
    label: 'Histoire & Insolite',
    emoji: '📜',
    description: 'Lewis Carroll, Bible à 42 lignes, marathon, Maât et Jackie Robinson.',
    badgeColor: 'bg-rose-500/10 text-rose-400 border-rose-500/30'
  }
];

export const FACTS_DATA: FactItem[] = [
  // --- NSI & INFORMATIQUE ---
  {
    id: 'ascii-asterisk',
    title: 'Code ASCII 42 : L\'Astérisque Universel (*)',
    subtitle: 'Le caractère "Joker" qui sélectionne l\'infini dans les systèmes informatiques',
    category: 'nsi',
    icon: 'Terminal',
    summary: 'En code ASCII standard (7 bits), 42 représente le symbole astérisque "*". C\'est le symbole universel du wildcard (joker) qui correspond à "tout ce qui existe".',
    fullExplanation: `En informatique, l'astérisque (\`*\`) est sans doute le caractère le plus polyvalent et puissant jamais inventé. En norme ASCII, son point de code décimal est très exactement 42 (en hexadécimal \`0x2A\`, en binaire \`00101010\`).

Ce qui est poétique pour les élèves de NSI, c'est que dans la quasi-totalité des langages et protocoles :
- **En ligne de commande Unix/Bash** : \`rm -rf *\` ou \`ls *.py\` désigne "tous les fichiers sans exception".
- **En SQL** : \`SELECT * FROM univers;\` extrait la totalité des colonnes et données.
- **En expressions régulières (Regex)** : L'étoile de Kleene \`.*\` capture n'importe quelle séquence de longueur arbitraire ("le reste").
- **En C et C++** : L'astérisque sert à déréférencer les pointeurs (\`*ptr\`), touchant ainsi directement à la mémoire vive de l'ordinateur.

Ainsi, 42 représente littéralement le symbole qui signifie "TOUT", coïncidant étrangement avec la réponse à la Question sur la vie, l'univers et TOUT le reste !`,
    nsiCuriosity: 'En Python ou en C, vous pouvez tester directement : chr(42) renvoie "*", et ord("*") renvoie 42. C\'est l\'un des exercices classiques sur la table ASCII !',
    codeSnippet: {
      language: 'python',
      filename: 'ascii_magic.py',
      code: `# En NSI : Manipulation des codes de caractères
char_42 = chr(42)
print(f"Code ASCII 42 = '{char_42}'")  # Affiche: '*'

# Regex : l'étoile de Kleene attrape 'l univers et le reste'
import re
pattern = r"vie.*reste"
text = "La réponse sur la vie, l'univers, la matière et tout le reste !"
match = re.search(pattern, text)
print("Correspondance trouvée :", bool(match))`
    },
    tags: ['ASCII', 'Pointeurs C', 'Regex', 'Wildcard', 'SQL'],
    level: 'Débutant',
    interactiveToolId: 'converter'
  },
  {
    id: 'binary-101010',
    title: 'Binaire 101010 : L\'Alternance Cosmique Parfaite',
    subtitle: 'Une cadence numérique d\'une élégance remarquable sur 6 bits',
    category: 'nsi',
    icon: 'Binary',
    summary: 'En base 2, 42 s\'écrit "101010". Une alternance parfaite de 1 et de 0 qui fascine les ingénieurs en électronique et en architecture des ordinateurs.',
    fullExplanation: `Sur 6 bits, le nombre 42 possède une représentation binaire hautement symétrique : \`101010\`.
Décomposition :
$42 = 1 \times 2^5 + 0 \times 2^4 + 1 \times 2^3 + 0 \times 2^2 + 1 \times 2^1 + 0 \times 2^0$
$42 = 32 + 0 + 8 + 0 + 2 + 0 = 42$

Propriétés remarquables en NSI :
1. **Masquage de bits** : C'est le motif binaire parfait pour tester les positions paires/impaires d'un registre d'ordinateur.
2. **Décalage binaire (Bit Shift)** : 
   - \`42 >> 1 = 21\` (\`010101\` binaire, l'inverse parfait des bits !)
   - \`42 << 1 = 84\` (\`1010100\` binaire)
3. **Opérateurs logiques** : Si on effectue un \`XOR\` avec son décalage \`42 ^ (42 >> 1)\`, on obtient \`101010 ^ 010101 = 111111\` (soit $63 = 2^6 - 1$, un registre plein !).`,
    nsiCuriosity: 'En programmation bas niveau, le motif 0x2A (ou 101010) est souvent utilisé par les développeurs pour remplir des blocs de mémoire en débogage visuel.',
    codeSnippet: {
      language: 'python',
      filename: 'bitwise_42.py',
      code: `n = 42
binary_repr = bin(n)[2:]  # '101010'
print(f"42 en binaire : {binary_repr}")

# Inversion des bits avec le décalage
shifted = n >> 1          # 21 (010101)
xor_full = n ^ shifted    # 63 (111111)
print(f"XOR cosmique : {bin(xor_full)[2:]} (Valeur : {xor_full})")`
    },
    tags: ['Binaire', 'Bitwise', 'Base 2', 'NSI 1ère', 'Architecture'],
    level: 'Débutant',
    interactiveToolId: 'converter'
  },
  {
    id: 'base-13-humor',
    title: '6 × 9 = 42... en Base 13 !',
    subtitle: 'Quand une erreur mathématique absurde devient une vérité en arithmétique de position',
    category: 'nsi',
    icon: 'Calculator',
    summary: 'Dans le roman H2G2, Arthur Dent tente d\'extraire la Grande Question du subconscient d\'un homme des cavernes et tire les lettres : "Combien font six fois neuf ?". Absurde en base 10... mais véridique en base 13 !',
    fullExplanation: `Dans *Le Dernier Restaurant avant la fin du monde*, Arthur Dent découvre avec stupéfaction que la question ultime tirée au sort est : **"Que donne le produit de six par neuf ?"**
Or, $6 \times 9 = 54$ et non 42 en base 10 classique.

Cependant, des informaticiens et mathématiciens ont vite remarqué que l'égalité devient **rigoureusement exacte en base 13** :
- En base 13, le chiffre $42_{13}$ représente : $4 \times 13^1 + 2 \times 13^0 = 52 + 2 = 54_{10}$.
- Or $6_{13} \times 9_{13} = 54_{10} = 42_{13}$ !

Quand on a fait remarquer cette formidable découverte à Douglas Adams, il a répondu hilare :
> *"J'ai bien peur que ce soit une coïncidence. Je n'écris pas de blagues en base 13 ! Personne n'écrit de blagues en base 13 !"*`,
    nsiCuriosity: 'En spécialité NSI, le changement de base (conversion d\'un entier vers une base $b$ quelconque par divisions euclidiennes successives) est un algorithme fondamental au programme.',
    codeSnippet: {
      language: 'python',
      filename: 'base_13_calc.py',
      code: `def to_base_13(n):
    digits = "0123456789ABC"
    res = ""
    while n > 0:
        res = digits[n % 13] + res
        n //= 13
    return res or "0"

# 6 x 9 = 54 en décimal
produit_10 = 6 * 9
produit_13 = to_base_13(produit_10)

print(f"6 x 9 en décimal = {produit_10}")
print(f"6 x 9 en Base 13 = {produit_13}")  # Affiche fièrement '42' !`
    },
    tags: ['Bases numériques', 'Arithmétique', 'Division Euclidienne', 'Humour', 'H2G2'],
    level: 'Intermédiaire',
    interactiveToolId: 'converter'
  },
  {
    id: 'tiff-magic-number',
    title: 'Le Magic Number TIFF : 0x002A (42)',
    subtitle: 'Pourquoi chaque image TIFF sur votre ordinateur contient 42 dans ses métadonnées',
    category: 'nsi',
    icon: 'FileCode',
    summary: 'Le format de fichier image TIFF (Tagged Image File Format) créé par Aldus et Microsoft utilise explicitement le nombre 42 comme numéro magique d\'identification dans son en-tête.',
    fullExplanation: `Dans les systèmes d'exploitation, les fichiers possèdent une signature binaire (appelée *Magic Number*) dans leurs premiers octets pour être identifiés par la commande \`file\` de Linux ou les analyseurs d'image.

Dans la spécification officielle du format **TIFF**, les octets 2 et 3 de l'en-tête sont obligatoirement fixés à l'entier **42** :
- En Little-Endian : \`0x2A 0x00\`
- En Big-Endian : \`0x00 0x2A\`

La spécification TIFF stipule avec humour : *"Ce nombre 42 n'a pas été choisi au hasard, mais pour sa signification profonde selon Douglas Adams dans Le Guide du voyageur galactique."*

Depuis plus de 30 ans, des milliards de fichiers TIFF sur Terre confirment que 42 est la clé pour décoder les pixels d'une image !`,
    nsiCuriosity: 'En NSI, l\'étude des types MIME et des formats de fichiers (PNG, JPEG, TIFF) permet d\'aborder la sérialisation des données et la notion de boutisme (Endianness).',
    codeSnippet: {
      language: 'python',
      filename: 'read_tiff_header.py',
      code: `import struct

def verifier_entete_tiff(octets_fichier):
    # Les 2 premiers octets = ordre ('II' = little endian, 'MM' = big endian)
    # Les 2 octets suivants = magic number (doit valoir 42)
    endian_flag = octets_fichier[:2]
    endian = '<' if endian_flag == b'II' else '>'
    magic = struct.unpack(f'{endian}H', octets_fichier[2:4])[0]
    return magic == 42

# Exemple d'en-tête TIFF Little-Endian :
header_valide = b'II\x2a\x00\x08\x00\x00\x00'
print("Est-ce un fichier TIFF officiel ?", verifier_entete_tiff(header_valide))`
    },
    tags: ['TIFF', 'Magic Number', 'Formats de fichiers', 'Boutisme', 'Linux'],
    level: 'Intermédiaire'
  },
  {
    id: 'random-state-42',
    title: 'random_state = 42 : Le Standard Sacré de l\'IA',
    subtitle: 'La graine pseudo-aléatoire universelle des Data Scientists et chercheurs en Machine Learning',
    category: 'nsi',
    icon: 'Cpu',
    summary: 'Dans les bibliothèques d\'intelligence artificielle comme Scikit-Learn, PyTorch ou TensorFlow, la graine "random_state=42" est la convention universelle adoptée par des millions de chercheurs pour reproduire fidèlement leurs résultats.',
    fullExplanation: `En informatique, les générateurs de nombres pseudo-aléatoires (PRNG) ont besoin d'un point de départ : une graine (*seed*). Pour que deux ingénieurs obtiennent exactement les mêmes résultats lors de l'entraînement d'un réseau de neurones ou du découpage d'un jeu de données (Train / Test split), ils doivent fixer cette graine.

La communauté mondiale de la Data Science a massivement adopté **42** comme graine par défaut :
- Dans la documentation officielle de **Scikit-Learn** : presque tous les exemples utilisent \`random_state=42\`.
- Sur **Kaggle** : des centaines de milliers de notebooks de compétition commencent par \`seed = 42\`.
- Dans les benchmarks de **Deep Learning** : fixer 42 est devenu un hommage universel à Douglas Adams.`,
    nsiCuriosity: 'En classe de Terminale NSI (ou en projet IA), l\'apprentissage supervisé commence invariablement par la commande train_test_split(..., random_state=42).',
    codeSnippet: {
      language: 'python',
      filename: 'ai_seed_42.py',
      code: `import random

# Fixer la graine pour une reproductibilité cosmique
random.seed(42)

tirages = [random.randint(1, 100) for _ in range(5)]
print("Nombres générés avec seed 42 :", tirages)
# Donnera TOUJOURS exactement : [82, 15, 4, 95, 36]`
    },
    tags: ['Machine Learning', 'Data Science', 'Python', 'Pseudo-aléatoire', 'Scikit-Learn'],
    level: 'Débutant'
  },
  {
    id: 'ecole-42',
    title: 'L\'École 42 : Révolution Pédagogique du Code',
    subtitle: 'La célèbre école d\'informatique sans professeurs ni diplôme initial',
    category: 'nsi',
    icon: 'GraduationCap',
    summary: 'Fondée en 2013 par Xavier Niel, Nicolas Sadirac, Kwame Yamgnane et Florian Bucher, l\'École 42 tire son nom direct du Guide du voyageur galactique pour symboliser une école d\'informatique pas comme les autres.',
    fullExplanation: `En 2013, l'école d'informatique **42** a ouvert ses portes à Paris avec un modèle pédagogique de rupture :
- **Pas de professeurs** : Apprentissage par les pairs (*peer-to-peer learning*).
- **Pas de cours magistraux** : Des projets concrets, de l'algorithmie pure en C, du développement système et de la cybersécurité.
- **La "Piscine"** : Un mois d'immersion intensive de 7j/7 pour sélectionner les étudiants sur leur ténacité et leur logique plutôt que sur leurs diplômes scolaires.

Aujourd'hui, le réseau 42 compte plus de **50 campus dans le monde** (Tokyo, São Paulo, Séoul, Berlin, Madrid, etc.) et forme des dizaines de milliers de développeurs d'élite.`,
    nsiCuriosity: 'Pour un élève de NSI, 42 représente l\'un des parcours possibles post-bac pour approfondir le développement logiciel en autonomie totale.',
    tags: ['École 42', 'Pédagogie', 'C', 'Peer-learning', 'Orientation'],
    level: 'Débutant'
  },

  // --- MATHÉMATIQUES & ALGORITHMIQUE ---
  {
    id: 'sum-of-three-cubes',
    title: 'x³ + y³ + z³ = 42 : L\'Énigme des 3 Cubes Résolue en 2019',
    subtitle: '1,3 million d\'heures de calcul pour trouver trois entiers géants à 17 chiffres',
    category: 'math',
    icon: 'Box',
    summary: 'Pendant 65 ans, 42 était le dernier entier inférieur à 100 dont on ignorait s\'il pouvait s\'écrire comme la somme de trois cubes relatifs. En septembre 2019, les mathématiciens Andrew Booker et Andrew Sutherland ont enfin trouvé la solution !',
    fullExplanation: `L'équation diophantienne $x^3 + y^3 + z^3 = k$ posait une question simple : pour tout entier naturel $k$ non congru à 4 ou 5 modulo 9, existe-t-il trois entiers relatifs $x, y, z$ dont la somme des cubes vaut $k$ ?

Un par un, tous les nombres de 1 à 100 avaient été résolus depuis les années 1950... sauf 33 et **42** !
- Andrew Booker résout 33 début 2019.
- Il restait **42**, le nombre le plus célèbre de la culture populaire, qui résistait encore à toutes les tentatives.

En septembre 2019, grâce au réseau mondial de calcul partagé **Charity Engine** (utilisant plus de 500 000 ordinateurs personnels dans le monde et l'équivalent de 1,3 million d'heures de calcul), Booker et Sutherland ont découvert la solution unique :

$$(-80\\,538\\,738\\,812\\,075\\,974)^3 + (80\\,435\\,758\\,145\\,817\\,515)^3 + (12\\,602\\,123\\,297\\,335\\,631)^3 = 42$$

Les trois nombres possèdent chacun **17 chiffres** ! Trouver cette solution a nécessité des algorithmes sophistiqués de crible sur les corps de nombres algébriques.`,
    nsiCuriosity: 'En Python 3, les entiers ont une précision arbitraire (BigInt) : vous pouvez vérifier cette égalité au bit près sans aucun dépassement de capacité !',
    codeSnippet: {
      language: 'python',
      filename: 'cubes_42_verifier.py',
      code: `# Vérification exacte en Python (BigInt natif)
x = -80538738812075974
y = 80435758145817515
z = 12602123297335631

somme_cubes = x**3 + y**3 + z**3
print("x³ + y³ + z³ =", somme_cubes)
print("Égalité vérifiée ?", somme_cubes == 42)  # True !`
    },
    mathematicalProof: 'x = -80538738812075974\ny = 80435758145817515\nz = 12602123297335631\nx³ + y³ + z³ = 42',
    tags: ['Équations diophantiennes', 'Calcul distribué', 'Théorie des nombres', 'Python BigInt', 'Exploit 2019'],
    level: 'Expert',
    interactiveToolId: 'sumcubes'
  },
  {
    id: 'catalan-number-5',
    title: 'Le 5e Nombre de Catalan : C₅ = 42',
    subtitle: 'La combinatoire des parenthésages valides, des arbres binaires et des polygones',
    category: 'math',
    icon: 'Network',
    summary: 'En combinatoire, la suite des nombres de Catalan compte des structures fondamentales en informatique : arbres binaires stricts, expressions parenthésées, chemins de Dyck. Le 5e nombre de Catalan C₅ vaut très exactement 42.',
    fullExplanation: `La formule générale des nombres de Catalan est :
$$C_n = \\frac{1}{n+1}\\binom{2n}{n} = \\frac{(2n)!}{(n+1)! \\, n!}$$

Pour $n = 5$ :
$$C_5 = \\frac{1}{6}\\binom{10}{5} = \\frac{1}{6} \\times \\frac{10 \\times 9 \\times 8 \\times 7 \\times 6}{5 \\times 4 \\times 3 \\times 2 \\times 1} = \\frac{1}{6} \\times 252 = 42$$

Que compte $C_5 = 42$ en NSI et en mathématiques ?
1. **Parenthésages équilibrés** : Il y a exactement **42 façons** d'associer 5 paires de parenthèses valides (ex: \`((()()))\`, \`()()()()()\`, etc.).
2. **Arbres binaires de recherche** : Il y a exactement **42 formes distinctes d'arbres binaires** à 5 nœuds.
3. **Triangulation de polygone** : Il y a exactement **42 façons** de découper un heptagone régulier (7 côtés) en 5 triangles disjoints.
4. **Chemins de Dyck** : 42 chemins sur une grille $5 \\times 5$ qui ne traversent jamais la diagonale.`,
    nsiCuriosity: 'L\'évaluation de la validité d\'un parenthésage à l\'aide d\'une pile (Stack LIFO) est l\'un des algorithmes phares de la classe de Terminale NSI.',
    codeSnippet: {
      language: 'python',
      filename: 'catalan_42.py',
      code: `import math

def catalan(n):
    return math.comb(2 * n, n) // (n + 1)

print([catalan(i) for i in range(1, 6)])
# Affiche: [1, 2, 5, 14, 42] -> C_5 vaut bien 42 !`
    },
    tags: ['Catalan', 'Combinatoire', 'Arbres binaires', 'Piles LIFO', 'Algorithmes'],
    level: 'Intermédiaire',
    interactiveToolId: 'converter'
  },
  {
    id: 'pronic-and-sphenic',
    title: 'Nombre Pronique & Sphénique : 6 × 7 = 2 × 3 × 7',
    subtitle: 'Produit de deux entiers consécutifs et produit de trois nombres premiers distincts',
    category: 'math',
    icon: 'Layers',
    summary: '42 est à la fois un nombre pronique (produit de deux entiers consécutifs 6 × 7) et un nombre sphénique (produit de trois facteurs premiers distincts 2 × 3 × 7).',
    fullExplanation: `42 regorge de propriétés arithmétiques fascinantes :
1. **Nombre pronique (ou hétéromécanique)** :
   $42 = 6 \\times (6 + 1) = 6 \\times 7$. C'est le double d'un nombre triangulaire ($T_6 = 21$).
2. **Nombre sphénique** :
   $42 = 2 \\times 3 \\times 7$. Il possède exactement $2^3 = 8$ diviseurs positifs :
   $$\\text{Diviseurs}(42) = \\{1, 2, 3, 6, 7, 14, 21, 42\\}$$
3. **Nombre abondant** :
   La somme de ses diviseurs stricts vaut :
   $$1 + 2 + 3 + 6 + 7 + 14 + 21 = 54 > 42$$
   Son abondance est de $54 - 42 = 12$.
4. **Nombre primaire pseudo-parfait** :
   La somme des inverses de ses facteurs premiers avec 1 donne :
   $$\\frac{1}{2} + \\frac{1}{3} + \\frac{1}{7} + \\frac{1}{42} = \\frac{21 + 14 + 6 + 1}{42} = \\frac{42}{42} = 1$$`,
    nsiCuriosity: 'En NSI, tester si un nombre est premier, décomposer en facteurs premiers et calculer la liste de ses diviseurs en complexité O(√n) est un classique.',
    codeSnippet: {
      language: 'python',
      filename: 'arithmetic_42.py',
      code: `def diviseurs(n):
    return [d for d in range(1, n) if n % d == 0]

divs = diviseurs(42)
somme = sum(divs)
print("Diviseurs stricts de 42 :", divs)
print("Somme :", somme, "-> 42 est donc un nombre abondant car 54 > 42 !")`
    },
    tags: ['Arithmétique', 'Diviseurs', 'Nombres premiers', 'Facteurs', 'Théorie'],
    level: 'Débutant'
  },

  // --- DOUGLAS ADAMS & H2G2 ---
  {
    id: 'deep-thought-story',
    title: 'Pensée Profonde & Les 7,5 Millions d\'Années',
    subtitle: 'L\'ordinateur de la taille d\'une petite ville conçu pour trouver la Réponse Ultime',
    category: 'h2g2',
    icon: 'Sparkles',
    summary: 'Dans Le Guide du voyageur galactique, les êtres hyper-intelligents et pan-dimensionnels construisent Pensée Profonde (Deep Thought) pour connaître la Réponse à la Grande Question sur la vie, l\'univers et le reste.',
    fullExplanation: `Construit par les créateurs Loonquawl et Phouchg, le superordinateur **Pensée Profonde** a été programmé pour résoudre l'énigme suprême de l'existence.

Après **7 millions et demi d'années** de calculs continus, une foule immense se rassemble dans la plaine pour entendre le verdict.
Pensée Profonde prend la parole d'une voix calme :
> *"La réponse à la Grande Question... Sur la vie, l'univers et le reste..."*
> *"Oui... ?!"* s'exclament les scientifiques fébriles.
> *"Est..."*
> *"Oui...?!"*
> *"Quarante-deux."*

Stupéfaction et désarroi dans la salle. Pensée Profonde ajoute alors avec philosophie :
> *"J'ai vérifié très minutieusement, et c'est incontestablement la bonne réponse. Je crois que le problème, pour être tout à fait franc, c'est que vous n'avez en fait jamais vraiment su quelle était la Grande Question."*

Pour trouver la Question dont la réponse est 42, Pensée Profonde a dû concevoir un ordinateur encore plus gigantesque et complexe : **la Terre**, dont les êtres vivants faisaient partie intégrante du programme matriciel de 10 millions d'années !`,
    nsiCuriosity: 'En algorithmique, cette fable illustre parfaitement le principe : un programme informatique ne peut renvoyer un résultat sensé que si les spécifications et la question posée sont formellement définies !',
    tags: ['H2G2', 'Douglas Adams', 'Pensée Profonde', 'SF Culte', 'Philosophie'],
    level: 'Débutant',
    interactiveToolId: 'terminal'
  },
  {
    id: 'marvin-paranoid-android',
    title: 'Marvin l\'Androïde Paranoïaque',
    subtitle: '"Un cerveau de la taille d\'une planète, et on me demande d\'ouvrir une porte..."',
    category: 'h2g2',
    icon: 'Bot',
    summary: 'Doté d\'une personnalité de type VPP (Véritable Personnalité Personnalisée) et d\'un intellect surdimensionné, Marvin souffre d\'une dépression chronique et d\'un mépris total pour l\'optimisme de l\'univers.',
    fullExplanation: `Marvin a été construit par la *Cybernetics Corporation de Sirius* pour équiper le vaisseau *Cœur en Or* (propulsé par le Générateur d'Improbabilité Infinie).

Caractéristiques de Marvin :
- Un coefficient intellectuel 30 milliards de fois supérieur à celui d'un être humain.
- Une terrible douleur permanente dans toutes les diodes de son côté gauche.
- Des répliques d'anthologie :
  > *"La première chose qui s'est passée, c'est que j'ai commencé à exister. Cela m'a rendu extrêmement malheureux depuis lors."*
  > *"Vous voulez que je m'assoie là et que je rouille ? Ou que je m'effondre en morceaux où je me trouve ?"*
  > *"La vie. Ne m'en parlez pas."*

Dans le roman, Marvin passe des milliards d'années à attendre dans des parcs de stationnement temporels et réussit à vaincre un char de guerre cybernétique simplement en lui racontant sa vision du monde, provoquant un court-circuit dépressif chez la machine ennemie !`,
    nsiCuriosity: 'En intelligence artificielle et robotique éthique, Marvin est souvent cité avec humour comme l\'anti-modèle absolu de l\'alignement des modèles de langage !',
    tags: ['Marvin', 'Robots', 'Humour', 'Citations', 'H2G2'],
    level: 'Débutant',
    interactiveToolId: 'whale'
  },
  {
    id: 'whale-and-petunias',
    title: 'Le Cachalot et le Pot de Pétunias',
    subtitle: 'La naissance impromptue à 50 000 mètres d\'altitude par Improbabilité Infinie',
    category: 'h2g2',
    icon: 'Compass',
    summary: 'Lorsque deux missiles thermonucléaires se dirigent vers le vaisseau spatial, Arthur Dent enclenche le Générateur d\'Improbabilité Infinie : les missiles sont instantanément transformés en un cachalot géant et un pot de pétunias en chute libre.',
    fullExplanation: `Cette séquence est l'un des sommets d'humour poétique de Douglas Adams.

Pendant sa chute de quelques minutes vers la surface de la planète Magrathéa, le cachalot prend conscience de son existence, découvre l'air, le vent, sa queue, et s'émerveille devant le sol qui se rapproche à toute allure :
> *"Et qu'est-ce que c'est que cette grosse chose ronde qui vient vers moi si vite ? C'est tellement gros et rond, ça a besoin d'un joli nom... Le s... sol ! Oui ! Sol ! Je me demande s'il sera gentil avec moi ?"*

Quant au pot de pétunias, sa seule et unique pensée en tombant fut :
> *"Oh non, pas encore..."*

(Bien plus tard dans la saga, on apprendra que le pot de pétunias était la réincarnation d'un être nommé Agrajag, accidentellement tué par Arthur Dent dans toutes ses vies antérieures !)`,
    tags: ['Cachalot', 'Pétunias', 'Improbabilité', 'Magrathea', 'Absurde'],
    level: 'Débutant',
    interactiveToolId: 'whale'
  },
  {
    id: 'towel-dont-panic',
    title: 'La Serviette & "DON\'T PANIC"',
    subtitle: 'L\'outil le plus indispensable pour survivre à l\'auto-stop interstellaire',
    category: 'h2g2',
    icon: 'ShieldAlert',
    summary: 'Selon le Guide, la serviette est l\'objet le plus massivement utile qu\'un auto-stoppeur galactique puisse posséder. Et sur la couverture du Guide, deux mots en lettres rondes et rassurantes : "PAS DE PANIQUE".',
    fullExplanation: `Pourquoi la serviette est-elle sacrée ?
- Vous pouvez vous envelopper dedans pour vous réchauffer sur les lunes glacées de Jaglan Bêta ;
- Vous coucher dessus sur les plages de sable marbré de Santraginus V ;
- L'humidifier pour le combat rapproché ;
- Vous bander les yeux pour éviter le regard du *Goinfre Féroce de Traal* (un animal d'une bêtise si stupéfiante qu'il s'imagine que si vous ne le voyez pas, il ne peut pas vous voir) ;
- Et même essuyer de l'eau si elle est encore assez propre.

Chaque année le **25 mai**, le monde entier célèbre le **Towel Day** (la Journée de la serviette) en hommage à Douglas Adams, en portant fièrement une serviette sur l'épaule !`,
    tags: ['Towel Day', 'Dont Panic', 'Auto-stop', '25 Mai', 'Conseils'],
    level: 'Débutant'
  },
  {
    id: 'douglas-adams-garden-joke',
    title: 'La Véritable Origine de 42 révélée par Douglas Adams',
    subtitle: 'Une blague de bureau totalement ordinaire qui a rendu fous des générations de fans',
    category: 'h2g2',
    icon: 'MessageSquare',
    summary: 'Malgré les milliers de théories mystiques, kabbalistiques ou physiques inventées par les admirateurs, Douglas Adams a toujours certifié que 42 était juste un chiffre choisi au hasard dans son jardin.',
    fullExplanation: `En novembre 1993, sur le groupe de discussion Usenet \`alt.fan.douglas-adams\`, Douglas Adams mit fin aux spéculations folles avec ce message d'anthologie :

> *"La réponse est très simple. C'était une blague. Il fallait que ce soit un nombre, ordinaire, plutôt petit, et j'ai choisi celui-là.
> Les systèmes binaires, la base 13, les moines tibétains, tout cela n'est que pure absurdité.
> Je me suis assis à mon bureau, j'ai regardé dans le jardin et j'ai pensé : '42 fera très bien l'affaire'. Je l'ai tapé. Fin de l'histoire."*

Ironiquement, le génie de Douglas Adams a été de choisir un nombre qui s'est avéré être un carrefour extraordinaire dans toutes les sciences, mathématiques et technologies existantes !`,
    tags: ['Douglas Adams', 'Usenet', 'Origines', 'Jardin', 'Vérité'],
    level: 'Débutant'
  },

  // --- PHYSIQUE & COSMOS ---
  {
    id: 'rainbow-42-degrees',
    title: 'L\'Arc-en-ciel à 42° : La Constante Optique de Descartes',
    subtitle: 'Pourquoi chaque arc-en-ciel primaire dans le ciel apparaît exactement à 42 degrés',
    category: 'science',
    icon: 'Sun',
    summary: 'Lorsque la lumière du Soleil traverse une goutte d\'eau sphérique de pluie, elle subit deux réfractions et une réflexion interne. L\'angle d\'émergence maximal de tous les rayons visibles est très exactement de 42°.',
    fullExplanation: `L'explication physique et mathématique de l'arc-en-ciel a été formalisée par René Descartes en 1637 :

1. Les rayons solaires pénètrent dans une goutte d'eau sphérique avec un angle d'incidence $i$ et sont réfractés avec un angle $r$ selon la loi de Snell-Descartes : $\\sin(i) = n \\sin(r)$ (avec $n \\approx 1{,}333$ pour l'eau).
2. Le rayon se réfléchit à l'arrière de la goutte, puis ressort par réfraction.
3. La déviation totale $D(i)$ subie par le rayon est donnée par :
   $$D(i) = 180^\\circ + 2i - 4r$$
4. L'angle d'observation par rapport au rayon incident est $\\theta(i) = 180^\\circ - D(i) = 4r - 2i$.
5. En cherchant le maximum de concentration d'énergie lumineuse (dérivée nulle $\\frac{d\\theta}{di} = 0$), on trouve :
   $$\\cos(i) = \\sqrt{\\frac{n^2 - 1}{3}}$$
   Pour $n = 1{,}333$, on obtient $i \\approx 59{,}4^\\circ$, $r \\approx 40{,}2^\\circ$, et l'angle d'émergence maximal $\\theta_{\\max}$ vaut **très exactement 42,0° pour la lumière rouge** (et 40,4° pour le violet).

C'est pourquoi tout observateur terrestre qui admire un arc-en-ciel regarde un cône de lumière formant un angle parfait de 42° avec l'axe opposé au Soleil !`,
    nsiCuriosity: 'En simulation numérique et traitement d\'image (shaders GLSL ou ray tracing en Python), cet angle de 42° est programmé pour simuler les phénomènes atmosphériques.',
    tags: ['Optique', 'Descartes', 'Lumière', 'Réfraction', 'Physique'],
    level: 'Intermédiaire',
    interactiveToolId: 'rainbow'
  },
  {
    id: 'gravity-tunnel-42-min',
    title: 'Le Tunnel Terrestre de 42 Minutes',
    subtitle: 'Le temps exact de chute libre à travers le centre de la Terre',
    category: 'science',
    icon: 'Globe',
    summary: 'Si on forait un tunnel sous vide traversant la Terre de part en part d\'un continent à l\'autre, un voyageur tombant en chute libre par gravité atteindrait l\'autre côté en très exactement 42 minutes et 12 secondes.',
    fullExplanation: `Considérons une Terre sphérique homogène de masse $M$ et de rayon $R \\approx 6371 \\text{ km}$.

Selon le théorème de Gauss en gravitation, lorsqu'un objet se trouve à une distance $r$ du centre de la Terre, seule la masse contenue dans la sphère intérieure de rayon $r$ exerce une force gravitationnelle nette.
La force de rappel est proportionnelle à la distance :
$$F(r) = -\\frac{G M}{R^3} m \\cdot r = -m \\omega^2 r$$

C'est l'équation différentielle exacte d'un **oscillateur harmonique simple** sans frottement !
La période totale d'oscillation complète aller-retour est :
$$T = 2\\pi \\sqrt{\\frac{R}{g}} = 2\\pi \\sqrt{\\frac{6{,}371 \\times 10^6}{9{,}81}} \\approx 5064 \\text{ secondes} \\approx 84{,}4 \\text{ minutes}$$

Le temps d'un trajet simple (la demi-période pour traverser la planète) est donc :
$$t = \\frac{T}{2} = \\pi \\sqrt{\\frac{R}{g}} \\approx 2532 \\text{ secondes} \\approx \\mathbf{42 \\text{ minutes et 12 secondes}} !$$

Fait encore plus vertigineux : ce résultat de 42 minutes reste valable quel que soit le tunnel en ligne droite foré entre n'importe quelles deux villes sur Terre (ex: Paris-Tokyo, New York-Sydney) !`,
    tags: ['Gravitation', 'Mécanique', 'Physique', 'Oscillateur', 'Planète Terre'],
    level: 'Intermédiaire'
  },
  {
    id: 'messier-42-orion',
    title: 'Messier 42 (M42) : La Nébuleuse d\'Orion',
    subtitle: 'La plus somptueuse nurserie stellaire du ciel nocturne visible à l\'œil nu',
    category: 'science',
    icon: 'Compass',
    summary: 'M42 est la 42e entrée du célèbre catalogue astronomique de Charles Messier. Située à 1 344 années-lumière de la Terre dans l\'épée d\'Orion, c\'est le complexe de formation d\'étoiles le plus spectaculaire et le plus photographié de l\'univers.',
    fullExplanation: `Découverte au télescope dès 1610 par Nicolas-Claude Fabri de Peiresc et répertoriée par Messier sous le numéro **42**, cette nébuleuse diffuse est un laboratoire cosmique géant :
- Elle mesure environ **24 années-lumière de diamètre**.
- Au cœur de M42 se trouve l'amas du Trapèze, quatre étoiles jeunes et ultra-massives dont le rayonnement ultraviolet intense illumine le gaz d'hydrogène environnant.
- C'est l'un des rares objets du ciel profond qu'un élève peut observer à l'œil nu lors d'une nuit claire d'hiver !`,
    tags: ['Astronomie', 'Messier 42', 'Orion', 'Étoiles', 'Astrophysique'],
    level: 'Débutant'
  },

  // --- HISTOIRE, INSOLITE & LITTÉRATURE ---
  {
    id: 'lewis-carroll-rule-42',
    title: 'Lewis Carroll & La Règle 42 d\'Alice',
    subtitle: 'L\'obsession mystique du mathématicien d\'Oxford bien avant Douglas Adams',
    category: 'culture',
    icon: 'BookOpen',
    summary: 'Bien avant Douglas Adams, l\'écrivain et mathématicien Lewis Carroll (Charles Lutwidge Dodgson) utilisait le nombre 42 de façon récurrente et énigmatique dans toutes ses œuvres majeures.',
    fullExplanation: `Dans *Les Aventures d'Alice au pays des merveilles* (1865), lors du procès du Valet de Cœur, le Roi proclame :
> *"Règle Quarante-Deux : Toute personne ayant plus d'un mille de haut doit immédiatement quitter le tribunal !"*
> Alice répond : *"Je n'ai pas un mille de haut, et d'ailleurs ce n'est pas une règle régulière, vous venez de l'inventer !"*
> Le Roi rétorque : *"C'est la plus ancienne règle du livre !"*
> Alice : *"Alors elle devrait porter le numéro Un, pas Quarante-Deux !"*

Autres occurrences chez Lewis Carroll :
- Dans *La Chasse au Snark*, le navire emporte très précisément **42 boîtes** que l'équipage a oubliées sur le quai.
- La préface de *La Chasse au Snark* compte 42 strophes dans chaque chant.
- Dans *Sylvie et Bruno*, Carroll crée des énigmes numériques basées sur 42.`,
    tags: ['Lewis Carroll', 'Alice', 'Littérature', 'Humour Victorien', 'Snark'],
    level: 'Débutant'
  },
  {
    id: 'gutenberg-bible-42',
    title: 'La Bible à 42 lignes de Gutenberg (B42)',
    subtitle: 'Le premier livre majeur imprimé en typographie mobile en Occident (1455)',
    category: 'culture',
    icon: 'Feather',
    summary: 'L\'invention de l\'imprimerie moderne par Johannes Gutenberg à Mayence en 1455 a débuté par la publication de la célèbre "Bible à 42 lignes" (connue des historiens sous le nom de code B42).',
    fullExplanation: `Pour rentabiliser son invention des caractères mobiles métalliques, Gutenberg devait imprimer un livre prestigieux.
Il calibre chaque page sur très exactement **deux colonnes de 42 lignes de texte latin**.

Pourquoi 42 lignes ?
- C'était la densité typographique idéale pour économiser le vélin et le papier précieux tout en conservant une lisibilité et une élégance gothique parfaite pour les copistes et lecteurs.
- Tirée à environ 180 exemplaires, seuls 49 exemplaires de la Bible B42 ont survécu jusqu'à aujourd'hui. C'est l'un des trésors culturels les plus inestimables de l'humanité, marquant l'entrée dans l'ère de la diffusion universelle du savoir (l'ancêtre direct d'Internet et du Web !).`,
    tags: ['Gutenberg', 'B42', 'Imprimerie', 'Histoire', '1455'],
    level: 'Débutant'
  },
  {
    id: 'marathon-42-km',
    title: 'Le Marathon : 42,195 km d\'Endurance',
    subtitle: 'La distance olympique officielle fixée à Londres en 1908',
    category: 'culture',
    icon: 'Activity',
    summary: 'La distance officielle de l\'épreuve reine de la course de fond est de 42 km et 195 mètres. Une distance dont l\'ajustement final découle d\'un caprice royal britannique.',
    fullExplanation: `La légende grecque raconte que le soldat Philippidès aurait couru d'une traite de la ville de Marathon jusqu'à Athènes (~40 km) pour annoncer la victoire contre les Perses en 490 av. J.-C. avant de s'effondrer.

Mais pourquoi 42,195 km exactement ?
Lors des Jeux Olympiques de **Londres en 1908**, la course devait partir du château de Windsor et se terminer au stade de White City. À la demande expresse de la princesse de Galles et de la famille royale britannique, le départ a été placé sous les fenêtres du salon royal de Windsor et l'arrivée prolongée jusqu'en face de la loge royale dans le stade, soit exactement **26 miles et 385 yards**, soit **42,195 km**.

Cette distance est devenue le standard universel de l'athlétisme mondial en 1921.`,
    tags: ['Marathon', 'Sport', 'JO 1908', 'Histoire', 'Windsor'],
    level: 'Débutant'
  },
  {
    id: 'maat-42-judges',
    title: 'Les 42 Préceptes et Juges de Maât',
    subtitle: 'Le tribunal du jugement de l\'âme dans le Livre des Morts de l\'Égypte Antique',
    category: 'culture',
    icon: 'Scale',
    summary: 'Dans la mythologie égyptienne, le défunt qui pénètre dans la Salle des Deux Vérités doit réciter la confession négative devant Osiris et ses 42 juges divins, attestant n\'avoir violé aucun des 42 principes de Maât.',
    fullExplanation: `Pour que son cœur soit plus léger que la plume de vérité de Maât lors de la pesée (psychostasie), le défunt devait s'adresser nommément à **42 assesseurs divins** représentant les 42 nomes (provinces) de l'Égypte :
1. *"Ô Toi qui marches à grands pas... Je n'ai commis aucune iniquité."*
2. *"Ô Toi qui embrasses la flamme... Je n'ai pas pillé."*
... jusqu'au 42e précepte moral.

Cette omniprésence du 42 dans les textes sacrés du Nouvel Empire (-1500 av. J.-C.) montre que depuis plus de trois millénaires, 42 est associé à l'équilibre cosmique de la vie et de la mort !`,
    tags: ['Égypte Antique', 'Maât', 'Mythologie', 'Livre des Morts', 'Histoire'],
    level: 'Débutant'
  },
  {
    id: 'jackie-robinson-42',
    title: 'Le Numéro 42 de Jackie Robinson',
    subtitle: 'Le seul numéro retiré à perpétuité dans l\'histoire de tout le baseball majeur (MLB)',
    category: 'culture',
    icon: 'Award',
    summary: 'Le 15 avril 1947, Jackie Robinson brise la barrière de la ségrégation raciale en devenant le premier joueur noir de la Ligue majeure de baseball avec les Dodgers de Brooklyn en portant le numéro 42.',
    fullExplanation: `Jackie Robinson est une légende de la lutte pour les droits civiques aux États-Unis. En portant fièrement le numéro 42 malgré un climat d'hostilité raciste violent, il a ouvert la voie à des générations d'athlètes afro-américains.

Le 15 avril 1997, 50 ans jour pour jour après ses débuts :
- La MLB prend une décision sans précédent dans l'histoire du sport mondial : **retirer le numéro 42 pour toutes les équipes de la ligue**. Aucun joueur ne pourra plus jamais porter le 42.
- Chaque 15 avril (le *Jackie Robinson Day*), une exception émouvante a lieu : **tous les joueurs et arbitres de tous les matchs portent exceptionnellement le 42** en son hommage !`,
    tags: ['Jackie Robinson', 'Droits civiques', 'MLB', 'Sport', 'Histoire US'],
    level: 'Débutant'
  }
];
