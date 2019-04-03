import React, { Component } from 'react';
import '../css/main.css';
import '../css/bootstrap.min.css';
import{ Link } from "react-router-dom";
import { connect } from "unistore/react";
import { actions, store } from '../store';
import { withRouter } from "react-router-dom";
import CommentComponent from './comment_component';
import axios from "axios";
import {Redirect} from "react-router-dom";

class FeedComponent extends Component {
    constructor (props) {
        super(props);
            this.state = {  
                dataComment: this.props.allComment,
                countLike: this.props.dataLike,
                is_like:"false",
                id_like:""
            };
        };
    componentDidMount = async () => {
        const self = this
        const token = localStorage.getItem("token");
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
                dataComment: response.data
            })
        }).catch(function(error) {
        console.log("Gagal get comment", error);
        });
        
        // axios get like //
        axios({
            method: 'get',
            url: 'http://localhost:5000/feedlikes/' + self.props.data.id_feed,
            // headers: {s.
            //   Authorization: 'Bearer ' + token
            // }
        }).then(function(response) {
            self.setState({
                countLike: response.data.total,
                id_like:response.data.data[0].id_like
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

        const token = localStorage.getItem("token");
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
                    dataComment: response.data
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

        const token = localStorage.getItem("token");
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
            console.log("ceeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeek", response.data)
            // localStorage.setItem('is_like', true)
            self.setState({
                countLike: response.data.total,
                is_like:true
            })
            console.log("cek clik like",response.data);
            // console.log("cek id like", this.state.id_like);
            // console.log("cek id like", id_like);
            axios({
                method: 'get',
                url: 'http://localhost:5000/feedlikes/' + self.props.data.id_feed,
                // headers: {
                //   Authorization: 'Bearer ' + token
                // }
            }).then(function(response) {
                self.setState({
                    countLike: response.data.total,
                    id_like:response.data.data[0].id_like
                })
            }).catch(function(error) {
            console.log("Gagal get like", error);
            });
            self.props.history.push("/newsfeed");
        }).catch(function(error) {
            console.log("Gagal get like", error);
            });
            self.props.history.push("/newsfeed");
        ;

    };

    handleUnlike(e){
        e.preventDefault();
        const self = this;
        const id_liked = e.target.name;
        console.log("id untuk like",id_liked)

        const token = localStorage.getItem("token");
        console.log("test token post",token)
        let unlike = {
            method:'delete',
            url:'http://localhost:5000/feedlikes/' + self.state.id_like,
            headers: {
                'Authorization':'Bearer ' + token
                // "Content-Type":"application/json"
            }
        };
        console.log("cek url post", unlike);
        //get all like
        axios(unlike)
        .then(function(response){
            this.props.statusUnlike();
            alert("unlike sukses")
            console.log(response.data);
            axios({
                method: 'get',
                url: 'http://localhost:5000/feedlikes/' + self.props.data.id_feed,
                // headers: {
                //   Authorization: 'Bearer ' + token
                // }
            }).then(function(response) {
                self.setState({
                    countLike: response.data.total,
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
                <span>{this.state.countLike}</span>
                {/* <a type="btn" onClick={(e)=>this.handleClickLike(e)} style={{ display: this.state.is_like ? "none" : "block" }} name={this.props.data.id_feed} ><img src={require('../images/ico/likebefore.png')} className="imglike margin-bottom-5" alt=""/></a> */}
                <a type="btn" onClick={(e)=>this.handleClickLike(e)} name={this.props.data.id_feed} ><img src={require('../images/ico/likebefore.png')} className="imglike margin-bottom-5" alt=""/></a>
                {/* <a type="btn" onClick={(e)=>this.handleUnlike(e)} style={{ display: this.state.is_like ? "block" : "none" }} name={this.state.id_like} ><img src={require('../images/ico/likeafter.png')} className="imglike margin-bottom-5" alt=""/></a> */}
            </div>
            <div className="row comment-area">
                <div className="col-md-2"></div>
                <div className="col-md-10 justify-content-end">
                {this.state.dataComment.map((item, key) => {
                return <CommentComponent key={key} displayname ={item.user.display_name} username = {item.user.username} tag = {item.tag} content={item.content} date={item.created_at.slice(4, 16)} time={item.created_at.slice(17, 22)} id={item.id} id_user={item.id_user}/>; }
                        )}

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
export default connect( "token, allComment, dataLike, current_id", actions)
(withRouter(FeedComponent))