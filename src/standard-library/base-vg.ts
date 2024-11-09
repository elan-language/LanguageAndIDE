import { ElanRuntimeError } from "../elan-runtime-error";
import { ClassOptions, ElanInt, elanClass, elanProperty } from "../elan-type-annotations";

@elanClass(ClassOptions.abstract)
export class BaseVG {
  // this must be implemented by hand on all stdlib classes
  static emptyInstance() {
    return new BaseVG();
  }

  constructor() {
    this.fill = 0xffff00;
    this.stroke = 0;
    this.strokeWidth = 1;
  }

  @elanProperty(ElanInt)
  stroke: number = 0;

  @elanProperty()
  strokeWidth: number = 0;

  @elanProperty(ElanInt)
  fill: number = 0;

  asHtml(): string {
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

  strokeAsColour(): string {
    if (this.stroke < 0) {
      throw new ElanRuntimeError(`stroke colour cannot be negative (because a stroke cannot be transparent)`);
    }
    return this.asColour(this.stroke);
  }
  fillAsColour(): string {
    let colour = "";
    if (this.fill < 0) {
      colour = "none";
    } else {
      colour = this.asColour(this.fill);
    }
    return colour;
  }

  strokeWidthPC(): number {
    return this.strokeWidth * 0.3;
  }
}
