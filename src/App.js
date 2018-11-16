import React, { Component } from 'react';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = { colorCode: "", colorText: "" };
    this.startTime = this.startTime.bind(this);
    this.checkTime = this.checkTime.bind(this);
    this.invertColor = this.invertColor.bind(this);
    this.padZero = this.padZero.bind(this);
  }
  componentDidMount() {
    this.startTime();
  }
  componentWillUnmount(){
    clearInterval(this.intervalId);
  }
  startTime() {
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    m = this.checkTime(m);
    s = this.checkTime(s);
    var colorCode = h + "" + m + "" + s;
    this.setState({colorCode});
    var colorText = this.invertColor(colorCode);
    document.body.style.background = "#"+colorCode;
    this.setState({colorText});
    setTimeout(this.startTime, 500);
  }
  checkTime(i) {
      if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
      return i;
  }

  invertColor(hex) {
    if (hex.indexOf('#') === 0) {
        hex = hex.slice(1);
    }
    // convert 3-digit hex to 6-digits.
    if (hex.length === 3) {
        hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    if (hex.length !== 6) {
        throw new Error('Invalid HEX color.');
    }
    // invert color components
    var r = (255 - parseInt(hex.slice(0, 2), 16)).toString(16),
        g = (255 - parseInt(hex.slice(2, 4), 16)).toString(16),
        b = (255 - parseInt(hex.slice(4, 6), 16)).toString(16);
    // pad each with zeros and return
    return '#' + this.padZero(r) + this.padZero(g) + this.padZero(b);
  }

  padZero(str, len) {
      len = len || 2;
      var zeros = new Array(len).join('0');
      return (zeros + str).slice(-len);
  }
  
  render() {
    const span = {
      color: this.state.colorText
    }
    return (
      <div className="App">
        <span style={span}>#{this.state.colorCode}</span>
      </div>
    );
  }
}

export default App;
