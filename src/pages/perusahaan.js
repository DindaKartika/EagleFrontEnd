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

class Perusahaan extends Component {
    render() {
            return (
        <div>
            <Header />
            <div className="container-fluid basecolor paddingTB20 titlecontent">
                <div className="row titlecontent"><span>Perusahaan kami berdedikasi</span></div>
                <div className="row titlecontent"><span>untuk memajukan industri</span></div>
                <div className="row titlecontent"><span>pertanian Indonesia</span></div>
            </div>
            <div className="container-fluid backgroundPage">
                <div className="row paddingTB20">
                    <div className="col-md-1 col-12"></div>
                    <div className="col-md-2 col-12"><img src={require('../images/logo/logo1.png')} className="imglogo" alt=""/></div>
                    <div className="col-md-1 col-12"></div>
                    <div className="col-md-5 col-12"><span>Membantu petani untuk mempublikasi aktifitas bercocok tanam, dari jenis tanaman yang ditanam hingga waktu estimasi panen.</span></div>
                    <div className="col-md-3 col-12"></div>
                </div>
                <div className="row paddingTB20">
                    <div className="col-md-1 col-12"></div>
                    <div className="col-md-2 col-12"><img src={require('../images/logo/logo1.png')} className="imglogo" alt=""/></div>
                    <div className="col-md-1 col-12"></div>
                    <div className="col-md-5 col-12"><span>Membantu petani untuk mendapatkan ruang khusus dalam berbagi teknologi tani dan berdiskusi satu sama lain</span></div>
                    <div className="col-md-3 col-12"></div>
                </div>
                <div className="row paddingTB20">
                    <div className="col-md-1 col-12"></div>
                    <div className="col-md-2 col-12"><img src={require('../images/logo/logo1.png')} className="imglogo" alt=""/></div>
                    <div className="col-md-1 col-12"></div>
                    <div className="col-md-5 col-12"><span>Membantu menyelesaikan permasalahan ketidak seimbangan antara stok dan permintaan pasar pangan (supply and demand) di seluruh daerah Indonesia</span></div>
                    <div className="col-md-3 col-12"></div>
                </div>
                <div className="row paddingTB20">
                    <div className="col-md-1 col-12"></div>
                    <div className="col-md-2 col-12"><img src={require('../images/logo/logo1.png')} className="imglogo" alt=""/></div>
                    <div className="col-md-1 col-12"></div>
                    <div className="col-md-5 col-12"><span>Menyediakan informasi aktual data aktifitas tani untuk seluruh masyarakat</span></div>
                    <div className="col-md-3 col-12"></div>
                </div>
            </div>
            <div className="container-fluid paddingTB30">
                <div className="row justify-content-center">
                <div className="col-md-3 col-12"></div>
                <div className="col-md-6 col-12 text-center">
                    <span>Fokus pada pertumbuhan sekaligus memelihara platform yang terbuka memerlukan tim eksekutif terampil yang memanfaatkan tantangan.</span>
                </div>
                <div className="col-md-3 col-12"></div>
                </div>
            </div>
            <div className="container-fluid backgroundPage paddingTB20">
                <div className="row justify-content-center paddingTB20">
                    <span> Saat ini kami memiliki staff dan developer :</span>
                </div>
                <div className="row paddingTB20 justify-content-center">
                    <div className="col-md-2 col-12"></div>
                    <div className="col-md-2 col-12 justify-content-center">
                        <span className="text-center"><img src={require('../images/logo/logo1.png')} className="profildev" alt=""/></span>
                        <h6 >Mae</h6>
                        <span >Team Lead & UI & UX Designer</span>    
                    </div>
                    <div className="col-md-2 col-12 ">
                        <img src={require('../images/logo/logo1.png')} className="profildev" alt=""/>
                        <h6 >Dzinsyah</h6>
                        <span >Front End Engineer</span> 
                    </div>
                    <div className="col-md-2 col-12 ">
                        <img src={require('../images/logo/logo1.png')} className="profildev" alt=""/><br/>
                        <h6 >Ilham</h6>
                        <span >Backend Engineer</span> 
                    </div>
                    <div className="col-md-2 col-12 ">
                        <img src={require('../images/logo/logo1.png')} className="profildev" alt=""/><br/>
                        <h6 >Dinda</h6>
                        <span >Backend Engineer</span> 
                    </div>
                    <div className="col-md-2 col-12"></div>
                </div>
            </div>
            <Footer />
        </div>

                );
        }
        
    }

export default Perusahaan;
// export default connect (withRouter(SignUp));