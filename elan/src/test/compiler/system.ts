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

    private default_array = this.array([]);
    private default_list = this.list([]);
    private default_dictionary = {};
    private default_iter = this.iter([]);

    defaultList() {
        return this.default_list;
    }

    defaultIter() {
        return this.default_iter;
    }

    defaultArray() {
        return this.default_array;
    }

    defaultDictionary() {
        return this.default_dictionary;
    }

    tuple(t : Array<any>) {
        (<any>t)._type = "Tuple"; 
        return t;
    }

    list(t : Array<any>) {
        (<any>t)._type = "List"; 
        return t;
    }

    iter(t : Array<any>) {
        (<any>t)._type = "Iter"; 
        return t;
    }

    array(t : Array<any>) {
        (<any>t)._type = "Array"; 
        return t;
    }

    dictionary(t : Array<any>) {
        (<any>t)._type = "Dictionary"; 
        return t;
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
            return this.list(lhs.concat(rhs));
        }

        if (Array.isArray(lhs)){
            return this.list(lhs.concat([rhs as T]));
        }

        // if (Array.isArray(rhs)){
        return this.list([lhs as T].concat(rhs));
    }

    equals(i1 : any, i2 : any) {
        const t = typeof i1;

        if (t === "boolean" || t === "string" || t === "number") {
            return i1 === i2;
        }

        return false; // todo
    }


    objectEquals(o1: any, o2: any) {
        if (o1 === o2) {
            return true;
        }

        if (o1.constructor.name !== o2.constructor.name) {
            return false;
        }

        const o1items = Object.getOwnPropertyNames(o1);
        const o2items = Object.getOwnPropertyNames(o2);

        if (o1items.length !== o2items.length){
            return false;
        }

        if (o1items.join() !== o2items.join()){
            return false;
        }

        for (const i of o1items) {
            if (!(this.equals(o1[i], o2[i]))) {
                return false;
            }
        }

        return true;
    }
}