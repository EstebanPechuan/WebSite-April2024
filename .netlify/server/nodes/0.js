

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/layout.svelte.js')).default;
export const imports = ["_app/immutable/nodes/0.VWXOhYSl.js","_app/immutable/chunks/scheduler.CK1ZsYa2.js","_app/immutable/chunks/index.gl5_S-0y.js"];
export const stylesheets = [];
export const fonts = [];
