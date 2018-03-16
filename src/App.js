import React, { Component } from 'react';
import Header from './components/Header';
import './App.css';
import Map from './components/Map';
import Footer from './components/Footer';
// import PanelPart from './components/PanelPart';

class App extends Component {
  state = {    
    year : 2014,
    barDisplay: false
  };

  updateYear =(year)=>{
    this.setState({year:year});
  }

  updateBar =(display)=>{
    this.setState({barDisplay:display});
  }

  render() {
    return (
      <React.Fragment>
        <Header/>        
        <Map year={this.state.year} updateYear={this.updateYear} barDisplay={this.state.barDisplay} updateBar={this.updateBar}/>
        <Footer/>
      </React.Fragment>
    );
  }
}

export default App;
