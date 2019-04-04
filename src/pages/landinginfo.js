import React, { Component } from 'react';
import Header from "../components/header_signin";
import '../css/main2.css'
import '../fonts/line-icons.css'

class LandingInfo extends Component {
  render() {
    return (
      <div className="landing-info">
    {/* <!-- Header Area wrapper Starts --> */}
      <Header />
      
      {/* <!-- Intro Section Start --> */}
      <section class="intro">
        <div class="container">
          <div class="row text-center">
            <div class="col-md-12 col-sm-12 col-xs-12">
              <div class="heading-count">
                <h2>Coming Soon</h2>
                <p>Our exciting new website is coming soon! Check back later...</p>
              </div>
            </div>
            <div class="col-md-12 col-sm-12 col-xs-12">
              <div class="row countdown justify-content-center">
                <div id="clock" class="time-count"></div>
              </div>
              <a href="#contact" class="btn btn-common">Contact Us</a>
              <a href="#team" class="btn btn-border">About Us</a>
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
                What We Do
              </h6>
              <h2 class="section-title">
                We Provide Creative Solutions
              </h2>
              <div class="section-info">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sed nulla neque 
                tempore rerum dolore accusamus, eum, officia nostrum sequi explicabo aspernatur asperiores.
              </div>
            </div>            
          </div>
          
          <div class="row">
            <div class="col-lg-4 col-md-6 col-xs-12 fadeInUp" data-animation="fadeInUp">
              <div class="services-item">
                <div class="icon">
                  <i class="lni-brush"></i>
                </div>
                <h3><a href="#">Web Design</a></h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maiores incidunt laboriosam harum, voluptatem fugiat perspiciatis.</p>
              </div>
            </div> 
            <div class="col-lg-4 col-md-6 col-xs-12 fadeInUp" data-animation="fadeInUp" data-delay="300">
              <div class="services-item">
                <div class="icon">
                  <i class="lni-mobile"></i>
                </div>
                <h3><a href="#">App Development</a></h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maiores incidunt laboriosam harum, voluptatem fugiat perspiciatis.</p>
              </div>
            </div> 
            <div class="col-lg-4 col-md-6 col-xs-12 fadeInUp" data-animation="fadeInUp" data-delay="600">
              <div class="services-item">
                <div class="icon">
                  <i class="lni-bullhorn"></i>
                </div>
                <h3><a href="#">Internet Marketing</a></h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maiores incidunt laboriosam harum, voluptatem fugiat perspiciatis.</p>
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
                Meet Our
              </h6>
              <h2 class="section-title">
                Our awesome team
              </h2>
              <div class="section-info">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sed nulla neque 
                tempore rerum dolore accusamus, eum, officia nostrum sequi explicabo aspernatur asperiores.
              </div>
            </div>            
          </div>
          <div class="row">
            <div class="col-sm-6 col-md-6 col-lg-3">
              {/* <!-- Team Item Starts --> */}
              <div class="team-item text-center">
                <div class="team-img">
                  <img class="img-fluid" src="assets/img/team/team-01.jpg" alt="" />
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
                  <h3><a href="#">Emilly Williams</a></h3>
                  <p>Product Designer</p>
                </div>
              </div>
              {/* <!-- Team Item Ends --> */}
            </div>
            <div class="col-sm-6 col-md-6 col-lg-3">
              {/* <!-- Team Item Starts --> */}
              <div class="team-item text-center">
                <div class="team-img">
                  <img class="img-fluid" src="assets/img/team/team-02.jpg" alt="" />
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
                  <h3><a href="#">Patric Green</a></h3>
                  <p>Front-end Developer</p>
                </div>
              </div>
              {/* <!-- Team Item Ends --> */}
            </div>
            <div class="col-sm-6 col-md-6 col-lg-3">
              {/* <!-- Team Item Starts --> */}
              <div class="team-item text-center">
                <div class="team-img">
                  <img class="img-fluid" src="assets/img/team/team-03.jpg" alt="" />
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
                  <h3><a href="#">Paul Kowalsy</a></h3>
                  <p>Lead Designer</p>
                </div>
              </div>
              {/* <!-- Team Item Ends --> */}
            </div>
            <div class="col-sm-6 col-md-6 col-lg-3">
              {/* <!-- Team Item Starts --> */}
              <div class="team-item text-center">
                <div class="team-img">
                  <img class="img-fluid" src="assets/img/team/team-04.jpg" alt="" />
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
                  <h3><a href="#">Jhon Doe</a></h3>
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
                Connect With Us
              </h6>
              <h2 class="section-title">
                Get in Touch
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
                    <label>Your Name</label>
                    <input type="text" class="form-control" id="name" name="email" required data-error="Please enter your name" />
                    <div class="help-block with-errors"></div>
                  </div>
                  <div class="col-md-6">
                    <label>Your E-mail</label>
                    <input type="email" class="form-control" id="email" name="email" required data-error="Please enter your Email" />
                    <div class="help-block with-errors"></div>
                  </div>
                </div>  
                <div class="row">
                  <div class="col-md-12">
                    <label>Your Message</label>
                    <textarea class="form-control" rows="4" id="message" name="message" required data-error="Write your message"></textarea>
                  </div>
                </div>
                {/* <!-- Submit Button --> */}
                <div class="row">
                  <div class="col-md-12">
                    <button type="submit" class="btn btn-common" id="form-submit"><i class="fa fa-paper-plane" aria-hidden="true"></i>  Send Message</button>
                    <div id="msgSubmit" class="h3 text-center hidden"></div>
                  </div>
                </div>
              </div>
              
              {/* <!-- Contact info --> */}
              <div class="col-md-4 contact-right">
                <div class="contact-box">
                  <h4>Address</h4>
                  <p>
                    1900 Pico Blvd, New York <br /> Centernial, colorado
                  </p>
                </div>
                <div class="contact-box">
                  <h4>Call Us</h4>
                  <p>+48 123 456 789</p>
                </div>
                <div class="contact-box">
                  <h4>Say Hello</h4>
                  <p>
                    <a href="#">info@example.com</a>
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
      <footer class="footer-area section-padding">
        <div class="container">
          <div class="row">
            <div class="col-md-12">
              <div class="footer-text text-center">
                <ul class="social-icon">
                  <li>
                    <a class="facebook" href="#"><i class="lni-facebook-filled"></i></a>
                  </li>
                  <li>
                    <a class="twitter" href="#"><i class="lni-twitter-filled"></i></a>
                  </li>
                  <li>
                    <a class="instagram" href="#"><i class="lni-instagram-filled"></i></a>
                  </li>
                  <li>
                    <a class="instagram" href="#"><i class="lni-google-plus"></i></a>
                  </li>
                </ul>
                {/* <p>Copyright © 2018 <a href="www.uideck.com"></a>| Crafted by <a href="#" target="_blank">UIdeck</a></p> */}
              </div>
            </div>
          </div>
        </div>
      </footer>
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

      <script src="assets/js/jquery-min.js"></script>
      <script src="assets/js/main.js"></script>
      {/* </script> */}
        
    </div>
    );
  }
}

export default LandingInfo;
