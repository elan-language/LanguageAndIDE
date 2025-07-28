import { ElanRuntimeError } from "../../ide/elan-runtime-error";
import { elanClass, ClassOption } from "../elan-type-annotations";

@elanClass(ClassOption.abstract)
export class VectorGraphic {
  // this must be implemented by hand on all stdlib classes
  static emptyInstance() {
    return new VectorGraphic();
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

  private strokeColourAsHex(strokeColour: number): string {
    if (strokeColour < 0) {
      throw new ElanRuntimeError(`strokeColour cannot be transparent (negative value)`);
    }
    return this.asColour(strokeColour);
  }
  private fillColourAsHex(fillColour: number): string {
    let colour = "";
    if (fillColour < 0) {
      colour = "none";
    } else {
      colour = this.asColour(fillColour);
    }
    return colour;
  }
  strokeAsHtml(strokeWidth: number, strokeColour: number): string {
    return `stroke="${this.strokeColourAsHex(strokeColour)}" stroke-width="${strokeWidth * 0.3}%"`;
  }

  fillAsHtml(fillColour: number): string {
    return `fill="${this.fillColourAsHex(fillColour)}"`;
  }
}
