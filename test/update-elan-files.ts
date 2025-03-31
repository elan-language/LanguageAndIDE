import { loadFileAsModelNew, updateTestFileNew } from "./testHelpers";


async function updateDemoProgram(program: string) {
  const fileName = `${__dirname}\\..\\..\\demo_programs\\${program}`;

  const file = await loadFileAsModelNew(fileName);

  file.setVersion("Elan Beta 10");
  
  const updatedContent = await file.renderAsSource(); 

  updateTestFileNew(fileName, updatedContent);
}

updateDemoProgram("best-fit.elan");