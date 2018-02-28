import React, { Component } from 'react';
import '../css/PanelPart.css';
import { DropdownButton, MenuItem, Panel } from 'react-bootstrap';


class PanelPart extends Component {
  handlerChange(e,year){
    this.props.updateYear(year);

}  
  render() {
      const years = [2011,2012,2013]
    return (
      <div className="panel">
            <Panel>
                <Panel.Heading>The City Of LA Water Consumption Map</Panel.Heading>
                <Panel.Body>
                <DropdownButton
                bsStyle='default'
                title='Please choose a neighborhood below'
                id ='1'
                className = 'nbOption'
                >
                    {years.map(year=><MenuItem key={year} eventKey={year} onClick={(e)=>{this.handlerChange(e,year)}}>{year}</MenuItem>)}	
                </DropdownButton>
                </Panel.Body>
            </Panel>
      </div>
    );
  }
}

export default PanelPart;
