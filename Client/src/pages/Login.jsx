import {useState} from "react";
import {Link,useNavigate} from "react-router-dom";
import API from "../api/axios";
import toast from "react-hot-toast";
import {useDispatch} from "react-redux";
import {loginSuccess} from "../features/auth/authSlice";


function Login(){


const navigate = useNavigate();

const dispatch = useDispatch();



const [formData,setFormData] = useState({

email:"",
password:""

});




const handleChange = (e)=>{


setFormData({

...formData,

[e.target.name]: e.target.value

});


};






const handleSubmit = async(e)=>{


e.preventDefault();


try{


const response = await API.post(

"/auth/login",

formData

);




localStorage.setItem(

"token",

response.data.token

);




dispatch(

loginSuccess({

user:{

name:response.data.name,

email:response.data.email

},

token:response.data.token

})

);




toast.success("Login successful");


navigate("/dashboard");



}catch(error){


toast.error(

error.response?.data?.message ||

"Login failed"

);


}



};






return(


<div className="min-h-screen flex items-center justify-center bg-slate-100">


<div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">


<h1 className="text-3xl font-bold text-center mb-6 text-[#01153e]">

Welcome Back

</h1>




<form

onSubmit={handleSubmit}

className="space-y-4">





<input


className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#01153e]"


placeholder="Email"


name="email"


value={formData.email}


onChange={handleChange}


/>






<input


className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#01153e]"


placeholder="Password"


type="password"


name="password"


value={formData.password}


onChange={handleChange}


/>







<button

className="w-full bg-[#01153e] text-white py-3 rounded-lg hover:bg-[#02205c] transition"

>


Login


</button>





</form>







<p className="text-center mt-5 text-gray-600">


Don't have an account?



<Link


to="/register"


className="text-[#01153e] font-semibold ml-2 hover:underline">


Register


</Link>


</p>





</div>


</div>


)


}



export default Login;