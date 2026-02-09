import helpers from './helpers.js'

function parser(tokens) {
    const types = ["STRING"];
    let i = 0;

    function cursor() {
        return tokens[i];        
    };

    function is_here(what, error) {
        if (cursor() && cursor().type == what) {
            return true
        } else {
            helpers.betray(error)
            return false
        }
    }
    
    function check_type() {
        return (cursor() && is_in(types, cursor().type.toUpperCase()))
    }

    function is_in(list, value) {
        return list.includes(value)
    };
    
    while (i < tokens.length) {
        
        if (cursor() && cursor().type == "END") {
            i++; // ill change it later ok
        }

        if (cursor() && cursor().type == "IDENTIFIER" && !is_in(functions, cursor().value)) {
            helpers.betray("Theres no such command like that twin");
            break;
        }

        if (cursor() && cursor().type == "IDENTIFIER" && cursor().value == functions[0]) {
            // i hate this language
            i++
            if (!is_here("L_PARENTH", "No [ here")) break; i++
            if (!check_type()) break;

            const value = cursor().value
            i++

            if (!is_here("R_PARENTH", "No ] here")) break; i++

            console.log({
                type: "F_Sceawian",
                value: value
            })
            i++
        }
    }
}

const functions = [
    "sceawian"
]

export default {
    parser
}