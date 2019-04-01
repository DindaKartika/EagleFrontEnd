import React, { Component } from 'react';
import '../css/main.css';
import '../css/bootstrap.min.css'
import{ Link } from "react-router-dom";
import axios from 'axios';
import ListFarm from './listSidebar'

class SidebarMap extends Component {
	constructor(props){
		super(props);
		this.state = {
				Farms: []
			};
		}

	componentDidMount = () =>{
		const self = this;
		axios
		.get('http://0.0.0.0:5000/farms')
		.then(function(response){
			self.setState({Farms: response.data});
			console.log('Farms', response.data);
		})
		.catch(function(error){
			console.log('error', error);
		})
	}

  render() {
		const {Farms} = this.state;
    return (
    <div className="sidebar">
			<h5>List hasil pencarian dan filter:</h5>
      <div className="row">
				{Farms.map((item, key) => {
					console.log(item)
					return <ListFarm key ={key} id={item.id_farm} user={item.user} plant={item.plant_type} ready={item.ready_at}/>;
				})}
				</div>
    </div>
    );
  }
}

export default SidebarMap;