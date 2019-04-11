import React, { Component } from "react";
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ReactMapboxGl, {Layer, Feature, Popup} from "react-mapbox-gl";
import axios from "axios";
import { actions, store } from '../store';
import { connect } from "unistore/react";
import { withRouter } from "react-router-dom";

import "./../css/bootstrap.min.css";
import "./../css/main.css";

class KontenKebun extends Component{

  handleDeleteLahan(e){
    const self = this;

    const token = localStorage.getItem("token");
    let deleteFarms = {
        method:'delete',
        url:'https://api.lahanku.id/farms/' + e,
        headers: {
            'Authorization':'Bearer ' + token
        }
    };
    console.log("cek delete feed", deleteFarms);
    axios(deleteFarms)
    .then(function(response){
        console.log(window.location.pathname.slice(6))
        const id = localStorage.getItem('id')
        axios
        .get('https://api.lahanku.id/farms', {
            params:{id_user : id}
            })
        .then(function(response){
            store.setState({Farms: response.data});
            console.log('farms', response.data);
        })
        .catch(function(error){
            console.log('error', error);
        })
        self.props.history.push("/profile");
    }).catch(function(error) {
        console.log("Gagal delete lahan", error);})
    };


  render(){
    return(
      <div className="row farm-item">
        <div className="col-md-6">
          <div className="name-text">{this.props.deskripsi}</div>
          <div className="address-text">
            {this.props.alamat} {this.props.kota}
          </div>
          <div className="info-text">
          <div>Tanaman: {this.props.tanaman}</div>
          <div>Luas tanah: {this.props.luas_tanah} m<sup>2</sup></div>
          <div>Estimasi panen: {this.props.estimasi_panen}</div>
          </div>
          <div style={{display : "flex"}}>
          <Link to={"/maps/" + this.props.id}>
            <button className="btn btn-common">
              Lihat di peta
            </button>
          </Link>
          <button onClick={()=>this.handleDeleteLahan(this.props.id)} className="btn btn-common">
            Hapus Lahan
          </button>
          </div>
        </div>
      </div>
    )
  }
}

KontenKebun.propTypes = {
  id : PropTypes.number,
  deskripsi:PropTypes.string,
  alamat: PropTypes.string,
  kota:PropTypes.string,
  tanaman:PropTypes.string,
  luas_tanah :PropTypes.number,
  estimasi_panen:PropTypes.string
}

// export default KontenKebun;
export default connect(
  "Farms", actions
)(withRouter(KontenKebun));