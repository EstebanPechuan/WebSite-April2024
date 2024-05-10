import { init } from '../serverless.js';

export const handler = init((() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["favicon.png"]),
	mimeTypes: {".png":"image/png"},
	_: {
		client: {"start":"_app/immutable/entry/start.Br8R3Lbc.js","app":"_app/immutable/entry/app.As1qPXBv.js","imports":["_app/immutable/entry/start.Br8R3Lbc.js","_app/immutable/chunks/entry.DM3fGji-.js","_app/immutable/chunks/scheduler.CK1ZsYa2.js","_app/immutable/entry/app.As1qPXBv.js","_app/immutable/chunks/scheduler.CK1ZsYa2.js","_app/immutable/chunks/index.gl5_S-0y.js"],"stylesheets":[],"fonts":[],"uses_env_dynamic_public":false},
		nodes: [
			__memo(() => import('../server/nodes/0.js')),
			__memo(() => import('../server/nodes/1.js')),
			__memo(() => import('../server/nodes/2.js'))
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			}
		],
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})());
