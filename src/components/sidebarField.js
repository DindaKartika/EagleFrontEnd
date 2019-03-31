import React, { Component } from 'react';
import '../css/main.css';
import '../css/bootstrap.min.css'
import{ Link } from "react-router-dom";
import axios from 'axios';
import ListFarm from './listSidebar'
import DateTimePicker from 'react-datetime-picker'

class SidebarField extends Component {
	constructor(props){
		super(props);
		this.state = {
        datePlant : new Date(),
        dateReady : new Date()
		};
	}

  onChangePlant = datePlant => this.setState({ datePlant })
  onChangeReady = dateReady => this.setState({ dateReady })

	// componentDidMount = (selectedPage) =>{
	// 	const self = this;
	// 	axios
	// 	.get('http://0.0.0.0:5000/farms')
	// 	.then(function(response){
	// 		self.setState({Farms: response.data});
	// 		console.log('Farms', response.data);
	// 	})
	// 	.catch(function(error){
	// 		console.log('error', error);
	// 	})
	// }

  render() {
    return (
    <div className="sidebar">
			<h5>Masukkan info tanah:</h5>
      <form onSubmit={e => e.preventDefault()}>
        <label for="deskripsi">Deskripsi lahan:</label>
        <br/>
        <input type="text" name="deskripsi" defaultValue=""/>
        <br/>
        <label for="plant_type">Jenis tanaman:</label>
        <br/>
        <input type="text" name="plant_type" defaultValue=""/>
        <br/>
        <label for="planted_at">Tanggal ditanam:</label>
        <br/>
        <DateTimePicker
          onChange={this.onChangePlant}
          value={this.state.datePlant}
          disableClock={true}
        />
        <br/>
        <label for="ready_at">Perkiraan tanggal panen:</label>
        <br/>
        <DateTimePicker className="css-10nd86i"
            onChange={this.onChangeReady}
            value={this.state.dateReady}
            disableClock={true}
            // minDate={new Date()}
        />
        <br/>
        <label for="address">Alamat lengkap:</label>
        <br/>
        <input type="text" name="address" defaultValue=""/>
        <br/>
        <label for="city">Kota:</label>
        <br/>
        <input type="text" name="city" defaultValue=""/>
        <br/>
        <label for="photos">Foto lahan:</label>
        <br/>
        <input type="text" name="photos" defaultValue=""/>
      </form>
    </div>
    );
  }
}

export default SidebarField;