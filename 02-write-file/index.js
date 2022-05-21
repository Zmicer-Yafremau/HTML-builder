const fs = require('fs');
const path = require('path');
const { exit } = require('process');
const { stdin,stdout} = process;
const  input = fs.createWriteStream(path.join(__dirname,'','text.txt'));
console.log('Write smth,plz: \n');
stdin.on('data', data => {
  
  if (data.toString().trim()=='exit') exit();
  input.write(data.toString());
 

})
process.on('exit', () => stdout.write('\n  Good luck! \n!'));
process.on('SIGINT', () => process.exit());
