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
    <div>
      <Link to={"/maps/" + props.id}>
        <div className="sidebar-item">
        <h4>{props.pemilik}</h4>
        <label>@{props.username}</label>
        <br/>
        <span>Tipe tanaman pada lahan:</span>
        {(props.tanaman == "") ? <h5>-</h5> : <h5>{props.tanaman}</h5>}
        <label>{props.deskripsi}</label>
        </div>
      </Link>
      <div style={{display : (username == props.username) ? 'block' : 'none'}}>
        <Link to="/profile">
          <button>Kunjungi Profil</button>
        </Link>
      </div>
      <div style={{display : (username == props.username) ? 'none' : 'block'}}>
        <Link to={"/otherprofile/" + props.id_pemilik}>
          <button>Kunjungi Profil</button>
        </Link>
      </div>
    </div>
  );

}

KontenSidebar.propTypes = {
  id:PropTypes.number,
  id_pemilik:PropTypes.number,
  pemilik:PropTypes.string,
  username:PropTypes.string,
  tanaman:PropTypes.string,
  deskripsi:PropTypes.string
}

export default KontenSidebar;