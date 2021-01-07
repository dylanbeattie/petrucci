import * as fs from 'fs';
import { STATUS_CODES } from 'http';

import * as Parser from "./parser.js";
import * as Syntax from './syntax';

fs.readFile(process.argv[2], "utf8", runProgram);

function runProgram(err, program) {
    if (err) throw (err);
    let ast = Parser.parse(program);
    let stdout = [];
    let env = new Syntax.Environment(stdout.push.bind(stdout));
    mainLoop: for(var i = 0; i < ast.length; i++) {
        var result = ast[i].evaluate(env);
        switch (result.action) {
            case Syntax.Action.Return: break mainLoop;
        }
    }
};

