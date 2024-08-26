export class Overtyper {
  finishedConsuming: (s: string | undefined) => boolean = (s) => true;
  toConsume: string = "";
  timer?: number;
  timeOut?: number;

  private consuming(k: string | undefined) {
    if (k) {
      if (this.toConsume.length > 0 && k === this.toConsume[0]) {
        this.toConsume = this.toConsume.slice(1);
        clearTimeout(this.timer);
        this.timer = setTimeout(
          () => (this.finishedConsuming = (s) => true),
          this.timeOut,
        ) as unknown as number;
        return false;
      }
      this.toConsume = "";
      this.finishedConsuming = (s) => true;
      clearTimeout(this.timer);
    }
    return true;
  }

  public consumeChars(toConsume: string, timeOut: number) {
    if (toConsume.length > 0) {
      this.timeOut = timeOut;
      this.toConsume = toConsume;
      this.finishedConsuming = this.consuming;
      this.timer = setTimeout(
        () => (this.finishedConsuming = (s) => true),
        timeOut,
      ) as unknown as number;
    }
  }
}
