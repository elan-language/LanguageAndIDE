import { ConstantContext, FileContext } from "../../generated/ref-lang/RefLangParser";
import { RefLangVisitor } from "../../generated/ref-lang/RefLangVisitor";
import { CodeSourceFromString } from "../frames/code-source-from-string";
import { File } from "../frames/frame-interfaces/file";
import { Frame } from "../frames/frame-interfaces/frame";
import { ConstantGlobal } from "../frames/globals/constant-global";

export class RefLangVisitorFrame extends RefLangVisitor<File | Frame> {
  constructor(private readonly file: File) {
    super();
  }

  override visitFile = (ctx: FileContext) => {
    const globals = ctx.global().map((g) => this.visit(g)) as Frame[];

    for (const g of globals) {
      this.file.addChild(g);
    }
    return this.file!;
  };

  override visitConstant = (ctx: ConstantContext) => {
    const name = ctx.identifierDef().getText();
    const value = ctx.constantValue().getText();
    const gc = new ConstantGlobal(this.file!);

    gc.name.parseFrom(new CodeSourceFromString(name));
    gc.value.parseFrom(new CodeSourceFromString(value));

    return gc;
  };
}
