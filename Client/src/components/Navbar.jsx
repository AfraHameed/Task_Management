import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";


function Navbar(){


    const dispatch = useDispatch();

    const navigate = useNavigate();


    // Get logged user from Redux

    const {user} = useSelector(
        (state)=>state.auth
    );



    const handleLogout = ()=>{


        dispatch(logout());


        toast.success("Logged out successfully");


        navigate("/login");


    };





    return(

        <nav className="bg-white shadow-md px-8 py-4 flex justify-between items-center">


            <h1 className="text-2xl font-bold text-[#01153e]">

                User-Based Task Management Web Application

            </h1>





            <div className="flex items-center gap-5">


                <span className="text-gray-700">

                    Hi, {user?.name || "User"}

                </span>




                <button

                onClick={handleLogout}

                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"

                >

                    Logout

                </button>


            </div>




        </nav>

    )


}


export default Navbar;