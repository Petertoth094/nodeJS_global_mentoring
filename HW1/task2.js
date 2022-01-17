/**
 * https://epam.sharepoint.com/sites/EPAMNode.jsGlobalMentoringProgram/Shared%20Documents/General/Homework/Module%201/Homework%201.pdf
 */

const csvFilePath = 'C:\\Users\\Peter_Toth9\\Documents\\LEARN\\NodeGlobalCourse\\nodejs_global_mentoring\\HW1\\csv\\nodejs-hw1-ex1.csv'

const csvtojsonV2=require("csvtojson/v2");
const fs = require('fs')

csvtojsonV2()
    .fromFile(csvFilePath)
    .subscribe( json => {
        const data = JSON.stringify(json) + '\n'
        // console.log(data);
        const fileStream = fs.createWriteStream('./HW1/csv/output.txt', {flags: 'a'})
        fileStream.write(data)
    }, (err) => {
        console.log(err);
    })

// csvtojsonV2()
//     .on('error', err => {
//         console.log(err);
//     })
//     .fromFile(csvFilePath)
//     .subscribe(json =>{
//         // console.log(json);
//          const data = JSON.stringify(json) + '\n'
//         fs.appendFile('./HW1/csv/output.txt', data, err => {
//             if(err){
//                 console.log(err);
//             }
//         })
//     })