// Greeter.js
// var greettext = require('./greeter.json')
// module.exports = function() {
//   var greet = document.createElement('div');
//   greet.textContent = greettext.greettext;
//   return greet;
// };

//Greeter,js
import React, {Component} from 'react'
import config from './greeter.json';
//import styles from './greeter.css';//导入

class greeter extends Component{
  render() {
    return (
      <div>
        {config.greetText}
      </div>
    );
  }
}

export default greeter

