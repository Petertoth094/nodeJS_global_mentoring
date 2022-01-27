/**
 * https://epam.sharepoint.com/sites/EPAMNode.jsGlobalMentoringProgram/Shared%20Documents/General/Homework/Module%201/Homework%201.pdf
 * TASK 1
 */

// const readline = require('readline')
// const r1 = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout,
//     terminal: false
// })

// r1.on('line', function(line){
//     console.log(line.split('').reverse().join('') + '\n');
// })

process.stdin.on('data', (data) => {
  console.log(`${data.reverse().toString()}`);
});
