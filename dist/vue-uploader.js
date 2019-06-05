(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["vue-uploader"] = factory();
	else
		root["vue-uploader"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "./";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 26);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 1 */
/***/ (function(module, exports) {

/* globals __VUE_SSR_CONTEXT__ */

// this module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle

module.exports = function normalizeComponent (
  rawScriptExports,
  compiledTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier /* server only */
) {
  var esModule
  var scriptExports = rawScriptExports = rawScriptExports || {}

  // ES6 modules interop
  var type = typeof rawScriptExports.default
  if (type === 'object' || type === 'function') {
    esModule = rawScriptExports
    scriptExports = rawScriptExports.default
  }

  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (compiledTemplate) {
    options.render = compiledTemplate.render
    options.staticRenderFns = compiledTemplate.staticRenderFns
  }

  // scopedId
  if (scopeId) {
    options._scopeId = scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = injectStyles
  }

  if (hook) {
    var functional = options.functional
    var existing = functional
      ? options.render
      : options.beforeCreate
    if (!functional) {
      // inject component registration as beforeCreate hook
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    } else {
      // register for functioal component in vue file
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return existing(h, context)
      }
    }
  }

  return {
    esModule: esModule,
    exports: scriptExports,
    options: options
  }
}


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
  Modified by Evan You @yyx990803
*/

var hasDocument = typeof document !== 'undefined'

if (typeof DEBUG !== 'undefined' && DEBUG) {
  if (!hasDocument) {
    throw new Error(
    'vue-style-loader cannot be used in a non-browser environment. ' +
    "Use { target: 'node' } in your Webpack config to indicate a server-rendering environment."
  ) }
}

var listToStyles = __webpack_require__(86)

/*
type StyleObject = {
  id: number;
  parts: Array<StyleObjectPart>
}

type StyleObjectPart = {
  css: string;
  media: string;
  sourceMap: ?string
}
*/

var stylesInDom = {/*
  [id: number]: {
    id: number,
    refs: number,
    parts: Array<(obj?: StyleObjectPart) => void>
  }
*/}

var head = hasDocument && (document.head || document.getElementsByTagName('head')[0])
var singletonElement = null
var singletonCounter = 0
var isProduction = false
var noop = function () {}
var options = null
var ssrIdKey = 'data-vue-ssr-id'

// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
// tags it will allow on a page
var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\b/.test(navigator.userAgent.toLowerCase())

module.exports = function (parentId, list, _isProduction, _options) {
  isProduction = _isProduction

  options = _options || {}

  var styles = listToStyles(parentId, list)
  addStylesToDom(styles)

  return function update (newList) {
    var mayRemove = []
    for (var i = 0; i < styles.length; i++) {
      var item = styles[i]
      var domStyle = stylesInDom[item.id]
      domStyle.refs--
      mayRemove.push(domStyle)
    }
    if (newList) {
      styles = listToStyles(parentId, newList)
      addStylesToDom(styles)
    } else {
      styles = []
    }
    for (var i = 0; i < mayRemove.length; i++) {
      var domStyle = mayRemove[i]
      if (domStyle.refs === 0) {
        for (var j = 0; j < domStyle.parts.length; j++) {
          domStyle.parts[j]()
        }
        delete stylesInDom[domStyle.id]
      }
    }
  }
}

function addStylesToDom (styles /* Array<StyleObject> */) {
  for (var i = 0; i < styles.length; i++) {
    var item = styles[i]
    var domStyle = stylesInDom[item.id]
    if (domStyle) {
      domStyle.refs++
      for (var j = 0; j < domStyle.parts.length; j++) {
        domStyle.parts[j](item.parts[j])
      }
      for (; j < item.parts.length; j++) {
        domStyle.parts.push(addStyle(item.parts[j]))
      }
      if (domStyle.parts.length > item.parts.length) {
        domStyle.parts.length = item.parts.length
      }
    } else {
      var parts = []
      for (var j = 0; j < item.parts.length; j++) {
        parts.push(addStyle(item.parts[j]))
      }
      stylesInDom[item.id] = { id: item.id, refs: 1, parts: parts }
    }
  }
}

function createStyleElement () {
  var styleElement = document.createElement('style')
  styleElement.type = 'text/css'
  head.appendChild(styleElement)
  return styleElement
}

function addStyle (obj /* StyleObjectPart */) {
  var update, remove
  var styleElement = document.querySelector('style[' + ssrIdKey + '~="' + obj.id + '"]')

  if (styleElement) {
    if (isProduction) {
      // has SSR styles and in production mode.
      // simply do nothing.
      return noop
    } else {
      // has SSR styles but in dev mode.
      // for some reason Chrome can't handle source map in server-rendered
      // style tags - source maps in <style> only works if the style tag is
      // created and inserted dynamically. So we remove the server rendered
      // styles and inject new ones.
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  if (isOldIE) {
    // use singleton mode for IE9.
    var styleIndex = singletonCounter++
    styleElement = singletonElement || (singletonElement = createStyleElement())
    update = applyToSingletonTag.bind(null, styleElement, styleIndex, false)
    remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true)
  } else {
    // use multi-style-tag mode in all other cases
    styleElement = createStyleElement()
    update = applyToTag.bind(null, styleElement)
    remove = function () {
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  update(obj)

  return function updateStyle (newObj /* StyleObjectPart */) {
    if (newObj) {
      if (newObj.css === obj.css &&
          newObj.media === obj.media &&
          newObj.sourceMap === obj.sourceMap) {
        return
      }
      update(obj = newObj)
    } else {
      remove()
    }
  }
}

var replaceText = (function () {
  var textStore = []

  return function (index, replacement) {
    textStore[index] = replacement
    return textStore.filter(Boolean).join('\n')
  }
})()

function applyToSingletonTag (styleElement, index, remove, obj) {
  var css = remove ? '' : obj.css

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = replaceText(index, css)
  } else {
    var cssNode = document.createTextNode(css)
    var childNodes = styleElement.childNodes
    if (childNodes[index]) styleElement.removeChild(childNodes[index])
    if (childNodes.length) {
      styleElement.insertBefore(cssNode, childNodes[index])
    } else {
      styleElement.appendChild(cssNode)
    }
  }
}

function applyToTag (styleElement, obj) {
  var css = obj.css
  var media = obj.media
  var sourceMap = obj.sourceMap

  if (media) {
    styleElement.setAttribute('media', media)
  }
  if (options.ssrId) {
    styleElement.setAttribute(ssrIdKey, obj.id)
  }

  if (sourceMap) {
    // https://developer.chrome.com/devtools/docs/javascript-debugging
    // this makes source maps inside style tags work properly in Chrome
    css += '\n/*# sourceURL=' + sourceMap.sources[0] + ' */'
    // http://stackoverflow.com/a/26603875
    css += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + ' */'
  }

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild)
    }
    styleElement.appendChild(document.createTextNode(css))
  }
}


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else if (typeof exports !== "undefined") {
    factory(exports);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports);
    global.mixins = mod.exports;
  }
})(this, function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var uploaderMixin = exports.uploaderMixin = {
    inject: ['uploader']
  };

  var supportMixin = exports.supportMixin = {
    data: function data() {
      return {
        support: true
      };
    },
    mounted: function mounted() {
      this.support = this.uploader.uploader.support;
    }
  };
});

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(81)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(29),
  /* template */
  __webpack_require__(74),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 5 */
/***/ (function(module, exports) {

var core = module.exports = { version: '2.5.3' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(8)(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 7 */
/***/ (function(module, exports) {

var oproto = Object.prototype
var aproto = Array.prototype
var serialize = oproto.toString

var isFunction = function (fn) {
  return serialize.call(fn) === '[object Function]'
}

var isArray = Array.isArray || /* istanbul ignore next */ function (ary) {
  return serialize.call(ary) === '[object Array]'
}

var isPlainObject = function (obj) {
  return serialize.call(obj) === '[object Object]' && Object.getPrototypeOf(obj) === oproto
}

var i = 0
var utils = {
  uid: function () {
    return ++i
  },
  noop: function () {},
  bind: function (fn, context) {
    return function () {
      return fn.apply(context, arguments)
    }
  },
  preventEvent: function (evt) {
    evt.preventDefault()
  },
  stop: function (evt) {
    evt.preventDefault()
    evt.stopPropagation()
  },
  nextTick: function (fn, context) {
    setTimeout(utils.bind(fn, context), 0)
  },
  toArray: function (ary, start, end) {
    if (start === undefined) start = 0
    if (end === undefined) end = ary.length
    return aproto.slice.call(ary, start, end)
  },

  isPlainObject: isPlainObject,
  isFunction: isFunction,
  isArray: isArray,
  isObject: function (obj) {
    return Object(obj) === obj
  },
  isString: function (s) {
    return typeof s === 'string'
  },
  isUndefined: function (a) {
    return typeof a === 'undefined'
  },
  isDefined: function (a) {
    return typeof a !== 'undefined'
  },

  each: function (ary, func, context) {
    if (utils.isDefined(ary.length)) {
      for (var i = 0, len = ary.length; i < len; i++) {
        if (func.call(context, ary[i], i, ary) === false) {
          break
        }
      }
    } else {
      for (var k in ary) {
        if (func.call(context, ary[k], k, ary) === false) {
          break
        }
      }
    }
  },

  /**
   * If option is a function, evaluate it with given params
   * @param {*} data
   * @param {...} args arguments of a callback
   * @returns {*}
   */
  evalOpts: function (data, args) {
    if (utils.isFunction(data)) {
      // `arguments` is an object, not array, in FF, so:
      args = utils.toArray(arguments)
      data = data.apply(null, args.slice(1))
    }
    return data
  },

  extend: function () {
    var options
    var name
    var src
    var copy
    var copyIsArray
    var clone
    var target = arguments[0] || {}
    var i = 1
    var length = arguments.length
    var force = false

    // 如果第一个参数为布尔,判定是否深拷贝
    if (typeof target === 'boolean') {
      force = target
      target = arguments[1] || {}
      i++
    }

    // 确保接受方为一个复杂的数据类型
    if (typeof target !== 'object' && !isFunction(target)) {
      target = {}
    }

    // 如果只有一个参数，那么新成员添加于 extend 所在的对象上
    if (i === length) {
      target = this
      i--
    }

    for (; i < length; i++) {
      // 只处理非空参数
      if ((options = arguments[i]) != null) {
        for (name in options) {
          src = target[name]
          copy = options[name]

          // 防止环引用
          if (target === copy) {
            continue
          }
          if (force && copy && (isPlainObject(copy) || (copyIsArray = isArray(copy)))) {
            if (copyIsArray) {
              copyIsArray = false
              clone = src && isArray(src) ? src : []
            } else {
              clone = src && isPlainObject(src) ? src : {}
            }
            target[name] = utils.extend(force, clone, copy)
          } else if (copy !== undefined) {
            target[name] = copy
          }
        }
      }
    }
    return target
  },

  formatSize: function (size) {
    if (size < 1024) {
      return size.toFixed(0) + ' bytes'
    } else if (size < 1024 * 1024) {
      return (size / 1024.0).toFixed(0) + ' KB'
    } else if (size < 1024 * 1024 * 1024) {
      return (size / 1024.0 / 1024.0).toFixed(1) + ' MB'
    } else {
      return (size / 1024.0 / 1024.0 / 1024.0).toFixed(1) + ' GB'
    }
  },

  defineNonEnumerable: function (target, key, value) {
    Object.defineProperty(target, key, {
      enumerable: false,
      configurable: true,
      writable: true,
      value: value
    })
  }
}

module.exports = utils


/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};


/***/ }),
/* 9 */
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(85)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(27),
  /* template */
  __webpack_require__(78),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(83)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(28),
  /* template */
  __webpack_require__(76),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(84)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(30),
  /* template */
  __webpack_require__(77),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(80)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(31),
  /* template */
  __webpack_require__(73),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(79)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(32),
  /* template */
  __webpack_require__(72),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else if (typeof exports !== "undefined") {
    factory(exports);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports);
    global.utils = mod.exports;
  }
})(this, function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.secondsToStr = secondsToStr;
  exports.kebabCase = kebabCase;
  function secondsToStr(temp) {
    var years = Math.floor(temp / 31536000);
    if (years) {
      return years + ' year' + numberEnding(years);
    }
    var days = Math.floor((temp %= 31536000) / 86400);
    if (days) {
      return days + ' day' + numberEnding(days);
    }
    var hours = Math.floor((temp %= 86400) / 3600);
    if (hours) {
      return hours + ' hour' + numberEnding(hours);
    }
    var minutes = Math.floor((temp %= 3600) / 60);
    if (minutes) {
      return minutes + ' minute' + numberEnding(minutes);
    }
    var seconds = temp % 60;
    return seconds + ' second' + numberEnding(seconds);
    function numberEnding(number) {
      return number > 1 ? 's' : '';
    }
  }

  function kebabCase(s) {
    return s.replace(/[A-Z]/g, function (m) {
      return '-' + m.toLowerCase();
    });
  }
});

