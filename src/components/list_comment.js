import React, { Component }  from 'react';
// import { Link } from "react-router-dom";
import { connect } from "unistore/react";
import { actions, store } from '../store';
import { withRouter } from "react-router-dom";
import axios from "axios";
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

    handleDeleteComment(e){
        e.preventDefault();
        const self = this;
        const id_feed = e.target.name;

        const token = localStorage.getItem("token");
        console.log("test token post",token)
        let deleteComment = {
            method:'delete',
            url:'http://3.1.9.239/comments/' + self.props.id,
            headers: {
                'Authorization':'Bearer ' + token,
                "Content-Type":"application/json"
            }
        };
        console.log("cek delete comment", deleteComment);
        //get all like
        axios(deleteComment)
        .then(function(response){
            const token = localStorage.getItem("token");
            // const url = "http://localhost:5000/feeds?sort=desc&rp=10000&id_user=" + self.props.data.id_user;
            const url = "http://localhost:5000/feeds?sort=desc&rp=10000&id_user=" + self.props.iduser;
            axios({
                method: 'get',
                url: url,
                headers: {
                  Authorization: 'Bearer ' + token
                }
            }).then(function(response) {
                store.setState({
                    listFeed: response.data
                })
            }).catch(function(error) {
            console.log("Gagal get comment", error);
            });
            self.props.history.push("/profile");
        }).catch(function(error) {
            console.log("Gagal get comment", error);})
            // window.location.reload();

    };

    handleClickLike(e){
        e.preventDefault();
        const self = this;
        const id_feed = e.target.name;

        const token = localStorage.getItem("token");
        console.log("test token post",token)
        let postLike = {
            method:'post',
            url:'http://localhost:5000/commentlikes/' + self.props.id,
            headers: {
                'Authorization':'Bearer ' + token
                // "Content-Type":"application/json"
            }
        };
        console.log("cek url post", postLike);
        //get all like
        axios(postLike)
        .then(function(response){
            const token = localStorage.getItem("token");
            const url = "http://localhost:5000/feeds?sort=desc&rp=10000&id_user=" + self.props.iduser;
            axios({
                method: 'get',
                url: url,
                headers: {
                  Authorization: 'Bearer ' + token
                }
            }).then(function(response) {
                store.setState({
                    listFeed: response.data
                })
            }).catch(function(error) {
            console.log("Gagal get comment", error);
            });
            self.props.history.push("/profile");
        }).catch(function(error) {
            console.log("Gagal get like", error);
            });
            self.props.history.push("/profile");
        ;

    };

    handleProfile(e){
        this.props.handleDetailProfile(e);
        this.props.history.push("/otherprofile/"+e);
    };

    render() {
        return (

        <div className="container-fluid">
            <li className="media">
                <a href="#" className="pull-left" onClick={()=>this.handleProfile(this.props.iduser)}>
                    <img src={this.props.profile_picture} className="img-photo-news margin-bottom-5" alt=""/>
                </a>
                <div className="media-body">
                    <span className="text-muted pull-right">
                        <small className="text-muted">{this.props.date} | {this.props.time}</small>
                    </span>
                    <strong className="text-common" onClick={()=>this.handleProfile(this.props.iduser)} >@{this.props.username}</strong>
                    <p>
                    {this.props.content}
                    </p>
                    <div className="row justify-content-end">
                        <span className="attribute-text margin-right-20">{this.props.tag}</span>
                        <span className="format-likes">{this.props.total_like_comment}</span>
                        <a  className="card-link margin-right-20" onClick={(e)=>this.handleClickLike(e)} name={this.props.id}><i className="fa fa-gittip"></i> Suka</a>
                        <a className="attribute-text " onClick={(e)=>this.handleDeleteComment(e)} style={{ display: this.props.current_id !== this.props.iduser ? "none" : "block" }} name={this.props.id}>Delete</a>
                    </div>
                </div>
            </li>
        </div>
        )   
    }
};


// export default ListOffer;
export default connect(
    "current_id, listFeed", actions)
    (withRouter(ListComment));