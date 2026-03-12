import { removeHtmlTagsAndEscChars } from "../frame-helpers";
import { Frame } from "../frame-interfaces/frame";
import { StepNode } from "../parse-nodes/step-node";
import { For } from "../statements/for";
import { ExpressionField } from "./expression-field";

export class ForToField extends ExpressionField {
  forLoop: For;
  private inclusiveTo: boolean = false;

  constructor(holder: Frame, readUntil = /\r?\n/) {
    super(holder, readUntil);
    this.forLoop = holder as For;
  }

  resetText() {
    if (!!this.rootNode) {
      const text = removeHtmlTagsAndEscChars(this.rootNode!.renderAsHtml());
      const revised = this.revisedToText(text);
      if (revised !== this.text) {
        this.setFieldToKnownValidText(text);
        this.inclusiveTo = this.forLoop.getParent().language().inclusiveToField;
      }
    }
  }

  revisedToText(existing: string): string {
    const negativeStep = (this.forLoop.step.getRootNode() as StepNode).minus!.matchedNode;
    let inc = 0;
    const targetInclusiveTo = this.forLoop.getParent().language().inclusiveToField;
    if (this.inclusiveTo && !targetInclusiveTo) {
      inc = negativeStep ? 1 : -1;
    } else if (!this.inclusiveTo && targetInclusiveTo) {
      inc = negativeStep ? -1 : 1;
    }
    let revised = "";
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
}
