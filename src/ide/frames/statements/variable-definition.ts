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

  override helpId(): string {
    return "variableDefinition";
  }

  getIdPrefix(): string {
    return `${this.language().languageHtmlClass}_var`;
  }
}
