export type CategoryType = 'all' | 'nsi' | 'math' | 'h2g2' | 'science' | 'culture' | 'easteregg';

export interface CategoryInfo {
  id: CategoryType;
  label: string;
  emoji: string;
  description: string;
  badgeColor: string;
}

export interface FactItem {
  id: string;
  title: string;
  subtitle: string;
  category: CategoryType;
  icon: string;
  summary: string;
  fullExplanation: string;
  nsiCuriosity?: string;
  codeSnippet?: {
    language: string;
    filename?: string;
    code: string;
  };
  mathematicalProof?: string;
  tags: string[];
  level: 'Débutant' | 'Intermédiaire' | 'Expert' | 'Cosmique';
  interactiveToolId?: 'converter' | 'sumcubes' | 'rainbow' | 'whale' | 'babel' | 'terminal';
}

export interface QuizQuestion {
  id: string;
  tier: 'novice' | 'voyager' | 'magrathean' | 'deepthought';
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  nsiRelation?: string;
  points: number;
}

export interface QuizTierInfo {
  id: 'novice' | 'voyager' | 'magrathean' | 'deepthought';
  name: string;
  levelTitle: string;
  badge: string;
  minPoints: number;
  description: string;
  unlockedContentTitle: string;
}

export interface EasterEgg {
  id: string;
  title: string;
  hint: string;
  discovered: boolean;
  reward: string;
  icon: string;
}

export interface SecretDocument {
  id: string;
  title: string;
  unlockedAtPoints: number;
  icon: string;
  badge: string;
  content: string;
  nsiInsight: string;
}
