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

class Karir extends Component {
    render() {
            return (
        <div>
            <Header />
            <div className="container-fluid basecolor paddingTB20 titlecontent">
                <div className="row titlecontent"><span>Mari bangun Indonesia</span></div>
                <div className="row titlecontent"><span>Sekaligus bangun karirmu</span></div>
            </div>
            <div className="container-fluid backgroundPage">
                <div className="row paddingTB20">
                    <div className="col-md-1 col-12"></div>
                    <div className="col-md-2 col-12"><img src={require('../images/logo/logo1.png')} className="imglogo" alt=""/></div>
                    <div className="col-md-1 col-12"></div>
                    <div className="col-md-5 col-12">
                        <h6>Bagaimana motivasi kami</h6>
                        <span>Kami membangun platform sosial media yang membantu suara petani dapat didengar di seluruh pelosok Indonesia.</span></div>
                    <div className="col-md-3 col-12"></div>
                </div>
                <div className="row paddingTB20">
                    <div className="col-md-1 col-12"></div>
                    <div className="col-md-2 col-12"><img src={require('../images/logo/logo1.png')} className="imglogo" alt=""/></div>
                    <div className="col-md-1 col-12"></div>
                    <div className="col-md-5 col-12">
                        <h6>Bagaimana kami bekerja</h6>
                        <span>Kami berinovasi, eksperimen dan pergerakan yang cepat. Kami mempelajari organisasi dengan mindset development, dan kami selalu mencari cara untuk terus mengembangkan kualitas produk ataupun diri kami sendiri.</span></div>
                    <div className="col-md-3 col-12"></div>
                </div>
                <div className="row paddingTB20">
                    <div className="col-md-1 col-12"></div>
                    <div className="col-md-2 col-12"><img src={require('../images/logo/logo1.png')} className="imglogo" alt=""/></div>
                    <div className="col-md-1 col-12"></div>
                    <div className="col-md-5 col-12">
                        <h6>Bagaimana kami berkolaborasi</h6>
                        <span>Passion dan kepribadian sangat penting bagi kami, Anda akan bekerja dengan orang-orang creatif dan memiliki rasa penasaran yang tinggi, dan kami ingin Anda merasa nyaman menjadi diri sendiri setiap hari di sini.</span><br/><br/>
                        <span>Hubungi kami sekarang juga</span><br/>                        
                    </div>
                    <div className="col-md-3 col-12"></div>
                </div>
            </div>
            <Footer />
        </div>

                );
        }
        
    }

export default Karir;
// export default connect (withRouter(SignUp));