/***/ }),
/* 17 */
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(9);
var core = __webpack_require__(5);
var ctx = __webpack_require__(43);
var hide = __webpack_require__(47);
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var IS_WRAP = type & $export.W;
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE];
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE];
  var key, own, out;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    if (own && key in exports) continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? ctx(out, global)
    // wrap global constructors for prevent change them in library
    : IS_WRAP && target[key] == out ? (function (C) {
      var F = function (a, b, c) {
        if (this instanceof C) {
          switch (arguments.length) {
            case 0: return new C();
            case 1: return new C(a);
            case 2: return new C(a, b);
          } return new C(a, b, c);
        } return C.apply(this, arguments);
      };
      F[PROTOTYPE] = C[PROTOTYPE];
      return F;
    // make static versions for prototype methods
    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
    if (IS_PROTO) {
      (exports.virtual || (exports.virtual = {}))[key] = out;
      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
      if (type & $export.R && expProto && !expProto[key]) hide(expProto, key, out);
    }
  }
};
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(40);
var IE8_DOM_DEFINE = __webpack_require__(48);
var toPrimitive = __webpack_require__(59);
var dP = Object.defineProperty;

exports.f = __webpack_require__(6) ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),
/* 20 */
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__(49);
var defined = __webpack_require__(17);
module.exports = function (it) {
  return IObject(defined(it));
};


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

var utils = __webpack_require__(7)

function Chunk (uploader, file, offset) {
  utils.defineNonEnumerable(this, 'uploader', uploader)
  utils.defineNonEnumerable(this, 'file', file)
  utils.defineNonEnumerable(this, 'bytes', null)
  this.offset = offset
  this.tested = false
  this.retries = 0
  this.pendingRetry = false
  this.preprocessState = 0
  this.readState = 0
  this.loaded = 0
  this.total = 0
  this.chunkSize = this.uploader.opts.chunkSize
  this.startByte = this.offset * this.chunkSize
  this.endByte = this.computeEndByte()
  this.xhr = null
}

var STATUS = Chunk.STATUS = {
  PENDING: 'pending',
  UPLOADING: 'uploading',
  READING: 'reading',
  SUCCESS: 'success',
  ERROR: 'error',
  COMPLETE: 'complete',
  PROGRESS: 'progress',
  RETRY: 'retry'
}

utils.extend(Chunk.prototype, {

  _event: function (evt, args) {
    args = utils.toArray(arguments)
    args.unshift(this)
    this.file._chunkEvent.apply(this.file, args)
  },

  computeEndByte: function () {
    var endByte = Math.min(this.file.size, (this.offset + 1) * this.chunkSize)
    if (this.file.size - endByte < this.chunkSize && !this.uploader.opts.forceChunkSize) {
      // The last chunk will be bigger than the chunk size,
      // but less than 2 * this.chunkSize
      endByte = this.file.size
    }
    return endByte
  },

  getParams: function () {
    return {
      chunkNumber: this.offset + 1,
      chunkSize: this.uploader.opts.chunkSize,
      currentChunkSize: this.endByte - this.startByte,
      totalSize: this.file.size,
      identifier: this.file.uniqueIdentifier,
      filename: this.file.name,
      relativePath: this.file.relativePath,
      totalChunks: this.file.chunks.length
    }
  },

  getTarget: function(target, params) {
    if (!params.length) {
      return target
    }
    if (target.indexOf('?') < 0) {
      target += '?'
    } else {
      target += '&'
    }
    return target + params.join('&')
  },

  test: function () {
    this.xhr = new XMLHttpRequest()
    this.xhr.addEventListener('load', testHandler, false)
    this.xhr.addEventListener('error', testHandler, false)
    var testMethod = utils.evalOpts(this.uploader.opts.testMethod, this.file, this)
    var data = this.prepareXhrRequest(testMethod, true)
    this.xhr.send(data)

    var $ = this
    function testHandler (event) {
      var status = $.status(true)
      if (status === STATUS.ERROR) {
        $._event(status, $.message())
        $.uploader.uploadNextChunk()
      } else if (status === STATUS.SUCCESS) {
        $._event(status, $.message())
        $.tested = true
      } else if (!$.file.paused) {
        // Error might be caused by file pause method
        // Chunks does not exist on the server side
        $.tested = true
        $.send()
      }
    }
  },

  preprocessFinished: function () {
    // Compute the endByte after the preprocess function to allow an
    // implementer of preprocess to set the fileObj size
    this.endByte = this.computeEndByte()
    this.preprocessState = 2
    this.send()
  },

  readFinished: function (bytes) {
    this.readState = 2
    this.bytes = bytes
    this.send()
  },

  send: function () {
    var preprocess = this.uploader.opts.preprocess
    var read = this.uploader.opts.readFileFn
    if (utils.isFunction(preprocess)) {
      switch (this.preprocessState) {
        case 0:
          this.preprocessState = 1
          preprocess(this)
          return
        case 1:
          return
      }
    }
    switch (this.readState) {
      case 0:
        this.readState = 1
        read(this.file, this.file.fileType, this.startByte, this.endByte, this)
        return
      case 1:
        return
    }
    if (this.uploader.opts.testChunks && !this.tested) {
      this.test()
      return
    }

    this.loaded = 0
    this.total = 0
    this.pendingRetry = false

    // Set up request and listen for event
    this.xhr = new XMLHttpRequest()
    this.xhr.upload.addEventListener('progress', progressHandler, false)
    this.xhr.addEventListener('load', doneHandler, false)
    this.xhr.addEventListener('error', doneHandler, false)

    var uploadMethod = utils.evalOpts(this.uploader.opts.uploadMethod, this.file, this)
    var data = this.prepareXhrRequest(uploadMethod, false, this.uploader.opts.method, this.bytes)
    this.xhr.send(data)

    var $ = this
    function progressHandler (event) {
      if (event.lengthComputable) {
        $.loaded = event.loaded
        $.total = event.total
      }
      $._event(STATUS.PROGRESS, event)
    }

    function doneHandler (event) {
      var msg = $.message()
      $.processingResponse = true
      $.uploader.opts.processResponse(msg, function (err, res) {
        $.processingResponse = false
        if (!$.xhr) {
          return
        }
        $.processedState = {
          err: err,
          res: res
        }
        var status = $.status()
        if (status === STATUS.SUCCESS || status === STATUS.ERROR) {
          delete this.data
          $._event(status, res)
          status === STATUS.ERROR && $.uploader.uploadNextChunk()
        } else {
          $._event(STATUS.RETRY, res)
          $.pendingRetry = true
          $.abort()
          $.retries++
          var retryInterval = $.uploader.opts.chunkRetryInterval
          if (retryInterval !== null) {
            setTimeout(function () {
              $.send()
            }, retryInterval)
          } else {
            $.send()
          }
        }
      })
    }
  },

  abort: function () {
    var xhr = this.xhr
    this.xhr = null
    this.processingResponse = false
    this.processedState = null
    if (xhr) {
      xhr.abort()
    }
  },

  status: function (isTest) {
    if (this.readState === 1) {
      return STATUS.READING
    } else if (this.pendingRetry || this.preprocessState === 1) {
      // if pending retry then that's effectively the same as actively uploading,
      // there might just be a slight delay before the retry starts
      return STATUS.UPLOADING
    } else if (!this.xhr) {
      return STATUS.PENDING
    } else if (this.xhr.readyState < 4 || this.processingResponse) {
      // Status is really 'OPENED', 'HEADERS_RECEIVED'
      // or 'LOADING' - meaning that stuff is happening
      return STATUS.UPLOADING
    } else {
      var _status
      if (this.uploader.opts.successStatuses.indexOf(this.xhr.status) > -1) {
        // HTTP 200, perfect
        // HTTP 202 Accepted - The request has been accepted for processing, but the processing has not been completed.
        _status = STATUS.SUCCESS
      } else if (this.uploader.opts.permanentErrors.indexOf(this.xhr.status) > -1 ||
          !isTest && this.retries >= this.uploader.opts.maxChunkRetries) {
        // HTTP 415/500/501, permanent error
        _status = STATUS.ERROR
      } else {
        // this should never happen, but we'll reset and queue a retry
        // a likely case for this would be 503 service unavailable
        this.abort()
        _status = STATUS.PENDING
      }
      var processedState = this.processedState
      if (processedState && processedState.err) {
        _status = STATUS.ERROR
      }
      return _status
    }
  },

  message: function () {
    return this.xhr ? this.xhr.responseText : ''
  },

  progress: function () {
    if (this.pendingRetry) {
      return 0
    }
    var s = this.status()
    if (s === STATUS.SUCCESS || s === STATUS.ERROR) {
      return 1
    } else if (s === STATUS.PENDING) {
      return 0
    } else {
      return this.total > 0 ? this.loaded / this.total : 0
    }
  },

  sizeUploaded: function () {
    var size = this.endByte - this.startByte
    // can't return only chunk.loaded value, because it is bigger than chunk size
    if (this.status() !== STATUS.SUCCESS) {
      size = this.progress() * size
    }
    return size
  },

  prepareXhrRequest: function (method, isTest, paramsMethod, blob) {
    console.log(22222222222)
    let index = this.offset
    // Add data from the query options
    var query = utils.evalOpts(this.uploader.opts.query[index], this.file, this, isTest)
    query = utils.extend(this.getParams(), query)
    // processParams
    query = this.uploader.opts.processParams(query)

    var target = this.uploader.opts.target[index]
    var data = null
    if (method === 'GET' || paramsMethod === 'octet') {
      // Add data from the query options
      var params = []
      utils.each(query, function (v, k) {
        params.push([encodeURIComponent(k), encodeURIComponent(v)].join('='))
      })
      target = this.getTarget(target, params)
      data = blob || null
    } else {
      // Add data from the query options
      data = new FormData()
      utils.each(query, function (v, k) {
        data.append(k, v)
      })
      if (typeof blob !== 'undefined') {
        data.append(this.uploader.opts.fileParameterName, blob, this.file.name)
      }
    }

    this.xhr.open(method, target, true)
    this.xhr.withCredentials = this.uploader.opts.withCredentials

    // Add data from header options
    utils.each(utils.evalOpts(this.uploader.opts.headers, this.file, this, isTest), function (v, k) {
      this.xhr.setRequestHeader(k, v)
    }, this)

    return data
  }

})

module.exports = Chunk


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

var utils = __webpack_require__(7)
var event = __webpack_require__(70)
var File = __webpack_require__(71)
var Chunk = __webpack_require__(22)

var version = '__VERSION__'

var isServer = typeof window === 'undefined'

// ie10+
var ie10plus = isServer ? false : window.navigator.msPointerEnabled
var support = (function () {
  if (isServer) {
    return false
  }
  var sliceName = 'slice'
  var _support = utils.isDefined(window.File) && utils.isDefined(window.Blob) &&
                utils.isDefined(window.FileList)
  var bproto = null
  if (_support) {
    bproto = window.Blob.prototype
    utils.each(['slice', 'webkitSlice', 'mozSlice'], function (n) {
      if (bproto[n]) {
        sliceName = n
        return false
      }
    })
    _support = !!bproto[sliceName]
  }
  if (_support) Uploader.sliceName = sliceName
  bproto = null
  return _support
})()

var supportDirectory = (function () {
  if (isServer) {
    return false
  }
  var input = window.document.createElement('input')
  input.type = 'file'
  var sd = 'webkitdirectory' in input || 'directory' in input
  input = null
  return sd
})()

function Uploader (opts) {
  this.support = support
  /* istanbul ignore if */
  if (!this.support) {
    return
  }
  this.supportDirectory = supportDirectory
  utils.defineNonEnumerable(this, 'filePaths', {})
  this.opts = utils.extend({}, Uploader.defaults, opts || {})

  this.preventEvent = utils.bind(this._preventEvent, this)

  File.call(this, this)
}

/**
 * Default read function using the webAPI
 *
 * @function webAPIFileRead(fileObj, fileType, startByte, endByte, chunk)
 *
 */
var webAPIFileRead = function (fileObj, fileType, startByte, endByte, chunk) {
  chunk.readFinished(fileObj.file[Uploader.sliceName](startByte, endByte, fileType))
}

Uploader.version = version

Uploader.defaults = {
  chunkSize: 1024 * 1024,
  forceChunkSize: false,
  simultaneousUploads: 3,
  singleFile: false,
  fileParameterName: 'file',
  progressCallbacksInterval: 500,
  speedSmoothingFactor: 0.1,
  query: [],
  headers: {},
  withCredentials: false,
  preprocess: null,
  method: 'multipart',
  testMethod: 'GET',
  uploadMethod: 'POST',
  prioritizeFirstAndLastChunk: false,
  allowDuplicateUploads: false,
  target: [],
  testChunks: true,
  generateUniqueIdentifier: null,
  maxChunkRetries: 0,
  chunkRetryInterval: null,
  permanentErrors: [404, 415, 500, 501],
  successStatuses: [200, 201, 202],
  onDropStopPropagation: false,
  initFileFn: null,
  readFileFn: webAPIFileRead,
  checkChunkUploadedByResponse: null,
  initialPaused: false,
  processResponse: function (response, cb) {
    cb(null, response)
  },
  processParams: function (params) {
    return params
  }
}

