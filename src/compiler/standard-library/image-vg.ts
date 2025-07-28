import {
  ClassOption,
  ElanClass,
  elanClass,
  elanFunction,
  elanProcedure,
  elanProperty,
  ElanString,
  FunctionOptions,
} from "../../elan-type-annotations";
import { System } from "../../system";
import { VectorGraphic } from "./vector-graphic";

@elanClass(ClassOption.concrete, [], [], [ElanString], [ElanClass(VectorGraphic)])
export class ImageVG extends VectorGraphic {
  static emptyInstance() {
    return new ImageVG();
  }

  async _initialise(url: string) {
    this.url = url;
    return this;
  }

  private system?: System;

  constructor(copy?: ImageVG) {
    super();
    this.x = copy ? copy.x : 0;
    this.y = copy ? copy.y : 0;
    this.width = copy ? copy.width : 13.2;
    this.height = copy ? copy.height : 13.2;
    this.url = copy ? copy.url : "";
    this.alt = copy ? copy.alt : "";
  }

  @elanProperty()
  x: number = 0;

  @elanProcedure(["x"])
  setX(x: number) {
    this.x = x;
  }

  @elanFunction(["x"], FunctionOptions.pure, ElanClass(ImageVG))
  withX(x: number): ImageVG {
    const copy = this.system!.initialise(new ImageVG(this));
    copy.x = x;
    return copy;
  }

  @elanProperty()
  y: number = 0;

  @elanProcedure(["y"])
  setY(y: number) {
    this.y = y;
  }

  @elanFunction(["y"], FunctionOptions.pure, ElanClass(ImageVG))
  withY(y: number): ImageVG {
    const copy = this.system!.initialise(new ImageVG(this));
    copy.y = y;
    return copy;
  }

  @elanProperty()
  alt: string;

  @elanProcedure(["alt"])
  setAlt(alt: string) {
    this.alt = alt;
  }

  @elanFunction(["alt"], FunctionOptions.pure, ElanClass(ImageVG))
  withAlt(alt: string): ImageVG {
    const copy = this.system!.initialise(new ImageVG(this));
    copy.alt = alt;
    return copy;
  }

  @elanProperty()
  width: number; // for same (default) size as thumbnail in code

  @elanProcedure(["width"])
  setWidth(width: number) {
    this.width = width;
  }

  @elanFunction(["width"], FunctionOptions.pure, ElanClass(ImageVG))
  withWidth(width: number): ImageVG {
    const copy = this.system!.initialise(new ImageVG(this));
    copy.width = width;
    return copy;
  }

  @elanProperty()
  height: number = 13.2; // see width

  @elanProcedure(["height"])
  setHeight(height: number) {
    this.height = height;
  }

  @elanFunction(["height"], FunctionOptions.pure, ElanClass(ImageVG))
  withHeight(height: number): ImageVG {
    const copy = this.system!.initialise(new ImageVG(this));
    copy.height = height;
    return copy;
  }

  @elanProperty()
  url: string = "";

  @elanFunction([], FunctionOptions.pure)
  getUrl(): string {
    return this.url;
  }

  @elanProperty()
  title: string = "";

  @elanProcedure(["title"])
  setTitle(title: string) {
    this.title = title;
  }

  @elanFunction(["title"], FunctionOptions.pure, ElanClass(ImageVG))
  withTitle(title: string): ImageVG {
    const copy = this.system!.initialise(new ImageVG(this));
    copy.title = title;
    return copy;
  }

  asSVG(): string {
    return `<image x="${this.x}%" y="${this.y / 0.75}%" width="${this.width}" height="${this.height / 0.75}" href="${this.url}" title="${this.title}" alt="${this.alt}"/>`; //TODO style, size etc
  }

  async asString() {
    return `<img src='${this.url}' width='${this.width}' height='${this.height}' title='${this.title}' alt='${this.alt}'>`; //TODO style, size etc
  }
}
