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
    panelContainer = React.createRef();
    state = {    
      chartData : {
        labels: ['2011','2012','2013','2014','2015','2016'],
        datasets: []
      },
      options:{
        scales: {
          xAxes: [{ stacked: true }],
          yAxes: [{ stacked: true }]
        },
        responsive: true//,
        // tooltips:{
        //   callbacks: {
        //     label: function(tooltipItems, data) {
        //         //return data.datasets[tooltipItems.datasetIndex].label +': ' + tooltipItems.yLabel + ' €';
        //         console.log(tooltipItems);
        //     }
        // }
        //}
      }
      
    };
  
    componentDidUpdate() {
        const filter = ["all",['==','YEAR',this.props.year],['!=','USAGE',-9999],['==','USETYPE','all']];    
        const filter_mask = ["all",['==','YEAR',this.props.year],['==','USAGE',-9999],['==','USETYPE','all']];
        this.map.setFilter('nb_nomask',filter);
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
            "id": "nb_nomask",
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
            "id": "nb_all",
            "source": "geos",
            "source-layer": "usage_nbgeojson",
            "type": "fill",
            "paint": {
              "fill-outline-color": "#e1cdb5",
              'fill-opacity': 0
            }
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
        this.props.updateBar(true);
        this.panelContainer.value.panelRef.value.style["grid-row"]="12/19";
        const features = this.map.queryRenderedFeatures(e.point,{layers:['nb_all']});
        const usetypes = ["commercial","institutional","other","industrial","res","mixed_use","masked"];
        const years = [2011,2012,2013,2014,2015,2016];
        let tempData = {"commercial":[],"institutional":[],"other":[],"industrial":[],"res":[],"mixed_use":[],"masked":[]};
        let colors={"commercial":'#7fc97f',"institutional":'#beaed4',"other":'#fdc086',"industrial":'#ffff99',"res":'#386cb0',"mixed_use":'#f0027f','masked':'#000000'};
        
        usetypes.forEach((usetype)=>{
          years.forEach((year)=>{
            features.forEach((feature)=>{
              if (feature.properties.YEAR == year & feature.properties.USETYPE == usetype){
                let usage;
                if (feature.properties.USAGE === -9999){
                  usage = 100000;
                  usetype = 'masked';
                }
                else{
                  usage = feature.properties.USAGE;

                }
                
                tempData[usetype].push(usage);
              }
            })
          })
        })
        let datasets = []
        Object.keys(tempData).forEach(key=>{
          //let color = (tempData[key]===100000)?'#000000':colors[key];
          const dataset = {
            label: key,
            data:tempData[key],
            backgroundColor: colors[key]
          }
          datasets.push(dataset)
        })
        const newData = {...this.state.chartData};
        newData.datasets = datasets;
        this.setState({chartData:newData});
      });
    }

    getChartData =()=>{

    }

    setFill =() =>{
        this.map.setPaintProperty("nb_nomask",'fill-color',color[this.props.year]);

    }
  
    componentWillUnmount() {
      this.map.remove();
    }
  
    render() {
      return (
        <React.Fragment>
          <div ref={this.mapContainer} >
            <Legend year ={this.props.year} updateYear={this.props.updateYear}/> 
            <PanelPart barDisplay={this.props.barDisplay} updateBar={this.props.updateBar} ref={this.panelContainer} chartData={this.state.chartData} options={this.state.options}/>
          </div>                
        </React.Fragment>
      )
              
    }
  }

export default Map;
