import React, { Component }  from 'react';
// import { Link } from "react-router-dom";
import { connect } from "unistore/react";
import { actions, store } from '../store';
import { withRouter } from "react-router-dom";
// import '../css/bootstrap.min.css';
// import '../css/style.css';
// import axios from "axios";

class ListComment extends Component {
    constructor (props) {
        super(props);
        this.state = {
            test: ""
        };
    };

    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-md-6">
                        <span className="displayname-text" style={{fontSize: "16px"}}>{this.props.data.user.display_name}</span>
                        <span className="username-text">@{this.props.data.user.username}</span>
                    </div>
                    <div className="col-md-6 date-container-text">
                        <span className="date-text">{this.props.data.created_at.slice(4, 16)} | </span>
                        <span className="date-text">{this.props.data.created_at.slice(17, 22)}</span>
                    </div>
                </div>
                <div className="row">
                    <p className="content-text col-12">{this.props.data.content} </p>
                </div>
                <div className="row justify-content-between">
                    <span className="attribute-text">{this.props.data.tag}</span>
                    <span className="attribute-text">Likes</span>
                </div>
            </div>
        )   
    }
};


// export default ListOffer;
export default connect(
    "", actions)
    (withRouter(ListComment));