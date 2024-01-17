import { Statement } from "../statements/statement";
import { StatementSelector } from "../statements/statement-selector";
import { Function } from "../globals/function";

export class AsString extends Function {

    constructor() {
        super();
        this.name.enterText("asString");
        this.returnType.enterText("String");
    }
}