const fs = require('fs');
const path = require('path');
let data='';
let tempArticles = '';
let tempFooter = '';
let tempHeader = '';
let tempAbout = '';
let option = 0;
fs.readdir( path.join(__dirname,'components'),{ withFileTypes: true }, (err,files)=>{

    if (err) console.log(err);
    
    files.forEach(file=>{

        if (file.name.trim()=='about.html'){

            option = 1; 
        }
    })});

fs.mkdir(path.join(__dirname,'project-dist'), { recursive: true }, err=>{
    if (err) throw err;
});


let input = fs.createReadStream(path.join(__dirname,'template.html'), 'utf-8');
let output = fs.createWriteStream(path.join(__dirname,'project-dist','index.html'));
input.on('data', chunk => {

    
if (option == 1) {
                
    fs.readFile(
        path.join(__dirname,'components','about.html'),
        'utf-8',
        (err, dataT) => {
            if (err) throw err;
            tempAbout = dataT.toString();
}
) ; 

fs.readFile(
    path.join(__dirname,'components','articles.html'),
    'utf-8',
    (err, dataT) => {
        if (err) throw err;
        tempArticles = dataT.toString();
}
) ; 

fs.readFile(
path.join(__dirname,'components','footer.html'),
'utf-8',
(err, dataT) => {
    if (err) throw err;
    tempFooter = dataT.toString();
}
) ; 

fs.readFile(
path.join(__dirname,'components','header.html'),
'utf-8',
(err, dataT) => {
    if (err) throw err;
    tempHeader = dataT.toString();
    output.write(chunk.replace(/\{\{footer\}\}/,tempFooter).replace(/\{\{articles\}\}/,tempArticles).replace(/\{\{header\}\}/,tempHeader).replace(/\{\{about\}\}/,tempAbout))
}
) ; 
            }
     

else {

    fs.readFile(
        path.join(__dirname,'components','articles.html'),
        'utf-8',
        (err, dataT) => {
            if (err) throw err;
            tempArticles = dataT.toString();
}
) ; 

fs.readFile(
    path.join(__dirname,'components','footer.html'),
    'utf-8',
    (err, dataT) => {
        if (err) throw err;
        tempFooter = dataT.toString();
}
) ; 

fs.readFile(
    path.join(__dirname,'components','header.html'),
    'utf-8',
    (err, dataT) => {
        if (err) throw err;
        tempHeader = dataT.toString();
        output.write(chunk.replace(/\{\{footer\}\}/,tempFooter).replace(/\{\{articles\}\}/,tempArticles).replace(/\{\{header\}\}/,tempHeader))
}
) ; }



});
input.on('error', error => console.log('Error', error.message));

  

function f(file){
let input = fs.createReadStream(path.join(__dirname,'styles',file), 'utf-8');
let output = fs.createWriteStream(path.join(__dirname,'project-dist','style.css'));
input.on('data', chunk => output.write(data+=chunk));
input.on('error', error => console.log('Error', error.message));
};

fs.readdir( path.join(__dirname,'styles'),{ withFileTypes: true }, (err,files)=>{
    if (err) console.log(err);
    files.forEach(file=>{
        if ( file.isFile() && path.extname(file.name).toString().trim()=='.css'){
        
            f(file.name);
        }
       
    });
});


fs.mkdir(path.join(__dirname,'project-dist/assets'),{ recursive: true }, err=>{
    if (err) throw err;
    });
    
    
    fs.readdir( path.join(__dirname,'assets'),{ withFileTypes: true }, (err,files)=>{

        if (err) console.log(err);
        
        files.forEach(file=>{

            if (file.isFile()){
                fs.copyFile(path.join(__dirname,'assets',file.name),path.join(__dirname,'project-dist/assets',file.name),err=>{
                    if (err) throw err;
                    });
            }

            else {
                fs.mkdir(path.join(__dirname,'project-dist/assets/',file.name),{ recursive: true }, err=>{
                    if (err) throw err;
                    });

                    fs.readdir( path.join(__dirname,'assets/',file.name),{ withFileTypes: true }, (err,innerFiles)=>{
                       
                        if (err) console.log(err);

                        innerFiles.forEach(deepestFile=>{
                
                            if (deepestFile.isFile()){
                                fs.copyFile(path.join(__dirname,'assets/',file.name,'/',deepestFile.name),path.join(__dirname,'project-dist/assets/',file.name,'/',deepestFile.name),err=>{
                                    if (err) throw err;
                                    });
                            }
            })
           
        });
    }})});

