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
            listComment: []
        };
    };

    componentDidMount = async () => {
        const self = this
        const token = localStorage.getItem("token")
        const url = "http://localhost:5000/comments?id_feed=" + self.props.data.id_feed
        axios({
            method: 'get',
            url: url,
            headers: {
              Authorization: 'Bearer ' + token
            }
        }).then(function(response) {
            // console.log("cek feed id", self.props.data.id_feed)
            // console.log("Get comment berhasil", response.data)
            self.setState({
                listComment: response.data
            })
        }).catch(function(error) {
        console.log("Gagal get comment", error);
        });
        // console.log("cek after get comment", self.state)
    }

    render() {
        return (
            <div className="feed-item">
                <div className="row">
                    <div className="col-md-8">
                        <span className="displayname-text">{this.props.data.user.display_name}</span> <br />
                        <span className="username-text">@{this.props.data.user.username}</span>
                    </div>
                    <div className="col-md-4 date-container-text">
                        <span className="date-text">{this.props.data.created_at.slice(4, 16)} | </span>
                        <span className="date-text">{this.props.data.created_at.slice(17, 22)}</span>
                    </div>
                </div>
                <div className="row">
                    <p className="content-text">{this.props.data.content} </p>
                </div>
                <div className="row justify-content-between">
                    <span className="attribute-text">{this.props.data.tag}</span>
                    <span className="attribute-text">Comments</span>
                    <span className="attribute-text">Likes</span>
                </div>
                <hr />
                <div className="row comment-area">
                    <div className="col-md-1"></div>
                    <div className="col-md-11">
                        {this.state.listComment.map((item, key) => {
                            return <ListComment key={key} data={item}/>
                        })}
                    </div>    
                </div>
                <hr />
            </div>
        )   
    }
};


// export default ListOffer;
export default connect(
    "", actions)
    (withRouter(ListFeed));