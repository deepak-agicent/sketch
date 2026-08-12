import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Face Composite Studio',
  description: 'Construct detailed suspect facial sketches with real-time age progression, modular vector part selection, micro-positioning, and official dossier export.',
  alternates: {
    canonical: '/draw',
  },
  openGraph: {
    title: 'Face Composite Studio | Identix Sketch',
    description: 'Construct detailed suspect facial sketches with real-time age progression, modular vector part selection, micro-positioning, and official dossier export.',
    url: 'https://identix-sketch.app/draw',
  },
};

export default function DrawLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
