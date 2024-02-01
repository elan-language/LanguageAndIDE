import { TextFieldHolder } from "./TextFieldHolder";
import { Global } from "./globals/global";

// Defines view of File from the internal (model) perspective, c.f. FileAPI for external (editor) view
export interface File extends TextFieldHolder {
    addGlobalBefore(g: Global, before: Global): void;
    addMainBefore(global: Global): void;
    addFunctionBefore(global: Global): void;
    addProcedureBefore(global: Global): void;
    addEnumBefore(global: Global): void;
    addClassBefore(global: Global): void;
    addGlobalCommentBefore(global: Global): void;
    addConstantBefore(global: Global): void;
}