'use client';

import React, { useState } from 'react';
import { FaceState } from '../lib/types';
import { SKIN_TONES } from '../lib/face-parts';
import { FaceCanvas } from './FaceCanvas';
import { ShieldCheck, Download, Printer, X, FileText, CheckCircle2 } from 'lucide-react';

interface DossierModalProps {
  isOpen: boolean;
  onClose: () => void;
  faceState: FaceState;
  onExportPng: () => void;
}

export const DossierModal: React.FC<DossierModalProps> = ({
  isOpen,
  onClose,
  faceState,
  onExportPng,
}) => {
  const [witnessNotes, setWitnessNotes] = useState(
    'Subject identified near sector perimeter. Distinct eyebrows and jawline structure reported by primary witness.'
  );

  if (!isOpen) return null;

  const skinName = SKIN_TONES.find((s) => s.id === faceState.skinToneId)?.name || 'Standard';
  const caseId = `CASE-2026-${Math.floor(1000 + Math.random() * 9000)}`;
  const dateStr = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="glass-panel w-full max-w-3xl rounded-2xl border border-sky-500/30 overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="p-4 px-6 bg-slate-900/80 border-b border-sky-500/20 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-sky-500/20 border border-sky-400 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-sky-400" />
            </div>
            <div>
              <h2 className="text-base font-bold tracking-wider text-slate-100 uppercase">
                Intelligence Suspect Case Dossier
              </h2>
              <p className="text-xs font-mono text-sky-400/80">{caseId} • SECURE COMPOSITE REPORT</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-slate-300">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left: Rendered Sketch Canvas */}
            <div className="space-y-3 flex flex-col items-center">
              <div className="w-full max-w-[280px]">
                <FaceCanvas
                  faceState={faceState}
                  showGrid={false}
                  showCrosshairs={false}
                  zoom={1}
                  canvasBg="light"
                />
              </div>
              <div className="text-[11px] font-mono text-slate-400 text-center">
                VECTOR COMPOSITE • RENDERED AT 100% SCALE
              </div>
            </div>

            {/* Right: Forensic Metadata */}
            <div className="space-y-4 text-xs font-mono">
              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
                <div className="text-sky-400 font-bold uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5" /> Suspect Telemetry Summary
                </div>
                <div className="grid grid-cols-2 gap-y-1.5 text-slate-300">
                  <span className="text-slate-400">Gender Profile:</span>
                  <span className="capitalize text-slate-100 font-semibold">{faceState.gender}</span>

                  <span className="text-slate-400">Estimated Age:</span>
                  <span className="text-slate-100 font-semibold">{faceState.age} Years</span>

                  <span className="text-slate-400">Skin Tone Index:</span>
                  <span className="text-slate-100 font-semibold">{skinName}</span>

                  <span className="text-slate-400">Timestamp:</span>
                  <span className="text-slate-300">{dateStr}</span>
                </div>
              </div>

              {/* Selected Parts List */}
              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
                <div className="text-sky-400 font-bold uppercase tracking-wider text-[11px]">
                  Feature Assembly Matrix
                </div>
                <div className="space-y-1 max-h-[140px] overflow-y-auto pr-1">
                  {Object.entries(faceState.activeParts).map(([cat, optionId]) => (
                    <div key={cat} className="flex justify-between items-center text-[11px]">
                      <span className="capitalize text-slate-400">{cat}:</span>
                      <span className="text-slate-200 font-semibold flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                        {optionId}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Witness / Investigator Notes */}
              <div className="space-y-1.5">
                <label className="text-slate-400 text-[11px] font-bold uppercase">
                  Investigator / Witness Observations
                </label>
                <textarea
                  value={witnessNotes}
                  onChange={(e) => setWitnessNotes(e.target.value)}
                  rows={3}
                  className="w-full p-2.5 rounded-lg bg-slate-900/90 border border-slate-800 text-slate-200 text-xs font-sans focus:outline-none focus:border-sky-500"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 px-6 bg-slate-900/80 border-t border-sky-500/20 flex flex-wrap justify-between items-center gap-3">
          <div className="text-[11px] font-mono text-slate-400">
            CONFIDENTIAL • FOR LAW ENFORCEMENT & INTELLIGENCE USE
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => window.print()}
              className="px-4 py-2 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-all flex items-center gap-1.5"
            >
              <Printer className="w-4 h-4" /> Print Report
            </button>
            <button
              onClick={onExportPng}
              className="px-4 py-2 rounded-lg text-xs font-semibold bg-sky-500 hover:bg-sky-400 text-slate-950 shadow-[0_0_15px_rgba(56,189,248,0.4)] transition-all flex items-center gap-1.5"
            >
              <Download className="w-4 h-4" /> Download PNG Sketch
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
