import React, { Component } from "react";
import PropTypes, { object } from 'prop-types';
import { Link } from 'react-router-dom';
import ReactMapboxGl, {Layer, Feature, Popup} from "react-mapbox-gl";

import "./../css/bootstrap.min.css";
import "./../css/main.css";

const username  =localStorage.getItem('username')

const KontenSidebar = props => {
  const id = props.data.id
  const pemilik = props.data.pemilik
  const username = props.data.username
  const tanaman = props.data.tanaman
  const deskripsi = props.data.deskripsi
  const id_pemilik = props.data.id_pemilik
  const status_lahan = props.data.status_lahan
  // console.log('cek username', username)
  // console.log("test luas lahan", props.luas_lahan)
  return (
    // <div>
    //   <Link to={"/maps/" + props.id}>
    //     <div className="sidebar-item">
    //     <h4>{props.pemilik}</h4>
    //     <label>@{props.username}</label>
    //     <br/>
    //     <span>Tipe tanaman pada lahan:</span>
    //     {(props.tanaman == "") ? <h5>-</h5> : <h5>{props.tanaman}</h5>}
    //     <label>{props.deskripsi}</label>
    //     </div>
    //   </Link>
    //   <div style={{display : (username == props.username) ? 'block' : 'none'}}>
    //     <Link to="/profile">
    //       <button>Kunjungi Profil</button>
    //     </Link>
    //   </div>
    //   <div style={{display : (username == props.username) ? 'none' : 'block'}}>
        // <Link to={"/otherprofile/" + props.id_pemilik}>
        //   <button>Kunjungi Profil</button>
        // </Link>
    //   </div>
    // </div>
    <div class="card mb-3" style={{paddingBottom: "20px"}}>
        <div class="card-header" >
          <span style={{fontSize: "12px"}}>Tipe tanaman pada lahan: {(props.tanaman == "") ? <span>-</span> :<span>{props.tanaman}</span>}</span>
        </div>
        <div class="card-body" style={{display: 'flex'}}>
          <div className="col-md-8">
              <h4><strong>{props.pemilik}</strong></h4>
              <label style={{display: (props.pemilik=="")? 'block':'none'}}>@{props.username}</label>
          </div>
          <div className="col-md-4">
            <h6>Pemilik Lahan:</h6>
              <img src={
                (props.tanaman=='Beras') ? "https://img.icons8.com/office/80/000000/barley.png":
                ((props.tanaman=='Cabai') ? 'none' : 'none')}/>
              {/* {props.luas_lahan} m<sup>2</sup> */}
          </div>
        </div>
        <div className="card-link">
          <Link to={"/otherprofile/" + props.id_pemilik}>
            <button className="btn btn-secondary">Info Pemilik Lahan</button>
          </Link>
          <Link to={"/maps/" + props.id}>
            <button className="btn btn-secondary">Info Lahan</button>
          </Link>
        </div>
      </div>

  // <div class="card border-dark mb-3">
  //   <div class="card-header" style={{backgroundColor: "#1fcaa7"}}>
  //     <span style={{fontSize: "12px"}}>Tipe tanaman pada lahan: {(props.tanaman == "") ? <span>-</span> :<span>{props.tanaman}</span>}</span>
  //   </div>
  //   <div class="card-body text-dark row">
  //     <div className="col-md-4">
        
  //     </div>
  //     <div className="col-md-8">
  //       <h6>Pemilik Lahan:</h6>
  //         <h4><strong>{props.pemilik}</strong></h4>
  //         <label style={{display: (props.pemilik=="")? 'block':'none'}}>@{props.username}</label>
  //         {props.luas_lahan} m<sup>2</sup>
  //     </div>
  //     <div className="card-link">
  //       <Link to={"/otherprofile/" + props.id_pemilik}>
  //         <button className="link-card">Info Pemilik Lahan</button>
  //       </Link>
  //       <Link to={"/maps/" + props.id}>
  //         <button className="link-card">Info Lahan</button>
  //       </Link>
  //     </div>
      
    //    <div>
    //     <hr />
    //     <label>Status tanah dijual: <br/>{props.status_lahan}</label>
    //   </div>
    //      <div className="col-md-4">



          
    //     </div> 
    //     </div>
    //   <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    // </div>
    
  );

}

KontenSidebar.propTypes = {
  id:PropTypes.number,
  id_pemilik:PropTypes.number,
  pemilik:PropTypes.string,
  username:PropTypes.string,
  tanaman:PropTypes.string,
  deskripsi:PropTypes.string,
  status_lahan:PropTypes.string,
  luas_lahan:PropTypes.number,
  data : PropTypes.string
}

export default KontenSidebar;