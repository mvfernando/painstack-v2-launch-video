export const SPRING_DEFAULT = { stiffness: 80,  damping: 12, mass: 1.0 };
export const SPRING_BOUNCY  = { stiffness: 120, damping: 8,  mass: 0.8 };
export const SPRING_GENTLE  = { stiffness: 50,  damping: 14, mass: 1.2 };
export const SPRING_CAPTION = { stiffness: 60,  damping: 14, mass: 1.0 };
export const EASE_OUT       = [0.16, 1, 0.3, 1] as const;

// Timings @ 60fps
export const STAGGER_WORD   = 8;   // entre palavras (normal)
export const STAGGER_SLOW   = 12;  // entre palavras (cenas de impacto)
export const STAGGER_EL     = 12;  // entre elementos
export const TYPEWRITER     = 2.3; // chars/frame
export const HOLD_IMPACT    = 75;  // frames após frase de impacto (1.25s)
export const HOLD_VERDICT   = 90;  // frames após BUILD (1.5s)
export const CAPTION_OUT    = 15;  // frames para UserCaption sair
export const CAPTION_PAUSE  = 10;  // frames de pausa entre vozes
export const CAPTION_IN     = 15;  // frames para ProductCaption entrar
