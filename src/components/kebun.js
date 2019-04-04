import React, { Component } from 'react';
import '../css/main.css';
import '../css/bootstrap.min.css'
import{ Link } from "react-router-dom";

import DateTime from "react-datetime";
import AsyncSelect from 'react-select/lib/Async';
import Select from 'react-select'
import DateTimePicker from 'react-datetime-picker'
import axios from 'axios'
import KontenKebun from './KontenKebun'


class FilterMap extends Component {
  constructor(props) {
		super(props);
		this.state = {
			Farms : []
    };
  }
  
  componentDidMount () {
    const self = this;
    console.log(window.location.pathname.slice(6))
    const id = localStorage.getItem('id')
    axios
    .get('http://0.0.0.0:5000/farms', {
        params:{id_user : id}
        })
    .then(function(response){
        self.setState({Farms: response.data});
        console.log('farms', response.data);
    })
    .catch(function(error){
        console.log('error', error);
    })
}
	
  render() {
		console.log(this.state.date)
		const {Farms} = this.state
    return (
    <div>
			{Farms.map((item, key) => 
				<KontenKebun key={key} id={item.id_farm} deskripsi={item.deskripsi} alamat={item.address} kota={item.city} tanaman={item.plant_type} luas_tanah={item.farm_size} estimasi_panen={item.ready_at}
				/>
			)}
    </div>
    );
  }
}

export default FilterMap;