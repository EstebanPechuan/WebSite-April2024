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
		client: {"start":"_app/immutable/entry/start.Dutlb-iO.js","app":"_app/immutable/entry/app.C7_IHnkR.js","imports":["_app/immutable/entry/start.Dutlb-iO.js","_app/immutable/chunks/entry.jTkf4lzA.js","_app/immutable/chunks/scheduler.CxMYe5r2.js","_app/immutable/entry/app.C7_IHnkR.js","_app/immutable/chunks/scheduler.CxMYe5r2.js","_app/immutable/chunks/index.DN6ym6f9.js"],"stylesheets":[],"fonts":[],"uses_env_dynamic_public":false},
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
