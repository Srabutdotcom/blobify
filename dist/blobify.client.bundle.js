import{whatis as e}from"https://raw.githubusercontent.com/Srabutdotcom/aid/master/whatis/dist/whatis.bundle.js";function r(r){const t=[...a(""+e(r)),...a(r)];return new Blob(t)}function a(e){let a,o=0;switch(typeof e){case"undefined":o=9,a=e;break;case"boolean":case"number":case"string":case"bigint":o=e.toString().length,a=e;break;case"symbol":o=e.description.length,a=e.description;break;case"object":a=null===e?e:function(e){const a=e?.constructor??Object;switch(a){case Blob:case DataView:case ArrayBuffer:case Int8Array:case Uint8Array:case Uint8ClampedArray:case Int16Array:case Uint16Array:case Int32Array:case Uint32Array:case Float32Array:case Float64Array:case BigInt64Array:case BigUint64Array:return e;case String:case Number:case Boolean:return function(e){const{tipe:r,data:a}=e;let t={};if(r==String)for(const e in a)isNaN(e)&&(t[e]=a[e]);else t={...a};return n([a.valueOf(),t])}({data:e,tipe:a});case Array:return n(e);case Object:return t(e);case Map:return function(e){const a=[],t=[...e.entries()];return a.push(r(t)),new Blob(a)}(e);default:return t(e)}}(e),o=null===e?4:a.size??a.length??a.byteLength;break;case"function":{const r=e.toString();a=r.includes("[native code]")?r.replace("[native code]",'return "native code"'):r,o=a.length;break}default:o=e.length??e.size,a=e}return[(""+o).length,o,a]}function t(e){const a=[];for(const t in e)a.push(r(t),r(e[t]));return new Blob(a)}function n(e){const a=[];for(const t of e)a.push(r(t));return new Blob(a)}async function o(e={blob:r,s:0,e:1,type:["text","blob","arrayBuffer"]}){const{blob:r,s:a=0,e:t=1,type:n="text"}=e;if(null==r)return{output:void 0,sliced:void 0,reminder:void 0};const o=r.slice(a,t),s=t===r.size?void 0:r.slice(t);return{output:await o[n](),sliced:o,reminder:s}}async function s(e){const{output:r,reminder:a}=await o({blob:e.blob}),{output:t,reminder:n}=await o({blob:a,e:+r});return await o({blob:n,e:+t,type:e.type})}async function c(e){const{output:r,reminder:a}=await s({blob:e}),{output:t,reminder:n,sliced:o}=await s({blob:a,type:i(r)});switch(r){case"null":return{blob:n,value:null};case"undefined":return{blob:n,value:void 0};case"boolean":return{blob:n,value:"true"===t};case"string":case"ArrayBuffer":default:return{blob:n,value:t};case"number":return{blob:n,value:+t};case"bigint":return{blob:n,value:BigInt(t)};case"symbol":return{blob:n,value:Symbol(t)};case"String":case"Number":case"Boolean":return await async function(e){const r={Boolean:e=>new Boolean(e),Number:e=>new Number(e),String:e=>new String(e)},{type:a}=e,{value:t,blob:n}=await u(e),o=r[a](t[0]);for(const e in t[1])o[e]=t[1][e];return{blob:n,value:o}}({blob:o,reminder:n,type:r});case"PublicKeyCredential":case"AuthenticatorAssertionResponse":case"Object":return await async function(e={}){if(void 0===e.blob)return{blob:void 0,value:{}};let r={},a="isNotDefinedYet",t=e.blob;do{const{value:e,blob:n}=await c(t);if(t=n,"isNotDefinedYet"!==a){const t={};t[a]=e,r={...r,...t},a="isNotDefinedYet"}else a=e}while(t&&t.size>0);return{blob:e.reminder,value:r}}({blob:o,reminder:n});case"Array":return await u({blob:o,reminder:n});case"Blob":return{blob:n,value:n};case"Int8Array":return{blob:n,value:new Int8Array(t)};case"Uint8Array":return{blob:n,value:new Uint8Array(t)};case"Uint8ClampedArray":return{blob:n,value:new Uint8ClampedArray(t)};case"Int16Array":return{blob:n,value:new Int16Array(t)};case"Uint16Array":return{blob:n,value:new Uint16Array(t)};case"Int32Array":return{blob:n,value:new Int32Array(t)};case"Uint32Array":return{blob:n,value:new Uint32Array(t)};case"Float32Array":return{blob:n,value:new Float32Array(t)};case"Float64Array":return{blob:n,value:new Float64Array(t)};case"BigInt64Array":return{blob:n,value:new BigInt64Array(t)};case"BigUint64Array":return{blob:n,value:new BigUint64Array(t)};case"DataView":return{blob:n,value:new DataView(t)};case"function":return{blob:n,value:Function("return "+t)()};case"Map":return await async function(e){const{value:r,blob:a}=await u(e);return{blob:e.reminder,value:new Map(...r)}}({blob:o,reminder:n})}}function i(e){switch(e){case"null":case"undefined":case"boolean":case"string":case"number":case"bigint":case"symbol":case"Object":case"Array":case"Blob":default:return"text";case"ArrayBuffer":case"Int8Array":case"Uint8Array":case"Uint8ClampedArray":case"Int16Array":case"Uint16Array":case"Int32Array":case"Uint32Array":case"Float32Array":case"Float64Array":case"BigInt64Array":case"BigUint64Array":return"arrayBuffer"}}async function u(e){const r=[];let a=e.blob;do{const{value:e,blob:t}=await c(a);a=t,r.push(e)}while(a&&a.size>0);return{blob:e.reminder,value:r}}async function l(e){const{value:r}=await c(e);return r}export{r as blobify,c as getValueBasedOnType,l as parseBlob};
