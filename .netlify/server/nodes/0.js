

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/layout.svelte.js')).default;
export const imports = ["_app/immutable/nodes/0.DwotwCqV.js","_app/immutable/chunks/scheduler.CxMYe5r2.js","_app/immutable/chunks/index.DN6ym6f9.js"];
export const stylesheets = [];
export const fonts = [];
