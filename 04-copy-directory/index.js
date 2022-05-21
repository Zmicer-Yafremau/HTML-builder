const fs = require('fs');
const path = require('path');
fs.mkdir(path.join(__dirname,'files-copy'),err=>{
if (err) throw err;
});


fs.readdir( path.join(__dirname,'files'),{ withFileTypes: true }, (err,files)=>{
    if (err) console.log(err);
    files.forEach(file=>{
        if (file.isFile()){
            fs.copyFile(path.join(__dirname,'files',file.name),path.join(__dirname,'files-copy',file.name),err=>{
                if (err) throw err;
                });
        }
       
    });
})


