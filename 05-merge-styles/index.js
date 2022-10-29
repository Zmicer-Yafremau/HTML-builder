const fs = require('fs');
const path = require('path');
let data='';
const stylesDirPath = path.join(__dirname,'styles');
const bundleDirPath = path.join(__dirname,'project-dist');

function mergeStyles(file){
let input = fs.createReadStream(path.join(stylesDirPath,file), 'utf-8');
let output = fs.createWriteStream(path.join(bundleDirPath,'bundle.css'));
input.on('data', chunk => output.write(data+=chunk));
input.on('error', error => console.log('Error', error.message));
};

fs.readdir(
    stylesDirPath,
    { withFileTypes: true },
    (err,files)=>{
    if (err) console.log(err);
    files.forEach(file=>{
        if ( file.isFile() && path.extname(file.name).toString().trim()==='.css') mergeStyles(file.name);
    });
});
