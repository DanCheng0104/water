import React, { Component } from 'react';
import { DropdownButton, MenuItem, Panel } from 'react-bootstrap';
import '../css/style.css';



class PanelPart extends Component {
  handlerChange(e,year){
    this.props.updateYear(year);

}  
  render() {
      const years = [2011,2012,2013]
    return (
      <React.Fragment >
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
      </React.Fragment>
    );
  }
}

export default PanelPart;
