import * as Parser from "./parser.js";
import * as Syntax from './syntax';

let program = `output 1
output (4+5)*(6+7)
return 0
output 9`

let ast = Parser.parse(program);
ast.forEach(node => {
    var result = node.evaluate();
    switch(result.action) { 
        case Syntax.Action.Return: process.exit(result.value);
    }
});
