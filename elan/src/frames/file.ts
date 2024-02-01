import { Global } from "./globals/global";

// Defines view of File from the internal (model) perspective, c.f. FileAPI for external (editor) view
export interface File {
    addGlobalBefore(g: Global, before: Global): void;
}