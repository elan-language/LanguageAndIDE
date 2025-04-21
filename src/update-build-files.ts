import { readFileSync, writeFileSync } from "node:fs";
import { elanVersion } from "./environment";
import { DefaultProfile } from "./frames/default-profile";
import { FileImpl } from "./frames/file-impl";
import { transforms } from "./frames/syntax-nodes/ast-helpers";
import { hash } from "./util";

function updateVersion() {
  const file = new FileImpl(hash, new DefaultProfile(), "guest", transforms(), true);
  file.setVersion(elanVersion.major, elanVersion.minor, elanVersion.patch, elanVersion.preRelease);

  const semver = file.getSemverString();

  const date = new Intl.DateTimeFormat("en-GB", {
    dateStyle: "long",
  }).format(new Date());

  const replacePhrase = "<!-- Insert new release here at the top of the table under the header-->";

  const tableEntry = `<tr><td>v${semver}</td><td>${date}</td><td><a href="/versions/Elan_v${semver}.zip">Download zip</a></td></tr>`;

  const versionFilePath = `${__dirname}/../../web-editor/version-history.html`;

  const versionFileContent = readFileSync(versionFilePath, "utf-8");

  if (!versionFileContent.includes(tableEntry)) {
    const newContent = versionFileContent.replace(
      replacePhrase,
      `${replacePhrase}
    ${tableEntry}`,
    );
    writeFileSync(versionFilePath, newContent);
  }

  const buildFilePath = `${__dirname}/../../src/build-version.txt`;
  writeFileSync(buildFilePath, semver);
}

updateVersion();
