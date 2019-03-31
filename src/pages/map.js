import React, { Component } from "react";
import ReactDOM from "react-dom";
import ReactMapboxGl from "react-mapbox-gl";
import DrawControl from "react-mapbox-gl-draw";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
import Header from '../components/header_signin'
import DateTime from "react-datetime";

const Map = ReactMapboxGl({
  accessToken:
    "pk.eyJ1IjoiZmFrZXVzZXJnaXRodWIiLCJhIjoiY2pwOGlneGI4MDNnaDN1c2J0eW5zb2ZiNyJ9.mALv0tCpbYUPtzT7YysA2g"
});

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			filter: false,
			hari: ""
		};

		this.viewFilter = this.viewFilter.bind(this);
	}

  // onDrawCreate = ({ features }) => {
  //   console.log(features);
  //   console.log(features['0'].geometry.coordinates)
  // };

  // onDrawUpdate = ({ features }) => {
  //   console.log({ features });
	// };
	
	viewFilter(){
		this.setState({filter:true})
	}

	input7Day(event) {
		this.setState({
			hari: DateTime.moment().add(7, "day").calendar()
		});
		console.log(DateTime.moment().add(7, "day").calendar())
	}

  render() {
    return (
      <div className="App">
				<div className="header">
					<Header/>
				</div>
				<div className="search">
					<form action="/search">
						<input type="text" onFocus={this.viewFilter} placeholder="Search.." name="search"/>
						<button type="submit"><img src={'http://www.clker.com/cliparts/W/V/Z/X/h/t/search-icon-marine-md.png'}/></button>
						<div className="filters">
							<div class="dropdown">
								<button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
									Kota
								</button>
								<div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
									<button class="dropdown-item">Action</button>
									<button class="dropdown-item">Another action</button>
									<button class="dropdown-item">Something else here</button>
								</div>
							</div>
							<div class="dropdown">
								<button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
									Jenis Tanaman
								</button>
								<div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
									<button class="dropdown-item">Action</button>
									<button class="dropdown-item">Another action</button>
									<button class="dropdown-item">Something else here</button>
								</div>
							</div>
							<div class="dropdown">
								<button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
									Waktu Panen
								</button>
								<div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
									<span class="dropdown-item" onClick={e => this.input7Day(e)}>1 minggu</span>
									<label class="dropdown-item">1 bulan</label>
									<label class="dropdown-item">3 bulan</label>
								</div>
							</div>
						</div>
					</form>
				</div>
				<div>
					<Map
						style="mapbox://styles/mapbox/streets-v9"
						containerStyle={{
							height: "100vh",
							width: "100vw"
						}}
						center={[112.63396597896462, -7.97718148341032]}
						zoom={[12]}
					>
						{/* <DrawControl
							position="top-right"
							displayControlsDefault = {false}
							controls={{
								polygon:true,
								trash:true
							}}
							onDrawCreate={this.onDrawCreate}
							onDrawUpdate={this.onDrawUpdate}
						/> */}
					</Map>
				</div>
      </div>
    );
  }
}

export default App;