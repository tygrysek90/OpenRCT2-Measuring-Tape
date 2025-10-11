import fs from "fs"

const inDir = "./img/"
const outFile = "./src/graphics/pluginGraphics.ts"

let files = fs.readdirSync(inDir)
let output: string

output = `import { createImageFromBase64 } from "../fx/createImageFromBase64"\n`
output += `export const pluginGraphics = {\n`

files.forEach(file => {
    output += `\t${file.slice(0,-4)}: createImageFromBase64("${(fs.readFileSync(`${inDir}/${file}`).toString("base64"))}"),\n`
});
output += `}\n`

fs.writeFileSync(outFile, output)

console.log(`Graphics to base64 done: ${files.length} files packed into "${outFile}"`)