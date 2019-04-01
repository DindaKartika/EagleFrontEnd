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
import DatePicker from 'react-datepicker'

import "react-datepicker/dist/react-datepicker.css";

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

		this.viewFilter = this.viewFilter.bind(this);
		this.viewSidebar = this.viewSidebar.bind(this);
		this.handleChange = this.handleChange.bind(this);
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
  
	// onChange = date => this.setState({ date })
	
	handleChange(date) {
    this.setState({
      startDate: date
    });
}

  render() {
		console.log(this.state.sidebar)
		const {startDate} = this.state
		console.log('tanggal', startDate.toISOString())
    return (
      <div className="App">
				<div className="header">
					<Header/>
				</div>
				<div className="search">
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
							{/* <DateTimePicker
								onChange={this.onChange}
								value={this.state.date}
								disableClock={true}
								// minDate={new Date()}
							/> */}
							<DatePicker
								selected={startDate}
								onChange={this.handleChange}
								value ={startDate}
							/>
						</div>
					</form>
				</div>
				{this.state.sidebar && <SidebarMap/>}
				<div>
					<Map
						style="mapbox://styles/mapbox/streets-v9"
						containerStyle={{
							height: "90vh",
							width: "100vw"
						}}
						center={[112.63396597896462, -7.97718148341032]}
						zoom={[12]}
					>
					</Map>
				</div>
      </div>
    );
  }
}

export default App;
