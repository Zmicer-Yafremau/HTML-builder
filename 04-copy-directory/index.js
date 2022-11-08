
const fs = require('fs');
const path = require('path');
const filesPath = path.join(__dirname,'files');
const filesCopyPath = path.join(__dirname,'files-copy');
fs.mkdir(filesCopyPath,
    { recursive: true },
    err=>{
       if (err) throw err;
});
fs.readdir(filesCopyPath, 
    { withFileTypes: true }, 
    (err,files)=>{
    if (err) console.log(err);
    files.forEach(file=>{
        if (file.isFile()){
            fs.unlink(path.join(filesCopyPath, file.name),
                        err=>{
                        if (err) throw err;
                        }
                        );
        }
    });
});
fs.readdir(filesPath, 
    { withFileTypes: true }, 
    (err,files)=>{
    if (err) console.log(err);
    files.forEach(file=>{
        if (file.isFile()){
            fs.copyFile(path.join(filesPath, file.name),
                        path.join(filesCopyPath, file.name),
                        err=>{
                        if (err) throw err;
                        });
        }
    });
});
