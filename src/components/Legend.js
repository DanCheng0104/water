import React, { Component } from 'react';
import '../css/style.css';
import {color} from '../label.json'


class Legend extends Component {
    spanLeft = React.createRef();
    handlerChange(e,year,direction){
        console.log(direction);
        console.log(spanLeft);
        direction==='left'?this.props.updateYear(year-1):this.props.updateYear(year+1);

    }

    render() {
        const legends = color[this.props.year];
        const colors= Object.keys(legends);
        const listItems = colors.map((color) =>
        <div className="legendContainer"><span style={{'background-color': color}}></span><div className="legendTag">{legends[color]}</div></div>
        );
        return (
        <div className="legend">
            <div className="arrow">
                    <span class="glyphicon glyphicon-chevron-left" ref={this.spanLeft} onClick={(e)=>{this.handlerChange(e,this.props.year,"left")}}></span>
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
