import React, { Component } from 'react';
import { Bar } from 'react-chartjs-2';
import '../css/style.css';



class PanelPart extends Component {
  panelRef = React.createRef();
  state = {
    display:false
  }
  ArrowChange=(e)=>{
    console.log(this.panelRef);
    if (e.target.className === 'glyphicon glyphicon-chevron-down'){
      e.target.className='glyphicon glyphicon-chevron-up';
      this.panelRef.value.style["grid-row"]="18/18";
      this.props.updateBar(false);
      
    }else{
      e.target.className='glyphicon glyphicon-chevron-down';
      this.panelRef.value.style["grid-row"]="12/19";
      this.props.updateBar(true);
      
    }
    
  }

  render() {      
      const barChart = this.props.barDisplay ? (<Bar data ={this.props.chartData}  height={234} width={1100} options = {this.props.options}/>):null;
      const arrow = this.props.barDisplay ? (<span className="glyphicon glyphicon-chevron-down"  onClick={(e)=>this.ArrowChange(e)}></span>):(<span className="glyphicon glyphicon-chevron-up" onClick={(e)=>this.ArrowChange(e)}></span>);
    return (      
      <div className='bot-bar' ref={this.panelRef}>
          {arrow}
          {barChart}
      </div>
      
    );
  }
}

export default PanelPart;
