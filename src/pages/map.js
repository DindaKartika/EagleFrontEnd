import React, { Component } from "react";
import ReactDOM from "react-dom";
import ReactMapboxGl from "react-mapbox-gl";
import DrawControl from "react-mapbox-gl-draw";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
import Header from '../components/header_signin'
import SidebarMap from '../components/sidebarMap'
import FilterMap from '../components/filter'

const Map = ReactMapboxGl({
  accessToken:
    "pk.eyJ1IjoiZmFrZXVzZXJnaXRodWIiLCJhIjoiY2pwOGlneGI4MDNnaDN1c2J0eW5zb2ZiNyJ9.mALv0tCpbYUPtzT7YysA2g"
});



class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			filter: false,
			date : new Date(),
			kota : "",
			tanaman : "",
			sidebar : false
		};

		this.viewFilter = this.viewFilter.bind(this);
		this.viewSidebar = this.viewSidebar.bind(this);
	}
	
	viewFilter(){
		this.setState({filter:true})
	}

	viewSidebar(){
		this.setState({sidebar:true})
		;
	}

  render() {
		console.log(this.state.sidebar)
    return (
      <div className="App">
				<div className="header">
					<Header/>
				</div>
				<div className="search">
					<form onSubmit={e => e.preventDefault()}>
						<input type="search" onFocus={this.viewFilter} placeholder="Cari" name="search"/>
						<button type="submit" onClick={this.viewSidebar}><img src={'http://www.clker.com/cliparts/W/V/Z/X/h/t/search-icon-marine-md.png'}/></button>
						{this.state.filter && <FilterMap/>}
					</form>
				</div>
				{this.state.sidebar && <SidebarMap/>}
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