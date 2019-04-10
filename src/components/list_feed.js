import React, { Component }  from 'react';
// import { Link } from "react-router-dom";
import { connect } from "unistore/react";
import { actions, store } from '../store';
import { withRouter } from "react-router-dom";
// import '../css/bootstrap.min.css';
// import '../css/style.css';
import axios from "axios";
import ListComment from './list_comment'

class ListFeed extends Component {
    constructor (props) {
        super(props);
        this.state = {
            listComment: [],
            comment_state: false
        };
    };

    handleDeleteFeed(e){
        // e.preventDefault();
        const self = this;

        const token = localStorage.getItem("token");
        console.log("test token post",token)
        let deleteFeed = {
            method:'delete',
            url:'http://localhost:5000/feeds/' + e,
            headers: {
                'Authorization':'Bearer ' + token
                // "Content-Type":"application/json"
            }
        };
        console.log("cek delete feed", deleteFeed);
        //get all like
        axios(deleteFeed)
        .then(function(response){
            const token = localStorage.getItem("token")
            // const url = "http://localhost:5000/comments?id_feed=" + self.props.data.id_feed
            const url = "http://localhost:5000/feeds?sort=desc&rp=10000&id_user=" + self.props.data.id_user;
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

    handleSubmitComment(e){
        // console.log(window.location.pathname)
        e.preventDefault();
        const self = this;
        const {content} = e.target;
        var data ={};
        
        data.content = content.value;
        data.id_feed = self.props.data.id_feed;

        const token = localStorage.getItem("token");
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
            // const self = this;
            const token = localStorage.getItem("token");
            // const url = "http://localhost:5000/comments?id_feed=" + self.props.data.id_feed
            const url = "http://localhost:5000/feeds?sort=desc&rp=10000&id_user=" + self.props.data.id_user;
            axios({
                method: 'get',
                url: url,
                headers: {
                  Authorization: 'Bearer ' + token
                }
            }).then(function(response) {
                // console.log("cek feed id", self.props.data.id_feed)
                // console.log("Get comment berhasil", response.data)
                store.setState({
                    listFeed: response.data
                })
            }).catch(function(error) {
            console.log("Gagal get comment", error);
            });

            if(self.props.current_id !== self.props.data.id_user){
                // self.props.history.push(window.location.pathname)
                // console.log("test if success paht", window.location.pathname)
                window.location.reload()
            }
            else{self.props.history.push("/profile")}
            // self.props.history.push("/profile");
            console.log("Not ok", window.location.pathname)
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
            const token = localStorage.getItem("token")
            // const url = "http://localhost:5000/comments?id_feed=" + self.props.data.id_feed
            const url = "http://localhost:5000/feeds?sort=desc&rp=10000&id_user=" + self.props.data.id_user;
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
        }).catch(function(error) {
            console.log("Gagal get like", error);
            });

            if(self.props.current_id !== self.props.data.id_user){
                // self.props.history.push(window.location.pathname)
                // console.log("test if success paht", window.location.pathname)
                window.location.reload()
            }
            else{
                self.props.history.push("/profile")
            }
            console.log("Not ok", window.location.pathname)
        ;
    };

    handleProfile(e){
        console.log(e)
        this.props.handleDetailProfile(e);
        this.props.history.push("/otherprofile/"+e);
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
                                    <a onClick={()=>this.handleDeleteFeed(this.props.data.id_feed)} style={{ display: this.props.current_id !== this.props.data.id_user ? "none" : "block" }}>Hapus feed</a>
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
                            <a  className="card-link margin-right-20" onClick={(e)=>this.handleClickLike(e)} name={this.props.data.id_feed}><i className="fa fa-gittip" onClick={(e)=>this.handleClickLike(e)} name={this.props.data.id_feed}></i> Suka</a>
                            <span className="format-likes">{this.props.data.total_comment}</span>
                            <a  className="card-link" onClick={()=>this.changeCommentState()}><i className="fa fa-comment" onClick={()=>this.changeCommentState()}></i> Tampilkan komentar</a>
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
                                            return <ListComment key={key} displayname ={item.comment_by.display_name} username = {item.comment_by.username} tag = {item.tag} content={item.content} 
                                                    profile_picture={item.comment_by.profile_picture} date={item.created_at.slice(4, 16)} time={item.created_at.slice(17, 22)} id={item.id} iduser={item.id_user}
                                                    total_like_comment={item.total_like_comment}/>; }
                                                )}
                                            <form onSubmit={e => this.handleSubmitComment(e)}>
                                                <textarea className="form-control" name="content" placeholder="write a comment..." rows="3"></textarea>
                                                <br/>
                                                <button class="btn btn-common position-right" type="submit">Comment</button>
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

        )   
    }
};


// export default ListOffer;
export default connect(
    "listFeed, current_id", actions)
    (withRouter(ListFeed));