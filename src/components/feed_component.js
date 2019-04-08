import React, { Component } from 'react';
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
                // countLike: this.props.dataLike,
                is_like:"false",
                id_like:"",
                // jumlah:0
                comment_state: false
            };
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
            const allFeed = {
                method: "get",
                url: "http://localhost:5000/feeds?sort=desc&rp=10000",
            };
             axios(allFeed)
            .then(function(response){
                // self.setState({AllFeed: response.data});
                store.setState({listAllFeed: response.data});
                console.log("cek after post feeds", response.data);
            })
            .catch(function(error){
                console.log(error);
            })
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
            const allFeed = {
                method: "get",
                url: "http://localhost:5000/feeds?sort=desc&rp=10000",
            };
             axios(allFeed)
            .then(function(response){
                store.setState({listAllFeed: response.data});
            })
            .catch(function(error){
                console.log(error);
            })
            self.props.history.push("/newsfeed");
        }).catch(function(error) {
            console.log("Gagal get like", error);
            });
            self.props.history.push("/newsfeed");
        ;
    };

    handleAddBookmark(e){
        // e.preventDefault();
        const self = this;
        // const id_feed = e.target.name;

        const token = localStorage.getItem("token");
        console.log("test token post",token)
        console.log("test id user booookmarrrrk", e)
        let addBookmark = {
            method:'post',
            // url:'http://localhost:5000/feedlikes/' + self.props.data.id_feed,
            url:'http://localhost:5000/bookmarks/' + e,
            headers: {
                'Authorization':'Bearer ' + token
                // "Content-Type":"application/json"
            }
        };
        console.log("cek url bookmark", addBookmark);
        //get all like
        axios(addBookmark)
        .then(function(response){
            alert("tambah bookmark sukses")
            // const allFeed = {
            //     method: "get",
            //     url: "http://localhost:5000/feeds?sort=desc&rp=10000",
            // };
            //  axios(allFeed)
            // .then(function(response){
            //     store.setState({listAllFeed: response.data});
            // })
            // .catch(function(error){
            //     console.log(error);
            // })
            // self.props.history.push("/newsfeed");
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

    handleProfile(e){
        console.log(e)
        this.props.handleDetailProfile(e);
        this.props.history.push("/otherprofile");
    };

    changeCommentState() {
        this.setState({
            comment_state: !this.state.comment_state
        })
        console.log("Test state comment", this.state.comment_state)
    }

  render() {
    return (
        <div className="container-fluid">
        <hr/>
        <div className="card gedf-card">
                    <div className="card-header header-feed-color">
                        <div className="d-flex justify-content-between align-items-center">
                            <div className="d-flex justify-content-between align-items-center">
                                <div className="mr-2">
                                    <img className="rounded-circle" width="45" onClick={()=>this.handleProfile(this.props.data.id_user)} src={this.props.data.user.profile_picture} />
                                </div>
                                <div className="ml-2">
                                    <div className="h5 m-0 color-username" onClick={()=>this.handleProfile(this.props.data.id_user)}>@{this.props.data.user.username}</div>
                                    <div className="h7 text-muted" onClick={()=>this.handleProfile(this.props.data.id_user)}>{this.props.data.user.display_name}</div>
                                </div>
                            </div>
                            <div>
                                <a onClick={()=>this.handleAddBookmark(this.props.data.id_feed)}>ikuti feeds</a>
                                {/* <div className="dropdown">
                                    <button className="btn btn-link dropdown-toggle" type="button" id="gedf-drop1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <i className="fa fa-ellipsis-h"></i>
                                    </button>
                                    <div className="dropdown-menu dropdown-menu-right" aria-labelledby="gedf-drop1">
                                        <div className="h6 dropdown-header">Configuration</div>
                                        <a className="dropdown-item" href="#">Save</a>
                                        <a className="dropdown-item" href="#">Hide</a>
                                        <a className="dropdown-item" href="#">Report</a>
                                    </div>
                                </div> */}
                            </div>
                        </div>

                    </div>
                    <div className="card-body">
                        <div className="text-muted h7 mb-2"> <i className="fa fa-clock-o"></i>{this.props.data.created_at.slice(4, 16)} | {this.props.data.created_at.slice(17, 22)}</div>

                        <p className="card-text">
                        {this.props.data.content}
                        {/* {this.props.data.feed.content} */}
                        </p>
                    </div>
                    <div className="card-body header-feed-color">
                        {/* <span className="format-likes">{this.state.jumlah}</span> */}
                        <span className="format-likes">{this.props.data.total_like_feed}</span>
                        <a  className="card-link" onClick={(e)=>this.handleClickLike(e)} name={this.props.data.id_feed}><i className="fa fa-gittip" onClick={(e)=>this.handleClickLike(e)} name={this.props.data.id_feed}></i> Suka</a>
                        <a  className="card-link" onClick={()=>this.changeCommentState()}><i className="fa fa-comment" onClick={()=>this.changeCommentState()}></i> Tampilkan komentar</a>
                        {/* <a  className="card-link"><i className="fa fa-mail-forward"></i> Share</a> */}

                        {/* <a type="btn" onClick={(e)=>this.handleClickLike(e)} name={this.props.data.id_feed} ><img src={require('../images/ico/likeafter.png')} className="imglike " alt=""/></a> */}
                        {/* <button className="btn btn-success" onClick={()=>this.changeCommentState()}>Tunjukkan Komentar</button> */}
                        {/* <a href="#" className="card-link"><i className="fa fa-gittip"></i> Like</a> */}
                        {/* <a href="#" className="card-link"><i className="fa fa-comment"></i> Comment</a> */}
                        {/* <a href="#" class="card-link"><i class="fa fa-mail-forward"></i> Share</a> */}
                    </div>
                    {/* comment section start here */}
                <div className="card-footer " style={{display: this.state.comment_state ? "block" : "none"}}>
                    <div class="row bootstrap snippets justify-content-end">
                        <div className="col-md-10 col-md-offset-2 col-sm-12">
                            <div className="comment-wrapper">
                                <div className="panel panel-info">
                                    <div className="panel-heading text-right">
                                        Comment panel
                                    </div>
                                    <div className="panel-body">
                                        <hr/>
                                        <ul className="media-list" >
                                        {this.props.data.comment.map((item, key) => {
                                        return <CommentComponent key={key} displayname ={item.comment_by.display_name} username = {item.comment_by.username} tag = {item.tag} content={item.content} 
                                                profile_picture={item.comment_by.profile_picture} date={item.created_at.slice(4, 16)} time={item.created_at.slice(17, 22)} id={item.id} iduser={item.id_user}
                                                total_like_comment={item.total_like_comment}/>; }
                                            )}
                                        <form onSubmit={e => this.handleSubmitComment(e)}>
                                            <textarea className="form-control" name="content" placeholder="write a comment..." rows="3"></textarea>
                                            <br/>
                                            <button class="btn btn-outline-secondary position-right" type="submit">Comment</button>
                                            {/* <button type="button" className="btn btn-info pull-right">Post</button> */}
                                            <div className="clearfix"></div>
                                        </form>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                        {/* comment section end here */}
                </div>
        </div>
    );
  }
}

// export default FeedComponent;
export default connect( "listAllFeed,token, allComment, current_id", actions)
(withRouter(FeedComponent))