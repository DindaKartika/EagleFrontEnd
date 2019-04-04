import React, { Component } from 'react';
import{ Link } from "react-router-dom";
import { connect } from "unistore/react";
import { actions } from '../store';
import { withRouter } from "react-router-dom";
import CommentComponent from './comment_component';
import axios from "axios";
import {Redirect} from "react-router-dom";

class FeedComponent extends Component {
    constructor (props) {
        super(props);
            this.state = {  
                allComment: [],
                dataLike:[]
            };
        };
    componentDidMount = async () => {
        const self = this
        const token = this.props.token;
        const url = "http://localhost:5000/comments?id_feed=" + self.props.data.id_feed
        axios({
            method: 'get',
            url: url
            // headers: {
            //   Authorization: 'Bearer ' + token
            // }
        }).then(function(response) {
            console.log("cek feed id", self.props.data.id_feed)
            console.log("Get comment berhasil", response.data)
            self.setState({
                allComment: response.data
            })
        }).catch(function(error) {
        console.log("Gagal get comment", error);
        });
        
        // axios get like //
        axios({
            method: 'get',
            url: 'http://localhost:5000/feedlikes/' + self.props.data.id_feed,
            // headers: {
            //   Authorization: 'Bearer ' + token
            // }
        }).then(function(response) {
            self.setState({
                dataLike: response.data.total
            })
        }).catch(function(error) {
        console.log("Gagal get like", error);
        });
    };

    handleSubmitComment(e){
        e.preventDefault();
        const self = this;
        const {content} = e.target;
        var data ={};
        
        data.content = content.value;
        data.id_feed = self.props.data.id_feed;

        const token = this.props.token;
        console.log("test token post",token)
        console.log("post comment", data);
        let postComment = {
            method:'post',
            url:'http://localhost:5000/comments',
            headers: {
                'Authorization':'Bearer ' + token,
                "Content-Type":"application/json"
            },
            data : data
        };
        axios(postComment)
        .then(function(response){
            console.log(response.data);
            const url = "http://localhost:5000/comments?id_feed=" + self.props.data.id_feed
            axios({
                method: 'get',
                url: url
                // headers: {
                //   Authorization: 'Bearer ' + token
                // }
            }).then(function(response) {
                console.log("cek feed id", self.props.data.id_feed)
                console.log("Get comment berhasil", response.data)
                self.setState({
                    allComment: response.data
                })
            }).catch(function(error) {
            console.log("Gagal get comment", error);
            });
            // return
            // <Redirect to ={{ pathname: "/newsfeed"}} />;
            self.props.history.push("/newsfeed");
        });

    };

    handleClickLike(e){
        e.preventDefault();
        const self = this;
        const id_feed = e.target.name;

        const token = this.props.token;
        console.log("test token post",token)
        let postLike = {
            method:'post',
            url:'http://localhost:5000/feedlikes/' + self.props.data.id_feed,
            headers: {
                'Authorization':'Bearer ' + token
                // "Content-Type":"application/json"
            }
        };
        console.log("cek url post", postLike);
        //get all like
        axios(postLike)
        .then(function(response){
            console.log(response.data);
            axios({
                method: 'get',
                url: 'http://localhost:5000/feedlikes/' + self.props.data.id_feed,
                // headers: {
                //   Authorization: 'Bearer ' + token
                // }
            }).then(function(response) {
                self.setState({
                    dataLike: response.data.total
                })
            }).catch(function(error) {
            console.log("Gagal get like", error);
            });
            self.props.history.push("/newsfeed");
        });

    };

  render() {
    return (
        <div className="container-fluid">
        <hr/>
            <div className="row">
                <div className="col-md-6">
                    <div className="row">
                        <div className="col-md-2 col-12"><img src={require('../images/img/profil.jpeg')} className="img-photo-news margin-bottom-5" alt=""/></div>
                        <div className="col-md-4 col-12 margin-auto"><span className="displayname-text ">{this.props.data.user.display_name}</span></div>
                        <div className="col-md-4 col-12 margin-auto"><span className="username-text"><span>@</span>{this.props.data.user.username}</span></div>
                        <div className="col-md-2 col-12"></div>
                    </div>
                </div>
                <div className="col-md-6 date-container-text">
                    <span className="date-text">{this.props.data.created_at.slice(17, 22)} | </span>
                    <span className="date-text">{this.props.data.created_at.slice(4, 16)}</span>
                </div>
            </div>
            <div className="row">
                <p className="content-text">{this.props.data.content} </p>
            </div>
            <div className="row justify-content-between">
                <span className="attribute-text">{this.props.data.tag}</span>
                <span>{this.state.dataLike}</span>
                <a type="btn" onClick={(e)=>this.handleClickLike(e)} name={this.props.data.id_feed} ><img src={require('../images/ico/like.png')} className="img-photo-news margin-bottom-5" alt=""/></a>
                {/* <span className="attribute-text">Comments</span>
                <span className="attribute-text">Likes</span> */}
            </div>
            <div className="row comment-area">
                <div className="col-md-2"></div>
                <div className="col-md-10 justify-content-end">
                {this.state.allComment.map((item, key) => {
                return <CommentComponent key={key} displayname ={item.user.display_name} username = {item.user.username} tag = {item.tag} content={item.content} date={item.created_at.slice(4, 16)} time={item.created_at.slice(17, 22)}/>; }
                        )}
                    {/* <CommentComponent/> */}
                </div>
            </div>
            <div class="input-group mb-3">
                <form onSubmit={e => this.handleSubmitComment(e)}>
                    <input type="text" class="form-control" placeholder="Tulis komentar ..." aria-label="Recipient's username" name="content" aria-describedby="basic-addon2"/>
                    <div class="input-group-append">
                        <button class="btn btn-outline-secondary" type="submit">Comment</button>
                    </div>
                </form>
            </div>
        </div>
    );
  }
}

// export default FeedComponent;
export default connect( "token", actions)
(withRouter(FeedComponent))