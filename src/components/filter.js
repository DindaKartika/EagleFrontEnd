import React, { Component } from 'react';
import{ Link } from "react-router-dom";

import DateTime from "react-datetime";
import AsyncSelect from 'react-select/lib/Async';
import '../css/main.css';
import '../css/bootstrap.min.css'
import Select from 'react-select'
import DatePicker from 'react-datepicker'
// import DateTimePicker from 'react-datetime-picker'

const optionPlant = [
  {value:'', label:'Semua tanaman'},
  {value:'Bahan Pokok', label:'--- Bahan Pokok ---', isDisabled:true},
  {value:'Padi', label:'Padi'},
  {value:'Jagung', label:'Jagung'},
  {value:'Ubi', label:'Ubi'},
  {value:'Kentang', label:'Kentang'},
  {value:'Sayur', label:'--- Sayur ---', isDisabled:true},
  {value:'Kangkung', label:'Kangkung'},
  {value:'Kubis', label:'Kubis'},
  {value:'Lobak', label:'Lobak'},
  {value:'Mentimun', label:'Mentimun'},
  {value:'Sawi', label:'Sawi'},
  {value:'Terung', label:'Terung'},
  {value:'Tomat', label:'Tomat'},
  {value:'Wortel', label:'Wortel'},
  {value:'Lain-lain', label:'--- Lain-lain ---', isDisabled:true},
  {value:'Bawang Merah', label:'Bawang Merah'},
  {value:'Bawang Putih', label:'Bawang Putih'},
  {value:'Cabai', label:'Cabai'},
  {value:'Kacang Hijau', label:'Kacang Hijau'},
  {value:'Kacang Panjang', label:'Kacang Panjang'},
  {value:'Kacang Tanah', label:'Kacang Tanah'},
  {value:'Kedelai', label:'Kedelai'},
  {value:'Kelapa', label:'Kelapa'}
]

class FilterMap extends Component {
  constructor(props) {
		super(props);
		this.state = {
			date : new Date(),
      tanaman : "",
      tanah: false
    };
    localStorage.setItem('kota', '')
    localStorage.setItem('tanaman', '')
    localStorage.setItem('tanggal', '')
    localStorage.setItem('tanah', false)
    this.handleInputChange = this.handleInputChange.bind(this)
  }
  
	changePlant(event) {
		this.setState({
			tanaman: event.value
		});
    console.log(event.value)
    localStorage.setItem('tanaman', event.value)
  }
  
  onChange = date => {
    // const tanggal = date.toISOstring()
    this.setState({ date })
    localStorage.setItem('tanggal', date)
    console.log('tanggal di filter', date.toUTCString())
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });

    console.log('filtertanah', value)
    localStorage.setItem([name], value)
  }
	
  render() {
    console.log(this.state.date)
    return (
    <div className="filters">
        <label>Filter berdasarkan :</label>
        <br/>
        <label>Jenis Tanaman :</label>
        <Select options={optionPlant} onChange={e => this.changePlant(e)}/>
        <label>Waktu panen :</label>
        <br/>
        <DatePicker
          selected={this.state.date}
          onChange={this.onChange}
          value ={this.state.date}
        />
        <br/>
        <input
          name="tanah"
          type="checkbox"
          checked={this.state.tanah}
          onChange={this.handleInputChange} /> Lahan Dijual
    </div>
    );
  }
}

export default FilterMap;