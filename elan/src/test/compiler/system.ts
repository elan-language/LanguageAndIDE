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

    private default_array = [];
    private default_list = [];
    private default_dictionary = [];

    defaultList() {
        return this.default_list;
    }

    defaultArray() {
        return this.default_array;
    }

    defaultDictionary() {
        return this.default_dictionary;
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

    concat<T>(lhs : Array<T> | T, rhs : Array<T> | T) {
        if (Array.isArray(lhs) && Array.isArray(rhs)){
            return lhs.concat(rhs);
        }

        if (Array.isArray(lhs)){
            return lhs.concat([rhs as T]);
        }

        // if (Array.isArray(rhs)){
        return [lhs as T].concat(rhs);
    }
}