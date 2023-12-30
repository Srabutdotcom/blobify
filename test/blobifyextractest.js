import { blobify, parseBlob } from "../src/mod.client.js";

const assertion = {
   id: 'KclyB9MNlg-pu0LhqqHeq2sPyAAQ_CFpxII2QXDOJ4U',
   rawId: new Uint8Array(Array.from('41,201,114,7,211,13,150,15,169,187,66,225,170,161,222,171,107,15,200,0,16,252,33,105,196,130,54,65,112,206,39,133'.split(','))),
   type: 'public-key',
   response: {
      authenticatorData: new Uint8Array(Array.from('73,150,13,229,136,14,140,104,116,52,23,15,100,118,96,91,143,228,174,185,162,134,50,199,153,92,243,186,131,29,151,99,5,0,0,0,80'.split(','))),
      clientDataJSON: new Uint8Array(Array.from('123,34,116,121,112,101,34,58,34,119,101,98,97,117,116,104,110,46,103,101,116,34,44,34,99,104,97,108,108,101,110,103,101,34,58,34,99,109,70,117,90,71,57,116,85,51,82,121,97,87,53,110,82,110,74,118,98,86,78,108,99,110,90,108,99,103,34,44,34,111,114,105,103,105,110,34,58,34,104,116,116,112,115,58,47,47,108,111,99,97,108,104,111,115,116,58,52,48,48,49,34,44,34,99,114,111,115,115,79,114,105,103,105,110,34,58,102,97,108,115,101,125'.split(','))),
      userHandle: new Uint8Array(Array.from('56,57,52,98,102,99,102,56,45,101,51,57,54,45,52,52,52,51,45,56,52,50,52,45,102,51,49,101,54,56,55,101,56,97,50,51'.split(','))),
   }
}


console.log('string')
const string = blobify('string');
const _string = await parseBlob(string );

console.log('number')
const number = blobify(121);
const _number = await parseBlob(number);

console.log('boolean')
const bool = blobify(false);
const _bool = await parseBlob(bool);

console.log('bigint')
const bigint = blobify(121n);
const _bigint = await parseBlob( bigint );

console.log('null');
const nu = blobify(null);
const _nu = await parseBlob(nu );

console.log('undefined')
const undef = blobify(undefined);
const _undef = await parseBlob( undef );

console.log('NaN')
const nan = blobify(NaN);
const _nan = await parseBlob( nan );

console.log('Infinity')
const infinite = blobify(Infinity);
const _infinite = await parseBlob( infinite );

console.log('symbol')
const sym = blobify(Symbol('b'));
const _sym = await parseBlob(sym );

console.log('Boolean');
const Bool = new Boolean(true);
Bool['a']="yes"
const Boolbify = blobify(Bool);
const _Bool = await parseBlob(Boolbify);

console.log('String');
const Strg = new String('String Neh');
Strg['str']="yes this is String"
const Strbify = blobify(Strg);
const _String = await parseBlob(Strbify);

console.log('Number');
const Num = new Number(150);
Num['num']="yes this is Number"
const Numbify = blobify(Num);
const _Number = await parseBlob(Numbify);

console.log('Object')
const Obj = blobify({ a: 10, b: 'stri', c: { 'd': 100n } });
const _Obj = await parseBlob(Obj); 

console.log('function')
const Func = blobify(function bb(x){return x*5});
const _Func = await parseBlob(Func); 

console.log('Array')
const Arr = blobify([1,'2',null]);
const _Arr = await parseBlob(Arr ); 

console.log('assertion')
const assert = blobify(assertion);
const _assert = await parseBlob(assert); 

debugger;