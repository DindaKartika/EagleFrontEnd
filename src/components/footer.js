import React, { Component } from 'react';
import{ Link } from "react-router-dom";

class Footer extends Component {
    // postSignout = () => {
    //     this.props.is_login=false;
    //     this.props.history.push("/");
    // };
  render() {
    return (
    <div>
        <div className="container-fluid">
            <div className="row basecolor paddingTB20">
                <div className="col-md-2 co-12"></div>
                <div className="col-md-2 co-12">
                <Link to="/" className="nav-link "><img src={require('../images/logo/logo1.png')} className="imglogo" alt=""/></Link>
                </div>
                <div className="col-md-2 co-12">
                    <table className="">
                        <tr className="">
                            <td><Link to="/aboutus"><span className="fontFooter bold">Tentang </span></Link></td>
                        </tr>
                        <tr className="">
                            <td><Link to="/aboutus"><span className="fontFooter">Perusahaan</span></Link></td>
                        </tr>
                        <tr className="">
                            <td><Link to="/contactus"><span className="fontFooter">Blog</span></Link></td>
                        </tr>
                        <tr className="">
                            <td><Link to="/contactus"><span className="fontFooter">Karir</span></Link></td>
                        </tr>
                    </table>
                </div>
                <div className="col-md-2 co-12">
                    <table className="">
                        <tr className="">
                            <td><Link to="/aboutus"><span className="fontFooter bold">Pusat Bantuan </span></Link></td>
                        </tr>
                        <tr className="">
                            <td><Link to="/aboutus"><span className="fontFooter">Menggunakan (name)</span></Link></td>
                        </tr>
                        <tr className="">
                            <td><Link to="/contactus"><span className="fontFooter">Mengelola akun Anda</span></Link></td>
                        </tr>
                        <tr className="">
                            <td><Link to="/contactus"><span className="fontFooter">Keselamatan dan Keamanan</span></Link></td>
                        </tr>
                        <tr className="">
                            <td><Link to="/contactus"><span className="fontFooter">Peraturan dan Kebijakan</span></Link></td>
                        </tr>
                        <tr className="">
                            <td><Link to="/contactus"><span className="fontFooter">Hubungi kami</span></Link></td>
                        </tr>
                    </table>
                </div>
                <div className="col-md-2 co-12">
                    <table className="">
                        <tr className="">
                            <td><Link to="/aboutus"><span className="fontFooter bold">Bisnis </span></Link></td>
                        </tr>
                        <tr className="">
                            <td><Link to="/aboutus"><span className="fontFooter">Tentang Iklan</span></Link></td>
                        </tr>
                        <tr className="">
                            <td><Link to="/contactus"><span className="fontFooter">Pasang Iklan</span></Link></td>
                        </tr>
                        <tr className="">
                            <td><Link to="/contactus"><span className="fontFooter">Kisah sukses</span></Link></td>
                        </tr>
                    </table>
                </div>
                <div className="col-md-2 co-12">
                </div>
            </div>
            <div className="row linefooter"> </div>
            <div className="row basecolor paddingB20 text-center">
                <div className="col-md-3 co-12">
                </div>
                <div className="col-md-2 co-12 text-center">
                    <span className="fontFooter">2019 copyright</span>
                </div>
                <div className="col-md-2 co-12 text-center">
                    <span className="fontFooter">Privasi</span>
                </div>
                <div className="col-md-2 co-12 text-center">
                    <span className="fontFooter">Syarat dan Ketentuan</span>
                </div>
                <div className="col-md-3 co-12">
                </div>
            </div>
        </div>
    </div>
    );
  }
}

export default Footer;