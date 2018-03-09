import React, { Component } from 'react';
import mapboxgl from 'mapbox-gl'
import '../../node_modules/mapbox-gl/dist/mapbox-gl.css';
import '../css/style.css';
import Legend from './Legend';
import PanelPart from './PanelPart';
import { token } from '../config.json'
import {color} from '../palette.json'

mapboxgl.accessToken = token;
class Map extends React.Component {
    mapContainer = React.createRef();

    componentDidUpdate() {
        const filter = ["all",['==','YEAR',this.props.year],['!=','USAGE',-9999],['==','USETYPE','all']];    
        const filter_mask = ["all",['==','YEAR',this.props.year],['==','USAGE',-9999],['==','USETYPE','all']];
        this.map.setFilter('nb',filter);
        this.map.setFilter('nb_mask',filter_mask);    
        this.map.setPaintProperty("nb",'fill-color',color[this.props.year]);
      }

    componentDidMount() {
      const filter_unmask = ["all",['==','YEAR',this.props.year],['!=','USAGE',-9999],['==','USETYPE','all']]; 
      const filter_mask = ["all",['==','YEAR',this.props.year],['==','USAGE',-9999],['==','USETYPE','all']];        
      this.map = new mapboxgl.Map({
        container: this.mapContainer.value,
        style: 'mapbox://styles/mapbox/light-v9',
        zoom : 9,
        center: [ -118.382877, 34.014700]

      });
      this.map.on('load',()=>{
          this.map.addSource('geos',{
              "type": "vector",
              "url": "mapbox://dcheng0104.cyb89w7a"             
          })

          this.map.addLayer({
            "id": "nb",
            "source": "geos",
            "source-layer": "usage_nbgeojson",
            "type": "fill",
            "paint": {
                "fill-outline-color": "#e1cdb5",
                'fill-opacity': 1
            },
            "filter":filter_unmask
          });
          this.map.addLayer({
            "id": "nb_mask",
            "source": "geos",
            "source-layer": "usage_nbgeojson",
            "type": "fill",
            "paint": {
                "fill-outline-color": "#e1cdb5",
                'fill-opacity': 0.5,
                'fill-color':"grey"
            },
            "filter":filter_mask
          });
        this.setFill(this.props.year);
      });

      //query results
      this.map.on('click',(e)=>{
        const features = this.map.queryRenderedFeatures(e.point,['nb'])
        console.log(features);
      });
    }

    setFill =() =>{
        this.map.setPaintProperty("nb",'fill-color',color[this.props.year]);

    }
  
    componentWillUnmount() {
      this.map.remove();
    }
  
    render() {
      return (
        <React.Fragment>
          <div ref={this.mapContainer} >
            <Legend year ={this.props.year} updateYear={this.props.updateYear}/> 
            <PanelPart/>
          </div>                
        </React.Fragment>
      )
              
    }
  }

export default Map;
