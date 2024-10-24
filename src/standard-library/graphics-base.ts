import { ClassOptions, elanClass } from "../elan-type-annotations";
import { System } from "../system";

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
