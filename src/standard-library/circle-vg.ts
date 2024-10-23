import {
  ClassOptions,
  ElanClass,
  ElanInt,
  FunctionOptions,
  elanClass,
  elanFunction,
  elanProcedure,
  elanProperty,
} from "../elan-type-annotations";
import { BaseVG } from "./base-vg";

@elanClass(ClassOptions.record, [], [], [ElanClass(BaseVG)])
export class CircleVG extends BaseVG {
  static emptyInstance() {
    return new CircleVG();
  }

  @elanProperty(ElanInt)
  x: number = 0;

  @elanProperty()
  y: number = 0;

  @elanProperty()
  r: number = 0;

  @elanProperty()
  strokeColour: string = "";

  @elanProperty()
  strokeWidth: number = 0;

  @elanProperty()
  fillColour: string = "";

  constructor() {
    super();
  }

  @elanProcedure()
  setProperties(
    x: number,
    y: number,
    r: number,
    strokeColour: number,
    strokeWidth: number,
    fillColour: number,
  ) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.strokeColour = this.asHtmlColour(strokeColour);
    this.strokeWidth = strokeWidth;
    this.fillColour = this.asHtmlColour(fillColour);
  }

  @elanFunction(FunctionOptions.pure)
  asHtml(): string {
    return `<circle cx="${this.x}" cy="${this.y}" r="${this.r}" stroke="${this.strokeColour}" stroke-width="${this.strokeWidth}" fill="${this.fillColour}" />`;
  }

  //TODO: move up to superclass or other helper
  asHtmlColour(colour: number) {
    const hex = `000000${colour.toString(16)}`;
    const rgb = hex.substring(hex.length - 6, hex.length);
    return `#${rgb}`;
  }

  @elanFunction(FunctionOptions.pure, ElanClass(BaseVG))
  asBaseVG() {
    return this;
  }
}
