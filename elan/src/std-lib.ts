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

    hasKey(dict: { [key: string]: number }, key: string): boolean {
        return this.keys(dict).includes(key);
    }
}