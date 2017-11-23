const xml2js = require('xml2js');
const fs = require('fs');
const path = require('path');
const excelbuilder = require('msexcel-builder');

const xmlPath = "test.xlf";

const parser = new xml2js.Parser();

fs.readFile(xmlPath, 'utf8',function (err, data) {
    if(err){
        console.log(err);
        return;
    }

    parser.parseString(data, function (err, result) {
        // Create a new workbook file in current working-path 
        var workbook = excelbuilder.createWorkbook('./', 'translations.xlsx')

        // Create a new worksheet with 3 columns and 120 rows 
        var sheet1 = workbook.createSheet('sheet1', 3, 120);

        // Create the Header row
        sheet1.set(1, 1, 'Client Id');
        sheet1.set(2, 1, 'Source');
        sheet1.set(3,  1, 'Target');
        
        
        // Save it 
        var translations = result.xliff.file[0].body[0]["trans-unit"];

        translations.map((translation, index) => {
            const {$, source, target } = translation;
            
            sheet1.set(1, (index + 2), $.id);
            sheet1.set(2, (index + 2), source[0]);
            sheet1.set(3, (index + 2), target[0]);
        });
        

        fs.access('./translations.xlsx', 'r', (err) => {
            if (err) {
                if (err.code === 'EEXIST') {
                    console.error('File already exists. Will delete the file and create a new copy.');
                    fs.unlink('./translations.xlsx', (err) => {
                        console.log("File Exists. Deleting.")

                        if (err)
                            throw err;

                        console.log('successfully deleted translations.xlsx');
                    });
                    return;
                }

                if (err.code === 'ENOENT'){
                    return;
                }

                throw err;
            }
        });

        try{
            workbook.save(function (ok) {
                console.log('Workbook creation started.');

                if (!ok)
                    workbook.cancel();
                
                console.log('congratulations, your workbook created');
            });
        }catch(ex){
            console.error(ex);
        }
    });
});