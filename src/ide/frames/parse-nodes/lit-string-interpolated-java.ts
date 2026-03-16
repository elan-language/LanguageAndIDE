import { removeHtmlTagsAndEscChars } from "../frame-helpers";
import { ParseStatus } from "../status-enums";
import { CLOSE_BRACKET } from "../symbols";
import { Alternatives } from "./alternatives";
import { CommaNode } from "./comma-node";
import { CSV } from "./csv";
import { ExprNode } from "./expr-node";
import { LitStringField } from "./lit-string-field";
import { LitStringInterpolated } from "./lit-string-interpolated";
import { LitStringOrdinary } from "./lit-string-ordinary";
import { LitStringPlainText } from "./lit-string-plain-text";
import { Multiple } from "./multiple";
import { PunctuationNode } from "./punctuation-node";
import { RegExMatchNode } from "./regex-match-node";
import { Sequence } from "./sequence";

// Used to parse for Java, then renderAsElan - which (text) is then parsed again the standard method.
export class LitStringInterpolatedJava extends LitStringInterpolated {

  override parseText(text: string): void {
    const java = new Sequence(this.file, []);
    const numFields = text.split("%").length - 1; // if 0 occurrences then parseStatus.error
    const f = this.file;
    java.addElement(new RegExMatchNode(f, /String\.format\(/));
    const str = new LitStringOrdinary(f);
    java.addElement(str);
    java.addElement(new CommaNode(f));
    const csvExpr = new CSV(f, () => new ExprNode(f), numFields);
    java.addElement(csvExpr);
    java.addElement(new PunctuationNode(this.file, CLOSE_BRACKET));
    java.parseText(text);

    if (java.status === ParseStatus.valid) {
      let elan = `$${str.matchedText}`;
      const contents = this.justTheExpressions(csvExpr);
      for (let i = 0; i < numFields; i++) {
        elan = elan.replace("%", "{" + contents[i].renderAsElanSource() + "}");
      }
      super.parseText(elan);
    } else {
      this.status = ParseStatus.invalid;
      this.matchedText = "";
      this.remainingText = text;
    }
  }

  renderAsHtml(): string {
    let definingString = "";
    let csv = "";
    this.segments!.getElements().forEach((element) => {
      const seg = (element as Alternatives).bestMatch;
      if (seg instanceof LitStringField) {
        definingString += "%";
        csv += `${seg.expr!.renderAsHtml()}, `;
      } else if (seg instanceof LitStringPlainText) {
        definingString += seg.renderAsHtml();
      }
    });
    csv = csv.endsWith(", ") ? csv.substring(0, csv.length - 2) : csv;
    return `<el-type>String</el-type>.<el-method>format</el-method>("<el-lit>${definingString}</el-lit>", ${csv})`;
  }

  renderAsExport(): string {
    return removeHtmlTagsAndEscChars(this.renderAsHtml());
  }

  justTheExpressions(csv: CSV): ExprNode[] {
    const contents: ExprNode[] = [];
    const first = csv.getElements()[0] as ExprNode;
    const secondOnwards = (csv.getElements()[1] as Multiple).getElements();
    contents.push(first);
    for (let i = 0; i < secondOnwards.length; i++) {
      const commaPlus = secondOnwards[i] as Sequence;
      const contentNode = commaPlus.getElements()[1] as ExprNode;
      contents.push(contentNode);
    }
    return contents;
  }
}
