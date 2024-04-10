export class System {

    private default(type : string) {
        switch (type) {
            case ("Int"): return 0;
            case ("Float"): return 0.0;
            case ("Boolean"): return false;
            case ("String"): return "";
            case ("Char"): return "";
        }
    }

    initialise(toInit: any, toType? : string[]) {
        if (toType && Array.isArray(toInit) && toInit.length > 0) {
            for (var i = 0; i < toInit.length; i++) {
                toInit[i] = this.default(toType[0]);
            }
        }
        return toInit;
    }

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