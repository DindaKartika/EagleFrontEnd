import createStore from "unistore";
import axios from 'axios';

const initState = {
    email:"",
    is_login:false,
    username:"",
    password:"",
    token:""

}


export const store = createStore(initState)
export const actions = store => ({
    changeInput: (state, event)=> {
        return{[event.target.name]: event.target.value};
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
    // handleClick:(state, value)=>{
    //     // e.preventDefault();
    //     console.log("event",value)
    //     const id = value;
    //     return{productid : id};
    //     // this.props.history.push("/productdetail");
    // },


    // rmCartClick:(state, value)=>{
    //     // e.preventDefault();
    //     console.log("event",value)
    //     const cart_id = value;
    //     return{cartid : cart_id};
    //     // this.props.history.push("/productdetail");
    // },
     
    });