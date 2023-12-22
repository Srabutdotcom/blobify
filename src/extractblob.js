async function blobSlicer(data = { blob, s: 0, e: 1, type: ['text', 'blob', 'arrayBuffer'] }) {
   const { blob, s = 0, e = 1, type = 'text' } = data;
   if (blob == undefined) { return { output: undefined, sliced: undefined, reminder: undefined }}
   const sliced = blob.slice(s, e);
   const reminder = e === blob.size ? undefined : blob.slice(e);

   return {
      output: await sliced[type](),
      sliced,
      reminder
   }
}

async function getValueFromBlob(data) {
   const { output: bitLength, reminder: r0 } = await blobSlicer({ blob: data.blob });
   const { output: valueLength, reminder: r1 } = await blobSlicer({ blob: r0, e: +bitLength });
   return await blobSlicer({ blob: r1, e: +valueLength, type: data.type });
}

export async function getValueBasedOnType(data) {
   const { output: type, reminder: r0 } = await getValueFromBlob({ blob: data });
   const { output: value, reminder: r1, sliced } = await getValueFromBlob({ blob: r0, type: getBlobOutputType(type) });
   //debugger;
   switch (type) {
      case 'null': return { blob: r1, value: null }
      case 'undefined': return { blob: r1, value: undefined }
      case 'boolean': return { blob: r1, value: (value === 'true') }
      case 'string': return { blob: r1, value }
      case 'number': return { blob: r1, value: +value }
      case 'bigint': return { blob: r1, value: BigInt(value) }
      case 'symbol': return { blob: r1, value: Symbol(value) }
      case 'String':
      case 'Number':
      case 'Boolean': return await getPrimitiveObjectFromBlob({ blob: sliced, reminder: r1, type })
      case 'PublicKeyCredential':
      case 'AuthenticatorAssertionResponse':
      case 'Object': return await getObjectFromBlob({ blob: sliced, reminder: r1 })
      case 'Array': return await getArrayFromBlob({ blob: sliced, reminder: r1 })
      case 'Blob': return { blob: r1, value: r1 }
      case 'ArrayBuffer': return { blob: r1, value }
      case 'Int8Array': return { blob: r1, value: new Int8Array(value) }
      case 'Uint8Array': return { blob: r1, value: new Uint8Array(value) }
      case 'Uint8ClampedArray': return { blob: r1, value: new Uint8ClampedArray(value) }
      case 'Int16Array': return { blob: r1, value: new Int16Array(value) }
      case 'Uint16Array': return { blob: r1, value: new Uint16Array(value) }
      case 'Int32Array': return { blob: r1, value: new Int32Array(value) }
      case 'Uint32Array': return { blob: r1, value: new Uint32Array(value) }
      case 'Float32Array': return { blob: r1, value: new Float32Array(value) }
      case 'Float64Array': return { blob: r1, value: new Float64Array(value) }
      case 'BigInt64Array': return { blob: r1, value: new BigInt64Array(value) }
      case 'BigUint64Array': return { blob: r1, value: new BigUint64Array(value) }
      case 'DataView': return { blob: r1, value: new DataView(value) }
      case 'function': return { blob: r1, value: Function('return ' + value)() }
      case 'Map' : return await getMapFromBlob({ blob: sliced, reminder: r1 })
      default: return { blob: r1, value }
   }
}

function getBlobOutputType(type) {
   switch (type) {
      case 'null':
      case 'undefined':
      case 'boolean':
      case 'string':
      case 'number':
      case 'bigint':
      case 'symbol':
      case 'Object':
      case 'Array':
      case 'Blob': return 'text'
      case 'ArrayBuffer':
      case 'Int8Array':
      case 'Uint8Array':
      case 'Uint8ClampedArray':
      case 'Int16Array':
      case 'Uint16Array':
      case 'Int32Array':
      case 'Uint32Array':
      case 'Float32Array':
      case 'Float64Array':
      case 'BigInt64Array':
      case 'BigUint64Array': return 'arrayBuffer'
      default: return 'text'
   }
}

async function getObjectFromBlob(data = {}) {
   if(data.blob===undefined){return {blob:undefined,value:{}}}
   let obj = {}
   let key = 'isNotDefinedYet';
   let _blobO = data.blob
   do {
      const { value, blob } = await getValueBasedOnType(_blobO)
      _blobO = blob
      if (key === 'isNotDefinedYet') {
         key = value; continue;
      } else {
         const _o = {}
         _o[key] = value
         obj = { ...obj, ..._o }
         key = 'isNotDefinedYet'
      }
   } while ((_blobO && _blobO.size > 0));
   return { blob: data.reminder, value: obj }
}

async function getArrayFromBlob(data) {
   const arr = []
   let _blobO = data.blob
   do {
      const { value, blob } = await getValueBasedOnType(_blobO)
      _blobO = blob
      arr.push(value)
   } while ((_blobO && _blobO.size > 0));
   return { blob: data.reminder, value: arr }
}

async function getMapFromBlob(data) {
   const { value, blob } = await getArrayFromBlob(data)
   return { blob: data.reminder, value: new Map(...value) }
}

async function getPrimitiveObjectFromBlob(data) {
   const typeObject = { //NOTE - we have to convert it using respective Object 
      Boolean: (v)=>new Boolean(v),
      Number: (v)=>new Number(v),
      String: (v)=>new String(v)
   }
   const { type } = data
   
   // value[0] is the primitive value
   // value[1] is object
   const { value, blob } = await getArrayFromBlob(data);
   const _object = typeObject[type](value[0])
   
   for(const e in value[1]){
      _object[e] = value[1][e]
   }
   return { blob, value: _object}
}
/**
 * 
 * @param {Blob} blob 
 * @returns 
 */
export async function parseBlob(blob) {
   const { value } = await getValueBasedOnType(blob)
   return value;
}