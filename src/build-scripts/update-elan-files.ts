import { readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { StdLib } from "../compiler/standard-library/std-lib";
import { elanVersion } from "../environment";
import { transform, transformMany } from "../ide/compile-api/ast-visitor";
import { Transforms } from "../ide/compile-api/transforms";
import { CodeSourceFromString } from "../ide/frames/code-source-from-string";
import { DefaultProfile } from "../ide/frames/default-profile";
import { FileImpl } from "../ide/frames/file-impl";
import { ParseMode } from "../ide/frames/frame-interfaces/file";
import { StubInputOutput } from "../ide/stub-input-output";
import { hash } from "../ide/util";

const rootdir = `${__dirname}/../../..`;

function transforms(): Transforms {
  return {
    transform: transform,
    transformMany: transformMany,
  };
}

function loadFileAsSourceNew(sourceFile: string): string {
  return readFileSync(sourceFile, "utf-8");
}

function updateTestFileNew(testDoc: string, newContent: string) {
  writeFileSync(testDoc, newContent);
}

function getElanFiles(sourceDir: string): string[] {
  return readdirSync(sourceDir).filter((s) => s.endsWith(".elan"));
}

async function loadFileAsModelNew(sourceFile: string): Promise<FileImpl> {
  const source = loadFileAsSourceNew(sourceFile);
  const codeSource = new CodeSourceFromString(source);
  const fl = new FileImpl(
    hash,
    new DefaultProfile(),
    "guest",
    transforms(),
    new StdLib(new StubInputOutput()),
    true,
  );
  codeSource.mode = ParseMode.loadNew;
  await fl.parseFrom(codeSource);
  if (fl.parseError) {
    throw new Error(`${sourceFile}: ${fl.parseError}`);
  }
  return fl;
}

async function updateDemoProgram(fileName: string) {
  const file = await loadFileAsModelNew(fileName);

  file.setVersion(elanVersion.major, elanVersion.minor, elanVersion.patch, elanVersion.preRelease);

  const updatedContent = await file.renderAsSource();

  updateTestFileNew(fileName, updatedContent);
}

export function getElanFilesSubdir(sourceDir: string): string[] {
  return readdirSync(sourceDir).filter((s) => statSync(sourceDir + "/" + s).isDirectory());
}

export async function updateElanFilesInDirectory(dir: string) {
  for (const fn of getElanFiles(dir)) {
    await updateDemoProgram(`${dir}${fn}`);
  }

  for (const sd of getElanFilesSubdir(dir)) {
    await updateElanFilesInDirectory(`${dir}${sd}/`);
  }
}

updateElanFilesInDirectory(`${rootdir}/src/`);
updateElanFilesInDirectory(`${rootdir}/test/`);
