import * as vscode from "vscode";
import { assertFileParsesNew } from "./testHelpers";

suite("File Parsing Tests", () => {
  vscode.window.showInformationMessage("Start all unit tests.");

  test("parse Frames - merge-sort", async () => {
    await assertFileParsesNew(`${__dirname}\\files\\programs\\merge-sort.elan`);
  });
  test("parse Frames - snake", async () => {
    await assertFileParsesNew(`${__dirname}\\files\\programs\\snake OOP.elan`);
  });
  test("parse Frames - wordle-solver", async () => {
    await assertFileParsesNew(`${__dirname}\\files\\programs\\wordle-solver.elan`);
  });
  test("parse Frames - life", async () => {
    await assertFileParsesNew(`${__dirname}\\files\\programs\\life.elan`);
  });
  test("parse Frames - best-fit", async () => {
    await assertFileParsesNew(`${__dirname}\\files\\programs\\best-fit.elan`);
  });
  test("parse Frames - binary-search", async () => {
    await assertFileParsesNew(`${__dirname}\\files\\programs\\binary-search.elan`);
  });
  test("parse Frames - cards", async () => {
    await assertFileParsesNew(`${__dirname}\\files\\programs\\cards.elan`);
  });
});
