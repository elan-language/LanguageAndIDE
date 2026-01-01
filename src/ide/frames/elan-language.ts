import { SourceLanguage } from "./frame-interfaces/source-language";

export class ElanLanguage implements SourceLanguage {
  commentMarker(): string {
    return `#`;
  }
}
