import { Language } from "../../ide/frames/frame-interfaces/language";
import { LanguageRefLang } from "../../ide/frames/language-ref-lang";
import { SymbolType } from "../compiler-interfaces/symbol-type";
import { noTypeOptions } from "../compiler-interfaces/type-options";
import { TerminalSymbol } from "../syntax-nodes/terminal-symbol";

export class GenericParameterType implements SymbolType {
  constructor(
    public id: string,
    public constraint?: SymbolType,
  ) {}

  languageSpecificName(language: Language): string {
    const terminal = LanguageRefLang.Instance.mapTerminal(this.name);
    return terminal === TerminalSymbol.Unknown ? this.name : language.mapTerminalSymbol(terminal);
  }

  typeOptions = noTypeOptions;

  initialValue = "";

  get name() {
    return this.constraint ? `${this.constraint.name}` : `Generic Parameter ${this.id}`;
  }

  toString() {
    return this.name;
  }

  isAssignableFrom(otherType: SymbolType): boolean {
    if (otherType instanceof GenericParameterType) {
      return this.name === otherType.name;
    }
    return false;
  }
}
