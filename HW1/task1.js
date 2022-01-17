/**
 * Write a program which reads a string from the standard input stdin, reverses it and then writes it to the standard output stdout.
 * 
 * The program should be started from npmscript via nodemon(i.e. npm run task1).
 * The program should be running in a stand-by mode and should not be terminated after the first-stringprocessing.
 */

const readline = require('readline')
const r1 = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
})

r1.on('line', function(line){
    console.log(line.split('').reverse().join('') + '\n');
})


// process.stdin.on('data', data => {
//     console.log(`${data.reverse().toString()}`);
// });