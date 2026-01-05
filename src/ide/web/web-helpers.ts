import { ElanRuntimeError } from "../../compiler/standard-library/elan-runtime-error";
import { transform, transformMany } from "../compile-api/ast-visitor";
import { Transforms } from "../compile-api/transforms";
import { DefaultProfile } from "../frames/default-profile";
import { Profile } from "../frames/frame-interfaces/profile";

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
