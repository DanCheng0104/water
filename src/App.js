import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Map from './components/Map';
import PanelPart from './components/PanelPart';

class App extends Component {
  constructor(){
    super();
    this.updateYear = this.updateYear.bind(this);
    this.state = {    
      year : 2011
    };
  }

  updateYear(year){
    this.setState({year:year});
  }
  render() {
    return (
      <div>
        <Map year={this.state.year}/>
        <PanelPart year={this.state.year} updateYear={this.updateYear}/>

      </div>
    );
  }
}

export default App;
