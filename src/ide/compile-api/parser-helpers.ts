import { CharStream, CommonTokenStream } from "antlr4ng";
import { Scope } from "../../compiler/compiler-interfaces/scope";
import { Elan2Lexer } from "../../generated/elan2/Elan2Lexer";
import { Elan2Parser } from "../../generated/elan2/Elan2Parser";
import { PythonLexer } from "../../generated/python/PythonLexer";
import { PythonParser } from "../../generated/python/PythonParser";
import { Language } from "../frames/frame-interfaces/language";
import { PythonVisitorCompiler } from "./python-visitor-compiler";
import { PythonVisitorHtml } from "./python-visitor-html";
import { PythonVisitorSource } from "./python-visitor-source";
import { RefLangVisitorHtml } from "./ref-lang--visitor-html";
import { RefLangVisitorCompiler } from "./ref-lang-visitor-compiler";
import { RefLangVisitorSource } from "./ref-lang-visitor-source";

export function getPythonParser(input: string) {
  const chars = CharStream.fromString(input);
  const lexer = new PythonLexer(chars);
  const tokens = new CommonTokenStream(lexer);
  const parser = new PythonParser(tokens);
  return parser;
}

export function getRefLangParser(input: string) {
  const chars = CharStream.fromString(input);
  const lexer = new Elan2Lexer(chars);
  const tokens = new CommonTokenStream(lexer);
  const parser = new Elan2Parser(tokens);
  return parser;
}

export function getParserByLanguage(l: Language, input: string) {
  switch (l.languageFullName) {
    case "Python":
      return getPythonParser(input);
    case "Reference Language":
      return getRefLangParser(input);
    default:
      return undefined;
  }
}

export function getVisitorCompilerByLanguage(l: Language, fieldId: string, scope: Scope) {
  switch (l.languageFullName) {
    case "Python":
      return new PythonVisitorCompiler(l, scope, fieldId);
    case "Reference Language":
      return new RefLangVisitorCompiler(l, scope, fieldId);
    default:
      return undefined;
  }
}

export function getVisitorHtmlByLanguage(l: Language) {
  switch (l.languageFullName) {
    case "Python":
      return new PythonVisitorHtml(l);
    case "Reference Language":
      return new RefLangVisitorHtml(l);
    default:
      return undefined;
  }
}

export function getVisitorSourceByLanguage(l: Language) {
  switch (l.languageFullName) {
    case "Python":
      return new PythonVisitorSource();
    case "Reference Language":
      return new RefLangVisitorSource();
    default:
      return undefined;
  }
}
