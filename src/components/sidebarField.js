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

const tokens =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE1NTQwOTU2OTgsIm5iZiI6MTU1NDA5NTY5OCwianRpIjoiMWRjZTg1NjktMGU5My00MDY3LTk0NWMtNGE1YTFiZDA4NWE5IiwiZXhwIjoxNTU0MTgyMDk4LCJpZGVudGl0eSI6eyJpZCI6MSwidXNlcm5hbWUiOiJEaW5kYSIsImVtYWlsIjoiZGluZGFAeHl6LmNvbSIsImRpc3BsYXlfbmFtZSI6IiIsImhlYWRsaW5lIjoiIiwicHJvZmlsZV9waWN0dXJlIjoiaHR0cHM6Ly9jZG4ucGl4YWJheS5jb20vcGhvdG8vMjAxNS8xMC8wNS8yMi8zNy9ibGFuay1wcm9maWxlLXBpY3R1cmUtOTczNDYwXzk2MF83MjAucG5nIiwiY292ZXJfcGhvdG8iOiJodHRwczovL3d3dy5xbWF0Y2h1cC5jb20vaW1hZ2VzL2RlZmF1bHQtY292ZXIuanBnIiwiZ2VuZGVyIjoiIiwiZGF0ZV9vZl9iaXJ0aCI6IiIsImFkZHJlc3MiOiIiLCJwaG9uZV9udW1iZXIiOiIiLCJmYWNlYm9va19saW5rIjoiIiwiaW5zdGFncmFtX2xpbmsiOiIiLCJ0d2l0dGVyX2xpbmsiOiIiLCJvdGhlcl9saW5rIjoiIiwiY3JlYXRlZF9hdCI6IjIwMTktMDQtMDEgMTI6MTM6MDYuNDMxNzU2IiwidXBkYXRlZF9hdCI6IjIwMTktMDQtMDEgMTI6MTM6MDYuNDMxNzY4IiwicG9zdF9jb3VudCI6MCwiam9iIjoiIiwic3RhdHVzIjoiIn0sImZyZXNoIjpmYWxzZSwidHlwZSI6ImFjY2VzcyIsInVzZXJfY2xhaW1zIjp7ImlkIjoxLCJ1c2VybmFtZSI6IkRpbmRhIiwiZW1haWwiOiJkaW5kYUB4eXouY29tIiwiZGlzcGxheV9uYW1lIjoiIiwiaGVhZGxpbmUiOiIiLCJwcm9maWxlX3BpY3R1cmUiOiJodHRwczovL2Nkbi5waXhhYmF5LmNvbS9waG90by8yMDE1LzEwLzA1LzIyLzM3L2JsYW5rLXByb2ZpbGUtcGljdHVyZS05NzM0NjBfOTYwXzcyMC5wbmciLCJjb3Zlcl9waG90byI6Imh0dHBzOi8vd3d3LnFtYXRjaHVwLmNvbS9pbWFnZXMvZGVmYXVsdC1jb3Zlci5qcGciLCJnZW5kZXIiOiIiLCJkYXRlX29mX2JpcnRoIjoiIiwiYWRkcmVzcyI6IiIsInBob25lX251bWJlciI6IiIsImZhY2Vib29rX2xpbmsiOiIiLCJpbnN0YWdyYW1fbGluayI6IiIsInR3aXR0ZXJfbGluayI6IiIsIm90aGVyX2xpbmsiOiIiLCJjcmVhdGVkX2F0IjoiMjAxOS0wNC0wMSAxMjoxMzowNi40MzE3NTYiLCJ1cGRhdGVkX2F0IjoiMjAxOS0wNC0wMSAxMjoxMzowNi40MzE3NjgiLCJwb3N0X2NvdW50IjowLCJqb2IiOiIiLCJzdGF0dXMiOiIifX0.nmw38CpI3rftfEj5LYhOXdO-ESXuhjDRqbtDWJmMqzo";

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

      image: null,
      progressFotoLahan: 0
    };
  }

  onChangePlant = datePlant => this.setState({ datePlant });
  onChangeReady = dateReady => this.setState({ dateReady });

  changeInput = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  saveDetails = () => {
    const {
      deskripsi,
      plant_type,
      datePlant,
      dateReady,
      address,
      city,
      photos
    } = this.state;
    const id = localStorage.getItem("id_farm");
    console.log(id);
    console.log("ready", dateReady);
    console.log("plant", datePlant);
    const data = {
      description: deskripsi,
      plant_type: plant_type,
      planted_at: datePlant.toISOString(),
      ready_at: dateReady.toISOString(),
      address: address,
      city: city,
      photos: photos
    };
    console.log(data);

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
          <label for="plant_type">Jenis tanaman:</label>
          <br />
          <input
            type="text"
            name="plant_type"
            defaultValue=""
            onChange={e => this.changeInput(e)}
          />
          <br />
          <label for="planted_at">Tanggal ditanam:</label>
          <br />
          {/* <DateTimePicker
          onChange={this.onChangePlant}
          value={this.state.datePlant}
          disableClock={true}
        /> */}
          <DatePicker
            selected={this.state.datePlant}
            onChange={this.onChangePlant}
            value={this.state.datePlant}
          />
          <br />
          <label for="ready_at">Perkiraan tanggal panen:</label>
          <br />
          {/* <DateTimePicker className="css-10nd86i"
            onChange={this.onChangeReady}
            value={this.state.dateReady}
            disableClock={true}
            // minDate={new Date()}
        /> */}
          <DatePicker
            selected={this.state.dateReady}
            onChange={this.onChangeReady}
            value={this.state.dateReady}
          />
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
        </form>
      </div>
    );
  }
}

export default connect(
  "",
  actions
)(withRouter(SidebarField));
