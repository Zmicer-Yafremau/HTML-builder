const fs = require('fs');
const path = require('path');
const componentsDir = path.join(__dirname,'components');
const distDir = path.join(__dirname,'project-dist');
const stylesDir = path.join(__dirname,'styles');
const temp = {};
const input = fs.createReadStream(path.join(__dirname,'template.html'), 'utf-8');
const output = fs.createWriteStream(path.join(distDir,'index.html'));
let data='';
let option = 0;

function replaceSections(chunk,...args){
    args.forEach(el=>{
        if (el === 'header.html'){
            fs.readFile(
                path.join(componentsDir, el),
                'utf-8',
                (err, dataT) => {
                    if (err) throw err;
                    temp[el.split('.')[0]] = dataT.toString();
                    if (option===1){
                        output.write(
                            chunk.replace(/\{\{footer\}\}/, temp.footer)
                                 .replace(/\{\{articles\}\}/, temp.articles)
                                 .replace(/\{\{about\}\}/, temp.about)
                                 .replace(/\{\{header\}\}/, temp.header)
                                 );
                    } else {
                        output.write(
                            chunk.replace(/\{\{footer\}\}/, temp.footer)
                                 .replace(/\{\{articles\}\}/, temp.articles)
                                 .replace(/\{\{header\}\}/, temp.header)
                                 );
                    }
                 
                }
            ); 
        } else {
            fs.readFile(
                path.join(componentsDir,el),
                'utf-8',
                (err, dataT) => {
                    if (err) throw err;
                    temp[el.split('.')[0]] = dataT.toString();
                }
            ); 
        }
        
    })
}

fs.readdir(
          componentsDir,
          { withFileTypes: true },
          (err,files)=>{
            if (err) console.log(err);
            files.forEach(file=>{
               if (file.name.trim()==='about.html') option = 1;         
            })
          }
);

fs.mkdir(
         distDir,
         {recursive: true},
         err=>{
            if (err) throw err;
         }
);

input.on(
    'data', 
    chunk => {
      if (option === 1) replaceSections(chunk, 'about.html', 'articles.html', 'footer.html', 'header.html');
      else replaceSections(chunk, 'articles.html', 'footer.html', 'header.html');
    }
);

input.on(
        'error', 
        error => console.log('Error', error.message)
);

function mergeStyles(file){
  const input = fs.createReadStream(path.join(stylesDir,file), 'utf-8');
  const output = fs.createWriteStream(path.join(distDir,'style.css'));
  input.on('data', chunk => output.write(data+=chunk));
  input.on('error', error => console.log('Error', error.message));
};

fs.readdir(
    stylesDir,
    { withFileTypes: true }, 
    (err,files)=>{
        if (err) console.log(err);
        files.forEach(file=>{
            if ( file.isFile() && 
                 path.extname(file.name).toString().trim()=='.css') mergeStyles(file.name); 
        });
    }
);

fs.mkdir(
        path.join(distDir,'assets'),
        {recursive: true},
        err=>{
          if (err) throw err;
        }
);

fs.readdir(
            path.join(__dirname,'assets'),
            { withFileTypes: true }, 
            (err,files)=>{
                if (err) console.log(err);
                files.forEach(file=>{
                    if (file.isFile()){
                        fs.copyFile(
                                    path.join(__dirname, 'assets', file.name),
                                    path.join(distDir, 'assets', file.name),
                                    err=>{
                                      if (err) throw err;
                                    }
                        );
                     } else {
                           fs.mkdir(
                                    path.join(distDir, 'assets', file.name),
                                    {recursive: true},
                                    err=>{
                                      if (err) throw err;
                                    }
                            );
                            fs.readdir(
                                       path.join(__dirname,'assets/',file.name),
                                       { withFileTypes: true },
                                       (err,innerFiles)=>{ 
                                          if (err) console.log(err);
                                          innerFiles.forEach(deepestFile=>{
                                             if (deepestFile.isFile()){
                                                 fs.copyFile(
                                                    path.join(__dirname,'assets/', file.name, '/', deepestFile.name),
                                                    path.join(distDir,'assets/', file.name, '/', deepestFile.name),
                                                    err=>{
                                                      if (err) throw err;
                                                    }
                                                  );
                                              }
                                          });
       
                                        }
                            );
                       }
                });
            }
);

