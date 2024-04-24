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
		client: {"start":"_app/immutable/entry/start.Bj9cHo5J.js","app":"_app/immutable/entry/app.U2LoGrs0.js","imports":["_app/immutable/entry/start.Bj9cHo5J.js","_app/immutable/chunks/entry.CKNK1P88.js","_app/immutable/chunks/scheduler.CsBe5vJX.js","_app/immutable/entry/app.U2LoGrs0.js","_app/immutable/chunks/scheduler.CsBe5vJX.js","_app/immutable/chunks/index.BW1yIaZz.js"],"stylesheets":[],"fonts":[],"uses_env_dynamic_public":false},
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
