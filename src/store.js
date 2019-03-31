// IMPORT MODULE
import createStore from 'unistore';
import axios from "axios"

const base_url = "http://0.0.0.0:5555/api/public/products"

// ORIGIN
// const url_login = "https://panenin.com/api/public/login"
// const url_register = "https://panenin.com/api/public/register"
// const url_addproduct = "http://anenin.com/proxy/api/public/products"


// LOCAL ENVIRONMENT
// const url_login = "http://localhost:8010/proxy/api/public/login"
// const url_register = "http://localhost:8010/proxy/api/public/register"
// const url_addproduct = "http://localhost:8010/proxy/api/public/products"

// DEPLOY ENVIRONMENT
// const url_login = "https://cors-anywhere.herokuapp.com/https://panenin.com/api/public/login"
// const url_register = "https://cors-anywhere.herokuapp.com/https://panenin.com/api/public/register"
// const url_addproduct = "https://cors-anywhere.herokuapp.com/https://panenin.com/api/public/products"

const token = localStorage.getItem('token');

// SET THE GLOBAL STATE VARIABLES
const initialState = {
    current_id: 0,
    current_email: "",
    current_username: "",
    current_password: "",
    current_date_of_birth: "",
    current_address: "",
    current_created_at: "",
    current_display_fullname: "",
    current_gender: "",
    current_phone: "",
    current_status: "",
    current_updated_at: "",

    token: "",
    test: "",
    auth_state: true,
    username: "",
    password: "",
    is_login: false,
    product_state: "home",

    is_register:false,

    email: "",
    email_confirmation: "",
    password_confirmation: "",

    page: 1,
    url: base_url,
    current_username: "",
    current_userid: "",

    offer_amount: 0,
    offer_price: 0,
    offer_description: "",
    offer_destination: "",

    add_name: "",
    add_category: "",
    add_type: "",
    add_amount: "",
    add_constanta: "",
    add_price: "",
    add_location: "",
    add_description: "",
    add_delivery: "",

    respond_offer: "",

    for_transaction_offer_id: 0,
    for_transaction_offer_id: 0
};

export const store = createStore(initialState)

// STORE ACTIONS MODULE
export const actions = store => ({
    setField: (state, event) => {
        // console.log("cek respond_offer", store.respond_offer)
        return { [event.target.name]: event.target.value };
    },

    signOut: state => {
        return {is_login:false};
    },
    
    signIn:  async state => {
        const self = this;
        const urlLogin="http://localhost:8010/proxy/login";
        // const urlLogin="localhost:5000/login";
        const data = {username:state.username, password:state.password}
        let signIn = {
            method:'post',
            url: urlLogin,
            data: data
        };
        console.log("test fungsi login", data)
        console.log("test isi sign in", signIn)
        await axios(signIn)
        .then(function(response){
            console.log(response.data);
                store.setState({
                    "is_login": true,
                    "token":response.data.token,
                    "username": response.data.data.username,
                    "email": response.data.data.email       
                    });
       })
        .catch(function(error){
            console.log(error);
        })
    },

    register:  async state => {
        const self = this;
        const urlLogin="http://localhost:8010/proxy/users/register";
        // const urlLogin="localhost:5000/login";
        const data = {username:state.username, password:state.password, email:state.email}
        let signIn = {
            method:'post',
            url: urlLogin,
            data: data
        };
        const email1=state.email;
        const email2=state.email_confirmation;

        const password1=state.password;
        const password2=state.password_confirmation;

        if (email1 != email2){ return alert("email dan konfirmasi email tidak sama")}
        else if (password1 != password2){return alert("password dan konfirmasi password tidak sama")}
        else{
            await axios(signIn)
            .then(function(response){
                console.log(response.data);
                    store.setState({
                        "is_register": true,
                        // "token":response.data.token,
                        // "username": response.data.data.username,
                        // "email": response.data.data.email       
                        });
           })
            .catch(function(error){
                console.log(error);
            })
        }
    },

})