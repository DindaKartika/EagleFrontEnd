import React, { Component } from "react";
import ReactDOM from "react-dom";
import ReactMapboxGl, {Layer, Feature, Popup} from "react-mapbox-gl";
import DrawControl from "react-mapbox-gl-draw";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
import Header from '../components/header_signin'
import SidebarMap from '../components/sidebarMap'
import FilterMap from '../components/filter'
import Select from 'react-select'
import DateTimePicker from 'react-datetime-picker'
import DatePicker from 'react-datepicker'
import axios from 'axios'
import PopUp from '../components/popup'
import mapboxgl from "mapbox-gl"

import "react-datepicker/dist/react-datepicker.css";
import { NONAME } from "dns";

const optionsCity = [
	{ value: 'malang', label: 'malang' }
]
	
const optionsPlant = [
	{ value: 'cabe', label: 'cabe' },
	{ value: 'tomat', label: 'tomat' },
	{ value: 'terong', label: 'terong' }
]

const points= [
  [112.62276702069872, -7.977665435743127],
  [112.64844883185015, -7.960344081053911],
  [112.6326591681588, -7.944989941985106],
  [112.63150494892685, -7.989446961468076],
  [112.6529458426674, -7.999874921672479]
]

const polygonPaint = {
  'fill-color': '#00CED1',
  'fill-opacity': 1
};

const Map = ReactMapboxGl({
  accessToken:
    "pk.eyJ1IjoiZGthcnRpa2EiLCJhIjoiY2p0ejY1c3FmMzExejQxcGNmcmZoaGhtMCJ9.FnTBMWoUi17BhvjRQ0e2mw"
});

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			filter: false,
			sidebar : false,
			popup : false,
			startDate : new Date(),
			Farms : [],
			koordinat : [],
			number : null
		};

		localStorage.setItem('search', '')

		this.viewFilter = this.viewFilter.bind(this);
		this.viewSidebar = this.viewSidebar.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this._onMouseLeave = this._onMouseLeave.bind(this)
	}

	UNSAFE_componentWillMount () {
		const self = this;
		console.log(window.location.pathname.slice(6))
		axios
		.get('http://0.0.0.0:5000/farms')
		.then(function(response){
			self.setState({Farms: response.data});
			console.log('farms', response.data);
			const Farms = response.data
			const rows = []
			for (const [index, value] of Farms.entries()) {
				const centers = JSON.parse(response.data[index].center)
				console.log(centers)
				const data = {}
				data['center'] = centers
				data['deskripsi'] = response.data[index].deskripsi
				data['tanaman'] = response.data[index].plant_type
				data['pemilik'] = response.data[index].user.display_name
				data['username'] = response.data[index].user.username
				rows.push(data)
			}
			console.log('koordinat jadi', rows)
			self.setState({koordinat : rows})
		})
		.catch(function(error){
			console.log('error', error);
		})
	}
	
	viewFilter(){
		this.setState({filter:true})
		console.log('true')
	}

	viewSidebar(){
		// localStorage.setItem('search', )
		this.setState({sidebar:true})
	}
	
	changeSearch(event) {
		this.setState({
			search: event.value
		});

		localStorage.setItem('search', event.value)
		console.log('search', event.value)
  }

	// onChange = date => this.setState({ date })
	
	handleChange(date) {
    this.setState({
      startDate: date
    });
	}

	changeInput = e =>{
		localStorage.setItem('search', e.target.value);
	};

	_onClickMap = key =>{
		// console.log(key)
		const indeks = key['key'] + 1
		this.props.history.push('/maps/' + indeks);
	}

	_onMouseEnter = key =>{
		console.log('mouseenter', key)
		this.setState({number : key['key']})
		this.setState({popup : true})
		// this.props.history.push('/maps/' + 1);
	}

	_onMouseLeave(){
		this.setState({popup : false})
		this.setState({number : null})
		// this.props.history.push('/maps/' + 1);
	}

	onMapLoad = (map) => {
    map.addControl(new mapboxgl.GeolocateControl({
			positionOptions: {
			enableHighAccuracy: true
			},
			trackUserLocation: true
			}));

			console.log('coba geolocate', new mapboxgl.GeolocateControl)
	};
	
	

  render() {
		console.log(this.state.sidebar)
		const {startDate} = this.state
		console.log('tanggal', startDate.toISOString())
		const {koordinat, Center, Farms, number} = this.state
		console.log('koord', koordinat)
		console.log('index popup', number)
		console.log('buat popup', koordinat[number])
		
    return (
      <div className="App">
				<div className="header">
					<Header/>
				</div>
				<div className="search">
					<form onSubmit={e => e.preventDefault()}>
						<input type="search" onClick={this.viewFilter} placeholder="Cari" name="search" onChange={e => this.changeInput(e)}/>
						<button type="submit" onClick={this.viewSidebar}><img src={'http://www.clker.com/cliparts/W/V/Z/X/h/t/search-icon-marine-md.png'}/></button>
						{this.state.filter && <FilterMap/>}
					</form>
				</div>
				{this.state.sidebar && <SidebarMap/>}
				<div>
					<Map
						onStyleLoad={this.onMapLoad}
						style="mapbox://styles/mapbox/streets-v9"
						containerStyle={{
							height: "90vh",
							width: "100vw"
						}}
						center={[112.63396597896462, -7.97718148341032]}
						// zoom={[13]}
					>
						<Layer
              type="symbol"
              id="points"
              layout={{ "icon-image": "circle-11", "icon-allow-overlap": true }}
              // images={images}
            >
							{koordinat.map((item, key) => 
								<Feature key={key} 
								coordinates={item.center} 
								onClick ={() => this._onClickMap({key})}
								onMouseEnter ={() => this._onMouseEnter({key})}
								onMouseLeave ={this._onMouseLeave}
								/>
								)}
							{/* {points.map((point, i) => <Feature key={i} coordinates={point} />)} */}
            </Layer>
						{this.state.popup && <PopUp center={koordinat[number].center} deskripsi={koordinat[number].deskripsi} tanaman={koordinat[number].tanaman} username={koordinat[number].username} pemilik={koordinat[number].pemilik}/>}
					</Map>
				</div>
      </div>
    );
  }
}

export default App;
