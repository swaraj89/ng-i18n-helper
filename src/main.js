const program = require('commander');
const chalk = require('chalk');

const package = require('../package.json');
const convert = require('./xmlToXls')

const { log, error, debug, info } = console;

let sourceXml="", 
    outFile="";

program
    .version(package.version)
    .description(package.version);

program
    .command('toXls <sourceXml> [outFile]')
    .alias('s')
    .option("-s, --toxls [xmlPath] <outFile>", "Enter the source xml and converts to excel")
    .description('takes source xml')
    .action((sourceXml, outFile) => {
        handleToXls(sourceXml, outFile);
    });


program.parse(process.argv);

function handleToXls(xml, xls){
    if(!xml){
        log(chalk.red('Aborting! No input given. Refer help.'));
        return;
    }
    var isValidXmlPath = xml.match(/\.(xlf|xlf2|xmb)$/i);
    if (xml && !isValidXmlPath){
        log(chalk.red('Aborting!Not a valid NG translation file.'));
        return;
    }

    if(!xls){
        log(chalk.yellow('You have not provided any output folder location for excel file. Output will be avilable at the current folder.'));
        xls = './';
    }

    log(chalk.green('Starting conversion'));
    toXls(xml, xls);
}

function toXls(srcXml, outXls){
    try {
        convert.xmlToXls(srcXml, outXls);
    } catch (_error) {
        error(chalk.red(_error));
    }
}