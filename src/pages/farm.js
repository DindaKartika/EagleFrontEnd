import React, { Component } from "react";
import ReactDOM from "react-dom";
import ReactMapboxGl, {Layer, Feature} from "react-mapbox-gl";
import DrawControl from "react-mapbox-gl-draw";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
import Header from '../components/header_signin'
import SidebarMap from '../components/sidebarMap'
import FilterMap from '../components/filter'
import Select from 'react-select'
import DatePicker from "react-datepicker";
import axios from 'axios'
import { Link } from "react-router-dom";

import mapboxgl from 'mapbox-gl'

const optionPlant = [
  {value:'Bahan Pokok', label:'--- Bahan Pokok ---', isDisabled:true},
  {value:'Beras', label:'Beras'},
  {value:'Gandum', label:'Gandum'},
  {value:'Jagung', label:'Jagung'},
  {value:'Sagu', label:'Sagu'},
  {value:'Sayur', label:'--- Sayur ---', isDisabled:true},
  {value:'Bayam', label:'Bayam'},
  {value:'Cabai', label:'Cabai'},
  {value:'Kangkung', label:'Kangkung'},
  {value:'Mentimun', label:'Mentimun'},
  {value:'Sawi', label:'Sawi'},
  {value:'Terung', label:'Terung'},
  {value:'Tomat', label:'Tomat'},
  {value:'Buah', label:'--- Buah ---', isDisabled:true},
  {value:'Apel', label:'Apel'},
  {value:'Durian', label:'Durian'},
  {value:'Jeruk', label:'Jeruk'},
  {value:'Mangga', label:'Mangga'},
  {value:'Melon', label:'Melon'},
  {value:'Nangka', label:'Nangka'},
  {value:'Pisang', label:'Pisang'},
  {value:'Semangka', label:'Semangka'},
  {value:'Lain-lain', label:'--- Lain-lain ---', isDisabled:true},
  {value:'Coklat', label:'Coklat'},
  {value:'Teh', label:'Teh'},
  {value:'Tebu', label:'Tebu'},
  {value:'Kelapa', label:'Kelapa'},
  {value:'Kopi', label:'Kopi'}
]

const Map = ReactMapboxGl({
  accessToken:
    "pk.eyJ1IjoiZGthcnRpa2EiLCJhIjoiY2p0ejY1c3FmMzExejQxcGNmcmZoaGhtMCJ9.FnTBMWoUi17BhvjRQ0e2mw"
});

const polygonPaint = {
  'fill-color': '#00CED1',
  'fill-opacity': 1
};

const username  =localStorage.getItem('username')

