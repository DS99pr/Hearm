//
// HEARM PROGRAMMING LANGUAGE (2026)
//

// IMPORTS
import readline from 'readline'
import helpers from './helpers.js'

// INTERFACE
const rli = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

//
// LEXER
//

function lexer(input) {
    let i = 0;
    let tokens = [];
    let nc = ""; // number cache
    let kc = ""; // identifier cache (originally: keyword cache)

    function cursor() {
        return input[i]
    }

    while (i < input.length) {

        if (nc.length > 0 && !/[0-9]/.test(cursor())) {
            tokens.push({type: "NUMBER", value: Number(nc)});
            nc = "";
        }

        if (kc.length > 0 && !/[a-zA-Z]/.test(cursor())) {
            tokens.push({type: "IDENTIFIER", value: kc});
            kc = ""; 
        }

        if (/[0-9]/.test(cursor())) {
            nc = helpers.add(nc, cursor())
        }

        if (/[a-zA-Z]/.test(cursor())) {
            kc = helpers.add(kc, cursor())
        }

        if (/\s/.test(cursor())) {
            i++;
            continue;
        }
        i++;
    }

    if (nc.length > 0) {
        tokens.push({type: "NUMBER", value: Number(nc)});
        nc = "";
    }

    if (kc.length > 0) {
        tokens.push({type: "IDENTIFIER", value: kc});
        kc = "";
    }

    console.log(tokens)
};

// 
// REPL
// 

helpers.welcome();
function repl() {
    rli.question('>> ', (input) => {
        lexer(input);
        repl()
    });
};

repl()