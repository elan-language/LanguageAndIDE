import { Field } from "./frame-interfaces/field";
import { Frame } from "./frame-interfaces/frame";
import { Language } from "./frame-interfaces/language";
import { ConstantGlobal } from "./globals/constant-global";
import { TestFrame } from "./globals/test-frame";
import { LanguageCfamily } from "./language-c-family";
import { Alternatives } from "./parse-nodes/alternatives";
import { CommaNode } from "./parse-nodes/comma-node";
import { CSV } from "./parse-nodes/csv";
import { ExprNode } from "./parse-nodes/expr-node";
import { KeywordNode } from "./parse-nodes/keyword-node";
import { LitStringField } from "./parse-nodes/lit-string-field";
import { LitStringInterpolated } from "./parse-nodes/lit-string-interpolated";
import { LitStringOrdinary } from "./parse-nodes/lit-string-ordinary";
import { LitStringPlainText } from "./parse-nodes/lit-string-plain-text";
import { Multiple } from "./parse-nodes/multiple";
import { NewInstance } from "./parse-nodes/new-instance";
import { ParamDefNode } from "./parse-nodes/param-def-node";
import { Space } from "./parse-nodes/parse-node-helpers";
import { PropertyRef } from "./parse-nodes/property-ref";
import { PunctuationNode } from "./parse-nodes/punctuation-node";
import { RegExMatchNode } from "./parse-nodes/regex-match-node";
import { Sequence } from "./parse-nodes/sequence";
import { SpaceNode } from "./parse-nodes/space-node";
import { TypeGenericNode } from "./parse-nodes/type-generic-node";
import { TypeTupleNode } from "./parse-nodes/type-tuple-node";
import { AssertStatement } from "./statements/assert-statement";
import { ConstantStatement } from "./statements/constant-statement";
import { ParseStatus } from "./status-enums";
import { CLOSE_BRACKET } from "./symbols";

export class LanguageJava extends LanguageCfamily {
  static Instance: Language = new LanguageJava();

  languageClass = "java";
  languageFullName: string = "Java";
  defaultFileExtension: string = "java";
  defaultMimeType: string = "text/plain";

  commentRegex(): RegExp {
    return this.common_commentRegex();
  }

  annotation(frame: Frame): string {
    let annotation = this.common_Annotation(frame);
    if (frame instanceof ConstantGlobal || frame instanceof ConstantStatement) {
      annotation = frame.frameSpecificAnnotation();
    }
    return annotation;
  }

  renderSingleLineAsHtml(frame: Frame): string {
    let html = "";
    if (frame instanceof AssertStatement) {
      html = `<el-method>assertEquals</el-method>(${frame.expected.renderAsHtml()}, ${frame.actual.renderAsHtml()})`;
    } else if (frame instanceof ConstantGlobal) {
      // special case because the </el-top> needs to be placed part way through the line
      html = `<el-kw>${this.FINAL} </el-kw><el-type>${frame.value.getElanType()} </el-type>${frame.name.renderAsHtml()}</el-top><el-punc> = </el-punc>${frame.value.renderAsHtml()}`;
    } else if (frame instanceof ConstantStatement) {
      html = `<el-kw>${this.FINAL} </el-kw><el-type>${frame.expr.getElanType()} </el-type>${frame.name.renderAsHtml()}<el-punc> = </el-punc>${frame.expr.renderAsHtml()}<el-punc>;</el-punc>`;
    } else {
      html = this.common_renderSingleLineAsHtml(frame);
    }
    return html;
  }

  renderTopAsHtml(frame: Frame): string {
    let html = "";
    if (frame instanceof TestFrame) {
      html = `@<el-type>Test</el-type> <el-kw>${this.STATIC} ${this.VOID} </el-kw>${frame.testName.renderAsHtml()}<el-punc>() {</el-punc>`;
    } else {
      html = this.common_renderTopAsHtml(frame);
    }
    return html;
  }

