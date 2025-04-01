import { elanVersion } from "../src/production";
import { getElanFiles, loadFileAsModelNew, updateTestFileNew } from "./testHelpers";

const dir = `${__dirname}\\..\\..\\demo_programs\\`;

async function updateDemoProgram(program: string) {
  const fileName = `${dir}${program}`;

  const file = await loadFileAsModelNew(fileName);

  file.setVersion(elanVersion.major, elanVersion.minor, elanVersion.patch, elanVersion.preRelease);
  
  const updatedContent = await file.renderAsSource(); 

  updateTestFileNew(fileName, updatedContent);
}

const files = getElanFiles(dir);

for (const fn of files) {
  updateDemoProgram(fn);
}


