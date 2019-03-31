// LIST IMPORT MODULE
import React, { Component } from 'react';
import axios from 'axios';
import { connect } from "unistore/react";
import { actions } from '../store';
import { withRouter } from "react-router-dom";
import Header from '../components/header_signin'
import Footer from '../components/footer';

//MAIN CLASS
class LandingPage extends Component {
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
                    <div className="col-md-1"></div>
                    <div className="col-md-10 feed-post height700px">
                    <h2 className="text-center blue">Selamat Datang di Apps Tanah Air</h2>
                    </div>
                    <div className="col-md-1"></div>
                </div>
            </div>
            <Footer />
        </div>
    )
  }
}

// export default Profile;
export default connect( "", actions)
(withRouter(LandingPage));