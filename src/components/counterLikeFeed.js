import React, { Component } from 'react';
import '../css/main.css';
import '../css/bootstrap.min.css';
import{ Link } from "react-router-dom";
import { connect } from "unistore/react";
import { actions } from '../store';
import { withRouter } from "react-router-dom";

class CommentComponent extends Component {
    // postSignout = () => {
    //     this.props.is_login=false;
    //     this.props.history.push("/");
    // };
  render() {
    return (

        <div className="container-fluid">
            <div className="row">
                <div className="col-md-6">
                    <div className="row">
                        <div className="col-md-2 col-12"><img src={require('../images/img/profil.jpeg')} className="img-photo-news margin-bottom-5" alt=""/></div>
                        <div className="col-md-4 col-12 margin-auto"><span className="displayname-text ">{this.props.displayname}</span></div>
                        <div className="col-md-4 col-12 margin-auto"><span className="username-text">@{this.props.username}</span></div>
                        <div className="col-md-2 col-12"></div>
                    </div>
                </div>
                <div className="col-md-6 date-container-text">
                    <span className="date-text">{this.props.date} | </span>
                    <span className="date-text">{this.props.time}</span>
                </div>
            </div>
            <div className="row">
                <p className="content-text">{this.props.content}</p>
            </div>
            <div className="row justify-content-end">
                <span className="attribute-text margin-right-20">{this.props.tag}</span>
                <span className="attribute-text">Likes</span>
            </div>
        </div>
    );
  }
}

// export default CommentComponent;
export default connect( "", actions)
(withRouter(CommentComponent))