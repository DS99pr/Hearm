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
// REPL
// 

helpers.welcome();
function repl() {
    rli.question('>> ', () => {
        repl();
    });
};

repl()