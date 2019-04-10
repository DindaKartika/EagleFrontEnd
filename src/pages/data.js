import React, { Component } from 'react';
import Header from "../components/navbar";
import jQuery from "jquery";
import NavbarPage from '../components/navbar';
import Footer from '../components/footer_styled';
import ChartLuasTanah from "../components/chart_luas_tanah";
import ChartTotalPanen from "../components/chart_total_panen";
// import './assets/fonts/line-icons.css'




class LandingInfo extends Component {
  componentDidMount() {
    (function($) {
  
      "use strict";  
    
      $(window).on('load', function() {
    
      //    /* Page Loader active
      //   ========================================================*/
        $('#preloader').fadeOut();
    
      // Sticky Nav
        $(window).on('scroll', function() {
            if ($(window).scrollTop() > 200) {
                $('.scrolling-navbar').addClass('top-nav-collapse');
            } else {
                $('.scrolling-navbar').removeClass('top-nav-collapse');
            }
        });

          var offset = 200;
          var duration = 500;
          $(window).scroll(function() {
            if ($(this).scrollTop() > offset) {
              $('.back-to-top').fadeIn(400);
            } else {
              $('.back-to-top').fadeOut(400);
            }
          });
    
          $('.back-to-top').on('click',function(event) {
            event.preventDefault();
            $('html, body').animate({
              scrollTop: 0
            }, 600);
            return false;
          });
    
      });      
    
    }(jQuery));
  }

  render() {
    return (
      <div className="landing-info">
    {/* <!-- Header Area wrapper Starts --> */}
      <Header />
      {/* <NavbarPage /> */}
      
      {/* <!-- Intro Section Start --> */}
      <div className="landingpage-wrapper">
      <section class="intro">
        <div class="container">
          <div class="row text-center">
            <div class="col-md-12 col-sm-12 col-xs-12">
              <div class="heading-count">
                <h2><img className="" src={require("../images/logo/testlogo3.png")} alt="" /></h2>
                <p>Tempat berbagi aktivitas mengenai lahan milik Anda</p>
              </div>
            </div>
            <div class="col-md-12 col-sm-12 col-xs-12">
              <div class="row countdown justify-content-center">
                <div id="clock" class="time-count"></div>
              </div>
              <a href="#contact" class="btn btn-common">Hubungi Kami</a>
              <a href="#team" class="btn btn-border">Tentang Kami</a>
              <div class="social mt-4">
                <a class="facebook" href="#"><i class="lni-facebook-filled"></i></a>
                <a class="twitter" href="#"><i class="lni-twitter-filled"></i></a>
                <a class="instagram" href="#"><i class="lni-instagram-filled"></i></a>
                <a class="google" href="#"><i class="lni-google-plus"></i></a>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <!-- Intro Section End --> */}

      <section id="services" class="section-padding" >
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-md-8 col-lg-8 col-xs-12 text-center">
              <h6 class="subtitle">
                Apa itu Lahanku
              </h6>
              <h2 class="section-title">
                kami berdedikasi untuk memajukan industri pertanian Indonesia
              </h2>
              <div class="section-info">
                Membantu menyelesaikan permasalahan ketidak seimbangan antara stok dan permintaan pasar pangan (supply and demand) di seluruh daerah Indonesia
              </div>
            </div>            
          </div>
          <div className="container-grafik">
            <div className="row">
              <div className="col-md-12">
                {/* <p className="h2">Grafik Total Luas Tanah (30 Hari Kebelakang)</p> */}
                <ChartLuasTanah />
              </div>
              <div className="col-md-12">
                {/* <p className="h2">Grafik Perkiraan Panen per Hari (30 Hari Kedepan)</p> */}
                <ChartTotalPanen />
              </div>
            </div>
          </div>
        </div>
      </section>

      

      <Footer />

      {/* <!-- Footer Section End --> */}

      
      {/* <!-- Go to Top Link --> */}
      <a href="#" class="back-to-top">
        <i class="lni-chevron-up"></i>
      </a>

      {/* <!-- Preloader --> */}
      <div id="preloader">
        <div class="loader" id="loader-1"></div>
      </div>
      {/* <!-- End Preloader --> */}
      </div>

      {/* <script src="assets/js/jquery-min.js"></script>
      <script src="assets/js/main.js"></script> */}
      {/* </script> */}
        
    </div>
    );
  }
}

export default LandingInfo;
