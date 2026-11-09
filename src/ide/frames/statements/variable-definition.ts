import { setKeyword, toKeyword, variableKeyword } from "../../../compiler/elan-keywords";
import { CodeSource } from "../frame-interfaces/code-source";
import { Parent } from "../frame-interfaces/parent";
import { Statement } from "../frame-interfaces/statement";
import { FrameType } from "../frame-type";
import { AbstractDefinitionStatement } from "./abstract-definition.statement";

export class VariableDefinition extends AbstractDefinitionStatement implements Statement {
  frameType: FrameType = FrameType.variableDefinition;
  isVariableStatement = true;
  constructor(parent: Parent) {
    super(parent);
  }

  initialKeywords(): string {
    return variableKeyword;
  }

  override helpId(): string {
    return "variableDefinition";
  }

  parseFrom(source: CodeSource): void {
    source.removeIndent();
    source.remove(`${variableKeyword} `);
    this.name.parseFrom(source);
    source.remove(` ${setKeyword} ${toKeyword} `);
    this.expr.parseFrom(source);
    source.removeNewLine();
  }

  getIdPrefix(): string {
    return `${this.language().languageHtmlClass}_var`;
  }

  frameSpecificAnnotation(): string {
    return "variable definition";
  }
}
