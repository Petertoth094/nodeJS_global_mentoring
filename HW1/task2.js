/**
 * https://epam.sharepoint.com/sites/EPAMNode.jsGlobalMentoringProgram/Shared%20Documents/General/Homework/Module%201/Homework%201.pdf
 */
const csvtojsonV2=require("csvtojson/v2");
const fs = require('fs')
const path = require('path')

const csvFilePath = path.join(__dirname, './csv/nodejs-hw1-ex1.csv')


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

// const readStream = fs.createReadStream(csvFilePath)
// const writeStream =fs.createWriteStream('./HW1/csv/output.txt', {flags: 'a'})

// readStream
//     .on('error', () => {
//         console.log('Reading file not successful!');
//     })
//     .pipe(csvtojsonV2(csvFilePath))
//     .pipe(writeStream)
//     .on('error', () => {
//         console.log('Writing was not successful');
//     })