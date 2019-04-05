import React, { Component } from "react";
import ReactDOM from "react-dom";
import ReactMapboxGl from "react-mapbox-gl";
import DrawControl from "react-mapbox-gl-draw";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
import Header from '../components/header_signin'
import SidebarField from '../components/sidebarField'
import FilterMap from '../components/filter'
import axios from 'axios'
import { connect } from "unistore/react";
import { actions } from '../store';
import { withRouter, Redirect } from "react-router-dom";

const Map = ReactMapboxGl({
  accessToken:
    "pk.eyJ1IjoiZGthcnRpa2EiLCJhIjoiY2p0ejY1c3FmMzExejQxcGNmcmZoaGhtMCJ9.FnTBMWoUi17BhvjRQ0e2mw"
});

const turf = require("@turf/turf")

class InputField extends Component {
	constructor(props) {
		super(props);
		this.state = {
			sidebar : false,
			koordinat : "",
			center : [112.63396597896462, -7.97718148341032]
		};

		this.viewFilter = this.viewFilter.bind(this);
	}

	onDrawCreate = ({ features }) => {
		const coord = features['0'].geometry.coordinates[0]
		const rows = []
		for (const [index, value] of coord.entries()) {
			rows.push([value[0], value[1]])
		}

		const count = []
		count.push(rows)

		if (rows.length > 0) {
			const polygons = turf.polygon(count)
			const area = turf.area(polygons);
			// restrict to area to 2 decimal points
			const rounded_area = Math.round(area * 100) / 100;

			const center = turf.center(polygons)
			const pusat = center.geometry.coordinates
			const tokens = localStorage.getItem('token')
			// this.setState()
			console.log('luas', rounded_area)
			console.log('pusat', pusat)
			localStorage.setItem('koordinat', rounded_area)
			localStorage.setItem('center', pusat)

			axios
			.get('https://api.mapbox.com/v4/mapbox.mapbox-terrain-v2/tilequery/' + pusat[0] + ',' + pusat[1] + '.json?&access_token=pk.eyJ1IjoiZGthcnRpa2EiLCJhIjoiY2p0ejY1c3FmMzExejQxcGNmcmZoaGhtMCJ9.FnTBMWoUi17BhvjRQ0e2mw')
			.then(function(response){
				const elevation = response.data.features[0].properties.ele
				// localStorage.setItem('id_farm', response.data.id_farm)
				console.log('Elevation', elevation);

				const data={
					coordinates: rows,
					farm_size: rounded_area,
					center: pusat
					// height: elevation
				}
				console.log(data)
				axios
					.post('http://0.0.0.0:5000/farms', data, {
					headers:{
							'Authorization' : 'Bearer ' + tokens
					}
					})
					.then(function(response){
					// this.setState({Farms: response.data});
					localStorage.setItem('id_farm', response.data.id_farm)
					console.log('Farms', response.data);
					})
					.catch(function(error){
					console.log('error', error);
					})
			})
			.catch(function(error){
				console.log('error', error);
			})

			// axios
			// .post('http://0.0.0.0:5000/farms', data, {
			// 	headers:{
			// 			'Authorization' : 'Bearer ' + tokens
			// 	}
			// })
			// .then(function(response){
			// 	// this.setState({Farms: response.data});
			// 	localStorage.setItem('id_farm', response.data.id_farm)
			// 	console.log('Farms', response.data);
			// })
			// .catch(function(error){
			// 	console.log('error', error);
			// })

		}
		this.setState({sidebar:true})
  };

  onDrawUpdate = ({ features }) => {
    console.log('update', { features });
  };
	
	viewFilter(){
		this.setState({filter:true})
	}

	changeInput = e =>{
		localStorage.setItem('search', e.target.value);
		console.log(e.target.value)
	};

	flyToCity = () =>{
    const search = localStorage.getItem('search')

		const basicURL = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + search + ".json?access_token=pk.eyJ1IjoiZGthcnRpa2EiLCJhIjoiY2p0ejY1c3FmMzExejQxcGNmcmZoaGhtMCJ9.FnTBMWoUi17BhvjRQ0e2mw"

    const self = this;
    axios
      .get(basicURL)
      .then(response => {
					console.log("kota", response.data.features[0]);
					this.setState({center : response.data.features[0].center})
          // this.props.history.push('/maps/' + id);
      })
      .catch(error => {
          console.log(error);
      });
  };

  render() {
		console.log(this.state.sidebar)
		const {center} = this.state
		console.log("cek_login", this.props.is_login)
		if(!this.props.is_login){
			return <Redirect to={{pathname:"/signin"}}/>
		}
		else{

			return (
				<div className="InputField">
					<div className="header">
						<Header/>
					</div>
					<div className="search">
						<form onSubmit={e => e.preventDefault()}>
							<input type="search" onFocus={this.viewFilter} placeholder="Masukkan kota" name="search" onChange={e => this.changeInput(e)}/>
							<button type="submit" onClick={() =>this.flyToCity()}><img src={'http://www.clker.com/cliparts/W/V/Z/X/h/t/search-icon-marine-md.png'}/></button>
						</form>
					</div>
					<div className="sidebar" style={{display : (this.state.sidebar ? "none" : "block")}}>
						<h3>Masukkan lokasi tanah anda</h3>
					</div>
					{this.state.sidebar && <SidebarField/>}
					<div>
						<Map
							style="mapbox://styles/mapbox/streets-v9"
							containerStyle={{
								height: "90vh",
								width: "100vw"
							}}
							center={center}
							zoom={[12]}
						>
							<DrawControl
								position="top-right"
								displayControlsDefault = {false}
								controls={{
									polygon:true,
									trash:true
								}}
								onDrawCreate={this.onDrawCreate}
								onDrawUpdate={this.onDrawUpdate}
							/>
						</Map>
					</div>
				</div>
			);
		}
  }
}

export default connect( "is_login", actions)
(withRouter(InputField));