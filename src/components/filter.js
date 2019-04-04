import React, { Component } from 'react';
import{ Link } from "react-router-dom";

import DateTime from "react-datetime";
import AsyncSelect from 'react-select/lib/Async';
import Select from 'react-select'
import DateTimePicker from 'react-datetime-picker'

const optionCity = [
    { value: 'Malang', label: 'Malang' },
    { value: 'Surabaya', label: 'Surabaya' },
    { value: 'Solo', label: 'Solo' }
  ]

const optionPlant = [
  { value: 'Tomat', label: 'Tomat' },
  { value: 'Cabai', label: 'Cabai' },
  { value: 'Terong', label: 'Terong' }
]

class FilterMap extends Component {
  constructor(props) {
		super(props);
		this.state = {
			date : new Date(),
			kota : "",
			tanaman : "",
    };
    localStorage.setItem('kota', '')
    localStorage.setItem('tanaman', '')
    localStorage.setItem('tanggal', '')
  }
  
  changeCity(event) {
		this.setState({
			kota: event.value
		});
    console.log(event.value)
    localStorage.setItem('kota', event.value)
	}

	changePlant(event) {
		this.setState({
			tanaman: event.value
		});
    console.log(event.value)
    localStorage.setItem('tanaman', event.value)
  }
  
  onChange = date => {
    this.setState({ date })
    localStorage.setItem('tanggal', date)
  }
	
  render() {
    console.log(this.state.date)
    return (
    <div className="filters">
        <label>Filter berdasarkan :</label>
        <br/>
        <label>Kota :</label>
        <Select options={optionCity} onChange={e => this.changeCity(e)}/>
        <label>Jenis Tanaman :</label>
        <Select options={optionPlant} onChange={e => this.changePlant(e)}/>
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