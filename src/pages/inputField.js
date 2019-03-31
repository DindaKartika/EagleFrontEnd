import React, { Component } from "react";
import ReactDOM from "react-dom";
import ReactMapboxGl from "react-mapbox-gl";
import DrawControl from "react-mapbox-gl-draw";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
import Header from '../components/header_signin'
import SidebarField from '../components/sidebarField'
import FilterMap from '../components/filter'

const Map = ReactMapboxGl({
  accessToken:
    "pk.eyJ1IjoiZmFrZXVzZXJnaXRodWIiLCJhIjoiY2pwOGlneGI4MDNnaDN1c2J0eW5zb2ZiNyJ9.mALv0tCpbYUPtzT7YysA2g"
});



class InputField extends Component {
	constructor(props) {
		super(props);
		this.state = {
			sidebar : false
		};

		this.viewFilter = this.viewFilter.bind(this);
	}

	onDrawCreate = ({ features }) => {
    console.log(features);
		console.log(features['0'].geometry.coordinates)
		this.setState({sidebar:true})

		if (data.features.length > 0) {
			var area = turf.area(data);
			// restrict to area to 2 decimal points
			var rounded_area = Math.round(area * 100) / 100;
			this.setState
		}
		console.log()
  };

  onDrawUpdate = ({ features }) => {
    console.log({ features });
  };
	
	viewFilter(){
		this.setState({filter:true})
	}

  render() {
		console.log(this.state.sidebar)
    return (
      <div className="InputField">
				<div className="header">
					<Header/>
				</div>
				<div className="search">
					<form onSubmit={e => e.preventDefault()}>
						<input type="search" onFocus={this.viewFilter} placeholder="Cari" name="search"/>
						<button type="submit" onClick={this.viewSidebar}><img src={'http://www.clker.com/cliparts/W/V/Z/X/h/t/search-icon-marine-md.png'}/></button>
					</form>
				</div>
				{this.state.sidebar && <SidebarField/>}
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
