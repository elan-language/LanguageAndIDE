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
    const hex = `000000${colour.toString(16)}`;
    const rgb = hex.substring(hex.length - 6, hex.length);
    return `#${rgb}`;
  }

  strokeAsColour(): string {
    return this.asColour(this.stroke);
  }
  fillAsColour(): string {
    return this.asColour(this.fill);
  }

  strokeWidthPC(): number {
    return this.strokeWidth * 0.3;
  }
}
