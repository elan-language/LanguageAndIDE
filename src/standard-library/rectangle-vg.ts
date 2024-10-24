import { ClassOptions, ElanClass, elanClass, elanProperty } from "../elan-type-annotations";
import { BaseVG } from "./base-vg";

@elanClass(ClassOptions.record, [], [], [ElanClass(BaseVG)])
export class RectangleVG extends BaseVG {
  static emptyInstance() {
    return new RectangleVG();
  }

  constructor() {
    super();
    this.x = 30;
    this.y = 40;
    this.width = 20;
    this.height = 10;
    this.fill = 0x0000ff;
  }

  @elanProperty()
  x: number = 0;

  @elanProperty()
  y: number = 0;

  @elanProperty()
  width: number = 0;

  @elanProperty()
  height: number = 0;

  asHtml(): string {
    return `<rect x="${this.x}" y="${this.y}" width="${this.width}" height="${this.height}" stroke="${this.strokeAsColour()}" stroke-width="${this.strokeWidth}" fill="${this.fillAsColour()}" />`;
  }
}
