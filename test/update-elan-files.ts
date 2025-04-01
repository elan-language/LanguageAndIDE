import { getElanFiles, loadFileAsModelNew, updateTestFileNew } from "./testHelpers";

const dir = `${__dirname}\\..\\..\\demo_programs\\`;

async function updateDemoProgram(program: string) {
  const fileName = `${dir}${program}`;

  const file = await loadFileAsModelNew(fileName);

  file.setVersion(9, 0, 0, "Beta");
  
  const updatedContent = await file.renderAsSource(); 

  updateTestFileNew(fileName, updatedContent);
}

const files = getElanFiles(dir);

for (const fn of files) {
  updateDemoProgram(fn);
}


