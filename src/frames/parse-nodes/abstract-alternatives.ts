import { SymbolCompletionSpec_Old, TokenType } from "../helpers";
import { ParseStatus } from "../status-enums";
import { AbstractParseNode } from "./abstract-parse-node";
import { ParseNode } from "./parse-node";

export abstract class AbstractAlternatives extends AbstractParseNode {
  alternatives: ParseNode[] = [];
  bestMatch?: ParseNode;

  constructor() {
    super();
  }

  parseText(text: string): void {
    this.remainingText = text;
    if (this.remainingText.length > 0) {
      let cont = true;
      let i = 0;
      while (i < this.alternatives.length && cont) {
        const alt = this.alternatives[i];
        alt.parseText(text);
        if (alt.status === ParseStatus.valid && alt.remainingText.length === 0) {
          this.bestMatch = alt;
          cont = false;
        } else if (
          !this.bestMatch ||
          alt.remainingText.length < this.bestMatch.remainingText.length ||
          (alt.remainingText.length === this.bestMatch.remainingText.length &&
            alt.status > this.bestMatch.status)
        ) {
          this.bestMatch = alt;
        }
        i++;
      }
      if (this.bestMatch!.status > ParseStatus.invalid) {
        this.status = this.bestMatch!.status;
        this.matchedText = this.bestMatch!.matchedText;
        this.remainingText = this.bestMatch!.remainingText;
      } else {
        this.bestMatch = undefined;
        this.status = ParseStatus.invalid;
      }
    }
  }

  renderAsHtml(): string {
    return this.bestMatch ? this.bestMatch.renderAsHtml() : "";
  }
  renderAsSource(): string {
    return this.bestMatch ? this.bestMatch.renderAsSource() : "";
  }
  compile(): string {
    return this.bestMatch ? this.bestMatch.compile() : "";
  }
  getSyntaxCompletionAsHtml(): string {
    const c = this.bestMatch
      ? this.bestMatch.getSyntaxCompletionAsHtml()
      : super.getSyntaxCompletionAsHtml();
    return c;
  }

  override symbolCompletion_getSpec_Old(): SymbolCompletionSpec_Old {
    return this.bestMatch?.symbolCompletion_getSpec_Old() ?? super.symbolCompletion_getSpec_Old();
  }

  getActiveNode(): ParseNode {
    if (this.bestMatchIsOnlyMatch()) {
      return this.bestMatch!.getActiveNode();
    } else {
      return this as ParseNode;
    }
  }

  bestMatchIsOnlyMatch(): boolean {
    return (
      this.bestMatch !== undefined &&
      this.alternatives.filter((alt) => alt.status !== ParseStatus.invalid).length === 0
    );
  }

  potentialMatches(): ParseNode[] {
    return this.alternatives.filter((alt) => alt.status !== ParseStatus.invalid);
  }

  override symbolCompletion_tokenTypes(): Set<TokenType> {
    const tts = new Set<TokenType>();
    const pms = this.potentialMatches();
    for (let i = 0; i < pms.length; i++) {
      const pm = pms[i];
      const pm_tts = Array.from(pm.symbolCompletion_tokenTypes());
      for (let j = 0; j < pm_tts.length; j++) {
        const tt = pm_tts[0];
        tts.add(tt);
      }
    }
    return tts;
    
    /* should be just: return this.potentialMatches().reduce(
      (prev, m) => prev.union(m.symbolCompletion_tokenTypes()),
      new Set<TokenType>(),
    ); */
  }

  override symbolCompletion_keywords(): string[] {
    const kws: string[]  = [];
    const pms = this.potentialMatches();
    for (let i = 0; i < pms.length; i++) {
      const toAdd = pms[i].symbolCompletion_keywords();
      kws.concat(toAdd);
    }
    return kws;
  }
}
