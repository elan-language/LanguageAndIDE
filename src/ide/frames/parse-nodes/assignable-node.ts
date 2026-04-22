import { File } from "../frame-interfaces/file";
import { KeywordCompletion, TokenType } from "../symbol-completion-helpers";
import { AbstractAlternatives } from "./abstract-alternatives";
import { InstanceNode } from "./instanceNode";
import { PropertyInstanceRef } from "./property-instance-ref";
import { PropertyRef } from "./property-ref";

export class AssignableNode extends AbstractAlternatives {
  tokenTypes = new Set<TokenType>([TokenType.id_property, TokenType.id_variable]);

  constructor(file: File) {
    super(file);
    this.alternatives.push(new InstanceNode(file));
    this.alternatives.push(new PropertyRef(file));
    this.alternatives.push(new PropertyInstanceRef(file));
  }

  symbolCompletion_tokenTypes(): Set<TokenType> {
    return new Set<TokenType>([TokenType.id_variable, TokenType.id_property]);
  }

  override symbolCompletion_keywords(): Set<KeywordCompletion> {
    const langExprKeywords = [this.file.language().THIS_INSTANCE];
    let kws = langExprKeywords.map((kw) => KeywordCompletion.create(kw));
    const trim = this.matchedText.trim();
    if (trim.length > 0) {
      kws = kws.filter((kw) => kw.keyword.startsWith(trim));
    }
    return new Set(kws);
  }
}
