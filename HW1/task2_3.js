
import csvtojsonV2 from 'csvtojson/v2'
import fs from 'fs'
import path from 'path'

const csvFilePath = path.join(__dirname, './csv/nodejs-hw1-ex1.csv')
const fileStream = fs.createWriteStream('./HW1/output/output2.txt')

fileStream.on('error', (err) => {
    console.log('Writing error');
})

csvtojsonV2()
    .fromFile(csvFilePath)
    .subscribe( json => {
        const data = JSON.stringify(json) + '\n'
        // console.log(data);
        fileStream.write(data)
    }, (err) => {
        console.log(err);
    })


// const readStream = fs.createReadStream(csvFilePath)
// const writeStream =fs.createWriteStream('./HW1/output/output2.txt', {flags: 'a'})

// readStream
//     .on('error', () => {
//         console.log('Reading file not successful!');
//     })
//     .pipe(csvtojsonV2(csvFilePath))
//     .pipe(writeStream)
//     .on('error', () => {
//         console.log('Writing was not successful');
//     })