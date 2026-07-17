import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api/axios";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../features/auth/authSlice";


function Register() {


    const navigate = useNavigate();

    const dispatch = useDispatch();



    const [formData, setFormData] = useState({

        name: "",

        email: "",

        password: ""

    });





    // Update input values

    const handleChange = (e) => {


        setFormData({

            ...formData,

            [e.target.name]: e.target.value

        });


    };








    // Submit register form

    const handleSubmit = async (e) => {


        e.preventDefault();



        try {


            const response = await API.post(

                "/auth/register",

                formData

            );






            // Save user and token in Redux + Local Storage

            dispatch(

                loginSuccess({

                    user: {

                        name: response.data.name,

                        email: response.data.email

                    },

                    token: response.data.token

                })

            );






            toast.success(

                "Account created successfully"

            );



            navigate("/dashboard");






        } catch (error) {


            toast.error(

                error.response?.data?.message ||

                "Registration failed"

            );


        }


    };








    return (


        <div className="min-h-screen flex items-center justify-center bg-slate-100">



            <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">



                <h1 className="text-3xl font-bold text-center mb-6 text-[#01153e]">

                    Create Account

                </h1>








                <form

                    onSubmit={handleSubmit}

                    className="space-y-4"

                >







                    <input

                        className="w-full border p-3 rounded-lg focus:outline-[#01153e]"

                        placeholder="Name"

                        name="name"

                        value={formData.name}

                        onChange={handleChange}

                        required

                    />







                    <input

                        className="w-full border p-3 rounded-lg focus:outline-[#01153e]"

                        placeholder="Email"

                        type="email"

                        name="email"

                        value={formData.email}

                        onChange={handleChange}

                        required

                    />







                    <input

                        className="w-full border p-3 rounded-lg focus:outline-[#01153e]"

                        placeholder="Password"

                        type="password"

                        name="password"

                        value={formData.password}

                        onChange={handleChange}

                        required

                    />









                    <button

                        className="w-full bg-[#01153e] text-white py-3 rounded-lg hover:bg-[#02205c] transition"

                    >

                        Register

                    </button>








                </form>









                <p className="text-center mt-5 text-gray-600">


                    Already have an account?




                    <Link

                        className="text-[#01153e] ml-2 font-medium hover:underline"

                        to="/login"

                    >

                        Login

                    </Link>


                </p>








            </div>





        </div>


    );


}



export default Register;