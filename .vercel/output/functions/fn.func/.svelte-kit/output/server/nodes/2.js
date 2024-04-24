import * as server from '../entries/pages/_page.server.js';

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/+page.server.js";
export const imports = ["_app/immutable/nodes/2.amUHe45a.js","_app/immutable/chunks/scheduler.CsBe5vJX.js","_app/immutable/chunks/index.BW1yIaZz.js","_app/immutable/chunks/entry.CKNK1P88.js","_app/immutable/chunks/stores.uUwSZ8Zi.js"];
export const stylesheets = ["_app/immutable/assets/2.LAlRw2za.css"];
export const fonts = [];
