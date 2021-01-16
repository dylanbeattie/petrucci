import * as Syntax from './syntax';

export function parse(input: string, options? : any): Syntax.LanguageNode[];
export function SyntaxError(message: any, expected: any, found: any, location: any) : Syntax.ParseError;
