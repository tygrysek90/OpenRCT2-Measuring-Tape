import fs from "fs"
import chalk from 'chalk';


const inDir = "./img/"
const outFile = "./src/graphics/pluginGraphics.ts"

let files = fs.readdirSync(inDir)
let output: string

output = `import { createImageFromBase64 } from "../fx/createImageFromBase64"\n`
output += `export const pluginGraphics = {\n`

files.forEach(file => {
    if (file.length > 4 && file.slice(-3) == "png") {
        output += `\t${file.slice(0,-4)}: createImageFromBase64("${(fs.readFileSync(`${inDir}/${file}`).toString("base64"))}"),\n`
        console.log(chalk.cyanBright("Processed " + chalk.bold(`${inDir}${file}`)))
    }
    else {
        console.log(chalk.magentaBright(`Skipping ${inDir}${file}`))
    }
});
output += `}\n`

fs.writeFileSync(outFile, output)

console.log(chalk.bold(chalk.greenBright(`Graphics to base64 done: ${files.length} files packed into "${outFile}"\n`)))