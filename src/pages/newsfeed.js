// LIST IMPORT MODULE
import React, { Component } from 'react';
import axios from 'axios';
import { connect } from "unistore/react";
import { actions } from '../store';
import { withRouter } from "react-router-dom";
import Header from '../components/header_signin'
import Footer from '../components/footer';
import CommentComponent from '../components/comment_component';
import FeedComponent from '../components/feed_component';

//MAIN CLASS
class NewsFeed extends Component {
    componentDidMount = () => {
        this.props.getAllFeed();
        };
    // componentDidUpdate = () => {
    //         this.props.getAllFeed();
    //         };
    handleClick(e){
        e.preventDefault();
        const self = this;
        const {content} = e.target;
        var data ={};
        
        data.content = content.value;

        const token = this.props.token;
        console.log("test token post",token)
        console.log("post content", data);
        let postFeed = {
            method:'post',
            url:'http://localhost:5000/feeds',
            headers: {
                'Authorization':'Bearer ' + token
            },
            data : data
        };
        axios(postFeed)
        .then(function(response){
            console.log(response.data);
            alert("post sukses")
            self.props.getAllFeed();
            self.props.history.push("/newsfeed");
        });

    };
    
  render() {
    return (
        <div>
            <Header />
            {/* <div className="cover-photo">
            </div> */}
            <div className="container-fluid content-section">
                <div className="container row container-profile">
                    <div className="col-md-3">
                        <div className="profile-photo-news">
                            {/* Profile image goes here! */}
                        </div>
                        <div className="side-detail-profile">
                            <div>Display Name</div>
                            <div>@username</div>
                            <br />
                        </div>
                    </div>
                    <div className="col-md-9 feed-post">
                        <div className="container">
                            <div className="display" style={{ display: "block" }}>
                                <form onSubmit={e => this.handleClick(e)}>
                                    <div className="form-group">
                                        <input className="form-control input-lg size-input-feed" id="inputlg" name="content" type="text"/>
                                    </div>
                                    <div className="container-fluid row justify-content-end">
                                        <button className="btn btn-outline-success addpost-btn" type="submit">Bagikan</button>
                                    </div>
                                </form> 
                                <div className="profile-post" style={{ display: "block" }}>
                                    {/* Display Post  */}
                                    <div className="post-item">
                                        <hr />
                                        {this.props.listAllFeed.map((item, key) => {
                                            // return <FeedComponent key={key} displayname ={item.user.display_name} username = {item.user.username} tag = {item.tag} content={item.content} date={item.created_at.slice(4, 16)} time={item.created_at.slice(17, 22)}/>; }
                                            return <FeedComponent key={key} data={item}/>; }
                                                    )}

                                    </div>
                                </div>
                            </div>
                            <div className="edit" style={{ display: "block" }}>                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
  }
}

// export default Profile;
export default connect( "listAllFeed, token", actions)
(withRouter(NewsFeed));