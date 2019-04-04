// LIST IMPORT MODULE
import React, { Component } from 'react';
import axios from 'axios';
import { connect } from "unistore/react";
import { actions } from '../store';
import { withRouter } from "react-router-dom";
import Header from '../components/header_signin'
import Footer from '../components/footer';
import{ Link } from "react-router-dom";
import '../css/landing.css';
import '../css/main2.css'
import '../fonts/line-icons.css'
import '../css/main.css';
import '../css/bootstrap.min.css';

//MAIN CLASS
class LandingPage extends Component {
    componentDidMount() {
        // console.log("Welcome to the landing page")
        (function() {

            "use strict";
          
            var	$body = document.querySelector('body');
          
            // Methods/polyfills.
              // canUse
                window.canUse=function(p){if(!window._canUse)window._canUse=document.createElement("div");var e=window._canUse.style,up=p.charAt(0).toUpperCase()+p.slice(1);return p in e||"Moz"+up in e||"Webkit"+up in e||"O"+up in e||"ms"+up in e};
              // window.addEventListener
                (function(){if("addEventListener"in window)return;window.addEventListener=function(type,f){window.attachEvent("on"+type,f)}})();
            // Play initial animations on page load.
                window.addEventListener('load', function() {
                    window.setTimeout(function() {
                    $body.classList.remove('is-preload');
                    }, 100);
                });
          
            // Slideshow Background.
              (function() {
                // Settings.
                  var settings = {
                    // Images (in the format of 'url': 'alignment').
                        images: {
                            // 'images/bg01.jpg': 'center',
                            // 'images/bg02.jpg': 'center',
                            // 'images/bg03.jpg': 'center'
                            'images/map1.png': 'center',
                            'images/map2.png': 'center',
                            'images/map3.png': 'center',
                            'images/map4.png': 'center',
                        },
                        // Delay.
                        delay: 6000
                    };
                    // Vars.
                    var	pos = 0, lastPos = 0,
                        $wrapper, $bgs = [], $bg,
                        k, v;
                    // Create BG wrapper, BGs.
                    $wrapper = document.createElement('div');
                        $wrapper.id = 'bg';
                        $body.appendChild($wrapper);
                    for (k in settings.images) {
                        // Create BG.
                        $bg = document.createElement('div');
                            $bg.style.backgroundImage = 'url("' + k + '")';
                            $bg.style.backgroundPosition = settings.images[k];
                            $wrapper.appendChild($bg);
                        // Add it to array.
                        $bgs.push($bg);
                    }
                // Main loop.
                    $bgs[pos].classList.add('visible');
                    $bgs[pos].classList.add('top');
                    // Bail if we only have a single BG or the client doesn't support transitions.
                        if ($bgs.length == 1
                        ||	!window.canUse('transition'))
                        return;
                    window.setInterval(function() {
                        lastPos = pos;
                        pos++;
                        // Wrap to beginning if necessary.
                        if (pos >= $bgs.length)
                            pos = 0;
                        // Swap top images.
                        $bgs[lastPos].classList.remove('top');
                        $bgs[pos].classList.add('visible');
                        $bgs[pos].classList.add('top');
                        // Hide last image after a short delay.
                        window.setTimeout(function() {
                            $bgs[lastPos].classList.remove('visible');
                        }, settings.delay / 2);
                    }, settings.delay);
                })();

            // Signup Form.
              (function() {
          
                // Vars.
                  var $form = document.querySelectorAll('#signup-form')[0],
                    $submit = document.querySelectorAll('#signup-form input[type="submit"]')[0],
                    $message;
          
                // Bail if addEventListener isn't supported.
                  if (!('addEventListener' in $form))
                    return;
          
                // Message.
                  $message = document.createElement('span');
                    $message.classList.add('message');
                    $form.appendChild($message);
                  $message._show = function(type, text) {
                    $message.innerHTML = text;
                    $message.classList.add(type);
                    $message.classList.add('visible');
                    window.setTimeout(function() {
                      $message._hide();
                    }, 3000);
                  };
                  $message._hide = function() {
                    $message.classList.remove('visible');
                  };
                // Events.
                // Note: If you're *not* using AJAX, get rid of this event listener.
                  $form.addEventListener('submit', function(event) {
                    event.stopPropagation();
                    event.preventDefault();
                    // Hide message.
                      $message._hide();
                    // Disable submit.
                      $submit.disabled = true;
                    // Process form.
                    // Note: Doesn't actually do anything yet (other than report back with a "thank you"),
                    // but there's enough here to piece together a working AJAX submission call that does.
                      window.setTimeout(function() {
                        // Reset form.
                          $form.reset();
                        // Enable submit.
                          $submit.disabled = false;
                        // Show message.
                          $message._show('success', 'ok!');
                        //   $message._show('failure', 'Something went wrong. Please try again.');
                        console.log("test")
                        window.location = "/landinginfo";
                    }, 750);
                    
                });
            })();     
        })();
    }

    redirect() {
        console.log("test")
    }
    render() {
        return (
            <div className="landing-page">
                <div class="is-preload">
                    {/* <!-- Header --> */}
                    <header id="header">
                    {/* <h1>Eventually</h1> */}
                    {/* logo-alterra-academy-plain.png */}
                    <img className="logo-footer" src={require("../images/logo/testlogo9.png")} alt="" />
                    <p>Situs pemetaan lahan terbuka untuk umum<br />
                    Pertama kali di Indonesia</p>
                    </header>
                    {/* <!-- Signup Form --> */}
                    <form id="signup-form" method="post" action="#">
                    {/* <input type="email" name="email" id="email" placeholder="Email Address" /> */}
                    <input type="submit" value="Info lebih lanjut" />
                    </form>

                    <Link to="/maps" className="btn btn-success"><span className="cwhite">Peta</span></Link>
                    <Link to="/newsfeed" className="btn btn-success"><span className="cwhite">Beranda</span></Link>
                    <Link to="/signin" className="btn btn-success"><span className="cwhite">Masuk</span></Link>
                    {/* <!-- Footer --> */}

                    <footer id="footer">
                    <ul class="icons">
                        <li><a href="#" class="icon fa-twitter"><span class="label">Twitter</span></a></li>
                        <li><a href="#" class="icon fa-instagram"><span class="label">Instagram</span></a></li>
                        <li><a href="#" class="icon fa-github"><span class="label">GitHub</span></a></li>
                        <li><a href="#" class="icon fa-envelope-o"><span class="label">Email</span></a></li>
                    </ul>

                    {/* <ul class="copyright">
                        <li>&copy; Untitled.</li><li>Credits: <a href="http://html5up.net">HTML5 UP</a></li>
                    </ul> */}
                    </footer>
                    {/* <!-- Scripts --> */}
                    <script src="assets/js/main.js"></script>
                </div>
            </div>
            )
        }
    }

// export default Profile;
export default connect( "", actions)
(withRouter(LandingPage));