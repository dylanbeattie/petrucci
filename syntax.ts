export abstract class LanguageNode {
    abstract evaluate(): any;
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

export abstract class BinaryNode implements LanguageNode {
    abstract evaluate(): Result;
    lhs: LanguageNode;
    rhs: LanguageNode;
    constructor(lhs: LanguageNode, rhs: LanguageNode) {
        this.lhs = lhs;
        this.rhs = rhs;
    }
}

export class AdditionNode extends BinaryNode {
    evaluate() {
        return new Result(this.lhs.evaluate().value + this.rhs.evaluate().value);
    }
}

export class MultiplicationNode extends BinaryNode {
    evaluate() {        
        return new Result(this.lhs.evaluate().value * this.rhs.evaluate().value);
    }
}

export class NumberNode extends LanguageNode {
    value: Number;
    constructor(value: Number) {
        super();
        this.value = value;
    }
    evaluate() { return new Result(this.value); }
}

export class OutputNode extends LanguageNode {
    node: LanguageNode;
    constructor(node: LanguageNode) {
        super();
        this.node = node;
    }
    evaluate() {
        let value = this.node.evaluate().value;
        console.log(value);
        return new Result(value);
    }
}

export class ReturnNode extends LanguageNode {
    node: LanguageNode;
    constructor(node: LanguageNode) {
        super();
        this.node = node;
    }
    evaluate() {   
        let value = this.node.evaluate().value;
        return new Result(value, Action.Return);
    }
}
