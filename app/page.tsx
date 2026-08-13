'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { FaceCanvas } from './components/FaceCanvas';
import { PRESET_SUSPECTS } from './lib/presets';
import { 
  ShieldCheck, 
  Sparkles, 
  ArrowRight, 
  Sliders, 
  Layers, 
  Download, 
  UserCheck, 
  Cpu, 
  Activity,
  CheckCircle,
  Eye,
  Crosshair,
  Search,
  ChevronDown,
  ChevronUp,
  Users,
  Filter,
  ChevronLeft,
  ChevronRight,
  Star
} from 'lucide-react';

export default function LandingPage() {
  const [demoIndex, setDemoIndex] = useState(0);
  const currentDemo = PRESET_SUSPECTS[demoIndex] || PRESET_SUSPECTS[0];
  const [demoAge, setDemoAge] = useState(currentDemo.faceState.age);

  const [showAll, setShowAll] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [genderFilter, setGenderFilter] = useState<'all' | 'male' | 'female' | 'androgynous'>('all');
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'real-person' | 'forensic'>('all');

  const handleNextPreset = () => {
    const nextIdx = (demoIndex + 1) % PRESET_SUSPECTS.length;
    setDemoIndex(nextIdx);
    setDemoAge(PRESET_SUSPECTS[nextIdx].faceState.age);
  };

  const handlePrevPreset = () => {
    const prevIdx = (demoIndex - 1 + PRESET_SUSPECTS.length) % PRESET_SUSPECTS.length;
    setDemoIndex(prevIdx);
    setDemoAge(PRESET_SUSPECTS[prevIdx].faceState.age);
  };

  const activeFaceState = {
    ...currentDemo.faceState,
    age: demoAge,
  };

  const filteredPresets = PRESET_SUSPECTS.filter((preset) => {
    const matchesCategory =
      categoryFilter === 'all'
        ? true
        : categoryFilter === 'real-person'
        ? preset.category === 'real-person'
        : preset.category !== 'real-person';

    const matchesSearch =
      preset.codeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      preset.caseNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      preset.demographicSummary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (preset.realPersonName && preset.realPersonName.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesGender =
      genderFilter === 'all' || preset.faceState.gender === genderFilter;

    return matchesCategory && matchesSearch && matchesGender;
  });

  const displayedPresets = showAll ? filteredPresets : filteredPresets.slice(0, 10);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 bg-tactical-grid bg-radial-glow selection:bg-sky-500 selection:text-slate-950">
      {/* Top Tactical Navigation */}
      <header className="sticky top-0 z-40 border-b border-sky-500/20 bg-slate-950/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-sky-500/20 border border-sky-400 flex items-center justify-center shadow-[0_0_15px_rgba(56,189,248,0.3)]">
              <ShieldCheck className="w-6 h-6 text-sky-400" />
            </div>
            <div>
              <span className="text-lg font-bold tracking-widest uppercase bg-gradient-to-r from-sky-400 via-sky-200 to-indigo-300 bg-clip-text text-transparent">
                Identix
              </span>
              <span className="text-[10px] font-mono text-sky-400/80 block uppercase tracking-wider">
                Facial Intelligence Suite
              </span>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-xs font-mono text-slate-400">
            <a href="#examples" className="hover:text-sky-300 transition-colors">EXAMPLES (10)</a>
            <a href="#features" className="hover:text-sky-300 transition-colors">FEATURES</a>
            <a href="#how-it-works" className="hover:text-sky-300 transition-colors">HOW IT WORKS</a>
            <a href="#demographics" className="hover:text-sky-300 transition-colors">DEMOGRAPHICS</a>
          </nav>

          <Link
            href="/draw"
            className="px-5 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(56,189,248,0.4)] transition-all flex items-center gap-2 group"
          >
            <span>Launch Face Composer</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </header>

      <main>
        {/* Hero Section */}
      <section className="relative pt-12 pb-20 md:pt-20 md:pb-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Hero Left Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-400 text-xs font-mono">
                <Crosshair className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '8s' }} />
                <span>IDENTIX V2.0 • FORENSIC SKETCH COMPOSITION</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
                Precision Facial Composites for{' '}
                <span className="bg-gradient-to-r from-sky-400 to-indigo-400 bg-clip-text text-transparent">
                  Intelligence & Forensic Sketching
                </span>
              </h1>

              <p className="text-slate-400 text-base sm:text-lg max-w-2xl mx-auto lg:mx-0 leading-relaxed font-sans">
                Construct detailed human face composites based on suspect age, gender, ethnicity, and witness testimony. Features real-time age progression morphing, modular vector part selection, micro-positioning, and official dossier export.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
                <Link
                  href="/draw"
                  className="w-full sm:w-auto px-8 py-4 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-sm uppercase tracking-wider shadow-[0_0_25px_rgba(56,189,248,0.4)] transition-all flex items-center justify-center gap-2 group"
                >
                  <Sparkles className="w-5 h-5" />
                  <span>Start Face Composite</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>

                <a
                  href="#demo"
                  className="w-full sm:w-auto px-8 py-4 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-200 font-semibold text-sm border border-slate-800 hover:border-slate-700 transition-all text-center"
                >
                  Interactive Demo
                </a>
              </div>

              {/* Stat Telemetry Pills */}
              <div className="pt-6 grid grid-cols-3 gap-4 border-t border-slate-900 font-mono text-xs text-slate-400">
                <div>
                  <div className="text-xl font-bold text-sky-400">100+</div>
                  <div>Vector Parts</div>
                </div>
                <div>
                  <div className="text-xl font-bold text-sky-400">5 - 80 yrs</div>
                  <div>Age Morphing Engine</div>
                </div>
                <div>
                  <div className="text-xl font-bold text-sky-400">100%</div>
                  <div>High-Res PNG Export</div>
                </div>
              </div>
            </div>

            {/* Hero Right: Interactive Live Mini Canvas Demo */}
            <div id="demo" className="lg:col-span-5">
              <div className="glass-panel p-6 rounded-3xl space-y-5 border border-sky-500/30 relative">
                <div className="flex justify-between items-center border-b border-sky-500/20 pb-3 font-mono text-xs">
                  <span className="text-sky-400 font-bold flex items-center gap-2">
                    <Activity className="w-4 h-4" /> LIVE COMPOSITOR PREVIEW
                  </span>
                  <span className="text-slate-400">{currentDemo.codeName}</span>
                </div>

                {/* Face Canvas Render */}
                <div className="relative">
                  <FaceCanvas
                    faceState={activeFaceState}
                    showGrid={true}
                    showCrosshairs={true}
                    zoom={1}
                    canvasBg="light"
                  />
                </div>

                {/* Next / Previous Suspect Preset Switcher Navigation */}
                <div className="space-y-3 pt-2">
                  <div className="flex justify-between items-center text-xs text-slate-400 font-mono">
                    <span>Preset Suspect Navigation</span>
                    <span className="text-sky-400 font-bold">
                      Suspect {demoIndex + 1} of {PRESET_SUSPECTS.length}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={handlePrevPreset}
                      className="p-3 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-800 hover:border-sky-500/50 text-slate-300 hover:text-sky-300 transition-all flex items-center gap-1.5 font-mono text-xs font-semibold shadow-sm active:scale-95"
                      title="Previous Suspect Preset"
                    >
                      <ChevronLeft className="w-4 h-4 text-sky-400" />
                      <span className="hidden sm:inline">Prev</span>
                    </button>

                    <div className="flex-1 p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-center font-mono space-y-0.5 min-w-0">
                      <div className="text-xs font-bold text-sky-300 truncate">
                        {currentDemo.codeName}
                      </div>
                      <div className="text-[10px] text-slate-400 truncate">
                        {currentDemo.caseNumber} • {currentDemo.demographicSummary}
                      </div>
                    </div>

                    <button
                      onClick={handleNextPreset}
                      className="p-3 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-800 hover:border-sky-500/50 text-slate-300 hover:text-sky-300 transition-all flex items-center gap-1.5 font-mono text-xs font-semibold shadow-sm active:scale-95"
                      title="Next Suspect Preset"
                    >
                      <span className="hidden sm:inline">Next</span>
                      <ChevronRight className="w-4 h-4 text-sky-400" />
                    </button>
                  </div>

                  {/* Interactive Age Slider Demo */}
                  <div className="space-y-1.5 pt-2 border-t border-slate-800">
                    <div className="flex justify-between text-xs font-mono text-slate-400">
                      <span>Age Progression Morph</span>
                      <span className="text-sky-400 font-bold">{demoAge} Years</span>
                    </div>
                    <input
                      type="range"
                      min="5"
                      max="80"
                      value={demoAge}
                      onChange={(e) => setDemoAge(parseInt(e.target.value, 10))}
                      className="w-full h-2 bg-slate-900 rounded appearance-none cursor-pointer"
                    />
                  </div>

                  {/* Direct Launch Button for Selected Hero Suspect */}
                  <Link
                    href={`/draw?preset=${currentDemo.id}`}
                    className="w-full py-3 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(56,189,248,0.4)] transition-all flex items-center justify-center gap-2 group mt-3"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Open {currentDemo.codeName} in Editor</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 100 Pre-Built Suspect Profile Gallery Section */}
      <section id="examples" className="py-20 border-t border-slate-900 bg-slate-950/80 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-400 text-xs font-mono">
              <Users className="w-3.5 h-3.5" />
              <span>FORENSIC LIBRARY • 100 PRE-LOADED SUSPECT PROFILES</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-100">
              Select any Suspect Example to Open in Editor
            </h2>
            <p className="text-slate-400 text-sm sm:text-base">
              Choose from 100 distinct suspect sketches across ages, genders, and anatomical features. Click any example to immediately load and edit it in the Draw Studio.
            </p>
          </div>

          {/* Search & Filter Bar */}
          <div className="flex flex-col gap-4 p-4 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-md">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
              {/* Category Filters */}
              <div className="flex items-center gap-1.5 overflow-x-auto w-full lg:w-auto pb-1 lg:pb-0">
                <button
                  onClick={() => setCategoryFilter('all')}
                  className={`px-3 py-1.5 rounded-xl border text-xs font-mono font-bold transition-all flex items-center gap-1.5 ${
                    categoryFilter === 'all'
                      ? 'bg-sky-500/20 border-sky-400 text-sky-300 shadow-md'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <Users className="w-3.5 h-3.5" /> All Profiles (100+)
                </button>
                <button
                  onClick={() => setCategoryFilter('real-person')}
                  className={`px-3 py-1.5 rounded-xl border text-xs font-mono font-bold transition-all flex items-center gap-1.5 ${
                    categoryFilter === 'real-person'
                      ? 'bg-amber-500/20 border-amber-400 text-amber-300 shadow-md shadow-amber-500/10'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-amber-500/50 hover:text-amber-300'
                  }`}
                >
                  <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" /> Real Person Sketches (12)
                </button>
                <button
                  onClick={() => setCategoryFilter('forensic')}
                  className={`px-3 py-1.5 rounded-xl border text-xs font-mono font-bold transition-all flex items-center gap-1.5 ${
                    categoryFilter === 'forensic'
                      ? 'bg-sky-500/20 border-sky-400 text-sky-300 shadow-md'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-sky-400" /> Forensic Profiles (90)
                </button>
              </div>

              {/* Search Box */}
              <div className="relative w-full lg:w-80">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search (e.g. Elon, Jobs, Taylor, Marcus)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-sky-500 transition-colors"
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-2 pt-2 border-t border-slate-800/80">
              <div className="flex flex-wrap items-center gap-2 text-xs font-mono w-full sm:w-auto">
                <Filter className="w-3.5 h-3.5 text-sky-400" />
                <span className="text-slate-400">Gender:</span>
                {(['all', 'male', 'female', 'androgynous'] as const).map((g) => (
                  <button
                    key={g}
                    onClick={() => setGenderFilter(g)}
                    className={`px-2.5 py-1 rounded-lg border text-[11px] uppercase transition-all ${
                      genderFilter === g
                        ? 'bg-sky-500/20 border-sky-400 text-sky-300 font-bold'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    {g}
                  </button>
                ))}
              </div>

              <div className="text-xs font-mono text-slate-400">
                Showing <span className="text-sky-400 font-bold">{displayedPresets.length}</span> of {filteredPresets.length}
              </div>
            </div>
          </div>

          {/* Suspect Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
            {displayedPresets.map((preset) => (
              <div
                key={preset.id}
                className={`glass-panel p-4 rounded-2xl transition-all flex flex-col justify-between group space-y-4 shadow-lg ${
                  preset.category === 'real-person'
                    ? 'border border-amber-500/40 hover:border-amber-400 hover:shadow-[0_0_20px_rgba(245,158,11,0.25)] bg-slate-900/90'
                    : 'border border-slate-800 hover:border-sky-500/50 hover:shadow-[0_0_20px_rgba(56,189,248,0.2)]'
                }`}
              >
                <div className="space-y-3">
                  {/* Canvas Thumbnail */}
                  <div className="rounded-xl overflow-hidden border border-slate-800 bg-slate-900 relative">
                    <FaceCanvas
                      faceState={preset.faceState}
                      showGrid={false}
                      showCrosshairs={false}
                      zoom={0.88}
                      canvasBg="light"
                    />
                    <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-slate-950/80 border border-slate-800 text-[9px] font-mono text-sky-400 font-bold">
                      {preset.caseNumber}
                    </div>

                    {preset.category === 'real-person' && (
                      <div className="absolute top-2 right-2 px-2 py-0.5 rounded-md bg-amber-500 text-slate-950 text-[9px] font-mono font-bold flex items-center gap-1 shadow-md">
                        <Star className="w-2.5 h-2.5 fill-slate-950" /> REAL PERSON
                      </div>
                    )}
                  </div>

                  {/* Suspect Meta */}
                  <div className="space-y-1">
                    <h3 className={`text-sm font-bold truncate transition-colors ${
                      preset.category === 'real-person' ? 'text-amber-300 group-hover:text-amber-200' : 'text-slate-100 group-hover:text-sky-300'
                    }`}>
                      {preset.realPersonName ? `⭐ ${preset.realPersonName}` : preset.codeName}
                    </h3>
                    <p className="text-[11px] font-mono text-slate-400 truncate">
                      {preset.demographicSummary}
                    </p>
                    <p className="text-[10px] text-slate-500 line-clamp-2 pt-1 font-sans">
                      {preset.description}
                    </p>
                  </div>
                </div>

                {/* Direct Action Link */}
                <Link
                  href={`/draw?preset=${preset.id}`}
                  className={`w-full py-2.5 rounded-xl font-mono text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 shadow-sm ${
                    preset.category === 'real-person'
                      ? 'bg-amber-500/20 hover:bg-amber-500 border border-amber-500/40 text-amber-300 hover:text-slate-950'
                      : 'bg-sky-500/10 hover:bg-sky-500 border border-sky-500/30 hover:border-sky-400 text-sky-400 hover:text-slate-950'
                  }`}
                >
                  <span>Edit Profile</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            ))}
          </div>

          {/* View All / Collapse Button */}
          <div className="text-center pt-6">
            <button
              onClick={() => setShowAll(!showAll)}
              className="px-8 py-4 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-[0_0_25px_rgba(56,189,248,0.4)] transition-all inline-flex items-center gap-2 group"
            >
              <Users className="w-4 h-4" />
              <span>
                {showAll
                  ? 'Collapse Suspect Library'
                  : `View All ${PRESET_SUSPECTS.length} Suspect Profiles`}
              </span>
              {showAll ? (
                <ChevronUp className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
              ) : (
                <ChevronDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
              )}
            </button>
            <p className="text-xs font-mono text-slate-500 mt-2">
              {showAll
                ? `Displaying all ${filteredPresets.length} suspect sketches in memory`
                : `Currently previewing 10 of ${PRESET_SUSPECTS.length} suspect sketches`}
            </p>
          </div>
        </div>
      </section>

      {/* Features Grid Section */}
      <section id="features" className="py-20 border-t border-slate-900 bg-slate-950/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <h2 className="text-xs font-mono font-bold tracking-widest text-sky-400 uppercase">
              Core Capabilities
            </h2>
            <p className="text-3xl sm:text-4xl font-extrabold text-slate-100">
              Engineered for Precision Forensic Composition
            </p>
            <p className="text-slate-400 text-sm sm:text-base">
              Identix gives law enforcement, forensic sketch artists, and investigators complete modular control over human facial anatomy.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Feature 1 */}
            <div className="glass-card p-6 rounded-2xl space-y-4 hover:border-sky-500/30 transition-all group">
              <div className="w-12 h-12 rounded-xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400 group-hover:scale-110 transition-transform">
                <UserCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-100">Age & Gender Engine</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Seamless demographic controls covering Gender (Male, Female, Androgynous) and Age progression from 5 to 80 years old with dynamic facial crease generation.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="glass-card p-6 rounded-2xl space-y-4 hover:border-sky-500/30 transition-all group">
              <div className="w-12 h-12 rounded-xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400 group-hover:scale-110 transition-transform">
                <Layers className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-100">Modular Feature Library</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Choose from head shapes, hairstyles, eyebrows, eye variations, nose structures, mouth profiles, facial hair, glasses, and scars.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="glass-card p-6 rounded-2xl space-y-4 hover:border-sky-500/30 transition-all group">
              <div className="w-12 h-12 rounded-xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400 group-hover:scale-110 transition-transform">
                <Sliders className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-100">Micro-Tuning Controls</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Fine-tune X/Y offset, horizontal and vertical scaling, rotation angle, eye spacing, and pigment color for pixel-perfect witness accuracy.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="glass-card p-6 rounded-2xl space-y-4 hover:border-sky-500/30 transition-all group">
              <div className="w-12 h-12 rounded-xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400 group-hover:scale-110 transition-transform">
                <Download className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-100">Dossier Export</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Generate official Intelligence Suspect Dossiers complete with metadata breakdown, timestamp, witness notes, and high-res PNG face downloads.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="text-center space-y-3">
            <h2 className="text-xs font-mono font-bold tracking-widest text-sky-400 uppercase">
              Workflow Guide
            </h2>
            <p className="text-3xl font-extrabold text-slate-100">
              4 Steps to Full Facial Composite Reconstruction
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                step: '01',
                title: 'Set Demographics',
                desc: 'Select gender profile, target age range, and skin tone palette.',
              },
              {
                step: '02',
                title: 'Select Face Parts',
                desc: 'Choose head shape, hairline, eye type, nose structure, and mouth.',
              },
              {
                step: '03',
                title: 'Micro-Tune Placement',
                desc: 'Adjust eye spacing, feature offsets, rotation, scale, and age wrinkles.',
              },
              {
                step: '04',
                title: 'Generate Dossier',
                desc: 'Export high-res PNG image and print official witness case report.',
              },
            ].map((s) => (
              <div key={s.step} className="glass-card p-6 rounded-2xl space-y-3 relative overflow-hidden">
                <div className="text-4xl font-extrabold font-mono text-sky-500/20">{s.step}</div>
                <h4 className="text-base font-bold text-slate-100">{s.title}</h4>
                <p className="text-xs text-slate-400 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Footer Section */}
      <section className="py-20 border-t border-sky-500/20 bg-gradient-to-b from-slate-950 to-sky-950/40">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-8">
          <div className="w-16 h-16 rounded-2xl bg-sky-500/20 border border-sky-400 flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(56,189,248,0.3)]">
            <Cpu className="w-8 h-8 text-sky-400" />
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-100">
            Ready to Build a Facial Composite?
          </h2>

          <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto">
            Launch the Identix Draw Studio now and start reconstructing suspect face profiles in seconds.
          </p>

          <Link
            href="/draw"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-sm uppercase tracking-wider shadow-[0_0_30px_rgba(56,189,248,0.5)] transition-all group"
          >
            <span>Launch Draw Studio</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
          </Link>
        </div>
      </section>
      </main>

      {/* Footer */}
      <footer className="py-8 border-t border-slate-900 text-center text-xs font-mono text-slate-500">
        <p>© 2026 IDENTIX FACIAL INTELLIGENCE SUITE • FOR FORENSIC & WITNESS SKETCHING</p>
      </footer>
    </div>
  );
}
