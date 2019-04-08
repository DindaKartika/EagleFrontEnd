import React, { Component } from "react";
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';


const ListFarm = props => {
	return (
		<div className="btn btn-success sidebar-item">
			<Link to={"/maps/" + props.id}>
				<label>Kebun {props.id}</label>
				</Link>
				<h4>{props.user.username}</h4>
				<h4>{props.plant}</h4>
				<h4>{props.ready}</h4>
		</div>
		// <div className="sidebar-item">
		// 	<Link to={"/maps/" + props.id}>
		// 		<label>Kebun {props.id}</label>
		// 		</Link>
		// 		<h4>{props.user.username}</h4>
		// 		<h4>{props.plant}</h4>
		// 		<h4>{props.ready}</h4>
		// </div>
		// <div class="card border-dark mb-3">
		// 	<div class="card-header">
		// 		<Link to={"/maps/" + props.id}>
		// 		<label>Kebun {props.id}</label>
		// 		</Link>
		// 	</div>
		// 	<div class="card-body text-dark">
		// 		<h5 class="card-title">Dark card title</h5>
		// 		<h4>{props.plant}</h4>
		// 		<h4>{props.ready}</h4>
		// 		<p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
		// 	</div>
		// </div>
	);
}



ListFarm.propTypes = {
    id : PropTypes.number,
    user :PropTypes.string,
    plant:PropTypes.string,
    ready:PropTypes.string
}

export default ListFarm;