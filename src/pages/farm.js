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
    "pk.eyJ1IjoiZGthcnRpa2EiLCJhIjoiY2p0eWVobmZ1MGdrdzRkbWhoaHRvOG1uciJ9.921TLCVIBcweDV-xoUiNeQ"
});

const polygonPaint = {
  'fill-color': '#00CED1',
  'fill-opacity': 1
};

class Farm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			filter: false,
			date : new Date(),
			kota : "",
			tanaman : "",
			sidebar : false,
			Farms : "",
			user : ""
			// center : [],
			// koordinat : []
		};
    }
    
    UNSAFE_componentWillMount () {
			const self = this;
			console.log(window.location.pathname.slice(6))
			axios
			.get('http://0.0.0.0:5000/farms/' + window.location.pathname.slice(6))
			.then(function(response){
				self.setState({Farms: response.data});
				console.log('Farms', response.data);
				self.setState({user : response.data.user})
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

  render() {
		console.log(this.state.sidebar)
		const {center, koordinat, Farms, user} = this.state
		console.log('center', center)
		console.log('koordinat', koordinat)
    return (
      <div className="App">
				<div className="header">
					<Header/>
				</div>
				<div className="sidebar">
					<h5>Informasi Lahan:</h5>
					<label>Nama pemilik: </label>
					<h5>{user.username}</h5>
					<label>Deskripsi : </label>
					<h5>{Farms.deskripsi}</h5>
					<label>Jenis tanaman : </label>
					<h5>{Farms.plant_type}</h5>
					<label>Tanggal ditanam : </label>
					<h5>{Farms.planted_at}</h5>
					<label>Perkiraan tanggal panen : </label>
					<h5>{Farms.ready_at}</h5>
					<label>Alamat : </label>
					<h5>{Farms.address}</h5>
					<label>Kota : </label>
					<h5>{Farms.city}</h5>
					<label>Luas : </label>
					<h5>{Farms.farm_size} m<sup>2</sup></h5>
					<label>Kategori : </label>
					<h5>{Farms.category}</h5>
				</div>
				<div>
					<Map
						style="mapbox://styles/mapbox/streets-v9"
						containerStyle={{
							height: "90vh",
							width: "100vw"
						}}
						center={center}
						zoom={[16.5]}
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
