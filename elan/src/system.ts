export class System {

    private default(type : string) {
        switch (type) {
            case ("Int"): return 0;
            case ("Float"): return 0.0;
            case ("Boolean"): return false;
            case ("String"): return "";
        }
        return undefined;
    }

    private default_array = this.array(0);
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

    wrapArray(t : Array<any>) {
        (<any>t)._type = "Array"; 
        return t;
    }

    array(size1: number, size2?: number) {
        const arr = new Array(size1);
        if (size2) {
            for (var i = 0; i <= size1; i++) {
                const a2 = new Array(size2);
                (<any>a2)._type = "Array";
                arr[i] = a2;
            }
        }
        (<any>arr)._type = "Array";
        return arr;
    }

    dictionary(t : Array<any>) {
        (<any>t)._type = "Dictionary"; 
        return t;
    }

    initialise(toInit: any, toType? : string[]) {
        if (toType && Array.isArray(toInit) && toInit.length > 0) {
            for (var i = 0; i < toInit.length; i++) {
                if (Array.isArray(toInit[i])){
                    this.initialise(toInit[i], toType);
                }
                else {
                    toInit[i] = this.default(toType[0]);
                }
            }
        }
        return toInit;
    }

    defaultClass(type : any, properties : [string, any][]){
        const t = Object.create(type.prototype);

        for(const p of properties) {
            t[p[0]] = this.default(p[1]);
        }

        return t;
    }

    printer? : (s : string) => void; 

    inputter? : () => Promise<string>;
   
    print(s: string) {
        this.printer!(s);
    }

    async input() {
        return this.inputter!();
    }

    assert(actual : any, expected : any) {
        if (actual !== expected) {
            throw new Error(`actual ${actual}, expected ${expected}`);
        }
    }

    getTests(program : any) {
        
        return Object.getOwnPropertyNames(program).filter(s => s.startsWith("_test_")).map(f => program[f]);
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

        return this.objectEquals(i1, i2); // todo
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

        for (const i of o1items.filter(i => !i.startsWith("_"))) {
            if (!(this.equals(o1[i], o2[i]))) {
                return false;
            }
        }

        return true;
    }
}