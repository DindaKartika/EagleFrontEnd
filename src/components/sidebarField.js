import React, { Component } from "react";
import "../css/main.css";
import "../css/bootstrap.min.css";
import { Link } from "react-router-dom";
import axios from "axios";
import ListFarm from "./listSidebar";
import DateTimePicker from "react-datetime-picker";
import DatePicker from "react-datepicker";
import { withRouter } from "react-router-dom";
import { connect } from "unistore/react";
import { actions, store } from "../store";
import { storage } from "../firebase";
import Select from 'react-select'

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
class SidebarField extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deskripsi: "",
      plant_type: "",
      datePlant: new Date(),
      dateReady: new Date(),
      address: "",
      city: "",
      photos: "",
      perkiraan_panen : 0,
      image: null,
      progressFotoLahan: 0
    };
  }

  onChangePlant = datePlant => this.setState({ datePlant });
  onChangeReady = dateReady => this.setState({ dateReady });

  changeInput = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  changePlant(event) {
		this.setState({
			plant_type: event.value
		});
  }

  saveDetails = () => {
    const {
      deskripsi,
      plant_type,
      datePlant,
      dateReady,
      address,
      city,
      perkiraan_panen,
      photos
    } = this.state;
    const id = localStorage.getItem("id_farm");
    console.log(id);
    console.log("ready", dateReady);
    console.log("plant", datePlant);
    const data = {
      description: deskripsi,
      plant_type: plant_type,
      address: address,
      city: city,
      perkiraan_panen: perkiraan_panen,
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
        this.props.history.push("/maps/" + id);
      })
      .catch(error => {
        console.log(error);
      });
  };

  saveDetailsNew = () => {
    const {
      deskripsi,
      plant_type,
      datePlant,
      dateReady,
      address,
      city,
      perkiraan_panen,
      photos
    } = this.state;
    const id = localStorage.getItem("id_farm");
    console.log(id);
    console.log("ready", dateReady);
    console.log("plant", datePlant);
    const data = {
      description: deskripsi,
      plant_type: plant_type,
      address: address,
      city: city,
      perkiraan_panen: perkiraan_panen,
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
        window.location.reload();  
      })
      .catch(error => {
        console.log(error);
      });
  };

  handleFotoLahanChange = event => {
    this.setState({
      image: event.target.files[0]
    });
  };

  handleUploadFotoLahan = () => {
    const { image } = this.state;
    const self = this;

    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    uploadTask.on(
      "state_changed",
      snapshot => {
        //   progress function
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        self.setState({ progressFotoLahan: progress });
      },
      error => {
        //   error function
        console.log(error);
      },
      () => {
        //   complete function
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then(url => self.setState({ photos: url }));
      }
    );
  };

  render() {
    const coord = localStorage.getItem("koordinat");
    return (
      <div className="sidebar">
        <h5>Masukkan info tanah:</h5>
        {/* <label>{coord}</label> */}
        <form onSubmit={e => e.preventDefault()}>
          <label for="deskripsi">Deskripsi lahan:</label>
          <br />
          <input
            type="text"
            name="deskripsi"
            defaultValue=""
            onChange={e => this.changeInput(e)}
          />
          <br />
          <label>Jenis tanaman:</label>
          <br />
          <Select options={optionPlant} onChange={e => this.changePlant(e)}/>
          <br />
          <label for="planted_at">Tanggal ditanam:</label>
          <br />
          <DatePicker
            selected={this.state.datePlant}
            onChange={this.onChangePlant}
            value={this.state.datePlant}
          />
          <br />
          <label for="ready_at">Perkiraan tanggal panen:</label>
          <br />
          <DatePicker
            selected={this.state.dateReady}
            onChange={this.onChangeReady}
            value={this.state.dateReady}
          />
          <br />
          <label for="perkiraan_panen">Perkiraan Hasil Panen:</label>
          <br />
          <input
            type="text"
            name="perkiraan_panen"
            defaultValue=""
            onChange={e => this.changeInput(e)}
          /> kg
          <br />
          <label for="address">Alamat lengkap:</label>
          <br />
          <input
            type="text"
            name="address"
            defaultValue=""
            onChange={e => this.changeInput(e)}
          />
          <br />
          <label for="city">Kota:</label>
          <br />
          <input
            type="text"
            name="city"
            defaultValue=""
            onChange={e => this.changeInput(e)}
          />
          <br />
          <label for="photos">Foto lahan:</label>
          <br />
          <progress value={this.state.progressFotoLahan} max="100" />
          <br />
          <input
            type="file"
            id="photos"
            name="fotoLahan"
            onChange={this.handleFotoLahanChange}
          />
          <button onClick={this.handleUploadFotoLahan}>
            Upload foto lahan
          </button>
          <br />
          <button type="submit" onClick={() => this.saveDetails()}>
            Simpan
          </button>
          <button type="submit" onClick={() => this.saveDetailsNew()}>
            Simpan dan Buat Baru
          </button>
        </form>
      </div>
    );
  }
}

export default connect(
  "",
  actions
)(withRouter(SidebarField));
