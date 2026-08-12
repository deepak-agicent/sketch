export type Gender = 'male' | 'female' | 'androgynous';

export type AgeGroup = 'child' | 'young' | 'middle' | 'senior';

export interface SkinTone {
  id: string;
  name: string;
  fill: string;
  shadow: string;
  highlight: string;
}

export type PartCategory = 
  | 'head'
  | 'hair'
  | 'eyebrows'
  | 'eyes'
  | 'nose'
  | 'mouth'
  | 'ears'
  | 'beard'
  | 'glasses'
  | 'marks';

export interface PartTransform {
  x: number;
  y: number;
  scaleX: number;
  scaleY: number;
  rotation: number;
  spacing: number;
  color: string;
  opacity: number;
}

export interface FacePartOption {
  id: string;
  name: string;
  category: PartCategory;
  genderAllowed?: Gender[];
  description?: string;
}

export interface FaceState {
  gender: Gender;
  age: number; // 5 to 80
  skinToneId: string;
  activeParts: Record<PartCategory, string>; // category -> option id
  transforms: Record<PartCategory, PartTransform>;
  customColors: Record<string, string>; // e.g. hairColor, eyeColor
}

export interface SuspectProfile {
  id: string;
  codeName: string;
  caseNumber: string;
  demographicSummary: string;
  description: string;
  faceState: FaceState;
  createdAt: string;
}
