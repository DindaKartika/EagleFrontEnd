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
    token: "",

    test: "",

    current_id: 0,
    current_username: "",
    current_email: "",
    current_display_name: "",
    current_headline: "",
    current_profile_picture: "",
    current_cover_photo: "",
    current_gender: "",
    current_date_of_birth: "",
    current_address: "",
    current_phone_number: "",
    current_facebook_link: "",
    current_instagram_link: "",
    current_twitter_link: "",
    current_other_link: "",
    current_created_at: "",
    current_updated_at: "",

    edit_display_name: "",
    edit_headline: "",
    edit_profile_picture: "",
    edit_cover_photo: "",
    edit_gender: "",
    edit_date_of_birth: "",
    edit_address: "",
    edit_phone_number: "",
    edit_job: "",
    edit_facebook_link: "",
    edit_instagram_link: "",
    edit_twitter_link: "",

    token: "",
    test: "",
    auth_state: true,
    current_post_count: "",
    current_job: "",
    current_status: "",
    
    display_name: "",
    headline: "",
    profile_picture: "",
    cover_photo: "",
    gender: "",
    date_of_birth: "",
    address: "",
    phone_number: "",
    job: "",
    facebook_link: "",
    instagram_link: "",
    twitter_link: "",
    

    email: "",
    email_confirmation: "",
    password_confirmation: "",

    page: 1,
    url: base_url,
    current_userid: "",

    respond_offer: "",

    for_transaction_offer_id: 0,

    // newsfeed start here
    content:"",
    listAllFeed: [],
    allComment: [],
    countLike:[],
    // dataLike:[],
    id_userComment:"",
    
    // is_like:false
    // listAllComment:[]
    
    listBookmark:[],

    //profile
    user_id:0,
    //news feed end here

    //axios profile
    listFeed:[],
    listComment:[],

    Farms:[]

};

export const store = createStore(initialState)

// STORE ACTIONS MODULE
export const actions = store => ({
    setField: (state, event) => {
        // console.log("cek respond_offer", store.respond_offer)
        return { [event.target.name]: event.target.value };
    },

    setEditGender: (state, e) => {
        store.setState({ edit_gender: e.target.value });
    },

    // signOut: state => {
    //     return {is_login: false};
    // },
    postLogout: state => {
        localStorage.removeItem('token')
        return { is_login: false };
    },
    
    signIn:  async state => {
        const self = this;
        // const urlLogin="http://localhost:8010/proxy/login";
        const urlLogin="http://172.11.111.53:5000/login";
        // const urlLogin="http://localhost:5000/login";
        // const urlLogin="localhost:5000/login";
        const data = {username:state.username, password:state.password}
        let signIn = {
            method:'post',
            url: urlLogin,
            data: data
        };
        console.log("test fungsi login", data)
        // console.log("test isi sign in", signIn)
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

    editProfile:  async state => {
        const self = this;
        const url="/users/profile/";
        axios({
            method: 'get',
            url: url,
            headers: {
              Authorization: 'Bearer ' + token
            }
        }).then(function(response) {
            // console.log("Get feeds berhasil", response.data)
            self.setState({
                listFeed: response.data
            })
        }).catch(function(error) {
        console.log("Gagal get feeds", error);
        });
    },

    getAllFeed : state => {
        const token = state.token;
        const allFeed = {
            method: "get",
            // url: "http://localhost:8010/proxy/user/product",
            url: "http://localhost:5000/feeds?sort=desc&rp=10000",
            // url: "http://localhost:5000/feeds?rp=10000",
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
    // getAllFeed : state => {
    //     const token = state.token;
    //     const allFeed = {
    //         method: "get",
    //         // url: "http://localhost:8010/proxy/user/product",
    //         url: "http://localhost:5000/feeds?sort=desc&rp=10000",
    //         // url: "http://localhost:5000/feeds?rp=10000",
    //         // headers: {
    //         //     'Authorization':'Bearer ' + token
    //         // }
    //     };
    //      axios(allFeed)
    //     .then(function(response){
    //         // store.setState({listAllFeed: response.data});
    //         // // store.setState({datacart: response.data});
    //         // console.log(response.data);
    //         var feedList = []
    //         // this.state.listComment.map((item, key) => {
    //         //     return <ListComment key={key} data={item}/>
    //         // })
    //         response.data.map((item, key) => {
    //             // return <ListComment key={key} data={item}/>
    //             const url = "http://localhost:5000/comments?id_feed=" + item.id_feed
    //             axios({
    //                 method: 'get',
    //                 url: url
    //             }).then(function(response) {
    //                 // console.log("cek feed id", self.props.id_feed)
    //                 // console.log("Get comment berhasil", response.data)
    //                 // self.setState({
    //                 //     dataComment: response.data
    //                 item.comment = response.data
    //             }).catch(function(error) {
    //             console.log("Gagal get comment", error);
    //             });
    //             feedList.push(item)
    //             // console.log(feedList)
    //         })
    //         store.setState({
    //             listAllFeed: feedList
    //         })
    //     })
    //     .catch(function(error){
    //         console.log(error);
    //     })
    //     // console.log("new Feedlist here", this.feedList)
    // },

    getIdentity : async state => {
        const self = this
        // if (localStorage.getItem("token") === null) {
        //     self.props.history.push("/signin");
        // }
        const token = localStorage.getItem("token")
        console.log("Cekt token setelah login", token)
        await axios({
            method: 'get',
            url: 'http://localhost:5000/users/profile',
            headers: {
              Authorization: 'Bearer ' + token
            }
        }).then(function(response) {
            if (response.data.status === "Success") {
                store.setState({
                    is_login: true,
                    current_id: response.data.data.id,
                    current_username: response.data.data.username,
                    current_email: response.data.data.email,
                    current_display_name: response.data.data.display_name,
                    current_headline: response.data.data.headline,
                    current_profile_picture: response.data.data.profile_picture,
                    current_cover_photo: response.data.data.cover_photo,
                    current_gender: response.data.data.gender,
                    current_date_of_birth: response.data.data.date_of_birth,
                    current_address: response.data.data.address,
                    current_phone_number: response.data.data.phone_number,
                    current_facebook_link: response.data.data.facebook_link,
                    current_instagram_link: response.data.data.instagram_link,
                    current_twitter_link: response.data.data.twitter_link,
                    current_other_link: response.data.data.other_link,
                    current_created_at: response.data.data.created_at,
                    current_updated_at: response.data.data.updated_at,
                    current_post_count: response.data.data.post_count,
                    current_job: response.data.data.job,
                    current_status: response.data.data.state
                })
            } else {
                // self.props.history.replace("/signin");
            }
        }).catch(function(error) {
            // self.props.history.replace("/signin");
        });
    },


    handleDetailProfile:(state, value)=>{
        console.log("ceeeeeeeeeeeeek value id user", value)
        const id = value;
        return{user_id:id};
    },

    // statusUnlike: state => {
    //     localStorage.removeItem('is_like')
    //     return { is_like: false };
    // },

})
