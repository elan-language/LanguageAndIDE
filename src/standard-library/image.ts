import {
  ClassOption,
  ElanClass,
  elanClass,
  elanFunction,
  elanProcedure,
  elanProperty,
  FunctionOptions,
} from "../elan-type-annotations";
import { System } from "../system";
import { VectorGraphic } from "./vector-graphic";

@elanClass(ClassOption.concrete, [], [], [], [ElanClass(VectorGraphic)])
export class Image extends VectorGraphic {
  static emptyInstance() {
    return new Image();
  }

  async _initialise() {
    return this;
  }

  private system?: System;

  constructor(copy?: Image) {
    super(copy);
    this.fillColour = copy ? copy.fillColour : 0xffff00;
    this.strokeColour = copy ? copy.strokeColour : 0;
    this.strokeWidth = copy ? copy.strokeWidth : 1;
  }

  @elanProperty()
  x: number = 0;

  @elanProcedure(["x"])
  setX(x: number) {
    this.x = x;
  }

  @elanFunction(["x"], FunctionOptions.pure, ElanClass(Image))
  withX(x: number): Image {
    const copy = this.system!.initialise(new Image(this));
    copy.x = x;
    return copy;
  }

  @elanProperty()
  y: number = 0;

  @elanProcedure(["y"])
  setY(y: number) {
    this.y = y;
  }

  @elanFunction(["y"], FunctionOptions.pure, ElanClass(Image))
  withY(y: number): Image {
    const copy = this.system!.initialise(new Image(this));
    copy.y = y;
    return copy;
  }

  @elanProperty()
  width: number = 0;

  @elanProcedure(["width"])
  setWidth(width: number) {
    this.width = width;
  }

  @elanFunction(["width"], FunctionOptions.pure, ElanClass(Image))
  withWidth(width: number): Image {
    const copy = this.system!.initialise(new Image(this));
    copy.width = width;
    return copy;
  }

  @elanProperty()
  height: number = 0;

  @elanProcedure(["height"])
  setHeight(height: number) {
    this.height = height;
  }

  @elanFunction(["height"], FunctionOptions.pure, ElanClass(Image))
  withHeight(height: number): Image {
    const copy = this.system!.initialise(new Image(this));
    copy.height = height;
    return copy;
  }

  @elanProperty()
  url: string = "";

  @elanProcedure(["url"])
  setUrl(url: string) {
    this.url = url;
  }

  @elanFunction(["url"], FunctionOptions.pure, ElanClass(Image))
  withUrl(url: string): Image {
    const copy = this.system!.initialise(new Image(this));
    copy.url = url;
    return copy;
  }

  asSVG(): string {
    return `<image x="${this.x}%" y="${this.y / 0.75}%" width="${this.width}" height="${this.height / 0.75}" href="${this.url}" />`; //TODO style, size etc
  }

  async asString() {
    return `<img src="${this.url}" width="${this.width}" height="${this.height}">`; //TODO style, size etc
  }
}
