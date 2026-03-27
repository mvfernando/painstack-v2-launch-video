export const SPRING_DEFAULT = { stiffness: 80,  damping: 12, mass: 1.0 };
export const SPRING_BOUNCY  = { stiffness: 120, damping: 8,  mass: 0.8 };
export const SPRING_GENTLE  = { stiffness: 50,  damping: 14, mass: 1.2 };
export const SPRING_CAPTION = { stiffness: 60,  damping: 14, mass: 1.0 };
export const EASE_OUT       = [0.16, 1, 0.3, 1] as const;

// Timings @ 60fps
export const STAGGER_WORD   = 5;   // faster reveal
export const STAGGER_SLOW   = 8;   // faster reveal (impact)
export const STAGGER_EL     = 8;   // gap between elements
export const TYPEWRITER     = 3.5; // faster typing
export const HOLD_IMPACT    = 30;  // shorter pause (0.5s)
export const HOLD_VERDICT   = 40;  // shorter pause (0.6s)
export const CAPTION_OUT    = 10;  
export const CAPTION_PAUSE  = 5;   
export const CAPTION_IN     = 10;  
