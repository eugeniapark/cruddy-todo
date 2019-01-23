const fs = require('fs');
const path = require('path');
const sprintf = require('sprintf-js').sprintf;

// var counter = 0;

// Private helper functions ////////////////////////////////////////////////////

// Zero padded numbers can only be represented as strings.
// If you don't know what a zero-padded number is, read the
// Wikipedia entry on Leading Zeros and check out some of code links:
// https://www.google.com/search?q=what+is+a+zero+padded+number%3F


//Creates the ZPN (0000n) number to pass into writeCounter/save
const zeroPaddedNumber = (num) => {
  return sprintf('%05d', num);
};

//Gets the counter: if there's no counter, return error / else return successful callback 
const readCounter = (callback) => {
  fs.readFile(exports.counterFile, (err, fileData) => {
    if (err) {
      callback(null, 0);
    } else {
      callback(null, Number(fileData));
    }
  });
};

//
const writeCounter = (count, callback) => {
  var counterString = zeroPaddedNumber(count);  //change count to string
  fs.writeFile(exports.counterFile, counterString, (err) => {
    if (err) {
      throw ('error writing counter');
    } else {
      callback(null, counterString);
    }
  });
};

// Public API - Fix this function //////////////////////////////////////////////

exports.getNextUniqueId = (callback) => {  //callback
  // counter = counter + 1;
  
  readCounter((err, data) => {  //data = count
    console.log('readcounter', data)
    if (err) {
      callback(null, 0);
    } else { //if it's not an error
      data += 1;
      writeCounter(data, (err, counterString) => {  //(count, callback)
        // console.log('writecounter', data)
        if(err) {
          // console.log(err);
          callback(null, 0);
        } else {
          callback(null, counterString);
        }
      });
    }
  });
};  

/*
readcounter = 0
writecounter = 00001
1) should use error first callback pattern
2) should give an id as a zero padded string
3) should give the next id based on the count in the file readcounter 
4) should update the counter file with the next value
5) should create a new file for each todo

*/


 //data = counterString
  

  // return zeroPaddedNumber(counter);





// Configuration -- DO NOT MODIFY //////////////////////////////////////////////

exports.counterFile = path.join(__dirname, 'counter.txt');
