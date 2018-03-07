import React, { Component } from 'react';
import '../css/style.css';
import {color} from '../label.json'


class Legend extends Component {

  render() {
    const legends = color[this.props.year];
    const colors= Object.keys(legends);
    const listItems = colors.map((color) =>
    <div className="legendContainer"><span style={{'background-color': color}}></span><div className="legendTag">0 - 0.29</div></div>
);
    return (
      <div className="legend">
        <div className="arrow">
                <span class="glyphicon glyphicon-chevron-left"></span>
                {this.props.year}
                <span class="glyphicon glyphicon-chevron-right"></span>
        </div>
        <div>
            {listItems}
        </div>



      </div>
    );
  }
}

export default Legend;
