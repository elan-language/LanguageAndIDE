import { getConstantType } from "../compile-api/parser-helpers";
import { Property } from "./class-members/property";
import { FieldImpl } from "./fields/field-impl";
import { FileImpl } from "./file-impl";
import { Field } from "./frame-interfaces/field";
import { Frame } from "./frame-interfaces/frame";
import { Language } from "./frame-interfaces/language";
import { ClassFrame } from "./globals/class-frame";
import { ConstantGlobal } from "./globals/constant-global";
import { FunctionFrame } from "./globals/function-frame";
import { TestFrame } from "./globals/test-frame";
import { LanguageCfamily } from "./language-c-family";
import { AssertStatement } from "./statements/assert-statement";
import { InputStatement } from "./statements/input-statement";
import { PrintStatement } from "./statements/print-statement";

export class LanguageCS extends LanguageCfamily {
  private constructor() {
    super();
  }

  static Instance: Language = new LanguageCS();

  languageHtmlClass = "cs";
  languageFullName: string = "C#";
  defaultFileExtension: string = "cs";
  defaultMimeType: string = "text/plain";

  annotation(frame: Frame): string {
    let annotation = "";
    if (frame instanceof Property) {
      annotation = frame.frameSpecificAnnotation();
    } else {
      annotation = this.common_Annotation(frame);
    }
    return annotation;
  }

  renderSingleLineAsHtml(frame: Frame): string {
    let html = "";
    if (frame instanceof AssertStatement) {
      html = `<el-type>Assert</el-type>.<el-method>AreEqual</el-method>(${frame.expected.renderAsHtml()}, ${frame.actual.renderAsHtml()});`;
    } else if (frame instanceof ConstantGlobal) {
      // special case because the </el-top> needs to be placed part way through the line
      html = `<el-kw>${this.CONST} </el-kw><el-type>${getConstantType(frame.value.text, this)} </el-type>${frame.name.renderAsHtml()}</el-top><el-punc> = </el-punc>${frame.value.renderAsHtml()};`;
    } else if (frame instanceof InputStatement) {
      html = `<el-type>Console</el-type>.<el-method>WriteLine</el-method>(${frame.prompt.renderAsHtml()});<br>
      <el-kw>${this.VAR}</el-kw> ${frame.name.renderAsHtml()}<el-kw> = <el-type>Console</el-type>.<el-method>ReadLine</el-method>();`;
    } else if (frame instanceof PrintStatement) {
      html = `<el-type>Console</el-type>.<el-method>WriteLine</el-method>(${frame.arg.renderAsHtml()});`;
    } else if (frame instanceof Property) {
      html = `${this.modifierAsHtml(frame)}${frame.type.renderAsHtml()} ${frame.name.renderAsHtml()} {<el-kw>${this.GET}</el-kw>; <el-kw>${this.PRIVATE} ${this.SET}</el-kw>;}`;
    } else {
      html = this.common_renderSingleLineAsHtml(frame);
    }
    return html;
  }

  OVERRIDES = "override";
  IMPLEMENTS = "";
  INTERPOLATED_STRING_PREFIX: string = "$";
  BOOL_NAME: string = "bool";
  FUNC_NAME: string = "Func";

  renderTopAsHtml(frame: Frame): string {
    let html = "";
    if (frame instanceof TestFrame) {
      html = `[<el-type>TestClass</el-type>] <el-kw>class</el-kw> ${this.testClassNameAsHtml(frame)}<br>[<el-type>TestMethod</el-type>] <el-kw>${this.STATIC} ${this.VOID} </el-kw>${frame.testName.renderAsHtml()}() {`;
    } else {
      html = this.common_renderTopAsHtml(frame);
    }
    return html;
  }

  inheritsFromTextAsHtml(field: FieldImpl): string {
    const frame = field.getHolder() as ClassFrame;
    return frame.doesInherit() ? `: ${field.renderAsHtml()}` : ``;
  }

  renderBottomAsHtml(frame: Frame): string {
    let html = this.common_renderBottomAsHtml(frame);
    if (frame instanceof TestFrame) {
      html = `<el-punc>}</el-punc>${html}`;
    }
    return html;
  }

  renderFileImportsAsHtml(): string {
    return "";
  }
  renderSpecificHeaderAsHtml(_f: FileImpl): string {
    return "";
  }
  renderFileTrailerAsHtml(_f: FileImpl): string {
    return "";
  }

  postProcessHtml(html: string): string {
    return html;
  }

  functionFrameFields(frame: FunctionFrame): Field[] {
    return this.common_functionFrameFields(frame);
  }

  assertStatementFields(frame: AssertStatement): Field[] {
    return this.common_assertStatementFields(frame);
  }

  private GET: string = "get";
  private SET: string = "set";

  reservedWords: Set<string> = new Set<string>([
    `abstract`,
    `as`,
    `base`,
    `bool`,
    `break`,
    `byte`,
    `case`,
    `catch`,
    `char`,
    `checked`,
    `class`,
    `const`,
    `continue`,
    `decimal`,
    `default`,
    `delegate`,
    `do`,
    `double`,
    `else`,
    `enum`,
    `event`,
    `explicit`,
    `extern`,
    `false`,
    `finally`,
    `fixed`,
    `float`,
    `for`,
    `foreach`,
    `get`,
    `goto`,
    `if`,
    `implicit`,
    `in`,
    `int`,
    `interface`,
    `internal`,
    `is`,
    `lock`,
    `long`,
    `namespace`,
    `new`,
    `null`,
    `object`,
    `operator`,
    `out`,
    `override`,
    `params`,
    `private`,
    `protected`,
    `public`,
    `readonly`,
    `ref`,
    `return`,
    `sbyte`,
    `sealed`,
    `set`,
    `short`,
    `sizeof`,
    `stackalloc`,
    `static`,
    `string`,
    `struct`,
    `switch`,
    `this`,
    `throw`,
    `true`,
    `try`,
    `typeof`,
    `uint`,
    `ulong`,
    `unchecked`,
    `unsafe`,
    `ushort`,
    `using`,
    `virtual`,
    `void`,
    `volatile`,
    `while`,
  ]);
}
