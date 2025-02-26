// TODO gradually move functions into here and refactor

import { Profile } from "../frames/interfaces/profile";
import { Transforms } from "../frames/interfaces/transforms";
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

export function fetchProfile() {
  if (window.location.protocol === "file:") {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const localProfile = (window as any).localProfile as Profile;
    return localProfile ? Promise.resolve(localProfile) : Promise.reject();
  } else {
    const jsonProfile = `profile.json`;
    return fetch(jsonProfile, { mode: "same-origin" })
      .then((f) => f.json())
      .then((j) => j as Profile);
  }
}
