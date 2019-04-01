import React, { Component } from 'react';
import '../css/main.css';
import '../css/bootstrap.min.css'
import{ Link } from "react-router-dom";

import DateTime from "react-datetime";
import AsyncSelect from 'react-select/lib/Async';
import Select from 'react-select'
import DateTimePicker from 'react-datetime-picker'

const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
  ]

class FilterMap extends Component {
  constructor(props) {
		super(props);
		this.state = {
			date : new Date(),
			kota : "",
			tanaman : "",
		};
  }
  
  changeCity(event) {
		this.setState({
			kota: event.value
		});
		console.log(event.value)
	}

	changePlant(event) {
		this.setState({
			tanaman: event.value
		});
		console.log(event.value)
  }
  
  onChange = date => this.setState({ date })
	
  render() {
    console.log(this.state.date)
    return (
    <div className="filters">
        <label>Filter berdasarkan :</label>
        <br/>
        <label>Kota :</label>
        <Select options={options} onChange={e => this.changeCity(e)}/>
        <label>Jenis Tanaman :</label>
        <Select options={options} onChange={e => this.changePlant(e)}/>
        <label>Waktu panen :</label>
        <br/>
        <DateTimePicker
            onChange={this.onChange}
            value={this.state.date}
            disableClock={true}
            // minDate={new Date()}
        />
    </div>
    );
  }
}

export default FilterMap;