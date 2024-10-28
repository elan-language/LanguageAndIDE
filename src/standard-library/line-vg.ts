import { ClassOptions, ElanClass, elanClass, elanProperty } from "../elan-type-annotations";
import { BaseVG } from "./base-vg";

@elanClass(ClassOptions.record, [], [], [ElanClass(BaseVG)])
export class LineVG extends BaseVG {
  static emptyInstance() {
    return new LineVG();
  }

  constructor() {
    super();
    this.x2 = 100;
    this.y2 = 100;
  }

  @elanProperty()
  x1: number = 0;

  @elanProperty()
  y1: number = 0;

  @elanProperty()
  x2: number = 0;

  @elanProperty()
  y2: number = 0;

  asHtml(): string {
    return `<line x1="${this.x1}%" y1="${this.y1 / 0.75}%" x2="${this.x2}%" y2="${this.y2 / 0.75}%" stroke="${this.strokeAsColour()}" stroke-width="${this.strokeWidthPC()}%" />`;
  }
}
