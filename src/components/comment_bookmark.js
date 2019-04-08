import React, { Component } from 'react';
import { connect } from "unistore/react";
import { actions , store} from '../store';
import { withRouter } from "react-router-dom";
import axios from "axios";

class CommentBookmark extends Component {
    constructor (props) {
        super(props);
            this.state = {  
                updateComment: this.props.allComment,
                countLikeComment: "",
                is_like:"false",
                id_like:"",
                iduser:""
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
            const token = localStorage.getItem("token");
            const allFeed = {
                method: "get",
                // url: "http://localhost:8010/proxy/user/product",
                url: "http://localhost:5000/bookmarks?sort=desc&rp=1000",
                // url: "http://localhost:5000/feeds?rp=10000",
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
            console.log("Gagal get comment", error);})
            // window.location.reload();

    };

    // handleClickLike(e){
    //     e.preventDefault();
    //     const self = this;
    //     const id_feed = e.target.name;

    //     const token = localStorage.getItem("token");
    //     console.log("test token post",token)
    //     let postLike = {
    //         method:'post',
    //         url:'http://localhost:5000/commentlikes/' + self.props.id,
    //         headers: {
    //             'Authorization':'Bearer ' + token
    //             // "Content-Type":"application/json"
    //         }
    //     };
    //     console.log("cek url post", postLike);
    //     //get all like
    //     axios(postLike)
    //     .then(function(response){
    //         const allFeed = {
    //             method: "get",
    //             url: "http://localhost:5000/feeds?sort=desc&rp=10000",
    //         };
    //          axios(allFeed)
    //         .then(function(response){
    //             store.setState({listAllFeed: response.data});
    //         })
    //         .catch(function(error){
    //             console.log(error);
    //         })
    //         self.props.history.push("/newsfeed");
    //     }).catch(function(error) {
    //         console.log("Gagal get like", error);
    //         });
    //         self.props.history.push("/newsfeed");
    //     ;

    // };

    handleProfile(e){
        // e.preventDefault();
        // let iduser1=e.target.name;
        // console.log("cekkkk id user", e)
        this.props.handleDetailProfile(e);
        this.props.history.push("/otherprofile");
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
                    <strong className="text-success" onClick={()=>this.handleProfile(this.props.iduser)} >@{this.props.username}</strong>
                    <p>
                    {this.props.content}
                    </p>
                    <div className="row justify-content-end">
                        <span className="attribute-text margin-right-20">{this.props.tag}</span>
                        <span className="format-likes">{this.props.total_like_comment}</span>
                        <a  className="card-link margin-right-20" onClick={(e)=>this.handleClickLike(e)} name={this.props.id}><i className="fa fa-gittip"></i> Suka</a>
                        {/* <a type="btn" className="format-likes" onClick={(e)=>this.handleClickLike(e)} name={this.props.id} ><img src={require('../images/ico/likeafter.png')} className="imglike margin-bottom-5" alt=""/></a> */}
                        {/* <span className="attribute-text margin-right-20">Likes</span> */}
                        {/* <a className="attribute-text " onClick={(e)=>this.handleDeleteComment(e)}  name={this.props.id}>Delete</a> */}
                        <a className="attribute-text " onClick={(e)=>this.handleDeleteComment(e)} style={{ display: this.props.current_id !== this.props.iduser ? "none" : "block" }} name={this.props.id}>Delete</a>
                    </div>
                </div>
            </li>
        </div>
    );
  }
}
// style={{ display: this.props.current_id == this.props.id ? "none" : "block" }} 
// export default CommentBookmark;
export default connect( "token, allComment, dataLike, current_id", actions)
(withRouter(CommentBookmark))