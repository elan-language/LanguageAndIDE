import { ClassOptions, ElanClass, elanClass, elanProperty } from "../elan-type-annotations";
import { BaseVG } from "./base-vg";

@elanClass(ClassOptions.record, [], [], [], [ElanClass(BaseVG)])
export class CircleVG extends BaseVG {
  static emptyInstance() {
    return new CircleVG();
  }

  async _initialise() {
    return this;
  }

  constructor() {
    super();
    this.cx = 100;
    this.cy = 100;
    this.r = 10;
  }

  @elanProperty()
  cx: number = 0;

  @elanProperty()
  cy: number = 0;

  @elanProperty()
  r: number = 0;

  asHtml(): string {
    return `<circle cx="${this.cx}%" cy="${this.cy / 0.75}%" r="${this.r * 1.125}%" stroke="${this.strokeAsColour()}" stroke-width="${this.strokeWidthPC()}%" fill="${this.fillAsColour()}" />`;
  }
}
