import React, { Component } from 'react';
import '../css/main.css';
import '../css/bootstrap.min.css';
import{ Link } from "react-router-dom";
import { connect } from "unistore/react";
import { actions } from '../store';
import { withRouter } from "react-router-dom";
import axios from "axios";

class CommentComponent extends Component {
    constructor (props) {
        super(props);
            this.state = {  
                updateComment: this.props.allComment
            };
        };

    // componentDidUpdate = async () => {
    //     const self = this
    //     const token = this.props.token;
    //     const url = "http://localhost:5000/comments?id_feed=" + self.props.id_feed
    //     axios({
    //         method: 'get',
    //         url: url
    //         // headers: {
    //         //   Authorization: 'Bearer ' + token
    //         // }
    //     }).then(function(response) {
    //         console.log("cek feed id", self.props.id_feed)
    //         console.log("Get comment berhasil", response.data)
    //         self.setState({
    //             updateComment: response.data
    //         })
    //     }).catch(function(error) {
    //     console.log("Gagal get comment", error);
    //     });
        
        // axios get like //
        // axios({
        //     method: 'get',
        //     url: 'http://localhost:5000/feedlikes/' + self.props.data.id_feed,
        //     // headers: {s.
        //     //   Authorization: 'Bearer ' + token
        //     // }
        // }).then(function(response) {
        //     self.setState({
        //         listLike: response.data.total
        //     })
        // }).catch(function(error) {
        // console.log("Gagal get like", error);
        // });
    // };

    handleDeleteComment(e){
        e.preventDefault();
        const self = this;
        const id_feed = e.target.name;

        const token = localStorage.getItem("token");
        console.log("test token post",token)
        let deleteComment = {
            method:'delete',
            url:'http://localhost:5000/comments/' + self.props.id,
            headers: {
                'Authorization':'Bearer ' + token,
                "Content-Type":"application/json"
            }
        };
        console.log("cek delete comment", deleteComment);
        //get all like
        axios(deleteComment)
        .then(function(response){
            
            const url = "http://localhost:5000/comments?id_feed=" + self.props.id_feed
            return axios({
                method: 'get',
                url: url
                // headers: {
                //   Authorization: 'Bearer ' + token
                // }
            }).then(function(response) {
                console.log("cek feed id", self.props.id_feed)
                console.log("Get comment berhasil", response.data)
                store.setState({
                    allComment: response.data
                })
            }).catch(function(error) {
            console.log("Gagal get comment", error);
            });
            self.props.history.push("/newsfeed");
        });

    };
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
                <a className="attribute-text margin-right-20" onClick={(e)=>this.handleDeleteComment(e)} style={{ display: this.props.current_id !== this.props.id_user ? "none" : "block" }} name={this.props.id}>Delete</a>
                <span className="attribute-text">Likes</span>
            </div>
        </div>
    );
  }
}
// style={{ display: this.props.current_id == this.props.id ? "none" : "block" }} 
// export default CommentComponent;
export default connect( "token, allComment, dataLike, current_id", actions)
(withRouter(CommentComponent))