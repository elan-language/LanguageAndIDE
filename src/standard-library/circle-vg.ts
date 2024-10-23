import {
  ClassOptions,
  ElanClass,
  ElanInt,
  elanClass,
  elanProperty,
} from "../elan-type-annotations";
import { BaseVG } from "./base-vg";

@elanClass(ClassOptions.record, [], [], [ElanClass(BaseVG)])
export class CircleVG extends BaseVG {
  static emptyInstance() {
    return new CircleVG();
  }

  @elanProperty()
  x: number = 0;

  @elanProperty()
  y: number = 0;

  @elanProperty()
  r: number = 0;

  @elanProperty(ElanInt)
  stroke: number = 0;

  @elanProperty()
  strokeWidth: number = 0;

  @elanProperty(ElanInt)
  fill: number = 0;

  constructor() {
    super();
  }

  asHtml(): string {
    return `<circle cx="${this.x}" cy="${this.y}" r="${this.r}" stroke="${this.strokeHtml()}" stroke-width="${this.strokeWidth}" fill="${this.fillHtml()}" />`;
  }
  strokeHtml(): string {
    return this.asHtmlColour(this.stroke);
  }
  fillHtml(): string {
    return this.asHtmlColour(this.fill);
  }

  //TODO: move up to superclass or other helper
  asHtmlColour(colour: number) {
    const hex = `000000${colour.toString(16)}`;
    const rgb = hex.substring(hex.length - 6, hex.length);
    return `#${rgb}`;
  }
}
