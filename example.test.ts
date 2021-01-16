import * as fs from 'fs';
import * as path from 'path';
import { Rockstar } from './interpreter';

test('it works', () => {
    expect(1).toBe(1);
});

const FIXTURES_PATH = './tests/fixtures';

describe('run programs', () => {
    fs.readdirSync(FIXTURES_PATH).forEach(fixture => {
        let programPath = path.join(FIXTURES_PATH, fixture);
        testProgram(programPath);
    });
});

function testProgram(programPath) {
    test(programPath, () => {
        let program = fs.readFileSync(programPath, "utf8");
        let expected = extractExpectationsFrom(program);
        let result = Rockstar.run(program);
        expect(result).toBe(expected);
    });
}

function extractExpectationsFrom(program) {
    let lines = program.split(/\r?\n/g);
    let expected = lines
        .filter(line => /\[expect:.*\]/.test(line))
        .map(line => line.replace(/^.*\[expect:([^\]]*)\].*/, "$1"))
        .join('\n');
    return (expected);
}
