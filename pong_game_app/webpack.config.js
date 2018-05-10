const path = require('path');

//es5 syntax with key value pairs path is an object that has a resolve method that has two parameters _dirname is a global variable that 
//gets the direcory location your in 
module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
};