  renderBottomAsHtml(frame: Frame): string {
    return this.common_renderBottomAsHtml(frame);
  }

  getFields(frame: Frame): Field[] {
    return this.common_getFields(frame);
  }

  public FINAL = "final";

  public STRING_NAME: string = "String";

  INTERPOLATED_STRING_PREFIX: string = ""; // No prefix because of custom processing

  addNodesForParamDef(node: ParamDefNode): void {
    this.c_langs_addNodesForParamDef(node);
  }
  paramDefAsHtml(node: ParamDefNode): string {
    return this.c_langs_paramDefAsHtml(node);
  }

  paramDefCompletion(node: ParamDefNode): string {
    return this.c_langs_paramDefCompletion(node);
  }

  addNodesForTypeGeneric(node: TypeGenericNode): void {
    this.c_langs_addNodesForTypeGeneric(node);
  }
  typeGenericAsHtml(node: TypeGenericNode): string {
    return this.c_langs_typeGenericAsHtml(node);
  }

  propertyRefAsHtml(node: PropertyRef): string {
    return this.c_langs_propertyRefAsHtml(node);
  }

  litStringInterpolatedAsHtml(node: LitStringInterpolated) {
    let definingString = "";
    let csv = "";
    node.segments!.getElements().forEach((element) => {
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

  standardiseInterpolatedString(node: LitStringInterpolated, text: string): string {
    const f = node.file;
    const java = new Sequence(f, []);
    const numFields = text.split("%").length - 1; // if 0 occurrences then parseStatus.error
    java.addElement(new RegExMatchNode(f, /String\.format\(/));
    const str = new LitStringOrdinary(f);
    java.addElement(str);
    java.addElement(new CommaNode(f));
    const csvExpr = new CSV(f, () => new ExprNode(f), numFields);
    java.addElement(csvExpr);
    java.addElement(new PunctuationNode(f, CLOSE_BRACKET));
    java.parseText(text);
    let standardised = "";
    if (java.status === ParseStatus.valid) {
      let elan = `$${str.matchedText}`;
      const contents = this.justTheExpressions(csvExpr);
      for (let i = 0; i < numFields; i++) {
        elan = elan.replace("%", "{" + contents[i].renderAsElanSource() + "}");
      }
      standardised = elan;
    }
    return standardised;
  }

  private justTheExpressions(csv: CSV): ExprNode[] {
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

  addNodesForNewInstance(node: NewInstance): void {
    node.addElement(new KeywordNode(node.file, this.NEW));
    node.addElement(new SpaceNode(node.file, Space.required));
    this.addCommonElementsForNewInstance(node);
  }

  newInstanceAsHtml(node: NewInstance): string {
    return this.c_langs_newInstanceAsHtml(node);
  }

  addNodesForTypeTuple(node: TypeTupleNode): void {
    this.addCommonElementsForTypeTuple(node);
  }

  typeTupleAsHtml(node: TypeTupleNode): string {
    return this.default_typeTupleAsHtml(node);
  }

  reservedWords: Set<string> = new Set<string>([
    `abstract`,
    `continue`,
    `for`,
    `new`,
    `switch`,
    `assert`,
    `default`,
    `goto`,
    `package`,
    `synchronized`,
    `boolean`,
    `do`,
    `if`,
    `private`,
    `this`,
    `break`,
    `double`,
    `implements`,
    `protected`,
    `throw`,
    `byte`,
    `else`,
    `import`,
    `public`,
    `throws`,
    `case`,
    `enum`,
    `instanceof`,
    `return`,
    `transient`,
    `catch`,
    `extends`,
    `int`,
    `short`,
    `try`,
    `char`,
    `final`,
    `interface`,
    `static`,
    `void`,
    `class`,
    `finally`,
    `long`,
    `strictfp`,
    `volatile`,
    `const`,
    `float`,
    `native`,
    `super`,
    `while`,
  ]);
}
