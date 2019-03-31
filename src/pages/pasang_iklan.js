import '../css/main.css';
import '../css/bootstrap.min.css';
import React, { Component } from 'react';
// import axios from 'axios';
import Footer from '../components/footer';
import {Redirect} from "react-router-dom";
import {connect} from "unistore/react";
// import {actions} from './store';
import {withRouter} from "react-router-dom";
import Header from "../components/header_signin";
import FormRegister from "../components/form_signup";
import{ Link } from "react-router-dom";

class PasangIklan extends Component {
    render() {
            return (
        <div>
            <Header />
            <div className="container-fluid basecolor paddingTB20 titlecontent">
                <div className="row titlecontent"><span>Tawarkan produk dan peralatan & </span></div>
                <div className="row titlecontent"><span>Pendukung proses tani ke orang yang tepat </span></div>
            </div>
            <div className="container-fluid backgroundPage">
                <div className="row paddingTB20">
                    <div className="col-md-1 col-12"></div>
                    <div className="col-md-2 col-12"><img src={require('../images/logo/logo1.png')} className="imglogo" alt=""/></div>
                    <div className="col-md-1 col-12"></div>
                    <div className="col-md-5 col-12">
                        <span>Untuk memasang iklan di sini silahkan kirimkan email ke kontak kami untuk instruksi lebih lanjut!</span></div>
                    <div className="col-md-3 col-12"></div>
                </div>
            </div>
            <Footer />
        </div>

                );
        }
        
    }

export default PasangIklan;
// export default connect (withRouter(SignUp));