// Launch Week — Shared Design Tokens
// Separate from existing brand.ts to avoid breaking existing videos

export const lwColors = {
  bg: '#0a0a0f',
  cardBg: 'rgba(255,255,255,0.04)',
  cardBorder: 'rgba(255,255,255,0.08)',
  white: '#FFFFFF',
  introGray: '#8A8A93',
  orange: '#f96426',
  blue: '#2d81e0',
  pink: '#e040fb',
  green: '#22c55e',
  muted: '#6b7280',
};

export const lwFonts = {
  // Same as existing videos — Inter
  base: '"Inter", system-ui, sans-serif',
};

// Per-feature gradient accents (for FeatureTitle)
export const lwGradients = {
  hub:      'linear-gradient(135deg, #f96426 0%, #2d81e0 100%)',
  agents:   'linear-gradient(135deg, #a78bfa 0%, #2d81e0 100%)',
  cto:      'linear-gradient(135deg, #22c55e 0%, #2d81e0 100%)',
  dataroom: 'linear-gradient(135deg, #f96426 0%, #a78bfa 100%)',
  reddit:   'linear-gradient(135deg, #ff4500 0%, #f96426 100%)',
};
