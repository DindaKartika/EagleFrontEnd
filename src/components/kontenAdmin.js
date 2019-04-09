import React, { Component } from "react";
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ReactMapboxGl, {Layer, Feature, Popup} from "react-mapbox-gl";
import axios from 'axios';

import "./../css/bootstrap.min.css";
import "./../css/main.css";


class KontenAdmin extends Component{
  constructor(props) {
		super(props);
		this.state = {
			time : ""
		};
	}

  SentMessage = () => {
    console.log('coba props', this.props.telepon);
    const message = "Halo, " + this.props.nama + ". Sudahkah anda memperbarui data lahan bulan ini? Jawab 'ya' jika anda telah memperbarui data, jawab 'tidak' jika anda belum memperbarui data."
    console.log('message', message)
    const data = {
      phone: this.props.telepon,
      message: message
    };
    console.log(data);
    const self = this;
    axios
      .post("https://cors-anywhere.herokuapp.com/https://api.wassenger.com/v1/messages", data, {
        headers: {
          token: "31a726b85b32b2eccbc9e578aef15ee476c5a78174ecc8aca4f7c7a320b5f7f6e3b7783c529b8a22"
        }
      }
      )
      .then(response => {
        console.log("cek hasil", response.data);
        self.setState({SentTime : response.data.createdAt})
        // self.setState({})
      })
      .catch(error => {
        console.log(error);
      });
  };
  
  CheckResponse = () => {
    const self = this;
    const froms = this.props.telepon.slice(1) + "@c.us"
    console.log(froms)
    axios
      .get("https://cors-anywhere.herokuapp.com/https://api.wassenger.com/v1/io/5caab1f5b1ce0c001b9d3d3d/messages?token=31a726b85b32b2eccbc9e578aef15ee476c5a78174ecc8aca4f7c7a320b5f7f6e3b7783c529b8a22", {
        params: {
          from: froms,
          after: self.state.SentTime
        }
      })
      .then(response => {
        console.log("baca message", response.data[0].body);
        if (response.data[0].body == 'ya' || response.data[0].body == 'Ya'){
          const message = "Terimakasih telah memperbarui data anda."
          const data = {
            phone: this.props.telepon,
            message: message
          };
          axios
          .post("https://cors-anywhere.herokuapp.com/https://api.wassenger.com/v1/messages", data, {
            headers: {
              token: "31a726b85b32b2eccbc9e578aef15ee476c5a78174ecc8aca4f7c7a320b5f7f6e3b7783c529b8a22"
            }
          }
          )
          .then(response => {
            console.log("cek hasil", response.data);
          })
          .catch(error => {
            console.log(error);
          });
        }
        else if (response.data[0].body == 'tidak' || response.data[0].body == 'Tidak'){
          const message = "Silahkan masuk ke aplikasi Lahanku dan memperbarui data anda."
          const data = {
            phone: this.props.telepon,
            message: message
          };
          axios
          .post("https://cors-anywhere.herokuapp.com/https://api.wassenger.com/v1/messages", data, {
            headers: {
              token: "31a726b85b32b2eccbc9e578aef15ee476c5a78174ecc8aca4f7c7a320b5f7f6e3b7783c529b8a22"
            }
          }
          )
          .then(response => {
            console.log("cek hasil", response.data);
          })
          .catch(error => {
            console.log(error);
          });
        }
        else {
          const message = "Halo, " + this.props.nama + ". Sudahkah anda memperbarui data lahan bulan ini? Jawab 'ya' jika anda telah memperbarui data, jawab 'tidak' jika anda belum memperbarui data."
          const data = {
            phone: this.props.telepon,
            message: message
          };
          axios
          .post("https://cors-anywhere.herokuapp.com/https://api.wassenger.com/v1/messages", data, {
            headers: {
              token: "31a726b85b32b2eccbc9e578aef15ee476c5a78174ecc8aca4f7c7a320b5f7f6e3b7783c529b8a22"
            }
          }
          )
          .then(response => {
            console.log("cek hasil", response.data);
          })
          .catch(error => {
            console.log(error);
          });
        }
      })
      .catch(error => {
        console.log(error);
      });
	};

  render(){
    return(
      <tr>
        <td>{this.props.id}</td>
        <td>{this.props.nama}</td>
        <td>{this.props.alamat}</td>
        <td>{this.props.kota}</td>
        <td>
          <button onClick={() => this.SentMessage()}>Kirim Pesan</button>
          <button onClick={() => this.CheckResponse()}>Cek Balasan</button>
        </td>
      </tr>
    )
  }
}


export default KontenAdmin;