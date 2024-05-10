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
		client: {"start":"_app/immutable/entry/start.CPH0cAiB.js","app":"_app/immutable/entry/app.mt2m6eqS.js","imports":["_app/immutable/entry/start.CPH0cAiB.js","_app/immutable/chunks/entry.NvH9wvHY.js","_app/immutable/chunks/scheduler.CK1ZsYa2.js","_app/immutable/entry/app.mt2m6eqS.js","_app/immutable/chunks/scheduler.CK1ZsYa2.js","_app/immutable/chunks/index.gl5_S-0y.js"],"stylesheets":[],"fonts":[],"uses_env_dynamic_public":false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/2.js'))
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
