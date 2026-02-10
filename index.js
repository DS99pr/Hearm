//
// HEARM PROGRAMMING LANGUAGE (2026)
//

// IMPORTS
import readline from 'readline'
import helpers from './helpers.js'
import parser from './parser.js'
import interpreter from './interpreter.js'
import consts from './consts.js'

// INTERFACE
const rli = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

//
// LEXER
//

function lexer(input) {
    // i need to rewrite ts
    let i = 0;
    let tokens = [];
    let nc = ""; // number cache
    let kc = ""; // identifier cache (originally: keyword cache)
    let sc = ""; // string cache

    function cursor() {
        return input[i]
    }

    function check(char, type, value) {
        if (cursor() == char) {
            tokens.push({type: type, value: value})
        }
    }

    while (i < input.length) {

        if (nc.length > 0 && !/[0-9]/.test(cursor())) {
            tokens.push({type: consts.NUMBER_TYPE, value: Number(nc)});
            nc = "";
        }

        if (kc.length > 0 && !/[a-zA-Z]/.test(cursor())) {
            tokens.push({type: consts.IDENTIFIER_TYPE, value: kc.toLowerCase()});
            kc = ""; 
        }

        if (/[0-9]/.test(cursor())) {
            nc = helpers.add(nc, cursor())
        }

        if (cursor() == `"`) {
            i++
            while (cursor() != `"`) {
                sc = helpers.add(sc, cursor())
                i++
            } // FIXME: infinite loop
            tokens.push({type: consts.STRING_TYPE, value: sc})
        };

        if (/[a-zA-Z]/.test(cursor())) {
            kc = helpers.add(kc, cursor())
        }

        check("[", consts.LEFT_PARENTHESIS, "[")
        check("]", consts.RIGHT_PARENTHESIS, "]")
        check(";", consts.SEMICOLON, ";")

        if (/\s/.test(cursor())) {
            i++;
            continue;
        }
        i++;
    }

    if (nc.length > 0) {
        tokens.push({type: consts.NUMBER_TYPE, value: Number(nc)});
        nc = "";
    }

    if (kc.length > 0) {
        tokens.push({type: consts.IDENTIFIER_TYPE, value: kc.toLowerCase()});
        kc = "";
    }

    console.log(tokens)
    return tokens
}

// 
// REPL
// 

helpers.welcome();
function repl() {
    rli.question('>> ', (input) => {
        const tokens = lexer(input);
        const asts = parser.parser(tokens)
        interpreter.interpreter(asts)
        repl()
    });
};

repl()
