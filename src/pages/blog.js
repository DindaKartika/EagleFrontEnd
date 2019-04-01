// LIST IMPORT MODULE
import React, { Component } from 'react';
import axios from 'axios';
import { connect } from "unistore/react";
import { actions } from '../store';
import { withRouter } from "react-router-dom";
import Header from '../components/header_signin';
import Footer from '../components/footer';
import BlogComponent from '../components/blog_component';

//MAIN CLASS
class Blog extends Component {
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
                <div className="row justify-content-center">
                    <span className="title-blogs">Blogs</span>
                </div>
                <div className="container row container-profile">
                    <BlogComponent/>
                    <BlogComponent/>
                    <BlogComponent/>
                    <BlogComponent/>
                    <BlogComponent/>
                    <BlogComponent/>
                </div>
            </div>
            <Footer />
        </div>
    )
  }
}

// export default Profile;
export default connect( "", actions)
(withRouter(Blog))