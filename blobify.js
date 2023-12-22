/* function typeofData(data){
   const tipeOf = data === null ? 'null' : typeof data
   switch (tipeOf) {
      case 'object':
         return data?.constructor?.name ?? 'Object'// Module namespace doesn't have constructor, it is object anyway
      default:
         return tipeOf
   }
}
 */
import { whatis } from "https://raw.githubusercontent.com/Srabutdotcom/aids/master/whatis/whatis.js";

export function blobify(data) {
   const init = [...arrayfyData(whatis(data)), ...arrayfyData(data)];
   return new Blob(init);
}

function arrayfyData(data) {
   let l = 0, value;
   const t = typeof data

   switch (t) {
      case 'undefined':
         l = 9; value = data;
         break;
      case 'boolean':
      case 'number':
      case 'string':
      case 'bigint': {
         l = data.toString().length; value = data;
         break;
      }
      case 'symbol': {
         l = data.description.length;
         value = data.description
         break;
      }
      case 'object': {
         value = null === data ? data : blobifyObject(data)
         l = null === data ? 4 : (value.size ?? value.length ?? value.byteLength);//debugger;
         break;
      }
      case 'function': {
         const str = data.toString()
         value = str.includes('[native code]')?str.replace("[native code]",'return "native code"'):str;
         l = value.length;
         break;
      }
      default:
         l = data.length ?? data.size;
         value = data;
         break;
   }
   return [('' + l).length, l, value]
}

function blobifyObject(data) {
   const tipe = data?.constructor ?? Object
   
   switch (tipe) {
      // TODO: other type can be added here
      /*  case 'PublicKeyCredential': {
           return blobifyPublicKeyCredential(data)
       } */
      case Blob:
      case DataView:
      case ArrayBuffer:
      case Int8Array:
      case Uint8Array:
      case Uint8ClampedArray:
      case Int16Array:
      case Uint16Array:
      case Int32Array:
      case Uint32Array:
      case Float32Array:
      case Float64Array:
      case BigInt64Array:
      case BigUint64Array: return data
      case String: 
      case Number:
      case Boolean: return primitiveObject({data:data,tipe})
      case Array : return walkArray(data)
      case Object: return walkObject(data)
      case Map: return walkMap(data)
      /* case PublicKeyCredential:
      case AuthenticatorAssertionResponse: */
      default: return walkObject(data)
   }
}

function walkObject(data) {
   const init = [/* ...arrayfyData(data?.constructor.name ?? 'Object') */]
   for (const k in data) {
      init.push(blobify(k), blobify(data[k]));
   }
   return new Blob(init);
}

function walkArray(data){
   const init = []
   for(const a of data){
      init.push(blobify(a))
   }
   return new Blob(init)
}

function walkMap(data){
   const init = []
   const array = [...data.entries()];
   init.push(blobify(array))
   return new Blob(init)
}

function primitiveObject(data){
   const { tipe, data:_data } = data;
   let _obj ={}
   if(tipe==String){
      for(const e in _data){
         if(isNaN(e))_obj[e] = _data[e]
      }
   } else {
      _obj = {..._data}
   }
    
   return walkArray([_data.valueOf(),_obj])
}
