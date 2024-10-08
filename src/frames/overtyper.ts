export class Overtyper {
  hasNotConsumed: (s: string | undefined) => boolean = (s) => true;
  toConsume: string = "";
  timer?: number;
  timeOut?: number;

  private consuming(k: string | undefined) {
    if (k) {
      if (this.toConsume.length > 0 && k === this.toConsume[0]) {
        this.toConsume = this.toConsume.slice(1);
        clearTimeout(this.timer);
        this.timer = setTimeout(
          () => (this.hasNotConsumed = (s) => true),
          this.timeOut,
        ) as unknown as number;
        return false;
      }
      this.toConsume = "";
      this.hasNotConsumed = (s) => true;
      clearTimeout(this.timer);
    }
    return true;
  }

  public consumeChars(toConsume: string, timeOut: number) {
    if (toConsume.length > 0) {
      this.timeOut = timeOut;
      this.toConsume = toConsume;
      this.hasNotConsumed = this.consuming;
      this.timer = setTimeout(
        () => (this.hasNotConsumed = (s) => true),
        timeOut,
      ) as unknown as number;
    }
  }
}
