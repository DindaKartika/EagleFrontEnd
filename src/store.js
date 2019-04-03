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
    username: "",
    password: "",
    is_login: false,

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
    
    product_state: "home",

    is_register:false,

    email: "",
    email_confirmation: "",
    password_confirmation: "",

    page: 1,
    url: base_url,
    current_username: "",
    current_userid: "",

    respond_offer: "",

    for_transaction_offer_id: 0,
    for_transaction_offer_id: 0,

    // newsfeed start here
    content:"",
    listAllFeed:[]
    // listAllComment:[]

    //news feed end here
};

export const store = createStore(initialState)

// STORE ACTIONS MODULE
export const actions = store => ({
    setField: (state, event) => {
        // console.log("cek respond_offer", store.respond_offer)
        return { [event.target.name]: event.target.value };
    },

    signOut: state => {
        return {is_login: false};
    },
    
    signIn:  async state => {
        const self = this;
        // const urlLogin="http://localhost:8010/proxy/login";
        const urlLogin="http://localhost:5000/login";
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
            if (response.data.hasOwnProperty("token")) {
                // console.log("cek token!", response.data.token)
                localStorage.setItem('token', response.data.token)
                store.setState({
                    is_login: true,
                    token: response.data.token,
                });
                // localStorage.removeItem('token')
                
            } else {
                console.log("Login Gagal");
            }
       })
        .catch(function(error){
            console.log(error);
        })
        console.log("Test store value store", store.is_login)
    },

    register:  async state => {
        const self = this;
        const urlLogin="http://localhost:5000/users/register";
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

    getAllFeed : state => {
        const token = state.token;
        const allFeed = {
            method: "get",
            // url: "http://localhost:8010/proxy/user/product",
            url: "http://localhost:5000/feeds?rp=100",
            // headers: {
            //     'Authorization':'Bearer ' + token
            // }
        };
         axios(allFeed)
        .then(function(response){
            store.setState({listAllFeed: response.data});
            // store.setState({datacart: response.data});
            console.log(response.data);
        })
        .catch(function(error){
            console.log(error);
        })
        },

})