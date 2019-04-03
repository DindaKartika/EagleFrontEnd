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

import "react-datepicker/dist/react-datepicker.css";

const optionsCity = [
	{ value: 'malang', label: 'malang' }
]
	
const optionsPlant = [
	{ value: 'cabe', label: 'cabe' },
	{ value: 'tomat', label: 'tomat' },
	{ value: 'terong', label: 'terong' }
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
			startDate : new Date(),
			kota : "",
			tanaman : "",
			sidebar : false
		};

		localStorage.setItem('search', '')

		this.viewFilter = this.viewFilter.bind(this);
		this.viewSidebar = this.viewSidebar.bind(this);
		this.handleChange = this.handleChange.bind(this);
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
			// self.setState({user : response.data.user})
			const rows = []
			const rowCenter = []
			for (const [index, value] of Farms.entries()) {
				const koordinat = JSON.parse(response.data[index].coordinates)
				console.log(koordinat)
				const rowCoord = []
				rowCoord.push(koordinat)
				rows.push(rowCoord)

				const centers = JSON.parse(response.data[index].center)
				rowCenter.push(centers)
			}
			console.log('koordinat jadi', rows)
			self.setState({koordinat : rows})
			console.log('center_jadi', rowCenter)
			self.setState({Center : rowCenter})
			
			// const koordinat = []
			// koordinat.push(JSON.parse(response.data.coordinates))
			// console.log('coord jadi', koordinat)
			// self.setState({koordinat: koordinat})
			// const centers = JSON.parse(response.data.center)
			// console.log(centers)
			// self.setState({center:centers})
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

	_onClickMap() {
		console.log('success');
	}

  render() {
		console.log(this.state.sidebar)
		const {startDate} = this.state
		console.log('tanggal', startDate.toISOString())
		const {koordinat, Center} = this.state
		console.log('koord', koordinat)
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
						{/* <div className="filters">
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
							<DatePicker
								selected={startDate}
								onChange={this.handleChange}
								value ={startDate}
							/>
						</div> */}
					</form>
				</div>
				{this.state.sidebar && <SidebarMap/>}
				<div>
					<Map
						style="mapbox://styles/mapbox/streets-v9"
						containerStyle={{
							height: "87vh",
							width: "100vw"
						}}
						center={[112.63396597896462, -7.97718148341032]}
						zoom={[13]}
					>
						<Layer type="fill" paint={polygonPaint}>
							<Feature 
							coordinates={koordinat} 
							onClick ={this._onClickMap}/>
						</Layer>
					</Map>
				</div>
      </div>
    );
  }
}

export default App;
