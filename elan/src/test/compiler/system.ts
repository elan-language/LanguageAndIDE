export class System {
    printed : string = "";

    inputed : string = "";

    print(s: string) {
        this.printed = this.printed + s;
    }

    async input() {
        return this.inputed;
    }

    pause(n: number) {
        return new Promise(r => setTimeout(r, n));
    }
}