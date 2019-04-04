import React, { Component } from 'react';
import '../css/main.css';
import '../css/bootstrap.min.css';
import{ Link } from "react-router-dom";
import { connect } from "unistore/react";
import { actions , store} from '../store';
import { withRouter } from "react-router-dom";
import axios from "axios";

class CommentComponent extends Component {
    constructor (props) {
        super(props);
            this.state = {  
                updateComment: this.props.allComment,
                countLike: this.props.dataLike,
                is_like:"false",
                id_like:""
            };
        };


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
            <li className="media">
                <a href="#" className="pull-left">
                    <img src={this.props.profile_picture} className="img-photo-news margin-bottom-5" alt=""/>
                </a>
                <div className="media-body">
                    <span className="text-muted pull-right">
                        <small className="text-muted">{this.props.date} | {this.props.time}</small>
                    </span>
                    <strong className="text-success ">@{this.props.username}</strong>
                    <p>
                    {this.props.content}
                    </p>
                    <div className="row justify-content-end">
                        <span className="attribute-text margin-right-20">{this.props.tag}</span>
                        <span className="format-likes">{this.state.countLike}</span>
                        <a type="btn" onClick={(e)=>this.handleClickLike(e)} name={this.props.data.id_feed} ><img src={require('../images/ico/likeafter.png')} className="imglike margin-bottom-5" alt=""/></a>
                        {/* <span className="attribute-text margin-right-20">Likes</span> */}
                        <a className="attribute-text " onClick={(e)=>this.handleDeleteComment(e)} style={{ display: this.props.current_id !== this.props.id_user ? "none" : "block" }} name={this.props.id}>Delete</a>
                    </div>
                </div>
            </li>
        </div>
    );
  }
}
// style={{ display: this.props.current_id == this.props.id ? "none" : "block" }} 
// export default CommentComponent;
export default connect( "token, allComment, dataLike, current_id", actions)
(withRouter(CommentComponent))