import { CodeSource } from "../code-source";
import { Frame } from "../interfaces/frame";
import { Alternatives } from "../parse-nodes/alternatives";
import { IdentifierNode } from "../parse-nodes/identifier-node";
import { ParseNode } from "../parse-nodes/parse-node";
import { InstanceProcRef } from "../parse-nodes/instanceProcRef";
import { AbstractField } from "./abstract-field";
import { ParseStatus } from "../status-enums";
import { ProcedureFrame } from "../globals/procedure-frame";
import { Scope } from "../interfaces/scope";
import { ElanSymbol } from "../interfaces/symbol";
import { transforms } from "../syntax-nodes/ast-helpers";
import { ProcedureType } from "../symbols/procedure-type";
import { VarStatement } from "../statements/var-statement";
import { ClassType } from "../symbols/class-type";
import { isClass } from "../helpers";
import { getGlobalScope } from "../symbols/symbol-helpers";
import { Class } from "../interfaces/class";
import { Property } from "../class-members/property";

export class ProcRefField extends AbstractField {
  isParseByNodes = true;
  qualProc = () => new InstanceProcRef(); // These two are alternatives, not a combination!
  proc = () => new IdentifierNode(); // These two are alternatives, not a combination

  constructor(holder: Frame) {
    super(holder);
    this.setPlaceholder("procedureName");
    this.help = `The name of the procedure to be called (starting lower-case). Alternatively, a 'dotted-call':  the name of a variable or property, followed by a ''' and the name of the procedure method to call on that 'instance'.`;
  }
  getIdPrefix(): string {
    return "ident";
  }
  initialiseRoot(): ParseNode {
    this.rootNode = new Alternatives([this.proc, this.qualProc]);
    this.rootNode.setCompletionWhenEmpty(this.placeholder); //Need to test proc first, otherwise valid proc would be treated as instance part of an incomplete qualProc
    return this.rootNode;
  }
  readToDelimiter: (source: CodeSource) => string = (source: CodeSource) => source.readUntil(/\(/);

  matchingSymbolsForId(scope: Scope): ElanSymbol[] {
    const id = this.rootNode?.matchedText;

    if (id === undefined || id === "") {
      return [];
    }

    const dotIndex = id.indexOf(".");

    if (dotIndex >= 0) {
      const qualId = id.slice(0, dotIndex);
      const propId = id.slice(dotIndex + 1);

      const qual = scope.resolveSymbol(qualId, transforms(), scope);

      // class scope so all or matching symbols on class
      const st = qual.symbolType(transforms());
      if (st instanceof ClassType) {
        const cls = getGlobalScope(scope).resolveSymbol(st.className, transforms(), scope);

        if (isClass(cls as unknown as Scope)) {
          return (cls as unknown as Scope).symbolMatches(propId, !propId);
        }
        return [];
      }

      //look for extensions

      // if (propId) {
      //   getGlobalScope(scope).libraryScope.symbolMatches(propId);
      // }
    }

    return scope.symbolMatches(id, false, this.getHolder());
  }

  isIdOrProcedure(s: ElanSymbol) {
    return s instanceof VarStatement || s.symbolType(transforms()) instanceof ProcedureType;
  }

  public textAsHtml(): string {
    let text: string;
    if (this.selected) {
      const matchedSymbols = this.matchingSymbolsForId(this.getHolder());
      const filteredSymbolIds = matchedSymbols
        .filter((s) => this.isIdOrProcedure(s))
        .map((s) => s.symbolId);
      const popupAsHtml = this.popupAsHtml(filteredSymbolIds);
      text = super.textAsHtml() + popupAsHtml;
    } else {
      if (
        this.readParseStatus() === ParseStatus.valid ||
        this.readParseStatus() === ParseStatus.valid
      ) {
        const bestMatch = (this.rootNode! as Alternatives).bestMatch;
        if (bestMatch instanceof IdentifierNode) {
          text = `<method>${this.text}</method>`;
        } else {
          text = (bestMatch as InstanceProcRef).renderAsHtml();
        }
      } else {
        text = super.textAsHtml();
      }
    }
    return text;
  }

  isEndMarker(key: string) {
    return key === "(";
  }
}
