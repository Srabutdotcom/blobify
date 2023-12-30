const url = import.meta.url;
import { writeBlob, readBlob } from "../src/savefile.js";

const data = [
   ['js','application/javascript'],
   ['css','application/css'],
   ['jpg', 'image/jpg']
]
debugger;
const path = new URL('test.file', url)

await writeBlob(path,data)

const r = await readBlob(path)

debugger;