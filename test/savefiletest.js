import { blobify } from "../blobify.js";
import { parseBlob } from "../extractblob.js";
import { writeBlob, readBlob } from "../savefile.js";

const data = [
   ['js','application/javascript'],
   ['css','application/css']
]

await writeBlob('./serv/library/tofromblob/test/test.file',data)

const r = await readBlob('./serv/library/tofromblob/test/test.file')

debugger;