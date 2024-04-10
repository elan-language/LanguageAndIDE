export class StdLib {

    asArray(list: Array<number>): Array<number> {
        return list;
    }

    asList(list: Array<number>): Array<number> {
        return list;
    }

    keys(dict: { [key: string]: number }): Array<string> {
        return Object.getOwnPropertyNames(dict);
    }

    values(dict: { [key: string]: number }): Array<number> {
        return this.keys(dict).map(k => dict[k]);
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

    pi = Math.PI;

    sin = Math.sin;

    cos = Math.cos;

    min = Math.min;
}