import { allElanKeywordsUC } from "./elan-keywords";

export class ReservedWords {
  static Instance: ReservedWords = new ReservedWords();

  matchesReservedWord_caseIgnored(target: string): boolean {
    return allElanKeywordsUC().has(target.toUpperCase());
  }

  matchesLangType_inclCase(target: string): boolean {
    return this.allLangTypes().has(target);
  }

  allLangTypes(): Set<string> {
    // TODO
    return new Set<string>(["int", "string", "float"]);
  }
}
