// LIST IMPORT MODULE
import React, { Component } from 'react';
import axios from 'axios';
import { connect } from "unistore/react";
import { actions } from '../store';
import { withRouter } from "react-router-dom";
import Header from '../components/header_signin'
import Footer from '../components/footer';

//MAIN CLASS
class NewsFeed extends Component {
//   constructor (props) {
//     super(props);
//       this.state = {
//         test: ""
//       };
//   };
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
                                <form>
                                    <div className="form-group">
                                        <input className="form-control input-lg size-input-feed" id="inputlg" type="text"/>
                                    </div>
                                </form> 
                                <div className="container-fluid row justify-content-end">
                                    <button className="btn btn-outline-success addpost-btn">Bagikan</button>
                                </div>
                                <div className="profile-post" style={{ display: "block" }}>
                                    {/* Display Post  */}
                                    <div className="post-item">
                                        <hr />
                                        {/* Loop content post start here */}
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="row">
                                                    <div className="col-md-2 col-12"><img src={require('../images/img/profil.jpeg')} className="img-photo-news margin-bottom-5" alt=""/></div>
                                                    <div className="col-md-4 col-12 margin-auto"><span className="displayname-text ">DisplayName</span></div>
                                                    <div className="col-md-4 col-12 margin-auto"><span className="username-text">@username</span></div>
                                                    <div className="col-md-2 col-12"></div>
                                                </div>
                                            </div>
                                            <div className="col-md-6 date-container-text">
                                                <span className="date-text">Date | </span>
                                                <span className="date-text">Time</span>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <p className="content-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. In pharetra placerat leo, eget mattis sapien mollis consectetur. In hac habitasse platea dictumst. Etiam et ante diam. Pellentesque scelerisque sed ante ut egestas. Vivamus efficitur, lorem mattis varius convallis, nisi mauris convallis sapien, vitae ultrices urna ligula volutpat leo. Pellentesque vel urna felis. Proin fringilla metus sed tincidunt volutpat. Pellentesque vulputate nulla ut hendrerit dapibus. Vivamus enim ex, sollicitudin vel orci ac, ultricies laoreet augue. </p>
                                        </div>
                                        <div className="row justify-content-between">
                                            <span className="attribute-text">Tag</span>
                                            <span className="attribute-text">Comments</span>
                                            <span className="attribute-text">Likes</span>
                                        </div>
                                        <div className="row comment-area">
                                            <div className="col-md-2"></div>
                                            <div className="col-md-10">
                                                {/* Loop content comment start here */}
                                                <div className="row">
                                                    <div className="col-md-6">
                                                        <div className="row">
                                                            <div className="col-md-2 col-12"><img src={require('../images/img/profil.jpeg')} className="img-photo-news margin-bottom-5" alt=""/></div>
                                                            <div className="col-md-4 col-12 margin-auto"><span className="displayname-text ">DisplayName</span></div>
                                                            <div className="col-md-4 col-12 margin-auto"><span className="username-text">@username</span></div>
                                                            <div className="col-md-2 col-12"></div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6 date-container-text">
                                                        <span className="date-text">Date | </span>
                                                        <span className="date-text">Time</span>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <p className="content-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. In pharetra placerat leo, eget mattis sapien mollis consectetur. In hac habitasse platea dictumst. Etiam et ante diam. Pellentesque scelerisque sed ante ut egestas. Vivamus efficitur, lorem mattis varius convallis, nisi mauris convallis sapien, vitae ultrices urna ligula volutpat leo. Pellentesque vel urna felis. Proin fringilla metus sed tincidunt volutpat. Pellentesque vulputate nulla ut hendrerit dapibus. Vivamus enim ex, sollicitudin vel orci ac, ultricies laoreet augue. </p>
                                                </div>
                                                <div className="row justify-content-end">
                                                    <span className="attribute-text margin-right-20">Tag</span>
                                                    <span className="attribute-text">Likes</span>
                                                </div>
                                                {/* Loop content comment end here */}
                                                {/* Loop content comment start here */}
                                                <div className="row">
                                                    <div className="col-md-6">
                                                        <div className="row">
                                                            <div className="col-md-2 col-12"><img src={require('../images/img/profil.jpeg')} className="img-photo-news margin-bottom-5" alt=""/></div>
                                                            <div className="col-md-4 col-12 margin-auto"><span className="displayname-text ">DisplayName</span></div>
                                                            <div className="col-md-4 col-12 margin-auto"><span className="username-text">@username</span></div>
                                                            <div className="col-md-2 col-12"></div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6 date-container-text">
                                                        <span className="date-text">Date | </span>
                                                        <span className="date-text">Time</span>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <p className="content-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. In pharetra placerat leo, eget mattis sapien mollis consectetur. In hac habitasse platea dictumst. Etiam et ante diam. Pellentesque scelerisque sed ante ut egestas. Vivamus efficitur, lorem mattis varius convallis, nisi mauris convallis sapien, vitae ultrices urna ligula volutpat leo. Pellentesque vel urna felis. Proin fringilla metus sed tincidunt volutpat. Pellentesque vulputate nulla ut hendrerit dapibus. Vivamus enim ex, sollicitudin vel orci ac, ultricies laoreet augue. </p>
                                                </div>
                                                <div className="row justify-content-end">
                                                    <span className="attribute-text margin-right-20">Tag</span>
                                                    <span className="attribute-text">Likes</span>
                                                </div>
                                                {/* Loop content comment end here */}
                                                {/* Loop content post end here */}
                                            </div>
                                        </div>
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
export default connect( "", actions)
(withRouter(NewsFeed));