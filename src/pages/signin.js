import React, { Component } from 'react';
import Header from "../components/header_signin";
import FormSignIn from "../components/form_signin";
import Footer from '../components/footer_styled';
import{ Link } from "react-router-dom";
// import NavbarPage from '../components/Navbar';


class SignIn extends Component {
  render() {
    return (
      <div className="signin">
    {/* <!-- Header Area wrapper Starts --> */}
      <Header />
      {/* <NavbarPage /> */}
      
      {/* <!-- Intro Section Start --> */}
      <section class="intro">
        <div class="container-fluid row to-middle-please">
        <div className="col-md-6">
          <div class="row text-center">
            <div class="col-md-12 col-sm-12 col-xs-12">
              <div class="heading-count">
                <h2><img className="" src={require("../images/logo/testlogo3.png")} alt="" /></h2>
                <p>Tempat berbagi aktivitas mengenai lahan milik Anda</p>
              </div>
            </div>
            <div class="col-md-12 col-sm-12 col-xs-12">
              <div class="row justify-content-center">
                <div class="col-md-6 info-register">
                    <i className="material-icons">pin_drop</i>
                    <h5 className="bold">Daftarkan Lahan</h5>
                    <span>Tunjukan di mana lahan anda dan bagikan aktifitas terkini bercocok tanam anda supaya kami yang membutuhkan tahu bahwa Anda adalah orang yang tepat.</span>
                </div>
                <div class="col-md-6 info-register">
                    <i className="material-icons">info</i>
                    <h5 className="bold">Update status</h5>
                    <span>Ikuti perkembangan berita seputar teknologi bercocok-tanam terkini dari seluruh pelosok Indonesia</span>
                </div>

                {/* <div class="col-md-6 info-register">
                    <i className="material-icons">accessibility_new</i>
                    <h5 className="bold">Untuk Indonesia Lebih Mandiri</h5>
                    <span>Kami berkomitmen untuk mengurangi nilai import. Mempertemukan konsumen untuk produsen dan mencarikan produsen untuk konsumen</span>
                </div>
                <div class="col-md-6 info-register">
                    <i className="material-icons">accessibility_new</i>
                    <h5 className="bold">Untuk Indonesia Lebih Mandiri</h5>
                    <span>Kami berkomitmen untuk mengurangi nilai import. Mempertemukan konsumen untuk produsen dan mencarikan produsen untuk konsumen</span>
                </div> */}
              </div>
              {/* <a href="#contact" class="btn btn-common">Hubungi Kami</a> */}
              <Link to="/landinginfo"><a href="#team" class="btn btn-border">Tentang Kami</a></Link>
              <div class="social mt-4">
                <a class="facebook" href="#"><i class="lni-facebook-filled"></i></a>
                <a class="twitter" href="#"><i class="lni-twitter-filled"></i></a>
                <a class="instagram" href="#"><i class="lni-instagram-filled"></i></a>
                <a class="google" href="#"><i class="lni-google-plus"></i></a>
              </div>
              <a href="#services" class="target-scroll page-scroll"><i class="lni-chevron-down"></i></a>
            </div>
          </div>
        </div>
        <div className="col-md-6">
            <FormSignIn />
        </div>
        </div>
      </section>
        <Footer/>
        
    </div>
    );
  }
}

export default SignIn;
