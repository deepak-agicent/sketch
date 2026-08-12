'use client';

import React from 'react';
import { PartCategory, PartTransform } from '../lib/types';
import { DEFAULT_TRANSFORMS } from '../lib/face-parts';
import { Move, Maximize2, RotateCw, SlidersHorizontal, RefreshCw } from 'lucide-react';

interface FineTuneControlsProps {
  category: PartCategory;
  transform: PartTransform;
  onChangeTransform: (category: PartCategory, newTransform: PartTransform) => void;
  onResetCategory: (category: PartCategory) => void;
}

export const FineTuneControls: React.FC<FineTuneControlsProps> = ({
  category,
  transform = DEFAULT_TRANSFORMS[category],
  onChangeTransform,
  onResetCategory,
}) => {
  const updateField = (field: keyof PartTransform, value: number) => {
    onChangeTransform(category, {
      ...transform,
      [field]: value,
    });
  };

  return (
    <div className="glass-panel p-5 rounded-2xl space-y-5">
      <div className="flex justify-between items-center border-b border-sky-500/20 pb-3">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-sky-400" />
          <h3 className="text-sm font-semibold tracking-wider text-sky-400 uppercase">
            Micro-Tuning: <span className="text-slate-100">{category}</span>
          </h3>
        </div>
        <button
          onClick={() => onResetCategory(category)}
          className="flex items-center gap-1 text-[11px] font-mono text-slate-400 hover:text-sky-300 transition-colors bg-slate-900/60 px-2 py-1 rounded border border-slate-800"
        >
          <RefreshCw className="w-3 h-3" />
          Reset Part
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
        {/* Position X */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-slate-400 font-mono">
            <span className="flex items-center gap-1"><Move className="w-3 h-3 text-sky-400" /> Offset X</span>
            <span className="text-sky-300">{transform.x || 0}px</span>
          </div>
          <input
            type="range"
            min="-50"
            max="50"
            value={transform.x || 0}
            onChange={(e) => updateField('x', parseFloat(e.target.value))}
            className="w-full h-1.5 bg-slate-900 rounded appearance-none cursor-pointer"
          />
        </div>

        {/* Position Y */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-slate-400 font-mono">
            <span className="flex items-center gap-1"><Move className="w-3 h-3 text-sky-400" /> Offset Y</span>
            <span className="text-sky-300">{transform.y || 0}px</span>
          </div>
          <input
            type="range"
            min="-50"
            max="50"
            value={transform.y || 0}
            onChange={(e) => updateField('y', parseFloat(e.target.value))}
            className="w-full h-1.5 bg-slate-900 rounded appearance-none cursor-pointer"
          />
        </div>

        {/* Scale X */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-slate-400 font-mono">
            <span className="flex items-center gap-1"><Maximize2 className="w-3 h-3 text-sky-400" /> Scale Horizontal</span>
            <span className="text-sky-300">{(transform.scaleX || 1).toFixed(2)}x</span>
          </div>
          <input
            type="range"
            min="0.5"
            max="1.5"
            step="0.02"
            value={transform.scaleX || 1}
            onChange={(e) => updateField('scaleX', parseFloat(e.target.value))}
            className="w-full h-1.5 bg-slate-900 rounded appearance-none cursor-pointer"
          />
        </div>

        {/* Scale Y */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-slate-400 font-mono">
            <span className="flex items-center gap-1"><Maximize2 className="w-3 h-3 text-sky-400" /> Scale Vertical</span>
            <span className="text-sky-300">{(transform.scaleY || 1).toFixed(2)}x</span>
          </div>
          <input
            type="range"
            min="0.5"
            max="1.5"
            step="0.02"
            value={transform.scaleY || 1}
            onChange={(e) => updateField('scaleY', parseFloat(e.target.value))}
            className="w-full h-1.5 bg-slate-900 rounded appearance-none cursor-pointer"
          />
        </div>

        {/* Rotation */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-slate-400 font-mono">
            <span className="flex items-center gap-1"><RotateCw className="w-3 h-3 text-sky-400" /> Rotation</span>
            <span className="text-sky-300">{transform.rotation || 0}°</span>
          </div>
          <input
            type="range"
            min="-30"
            max="30"
            value={transform.rotation || 0}
            onChange={(e) => updateField('rotation', parseFloat(e.target.value))}
            className="w-full h-1.5 bg-slate-900 rounded appearance-none cursor-pointer"
          />
        </div>

        {/* Spacing (For Eyes/Eyebrows/Ears) */}
        {(category === 'eyes' || category === 'eyebrows' || category === 'ears') && (
          <div className="space-y-1.5">
            <div className="flex justify-between text-slate-400 font-mono">
              <span className="flex items-center gap-1">
                <SlidersHorizontal className="w-3 h-3 text-sky-400" />
                {category === 'ears' ? 'Ear Separation Distance' : 'Feature Spacing'}
              </span>
              <span className="text-sky-300">{transform.spacing || 0}px</span>
            </div>
            <input
              type="range"
              min="-40"
              max="40"
              value={transform.spacing || 0}
              onChange={(e) => updateField('spacing', parseFloat(e.target.value))}
              className="w-full h-1.5 bg-slate-900 rounded appearance-none cursor-pointer"
            />
          </div>
        )}
      </div>
    </div>
  );
};
