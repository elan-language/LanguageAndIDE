import { ClassOptions, elanClass } from "../elan-type-annotations";

@elanClass(ClassOptions.abstract)
export class GraphicsBase {
  // this must be implemented by hand on all stdlib classes
  static emptyInstance() {
    return new GraphicsBase();
  }

  constructor() {}

  asHtml(): string {
    return "";
  }
}
