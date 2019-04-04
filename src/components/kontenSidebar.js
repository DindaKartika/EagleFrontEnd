import React, { Component } from "react";
import PropTypes, { object } from 'prop-types';
import { Link } from 'react-router-dom';
import ReactMapboxGl, {Layer, Feature, Popup} from "react-mapbox-gl";

import "./../css/bootstrap.min.css";
import "./../css/main.css";

const KontenSidebar = props => {
    return (
        <div>
            <Link to={"/maps/" + props.id}>
            <div className="sidebar-item">
            <h4>{props.pemilik}</h4>
            <label>@{props.username}</label>
            <br/>
            <span>Tipe tanaman pada lahan:</span>
            <h5>{props.tanaman}</h5>
            <label>{props.deskripsi}</label>
            </div>
            </Link>
        </div>
    );

}

KontenSidebar.propTypes = {
    id:PropTypes.number,
    pemilik:PropTypes.string,
    username:PropTypes.string,
    tanaman:PropTypes.string,
    deskripsi:PropTypes.string
}

export default KontenSidebar;