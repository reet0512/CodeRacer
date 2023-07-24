const prompts = [
    ["public", "static", "void", "main(String[]", "args)", "{}"],
    ["int", "a", "=", "10;", "int", "b", "=", "20;", "int", "c", "=", "a", "+", "b;"],
    ["int[]", "arr", "=", "new", "int[10];", "int", "sum", "=", "0;", "for(int", "i", "=", "0;", "i", "<", "arr.length;", "i++)", "{", "sum", "+=", "arr[i];", "}"],
    ["int[]", "arr", "=", "new", "int[10];", "int", "sum", "=", "0;", "for(int", "i", ":", "arr)", "{", "sum", "+=", "i;", "}"],
    ["String", "s", "=", "\"abcde\";", "for(int", "i", "=", "0;", "i", "<", "s.length();", "i++)", "{", "char", "c", "=", "s.charAt(i);", "}"],
]


const getPrompt = () => {
    let index = Math.floor(Math.random() * prompts.length)
    return prompts[index]
}

module.exports = getPrompt