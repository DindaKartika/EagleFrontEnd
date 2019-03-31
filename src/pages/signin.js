import '../css/main.css';
import '../css/bootstrap.min.css';
import React, { Component } from 'react';
import axios from 'axios';
import Footer from '../components/footer';
import {Redirect} from "react-router-dom";
import {connect} from "unistore/react";
import {actions} from '../store';
import {withRouter} from "react-router-dom";
import Header from "../components/header_signin";
import FormSignIn from "../components/form_signin";
import{ Link } from "react-router-dom";

class SignIn extends Component {
    render() {

            return (
        <div>
            <Header />
            <div className="container-fluid">
                <div className="row basecolor paddingTB10 height200">
                    <div className="col-md-6 col-12 paddingleft30 fontroboto paddingtop40">
                        {/* <div className="row"> */}
                            <h5> Media sosial agrikultur Indonesia</h5>
                            <span>Gabung sekarang juga dengan mudah dan cepat untuk mendapatkan keuntungan-keuntungannya!</span>
                        {/* </div> */}
                    </div>
                    <div className="col-md-6 col-12">

                    </div>
                </div>
                <div className="row backgroundPage">
                    <div className="col-md-6 col-12 paddingtop100 paddingB100">
                        {/* <div className="row">
                            <h5> Media sosial agrikultur Indonesia</h5><br/>
                            <span>Gabung sekarang juga dengan mudah dan cepat untuk mendapatkan keuntungan-keuntungannya!</span>
                        </div> */}
                        <div className="row fontroboto">
                            <div className="col-md-6 col-12">
                                <Link to="/" className="nav-link cwhite"><img src={require('../images/logo/logo1.png')} className="imglogo" alt=""/></Link><br/>
                                <h5>Update status</h5><br/>
                                <span>Ikuti perkembangan berita seputar teknologi bercocok-tanam terkini dari seluruh pelosok Indonesia</span>
                            </div>
                            <div className="col-md-6 col-12">
                                <Link to="/" className="nav-link cwhite"><img src={require('../images/logo/logo1.png')} className="imglogo" alt=""/></Link><br/>
                                <h5>Daftarkan Lahan</h5><br/>
                                <span>Tunjukan di mana lahan anda dan bagikan aktifitas terkini bercocok tanam anda supaya kami yang membutuhkan tahu bahwa Anda adalah orang yang tepat.</span>
                            </div>
                        </div>
                        <div className="row paddingleft30">
                            <Link to="/" className="nav-link cwhite"><img src={require('../images/logo/logo1.png')} className="imglogo" alt=""/></Link><br/><br/>    
                            <div className="row">
                            <h5>Untuk Indonesia Lebih Mandiri</h5><br/>
                            <span>Kami berkomitmen untuk mengurangi nilai import. Mempertemukan konsumen untuk produsen dan mencarikan produsen untuk konsumen</span>
                            </div>    
                        </div>
                    </div>
                    {/* <div className="col-md-6 col-12 paddingTB30"> */}
                    <div className="col-md-6 col-12 margintop-100">
                    <FormSignIn/>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
                );
        }
        
    }

export default SignIn;
// export default connect (withRouter(SignUp));