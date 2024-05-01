export class StdLib {
    private Array = "Array";
    private List = "List";
    private Tuple = "Tuple";
    private Iter = "Iter";
    private Dictionary = "Dictionary";


    asString(v: any): string {
        if (typeof v === "boolean") {
            return v ? "true" : "false";
        }

        if (typeof v === "string") {
            return v.toString();
        }

        if (typeof v === "number") {
            return v.toString();
        }

        if (Array.isArray(v)) {
            const type = (<any>v)._type;

            switch (type) {
                case this.List:
                    if (v.length === 0) {
                        return "empty List";
                    }
                    return `List [${v.map(i => this.asString(i)).join(", ")}]`;
                case this.Tuple:
                    return `Tuple (${v.map(i => this.asString(i)).join(", ")})`;
                case this.Array:
                    if (v.length === 0) {
                        return "empty Array";
                    }
                    return `Array [${v.map(i => this.asString(i)).join(", ")}]`;
                case this.Iter:
                    if (v.length === 0) {
                        return "empty Iter";
                    }
                    return `Iter [${v.map(i => this.asString(i)).join(", ")}]`;
                default:
                    throw new Error("_type not set"); 
            }
        }

        if (typeof v === "object" && "asString" in v) {
            return v.asString();
        }

        if (typeof v === "object" && v.constructor.name === "Object") {
            const items = Object.getOwnPropertyNames(v);
            if (items.length === 0) {
                return "empty Dictionary";
            }

            return `Dictionary [${items.map(n => `${n}:${v[n]}`).join(", ")}]`;
        }

        if (typeof v === "object") {
            return `a ${v.constructor.name}`;
        }

        throw new Error("Not implemented" + typeof v);
    }

    asArray(list: Array<number>): Array<number> {
        const arr = [...list] as any;
        arr._type = this.Array;
        return arr;
    }

    asList(arr: Array<number>): Array<number> {
        const list = [...arr] as any;
        list._type = this.List;
        return list;
    }

    keys(dict: { [key: string]: number }): Array<string> {
        const lst = Object.getOwnPropertyNames(dict) as any;
        lst._type = this.List;
        return lst;
    }

    values(dict: { [key: string]: number }): Array<number> {
        const lst =  this.keys(dict).map(k => dict[k]) as any;
        lst._type = this.List;
        return lst;
    }

    hasKey(dict: { [key: string]: number }, key: string): boolean {
        return this.keys(dict).includes(key);
    }

    setItem(dict: { [key: string]: number }, key: string, value : number){
        var newDict = {...dict};
        newDict[key] = value;
        return newDict;
    }

    removeItem(dict: { [key: string]: number }, key: string){
        var newDict = {...dict};
        delete newDict[key];
        return newDict;
    }

    length(coll : any){
        if (typeof coll === "string") {
            return coll.length;
        }
        if (Array.isArray(coll)) {
            return coll.length;
        }
        return this.keys(coll).length;
    }

    isBefore(s1 : string, s2 : string){
        return s1 < s2;
    }

    isAfter(s1 : string, s2 : string){
        return s1 > s2;
    }

    isAfterOrSameAs(s1 : string, s2 : string){
        return s1 > s2 || s1 === s2;
    }

    isBeforeOrSameAs(s1 : string, s2 : string){
        return s1 < s2 || s1 === s2;
    }

    first<T>(st : Array<T>){
        return st[0];
    }

    second<T>(st : Array<T>){
        return st[1];
    }

    indexOf(s1 : string, s2 : string){
        return s1.indexOf(s2);
    }

    floor(n: number) {
        return Math.floor(n);
    }
    ceiling(n: number) {
        var fl = this.floor(n);
        return n > fl ? fl + 1 : fl;
    }
   
    pi = Math.PI;

    sin = Math.sin;

    cos = Math.cos;

    min = Math.min;

    newline = "\n";
}