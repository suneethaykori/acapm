
if(process.argv[2] !== "init"){
  //do init stuff
 console.log("Did not find init. Exiting");
 return;
}

const fs = require('fs')
fs.readFile('package.json', 'utf8', function (err,data) {
 if (!err) {
     console.log('pacakage.json already exist')
     process.exit(0);
 }
 //console.log("do next stuff here ")
});

const qArr =['FName','LName','DOB','City','State'];

var readline = require('readline');
var log = console.log;

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const filename = "package.json"
//FIXME: Sometimes the order of the last write is not right
var recursiveAsyncReadLine = function (i) {
  rl.question(`${qArr[i]} -`, function (answer) {
    fs.appendFile(filename, ` ${qArr[i]}:${answer}, `, (err) => {
      if (err) throw err;
      //console.log("The file was succesfully appended!");
   });
   
    if (i === 4) {//we need some base case, for recursion
      fs.appendFile(filename, '} }', (err) => {
        if (err) throw err;
        //console.log("The file was succesfully written!");
      });
      
      return rl.close(); //closing RL and returning from function.
    }
    recursiveAsyncReadLine(i+1); //Calling this function again to ask new question
  });
};

fs.writeFile(filename, '{ "Person": {', (err) => {
  if (err) throw err;
  //console.log("The file was succesfully written!");
});

recursiveAsyncReadLine(0);

