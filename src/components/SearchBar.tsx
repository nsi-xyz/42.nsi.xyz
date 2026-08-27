import React from 'react';
import { Search, X, Filter, Sparkles } from 'lucide-react';
import { CATEGORIES } from '../data/factsData';
import { CategoryType } from '../types';
import { soundManager } from '../utils/audio';

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: CategoryType;
  setSelectedCategory: (category: CategoryType) => void;
  selectedTag: string | null;
  setSelectedTag: (tag: string | null) => void;
  totalResults: number;
  searchInputRef?: React.RefObject<HTMLInputElement | null>;
}

const POPULAR_TAGS = [
  'NSI 1ère',
  'ASCII',
  'Binaire',
  'Catalan',
  'Machine Learning',
  'Équations diophantiennes',
  'Douglas Adams',
  'Optique',
  'Lewis Carroll',
  'Marvin',
  'Towel Day'
];

export const SearchBar: React.FC<SearchBarProps> = ({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  selectedTag,
  setSelectedTag,
  totalResults,
  searchInputRef,
}) => {
  const handleCategorySelect = (catId: CategoryType) => {
    soundManager.playClick();
    setSelectedCategory(catId);
  };

  const handleTagClick = (tag: string) => {
    soundManager.playClick();
    if (selectedTag === tag) {
      setSelectedTag(null);
    } else {
      setSelectedTag(tag);
    }
  };

  const clearFilters = () => {
    soundManager.playClick();
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedTag(null);
  };

  const hasActiveFilters = searchQuery !== '' || selectedCategory !== 'all' || selectedTag !== null;

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
      <div className="p-4 sm:p-6 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
        
        {/* Search Input */}
        <div className="relative mb-5">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
            <Search className="w-5 h-5 text-cyan-400" />
          </div>
          
          <input
            id="main-encyclopedia-search"
            ref={searchInputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Rechercher une notion (ex: ASCII, Binaire, Somme des cubes, Marvin, Base 13, Descartes...)"
            className="w-full pl-11 pr-24 py-3.5 rounded-xl bg-slate-950/80 border border-slate-700/80 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20 text-slate-100 placeholder:text-slate-500 text-sm sm:text-base outline-none transition-all"
          />

          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute inset-y-0 right-10 pr-2 flex items-center text-slate-400 hover:text-slate-200"
            >
              <X className="w-4 h-4" />
            </button>
          )}

          <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
            <kbd className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-mono text-slate-400 bg-slate-800 rounded border border-slate-700">
              NSI 42
            </kbd>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-none">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                id={`cat-filter-${cat.id}`}
                onClick={() => handleCategorySelect(cat.id)}
                className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium whitespace-nowrap transition-all duration-200 border ${
                  isSelected
                    ? `${cat.badgeColor} border-current shadow-[0_0_12px_rgba(56,189,248,0.25)] bg-slate-800`
                    : 'bg-slate-950/60 text-slate-400 border-slate-800 hover:text-slate-200 hover:border-slate-700'
                }`}
              >
                <span>{cat.emoji}</span>
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Popular Tags and Active Filter Summary */}
        <div className="mt-3.5 pt-3 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-slate-500 font-mono flex items-center gap-1">
              <Filter className="w-3 h-3" /> Mots-clés :
            </span>
            {POPULAR_TAGS.map((tag) => {
              const isTagActive = selectedTag === tag;
              return (
                <button
                  key={tag}
                  onClick={() => handleTagClick(tag)}
                  className={`px-2 py-0.5 rounded-md font-mono text-[11px] transition-all ${
                    isTagActive
                      ? 'bg-cyan-500 text-slate-950 font-semibold'
                      : 'bg-slate-800/60 text-slate-400 hover:text-cyan-300 hover:bg-slate-800'
                  }`}
                >
                  #{tag}
                </button>
              );
            })}
          </div>

          <div className="flex items-center space-x-3 text-slate-400 font-mono">
            <span>
              <strong className="text-cyan-300">{totalResults}</strong> facette{totalResults > 1 ? 's' : ''} trouvée{totalResults > 1 ? 's' : ''}
            </span>

            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="text-rose-400 hover:text-rose-300 underline text-xs"
              >
                Réinitialiser les filtres
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
