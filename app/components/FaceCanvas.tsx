'use client';

import React from 'react';
import { FaceState, PartCategory, PartTransform } from '../lib/types';
import { SKIN_TONES, DEFAULT_TRANSFORMS } from '../lib/face-parts';

interface FaceCanvasProps {
  faceState: FaceState;
  showGrid?: boolean;
  showCrosshairs?: boolean;
  zoom?: number;
  selectedCategory?: PartCategory | null;
  onSelectCategory?: (cat: PartCategory) => void;
  onTransformChange?: (cat: PartCategory, newTransform: PartTransform) => void;
  svgRef?: React.Ref<SVGSVGElement>;
  canvasBg?: 'light' | 'paper' | 'slate' | 'dark';
}

export const FaceCanvas: React.FC<FaceCanvasProps> = ({
  faceState,
  showGrid = true,
  showCrosshairs = true,
  zoom = 1,
  selectedCategory,
  onSelectCategory,
  onTransformChange,
  svgRef,
  canvasBg = 'light',
}) => {
  const localSvgRef = React.useRef<SVGSVGElement | null>(null);

  // Combine external and local SVG refs
  const setSvgRef = (node: SVGSVGElement | null) => {
    localSvgRef.current = node;
    if (typeof svgRef === 'function') {
      svgRef(node);
    } else if (svgRef) {
      (svgRef as React.MutableRefObject<SVGSVGElement | null>).current = node;
    }
  };

  const [draggingCategory, setDraggingCategory] = React.useState<PartCategory | null>(null);
  const [dragStart, setDragStart] = React.useState<{
    pointerX: number;
    pointerY: number;
    initialX: number;
    initialY: number;
  } | null>(null);

  const skin = SKIN_TONES.find((s) => s.id === faceState.skinToneId) || SKIN_TONES[1];
  const { activeParts, transforms, age, gender } = faceState;

  const hairColor = faceState.customColors.hair || transforms.hair?.color || '#2a1a08';
  const eyeColor = faceState.customColors.eyes || transforms.eyes?.color || '#4a2e12';
  const eyebrowColor = faceState.customColors.hair || transforms.eyebrows?.color || hairColor;
  const beardColor = faceState.customColors.beard || transforms.beard?.color || hairColor;
  const lipColor = transforms.mouth?.color || '#b05d5d';
  const glassesColor = transforms.glasses?.color || '#1e293b';

  // Age wrinkle scaling (0 at 20, 1 at 80)
  const wrinkleIntensity = Math.max(0, Math.min(1, (age - 25) / 55));

  // Background styling mapping
  const bgClasses = {
    light: 'bg-gradient-to-b from-slate-50 via-slate-100 to-slate-200 border-slate-300 shadow-[0_10px_30px_rgba(0,0,0,0.15)]',
    paper: 'bg-[#faf8f5] border-amber-200 shadow-md',
    slate: 'bg-slate-800 border-slate-700 shadow-xl',
    dark: 'bg-slate-950 border-sky-500/30 shadow-2xl',
  }[canvasBg];

  const gridStroke = canvasBg === 'light' || canvasBg === 'paper' ? 'stroke-slate-300/60' : 'stroke-sky-400/40';
  const crosshairStroke = canvasBg === 'light' || canvasBg === 'paper' ? 'stroke-sky-600/60' : 'stroke-sky-400';

  // Pointer Drag Handlers
  const handlePointerDown = (cat: PartCategory, e: React.PointerEvent) => {
    e.stopPropagation();
    onSelectCategory?.(cat);

    if (!onTransformChange) return;

    try {
      (e.target as Element).setPointerCapture(e.pointerId);
    } catch (_) {}

    const currentTransform = transforms[cat] || DEFAULT_TRANSFORMS[cat];
    setDraggingCategory(cat);
    setDragStart({
      pointerX: e.clientX,
      pointerY: e.clientY,
      initialX: currentTransform.x || 0,
      initialY: currentTransform.y || 0,
    });
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!draggingCategory || !dragStart || !onTransformChange || !localSvgRef.current) return;

    const rect = localSvgRef.current.getBoundingClientRect();
    const scaleRatio = 400 / rect.width;

    const dx = Math.round((e.clientX - dragStart.pointerX) * scaleRatio / zoom);
    const dy = Math.round((e.clientY - dragStart.pointerY) * scaleRatio / zoom);

    const currentTransform = transforms[draggingCategory] || DEFAULT_TRANSFORMS[draggingCategory];

    onTransformChange(draggingCategory, {
      ...currentTransform,
      x: dragStart.initialX + dx,
      y: dragStart.initialY + dy,
    });
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (draggingCategory) {
      try {
        (e.target as Element).releasePointerCapture(e.pointerId);
      } catch (_) {}
      setDraggingCategory(null);
      setDragStart(null);
    }
  };

  // Helper for applying transform matrix/attributes
  const getTransformAttr = (cat: PartCategory, defaultY: number = 0) => {
    const t = transforms[cat] || DEFAULT_TRANSFORMS[cat];
    const dx = t.x || 0;
    const dy = (t.y || 0) + defaultY;
    const sx = t.scaleX || 1;
    const sy = t.scaleY || 1;
    const rot = t.rotation || 0;
    return `translate(${dx}, ${dy}) scale(${sx}, ${sy}) rotate(${rot}, 200, 250)`;
  };

  // Eyeball, Eye & Ear spacing calculator
  const eyeSpacing = transforms.eyes?.spacing || 0;
  const earSpacing = transforms.ears?.spacing || 0;

  return (
    <div className={`relative w-full aspect-[4/5] max-w-[440px] mx-auto overflow-hidden rounded-2xl border transition-all ${bgClasses}`}>
      {/* Active Dragging Indicator Badge */}
      {draggingCategory && (
        <div className="absolute top-2 left-2 z-10 px-2.5 py-1 rounded-md bg-sky-500 text-slate-950 font-mono text-[10px] font-bold shadow-lg flex items-center gap-1.5 animate-pulse">
          <span>Repositioning {draggingCategory.toUpperCase()} (Click & Drag)</span>
        </div>
      )}
      <svg
        ref={setSvgRef}
        viewBox="0 0 400 500"
        className="w-full h-full touch-none select-none cursor-crosshair"
        style={{ transform: `scale(${zoom})`, transformOrigin: 'center' }}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      >
        <defs>
          {/* Gradients & Filters */}
          <radialGradient id="skinGrad" cx="50%" cy="40%" r="60%">
            <stop offset="0%" stopColor={skin.fill} />
            <stop offset="85%" stopColor={skin.shadow} />
          </radialGradient>

          <linearGradient id="hairGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={hairColor} />
            <stop offset="100%" stopColor={hairColor} stopOpacity="0.85" />
          </linearGradient>

          <filter id="shadowFilter" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#000000" floodOpacity="0.3" />
          </filter>
        </defs>

        {/* Tactical Rulers / Grid */}
        {showGrid && (
          <g className={`opacity-40 stroke-2 fill-none ${gridStroke}`}>
            {Array.from({ length: 20 }).map((_, i) => (
              <line key={`v-${i}`} x1={i * 20} y1={0} x2={i * 20} y2={500} strokeWidth="0.5" />
            ))}
            {Array.from({ length: 25 }).map((_, i) => (
              <line key={`h-${i}`} x1={0} y1={i * 20} x2={400} y2={i * 20} strokeWidth="0.5" />
            ))}
          </g>
        )}

        {/* Crosshair Center Indicators */}
        {showCrosshairs && (
          <g className={`opacity-60 fill-none ${crosshairStroke}`}>
            <line x1={200} y1={20} x2={200} y2={480} strokeDasharray="4 4" strokeWidth="0.75" />
            <line x1={20} y1={220} x2={380} y2={220} strokeDasharray="4 4" strokeWidth="0.75" />
            <circle cx={200} cy={220} r={140} strokeDasharray="2 4" strokeWidth="0.5" />
          </g>
        )}

        {/* --- LAYER 1: BASE HEAD SHAPE & EARS --- */}
        <g
          className={`cursor-grab active:cursor-grabbing transition-transform ${selectedCategory === 'ears' ? 'stroke-sky-400 stroke-2' : ''}`}
          onPointerDown={(e) => handlePointerDown('ears', e)}
          transform={getTransformAttr('ears')}
        >
          {/* Left Ear */}
          <g transform={`translate(${-earSpacing}, 0)`}>
            {activeParts.ears === 'ears-protruding' ? (
              <path d="M 85,210 C 65,190 60,250 88,270 Z" fill={skin.fill} stroke={skin.shadow} strokeWidth="2.5" />
            ) : activeParts.ears === 'ears-pointed' ? (
              <path d="M 90,210 C 65,160 70,240 92,265 Z" fill={skin.fill} stroke={skin.shadow} strokeWidth="2.5" />
            ) : activeParts.ears === 'ears-cauliflower' ? (
              <path d="M 90,210 C 70,200 70,250 85,260 C 78,240 92,220 90,210 Z" fill={skin.fill} stroke={skin.shadow} strokeWidth="2.5" />
            ) : activeParts.ears === 'ears-attached' ? (
              <path d="M 92,210 C 80,200 82,240 96,252 Z" fill={skin.fill} stroke={skin.shadow} strokeWidth="2" />
            ) : activeParts.ears === 'ears-pierced' ? (
              <g fill={skin.fill} stroke={skin.shadow} strokeWidth="2">
                <path d="M 90,210 C 75,195 72,250 92,265 Z" />
                <circle cx="86" cy="262" r="4" fill="none" stroke="#f59e0b" strokeWidth="2" />
              </g>
            ) : activeParts.ears === 'ears-small' ? (
              <path d="M 92,215 C 80,205 78,245 94,258 Z" fill={skin.fill} stroke={skin.shadow} strokeWidth="2" />
            ) : activeParts.ears === 'ears-long' ? (
              <path d="M 90,205 C 70,195 72,265 92,280 Z" fill={skin.fill} stroke={skin.shadow} strokeWidth="2" />
            ) : (
              /* Classic Left Ear */
              <path d="M 90,210 C 75,195 72,250 92,265 C 95,255 85,225 90,210 Z" fill={skin.fill} stroke={skin.shadow} strokeWidth="2" />
            )}
          </g>

          {/* Right Ear */}
          <g transform={`translate(${earSpacing}, 0)`}>
            {activeParts.ears === 'ears-protruding' ? (
              <path d="M 315,210 C 335,190 340,250 312,270 Z" fill={skin.fill} stroke={skin.shadow} strokeWidth="2.5" />
            ) : activeParts.ears === 'ears-pointed' ? (
              <path d="M 310,210 C 335,160 330,240 308,265 Z" fill={skin.fill} stroke={skin.shadow} strokeWidth="2.5" />
            ) : activeParts.ears === 'ears-cauliflower' ? (
              <path d="M 310,210 C 330,200 330,250 315,260 C 322,240 308,220 310,210 Z" fill={skin.fill} stroke={skin.shadow} strokeWidth="2.5" />
            ) : activeParts.ears === 'ears-attached' ? (
              <path d="M 308,210 C 320,200 318,240 304,252 Z" fill={skin.fill} stroke={skin.shadow} strokeWidth="2" />
            ) : activeParts.ears === 'ears-pierced' ? (
              <g fill={skin.fill} stroke={skin.shadow} strokeWidth="2">
                <path d="M 310,210 C 325,195 328,250 308,265 Z" />
                <circle cx="314" cy="262" r="4" fill="none" stroke="#f59e0b" strokeWidth="2" />
              </g>
            ) : activeParts.ears === 'ears-small' ? (
              <path d="M 308,215 C 320,205 322,245 306,258 Z" fill={skin.fill} stroke={skin.shadow} strokeWidth="2" />
            ) : activeParts.ears === 'ears-long' ? (
              <path d="M 308,205 C 330,195 328,265 308,280 Z" fill={skin.fill} stroke={skin.shadow} strokeWidth="2" />
            ) : (
              /* Classic Right Ear */
              <path d="M 310,210 C 325,195 328,250 308,265 C 305,255 315,225 310,210 Z" fill={skin.fill} stroke={skin.shadow} strokeWidth="2" />
            )}
          </g>
        </g>

        <g
          className={`cursor-grab active:cursor-grabbing ${selectedCategory === 'head' ? 'stroke-sky-400 stroke-2' : ''}`}
          onPointerDown={(e) => handlePointerDown('head', e)}
          transform={getTransformAttr('head')}
        >
          {/* Head Shape Path */}
          {activeParts.head === 'head-square' ? (
            <path
              d="M 120,130 C 120,80 280,80 280,130 L 285,250 C 285,320 250,350 200,355 C 150,350 115,320 115,250 Z"
              fill="url(#skinGrad)"
              stroke={skin.shadow}
              strokeWidth="3"
            />
          ) : activeParts.head === 'head-round' ? (
            <path
              d="M 110,140 C 110,70 290,70 290,140 C 295,230 285,345 200,355 C 115,345 105,230 110,140 Z"
              fill="url(#skinGrad)"
              stroke={skin.shadow}
              strokeWidth="3"
            />
          ) : activeParts.head === 'head-heart' ? (
            <path
              d="M 105,120 C 105,65 295,65 295,120 C 295,220 260,320 200,358 C 140,320 105,220 105,120 Z"
              fill="url(#skinGrad)"
              stroke={skin.shadow}
              strokeWidth="3"
            />
          ) : activeParts.head === 'head-diamond' ? (
            <path
              d="M 125,120 C 140,75 260,75 275,120 C 300,190 280,280 200,355 C 120,280 100,190 125,120 Z"
              fill="url(#skinGrad)"
              stroke={skin.shadow}
              strokeWidth="3"
            />
          ) : activeParts.head === 'head-chiseled' ? (
            <path
              d="M 115,130 C 115,75 285,75 285,130 L 290,240 L 255,325 L 200,355 L 145,325 L 110,240 Z"
              fill="url(#skinGrad)"
              stroke={skin.shadow}
              strokeWidth="3.5"
            />
          ) : (
            /* Classic Oval */
            <path
              d="M 115,135 C 115,75 285,75 285,135 C 290,225 275,340 200,350 C 125,340 110,225 115,135 Z"
              fill="url(#skinGrad)"
              stroke={skin.shadow}
              strokeWidth="3"
            />
          )}

          {/* Neck Lines */}
          <path
            d="M 140,330 L 135,420 M 260,330 L 265,420"
            fill="none"
            stroke={skin.shadow}
            strokeWidth="2.5"
          />
        </g>

        {/* --- LAYER 2: AGE WRINKLES & DYNAMIC FACIAL CONTOURS --- */}
        {wrinkleIntensity > 0 && (
          <g stroke={skin.shadow} strokeWidth="1.5" fill="none" opacity={wrinkleIntensity * 0.75}>
            {/* Forehead Creases */}
            <path d="M 140,115 Q 200,105 260,115" />
            <path d="M 150,130 Q 200,122 250,130" />
            {wrinkleIntensity > 0.4 && <path d="M 160,145 Q 200,138 240,145" />}

            {/* Nasolabial Folds (Smile lines) */}
            <path d="M 160,250 C 150,280 155,310 170,325" strokeWidth="2" />
            <path d="M 240,250 C 250,280 245,310 230,325" strokeWidth="2" />

            {/* Crow's Feet (Eye Corners) */}
            <path d="M 125,210 L 112,205 M 125,215 L 110,217 M 125,220 L 114,226" />
            <path d="M 275,210 L 288,205 M 275,215 L 290,217 M 275,220 L 286,226" />

            {/* Under-Eye Bags */}
            <path d="M 140,230 Q 165,242 190,232" strokeWidth="1.2" />
            <path d="M 210,232 Q 235,242 260,230" strokeWidth="1.2" />

            {/* Marionette Lines (Chin) */}
            {wrinkleIntensity > 0.6 && (
              <>
                <path d="M 175,320 L 172,340" />
                <path d="M 225,320 L 228,340" />
              </>
            )}
          </g>
        )}

        {/* --- LAYER 3: MARKS & SCARS --- */}
        <g
          className={`cursor-grab active:cursor-grabbing ${selectedCategory === 'marks' ? 'stroke-red-400' : ''}`}
          onPointerDown={(e) => handlePointerDown('marks', e)}
          transform={getTransformAttr('marks')}
        >
          {activeParts.marks === 'marks-cheek-scar' && (
            <g stroke="#8b4513" strokeWidth="2" fill="none">
              <line x1="245" y1="240" x2="275" y2="280" stroke="#7a3e3e" strokeWidth="3" />
              <line x1="250" y1="252" x2="258" y2="248" />
              <line x1="260" y1="265" x2="268" y2="261" />
            </g>
          )}

          {activeParts.marks === 'marks-eyebrow-scar' && (
            <line x1="150" y1="165" x2="155" y2="185" stroke="#7a3e3e" strokeWidth="3" />
          )}

          {activeParts.marks === 'marks-mole-cheek' && (
            <circle cx="245" cy="275" r="3.5" fill="#362217" />
          )}

          {activeParts.marks === 'marks-freckles' && (
            <g fill="#9c5f43" opacity="0.6">
              <circle cx="160" cy="245" r="1.5" />
              <circle cx="168" cy="250" r="1.2" />
              <circle cx="175" cy="242" r="1.5" />
              <circle cx="225" cy="242" r="1.5" />
              <circle cx="232" cy="250" r="1.2" />
              <circle cx="240" cy="245" r="1.5" />
            </g>
          )}
        </g>

        {/* --- LAYER 4: NOSE --- */}
        <g
          className={`cursor-grab active:cursor-grabbing ${selectedCategory === 'nose' ? 'stroke-sky-400' : ''}`}
          onPointerDown={(e) => handlePointerDown('nose', e)}
          transform={getTransformAttr('nose')}
        >
          {activeParts.nose === 'nose-button' ? (
            <g fill="none" stroke={skin.shadow} strokeWidth="2.5" strokeLinecap="round">
              <path d="M 190,240 Q 200,248 210,240" />
              <path d="M 185,242 C 180,245 190,252 200,250 C 210,252 220,245 215,242" />
            </g>
          ) : activeParts.nose === 'nose-crooked' ? (
            <g fill="none" stroke={skin.shadow} strokeWidth="2.5" strokeLinecap="round">
              <path d="M 195,175 L 184,215 L 202,238 Q 200,248 208,235" />
              <path d="M 182,244 Q 200,254 216,244" />
            </g>
          ) : activeParts.nose === 'nose-upturned' ? (
            <g fill="none" stroke={skin.shadow} strokeWidth="2.5" strokeLinecap="round">
              <path d="M 194,180 Q 188,225 198,236" />
              <path d="M 182,234 C 185,248 215,248 218,234" strokeWidth="3" />
            </g>
          ) : activeParts.nose === 'nose-roman' ? (
            <g fill="none" stroke={skin.shadow} strokeWidth="2.8" strokeLinecap="round">
              <path d="M 196,170 C 180,200 182,225 198,245 L 208,245" />
              <path d="M 184,244 Q 200,252 216,244" />
            </g>
          ) : activeParts.nose === 'nose-bulbous' ? (
            <g fill="none" stroke={skin.shadow} strokeWidth="2.5" strokeLinecap="round">
              <path d="M 196,175 L 194,220" />
              <path d="M 180,238 C 172,256 228,256 220,238" fill={skin.shadow} opacity="0.15" />
              <path d="M 180,238 C 175,254 225,254 220,238" strokeWidth="3" />
            </g>
          ) : activeParts.nose === 'nose-wide-flat' ? (
            <g fill="none" stroke={skin.shadow} strokeWidth="3" strokeLinecap="round">
              <path d="M 195,185 L 192,230" />
              <path d="M 172,242 C 175,258 225,258 228,242" />
              <ellipse cx="184" cy="245" rx="5" ry="3" fill={skin.shadow} />
              <ellipse cx="216" cy="245" rx="5" ry="3" fill={skin.shadow} />
            </g>
          ) : activeParts.nose === 'nose-aquiline' ? (
            <g fill="none" stroke={skin.shadow} strokeWidth="2.5" strokeLinecap="round">
              <path d="M 195,175 L 188,215 L 200,248 L 208,248" />
              <path d="M 184,246 Q 192,255 200,252 Q 208,255 216,246" />
            </g>
          ) : activeParts.nose === 'nose-broad' ? (
            <g fill="none" stroke={skin.shadow} strokeWidth="2.5" strokeLinecap="round">
              <path d="M 196,180 L 194,225" />
              <path d="M 178,246 C 182,256 218,256 222,246" strokeWidth="3" />
            </g>
          ) : activeParts.nose === 'nose-pointed' ? (
            <g fill="none" stroke={skin.shadow} strokeWidth="2.5" strokeLinecap="round">
              <path d="M 198,175 L 196,238 L 200,248" />
              <path d="M 186,245 Q 200,252 214,245" />
            </g>
          ) : (
            /* Straight Nose */
            <g fill="none" stroke={skin.shadow} strokeWidth="2.5" strokeLinecap="round">
              <path d="M 195,175 L 192,235 Q 200,248 208,235" />
              <path d="M 185,244 Q 200,252 215,244" />
            </g>
          )}
        </g>

        {/* --- LAYER 5: EYES & EYEBROWS --- */}
        <g
          className={`cursor-grab active:cursor-grabbing ${selectedCategory === 'eyebrows' ? 'stroke-sky-400' : ''}`}
          onPointerDown={(e) => handlePointerDown('eyebrows', e)}
          transform={getTransformAttr('eyebrows')}
        >
          {/* Eyebrows */}
          {activeParts.eyebrows === 'eyebrow-thin-arch' ? (
            <g fill="none" stroke={eyebrowColor} strokeWidth="3" strokeLinecap="round">
              <path d="M 135,172 Q 160,158 185,175" />
              <path d="M 215,175 Q 240,158 265,172" />
            </g>
          ) : activeParts.eyebrows === 'eyebrow-unibrow' ? (
            <g fill="none" stroke={eyebrowColor} strokeWidth="4.5" strokeLinecap="round">
              <path d="M 130,174 Q 160,165 200,172 Q 240,165 270,174" />
            </g>
          ) : activeParts.eyebrows === 'eyebrow-slanted-v' ? (
            <g fill="none" stroke={eyebrowColor} strokeWidth="4.5" strokeLinecap="square">
              <path d="M 132,166 L 186,178" />
              <path d="M 268,166 L 214,178" />
            </g>
          ) : activeParts.eyebrows === 'eyebrow-plucked-thin' ? (
            <g fill="none" stroke={eyebrowColor} strokeWidth="1.8" strokeLinecap="round">
              <path d="M 135,172 Q 160,158 185,172" />
              <path d="M 215,172 Q 240,158 265,172" />
            </g>
          ) : activeParts.eyebrows === 'eyebrow-high-arch' ? (
            <g fill="none" stroke={eyebrowColor} strokeWidth="3.5" strokeLinecap="round">
              <path d="M 135,178 Q 155,152 185,172" />
              <path d="M 215,172 Q 245,152 265,178" />
            </g>
          ) : activeParts.eyebrows === 'eyebrow-feathered' ? (
            <g fill="none" stroke={eyebrowColor} strokeWidth="3" strokeDasharray="4 2" strokeLinecap="round">
              <path d="M 132,174 Q 160,164 186,174" />
              <path d="M 214,174 Q 240,164 268,174" />
            </g>
          ) : activeParts.eyebrows === 'eyebrow-bushy' ? (
            <g fill={eyebrowColor} stroke={eyebrowColor} strokeWidth="2">
              <path d="M 130,178 C 150,162 175,166 188,176 C 170,176 150,180 130,178 Z" />
              <path d="M 270,178 C 250,162 225,166 212,176 C 230,176 250,180 270,178 Z" />
            </g>
          ) : activeParts.eyebrows === 'eyebrow-angular' ? (
            <g fill="none" stroke={eyebrowColor} strokeWidth="4.5" strokeLinecap="square">
              <path d="M 130,176 L 165,164 L 186,176" />
              <path d="M 270,176 L 235,164 L 214,176" />
            </g>
          ) : activeParts.eyebrows === 'eyebrow-straight' ? (
            <g fill="none" stroke={eyebrowColor} strokeWidth="4" strokeLinecap="round">
              <path d="M 132,174 L 186,174" />
              <path d="M 214,174 L 268,174" />
            </g>
          ) : activeParts.eyebrows === 'eyebrow-scarred' ? (
            <g fill="none" stroke={eyebrowColor} strokeWidth="4" strokeLinecap="round">
              <path d="M 132,174 L 152,174 M 160,174 L 186,174" />
              <path d="M 214,174 L 268,174" />
            </g>
          ) : (
            /* Classic Eyebrows */
            <g fill="none" stroke={eyebrowColor} strokeWidth="4" strokeLinecap="round">
              <path d="M 132,176 Q 160,166 186,176" />
              <path d="M 214,176 Q 240,166 268,176" />
            </g>
          )}
        </g>

        <g
          className={`cursor-grab active:cursor-grabbing ${selectedCategory === 'eyes' ? 'stroke-sky-400' : ''}`}
          onPointerDown={(e) => handlePointerDown('eyes', e)}
          transform={getTransformAttr('eyes')}
        >
          {/* Eyes (Left & Right) with Iris/Pupil */}
          {activeParts.eyes === 'eyes-cat-eye' ? (
            <g transform="translate(0,-2)">
              <g transform={`translate(${-eyeSpacing}, 0)`}>
                <path d="M 135,208 C 145,190 175,190 183,200 Z" fill="#ffffff" stroke={skin.shadow} strokeWidth="2" />
                <circle cx="160" cy="202" r="8" fill={eyeColor} />
                <circle cx="160" cy="202" r="3.5" fill="#000000" />
                <path d="M 134,204 Q 160,192 184,198" fill="none" stroke="#000" strokeWidth="2" />
              </g>
              <g transform={`translate(${eyeSpacing}, 0)`}>
                <path d="M 265,208 C 255,190 225,190 217,200 Z" fill="#ffffff" stroke={skin.shadow} strokeWidth="2" />
                <circle cx="240" cy="202" r="8" fill={eyeColor} />
                <circle cx="240" cy="202" r="3.5" fill="#000000" />
                <path d="M 266,204 Q 240,192 216,198" fill="none" stroke="#000" strokeWidth="2" />
              </g>
            </g>
          ) : activeParts.eyes === 'eyes-deep-shadow' ? (
            <g>
              <g transform={`translate(${-eyeSpacing}, 0)`}>
                <ellipse cx="158" cy="205" rx="20" ry="11" fill="#e2e8f0" stroke={skin.shadow} strokeWidth="2" />
                <circle cx="158" cy="205" r="8" fill={eyeColor} />
                <circle cx="158" cy="205" r="3.5" fill="#000000" />
                <path d="M 135,194 Q 158,185 181,194" fill="none" stroke={skin.shadow} strokeWidth="3" opacity="0.7" />
              </g>
              <g transform={`translate(${eyeSpacing}, 0)`}>
                <ellipse cx="242" cy="205" rx="20" ry="11" fill="#e2e8f0" stroke={skin.shadow} strokeWidth="2" />
                <circle cx="242" cy="205" r="8" fill={eyeColor} />
                <circle cx="242" cy="205" r="3.5" fill="#000000" />
                <path d="M 219,194 Q 242,185 265,194" fill="none" stroke={skin.shadow} strokeWidth="3" opacity="0.7" />
              </g>
            </g>
          ) : activeParts.eyes === 'eyes-wide-pupil' ? (
            <g>
              <g transform={`translate(${-eyeSpacing}, 0)`}>
                <ellipse cx="158" cy="205" rx="22" ry="14" fill="#ffffff" stroke={skin.shadow} strokeWidth="2" />
                <circle cx="158" cy="205" r="10" fill={eyeColor} />
                <circle cx="158" cy="205" r="6" fill="#000000" />
                <circle cx="154" cy="201" r="3" fill="#ffffff" />
              </g>
              <g transform={`translate(${eyeSpacing}, 0)`}>
                <ellipse cx="242" cy="205" rx="22" ry="14" fill="#ffffff" stroke={skin.shadow} strokeWidth="2" />
                <circle cx="242" cy="205" r="10" fill={eyeColor} />
                <circle cx="242" cy="205" r="6" fill="#000000" />
                <circle cx="238" cy="201" r="3" fill="#ffffff" />
              </g>
            </g>
          ) : activeParts.eyes === 'eyes-droopy-lid' ? (
            <g>
              <g transform={`translate(${-eyeSpacing}, 0)`}>
                <ellipse cx="158" cy="207" rx="20" ry="10" fill="#ffffff" stroke={skin.shadow} strokeWidth="2" />
                <circle cx="158" cy="207" r="7.5" fill={eyeColor} />
                <circle cx="158" cy="207" r="3.5" fill="#000000" />
                <path d="M 135,200 Q 158,206 181,200" fill={skin.fill} stroke={skin.shadow} strokeWidth="1.5" />
              </g>
              <g transform={`translate(${eyeSpacing}, 0)`}>
                <ellipse cx="242" cy="207" rx="20" ry="10" fill="#ffffff" stroke={skin.shadow} strokeWidth="2" />
                <circle cx="242" cy="207" r="7.5" fill={eyeColor} />
                <circle cx="242" cy="207" r="3.5" fill="#000000" />
                <path d="M 219,200 Q 242,206 265,200" fill={skin.fill} stroke={skin.shadow} strokeWidth="1.5" />
              </g>
            </g>
          ) : activeParts.eyes === 'eyes-squinting' ? (
            <g>
              <g transform={`translate(${-eyeSpacing}, 0)`}>
                <ellipse cx="158" cy="205" rx="20" ry="6" fill="#ffffff" stroke={skin.shadow} strokeWidth="2" />
                <circle cx="158" cy="205" r="5" fill={eyeColor} />
                <circle cx="158" cy="205" r="2.5" fill="#000000" />
              </g>
              <g transform={`translate(${eyeSpacing}, 0)`}>
                <ellipse cx="242" cy="205" rx="20" ry="6" fill="#ffffff" stroke={skin.shadow} strokeWidth="2" />
                <circle cx="242" cy="205" r="5" fill={eyeColor} />
                <circle cx="242" cy="205" r="2.5" fill="#000000" />
              </g>
            </g>
          ) : (
            <g>
              <g transform={`translate(${-eyeSpacing}, 0)`}>
                {/* Left Eye */}
                <ellipse cx="158" cy="205" rx="20" ry="12" fill="#ffffff" stroke={skin.shadow} strokeWidth="2" />
                <circle cx="158" cy="205" r="9" fill={eyeColor} />
                <circle cx="158" cy="205" r="4" fill="#000000" />
                <circle cx="155" cy="202" r="2.5" fill="#ffffff" />
                {/* Eyelid Crease */}
                <path d="M 136,196 Q 158,190 180,196" fill="none" stroke={skin.shadow} strokeWidth="1.5" />
              </g>

              <g transform={`translate(${eyeSpacing}, 0)`}>
                {/* Right Eye */}
                <ellipse cx="242" cy="205" rx="20" ry="12" fill="#ffffff" stroke={skin.shadow} strokeWidth="2" />
                <circle cx="242" cy="205" r="9" fill={eyeColor} />
                <circle cx="242" cy="205" r="4" fill="#000000" />
                <circle cx="239" cy="202" r="2.5" fill="#ffffff" />
                {/* Eyelid Crease */}
                <path d="M 220,196 Q 242,190 264,196" fill="none" stroke={skin.shadow} strokeWidth="1.5" />
              </g>
            </g>
          )}
        </g>

        {/* --- LAYER 6: MOUTH & LIPS --- */}
        <g
          className={`cursor-grab active:cursor-grabbing ${selectedCategory === 'mouth' ? 'stroke-sky-400' : ''}`}
          onPointerDown={(e) => handlePointerDown('mouth', e)}
          transform={getTransformAttr('mouth')}
        >
          {activeParts.mouth === 'mouth-full' ? (
            <g stroke="#612626" strokeWidth="1.5">
              {/* Upper Lip */}
              <path d="M 165,300 Q 185,290 200,296 Q 215,290 235,300 C 220,306 180,306 165,300 Z" fill={lipColor} />
              {/* Lower Lip */}
              <path d="M 165,300 C 180,318 220,318 235,300 Z" fill={lipColor} />
            </g>
          ) : activeParts.mouth === 'mouth-thin' ? (
            <g fill="none" stroke="#522020" strokeWidth="2.5" strokeLinecap="round">
              <path d="M 172,300 Q 200,297 228,300" />
            </g>
          ) : activeParts.mouth === 'mouth-smirk' ? (
            <g stroke="#612626" strokeWidth="1.5">
              <path d="M 165,302 C 185,296 215,290 238,290 C 220,310 180,308 165,302 Z" fill={lipColor} />
            </g>
          ) : activeParts.mouth === 'mouth-grin' ? (
            <g stroke="#612626" strokeWidth="1.5">
              <path d="M 165,295 Q 200,290 235,295 C 230,320 170,320 165,295 Z" fill="#ffffff" stroke="#612626" strokeWidth="2" />
              <path d="M 167,297 Q 200,292 233,297 C 225,304 175,304 167,297 Z" fill={lipColor} opacity="0.3" />
              <line x1="165" y1="305" x2="235" y2="305" stroke="#612626" strokeWidth="1" strokeDasharray="4 2" />
            </g>
          ) : activeParts.mouth === 'mouth-pout' ? (
            <g stroke="#612626" strokeWidth="1.5">
              <path d="M 172,296 C 185,286 215,286 228,296 C 218,304 182,304 172,296 Z" fill={lipColor} />
              <path d="M 170,298 C 182,316 218,316 230,298 Z" fill={lipColor} />
            </g>
          ) : activeParts.mouth === 'mouth-thick-upper' ? (
            <g stroke="#612626" strokeWidth="1.5">
              <path d="M 165,300 C 180,286 220,286 235,300 Z" fill={lipColor} />
              <path d="M 170,300 C 185,308 215,308 230,300 Z" fill={lipColor} />
            </g>
          ) : activeParts.mouth === 'mouth-grimace' ? (
            <g stroke="#421414" strokeWidth="2.5" fill="none">
              <path d="M 168,302 L 232,302" strokeLinecap="square" />
              <line x1="170" y1="298" x2="170" y2="306" />
              <line x1="230" y1="298" x2="230" y2="306" />
            </g>
          ) : activeParts.mouth === 'mouth-smile' ? (
            <g stroke="#612626" strokeWidth="1.5">
              <path d="M 165,295 C 185,310 215,310 235,295 C 220,314 180,314 165,295 Z" fill={lipColor} />
            </g>
          ) : activeParts.mouth === 'mouth-downturned' ? (
            <g stroke="#612626" strokeWidth="1.5">
              <path d="M 168,306 Q 200,294 232,306" fill="none" strokeWidth="3" strokeLinecap="round" />
            </g>
          ) : (
            /* Classic Neutral Lips */
            <g stroke="#612626" strokeWidth="1.5">
              <path d="M 168,300 Q 185,294 200,298 Q 215,294 232,300 Z" fill={lipColor} />
              <path d="M 168,300 C 182,310 218,310 232,300 Z" fill={lipColor} />
            </g>
          )}
        </g>

        {/* --- LAYER 7: FACIAL HAIR (BEARD & MUSTACHE) --- */}
        <g
          className={`cursor-grab active:cursor-grabbing ${selectedCategory === 'beard' ? 'stroke-sky-400' : ''}`}
          onPointerDown={(e) => handlePointerDown('beard', e)}
          transform={getTransformAttr('beard')}
        >
          {activeParts.beard === 'beard-stubble' && (
            <path
              d="M 125,250 C 120,330 145,360 200,360 C 255,360 280,330 275,250 C 270,300 240,345 200,345 C 160,345 130,300 125,250 Z"
              fill={beardColor}
              opacity="0.3"
            />
          )}

          {activeParts.beard === 'beard-full' && (
            <g fill={beardColor}>
              <path d="M 118,230 C 115,340 140,375 200,375 C 260,375 285,340 282,230 C 275,320 250,350 200,350 C 150,350 125,320 118,230 Z" />
              {/* Mustache */}
              <path d="M 165,285 Q 200,280 235,285 Q 200,302 165,285 Z" />
            </g>
          )}

          {activeParts.beard === 'beard-goatee' && (
            <g fill={beardColor}>
              <path d="M 170,285 Q 200,280 230,285 C 220,300 220,355 200,358 C 180,355 180,300 170,285 Z" />
            </g>
          )}

          {activeParts.beard === 'beard-handlebar' && (
            <path
              d="M 160,285 C 175,280 195,290 200,295 C 205,290 225,280 240,285 C 252,289 248,272 235,278 C 215,282 205,284 200,287 C 195,284 185,282 165,278 C 152,272 148,289 160,285 Z"
              fill={beardColor}
            />
          )}

          {activeParts.beard === 'beard-pencil' && (
            <path
              d="M 168,288 Q 200,284 232,288 L 232,291 Q 200,287 168,291 Z"
              fill={beardColor}
            />
          )}
        </g>

        {/* --- LAYER 8: HAIRSTYLE --- */}
        <g
          className={`cursor-grab active:cursor-grabbing ${selectedCategory === 'hair' ? 'stroke-sky-400' : ''}`}
          onPointerDown={(e) => handlePointerDown('hair', e)}
          transform={getTransformAttr('hair')}
        >
          {activeParts.hair === 'hair-buzz-cut' ? (
            <path
              d="M 112,145 C 110,65 290,65 288,145 C 275,115 250,90 200,90 C 150,90 125,115 112,145 Z"
              fill="url(#hairGrad)"
              opacity="0.85"
            />
          ) : activeParts.hair === 'hair-side-part' ? (
            <path
              d="M 105,145 C 100,55 270,50 295,120 C 300,145 280,100 240,85 C 180,80 120,95 105,145 Z"
              fill="url(#hairGrad)"
              filter="url(#shadowFilter)"
            />
          ) : activeParts.hair === 'hair-slick-back' ? (
            <path
              d="M 108,140 C 105,50 295,50 292,140 C 280,75 250,65 200,65 C 150,65 120,75 108,140 Z"
              fill="url(#hairGrad)"
            />
          ) : activeParts.hair === 'hair-pompadour' ? (
            <path
              d="M 100,150 C 90,40 180,20 220,25 C 270,30 305,60 295,145 C 275,100 240,75 190,80 C 140,85 115,110 100,150 Z"
              fill="url(#hairGrad)"
              filter="url(#shadowFilter)"
            />
          ) : activeParts.hair === 'hair-spiky-top' ? (
            <path
              d="M 108,145 L 120,110 L 135,125 L 150,95 L 170,120 L 195,85 L 215,115 L 240,90 L 255,120 L 275,100 L 290,145 C 270,110 240,90 200,90 C 160,90 130,110 108,145 Z"
              fill="url(#hairGrad)"
            />
          ) : activeParts.hair === 'hair-man-bun' ? (
            <g>
              <circle cx="200" cy="45" r="24" fill="url(#hairGrad)" />
              <path
                d="M 108,140 C 105,60 295,60 290,140 C 278,95 248,75 200,75 C 152,75 122,95 110,140 Z"
                fill="url(#hairGrad)"
              />
            </g>
          ) : activeParts.hair === 'hair-messy-fringe' ? (
            <path
              d="M 102,145 C 95,60 295,55 298,140 C 285,125 260,165 240,135 C 225,170 190,140 170,175 C 150,140 125,160 102,145 Z"
              fill="url(#hairGrad)"
            />
          ) : activeParts.hair === 'hair-curly-afro' ? (
            <path
              d="M 85,150 C 60,70 120,30 200,30 C 280,30 340,70 315,150 C 325,200 300,240 285,240 C 280,130 260,70 200,70 C 140,70 120,130 115,240 C 100,240 75,200 85,150 Z"
              fill="url(#hairGrad)"
            />
          ) : activeParts.hair === 'hair-long-waves' ? (
            <path
              d="M 105,140 C 95,45 305,45 295,140 C 320,230 315,350 290,400 C 275,340 285,200 275,130 C 240,80 160,80 125,130 C 115,200 125,340 110,400 C 85,350 80,230 105,140 Z"
              fill="url(#hairGrad)"
            />
          ) : activeParts.hair === 'hair-ponytail' ? (
            <g>
              <path d="M 270,110 Q 340,110 330,220 Q 300,200 280,125 Z" fill="url(#hairGrad)" />
              <path
                d="M 105,140 C 95,50 305,50 295,140 C 280,75 250,65 200,65 C 150,65 120,75 105,140 Z"
                fill="url(#hairGrad)"
              />
            </g>
          ) : activeParts.hair === 'hair-dreadlocks' ? (
            <path
              d="M 85,150 C 70,50 330,50 315,150 C 340,250 335,380 310,430 C 290,360 300,220 285,130 C 240,80 160,80 115,130 C 100,220 110,360 90,430 C 65,380 60,250 85,150 Z"
              fill="url(#hairGrad)"
            />
          ) : activeParts.hair === 'hair-pixie' ? (
            <path
              d="M 108,145 C 100,60 290,55 292,130 C 285,100 260,75 200,75 C 140,75 115,100 108,145 Z"
              fill="url(#hairGrad)"
            />
          ) : activeParts.hair === 'hair-receding' ? (
            <path
              d="M 115,145 C 115,100 135,80 150,110 C 175,70 225,70 250,110 C 265,80 285,100 285,145 C 275,120 260,115 250,125 C 220,100 180,100 150,125 C 140,115 125,120 115,145 Z"
              fill="url(#hairGrad)"
            />
          ) : activeParts.hair === 'hair-bob' ? (
            <path
              d="M 105,130 C 95,50 305,50 295,130 C 310,210 300,280 280,280 C 275,200 275,120 200,85 C 125,120 125,200 120,280 C 100,280 90,210 105,130 Z"
              fill="url(#hairGrad)"
            />
          ) : activeParts.hair === 'hair-bald' ? (
            /* Bald scalp sheen line */
            <path d="M 140,90 Q 200,75 260,90" stroke="#ffffff" strokeWidth="2.5" opacity="0.3" fill="none" />
          ) : (
            /* Default Short Executive Crop */
            <path
              d="M 110,140 C 105,60 295,60 290,140 C 278,95 248,75 200,75 C 152,75 122,95 110,140 Z"
              fill="url(#hairGrad)"
            />
          )}
        </g>

        {/* --- LAYER 9: GLASSES / EYEWEAR --- */}
        <g
          className={`cursor-grab active:cursor-grabbing ${selectedCategory === 'glasses' ? 'stroke-sky-400' : ''}`}
          onPointerDown={(e) => handlePointerDown('glasses', e)}
          transform={getTransformAttr('glasses')}
        >
          {activeParts.glasses === 'glasses-rectangle' && (
            <g stroke={glassesColor} strokeWidth="3.5" fill="none">
              <rect x="130" y="188" width="55" height="34" rx="4" fill="rgba(255,255,255,0.15)" />
              <rect x="215" y="188" width="55" height="34" rx="4" fill="rgba(255,255,255,0.15)" />
              <line x1="185" y1="200" x2="215" y2="200" strokeWidth="3" />
              <line x1="130" y1="195" x2="95" y2="190" />
              <line x1="270" y1="195" x2="305" y2="190" />
            </g>
          )}

          {activeParts.glasses === 'glasses-round' && (
            <g stroke={glassesColor} strokeWidth="3" fill="none">
              <circle cx="158" cy="205" r="24" fill="rgba(255,255,255,0.12)" />
              <circle cx="242" cy="205" r="24" fill="rgba(255,255,255,0.12)" />
              <line x1="182" y1="205" x2="218" y2="205" strokeWidth="2.5" />
              <line x1="134" y1="205" x2="95" y2="198" />
              <line x1="266" y1="205" x2="305" y2="198" />
            </g>
          )}

          {activeParts.glasses === 'glasses-tactical' && (
            <g stroke="#0284c7" strokeWidth="3" fill="#0f172a" opacity="0.92">
              <path d="M 125,188 L 188,188 L 182,225 L 132,220 Z" />
              <path d="M 212,188 L 275,188 L 268,220 L 218,225 Z" />
              <line x1="188" y1="192" x2="212" y2="192" stroke="#38bdf8" strokeWidth="4" />
              <line x1="125" y1="192" x2="92" y2="188" stroke="#0284c7" strokeWidth="3" />
              <line x1="275" y1="192" x2="308" y2="188" stroke="#0284c7" strokeWidth="3" />
            </g>
          )}
        </g>
      </svg>
    </div>
  );
};
