import React, { Component } from "react";
import PropTypes, { object } from 'prop-types';
import { Link } from 'react-router-dom';
import ReactMapboxGl, {Layer, Feature, Popup} from "react-mapbox-gl";

import "./../css/bootstrap.min.css";
import "./../css/main.css";

const username  =localStorage.getItem('username')

const KontenSidebar = props => {
  console.log('cek username', username)
  return (
    // <div>
    //   <Link to={"/maps/" + props.id}>
    //     <div className="sidebar-item">
    //     <h4>{props.pemilik}</h4>
    //     <label>@{props.username}</label>
    //     <br/>
    //     <span>Tipe tanaman pada lahan:</span>
    //     {(props.tanaman == "") ? <h5>-</h5> : <h5>{props.tanaman}</h5>}
    //     <label>{props.deskripsi}</label>
    //     </div>
    //   </Link>
    //   <div style={{display : (username == props.username) ? 'block' : 'none'}}>
    //     <Link to="/profile">
    //       <button>Kunjungi Profil</button>
    //     </Link>
    //   </div>
    //   <div style={{display : (username == props.username) ? 'none' : 'block'}}>
        // <Link to={"/otherprofile/" + props.id_pemilik}>
        //   <button>Kunjungi Profil</button>
        // </Link>
    //   </div>
    // </div>

  <div class="card border-dark mb-3">
    <div class="card-header">
      <Link to={"/maps/" + props.id}>
      <label>Nomor Identitas Lahan {props.id}</label>
      </Link>
    </div>
    <div class="card-body text-dark row">
      {/* <h5 class="card-title">Dark card title</h5> */}
      <div className="col-md-8">
        <h6>Pemilik Lahan:</h6>
        <h4>{props.pemilik}</h4>
        
          <label>@{props.username}</label>
          <br/>
          <span>Tipe tanaman pada lahan:</span>
          {(props.tanaman == "") ? <h5>-</h5> : <h5>{props.tanaman}</h5>}
          <label>{props.deskripsi}</label>
        </div>
        <div className="col-md-4">
          <Link to={"/otherprofile/" + props.id_pemilik}>
            <button className="btn btn-outline-success sidebar-map">Info Pemilik Lahan</button>
          </Link>
          <Link to={"/maps/" + props.id}>
            <button className="btn btn-outline-success sidebar-map">Info Lahan</button>
          </Link>
        </div>
        <div>
          <hr />
          <label>Status tanah dijual: <br/>{props.status_lahan}</label>
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
  id:PropTypes.number,
  id_pemilik:PropTypes.number,
  pemilik:PropTypes.string,
  username:PropTypes.string,
  tanaman:PropTypes.string,
  deskripsi:PropTypes.string,
  status_lahan:PropTypes.string
}

export default KontenSidebar;