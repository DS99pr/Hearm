import helpers from './helpers.js'
import consts from './consts.js'
import errors from './betrayals.js'

function parser(tokens) {
    const types = [
        consts.STRING_TYPE,
        consts.NUMBER_TYPE
    ];
    const ignored_tokens = [
        consts.SEMICOLON,
        consts.LEFT_PARENTHESIS,
        consts.RIGHT_PARENTHESIS
    ]
    const asts = []
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
    
    function check_type(error) {
        if (cursor() && is_in(types, cursor().type.toUpperCase())) { 
            return true
        } else {
            helpers.betray(error)
            return false
        }
    }

    function is_identifier() {
        return (cursor() && cursor().type == consts.IDENTIFIER_TYPE)
    }

    function is_in(list, value) {
        return list.includes(value)
    };
    
    while (i < tokens.length) {
        
        if (cursor() && is_in(ignored_tokens, cursor().type)) {
            i++; // ill change it later ok
        }

        if (cursor() && is_in(types, cursor().type)) {
            i++;
        }

        if (is_identifier() && !is_in(functions, cursor().value)) {
            helpers.betray(errors.NO_FUNCTION);
            break;
        }

        if (is_identifier() && cursor().value == functions[0]) {
            // i hate this language
            i++
            if (!is_here(consts.LEFT_PARENTHESIS, errors.NO_LEFT_PARENTHESIS)) break; i++
            if (!check_type(errors.NO_TYPE_HERE)) break;

            const value = cursor().value
            i++

            if (!is_here(consts.RIGHT_PARENTHESIS, errors.NO_RIGHT_PARENTHESIS)) break; i++

            const ast = ({
                type: consts.DISPLAY_FUNCTION_AST,
                value: value
            })
            asts.push(ast)
        
            i++
        }
    }
    return asts
}

const functions = [
    consts.DISPLAY_FUNCTION_DISPLAY
]

export default {
    parser
}