Uploader.utils = utils
Uploader.event = event
Uploader.File = File
Uploader.Chunk = Chunk

// inherit file
Uploader.prototype = utils.extend({}, File.prototype)
// inherit event
utils.extend(Uploader.prototype, event)
utils.extend(Uploader.prototype, {

  constructor: Uploader,

  _trigger: function (name) {
    var args = utils.toArray(arguments)
    var preventDefault = !this.trigger.apply(this, arguments)
    if (name !== 'catchAll') {
      args.unshift('catchAll')
      preventDefault = !this.trigger.apply(this, args) || preventDefault
    }
    return !preventDefault
  },

  _triggerAsync: function () {
    var args = arguments
    utils.nextTick(function () {
      this._trigger.apply(this, args)
    }, this)
  },

  addFiles: function (files, evt) {
    var _files = []
    var oldFileListLen = this.fileList.length
    utils.each(files, function (file) {
      // Uploading empty file IE10/IE11 hangs indefinitely
      // Directories have size `0` and name `.`
      // Ignore already added files if opts.allowDuplicateUploads is set to false
      if ((!ie10plus || ie10plus && file.size > 0) && !(file.size % 4096 === 0 && (file.name === '.' || file.fileName === '.'))) {
        var uniqueIdentifier = this.generateUniqueIdentifier(file)
        if (this.opts.allowDuplicateUploads || !this.getFromUniqueIdentifier(uniqueIdentifier)) {
          var _file = new File(this, file, this)
          _file.uniqueIdentifier = uniqueIdentifier
          if (this._trigger('fileAdded', _file, evt)) {
            _files.push(_file)
          } else {
            File.prototype.removeFile.call(this, _file)
          }
        }
      }
    }, this)
    // get new fileList
    var newFileList = this.fileList.slice(oldFileListLen)
    if (this._trigger('filesAdded', _files, newFileList, evt)) {
      utils.each(_files, function (file) {
        if (this.opts.singleFile && this.files.length > 0) {
          this.removeFile(this.files[0])
        }
        this.files.push(file)
      }, this)
      this._trigger('filesSubmitted', _files, newFileList, evt)
    } else {
      utils.each(newFileList, function (file) {
        File.prototype.removeFile.call(this, file)
      }, this)
    }
  },

  addFile: function (file, evt) {
    this.addFiles([file], evt)
  },

  cancel: function () {
    for (var i = this.fileList.length - 1; i >= 0; i--) {
      this.fileList[i].cancel()
    }
  },

  removeFile: function (file) {
    File.prototype.removeFile.call(this, file)
    this._trigger('fileRemoved', file)
  },

  generateUniqueIdentifier: function (file) {
    var custom = this.opts.generateUniqueIdentifier
    if (utils.isFunction(custom)) {
      return custom(file)
    }
    /* istanbul ignore next */
    // Some confusion in different versions of Firefox
    var relativePath = file.relativePath || file.webkitRelativePath || file.fileName || file.name
    /* istanbul ignore next */
    return file.size + '-' + relativePath.replace(/[^0-9a-zA-Z_-]/img, '')
  },

  getFromUniqueIdentifier: function (uniqueIdentifier) {
    var ret = false
    utils.each(this.files, function (file) {
      if (file.uniqueIdentifier === uniqueIdentifier) {
        ret = file
        return false
      }
    })
    return ret
  },

  uploadNextChunk: function (preventEvents) {
    var found = false
    var pendingStatus = Chunk.STATUS.PENDING
    var checkChunkUploaded = this.uploader.opts.checkChunkUploadedByResponse
    if (this.opts.prioritizeFirstAndLastChunk) {
      utils.each(this.files, function (file) {
        if (file.paused) {
          return
        }
        if (checkChunkUploaded && !file._firstResponse && file.isUploading()) {
          // waiting for current file's first chunk response
          return
        }
        if (file.chunks.length && file.chunks[0].status() === pendingStatus) {
          file.chunks[0].send()
          found = true
          return false
        }
        if (file.chunks.length > 1 && file.chunks[file.chunks.length - 1].status() === pendingStatus) {
          file.chunks[file.chunks.length - 1].send()
          found = true
          return false
        }
      })
      if (found) {
        return found
      }
    }

    // Now, simply look for the next, best thing to upload
    utils.each(this.files, function (file) {
      if (!file.paused) {
        if (checkChunkUploaded && !file._firstResponse && file.isUploading()) {
          // waiting for current file's first chunk response
          return
        }
        utils.each(file.chunks, function (chunk) {
          if (chunk.status() === pendingStatus) {
            chunk.send()
            found = true
            return false
          }
        })
      }
      if (found) {
        return false
      }
    })
    if (found) {
      return true
    }

    // The are no more outstanding chunks to upload, check is everything is done
    var outstanding = false
    utils.each(this.files, function (file) {
      if (!file.isComplete()) {
        outstanding = true
        return false
      }
    })
    // should check files now
    // if now files in list
    // should not trigger complete event
    if (!outstanding && !preventEvents && this.files.length) {
      // All chunks have been uploaded, complete
      this._triggerAsync('complete')
    }
    return outstanding
  },

  upload: function (preventEvents) {
    // Make sure we don't start too many uploads at once
    var ret = this._shouldUploadNext()
    if (ret === false) {
      return
    }
    !preventEvents && this._trigger('uploadStart')
    var started = false
    for (var num = 1; num <= this.opts.simultaneousUploads - ret; num++) {
      started = this.uploadNextChunk(!preventEvents) || started
      if (!started && preventEvents) {
        // completed
        break
      }
    }
    if (!started && !preventEvents) {
      this._triggerAsync('complete')
    }
  },

  /**
   * should upload next chunk
   * @function
   * @returns {Boolean|Number}
   */
  _shouldUploadNext: function () {
    var num = 0
    var should = true
    var simultaneousUploads = this.opts.simultaneousUploads
    var uploadingStatus = Chunk.STATUS.UPLOADING
    utils.each(this.files, function (file) {
      utils.each(file.chunks, function (chunk) {
        if (chunk.status() === uploadingStatus) {
          num++
          if (num >= simultaneousUploads) {
            should = false
            return false
          }
        }
      })
      return should
    })
    // if should is true then return uploading chunks's length
    return should && num
  },

  /**
   * Assign a browse action to one or more DOM nodes.
   * @function
   * @param {Element|Array.<Element>} domNodes
   * @param {boolean} isDirectory Pass in true to allow directories to
   * @param {boolean} singleFile prevent multi file upload
   * @param {Object} attributes set custom attributes:
   *  http://www.w3.org/TR/html-markup/input.file.html#input.file-attributes
   *  eg: accept: 'image/*'
   * be selected (Chrome only).
   */
  assignBrowse: function (domNodes, isDirectory, singleFile, attributes) {
    if (typeof domNodes.length === 'undefined') {
      domNodes = [domNodes]
    }

    utils.each(domNodes, function (domNode) {
      var input
      if (domNode.tagName === 'INPUT' && domNode.type === 'file') {
        input = domNode
      } else {
        input = document.createElement('input')
        input.setAttribute('type', 'file')
        // display:none - not working in opera 12
        utils.extend(input.style, {
          visibility: 'hidden',
          position: 'absolute',
          width: '1px',
          height: '1px'
        })
        // for opera 12 browser, input must be assigned to a document
        domNode.appendChild(input)
        // https://developer.mozilla.org/en/using_files_from_web_applications)
        // event listener is executed two times
        // first one - original mouse click event
        // second - input.click(), input is inside domNode
        domNode.addEventListener('click', function (e) {
          if (domNode.tagName.toLowerCase() === 'label') {
            return
          }
          input.click()
        }, false)
      }
      if (!this.opts.singleFile && !singleFile) {
        input.setAttribute('multiple', 'multiple')
      }
      if (isDirectory) {
        input.setAttribute('webkitdirectory', 'webkitdirectory')
      }
      attributes && utils.each(attributes, function (value, key) {
        input.setAttribute(key, value)
      })
      // When new files are added, simply append them to the overall list
      var that = this
      input.addEventListener('change', function (e) {
        that._trigger(e.type, e)
        if (e.target.value) {
          that.addFiles(e.target.files, e)
          e.target.value = ''
        }
      }, false)
    }, this)
  },

  onDrop: function (evt) {
    this._trigger(evt.type, evt)
    if (this.opts.onDropStopPropagation) {
      evt.stopPropagation()
    }
    evt.preventDefault()
    this._parseDataTransfer(evt.dataTransfer, evt)
  },

  _parseDataTransfer: function (dataTransfer, evt) {
    if (dataTransfer.items && dataTransfer.items[0] &&
      dataTransfer.items[0].webkitGetAsEntry) {
      this.webkitReadDataTransfer(dataTransfer, evt)
    } else {
      this.addFiles(dataTransfer.files, evt)
    }
  },

  webkitReadDataTransfer: function (dataTransfer, evt) {
    var self = this
    var queue = dataTransfer.items.length
    var files = []
    utils.each(dataTransfer.items, function (item) {
      var entry = item.webkitGetAsEntry()
      if (!entry) {
        decrement()
        return
      }
      if (entry.isFile) {
        // due to a bug in Chrome's File System API impl - #149735
        fileReadSuccess(item.getAsFile(), entry.fullPath)
      } else {
        readDirectory(entry.createReader())
      }
    })
    function readDirectory (reader) {
      reader.readEntries(function (entries) {
        if (entries.length) {
          queue += entries.length
          utils.each(entries, function (entry) {
            if (entry.isFile) {
              var fullPath = entry.fullPath
              entry.file(function (file) {
                fileReadSuccess(file, fullPath)
              }, readError)
            } else if (entry.isDirectory) {
              readDirectory(entry.createReader())
            }
          })
          readDirectory(reader)
        } else {
          decrement()
        }
      }, readError)
    }
    function fileReadSuccess (file, fullPath) {
      // relative path should not start with "/"
      file.relativePath = fullPath.substring(1)
      files.push(file)
      decrement()
    }
    function readError (fileError) {
      throw fileError
    }
    function decrement () {
      if (--queue === 0) {
        self.addFiles(files, evt)
      }
    }
  },

  _assignHelper: function (domNodes, handles, remove) {
    if (typeof domNodes.length === 'undefined') {
      domNodes = [domNodes]
    }
    var evtMethod = remove ? 'removeEventListener' : 'addEventListener'
    utils.each(domNodes, function (domNode) {
      utils.each(handles, function (handler, name) {
        domNode[evtMethod](name, handler, false)
      }, this)
    }, this)
  },

  _preventEvent: function (e) {
    utils.preventEvent(e)
    this._trigger(e.type, e)
  },

  /**
   * Assign one or more DOM nodes as a drop target.
   * @function
   * @param {Element|Array.<Element>} domNodes
   */
  assignDrop: function (domNodes) {
    this._onDrop = utils.bind(this.onDrop, this)
    this._assignHelper(domNodes, {
      dragover: this.preventEvent,
      dragenter: this.preventEvent,
      dragleave: this.preventEvent,
      drop: this._onDrop
    })
  },

  /**
   * Un-assign drop event from DOM nodes
   * @function
   * @param domNodes
   */
  unAssignDrop: function (domNodes) {
    this._assignHelper(domNodes, {
      dragover: this.preventEvent,
      dragenter: this.preventEvent,
      dragleave: this.preventEvent,
      drop: this._onDrop
    }, true)
    this._onDrop = null
  }
})

