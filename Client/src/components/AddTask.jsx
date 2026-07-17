import {useState} from "react";


function AddTask({onAdd}){


const [task,setTask]=useState({

title:"",

description:"",

priority:"medium",

dueDate:""

});





const handleChange=(e)=>{


setTask({

...task,

[e.target.name]:e.target.value

});


};







const submitHandler=(e)=>{


e.preventDefault();


onAdd(task);


setTask({

title:"",

description:"",

priority:"medium",

dueDate:""

});


};







return(


<form

onSubmit={submitHandler}

className="bg-white p-6 rounded-xl shadow mb-8"

>


<h2 className="text-xl font-bold mb-4 text-[#01153e]">

Create Task

</h2>







<input

className="w-full border p-3 rounded mb-3 focus:outline-none focus:ring-2 focus:ring-[#01153e]"

placeholder="Task title"

name="title"

value={task.title}

onChange={handleChange}

/>







<textarea

className="w-full border p-3 rounded mb-3 focus:outline-none focus:ring-2 focus:ring-[#01153e]"

placeholder="Description"

name="description"

value={task.description}

onChange={handleChange}

/>









<select

className="w-full border p-3 rounded mb-3 focus:outline-none focus:ring-2 focus:ring-[#01153e]"

name="priority"

value={task.priority}

onChange={handleChange}

>


<option value="low">

Low

</option>


<option value="medium">

Medium

</option>


<option value="high">

High

</option>


</select>








<input

type="date"

className="w-full border p-3 rounded mb-3 focus:outline-none focus:ring-2 focus:ring-[#01153e]"

name="dueDate"

value={task.dueDate}

onChange={handleChange}

/>









<button

className="bg-[#01153e] hover:bg-[#02205c] text-white px-6 py-3 rounded-lg transition"

>

Add Task

</button>







</form>


)


}


export default AddTask;