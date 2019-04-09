import React, { Component } from "react";
import ReactDOM from "react-dom";
import ReactMapboxGl, {Layer, Feature} from "react-mapbox-gl";
import DrawControl from "react-mapbox-gl-draw";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
import Header from '../components/navbar'
import SidebarMap from '../components/sidebarMap'
import FilterMap from '../components/filter'
import Select from 'react-select'
import DatePicker from "react-datepicker";
import axios from 'axios'
import { Link } from "react-router-dom";

import mapboxgl from 'mapbox-gl'
import { read } from "fs";

const optionPlant = [
  {value:'Bahan Pokok', label:'--- Bahan Pokok ---', isDisabled:true},
  {value:'Padi', label:'Padi'},
  {value:'Jagung', label:'Jagung'},
  {value:'Ubi', label:'Ubi'},
  {value:'Kentang', label:'Kentang'},
  {value:'Sayur', label:'--- Sayur ---', isDisabled:true},
  {value:'Kangkung', label:'Kangkung'},
  {value:'Kubis', label:'Kubis'},
  {value:'Lobak', label:'Lobak'},
  {value:'Mentimun', label:'Mentimun'},
  {value:'Sawi', label:'Sawi'},
  {value:'Terung', label:'Terung'},
  {value:'Tomat', label:'Tomat'},
  {value:'Wortel', label:'Wortel'},
  {value:'Lain-lain', label:'--- Lain-lain ---', isDisabled:true},
  {value:'Bawang Merah', label:'Bawang Merah'},
  {value:'Bawang Putih', label:'Bawang Putih'},
  {value:'Cabai', label:'Cabai'},
  {value:'Kacang Hijau', label:'Kacang Hijau'},
  {value:'Kacang Panjang', label:'Kacang Panjang'},
  {value:'Kacang Tanah', label:'Kacang Tanah'},
  {value:'Kedelai', label:'Kedelai'},
  {value:'Kelapa', label:'Kelapa'}
]

