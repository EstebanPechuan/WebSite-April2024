import { c as create_ssr_component, o as onDestroy, b as spread, d as escape_object, f as createEventDispatcher, a as subscribe, g as set_store_value, e as escape, v as validate_component, n as null_to_empty, h as add_attribute } from "../../chunks/ssr.js";
import "devalue";
import { p as page } from "../../chunks/stores.js";
import { w as writable } from "../../chunks/index.js";
import { register } from "swiper/element/bundle";
const matchIconName = /^[a-z0-9]+(-[a-z0-9]+)*$/;
const stringToIcon = (value, validate, allowSimpleName, provider = "") => {
  const colonSeparated = value.split(":");
  if (value.slice(0, 1) === "@") {
    if (colonSeparated.length < 2 || colonSeparated.length > 3) {
      return null;
    }
    provider = colonSeparated.shift().slice(1);
  }
  if (colonSeparated.length > 3 || !colonSeparated.length) {
    return null;
  }
  if (colonSeparated.length > 1) {
    const name2 = colonSeparated.pop();
    const prefix = colonSeparated.pop();
    const result = {
      // Allow provider without '@': "provider:prefix:name"
      provider: colonSeparated.length > 0 ? colonSeparated[0] : provider,
      prefix,
      name: name2
    };
    return validate && !validateIconName(result) ? null : result;
  }
  const name = colonSeparated[0];
  const dashSeparated = name.split("-");
  if (dashSeparated.length > 1) {
    const result = {
      provider,
      prefix: dashSeparated.shift(),
      name: dashSeparated.join("-")
    };
    return validate && !validateIconName(result) ? null : result;
  }
  if (allowSimpleName && provider === "") {
    const result = {
      provider,
      prefix: "",
      name
    };
    return validate && !validateIconName(result, allowSimpleName) ? null : result;
  }
  return null;
};
const validateIconName = (icon, allowSimpleName) => {
  if (!icon) {
    return false;
  }
  return !!((icon.provider === "" || icon.provider.match(matchIconName)) && (allowSimpleName && icon.prefix === "" || icon.prefix.match(matchIconName)) && icon.name.match(matchIconName));
};
const defaultIconDimensions = Object.freeze(
  {
    left: 0,
    top: 0,
    width: 16,
    height: 16
  }
);
const defaultIconTransformations = Object.freeze({
  rotate: 0,
  vFlip: false,
  hFlip: false
});
const defaultIconProps = Object.freeze({
  ...defaultIconDimensions,
  ...defaultIconTransformations
});
const defaultExtendedIconProps = Object.freeze({
  ...defaultIconProps,
  body: "",
  hidden: false
});
function mergeIconTransformations(obj1, obj2) {
  const result = {};
  if (!obj1.hFlip !== !obj2.hFlip) {
    result.hFlip = true;
  }
  if (!obj1.vFlip !== !obj2.vFlip) {
    result.vFlip = true;
  }
  const rotate = ((obj1.rotate || 0) + (obj2.rotate || 0)) % 4;
  if (rotate) {
    result.rotate = rotate;
  }
  return result;
}
function mergeIconData(parent, child) {
  const result = mergeIconTransformations(parent, child);
  for (const key in defaultExtendedIconProps) {
    if (key in defaultIconTransformations) {
      if (key in parent && !(key in result)) {
        result[key] = defaultIconTransformations[key];
      }
    } else if (key in child) {
      result[key] = child[key];
    } else if (key in parent) {
      result[key] = parent[key];
    }
  }
  return result;
}
function getIconsTree(data2, names) {
  const icons = data2.icons;
  const aliases = data2.aliases || /* @__PURE__ */ Object.create(null);
  const resolved = /* @__PURE__ */ Object.create(null);
  function resolve(name) {
    if (icons[name]) {
      return resolved[name] = [];
    }
    if (!(name in resolved)) {
      resolved[name] = null;
      const parent = aliases[name] && aliases[name].parent;
      const value = parent && resolve(parent);
      if (value) {
        resolved[name] = [parent].concat(value);
      }
    }
    return resolved[name];
  }
  Object.keys(icons).concat(Object.keys(aliases)).forEach(resolve);
  return resolved;
}
function internalGetIconData(data2, name, tree) {
  const icons = data2.icons;
  const aliases = data2.aliases || /* @__PURE__ */ Object.create(null);
  let currentProps = {};
  function parse(name2) {
    currentProps = mergeIconData(
      icons[name2] || aliases[name2],
      currentProps
    );
  }
  parse(name);
  tree.forEach(parse);
  return mergeIconData(data2, currentProps);
}
function parseIconSet(data2, callback) {
  const names = [];
  if (typeof data2 !== "object" || typeof data2.icons !== "object") {
    return names;
  }
  if (data2.not_found instanceof Array) {
    data2.not_found.forEach((name) => {
      callback(name, null);
      names.push(name);
    });
  }
  const tree = getIconsTree(data2);
  for (const name in tree) {
    const item = tree[name];
    if (item) {
      callback(name, internalGetIconData(data2, name, item));
      names.push(name);
    }
  }
  return names;
}
const optionalPropertyDefaults = {
  provider: "",
  aliases: {},
  not_found: {},
  ...defaultIconDimensions
};
function checkOptionalProps(item, defaults) {
  for (const prop in defaults) {
    if (prop in item && typeof item[prop] !== typeof defaults[prop]) {
      return false;
    }
  }
  return true;
}
function quicklyValidateIconSet(obj) {
  if (typeof obj !== "object" || obj === null) {
    return null;
  }
  const data2 = obj;
  if (typeof data2.prefix !== "string" || !obj.icons || typeof obj.icons !== "object") {
    return null;
  }
  if (!checkOptionalProps(obj, optionalPropertyDefaults)) {
    return null;
  }
  const icons = data2.icons;
  for (const name in icons) {
    const icon = icons[name];
    if (!name.match(matchIconName) || typeof icon.body !== "string" || !checkOptionalProps(
      icon,
      defaultExtendedIconProps
    )) {
      return null;
    }
  }
  const aliases = data2.aliases || /* @__PURE__ */ Object.create(null);
  for (const name in aliases) {
    const icon = aliases[name];
    const parent = icon.parent;
    if (!name.match(matchIconName) || typeof parent !== "string" || !icons[parent] && !aliases[parent] || !checkOptionalProps(
      icon,
      defaultExtendedIconProps
    )) {
      return null;
    }
  }
  return data2;
}
const dataStorage = /* @__PURE__ */ Object.create(null);
function newStorage(provider, prefix) {
  return {
    provider,
    prefix,
    icons: /* @__PURE__ */ Object.create(null),
    missing: /* @__PURE__ */ new Set()
  };
}
function getStorage(provider, prefix) {
  const providerStorage = dataStorage[provider] || (dataStorage[provider] = /* @__PURE__ */ Object.create(null));
  return providerStorage[prefix] || (providerStorage[prefix] = newStorage(provider, prefix));
}
function addIconSet(storage2, data2) {
  if (!quicklyValidateIconSet(data2)) {
    return [];
  }
  return parseIconSet(data2, (name, icon) => {
    if (icon) {
      storage2.icons[name] = icon;
    } else {
      storage2.missing.add(name);
    }
  });
}
function addIconToStorage(storage2, name, icon) {
  try {
    if (typeof icon.body === "string") {
      storage2.icons[name] = { ...icon };
      return true;
    }
  } catch (err) {
  }
  return false;
}
let simpleNames = false;
function allowSimpleNames(allow) {
  {
    simpleNames = allow;
  }
  return simpleNames;
}
function getIconData(name) {
  const icon = typeof name === "string" ? stringToIcon(name, true, simpleNames) : name;
  if (icon) {
    const storage2 = getStorage(icon.provider, icon.prefix);
    const iconName = icon.name;
    return storage2.icons[iconName] || (storage2.missing.has(iconName) ? null : void 0);
  }
}
function addIcon(name, data2) {
  const icon = stringToIcon(name, true, simpleNames);
  if (!icon) {
    return false;
  }
  const storage2 = getStorage(icon.provider, icon.prefix);
  return addIconToStorage(storage2, icon.name, data2);
}
function addCollection(data2, provider) {
  if (typeof data2 !== "object") {
    return false;
  }
  if (typeof provider !== "string") {
    provider = data2.provider || "";
  }
  if (simpleNames && !provider && !data2.prefix) {
    let added = false;
    if (quicklyValidateIconSet(data2)) {
      data2.prefix = "";
      parseIconSet(data2, (name, icon) => {
        if (icon && addIcon(name, icon)) {
          added = true;
        }
      });
    }
    return added;
  }
  const prefix = data2.prefix;
  if (!validateIconName({
    provider,
    prefix,
    name: "a"
  })) {
    return false;
  }
  const storage2 = getStorage(provider, prefix);
  return !!addIconSet(storage2, data2);
}
const defaultIconSizeCustomisations = Object.freeze({
  width: null,
  height: null
});
const defaultIconCustomisations = Object.freeze({
  // Dimensions
  ...defaultIconSizeCustomisations,
  // Transformations
  ...defaultIconTransformations
});
const unitsSplit = /(-?[0-9.]*[0-9]+[0-9.]*)/g;
const unitsTest = /^-?[0-9.]*[0-9]+[0-9.]*$/g;
function calculateSize(size, ratio, precision) {
  if (ratio === 1) {
    return size;
  }
  precision = precision || 100;
  if (typeof size === "number") {
    return Math.ceil(size * ratio * precision) / precision;
  }
  if (typeof size !== "string") {
    return size;
  }
  const oldParts = size.split(unitsSplit);
  if (oldParts === null || !oldParts.length) {
    return size;
  }
  const newParts = [];
  let code = oldParts.shift();
  let isNumber = unitsTest.test(code);
  while (true) {
    if (isNumber) {
      const num = parseFloat(code);
      if (isNaN(num)) {
        newParts.push(code);
      } else {
        newParts.push(Math.ceil(num * ratio * precision) / precision);
      }
    } else {
      newParts.push(code);
    }
    code = oldParts.shift();
    if (code === void 0) {
      return newParts.join("");
    }
    isNumber = !isNumber;
  }
}
function splitSVGDefs(content, tag = "defs") {
  let defs = "";
  const index = content.indexOf("<" + tag);
  while (index >= 0) {
    const start = content.indexOf(">", index);
    const end = content.indexOf("</" + tag);
    if (start === -1 || end === -1) {
      break;
    }
    const endEnd = content.indexOf(">", end);
    if (endEnd === -1) {
      break;
    }
    defs += content.slice(start + 1, end).trim();
    content = content.slice(0, index).trim() + content.slice(endEnd + 1);
  }
  return {
    defs,
    content
  };
}
function mergeDefsAndContent(defs, content) {
  return defs ? "<defs>" + defs + "</defs>" + content : content;
}
function wrapSVGContent(body, start, end) {
  const split = splitSVGDefs(body);
  return mergeDefsAndContent(split.defs, start + split.content + end);
}
const isUnsetKeyword = (value) => value === "unset" || value === "undefined" || value === "none";
function iconToSVG(icon, customisations) {
  const fullIcon = {
    ...defaultIconProps,
    ...icon
  };
  const fullCustomisations = {
    ...defaultIconCustomisations,
    ...customisations
  };
  const box = {
    left: fullIcon.left,
    top: fullIcon.top,
    width: fullIcon.width,
    height: fullIcon.height
  };
  let body = fullIcon.body;
  [fullIcon, fullCustomisations].forEach((props) => {
    const transformations = [];
    const hFlip = props.hFlip;
    const vFlip = props.vFlip;
    let rotation = props.rotate;
    if (hFlip) {
      if (vFlip) {
        rotation += 2;
      } else {
        transformations.push(
          "translate(" + (box.width + box.left).toString() + " " + (0 - box.top).toString() + ")"
        );
        transformations.push("scale(-1 1)");
        box.top = box.left = 0;
      }
    } else if (vFlip) {
      transformations.push(
        "translate(" + (0 - box.left).toString() + " " + (box.height + box.top).toString() + ")"
      );
      transformations.push("scale(1 -1)");
      box.top = box.left = 0;
    }
    let tempValue;
    if (rotation < 0) {
      rotation -= Math.floor(rotation / 4) * 4;
    }
    rotation = rotation % 4;
    switch (rotation) {
      case 1:
        tempValue = box.height / 2 + box.top;
        transformations.unshift(
          "rotate(90 " + tempValue.toString() + " " + tempValue.toString() + ")"
        );
        break;
      case 2:
        transformations.unshift(
          "rotate(180 " + (box.width / 2 + box.left).toString() + " " + (box.height / 2 + box.top).toString() + ")"
        );
        break;
      case 3:
        tempValue = box.width / 2 + box.left;
        transformations.unshift(
          "rotate(-90 " + tempValue.toString() + " " + tempValue.toString() + ")"
        );
        break;
    }
    if (rotation % 2 === 1) {
      if (box.left !== box.top) {
        tempValue = box.left;
        box.left = box.top;
        box.top = tempValue;
      }
      if (box.width !== box.height) {
        tempValue = box.width;
        box.width = box.height;
        box.height = tempValue;
      }
    }
    if (transformations.length) {
      body = wrapSVGContent(
        body,
        '<g transform="' + transformations.join(" ") + '">',
        "</g>"
      );
    }
  });
  const customisationsWidth = fullCustomisations.width;
  const customisationsHeight = fullCustomisations.height;
  const boxWidth = box.width;
  const boxHeight = box.height;
  let width;
  let height;
  if (customisationsWidth === null) {
    height = customisationsHeight === null ? "1em" : customisationsHeight === "auto" ? boxHeight : customisationsHeight;
    width = calculateSize(height, boxWidth / boxHeight);
  } else {
    width = customisationsWidth === "auto" ? boxWidth : customisationsWidth;
    height = customisationsHeight === null ? calculateSize(width, boxHeight / boxWidth) : customisationsHeight === "auto" ? boxHeight : customisationsHeight;
  }
  const attributes = {};
  const setAttr = (prop, value) => {
    if (!isUnsetKeyword(value)) {
      attributes[prop] = value.toString();
    }
  };
  setAttr("width", width);
  setAttr("height", height);
  const viewBox = [box.left, box.top, boxWidth, boxHeight];
  attributes.viewBox = viewBox.join(" ");
  return {
    attributes,
    viewBox,
    body
  };
}
const regex = /\sid="(\S+)"/g;
const randomPrefix = "IconifyId" + Date.now().toString(16) + (Math.random() * 16777216 | 0).toString(16);
let counter = 0;
function replaceIDs(body, prefix = randomPrefix) {
  const ids = [];
  let match;
  while (match = regex.exec(body)) {
    ids.push(match[1]);
  }
  if (!ids.length) {
    return body;
  }
  const suffix = "suffix" + (Math.random() * 16777216 | Date.now()).toString(16);
  ids.forEach((id) => {
    const newID = typeof prefix === "function" ? prefix(id) : prefix + (counter++).toString();
    const escapedID = id.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    body = body.replace(
      // Allowed characters before id: [#;"]
      // Allowed characters after id: [)"], .[a-z]
      new RegExp('([#;"])(' + escapedID + ')([")]|\\.[a-z])', "g"),
      "$1" + newID + suffix + "$3"
    );
  });
  body = body.replace(new RegExp(suffix, "g"), "");
  return body;
}
const storage = /* @__PURE__ */ Object.create(null);
function setAPIModule(provider, item) {
  storage[provider] = item;
}
function createAPIConfig(source) {
  let resources;
  if (typeof source.resources === "string") {
    resources = [source.resources];
  } else {
    resources = source.resources;
    if (!(resources instanceof Array) || !resources.length) {
      return null;
    }
  }
  const result = {
    // API hosts
    resources,
    // Root path
    path: source.path || "/",
    // URL length limit
    maxURL: source.maxURL || 500,
    // Timeout before next host is used.
    rotate: source.rotate || 750,
    // Timeout before failing query.
    timeout: source.timeout || 5e3,
    // Randomise default API end point.
    random: source.random === true,
    // Start index
    index: source.index || 0,
    // Receive data after time out (used if time out kicks in first, then API module sends data anyway).
    dataAfterTimeout: source.dataAfterTimeout !== false
  };
  return result;
}
const configStorage = /* @__PURE__ */ Object.create(null);
const fallBackAPISources = [
  "https://api.simplesvg.com",
  "https://api.unisvg.com"
];
const fallBackAPI = [];
while (fallBackAPISources.length > 0) {
  if (fallBackAPISources.length === 1) {
    fallBackAPI.push(fallBackAPISources.shift());
  } else {
    if (Math.random() > 0.5) {
      fallBackAPI.push(fallBackAPISources.shift());
    } else {
      fallBackAPI.push(fallBackAPISources.pop());
    }
  }
}
configStorage[""] = createAPIConfig({
  resources: ["https://api.iconify.design"].concat(fallBackAPI)
});
function addAPIProvider(provider, customConfig) {
  const config = createAPIConfig(customConfig);
  if (config === null) {
    return false;
  }
  configStorage[provider] = config;
  return true;
}
function getAPIConfig(provider) {
  return configStorage[provider];
}
const detectFetch = () => {
  let callback;
  try {
    callback = fetch;
    if (typeof callback === "function") {
      return callback;
    }
  } catch (err) {
  }
};
let fetchModule = detectFetch();
function calculateMaxLength(provider, prefix) {
  const config = getAPIConfig(provider);
  if (!config) {
    return 0;
  }
  let result;
  if (!config.maxURL) {
    result = 0;
  } else {
    let maxHostLength = 0;
    config.resources.forEach((item) => {
      const host = item;
      maxHostLength = Math.max(maxHostLength, host.length);
    });
    const url = prefix + ".json?icons=";
    result = config.maxURL - maxHostLength - config.path.length - url.length;
  }
  return result;
}
function shouldAbort(status) {
  return status === 404;
}
const prepare = (provider, prefix, icons) => {
  const results = [];
  const maxLength = calculateMaxLength(provider, prefix);
  const type = "icons";
  let item = {
    type,
    provider,
    prefix,
    icons: []
  };
  let length = 0;
  icons.forEach((name, index) => {
    length += name.length + 1;
    if (length >= maxLength && index > 0) {
      results.push(item);
      item = {
        type,
        provider,
        prefix,
        icons: []
      };
      length = name.length;
    }
    item.icons.push(name);
  });
  results.push(item);
  return results;
};
function getPath(provider) {
  if (typeof provider === "string") {
    const config = getAPIConfig(provider);
    if (config) {
      return config.path;
    }
  }
  return "/";
}
const send = (host, params, callback) => {
  if (!fetchModule) {
    callback("abort", 424);
    return;
  }
  let path = getPath(params.provider);
  switch (params.type) {
    case "icons": {
      const prefix = params.prefix;
      const icons = params.icons;
      const iconsList = icons.join(",");
      const urlParams = new URLSearchParams({
        icons: iconsList
      });
      path += prefix + ".json?" + urlParams.toString();
      break;
    }
    case "custom": {
      const uri = params.uri;
      path += uri.slice(0, 1) === "/" ? uri.slice(1) : uri;
      break;
    }
    default:
      callback("abort", 400);
      return;
  }
  let defaultError = 503;
  fetchModule(host + path).then((response) => {
    const status = response.status;
    if (status !== 200) {
      setTimeout(() => {
        callback(shouldAbort(status) ? "abort" : "next", status);
      });
      return;
    }
    defaultError = 501;
    return response.json();
  }).then((data2) => {
    if (typeof data2 !== "object" || data2 === null) {
      setTimeout(() => {
        if (data2 === 404) {
          callback("abort", data2);
        } else {
          callback("next", defaultError);
        }
      });
      return;
    }
    setTimeout(() => {
      callback("success", data2);
    });
  }).catch(() => {
    callback("next", defaultError);
  });
};
const fetchAPIModule = {
  prepare,
  send
};
const browserCacheVersion = "iconify2";
const browserCachePrefix = "iconify";
const browserCacheCountKey = browserCachePrefix + "-count";
const browserCacheVersionKey = browserCachePrefix + "-version";
const browserStorageHour = 36e5;
const browserStorageCacheExpiration = 168;
function getStoredItem(func, key) {
  try {
    return func.getItem(key);
  } catch (err) {
  }
}
function setStoredItem(func, key, value) {
  try {
    func.setItem(key, value);
    return true;
  } catch (err) {
  }
}
function removeStoredItem(func, key) {
  try {
    func.removeItem(key);
  } catch (err) {
  }
}
function setBrowserStorageItemsCount(storage2, value) {
  return setStoredItem(storage2, browserCacheCountKey, value.toString());
}
function getBrowserStorageItemsCount(storage2) {
  return parseInt(getStoredItem(storage2, browserCacheCountKey)) || 0;
}
const browserStorageConfig = {
  local: true,
  session: true
};
const browserStorageEmptyItems = {
  local: /* @__PURE__ */ new Set(),
  session: /* @__PURE__ */ new Set()
};
let browserStorageStatus = false;
function setBrowserStorageStatus(status) {
  browserStorageStatus = status;
}
let _window = typeof window === "undefined" ? {} : window;
function getBrowserStorage(key) {
  const attr = key + "Storage";
  try {
    if (_window && _window[attr] && typeof _window[attr].length === "number") {
      return _window[attr];
    }
  } catch (err) {
  }
  browserStorageConfig[key] = false;
}
function iterateBrowserStorage(key, callback) {
  const func = getBrowserStorage(key);
  if (!func) {
    return;
  }
  const version = getStoredItem(func, browserCacheVersionKey);
  if (version !== browserCacheVersion) {
    if (version) {
      const total2 = getBrowserStorageItemsCount(func);
      for (let i = 0; i < total2; i++) {
        removeStoredItem(func, browserCachePrefix + i.toString());
      }
    }
    setStoredItem(func, browserCacheVersionKey, browserCacheVersion);
    setBrowserStorageItemsCount(func, 0);
    return;
  }
  const minTime = Math.floor(Date.now() / browserStorageHour) - browserStorageCacheExpiration;
  const parseItem = (index) => {
    const name = browserCachePrefix + index.toString();
    const item = getStoredItem(func, name);
    if (typeof item !== "string") {
      return;
    }
    try {
      const data2 = JSON.parse(item);
      if (typeof data2 === "object" && typeof data2.cached === "number" && data2.cached > minTime && typeof data2.provider === "string" && typeof data2.data === "object" && typeof data2.data.prefix === "string" && // Valid item: run callback
      callback(data2, index)) {
        return true;
      }
    } catch (err) {
    }
    removeStoredItem(func, name);
  };
  let total = getBrowserStorageItemsCount(func);
  for (let i = total - 1; i >= 0; i--) {
    if (!parseItem(i)) {
      if (i === total - 1) {
        total--;
        setBrowserStorageItemsCount(func, total);
      } else {
        browserStorageEmptyItems[key].add(i);
      }
    }
  }
}
function initBrowserStorage() {
  if (browserStorageStatus) {
    return;
  }
  setBrowserStorageStatus(true);
  for (const key in browserStorageConfig) {
    iterateBrowserStorage(key, (item) => {
      const iconSet = item.data;
      const provider = item.provider;
      const prefix = iconSet.prefix;
      const storage2 = getStorage(
        provider,
        prefix
      );
      if (!addIconSet(storage2, iconSet).length) {
        return false;
      }
      const lastModified = iconSet.lastModified || -1;
      storage2.lastModifiedCached = storage2.lastModifiedCached ? Math.min(storage2.lastModifiedCached, lastModified) : lastModified;
      return true;
    });
  }
}
function mergeCustomisations(defaults, item) {
  const result = {
    ...defaults
  };
  for (const key in item) {
    const value = item[key];
    const valueType = typeof value;
    if (key in defaultIconSizeCustomisations) {
      if (value === null || value && (valueType === "string" || valueType === "number")) {
        result[key] = value;
      }
    } else if (valueType === typeof result[key]) {
      result[key] = key === "rotate" ? value % 4 : value;
    }
  }
  return result;
}
const separator = /[\s,]+/;
function flipFromString(custom, flip) {
  flip.split(separator).forEach((str) => {
    const value = str.trim();
    switch (value) {
      case "horizontal":
        custom.hFlip = true;
        break;
      case "vertical":
        custom.vFlip = true;
        break;
    }
  });
}
function rotateFromString(value, defaultValue = 0) {
  const units = value.replace(/^-?[0-9.]*/, "");
  function cleanup(value2) {
    while (value2 < 0) {
      value2 += 4;
    }
    return value2 % 4;
  }
  if (units === "") {
    const num = parseInt(value);
    return isNaN(num) ? 0 : cleanup(num);
  } else if (units !== value) {
    let split = 0;
    switch (units) {
      case "%":
        split = 25;
        break;
      case "deg":
        split = 90;
    }
    if (split) {
      let num = parseFloat(value.slice(0, value.length - units.length));
      if (isNaN(num)) {
        return 0;
      }
      num = num / split;
      return num % 1 === 0 ? cleanup(num) : 0;
    }
  }
  return defaultValue;
}
function iconToHTML(body, attributes) {
  let renderAttribsHTML = body.indexOf("xlink:") === -1 ? "" : ' xmlns:xlink="http://www.w3.org/1999/xlink"';
  for (const attr in attributes) {
    renderAttribsHTML += " " + attr + '="' + attributes[attr] + '"';
  }
  return '<svg xmlns="http://www.w3.org/2000/svg"' + renderAttribsHTML + ">" + body + "</svg>";
}
function encodeSVGforURL(svg) {
  return svg.replace(/"/g, "'").replace(/%/g, "%25").replace(/#/g, "%23").replace(/</g, "%3C").replace(/>/g, "%3E").replace(/\s+/g, " ");
}
function svgToData(svg) {
  return "data:image/svg+xml," + encodeSVGforURL(svg);
}
function svgToURL(svg) {
  return 'url("' + svgToData(svg) + '")';
}
const defaultExtendedIconCustomisations = {
  ...defaultIconCustomisations,
  inline: false
};
const svgDefaults = {
  "xmlns": "http://www.w3.org/2000/svg",
  "xmlns:xlink": "http://www.w3.org/1999/xlink",
  "aria-hidden": true,
  "role": "img"
};
const commonProps = {
  display: "inline-block"
};
const monotoneProps = {
  "background-color": "currentColor"
};
const coloredProps = {
  "background-color": "transparent"
};
const propsToAdd = {
  image: "var(--svg)",
  repeat: "no-repeat",
  size: "100% 100%"
};
const propsToAddTo = {
  "-webkit-mask": monotoneProps,
  "mask": monotoneProps,
  "background": coloredProps
};
for (const prefix in propsToAddTo) {
  const list = propsToAddTo[prefix];
  for (const prop in propsToAdd) {
    list[prefix + "-" + prop] = propsToAdd[prop];
  }
}
function fixSize(value) {
  return value + (value.match(/^[-0-9.]+$/) ? "px" : "");
}
function render(icon, props) {
  const customisations = mergeCustomisations(defaultExtendedIconCustomisations, props);
  const mode = props.mode || "svg";
  const componentProps = mode === "svg" ? { ...svgDefaults } : {};
  if (icon.body.indexOf("xlink:") === -1) {
    delete componentProps["xmlns:xlink"];
  }
  let style = typeof props.style === "string" ? props.style : "";
  for (let key in props) {
    const value = props[key];
    if (value === void 0) {
      continue;
    }
    switch (key) {
      case "icon":
      case "style":
      case "onLoad":
      case "mode":
        break;
      case "inline":
      case "hFlip":
      case "vFlip":
        customisations[key] = value === true || value === "true" || value === 1;
        break;
      case "flip":
        if (typeof value === "string") {
          flipFromString(customisations, value);
        }
        break;
      case "color":
        style = style + (style.length > 0 && style.trim().slice(-1) !== ";" ? ";" : "") + "color: " + value + "; ";
        break;
      case "rotate":
        if (typeof value === "string") {
          customisations[key] = rotateFromString(value);
        } else if (typeof value === "number") {
          customisations[key] = value;
        }
        break;
      case "ariaHidden":
      case "aria-hidden":
        if (value !== true && value !== "true") {
          delete componentProps["aria-hidden"];
        }
        break;
      default:
        if (key.slice(0, 3) === "on:") {
          break;
        }
        if (defaultExtendedIconCustomisations[key] === void 0) {
          componentProps[key] = value;
        }
    }
  }
  const item = iconToSVG(icon, customisations);
  const renderAttribs = item.attributes;
  if (customisations.inline) {
    style = "vertical-align: -0.125em; " + style;
  }
  if (mode === "svg") {
    Object.assign(componentProps, renderAttribs);
    if (style !== "") {
      componentProps.style = style;
    }
    let localCounter = 0;
    let id = props.id;
    if (typeof id === "string") {
      id = id.replace(/-/g, "_");
    }
    return {
      svg: true,
      attributes: componentProps,
      body: replaceIDs(item.body, id ? () => id + "ID" + localCounter++ : "iconifySvelte")
    };
  }
  const { body, width, height } = icon;
  const useMask = mode === "mask" || (mode === "bg" ? false : body.indexOf("currentColor") !== -1);
  const html = iconToHTML(body, {
    ...renderAttribs,
    width: width + "",
    height: height + ""
  });
  const url = svgToURL(html);
  const styles = {
    "--svg": url
  };
  const size = (prop) => {
    const value = renderAttribs[prop];
    if (value) {
      styles[prop] = fixSize(value);
    }
  };
  size("width");
  size("height");
  Object.assign(styles, commonProps, useMask ? monotoneProps : coloredProps);
  let customStyle = "";
  for (const key in styles) {
    customStyle += key + ": " + styles[key] + ";";
  }
  componentProps.style = customStyle + style;
  return {
    svg: false,
    attributes: componentProps
  };
}
allowSimpleNames(true);
setAPIModule("", fetchAPIModule);
if (typeof document !== "undefined" && typeof window !== "undefined") {
  initBrowserStorage();
  const _window2 = window;
  if (_window2.IconifyPreload !== void 0) {
    const preload = _window2.IconifyPreload;
    const err = "Invalid IconifyPreload syntax.";
    if (typeof preload === "object" && preload !== null) {
      (preload instanceof Array ? preload : [preload]).forEach((item) => {
        try {
          if (
            // Check if item is an object and not null/array
            typeof item !== "object" || item === null || item instanceof Array || // Check for 'icons' and 'prefix'
            typeof item.icons !== "object" || typeof item.prefix !== "string" || // Add icon set
            !addCollection(item)
          ) {
            console.error(err);
          }
        } catch (e) {
          console.error(err);
        }
      });
    }
  }
  if (_window2.IconifyProviders !== void 0) {
    const providers = _window2.IconifyProviders;
    if (typeof providers === "object" && providers !== null) {
      for (let key in providers) {
        const err = "IconifyProviders[" + key + "] is invalid.";
        try {
          const value = providers[key];
          if (typeof value !== "object" || !value || value.resources === void 0) {
            continue;
          }
          if (!addAPIProvider(key, value)) {
            console.error(err);
          }
        } catch (e) {
          console.error(err);
        }
      }
    }
  }
}
function checkIconState(icon, state, mounted, callback, onload) {
  if (typeof icon === "object" && icon !== null && typeof icon.body === "string") {
    state.name = "";
    return { data: { ...defaultIconProps, ...icon } };
  }
  let iconName;
  if (typeof icon !== "string" || (iconName = stringToIcon(icon, false, true)) === null) {
    return null;
  }
  const data2 = getIconData(iconName);
  if (!data2) {
    return null;
  }
  if (state.name !== icon) {
    state.name = icon;
    if (onload && !state.destroyed) {
      onload(icon);
    }
  }
  const classes = ["iconify"];
  if (iconName.prefix !== "") {
    classes.push("iconify--" + iconName.prefix);
  }
  if (iconName.provider !== "") {
    classes.push("iconify--" + iconName.provider);
  }
  return { data: data2, classes };
}
function generateIcon(icon, props) {
  return icon ? render({
    ...defaultIconProps,
    ...icon
  }, props) : null;
}
const Icon = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const state = {
    // Last icon name
    name: "",
    // Loading status
    loading: null,
    // Destroyed status
    destroyed: false
  };
  let mounted = false;
  let data2;
  const onLoad = (icon) => {
    if (typeof $$props.onLoad === "function") {
      $$props.onLoad(icon);
    }
    const dispatch = createEventDispatcher();
    dispatch("load", { icon });
  };
  function loaded() {
  }
  onDestroy(() => {
    state.destroyed = true;
  });
  {
    {
      const iconData = checkIconState($$props.icon, state, mounted, loaded, onLoad);
      data2 = iconData ? generateIcon(iconData.data, $$props) : null;
      if (data2 && iconData.classes) {
        data2.attributes["class"] = (typeof $$props["class"] === "string" ? $$props["class"] + " " : "") + iconData.classes.join(" ");
      }
    }
  }
  return `${data2 ? `${data2.svg ? `<svg${spread([escape_object(data2.attributes)], {})}><!-- HTML_TAG_START -->${data2.body}<!-- HTML_TAG_END --></svg>` : `<span${spread([escape_object(data2.attributes)], {})}></span>`}` : ``}`;
});
let language = writable();
let dataLang = writable();
let themeColor = writable();
const data = [
  {
    lang: "es",
    data: {
      header: ["Sobre mi", "Habilidades", "Proyectos", "Experiencia", "Contacto"],
      hero: {
        h3: "Hola, soy",
        h2: "Esteban Pechuan",
        h1: "Desarrollador Front End",
        paragraph: [
          "Bienvenidos a mi portfolio online!",
          "Soy programador front end con más de 5 años de experiencia en el campo. Mi pasión por la maquetación web y el detalle pixel perfect impulsa cada uno de mis proyectos. Desde los primeros trazos en el diseño hasta la implementación final, me esfuerzo por crear experiencias web excepcionales que cautiven a los usuarios.",
          "Mi trayectoria en el desarrollo front end abarca una amplia gama de tecnologías y frameworks, incluyendo React, Svelte, Vue, entre otros. Esta diversidad me ha permitido adquirir un conocimiento profundo y versátil, lo que me capacita para adaptarme a cualquier desafío y ofrecer soluciones innovadoras.",
          "Te invito a explorar mi portfolio y descubrir el mundo que he creado con líneas de código. Si estás buscando un colaborador entusiasta y comprometido para tu próximo proyecto, ¡no dudes en ponerte en contacto conmigo! Estoy emocionado de conocer nuevos desafíos y ayudarte a convertir tus ideas en realidad."
        ],
        buttons: [
          "Descargar CV",
          "Contáctame"
        ]
      },
      skills: {
        title: "Habilidades",
        paragraph: [
          "En mi trayectoria como desarrollador front-end, he adquirido una sólida comprensión y experiencia en una variedad de habilidades clave.",
          "Estas son algunas de las habilidades en las que me destaco."
        ]
      },
      experience: {
        title: "Experiencia",
        jobs: [
          {
            position: "Junior Front End Developer",
            company: "Travel Paq | 2019 - 2020",
            description: "En Travel PAQ, tuve la oportunidad de comenzar mi carrera como desarrollador front-end. Durante mi tiempo en la empresa, mi principal responsabilidad fue crear páginas web para sitios que ofrecen paquetes de viajes, utilizando plantillas como punto de partida. Esta experiencia me permitió adquirir habilidades sólidas en la maquetación web y en la personalización de sitios para satisfacer las necesidades específicas de los clientes del sector de viajes."
          },
          {
            position: "Front End Developer",
            company: "Nodos HUB | 2021 - 2023",
            description: "En Nodos Hub, tuve la valiosa oportunidad de sumergirme en el mundo de la programación y expandir mis habilidades en diversos lenguajes y frameworks. Durante mi tiempo en la empresa, participé en la creación de numerosas páginas y sistemas web utilizando tecnologías como React, Svelte, Vue y Angular. Con el paso del tiempo, ascendí al puesto de líder de equipo, donde coordiné a programadores front-end y proyectos. Además, tuve el honor de impartir capacitaciones tanto a nuevos empleados como a estudiantes de colegios que nos visitaban, contribuyendo así al crecimiento y desarrollo del equipo y la comunidad de programadores."
          },
          {
            position: "Profesor",
            company: "San Juan TEC | 2019 - 2023",
            description: "Como profesor en San Juan TEC, formé parte de un programa del gobierno de San Juan, Argentina, que ofrece una variedad de cursos gratuitos a la comunidad. Durante mi tiempo como instructor, impartí clases en los siguientes cursos:",
            list: [
              "HTML y CSS Inicial",
              "CSS Avanzado",
              "Accesibilidad y Optimización Web"
            ],
            underParagraph: "Además de enseñar, tuve el privilegio de participar activamente en ferias educativas y diversas actividades destinadas a promover el estudio y el desarrollo en nuestra academia. Esta experiencia no solo me permitió compartir mis conocimientos con los estudiantes, sino también contribuir al crecimiento y fortalecimiento de la comunidad educativa en nuestra región."
          }
        ]
      },
      projects: {
        title: "Proyectos",
        jobs: [
          {
            title: "Cuppa Canada",
            description: "Cuppa Canadá es un proyecto de venta de café en el que participé como maquetador visual. Utilizando HTML, CSS y React, ayudé a dar vida a la experiencia visual del sitio web. Una de las características destacadas del proyecto son dos modelos 3D interactivos que permiten a los usuarios explorar los productos de manera envolvente y atractiva.",
            button: "Ver sitio web"
          },
          {
            title: "Bioconsulting",
            description: 'Bioconsulting fue un sitio desafiante en el que participé, caracterizado por sus efectos de parallax e interacción con los eventos del mouse del visitante, como se puede apreciar en la página de <a target="_blank" style="color: var(--pry-color);" href="https://estebanpechuan.github.io/bioconsulting/error.html">error del sitio</a>. Este proyecto fue realizado exclusivamente con HTML, CSS y JS, aprovechando al máximo las propiedades nativas de estos lenguajes para crear una experiencia web impactante y visualmente atractiva.',
            button: "Ver sitio web"
          },
          {
            title: "Foro 21 - Página Institucional",
            description: "Este es un sitio web que ofrece fiferentes secciones para presentar todas las actividades de la empresa. En este proyecto, se optó por SvelteKit en el front-end para proporcionar una experiencia de usuario dinámica y ágil, mientras que Laravel se utilizó en el backend para garantizar un manejo eficiente de los datos. Esta combinación de tecnologías permitió crear un sitio web completo y funcional, adaptado a las necesidades específicas de la empresa.",
            button: "Ver sitio web"
          },
          {
            title: "Pechu's Ecommerce",
            description: "Este ecommerce es un proyecto personal diseñado para mejorar mis habilidades en el front-end, donde se han implementado características como la capacidad de agregar productos a una lista de favoritos, así como también añadir productos a un carro de compras, entre otras funcionalidades. Este proyecto fue desarrollado utilizando SvelteKit, lo que me permitió explorar y dominar las capacidades de este framework para crear una experiencia de usuario fluida e interactiva.",
            button: "Ver sitio web"
          }
        ]
      },
      contact: {
        title: "Hablemos!",
        description: "Estoy aquí para ayudarte con tus proyectos web. Ponte en contacto conmigo y trabajemos juntos para convertir tus ideas en realidad.",
        form: {
          name: "Nombre",
          email: "Email",
          assunto: "Asunto",
          message: "Mensaje",
          button: "Enviar mensaje"
        }
      }
    }
  },
  {
    lang: "en",
    data: {
      header: ["About me", "Skills", "Projects", "Experience", "Contact"],
      hero: {
        h3: "Hi, I'm",
        h2: "Esteban Pechuan",
        h1: "Front End Developer",
        paragraph: [
          "Welcome to my online portfolio!",
          "I'm a front-end developer with over 5 years of experience in the field. My passion with web layout and pixel-perfect detail drives each of my projects. From the initial design strokes to the final implementation, I strive to create exceptional web experiences that captivate users.",
          "My journey in front-end development spans a wide range of technologies and frameworks, including React, Svelte, Vue, among others. This diversity has allowed me to acquire deep and versatile knowledge, empowering me to tackle any challenge and deliver innovative solutions.",
          "I invite you to explore my portfolio and discover the world I've created with lines of code. If you're seeking an enthusiastic and committed collaborator for your next project, don't hesitate to get in touch with me! I'm excited to take on new challenges and help you turn your ideas into reality."
        ],
        buttons: [
          "Download CV",
          "Contact me"
        ]
      },
      skills: {
        title: "Skills",
        paragraph: [
          "In my journey as a front-end developer, I have acquired a solid understanding and experience in a variety of key skills.",
          "Here are some of the skills I excel in"
        ]
      },
      experience: {
        title: "Experience",
        jobs: [
          {
            position: "Junior Front End Developer",
            company: "Travel Paq | 2019 - 2020",
            description: "At Travel PAQ, I had the opportunity to kickstart my career as a front-end developer. During my time at the company, my main responsibility was to create web pages for sites that offer travel packages, using templates as a starting point. This experience allowed me to gain solid skills in web layout and in customizing sites to meet the specific needs of clients in the travel industry."
          },
          {
            position: "Front End Developer",
            company: "Nodos HUB | 2021 - 2023",
            description: "At Nodos Hub, I had the valuable opportunity to immerse myself in the world of programming and expand my skills in various languages and frameworks. During my time at the company, I participated in the creation of numerous web pages and systems using technologies such as React, Svelte, Vue, and Angular. Over time, I rose to the position of team leader, where I coordinated front-end developers and projects. Additionally, I had the honor of providing training sessions to both new employees and visiting school students, contributing to the growth and development of the team and the programming community."
          },
          {
            position: "Teacher",
            company: "San Juan TEC | 2019 - 2023",
            description: "As a teacher at San Juan TEC, I was part of a government program in San Juan, Argentina, that offers a variety of free courses to the community. During my time as an instructor, I taught the following courses:",
            list: [
              "HTML and CSS Fundamentals",
              "Advanced CSS",
              "Web Accessibility and Optimization"
            ],
            underParagraph: "In addition to teaching, I had the privilege of actively participating in educational fairs and various activities aimed at promoting study and development in our academy. This experience not only allowed me to share my knowledge with students but also to contribute to the growth and strengthening of the educational community in our region."
          }
        ]
      },
      projects: {
        title: "Projects",
        jobs: [
          {
            title: "Cuppa Canada",
            description: "Cuppa Canada is an online coffee retail project in which I participated as a visual layout designer. Using HTML, CSS, and React, I contributed to bringing the website's visual experience to life. One of the project's standout features includes two interactive 3D models that allow users to explore the products in an immersive and engaging way.",
            button: "See project"
          },
          {
            title: "Bioconsulting",
            description: "Bioconsulting was a challenging project in which I worked, notable for its parallax effects and interaction with visitor mouse events. My role was pivotal in implementing these elements, which provide a visually striking and immersive experience for users. One of the project's highlights is the site's <a target='_blank' style='color: var(--pry-color);' href='https://estebanpechuan.github.io/bioconsulting/error.html'>error page</a>, where these effects can be observed in action, creating a unique and memorable experience for site visitors.",
            button: "See project"
          },
          {
            title: "Foro 21 - Institutional Web Site",
            description: "Foro 21 is a multifaceted website designed to showcase all of the company's activities across various sections. In this project, Svelte was used for the front-end, enabling a dynamic and responsive user experience, while Laravel was employed to create the backend, ensuring robust and efficient data handling. The combination of these technologies resulted in a comprehensive and functional website that stands out for its versatility and performance.",
            button: "See project"
          },
          {
            title: "Pechu's Ecommerce",
            description: "This ecommerce website is a personal project aimed at enhancing my front-end skills, featuring functionalities such as the ability to add products to a favorites list and to a shopping cart, among other features. Developed using SvelteKit, this project allowed me to explore and master the capabilities of this framework to create a seamless and interactive user experience.",
            button: "See project"
          }
        ]
      },
      contact: {
        title: "Lets's talk!",
        description: "I'm here to help with your web projects. Get in touch with me and let's work together to bring your ideas to life.",
        form: {
          name: "Name",
          email: "Email",
          assunto: "Assunto",
          message: "Message",
          button: "Send message"
        }
      }
    }
  }
];
const css$5 = {
  code: "section.svelte-14jpxg.svelte-14jpxg{background:var(--background-color-2)}.section_wrapper.svelte-14jpxg.svelte-14jpxg{display:grid;grid-template-columns:repeat(auto-fit, minmax(300px, 1fr));gap:40px}.contact_info.svelte-14jpxg.svelte-14jpxg{display:flex;flex-direction:column;gap:20px}.title.svelte-14jpxg.svelte-14jpxg{width:fit-content;padding:5px 0;overflow:hidden}h2.svelte-14jpxg.svelte-14jpxg{width:fit-content;position:relative}h2.svelte-14jpxg.svelte-14jpxg::before{content:'';width:100%;height:2px;position:absolute;bottom:-2px;left:-50%;background-color:var(--pry-color);transition:0.8s}h2.svelte-14jpxg.svelte-14jpxg:hover::before{left:50%}.contact_data.svelte-14jpxg.svelte-14jpxg{display:flex;flex-direction:column;gap:5px}.contact_data.svelte-14jpxg span.svelte-14jpxg{display:flex;align-items:center;gap:10px;font-size:16px}.contact_data.svelte-14jpxg p.svelte-14jpxg{font-size:12px}form.svelte-14jpxg.svelte-14jpxg{display:flex;flex-direction:column;gap:10px}.input_group.svelte-14jpxg.svelte-14jpxg{position:relative}input.svelte-14jpxg.svelte-14jpxg,textarea.svelte-14jpxg.svelte-14jpxg{width:100%;padding:18px 10px 7px;border-radius:8px;border:2px solid var(--text-color);background:var(--background-color-2);color:var(--text-color)}textarea.svelte-14jpxg.svelte-14jpxg{resize:vertical}label.svelte-14jpxg.svelte-14jpxg{position:absolute;top:13px;left:10px;z-index:100;transition:0.4s}input.svelte-14jpxg:focus+label.svelte-14jpxg,input.svelte-14jpxg:not(:placeholder-shown)+label.svelte-14jpxg,textarea.svelte-14jpxg:focus+label.svelte-14jpxg,textarea.svelte-14jpxg:not(:placeholder-shown)+label.svelte-14jpxg{top:5px;font-size:12px;opacity:0.4}button.svelte-14jpxg.svelte-14jpxg{width:fit-content;padding:10px 20px;background:var(--pry-color);color:var(--text-color);border-radius:8px;place-self:end}",
  map: `{"version":3,"file":"Contact.svelte","sources":["Contact.svelte"],"sourcesContent":["<script>\\r\\n    import Icon from '@iconify/svelte';\\r\\n    import { enhance } from '$app/forms';\\r\\n    import { language, dataLang } from '../store/store'\\r\\n    import { data } from '$lib/data.js';\\r\\n\\r\\n    $: $dataLang = data.find((item) => item.lang === $language).data;\\r\\n\\r\\n    export let form\\r\\n<\/script>\\r\\n\\r\\n<section id=\\"contact\\">\\r\\n    <div class=\\"section_wrapper\\">\\r\\n        <div class=\\"contact_info\\">\\r\\n            <div class=\\"title\\">\\r\\n                <h2>{$dataLang.contact.title}</h2>\\r\\n                <span class=\\"underline\\"></span>\\r\\n            </div>\\r\\n\\r\\n            <p>{$dataLang.contact.description}</p>\\r\\n\\r\\n\\r\\n            <div class=\\"contact_data\\">\\r\\n                <span>\\r\\n                    <Icon icon=\\"ph:phone\\" />\\r\\n                    <p>+61 491 712 535</p>\\r\\n                </span>\\r\\n\\r\\n                <span>\\r\\n                    <Icon icon=\\"ic:outline-mail\\" />\\r\\n                    <p>esteban.pechuan@gmail.com</p>\\r\\n                </span>\\r\\n\\r\\n                <span>\\r\\n                    <Icon icon=\\"ion:location-outline\\" />\\r\\n                    <p>Cairns City, QLD 4870</p>\\r\\n                </span>\\r\\n            </div>\\r\\n        </div>\\r\\n        \\r\\n        <form method=\\"POST\\" use:enhance>\\r\\n            <div class=\\"input_group\\">\\r\\n                <input placeholder=\\"\\" name=\\"name\\" id=\\"name\\" type=\\"text\\">\\r\\n                <label for=\\"name\\">{$dataLang.contact.form.name}</label>\\r\\n\\r\\n                <p>{ form?.nameError || '' }</p>\\r\\n            </div>\\r\\n    \\r\\n            <div class=\\"input_group\\">\\r\\n                <input placeholder=\\"\\" name=\\"email\\" id=\\"email\\" type=\\"email\\">\\r\\n                <label for=\\"email\\">{$dataLang.contact.form.email}</label>\\r\\n            </div>\\r\\n    \\r\\n            <div class=\\"input_group\\">\\r\\n                <input placeholder=\\"\\" name=\\"assunto\\" id=\\"assunto\\" type=\\"text\\">\\r\\n                <label for=\\"assunto\\">{$dataLang.contact.form.assunto}</label>\\r\\n            </div>\\r\\n    \\r\\n            <div class=\\"input_group\\">\\r\\n                <textarea placeholder=\\"\\" rows=\\"5\\" name=\\"message\\" id=\\"message\\"></textarea>\\r\\n                <label for=\\"message\\">{$dataLang.contact.form.message}</label>\\r\\n            </div>\\r\\n    \\r\\n            <button type=\\"submit\\">{$dataLang.contact.form.button}</button>\\r\\n            <p class=\\"email_sent\\">{form?.success || ''}</p>\\r\\n        </form>\\r\\n    </div>\\r\\n</section>\\r\\n\\r\\n\\r\\n<style>\\r\\n    section {\\r\\n        background: var(--background-color-2);\\r\\n    }\\r\\n\\r\\n    .section_wrapper {\\r\\n        display: grid;\\r\\n        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));\\r\\n        gap: 40px;\\r\\n    }\\r\\n\\r\\n    .contact_info {\\r\\n        display: flex;\\r\\n        flex-direction: column;\\r\\n        gap: 20px;\\r\\n    }\\r\\n\\r\\n    .title {\\r\\n        width: fit-content;\\r\\n        padding: 5px 0;\\r\\n        overflow: hidden;\\r\\n    }\\r\\n\\r\\n    h2 {\\r\\n        width: fit-content;\\r\\n        position: relative;\\r\\n    }\\r\\n\\r\\n    h2::before {\\r\\n        content: '';\\r\\n        width: 100%;\\r\\n        height: 2px;\\r\\n        position: absolute;\\r\\n        bottom: -2px;\\r\\n        left: -50%;\\r\\n        background-color: var(--pry-color);\\r\\n        transition: 0.8s;\\r\\n    }\\r\\n\\r\\n    h2:hover::before {\\r\\n        left: 50%;\\r\\n    }\\r\\n\\r\\n    .contact_data {\\r\\n        display: flex;\\r\\n        flex-direction: column;\\r\\n        gap: 5px;\\r\\n    }\\r\\n\\r\\n    .contact_data span {\\r\\n        display: flex;\\r\\n        align-items: center;\\r\\n        gap: 10px;\\r\\n        font-size: 16px;\\r\\n    }\\r\\n\\r\\n    .contact_data p {\\r\\n        font-size: 12px;\\r\\n    }\\r\\n\\r\\n    form {\\r\\n        display: flex;\\r\\n        flex-direction: column;\\r\\n        gap: 10px;\\r\\n    }\\r\\n\\r\\n    .input_group {\\r\\n        position: relative;\\r\\n    }\\r\\n\\r\\n    input,\\r\\n    textarea {\\r\\n        width: 100%;\\r\\n        padding: 18px 10px 7px;\\r\\n        border-radius: 8px;\\r\\n        border: 2px solid var(--text-color);\\r\\n        background: var(--background-color-2);\\r\\n        color: var(--text-color);\\r\\n    }\\r\\n\\r\\n    textarea {\\r\\n        resize: vertical;\\r\\n    }\\r\\n\\r\\n    label {\\r\\n        position: absolute;\\r\\n        top: 13px;\\r\\n        left: 10px;\\r\\n        z-index: 100;\\r\\n        transition: 0.4s;\\r\\n    }\\r\\n\\r\\n    input:focus + label,\\r\\n    input:not(:placeholder-shown) + label,\\r\\n    textarea:focus + label,\\r\\n    textarea:not(:placeholder-shown) + label {\\r\\n        top: 5px;\\r\\n        font-size: 12px;\\r\\n        opacity: 0.4;\\r\\n    }\\r\\n\\r\\n    button {\\r\\n        width: fit-content;\\r\\n        padding: 10px 20px;\\r\\n        background: var(--pry-color);\\r\\n        color: var(--text-color);\\r\\n        border-radius: 8px;\\r\\n        place-self: end;\\r\\n    }\\r\\n</style>"],"names":[],"mappings":"AAuEI,mCAAQ,CACJ,UAAU,CAAE,IAAI,oBAAoB,CACxC,CAEA,4CAAiB,CACb,OAAO,CAAE,IAAI,CACb,qBAAqB,CAAE,OAAO,QAAQ,CAAC,CAAC,OAAO,KAAK,CAAC,CAAC,GAAG,CAAC,CAAC,CAC3D,GAAG,CAAE,IACT,CAEA,yCAAc,CACV,OAAO,CAAE,IAAI,CACb,cAAc,CAAE,MAAM,CACtB,GAAG,CAAE,IACT,CAEA,kCAAO,CACH,KAAK,CAAE,WAAW,CAClB,OAAO,CAAE,GAAG,CAAC,CAAC,CACd,QAAQ,CAAE,MACd,CAEA,8BAAG,CACC,KAAK,CAAE,WAAW,CAClB,QAAQ,CAAE,QACd,CAEA,8BAAE,QAAS,CACP,OAAO,CAAE,EAAE,CACX,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,GAAG,CACX,QAAQ,CAAE,QAAQ,CAClB,MAAM,CAAE,IAAI,CACZ,IAAI,CAAE,IAAI,CACV,gBAAgB,CAAE,IAAI,WAAW,CAAC,CAClC,UAAU,CAAE,IAChB,CAEA,8BAAE,MAAM,QAAS,CACb,IAAI,CAAE,GACV,CAEA,yCAAc,CACV,OAAO,CAAE,IAAI,CACb,cAAc,CAAE,MAAM,CACtB,GAAG,CAAE,GACT,CAEA,2BAAa,CAAC,kBAAK,CACf,OAAO,CAAE,IAAI,CACb,WAAW,CAAE,MAAM,CACnB,GAAG,CAAE,IAAI,CACT,SAAS,CAAE,IACf,CAEA,2BAAa,CAAC,eAAE,CACZ,SAAS,CAAE,IACf,CAEA,gCAAK,CACD,OAAO,CAAE,IAAI,CACb,cAAc,CAAE,MAAM,CACtB,GAAG,CAAE,IACT,CAEA,wCAAa,CACT,QAAQ,CAAE,QACd,CAEA,iCAAK,CACL,oCAAS,CACL,KAAK,CAAE,IAAI,CACX,OAAO,CAAE,IAAI,CAAC,IAAI,CAAC,GAAG,CACtB,aAAa,CAAE,GAAG,CAClB,MAAM,CAAE,GAAG,CAAC,KAAK,CAAC,IAAI,YAAY,CAAC,CACnC,UAAU,CAAE,IAAI,oBAAoB,CAAC,CACrC,KAAK,CAAE,IAAI,YAAY,CAC3B,CAEA,oCAAS,CACL,MAAM,CAAE,QACZ,CAEA,iCAAM,CACF,QAAQ,CAAE,QAAQ,CAClB,GAAG,CAAE,IAAI,CACT,IAAI,CAAE,IAAI,CACV,OAAO,CAAE,GAAG,CACZ,UAAU,CAAE,IAChB,CAEA,mBAAK,MAAM,CAAG,mBAAK,CACnB,mBAAK,KAAK,kBAAkB,CAAC,CAAG,mBAAK,CACrC,sBAAQ,MAAM,CAAG,mBAAK,CACtB,sBAAQ,KAAK,kBAAkB,CAAC,CAAG,mBAAM,CACrC,GAAG,CAAE,GAAG,CACR,SAAS,CAAE,IAAI,CACf,OAAO,CAAE,GACb,CAEA,kCAAO,CACH,KAAK,CAAE,WAAW,CAClB,OAAO,CAAE,IAAI,CAAC,IAAI,CAClB,UAAU,CAAE,IAAI,WAAW,CAAC,CAC5B,KAAK,CAAE,IAAI,YAAY,CAAC,CACxB,aAAa,CAAE,GAAG,CAClB,UAAU,CAAE,GAChB"}`
};
const Contact = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $language, $$unsubscribe_language;
  let $dataLang, $$unsubscribe_dataLang;
  $$unsubscribe_language = subscribe(language, (value) => $language = value);
  $$unsubscribe_dataLang = subscribe(dataLang, (value) => $dataLang = value);
  let { form } = $$props;
  if ($$props.form === void 0 && $$bindings.form && form !== void 0)
    $$bindings.form(form);
  $$result.css.add(css$5);
  set_store_value(dataLang, $dataLang = data.find((item) => item.lang === $language).data, $dataLang);
  $$unsubscribe_language();
  $$unsubscribe_dataLang();
  return `<section id="contact" class="svelte-14jpxg"><div class="section_wrapper svelte-14jpxg"><div class="contact_info svelte-14jpxg"><div class="title svelte-14jpxg"><h2 class="svelte-14jpxg">${escape($dataLang.contact.title)}</h2> <span class="underline"></span></div> <p>${escape($dataLang.contact.description)}</p> <div class="contact_data svelte-14jpxg"><span class="svelte-14jpxg">${validate_component(Icon, "Icon").$$render($$result, { icon: "ph:phone" }, {}, {})} <p class="svelte-14jpxg" data-svelte-h="svelte-d1nycv">+61 491 712 535</p></span> <span class="svelte-14jpxg">${validate_component(Icon, "Icon").$$render($$result, { icon: "ic:outline-mail" }, {}, {})} <p class="svelte-14jpxg" data-svelte-h="svelte-1xa0jdz">esteban.pechuan@gmail.com</p></span> <span class="svelte-14jpxg">${validate_component(Icon, "Icon").$$render($$result, { icon: "ion:location-outline" }, {}, {})} <p class="svelte-14jpxg" data-svelte-h="svelte-bgafml">Cairns City, QLD 4870</p></span></div></div> <form method="POST" class="svelte-14jpxg"><div class="input_group svelte-14jpxg"><input placeholder="" name="name" id="name" type="text" class="svelte-14jpxg"> <label for="name" class="svelte-14jpxg">${escape($dataLang.contact.form.name)}</label> <p>${escape(form?.nameError || "")}</p></div> <div class="input_group svelte-14jpxg"><input placeholder="" name="email" id="email" type="email" class="svelte-14jpxg"> <label for="email" class="svelte-14jpxg">${escape($dataLang.contact.form.email)}</label></div> <div class="input_group svelte-14jpxg"><input placeholder="" name="assunto" id="assunto" type="text" class="svelte-14jpxg"> <label for="assunto" class="svelte-14jpxg">${escape($dataLang.contact.form.assunto)}</label></div> <div class="input_group svelte-14jpxg"><textarea placeholder="" rows="5" name="message" id="message" class="svelte-14jpxg"></textarea> <label for="message" class="svelte-14jpxg">${escape($dataLang.contact.form.message)}</label></div> <button type="submit" class="svelte-14jpxg">${escape($dataLang.contact.form.button)}</button> <p class="email_sent">${escape(form?.success || "")}</p></form></div> </section>`;
});
const css$4 = {
  code: ":root{--circle_size:20px}h2.svelte-1y2uoz0{width:fit-content;position:relative;margin:0 auto 20px}h2.svelte-1y2uoz0::before{content:'';width:100%;height:2px;position:absolute;bottom:-2px;background-color:var(--pry-color);transform:scaleX(0.6);transition:0.6s}h2.svelte-1y2uoz0:hover::before{transform:scaleX(1)}.timeline.svelte-1y2uoz0{display:flex;flex-direction:column;gap:20px}.experience.svelte-1y2uoz0{display:flex;gap:20px}.draw.svelte-1y2uoz0{display:flex;flex-direction:column;align-items:center;gap:10px}.circle.svelte-1y2uoz0{width:var(--circle_size);height:var(--circle_size);border-radius:50%;border:1px solid var(--pry-color);position:relative;opacity:1}.fill.svelte-1y2uoz0{width:100%;height:100%;position:absolute;top:50%;left:50%;transform:translate(-50%, -50%);background-color:var(--pry-color);border-radius:50%}.line.svelte-1y2uoz0{height:calc(100% - var(--circle_size) - 10px);border-left:1px solid var(--pry-color)}.texts.svelte-1y2uoz0{display:flex;flex-direction:column;gap:10px;padding-bottom:10px}li.svelte-1y2uoz0{list-style:initial;margin-left:20px}",
  map: `{"version":3,"file":"Experience.svelte","sources":["Experience.svelte"],"sourcesContent":["<script>\\r\\n    import { gsap } from 'gsap'\\r\\n    import { onMount } from \\"svelte\\";\\r\\n    import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'\\r\\n    import { language, dataLang } from '../store/store'\\r\\n    import { data } from '$lib/data.js';\\r\\n\\r\\n    $: $dataLang = data.find((item) => item.lang === $language).data;\\r\\n    \\r\\n\\tonMount(() => {\\r\\n        gsap.registerPlugin(ScrollTrigger);\\r\\n\\r\\n        const fillArray = document.querySelectorAll('.fill')\\r\\n\\r\\n        fillArray.forEach((item) => {\\r\\n            gsap.fromTo(item, {\\r\\n                scale: 0\\r\\n            },\\r\\n            {\\r\\n                duration: 0.6,\\r\\n                scale: 0.8,\\r\\n                ease: 'back.out(10)',\\r\\n                scrollTrigger: {\\r\\n                    trigger: item,\\r\\n                    start: 'top bottom-=100',\\r\\n                    toggleActions: 'play none none reverse',\\r\\n                }\\r\\n            })\\r\\n        })\\r\\n    });\\r\\n\\r\\n\\r\\n<\/script>\\r\\n\\r\\n<section class=\\"section_wrapper\\" id=\\"experience\\">\\r\\n    <h2>{$dataLang.experience.title}</h2>\\r\\n\\r\\n    <div class=\\"timeline\\">\\r\\n        \\r\\n        <div class=\\"experience\\">\\r\\n            <div class=\\"draw\\">\\r\\n                <div class=\\"circle\\">\\r\\n                    <span class=\\"fill\\"></span>\\r\\n                </div>\\r\\n\\r\\n                <div class=\\"line\\"></div>\\r\\n            </div>\\r\\n\\r\\n            <div class=\\"texts\\">\\r\\n                <h3>{$dataLang.experience.jobs[0].position}</h3>\\r\\n\\r\\n                <h4>{$dataLang.experience.jobs[0].company}</h4>\\r\\n\\r\\n                <p>{$dataLang.experience.jobs[0].description}</p>\\r\\n            </div>\\r\\n        </div>\\r\\n\\r\\n        <div class=\\"experience\\">\\r\\n            <div class=\\"draw\\">\\r\\n                <div class=\\"circle\\">\\r\\n                    <span class=\\"fill\\"></span>\\r\\n                </div>\\r\\n\\r\\n                <div class=\\"line\\"></div>\\r\\n            </div>\\r\\n\\r\\n            <div class=\\"texts\\">\\r\\n                <h3>{$dataLang.experience.jobs[1].position}</h3>\\r\\n\\r\\n                <h4>{$dataLang.experience.jobs[1].company}</h4>\\r\\n\\r\\n                <p>{$dataLang.experience.jobs[1].description}</p>\\r\\n            </div>\\r\\n        </div>\\r\\n\\r\\n        <div class=\\"experience\\">\\r\\n            <div class=\\"draw\\">\\r\\n                <div class=\\"circle\\">\\r\\n                    <span class=\\"fill\\"></span>\\r\\n                </div>\\r\\n\\r\\n                <div class=\\"line\\"></div>\\r\\n            </div>\\r\\n\\r\\n            <div class=\\"texts\\">\\r\\n                <h3>{$dataLang.experience.jobs[2].position}</h3>\\r\\n\\r\\n                <h4>{$dataLang.experience.jobs[2].company}</h4>\\r\\n\\r\\n                <p>{$dataLang.experience.jobs[2].description}</p>\\r\\n\\r\\n                <ul>\\r\\n                    <li>{$dataLang.experience.jobs[2].list[0]}</li>\\r\\n                    <li>{$dataLang.experience.jobs[2].list[1]}</li>\\r\\n                    <li>{$dataLang.experience.jobs[2].list[2]}</li>\\r\\n                </ul>\\r\\n\\r\\n                <p>{$dataLang.experience.jobs[2].underParagraph}</p>\\r\\n            </div>\\r\\n        </div>\\r\\n    </div>\\r\\n</section>\\r\\n\\r\\n<style>\\r\\n    :root {\\r\\n        --circle_size: 20px;\\r\\n    }\\r\\n    \\r\\n    h2 {\\r\\n        width: fit-content;\\r\\n        position: relative;\\r\\n        margin: 0 auto 20px;\\r\\n    }\\r\\n\\r\\n    h2::before {\\r\\n        content: '';\\r\\n        width: 100%;\\r\\n        height: 2px;\\r\\n        position: absolute;\\r\\n        bottom: -2px;\\r\\n        background-color: var(--pry-color);\\r\\n        transform: scaleX(0.6);\\r\\n        transition: 0.6s;\\r\\n    }\\r\\n    \\r\\n    h2:hover::before {\\r\\n        transform: scaleX(1);\\r\\n    }\\r\\n\\r\\n    .timeline {\\r\\n        display: flex;\\r\\n        flex-direction: column;\\r\\n        gap: 20px;\\r\\n    }\\r\\n\\r\\n    .experience {\\r\\n        display: flex;\\r\\n        gap: 20px;\\r\\n    }\\r\\n\\r\\n    .draw {\\r\\n        display: flex;\\r\\n        flex-direction: column;\\r\\n        align-items: center;\\r\\n        gap: 10px;\\r\\n    }\\r\\n\\r\\n    .circle {\\r\\n        width: var(--circle_size);\\r\\n        height: var(--circle_size);\\r\\n        border-radius: 50%;\\r\\n        border: 1px solid var(--pry-color);\\r\\n        position: relative;\\r\\n        opacity: 1;\\r\\n    }\\r\\n\\r\\n    .fill {\\r\\n        width: 100%;\\r\\n        height: 100%;\\r\\n        position: absolute;\\r\\n        top: 50%;\\r\\n        left: 50%;\\r\\n        transform: translate(-50%, -50%);\\r\\n        background-color: var(--pry-color);\\r\\n        border-radius: 50%;\\r\\n    }\\r\\n\\r\\n    .line {\\r\\n        height: calc(100% - var(--circle_size) - 10px);\\r\\n        border-left: 1px solid var(--pry-color);\\r\\n    }\\r\\n\\r\\n    .texts {\\r\\n        display: flex;\\r\\n        flex-direction: column;\\r\\n        gap: 10px;\\r\\n        padding-bottom: 10px;\\r\\n    }\\r\\n\\r\\n    li {\\r\\n        list-style: initial;\\r\\n        margin-left: 20px;\\r\\n    }\\r\\n</style>"],"names":[],"mappings":"AAwGI,KAAM,CACF,aAAa,CAAE,IACnB,CAEA,iBAAG,CACC,KAAK,CAAE,WAAW,CAClB,QAAQ,CAAE,QAAQ,CAClB,MAAM,CAAE,CAAC,CAAC,IAAI,CAAC,IACnB,CAEA,iBAAE,QAAS,CACP,OAAO,CAAE,EAAE,CACX,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,GAAG,CACX,QAAQ,CAAE,QAAQ,CAClB,MAAM,CAAE,IAAI,CACZ,gBAAgB,CAAE,IAAI,WAAW,CAAC,CAClC,SAAS,CAAE,OAAO,GAAG,CAAC,CACtB,UAAU,CAAE,IAChB,CAEA,iBAAE,MAAM,QAAS,CACb,SAAS,CAAE,OAAO,CAAC,CACvB,CAEA,wBAAU,CACN,OAAO,CAAE,IAAI,CACb,cAAc,CAAE,MAAM,CACtB,GAAG,CAAE,IACT,CAEA,0BAAY,CACR,OAAO,CAAE,IAAI,CACb,GAAG,CAAE,IACT,CAEA,oBAAM,CACF,OAAO,CAAE,IAAI,CACb,cAAc,CAAE,MAAM,CACtB,WAAW,CAAE,MAAM,CACnB,GAAG,CAAE,IACT,CAEA,sBAAQ,CACJ,KAAK,CAAE,IAAI,aAAa,CAAC,CACzB,MAAM,CAAE,IAAI,aAAa,CAAC,CAC1B,aAAa,CAAE,GAAG,CAClB,MAAM,CAAE,GAAG,CAAC,KAAK,CAAC,IAAI,WAAW,CAAC,CAClC,QAAQ,CAAE,QAAQ,CAClB,OAAO,CAAE,CACb,CAEA,oBAAM,CACF,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,IAAI,CACZ,QAAQ,CAAE,QAAQ,CAClB,GAAG,CAAE,GAAG,CACR,IAAI,CAAE,GAAG,CACT,SAAS,CAAE,UAAU,IAAI,CAAC,CAAC,IAAI,CAAC,CAChC,gBAAgB,CAAE,IAAI,WAAW,CAAC,CAClC,aAAa,CAAE,GACnB,CAEA,oBAAM,CACF,MAAM,CAAE,KAAK,IAAI,CAAC,CAAC,CAAC,IAAI,aAAa,CAAC,CAAC,CAAC,CAAC,IAAI,CAAC,CAC9C,WAAW,CAAE,GAAG,CAAC,KAAK,CAAC,IAAI,WAAW,CAC1C,CAEA,qBAAO,CACH,OAAO,CAAE,IAAI,CACb,cAAc,CAAE,MAAM,CACtB,GAAG,CAAE,IAAI,CACT,cAAc,CAAE,IACpB,CAEA,iBAAG,CACC,UAAU,CAAE,OAAO,CACnB,WAAW,CAAE,IACjB"}`
};
const Experience = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $language, $$unsubscribe_language;
  let $dataLang, $$unsubscribe_dataLang;
  $$unsubscribe_language = subscribe(language, (value) => $language = value);
  $$unsubscribe_dataLang = subscribe(dataLang, (value) => $dataLang = value);
  $$result.css.add(css$4);
  set_store_value(dataLang, $dataLang = data.find((item) => item.lang === $language).data, $dataLang);
  $$unsubscribe_language();
  $$unsubscribe_dataLang();
  return `<section class="section_wrapper" id="experience"><h2 class="svelte-1y2uoz0">${escape($dataLang.experience.title)}</h2> <div class="timeline svelte-1y2uoz0"><div class="experience svelte-1y2uoz0"><div class="draw svelte-1y2uoz0" data-svelte-h="svelte-1o5kjig"><div class="circle svelte-1y2uoz0"><span class="fill svelte-1y2uoz0"></span></div> <div class="line svelte-1y2uoz0"></div></div> <div class="texts svelte-1y2uoz0"><h3>${escape($dataLang.experience.jobs[0].position)}</h3> <h4>${escape($dataLang.experience.jobs[0].company)}</h4> <p>${escape($dataLang.experience.jobs[0].description)}</p></div></div> <div class="experience svelte-1y2uoz0"><div class="draw svelte-1y2uoz0" data-svelte-h="svelte-1o5kjig"><div class="circle svelte-1y2uoz0"><span class="fill svelte-1y2uoz0"></span></div> <div class="line svelte-1y2uoz0"></div></div> <div class="texts svelte-1y2uoz0"><h3>${escape($dataLang.experience.jobs[1].position)}</h3> <h4>${escape($dataLang.experience.jobs[1].company)}</h4> <p>${escape($dataLang.experience.jobs[1].description)}</p></div></div> <div class="experience svelte-1y2uoz0"><div class="draw svelte-1y2uoz0" data-svelte-h="svelte-1o5kjig"><div class="circle svelte-1y2uoz0"><span class="fill svelte-1y2uoz0"></span></div> <div class="line svelte-1y2uoz0"></div></div> <div class="texts svelte-1y2uoz0"><h3>${escape($dataLang.experience.jobs[2].position)}</h3> <h4>${escape($dataLang.experience.jobs[2].company)}</h4> <p>${escape($dataLang.experience.jobs[2].description)}</p> <ul><li class="svelte-1y2uoz0">${escape($dataLang.experience.jobs[2].list[0])}</li> <li class="svelte-1y2uoz0">${escape($dataLang.experience.jobs[2].list[1])}</li> <li class="svelte-1y2uoz0">${escape($dataLang.experience.jobs[2].list[2])}</li></ul> <p>${escape($dataLang.experience.jobs[2].underParagraph)}</p></div></div></div> </section>`;
});
const css$3 = {
  code: `header.svelte-1ax2lxw.svelte-1ax2lxw{width:100%;padding:10px 0;position:sticky;top:0;z-index:9999;background:var(--background-color);box-shadow:0 4px 4px #0004}nav.svelte-1ax2lxw.svelte-1ax2lxw{width:100%;max-width:1100px;margin:0 auto;padding:0 20px;display:flex;align-items:center;gap:20px}.switch.svelte-1ax2lxw.svelte-1ax2lxw{--secondary-container:#d6d6d6;--primary:rgb(143, 143, 143);font-size:12px;position:relative;display:inline-block;width:3.7em;height:1.8em;margin-right:auto}.switch.svelte-1ax2lxw input.svelte-1ax2lxw{display:none;opacity:0;width:0;height:0}.slider.svelte-1ax2lxw.svelte-1ax2lxw{position:absolute;cursor:pointer;top:0;left:0;right:0;bottom:0;background-color:#313033;transition:.2s;border-radius:30px}.slider.svelte-1ax2lxw.svelte-1ax2lxw:before{position:absolute;content:"";height:1.4em;width:1.4em;border-radius:20px;left:0.2em;bottom:0.2em;background-color:#aeaaae;transition:.4s}body.light input:checked+.slider.svelte-1ax2lxw.svelte-1ax2lxw::before{background-color:var(--primary)}body.light input:checked+.slider.svelte-1ax2lxw.svelte-1ax2lxw{background-color:var(--secondary-container)}input.svelte-1ax2lxw:focus+.slider.svelte-1ax2lxw{box-shadow:0 0 1px var(--secondary-container)}input.svelte-1ax2lxw:checked+.slider.svelte-1ax2lxw:before{transform:translateX(1.9em)}ul.svelte-1ax2lxw.svelte-1ax2lxw{display:flex;gap:20px}li.svelte-1ax2lxw.svelte-1ax2lxw{width:fit-content;height:40px;display:flex;align-items:center;overflow:hidden}a.svelte-1ax2lxw.svelte-1ax2lxw{position:relative}a.svelte-1ax2lxw.svelte-1ax2lxw::before{content:'';width:100%;height:2px;position:absolute;bottom:-2px;left:-90%;background-color:rgba(var(--pry-color-rgb), 0.4);transition:0.8s}a.svelte-1ax2lxw.svelte-1ax2lxw:hover::before{left:90%}a.active.svelte-1ax2lxw.svelte-1ax2lxw::before{left:0%;transition:0.2;background-color:rgba(var(--pry-color-rgb), 1)}.languages.svelte-1ax2lxw.svelte-1ax2lxw{display:flex;gap:10px}button.svelte-1ax2lxw.svelte-1ax2lxw{padding:0 4px;font-size:30px;border:none;background-color:transparent;display:flex;align-items:center}button.active.svelte-1ax2lxw.svelte-1ax2lxw{outline:2px solid rgba(var(--pry-color-rgb), 0.4);border-radius:8px}`,
  map: `{"version":3,"file":"Header.svelte","sources":["Header.svelte"],"sourcesContent":["<script>\\r\\n    import Icon from \\"@iconify/svelte\\";\\r\\n    import { page } from \\"$app/stores\\";\\r\\n    import { language, dataLang, themeColor } from '../store/store'\\r\\n    import { data } from '$lib/data.js';\\r\\n    import { browser } from \\"$app/environment\\";\\r\\n\\r\\n    let idioma = 'es'\\r\\n    let themeColorStorage = 'dark'\\r\\n\\r\\n    $: $language = idioma\\r\\n    $: $dataLang = data.find((item) => item.lang === $language).data;\\r\\n    \\r\\n    const handleLang = (lang) => {\\r\\n        idioma = lang\\r\\n    }\\r\\n    \\r\\n    const handleTheme = (e) => {\\r\\n        e.target.checked ? $themeColor = 'light' : $themeColor = 'dark'\\r\\n        \\r\\n        let body = document.querySelector('body')\\r\\n\\r\\n        body.setAttribute('class', $themeColor)\\r\\n    }\\r\\n\\r\\n    if (browser) {\\r\\n        idioma = window.localStorage.getItem(\\"languageSite\\") || \\"es\\";\\r\\n        themeColorStorage = window.localStorage.getItem(\\"themeSite\\") || \\"dark\\";\\r\\n        handleLang(idioma)\\r\\n\\r\\n        let body = document.querySelector('body')\\r\\n\\r\\n        body.setAttribute('class', \`\${themeColorStorage}\`)\\r\\n    }\\r\\n\\r\\n    $: if (browser) {\\r\\n        window.localStorage.setItem(\\"languageSite\\", $language);\\r\\n        window.localStorage.setItem(\\"themeSite\\", $themeColor);\\r\\n    }\\r\\n    \\r\\n    $: liActive = $page.url.hash.substring(1) || 'about';\\r\\n\\r\\n    export const handleLi = (listItem) => {\\r\\n        liActive = listItem\\r\\n    }\\r\\n\\r\\n<\/script>\\r\\n\\r\\n<header>\\r\\n    <nav>\\r\\n        <div class=\\"languages\\">\\r\\n            <button on:click={ () => handleLang('en') } class={ idioma === 'en' ? 'active' : '' }>\\r\\n                <Icon icon=\\"twemoji:flag-united-states\\" />\\r\\n            </button>\\r\\n            <button on:click={ () => handleLang('es') } class={ idioma === 'es' ? 'active' : '' }>\\r\\n                <Icon icon=\\"twemoji:flag-argentina\\" />\\r\\n            </button>\\r\\n        </div>\\r\\n\\r\\n        <label class=\\"switch\\">\\r\\n            <input type=\\"checkbox\\" on:change={(e) => handleTheme(e)}>\\r\\n            <span class=\\"slider\\"></span>\\r\\n        </label>\\r\\n    \\r\\n        <ul>\\r\\n            <li>\\r\\n                <a on:click={ () => handleLi('about') } class={ liActive === 'about' ? 'active' : '' } href=\\"#about\\">\\r\\n                    {$dataLang.header[0]}\\r\\n                </a>\\r\\n            </li>\\r\\n            <li>\\r\\n                <a on:click={ () => handleLi('skills') } class={ liActive === 'skills' ? 'active' : '' } href=\\"#skills\\">\\r\\n                    {$dataLang.header[1]}\\r\\n                </a>\\r\\n            </li>\\r\\n            <li>\\r\\n                <a on:click={ () => handleLi('projects') } class={ liActive === 'projects' ? 'active' : '' } href=\\"#projects\\">\\r\\n                    {$dataLang.header[2]}\\r\\n                </a>\\r\\n            </li>\\r\\n            <li>\\r\\n                <a on:click={ () => handleLi('experience') } class={ liActive === 'experience' ? 'active' : '' } href=\\"#experience\\">\\r\\n                    {$dataLang.header[3]}\\r\\n                </a>\\r\\n            </li>\\r\\n            <li>\\r\\n                <a on:click={ () => handleLi('contact') } class={ liActive === 'contact' ? 'active' : '' } href=\\"#contact\\">\\r\\n                    {$dataLang.header[4]}\\r\\n                </a>\\r\\n            </li>\\r\\n        </ul>\\r\\n    </nav>\\r\\n</header>\\r\\n\\r\\n<style>\\r\\n    header {\\r\\n        width: 100%;\\r\\n        padding: 10px 0;\\r\\n        position: sticky;\\r\\n        top: 0;\\r\\n        z-index: 9999;\\r\\n        background: var(--background-color);\\r\\n        box-shadow: 0 4px 4px #0004;\\r\\n    }\\r\\n    \\r\\n    nav {\\r\\n        width: 100%;\\r\\n        max-width: 1100px;\\r\\n        margin: 0 auto;\\r\\n        padding: 0 20px;\\r\\n        display: flex;\\r\\n        align-items: center;\\r\\n        gap: 20px;\\r\\n    }\\r\\n\\r\\n    .switch {\\r\\n        --secondary-container: #d6d6d6;\\r\\n        --primary: rgb(143, 143, 143);\\r\\n        font-size: 12px;\\r\\n        position: relative;\\r\\n        display: inline-block;\\r\\n        width: 3.7em;\\r\\n        height: 1.8em;\\r\\n        margin-right: auto;\\r\\n    }\\r\\n\\r\\n    .switch input {\\r\\n        display: none;\\r\\n        opacity: 0;\\r\\n        width: 0;\\r\\n        height: 0;\\r\\n    }\\r\\n\\r\\n    .slider {\\r\\n        position: absolute;\\r\\n        cursor: pointer;\\r\\n        top: 0;\\r\\n        left: 0;\\r\\n        right: 0;\\r\\n        bottom: 0;\\r\\n        background-color: #313033;\\r\\n        transition: .2s;\\r\\n        border-radius: 30px;\\r\\n    }\\r\\n\\r\\n    .slider:before {\\r\\n        position: absolute;\\r\\n        content: \\"\\";\\r\\n        height: 1.4em;\\r\\n        width: 1.4em;\\r\\n        border-radius: 20px;\\r\\n        left: 0.2em;\\r\\n        bottom: 0.2em;\\r\\n        background-color: #aeaaae;\\r\\n        transition: .4s;\\r\\n    }\\r\\n\\r\\n    :global(body.light) input:checked + .slider::before {\\r\\n        background-color: var(--primary);\\r\\n    }\\r\\n\\r\\n    :global(body.light) input:checked + .slider {\\r\\n        background-color: var(--secondary-container);\\r\\n    }\\r\\n\\r\\n    input:focus + .slider {\\r\\n        box-shadow: 0 0 1px var(--secondary-container);\\r\\n    }\\r\\n\\r\\n    input:checked + .slider:before {\\r\\n        transform: translateX(1.9em);\\r\\n    }\\r\\n\\r\\n    ul {\\r\\n        display: flex;\\r\\n        gap: 20px;\\r\\n    }\\r\\n\\r\\n    li {\\r\\n        width: fit-content;\\r\\n        height: 40px;\\r\\n        display: flex;\\r\\n        align-items: center;\\r\\n        overflow: hidden;\\r\\n    }\\r\\n\\r\\n    a {\\r\\n        position: relative;\\r\\n    }\\r\\n    \\r\\n    a::before {\\r\\n        content: '';\\r\\n        width: 100%;\\r\\n        height: 2px;\\r\\n        position: absolute;\\r\\n        bottom: -2px;\\r\\n        left: -90%;\\r\\n        background-color: rgba(var(--pry-color-rgb), 0.4);\\r\\n        transition: 0.8s;\\r\\n    }\\r\\n\\r\\n    a:hover::before {\\r\\n        left: 90%;\\r\\n    }\\r\\n\\r\\n    a.active::before {\\r\\n        left: 0%;\\r\\n        transition: 0.2;\\r\\n        background-color: rgba(var(--pry-color-rgb), 1);\\r\\n    }\\r\\n\\r\\n    .languages {\\r\\n        display: flex;\\r\\n        gap: 10px;\\r\\n    }\\r\\n\\r\\n    button {\\r\\n        padding: 0 4px;\\r\\n        font-size: 30px;\\r\\n        border: none;\\r\\n        background-color: transparent;\\r\\n        display: flex;\\r\\n        align-items: center;\\r\\n    }\\r\\n\\r\\n    button.active {\\r\\n        outline: 2px solid rgba(var(--pry-color-rgb), 0.4);\\r\\n        border-radius: 8px;\\r\\n    }\\r\\n</style>"],"names":[],"mappings":"AA+FI,oCAAO,CACH,KAAK,CAAE,IAAI,CACX,OAAO,CAAE,IAAI,CAAC,CAAC,CACf,QAAQ,CAAE,MAAM,CAChB,GAAG,CAAE,CAAC,CACN,OAAO,CAAE,IAAI,CACb,UAAU,CAAE,IAAI,kBAAkB,CAAC,CACnC,UAAU,CAAE,CAAC,CAAC,GAAG,CAAC,GAAG,CAAC,KAC1B,CAEA,iCAAI,CACA,KAAK,CAAE,IAAI,CACX,SAAS,CAAE,MAAM,CACjB,MAAM,CAAE,CAAC,CAAC,IAAI,CACd,OAAO,CAAE,CAAC,CAAC,IAAI,CACf,OAAO,CAAE,IAAI,CACb,WAAW,CAAE,MAAM,CACnB,GAAG,CAAE,IACT,CAEA,qCAAQ,CACJ,qBAAqB,CAAE,OAAO,CAC9B,SAAS,CAAE,kBAAkB,CAC7B,SAAS,CAAE,IAAI,CACf,QAAQ,CAAE,QAAQ,CAClB,OAAO,CAAE,YAAY,CACrB,KAAK,CAAE,KAAK,CACZ,MAAM,CAAE,KAAK,CACb,YAAY,CAAE,IAClB,CAEA,sBAAO,CAAC,oBAAM,CACV,OAAO,CAAE,IAAI,CACb,OAAO,CAAE,CAAC,CACV,KAAK,CAAE,CAAC,CACR,MAAM,CAAE,CACZ,CAEA,qCAAQ,CACJ,QAAQ,CAAE,QAAQ,CAClB,MAAM,CAAE,OAAO,CACf,GAAG,CAAE,CAAC,CACN,IAAI,CAAE,CAAC,CACP,KAAK,CAAE,CAAC,CACR,MAAM,CAAE,CAAC,CACT,gBAAgB,CAAE,OAAO,CACzB,UAAU,CAAE,GAAG,CACf,aAAa,CAAE,IACnB,CAEA,qCAAO,OAAQ,CACX,QAAQ,CAAE,QAAQ,CAClB,OAAO,CAAE,EAAE,CACX,MAAM,CAAE,KAAK,CACb,KAAK,CAAE,KAAK,CACZ,aAAa,CAAE,IAAI,CACnB,IAAI,CAAE,KAAK,CACX,MAAM,CAAE,KAAK,CACb,gBAAgB,CAAE,OAAO,CACzB,UAAU,CAAE,GAChB,CAEQ,UAAW,CAAC,KAAK,QAAQ,CAAG,qCAAO,QAAS,CAChD,gBAAgB,CAAE,IAAI,SAAS,CACnC,CAEQ,UAAW,CAAC,KAAK,QAAQ,CAAG,qCAAQ,CACxC,gBAAgB,CAAE,IAAI,qBAAqB,CAC/C,CAEA,oBAAK,MAAM,CAAG,sBAAQ,CAClB,UAAU,CAAE,CAAC,CAAC,CAAC,CAAC,GAAG,CAAC,IAAI,qBAAqB,CACjD,CAEA,oBAAK,QAAQ,CAAG,sBAAO,OAAQ,CAC3B,SAAS,CAAE,WAAW,KAAK,CAC/B,CAEA,gCAAG,CACC,OAAO,CAAE,IAAI,CACb,GAAG,CAAE,IACT,CAEA,gCAAG,CACC,KAAK,CAAE,WAAW,CAClB,MAAM,CAAE,IAAI,CACZ,OAAO,CAAE,IAAI,CACb,WAAW,CAAE,MAAM,CACnB,QAAQ,CAAE,MACd,CAEA,+BAAE,CACE,QAAQ,CAAE,QACd,CAEA,+BAAC,QAAS,CACN,OAAO,CAAE,EAAE,CACX,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,GAAG,CACX,QAAQ,CAAE,QAAQ,CAClB,MAAM,CAAE,IAAI,CACZ,IAAI,CAAE,IAAI,CACV,gBAAgB,CAAE,KAAK,IAAI,eAAe,CAAC,CAAC,CAAC,GAAG,CAAC,CACjD,UAAU,CAAE,IAChB,CAEA,+BAAC,MAAM,QAAS,CACZ,IAAI,CAAE,GACV,CAEA,CAAC,qCAAO,QAAS,CACb,IAAI,CAAE,EAAE,CACR,UAAU,CAAE,GAAG,CACf,gBAAgB,CAAE,KAAK,IAAI,eAAe,CAAC,CAAC,CAAC,CAAC,CAClD,CAEA,wCAAW,CACP,OAAO,CAAE,IAAI,CACb,GAAG,CAAE,IACT,CAEA,oCAAO,CACH,OAAO,CAAE,CAAC,CAAC,GAAG,CACd,SAAS,CAAE,IAAI,CACf,MAAM,CAAE,IAAI,CACZ,gBAAgB,CAAE,WAAW,CAC7B,OAAO,CAAE,IAAI,CACb,WAAW,CAAE,MACjB,CAEA,MAAM,qCAAQ,CACV,OAAO,CAAE,GAAG,CAAC,KAAK,CAAC,KAAK,IAAI,eAAe,CAAC,CAAC,CAAC,GAAG,CAAC,CAClD,aAAa,CAAE,GACnB"}`
};
const Header = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let liActive;
  let $page, $$unsubscribe_page;
  let $$unsubscribe_themeColor;
  let $language, $$unsubscribe_language;
  let $dataLang, $$unsubscribe_dataLang;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  $$unsubscribe_themeColor = subscribe(themeColor, (value) => value);
  $$unsubscribe_language = subscribe(language, (value) => $language = value);
  $$unsubscribe_dataLang = subscribe(dataLang, (value) => $dataLang = value);
  let idioma = "es";
  const handleLi = (listItem) => {
    liActive = listItem;
  };
  if ($$props.handleLi === void 0 && $$bindings.handleLi && handleLi !== void 0)
    $$bindings.handleLi(handleLi);
  $$result.css.add(css$3);
  set_store_value(language, $language = idioma, $language);
  set_store_value(dataLang, $dataLang = data.find((item) => item.lang === $language).data, $dataLang);
  liActive = $page.url.hash.substring(1) || "about";
  $$unsubscribe_page();
  $$unsubscribe_themeColor();
  $$unsubscribe_language();
  $$unsubscribe_dataLang();
  return `<header class="svelte-1ax2lxw"><nav class="svelte-1ax2lxw"><div class="languages svelte-1ax2lxw"><button class="${escape(null_to_empty(""), true) + " svelte-1ax2lxw"}">${validate_component(Icon, "Icon").$$render($$result, { icon: "twemoji:flag-united-states" }, {}, {})}</button> <button class="${escape(null_to_empty("active"), true) + " svelte-1ax2lxw"}">${validate_component(Icon, "Icon").$$render($$result, { icon: "twemoji:flag-argentina" }, {}, {})}</button></div> <label class="switch svelte-1ax2lxw"><input type="checkbox" class="svelte-1ax2lxw"> <span class="slider svelte-1ax2lxw"></span></label> <ul class="svelte-1ax2lxw"><li class="svelte-1ax2lxw"><a class="${escape(null_to_empty(liActive === "about" ? "active" : ""), true) + " svelte-1ax2lxw"}" href="#about">${escape($dataLang.header[0])}</a></li> <li class="svelte-1ax2lxw"><a class="${escape(null_to_empty(liActive === "skills" ? "active" : ""), true) + " svelte-1ax2lxw"}" href="#skills">${escape($dataLang.header[1])}</a></li> <li class="svelte-1ax2lxw"><a class="${escape(null_to_empty(liActive === "projects" ? "active" : ""), true) + " svelte-1ax2lxw"}" href="#projects">${escape($dataLang.header[2])}</a></li> <li class="svelte-1ax2lxw"><a class="${escape(null_to_empty(liActive === "experience" ? "active" : ""), true) + " svelte-1ax2lxw"}" href="#experience">${escape($dataLang.header[3])}</a></li> <li class="svelte-1ax2lxw"><a class="${escape(null_to_empty(liActive === "contact" ? "active" : ""), true) + " svelte-1ax2lxw"}" href="#contact">${escape($dataLang.header[4])}</a></li></ul></nav> </header>`;
});
const user = "/_app/immutable/assets/user-image-removebg.BoM4EE51.png";
const CV = "/_app/immutable/assets/CV%20Web%20Development.CV6WCVSY.pdf";
const css$2 = {
  code: ".section_wrapper.svelte-jdq73p.svelte-jdq73p{min-height:calc(100vh - 60px);width:100%;display:grid;grid-template-columns:1fr;gap:40px;place-items:center;position:relative}h1.svelte-jdq73p.svelte-jdq73p,h2.svelte-jdq73p.svelte-jdq73p,h3.svelte-jdq73p.svelte-jdq73p{line-height:1.3;margin-top:-5px}h2.svelte-jdq73p.svelte-jdq73p{font-size:60px}h1.svelte-jdq73p.svelte-jdq73p{letter-spacing:6px;font-weight:400}.about_me.svelte-jdq73p .div.svelte-jdq73p{width:100%;padding:20px 0}.about_me.svelte-jdq73p .div p.svelte-jdq73p{margin-bottom:10px}.about_me.svelte-jdq73p img.svelte-jdq73p{shape-outside:url('../lib/images/user-image-removebg.png');shape-margin:0px;float:right;width:350px;filter:drop-shadow(8px -5px 0 rgba(var(--pry-color-rgb), 0.2));position:relative;top:-50px;right:-50px}.going_down.svelte-jdq73p.svelte-jdq73p{width:100%;position:absolute;bottom:20px;display:flex;justify-content:center}.going_down.svelte-jdq73p a.svelte-jdq73p{width:fit-content;display:flex;flex-direction:column;align-items:center}.going_down.svelte-jdq73p svg.svelte-jdq73p{font-size:30px;margin-top:-20px;transform:scaleX(1.2);opacity:0.8}.buttons.svelte-jdq73p.svelte-jdq73p{display:flex;align-items:center;gap:20px}.buttons.svelte-jdq73p a.svelte-jdq73p:nth-child(1){background:var(--pry-color);border:2px solid var(--pry-color);border-radius:8px;padding:10px 15px;color:#fff\r\n    }.buttons.svelte-jdq73p a.svelte-jdq73p{color:var(--pry-color);border:2px solid var(--pry-color);border-radius:8px;padding:10px 15px;font-size:14px}",
  map: `{"version":3,"file":"Hero.svelte","sources":["Hero.svelte"],"sourcesContent":["<script>\\r\\n    import { language, dataLang } from '../store/store'\\r\\n    import { data } from '$lib/data.js';\\r\\n    import user from '$lib/images/user-image-removebg.png'\\r\\n    import CV from '$lib/CV Web Development.pdf'\\r\\n\\r\\n    $: $dataLang = data.find((item) => item.lang === $language).data;\\r\\n<\/script>\\r\\n\\r\\n<section class=\\"section_wrapper\\" id=\\"about\\">\\r\\n    <div class=\\"info\\">\\r\\n        <h3>{$dataLang.hero.h3}</h3>\\r\\n\\r\\n        <h2>{$dataLang.hero.h2}</h2>\\r\\n        \\r\\n        <h1>{$dataLang.hero.h1}</h1>\\r\\n\\r\\n        <div class=\\"about_me\\">\\r\\n            <div class=\\"div\\">\\r\\n                <img src={user} alt=\\"\\">\\r\\n                <p>{$dataLang.hero.paragraph[0]}</p>\\r\\n                <p>{$dataLang.hero.paragraph[1]}</p>\\r\\n                <p>{$dataLang.hero.paragraph[2]}</p>\\r\\n                <p>{$dataLang.hero.paragraph[3]}</p>\\r\\n            </div>\\r\\n\\r\\n        </div>\\r\\n\\r\\n        <div class=\\"going_down\\">\\r\\n            <a href=\\"#skills\\">\\r\\n                <svg xmlns=\\"http://www.w3.org/2000/svg\\" width=\\"1em\\" height=\\"1em\\" viewBox=\\"0 0 24 24\\"><path fill=\\"currentColor\\" fill-rule=\\"evenodd\\" d=\\"m6 7l6 6l6-6l2 2l-8 8l-8-8z\\"/></svg>\\r\\n\\r\\n                <svg xmlns=\\"http://www.w3.org/2000/svg\\" width=\\"1em\\" height=\\"1em\\" viewBox=\\"0 0 24 24\\"><path fill=\\"currentColor\\" fill-rule=\\"evenodd\\" d=\\"m6 7l6 6l6-6l2 2l-8 8l-8-8z\\"/></svg>\\r\\n            </a>\\r\\n        </div>\\r\\n\\r\\n        <div class=\\"buttons\\">\\r\\n            <a href={CV} download=\\"Resume Esteban Pechuan Developer\\">{$dataLang.hero.buttons[0]}</a>\\r\\n            <a href=\\"#contact\\">{$dataLang.hero.buttons[1]}</a>\\r\\n        </div>\\r\\n    </div>\\r\\n\\r\\n    <!-- <div class=\\"image\\">\\r\\n        <img src={user} alt=\\"\\">\\r\\n    </div> -->\\r\\n</section>\\r\\n\\r\\n<style>\\r\\n    .section_wrapper {\\r\\n        min-height: calc(100vh - 60px);\\r\\n        width: 100%;\\r\\n        display: grid;\\r\\n        grid-template-columns: 1fr;\\r\\n        gap: 40px;\\r\\n        place-items: center;\\r\\n        position: relative;\\r\\n    }\\r\\n\\r\\n    h1, h2, h3 {\\r\\n        line-height: 1.3;\\r\\n        margin-top: -5px;\\r\\n    }\\r\\n\\r\\n    h2 {\\r\\n        font-size: 60px;\\r\\n    }\\r\\n\\r\\n    h1 {\\r\\n        letter-spacing: 6px;\\r\\n        font-weight: 400;\\r\\n    }\\r\\n    \\r\\n    .about_me .div {\\r\\n        width: 100%;\\r\\n        padding: 20px 0;\\r\\n    }\\r\\n\\r\\n    .about_me .div p{\\r\\n        margin-bottom: 10px;\\r\\n    }\\r\\n\\r\\n    .about_me img {\\r\\n        shape-outside: url('../lib/images/user-image-removebg.png');\\r\\n        shape-margin: 0px;\\r\\n        float: right;\\r\\n        width: 350px;\\r\\n        filter: drop-shadow(8px -5px 0 rgba(var(--pry-color-rgb), 0.2));\\r\\n        position: relative;\\r\\n        top: -50px;\\r\\n        right: -50px;\\r\\n    }\\r\\n\\r\\n    .going_down {\\r\\n        width: 100%;\\r\\n        position: absolute;\\r\\n        bottom: 20px;\\r\\n        display: flex;\\r\\n        justify-content: center;\\r\\n    }\\r\\n\\r\\n    .going_down a {\\r\\n        width: fit-content;\\r\\n        display: flex;\\r\\n        flex-direction: column;\\r\\n        align-items: center;\\r\\n    }\\r\\n\\r\\n    .going_down svg {\\r\\n        font-size: 30px;\\r\\n        margin-top: -20px;\\r\\n        transform: scaleX(1.2);\\r\\n        opacity: 0.8;\\r\\n    }\\r\\n\\r\\n    .buttons {\\r\\n        display: flex;\\r\\n        align-items: center;\\r\\n        gap: 20px;\\r\\n    }\\r\\n\\r\\n    .buttons a:nth-child(1) {\\r\\n        background: var(--pry-color);\\r\\n        border: 2px solid var(--pry-color);\\r\\n        border-radius: 8px;\\r\\n        padding: 10px 15px;\\r\\n        color: #fff\\r\\n    }\\r\\n\\r\\n    .buttons a {\\r\\n        color: var(--pry-color);\\r\\n        border: 2px solid var(--pry-color);\\r\\n        border-radius: 8px;\\r\\n        padding: 10px 15px;\\r\\n        font-size: 14px;\\r\\n    }\\r\\n</style>"],"names":[],"mappings":"AAgDI,4CAAiB,CACb,UAAU,CAAE,KAAK,KAAK,CAAC,CAAC,CAAC,IAAI,CAAC,CAC9B,KAAK,CAAE,IAAI,CACX,OAAO,CAAE,IAAI,CACb,qBAAqB,CAAE,GAAG,CAC1B,GAAG,CAAE,IAAI,CACT,WAAW,CAAE,MAAM,CACnB,QAAQ,CAAE,QACd,CAEA,8BAAE,CAAE,8BAAE,CAAE,8BAAG,CACP,WAAW,CAAE,GAAG,CAChB,UAAU,CAAE,IAChB,CAEA,8BAAG,CACC,SAAS,CAAE,IACf,CAEA,8BAAG,CACC,cAAc,CAAE,GAAG,CACnB,WAAW,CAAE,GACjB,CAEA,uBAAS,CAAC,kBAAK,CACX,KAAK,CAAE,IAAI,CACX,OAAO,CAAE,IAAI,CAAC,CAClB,CAEA,uBAAS,CAAC,IAAI,CAAC,eAAC,CACZ,aAAa,CAAE,IACnB,CAEA,uBAAS,CAAC,iBAAI,CACV,aAAa,CAAE,4CAA4C,CAC3D,YAAY,CAAE,GAAG,CACjB,KAAK,CAAE,KAAK,CACZ,KAAK,CAAE,KAAK,CACZ,MAAM,CAAE,YAAY,GAAG,CAAC,IAAI,CAAC,CAAC,CAAC,KAAK,IAAI,eAAe,CAAC,CAAC,CAAC,GAAG,CAAC,CAAC,CAC/D,QAAQ,CAAE,QAAQ,CAClB,GAAG,CAAE,KAAK,CACV,KAAK,CAAE,KACX,CAEA,uCAAY,CACR,KAAK,CAAE,IAAI,CACX,QAAQ,CAAE,QAAQ,CAClB,MAAM,CAAE,IAAI,CACZ,OAAO,CAAE,IAAI,CACb,eAAe,CAAE,MACrB,CAEA,yBAAW,CAAC,eAAE,CACV,KAAK,CAAE,WAAW,CAClB,OAAO,CAAE,IAAI,CACb,cAAc,CAAE,MAAM,CACtB,WAAW,CAAE,MACjB,CAEA,yBAAW,CAAC,iBAAI,CACZ,SAAS,CAAE,IAAI,CACf,UAAU,CAAE,KAAK,CACjB,SAAS,CAAE,OAAO,GAAG,CAAC,CACtB,OAAO,CAAE,GACb,CAEA,oCAAS,CACL,OAAO,CAAE,IAAI,CACb,WAAW,CAAE,MAAM,CACnB,GAAG,CAAE,IACT,CAEA,sBAAQ,CAAC,eAAC,WAAW,CAAC,CAAE,CACpB,UAAU,CAAE,IAAI,WAAW,CAAC,CAC5B,MAAM,CAAE,GAAG,CAAC,KAAK,CAAC,IAAI,WAAW,CAAC,CAClC,aAAa,CAAE,GAAG,CAClB,OAAO,CAAE,IAAI,CAAC,IAAI,CAClB,KAAK,CAAE,IAAI;AACnB,IAAI,CAEA,sBAAQ,CAAC,eAAE,CACP,KAAK,CAAE,IAAI,WAAW,CAAC,CACvB,MAAM,CAAE,GAAG,CAAC,KAAK,CAAC,IAAI,WAAW,CAAC,CAClC,aAAa,CAAE,GAAG,CAClB,OAAO,CAAE,IAAI,CAAC,IAAI,CAClB,SAAS,CAAE,IACf"}`
};
const Hero = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $language, $$unsubscribe_language;
  let $dataLang, $$unsubscribe_dataLang;
  $$unsubscribe_language = subscribe(language, (value) => $language = value);
  $$unsubscribe_dataLang = subscribe(dataLang, (value) => $dataLang = value);
  $$result.css.add(css$2);
  set_store_value(dataLang, $dataLang = data.find((item) => item.lang === $language).data, $dataLang);
  $$unsubscribe_language();
  $$unsubscribe_dataLang();
  return `<section class="section_wrapper svelte-jdq73p" id="about"><div class="info"><h3 class="svelte-jdq73p">${escape($dataLang.hero.h3)}</h3> <h2 class="svelte-jdq73p">${escape($dataLang.hero.h2)}</h2> <h1 class="svelte-jdq73p">${escape($dataLang.hero.h1)}</h1> <div class="about_me svelte-jdq73p"><div class="div svelte-jdq73p"><img${add_attribute("src", user, 0)} alt="" class="svelte-jdq73p"> <p class="svelte-jdq73p">${escape($dataLang.hero.paragraph[0])}</p> <p class="svelte-jdq73p">${escape($dataLang.hero.paragraph[1])}</p> <p class="svelte-jdq73p">${escape($dataLang.hero.paragraph[2])}</p> <p class="svelte-jdq73p">${escape($dataLang.hero.paragraph[3])}</p></div></div> <div class="going_down svelte-jdq73p" data-svelte-h="svelte-d460s"><a href="#skills" class="svelte-jdq73p"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" class="svelte-jdq73p"><path fill="currentColor" fill-rule="evenodd" d="m6 7l6 6l6-6l2 2l-8 8l-8-8z"></path></svg> <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" class="svelte-jdq73p"><path fill="currentColor" fill-rule="evenodd" d="m6 7l6 6l6-6l2 2l-8 8l-8-8z"></path></svg></a></div> <div class="buttons svelte-jdq73p"><a${add_attribute("href", CV, 0)} download="Resume Esteban Pechuan Developer" class="svelte-jdq73p">${escape($dataLang.hero.buttons[0])}</a> <a href="#contact" class="svelte-jdq73p">${escape($dataLang.hero.buttons[1])}</a></div></div>  </section>`;
});
const cuppa = "/_app/immutable/assets/cuppa-canada.DM8-OTFG.png";
const bioconsulting = "/_app/immutable/assets/bioconsulting.RlGj4rj5.png";
const foro21 = "/_app/immutable/assets/foro-21.CBgiB6BN.png";
const pechus = "/_app/immutable/assets/pechus-commerce.CGl1jkvz.png";
const css$1 = {
  code: "h2.svelte-zw4cpn.svelte-zw4cpn{width:fit-content;position:relative;margin:0 auto 20px}h2.svelte-zw4cpn.svelte-zw4cpn::before{content:'';width:100%;height:2px;position:absolute;bottom:-2px;background-color:var(--pry-color);transform:scaleX(0.6);transition:0.6s}h2.svelte-zw4cpn.svelte-zw4cpn:hover::before{transform:scaleX(1)}.container_slide.svelte-zw4cpn.svelte-zw4cpn{display:grid;grid-template-columns:repeat(auto-fit, minmax(300px, 1fr));gap:30px;position:relative;padding:0 50px}.container_image.svelte-zw4cpn.svelte-zw4cpn{width:100%;max-width:600px;aspect-ratio:16 / 9}.container_image.svelte-zw4cpn img.svelte-zw4cpn{width:100%;height:100%;object-fit:cover}.container_info.svelte-zw4cpn.svelte-zw4cpn{width:100%;max-width:600px;display:flex;flex-direction:column;gap:10px}.container_info.svelte-zw4cpn a.svelte-zw4cpn{color:var(--pry-color)}.container_info.svelte-zw4cpn a.button.svelte-zw4cpn{padding:10px 15px;background:var(--pry-color);border-radius:8px;width:fit-content;color:var(--background-color);font-size:12px}.tech_icons.svelte-zw4cpn.svelte-zw4cpn{font-size:30px;opacity:0.8;position:absolute;bottom:0;right:50px;display:flex;gap:10px}.container_number.svelte-zw4cpn.svelte-zw4cpn{position:absolute;bottom:0;right:0;font-size:150px;opacity:0.2;z-index:-1}.swiper-button-prev.svelte-zw4cpn.svelte-zw4cpn,.swiper-button-next.svelte-zw4cpn.svelte-zw4cpn{scale:0}",
  map: `{"version":3,"file":"Projects.svelte","sources":["Projects.svelte"],"sourcesContent":["<script>\\r\\n    import Icon from \\"@iconify/svelte\\";\\r\\n    import { register } from \\"swiper/element/bundle\\";\\r\\n    import 'swiper/css'\\r\\n\\r\\n    import cuppa from '$lib/images/cuppa-canada.png'\\r\\n    import bioconsulting from '$lib/images/bioconsulting.png'\\r\\n    import foro21 from '$lib/images/foro-21.png'\\r\\n    import pechus from '$lib/images/pechus-commerce.png'\\r\\n\\r\\n    import { language, dataLang } from '../store/store'\\r\\n    import { data } from '$lib/data.js';\\r\\n\\r\\n    $: $dataLang = data.find((item) => item.lang === $language).data;\\r\\n\\r\\n    register();\\r\\n<\/script>\\r\\n\\r\\n<section class=\\"section_wrapper\\" id=\\"projects\\">\\r\\n    <h2>Proyectos</h2>\\r\\n    \\r\\n    <swiper-container\\r\\n        slides-per-view={1}\\r\\n        centered-slides={true}\\r\\n        space-between={10}\\r\\n        navigation-nextEl={\\".swiper-button-next\\"}\\r\\n        navigation-prevEl={\\".swiper-button-prev\\"}\\r\\n        loop={true}\\r\\n        autoplay={true}\\r\\n        autoplay-disable-On-Interaction={true}\\r\\n    >\\r\\n        <swiper-slide>\\r\\n            <div class=\\"container_slide\\">\\r\\n                <div class=\\"container_image\\">\\r\\n                    <img src={cuppa} alt=\\"\\">\\r\\n                </div>\\r\\n                <div class=\\"container_info\\">\\r\\n                    <h3>{$dataLang.projects.jobs[0].title}</h3>\\r\\n\\r\\n                    <p>{$dataLang.projects.jobs[0].description}</p>\\r\\n                    \\r\\n                    <a class=\\"button\\" target=\\"_blank\\" href=\\"https://cuppacanada.com/\\">{$dataLang.projects.jobs[0].button}</a>\\r\\n                </div>\\r\\n\\r\\n                <div class=\\"tech_icons\\">\\r\\n                    <div class=\\"skill html-fill\\">\\r\\n                        <Icon icon=\\"akar-icons:html-fill\\" />\\r\\n                    </div>\\r\\n                    <div class=\\"skill css-fill\\">\\r\\n                        <Icon icon=\\"akar-icons:css-fill\\" />\\r\\n                    </div>\\r\\n                    <div class=\\"skill javascript-fill\\">\\r\\n                        <Icon icon=\\"akar-icons:javascript-fill\\" />\\r\\n                    </div>\\r\\n                    <div class=\\"skill react-fill\\">\\r\\n                        <Icon icon=\\"akar-icons:react-fill\\" />\\r\\n                    </div>\\r\\n                    <div class=\\"skill badge-3d\\">\\r\\n                        <Icon icon=\\"bi:badge-3d\\" />\\r\\n                    </div>\\r\\n                </div>\\r\\n                \\r\\n                <div class=\\"container_number\\">01</div>\\r\\n\\r\\n            </div>\\r\\n        </swiper-slide>\\r\\n        \\r\\n        <swiper-slide>\\r\\n            <div class=\\"container_slide\\">\\r\\n                <div class=\\"container_image\\">\\r\\n                    <img src={bioconsulting} alt=\\"\\">\\r\\n                </div>\\r\\n                <div class=\\"container_info\\">\\r\\n                    <h3>{$dataLang.projects.jobs[1].title}</h3>\\r\\n\\r\\n                    <p>{@html $dataLang.projects.jobs[1].description}</p>\\r\\n                    \\r\\n                    <a class=\\"button\\" target=\\"_blank\\" href=\\"https://estebanpechuan.github.io/bioconsulting/\\">{$dataLang.projects.jobs[1].button}</a>\\r\\n                </div>\\r\\n\\r\\n                <div class=\\"tech_icons\\">\\r\\n                    <div class=\\"skill html-fill\\">\\r\\n                        <Icon icon=\\"akar-icons:html-fill\\" />\\r\\n                    </div>\\r\\n                    <div class=\\"skill css-fill\\">\\r\\n                        <Icon icon=\\"akar-icons:css-fill\\" />\\r\\n                    </div>\\r\\n                    <div class=\\"skill javascript-fill\\">\\r\\n                        <Icon icon=\\"akar-icons:javascript-fill\\" />\\r\\n                    </div>\\r\\n                </div>\\r\\n                \\r\\n                <div class=\\"container_number\\">02</div>\\r\\n\\r\\n            </div>\\r\\n        </swiper-slide>\\r\\n\\r\\n        <swiper-slide>\\r\\n            <div class=\\"container_slide\\">\\r\\n                <div class=\\"container_image\\">\\r\\n                    <img src={foro21} alt=\\"\\">\\r\\n                </div>\\r\\n                <div class=\\"container_info\\">\\r\\n                    <h3>{$dataLang.projects.jobs[2].title}</h3>\\r\\n\\r\\n                    <p>{$dataLang.projects.jobs[2].description}</p>\\r\\n                    \\r\\n                    <a class=\\"button\\" target=\\"_blank\\" href=\\"https://www.foro21.com.ar/\\">{$dataLang.projects.jobs[2].button}</a>\\r\\n                </div>\\r\\n\\r\\n                <div class=\\"tech_icons\\">\\r\\n                    <div class=\\"skill html-fill\\">\\r\\n                        <Icon icon=\\"akar-icons:html-fill\\" />\\r\\n                    </div>\\r\\n                    <div class=\\"skill css-fill\\">\\r\\n                        <Icon icon=\\"akar-icons:css-fill\\" />\\r\\n                    </div>\\r\\n                    <div class=\\"skill javascript-fill\\">\\r\\n                        <Icon icon=\\"akar-icons:javascript-fill\\" />\\r\\n                    </div>\\r\\n                    <div class=\\"skill svelte\\">\\r\\n                        <Icon icon=\\"cib:svelte\\" />\\r\\n                    </div>\\r\\n                </div>\\r\\n                \\r\\n                <div class=\\"container_number\\">03</div>\\r\\n\\r\\n            </div>\\r\\n        </swiper-slide>\\r\\n\\r\\n        <swiper-slide>\\r\\n            <div class=\\"container_slide\\">\\r\\n                <div class=\\"container_image\\">\\r\\n                    <img src={pechus} alt=\\"\\">\\r\\n                </div>\\r\\n                <div class=\\"container_info\\">\\r\\n                    <h3>{$dataLang.projects.jobs[3].title}</h3>\\r\\n\\r\\n                    <p>{$dataLang.projects.jobs[3].description}</p>\\r\\n                    \\r\\n                    <a class=\\"button\\" target=\\"_blank\\" href=\\"https://pechu-s-commerce.vercel.app/\\">{$dataLang.projects.jobs[3].button}</a>\\r\\n                </div>\\r\\n\\r\\n                <div class=\\"tech_icons\\">\\r\\n                    <div class=\\"skill html-fill\\">\\r\\n                        <Icon icon=\\"akar-icons:html-fill\\" />\\r\\n                    </div>\\r\\n                    <div class=\\"skill css-fill\\">\\r\\n                        <Icon icon=\\"akar-icons:css-fill\\" />\\r\\n                    </div>\\r\\n                    <div class=\\"skill javascript-fill\\">\\r\\n                        <Icon icon=\\"akar-icons:javascript-fill\\" />\\r\\n                    </div>\\r\\n                    <div class=\\"skill svelte\\">\\r\\n                        <Icon icon=\\"cib:svelte\\" />\\r\\n                    </div>\\r\\n                </div>\\r\\n                \\r\\n                <div class=\\"container_number\\">04</div>\\r\\n\\r\\n            </div>\\r\\n        </swiper-slide>\\r\\n\\r\\n        <div class=\\"swiper-button-prev\\" />\\r\\n        <div class=\\"swiper-button-next\\" />\\r\\n    </swiper-container>\\r\\n</section>\\r\\n\\r\\n<style>\\r\\n    h2 {\\r\\n        width: fit-content;\\r\\n        position: relative;\\r\\n        margin: 0 auto 20px;\\r\\n    }\\r\\n\\r\\n    h2::before {\\r\\n        content: '';\\r\\n        width: 100%;\\r\\n        height: 2px;\\r\\n        position: absolute;\\r\\n        bottom: -2px;\\r\\n        background-color: var(--pry-color);\\r\\n        transform: scaleX(0.6);\\r\\n        transition: 0.6s;\\r\\n    }\\r\\n    \\r\\n    h2:hover::before {\\r\\n        transform: scaleX(1);\\r\\n    }\\r\\n\\r\\n    .container_slide {\\r\\n        display: grid;\\r\\n        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));\\r\\n        gap: 30px;\\r\\n        position: relative;\\r\\n        padding: 0 50px;\\r\\n    }\\r\\n\\r\\n    .container_image {\\r\\n        width: 100%;\\r\\n        max-width: 600px;\\r\\n        aspect-ratio: 16 / 9;\\r\\n    }\\r\\n\\r\\n    .container_image img {\\r\\n        width: 100%;\\r\\n        height: 100%;\\r\\n        object-fit: cover;\\r\\n    }\\r\\n\\r\\n    .container_info {\\r\\n        width: 100%;\\r\\n        max-width: 600px;\\r\\n        display: flex;\\r\\n        flex-direction: column;\\r\\n        gap: 10px;\\r\\n    }\\r\\n\\r\\n    /* .bioconsultingError {\\r\\n        color: var(--pry-color);\\r\\n    } */\\r\\n    \\r\\n    .container_info a {\\r\\n        color: var(--pry-color);\\r\\n    }\\r\\n\\r\\n    .container_info a.button {\\r\\n        padding: 10px 15px;\\r\\n        background: var(--pry-color);\\r\\n        border-radius: 8px;\\r\\n        width: fit-content;\\r\\n        color: var(--background-color);\\r\\n        font-size: 12px;\\r\\n    }\\r\\n\\r\\n    .tech_icons {\\r\\n        font-size: 30px;\\r\\n        opacity: 0.8;\\r\\n        position: absolute;\\r\\n        bottom: 0;\\r\\n        right: 50px;\\r\\n        display: flex;\\r\\n        gap: 10px;\\r\\n    }\\r\\n    \\r\\n    .container_number {\\r\\n        position: absolute;\\r\\n        bottom: 0;\\r\\n        right: 0;\\r\\n        font-size: 150px;\\r\\n        opacity: 0.2;\\r\\n        z-index: -1;\\r\\n    }\\r\\n\\r\\n    .swiper-button-prev,\\r\\n    .swiper-button-next {\\r\\n        scale: 0;\\r\\n    }\\r\\n</style>"],"names":[],"mappings":"AAyKI,8BAAG,CACC,KAAK,CAAE,WAAW,CAClB,QAAQ,CAAE,QAAQ,CAClB,MAAM,CAAE,CAAC,CAAC,IAAI,CAAC,IACnB,CAEA,8BAAE,QAAS,CACP,OAAO,CAAE,EAAE,CACX,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,GAAG,CACX,QAAQ,CAAE,QAAQ,CAClB,MAAM,CAAE,IAAI,CACZ,gBAAgB,CAAE,IAAI,WAAW,CAAC,CAClC,SAAS,CAAE,OAAO,GAAG,CAAC,CACtB,UAAU,CAAE,IAChB,CAEA,8BAAE,MAAM,QAAS,CACb,SAAS,CAAE,OAAO,CAAC,CACvB,CAEA,4CAAiB,CACb,OAAO,CAAE,IAAI,CACb,qBAAqB,CAAE,OAAO,QAAQ,CAAC,CAAC,OAAO,KAAK,CAAC,CAAC,GAAG,CAAC,CAAC,CAC3D,GAAG,CAAE,IAAI,CACT,QAAQ,CAAE,QAAQ,CAClB,OAAO,CAAE,CAAC,CAAC,IACf,CAEA,4CAAiB,CACb,KAAK,CAAE,IAAI,CACX,SAAS,CAAE,KAAK,CAChB,YAAY,CAAE,EAAE,CAAC,CAAC,CAAC,CACvB,CAEA,8BAAgB,CAAC,iBAAI,CACjB,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,IAAI,CACZ,UAAU,CAAE,KAChB,CAEA,2CAAgB,CACZ,KAAK,CAAE,IAAI,CACX,SAAS,CAAE,KAAK,CAChB,OAAO,CAAE,IAAI,CACb,cAAc,CAAE,MAAM,CACtB,GAAG,CAAE,IACT,CAMA,6BAAe,CAAC,eAAE,CACd,KAAK,CAAE,IAAI,WAAW,CAC1B,CAEA,6BAAe,CAAC,CAAC,qBAAQ,CACrB,OAAO,CAAE,IAAI,CAAC,IAAI,CAClB,UAAU,CAAE,IAAI,WAAW,CAAC,CAC5B,aAAa,CAAE,GAAG,CAClB,KAAK,CAAE,WAAW,CAClB,KAAK,CAAE,IAAI,kBAAkB,CAAC,CAC9B,SAAS,CAAE,IACf,CAEA,uCAAY,CACR,SAAS,CAAE,IAAI,CACf,OAAO,CAAE,GAAG,CACZ,QAAQ,CAAE,QAAQ,CAClB,MAAM,CAAE,CAAC,CACT,KAAK,CAAE,IAAI,CACX,OAAO,CAAE,IAAI,CACb,GAAG,CAAE,IACT,CAEA,6CAAkB,CACd,QAAQ,CAAE,QAAQ,CAClB,MAAM,CAAE,CAAC,CACT,KAAK,CAAE,CAAC,CACR,SAAS,CAAE,KAAK,CAChB,OAAO,CAAE,GAAG,CACZ,OAAO,CAAE,EACb,CAEA,+CAAmB,CACnB,+CAAoB,CAChB,KAAK,CAAE,CACX"}`
};
const Projects = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $language, $$unsubscribe_language;
  let $dataLang, $$unsubscribe_dataLang;
  $$unsubscribe_language = subscribe(language, (value) => $language = value);
  $$unsubscribe_dataLang = subscribe(dataLang, (value) => $dataLang = value);
  register();
  $$result.css.add(css$1);
  set_store_value(dataLang, $dataLang = data.find((item) => item.lang === $language).data, $dataLang);
  $$unsubscribe_language();
  $$unsubscribe_dataLang();
  return `<section class="section_wrapper" id="projects"><h2 class="svelte-zw4cpn" data-svelte-h="svelte-u6vqae">Proyectos</h2> <swiper-container${add_attribute("slides-per-view", 1, 0)}${add_attribute("centered-slides", true, 0)}${add_attribute("space-between", 10, 0)}${add_attribute("navigation-nextel", ".swiper-button-next", 0)}${add_attribute("navigation-prevel", ".swiper-button-prev", 0)} ${"loop"} ${"autoplay"}${add_attribute("autoplay-disable-on-interaction", true, 0)}><swiper-slide><div class="container_slide svelte-zw4cpn"><div class="container_image svelte-zw4cpn" data-svelte-h="svelte-u1hfgp"><img${add_attribute("src", cuppa, 0)} alt="" class="svelte-zw4cpn"></div> <div class="container_info svelte-zw4cpn"><h3>${escape($dataLang.projects.jobs[0].title)}</h3> <p>${escape($dataLang.projects.jobs[0].description)}</p> <a class="button svelte-zw4cpn" target="_blank" href="https://cuppacanada.com/">${escape($dataLang.projects.jobs[0].button)}</a></div> <div class="tech_icons svelte-zw4cpn"><div class="skill html-fill">${validate_component(Icon, "Icon").$$render($$result, { icon: "akar-icons:html-fill" }, {}, {})}</div> <div class="skill css-fill">${validate_component(Icon, "Icon").$$render($$result, { icon: "akar-icons:css-fill" }, {}, {})}</div> <div class="skill javascript-fill">${validate_component(Icon, "Icon").$$render($$result, { icon: "akar-icons:javascript-fill" }, {}, {})}</div> <div class="skill react-fill">${validate_component(Icon, "Icon").$$render($$result, { icon: "akar-icons:react-fill" }, {}, {})}</div> <div class="skill badge-3d">${validate_component(Icon, "Icon").$$render($$result, { icon: "bi:badge-3d" }, {}, {})}</div></div> <div class="container_number svelte-zw4cpn" data-svelte-h="svelte-1jpyjm9">01</div></div></swiper-slide> <swiper-slide><div class="container_slide svelte-zw4cpn"><div class="container_image svelte-zw4cpn" data-svelte-h="svelte-xo9nbm"><img${add_attribute("src", bioconsulting, 0)} alt="" class="svelte-zw4cpn"></div> <div class="container_info svelte-zw4cpn"><h3>${escape($dataLang.projects.jobs[1].title)}</h3> <p><!-- HTML_TAG_START -->${$dataLang.projects.jobs[1].description}<!-- HTML_TAG_END --></p> <a class="button svelte-zw4cpn" target="_blank" href="https://estebanpechuan.github.io/bioconsulting/">${escape($dataLang.projects.jobs[1].button)}</a></div> <div class="tech_icons svelte-zw4cpn"><div class="skill html-fill">${validate_component(Icon, "Icon").$$render($$result, { icon: "akar-icons:html-fill" }, {}, {})}</div> <div class="skill css-fill">${validate_component(Icon, "Icon").$$render($$result, { icon: "akar-icons:css-fill" }, {}, {})}</div> <div class="skill javascript-fill">${validate_component(Icon, "Icon").$$render($$result, { icon: "akar-icons:javascript-fill" }, {}, {})}</div></div> <div class="container_number svelte-zw4cpn" data-svelte-h="svelte-7t36bc">02</div></div></swiper-slide> <swiper-slide><div class="container_slide svelte-zw4cpn"><div class="container_image svelte-zw4cpn" data-svelte-h="svelte-pepjy9"><img${add_attribute("src", foro21, 0)} alt="" class="svelte-zw4cpn"></div> <div class="container_info svelte-zw4cpn"><h3>${escape($dataLang.projects.jobs[2].title)}</h3> <p>${escape($dataLang.projects.jobs[2].description)}</p> <a class="button svelte-zw4cpn" target="_blank" href="https://www.foro21.com.ar/">${escape($dataLang.projects.jobs[2].button)}</a></div> <div class="tech_icons svelte-zw4cpn"><div class="skill html-fill">${validate_component(Icon, "Icon").$$render($$result, { icon: "akar-icons:html-fill" }, {}, {})}</div> <div class="skill css-fill">${validate_component(Icon, "Icon").$$render($$result, { icon: "akar-icons:css-fill" }, {}, {})}</div> <div class="skill javascript-fill">${validate_component(Icon, "Icon").$$render($$result, { icon: "akar-icons:javascript-fill" }, {}, {})}</div> <div class="skill svelte">${validate_component(Icon, "Icon").$$render($$result, { icon: "cib:svelte" }, {}, {})}</div></div> <div class="container_number svelte-zw4cpn" data-svelte-h="svelte-i786zj">03</div></div></swiper-slide> <swiper-slide><div class="container_slide svelte-zw4cpn"><div class="container_image svelte-zw4cpn" data-svelte-h="svelte-1pp40s0"><img${add_attribute("src", pechus, 0)} alt="" class="svelte-zw4cpn"></div> <div class="container_info svelte-zw4cpn"><h3>${escape($dataLang.projects.jobs[3].title)}</h3> <p>${escape($dataLang.projects.jobs[3].description)}</p> <a class="button svelte-zw4cpn" target="_blank" href="https://pechu-s-commerce.vercel.app/">${escape($dataLang.projects.jobs[3].button)}</a></div> <div class="tech_icons svelte-zw4cpn"><div class="skill html-fill">${validate_component(Icon, "Icon").$$render($$result, { icon: "akar-icons:html-fill" }, {}, {})}</div> <div class="skill css-fill">${validate_component(Icon, "Icon").$$render($$result, { icon: "akar-icons:css-fill" }, {}, {})}</div> <div class="skill javascript-fill">${validate_component(Icon, "Icon").$$render($$result, { icon: "akar-icons:javascript-fill" }, {}, {})}</div> <div class="skill svelte">${validate_component(Icon, "Icon").$$render($$result, { icon: "cib:svelte" }, {}, {})}</div></div> <div class="container_number svelte-zw4cpn" data-svelte-h="svelte-1nfsf3a">04</div></div></swiper-slide> <div class="swiper-button-prev svelte-zw4cpn"></div> <div class="swiper-button-next svelte-zw4cpn"></div></swiper-container> </section>`;
});
const css = {
  code: "section.svelte-z6jdps.svelte-z6jdps{background:var(--background-color-2)}.section_wrapper.svelte-z6jdps.svelte-z6jdps{display:grid;grid-template-columns:repeat(auto-fit, minmax(300px, 1fr));gap:60px}.title.svelte-z6jdps.svelte-z6jdps{width:fit-content;padding:5px 0;overflow:hidden}h2.svelte-z6jdps.svelte-z6jdps{width:fit-content;position:relative}h2.svelte-z6jdps.svelte-z6jdps::before{content:'';width:100%;height:2px;position:absolute;bottom:-2px;left:-50%;background-color:var(--pry-color);transition:0.8s}h2.svelte-z6jdps.svelte-z6jdps:hover::before{left:50%}.skills_text.svelte-z6jdps.svelte-z6jdps{display:flex;flex-direction:column;justify-content:center;gap:20px}.skills_description.svelte-z6jdps.svelte-z6jdps{display:flex;flex-direction:column;gap:10px}.skills_icons.svelte-z6jdps.svelte-z6jdps{display:grid;grid-template-columns:repeat(4, 70px);gap:20px;place-content:center;place-items:center;font-size:50px}.skill.svelte-z6jdps p.svelte-z6jdps{font-size:12px;text-align:center}",
  map: `{"version":3,"file":"Skills.svelte","sources":["Skills.svelte"],"sourcesContent":["<script>\\r\\n    import Icon from '@iconify/svelte';\\r\\n    import { gsap } from 'gsap'\\r\\n    import { onMount } from \\"svelte\\";\\r\\n    import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'\\r\\n    import { language, dataLang } from '../store/store'\\r\\n    import { data } from '$lib/data.js';\\r\\n\\r\\n    $: $dataLang = data.find((item) => item.lang === $language).data;\\r\\n    \\r\\n\\tonMount(() => {\\r\\n        gsap.registerPlugin(ScrollTrigger);\\r\\n\\r\\n        const skillArray = document.querySelectorAll('.skill')\\r\\n\\r\\n        skillArray.forEach((item) => {\\r\\n            gsap.fromTo(item, {\\r\\n                scale: 0,\\r\\n            },\\r\\n            {\\r\\n                duration: 0.6,\\r\\n                scale: 0.8,\\r\\n                ease: 'back.out(2)',\\r\\n                scrollTrigger: {\\r\\n                    trigger: item,\\r\\n                    start: 'top bottom-=100',\\r\\n                    toggleActions: 'play none none reverse',\\r\\n                },\\r\\n            })\\r\\n        })\\r\\n    });\\r\\n\\r\\n\\r\\n<\/script>\\r\\n\\r\\n<section id=\\"skills\\">\\r\\n    <div class=\\"section_wrapper\\">\\r\\n        <div class=\\"skills_text\\">\\r\\n            <div class=\\"title\\">\\r\\n                <h2>{$dataLang.skills.title}</h2>\\r\\n            </div>\\r\\n\\r\\n            <div class=\\"skills_description\\">\\r\\n                <p>{$dataLang.skills.paragraph[0]}</p>\\r\\n                <p>{$dataLang.skills.paragraph[1]}</p>\\r\\n            </div>\\r\\n        </div>\\r\\n\\r\\n        <div class=\\"skills_icons\\">\\r\\n            <div class=\\"skill html-fill\\">\\r\\n                <Icon icon=\\"akar-icons:html-fill\\" />\\r\\n                <p>HTML5</p>\\r\\n            </div>\\r\\n            <div class=\\"skill css-fill\\">\\r\\n                <Icon icon=\\"akar-icons:css-fill\\" />\\r\\n                <p>CSS</p>\\r\\n            </div>\\r\\n            <div class=\\"skill sass\\">\\r\\n                <Icon icon=\\"fa6-brands:sass\\" />\\r\\n                <p>SASS</p>\\r\\n            </div>\\r\\n            <div class=\\"skill bootstrap-fill\\">\\r\\n                <Icon icon=\\"akar-icons:bootstrap-fill\\" />\\r\\n                <p>Bootstrap</p>\\r\\n            </div>\\r\\n            <div class=\\"skill javascript-fill\\">\\r\\n                <Icon icon=\\"akar-icons:javascript-fill\\" />\\r\\n                <p>Javascript</p>\\r\\n            </div>\\r\\n            <div class=\\"skill react-fill\\">\\r\\n                <Icon icon=\\"akar-icons:react-fill\\" />\\r\\n                <p>React</p>\\r\\n            </div>\\r\\n            <div class=\\"skill svelte\\">\\r\\n                <Icon icon=\\"cib:svelte\\" />\\r\\n                <p>Svelte</p>\\r\\n            </div>\\r\\n            <div class=\\"skill vue-16\\">\\r\\n                <Icon icon=\\"nonicons:vue-16\\" />\\r\\n                <p>Vue</p>\\r\\n            </div>\\r\\n            <div class=\\"skill badge-3d\\">\\r\\n                <Icon icon=\\"bi:badge-3d\\" />\\r\\n                <p>3D</p>\\r\\n            </div>\\r\\n            <div class=\\"skill material-ui\\">\\r\\n                <Icon icon=\\"mdi:material-ui\\" />\\r\\n                <p>Material UI</p>\\r\\n            </div>\\r\\n            <div class=\\"skill tailwind\\">\\r\\n                <Icon icon=\\"mdi:tailwind\\" />\\r\\n                <p>Tailwind</p>\\r\\n            </div>\\r\\n            <div class=\\"skill firebase-solid\\">\\r\\n                <Icon icon=\\"teenyicons:firebase-solid\\" />\\r\\n                <p>Firebase</p>\\r\\n            </div>\\r\\n        </div>\\r\\n    </div>\\r\\n</section>\\r\\n\\r\\n<style>\\r\\n    section {\\r\\n        background: var(--background-color-2);\\r\\n    }\\r\\n\\r\\n    .section_wrapper {\\r\\n        display: grid;\\r\\n        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));\\r\\n        gap: 60px;\\r\\n    }\\r\\n\\r\\n    .title {\\r\\n        width: fit-content;\\r\\n        padding: 5px 0;\\r\\n        overflow: hidden;\\r\\n    }\\r\\n\\r\\n    h2 {\\r\\n        width: fit-content;\\r\\n        position: relative;\\r\\n    }\\r\\n\\r\\n    h2::before {\\r\\n        content: '';\\r\\n        width: 100%;\\r\\n        height: 2px;\\r\\n        position: absolute;\\r\\n        bottom: -2px;\\r\\n        left: -50%;\\r\\n        background-color: var(--pry-color);\\r\\n        transition: 0.8s;\\r\\n    }\\r\\n\\r\\n    h2:hover::before {\\r\\n        left: 50%;\\r\\n    }\\r\\n\\r\\n    .skills_text {\\r\\n        display: flex;\\r\\n        flex-direction: column;\\r\\n        justify-content: center;\\r\\n        gap: 20px;\\r\\n    }\\r\\n\\r\\n    .skills_description {\\r\\n        display: flex;\\r\\n        flex-direction: column;\\r\\n        gap: 10px;\\r\\n    }\\r\\n\\r\\n    .skills_icons {\\r\\n        display: grid;\\r\\n        grid-template-columns: repeat(4, 70px);\\r\\n        gap: 20px;\\r\\n        place-content: center;\\r\\n        place-items: center;\\r\\n        font-size: 50px;\\r\\n    }\\r\\n\\r\\n    .skill p {\\r\\n        font-size: 12px;\\r\\n        text-align: center;\\r\\n    }\\r\\n\\r\\n    /* .skill:nth-child(1) {\\r\\n        --skill-color: var(--pry-color);\\r\\n    }\\r\\n\\r\\n    .skill:nth-child(2) {\\r\\n        --skill-color: rgb(228, 77, 38);\\r\\n    }\\r\\n\\r\\n    .skill:nth-child(3) {\\r\\n        --skill-color: rgb(21, 114, 182);\\r\\n    }\\r\\n\\r\\n    .skill:nth-child(4) {\\r\\n        --skill-color: rgb(205, 103, 153);\\r\\n    }\\r\\n\\r\\n    .skill:nth-child(5) {\\r\\n        --skill-color: rgb(0, 216, 255);\\r\\n    }\\r\\n\\r\\n    .skill:nth-child(6) {\\r\\n        --skill-color: var(--pry-color);\\r\\n    }\\r\\n\\r\\n    .skill:nth-child(7) {\\r\\n        --skill-color: rgb(65, 184, 131);\\r\\n    }\\r\\n\\r\\n    .skill:nth-child(8) {\\r\\n        --skill-color: rgb(126, 19, 248);\\r\\n    }\\r\\n    \\r\\n    .skill:nth-child(9) {\\r\\n        --skill-color: rgb(0, 96, 116);\\r\\n    }\\r\\n\\r\\n    .skill:nth-child(10) {\\r\\n        --skill-color: rgb(0, 127, 255);\\r\\n    }\\r\\n\\r\\n    .skill:nth-child(11) {\\r\\n        --skill-color: rgb(68, 168, 179);\\r\\n    }\\r\\n\\r\\n    .skill:nth-child(12) {\\r\\n        --skill-color: #ffca28;\\r\\n    }\\r\\n\\r\\n    .skill:hover {\\r\\n        color: var(--skill-color);\\r\\n    } */\\r\\n</style>"],"names":[],"mappings":"AAsGI,mCAAQ,CACJ,UAAU,CAAE,IAAI,oBAAoB,CACxC,CAEA,4CAAiB,CACb,OAAO,CAAE,IAAI,CACb,qBAAqB,CAAE,OAAO,QAAQ,CAAC,CAAC,OAAO,KAAK,CAAC,CAAC,GAAG,CAAC,CAAC,CAC3D,GAAG,CAAE,IACT,CAEA,kCAAO,CACH,KAAK,CAAE,WAAW,CAClB,OAAO,CAAE,GAAG,CAAC,CAAC,CACd,QAAQ,CAAE,MACd,CAEA,8BAAG,CACC,KAAK,CAAE,WAAW,CAClB,QAAQ,CAAE,QACd,CAEA,8BAAE,QAAS,CACP,OAAO,CAAE,EAAE,CACX,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,GAAG,CACX,QAAQ,CAAE,QAAQ,CAClB,MAAM,CAAE,IAAI,CACZ,IAAI,CAAE,IAAI,CACV,gBAAgB,CAAE,IAAI,WAAW,CAAC,CAClC,UAAU,CAAE,IAChB,CAEA,8BAAE,MAAM,QAAS,CACb,IAAI,CAAE,GACV,CAEA,wCAAa,CACT,OAAO,CAAE,IAAI,CACb,cAAc,CAAE,MAAM,CACtB,eAAe,CAAE,MAAM,CACvB,GAAG,CAAE,IACT,CAEA,+CAAoB,CAChB,OAAO,CAAE,IAAI,CACb,cAAc,CAAE,MAAM,CACtB,GAAG,CAAE,IACT,CAEA,yCAAc,CACV,OAAO,CAAE,IAAI,CACb,qBAAqB,CAAE,OAAO,CAAC,CAAC,CAAC,IAAI,CAAC,CACtC,GAAG,CAAE,IAAI,CACT,aAAa,CAAE,MAAM,CACrB,WAAW,CAAE,MAAM,CACnB,SAAS,CAAE,IACf,CAEA,oBAAM,CAAC,eAAE,CACL,SAAS,CAAE,IAAI,CACf,UAAU,CAAE,MAChB"}`
};
const Skills = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $language, $$unsubscribe_language;
  let $dataLang, $$unsubscribe_dataLang;
  $$unsubscribe_language = subscribe(language, (value) => $language = value);
  $$unsubscribe_dataLang = subscribe(dataLang, (value) => $dataLang = value);
  $$result.css.add(css);
  set_store_value(dataLang, $dataLang = data.find((item) => item.lang === $language).data, $dataLang);
  $$unsubscribe_language();
  $$unsubscribe_dataLang();
  return `<section id="skills" class="svelte-z6jdps"><div class="section_wrapper svelte-z6jdps"><div class="skills_text svelte-z6jdps"><div class="title svelte-z6jdps"><h2 class="svelte-z6jdps">${escape($dataLang.skills.title)}</h2></div> <div class="skills_description svelte-z6jdps"><p>${escape($dataLang.skills.paragraph[0])}</p> <p>${escape($dataLang.skills.paragraph[1])}</p></div></div> <div class="skills_icons svelte-z6jdps"><div class="skill html-fill svelte-z6jdps">${validate_component(Icon, "Icon").$$render($$result, { icon: "akar-icons:html-fill" }, {}, {})} <p class="svelte-z6jdps" data-svelte-h="svelte-3fzuu8">HTML5</p></div> <div class="skill css-fill svelte-z6jdps">${validate_component(Icon, "Icon").$$render($$result, { icon: "akar-icons:css-fill" }, {}, {})} <p class="svelte-z6jdps" data-svelte-h="svelte-1kct5vr">CSS</p></div> <div class="skill sass svelte-z6jdps">${validate_component(Icon, "Icon").$$render($$result, { icon: "fa6-brands:sass" }, {}, {})} <p class="svelte-z6jdps" data-svelte-h="svelte-16at9wu">SASS</p></div> <div class="skill bootstrap-fill svelte-z6jdps">${validate_component(Icon, "Icon").$$render($$result, { icon: "akar-icons:bootstrap-fill" }, {}, {})} <p class="svelte-z6jdps" data-svelte-h="svelte-vwkt7q">Bootstrap</p></div> <div class="skill javascript-fill svelte-z6jdps">${validate_component(Icon, "Icon").$$render($$result, { icon: "akar-icons:javascript-fill" }, {}, {})} <p class="svelte-z6jdps" data-svelte-h="svelte-1wjoejd">Javascript</p></div> <div class="skill react-fill svelte-z6jdps">${validate_component(Icon, "Icon").$$render($$result, { icon: "akar-icons:react-fill" }, {}, {})} <p class="svelte-z6jdps" data-svelte-h="svelte-1d0hyuj">React</p></div> <div class="skill svelte svelte-z6jdps">${validate_component(Icon, "Icon").$$render($$result, { icon: "cib:svelte" }, {}, {})} <p class="svelte-z6jdps" data-svelte-h="svelte-1ct9hh1">Svelte</p></div> <div class="skill vue-16 svelte-z6jdps">${validate_component(Icon, "Icon").$$render($$result, { icon: "nonicons:vue-16" }, {}, {})} <p class="svelte-z6jdps" data-svelte-h="svelte-1pyyjvk">Vue</p></div> <div class="skill badge-3d svelte-z6jdps">${validate_component(Icon, "Icon").$$render($$result, { icon: "bi:badge-3d" }, {}, {})} <p class="svelte-z6jdps" data-svelte-h="svelte-8c790h">3D</p></div> <div class="skill material-ui svelte-z6jdps">${validate_component(Icon, "Icon").$$render($$result, { icon: "mdi:material-ui" }, {}, {})} <p class="svelte-z6jdps" data-svelte-h="svelte-1wq8c41">Material UI</p></div> <div class="skill tailwind svelte-z6jdps">${validate_component(Icon, "Icon").$$render($$result, { icon: "mdi:tailwind" }, {}, {})} <p class="svelte-z6jdps" data-svelte-h="svelte-fixzf8">Tailwind</p></div> <div class="skill firebase-solid svelte-z6jdps">${validate_component(Icon, "Icon").$$render($$result, { icon: "teenyicons:firebase-solid" }, {}, {})} <p class="svelte-z6jdps" data-svelte-h="svelte-mke14v">Firebase</p></div></div></div> </section>`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${$$result.head += `<!-- HEAD_svelte-1wqfb82_START -->${$$result.title = `<title>Esteban Pechuan - Front End Developer</title>`, ""}<!-- HEAD_svelte-1wqfb82_END -->`, ""} ${validate_component(Header, "Header").$$render($$result, {}, {}, {})} ${validate_component(Hero, "Hero").$$render($$result, {}, {}, {})} ${validate_component(Skills, "Skills").$$render($$result, {}, {}, {})} ${validate_component(Experience, "Experience").$$render($$result, {}, {}, {})} ${validate_component(Projects, "Projects").$$render($$result, {}, {}, {})} ${validate_component(Contact, "Contact").$$render($$result, {}, {}, {})}`;
});
export {
  Page as default
};
