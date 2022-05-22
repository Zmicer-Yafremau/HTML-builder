const fs = require('fs');
const path = require('path');
let data='';
function f(file){
let input = fs.createReadStream(path.join(__dirname,'styles',file), 'utf-8');
let output = fs.createWriteStream(path.join(__dirname,'project-dist','bundle.css'));
input.on('data', chunk => output.write(data+=chunk));
input.on('error', error => console.log('Error', error.message));
}

fs.readdir( path.join(__dirname,'styles'),{ withFileTypes: true }, (err,files)=>{
    if (err) console.log(err);
    files.forEach(file=>{
        if ( file.isFile() && path.extname(file.name).toString().trim()=='.css'){
        
            f(file.name);
        }
       
    });
})
