import { loadFileAsModelNew, updateTestFileNew } from "./testHelpers";


async function updateDemoProgram(program: string) {
  const fn = `${__dirname}\\..\\..\\demo_programs\\${program}`;

  const f = await loadFileAsModelNew(fn);
  
  const updated = await f.renderAsSource(); 

  updateTestFileNew(fn, updated);
}

updateDemoProgram("best-fit.elan");