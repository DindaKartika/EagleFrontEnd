import React, { Component } from "react";
import ReactDOM from "react-dom";
import ReactMapboxGl from "react-mapbox-gl";
import DrawControl from "react-mapbox-gl-draw";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
import Header from '../components/header_signin'
import SidebarField from '../components/sidebarField'
import FilterMap from '../components/filter'
import axios from 'axios'
// import {Turf} from '@turf/turf'

const Map = ReactMapboxGl({
  accessToken:
    "pk.eyJ1IjoiZGthcnRpa2EiLCJhIjoiY2p0ejY1c3FmMzExejQxcGNmcmZoaGhtMCJ9.FnTBMWoUi17BhvjRQ0e2mw"
});

const turf = require("@turf/turf")


const tokens = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE1NTQwOTU2OTgsIm5iZiI6MTU1NDA5NTY5OCwianRpIjoiMWRjZTg1NjktMGU5My00MDY3LTk0NWMtNGE1YTFiZDA4NWE5IiwiZXhwIjoxNTU0MTgyMDk4LCJpZGVudGl0eSI6eyJpZCI6MSwidXNlcm5hbWUiOiJEaW5kYSIsImVtYWlsIjoiZGluZGFAeHl6LmNvbSIsImRpc3BsYXlfbmFtZSI6IiIsImhlYWRsaW5lIjoiIiwicHJvZmlsZV9waWN0dXJlIjoiaHR0cHM6Ly9jZG4ucGl4YWJheS5jb20vcGhvdG8vMjAxNS8xMC8wNS8yMi8zNy9ibGFuay1wcm9maWxlLXBpY3R1cmUtOTczNDYwXzk2MF83MjAucG5nIiwiY292ZXJfcGhvdG8iOiJodHRwczovL3d3dy5xbWF0Y2h1cC5jb20vaW1hZ2VzL2RlZmF1bHQtY292ZXIuanBnIiwiZ2VuZGVyIjoiIiwiZGF0ZV9vZl9iaXJ0aCI6IiIsImFkZHJlc3MiOiIiLCJwaG9uZV9udW1iZXIiOiIiLCJmYWNlYm9va19saW5rIjoiIiwiaW5zdGFncmFtX2xpbmsiOiIiLCJ0d2l0dGVyX2xpbmsiOiIiLCJvdGhlcl9saW5rIjoiIiwiY3JlYXRlZF9hdCI6IjIwMTktMDQtMDEgMTI6MTM6MDYuNDMxNzU2IiwidXBkYXRlZF9hdCI6IjIwMTktMDQtMDEgMTI6MTM6MDYuNDMxNzY4IiwicG9zdF9jb3VudCI6MCwiam9iIjoiIiwic3RhdHVzIjoiIn0sImZyZXNoIjpmYWxzZSwidHlwZSI6ImFjY2VzcyIsInVzZXJfY2xhaW1zIjp7ImlkIjoxLCJ1c2VybmFtZSI6IkRpbmRhIiwiZW1haWwiOiJkaW5kYUB4eXouY29tIiwiZGlzcGxheV9uYW1lIjoiIiwiaGVhZGxpbmUiOiIiLCJwcm9maWxlX3BpY3R1cmUiOiJodHRwczovL2Nkbi5waXhhYmF5LmNvbS9waG90by8yMDE1LzEwLzA1LzIyLzM3L2JsYW5rLXByb2ZpbGUtcGljdHVyZS05NzM0NjBfOTYwXzcyMC5wbmciLCJjb3Zlcl9waG90byI6Imh0dHBzOi8vd3d3LnFtYXRjaHVwLmNvbS9pbWFnZXMvZGVmYXVsdC1jb3Zlci5qcGciLCJnZW5kZXIiOiIiLCJkYXRlX29mX2JpcnRoIjoiIiwiYWRkcmVzcyI6IiIsInBob25lX251bWJlciI6IiIsImZhY2Vib29rX2xpbmsiOiIiLCJpbnN0YWdyYW1fbGluayI6IiIsInR3aXR0ZXJfbGluayI6IiIsIm90aGVyX2xpbmsiOiIiLCJjcmVhdGVkX2F0IjoiMjAxOS0wNC0wMSAxMjoxMzowNi40MzE3NTYiLCJ1cGRhdGVkX2F0IjoiMjAxOS0wNC0wMSAxMjoxMzowNi40MzE3NjgiLCJwb3N0X2NvdW50IjowLCJqb2IiOiIiLCJzdGF0dXMiOiIifX0.nmw38CpI3rftfEj5LYhOXdO-ESXuhjDRqbtDWJmMqzo'

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
			// this.setState()
			console.log('luas', rounded_area)
			console.log('pusat', pusat)
			localStorage.setItem('koordinat', rounded_area)
			localStorage.setItem('center', pusat)
			const data={
				coordinates: rows,
				farm_size: rounded_area,
				center: pusat
			};

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
		console.log(search)

		const basicURL = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + search + ".json?access_token=pk.eyJ1IjoiZGthcnRpa2EiLCJhIjoiY2p0ejY1c3FmMzExejQxcGNmcmZoaGhtMCJ9.FnTBMWoUi17BhvjRQ0e2mw"

		console.log(basicURL)
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

export default InputField;