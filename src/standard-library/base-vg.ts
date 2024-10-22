import { ClassOptions, elanClass, elanProcedure, ProcedureOptions } from "../elan-type-annotations";

@elanClass(ClassOptions.abstract)
export class BaseVG {
  // this must be implemented by hand on all stdlib classes
  static emptyInstance() {
    return new BaseVG();
  }

  constructor() {}

  @elanProcedure(ProcedureOptions.async)
  renderAsSVG() {}
}
