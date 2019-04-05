// LIST IMPORT MODULE
import React, { Component } from 'react';
import '../css/main.css';
import{ Link } from "react-router-dom";

// COMPONENT BODY
class Footer extends Component {
  render() {
    return (
        <footer className="container-fluid footer">
            <div className="container footer-handler row">
                <div className="footer-logo col-md-3"><img className="logo-footer" src={require("../images/logo/testlogo9.png")} alt="" /></div>
                <div className="footer-logo col-md-3">
                    <p><strong><Link to="/aboutus"><span className="fontFooter bold">Tentang </span></Link></strong></p>
                    <p className="menu-footer"><Link to="/aboutus"><span className="fontFooter">Perusahaan</span></Link> <br />
                    <Link to="/contactus"><span className="fontFooter">Blog</span></Link> <br />
                    <Link to="/contactus"><span className="fontFooter">Karir</span></Link></p> 
                </div>
                <div className="footer-logo col-md-3">
                    <p><strong><Link to="/aboutus"><span className="fontFooter bold">Pusat Bantuan </span></Link></strong></p>
                    <p className="menu-footer"><Link to="/aboutus"><span className="fontFooter">Menggunakan (name)</span></Link><br />
                    <Link to="/contactus"><span className="fontFooter">Mengelola akun Anda</span></Link><br />
                    <Link to="/contactus"><span className="fontFooter">Peraturan dan Kebijakan</span></Link><br/>
                    <Link to="/contactus"><span className="fontFooter">Hubungi kami</span></Link><br/>
                    </p>
                </div>
                <div className="footer-logo col-md-3">
                    <p><strong><Link to="/aboutus"><span className="fontFooter bold">Bisnis </span></Link></strong></p>
                    <p className="menu-footer"><Link to="/aboutus"><span className="fontFooter">Tentang Iklan</span></Link><br />
                    <Link to="/contactus"><span className="fontFooter">Pasang Iklan</span></Link><br />
                    <Link to="/contactus"><span className="fontFooter">Kisah sukses</span></Link>
                    </p>
                </div>
            </div>
            <div className="justify-content-center">
                <hr />
                <p className="copyright-footer">copyright lahanku.com</p>
            </div>
        </footer>
    );
  }
}

// EXPORT THE COMPONENT BODY
export default Footer;