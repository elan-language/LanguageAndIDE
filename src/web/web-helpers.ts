import { ElanRuntimeError } from "../elan-runtime-error";
import { DefaultProfile } from "../frames/default-profile";
import { DefaultUserConfig } from "../frames/default-user-config";
import { Profile } from "../frames/interfaces/profile";
import { Transforms } from "../frames/interfaces/transforms";
import { UserConfig } from "../frames/interfaces/user-config";
import { transform, transformMany } from "../frames/syntax-nodes/ast-visitor";

export async function hash(toHash: string) {
  const msgUint8 = new TextEncoder().encode(toHash); // encode as (utf-8) Uint8Array
  const hashBuffer = await crypto.subtle.digest("SHA-256", msgUint8); // hash the message
  const hashArray = Array.from(new Uint8Array(hashBuffer)); // convert buffer to byte array
  const hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join(""); // convert bytes to hex string
  return hashHex;
}

export function transforms() {
  return {
    transform: transform,
    transformMany: transformMany,
  } as Transforms;
}

export async function fetchUserConfig() {
  const jsonUserConfig = `userConfig.json`;
  try {
    const f = await fetch(jsonUserConfig, { mode: "same-origin" });
    const j = await f.json();
    return j as UserConfig;
  } catch {
    console.warn("user config not found");
    return new DefaultUserConfig();
  }
}

export async function fetchDefaultProfile() {
  try {
    const jsonProfile = `./profiles/default.json`;
    const f = await fetch(jsonProfile, { mode: "same-origin" });
    const j = await f.json();
    return j as Profile;
  } catch {
    console.warn("default profile not found");
    return new DefaultProfile();
  }
}

export async function fetchProfile(name: string) {
  try {
    const f = await fetch(`./profiles/${name}.json`, { mode: "same-origin" });
    const j = await f.json();
    return j as Profile;
  } catch {
    console.warn(`${name} profile not found`);
    return new DefaultProfile();
  }
}

export function checkForUnclosedHtmlTag(text: string) {
  // Detect any "<" not followed eventually by a ">"
  // which makes all subsequent output not visible.
  // The regexp picks out some surrounding text without newlines.
  // The error message must not contain newlines
  // because the second and subsequent lines of the error message are taken as stack trace.
  const matches = text.match(/(.{0,20}<[A-Za-z!\/?][^>\n]{0,20})[^>]*$/);
  if (matches) {
    throw new ElanRuntimeError(
      "Unclosed HTML tag in printed text '" + matches[1].replace(/</g, "&lt;") + "'",
    );
  }
}
