(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["clientes~dispositivos~feedbacks~garantias~marcas~modelos~servico~statusgarantia~statusordem~tecnicos"],{"0a06":function(t,e,n){"use strict";var r=n("c532"),o=n("30b5"),i=n("f6b4"),s=n("5270"),a=n("4a7b");function u(t){this.defaults=t,this.interceptors={request:new i,response:new i}}u.prototype.request=function(t){"string"===typeof t?(t=arguments[1]||{},t.url=arguments[0]):t=t||{},t=a(this.defaults,t),t.method?t.method=t.method.toLowerCase():this.defaults.method?t.method=this.defaults.method.toLowerCase():t.method="get";var e=[s,void 0],n=Promise.resolve(t);this.interceptors.request.forEach((function(t){e.unshift(t.fulfilled,t.rejected)})),this.interceptors.response.forEach((function(t){e.push(t.fulfilled,t.rejected)}));while(e.length)n=n.then(e.shift(),e.shift());return n},u.prototype.getUri=function(t){return t=a(this.defaults,t),o(t.url,t.params,t.paramsSerializer).replace(/^\?/,"")},r.forEach(["delete","get","head","options"],(function(t){u.prototype[t]=function(e,n){return this.request(r.merge(n||{},{method:t,url:e}))}})),r.forEach(["post","put","patch"],(function(t){u.prototype[t]=function(e,n,o){return this.request(r.merge(o||{},{method:t,url:e,data:n}))}})),t.exports=u},"0df6":function(t,e,n){"use strict";t.exports=function(t){return function(e){return t.apply(null,e)}}},"1d2b":function(t,e,n){"use strict";t.exports=function(t,e){return function(){for(var n=new Array(arguments.length),r=0;r<n.length;r++)n[r]=arguments[r];return t.apply(e,n)}}},2444:function(t,e,n){"use strict";(function(e){var r=n("c532"),o=n("c8af"),i={"Content-Type":"application/x-www-form-urlencoded"};function s(t,e){!r.isUndefined(t)&&r.isUndefined(t["Content-Type"])&&(t["Content-Type"]=e)}function a(){var t;return("undefined"!==typeof XMLHttpRequest||"undefined"!==typeof e&&"[object process]"===Object.prototype.toString.call(e))&&(t=n("b50d")),t}var u={adapter:a(),transformRequest:[function(t,e){return o(e,"Accept"),o(e,"Content-Type"),r.isFormData(t)||r.isArrayBuffer(t)||r.isBuffer(t)||r.isStream(t)||r.isFile(t)||r.isBlob(t)?t:r.isArrayBufferView(t)?t.buffer:r.isURLSearchParams(t)?(s(e,"application/x-www-form-urlencoded;charset=utf-8"),t.toString()):r.isObject(t)?(s(e,"application/json;charset=utf-8"),JSON.stringify(t)):t}],transformResponse:[function(t){if("string"===typeof t)try{t=JSON.parse(t)}catch(e){}return t}],timeout:0,xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN",maxContentLength:-1,validateStatus:function(t){return t>=200&&t<300},headers:{common:{Accept:"application/json, text/plain, */*"}}};r.forEach(["delete","get","head"],(function(t){u.headers[t]={}})),r.forEach(["post","put","patch"],(function(t){u.headers[t]=r.merge(i)})),t.exports=u}).call(this,n("4362"))},"2d83":function(t,e,n){"use strict";var r=n("387f");t.exports=function(t,e,n,o,i){var s=new Error(t);return r(s,e,n,o,i)}},"2e67":function(t,e,n){"use strict";t.exports=function(t){return!(!t||!t.__CANCEL__)}},"30b5":function(t,e,n){"use strict";var r=n("c532");function o(t){return encodeURIComponent(t).replace(/%40/gi,"@").replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,"+").replace(/%5B/gi,"[").replace(/%5D/gi,"]")}t.exports=function(t,e,n){if(!e)return t;var i;if(n)i=n(e);else if(r.isURLSearchParams(e))i=e.toString();else{var s=[];r.forEach(e,(function(t,e){null!==t&&"undefined"!==typeof t&&(r.isArray(t)?e+="[]":t=[t],r.forEach(t,(function(t){r.isDate(t)?t=t.toISOString():r.isObject(t)&&(t=JSON.stringify(t)),s.push(o(e)+"="+o(t))})))})),i=s.join("&")}if(i){var a=t.indexOf("#");-1!==a&&(t=t.slice(0,a)),t+=(-1===t.indexOf("?")?"?":"&")+i}return t}},"387f":function(t,e,n){"use strict";t.exports=function(t,e,n,r,o){return t.config=e,n&&(t.code=n),t.request=r,t.response=o,t.isAxiosError=!0,t.toJSON=function(){return{message:this.message,name:this.name,description:this.description,number:this.number,fileName:this.fileName,lineNumber:this.lineNumber,columnNumber:this.columnNumber,stack:this.stack,config:this.config,code:this.code}},t}},3934:function(t,e,n){"use strict";var r=n("c532");t.exports=r.isStandardBrowserEnv()?function(){var t,e=/(msie|trident)/i.test(navigator.userAgent),n=document.createElement("a");function o(t){var r=t;return e&&(n.setAttribute("href",r),r=n.href),n.setAttribute("href",r),{href:n.href,protocol:n.protocol?n.protocol.replace(/:$/,""):"",host:n.host,search:n.search?n.search.replace(/^\?/,""):"",hash:n.hash?n.hash.replace(/^#/,""):"",hostname:n.hostname,port:n.port,pathname:"/"===n.pathname.charAt(0)?n.pathname:"/"+n.pathname}}return t=o(window.location.href),function(e){var n=r.isString(e)?o(e):e;return n.protocol===t.protocol&&n.host===t.host}}():function(){return function(){return!0}}()},4362:function(t,e,n){e.nextTick=function(t){var e=Array.prototype.slice.call(arguments);e.shift(),setTimeout((function(){t.apply(null,e)}),0)},e.platform=e.arch=e.execPath=e.title="browser",e.pid=1,e.browser=!0,e.env={},e.argv=[],e.binding=function(t){throw new Error("No such module. (Possibly not yet loaded)")},function(){var t,r="/";e.cwd=function(){return r},e.chdir=function(e){t||(t=n("df7c")),r=t.resolve(e,r)}}(),e.exit=e.kill=e.umask=e.dlopen=e.uptime=e.memoryUsage=e.uvCounters=function(){},e.features={}},"467f":function(t,e,n){"use strict";var r=n("2d83");t.exports=function(t,e,n){var o=n.config.validateStatus;!o||o(n.status)?t(n):e(r("Request failed with status code "+n.status,n.config,null,n.request,n))}},"4a7b":function(t,e,n){"use strict";var r=n("c532");t.exports=function(t,e){e=e||{};var n={},o=["url","method","params","data"],i=["headers","auth","proxy"],s=["baseURL","url","transformRequest","transformResponse","paramsSerializer","timeout","withCredentials","adapter","responseType","xsrfCookieName","xsrfHeaderName","onUploadProgress","onDownloadProgress","maxContentLength","validateStatus","maxRedirects","httpAgent","httpsAgent","cancelToken","socketPath"];r.forEach(o,(function(t){"undefined"!==typeof e[t]&&(n[t]=e[t])})),r.forEach(i,(function(o){r.isObject(e[o])?n[o]=r.deepMerge(t[o],e[o]):"undefined"!==typeof e[o]?n[o]=e[o]:r.isObject(t[o])?n[o]=r.deepMerge(t[o]):"undefined"!==typeof t[o]&&(n[o]=t[o])})),r.forEach(s,(function(r){"undefined"!==typeof e[r]?n[r]=e[r]:"undefined"!==typeof t[r]&&(n[r]=t[r])}));var a=o.concat(i).concat(s),u=Object.keys(e).filter((function(t){return-1===a.indexOf(t)}));return r.forEach(u,(function(r){"undefined"!==typeof e[r]?n[r]=e[r]:"undefined"!==typeof t[r]&&(n[r]=t[r])})),n}},"4bd4":function(t,e,n){"use strict";n("4de4"),n("7db0"),n("4160"),n("caad"),n("07ac"),n("2532"),n("159b");var r=n("5530"),o=n("58df"),i=n("7e2b"),s=n("3206");e["a"]=Object(o["a"])(i["a"],Object(s["b"])("form")).extend({name:"v-form",provide:function(){return{form:this}},inheritAttrs:!1,props:{disabled:Boolean,lazyValidation:Boolean,readonly:Boolean,value:Boolean},data:function(){return{inputs:[],watchers:[],errorBag:{}}},watch:{errorBag:{handler:function(t){var e=Object.values(t).includes(!0);this.$emit("input",!e)},deep:!0,immediate:!0}},methods:{watchInput:function(t){var e=this,n=function(t){return t.$watch("hasError",(function(n){e.$set(e.errorBag,t._uid,n)}),{immediate:!0})},r={_uid:t._uid,valid:function(){},shouldValidate:function(){}};return this.lazyValidation?r.shouldValidate=t.$watch("shouldValidate",(function(o){o&&(e.errorBag.hasOwnProperty(t._uid)||(r.valid=n(t)))})):r.valid=n(t),r},validate:function(){return 0===this.inputs.filter((function(t){return!t.validate(!0)})).length},reset:function(){this.inputs.forEach((function(t){return t.reset()})),this.resetErrorBag()},resetErrorBag:function(){var t=this;this.lazyValidation&&setTimeout((function(){t.errorBag={}}),0)},resetValidation:function(){this.inputs.forEach((function(t){return t.resetValidation()})),this.resetErrorBag()},register:function(t){this.inputs.push(t),this.watchers.push(this.watchInput(t))},unregister:function(t){var e=this.inputs.find((function(e){return e._uid===t._uid}));if(e){var n=this.watchers.find((function(t){return t._uid===e._uid}));n&&(n.valid(),n.shouldValidate()),this.watchers=this.watchers.filter((function(t){return t._uid!==e._uid})),this.inputs=this.inputs.filter((function(t){return t._uid!==e._uid})),this.$delete(this.errorBag,e._uid)}}},render:function(t){var e=this;return t("form",{staticClass:"v-form",attrs:Object(r["a"])({novalidate:!0},this.attrs$),on:{submit:function(t){return e.$emit("submit",t)}}},this.$slots.default)}})},5270:function(t,e,n){"use strict";var r=n("c532"),o=n("c401"),i=n("2e67"),s=n("2444");function a(t){t.cancelToken&&t.cancelToken.throwIfRequested()}t.exports=function(t){a(t),t.headers=t.headers||{},t.data=o(t.data,t.headers,t.transformRequest),t.headers=r.merge(t.headers.common||{},t.headers[t.method]||{},t.headers),r.forEach(["delete","get","head","post","put","patch","common"],(function(e){delete t.headers[e]}));var e=t.adapter||s.adapter;return e(t).then((function(e){return a(t),e.data=o(e.data,e.headers,t.transformResponse),e}),(function(e){return i(e)||(a(t),e&&e.response&&(e.response.data=o(e.response.data,e.response.headers,t.transformResponse))),Promise.reject(e)}))}},"7a77":function(t,e,n){"use strict";function r(t){this.message=t}r.prototype.toString=function(){return"Cancel"+(this.message?": "+this.message:"")},r.prototype.__CANCEL__=!0,t.exports=r},"7aac":function(t,e,n){"use strict";var r=n("c532");t.exports=r.isStandardBrowserEnv()?function(){return{write:function(t,e,n,o,i,s){var a=[];a.push(t+"="+encodeURIComponent(e)),r.isNumber(n)&&a.push("expires="+new Date(n).toGMTString()),r.isString(o)&&a.push("path="+o),r.isString(i)&&a.push("domain="+i),!0===s&&a.push("secure"),document.cookie=a.join("; ")},read:function(t){var e=document.cookie.match(new RegExp("(^|;\\s*)("+t+")=([^;]*)"));return e?decodeURIComponent(e[3]):null},remove:function(t){this.write(t,"",Date.now()-864e5)}}}():function(){return{write:function(){},read:function(){return null},remove:function(){}}}()},"83b9":function(t,e,n){"use strict";var r=n("d925"),o=n("e683");t.exports=function(t,e){return t&&!r(e)?o(t,e):e}},"8df4":function(t,e,n){"use strict";var r=n("7a77");function o(t){if("function"!==typeof t)throw new TypeError("executor must be a function.");var e;this.promise=new Promise((function(t){e=t}));var n=this;t((function(t){n.reason||(n.reason=new r(t),e(n.reason))}))}o.prototype.throwIfRequested=function(){if(this.reason)throw this.reason},o.source=function(){var t,e=new o((function(e){t=e}));return{token:e,cancel:t}},t.exports=o},b50d:function(t,e,n){"use strict";var r=n("c532"),o=n("467f"),i=n("30b5"),s=n("83b9"),a=n("c345"),u=n("3934"),c=n("2d83");t.exports=function(t){return new Promise((function(e,f){var l=t.data,h=t.headers;r.isFormData(l)&&delete h["Content-Type"];var d=new XMLHttpRequest;if(t.auth){var p=t.auth.username||"",m=t.auth.password||"";h.Authorization="Basic "+btoa(p+":"+m)}var v=s(t.baseURL,t.url);if(d.open(t.method.toUpperCase(),i(v,t.params,t.paramsSerializer),!0),d.timeout=t.timeout,d.onreadystatechange=function(){if(d&&4===d.readyState&&(0!==d.status||d.responseURL&&0===d.responseURL.indexOf("file:"))){var n="getAllResponseHeaders"in d?a(d.getAllResponseHeaders()):null,r=t.responseType&&"text"!==t.responseType?d.response:d.responseText,i={data:r,status:d.status,statusText:d.statusText,headers:n,config:t,request:d};o(e,f,i),d=null}},d.onabort=function(){d&&(f(c("Request aborted",t,"ECONNABORTED",d)),d=null)},d.onerror=function(){f(c("Network Error",t,null,d)),d=null},d.ontimeout=function(){var e="timeout of "+t.timeout+"ms exceeded";t.timeoutErrorMessage&&(e=t.timeoutErrorMessage),f(c(e,t,"ECONNABORTED",d)),d=null},r.isStandardBrowserEnv()){var g=n("7aac"),b=(t.withCredentials||u(v))&&t.xsrfCookieName?g.read(t.xsrfCookieName):void 0;b&&(h[t.xsrfHeaderName]=b)}if("setRequestHeader"in d&&r.forEach(h,(function(t,e){"undefined"===typeof l&&"content-type"===e.toLowerCase()?delete h[e]:d.setRequestHeader(e,t)})),r.isUndefined(t.withCredentials)||(d.withCredentials=!!t.withCredentials),t.responseType)try{d.responseType=t.responseType}catch(y){if("json"!==t.responseType)throw y}"function"===typeof t.onDownloadProgress&&d.addEventListener("progress",t.onDownloadProgress),"function"===typeof t.onUploadProgress&&d.upload&&d.upload.addEventListener("progress",t.onUploadProgress),t.cancelToken&&t.cancelToken.promise.then((function(t){d&&(d.abort(),f(t),d=null)})),void 0===l&&(l=null),d.send(l)}))}},bc3a:function(t,e,n){t.exports=n("cee4")},c345:function(t,e,n){"use strict";var r=n("c532"),o=["age","authorization","content-length","content-type","etag","expires","from","host","if-modified-since","if-unmodified-since","last-modified","location","max-forwards","proxy-authorization","referer","retry-after","user-agent"];t.exports=function(t){var e,n,i,s={};return t?(r.forEach(t.split("\n"),(function(t){if(i=t.indexOf(":"),e=r.trim(t.substr(0,i)).toLowerCase(),n=r.trim(t.substr(i+1)),e){if(s[e]&&o.indexOf(e)>=0)return;s[e]="set-cookie"===e?(s[e]?s[e]:[]).concat([n]):s[e]?s[e]+", "+n:n}})),s):s}},c401:function(t,e,n){"use strict";var r=n("c532");t.exports=function(t,e,n){return r.forEach(n,(function(n){t=n(t,e)})),t}},c532:function(t,e,n){"use strict";var r=n("1d2b"),o=Object.prototype.toString;function i(t){return"[object Array]"===o.call(t)}function s(t){return"undefined"===typeof t}function a(t){return null!==t&&!s(t)&&null!==t.constructor&&!s(t.constructor)&&"function"===typeof t.constructor.isBuffer&&t.constructor.isBuffer(t)}function u(t){return"[object ArrayBuffer]"===o.call(t)}function c(t){return"undefined"!==typeof FormData&&t instanceof FormData}function f(t){var e;return e="undefined"!==typeof ArrayBuffer&&ArrayBuffer.isView?ArrayBuffer.isView(t):t&&t.buffer&&t.buffer instanceof ArrayBuffer,e}function l(t){return"string"===typeof t}function h(t){return"number"===typeof t}function d(t){return null!==t&&"object"===typeof t}function p(t){return"[object Date]"===o.call(t)}function m(t){return"[object File]"===o.call(t)}function v(t){return"[object Blob]"===o.call(t)}function g(t){return"[object Function]"===o.call(t)}function b(t){return d(t)&&g(t.pipe)}function y(t){return"undefined"!==typeof URLSearchParams&&t instanceof URLSearchParams}function w(t){return t.replace(/^\s*/,"").replace(/\s*$/,"")}function x(){return("undefined"===typeof navigator||"ReactNative"!==navigator.product&&"NativeScript"!==navigator.product&&"NS"!==navigator.product)&&("undefined"!==typeof window&&"undefined"!==typeof document)}function j(t,e){if(null!==t&&"undefined"!==typeof t)if("object"!==typeof t&&(t=[t]),i(t))for(var n=0,r=t.length;n<r;n++)e.call(null,t[n],n,t);else for(var o in t)Object.prototype.hasOwnProperty.call(t,o)&&e.call(null,t[o],o,t)}function O(){var t={};function e(e,n){"object"===typeof t[n]&&"object"===typeof e?t[n]=O(t[n],e):t[n]=e}for(var n=0,r=arguments.length;n<r;n++)j(arguments[n],e);return t}function k(){var t={};function e(e,n){"object"===typeof t[n]&&"object"===typeof e?t[n]=k(t[n],e):t[n]="object"===typeof e?k({},e):e}for(var n=0,r=arguments.length;n<r;n++)j(arguments[n],e);return t}function E(t,e,n){return j(e,(function(e,o){t[o]=n&&"function"===typeof e?r(e,n):e})),t}t.exports={isArray:i,isArrayBuffer:u,isBuffer:a,isFormData:c,isArrayBufferView:f,isString:l,isNumber:h,isObject:d,isUndefined:s,isDate:p,isFile:m,isBlob:v,isFunction:g,isStream:b,isURLSearchParams:y,isStandardBrowserEnv:x,forEach:j,merge:O,deepMerge:k,extend:E,trim:w}},c8af:function(t,e,n){"use strict";var r=n("c532");t.exports=function(t,e){r.forEach(t,(function(n,r){r!==e&&r.toUpperCase()===e.toUpperCase()&&(t[e]=n,delete t[r])}))}},cee4:function(t,e,n){"use strict";var r=n("c532"),o=n("1d2b"),i=n("0a06"),s=n("4a7b"),a=n("2444");function u(t){var e=new i(t),n=o(i.prototype.request,e);return r.extend(n,i.prototype,e),r.extend(n,e),n}var c=u(a);c.Axios=i,c.create=function(t){return u(s(c.defaults,t))},c.Cancel=n("7a77"),c.CancelToken=n("8df4"),c.isCancel=n("2e67"),c.all=function(t){return Promise.all(t)},c.spread=n("0df6"),t.exports=c,t.exports.default=c},d925:function(t,e,n){"use strict";t.exports=function(t){return/^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(t)}},de4f:function(t,e,n){"use strict";n.d(e,"a",(function(){return g}));n("b64b");var r=n("53ca"),o=n("d4ec"),i=n("bee2"),s=n("257e"),a=n("262e"),u=n("2caf"),c=n("ade3"),f=(n("99af"),n("ac1f"),n("5319"),n("bc3a")),l=n.n(f),h=l.a.create({baseURL:"https://ats-backend-spring.herokuapp.com/",timeout:1e5,transformResponse:[function(t){return t}]}),d=h,p=function(){function t(e){Object(o["a"])(this,t),this.options=e}return Object(i["a"])(t,null,[{key:"build",value:function(t){return new this(t)}}]),t}(),m=function(t){Object(a["a"])(n,t);var e=Object(u["a"])(n);function n(t){var r,i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},s=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null;return Object(o["a"])(this,n),r=e.call(this,i),r.path=t,r.http=s||d,r}return Object(i["a"])(n,[{key:"get",value:function(t){return this.http.get(this.constructor.normalize(this.path,t)).then(this.constructor.then)}},{key:"post",value:function(t,e){return this.http.post(this.constructor.normalize(this.path,t),e).then(this.constructor.then)}},{key:"put",value:function(t,e){return this.http.put(this.constructor.normalize(this.path,t),e).then(this.constructor.then)}},{key:"patch",value:function(t,e){return this.http.patch(this.constructor.normalize(this.path,t),e).then(this.constructor.then)}},{key:"delete",value:function(t){return this.http.delete(this.constructor.normalize(this.path,t)).then(this.constructor.then)}}],[{key:"build",value:function(t,e){return new this(t,e)}},{key:"then",value:function(t){return t.data?"string"===typeof t.data?JSON.parse(t.data):t.data:{}}},{key:"normalize",value:function(t,e){return"".concat(t,"/").concat(e).replace(/([^:]\/)\/+/g,"$1")}}]),n}(p),v=function(t){Object(a["a"])(n,t);var e=Object(u["a"])(n);function n(){return Object(o["a"])(this,n),e.apply(this,arguments)}return Object(i["a"])(n,null,[{key:"build",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null;return new this(n.normalize(n.base,t),e,r)}}]),n}(m);Object(c["a"])(v,"base","/api/v1");var g=function(t){Object(a["a"])(n,t);var e=Object(u["a"])(n);function n(t){var r,i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null;return Object(o["a"])(this,n),r=e.call(this,n.normalize(n.base,t),i,a),Object(c["a"])(Object(s["a"])(r),"id","id"),r}return Object(i["a"])(n,[{key:"create",value:function(t){return this.post("",t)}},{key:"read",value:function(t){return this.get("/".concat(this.getId(t)))}},{key:"update",value:function(t){return this.patch("/".concat(this.getId(t)),t)}},{key:"destroy",value:function(t){return this.delete("/".concat(this.getId(t)))}},{key:"search",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},e="";return 0===Object.keys(t).length&&t.constructor===Object||(e=t),this.get("".concat(e)).then((function(t){return{rows:t}}))}},{key:"getId",value:function(t){return"object"===Object(r["a"])(t)?t[this.id]:String(t)}}],[{key:"build",value:function(){return new this(this.resource)}}]),n}(v);Object(c["a"])(g,"resource","")},df7c:function(t,e,n){(function(t){function n(t,e){for(var n=0,r=t.length-1;r>=0;r--){var o=t[r];"."===o?t.splice(r,1):".."===o?(t.splice(r,1),n++):n&&(t.splice(r,1),n--)}if(e)for(;n--;n)t.unshift("..");return t}function r(t){"string"!==typeof t&&(t+="");var e,n=0,r=-1,o=!0;for(e=t.length-1;e>=0;--e)if(47===t.charCodeAt(e)){if(!o){n=e+1;break}}else-1===r&&(o=!1,r=e+1);return-1===r?"":t.slice(n,r)}function o(t,e){if(t.filter)return t.filter(e);for(var n=[],r=0;r<t.length;r++)e(t[r],r,t)&&n.push(t[r]);return n}e.resolve=function(){for(var e="",r=!1,i=arguments.length-1;i>=-1&&!r;i--){var s=i>=0?arguments[i]:t.cwd();if("string"!==typeof s)throw new TypeError("Arguments to path.resolve must be strings");s&&(e=s+"/"+e,r="/"===s.charAt(0))}return e=n(o(e.split("/"),(function(t){return!!t})),!r).join("/"),(r?"/":"")+e||"."},e.normalize=function(t){var r=e.isAbsolute(t),s="/"===i(t,-1);return t=n(o(t.split("/"),(function(t){return!!t})),!r).join("/"),t||r||(t="."),t&&s&&(t+="/"),(r?"/":"")+t},e.isAbsolute=function(t){return"/"===t.charAt(0)},e.join=function(){var t=Array.prototype.slice.call(arguments,0);return e.normalize(o(t,(function(t,e){if("string"!==typeof t)throw new TypeError("Arguments to path.join must be strings");return t})).join("/"))},e.relative=function(t,n){function r(t){for(var e=0;e<t.length;e++)if(""!==t[e])break;for(var n=t.length-1;n>=0;n--)if(""!==t[n])break;return e>n?[]:t.slice(e,n-e+1)}t=e.resolve(t).substr(1),n=e.resolve(n).substr(1);for(var o=r(t.split("/")),i=r(n.split("/")),s=Math.min(o.length,i.length),a=s,u=0;u<s;u++)if(o[u]!==i[u]){a=u;break}var c=[];for(u=a;u<o.length;u++)c.push("..");return c=c.concat(i.slice(a)),c.join("/")},e.sep="/",e.delimiter=":",e.dirname=function(t){if("string"!==typeof t&&(t+=""),0===t.length)return".";for(var e=t.charCodeAt(0),n=47===e,r=-1,o=!0,i=t.length-1;i>=1;--i)if(e=t.charCodeAt(i),47===e){if(!o){r=i;break}}else o=!1;return-1===r?n?"/":".":n&&1===r?"/":t.slice(0,r)},e.basename=function(t,e){var n=r(t);return e&&n.substr(-1*e.length)===e&&(n=n.substr(0,n.length-e.length)),n},e.extname=function(t){"string"!==typeof t&&(t+="");for(var e=-1,n=0,r=-1,o=!0,i=0,s=t.length-1;s>=0;--s){var a=t.charCodeAt(s);if(47!==a)-1===r&&(o=!1,r=s+1),46===a?-1===e?e=s:1!==i&&(i=1):-1!==e&&(i=-1);else if(!o){n=s+1;break}}return-1===e||-1===r||0===i||1===i&&e===r-1&&e===n+1?"":t.slice(e,r)};var i="b"==="ab".substr(-1)?function(t,e,n){return t.substr(e,n)}:function(t,e,n){return e<0&&(e=t.length+e),t.substr(e,n)}}).call(this,n("4362"))},e683:function(t,e,n){"use strict";t.exports=function(t,e){return e?t.replace(/\/+$/,"")+"/"+e.replace(/^\/+/,""):t}},f6b4:function(t,e,n){"use strict";var r=n("c532");function o(){this.handlers=[]}o.prototype.use=function(t,e){return this.handlers.push({fulfilled:t,rejected:e}),this.handlers.length-1},o.prototype.eject=function(t){this.handlers[t]&&(this.handlers[t]=null)},o.prototype.forEach=function(t){r.forEach(this.handlers,(function(e){null!==e&&t(e)}))},t.exports=o}}]);
//# sourceMappingURL=clientes~dispositivos~feedbacks~garantias~marcas~modelos~servico~statusgarantia~statusordem~tecnicos.ea69e007.js.map