import React, { Component } from 'react';
import{ Link } from "react-router-dom";
import axios from 'axios';
import ListFarm from './listSidebar'
import queryString from 'query-string';

class SidebarMap extends Component {
	constructor(props){
		super(props);
		this.state = {
				Farms: []
			};
		}

	componentDidMount = () =>{
		const self = this;
		const data={
			// 'city' : localStorage.getItem('kota'),
			// 'plant_type' : localStorage.getItem('tanaman'),
			// 'ready_at' : localStorage.getItem('tanggal'),
			'search' : localStorage.getItem('search')
		}

		console.log(data)
		axios
		.get('http://api.lahanku.id/farms', {
			params:data
	})
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
		console.log('cek isi sidebar', Farms)
    return (
    <div className="sidebar">
			<h5 style={{paddingTop: "100px"}}>List hasil pencarian dan filter:</h5>
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