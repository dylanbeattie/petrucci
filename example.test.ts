import * as fs from 'fs';
import * as path from 'path';
import { Rockstar } from './interpreter';

// test('it works', () => {
//     expect(1).toBe(1);
// });

// const FIXTURES_PATH = './tests/fixtures';

testDirectory('./tests/');
function testDirectory(directory: string) {
    fs.readdirSync(directory).forEach(path_string => {
        path_string = path.join(directory, path_string);
        let stat = fs.lstatSync(path_string);
        if (stat.isDirectory()) {
            testDirectory(path_string);
        } else if (/\.rock$/i.test(path_string)) {
            test(path_string, () => {
                let expected: string = identifyExpectations(path_string);

                let program: string = fs.readFileSync(path_string, "utf8");
                let result = Rockstar.run(program);
                expect(result).toBe(expected);
            });
        }
    });
}
// describe('run programs', () => {
//     const cases: string[] = [
//         "./tests/fixtures",
//         "./tests/v1/fixtures"
//     ];
//     describe.each(cases)("all tests in %p", fixtures => {
//         fs.readdirSync(fixtures).forEach(fixture => {
//             let programPath = path.join(fixtures, fixture);
//             console.log(`Running tests from ${programPath}`);
            
//         });
//     });
// });

function identifyExpectations(programPath: string) {
    if (fs.existsSync(programPath + ".out")) {
        return fs.readFileSync(programPath + ".out", "utf8");
    } else {
        let program = fs.readFileSync(programPath, "utf8");
        let lines = program.split(/\r?\n/g);
        let expected = lines
            .filter(line => /\[expect:.*\]/.test(line))
            .map(line => line.replace(/^.*\[expect:([^\]]*)\].*/, "$1"))
            .join('\n');
        return (expected);
    }
}
