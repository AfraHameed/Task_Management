import { createSlice } from "@reduxjs/toolkit";


// Get saved user from browser storage
const savedUser = localStorage.getItem("user");



const initialState = {


    // Restore user after refresh

    user: savedUser 
        ? JSON.parse(savedUser) 
        : null,


    // Restore JWT token after refresh

    token: localStorage.getItem("token"),


    isLoading:false,

    isError:false

};





const authSlice = createSlice({

    name:"auth",


    initialState,



    reducers:{



        // Store user details and token after login

        loginSuccess:(state,action)=>{


            state.user = action.payload.user;


            state.token = action.payload.token;



            // Save data in browser

            localStorage.setItem(

                "token",

                action.payload.token

            );


            localStorage.setItem(

                "user",

                JSON.stringify(action.payload.user)

            );


        },





        // Remove user when logout

        logout:(state)=>{


            state.user = null;


            state.token = null;



            localStorage.removeItem("token");


            localStorage.removeItem("user");


        }



    }



});






export const {

    loginSuccess,

    logout


}=authSlice.actions;



export default authSlice.reducer;