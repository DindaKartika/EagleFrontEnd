import React, { Component } from "react";
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ReactMapboxGl, {Layer, Feature, Popup} from "react-mapbox-gl";

import "./../css/bootstrap.min.css";
import "./../css/main.css";

const KontenKebun = props => {
    console.log(props.center)
	return (
		<div className="row farm-item">
      <div className="col-md-6">
        <div className="name-text">{props.deskripsi}</div>
        <div className="address-text">
          {props.alamat} {props.kota}
        </div>
        <div className="info-text">
        <div>Tanaman: {props.tanaman}</div>
        <div>Luas tanah: {props.luas_tanah} m<sup>2</sup></div>
        <div>Estimasi panen: {props.estimasi_panen}</div>
        </div>
        <div>
        <Link to={"/maps/" + props.id}>
          <button className="btn btn-success">
            Lihat di peta
          </button>
        </Link>
        <button className="btn btn-success">
          Hapus Lahan
        </button>
        </div>
      </div>
    </div>
	);
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

export default KontenKebun;