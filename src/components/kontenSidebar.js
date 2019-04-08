import React, { Component } from "react";
import PropTypes, { object } from 'prop-types';
import { Link } from 'react-router-dom';
import ReactMapboxGl, {Layer, Feature, Popup} from "react-mapbox-gl";

import "./../css/bootstrap.min.css";
import "./../css/main.css";

const username  =localStorage.getItem('username')

const KontenSidebar = props => {
  console.log('cek username', username)
  console.log('baca data', props.data)
  const id = props.data.id
  const pemilik = props.data.pemilik
  const username = props.data.username
  const tanaman = props.data.tanaman
  const deskripsi = props.data.deskripsi
  const id_pemilik = props.data.id_pemilik
  const status_lahan = props.data.status_lahan
  console.log('tes lagi', id)
  return (
  <div class="card border-dark mb-3">
    <div class="card-header">
      <Link to={"/maps/" +id}>
      <label>Nomor Identitas Lahan {id}</label>
      </Link>
    </div>
    <div class="card-body text-dark row">
      {/* <h5 class="card-title">Dark card title</h5> */}
      <div className="col-md-8">
        <h6>Pemilik Lahan:</h6>
        <h4>{pemilik}</h4>
        
          <label>@{username}</label>
          <br/>
          <span>Tipe tanaman pada lahan:</span>
          {(tanaman == "") ? <h5>-</h5> : <h5>{tanaman}</h5>}
          <label>{deskripsi}</label>
        </div>
        <div className="col-md-4">
          <Link to={"/otherprofile/" + id_pemilik}>
            <button className="btn btn-outline-success sidebar-map">Info Pemilik Lahan</button>
          </Link>
          <Link to={"/maps/" + id}>
            <button className="btn btn-outline-success sidebar-map">Info Lahan</button>
          </Link>
        </div>
        <div>
          <hr />
          <label>Status tanah dijual: <br/>{status_lahan}</label>
          {/* <label>Status produk lahan dijual: {props.status_lahan}</label> */}
        </div>
        {/* <div className="col-md-4">
          
        </div>   */}
        </div>
      {/* <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p> */}
    </div>
    
  );

}

KontenSidebar.propTypes = {
  data : PropTypes.string
  // id:PropTypes.number,
  // id_pemilik:PropTypes.number,
  // pemilik:PropTypes.string,
  // username:PropTypes.string,
  // tanaman:PropTypes.string,
  // deskripsi:PropTypes.string,
  // status_lahan:PropTypes.string
}

export default KontenSidebar;