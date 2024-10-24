import { ClassOptions, FunctionOptions, elanClass, elanFunction } from "../elan-type-annotations";

@elanClass(ClassOptions.abstract)
export class BaseVG {
  // this must be implemented by hand on all stdlib classes
  static emptyInstance() {
    return new BaseVG();
  }

  constructor() {}

  asHtml(): string {
    return "";
  }

  asHtmlColour(colour: number) {
    const hex = `000000${colour.toString(16)}`;
    const rgb = hex.substring(hex.length - 6, hex.length);
    return `#${rgb}`;
  }
}
