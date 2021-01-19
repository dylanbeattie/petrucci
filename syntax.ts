export class Environment {
    output(arg: any) { }
    constructor(output: (arg: any) => void) {
        this.output = output;
    }
}

export abstract class LanguageNode {
    abstract evaluate(env: Environment): Result;
}

export interface ParseError {
    message: string;
    expected: string;
    found: string;
    location: string
    name: string;
}

export enum Action {
    None,
    Return
}

export class Result {
    value: any;
    action: Action;
    constructor(value: any, action = Action.None) {
        this.value = value;
        this.action = action;
    }
}

// export abstract class BinaryNode implements LanguageNode {
//     abstract evaluate(env: Environment): Result;
//     lhs: LanguageNode;
//     rhs: LanguageNode;
//     constructor(lhs: LanguageNode, rhs: LanguageNode) {
//         this.lhs = lhs;
//         this.rhs = rhs;
//     }
// }

// export class AdditionNode extends BinaryNode {
//     evaluate(env: Environment) {
//         return new Result(this.lhs.evaluate(env).value + this.rhs.evaluate(env).value);
//     }
// }

// export class MultiplicationNode extends BinaryNode {
//     evaluate(env: Environment) {        
//         return new Result(this.lhs.evaluate(env).value * this.rhs.evaluate(env).value);
//     }
// }

export class NumberNode extends LanguageNode {
    value: Number;
    constructor(value: Number) {
        super();
        this.value = value;
    }
    evaluate(env: Environment) { return new Result(this.value); }
}

export class OutputNode extends LanguageNode {
    node: LanguageNode;
    constructor(node: LanguageNode) {
        super();
        this.node = node;
    }
    evaluate(env: Environment) {
        let value = this.node.evaluate(env).value;
        env.output(value);
        return new Result(value);
    }
}

// export class ReturnNode extends LanguageNode {
//     node: LanguageNode;
//     constructor(node: LanguageNode) {
//         super();
//         this.node = node;
//     }
//     evaluate(env: Environment) {   
//         let value = this.node.evaluate(env).value;
//         return new Result(value, Action.Return);
//     }
// }
