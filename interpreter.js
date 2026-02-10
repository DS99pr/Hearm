import consts from './consts.js'

function interpreter(asts) {
    if (asts.length >= 1) {
        for (let ast of asts) {
            if (ast.type == consts.DISPLAY_FUNCTION_AST) {
                if (ast.value) {
                    const value = ast.value

                    console.log(value)
                }
            }
        }
    }
}

export default {
    interpreter
}
