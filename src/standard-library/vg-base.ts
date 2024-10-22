import { ClassOptions, elanClass, elanProcedure, ProcedureOptions } from "../elan-type-annotations";

@elanClass(ClassOptions.abstract)
export class VGBase {
  // this must be implemented by hand on all stdlib classes
  static emptyInstance() {
    return new VGBase();
  }

  constructor() {}

  @elanProcedure(ProcedureOptions.async)
  renderAsSVG() {}
}
