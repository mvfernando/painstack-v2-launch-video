export const SPRING_DEFAULT = { stiffness: 80,  damping: 12, mass: 1.0 };
export const SPRING_BOUNCY  = { stiffness: 120, damping: 8,  mass: 0.8 };
export const SPRING_GENTLE  = { stiffness: 50,  damping: 14, mass: 1.2 };
export const EASE_OUT       = [0.16, 1, 0.3, 1] as const;

// ── Timings em frames (60fps) ──
// ATENÇÃO: valores mais lentos — ritmo "thinking out loud"
export const STAGGER_WORD_SLOW   = 12;  // ~200ms — ritmo de pensamento
export const STAGGER_WORD_NORMAL = 8;   // ~130ms — ritmo normal
export const STAGGER_EL          = 12;  // ~200ms entre elementos
export const TYPEWRITER          = 2.3; // chars por frame
export const FADE_DUR            = 24;  // ~400ms
export const SLIDE_DUR           = 36;  // ~600ms

// ── Pausas de silêncio — OBRIGATÓRIAS ──
export const HOLD_BEFORE_IMPACT  = 25;  // frames antes de frase de impacto
export const HOLD_AFTER_IMPACT   = 75;  // frames depois (= 1.25s)
export const HOLD_AFTER_VERDICT  = 90;  // frames depois do BUILD (= 1.5s)
