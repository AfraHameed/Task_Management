function TaskCard({
    task,
    onDelete,
    onStatusChange,
    onEdit
}) {


return (

<div className="bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-xl transition duration-300">


{/* Header */}

<div className="flex justify-between items-start gap-3">


<h2 className="text-xl font-bold text-[#01153e]">

{task.title}

</h2>



<span

className={`px-3 py-1 rounded-full text-sm font-medium capitalize

${
task.status === "completed"

?

"bg-green-100 text-green-700"

:

"bg-yellow-100 text-yellow-700"

}

`}

>

{task.status}

</span>



</div>







{/* Description */}

<p className="text-gray-600 mt-4">

{task.description}

</p>







{/* Priority */}

<p className="mt-4 text-sm text-gray-600">


Priority:


<span

className={`ml-2 font-semibold capitalize

${
task.priority==="high"

?

"text-red-500"

:

task.priority==="medium"

?

"text-orange-500"

:

"text-green-600"

}

`}

>

{task.priority}

</span>


</p>









{/* Due Date */}

{

task.dueDate && (

<p className="mt-3 text-sm text-gray-600">


Due Date:


<span className="ml-2 font-semibold text-[#01153e]">

{

new Date(task.dueDate)

.toLocaleDateString()

}

</span>


</p>

)

}









{/* Buttons */}

<div className="flex flex-wrap gap-3 mt-6">





{/* Edit */}

<button

onClick={()=>onEdit(task)}

className="bg-[#01153e] text-white px-4 py-2 rounded-lg hover:bg-[#02205c] transition"

>

Edit

</button>









{/* Status */}

<button

onClick={()=>onStatusChange(task)}

className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition font-medium"

>

{

task.status==="completed"

?

"Mark as Pending"

:

"Mark as Completed"

}


</button>









{/* Delete */}

<button

onClick={()=>onDelete(task._id)}

className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"

>

Delete

</button>




</div>



</div>


)

}


export default TaskCard;