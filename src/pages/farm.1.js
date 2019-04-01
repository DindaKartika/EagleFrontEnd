import React, { Component } from "react";
import ReactDOM from "react-dom";
import ReactMapboxGl from "react-mapbox-gl";
import DrawControl from "react-mapbox-gl-draw";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
import Header from '../components/header_signin'
import SidebarMap from '../components/sidebarMap'
import FilterMap from '../components/filter'
import Select from 'react-select'
import DateTimePicker from 'react-datetime-picker'
import axios from 'axios'

import mapboxgl from 'mapbox-gl'

const optionsCity = [
	{ value: 'malang', label: 'malang' }
]
	
const optionsPlant = [
	{ value: 'cabe', label: 'cabe' },
	{ value: 'tomat', label: 'tomat' },
	{ value: 'terong', label: 'terong' }
]

const Map = ReactMapboxGl({
  accessToken:
    "pk.eyJ1IjoiZGthcnRpa2EiLCJhIjoiY2p0d3NocmEzMDB0ejN5bWhkb2l2Zm92diJ9.OmM7fJbSBdSGfHQG4BH-qw"
});

class Farm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			filter: false,
			date : new Date(),
			kota : "",
			tanaman : "",
            sidebar : false,
            center : [],
            koordinat : []
		};

		this.viewFilter = this.viewFilter.bind(this);
		this.viewSidebar = this.viewSidebar.bind(this);
    }
    
    componentDidMount = () =>{
        const self = this;
        console.log(window.location.pathname.slice(6))
		axios
		.get('http://0.0.0.0:5000/farms/' + window.location.pathname.slice(6))
		.then(function(response){
            self.setState({Farms: response.data});
            console.log('Farms', response.data);
            const koordinat = JSON.parse(response.data.coordinates)
            console.log('coord jadi', koordinat)
            self.setState({koordinat: koordinat})
            const centers = JSON.parse(response.data.center)
            console.log(centers)
            self.setState({center:centers})

            self.map = new mapboxgl.Map({
                container: self.mapContainer,
                style: 'mapbox://styles/mapbox/streets-v11',
                center: [-68.13734351262877, 45.137451890638886],
                zoom: 5
              });

            // self.map.on('load', function () {
						// 	self.map.addLayer({
						// 		'id': 'maine',
						// 		'type': 'fill',
						// 		'source': {
						// 			'type': 'geojson',
						// 			'data': {
						// 				'type': 'Feature',
						// 				'geometry': {
						// 					'type': 'Polygon',
						// 					'coordinates': [
						// 						response.data.coordinates
						// 					]
						// 				}
						// 			}
						// 		},
						// 		'layout': {},
						// 		'paint': {
						// 			'fill-color': '#088',
						// 			'fill-opacity': 0.8
						// 		}
						// 	});
						// });
						this.map.on('load', () => {
							// this.map.addSource('countries', {
							// 	type: 'geojson',
							// 	data
							// });
				
							this.map.addLayer({
								id: 'farms',
								type: 'fill',
								source: {
									type: 'geojson',
									data: {
										type: 'Feature',
										geometry: {
											type: 'Polygon',
											coordinates: [
												[
														[-67.13734351262877, 45.137451890638886],
														[-66.96466, 44.8097],
														[-68.03252, 44.3252],
														[-69.06, 43.98],
														[-70.11617, 43.68405],
														[-70.64573401557249, 43.090083319667144],
														[-70.75102474636725, 43.08003225358635],
														[-70.79761105007827, 43.21973948828747],
														[-70.98176001655037, 43.36789581966826],
														[-70.94416541205806, 43.46633942318431],
														[-71.08482, 45.3052400000002],
														[-70.6600225491012, 45.46022288673396],
														[-70.30495378282376, 45.914794623389355],
														[-70.00014034695016, 46.69317088478567],
														[-69.23708614772835, 47.44777598732787],
														[-68.90478084987546, 47.184794623394396],
														[-68.23430497910454, 47.35462921812177],
														[-67.79035274928509, 47.066248887716995],
														[-67.79141211614706, 45.702585354182816],
														[-67.13734351262877, 45.137451890638886]
												]
										]
										}
									}
								}
							}) // ID metches `mapbox/streets-v9`
				
							this.map.setPaintProperty('farms', 'fill-color', '#faafee');
						});
		})
		.catch(function(error){
			console.log('error', error);
		})
	}
	
	viewFilter(){
		this.setState({filter:true})
	}

	viewSidebar(){
		this.setState({sidebar:true})
	}

	changeCity(event) {
		this.setState({
			kota: event.value
		});

		localStorage.setItem('kota', event.value)
		console.log(event.value)
	}

	changePlant(event) {
		this.setState({
			tanaman: event.value
		});

		localStorage.setItem('tanaman', event.value)
		console.log(event.value)
  }
  
  onChange = date => this.setState({ date })

  render() {
		console.log(this.state.sidebar)
    return (
      <div className="App">
				<div className="header">
					<Header/>
				</div>
				{/* <div className="search">
					<form onSubmit={e => e.preventDefault()}>
						<input type="search" onFocus={this.viewFilter} placeholder="Cari" name="search"/>
						<button type="submit" onClick={this.viewSidebar}><img src={'http://www.clker.com/cliparts/W/V/Z/X/h/t/search-icon-marine-md.png'}/></button>
						<div className="filters">
							<label>Filter berdasarkan :</label>
							<br/>
							<label>Kota :</label>
							<Select options={optionsCity} onChange={e => this.changeCity(e)}/>
							<label>Jenis Tanaman :</label>
							<Select options={optionsPlant} onChange={e => this.changePlant(e)}/>
							<label>Waktu panen :</label>
							<br/>
							<DateTimePicker
								onChange={this.onChange}
								value={this.state.date}
								disableClock={true}
								// minDate={new Date()}
							/>
						</div>
					</form>
				</div>
				{this.state.sidebar && <SidebarMap/>} */}
				<div>
					{/* <Map
						style="mapbox://styles/mapbox/streets-v9"
						containerStyle={{
							height: "100vh",
							width: "100vw"
						}}
						center={[112.63396597896462, -7.97718148341032]}
						zoom={[12]}
					>
					</Map> */}
				</div>
      </div>
    );
  }
}

export default Farm;
