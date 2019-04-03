import React, { Component } from "react";
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ReactMapboxGl, {Layer, Feature, Popup} from "react-mapbox-gl";

import "./../css/bootstrap.min.css";
import "./../css/main.css";

const ListFarm = props => {
    console.log(props.center)
	return (
		<Popup
            coordinates={props.center}
            offset={{
                'bottom-left': [12, -2],  'bottom': [0, -2], 'bottom-right': [-12, -2]
            }}>
            <h4>{props.pemilik}</h4>
            <label>@{props.username}</label>
            <hr/>
            <span>Tipe tanaman pada lahan:</span>
            <h5>{props.tanaman}</h5>
            <label>{props.deskripsi}</label>
        </Popup>
	);
}

ListFarm.propTypes = {
    center : PropTypes.number,
    deskripsi:PropTypes.string,
    tanaman: PropTypes.string,
    pemilik:PropTypes.string,
    username:PropTypes.string
}

export default ListFarm;