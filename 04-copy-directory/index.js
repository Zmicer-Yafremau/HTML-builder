const fs = require('fs');
const path = require('path');
fs.mkdir(path.join(__dirname,'files-copy'),err=>{
if (err) throw err;
});
fs.copyFile(path.join(__dirname,'files','test-text.txt'),path.join(__dirname,'files-copy','test-text.txt'),err=>{
    if (err) throw err;
    });