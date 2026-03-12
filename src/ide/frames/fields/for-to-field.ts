import { removeHtmlTagsAndEscChars } from "../frame-helpers";
import { Frame } from "../frame-interfaces/frame";
import { StepNode } from "../parse-nodes/step-node";
import { For } from "../statements/for";
import { ExpressionField } from "./expression-field";

export class ForToField extends ExpressionField {
  private forLoop: For;
  inclusiveTo: boolean = false;

  constructor(holder: Frame, readUntil = /\r?\n/) {
    super(holder, readUntil);
    this.forLoop = holder as For;
  }

  resetText() {
    if (!!this.rootNode) {
      const originalText = removeHtmlTagsAndEscChars(this.rootNode!.renderAsHtml());
      const revised = this.revisedToText(originalText);
      if (revised !== this.text) {
        this.setFieldToKnownValidText(revised);
        this.inclusiveTo = this.forLoop.getParent().language().inclusiveToField;
      }
    }
  }

  revisedToText(existing: string): string {
    const step = this.forLoop.step.getRootNode() as StepNode;
    const negativeStep = step.minus!.matchedText === "-";
    let inc = 0;
    const targetInclusiveTo = this.forLoop.getParent().language().inclusiveToField;
    if (this.inclusiveTo && !targetInclusiveTo) {
      inc = negativeStep ? -1 : 1;
    } else if (!this.inclusiveTo && targetInclusiveTo) {
      inc = negativeStep ? 1 : -1;
    }
    let revised = existing;
    if (inc === 1) {
      if (existing.endsWith(" - 1")) {
        revised = existing.substring(0, existing.length - 5);
      } else {
        revised = existing + " + 1";
      }
    } else if (inc === -1) {
      if (existing.endsWith(" + 1")) {
        revised = existing.substring(0, existing.length - 5);
      } else {
        revised = existing + " - 1";
      }
    }
    return revised;
  }

  //The *compiler* should append this string onto the end of the compiled expression for this field.
  adjustmentToCompiledExpression(): string {
    let adjustment ="";
    const step = this.forLoop.step.getRootNode() as StepNode;
    const negativeStep = step.minus!.matchedText === "-";
    if (this.inclusiveTo) {
      if (negativeStep) {
        adjustment = " + 1";
      } else {
        adjustment = " - 1";
      }
    }
    return adjustment;
  }
}
