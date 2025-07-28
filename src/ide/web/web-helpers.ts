import { ElanRuntimeError } from "../../compiler/standard-library/elan-runtime-error";
import { transform, transformMany } from "../../compiler/syntax-nodes/ast-visitor";
import { DefaultProfile } from "../frames/default-profile";
import { DefaultUserConfig } from "../frames/default-user-config";
import { Profile } from "../frames/frame-interfaces/profile";
import { Transforms } from "../frames/frame-interfaces/transforms";
import { UserConfig } from "../frames/frame-interfaces/user-config";

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

export async function fetchUserConfig(): Promise<UserConfig> {
  // for the moment no user config
  // const jsonUserConfig = `userConfig.json`;
  // try {
  //   const f = await fetch(jsonUserConfig, { mode: "same-origin" });
  //   const j = await f.json();
  //   return j as UserConfig;
  // } catch {
  //   console.warn("user config not found");
  return new DefaultUserConfig();
  //}
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
  if (/<[A-Za-z!\/?][^>]*$/.test(text)) {
    throw new ElanRuntimeError(
      "Unclosed HTML tag in printed text '" + text.replace(/</g, "&lt;") + "'",
    );
  }
}

export function mayBeHtml(text: string) {
  return /<.*>/.test(text);
}

export function sanitiseHtml(text: string) {
  return text.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
}

export function encodeCode(code: string) {
  const bytes = new TextEncoder().encode(code);
  const binCode = Array.from(bytes, (byte) => String.fromCodePoint(byte)).join("");
  return "data:text/javascript;base64," + btoa(binCode);
}
