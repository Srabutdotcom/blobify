import { blobify } from "./blobify.js";
import { parseBlob } from "./extractblob.js";

const blob = blobify([
   ['js','application/javascript'],
   ['css','application/css']
])

Deno.writeFileSync('./serv/library/tofromblob/test.file', new Uint8Array(await blob.arrayBuffer()))

debugger;
const r = Deno.readFileSync('./serv/library/tofromblob/test.file');
const blob2 = new Blob([r]);
const s = await parseBlob(blob2)

debugger;