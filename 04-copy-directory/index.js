const fs = require('fs');
const path = require('path');
<<<<<<< HEAD
const filesPath = path.join(__dirname,'files');
const filesCopyPath = path.join(__dirname,'files-copy');
fs.mkdir(filesCopyPath,
    { recursive: true },
    err=>{
       if (err) throw err;
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
})

=======
const way =  path.resolve('04-copy-directory', 'files-copy');
const copyWay =  path.resolve('04-copy-directory', 'files');
const fsPromise = require('fs/promises');
>>>>>>> 06dc3e43b4c45b321947e40dd96d55d50694b09b



fs.mkdir(way, { recursive: true }, err => {
  if(err) throw err; // не удалось создать папку
  
});

async function copyFiles(){
  
  try {
    const copies = await fsPromise.readdir('04-copy-directory/files-copy', {withFileTypes: true});
    console.log(copies);
    for (let copy of copies){
      fs.unlink(`04-copy-directory/files-copy/${copy.name}`, function(err){
        if (err) {
          console.log(err);
        } else {
          console.log('Файл удалён');
        }
      });
    }

    const item = await fsPromise.readdir('04-copy-directory/files', {withFileTypes: true});
    for (const items of item) {
      if (items.isFile()){
        fs.copyFile(`04-copy-directory/files/${items.name}`, `04-copy-directory/files-copy/${items.name}`, (err) => {
          if (err) {
            console.log('Error Found:', err);
          }
                
        });
      }
    }
  } catch(err) {
    console.log((err)); 
  }

}

copyFiles();
