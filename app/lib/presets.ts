import { SuspectProfile } from './types';
import { DEFAULT_TRANSFORMS, SKIN_TONES, PART_OPTIONS } from './face-parts';

// 10 Hand-crafted Core Presets
const HAND_CRAFTED_PRESETS: SuspectProfile[] = [
  {
    id: 'suspect-1',
    codeName: 'SUBJECT 001 (Marcus V.)',
    caseNumber: 'CASE-2026-8801',
    demographicSummary: 'Male, ~42 yrs, Receding Hair, Stubble',
    description: 'Reported wearing dark rectangular glasses with a diagonal cheek scar.',
    createdAt: '2026-08-12',
    faceState: {
      gender: 'male',
      age: 42,
      skinToneId: 'medium',
      activeParts: {
        head: 'head-square',
        hair: 'hair-receding',
        eyebrows: 'eyebrow-bushy',
        eyes: 'eyes-intense',
        nose: 'nose-aquiline',
        mouth: 'mouth-thin',
        ears: 'ears-classic',
        beard: 'beard-stubble',
        glasses: 'glasses-rectangle',
        marks: 'marks-cheek-scar',
      },
      transforms: {
        ...DEFAULT_TRANSFORMS,
        hair: { ...DEFAULT_TRANSFORMS.hair, color: '#3b2413' },
        eyes: { ...DEFAULT_TRANSFORMS.eyes, color: '#332012', spacing: 2 },
        beard: { ...DEFAULT_TRANSFORMS.beard, color: '#26180c' },
      },
      customColors: {
        hair: '#3b2413',
        eyes: '#332012',
      },
    },
  },
  {
    id: 'suspect-2',
    codeName: 'SUBJECT 002 (Elena R.)',
    caseNumber: 'CASE-2026-8802',
    demographicSummary: 'Female, ~26 yrs, Long Waves, Freckles',
    description: 'Observed near perimeter, almond eyes with subtle facial freckles.',
    createdAt: '2026-08-12',
    faceState: {
      gender: 'female',
      age: 26,
      skinToneId: 'fair',
      activeParts: {
        head: 'head-oval',
        hair: 'hair-long-waves',
        eyebrows: 'eyebrow-thin-arch',
        eyes: 'eyes-almond',
        nose: 'nose-button',
        mouth: 'mouth-full',
        ears: 'ears-small',
        beard: 'beard-none',
        glasses: 'glasses-none',
        marks: 'marks-freckles',
      },
      transforms: {
        ...DEFAULT_TRANSFORMS,
        hair: { ...DEFAULT_TRANSFORMS.hair, color: '#1a1008' },
        eyes: { ...DEFAULT_TRANSFORMS.eyes, color: '#2b5247' },
        mouth: { ...DEFAULT_TRANSFORMS.mouth, color: '#c46060' },
      },
      customColors: {
        hair: '#1a1008',
        eyes: '#2b5247',
      },
    },
  },
  {
    id: 'suspect-3',
    codeName: 'SUBJECT 003 (Arthur S.)',
    caseNumber: 'CASE-2026-8803',
    demographicSummary: 'Male, ~68 yrs, Silver Hair, Round Specs',
    description: 'Prominent forehead creases, downturned mouth, round wireframe glasses.',
    createdAt: '2026-08-12',
    faceState: {
      gender: 'male',
      age: 68,
      skinToneId: 'pale',
      activeParts: {
        head: 'head-chiseled',
        hair: 'hair-side-part',
        eyebrows: 'eyebrow-straight',
        eyes: 'eyes-hooded',
        nose: 'nose-straight',
        mouth: 'mouth-downturned',
        ears: 'ears-long',
        beard: 'beard-goatee',
        glasses: 'glasses-round',
        marks: 'marks-mole-cheek',
      },
      transforms: {
        ...DEFAULT_TRANSFORMS,
        hair: { ...DEFAULT_TRANSFORMS.hair, color: '#cfd8dc' },
        eyebrows: { ...DEFAULT_TRANSFORMS.eyebrows, color: '#b0bec5' },
        beard: { ...DEFAULT_TRANSFORMS.beard, color: '#eceff1' },
      },
      customColors: {
        hair: '#cfd8dc',
        eyes: '#37474f',
      },
    },
  },
  {
    id: 'suspect-4',
    codeName: 'SUBJECT 004 (Zane K.)',
    caseNumber: 'CASE-2026-8804',
    demographicSummary: 'Male, ~22 yrs, Spiky Crop, Pierced Ring',
    description: 'Young athletic male with spiky top hair and gold ear ring accessory.',
    createdAt: '2026-08-12',
    faceState: {
      gender: 'male',
      age: 22,
      skinToneId: 'tan',
      activeParts: {
        head: 'head-chiseled',
        hair: 'hair-spiky-top',
        eyebrows: 'eyebrow-angular',
        eyes: 'eyes-squinting',
        nose: 'nose-pointed',
        mouth: 'mouth-smirk',
        ears: 'ears-pierced',
        beard: 'beard-none',
        glasses: 'glasses-none',
        marks: 'marks-none',
      },
      transforms: {
        ...DEFAULT_TRANSFORMS,
        hair: { ...DEFAULT_TRANSFORMS.hair, color: '#271b12' },
        eyes: { ...DEFAULT_TRANSFORMS.eyes, color: '#1e293b' },
      },
      customColors: {
        hair: '#271b12',
        eyes: '#1e293b',
      },
    },
  },
  {
    id: 'suspect-5',
    codeName: 'SUBJECT 005 (Sophia C.)',
    caseNumber: 'CASE-2026-8805',
    demographicSummary: 'Female, ~34 yrs, Classic Bob, High Arch Brows',
    description: 'Distinctive classic bob cut with sharp angled eyebrows and cheek mole.',
    createdAt: '2026-08-12',
    faceState: {
      gender: 'female',
      age: 34,
      skinToneId: 'warm-beige',
      activeParts: {
        head: 'head-heart',
        hair: 'hair-bob',
        eyebrows: 'eyebrow-high-arch',
        eyes: 'eyes-cat-eye',
        nose: 'nose-upturned',
        mouth: 'mouth-grin',
        ears: 'ears-small',
        beard: 'beard-none',
        glasses: 'glasses-none',
        marks: 'marks-mole-cheek',
      },
      transforms: {
        ...DEFAULT_TRANSFORMS,
        hair: { ...DEFAULT_TRANSFORMS.hair, color: '#0f172a' },
        eyes: { ...DEFAULT_TRANSFORMS.eyes, color: '#0369a1' },
      },
      customColors: {
        hair: '#0f172a',
        eyes: '#0369a1',
      },
    },
  },
  {
    id: 'suspect-6',
    codeName: 'SUBJECT 006 (Viktor N.)',
    caseNumber: 'CASE-2026-8806',
    demographicSummary: 'Male, ~50 yrs, Full Beard, Broken Nose',
    description: 'Heavy set male with dense beard, pompadour hair, and crooked nose bridge.',
    createdAt: '2026-08-12',
    faceState: {
      gender: 'male',
      age: 50,
      skinToneId: 'olive',
      activeParts: {
        head: 'head-round',
        hair: 'hair-pompadour',
        eyebrows: 'eyebrow-unibrow',
        eyes: 'eyes-deep-shadow',
        nose: 'nose-crooked',
        mouth: 'mouth-grimace',
        ears: 'ears-cauliflower',
        beard: 'beard-full',
        glasses: 'glasses-none',
        marks: 'marks-forehead-wrinkles',
      },
      transforms: {
        ...DEFAULT_TRANSFORMS,
        hair: { ...DEFAULT_TRANSFORMS.hair, color: '#1e1b18' },
        beard: { ...DEFAULT_TRANSFORMS.beard, color: '#1e1b18' },
      },
      customColors: {
        hair: '#1e1b18',
        eyes: '#451a03',
      },
    },
  },
  {
    id: 'suspect-7',
    codeName: 'SUBJECT 007 (Maya B.)',
    caseNumber: 'CASE-2026-8807',
    demographicSummary: 'Female, ~29 yrs, High Ponytail, Cat Eyes',
    description: 'Sleek high ponytail hairstyle with cat-eye gaze and full lips.',
    createdAt: '2026-08-12',
    faceState: {
      gender: 'female',
      age: 29,
      skinToneId: 'deep-bronze',
      activeParts: {
        head: 'head-oval',
        hair: 'hair-ponytail',
        eyebrows: 'eyebrow-feathered',
        eyes: 'eyes-cat-eye',
        nose: 'nose-wide-flat',
        mouth: 'mouth-pout',
        ears: 'ears-attached',
        beard: 'beard-none',
        glasses: 'glasses-none',
        marks: 'marks-none',
      },
      transforms: {
        ...DEFAULT_TRANSFORMS,
        hair: { ...DEFAULT_TRANSFORMS.hair, color: '#09090b' },
        eyes: { ...DEFAULT_TRANSFORMS.eyes, color: '#422006' },
      },
      customColors: {
        hair: '#09090b',
        eyes: '#422006',
      },
    },
  },
  {
    id: 'suspect-8',
    codeName: 'SUBJECT 008 (Tariq M.)',
    caseNumber: 'CASE-2026-8808',
    demographicSummary: 'Male, ~38 yrs, Curly Afro, Pencil Mustache',
    description: 'Distinctive afro curls, pencil mustache line, and broad nose shape.',
    createdAt: '2026-08-12',
    faceState: {
      gender: 'male',
      age: 38,
      skinToneId: 'dark-brown',
      activeParts: {
        head: 'head-oval',
        hair: 'hair-curly-afro',
        eyebrows: 'eyebrow-slanted-v',
        eyes: 'eyes-wide-pupil',
        nose: 'nose-broad',
        mouth: 'mouth-thick-upper',
        ears: 'ears-protruding',
        beard: 'beard-pencil',
        glasses: 'glasses-none',
        marks: 'marks-none',
      },
      transforms: {
        ...DEFAULT_TRANSFORMS,
        hair: { ...DEFAULT_TRANSFORMS.hair, color: '#171717' },
        beard: { ...DEFAULT_TRANSFORMS.beard, color: '#171717' },
      },
      customColors: {
        hair: '#171717',
        eyes: '#1c1917',
      },
    },
  },
  {
    id: 'suspect-9',
    codeName: 'SUBJECT 009 (Dmitri Y.)',
    caseNumber: 'CASE-2026-8809',
    demographicSummary: 'Male, ~45 yrs, Man Bun, Handlebar Stache',
    description: 'Man bun hair knot, pronounced handlebar mustache, and pointed ears.',
    createdAt: '2026-08-12',
    faceState: {
      gender: 'male',
      age: 45,
      skinToneId: 'chestnut',
      activeParts: {
        head: 'head-chiseled',
        hair: 'hair-man-bun',
        eyebrows: 'eyebrow-bushy',
        eyes: 'eyes-droopy-lid',
        nose: 'nose-roman',
        mouth: 'mouth-smirk',
        ears: 'ears-pointed',
        beard: 'beard-handlebar',
        glasses: 'glasses-none',
        marks: 'marks-crow-feet',
      },
      transforms: {
        ...DEFAULT_TRANSFORMS,
        hair: { ...DEFAULT_TRANSFORMS.hair, color: '#292524' },
        beard: { ...DEFAULT_TRANSFORMS.beard, color: '#292524' },
      },
      customColors: {
        hair: '#292524',
        eyes: '#451a03',
      },
    },
  },
  {
    id: 'suspect-10',
    codeName: 'SUBJECT 010 (CYBER TARGET)',
    caseNumber: 'CYBER-2026-909',
    demographicSummary: 'Cyber Spec, ~30 yrs, Aviators, Cyan Tone',
    description: 'High-tech surveillance composite blueprint rendering with cyan theme.',
    createdAt: '2026-08-12',
    faceState: {
      gender: 'androgynous',
      age: 30,
      skinToneId: 'cyber-cyan',
      activeParts: {
        head: 'head-diamond',
        hair: 'hair-buzz-cut',
        eyebrows: 'eyebrow-angular',
        eyes: 'eyes-intense',
        nose: 'nose-pointed',
        mouth: 'mouth-neutral',
        ears: 'ears-classic',
        beard: 'beard-none',
        glasses: 'glasses-tactical',
        marks: 'marks-eyebrow-scar',
      },
      transforms: {
        ...DEFAULT_TRANSFORMS,
        hair: { ...DEFAULT_TRANSFORMS.hair, color: '#38bdf8' },
        glasses: { ...DEFAULT_TRANSFORMS.glasses, color: '#0284c7' },
      },
      customColors: {
        hair: '#38bdf8',
        eyes: '#06b6d4',
      },
    },
  },
];
export const REAL_PERSON_PRESETS: SuspectProfile[] = [
  {
    id: 'real-person-elon-musk',
    codeName: 'REAL SKETCH: Elon Musk',
    caseNumber: 'VIP-REAL-001',
    demographicSummary: 'Male, ~53 yrs, Widow Peak, Executive Hair',
    description: 'Tech innovator & entrepreneur profile featuring widow peak hairline, sharp angular jaw, and subtle stubble.',
    createdAt: '2026-08-13',
    category: 'real-person',
    realPersonName: 'Elon Musk',
    notableFeatures: ["Widow's Peak Hair", "Square Jaw", "Subtle Stubble"],
    faceState: {
      gender: 'male',
      age: 53,
      skinToneId: 'fair',
      activeParts: {
        head: 'head-chiseled',
        hair: 'hair-widows-peak',
        eyebrows: 'eyebrow-straight',
        eyes: 'eyes-hooded',
        nose: 'nose-roman',
        mouth: 'mouth-smirk',
        ears: 'ears-classic',
        beard: 'beard-stubble',
        glasses: 'glasses-none',
        marks: 'marks-chin-cleft',
      },
      transforms: {
        ...DEFAULT_TRANSFORMS,
        hair: { ...DEFAULT_TRANSFORMS.hair, color: '#4a3525' },
        eyes: { ...DEFAULT_TRANSFORMS.eyes, color: '#2c3e50' },
      },
      customColors: {
        hair: '#4a3525',
        eyes: '#2c3e50',
      },
    },
  },
  {
    id: 'real-person-morgan-freeman',
    codeName: 'REAL SKETCH: Morgan Freeman',
    caseNumber: 'VIP-REAL-002',
    demographicSummary: 'Male, ~87 yrs, Silver Afro Curls, Facial Mole',
    description: 'Iconic actor profile featuring silver curly ringlets, prominent cheek mole, hooded eyes, and dignified silver beard.',
    createdAt: '2026-08-13',
    category: 'real-person',
    realPersonName: 'Morgan Freeman',
    notableFeatures: ["Silver Ringlets", "Cheek Mole", "Hooded Eyes", "Dignified Beard"],
    faceState: {
      gender: 'male',
      age: 87,
      skinToneId: 'dark',
      activeParts: {
        head: 'head-oval',
        hair: 'hair-silver-curls',
        eyebrows: 'eyebrow-bushy',
        eyes: 'eyes-hooded',
        nose: 'nose-broad',
        mouth: 'mouth-downturned',
        ears: 'ears-long',
        beard: 'beard-goatee',
        glasses: 'glasses-none',
        marks: 'marks-mole-cheek',
      },
      transforms: {
        ...DEFAULT_TRANSFORMS,
        hair: { ...DEFAULT_TRANSFORMS.hair, color: '#e2e8f0' },
        eyebrows: { ...DEFAULT_TRANSFORMS.eyebrows, color: '#cbd5e1' },
        beard: { ...DEFAULT_TRANSFORMS.beard, color: '#e2e8f0' },
        eyes: { ...DEFAULT_TRANSFORMS.eyes, color: '#271b12' },
      },
      customColors: {
        hair: '#e2e8f0',
        eyes: '#271b12',
      },
    },
  },
  {
    id: 'real-person-taylor-swift',
    codeName: 'REAL SKETCH: Taylor Swift',
    caseNumber: 'VIP-REAL-003',
    demographicSummary: 'Female, ~34 yrs, Blonde Bangs, Cat Eyes',
    description: 'Global pop artist composite featuring signature front bangs, arched eyebrows, cat-eye makeup profile, and defined lips.',
    createdAt: '2026-08-13',
    category: 'real-person',
    realPersonName: 'Taylor Swift',
    notableFeatures: ["Front Bangs Bob", "Cat Eyes", "High Arch Brows", "Red Lip Profile"],
    faceState: {
      gender: 'female',
      age: 34,
      skinToneId: 'pale',
      activeParts: {
        head: 'head-heart',
        hair: 'hair-sleek-bangs',
        eyebrows: 'eyebrow-high-arch',
        eyes: 'eyes-cat-eye',
        nose: 'nose-button',
        mouth: 'mouth-full',
        ears: 'ears-small',
        beard: 'beard-none',
        glasses: 'glasses-none',
        marks: 'marks-none',
      },
      transforms: {
        ...DEFAULT_TRANSFORMS,
        hair: { ...DEFAULT_TRANSFORMS.hair, color: '#eab308' },
        eyes: { ...DEFAULT_TRANSFORMS.eyes, color: '#0284c7' },
        mouth: { ...DEFAULT_TRANSFORMS.mouth, color: '#dc2626' },
      },
      customColors: {
        hair: '#eab308',
        eyes: '#0284c7',
      },
    },
  },
  {
    id: 'real-person-barack-obama',
    codeName: 'REAL SKETCH: Barack Obama',
    caseNumber: 'VIP-REAL-004',
    demographicSummary: 'Male, ~63 yrs, Taper Fade, High Forehead',
    description: 'Presidential composite profile with clean afro taper fade, warm smile, attached ear lobes, and expressive eyebrows.',
    createdAt: '2026-08-13',
    category: 'real-person',
    realPersonName: 'Barack Obama',
    notableFeatures: ["Presidential Taper Fade", "Attached Ears", "Broad Warm Smile"],
    faceState: {
      gender: 'male',
      age: 63,
      skinToneId: 'medium',
      activeParts: {
        head: 'head-oval',
        hair: 'hair-taper-fade',
        eyebrows: 'eyebrow-classic',
        eyes: 'eyes-almond',
        nose: 'nose-straight',
        mouth: 'mouth-smile',
        ears: 'ears-attached',
        beard: 'beard-none',
        glasses: 'glasses-none',
        marks: 'marks-stubble-salt-pepper',
      },
      transforms: {
        ...DEFAULT_TRANSFORMS,
        hair: { ...DEFAULT_TRANSFORMS.hair, color: '#475569' },
        eyes: { ...DEFAULT_TRANSFORMS.eyes, color: '#1c1917' },
      },
      customColors: {
        hair: '#475569',
        eyes: '#1c1917',
      },
    },
  },
  {
    id: 'real-person-steve-jobs',
    codeName: 'REAL SKETCH: Steve Jobs',
    caseNumber: 'VIP-REAL-005',
    demographicSummary: 'Male, ~56 yrs, Rimless Specs, Goatee',
    description: 'Visionary co-founder profile featuring signature round rimless glasses, short silvered hair, and trimmed goatee.',
    createdAt: '2026-08-13',
    category: 'real-person',
    realPersonName: 'Steve Jobs',
    notableFeatures: ["Rimless Round Glasses", "Receding Hair", "Trimmed Goatee"],
    faceState: {
      gender: 'male',
      age: 56,
      skinToneId: 'fair',
      activeParts: {
        head: 'head-chiseled',
        hair: 'hair-receding',
        eyebrows: 'eyebrow-straight',
        eyes: 'eyes-intense',
        nose: 'nose-aquiline',
        mouth: 'mouth-thin',
        ears: 'ears-classic',
        beard: 'beard-goatee',
        glasses: 'glasses-rimless-round',
        marks: 'marks-none',
      },
      transforms: {
        ...DEFAULT_TRANSFORMS,
        hair: { ...DEFAULT_TRANSFORMS.hair, color: '#94a3b8' },
        beard: { ...DEFAULT_TRANSFORMS.beard, color: '#64748b' },
        glasses: { ...DEFAULT_TRANSFORMS.glasses, color: '#475569' },
      },
      customColors: {
        hair: '#94a3b8',
        eyes: '#334155',
      },
    },
  },
  {
    id: 'real-person-keanu-reeves',
    codeName: 'REAL SKETCH: Keanu Reeves',
    caseNumber: 'VIP-REAL-006',
    demographicSummary: 'Male, ~59 yrs, Medium Flow, Full Beard',
    description: 'Action icon profile featuring dark shoulder-length flow hair, rugged full beard, and calm almond gaze.',
    createdAt: '2026-08-13',
    category: 'real-person',
    realPersonName: 'Keanu Reeves',
    notableFeatures: ["Medium Shoulder Flow Hair", "Full Rugged Beard", "Dark Intense Gaze"],
    faceState: {
      gender: 'male',
      age: 59,
      skinToneId: 'fair',
      activeParts: {
        head: 'head-oval',
        hair: 'hair-shoulder-flow',
        eyebrows: 'eyebrow-straight',
        eyes: 'eyes-almond',
        nose: 'nose-straight',
        mouth: 'mouth-neutral',
        ears: 'ears-classic',
        beard: 'beard-full-rugged',
        glasses: 'glasses-none',
        marks: 'marks-none',
      },
      transforms: {
        ...DEFAULT_TRANSFORMS,
        hair: { ...DEFAULT_TRANSFORMS.hair, color: '#09090b' },
        beard: { ...DEFAULT_TRANSFORMS.beard, color: '#09090b' },
      },
      customColors: {
        hair: '#09090b',
        eyes: '#1c1917',
      },
    },
  },
  {
    id: 'real-person-scarlett-johansson',
    codeName: 'REAL SKETCH: Scarlett Johansson',
    caseNumber: 'VIP-REAL-007',
    demographicSummary: 'Female, ~39 yrs, Flowing Waves, Cheek Dimples',
    description: 'Hollywood star profile featuring cascading waves, defined cupid bow lips, cheek dimples, and bright almond gaze.',
    createdAt: '2026-08-13',
    category: 'real-person',
    realPersonName: 'Scarlett Johansson',
    notableFeatures: ["Cascading Waves", "Cheek Dimples", "Cupids Bow Lips"],
    faceState: {
      gender: 'female',
      age: 39,
      skinToneId: 'fair',
      activeParts: {
        head: 'head-heart',
        hair: 'hair-long-waves',
        eyebrows: 'eyebrow-feathered',
        eyes: 'eyes-almond',
        nose: 'nose-button',
        mouth: 'mouth-cupid',
        ears: 'ears-small',
        beard: 'beard-none',
        glasses: 'glasses-none',
        marks: 'marks-cheek-dimples',
      },
      transforms: {
        ...DEFAULT_TRANSFORMS,
        hair: { ...DEFAULT_TRANSFORMS.hair, color: '#ca8a04' },
        eyes: { ...DEFAULT_TRANSFORMS.eyes, color: '#0284c7' },
      },
      customColors: {
        hair: '#ca8a04',
        eyes: '#0284c7',
      },
    },
  },
  {
    id: 'real-person-dwayne-johnson',
    codeName: 'REAL SKETCH: Dwayne Johnson',
    caseNumber: 'VIP-REAL-008',
    demographicSummary: 'Male, ~52 yrs, Shaved Bald, Cocky Smirk',
    description: 'Action titan profile featuring smooth shaved scalp, broad jawline, athletic brow ridge, and iconic eyebrow smirk.',
    createdAt: '2026-08-13',
    category: 'real-person',
    realPersonName: 'Dwayne "The Rock" Johnson',
    notableFeatures: ["Shaved Clean Scalp", "Heavy Jawline", "Asymmetric Smirk"],
    faceState: {
      gender: 'male',
      age: 52,
      skinToneId: 'tan',
      activeParts: {
        head: 'head-chiseled',
        hair: 'hair-bald',
        eyebrows: 'eyebrow-angular',
        eyes: 'eyes-intense',
        nose: 'nose-broad',
        mouth: 'mouth-smirk',
        ears: 'ears-classic',
        beard: 'beard-stubble-chin',
        glasses: 'glasses-none',
        marks: 'marks-none',
      },
      transforms: {
        ...DEFAULT_TRANSFORMS,
        eyes: { ...DEFAULT_TRANSFORMS.eyes, color: '#451a03' },
      },
      customColors: {
        hair: '#000000',
        eyes: '#451a03',
      },
    },
  },
  {
    id: 'real-person-cillian-murphy',
    codeName: 'REAL SKETCH: Cillian Murphy',
    caseNumber: 'VIP-REAL-009',
    demographicSummary: 'Male, ~48 yrs, 1920s Undercut, Deep-Set Blue Eyes',
    description: 'Oscar winner composite featuring sharp chiseled diamond jaw, 1920s textured undercut, and piercing deep-set eyes.',
    createdAt: '2026-08-13',
    category: 'real-person',
    realPersonName: 'Cillian Murphy',
    notableFeatures: ["1920s Undercut", "Chiseled Cheekbones", "Deep-Set Eyes"],
    faceState: {
      gender: 'male',
      age: 48,
      skinToneId: 'pale',
      activeParts: {
        head: 'head-diamond',
        hair: 'hair-peaky-undercut',
        eyebrows: 'eyebrow-straight',
        eyes: 'eyes-deep-shadow',
        nose: 'nose-straight',
        mouth: 'mouth-thin',
        ears: 'ears-classic',
        beard: 'beard-stubble',
        glasses: 'glasses-none',
        marks: 'marks-none',
      },
      transforms: {
        ...DEFAULT_TRANSFORMS,
        hair: { ...DEFAULT_TRANSFORMS.hair, color: '#1e1b18' },
        eyes: { ...DEFAULT_TRANSFORMS.eyes, color: '#0369a1' },
      },
      customColors: {
        hair: '#1e1b18',
        eyes: '#0369a1',
      },
    },
  },
  {
    id: 'real-person-albert-einstein',
    codeName: 'REAL SKETCH: Albert Einstein',
    caseNumber: 'VIP-REAL-010',
    demographicSummary: 'Male, ~76 yrs, Wild Bushy Hair, Deep Wrinkles',
    description: 'Theoretical physicist profile with signature voluminous wild white hair, bushy eyebrows, and profound forehead creases.',
    createdAt: '2026-08-13',
    category: 'real-person',
    realPersonName: 'Albert Einstein',
    notableFeatures: ["Wild White Hair", "Bushy Eyebrows", "Deep Forehead Creases"],
    faceState: {
      gender: 'male',
      age: 76,
      skinToneId: 'pale',
      activeParts: {
        head: 'head-round',
        hair: 'hair-wild-einstein',
        eyebrows: 'eyebrow-bushy',
        eyes: 'eyes-droopy-lid',
        nose: 'nose-bulbous',
        mouth: 'mouth-neutral',
        ears: 'ears-long',
        beard: 'beard-none',
        glasses: 'glasses-none',
        marks: 'marks-none',
      },
      transforms: {
        ...DEFAULT_TRANSFORMS,
        hair: { ...DEFAULT_TRANSFORMS.hair, color: '#f8fafc' },
        eyebrows: { ...DEFAULT_TRANSFORMS.eyebrows, color: '#e2e8f0' },
      },
      customColors: {
        hair: '#f8fafc',
        eyes: '#334155',
      },
    },
  },
  {
    id: 'real-person-serena-williams',
    codeName: 'REAL SKETCH: Serena Williams',
    caseNumber: 'VIP-REAL-011',
    demographicSummary: 'Female, ~42 yrs, Braided Updo, High Brows',
    description: 'Tennis champion composite with athletic braided crown updo, expressive arched brows, and radiant brown tone.',
    createdAt: '2026-08-13',
    category: 'real-person',
    realPersonName: 'Serena Williams',
    notableFeatures: ["Braided Crown Updo", "High Arched Brows", "Radiant Jawline"],
    faceState: {
      gender: 'female',
      age: 42,
      skinToneId: 'deep-dark',
      activeParts: {
        head: 'head-oval',
        hair: 'hair-braided-updo',
        eyebrows: 'eyebrow-high-arch',
        eyes: 'eyes-almond',
        nose: 'nose-broad',
        mouth: 'mouth-full',
        ears: 'ears-small',
        beard: 'beard-none',
        glasses: 'glasses-none',
        marks: 'marks-none',
      },
      transforms: {
        ...DEFAULT_TRANSFORMS,
        hair: { ...DEFAULT_TRANSFORMS.hair, color: '#171717' },
        eyes: { ...DEFAULT_TRANSFORMS.eyes, color: '#271b12' },
      },
      customColors: {
        hair: '#171717',
        eyes: '#271b12',
      },
    },
  },
  {
    id: 'real-person-leonardo-dicaprio',
    codeName: 'REAL SKETCH: Leonardo DiCaprio',
    caseNumber: 'VIP-REAL-012',
    demographicSummary: 'Male, ~49 yrs, Slicked Back, Subtle Goatee',
    description: 'Hollywood icon profile with slicked back dark blonde hair, sharp angled eyebrows, intense blue gaze, and trim goatee.',
    createdAt: '2026-08-13',
    category: 'real-person',
    realPersonName: 'Leonardo DiCaprio',
    notableFeatures: ["Hollywood Slicked Back", "Sharp Brows", "Subtle Goatee"],
    faceState: {
      gender: 'male',
      age: 49,
      skinToneId: 'fair',
      activeParts: {
        head: 'head-square',
        hair: 'hair-sleek-slickback',
        eyebrows: 'eyebrow-angular',
        eyes: 'eyes-intense',
        nose: 'nose-straight',
        mouth: 'mouth-thin',
        ears: 'ears-classic',
        beard: 'beard-goatee',
        glasses: 'glasses-none',
        marks: 'marks-none',
      },
      transforms: {
        ...DEFAULT_TRANSFORMS,
        hair: { ...DEFAULT_TRANSFORMS.hair, color: '#854d0e' },
        eyes: { ...DEFAULT_TRANSFORMS.eyes, color: '#0284c7' },
        beard: { ...DEFAULT_TRANSFORMS.beard, color: '#854d0e' },
      },
      customColors: {
        hair: '#854d0e',
        eyes: '#0284c7',
      },
    },
  },
];

