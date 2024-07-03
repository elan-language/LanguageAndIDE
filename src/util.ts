import { createHash } from "node:crypto";

export function getNonce() {
  let text = "";
  const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i < 32; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

export function hash(toHash: string) {
  const hash = createHash("sha256");
  hash.update(toHash);
  return Promise.resolve(hash.digest("hex"));
}
