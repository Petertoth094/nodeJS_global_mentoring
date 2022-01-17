const csvFilePath = 'C:\\Users\\Peter_Toth9\\Documents\\LEARN\\NodeGlobalCourse\\nodejs_global_mentoring\\HW1\\csv\\nodejs-hw1-ex1.csv'

import csvtojsonV2 from 'csvtojson/v2'
import fs from 'fs'

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