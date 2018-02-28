import React, { Component } from 'react';
import mapboxgl from 'mapbox-gl'
import '../../node_modules/mapbox-gl/dist/mapbox-gl.css';
import '../css/Map.css'
import { token } from '../config.json'
import {color} from '../palette.json'

mapboxgl.accessToken = token;
class Map extends React.Component {
    constructor(){
        super();
        this.setFill = this.setFill.bind(this);
    }
    componentDidUpdate() {
        const filter = ["all",['==','YEAR',this.props.year],['!=','USAGE',-9999]];    
        this.map.setFilter('nb',filter);    
        this.map.setPaintProperty("nb",'fill-color',color[this.props.year]);
      }

    componentDidMount() {
      const filter = ["all",['==','YEAR',this.props.year],['!=','USAGE',-9999]];        
      this.map = new mapboxgl.Map({
        container: this.mapContainer,
        style: 'mapbox://styles/mapbox/light-v9',
        zoom : 9,
        center: [ -118.382877, 34.284700]

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
            "filter":filter
        });
        this.setFill(this.props.year);
      });
    }

    setFill(){
        this.map.setPaintProperty("nb",'fill-color',color[this.props.year]);

    }
  
    componentWillUnmount() {
      this.map.remove();
    }
  
    render() {
      return <div ref={el => this.mapContainer = el} />;
    }
  }

export default Map;
