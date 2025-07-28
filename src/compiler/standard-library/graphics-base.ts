import { elanClass, ClassOption } from "../elan-type-annotations";

@elanClass(ClassOption.abstract)
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
