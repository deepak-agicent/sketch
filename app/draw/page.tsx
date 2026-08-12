'use client';

import React, { useState, useRef, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { FaceState, PartCategory, PartTransform, Gender } from '../lib/types';
import { DEFAULT_TRANSFORMS, PART_OPTIONS, SKIN_TONES } from '../lib/face-parts';
import { PRESET_SUSPECTS } from '../lib/presets';
import { FaceCanvas } from '../components/FaceCanvas';
import { DemographicSelector } from '../components/DemographicSelector';
import { FeaturePicker } from '../components/FeaturePicker';
import { FineTuneControls } from '../components/FineTuneControls';
import { DossierModal } from '../components/DossierModal';
import { 
  ShieldCheck, 
  ArrowLeft, 
  Dices, 
  RotateCcw, 
  Grid, 
  Crosshair, 
  FileText, 
  Download, 
  ZoomIn, 
  ZoomOut, 
  Check, 
  Sparkles,
  Bookmark
} from 'lucide-react';

const INITIAL_FACE_STATE: FaceState = {
  gender: 'male',
  age: 35,
  skinToneId: 'fair',
  activeParts: {
    head: 'head-oval',
    hair: 'hair-short-crop',
    eyebrows: 'eyebrow-classic',
    eyes: 'eyes-almond',
    nose: 'nose-straight',
    mouth: 'mouth-neutral',
    ears: 'ears-classic',
    beard: 'beard-stubble',
    glasses: 'glasses-none',
    marks: 'marks-none',
  },
  transforms: { ...DEFAULT_TRANSFORMS },
  customColors: {
    hair: '#3b2413',
    eyes: '#332012',
  },
};

function DrawStudioContent() {
  const searchParams = useSearchParams();
  const presetParam = searchParams.get('preset');

  const [faceState, setFaceState] = useState<FaceState>(INITIAL_FACE_STATE);
  const [history, setHistory] = useState<FaceState[]>([INITIAL_FACE_STATE]);
  const [historyIndex, setHistoryIndex] = useState(0);

  const [activeCategory, setActiveCategory] = useState<PartCategory>('head');
  const [showGrid, setShowGrid] = useState(true);
  const [showCrosshairs, setShowCrosshairs] = useState(true);
  const [zoom, setZoom] = useState(1);
  const [canvasBg, setCanvasBg] = useState<'light' | 'paper' | 'slate' | 'dark'>('light');
  const [isDossierOpen, setIsDossierOpen] = useState(false);

  const svgRef = useRef<SVGSVGElement | null>(null);

  // Auto-load preset from URL query param if present
  useEffect(() => {
    if (presetParam) {
      const foundPreset = PRESET_SUSPECTS.find((p) => p.id === presetParam);
      if (foundPreset) {
        setFaceState(foundPreset.faceState);
        setHistory([foundPreset.faceState]);
        setHistoryIndex(0);
      }
    }
  }, [presetParam]);

  // Helper to push state changes to undo history
  const updateFaceState = (newPartial: Partial<FaceState>) => {
    setFaceState((prev) => {
      const nextState = { ...prev, ...newPartial };
      const newHistory = history.slice(0, historyIndex + 1);
      newHistory.push(nextState);
      setHistory(newHistory);
      setHistoryIndex(newHistory.length - 1);
      return nextState;
    });
  };

  const handleUndo = () => {
    if (historyIndex > 0) {
      setHistoryIndex((prev) => prev - 1);
      setFaceState(history[historyIndex - 1]);
    }
  };

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex((prev) => prev + 1);
      setFaceState(history[historyIndex + 1]);
    }
  };

  // Gender Change
  const handleGenderChange = (gender: Gender) => {
    updateFaceState({ gender });
  };

  // Age Change
  const handleAgeChange = (age: number) => {
    updateFaceState({ age });
  };

  // Skin Tone Change
  const handleSkinToneChange = (skinToneId: string) => {
    updateFaceState({ skinToneId });
  };

  // Select Part
  const handleSelectPart = (category: PartCategory, partId: string) => {
    updateFaceState({
      activeParts: {
        ...faceState.activeParts,
        [category]: partId,
      },
    });
  };

  // Transform Changes
  const handleTransformChange = (category: PartCategory, newTransform: PartTransform) => {
    updateFaceState({
      transforms: {
        ...faceState.transforms,
        [category]: newTransform,
      },
    });
  };

  // Reset Part Transform
  const handleResetCategory = (category: PartCategory) => {
    updateFaceState({
      transforms: {
        ...faceState.transforms,
        [category]: { ...DEFAULT_TRANSFORMS[category] },
      },
    });
  };

  // Color Change
  const handleColorChange = (key: string, colorHex: string) => {
    updateFaceState({
      customColors: {
        ...faceState.customColors,
        [key]: colorHex,
      },
    });
  };

  // Load Preset Profile
  const handleLoadPreset = (presetId: string) => {
    const preset = PRESET_SUSPECTS.find((p) => p.id === presetId);
    if (preset) {
      updateFaceState(preset.faceState);
    }
  };

  // Randomize Suspect
  const handleRandomize = () => {
    const genders: Gender[] = ['male', 'female', 'androgynous'];
    const randomGender = genders[Math.floor(Math.random() * genders.length)];
    const randomAge = Math.floor(18 + Math.random() * 55);
    const randomSkin = SKIN_TONES[Math.floor(Math.random() * SKIN_TONES.length)].id;

    const randomParts: Record<PartCategory, string> = { ...faceState.activeParts };

    (Object.keys(PART_OPTIONS) as PartCategory[]).forEach((cat) => {
      const opts = PART_OPTIONS[cat].filter(
        (o) => !o.genderAllowed || o.genderAllowed.includes(randomGender)
      );
      if (opts.length > 0) {
        const randOpt = opts[Math.floor(Math.random() * opts.length)];
        randomParts[cat] = randOpt.id;
      }
    });

    updateFaceState({
      gender: randomGender,
      age: randomAge,
      skinToneId: randomSkin,
      activeParts: randomParts,
    });
  };

  // Export High-Res PNG Sketch
  const handleExportPng = () => {
    if (!svgRef.current) return;
    const svgElement = svgRef.current;
    const svgData = new XMLSerializer().serializeToString(svgElement);
    const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
    const URL = window.URL || window.webkitURL || window;
    const blobURL = URL.createObjectURL(svgBlob);

    const image = new Image();
    image.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 800;
      canvas.height = 1000;
      const context = canvas.getContext('2d');
      if (context) {
        // Dark forensic canvas background
        context.fillStyle = '#090d16';
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.drawImage(image, 0, 0, canvas.width, canvas.height);

        // Watermark text
        context.fillStyle = '#38bdf8';
        context.font = '16px monospace';
        context.fillText('IDENTIX INTELLIGENCE SKETCH • CONFIDENTIAL', 20, canvas.height - 20);

        const pngUrl = canvas.toDataURL('image/png');
        const downloadLink = document.createElement('a');
        downloadLink.href = pngUrl;
        downloadLink.download = `identix-suspect-composite-${Date.now()}.png`;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
      }
    };
    image.src = blobURL;
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 bg-tactical-grid selection:bg-sky-500 selection:text-slate-950 flex flex-col">
      {/* Studio Header Bar */}
      <header className="sticky top-0 z-30 border-b border-sky-500/20 bg-slate-950/90 backdrop-blur-md px-4 py-3">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-100 hover:border-slate-700 transition-colors"
              title="Return to Landing Page"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-sky-500/20 border border-sky-400 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5 text-sky-400" />
              </div>
              <div>
                <h1 className="text-sm font-bold tracking-wider text-slate-100 uppercase">
                  Identix Draw Studio
                </h1>
                <p className="text-[10px] font-mono text-sky-400/80">FORENSIC FACIAL COMPOSITOR</p>
              </div>
            </div>
          </div>

          {/* Center Header Controls: Presets & Randomize */}
          <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
            {/* Presets Loader */}
            <div className="flex items-center gap-1.5 bg-slate-900 border border-slate-800 rounded-xl px-3 py-1.5">
              <Bookmark className="w-3.5 h-3.5 text-sky-400" />
              <select
                onChange={(e) => handleLoadPreset(e.target.value)}
                className="bg-transparent text-slate-200 text-xs focus:outline-none cursor-pointer"
                defaultValue=""
              >
                <option value="" disabled className="bg-slate-900 text-slate-400">
                  Load Suspect Profile Preset...
                </option>
                {PRESET_SUSPECTS.map((p) => (
                  <option key={p.id} value={p.id} className="bg-slate-900 text-slate-200">
                    {p.codeName} ({p.demographicSummary})
                  </option>
                ))}
              </select>
            </div>

            {/* Randomize Button */}
            <button
              onClick={handleRandomize}
              className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-sky-300 hover:border-sky-500/40 transition-colors flex items-center gap-1.5"
              title="Generate Random Suspect"
            >
              <Dices className="w-3.5 h-3.5 text-sky-400" />
              <span>Randomize</span>
            </button>

            {/* Undo / Redo */}
            <div className="flex bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
              <button
                onClick={handleUndo}
                disabled={historyIndex === 0}
                className="px-2.5 py-1.5 text-slate-400 hover:text-slate-100 disabled:opacity-30 disabled:hover:text-slate-400 transition-colors"
                title="Undo Change"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={handleRedo}
                disabled={historyIndex === history.length - 1}
                className="px-2.5 py-1.5 text-slate-400 hover:text-slate-100 disabled:opacity-30 disabled:hover:text-slate-400 transition-colors rotate-180"
                title="Redo Change"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Right Header Action: Dossier Exporter */}
          <button
            onClick={() => setIsDossierOpen(true)}
            className="px-4 py-2 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-[0_0_15px_rgba(56,189,248,0.4)] transition-all flex items-center gap-2"
          >
            <FileText className="w-4 h-4" />
            <span>Generate Intelligence Report</span>
          </button>
        </div>
      </header>

      {/* Main Studio Grid Layout */}
      <main className="max-w-7xl mx-auto px-4 py-6 flex-1 w-full grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Demographics & Micro-Tuning */}
        <div className="lg:col-span-3 space-y-6">
          <DemographicSelector
            faceState={faceState}
            onChangeGender={handleGenderChange}
            onChangeAge={handleAgeChange}
            onChangeSkinTone={handleSkinToneChange}
          />

          <FineTuneControls
            category={activeCategory}
            transform={faceState.transforms[activeCategory] || DEFAULT_TRANSFORMS[activeCategory]}
            onChangeTransform={handleTransformChange}
            onResetCategory={handleResetCategory}
          />
        </div>

        {/* Center Column: Viewport Canvas & Tactical Toolbar */}
        <div className="lg:col-span-5 flex flex-col items-center space-y-4">
          {/* Canvas Card */}
          <div className="w-full relative glass-panel p-4 rounded-3xl border border-sky-500/30 flex flex-col items-center shadow-2xl">
            {/* Viewport Overlay Bar */}
            <div className="w-full flex justify-between items-center text-[11px] font-mono text-slate-400 mb-3 px-2">
              <span className="text-sky-400 font-bold flex items-center gap-1.5">
                <Crosshair className="w-3.5 h-3.5" /> CANVAS VIEWPORT
              </span>
              <span className="text-[10px] text-amber-300/90 font-sans font-medium px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20">
                ✋ Click & Drag features on canvas
              </span>
              <span className="uppercase text-slate-300">
                ACTIVE PART: <span className="text-sky-300 font-bold">{activeCategory}</span>
              </span>
            </div>

            {/* SVG Renderer */}
            <FaceCanvas
              faceState={faceState}
              showGrid={showGrid}
              showCrosshairs={showCrosshairs}
              zoom={zoom}
              selectedCategory={activeCategory}
              onSelectCategory={setActiveCategory}
              onTransformChange={handleTransformChange}
              svgRef={svgRef}
              canvasBg={canvasBg}
            />

            {/* Canvas Bottom Toolbar */}
            <div className="w-full flex flex-wrap items-center justify-between gap-2 mt-4 pt-3 border-t border-slate-800 text-xs font-mono">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowGrid(!showGrid)}
                  className={`p-2 rounded-lg border transition-colors ${
                    showGrid
                      ? 'bg-sky-500/20 border-sky-400 text-sky-300'
                      : 'bg-slate-900 border-slate-800 text-slate-500'
                  }`}
                  title="Toggle Grid Lines"
                >
                  <Grid className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setShowCrosshairs(!showCrosshairs)}
                  className={`p-2 rounded-lg border transition-colors ${
                    showCrosshairs
                      ? 'bg-sky-500/20 border-sky-400 text-sky-300'
                      : 'bg-slate-900 border-slate-800 text-slate-500'
                  }`}
                  title="Toggle Crosshairs"
                >
                  <Crosshair className="w-3.5 h-3.5" />
                </button>

                {/* Canvas Background Theme Switcher */}
                <div className="flex items-center gap-1 bg-slate-900 border border-slate-800 rounded-lg p-1">
                  <span className="text-[10px] text-slate-400 px-1">BG:</span>
                  {(['light', 'paper', 'dark'] as const).map((bgMode) => (
                    <button
                      key={bgMode}
                      onClick={() => setCanvasBg(bgMode)}
                      className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold transition-all ${
                        canvasBg === bgMode
                          ? 'bg-sky-500 text-slate-950 shadow-sm'
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      {bgMode}
                    </button>
                  ))}
                </div>
              </div>

              {/* Zoom Controls */}
              <div className="flex items-center gap-1 bg-slate-900 border border-slate-800 rounded-lg p-1">
                <button
                  onClick={() => setZoom((z) => Math.max(0.75, z - 0.1))}
                  className="p-1 text-slate-400 hover:text-slate-100"
                >
                  <ZoomOut className="w-3.5 h-3.5" />
                </button>
                <span className="px-2 text-[11px] text-sky-400 font-bold">
                  {Math.round(zoom * 100)}%
                </span>
                <button
                  onClick={() => setZoom((z) => Math.min(1.5, z + 0.1))}
                  className="p-1 text-slate-400 hover:text-slate-100"
                >
                  <ZoomIn className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Quick Export PNG */}
              <button
                onClick={handleExportPng}
                className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-sky-300 border border-sky-500/30 text-[11px] transition-colors flex items-center gap-1.5"
              >
                <Download className="w-3 h-3" /> Export PNG
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Modular Feature Selector */}
        <div className="lg:col-span-4">
          <FeaturePicker
            faceState={faceState}
            activeCategory={activeCategory}
            onSelectCategory={setActiveCategory}
            onSelectPart={handleSelectPart}
            onChangeColor={handleColorChange}
          />
        </div>
      </main>

      {/* Intelligence Report Modal */}
      <DossierModal
        isOpen={isDossierOpen}
        onClose={() => setIsDossierOpen(false)}
        faceState={faceState}
        onExportPng={handleExportPng}
      />
    </div>
  );
}

export default function DrawStudioPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-950 flex items-center justify-center text-sky-400 font-mono text-xs">Loading Identix Draw Studio...</div>}>
      <DrawStudioContent />
    </Suspense>
  );
}