module.exports = Uploader


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(82)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(33),
  /* template */
  __webpack_require__(75),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [module, exports], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else if (typeof exports !== "undefined") {
    factory(module, exports);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod, mod.exports);
    global.fileEvents = mod.exports;
  }
})(this, function (module, exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var events = ['fileProgress', 'fileSuccess', 'fileComplete', 'fileError'];

  exports.default = events;
  module.exports = exports['default'];
});

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [module, exports, __webpack_require__(24), __webpack_require__(11), __webpack_require__(12), __webpack_require__(15), __webpack_require__(14), __webpack_require__(13), __webpack_require__(4)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else if (typeof exports !== "undefined") {
    factory(module, exports, require('./components/uploader.vue'), require('./components/btn.vue'), require('./components/drop.vue'), require('./components/unsupport.vue'), require('./components/list.vue'), require('./components/files.vue'), require('./components/file.vue'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod, mod.exports, global.uploader, global.btn, global.drop, global.unsupport, global.list, global.files, global.file);
    global.index = mod.exports;
  }
})(this, function (module, exports, _uploader, _btn, _drop, _unsupport, _list, _files, _file) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _uploader2 = _interopRequireDefault(_uploader);

  var _btn2 = _interopRequireDefault(_btn);

  var _drop2 = _interopRequireDefault(_drop);

  var _unsupport2 = _interopRequireDefault(_unsupport);

  var _list2 = _interopRequireDefault(_list);

  var _files2 = _interopRequireDefault(_files);

  var _file2 = _interopRequireDefault(_file);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var uploader = {
    version: /* eslint-disable no-undef */"0.7.3",
    install: install,
    Uploader: _uploader2.default,
    UploaderBtn: _btn2.default,
    UploaderDrop: _drop2.default,
    UploaderUnsupport: _unsupport2.default,
    UploaderList: _list2.default,
    UploaderFiles: _files2.default,
    UploaderFile: _file2.default
  };

  if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(install);
  }

  exports.default = uploader;


  function install(Vue) {
    if (install.installed) {
      return;
    }
    Vue.component(_uploader2.default.name, _uploader2.default);
    Vue.component(_btn2.default.name, _btn2.default);
    Vue.component(_drop2.default.name, _drop2.default);
    Vue.component(_unsupport2.default.name, _unsupport2.default);
    Vue.component(_list2.default.name, _list2.default);
    Vue.component(_files2.default.name, _files2.default);
    Vue.component(_file2.default.name, _file2.default);
  }
  module.exports = exports['default'];
});

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [module, exports, __webpack_require__(3)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else if (typeof exports !== "undefined") {
    factory(module, exports, require('../common/mixins'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod, mod.exports, global.mixins);
    global.btn = mod.exports;
  }
})(this, function (module, exports, _mixins) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  var COMPONENT_NAME = 'uploader-btn'; //
  //
  //
  //
  //
  //

  exports.default = {
    name: COMPONENT_NAME,
    mixins: [_mixins.uploaderMixin, _mixins.supportMixin],
    props: {
      directory: {
        type: Boolean,
        default: false
      },
      single: {
        type: Boolean,
        default: false
      },
      attrs: {
        type: Object,
        default: function _default() {
          return {};
        }
      }
    },
    mounted: function mounted() {
      var _this = this;

      this.$nextTick(function () {
        _this.uploader.uploader.assignBrowse(_this.$refs.btn, _this.directory, _this.single, _this.attrs);
      });
    }
  };
  module.exports = exports['default'];
});

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [module, exports, __webpack_require__(3)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else if (typeof exports !== "undefined") {
    factory(module, exports, require('../common/mixins'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod, mod.exports, global.mixins);
    global.drop = mod.exports;
  }
})(this, function (module, exports, _mixins) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  var COMPONENT_NAME = 'uploader-drop'; //
  //
  //
  //
  //
  //

  exports.default = {
    name: COMPONENT_NAME,
    mixins: [_mixins.uploaderMixin, _mixins.supportMixin],
    data: function data() {
      return {
        dropClass: ''
      };
    },

    methods: {
      onDragEnter: function onDragEnter() {
        this.dropClass = 'uploader-dragover';
      },
      onDragLeave: function onDragLeave() {
        this.dropClass = '';
      },
      onDrop: function onDrop() {
        this.dropClass = 'uploader-droped';
      }
    },
    mounted: function mounted() {
      var _this = this;

      this.$nextTick(function () {
        var dropEle = _this.$refs.drop;
        var uploader = _this.uploader.uploader;
        uploader.assignDrop(dropEle);
        uploader.on('dragenter', _this.onDragEnter);
        uploader.on('dragleave', _this.onDragLeave);
        uploader.on('drop', _this.onDrop);
      });
    },
    beforeDestroy: function beforeDestroy() {
      var dropEle = this.$refs.drop;
      var uploader = this.uploader.uploader;
      uploader.off('dragenter', this.onDragEnter);
      uploader.off('dragleave', this.onDragLeave);
      uploader.off('drop', this.onDrop);
      uploader.unAssignDrop(dropEle);
    }
  };
  module.exports = exports['default'];
});

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [module, exports, __webpack_require__(35), __webpack_require__(23), __webpack_require__(25), __webpack_require__(16)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else if (typeof exports !== "undefined") {
    factory(module, exports, require('babel-runtime/core-js/object/keys'), require('simple-upload1.js'), require('../common/file-events'), require('../common/utils'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod, mod.exports, global.keys, global.simpleUpload1, global.fileEvents, global.utils);
    global.file = mod.exports;
  }
})(this, function (module, exports, _keys, _simpleUpload, _fileEvents, _utils) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _keys2 = _interopRequireDefault(_keys);

  var _simpleUpload2 = _interopRequireDefault(_simpleUpload);

  var _fileEvents2 = _interopRequireDefault(_fileEvents);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var COMPONENT_NAME = 'uploader-file'; //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //

  exports.default = {
    name: COMPONENT_NAME,
    props: {
      file: {
        type: Object,
        default: function _default() {
          return {};
        }
      },
      list: {
        type: Boolean,
        default: false
      }
    },
    data: function data() {
      return {
        response: null,
        paused: false,
        error: false,
        averageSpeed: 0,
        currentSpeed: 0,
        isComplete: false,
        isUploading: false,
        size: 0,
        formatedSize: '',
        uploadedSize: 0,
        progress: 0,
        timeRemaining: 0,
        type: '',
        extension: '',
        progressingClass: ''
      };
    },

    computed: {
      fileCategory: function fileCategory() {
        var extension = this.extension;
        var isFolder = this.file.isFolder;
        var type = isFolder ? 'folder' : 'unknown';
        var categoryMap = this.file.uploader.opts.categoryMap;
        var typeMap = categoryMap || {
          image: ['gif', 'jpg', 'jpeg', 'png', 'bmp', 'webp'],
          video: ['mp4', 'm3u8', 'rmvb', 'avi', 'swf', '3gp', 'mkv', 'flv'],
          audio: ['mp3', 'wav', 'wma', 'ogg', 'aac', 'flac'],
          document: ['doc', 'txt', 'docx', 'pages', 'epub', 'pdf', 'numbers', 'csv', 'xls', 'xlsx', 'keynote', 'ppt', 'pptx']
        };
        (0, _keys2.default)(typeMap).forEach(function (_type) {
          var extensions = typeMap[_type];
          if (extensions.indexOf(extension) > -1) {
            type = _type;
          }
        });
        return type;
      },
      progressStyle: function progressStyle() {
        var progress = Math.floor(this.progress * 100);
        var style = 'translateX(' + Math.floor(progress - 100) + '%)';
        return {
          progress: progress + '%',
          webkitTransform: style,
          mozTransform: style,
          msTransform: style,
          transform: style
        };
      },
      formatedAverageSpeed: function formatedAverageSpeed() {
        return _simpleUpload2.default.utils.formatSize(this.averageSpeed) + ' / s';
      },
      status: function status() {
        var isUploading = this.isUploading;
        var isComplete = this.isComplete;
        var isError = this.error;
        var paused = this.paused;
        if (isComplete) {
          return 'success';
        } else if (isError) {
          return 'error';
        } else if (isUploading) {
          return 'uploading';
        } else if (paused) {
          return 'paused';
        } else {
          return 'waiting';
        }
      },
      statusText: function statusText() {
        var status = this.status;
        var fileStatusText = this.file.uploader.fileStatusText;
        var txt = status;
        if (typeof fileStatusText === 'function') {
          txt = fileStatusText(status, this.response);
        } else {
          txt = fileStatusText[status];
        }
        return txt || status;
      },
      formatedTimeRemaining: function formatedTimeRemaining() {
        var timeRemaining = this.timeRemaining;
        var file = this.file;
        if (timeRemaining === Number.POSITIVE_INFINITY || timeRemaining === 0) {
          return '';
        }
        var parsedTimeRemaining = (0, _utils.secondsToStr)(timeRemaining);
        var parseTimeRemaining = file.uploader.opts.parseTimeRemaining;
        if (parseTimeRemaining) {
          parsedTimeRemaining = parseTimeRemaining(timeRemaining, parsedTimeRemaining);
        }
        return parsedTimeRemaining;
      }
    },
    watch: {
      status: function status(newStatus, oldStatus) {
        var _this = this;

        if (oldStatus && newStatus === 'uploading' && oldStatus !== 'uploading') {
          this.tid = setTimeout(function () {
            _this.progressingClass = 'uploader-file-progressing';
          }, 200);
        } else {
          clearTimeout(this.tid);
          this.progressingClass = '';
        }
      }
    },
    methods: {
      _actionCheck: function _actionCheck() {
        this.paused = this.file.paused;
        this.error = this.file.error;
        this.isUploading = this.file.isUploading();
      },
      pause: function pause() {
        this.file.pause();
        this._actionCheck();
        this._fileProgress();
      },
      resume: function resume() {
        this.file.resume();
        this._actionCheck();
      },
      remove: function remove() {
        this.file.cancel();
      },
      retry: function retry() {
        this.file.retry();
        this._actionCheck();
      },
      processResponse: function processResponse(message) {
        var res = message;
        try {
          res = JSON.parse(message);
        } catch (e) {}
        this.response = res;
      },
      fileEventsHandler: function fileEventsHandler(event, args) {
        var rootFile = args[0];
        var file = args[1];
        var target = this.list ? rootFile : file;
        if (this.file === target) {
          if (this.list && event === 'fileSuccess') {
            this.processResponse(args[2]);
            return;
          }
          this['_' + event].apply(this, args);
        }
      },
      _fileProgress: function _fileProgress() {
        this.progress = this.file.progress();
        this.averageSpeed = this.file.averageSpeed;
        this.currentSpeed = this.file.currentSpeed;
        this.timeRemaining = this.file.timeRemaining();
        this.uploadedSize = this.file.sizeUploaded();
        this._actionCheck();
      },
      _fileSuccess: function _fileSuccess(rootFile, file, message) {
        if (rootFile) {
          this.processResponse(message);
        }
        this._fileProgress();
        this.error = false;
        this.isComplete = true;
        this.isUploading = false;
      },
      _fileComplete: function _fileComplete() {
        this._fileSuccess();
      },
      _fileError: function _fileError(rootFile, file, message) {
        this._fileProgress();
        this.processResponse(message);
        this.error = true;
        this.isComplete = false;
        this.isUploading = false;
      }
    },
    mounted: function mounted() {
      var _this2 = this;

      var staticProps = ['paused', 'error', 'averageSpeed', 'currentSpeed'];
      var fnProps = ['isComplete', 'isUploading', {
        key: 'size',
        fn: 'getSize'
      }, {
        key: 'formatedSize',
        fn: 'getFormatSize'
      }, {
        key: 'uploadedSize',
        fn: 'sizeUploaded'
      }, 'progress', 'timeRemaining', {
        key: 'type',
        fn: 'getType'
      }, {
        key: 'extension',
        fn: 'getExtension'
      }];
      staticProps.forEach(function (prop) {
        _this2[prop] = _this2.file[prop];
      });
      fnProps.forEach(function (fnProp) {
        if (typeof fnProp === 'string') {
          _this2[fnProp] = _this2.file[fnProp]();
        } else {
          _this2[fnProp.key] = _this2.file[fnProp.fn]();
        }
      });

      var handlers = this._handlers = {};
      var eventHandler = function eventHandler(event) {
        handlers[event] = function () {
          for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this2.fileEventsHandler(event, args);
        };
        return handlers[event];
      };
      _fileEvents2.default.forEach(function (event) {
        _this2.file.uploader.on(event, eventHandler(event));
      });
    },
    destroyed: function destroyed() {
      var _this3 = this;

      _fileEvents2.default.forEach(function (event) {
        _this3.file.uploader.off(event, _this3._handlers[event]);
      });
      this._handlers = null;
    }
  };
  module.exports = exports['default'];
});

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [module, exports, __webpack_require__(3), __webpack_require__(4)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else if (typeof exports !== "undefined") {
    factory(module, exports, require('../common/mixins'), require('./file.vue'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod, mod.exports, global.mixins, global.file);
    global.files = mod.exports;
  }
})(this, function (module, exports, _mixins, _file) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _file2 = _interopRequireDefault(_file);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //

  var COMPONENT_NAME = 'uploader-files';

  exports.default = {
    name: COMPONENT_NAME,
    mixins: [_mixins.uploaderMixin],
    computed: {
      files: function files() {
        return this.uploader.files;
      }
    },
    components: {
      UploaderFile: _file2.default
    }
  };
  module.exports = exports['default'];
});

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [module, exports, __webpack_require__(3), __webpack_require__(4)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else if (typeof exports !== "undefined") {
    factory(module, exports, require('../common/mixins'), require('./file.vue'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod, mod.exports, global.mixins, global.file);
    global.list = mod.exports;
  }
})(this, function (module, exports, _mixins, _file) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _file2 = _interopRequireDefault(_file);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //

  var COMPONENT_NAME = 'uploader-list';

  exports.default = {
    name: COMPONENT_NAME,
    mixins: [_mixins.uploaderMixin],
    computed: {
      fileList: function fileList() {
        return this.uploader.fileList;
      }
    },
    components: {
      UploaderFile: _file2.default
    }
  };
  module.exports = exports['default'];
});

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [module, exports, __webpack_require__(3)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else if (typeof exports !== "undefined") {
    factory(module, exports, require('../common/mixins'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod, mod.exports, global.mixins);
    global.unsupport = mod.exports;
  }
})(this, function (module, exports, _mixins) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  var COMPONENT_NAME = 'uploader-unsupport'; //
  //
  //
  //
  //
  //
  //
  //
  //
  //

  exports.default = {
    name: COMPONENT_NAME,
    mixins: [_mixins.uploaderMixin, _mixins.supportMixin]
  };
  module.exports = exports['default'];
});

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [module, exports, __webpack_require__(36), __webpack_require__(23), __webpack_require__(16), __webpack_require__(11), __webpack_require__(12), __webpack_require__(15), __webpack_require__(14), __webpack_require__(13), __webpack_require__(4)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else if (typeof exports !== "undefined") {
    factory(module, exports, require('babel-runtime/helpers/defineProperty'), require('simple-upload1.js'), require('../common/utils'), require('./btn.vue'), require('./drop.vue'), require('./unsupport.vue'), require('./list.vue'), require('./files.vue'), require('./file.vue'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod, mod.exports, global.defineProperty, global.simpleUpload1, global.utils, global.btn, global.drop, global.unsupport, global.list, global.files, global.file);
    global.uploader = mod.exports;
  }
})(this, function (module, exports, _defineProperty2, _simpleUpload, _utils, _btn, _drop, _unsupport, _list, _files, _file) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _defineProperty3 = _interopRequireDefault(_defineProperty2);

  var _simpleUpload2 = _interopRequireDefault(_simpleUpload);

  var _btn2 = _interopRequireDefault(_btn);

  var _drop2 = _interopRequireDefault(_drop);

  var _unsupport2 = _interopRequireDefault(_unsupport);

  var _list2 = _interopRequireDefault(_list);

  var _files2 = _interopRequireDefault(_files);

  var _file2 = _interopRequireDefault(_file);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //

  var COMPONENT_NAME = 'uploader';
  var FILE_ADDED_EVENT = 'fileAdded';
  var FILES_ADDED_EVENT = 'filesAdded';
  var UPLOAD_START_EVENT = 'uploadStart';

  exports.default = {
    name: COMPONENT_NAME,
    provide: function provide() {
      return {
        uploader: this
      };
    },

    props: {
      options: {
        type: Object,
        default: function _default() {
          return {};
        }
      },
      autoStart: {
        type: Boolean,
        default: true
      },
      fileStatusText: {
        type: [Object, Function],
        default: function _default() {
          return {
            success: 'success',
            error: 'error',
            uploading: 'uploading',
            paused: 'paused',
            waiting: 'waiting'
          };
        }
      }
    },
    data: function data() {
      return {
        started: false,
        files: [],
        fileList: []
      };
    },

    methods: {
      uploadStart: function uploadStart() {
        this.started = true;
      },
      fileAdded: function fileAdded(file) {
        this.$emit((0, _utils.kebabCase)(FILE_ADDED_EVENT), file);
        if (file.ignored) {
          // is ignored, filter it
          return false;
        }
      },
      filesAdded: function filesAdded(files, fileList) {
        this.$emit((0, _utils.kebabCase)(FILES_ADDED_EVENT), files, fileList);
        if (files.ignored || fileList.ignored) {
          // is ignored, filter it
          return false;
        }
      },
      fileRemoved: function fileRemoved(file) {
        this.files = this.uploader.files;
        this.fileList = this.uploader.fileList;
      },
      filesSubmitted: function filesSubmitted(files, fileList) {
        this.files = this.uploader.files;
        this.fileList = this.uploader.fileList;
        if (this.autoStart) {
          this.uploader.upload();
        }
      },
      allEvent: function allEvent() {
        var _EVENTSMAP;

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        var name = args[0];
        var EVENTSMAP = (_EVENTSMAP = {}, (0, _defineProperty3.default)(_EVENTSMAP, FILE_ADDED_EVENT, true), (0, _defineProperty3.default)(_EVENTSMAP, FILES_ADDED_EVENT, true), (0, _defineProperty3.default)(_EVENTSMAP, UPLOAD_START_EVENT, 'uploadStart'), _EVENTSMAP);
        var handler = EVENTSMAP[name];
        if (handler) {
          if (handler === true) {
            return;
          }
          this[handler].apply(this, args.slice(1));
        }
        args[0] = (0, _utils.kebabCase)(name);
        this.$emit.apply(this, args);
      }
    },
    created: function created() {
      this.options.initialPaused = !this.autoStart;
      var uploader = new _simpleUpload2.default(this.options);
      this.uploader = uploader;
      this.uploader.fileStatusText = this.fileStatusText;
      uploader.on('catchAll', this.allEvent);
      uploader.on(FILE_ADDED_EVENT, this.fileAdded);
      uploader.on(FILES_ADDED_EVENT, this.filesAdded);
      uploader.on('fileRemoved', this.fileRemoved);
      uploader.on('filesSubmitted', this.filesSubmitted);
    },
    destroyed: function destroyed() {
      var uploader = this.uploader;
      uploader.off('catchAll', this.allEvent);
      uploader.off(FILE_ADDED_EVENT, this.fileAdded);
      uploader.off(FILES_ADDED_EVENT, this.filesAdded);
      uploader.off('fileRemoved', this.fileRemoved);
      uploader.off('filesSubmitted', this.filesSubmitted);
      this.uploader = null;
    },

    components: {
      UploaderBtn: _btn2.default,
      UploaderDrop: _drop2.default,
      UploaderUnsupport: _unsupport2.default,
      UploaderList: _list2.default,
      UploaderFiles: _files2.default,
      UploaderFile: _file2.default
    }
  };
  module.exports = exports['default'];
});

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(37), __esModule: true };

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(38), __esModule: true };

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _defineProperty = __webpack_require__(34);

