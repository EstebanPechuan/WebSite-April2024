import * as server from '../entries/pages/_page.server.js';

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/+page.server.js";
export const imports = ["_app/immutable/nodes/2.Di0oTp87.js","_app/immutable/chunks/scheduler.CK1ZsYa2.js","_app/immutable/chunks/index.gl5_S-0y.js","_app/immutable/chunks/entry.DM3fGji-.js","_app/immutable/chunks/stores.Cc8jWzHf.js"];
export const stylesheets = ["_app/immutable/assets/2.CumDC30L.css"];
export const fonts = [];
