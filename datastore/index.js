const fs = require('fs');
const path = require('path');
const _ = require('underscore');
const counter = require('./counter');

var items = {};

// Public API - Fix these CRUD functions ///////////////////////////////////////

exports.create = (text, callback) => {
  counter.getNextUniqueId(function (err, string) {
    if (err) {
      console.log(err)
    } else {
      var id = string;
      items[id] = text;
      var filepath = path.join(exports.dataDir, `${id}.txt`)
      var writeStream = fs.writeFile(filepath, text, (err) => {
        if (err) throw err;
        callback(null, { id, text });
      });
    }
  });

};

exports.readAll = (callback) => {

  var data = [];
  var path = exports.dataDir;
  fs.readdir(path, function (err, items) {
    if (err) console.log(err);
    for (var i = 0; i < items.length; i++) {
      var fileId = items[i].slice(0, items[i].length - 4)
      data.push({ id: fileId, text: fileId })
    }
    callback(null, data);
  });

};

exports.readOne = (id, callback) => {

  var path = exports.dataDir;
  exports.readAll((err, todos) => {
    if (err) {
      console.log(err)
    } else if (todos.length === 0) {
      callback(new Error(`No item with id: ${id}`));
    } else {
      todos.forEach(todo => {
        if (todo.id === id) {
          fs.readFile(`${path}/${todo.id}.txt`, 'utf8', (err, data) => {
            if (err) console.log(err);
            callback(null, { id, text: data });
          })
        } else {
          console.log('id not found')
        }

      })

    }
  });

};

exports.update = (id, text, callback) => {
  // var item = items[id];
  // if (!item) {
  //   callback(new Error(`No item with id: ${id}`));
  // } else {
  //   items[id] = text;
  //   callback(null, { id, text });
  // }
  var path = exports.dataDir;
  exports.readOne(id, function (err, todo) {
    if (err) {
      callback(new Error(`No item with id: ${id}`))     
    }
    
      fs.writeFile(`${path}/${id}.txt`, text, (err) => {
        if (err) throw err;
        callback(null, { id, text });
      });
    
  })
};

exports.delete = (id, callback) => {
  var item = items[id];
  delete items[id];
  if (!item) {
    // report an error if item not found
    callback(new Error(`No item with id: ${id}`));
  } else {
    callback();
  }
};

// Config+Initialization code -- DO NOT MODIFY /////////////////////////////////

exports.dataDir = path.join(__dirname, 'data');

exports.initialize = () => {
  if (!fs.existsSync(exports.dataDir)) {
    fs.mkdirSync(exports.dataDir);
  }
};