const waUrl = "https://web.whatsapp.com/send?phone=";

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
			rekomendasi : "",
			popupProfile : false,
			plantedAt : new Date(),
			readyAt : new Date(),
			photos: "",
			perkiraan_panen: 0,
			tanah : false
			// center : [],
			// koordinat : []
		};
		this.UbahInfo = this.UbahInfo.bind(this)
		this.handleInputChange = this.handleInputChange.bind(this)
    }
    
    UNSAFE_componentWillMount () {
			const self = this;
			console.log(window.location.pathname.slice(6))
			axios
			.get('http://0.0.0.0:5000/farms/' + window.location.pathname.slice(6))
			.then(function(response){
				const farms = response.data
				farms['readyAt'] = response.data.ready_at.slice(5,16)
				farms['plantedAt'] = response.data.planted_at.slice(5,16)
				self.setState({Farms: farms});
				self.setState({plantedAt: new Date(response.data.planted_at)});
				self.setState({readyAt: new Date(response.data.ready_at)});
				// console.log('date ready at', new Date(response.data.ready_at))
				console.log('Farms', response.data);
				self.setState({user : response.data.user})
				self.setState({photos : response.data.photos})
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
				if (response.data.status_lahan == 'dijual'){
					self.setState({tanah : true})
				}
				else if (response.data.status_lahan == 'tidak'){
					self.setState({tanah : false})
				}
				// (response.data.status_lahan == 'dijual') ? (this.setState({tanah : true})) : (this.setState({tanah : true}))
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
			plantedAt,
			readyAt,
            address,
			farm_size,
			perkiraan_panen,
			tanah
    } = this.state;
    const id = localStorage.getItem("id_farm");
    console.log(id);
    const data = {
      description: deskripsi,
      plant_type: plant_type,
      planted_at: plantedAt.toISOString(),
      ready_at: readyAt.toISOString(),
      address: address,
			farm_size : farm_size,
			perkiraan_panen : perkiraan_panen,
			status_lahan : String(tanah)
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

	PopupProfile = () => {
    this.setState({popupProfile : true})
	};
	NotPopupProfile = () => {
    this.setState({popupProfile : false})
	};

	onChangePlantedAt = plantedAt => this.setState({ plantedAt });
	onChangeReadyAt = readyAt => this.setState({ readyAt });
	
	changeInput = e => {
    this.setState({ [e.target.name]: e.target.value });
	};
	
	handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  render() {
		console.log(this.state.sidebar)
		const {center, koordinat, Farms, user, ubahInfo, rekomendasi, popupProfile, plantedAt, readyAt, tanah} = this.state
		console.log('center', center)
		console.log('koordinat', koordinat)
		console.log('state', ubahInfo)

    return (
      	<div className="App">
			<div className="header">
				<Header/>
			</div>
			<div className="sidebar">
				<div class="card">
					<img class="card-img-top" src={Farms.photos} alt="Card image cap" style={{width: "100%"}}/>
					<div class="card-body">
						{/* <h5 class="card-title">Card title</h5>
						<p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p> */}
						<label>Nama pemilik: </label>
						<h5 style={{display : (username == user.username ? 'block' : 'none')}}>{user.username}</h5>
						<div style={{display : ((username == user.username) ? 'none' : 'block')}} onMouseEnter={() => this.PopupProfile()} onMouseLeave={() => this.NotPopupProfile()}>
					<Link to={"/otherprofile/" + user.id}><h5>{user.username}</h5></Link>
					</div>
				<label>Deskripsi : </label>
				<input style={{display: !(ubahInfo) ? 'none' : 'block' }} type="text" name="deskripsi" onChange={e => this.changeInput(e)} defaultValue={Farms.deskripsi}/>
				<h5 style={{display: (ubahInfo) ? 'none' : 'block' }}>{Farms.deskripsi}</h5>
					</div>
					<ul class="list-group list-group-flush">
						<li class="list-group-item">
							<label>Jenis tanaman : </label>
							<h5 style={{display: (ubahInfo) ? 'none' : 'block' }}>{Farms.plant_type}</h5>
							<div style={{display: !(ubahInfo) ? 'none' : 'block' }}>
								<Select options={optionPlant} onChange={e => this.changePlant(e)} placeholder={Farms.plant_type}/>	
							</div>
						</li>
						<li class="list-group-item">
							<label>Tanggal ditanam : </label>
							<h5 style={{display: (ubahInfo) ? 'none' : 'block' }}>{Farms.plantedAt}</h5>
							<div style={{display: !(ubahInfo) ? 'none' : 'block' }}>
								<DatePicker
									selected={plantedAt}
									onChange={this.onChangePlantedAt}
									value={plantedAt}
								/>
							</div>
						</li>
						<li class="list-group-item">
							<label>Perkiraan tanggal panen : </label>
							<h5 style={{display: (ubahInfo) ? 'none' : 'block' }}>{Farms.readyAt}</h5>
							<div style={{display: !(ubahInfo) ? 'none' : 'block' }}>
								<DatePicker
									selected={readyAt}
									onChange={this.onChangeReadyAt}
									value={readyAt}
								/>
							</div>
						</li>
						<li class="list-group-item">
							<label>Alamat : </label>
							<h5 style={{display: (ubahInfo) ? 'none' : 'block' }}>{Farms.address}</h5>
							<input style={{display: !(ubahInfo) ? 'none' : 'block' }} type="text" name="address" onChange={e => this.changeInput(e)} defaultValue={Farms.address}/>
							<label>Kota : </label>
							<h5>{Farms.city}</h5>
						</li>
						<li class="list-group-item">
							<label>Luas : </label>
							<h5 style={{display: (ubahInfo) ? 'none' : 'block' }}>{Farms.farm_size} M<sup>2</sup></h5>
							<input style={{display: !(ubahInfo) ? 'none' : 'block' }} type="text" name="farm_size" onChange={e => this.changeInput(e)} defaultValue={Farms.farm_size}/>
							<label>Ketinggian : </label>
							<h5>{Farms.ketinggian} mdpl</h5>
							<label>Perkiraan hasil panen : </label>
							<h5 style={{display: (ubahInfo) ? 'none' : 'block' }}>{Farms.perkiraan_panen} kg</h5>
							<input style={{display: !(ubahInfo) ? 'none' : 'block' }} type="text" name="perkiraan_panen" onChange={e => this.changeInput(e)} defaultValue={Farms.perkiraan_panen}/>
							<label>Kategori : </label>
							<h5 style={{display: (ubahInfo) ? 'none' : 'block' }}>{Farms.category}</h5>
						</li>
						<li class="list-group-item">
							<label>Status Lahan</label>
							<h5 style={{display: (ubahInfo) ? 'none' : 'block' }}>{Farms.status_lahan}</h5>
							<div style={{display: !(ubahInfo) ? 'none' : 'block' }}>
								<input name="tanah" type="checkbox" checked={tanah} onChange={this.handleInputChange} /> Lahan Dijual
							</div>
						</li>
						<li class="list-group-item">
							<div style={{display : (username == user.username ? 'block' : 'none')}}>
								<button style={{display: (ubahInfo) ? 'none' : 'block' }} onClick={this.UbahInfo}>Edit</button>
								<button style={{display: !(ubahInfo) ? 'none' : 'block' }} onClick={() => this.EditInfo()}>Simpan</button>
							</div>
							<hr/>
							<label>Rekomendasi tanaman : </label>
								<label>{rekomendasi}</label>
						</li>

					</ul>
					<div class="card-body">
					<a
							href={waUrl + user.phone_number}
							class="wa-float"
							target="_blank"
						>
							<button className="btn btn-outline-success" style={{width: '200px'}}>Kirim Pesan</button>
						</a>
						{/* <a href="#" class="card-link">Another link</a> */}
					</div>
				</div>
			</div>
			<div style={{display: (popupProfile) ? 'block' : 'none' }} className="PopupProfile" onMouseEnter={() => this.PopupProfile()} onMouseLeave={() => this.NotPopupProfile()}>
				<div className="row">
					<div className="col-4">
						<img src={user.profile_picture} style={{maxWidth: "100%", maxHeight: "100px"}}/>
					</div>
					<div className="col-8">
						<Link to={"/otherprofile/" + user.id}>
							<h5>{user.display_name}</h5>
							<h5>@{user.username}</h5>
						</Link>
						<a
							href={waUrl + user.phone_number}
							class="wa-float"
							target="_blank"
						>
							<button className="btn btn-outline-success" style={{width: '200px'}}>Kirim Pesan</button>
						</a>
					</div>
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