// Helper to generate additional procedural suspect profiles
function generate100Presets(): SuspectProfile[] {
  const list: SuspectProfile[] = [
    ...REAL_PERSON_PRESETS,
    ...HAND_CRAFTED_PRESETS,
  ];

  const firstNamesMale = [
    'Marcus', 'Viktor', 'Dmitri', 'Julian', 'Carlos', 'Gabriel', 'Arthur', 'Leo', 'Elias',
    'Zane', 'Tariq', 'Siddharth', 'Kenji', 'Darius', 'Hector', 'Roman', 'Mateo', 'Nico',
    'Xander', 'Kai', 'Finn', 'Dominic', 'Rohan', 'Omar', 'Felix'
  ];
  const firstNamesFemale = [
    'Elena', 'Sophia', 'Maya', 'Nadia', 'Chloe', 'Zoe', 'Fatima', 'Aria', 'Sora',
    'Camila', 'Irina', 'Kira', 'Valentina', 'Layla', 'Nora', 'Vera', 'Yuki', 'Seraphina',
    'Amara', 'Lucia', 'Zara', 'Ingrid', 'Freya', 'Talia', 'Mei'
  ];
  const lastNames = [
    'Vance', 'Mercer', 'Reyes', 'Kovacs', 'Chen', 'Novak', 'Sterling', 'Siddiqui',
    'Takahashi', 'O\'Connor', 'Moreno', 'Dubois', 'Volkov', 'Al-Mansoor', 'Silva',
    'Zhao', 'Petrov', 'Fontaine', 'Nakamura', 'Hassan', 'Vargas', 'Lindqvist', 'Adler'
  ];

  const hairColors = [
    '#1a1008', '#3b2413', '#0f172a', '#271b12', '#cfd8dc', '#b45309', '#09090b',
    '#451a03', '#38bdf8', '#171717', '#7c2d12', '#d97706', '#475569'
  ];
  const eyeColors = [
    '#332012', '#2b5247', '#37474f', '#0369a1', '#422006', '#1c1917', '#451a03',
    '#06b6d4', '#1e293b'
  ];

  const headOptions = PART_OPTIONS.head.map((o) => o.id);
  const hairOptions = PART_OPTIONS.hair.map((o) => o.id);
  const eyebrowOptions = PART_OPTIONS.eyebrows.map((o) => o.id);
  const eyeOptions = PART_OPTIONS.eyes.map((o) => o.id);
  const noseOptions = PART_OPTIONS.nose.map((o) => o.id);
  const mouthOptions = PART_OPTIONS.mouth.map((o) => o.id);
  const earOptions = PART_OPTIONS.ears.map((o) => o.id);
  const beardOptions = PART_OPTIONS.beard.map((o) => o.id);
  const glassesOptions = PART_OPTIONS.glasses.map((o) => o.id);
  const markOptions = PART_OPTIONS.marks.map((o) => o.id);
  const skinToneIds = SKIN_TONES.map((s) => s.id);

  for (let i = 11; i <= 100; i++) {
    const isFemale = i % 2 === 0;
    const gender = isFemale ? 'female' : i % 7 === 0 ? 'androgynous' : 'male';
    const age = 18 + ((i * 13) % 61);
    const firstName = isFemale
      ? firstNamesFemale[i % firstNamesFemale.length]
      : firstNamesMale[i % firstNamesMale.length];
    const lastName = lastNames[(i * 3) % lastNames.length];
    const skinToneId = skinToneIds[i % skinToneIds.length];

    const hairId = hairOptions[i % hairOptions.length];
    const beardId = gender === 'female' ? 'beard-none' : beardOptions[(i * 3) % beardOptions.length];
    const glassesId = glassesOptions[(i * 4) % glassesOptions.length];
    const markId = markOptions[(i * 5) % markOptions.length];
    const hairColor = hairColors[i % hairColors.length];
    const eyeColor = eyeColors[i % eyeColors.length];

    const codeNum = String(i).padStart(3, '0');
    const caseNum = `CASE-2026-${8800 + i}`;

    list.push({
      id: `suspect-${i}`,
      codeName: `SUBJECT ${codeNum} (${firstName} ${lastName.substring(0, 1)}.)`,
      caseNumber: caseNum,
      demographicSummary: `${gender.toUpperCase()}, ~${age} yrs, ${hairId.replace('hair-', '')}`,
      description: `Target logged under intelligence ledger ${caseNum}. Primary feature marker: ${markId.replace('marks-', '')}.`,
      createdAt: '2026-08-12',
      faceState: {
        gender,
        age,
        skinToneId,
        activeParts: {
          head: headOptions[i % headOptions.length],
          hair: hairId,
          eyebrows: eyebrowOptions[i % eyebrowOptions.length],
          eyes: eyeOptions[i % eyeOptions.length],
          nose: noseOptions[i % noseOptions.length],
          mouth: mouthOptions[i % mouthOptions.length],
          ears: earOptions[i % earOptions.length],
          beard: beardId,
          glasses: glassesId,
          marks: markId,
        },
        transforms: {
          ...DEFAULT_TRANSFORMS,
          hair: { ...DEFAULT_TRANSFORMS.hair, color: hairColor },
          eyes: { ...DEFAULT_TRANSFORMS.eyes, color: eyeColor },
          beard: { ...DEFAULT_TRANSFORMS.beard, color: hairColor },
        },
        customColors: {
          hair: hairColor,
          eyes: eyeColor,
        },
      },
    });
  }

  return list;
}

export const PRESET_SUSPECTS: SuspectProfile[] = generate100Presets();