var _defineProperty2 = _interopRequireDefault(_defineProperty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (obj, key, value) {
  if (key in obj) {
    (0, _defineProperty2.default)(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
};

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(61);
var $Object = __webpack_require__(5).Object;
module.exports = function defineProperty(it, key, desc) {
  return $Object.defineProperty(it, key, desc);
};


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(62);
module.exports = __webpack_require__(5).Object.keys;


/***/ }),
/* 39 */
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(10);
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__(21);
var toLength = __webpack_require__(57);
var toAbsoluteIndex = __webpack_require__(56);
module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};


/***/ }),
/* 42 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__(39);
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(10);
var document = __webpack_require__(9).document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};


/***/ }),
/* 45 */
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');


/***/ }),
/* 46 */
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(19);
var createDesc = __webpack_require__(53);
module.exports = __webpack_require__(6) ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__(6) && !__webpack_require__(8)(function () {
  return Object.defineProperty(__webpack_require__(44)('div'), 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__(42);
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};


/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__(46);
var toIObject = __webpack_require__(21);
var arrayIndexOf = __webpack_require__(41)(false);
var IE_PROTO = __webpack_require__(54)('IE_PROTO');

module.exports = function (object, names) {
  var O = toIObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};


/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = __webpack_require__(50);
var enumBugKeys = __webpack_require__(45);

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};


/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

// most Object methods by ES6 should accept primitives
var $export = __webpack_require__(18);
var core = __webpack_require__(5);
var fails = __webpack_require__(8);
module.exports = function (KEY, exec) {
  var fn = (core.Object || {})[KEY] || Object[KEY];
  var exp = {};
  exp[KEY] = exec(fn);
  $export($export.S + $export.F * fails(function () { fn(1); }), 'Object', exp);
};


/***/ }),
/* 53 */
/***/ (function(module, exports) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__(55)('keys');
var uid = __webpack_require__(60);
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};


/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(9);
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});
module.exports = function (key) {
  return store[key] || (store[key] = {});
};


/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(20);
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};


/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__(20);
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};


/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__(17);
module.exports = function (it) {
  return Object(defined(it));
};


/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__(10);
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),
/* 60 */
/***/ (function(module, exports) {

var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};


/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(18);
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !__webpack_require__(6), 'Object', { defineProperty: __webpack_require__(19).f });


/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 Object.keys(O)
var toObject = __webpack_require__(58);
var $keys = __webpack_require__(51);

__webpack_require__(52)('keys', function () {
  return function keys(it) {
    return $keys(toObject(it));
  };
});


/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(true);
// imports


// module
exports.push([module.i, ".uploader-unsupport{position:relative;z-index:10;overflow:hidden}", "", {"version":3,"sources":["D:/uploader/vue-uploader/src/components/unsupport.vue"],"names":[],"mappings":"AACA,oBACE,kBAAmB,AACnB,WAAY,AACZ,eAAiB,CAClB","file":"unsupport.vue","sourcesContent":["\n.uploader-unsupport {\n  position: relative;\n  z-index: 10;\n  overflow: hidden;\n}\n"],"sourceRoot":""}]);

// exports


/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(true);
// imports


// module
exports.push([module.i, ".uploader-list{position:relative}.uploader-list>ul{list-style:none;margin:0;padding:0}", "", {"version":3,"sources":["D:/uploader/vue-uploader/src/components/list.vue"],"names":[],"mappings":"AACA,eACE,iBAAmB,CACpB,AACD,kBACE,gBAAiB,AACjB,SAAU,AACV,SAAU,CACX","file":"list.vue","sourcesContent":["\n.uploader-list {\n  position: relative;\n}\n.uploader-list > ul {\n  list-style: none;\n  margin: 0;\n  padding: 0\n}\n"],"sourceRoot":""}]);

// exports


/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(true);
// imports


