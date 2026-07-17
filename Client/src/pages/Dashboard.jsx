import {useEffect, useState} from "react";

import {
useDispatch,
useSelector
} from "react-redux";

import API from "../api/axios";

import Navbar from "../components/Navbar";

import TaskCard from "../components/TaskCard";

import AddTask from "../components/AddTask";

import {
setTasks,
addTask,
deleteTask,
updateTask
}
from "../features/tasks/taskSlice";

import toast from "react-hot-toast";



function Dashboard(){


const dispatch = useDispatch();


const {tasks} = useSelector(
(state)=>state.tasks
);



// Search Filter Sort

const [search,setSearch] = useState("");

const [filter,setFilter] = useState("all");

const [sort,setSort] = useState("");



// Edit modal state

const [editingTask,setEditingTask] = useState(null);





// Get tasks

const getTasks = async()=>{

try{

const response = await API.get("/tasks");

dispatch(
setTasks(response.data.tasks)
);


}catch(error){

toast.error("Unable to load tasks");

}

};



useEffect(()=>{

getTasks();

},[]);





// Create task

const createTask = async(data)=>{

try{

const response = await API.post(
"/tasks",
data
);


dispatch(
addTask(response.data.task)
);


toast.success("Task created");


}catch(error){

toast.error("Task creation failed");

}

};





// Delete task

const removeTask = async(id)=>{


try{


await API.delete(
`/tasks/${id}`
);


dispatch(
deleteTask(id)
);


toast.success("Task deleted");


}catch(error){

toast.error("Delete failed");

}


};







// Change status

const changeStatus = async(task)=>{


try{


const newStatus =
task.status==="pending"
?
"completed"
:
"pending";



const response = await API.put(

`/tasks/${task._id}`,

{
status:newStatus
}

);



dispatch(
updateTask(response.data.task)
);


toast.success("Status updated");


}catch(error){

toast.error("Status update failed");

}


};







// Open edit modal

const editTask = (task)=>{


setEditingTask({

...task,

dueDate: task.dueDate
?
task.dueDate.substring(0,10)
:
""

});


};








// Save edited task

const saveEdit = async()=>{


try{


const response = await API.put(

`/tasks/${editingTask._id}`,

{

title:editingTask.title,

description:editingTask.description,

priority:editingTask.priority,

status:editingTask.status,

dueDate:editingTask.dueDate

}

);



dispatch(

updateTask(response.data.task)

);


toast.success("Task updated");


setEditingTask(null);



}catch(error){


toast.error("Update failed");


}


};









// Dashboard counts

const totalTasks = tasks.length;


const completedTasks = tasks.filter(

task=>task.status==="completed"

).length;



const pendingTasks = tasks.filter(

task=>task.status==="pending"

).length;







// Search Filter

let filteredTasks = tasks.filter((task)=>{


const matchesSearch = task.title

.toLowerCase()

.includes(search.toLowerCase());



const matchesFilter =

filter==="all"

?

true

:

task.status===filter;



return matchesSearch && matchesFilter;


});






// Sort

if(sort==="priority"){


filteredTasks.sort((a,b)=>

a.priority.localeCompare(b.priority)

);


}



if(sort==="date"){


filteredTasks.sort((a,b)=>

new Date(a.dueDate)-new Date(b.dueDate)

);


}








return(


<div className="min-h-screen bg-slate-100">


<Navbar/>





<div className="p-8">





<h1 className="text-4xl font-bold text-[#01153e]">

Dashboard

</h1>


<p className="text-gray-600 mt-2">

Manage your daily tasks

</p>







{/* Statistics */}


<div className="grid md:grid-cols-3 gap-6 mt-8">


<div className="bg-white p-6 rounded-xl shadow">

<h2 className="text-xl font-semibold">
Total Tasks
</h2>

<p className="text-4xl font-bold text-[#01153e] mt-3">

{totalTasks}

</p>

</div>





<div className="bg-white p-6 rounded-xl shadow">

<h2 className="text-xl font-semibold">
Completed
</h2>

<p className="text-4xl font-bold text-green-600 mt-3">

{completedTasks}

</p>

</div>





<div className="bg-white p-6 rounded-xl shadow">

<h2 className="text-xl font-semibold">
Pending
</h2>

<p className="text-4xl font-bold text-yellow-500 mt-3">

{pendingTasks}

</p>

</div>


</div>







<div className="mt-10">

<AddTask

onAdd={createTask}

/>

</div>







{/* Search Filter */}


<div className="bg-white p-5 rounded-xl shadow mt-8 mb-8">


<input

className="w-full border p-3 rounded-lg mb-4"

placeholder="Search tasks..."

value={search}

onChange={(e)=>setSearch(e.target.value)}

/>




<div className="flex flex-wrap gap-3">



<button

onClick={()=>setFilter("all")}

className="px-4 py-2 bg-[#01153e] text-white rounded-lg"

>

All

</button>


<button

onClick={()=>setFilter("completed")}

className="px-4 py-2 bg-slate-600 hover:bg-slate-700 text-white rounded-lg transition"

>

Completed

</button>





<button

onClick={()=>setFilter("pending")}

className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition"

>

Pending

</button>



<select

className="border px-4 py-2 rounded-lg"

onChange={(e)=>setSort(e.target.value)}

>

<option value="">
Sort By
</option>


<option value="priority">
Priority
</option>


<option value="date">
Due Date
</option>


</select>



</div>


</div>








<h2 className="text-2xl font-bold text-[#01153e] mb-5">

My Tasks

</h2>






<div className="grid md:grid-cols-2 gap-6">


{

filteredTasks.map((task)=>(


<TaskCard

key={task._id}

task={task}

onDelete={removeTask}

onStatusChange={changeStatus}

onEdit={editTask}

/>


))

}


</div>







</div>









{/* EDIT MODAL */}


{

editingTask && (


<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">


<div className="bg-white rounded-2xl p-8 w-full max-w-lg">


<h2 className="text-2xl font-bold text-[#01153e] mb-5">

Edit Task

</h2>




<input

className="w-full border p-3 rounded-lg mb-4"

value={editingTask.title}

onChange={(e)=>

setEditingTask({

...editingTask,

title:e.target.value

})

}

/>





<textarea

className="w-full border p-3 rounded-lg mb-4"

rows="4"

value={editingTask.description}

onChange={(e)=>

setEditingTask({

...editingTask,

description:e.target.value

})

}

/>






<select

className="w-full border p-3 rounded-lg mb-4"

value={editingTask.priority}

onChange={(e)=>

setEditingTask({

...editingTask,

priority:e.target.value

})

}

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







<select

className="w-full border p-3 rounded-lg mb-4"

value={editingTask.status}

onChange={(e)=>

setEditingTask({

...editingTask,

status:e.target.value

})

}

>


<option value="pending">
Pending
</option>


<option value="completed">
Completed
</option>


</select>







<input

type="date"

className="w-full border p-3 rounded-lg mb-6"

value={editingTask.dueDate}

onChange={(e)=>

setEditingTask({

...editingTask,

dueDate:e.target.value

})

}

/>







<div className="flex gap-3">


<button

onClick={saveEdit}

className="bg-[#01153e] text-white px-5 py-2 rounded-lg"

>

Save Changes

</button>




<button

onClick={()=>setEditingTask(null)}

className="bg-gray-400 text-white px-5 py-2 rounded-lg"

>

Cancel

</button>


</div>




</div>


</div>


)


}



</div>


)


}


export default Dashboard;