export const manifest = (() => {
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
		client: {"start":"_app/immutable/entry/start.A8YEnF5j.js","app":"_app/immutable/entry/app.D3RvsQNN.js","imports":["_app/immutable/entry/start.A8YEnF5j.js","_app/immutable/chunks/entry.DFdl6Ixr.js","_app/immutable/chunks/scheduler.CsBe5vJX.js","_app/immutable/entry/app.D3RvsQNN.js","_app/immutable/chunks/scheduler.CsBe5vJX.js","_app/immutable/chunks/index.BW1yIaZz.js"],"stylesheets":[],"fonts":[],"uses_env_dynamic_public":false},
		nodes: [
			__memo(() => import('../output/server/nodes/0.js')),
			__memo(() => import('../output/server/nodes/1.js')),
			__memo(() => import('../output/server/nodes/2.js'))
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
})();
