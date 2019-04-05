import React, { Component } from "react";
import ReactMapboxGl, {Layer, Feature} from "react-mapbox-gl";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
import Header from '../components/header_signin'
import FilterMap from '../components/filter'
import axios from 'axios'
import PopUp from '../components/popup'
import KontenSidebar from '../components/kontenSidebar'

import "react-datepicker/dist/react-datepicker.css";
import { NONAME } from "dns";

const polygonPaint = {
  'fill-color': '#6F788A',
  'fill-opacity': 0.7
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
			number : null,
			Center : [112.63396597896462, -7.97718148341032],
			uniquefeatures : []
		};

		localStorage.setItem('search', '')

		this.viewFilter = this.viewFilter.bind(this);
		this.viewSidebar = this.viewSidebar.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this._onMouseLeave = this._onMouseLeave.bind(this)
		this.onMapLoad = this.onMapLoad.bind(this)
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
			self.setState({koordinat : rows})
			localStorage.setItem('datas', JSON.stringify(rows))
			console.log('cekdata', localStorage.getItem('datas'))
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
		console.log('tanaman', localStorage.getItem('tanaman'))
		console.log('tanggal', localStorage.getItem('tanggal'))
		console.log('tanah', localStorage.getItem('tanah'))
		console.log('search', localStorage.getItem('search'))
		const data = {}
		if (localStorage.getItem('tanaman') !== ""){
			data['plant_type'] = localStorage.getItem('tanaman')
		}
		if (localStorage.getItem('tanggal') !== ""){
			const date = localStorage.getItem('tanggal')
			const tanggal = new Date(date).toISOString()
			console.log('tanggalISO', tanggal)
			data['ready_at'] = tanggal
		}
		if (localStorage.getItem('search') !== ""){
			data['search'] = localStorage.getItem('search')
		}

		console.log('data search', data)

		const self = this

		axios
		.get('http://0.0.0.0:5000/farms', {
			params:data
			})
		.then(function(response){
			self.setState({Farms: response.data});
			console.log('farms', response.data);
			const Farms = response.data
			const rows = []
			const center = self.state.Center
			for (const [index, value] of Farms.entries()) {
				const rowCoordinates = []
				const coordinates = JSON.parse(response.data[index].coordinates)
				rowCoordinates.push(coordinates)
				const centers = JSON.parse(response.data[index].center)
				console.log(centers)
				const data = {}
				data['id'] = response.data[index].id_farm
				data['coordinates'] = rowCoordinates
				data['center'] = centers
				data['deskripsi'] = response.data[index].deskripsi
				data['tanaman'] = response.data[index].plant_type
				data['pemilik'] = response.data[index].user.display_name
				data['username'] = response.data[index].user.username
				rows.push(data)
			}

			console.log(rows)

			console.log('koordinat jadi', rows)
			self.setState({koordinat : rows})
			localStorage.setItem('datas', JSON.stringify(rows))
			console.log('cekdata', localStorage.getItem('datas'))
		})
		.catch(function(error){
			console.log('error', error);
		})
	}
	
	changeSearch(event) {
		this.setState({
			search: event.value
		});

		localStorage.setItem('search', event.value)
		console.log('search', event.value)
  }
	
	handleChange(date) {
    this.setState({
      startDate: date
    });
	}

	changeInput = e =>{
		localStorage.setItem('search', e.target.value);
	};

	_onClickMap = key =>{
		const indeks = key['key'] + 1
		this.props.history.push('/maps/' + indeks);
	}

	_onMouseEnter = key =>{
		console.log('mouseenter', key)
		this.setState({number : key['key']})
		this.setState({popup : true})
	}

	_onMouseLeave(){
		this.setState({popup : false})
		this.setState({number : null})
	}

	_onMoveEnd= (map,evt) => {
		console.log('Map clicked!');
		const features = map.queryRenderedFeatures(evt.point);
		console.log('cek features awal', features);

		if (features) {
			const uniqueFeatures = this.getUniqueFeatures(features, "id");
			const ids = []
			for (const [index, value] of uniqueFeatures.entries()) {
				if (value.properties.id !== undefined){
					console.log(value.properties.id)
					ids.push(value.properties.id)
				}
			}
			console.log('cek ada feature', ids)
			if (ids != []){
				this.setState({uniquefeatures : ids})
			}
			else{
				this.setState({uniquefeatures : [0]})
			}
			}
		}

		getUniqueFeatures(array, comparatorProperty) {
			var existingFeatureKeys = {};
			var uniqueFeatures = array.filter(function(el) {
			if (existingFeatureKeys[el.properties[comparatorProperty]]) {
				return false;
			} else {
				existingFeatureKeys[el.properties[comparatorProperty]] = true;
				return true;
			}
			});
			return uniqueFeatures;
		}

	onMapLoad(map, evt) {
		navigator.geolocation.getCurrentPosition(position =>{
			const lng = position.coords.longitude
			const lat = position.coords.latitude
			console.log('longitude', lng)
			console.log('latitude', lat)

			const center = []
			center.push(lng)
			center.push(lat)
			this.setState({Center : center})
		})
	};
	
	

  render() {
		console.log(this.state.sidebar)
		const {startDate} = this.state
		console.log('tanggal', startDate.toISOString())
		const {koordinat, Center, Farms, number, uniquefeatures} = this.state
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
				<div className="sidebar">
					{uniquefeatures.map((item, key) => 
					// console.log('cek hasil bayam', uniquefeatures)
							<KontenSidebar key={key} id={item} pemilik={koordinat[item].pemilik} username={koordinat[item].username} tanaman={koordinat[item].tanaman} deskripsi={koordinat[item].deskripsi}
							/>
					)}
				</div>
				<div>
					<Map
						
						style="mapbox://styles/mapbox/streets-v9"
						containerStyle={{
							height: "90vh",
							width: "80vw"
						}}
						center={Center}
						onStyleLoad={this.onMapLoad}
						onMoveEnd ={this._onMoveEnd}
					>
						<Layer
              type="symbol"
              id="points"
							layout={{ "icon-image": "garden-15", "icon-allow-overlap": true }}
							// type="fill"
							// paint={polygonPaint}
            >
							{koordinat.map((item, key) => 
								<Feature key={key} 
								coordinates={item.center}
								// coordinates={item.coordinates} 
								onClick ={() => this._onClickMap({key})}
								onMouseEnter ={() => this._onMouseEnter({key})}
								onMouseLeave ={this._onMouseLeave}
								/>
							)}
            </Layer>
						{/* {koordinat.map((item, key) => 
							<PopUp center={item.center} deskripsi={item.deskripsi} tanaman={item.tanaman} username={item.username} pemilik={item.pemilik}/>
						)} */}
						{this.state.popup && <PopUp center={koordinat[number].center} deskripsi={koordinat[number].deskripsi} tanaman={koordinat[number].tanaman} username={koordinat[number].username} pemilik={koordinat[number].pemilik}/>}
					</Map>
				</div>
      </div>
    );
  }
}

export default App;
