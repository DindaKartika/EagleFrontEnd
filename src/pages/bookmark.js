// LIST IMPORT MODULE
import React, { Component } from 'react';
import axios from 'axios';
import { connect } from "unistore/react";
import { actions, store } from '../store';
import { withRouter } from "react-router-dom";
import Header from '../components/navbar'
import Footer from '../components/footer_styled';
import FeedComponent from '../components/feed_component';
import FeedBookmark from '../components/feed_bookmark';
import CommentComponent from '../components/comment_component';
import{ Link } from "react-router-dom";

//MAIN CLASS
class Bookmarks extends Component {
    constructor (props){
        super(props);
        this.state  = {
            search:"",
            AllFeed:[]
            // listBookmark:[]
        }
    }
    
    componentDidMount = () => {
        // this.props.getAllFeed();
        const token = localStorage.getItem("token");
        const self = this;
        const allFeed = {
            method: "get",
            // url: "https://api.lahanku.id/proxy/user/product",
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


        };
    // componentDidUpdate = () => {
    //         this.props.getAllFeed();
    //         };
    // handleClick(e){
    //     e.preventDefault();
    //     const self = this;
    //     const {content} = e.target;
    //     var data ={};
        
    //     data.content = content.value;

    //     const token = localStorage.getItem("token");
    //     console.log("test token post",token)
    //     console.log("post content", data);
    //     let postFeed = {
    //         method:'post',
    //         url:'https://api.lahanku.id/feeds?sort=desc&rp=10000',
    //         headers: {
    //             'Authorization':'Bearer ' + token
    //         },
    //         data : data
    //     };
    //     axios(postFeed)
    //     .then(function(response){
    //         console.log(response.data);
    //         // const self = this;
    //         const allFeed = {
    //             method: "get",
    //             url: "https://api.lahanku.id/feeds?sort=desc&rp=10000",
    //         };
    //          axios(allFeed)
    //         .then(function(response){
    //             // self.setState({AllFeed: response.data});
    //             store.setState({listAllFeed: response.data});
    //             console.log("cek after post feeds", response.data);
    //         })
    //         .catch(function(error){
    //             console.log(error);
    //         })
    //         // self.props.getAllFeed();
    //         // window.location.reload();
    //         self.props.history.push("/newsfeed");
    //     });

    // };

    // handleSearch(e){
    //     e.preventDefault();
    //     const self = this;
    //     const {searchcontent} = e.target;
    //     const search = searchcontent.value;
    //     console.log("cek value search", search);

    //     let searchFeeds = {
    //         method:'get',
    //         url:"https://api.lahanku.id/feeds?sort=desc&rp=10000" + "&search=" +  search,
    //     };
    //     console.log("cek url",searchFeeds)
    //     axios(searchFeeds)
    //     .then(function(response){
    //         console.log(response.data);
    //         store.setState({listAllFeed: response.data});
    //         // self.setState ({AllFeed: response.data});
    //         // window.location.reload();
    //         self.props.history.push("/newsfeed");
    //     });

    // };

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
                            <Link to="/newsfeed" className="btn btn-common" style={{marginTop: "20px"}}>kembali ke newsfeed</Link>
                            <br />
                        </div>
                    </div>
                    <div className="col-md-9 feed-post">
                        <div className="container">
                            <div className="display" style={{ display: "block" }}>
                                <div className="profile-post" style={{ display: "block" }}>
                                    {/* Display Post  */}
                                    <div className="post-item" >
                                        <hr />
                                        <h1>Feed yang diikuti</h1>
                                        {/* {this.props.listAllFeed.map((item, key) => { */}
                                        {this.props.listBookmark.map((item, key) => {
                                            // return <FeedComponent key={key} displayname ={item.user.display_name} username = {item.user.username} tag = {item.tag} content={item.content} date={item.created_at.slice(4, 16)} time={item.created_at.slice(17, 22)}/>; }
                                            return <FeedBookmark key={key} data={item}/>; }
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
export default connect( "listAllFeed, listBookmark, token, current_display_name, current_username, current_profile_picture", actions)
(withRouter(Bookmarks));