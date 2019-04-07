import React, { Component } from 'react';
import Header from "../components/header_signin";
import jQuery from "jquery";
import NavbarPage from '../components/navbar';
import Footer from '../components/footer_styled';
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
              <a href="#services" class="target-scroll page-scroll"><i class="lni-chevron-down"></i></a>
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
          
          <div class="row">
            <div class="col-lg-4 col-md-6 col-xs-12 fadeInUp" data-animation="fadeInUp">
              <div class="services-item">
                <div class="icon">
                  <i class="lni-brush"></i>
                </div>
                <h3><a href="#">Membuka Ruang Pasar</a></h3>
                <p>Membantu petani untuk mempublikasi aktifitas bercocok tanam, dari jenis tanaman yang ditanam hingga waktu estimasi panen.</p>
              </div>
            </div> 
            <div class="col-lg-4 col-md-6 col-xs-12 fadeInUp" data-animation="fadeInUp" data-delay="300">
              <div class="services-item">
                <div class="icon">
                  <i class="lni-mobile"></i>
                </div>
                <h3><a href="#">Tukar Teknologi</a></h3>
                <p>Membantu petani untuk mendapatkan ruang khusus dalam berbagi teknologi tani dan berdiskusi satu sama lain</p>
              </div>
            </div> 
            <div class="col-lg-4 col-md-6 col-xs-12 fadeInUp" data-animation="fadeInUp" data-delay="600">
              <div class="services-item">
                <div class="icon">
                  <i class="lni-bullhorn"></i>
                </div>
                <h3><a href="#">Tukar Data</a></h3>
                <p>Menyediakan informasi aktual data aktifitas pengolahan lahan tani untuk seluruh masyarakat</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <!-- Team Section Start --> */}
      <section id="team" class="section-padding">
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-md-8 col-lg-8 col-xs-12 text-center">
              <h6 class="subtitle">
                Siapa di balik Lahanku
              </h6>
              <h2 class="section-title">
                Tim pengembang Aplikasi
              </h2>
              <div class="section-info">
                Fokus pada pertumbuhan sekaligus memelihara platform yang terbuka memerlukan tim eksekutif terampil yang memanfaatkan tantangan.
              </div>
            </div>            
          </div>
          <div class="row">
            <div class="col-sm-6 col-md-6 col-lg-3">
              {/* <!-- Team Item Starts --> */}
              <div class="team-item text-center">
                <div class="team-img">
                  <img class="img-fluid" src={require("../images/profile/mae1.jpg")} alt="" />
                  <div class="team-overlay">
                    <div class="overlay-social-icon text-center">
                      <ul class="social-icons">
                        <li><a href="#"><i class="lni-facebook-filled" aria-hidden="true"></i></a></li>
                        <li><a href="#"><i class="lni-twitter-filled" aria-hidden="true"></i></a></li>
                        <li><a href="#"><i class="lni-instagram-filled" aria-hidden="true"></i></a></li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div class="info-text">
                  <h3><a href="#">Mae</a></h3>
                  <p>UI/UX & Front-end Developer</p>
                </div>
              </div>
              {/* <!-- Team Item Ends --> */}
            </div>
            <div class="col-sm-6 col-md-6 col-lg-3">
              {/* <!-- Team Item Starts --> */}
              <div class="team-item text-center">
                <div class="team-img">
                  <img class="img-fluid" src={require("../images/profile/dzinsyah.jpg")} alt="" />
                  <div class="team-overlay">
                    <div class="overlay-social-icon text-center">
                      <ul class="social-icons">
                        <li><a href="#"><i class="lni-facebook-filled" aria-hidden="true"></i></a></li>
                        <li><a href="#"><i class="lni-twitter-filled" aria-hidden="true"></i></a></li>
                        <li><a href="#"><i class="lni-instagram-filled" aria-hidden="true"></i></a></li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div class="info-text">
                  <h3><a href="#">Dzinsyah</a></h3>
                  <p>Front-end Developer</p>
                </div>
              </div>
              {/* <!-- Team Item Ends --> */}
            </div>
            <div class="col-sm-6 col-md-6 col-lg-3">
              {/* <!-- Team Item Starts --> */}
              <div class="team-item text-center">
                <div class="team-img">
                  <img class="img-fluid" src={require("../images/profile/dinda.jpg")} alt="" />
                  <div class="team-overlay">
                    <div class="overlay-social-icon text-center">
                      <ul class="social-icons">
                        <li><a href="#"><i class="lni-facebook-filled" aria-hidden="true"></i></a></li>
                        <li><a href="#"><i class="lni-twitter-filled" aria-hidden="true"></i></a></li>
                        <li><a href="#"><i class="lni-instagram-filled" aria-hidden="true"></i></a></li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div class="info-text">
                  <h3><a href="#">Dinda</a></h3>
                  <p>Back-end Developer & Scientist</p>
                </div>
              </div>
              {/* <!-- Team Item Ends --> */}
            </div>
            <div class="col-sm-6 col-md-6 col-lg-3">
              {/* <!-- Team Item Starts --> */}
              <div class="team-item text-center">
                <div class="team-img">
                  <img class="img-fluid" src={require("../images/profile/ilham.jpg")} alt="" />
                  <div class="team-overlay">
                    <div class="overlay-social-icon text-center">
                      <ul class="social-icons">
                        <li><a href="#"><i class="lni-facebook-filled" aria-hidden="true"></i></a></li>
                        <li><a href="#"><i class="lni-twitter-filled" aria-hidden="true"></i></a></li>
                        <li><a href="#"><i class="lni-instagram-filled" aria-hidden="true"></i></a></li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div class="info-text">
                  <h3><a href="#">Ilham</a></h3>
                  <p>Back-end Developer</p>
                </div>
              </div>
              {/* <!-- Team Item Ends --> */}
            </div>
          </div>
        </div>
      </section>
      {/* <!-- Team Section End --> */}

      {/* <!-- Contact Section Start --> */}
      <section id="contact" class="section-padding">
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-md-8 col-lg-8 col-xs-12 text-center">
              <h6 class="subtitle">
                Kami masih banyak butuh kritik dan saran
              </h6>
              <h2 class="section-title">
                Hubungi Kami
              </h2>
              <div class="section-info">
                Lorem ipsum dolor sit amet, ut consul mediocrem abhorreant cum. Id eum dolores.
                Delicatissimi ne pri modo accusamus. Augue vitae primis antiopam nec ex rationibus.
              </div>
            </div>            
          </div>
          
          <form>
            <div class="row">
              {/* <!-- Contact form --> */}
              <div class="col-md-8">
                <div class="row">
                  <div class="col-md-6">
                    <label>Nama Anda</label>
                    <input type="text" class="form-control" id="name" name="email" required data-error="Please enter your name" />
                    <div class="help-block with-errors"></div>
                  </div>
                  <div class="col-md-6">
                    <label>Alamat surel</label>
                    <input type="email" class="form-control" id="email" name="email" required data-error="Please enter your Email" />
                    <div class="help-block with-errors"></div>
                  </div>
                </div>  
                <div class="row">
                  <div class="col-md-12">
                    <label>Pesan Anda untuk kami</label>
                    <textarea class="form-control" rows="4" id="message" name="message" required data-error="Write your message"></textarea>
                  </div>
                </div>
                {/* <!-- Submit Button --> */}
                <div class="row">
                  <div class="col-md-12">
                    <button type="submit" class="btn btn-common" id="form-submit"><i class="fa fa-paper-plane" aria-hidden="true"></i>  Kirim pesan</button>
                    <div id="msgSubmit" class="h3 text-center hidden"></div>
                  </div>
                </div>
              </div>
              
              {/* <!-- Contact info --> */}
              <div class="col-md-4 contact-right">
                <div class="contact-box">
                  <h4>Alamat</h4>
                  <p>
                    Malang <br /> Jawa Timur, Indonesia
                  </p>
                </div>
                <div class="contact-box">
                  <h4>Hubungi kami</h4>
                  <p>+62 898 465 0802</p>
                </div>
                <div class="contact-box">
                  <h4>Sapa kami</h4>
                  <p>
                    <a href="#">info@lahanku.com</a>
                  </p>
                </div>
              </div>
            </div>
          </form>
        </div>
      </section>
      {/* <!-- Contact Section End --> */}

      {/* <!-- Map Section Start --> */}
      <section id="google-map-area">
        <div class="container-fluid">
          <div class="row">
            <div class="col-12">
              <div id="conatiner-map"></div>
            </div>
          </div>
        </div>
      </section>
      {/* <!-- Map Section End --> */}

      {/* <!-- Footer Section Start --> */}

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
