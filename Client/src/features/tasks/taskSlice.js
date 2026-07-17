import { createSlice } from "@reduxjs/toolkit";


const initialState = {

    tasks: [],

    isLoading:false,

    isError:false

};



const taskSlice = createSlice({

    name:"tasks",

    initialState,


    reducers:{


        // Store tasks from backend

        setTasks:(state,action)=>{

            state.tasks = action.payload;

        },



        // Add new task

        addTask:(state,action)=>{

            state.tasks.push(action.payload);

        },



        // Delete task

        deleteTask:(state,action)=>{

            state.tasks =
            state.tasks.filter(
                task=>task._id !== action.payload
            );

        },



        // Update task

        updateTask:(state,action)=>{

            const index =
            state.tasks.findIndex(

                task=>task._id === action.payload._id

            );


            if(index !== -1){

                state.tasks[index] =
                action.payload;

            }

        }


    }


});



export const {

    setTasks,

    addTask,

    deleteTask,

    updateTask


}=taskSlice.actions;



export default taskSlice.reducer;