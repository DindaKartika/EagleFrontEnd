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
  const farm_size = props.data.luas
  return (
    <div class="card mb-3" style={{paddingBottom: "20px"}}>
        <div class="card-header" >
          <span style={{fontSize: "12px"}}>Tipe tanaman pada lahan: {(tanaman == "") ? <span>-</span> :<span>{props.tanaman}</span>}</span>
        </div>
        <div class="card-body" style={{display: 'flex'}}>
          <div className="col-md-8">
            <label>Pemilik Lahan :</label>
              <h4><strong>{pemilik}</strong></h4>
              <label style={{display: (pemilik=="")? 'block':'none'}}>@{username}</label>
            <label>Luas lahan :</label>
            <h4>{farm_size} m<sup>2</sup></h4>
          </div>
          <div className="col-md-4">
            <h6>Pemilik Lahan:</h6>
              {/* <img src={
                (tanaman=='Beras') ? "https://img.icons8.com/office/80/000000/barley.png":
                ((tanaman=='Cabai') ? 'none' : 'none')}/> */}
                <img src={require('../images/ico/icons8-barley-80.png')}/>
                
          </div>
        </div>
        <div className="card-link">
          <Link to={"/otherprofile/" + id_pemilik}>
            <button className="btn btn-secondary">Info Pemilik Lahan</button>
          </Link>
          <Link to={"/maps/" + id}>
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
  // id:PropTypes.number,
  // id_pemilik:PropTypes.number,
  // pemilik:PropTypes.string,
  // username:PropTypes.string,
  // tanaman:PropTypes.string,
  // deskripsi:PropTypes.string,
  // status_lahan:PropTypes.string,
  // luas_lahan:PropTypes.number,
  data : PropTypes.string
}

export default KontenSidebar;