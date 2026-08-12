'use client';

import React, { useState } from 'react';
import { PartCategory, FacePartOption, FaceState, Gender } from '../lib/types';
import { PART_OPTIONS } from '../lib/face-parts';
import { 
  Sparkles, 
  Layers, 
  Smile, 
  Eye, 
  Scissors, 
  Glasses as GlassesIcon, 
  Target, 
  CircleDot,
  Volume2
} from 'lucide-react';

interface FeaturePickerProps {
  faceState: FaceState;
  activeCategory: PartCategory;
  onSelectCategory: (category: PartCategory) => void;
  onSelectPart: (category: PartCategory, partId: string) => void;
  onChangeColor: (key: string, value: string) => void;
}

const CATEGORY_ITEMS: { id: PartCategory; label: string; icon: React.ReactNode }[] = [
  { id: 'head', label: 'Head Shape', icon: <CircleDot className="w-4 h-4" /> },
  { id: 'hair', label: 'Hair Style', icon: <Scissors className="w-4 h-4" /> },
  { id: 'eyebrows', label: 'Eyebrows', icon: <Sparkles className="w-4 h-4" /> },
  { id: 'eyes', label: 'Eyes', icon: <Eye className="w-4 h-4" /> },
  { id: 'nose', label: 'Nose', icon: <Target className="w-4 h-4" /> },
  { id: 'mouth', label: 'Mouth / Lips', icon: <Smile className="w-4 h-4" /> },
  { id: 'ears', label: 'Ears', icon: <Volume2 className="w-4 h-4" /> },
  { id: 'beard', label: 'Facial Hair', icon: <Layers className="w-4 h-4" /> },
  { id: 'glasses', label: 'Glasses', icon: <GlassesIcon className="w-4 h-4" /> },
  { id: 'marks', label: 'Scars / Marks', icon: <Sparkles className="w-4 h-4" /> },
];

const HAIR_COLORS = [
  { name: 'Black', hex: '#1a1008' },
  { name: 'Dark Brown', hex: '#3b2413' },
  { name: 'Chestnut', hex: '#5c3a21' },
  { name: 'Blonde', hex: '#d4a359' },
  { name: 'Auburn', hex: '#8a3319' },
  { name: 'Grey / Silver', hex: '#94a3b8' },
  { name: 'White', hex: '#f1f5f9' },
  { name: 'Cyber Cyan', hex: '#38bdf8' },
];

const EYE_COLORS = [
  { name: 'Dark Brown', hex: '#332012' },
  { name: 'Hazel', hex: '#6e5124' },
  { name: 'Ocean Blue', hex: '#2563eb' },
  { name: 'Emerald Green', hex: '#059669' },
  { name: 'Amber', hex: '#d97706' },
  { name: 'Grey', hex: '#64748b' },
  { name: 'Cyber Cyan', hex: '#06b6d4' },
];

export const FeaturePicker: React.FC<FeaturePickerProps> = ({
  faceState,
  activeCategory,
  onSelectCategory,
  onSelectPart,
  onChangeColor,
}) => {
  const options = PART_OPTIONS[activeCategory] || [];
  
  // Filter options by current gender compatibility
  const filteredOptions = options.filter(
    (opt) => !opt.genderAllowed || opt.genderAllowed.includes(faceState.gender)
  );

  return (
    <div className="glass-panel p-5 rounded-2xl space-y-5">
      {/* Category Navigation Bar */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-sky-500/20">
        {CATEGORY_ITEMS.map((cat) => {
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-all border ${
                isActive
                  ? 'bg-sky-500/20 border-sky-400 text-sky-300 shadow-[0_0_12px_rgba(56,189,248,0.25)]'
                  : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
              }`}
            >
              {cat.icon}
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Category Options Grid */}
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">
            Available {CATEGORY_ITEMS.find((c) => c.id === activeCategory)?.label} Options ({filteredOptions.length})
          </span>
          <span className="text-[11px] font-mono text-sky-400/80">
            Selected: {faceState.activeParts[activeCategory] || 'Default'}
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-h-[260px] overflow-y-auto pr-1">
          {filteredOptions.map((option) => {
            const isSelected = faceState.activeParts[activeCategory] === option.id;
            return (
              <button
                key={option.id}
                onClick={() => onSelectPart(activeCategory, option.id)}
                className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between group relative overflow-hidden ${
                  isSelected
                    ? 'bg-sky-950/60 border-sky-400 text-sky-200 shadow-[0_0_14px_rgba(56,189,248,0.3)]'
                    : 'bg-slate-900/40 border-slate-800 text-slate-300 hover:bg-slate-800/60 hover:border-slate-700'
                }`}
              >
                <div>
                  <div className="font-semibold text-xs text-slate-200 group-hover:text-sky-300">
                    {option.name}
                  </div>
                  {option.description && (
                    <div className="text-[10px] text-slate-400 mt-1 line-clamp-2">
                      {option.description}
                    </div>
                  )}
                </div>

                <div className="mt-3 flex justify-between items-center text-[10px] font-mono text-slate-400">
                  <span className="opacity-60">{option.id}</span>
                  {isSelected && <span className="text-sky-400 font-bold">ACTIVE</span>}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Color Customizers (Hair, Eyes, Beard) */}
      {(activeCategory === 'hair' || activeCategory === 'eyebrows' || activeCategory === 'beard') && (
        <div className="space-y-2 pt-3 border-t border-slate-800">
          <label className="text-xs font-medium text-slate-300 uppercase tracking-wider block">
            Hair & Brow Pigment Color
          </label>
          <div className="flex flex-wrap gap-2">
            {HAIR_COLORS.map((c) => (
              <button
                key={c.hex}
                onClick={() => onChangeColor('hair', c.hex)}
                className="w-7 h-7 rounded-full border border-slate-700 transition-transform hover:scale-110 focus:outline-none"
                style={{ backgroundColor: c.hex }}
                title={c.name}
              />
            ))}
          </div>
        </div>
      )}

      {activeCategory === 'eyes' && (
        <div className="space-y-2 pt-3 border-t border-slate-800">
          <label className="text-xs font-medium text-slate-300 uppercase tracking-wider block">
            Iris Pigment Color
          </label>
          <div className="flex flex-wrap gap-2">
            {EYE_COLORS.map((c) => (
              <button
                key={c.hex}
                onClick={() => onChangeColor('eyes', c.hex)}
                className="w-7 h-7 rounded-full border border-slate-700 transition-transform hover:scale-110 focus:outline-none"
                style={{ backgroundColor: c.hex }}
                title={c.name}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
