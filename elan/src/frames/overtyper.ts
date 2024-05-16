export class Overtyper {
  preProcessor: (s: string | undefined) => boolean = (s) => true;
  toConsume: string = "";
  timer?: number;
  timeOut?: number;

  private activePreprocessor(k: string | undefined) {
    if (k) {
      if (this.toConsume.length > 0 && k === this.toConsume[0]) {
        this.toConsume = this.toConsume.slice(1);
        clearTimeout(this.timer);
        this.timer = setTimeout(
          () => (this.preProcessor = (s) => true),
          this.timeOut,
        ) as unknown as number;
        return false;
      }
      this.toConsume = "";
      this.preProcessor = (s) => true;
      clearTimeout(this.timer);
    }
    return true;
  }

  public consumeChars(toConsume: string, timeOut: number) {
    if (toConsume.length > 0) {
      this.timeOut = timeOut;
      this.toConsume = toConsume;
      this.preProcessor = this.activePreprocessor;
      this.timer = setTimeout(
        () => (this.preProcessor = (s) => true),
        timeOut,
      ) as unknown as number;
    }
  }
}
