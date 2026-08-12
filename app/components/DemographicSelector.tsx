'use client';

import React from 'react';
import { Gender, FaceState } from '../lib/types';
import { SKIN_TONES } from '../lib/face-parts';
import { User, Sparkles, Activity } from 'lucide-react';

interface DemographicSelectorProps {
  faceState: FaceState;
  onChangeGender: (gender: Gender) => void;
  onChangeAge: (age: number) => void;
  onChangeSkinTone: (skinToneId: string) => void;
}

export const DemographicSelector: React.FC<DemographicSelectorProps> = ({
  faceState,
  onChangeGender,
  onChangeAge,
  onChangeSkinTone,
}) => {
  const getAgeLabel = (age: number) => {
    if (age <= 14) return 'Child / Juvenile (5-14)';
    if (age <= 25) return 'Young Adult (15-25)';
    if (age <= 45) return 'Adult Prime (26-45)';
    if (age <= 60) return 'Middle Aged (46-60)';
    return 'Senior / Elder (61+)';
  };

  return (
    <div className="glass-panel p-5 rounded-2xl space-y-6">
      <div className="flex items-center justify-between border-b border-sky-500/20 pb-3">
        <h3 className="text-sm font-semibold tracking-wider text-sky-400 uppercase flex items-center gap-2">
          <Activity className="w-4 h-4 text-sky-400" />
          Demographic Telemetry
        </h3>
        <span className="text-xs font-mono text-slate-400 px-2 py-0.5 rounded bg-slate-900 border border-slate-800">
          ID-DEMO-01
        </span>
      </div>

      {/* Gender Selection */}
      <div className="space-y-2">
        <label className="text-xs font-medium text-slate-300 uppercase tracking-wider block">
          Subject Gender Profile
        </label>
        <div className="grid grid-cols-3 gap-2">
          {(['male', 'female', 'androgynous'] as Gender[]).map((g) => {
            const isActive = faceState.gender === g;
            return (
              <button
                key={g}
                onClick={() => onChangeGender(g)}
                className={`py-2 px-3 rounded-lg text-xs font-medium capitalize transition-all border flex items-center justify-center gap-1.5 ${
                  isActive
                    ? 'bg-sky-500/20 border-sky-400 text-sky-300 shadow-[0_0_12px_rgba(56,189,248,0.3)]'
                    : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                }`}
              >
                <User className={`w-3.5 h-3.5 ${isActive ? 'text-sky-400' : 'text-slate-500'}`} />
                {g}
              </button>
            );
          })}
        </div>
      </div>

      {/* Age Progression Engine */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-xs font-medium text-slate-300 uppercase tracking-wider">
            Age Progression Index
          </label>
          <span className="text-xs font-mono text-sky-400 font-bold bg-sky-950/60 border border-sky-800/60 px-2 py-0.5 rounded">
            {faceState.age} yrs
          </span>
        </div>

        <input
          type="range"
          min="5"
          max="80"
          value={faceState.age}
          onChange={(e) => onChangeAge(parseInt(e.target.value, 10))}
          className="w-full h-2 bg-slate-900 rounded-lg appearance-none cursor-pointer border border-slate-800"
        />

        <div className="flex justify-between items-center text-[11px] text-slate-400 font-mono">
          <span>5y</span>
          <span className="text-sky-300/80 font-sans">{getAgeLabel(faceState.age)}</span>
          <span>80y</span>
        </div>
      </div>

      {/* Skin Tone Palette */}
      <div className="space-y-3">
        <label className="text-xs font-medium text-slate-300 uppercase tracking-wider block">
          Skin Tone Palette
        </label>
        <div className="grid grid-cols-5 gap-2">
          {SKIN_TONES.map((tone) => {
            const isActive = faceState.skinToneId === tone.id;
            return (
              <button
                key={tone.id}
                onClick={() => onChangeSkinTone(tone.id)}
                title={tone.name}
                className={`group relative h-9 rounded-lg border transition-all flex items-center justify-center overflow-hidden ${
                  isActive
                    ? 'border-sky-400 shadow-[0_0_10px_rgba(56,189,248,0.5)] scale-105'
                    : 'border-slate-800 hover:border-slate-600'
                }`}
                style={{ backgroundColor: tone.fill }}
              >
                {isActive && (
                  <Sparkles className="w-3.5 h-3.5 text-slate-950 drop-shadow animate-pulse" />
                )}
              </button>
            );
          })}
        </div>
        <div className="text-[11px] font-mono text-slate-400 text-center">
          Active: <span className="text-slate-200">{SKIN_TONES.find((s) => s.id === faceState.skinToneId)?.name}</span>
        </div>
      </div>
    </div>
  );
};
