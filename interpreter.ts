import * as fs from 'fs';

import * as Parser from "./parser.js";
import * as Syntax from './syntax';

console.log(process.argv[2]);
fs.readFile(process.argv[2], "utf8", runProgram);

function runProgram(err, program) {
    if (err) throw (err);
    let ast = Parser.parse(program);
    ast.forEach(node => {
        var result = node.evaluate();
        switch (result.action) {
            case Syntax.Action.Return: process.exit(result.value);
        }
    })
};

