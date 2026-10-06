// Shared Tailwind classes for the glassmorphism forms (contact, login, dashboard).

export const glassCard =
  "bg-zinc-900/20 border border-zinc-800/40 backdrop-blur-md rounded-2xl shadow-2xl";

export const fieldLabel =
  "text-zinc-300 text-xs font-semibold uppercase tracking-wider";

export const fieldInput =
  "bg-zinc-950/60 border-zinc-800/80 text-white placeholder:text-zinc-600 focus-visible:border-amber-500/80 focus-visible:ring-1 focus-visible:ring-amber-500/40 focus-visible:ring-offset-0 rounded-xl transition-all duration-200";

export const fieldError = "text-red-400 text-xs";

export const primaryButton =
  "bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-semibold rounded-xl transition-all duration-300 shadow-lg shadow-amber-500/10 flex items-center justify-center gap-2 disabled:opacity-40 disabled:pointer-events-none";

export const secondaryButton =
  "bg-white/[0.04] border border-white/[0.08] hover:bg-white/[0.08] text-white rounded-xl transition-colors flex items-center justify-center gap-2 disabled:opacity-40 disabled:pointer-events-none";
