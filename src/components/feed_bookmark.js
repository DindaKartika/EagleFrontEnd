import React, { Component } from 'react';
import{ Link } from "react-router-dom";
import { connect } from "unistore/react";
import { actions, store } from '../store';
import { withRouter } from "react-router-dom";
import CommentComponent from './comment_component';
import CommentBookmark from './comment_bookmark';
import axios from "axios";
import {Redirect} from "react-router-dom";

class FeedBookmark extends Component {
    constructor (props) {
        super(props);
            this.state = {  
                dataComment: this.props.allComment,
                // countLike: this.props.dataLike,
                is_like:"false",
                id_like:"",
                comment_state: false
                // feedBookmark:[]
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
            url:'https://api.lahanku.id/comments',
            headers: {
                'Authorization':'Bearer ' + token,
                "Content-Type":"application/json"
            },
            data : data
        };
        axios(postComment)
        .then(function(response){
            const token = localStorage.getItem("token");
            const allFeed = {
                method: "get",
                // url: "http://localhost:8010/proxy/user/product",
                url: "https://api.lahanku.id/bookmarks?sort=desc&rp=1000",
                // url: "https://api.lahanku.id/feeds?rp=10000",
                headers: {
                    'Authorization':'Bearer ' + token
                }
            };
             axios(allFeed)
            .then(function(response){
                // self.setState({AllFeed: response.data});
                store.setState({listBookmark: response.data});
                // store.setState({datacart: response.data});
                console.log(response.data);
            })
            .catch(function(error){
                console.log(error);
            })
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
            url:'https://api.lahanku.id/feedlikes/' + self.props.data.id_feed,
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
            const allFeed = {
                method: "get",
                // url: "http://localhost:8010/proxy/user/product",
                url: "https://api.lahanku.id/bookmarks?sort=desc&rp=1000",
                // url: "https://api.lahanku.id/feeds?rp=10000",
                headers: {
                    'Authorization':'Bearer ' + token
                }
            };
             axios(allFeed)
            .then(function(response){
                // self.setState({AllFeed: response.data});
                store.setState({listBookmark: response.data});
                // store.setState({datacart: response.data});
                console.log(response.data);
            })
            .catch(function(error){
                console.log(error);
            })
            self.props.history.push("/bookmarks");
        }).catch(function(error) {
            console.log("Gagal get like", error);
            });
            self.props.history.push("/bookmarks");
        ;
    };

    handleDeleteBookmark(e){
        // e.preventDefault();
        const self = this;
        // const id_feed = e.target.name;

        const token = localStorage.getItem("token");
        console.log("test token post",token)
        console.log("test id user booookmarrrrk", e)
        let addBookmark = {
            method:'delete',
            // url:'https://api.lahanku.id/feedlikes/' + self.props.data.id_feed,
            url:'https://api.lahanku.id/bookmarks/' + e,
            headers: {
                'Authorization':'Bearer ' + token
                // "Content-Type":"application/json"
            }
        };
        console.log("cek url bookmark", addBookmark);
        //get all like
        axios(addBookmark)
        .then(function(response){
            const token = localStorage.getItem("token");
            const allFeed = {
                method: "get",
                // url: "http://localhost:8010/proxy/user/product",
                url: "https://api.lahanku.id/bookmarks?sort=desc&rp=1000",
                // url: "https://api.lahanku.id/feeds?rp=10000",
                headers: {
                    'Authorization':'Bearer ' + token
                }
            };
             axios(allFeed)
            .then(function(response){
                // self.setState({AllFeed: response.data});
                store.setState({listBookmark: response.data});
                // store.setState({datacart: response.data});
                console.log(response.data);
            })
            .catch(function(error){
                console.log(error);
            })
        }).catch(function(error) {
            console.log("Gagal get like", error);
            });
            self.props.history.push("/bookmarks");
        ;
    };

    changeCommentState() {
        this.setState({
            comment_state: !this.state.comment_state
        })
        console.log("Test state comment", this.state.comment_state)
    }

    handleProfile(e){
        console.log(e)
        this.props.handleDetailProfile(e);
        this.props.history.push("/otherprofile/"+e);
    };

  render() {
    return (
        <div className="container-fluid">
        <hr/>
        <div className="card gedf-card">
                    <div className="card-header header-feed-color">
                        <div className="d-flex justify-content-between align-items-center">
                            <div className="d-flex justify-content-between align-items-center">
                                <div className="mr-2">
                                    <img className="rounded-circle" width="45" onClick={()=>this.handleProfile(this.props.data.id_user)} src={this.props.data.feed_content.user.profile_picture} />
                                </div>
                                <div className="ml-2">
                                    <div className="h5 m-0 color-username" onClick={()=>this.handleProfile(this.props.data.feed_content.id_user)}>@{this.props.data.feed_content.user.username}</div>
                                    <div className="h7 text-muted" onClick={()=>this.handleProfile(this.props.data.feed_content.id_user)}>{this.props.data.feed_content.user.display_name}</div>
                                </div>
                            </div>
                            <div>
                                <a onClick={()=>this.handleDeleteBookmark(this.props.data.id_bookmark)}>Berhenti mengikuti</a>
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
                        <div className="text-muted h7 mb-2"> <i className="fa fa-clock-o"></i>{this.props.data.feed_content.created_at.slice(4, 16)} | {this.props.data.feed_content.created_at.slice(17, 22)}</div>

                        <p className="card-text">
                        {/* {this.props.data.content} */}
                        {this.props.data.feed_content.content}
                        </p>
                    </div>
                    <div className="card-body header-feed-color">
                        {/* <span className="format-likes">{this.state.jumlah}</span> */}
                        <span className="format-likes">{this.props.data.feed_content.total_likes}</span>
                        <a  className="card-link margin-right-20" onClick={(e)=>this.handleClickLike(e)} name={this.props.data.id_feed}><i className="fa fa-gittip" onClick={(e)=>this.handleClickLike(e)} name={this.props.data.id_feed}></i> Suka</a>
                        <span className="format-likes">{this.props.data.feed_content.total_comment}</span>
                        <a  className="card-link" onClick={()=>this.changeCommentState()}><i className="fa fa-comment" onClick={()=>this.changeCommentState()}></i> Tampilkan komentar</a>
                        {/* <a type="btn" onClick={(e)=>this.handleClickLike(e)} name={this.props.data.id_feed} ><img src={require('../images/ico/likeafter.png')} className="imglike margin-bottom-5" alt=""/></a> */}
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
                                        {this.props.data.feed_content.comment.map((item, key) => {
                                        return <CommentBookmark key={key} displayname ={item.comment_by.display_name} username = {item.comment_by.username} content={item.content} 
                                                profile_picture={item.comment_by.profile_picture} date={item.created_at.slice(4, 16)} time={item.created_at.slice(17, 22)} id={item.id} iduser={item.id_user}/>; }
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

// export default FeedBookmark;
export default connect( "listAllFeed,token, allComment, current_id, listBookmark", actions)
(withRouter(FeedBookmark))