export class System {
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
            return `List [${v.map(i => this.asString(i)).join(", ")}]`;
        }

        if (typeof v === "object") {
            return `Dictionary [${Object.getOwnPropertyNames(v).map(n => `${n}:${v[n]}`).join(", ")}]`;
        }

        throw new Error("Not implemented" + typeof v);
    }

    printed : string = "";

    print(s: string) {
        this.printed = this.printed + s;
    }

    pause(n: number) {
        return new Promise(r => setTimeout(r, n));
    }
}