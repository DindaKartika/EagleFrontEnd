// LIST IMPORT MODULE
import React, { Component } from 'react';
import axios from 'axios';
import { connect } from "unistore/react";
import { actions, store } from '../store';
import { withRouter } from "react-router-dom";
import Header from "../components/navbar";
import Footer from '../components/footer_styled';
import FeedComponent from '../components/feed_component';
import CommentComponent from '../components/comment_component';
import{ Link } from "react-router-dom";

//MAIN CLASS
class NewsFeed extends Component {
    constructor (props){
        super(props);
        this.state  = {
            search:"",
            AllFeed:[]
        }
    }
    
    componentDidMount = () => {
        // this.props.getAllFeed();
        // const token = localStorage.getItem("token");
        const self = this;
        const allFeed = {
            method: "get",
            // url: "http://localhost:8010/proxy/user/product",
            url: "http://localhost:5000/feeds?sort=desc&rp=10000",
            // url: "http://localhost:5000/feeds?rp=10000",
            // headers: {
            //     'Authorization':'Bearer ' + token
            // }
        };
         axios(allFeed)
        .then(function(response){
            // self.setState({AllFeed: response.data});
            store.setState({listAllFeed: response.data});
            // store.setState({datacart: response.data});
            console.log(response.data);
        })
        .catch(function(error){
            console.log(error);
        })


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

        const token = localStorage.getItem("token");
        console.log("test token post",token)
        console.log("post content", data);
        let postFeed = {
            method:'post',
            url:'http://localhost:5000/feeds?sort=desc&rp=10000',
            headers: {
                'Authorization':'Bearer ' + token
            },
            data : data
        };
        axios(postFeed)
        .then(function(response){
            console.log(response.data);
            // const self = this;
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
            // self.props.getAllFeed();
            // window.location.reload();
            self.props.history.push("/newsfeed");
        });

    };

    handleSearch(e){
        e.preventDefault();
        const self = this;
        const {searchcontent} = e.target;
        const search = searchcontent.value;
        console.log("cek value search", search);

        let searchFeeds = {
            method:'get',
            url:"http://localhost:5000/feeds?sort=desc&rp=10000" + "&search=" +  search,
        };
        console.log("cek url",searchFeeds)
        axios(searchFeeds)
        .then(function(response){
            console.log(response.data);
            store.setState({listAllFeed: response.data});
            // self.setState ({AllFeed: response.data});
            // window.location.reload();
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
                        <Link to="/profile"><img src={this.props.current_profile_picture} className="profile-photo-news" alt=""/></Link>
                        </div>
                        <div className="side-detail-profile">
                            <div>{this.props.current_display_name}</div>
                            <div>@{this.props.current_username}</div>
                            <Link to="/bookmarks" className="btn btn-primary">Lihat feed yang diikuti</Link>
                            <br />
                        </div>
                    </div>
                    <div className="col-md-9 feed-post">
                        <div className="container">
                            <div className="display" style={{ display: "block" }}>
                            <div class="container">
                                <form onSubmit={e => this.handleSearch(e)}>
                                    <div className="input-group">
                                        {/* <input type="text" className="form-control" name="searchcontent" onChange={e => this.handleSearch(e)} placeholder="Search for..."/> */}
                                        <input type="text" className="form-control" name="searchcontent" placeholder="Katakunci Pencarian"/>
                                        <span className="input-group-btn">
                                            <button className="btn btn-search" type="submit"><i className="fa fa-search fa-fw"></i> Cari</button>
                                        </span>
                                    </div>
                                </form>
                            </div>
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
                                    <div className="post-item" >
                                        <hr />
                                        {/* {this.props.listAllFeed.map((item, key) => { */}
                                        {this.props.listAllFeed.map((item, key) => {
                                            // return <FeedComponent key={key} displayname ={item.user.display_name} username = {item.user.username} tag = {item.tag} content={item.content} date={item.created_at.slice(4, 16)} time={item.created_at.slice(17, 22)}/>; }
                                            return <FeedComponent key={key} data={item}/>; }
                                                    )}
                                        {/* {this.props.listAllFeed.map((item, key) => {
                                            // return <FeedComponent key={key} displayname ={item.user.display_name} username = {item.user.username} tag = {item.tag} content={item.content} date={item.created_at.slice(4, 16)} time={item.created_at.slice(17, 22)}/>; }
                                            return <CommentComponent key={key} data={item}/>; }
                                                    )} */}

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
export default connect( "listAllFeed, token, current_display_name, current_username, current_profile_picture", actions)
(withRouter(NewsFeed));