// module
exports.push([module.i, ".uploader-file{position:relative;height:49px;line-height:49px;overflow:hidden;border-bottom:1px solid #cdcdcd}.uploader-file[status=error] .uploader-file-retry,.uploader-file[status=paused] .uploader-file-resume,.uploader-file[status=uploading] .uploader-file-pause,.uploader-file[status=waiting] .uploader-file-pause{display:block}.uploader-file[status=success] .uploader-file-remove{display:none}.uploader-file[status=error] .uploader-file-progress{background:#ffe0e0}.uploader-file-progress{position:absolute;width:100%;height:100%;background:#e2eeff;-webkit-transform:translateX(-100%);transform:translateX(-100%)}.uploader-file-progressing{-webkit-transition:all .4s linear;transition:all .4s linear}.uploader-file-info{position:relative;z-index:1;height:100%;overflow:hidden}.uploader-file-info:hover{background-color:hsla(0,0%,94%,.2)}.uploader-file-info em,.uploader-file-info i{font-style:normal}.uploader-file-actions,.uploader-file-meta,.uploader-file-name,.uploader-file-size,.uploader-file-status{float:left;position:relative;height:100%}.uploader-file-name{width:45%;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;text-indent:14px}.uploader-file-icon{width:24px;height:24px;display:inline-block;vertical-align:top;margin-top:13px;margin-right:8px}.uploader-file-icon:before{content:\"\\1F4C3\";display:block;height:100%;font-size:24px;line-height:1;text-indent:0}.uploader-file-icon[icon=folder]:before{content:\"\\1F4C2\"}.uploader-file-icon[icon=image]:before{content:\"\\1F4CA\"}.uploader-file-icon[icon=video]:before{content:\"\\1F4F9\"}.uploader-file-icon[icon=audio]:before{content:\"\\1F3B5\"}.uploader-file-icon[icon=document]:before{content:\"\\1F4CB\"}.uploader-file-size{width:13%;text-indent:10px}.uploader-file-meta{width:8%}.uploader-file-status{width:24%;text-indent:20px}.uploader-file-actions{width:10%}.uploader-file-actions>span{display:none;float:left;width:16px;height:16px;margin-top:16px;margin-right:10px;cursor:pointer;background:url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAABkCAYAAAD0ZHJ6AAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAAJcEhZcwAACxMAAAsTAQCanBgAAARkSURBVGje7ZnfS1NRHMAH4ptPkvQSuAdBkCxD8FUQJMEULUgzy1KyyPVQ4JMiiP4Bvg6EwUQQfMmwhwRDshwaKUjDVCgoSdDNHkzTJZ6+Z37Purve8+PeTb2TM/ggu+ew89l33x8H9BBCPG7GowXTJej3+wnDvEm0JuLC04+EYWftVAUv+fiCvDUdQR1BHUEdQR3BTIygvixoQS14XgTtthLVdpNWwXRLqvQ724LplFRtyrYF0yVpFLQrKRVMh6RZ0I6kkmCqklaCqpKZH0FX56Crq9jVfdDVk0RfFrSgFsxkQVmLcdKCVrKySCrryhPEyYShhzOcrFtG0EoilfHHk1CRU5rF6ZjNZhlVOW6RnMSVyyilKies4pO41diVy8wIujoHXV3FGdMHXTtJKLFYTLhZtq4vC1rwXApCZTIqgR6g1PBMCO9DL3bMMSqBHqDU8EyISDAHiGKvWwcCQG2KgjlAFCDAOhAAap0K5gKLphk8mqJgLrCIgoxRJ4J5wKpJ7gAoMkn5EBXBPGDVJHcAFJmkfIhQcAql1oBpTvTol9gG9pm4RHAKpdaAaU706JfYBvaZuJVgPQrt4sFlnOh5MC/p3lmJYD0K7eLBZZzoeTAv6d5ZnuAYHjpgEOnk5F0ufhG6v1ggOIaHDhhEOjl5l4tfhO4vthLcwAMrFNvLJO5vEwhu4IEViu1lEve3WQmyoihQFBzG/V0CQVYUBYqCw7i/SxTBcpsRbFeIYLnNCLZbCY5b5KAnxRwct8hBj9McZFVMW0ihRNBuFdMWUigRlFaxuQ9WWYjRMTiIe5z0wSoLMToGB3GPsA9aTZIJoB+nRgBnM1tzOkkmgH6cGgGczWzNpzqLx3n/aULJJgezeNw07oxQySbVywKjBOgFRnDs+VEsx8FlgVEC9AIjOPb8KJYjvSzoG7UW1IJaUAtqQS14toLNM5fN5APdwBJA8G83Pk/aK/rgzVvXzeQD3cASQPBvNz5P2ssTzAaGUIrHEO6zI5gNDKEUjyHcxxWkh4Ylcowwk1QQpIeGJXKMMJO0EgwqyjGCioJBJvDrxRMSuVOTJEXfbz1/bHwWtBL0yoQehK6RucgE+bGzanzulQh6E3IgQV+xpc8kcrfuSO7eTfJ3ZYmQw0Oy9azVKOk1C/bJ5D5F38YPeLfx0rjWJxHsS0SqsSYuxySjj5qO5Oj7xQWy2VBtFOwzCy6ryH3YfE3uh64Y1xckgstJPydEjkkeHv07Iy4Xaao15+KCWTBx6M/db+T9xivSErqaJDdzXI6yLRE8Vgg0coex/SPJvT0SbWu0KpZtbgSpCH3NRt7I5OxHkObc6heU+/M/J5vrpBFM5GBLqCQux14COXs5CNXK5OjPGm1tSMrJSOMNYQ4mVTGV/L6zTL7+DovkbFUxbSW0Wo05l8hJWsU+cRWfSh+Mt5Lb1ck/J1TvVsdDaR/MiEni+llsdZuZp62EViu+96bpNjNPWwmtVnzvFd5m9IVVC54x/wA7gNvqFG9vXQAAAABJRU5ErkJggg==\") no-repeat 0 0}.uploader-file-actions>span:hover{background-position-x:-21px}.uploader-file-actions .uploader-file-pause{background-position-y:0}.uploader-file-actions .uploader-file-resume{background-position-y:-17px}.uploader-file-actions .uploader-file-retry{background-position-y:-53px}.uploader-file-actions .uploader-file-remove{display:block;background-position-y:-34px}", "", {"version":3,"sources":["D:/uploader/vue-uploader/src/components/file.vue"],"names":[],"mappings":"AACA,eACE,kBAAmB,AACnB,YAAa,AACb,iBAAkB,AAClB,gBAAiB,AACjB,+BAAiC,CAClC,AAQD,gNACE,aAAe,CAChB,AACD,qDACE,YAAc,CACf,AACD,qDACE,kBAAoB,CACrB,AACD,wBACE,kBAAmB,AACnB,WAAY,AACZ,YAAa,AACb,mBAAoB,AACpB,oCAAqC,AAC7B,2BAA6B,CACtC,AACD,2BACE,kCAAmC,AACnC,yBAA2B,CAC5B,AACD,oBACE,kBAAmB,AACnB,UAAW,AACX,YAAa,AACb,eAAiB,CAClB,AACD,0BACE,kCAA2C,CAC5C,AACD,6CAEE,iBAAmB,CACpB,AACD,yGAKE,WAAY,AACZ,kBAAmB,AACnB,WAAa,CACd,AACD,oBACE,UAAW,AACX,gBAAiB,AACjB,mBAAoB,AACpB,uBAAwB,AACxB,gBAAkB,CACnB,AACD,oBACE,WAAY,AACZ,YAAa,AACb,qBAAsB,AACtB,mBAAoB,AACpB,gBAAiB,AACjB,gBAAkB,CACnB,AACD,2BACE,iBAAc,AACd,cAAe,AACf,YAAa,AACb,eAAgB,AAChB,cAAe,AACf,aAAe,CAChB,AACD,wCACE,gBAAc,CACf,AACD,uCACE,gBAAc,CACf,AACD,uCACE,gBAAc,CACf,AACD,uCACE,gBAAc,CACf,AACD,0CACE,gBAAc,CACf,AACD,oBACE,UAAW,AACX,gBAAkB,CACnB,AACD,oBACE,QAAU,CACX,AACD,sBACE,UAAW,AACX,gBAAkB,CACnB,AACD,uBACE,SAAW,CACZ,AACD,4BACE,aAAc,AACd,WAAY,AACZ,WAAY,AACZ,YAAa,AACb,gBAAiB,AACjB,kBAAmB,AACnB,eAAgB,AAChB,srDAAwrD,CACzrD,AACD,kCACE,2BAA6B,CAC9B,AACD,4CACE,uBAAyB,CAC1B,AACD,6CACE,2BAA6B,CAC9B,AACD,4CACE,2BAA6B,CAC9B,AACD,6CACE,cAAe,AACf,2BAA6B,CAC9B","file":"file.vue","sourcesContent":["\n.uploader-file {\n  position: relative;\n  height: 49px;\n  line-height: 49px;\n  overflow: hidden;\n  border-bottom: 1px solid #cdcdcd;\n}\n.uploader-file[status=\"waiting\"] .uploader-file-pause,\n.uploader-file[status=\"uploading\"] .uploader-file-pause {\n  display: block;\n}\n.uploader-file[status=\"paused\"] .uploader-file-resume {\n  display: block;\n}\n.uploader-file[status=\"error\"] .uploader-file-retry {\n  display: block;\n}\n.uploader-file[status=\"success\"] .uploader-file-remove {\n  display: none;\n}\n.uploader-file[status=\"error\"] .uploader-file-progress {\n  background: #ffe0e0;\n}\n.uploader-file-progress {\n  position: absolute;\n  width: 100%;\n  height: 100%;\n  background: #e2eeff;\n  -webkit-transform: translateX(-100%);\n          transform: translateX(-100%);\n}\n.uploader-file-progressing {\n  -webkit-transition: all .4s linear;\n  transition: all .4s linear;\n}\n.uploader-file-info {\n  position: relative;\n  z-index: 1;\n  height: 100%;\n  overflow: hidden;\n}\n.uploader-file-info:hover {\n  background-color: rgba(240, 240, 240, 0.2);\n}\n.uploader-file-info i,\n.uploader-file-info em {\n  font-style: normal;\n}\n.uploader-file-name,\n.uploader-file-size,\n.uploader-file-meta,\n.uploader-file-status,\n.uploader-file-actions {\n  float: left;\n  position: relative;\n  height: 100%;\n}\n.uploader-file-name {\n  width: 45%;\n  overflow: hidden;\n  white-space: nowrap;\n  text-overflow: ellipsis;\n  text-indent: 14px;\n}\n.uploader-file-icon {\n  width: 24px;\n  height: 24px;\n  display: inline-block;\n  vertical-align: top;\n  margin-top: 13px;\n  margin-right: 8px;\n}\n.uploader-file-icon::before {\n  content: \"📃\";\n  display: block;\n  height: 100%;\n  font-size: 24px;\n  line-height: 1;\n  text-indent: 0;\n}\n.uploader-file-icon[icon=\"folder\"]::before {\n  content: \"📂\";\n}\n.uploader-file-icon[icon=\"image\"]::before {\n  content: \"📊\";\n}\n.uploader-file-icon[icon=\"video\"]::before {\n  content: \"📹\";\n}\n.uploader-file-icon[icon=\"audio\"]::before {\n  content: \"🎵\";\n}\n.uploader-file-icon[icon=\"document\"]::before {\n  content: \"📋\";\n}\n.uploader-file-size {\n  width: 13%;\n  text-indent: 10px;\n}\n.uploader-file-meta {\n  width: 8%;\n}\n.uploader-file-status {\n  width: 24%;\n  text-indent: 20px;\n}\n.uploader-file-actions {\n  width: 10%;\n}\n.uploader-file-actions > span {\n  display: none;\n  float: left;\n  width: 16px;\n  height: 16px;\n  margin-top: 16px;\n  margin-right: 10px;\n  cursor: pointer;\n  background: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAABkCAYAAAD0ZHJ6AAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAAJcEhZcwAACxMAAAsTAQCanBgAAARkSURBVGje7ZnfS1NRHMAH4ptPkvQSuAdBkCxD8FUQJMEULUgzy1KyyPVQ4JMiiP4Bvg6EwUQQfMmwhwRDshwaKUjDVCgoSdDNHkzTJZ6+Z37Purve8+PeTb2TM/ggu+ew89l33x8H9BBCPG7GowXTJej3+wnDvEm0JuLC04+EYWftVAUv+fiCvDUdQR1BHUEdQR3BTIygvixoQS14XgTtthLVdpNWwXRLqvQ724LplFRtyrYF0yVpFLQrKRVMh6RZ0I6kkmCqklaCqpKZH0FX56Crq9jVfdDVk0RfFrSgFsxkQVmLcdKCVrKySCrryhPEyYShhzOcrFtG0EoilfHHk1CRU5rF6ZjNZhlVOW6RnMSVyyilKies4pO41diVy8wIujoHXV3FGdMHXTtJKLFYTLhZtq4vC1rwXApCZTIqgR6g1PBMCO9DL3bMMSqBHqDU8EyISDAHiGKvWwcCQG2KgjlAFCDAOhAAap0K5gKLphk8mqJgLrCIgoxRJ4J5wKpJ7gAoMkn5EBXBPGDVJHcAFJmkfIhQcAql1oBpTvTol9gG9pm4RHAKpdaAaU706JfYBvaZuJVgPQrt4sFlnOh5MC/p3lmJYD0K7eLBZZzoeTAv6d5ZnuAYHjpgEOnk5F0ufhG6v1ggOIaHDhhEOjl5l4tfhO4vthLcwAMrFNvLJO5vEwhu4IEViu1lEve3WQmyoihQFBzG/V0CQVYUBYqCw7i/SxTBcpsRbFeIYLnNCLZbCY5b5KAnxRwct8hBj9McZFVMW0ihRNBuFdMWUigRlFaxuQ9WWYjRMTiIe5z0wSoLMToGB3GPsA9aTZIJoB+nRgBnM1tzOkkmgH6cGgGczWzNpzqLx3n/aULJJgezeNw07oxQySbVywKjBOgFRnDs+VEsx8FlgVEC9AIjOPb8KJYjvSzoG7UW1IJaUAtqQS14toLNM5fN5APdwBJA8G83Pk/aK/rgzVvXzeQD3cASQPBvNz5P2ssTzAaGUIrHEO6zI5gNDKEUjyHcxxWkh4Ylcowwk1QQpIeGJXKMMJO0EgwqyjGCioJBJvDrxRMSuVOTJEXfbz1/bHwWtBL0yoQehK6RucgE+bGzanzulQh6E3IgQV+xpc8kcrfuSO7eTfJ3ZYmQw0Oy9azVKOk1C/bJ5D5F38YPeLfx0rjWJxHsS0SqsSYuxySjj5qO5Oj7xQWy2VBtFOwzCy6ryH3YfE3uh64Y1xckgstJPydEjkkeHv07Iy4Xaao15+KCWTBx6M/db+T9xivSErqaJDdzXI6yLRE8Vgg0coex/SPJvT0SbWu0KpZtbgSpCH3NRt7I5OxHkObc6heU+/M/J5vrpBFM5GBLqCQux14COXs5CNXK5OjPGm1tSMrJSOMNYQ4mVTGV/L6zTL7+DovkbFUxbSW0Wo05l8hJWsU+cRWfSh+Mt5Lb1ck/J1TvVsdDaR/MiEni+llsdZuZp62EViu+96bpNjNPWwmtVnzvFd5m9IVVC54x/wA7gNvqFG9vXQAAAABJRU5ErkJggg==\") no-repeat 0 0;\n}\n.uploader-file-actions > span:hover {\n  background-position-x: -21px;\n}\n.uploader-file-actions .uploader-file-pause {\n  background-position-y: 0;\n}\n.uploader-file-actions .uploader-file-resume {\n  background-position-y: -17px;\n}\n.uploader-file-actions .uploader-file-retry {\n  background-position-y: -53px;\n}\n.uploader-file-actions .uploader-file-remove {\n  display: block;\n  background-position-y: -34px;\n}\n"],"sourceRoot":""}]);

