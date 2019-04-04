import React, { Component } from 'react';
import '../css/main.css';
import '../css/bootstrap.min.css'
import{ Link } from "react-router-dom";
import axios from 'axios';
import ListFarm from './listSidebar'
import DateTimePicker from 'react-datetime-picker'
import DatePicker from 'react-datepicker'
import {withRouter} from 'react-router-dom';

class SidebarField extends Component {
	constructor(props){
		super(props);
		this.state = {
        deskripsi : "", 
        plant_type : "", 
        datePlant : new Date(), 
        dateReady : new Date(), 
        address : "", 
        city : "", 
        photos : ""
		};
	}

  onChangePlant = datePlant => this.setState({ datePlant })
  onChangeReady = dateReady => this.setState({ dateReady })

  changeInput = e =>{
    this.setState({[e.target.name]: e.target.value});
  };

	saveDetails = () =>{
    const {deskripsi, plant_type, datePlant, dateReady, address, city, photos} = this.state;
    const id = localStorage.getItem('id_farm')
    const tokens = localStorage.getItem('token')
    console.log(id)
    console.log('ready', dateReady)
    console.log('plant', datePlant)
    const data={
      description: deskripsi,
      plant_type: plant_type,
      planted_at: datePlant.toISOString(),
      ready_at: dateReady.toISOString(),
      address: address,
      city: city,
      photos: photos
    };
    console.log(data)

    const self = this;
    axios
      .put('http://0.0.0.0:5000/farms/' + id, data, {
				headers:{
						'Authorization' : 'Bearer ' + tokens
				}
			})
      .then(response => {
          console.log("testtt dooooooooooooooooooooooooooong", response.data);
          this.props.history.push('/maps/' + id);
      })
      .catch(error => {
          console.log(error);
      });
  };

  render() {
    const coord = localStorage.getItem('koordinat')
    console.log('coord', coord)
    return (
    <div className="sidebar">
			<h5>Masukkan info tanah:</h5>
      {/* <label>{coord}</label> */}
      <form onSubmit={e => e.preventDefault()}>
        <label for="deskripsi">Deskripsi lahan:</label>
        <br/>
        <input type="text" name="deskripsi" defaultValue="" onChange={e => this.changeInput(e)}/>
        <br/>
        <label for="plant_type">Jenis tanaman:</label>
        <br/>
        <input type="text" name="plant_type" defaultValue="" onChange={e => this.changeInput(e)}/>
        <br/>
        <label for="planted_at">Tanggal ditanam:</label>
        <br/>
        {/* <DateTimePicker
          onChange={this.onChangePlant}
          value={this.state.datePlant}
          disableClock={true}
        /> */}
        <DatePicker
          selected={this.state.datePlant}
          onChange={this.onChangePlant}
          value ={this.state.datePlant}
        />
        <br/>
        <label for="ready_at">Perkiraan tanggal panen:</label>
        <br/>
        {/* <DateTimePicker className="css-10nd86i"
            onChange={this.onChangeReady}
            value={this.state.dateReady}
            disableClock={true}
            // minDate={new Date()}
        /> */}
        <DatePicker
          selected={this.state.dateReady}
          onChange={this.onChangeReady}
          value ={this.state.dateReady}
        />
        <br/>
        <label for="address">Alamat lengkap:</label>
        <br/>
        <input type="text" name="address" defaultValue="" onChange={e => this.changeInput(e)}/>
        <br/>
        <label for="city">Kota:</label>
        <br/>
        <input type="text" name="city" defaultValue="" onChange={e => this.changeInput(e)}/>
        <br/>
        <label for="photos">Foto lahan:</label>
        <br/>
        <input type="text" name="photos" defaultValue="" onChange={e => this.changeInput(e)}/>
        <br/>
        <button type="submit" onClick={() =>this.saveDetails()}>Simpan</button>
      </form>
    </div>
    );
  }
}

export default withRouter(SidebarField);