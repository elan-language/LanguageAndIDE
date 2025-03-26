import { ClassOption, ElanClass, elanClass, elanProperty } from "../elan-type-annotations";
import { VectorGraphic } from "./vector-graphic";

@elanClass(ClassOption.record, [], [], [], [ElanClass(VectorGraphic)])
export class LineVG extends VectorGraphic {
  static emptyInstance() {
    return new LineVG();
  }

  async _initialise() {
    return this;
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