// exports


/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(true);
// imports


// module
exports.push([module.i, ".uploader{position:relative}", "", {"version":3,"sources":["D:/uploader/vue-uploader/src/components/uploader.vue"],"names":[],"mappings":"AACA,UACE,iBAAmB,CACpB","file":"uploader.vue","sourcesContent":["\n.uploader {\n  position: relative;\n}\n"],"sourceRoot":""}]);

// exports


/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(true);
// imports


// module
exports.push([module.i, ".uploader-drop{position:relative;padding:10px;overflow:hidden;border:1px dashed #ccc;background-color:#f5f5f5}.uploader-dragover{border-color:#999;background-color:#f7f7f7}", "", {"version":3,"sources":["D:/uploader/vue-uploader/src/components/drop.vue"],"names":[],"mappings":"AACA,eACE,kBAAmB,AACnB,aAAc,AACd,gBAAiB,AACjB,uBAAwB,AACxB,wBAA0B,CAC3B,AACD,mBACE,kBAAmB,AACnB,wBAA0B,CAC3B","file":"drop.vue","sourcesContent":["\n.uploader-drop {\n  position: relative;\n  padding: 10px;\n  overflow: hidden;\n  border: 1px dashed #ccc;\n  background-color: #f5f5f5;\n}\n.uploader-dragover {\n  border-color: #999;\n  background-color: #f7f7f7;\n}\n"],"sourceRoot":""}]);

// exports


/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(true);
// imports


// module
exports.push([module.i, ".uploader-files{position:relative}.uploader-files>ul{list-style:none;margin:0;padding:0}", "", {"version":3,"sources":["D:/uploader/vue-uploader/src/components/files.vue"],"names":[],"mappings":"AACA,gBACE,iBAAmB,CACpB,AACD,mBACE,gBAAiB,AACjB,SAAU,AACV,SAAU,CACX","file":"files.vue","sourcesContent":["\n.uploader-files {\n  position: relative;\n}\n.uploader-files > ul {\n  list-style: none;\n  margin: 0;\n  padding: 0\n}\n"],"sourceRoot":""}]);

// exports


/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(true);
// imports


// module
exports.push([module.i, ".uploader-btn{display:inline-block;position:relative;padding:4px 8px;font-size:100%;line-height:1.4;color:#666;border:1px solid #666;cursor:pointer;border-radius:2px;background:none;outline:none}.uploader-btn:hover{background-color:rgba(0,0,0,.08)}", "", {"version":3,"sources":["D:/uploader/vue-uploader/src/components/btn.vue"],"names":[],"mappings":"AACA,cACE,qBAAsB,AACtB,kBAAmB,AACnB,gBAAiB,AACjB,eAAgB,AAChB,gBAAiB,AACjB,WAAY,AACZ,sBAAuB,AACvB,eAAgB,AAChB,kBAAmB,AACnB,gBAAiB,AACjB,YAAc,CACf,AACD,oBACE,gCAAqC,CACtC","file":"btn.vue","sourcesContent":["\n.uploader-btn {\n  display: inline-block;\n  position: relative;\n  padding: 4px 8px;\n  font-size: 100%;\n  line-height: 1.4;\n  color: #666;\n  border: 1px solid #666;\n  cursor: pointer;\n  border-radius: 2px;\n  background: none;\n  outline: none;\n}\n.uploader-btn:hover {\n  background-color: rgba(0, 0, 0, .08);\n}\n"],"sourceRoot":""}]);

// exports


/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

var each = __webpack_require__(7).each

var event = {

  _eventData: null,

  on: function (name, func) {
    if (!this._eventData) this._eventData = {}
    if (!this._eventData[name]) this._eventData[name] = []
    var listened = false
    each(this._eventData[name], function (fuc) {
      if (fuc === func) {
        listened = true
        return false
      }
    })
    if (!listened) {
      this._eventData[name].push(func)
    }
  },

  off: function (name, func) {
    if (!this._eventData) this._eventData = {}
    if (!this._eventData[name] || !this._eventData[name].length) return
    if (func) {
      each(this._eventData[name], function (fuc, i) {
        if (fuc === func) {
          this._eventData[name].splice(i, 1)
          return false
        }
      }, this)
    } else {
      this._eventData[name] = []
    }
  },

  trigger: function (name) {
    if (!this._eventData) this._eventData = {}
    if (!this._eventData[name]) return true
    var args = this._eventData[name].slice.call(arguments, 1)
    var preventDefault = false
    each(this._eventData[name], function (fuc) {
      preventDefault = fuc.apply(this, args) === false || preventDefault
    }, this)
    return !preventDefault
  }
}

module.exports = event


/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

var utils = __webpack_require__(7)
var Chunk = __webpack_require__(22)

function File (uploader, file, parent) {
  utils.defineNonEnumerable(this, 'uploader', uploader)
  this.isRoot = this.isFolder = uploader === this
  utils.defineNonEnumerable(this, 'parent', parent || null)
  utils.defineNonEnumerable(this, 'files', [])
  utils.defineNonEnumerable(this, 'fileList', [])
  utils.defineNonEnumerable(this, 'chunks', [])
  utils.defineNonEnumerable(this, '_errorFiles', [])
  utils.defineNonEnumerable(this, 'file', null)
  this.id = utils.uid()

  if (this.isRoot || !file) {
    this.file = null
  } else {
    if (utils.isString(file)) {
      // folder
      this.isFolder = true
      this.file = null
      this.path = file
      if (this.parent.path) {
        file = file.substr(this.parent.path.length)
      }
      this.name = file.charAt(file.length - 1) === '/' ? file.substr(0, file.length - 1) : file
    } else {
      this.file = file
      this.fileType = this.file.type
      this.name = file.fileName || file.name
      this.size = file.size
      this.relativePath = file.relativePath || file.webkitRelativePath || this.name
      this._parseFile()
    }
  }

  this.paused = uploader.opts.initialPaused
  this.error = false
  this.allError = false
  this.aborted = false
  this.averageSpeed = 0
  this.currentSpeed = 0
  this._lastProgressCallback = Date.now()
  this._prevUploadedSize = 0
  this._prevProgress = 0

  this.bootstrap()
}

utils.extend(File.prototype, {

  _parseFile: function () {
    var ppaths = parsePaths(this.relativePath)
    if (ppaths.length) {
      var filePaths = this.uploader.filePaths
      utils.each(ppaths, function (path, i) {
        var folderFile = filePaths[path]
        if (!folderFile) {
          folderFile = new File(this.uploader, path, this.parent)
          filePaths[path] = folderFile
          this._updateParentFileList(folderFile)
        }
        this.parent = folderFile
        folderFile.files.push(this)
        if (!ppaths[i + 1]) {
          folderFile.fileList.push(this)
        }
      }, this)
    } else {
      this._updateParentFileList()
    }
  },

  _updateParentFileList: function (file) {
    if (!file) {
      file = this
    }
    var p = this.parent
    if (p) {
      p.fileList.push(file)
    }
  },

  _eachAccess: function (eachFn, fileFn) {
    if (this.isFolder) {
      utils.each(this.files, function (f, i) {
        return eachFn.call(this, f, i)
      }, this)
      return
    }
    fileFn.call(this, this)
  },

  bootstrap: function () {
    if (this.isFolder) return
    var opts = this.uploader.opts
    if (utils.isFunction(opts.initFileFn)) {
      opts.initFileFn.call(this, this)
    }

    this.abort(true)
    this._resetError()
    // Rebuild stack of chunks from file
    this._prevProgress = 0
    var round = opts.forceChunkSize ? Math.ceil : Math.floor
    var chunks = Math.max(round(this.size / opts.chunkSize), 1)
    for (var offset = 0; offset < chunks; offset++) {
      this.chunks.push(new Chunk(this.uploader, this, offset))
    }
  },

  _measureSpeed: function (hard) {
    var averageSpeeds = 0
    var currentSpeeds = 0
    var num = 0
    this._eachAccess(function (file) {
      if (!file.paused && !file.error) {
        num += 1
        averageSpeeds += file.averageSpeed || 0
        currentSpeeds += file.currentSpeed || 0
      }
    }, function () {
      var timeSpan = Date.now() - this._lastProgressCallback
      if (!timeSpan) {
        return
      }
      var smoothingFactor = this.uploader.opts.speedSmoothingFactor
      var uploaded = this.sizeUploaded()
      // Prevent negative upload speed after file upload resume
      this.currentSpeed = Math.max((uploaded - this._prevUploadedSize) / timeSpan * 1000, 0)
      this.averageSpeed = smoothingFactor * this.currentSpeed + (1 - smoothingFactor) * this.averageSpeed
      this._prevUploadedSize = uploaded
    })
    if (this.isFolder) {
      if (num) {
        this.currentSpeed = currentSpeeds / num
        this.averageSpeed = averageSpeeds / num
      } else {
        this.currentSpeed = 0
        this.averageSpeed = 0
      }
    }
    if (this.parent && (hard || this.parent._checkProgress())) {
      this.parent._measureSpeed()
    }
  },

  _checkProgress: function (file) {
    return Date.now() - this._lastProgressCallback >= this.uploader.opts.progressCallbacksInterval
  },

  _chunkEvent: function (chunk, evt, message) {
    var uploader = this.uploader
    var STATUS = Chunk.STATUS
    var that = this
    var rootFile = this.getRoot()
    var triggerProgress = function (hard) {
      that._measureSpeed(hard)
      uploader._trigger('fileProgress', rootFile, that, chunk)
      that._lastProgressCallback = Date.now()
    }
    switch (evt) {
      case STATUS.PROGRESS:
        if (this._checkProgress()) {
          triggerProgress()
        }
        break
      case STATUS.ERROR:
        this._error()
        this.abort(true)
        uploader._trigger('fileError', rootFile, this, message, chunk)
        break
      case STATUS.SUCCESS:
        this._updateUploadedChunks(message, chunk)
        if (this.error) {
          return
        }
        clearTimeout(this._progeressId)
        this._progeressId = 0
        var timeDiff = Date.now() - this._lastProgressCallback
        if (timeDiff < uploader.opts.progressCallbacksInterval) {
          this._progeressId = setTimeout(triggerProgress, uploader.opts.progressCallbacksInterval - timeDiff)
        }
        if (this.isComplete()) {
          clearTimeout(this._progeressId)
          triggerProgress(true)
          this.currentSpeed = 0
          this.averageSpeed = 0
          uploader._trigger('fileSuccess', rootFile, this, message, chunk)
          if (rootFile.isComplete()) {
            uploader._trigger('fileComplete', rootFile, this)
          }
        } else if (!this._progeressId) {
          triggerProgress()
        }
        break
      case STATUS.RETRY:
        uploader._trigger('fileRetry', rootFile, this, chunk)
        break
    }
  },

  _updateUploadedChunks: function (message, chunk) {
    var checkChunkUploaded = this.uploader.opts.checkChunkUploadedByResponse
    if (checkChunkUploaded) {
      var xhr = chunk.xhr
      utils.each(this.chunks, function (_chunk) {
        if (!_chunk.tested) {
          var uploaded = checkChunkUploaded.call(this, _chunk, message)
          if (_chunk === chunk && !uploaded) {
            // fix the first chunk xhr status
            // treated as success but checkChunkUploaded is false
            // so the current chunk should be uploaded again
            _chunk.xhr = null
          }
          if (uploaded) {
            // first success and other chunks are uploaded
            // then set xhr, so the uploaded chunks
            // will be treated as success too
            _chunk.xhr = xhr
          }
          _chunk.tested = true
        }
      }, this)
      if (!this._firstResponse) {
        this._firstResponse = true
        this.uploader.upload(true)
      } else {
        this.uploader.uploadNextChunk()
      }
    } else {
      this.uploader.uploadNextChunk()
    }
  },

  _error: function () {
    this.error = this.allError = true
    var parent = this.parent
    while (parent && parent !== this.uploader) {
      parent._errorFiles.push(this)
      parent.error = true
      if (parent._errorFiles.length === parent.files.length) {
        parent.allError = true
      }
      parent = parent.parent
    }
  },

  _resetError: function () {
    this.error = this.allError = false
    var parent = this.parent
    var index = -1
    while (parent && parent !== this.uploader) {
      index = parent._errorFiles.indexOf(this)
      parent._errorFiles.splice(index, 1)
      parent.allError = false
      if (!parent._errorFiles.length) {
        parent.error = false
      }
      parent = parent.parent
    }
  },

  isComplete: function () {
    var outstanding = false
    this._eachAccess(function (file) {
      if (!file.isComplete()) {
        outstanding = true
        return false
      }
    }, function () {
      var STATUS = Chunk.STATUS
      utils.each(this.chunks, function (chunk) {
        var status = chunk.status()
        if (status === STATUS.PENDING || status === STATUS.UPLOADING || status === STATUS.READING || chunk.preprocessState === 1 || chunk.readState === 1) {
          outstanding = true
          return false
        }
      })
    })
    return !outstanding
  },

  isUploading: function () {
    var uploading = false
    this._eachAccess(function (file) {
      if (file.isUploading()) {
        uploading = true
        return false
      }
    }, function () {
      var uploadingStatus = Chunk.STATUS.UPLOADING
      utils.each(this.chunks, function (chunk) {
        if (chunk.status() === uploadingStatus) {
          uploading = true
          return false
        }
      })
    })
    return uploading
  },

  resume: function () {
    this._eachAccess(function (f) {
      f.resume()
    }, function () {
      this.paused = false
      this.aborted = false
      this.uploader.upload()
    })
    this.paused = false
    this.aborted = false
  },

  pause: function () {
    this._eachAccess(function (f) {
      f.pause()
    }, function () {
      this.paused = true
      this.abort()
    })
    this.paused = true
  },

  cancel: function () {
    this.uploader.removeFile(this)
  },

  retry: function (file) {
    var fileRetry = function (file) {
      if (file.error) {
        file.bootstrap()
      }
    }
    if (file) {
      file.bootstrap()
    } else {
      this._eachAccess(fileRetry, function () {
        this.bootstrap()
      })
    }
    this.uploader.upload()
  },

  abort: function (reset) {
    if (this.aborted) {
      return
    }
    this.currentSpeed = 0
    this.averageSpeed = 0
    this.aborted = !reset
    var chunks = this.chunks
    if (reset) {
      this.chunks = []
    }
    var uploadingStatus = Chunk.STATUS.UPLOADING
    utils.each(chunks, function (c) {
      if (c.status() === uploadingStatus) {
        c.abort()
        this.uploader.uploadNextChunk()
      }
    }, this)
  },

  progress: function () {
    var totalDone = 0
    var totalSize = 0
    var ret = 0
    this._eachAccess(function (file, index) {
      totalDone += file.progress() * file.size
      totalSize += file.size
      if (index === this.files.length - 1) {
        ret = totalSize > 0 ? totalDone / totalSize : this.isComplete() ? 1 : 0
      }
    }, function () {
      if (this.error) {
        ret = 1
        return
      }
      if (this.chunks.length === 1) {
        this._prevProgress = Math.max(this._prevProgress, this.chunks[0].progress())
        ret = this._prevProgress
        return
      }
      // Sum up progress across everything
      var bytesLoaded = 0
      utils.each(this.chunks, function (c) {
        // get chunk progress relative to entire file
        bytesLoaded += c.progress() * (c.endByte - c.startByte)
      })
      var percent = bytesLoaded / this.size
      // We don't want to lose percentages when an upload is paused
      this._prevProgress = Math.max(this._prevProgress, percent > 0.9999 ? 1 : percent)
      ret = this._prevProgress
    })
    return ret
  },

  getSize: function () {
    var size = 0
    this._eachAccess(function (file) {
      size += file.size
    }, function () {
      size += this.size
    })
    return size
  },

  getFormatSize: function () {
    var size = this.getSize()
    return utils.formatSize(size)
  },

  getRoot: function () {
    if (this.isRoot) {
      return this
    }
    var parent = this.parent
    while (parent) {
      if (parent.parent === this.uploader) {
        // find it
        return parent
      }
      parent = parent.parent
    }
    return this
  },

  sizeUploaded: function () {
    var size = 0
    this._eachAccess(function (file) {
      size += file.sizeUploaded()
    }, function () {
      utils.each(this.chunks, function (chunk) {
        size += chunk.sizeUploaded()
      })
    })
    return size
  },

  timeRemaining: function () {
    var ret = 0
    var sizeDelta = 0
    var averageSpeed = 0
    this._eachAccess(function (file, i) {
      if (!file.paused && !file.error) {
        sizeDelta += file.size - file.sizeUploaded()
        averageSpeed += file.averageSpeed
      }
      if (i === this.files.length - 1) {
        ret = calRet(sizeDelta, averageSpeed)
      }
    }, function () {
      if (this.paused || this.error) {
        ret = 0
        return
      }
      var delta = this.size - this.sizeUploaded()
      ret = calRet(delta, this.averageSpeed)
    })
    return ret
    function calRet (delta, averageSpeed) {
      if (delta && !averageSpeed) {
        return Number.POSITIVE_INFINITY
      }
      if (!delta && !averageSpeed) {
        return 0
      }
      return Math.floor(delta / averageSpeed)
    }
  },

  removeFile: function (file) {
    if (file.isFolder) {
      while (file.files.length) {
        var f = file.files[file.files.length - 1]
        this._removeFile(f)
      }
    }
    this._removeFile(file)
  },

  _delFilePath: function (file) {
    if (file.path && this.filePaths) {
      delete this.filePaths[file.path]
    }
    utils.each(file.fileList, function (file) {
      this._delFilePath(file)
    }, this)
  },

  _removeFile: function (file) {
    if (!file.isFolder) {
      utils.each(this.files, function (f, i) {
        if (f === file) {
          this.files.splice(i, 1)
          return false
        }
      }, this)
      file.abort()
      var parent = file.parent
      var newParent
      while (parent && parent !== this) {
        newParent = parent.parent
        parent._removeFile(file)
        parent = newParent
      }
    }
    file.parent === this && utils.each(this.fileList, function (f, i) {
      if (f === file) {
        this.fileList.splice(i, 1)
        return false
      }
    }, this)
    if (!this.isRoot && this.isFolder && !this.files.length) {
      this.parent._removeFile(this)
      this.uploader._delFilePath(this)
    }
    file.parent = null
  },

  getType: function () {
    if (this.isFolder) {
      return 'folder'
    }
    return this.file.type && this.file.type.split('/')[1]
  },

  getExtension: function () {
    if (this.isFolder) {
      return ''
    }
    return this.name.substr((~-this.name.lastIndexOf('.') >>> 0) + 2).toLowerCase()
  }

})

