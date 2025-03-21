import { ClassOption, ElanClass, elanClass, elanProperty } from "../elan-type-annotations";
import { BaseVG } from "./base-vg";

@elanClass(ClassOption.record, [], [], [], [ElanClass(BaseVG)])
export class RectangleVG extends BaseVG {
  static emptyInstance() {
    return new RectangleVG();
  }

  async _initialise() {
    return this;
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
    return `<rect x="${this.x}%" y="${this.y / 0.75}%" width="${this.width}%" height="${this.height / 0.75}%" stroke="${this.strokeAsColour()}" stroke-width="${this.strokeWidthPC()}%" fill="${this.fillAsColour()}" />`;
  }
}
