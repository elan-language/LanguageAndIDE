export class Overtyper {

    preProcessor : (s : string) => boolean = (s) => true;
    toFilter : string = "";

    private activePreprocessor(k : string) {
        if (this.toFilter.length > 0 && k === this.toFilter[0]) {
            this.toFilter = this.toFilter.slice(1);
            return false;
        }
        this.toFilter = "";
        this.preProcessor = (s) => true;
        return true;
    }

    public consumeChars(toConsume: string, timeOut: number) {
        if (toConsume.length > 0) {
            this.toFilter = toConsume;
            this.preProcessor = this.activePreprocessor;
            setTimeout(() => this.preProcessor = (s) => true, timeOut);
        }
    }
}