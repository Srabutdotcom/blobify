import{whatis as e}from"https://raw.githubusercontent.com/Srabutdotcom/aid/master/whatis/dist/whatis.bundle.js";function r(r){const n=[...a(""+e(r)),...a(r)];return new Blob(n)}function a(e){let a,o=0;switch(typeof e){case"undefined":o=9,a=e;break;case"boolean":case"number":case"string":case"bigint":o=e.toString().length,a=e;break;case"symbol":o=e.description.length,a=e.description;break;case"object":a=null===e?e:function(e){const a=e?.constructor??Object;switch(a){case Blob:case DataView:case ArrayBuffer:case Int8Array:case Uint8Array:case Uint8ClampedArray:case Int16Array:case Uint16Array:case Int32Array:case Uint32Array:case Float32Array:case Float64Array:case BigInt64Array:case BigUint64Array:return e;case String:case Number:case Boolean:return function(e){const{tipe:r,data:a}=e;let n={};if(r==String)for(const e in a)isNaN(e)&&(n[e]=a[e]);else n={...a};return t([a.valueOf(),n])}({data:e,tipe:a});case Array:return t(e);case Object:return n(e);case Map:return function(e){const a=[],n=[...e.entries()];return a.push(r(n)),new Blob(a)}(e);default:return n(e)}}(e),o=null===e?4:a.size??a.length??a.byteLength;break;case"function":{const r=e.toString();a=r.includes("[native code]")?r.replace("[native code]",'return "native code"'):r,o=a.length;break}default:o=e.length??e.size,a=e}return[(""+o).length,o,a]}function n(e){const a=[];for(const n in e)a.push(r(n),r(e[n]));return new Blob(a)}function t(e){const a=[];for(const n of e)a.push(r(n));return new Blob(a)}async function o(e={blob:r,s:0,e:1,type:["text","blob","arrayBuffer"]}){const{blob:r,s:a=0,e:n=1,type:t="text"}=e;if(null==r)return{output:void 0,sliced:void 0,reminder:void 0};const o=r.slice(a,n),i=n===r.size?void 0:r.slice(n);return{output:await o[t](),sliced:o,reminder:i}}async function i(e){const{output:r,reminder:a}=await o({blob:e.blob}),{output:n,reminder:t}=await o({blob:a,e:+r});return await o({blob:t,e:+n,type:e.type})}async function c(e){const{output:r,reminder:a}=await i({blob:e}),{output:n,reminder:t,sliced:o}=await i({blob:a,type:s(r)});switch(r){case"null":return{blob:t,value:null};case"undefined":return{blob:t,value:void 0};case"boolean":return{blob:t,value:"true"===n};case"string":case"ArrayBuffer":default:return{blob:t,value:n};case"number":return{blob:t,value:+n};case"bigint":return{blob:t,value:BigInt(n)};case"symbol":return{blob:t,value:Symbol(n)};case"String":case"Number":case"Boolean":return await async function(e){const r={Boolean:e=>new Boolean(e),Number:e=>new Number(e),String:e=>new String(e)},{type:a}=e,{value:n,blob:t}=await u(e),o=r[a](n[0]);for(const e in n[1])o[e]=n[1][e];return{blob:t,value:o}}({blob:o,reminder:t,type:r});case"PublicKeyCredential":case"AuthenticatorAssertionResponse":case"Object":return await async function(e={}){if(void 0===e.blob)return{blob:void 0,value:{}};let r={},a="isNotDefinedYet",n=e.blob;do{const{value:e,blob:t}=await c(n);if(n=t,"isNotDefinedYet"!==a){const n={};n[a]=e,r={...r,...n},a="isNotDefinedYet"}else a=e}while(n&&n.size>0);return{blob:e.reminder,value:r}}({blob:o,reminder:t});case"Array":return await u({blob:o,reminder:t});case"Blob":return{blob:t,value:t};case"Int8Array":return{blob:t,value:new Int8Array(n)};case"Uint8Array":return{blob:t,value:new Uint8Array(n)};case"Uint8ClampedArray":return{blob:t,value:new Uint8ClampedArray(n)};case"Int16Array":return{blob:t,value:new Int16Array(n)};case"Uint16Array":return{blob:t,value:new Uint16Array(n)};case"Int32Array":return{blob:t,value:new Int32Array(n)};case"Uint32Array":return{blob:t,value:new Uint32Array(n)};case"Float32Array":return{blob:t,value:new Float32Array(n)};case"Float64Array":return{blob:t,value:new Float64Array(n)};case"BigInt64Array":return{blob:t,value:new BigInt64Array(n)};case"BigUint64Array":return{blob:t,value:new BigUint64Array(n)};case"DataView":return{blob:t,value:new DataView(n)};case"function":return{blob:t,value:Function("return "+n)()};case"Map":return await async function(e){const{value:r,blob:a}=await u(e);return{blob:e.reminder,value:new Map(...r)}}({blob:o,reminder:t})}}function s(e){switch(e){case"null":case"undefined":case"boolean":case"string":case"number":case"bigint":case"symbol":case"Object":case"Array":case"Blob":default:return"text";case"ArrayBuffer":case"Int8Array":case"Uint8Array":case"Uint8ClampedArray":case"Int16Array":case"Uint16Array":case"Int32Array":case"Uint32Array":case"Float32Array":case"Float64Array":case"BigInt64Array":case"BigUint64Array":return"arrayBuffer"}}async function u(e){const r=[];let a=e.blob;do{const{value:e,blob:n}=await c(a);a=n,r.push(e)}while(a&&a.size>0);return{blob:e.reminder,value:r}}async function l(e){const{value:r}=await c(e);return r}async function b(e,a){Deno.writeFileSync(e,new Uint8Array(await r(a).arrayBuffer()))}async function y(e){return await l(new Blob([Deno.readFileSync(e)]))}export{r as blobify,c as getValueBasedOnType,l as parseBlob,y as readBlob,b as writeBlob};
