import React, { Component } from "react";
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import "./../css/bootstrap.min.css";
import "./../css/main.css";

const ListFarm = props => {
	return (
		<div className="sidebar-item">
			<Link to={"/maps/" + props.id}>
				<label>Kebun {props.id}</label>
				<h4>{props.user.username}</h4>
				<h4>{props.plant}</h4>
				<h4>{props.ready}</h4>
			</Link>
		</div>
	);
}

ListFarm.propTypes = {
    id : PropTypes.number,
    user :PropTypes.string,
    plant:PropTypes.string,
    ready:PropTypes.string
}

export default ListFarm;