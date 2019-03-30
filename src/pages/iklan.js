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

class Iklan extends Component {
    render() {
            return (
        <div>
            <Header />
            <div className="container-fluid basecolor paddingTB20 titlecontent">
                <div className="row titlecontent"><span>Gunakan Tanah Air untuk</span></div>
                <div className="row titlecontent"><span>mencapai tujuan bisnis anda</span></div>
            </div>
            <div className="container-fluid backgroundPage">
                <div className="row paddingTB20">
                    <div className="col-md-1 col-12"></div>
                    <div className="col-md-2 col-12"><img src={require('../images/logo/logo1.png')} className="imglogo" alt=""/></div>
                    <div className="col-md-1 col-12"></div>
                    <div className="col-md-5 col-12">
                        <span>Apakah Anda adalah seseorang yang memiliki usaha di bidang pendukung pertanian? Iklankan produk anda di sini</span></div>
                    <div className="col-md-3 col-12"></div>
                </div>
                <div className="row paddingTB20">
                    <div className="col-md-1 col-12"></div>
                    <div className="col-md-2 col-12"><img src={require('../images/logo/logo1.png')} className="imglogo" alt=""/></div>
                    <div className="col-md-1 col-12"></div>
                    <div className="col-md-5 col-12">
                        <span>Apakah Anda memiliki lahan kosong yang tidak menghasilkan? Iklankan lahan anda di sini dan bantu petani untuk lebih banyak menghasilkan panen untuk Indonesia</span><br/><br/>
                        <span>Hubungi kami sekarang juga</span><br/></div>
                    <div className="col-md-3 col-12"></div>
                </div>
            </div>
            <Footer />
        </div>

                );
        }
        
    }

export default Iklan;
// export default connect (withRouter(SignUp));