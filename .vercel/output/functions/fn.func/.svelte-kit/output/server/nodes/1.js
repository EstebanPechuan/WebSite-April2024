

export const index = 1;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/error.svelte.js')).default;
export const imports = ["_app/immutable/nodes/1.DCRP3Glp.js","_app/immutable/chunks/scheduler.CsBe5vJX.js","_app/immutable/chunks/index.BW1yIaZz.js","_app/immutable/chunks/stores.L4N_NmdT.js","_app/immutable/chunks/entry.DFdl6Ixr.js"];
export const stylesheets = [];
export const fonts = [];
