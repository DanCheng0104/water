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
      this.panelRef.value.style["grid-row"]="14/19";
      this.props.updateBar(true);
      
    }
    
  }


  render() {
      const data = {
        labels: ['2011','2012'],
        datasets: [
          {
            label: 'Low',
            data: [67.8,33],
            backgroundColor: '#D6E9C6',
          },
          {
            label: 'Moderate',
            data: [20.7,43],
            backgroundColor: '#FAEBCC',
          },
          {
            label: 'High',
            data: [11.4,34],
            backgroundColor: '#EBCCD1',
          }
        ]
      };
      const options = {
        scales: {
          xAxes: [{ stacked: true }],
          yAxes: [{ stacked: true }]
        },
        responsive: true
        //maintainAspectRatio: false
      };
      
      const barChart = this.props.barDisplay ? (<Bar data ={data}  height={234} width={1100} options = {options}/>):null;
      const arrow = this.props.barDisplay ? (<span className="glyphicon glyphicon-chevron-down" onClick={(e)=>this.ArrowChange(e)}></span>):(<span className="glyphicon glyphicon-chevron-up" onClick={(e)=>this.ArrowChange(e)}></span>);
    return (      
      <div className='bot-bar' ref={this.panelRef}>
          {arrow}
          {barChart}
      </div>
      
    );
  }
}

export default PanelPart;
