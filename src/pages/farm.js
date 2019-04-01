import React, { Component } from "react";
import ReactDOM from "react-dom";
import ReactMapboxGl, {Layer, Feature} from "react-mapbox-gl";
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

const polygonPaint = {
  'fill-color': '#6F788A',
  'fill-opacity': 0.8
};

const AllShapesPolygonCoords = [
  [
    [-0.13235092163085938, 51.518250335096376],
    [-0.1174163818359375, 51.52433860667918],
    [-0.10591506958007812, 51.51974577545329],
    [-0.10831832885742188, 51.51429786349477],
    [-0.12531280517578122, 51.51429786349477],
    [-0.13200759887695312, 51.517823057404094]
  ]
];

class Farm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			filter: false,
			date : new Date(),
			kota : "",
			tanaman : "",
			sidebar : false
			// center : [],
			// koordinat : []
		};

		this.viewFilter = this.viewFilter.bind(this);
		this.viewSidebar = this.viewSidebar.bind(this);
    }
    
    UNSAFE_componentWillMount () {
			const self = this;
			console.log(window.location.pathname.slice(6))
			axios
			.get('http://0.0.0.0:5000/farms/' + window.location.pathname.slice(6))
			.then(function(response){
				self.setState({Farms: response.data});
				console.log('Farms', response.data);
				const koordinat = []
				koordinat.push(JSON.parse(response.data.coordinates))
				console.log('coord jadi', koordinat)
				self.setState({koordinat: koordinat})
				const centers = JSON.parse(response.data.center)
				console.log(centers)
				self.setState({center:centers})
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
		const {center, koordinat} = this.state
		console.log('center', center)
		console.log('koordinat', koordinat)
		// if (!this.state.loaded) return <Loading />
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
					<Map
						style="mapbox://styles/mapbox/streets-v9"
						containerStyle={{
							height: "100vh",
							width: "100vw"
						}}
						center={center}
						zoom={[15]}
					>
						<Layer type="fill" paint={polygonPaint}>
							<Feature coordinates={koordinat} />
						</Layer>
					</Map>
				</div>
      </div>
    );
  }
}

export default Farm;
