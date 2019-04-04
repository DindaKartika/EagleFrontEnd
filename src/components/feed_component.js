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
        <div className="card gedf-card">
                    <div className="card-header header-feed-color">
                        <div className="d-flex justify-content-between align-items-center">
                            <div className="d-flex justify-content-between align-items-center">
                                <div className="mr-2">
                                    <img className="rounded-circle" width="45" src={this.props.data.user.profile_picture} />
                                </div>
                                <div className="ml-2">
                                    <div className="h5 m-0 color-username">@{this.props.data.user.username}</div>
                                    <div className="h7 text-muted">{this.props.data.user.display_name}</div>
                                </div>
                            </div>
                            <div>
                                <div className="dropdown">
                                    <button className="btn btn-link dropdown-toggle" type="button" id="gedf-drop1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <i className="fa fa-ellipsis-h"></i>
                                    </button>
                                    <div className="dropdown-menu dropdown-menu-right" aria-labelledby="gedf-drop1">
                                        <div className="h6 dropdown-header">Configuration</div>
                                        <a className="dropdown-item" href="#">Save</a>
                                        <a className="dropdown-item" href="#">Hide</a>
                                        <a className="dropdown-item" href="#">Report</a>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="card-body">
                        <div className="text-muted h7 mb-2"> <i className="fa fa-clock-o"></i>{this.props.data.created_at.slice(4, 16)} | {this.props.data.created_at.slice(17, 22)}</div>

                        <p className="card-text">
                        {this.props.data.content}
                        </p>
                    </div>
                    <div className="card-body header-feed-color">
                        <span className="format-likes">{this.state.countLike}</span>
                        <a type="btn" onClick={(e)=>this.handleClickLike(e)} name={this.props.data.id_feed} ><img src={require('../images/ico/likeafter.png')} className="imglike margin-bottom-5" alt=""/></a>
                        {/* <a href="#" className="card-link"><i className="fa fa-gittip"></i> Like</a> */}
                        {/* <a href="#" className="card-link"><i className="fa fa-comment"></i> Comment</a> */}
                        {/* <a href="#" class="card-link"><i class="fa fa-mail-forward"></i> Share</a> */}
                    </div>
                    {/* comment section start here */}
                <div className="card-footer ">
                    <div class="row bootstrap snippets justify-content-end">
                        <div className="col-md-10 col-md-offset-2 col-sm-12">
                            <div className="comment-wrapper">
                                <div className="panel panel-info">
                                    <div className="panel-heading text-right">
                                        Comment panel
                                    </div>
                                    <div className="panel-body">
                                        <hr/>
                                        <ul className="media-list">
                                        {this.state.dataComment.map((item, key) => {
                                        return <CommentComponent key={key} displayname ={item.user.display_name} username = {item.user.username} tag = {item.tag} content={item.content} 
                                                profile_picture={item.user.profile_picture} date={item.created_at.slice(4, 16)} time={item.created_at.slice(17, 22)} id={item.id} id_user={item.id_user}/>; }
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
export default connect( "token, allComment, dataLike, current_id", actions)
(withRouter(FeedComponent))