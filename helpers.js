function welcome() {
    console.log(`
Wes hal on Hearm spraece. Thes waes getimbrod on thaem geare 2026.   
`.trim())
}

function add(f, s) {
    return f += s
}

function betray(message) {
    console.log(`
// BETRAYAL //
${message}
`.trim())
}

export default {
    welcome,
    add,
    betray
}