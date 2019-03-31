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

class Keamanan extends Component {
    render() {
            return (
        <div>
            <Header />
            <div className="container-fluid basecolor paddingTB20 titlecontent">
                <div className="row titlecontent"><span>Kami berdedikasi dalam menjadikan Tanah Air</span></div>
                <div className="row titlecontent"><span>Sebagai tempat yang aman untuk berbagi</span></div>
                <div className="row titlecontent"><span>opini dan pengalaman seputar tani</span></div>
            </div>
            <div className="container-fluid backgroundPage">
                <div className="row paddingTB20">
                    <div className="col-md-1 col-12"></div>
                    <div className="col-md-2 col-12"><img src={require('../images/logo/logo1.png')} className="imglogo" alt=""/></div>
                    <div className="col-md-1 col-12"></div>
                    <div className="col-md-5 col-12"><span>Kebebasan membagi data identitas Anda ke kami akan terjaga dengan aman dan tidak akan tersebar ke pihak yang tidak bertanggung jawab.</span></div>
                    <div className="col-md-3 col-12"></div>
                </div>
                <div className="row paddingTB20">
                    <div className="col-md-1 col-12"></div>
                    <div className="col-md-2 col-12"><img src={require('../images/logo/logo1.png')} className="imglogo" alt=""/></div>
                    <div className="col-md-1 col-12"></div>
                    <div className="col-md-5 col-12"><span>Ketika Anda melaporkan pelanggaran terhadap kebijakan kami, kami dapat menggunakan berbagai opsi penegakan</span></div>
                    <div className="col-md-3 col-12"></div>
                </div>
            </div>
            <div className="container-fluid paddingTB30">
                <div className="row justify-content-center">
                <div className="col-md-3 col-12"></div>
                <div className="col-md-6 col-12 text-center">
                    <div className="card marginTB20">
                        <div className="card-body">
                            <span>Kami akan terus melanjutkan pekerjaan kami untuk membuat Tanah air lebih aman dan nyaman</span>
                        </div>
                    </div><br/>
                    <div className="card marginTB20">
                        <div className="card-body">
                            <span>Ketika Anda melaporkan pelanggaran terhadap kebijakan kami, kami dapat menggunakan berbagai opsi penegakan</span>
                        </div>
                    </div>
                </div>
                <div className="col-md-3 col-12"></div>
                </div>
            </div>
            <Footer />
        </div>

                );
        }
        
    }

export default Keamanan;
// export default connect (withRouter(SignUp));