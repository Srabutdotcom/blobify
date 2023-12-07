import { blobify } from "../blobify.js";
import { parseBlob } from "../extractblob.js";

console.log('map')
const map = blobify(new Map([
   ['name', 'John Doe'],
   ['age', 30],
   ['occupation', 'Software Engineer'],
 ]));
const _map = await parseBlob(map); 
debugger;