import { ElanRuntimeError } from "../elan-runtime-error";
import {
  ClassOption,
  ElanInt,
  elanClass,
  elanProcedure,
  elanProperty,
} from "../elan-type-annotations";

@elanClass(ClassOption.abstract)
export class VectorGraphic {
  // this must be implemented by hand on all stdlib classes
  static emptyInstance() {
    return new VectorGraphic();
  }

  constructor(copy?: VectorGraphic) {
    this.fillColour = copy ? copy.fillColour : 0;
    this.strokeColour = copy ? copy.strokeColour : 0;
    this.strokeWidth = copy ? copy.strokeWidth : 1;
  }

  @elanProperty(ElanInt)
  strokeColour: number = 0;

  @elanProcedure(["colour"])
  setStrokeColour(strokeColour: number) {
    this.strokeColour = strokeColour;
  }

  @elanProperty()
  strokeWidth: number = 0;

  @elanProcedure(["strokeWidth"])
  setStrokeWidth(strokeWidth: number) {
    this.strokeWidth = strokeWidth;
  }

  @elanProperty(ElanInt)
  fillColour: number = 0;

  @elanProcedure(["fillColour"])
  setFillColour(fillColour: number) {
    this.fillColour = fillColour;
  }

  asSVG(): string {
    return "";
  }

  asColour(colour: number) {
    if (colour > 0xffffff || colour < 0) {
      throw new ElanRuntimeError(`colour must be in the range 0x0 to 0xffffff (0 to 16777215)`);
    }
    const hex = `000000${colour.toString(16)}`;
    const rgb = hex.substring(hex.length - 6, hex.length);
    return `#${rgb}`;
  }

  private strokeColourAsHex(): string {
    if (this.strokeColour < 0) {
      throw new ElanRuntimeError(`strokeColour cannot be transparent (negative value)`);
    }
    return this.asColour(this.strokeColour);
  }
  private fillColourAsHex(): string {
    let colour = "";
    if (this.fillColour < 0) {
      colour = "none";
    } else {
      colour = this.asColour(this.fillColour);
    }
    return colour;
  }

  private strokeWidthScaled(): number {
    return this.strokeWidth * 0.3;
  }

  strokeAsHtml(): string {
    return `stroke="${this.strokeColourAsHex()}" stroke-width="${this.strokeWidthScaled()}%"`;
  }

  fillAsHtml(): string {
    return `fill="${this.fillColourAsHex()}"`;
  }
}
