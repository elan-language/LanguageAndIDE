import { ClassOptions, elanClass, elanProcedure, ProcedureOptions } from "../elan-type-annotations";

@elanClass(ClassOptions.abstract)
export class SVG {
  // this must be implemented by hand on all stdlib classes
  static emptyInstance() {
    return new SVG();
  }

  constructor() {}

  @elanProcedure(ProcedureOptions.async)
  renderAsSVG() {}
}