module.exports = File

function parsePaths (path) {
  var ret = []
  var paths = path.split('/')
  var len = paths.length
  var i = 1
  paths.splice(len - 1, 1)
  len--
  if (paths.length) {
    while (i <= len) {
      ret.push(paths.slice(0, i++).join('/') + '/')
    }
  }
  return ret
}


/***/ }),
/* 72 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (!_vm.support),
      expression: "!support"
    }],
    staticClass: "uploader-unsupport"
  }, [_vm._t("default", [_vm._m(0)])], 2)
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('p', [_vm._v("\n      Your browser, unfortunately, is not supported by Uploader.js. The library requires support for "), _c('a', {
    attrs: {
      "href": "http://www.w3.org/TR/FileAPI/"
    }
  }, [_vm._v("the HTML5 File API")]), _vm._v(" along with "), _c('a', {
    attrs: {
      "href": "http://www.w3.org/TR/FileAPI/#normalization-of-params"
    }
  }, [_vm._v("file slicing")]), _vm._v(".\n    ")])
}]}

/***/ }),
/* 73 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "uploader-list"
  }, [_vm._t("default", [_c('ul', _vm._l((_vm.fileList), function(file) {
    return _c('li', {
      key: file.id
    }, [_c('uploader-file', {
      attrs: {
        "file": file,
        "list": true
      }
    })], 1)
  }))], {
    fileList: _vm.fileList
  })], 2)
},staticRenderFns: []}

/***/ }),
/* 74 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "uploader-file",
    attrs: {
      "status": _vm.status
    }
  }, [_vm._t("default", [_c('div', {
    staticClass: "uploader-file-progress",
    class: _vm.progressingClass,
    style: (_vm.progressStyle)
  }), _vm._v(" "), _c('div', {
    staticClass: "uploader-file-info"
  }, [_c('div', {
    staticClass: "uploader-file-name"
  }, [_c('i', {
    staticClass: "uploader-file-icon",
    attrs: {
      "icon": _vm.fileCategory
    }
  }), _vm._v(_vm._s(_vm.file.name))]), _vm._v(" "), _c('div', {
    staticClass: "uploader-file-size"
  }, [_vm._v(_vm._s(_vm.formatedSize))]), _vm._v(" "), _c('div', {
    staticClass: "uploader-file-meta"
  }), _vm._v(" "), _c('div', {
    staticClass: "uploader-file-status"
  }, [_c('span', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.status !== 'uploading'),
      expression: "status !== 'uploading'"
    }]
  }, [_vm._v(_vm._s(_vm.statusText))]), _vm._v(" "), _c('span', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.status === 'uploading'),
      expression: "status === 'uploading'"
    }]
  }, [_c('span', [_vm._v(_vm._s(_vm.progressStyle.progress))]), _vm._v(" "), _c('em', [_vm._v(_vm._s(_vm.formatedAverageSpeed))]), _vm._v(" "), _c('i', [_vm._v(_vm._s(_vm.formatedTimeRemaining))])])]), _vm._v(" "), _c('div', {
    staticClass: "uploader-file-actions"
  }, [_c('span', {
    staticClass: "uploader-file-pause",
    on: {
      "click": _vm.pause
    }
  }), _vm._v(" "), _c('span', {
    staticClass: "uploader-file-resume",
    on: {
      "click": _vm.resume
    }
  }, [_vm._v("️")]), _vm._v(" "), _c('span', {
    staticClass: "uploader-file-retry",
    on: {
      "click": _vm.retry
    }
  }), _vm._v(" "), _c('span', {
    staticClass: "uploader-file-remove",
    on: {
      "click": _vm.remove
    }
  })])])], {
    file: _vm.file,
    list: _vm.list,
    status: _vm.status,
    paused: _vm.paused,
    error: _vm.error,
    response: _vm.response,
    averageSpeed: _vm.averageSpeed,
    formatedAverageSpeed: _vm.formatedAverageSpeed,
    currentSpeed: _vm.currentSpeed,
    isComplete: _vm.isComplete,
    isUploading: _vm.isUploading,
    size: _vm.size,
    formatedSize: _vm.formatedSize,
    uploadedSize: _vm.uploadedSize,
    progress: _vm.progress,
    progressStyle: _vm.progressStyle,
    progressingClass: _vm.progressingClass,
    timeRemaining: _vm.timeRemaining,
    formatedTimeRemaining: _vm.formatedTimeRemaining,
    type: _vm.type,
    extension: _vm.extension,
    fileCategory: _vm.fileCategory
  })], 2)
},staticRenderFns: []}

/***/ }),
/* 75 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "uploader"
  }, [_vm._t("default", [_c('uploader-unsupport'), _vm._v(" "), _c('uploader-drop', [_c('p', [_vm._v("Drop files here to upload or")]), _vm._v(" "), _c('uploader-btn', [_vm._v("select files")]), _vm._v(" "), _c('uploader-btn', {
    attrs: {
      "directory": true
    }
  }, [_vm._v("select folder")])], 1), _vm._v(" "), _c('uploader-list')], {
    files: _vm.files,
    fileList: _vm.fileList,
    started: _vm.started
  })], 2)
},staticRenderFns: []}

/***/ }),
/* 76 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.support),
      expression: "support"
    }],
    ref: "drop",
    staticClass: "uploader-drop",
    class: _vm.dropClass
  }, [_vm._t("default")], 2)
},staticRenderFns: []}

/***/ }),
/* 77 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "uploader-files"
  }, [_vm._t("default", [_c('ul', _vm._l((_vm.files), function(file) {
    return _c('li', {
      key: file.id
    }, [_c('uploader-file', {
      attrs: {
        "file": file
      }
    })], 1)
  }))], {
    files: _vm.files
  })], 2)
},staticRenderFns: []}

/***/ }),
/* 78 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('label', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.support),
      expression: "support"
    }],
    ref: "btn",
    staticClass: "uploader-btn"
  }, [_vm._t("default")], 2)
},staticRenderFns: []}

/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(63);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("524f9f74", content, true, {});

/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(64);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("0eeb8305", content, true, {});

/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(65);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("4e430fde", content, true, {});

/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(66);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("abf27b38", content, true, {});

/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(67);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("a80cc17e", content, true, {});

/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(68);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("202ffdee", content, true, {});

/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(69);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("49e3a141", content, true, {});

/***/ }),
/* 86 */
/***/ (function(module, exports) {

/**
 * Translates the list format produced by css-loader into something
 * easier to manipulate.
 */
module.exports = function listToStyles (parentId, list) {
  var styles = []
  var newStyles = {}
  for (var i = 0; i < list.length; i++) {
    var item = list[i]
    var id = item[0]
    var css = item[1]
    var media = item[2]
    var sourceMap = item[3]
    var part = {
      id: parentId + ':' + i,
      css: css,
      media: media,
      sourceMap: sourceMap
    }
    if (!newStyles[id]) {
      styles.push(newStyles[id] = { id: id, parts: [part] })
    } else {
      newStyles[id].parts.push(part)
    }
  }
  return styles
}


/***/ })
/******/ ]);
});
//# sourceMappingURL=vue-uploader.js.map