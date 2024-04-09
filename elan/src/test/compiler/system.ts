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

        throw new Error("Not implemented");
    }

    printed : string = "";

    print(s: string) {
        this.printed = this.printed + s;
    }

    pause(n: number) {
        return new Promise(r => setTimeout(r, n));
    }
}