import React, { Component } from 'react';
// import { Panel } from 'react-bootstrap';
import '../css/style.css';



class PanelPart extends Component {
  panelRef = React.createRef();
  ArrowChange=(e)=>{
    console.log(this.panelRef);
    if (e.target.className === 'glyphicon glyphicon-chevron-down'){
      e.target.className='glyphicon glyphicon-chevron-up';
      this.panelRef.value.style["grid-row"]="18/18";
      
    }else{
      e.target.className='glyphicon glyphicon-chevron-down';
      this.panelRef.value.style["grid-row"]="14/19";
      
    }
    
  }
  render() {
      const years = [2011,2012,2013]
    return (      
      <div className='bot-bar' ref={this.panelRef}>
        <span className="glyphicon glyphicon-chevron-down" onClick={(e)=>this.ArrowChange(e)}></span>

      </div>
      
    );
  }
}

export default PanelPart;
