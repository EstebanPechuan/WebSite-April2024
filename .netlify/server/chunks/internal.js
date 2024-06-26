import { c as create_ssr_component, s as setContext, v as validate_component, m as missing_component } from "./ssr.js";
let base = "";
let assets = base;
const initial = { base, assets };
function override(paths) {
  base = paths.base;
  assets = paths.assets;
}
function reset() {
  base = initial.base;
  assets = initial.assets;
}
function set_assets(path) {
  assets = initial.assets = path;
}
let public_env = {};
let safe_public_env = {};
function set_private_env(environment) {
}
function set_public_env(environment) {
  public_env = environment;
}
function set_safe_public_env(environment) {
  safe_public_env = environment;
}
function afterUpdate() {
}
let prerendering = false;
function set_building() {
}
function set_prerendering() {
  prerendering = true;
}
const Root = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { stores } = $$props;
  let { page } = $$props;
  let { constructors } = $$props;
  let { components = [] } = $$props;
  let { form } = $$props;
  let { data_0 = null } = $$props;
  let { data_1 = null } = $$props;
  {
    setContext("__svelte__", stores);
  }
  afterUpdate(stores.page.notify);
  if ($$props.stores === void 0 && $$bindings.stores && stores !== void 0)
    $$bindings.stores(stores);
  if ($$props.page === void 0 && $$bindings.page && page !== void 0)
    $$bindings.page(page);
  if ($$props.constructors === void 0 && $$bindings.constructors && constructors !== void 0)
    $$bindings.constructors(constructors);
  if ($$props.components === void 0 && $$bindings.components && components !== void 0)
    $$bindings.components(components);
  if ($$props.form === void 0 && $$bindings.form && form !== void 0)
    $$bindings.form(form);
  if ($$props.data_0 === void 0 && $$bindings.data_0 && data_0 !== void 0)
    $$bindings.data_0(data_0);
  if ($$props.data_1 === void 0 && $$bindings.data_1 && data_1 !== void 0)
    $$bindings.data_1(data_1);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    {
      stores.page.set(page);
    }
    $$rendered = `  ${constructors[1] ? `${validate_component(constructors[0] || missing_component, "svelte:component").$$render(
      $$result,
      { data: data_0, this: components[0] },
      {
        this: ($$value) => {
          components[0] = $$value;
          $$settled = false;
        }
      },
      {
        default: () => {
          return `${validate_component(constructors[1] || missing_component, "svelte:component").$$render(
            $$result,
            { data: data_1, form, this: components[1] },
            {
              this: ($$value) => {
                components[1] = $$value;
                $$settled = false;
              }
            },
            {}
          )}`;
        }
      }
    )}` : `${validate_component(constructors[0] || missing_component, "svelte:component").$$render(
      $$result,
      { data: data_0, form, this: components[0] },
      {
        this: ($$value) => {
          components[0] = $$value;
          $$settled = false;
        }
      },
      {}
    )}`} ${``}`;
  } while (!$$settled);
  return $$rendered;
});
function set_read_implementation(fn) {
}
function set_manifest(_) {
}
const options = {
  app_dir: "_app",
  app_template_contains_nonce: false,
  csp: { "mode": "auto", "directives": { "upgrade-insecure-requests": false, "block-all-mixed-content": false }, "reportOnly": { "upgrade-insecure-requests": false, "block-all-mixed-content": false } },
  csrf_check_origin: true,
  embedded: false,
  env_public_prefix: "PUBLIC_",
  env_private_prefix: "",
  hooks: null,
  // added lazily, via `get_hooks`
  preload_strategy: "modulepreload",
  root: Root,
  service_worker: false,
  templates: {
    app: ({ head, body, assets: assets2, nonce, env }) => '<!doctype html>\n<html lang="en">\n	<head>\n		<meta charset="utf-8" />\n		<link rel="icon" href="' + assets2 + '/favicon.png" />\n		<meta name="viewport" content="width=device-width, initial-scale=1" />\n		' + head + '\n\n		<link rel="preconnect" href="https://fonts.googleapis.com">\n		<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\n		<link href="https://fonts.googleapis.com/css2?family=Noto+Sans:ital,wght@0,100..900;1,100..900&family=Rubik:ital,wght@0,300..900;1,300..900&display=swap" rel="stylesheet">\n	</head>\n	<body data-sveltekit-preload-data="hover">\n		<div style="display: contents">' + body + `</div>
	</body>

	<style>
		:root {
			--pry-color-rgb: 255, 62, 0;
			--pry-color: #ff3e00;
			
			--dark-text-color: #fff;
			--dark-background-color: #000410;
			--dark-background-color-2: #000716;

			
			--light-text-color: #02011b;
			--light-background-color: #f4f4f4;
			--light-background-color-2: #efefef;

			--ff-primary: 'Arial';
			--ff-secondary: 'Verdana';
		}

		* {
			margin: 0;
			padding: 0;
			box-sizing: border-box;
			/* font-family: var(--ff-secondary); */
			font-family: "Noto Sans", sans-serif;
		}

		h1, h2, h3, h4, h5, h6 {
			/* font-family: var(--ff-primary); */
			font-family: "Rubik", sans-serif;
		}

		::selection {
			background-color: rgba(var(--pry-color-rgb), 0.9);
			color: var(--background-color);
		}

		html {
			scroll-behavior: smooth;
		}
		
		body,
		body.dark {
			--background-color: var(--dark-background-color);
			--text-color: var(--dark-text-color);
			background-color: var(--background-color);
			color: var(--text-color);
			/* overflow-x: hidden; */
		}

		body.light {
			--background-color: var(--light-background-color);
			--text-color: var(--light-text-color);
			background-color: var(--background-color);
			color: var(--text-color);
		}

		li {
			list-style: none;
		}

		a {
			text-decoration: none;
			color: inherit;
		}

		button {
			border: none;
			background-color: transparent;
			cursor: pointer;
			color: #fff !important;
		}

		button:hover {
			opacity: 0.9;
		}

		.section_wrapper {
			max-width: 1100px;
			margin: 0 auto;
			padding: 30px 20px;
		}

		h2 {
			font-size: 30px;
		}

		.skill[class*="javascript-fill"] {
			--skill-color: rgb(247, 223, 30);
		}

		.skill[class*="html-fill"] {
			--skill-color: rgb(228, 77, 38);
		}

		.skill[class*="css-fill"] {
			--skill-color: rgb(21, 114, 182);
		}

		.skill[class*="sass"] {
			--skill-color: rgb(205, 103, 153);
		}

		.skill[class*="react-fill"] {
			--skill-color: rgb(0, 216, 255);
		}

		.skill[class*="svelte"] {
			--skill-color: rgb(255, 62, 0);
		}

		.skill[class*="vue-16"] {
			--skill-color: rgb(65, 184, 131);
		}

		.skill[class*="bootstrap-fill"] {
			--skill-color: rgb(126, 19, 248);
		}
		
		.skill[class*="badge-3d"] {
			--skill-color: rgb(0, 96, 116);
		}

		.skill[class*="material-ui"] {
			--skill-color: rgb(0, 127, 255);
		}

		.skill[class*="tailwind"] {
			--skill-color: rgb(68, 168, 179);
		}

		.skill[class*="firebase-solid"] {
			--skill-color: #ffca28;
		}

		.skill:hover {
			color: var(--skill-color);
		}
	</style>
</html>
`,
    error: ({ status, message }) => '<!doctype html>\n<html lang="en">\n	<head>\n		<meta charset="utf-8" />\n		<title>' + message + `</title>

		<style>
			body {
				--bg: white;
				--fg: #222;
				--divider: #ccc;
				background: var(--bg);
				color: var(--fg);
				font-family:
					system-ui,
					-apple-system,
					BlinkMacSystemFont,
					'Segoe UI',
					Roboto,
					Oxygen,
					Ubuntu,
					Cantarell,
					'Open Sans',
					'Helvetica Neue',
					sans-serif;
				display: flex;
				align-items: center;
				justify-content: center;
				height: 100vh;
				margin: 0;
			}

			.error {
				display: flex;
				align-items: center;
				max-width: 32rem;
				margin: 0 1rem;
			}

			.status {
				font-weight: 200;
				font-size: 3rem;
				line-height: 1;
				position: relative;
				top: -0.05rem;
			}

			.message {
				border-left: 1px solid var(--divider);
				padding: 0 0 0 1rem;
				margin: 0 0 0 1rem;
				min-height: 2.5rem;
				display: flex;
				align-items: center;
			}

			.message h1 {
				font-weight: 400;
				font-size: 1em;
				margin: 0;
			}

			@media (prefers-color-scheme: dark) {
				body {
					--bg: #222;
					--fg: #ddd;
					--divider: #666;
				}
			}
		</style>
	</head>
	<body>
		<div class="error">
			<span class="status">` + status + '</span>\n			<div class="message">\n				<h1>' + message + "</h1>\n			</div>\n		</div>\n	</body>\n</html>\n"
  },
  version_hash: "uqes1e"
};
async function get_hooks() {
  return {};
}
export {
  assets as a,
  base as b,
  options as c,
  set_private_env as d,
  prerendering as e,
  set_public_env as f,
  get_hooks as g,
  set_safe_public_env as h,
  set_assets as i,
  set_building as j,
  set_manifest as k,
  set_prerendering as l,
  set_read_implementation as m,
  override as o,
  public_env as p,
  reset as r,
  safe_public_env as s
};
