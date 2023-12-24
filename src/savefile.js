import { blobify } from "./blobify.js";
import { parseBlob } from "./parseblob.js";

export async function writeBlob(path, data){
   Deno.writeFileSync(path, new Uint8Array(await blobify(data).arrayBuffer()))
}

export async function readBlob(path){
   return await parseBlob(new Blob([Deno.readFileSync(path)]))
}
