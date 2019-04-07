import React, { Component } from "react";
import ReactDOM from "react-dom";
import ReactMapboxGl, {Layer, Feature} from "react-mapbox-gl";
import DrawControl from "react-mapbox-gl-draw";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
import Header from '../components/header_signin'
import SidebarField from '../components/sidebarField'
import FilterMap from '../components/filter'
import axios from 'axios'
import { connect } from "unistore/react";
import { actions } from '../store';
import { withRouter, Redirect } from "react-router-dom";

import ColorSample from '../images/img/00CED1.png'

const Map = ReactMapboxGl({
  accessToken:
    "pk.eyJ1IjoiZGthcnRpa2EiLCJhIjoiY2p0ejY1c3FmMzExejQxcGNmcmZoaGhtMCJ9.FnTBMWoUi17BhvjRQ0e2mw"
});

const turf = require("@turf/turf")

const polygonPaint = {
  'fill-color': '#00CED1',
  'fill-opacity': 1
};

// const elevation = ""

class InputField extends Component {
	constructor(props) {
		super(props);
		this.state = {
			sidebar : false,
			koordinat : "",
			center : [112.63396597896462, -7.97718148341032],
			koordinats:[],
			elevation : 1000
		};

		this.viewFilter = this.viewFilter.bind(this);
	}

	UNSAFE_componentWillMount () {
		const self = this;
		axios
		.get('http://0.0.0.0:5000/farms')
		.then(function(response){
			self.setState({Farms: response.data});
			console.log('farms', response.data);
			const Farms = response.data
			const rows = []
			for (const [index, value] of Farms.entries()) {
				const rowCoordinates = []
				const coordinates = JSON.parse(response.data[index].coordinates)
				rowCoordinates.push(coordinates)
				const centers = JSON.parse(response.data[index].center)
				console.log(centers)
				const data = {}
				data['coordinates'] = rowCoordinates
				data['center'] = centers
				data['deskripsi'] = response.data[index].deskripsi
				data['tanaman'] = response.data[index].plant_type
				data['pemilik'] = response.data[index].user.display_name
				data['username'] = response.data[index].user.username
				rows.push(data)
			}
			console.log('koordinat jadi', rows)
			self.setState({koordinats : rows})
			localStorage.setItem('datas', JSON.stringify(rows))
			console.log('cekdata', localStorage.getItem('datas'))
		})
		.catch(function(error){
			console.log('error', error);
		})
	}

	// UNSAFE_componentWillMount() {
	// 	console.log('token', localStorage.getItem('token'))
  //   this.props.getIdentity();
  // }

	onDrawCreate = ({ features }) => {
		const coord = features['0'].geometry.coordinates[0]
		const rows = []
		for (const [index, value] of coord.entries()) {
			rows.push([value[0], value[1]])
		}

		const count = []
		count.push(rows)

		const self = this

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
			// .get('https://api.open-elevation.com/api/v1/lookup?locations=' + pusat[0] + ',' + pusat[1])
			.then(function(response){
				// const elevation = response.data.features[0].properties.ele
				// localStorage.setItem('id_farm', response.data.id_farm)
				if (response.data.features[0].properties.ele !== undefined){
					// console.log('undefined')
					self.setState({elevation : response.data.features[0].properties.ele})
				}

				console.log('Elevation', self.state.elevation);

				const data={
					coordinates: rows,
					farm_size: rounded_area,
					center: pusat,
					ketinggian: self.state.elevation
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
		const {center, koordinats} = this.state
		console.log("cek_login", this.props.is_login)
		if(localStorage.getItem('token')){
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
							<img src={ColorSample}/><span> = Tanah telah diklaim</span>
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
							<Layer
								// type="symbol"
								// id="points"
								// layout={{ "icon-image": "garden-15", "icon-allow-overlap": true }}
								type="fill"
								paint={polygonPaint}
							>
								{koordinats.map((item, key) => 
									<Feature key={key} 
									// coordinates={item.center}
									coordinates={item.coordinates} 
									// onClick ={() => this._onClickMap({key})}
									// onMouseEnter ={() => this._onMouseEnter({key})}
									// onMouseLeave ={this._onMouseLeave}
									/>
								)}
							</Layer>

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
		else{
			return <Redirect to={{pathname:"/signin"}}/>
		}
  }
}

export default connect( "is_login", actions)
(withRouter(InputField));