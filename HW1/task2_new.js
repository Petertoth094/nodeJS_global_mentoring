
import csvtojsonV2 from 'csvtojson/v2'
import fs from 'fs'
import path from 'path'

const csvFilePath = path.resolve(__dirname, '..', 'HW1', 'csv', 'nodejs-hw1-ex1.csv')

csvtojsonV2()
    .fromFile(csvFilePath)
    .subscribe( json => {
        const data = JSON.stringify(json) + '\n'
        // console.log(data);
        const fileStream = fs.createWriteStream('./HW1/csv/output2.txt', {flags: 'a'})
        fileStream.write(data)
    }, (err) => {
        console.log(err);
    })


// const readStream = fs.createReadStream(csvFilePath)
// const writeStream =fs.createWriteStream('./HW1/csv/output2.txt', {flags: 'a'})

// readStream
//     .on('error', () => {
//         console.log('Reading file not successful!');
//     })
//     .pipe(csvtojsonV2(csvFilePath))
//     .pipe(writeStream)
//     .on('error', () => {
//         console.log('Writing was not successful');
//     })