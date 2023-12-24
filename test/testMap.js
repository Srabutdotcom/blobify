import { blobify, parseBlob } from '../src/mod.js';

console.log('map')
const map = blobify(new Map([
   ['name', 'John Doe'],
   ['age', 30],
   ['occupation', 'Software Engineer'],
 ]));
const _map = await parseBlob(map); 
console.log('map testing')