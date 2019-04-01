// LIST IMPORT MODULE
import React, { Component } from 'react';
import axios from 'axios';
import { connect } from "unistore/react";
import { actions } from '../store';
import { withRouter } from "react-router-dom";
import Header from '../components/header_signin'
import Footer from '../components/footer';

//MAIN CLASS
class BlogDetail extends Component {
//   constructor (props) {
//     super(props);
//       this.state = {
//         test: ""
//       };
//   };
  render() {
    return (
        <div>
            <Header />
            {/* <div className="cover-photo">
            </div> */}
            <div className="container-fluid content-section">
                <div className="container row container-profile">
                    <div className="col-md-1"></div>
                    <div className="col-md-10 feed-post ">
                        <h2 className="text-center ">
                        Profil Teknologi Pada Usaha Tani Padi dan Implikasinya terhadap Peran Pemerintah</h2>
                        <span>Malang, 29 Maret 2019</span><br/><br/>
                        <img src={require('../images/img/tani.jpg')} className="" alt=""/><br/><br/>
                        <span>Berbagai upaya terus dilakukan untuk memenuhi kebutuhan beras nasional, 
                            diantaranya mengoptimalkan adopsi teknologi yang telah dikembangkan. Namun hal utama 
                            yang perlu diingatkan bahwa peningkatan produktivitas padi terkait erat dengan penggunaan 
                            benih didukung dengan kecukupan air irigasi dan penggunaan pupuk. Permasalahannya adalah bagaimana ketersediaan ketiga komponen tersebut dengan kondisi dana pemerintah yang terbatas. Tulisan ini bertujuan untuk menganalisis perilaku petani dalam 
                            mengadopsi teknologi usahatani padi pada kondisi pasar input dan output yang fluktuatif dan dukungan pemerintah yang semakin terbatas. Dari tulisan ini diharapkan upaya-upaya prioritas apa yang harus dilakukan pemerintah untuk mencapai peningkatan produktivitas padi dan produksi beras nasional. Berdasarkan hasil analisis maka prioritas kebijakan utama adalah penyediaan air melalui 
                            pembangunan dan perbaikan sistem irigasi yang terintegrasi dari hulu ke hilir. Disamping itu, keberadaan sistem penyuluhan sebagai sistem pendukung peningkatan produksi padi perlu ditingkatkan pemberdayaannya. </span><br/><br/>
                        <span>http://ejurnal.litbang.pertanian.go.id/index.php/akp/article/view/4319</span>
                    </div>
                    <div className="col-md-1"></div>
                </div>
            </div>
            <Footer />
        </div>
    )
  }
}

// export default Profile;
export default connect( "", actions)
(withRouter(BlogDetail))