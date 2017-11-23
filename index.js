const program = require('commander');

program
    .version('0.0.1')
    .description('This program helps you to convert angularjs translation text to excel sheet');

program
    .command('convert [sourceXml] <outFile>')
    .alias('c')
    .option("c, convert [xmlPath] <outFile>", "Enter the source xml and converts to excel")
    .description('takes source xml')
    .action((sourceXml, outFile)=>{
        console.log(sourceXml, outFile);
    });


// console.log(program);
program.parse(process.argv);   