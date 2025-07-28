import { readFileSync, writeFileSync } from "node:fs";
import { elanVersion } from "../environment";
import { transforms } from "../compiler/syntax-nodes/ast-helpers";
import { DefaultProfile } from "../ide/frames/default-profile";
import { FileImpl } from "../ide/frames/file-impl";
import { hash } from "../ide/util";
import { StdLib } from "../compiler/standard-library/std-lib";
import { StubInputOutput } from "../ide/stub-input-output";

function updateVersion() {
  const rootdir = `${__dirname}/../../..`;

  const file = new FileImpl(
    hash,
    new DefaultProfile(),
    "guest",
    transforms(),
    new StdLib(new StubInputOutput()),
    true,
  );
  file.setVersion(elanVersion.major, elanVersion.minor, elanVersion.patch, elanVersion.preRelease);

  const semver = file.getSemverString();

  const date = new Intl.DateTimeFormat("en-GB", {
    dateStyle: "long",
  }).format(new Date());

  const replacePhrase = "<!-- Insert new release here at the top of the table under the header-->";

  const zipFileName = `Elan_v${semver}.zip`;

  const tableEntry = `<tr><td>v${semver}</td><td>${date}</td><td><a href="/versions/${zipFileName}">Download zip</a></td></tr>`;

  const versionFilePath = `${rootdir}/src/ide/web-content/version-history.html`;

  const versionFileContent = readFileSync(versionFilePath, "utf-8");

  if (!versionFileContent.includes(zipFileName)) {
    const newContent = versionFileContent.replace(
      replacePhrase,
      `${replacePhrase}
    ${tableEntry}`,
    );
    writeFileSync(versionFilePath, newContent);
  }

  const buildFilePath = `${rootdir}/src/ide/build-version.txt`;
  writeFileSync(buildFilePath, semver);
}

updateVersion();