class Farm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			filter: false,
			date : new Date(),
			kota : "",
			tanaman : "",
			sidebar : false,
			Farms : "",
			user : "",
			ubahInfo : false,
			rekomendasi : ""
			// center : [],
			// koordinat : []
		};
		this.UbahInfo = this.UbahInfo.bind(this)
    }
    
    UNSAFE_componentWillMount () {
			const self = this;
			console.log(window.location.pathname.slice(6))
			axios
			.get('http://0.0.0.0:5000/farms/' + window.location.pathname.slice(6))
			.then(function(response){
				self.setState({Farms: response.data});
				console.log('Farms', response.data);
				self.setState({user : response.data.user})
				localStorage.setItem('id_farm', response.data.id_farm)
				const koordinat = []
				koordinat.push(JSON.parse(response.data.coordinates))
				console.log('coord jadi', koordinat)
				self.setState({koordinat: koordinat})
				const centers = JSON.parse(response.data.center)
				console.log(centers)
				self.setState({center:centers})
				if (response.data.zona == "zona iklim panas"){self.setState({rekomendasi : "padi, tebu, kelapa, cokelat, dan jagung"})}
				else if (response.data.zona == "zona iklim sedang"){self.setState({rekomendasi : "Teh, kina, kopi, karet, cokelat, dan sayuran"})}
				else if (response.data.zona == "zona iklim sejuk"){self.setState({rekomendasi : "Pohon pinus, cemara, dan beberapa jenis sayuran seperti kentang"})}
			})
			.catch(function(error){
				console.log('error', error);
			})
		}

	UbahInfo() {
		this.setState(prevState => ({
			ubahInfo: !prevState.ubahInfo
			}));
	}

	changePlant(event) {
		this.setState({
			plant_type: event.value
		});
  }

	EditInfo = () => {
    const {
      deskripsi,
      plant_type,
      // datePlant,
      // dateReady,
      address,
      city,
      photos
    } = this.state;
    const id = localStorage.getItem("id_farm");
    console.log(id);
    // console.log("ready", dateReady);
    // console.log("plant", datePlant);
    const data = {
      description: deskripsi,
      plant_type: plant_type,
      // planted_at: datePlant.toISOString(),
      // ready_at: dateReady.toISOString(),
      address: address,
      city: city,
      photos: photos
    };
    console.log(data);

    const tokens = localStorage.getItem('token')

    const self = this;
    axios
      .put("http://0.0.0.0:5000/farms/" + id, data, {
        headers: {
          Authorization: "Bearer " + tokens
        }
      })
      .then(response => {
        console.log("testtt dooooooooooooooooooooooooooong", response.data);
        window.location.reload()
      })
      .catch(error => {
        console.log(error);
      });
	};
	
	changeInput = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
		console.log(this.state.sidebar)
		const {center, koordinat, Farms, user, ubahInfo, rekomendasi} = this.state
		console.log('center', center)
		console.log('koordinat', koordinat)
		console.log('state', ubahInfo)

    return (
      <div className="App">
				<div className="header">
					<Header/>
				</div>
				<div className="sidebar">
					<h5>Informasi Lahan:</h5>
					<label>Nama pemilik: </label>
					<h5 style={{display : (username == user.username ? 'block' : 'none')}}>{user.username}</h5>
					<div style={{display : ((username == user.username) ? 'none' : 'block')}}>
						<Link to={"/otherprofile/" + user.id}><h5>{user.username}</h5></Link>
					</div>
					<label>Deskripsi : </label>
					<h5 style={{display: (ubahInfo) ? 'none' : 'block' }}>{Farms.deskripsi}</h5>
					<input style={{display: !(ubahInfo) ? 'none' : 'block' }} type="text" name="deskripsi" onChange={e => this.changeInput(e)} defaultValue={Farms.deskripsi}/>
					<label>Jenis tanaman : </label>
					<h5 style={{display: (ubahInfo) ? 'none' : 'block' }}>{Farms.plant_type}</h5>
					<div style={{display: !(ubahInfo) ? 'none' : 'block' }}>
						<Select options={optionPlant} onChange={e => this.changePlant(e)} placeholder={Farms.plant_type}/>	
					</div>
					<label>Tanggal ditanam : </label>
					<h5 style={{display: (ubahInfo) ? 'none' : 'block' }}>{Farms.planted_at}</h5>
					<div style={{display: !(ubahInfo) ? 'none' : 'block' }}>
						{/* <DatePicker
							selected={Farms.planted_at}
							onChange={this.onChangePlantedAt}
							value={Farms.planted_at}
						/> */}
					</div>
					<label>Perkiraan tanggal panen : </label>
					<h5 style={{display: (ubahInfo) ? 'none' : 'block' }}>{Farms.ready_at}</h5>
					<div style={{display: !(ubahInfo) ? 'none' : 'block' }}>
						{/* <DatePicker
							selected={Farms.ready_at}
							onChange={this.onChangeReadyAt}
							value={Farms.planted_at}
						/> */}
					</div>
					<label>Alamat : </label>
					<h5 style={{display: (ubahInfo) ? 'none' : 'block' }}>{Farms.address}</h5>
					<input style={{display: !(ubahInfo) ? 'none' : 'block' }} type="text" name="address" onChange={e => this.changeInput(e)} defaultValue={Farms.address}/>
					<label>Kota : </label>
					<h5>{Farms.city}</h5>
					<label>Luas : </label>
					<h5>{Farms.farm_size} m<sup>2</sup></h5>
					<label>Kategori : </label>
					<h5 style={{display: (ubahInfo) ? 'none' : 'block' }}>{Farms.category}</h5>
					<div style={{display : (username == user.username ? 'block' : 'none')}}>
						<button style={{display: (ubahInfo) ? 'none' : 'block' }} onClick={this.UbahInfo}>Edit</button>
						<button style={{display: !(ubahInfo) ? 'none' : 'block' }} onClick={() => this.EditInfo()}>Simpan</button>
						<hr/>
						<label>Rekomendasi tanaman : </label>
						<label>{rekomendasi}</label>
					</div>
				</div>
				<div>
					<Map
						style="mapbox://styles/mapbox/satellite-v9"
						containerStyle={{
							height: "90vh",
							width: "80vw"
						}}
						center={center}
						zoom={[16.5]}
					>
						<Layer type="fill" paint={polygonPaint}>
							<Feature coordinates={koordinat} />
						</Layer>
					</Map>
				</div>
      </div>
    );
  }
}

export default Farm;
