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
      
      <section id="services" class="section-padding" >
        <div class="container">
          <div className="container-grafik">
            <div className="row">
              <div className="col-md-12">
                <h3 >Grafik Total Luas Tanah (30 Hari Kebelakang)</h3>
                <ChartLuasTanah />
              </div>
              <div className="col-md-12">
                <h3 >Grafik Perkiraan Panen per Hari (30 Hari Kedepan)</h3>
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
