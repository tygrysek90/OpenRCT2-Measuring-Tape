import fs from "fs"


const inDir = "./img/"
const outDir = "./src/imgs/"


fs.readdir(inDir, (err, files) => {
  if (err)
    console.log(err);
  else {
    files.forEach(file => {
      fs.readFile(`${inDir}/${file}`, (err, data) => {
    if (err) throw err;
    let base64Image = Buffer.from(data, 'binary').toString('base64');
    fs.writeFileSync(`${outDir}${file.slice(0,-4)}.ts`, 
    `import { createImageFromBase64 } from "../fx/createImageFromBase64" \n const ${file.slice(0,-4)}_png = "${base64Image}" \n export const ${file.slice(0,-4)}Png = createImageFromBase64(${file.slice(0,-4)}_png)`)
    console.log(`Wrote ${outDir}${file}.ts`)
        });
    })
  }
})

