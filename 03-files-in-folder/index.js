const fs = require('fs');
const path = require('path');
function st(file){

    fs.stat(path.join(__dirname,'secret-folder',file),(error,stats)=>{
        if (error) {console.log(error);};
        console.log(path.basename(file, path.extname(file))+' - '+path.extname(file).slice(1)+' - '+(stats.size/1024).toFixed(3) +' kB');

    });
};
fs.readdir( path.join(__dirname,'secret-folder'),{ withFileTypes: true }, (err,files)=>{
    if (err) console.log(err);
    files.forEach(file=>{
        if (file.isFile()){
st(file.name);
        }
       
    });
})

