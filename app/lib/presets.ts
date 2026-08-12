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

// Helper to generate 90 additional procedural suspect profiles (total 100)
function generate100Presets(): SuspectProfile[] {
  const list: SuspectProfile[] = [...HAND_CRAFTED_PRESETS];

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
