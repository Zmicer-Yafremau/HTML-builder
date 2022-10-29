const fs = require('fs');
const path = require('path');
const folderPath = path.join(__dirname,'secret-folder');

function scanFiles(file){
    fs.stat(path.join(folderPath, file),(error,stats)=>{
        if (error) console.log(error);
        console.log(path.basename(file, path.extname(file))+' - '+path.extname(file).slice(1)+' - '+(stats.size/1024).toFixed(3) +' kB');
    });
};

fs.readdir( folderPath, { withFileTypes: true }, (err,files)=>{
    if (err) console.log(err);
    files.forEach(file=>{
        if (file.isFile()) scanFiles(file.name);
    });
})
