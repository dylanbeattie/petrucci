import * as fs from 'fs';
import * as Parser from "./parser.js";
import * as Syntax from './syntax';

// fs.readFile(process.argv[2], "utf8", runProgram);

function runProgram(err: any, program: string) {
    if (err) throw (err);
    var result = Rockstar.run(program);
    console.log(result);
};
export class Rockstar {
    static run(program: string) {
        let ast = Parser.parse(program);
        let stdout : string[] = [];
        let env = new Syntax.Environment(stdout.push.bind(stdout));
        mainLoop: for (var i = 0; i < ast.length; i++) {
            var result = ast[i].evaluate(env);
            switch (result.action) {
                case Syntax.Action.Return: break mainLoop;
            }
        }
        return (stdout.join('\n'));
    }
}
