import React, { useEffect, useRef, useState } from 'react';
import TodoCss from './Todo.module.css';
import {toast} from 'react-hot-toast'
import Task from './Task';

const Todo = () => {
  const todoData =  JSON.parse(localStorage.getItem("todo_items"))||[
  {
    todoTask:"Buy Car",complete:false
  }
  ];

  const [task, setTask] = useState();
  const [alltodo, setAllTodo] = useState(todoData);
  const[complete,setComplete]=useState("0")
  const[remaining,setRemaining]=useState("1")
  const[totalTask,setTotalTask]=useState("1");
  const darkMode=useRef();
  const darkModeIcon= useRef();


  function handleForm(e) {
    e.preventDefault();
    if(!task){
      toast.error("Please add Task!"); 
    }
    else{

     let isVerified= alltodo.some((value,index)=>{
        return value.todoTask.toLowerCase()===task.toLowerCase();
      });
      if(isVerified){
        toast.error("Task already Added");
        setTask("");
      }
      else{setAllTodo([...alltodo, { todoTask: task, complete: false }]);
    console.log({ Task: task });}
    toast.success("Task Added succesfully")
      
    }
    
  }

  function handleCheck(id) {
    const copyOFAllTodo = [...alltodo];
    copyOFAllTodo[id].complete = !copyOFAllTodo[id].complete;
    setAllTodo(copyOFAllTodo); 
  }


  function handleDelete(id) {
    const copyOFAllTodo = [...alltodo];
    const deletedValue = copyOFAllTodo.filter((value, index) => {
      return index !== id;
    });
    console.log(deletedValue);
    setAllTodo(deletedValue);
    toast.error("Task deleted successfully")
  }

  function handleUpdate(id){
    const copyOFAllTodo=[...alltodo];
    let oldTask=copyOFAllTodo[id].todoTask;
   let newTask=prompt(`Update Task :-${oldTask}`,oldTask)
   let newObj={todoTask:newTask,complete:false}
   copyOFAllTodo.splice(id,1,newObj);
   setAllTodo(copyOFAllTodo)
   toast.success("Task updated successfully");
  }


  useEffect(()=>{

  const copyOFAllTodo = [...alltodo];
  const completeTasks=copyOFAllTodo.filter((value,index)=>{
      return value.complete;
    });

    const remainingTasks=copyOFAllTodo.filter((value,index)=>{ 
      return !value.complete;
    });
    const totalTask=copyOFAllTodo.filter((value,index)=>{
      return value
    })
     setComplete(completeTasks.length);
    setRemaining(remainingTasks.length);
    setTotalTask(totalTask.length)

    localStorage.setItem("todo_items",JSON.stringify(copyOFAllTodo));
},[alltodo])

function handleDarkMode(){
  const bgColor=darkMode.current.style.backgroundColor;
  if(bgColor === ""||bgColor==="white"){
    darkMode.current.style.backgroundColor='black';
    darkMode.current.style.color="white";
    darkModeIcon.current.className="bi bi-toggle-on";
    toast.success("Dark mode enabled 😎")
  }
  else{

     darkMode.current.style.backgroundColor='white';
    darkMode.current.style.color="black";
     darkModeIcon.current.className="bi bi-toggle-off";
     toast.error("Dark mode disabled 😴")
    
  }
}

function handleClearAll(){
  setAllTodo([]);
}

  return (
    <div ref={darkMode} className={TodoCss.main}>
      <div className={TodoCss.main}>
        <div>
          <h1>Todo Application <i className="bi bi-toggle-off" onClick={handleDarkMode} ref={darkModeIcon}></i></h1>
          <Task remaining={remaining} complete={complete} totalTask={totalTask}/>
          <form onSubmit={handleForm}>
            <input
              type="text"
              name=""
              id=""
              className={TodoCss.input_box}
              value={task || ""}
              onChange={(e) => {
                setTask(e.target.value);
              }}
            />
            <input
              type="submit"
              value="Add Task"
              className={TodoCss.btn}
            />
            <ul>
              {alltodo.length===0?(
                <h5 className='mt-4 text-center'>No Task Added</h5>
              ):alltodo.map((items, index) => ( 
                <li key={index}>
                  <input
                    type="checkbox"
                    checked={items.complete}
                    onClick={() => {
                      handleCheck(index);
                    }}
                  />
                  <span
                    style={{
                      textDecoration: items.complete ? "line-through" : "none"
                    }}
                  >
                    {items.todoTask}
                  </span>
                  <i
                    className="bi bi-trash3-fill text-danger float-end"
                    onClick={() => {
                      handleDelete(index);
                    }}
                  ></i>
                  <i className="bi bi-pencil-square float-end text-success" onClick={()=>{
                    handleUpdate(index)
                  }}></i>
                </li>
              ))}
            </ul>
          </form>
          <button className={TodoCss.btn_clear}onClick={handleClearAll}>Clear All Task</button>
        </div>
      </div>
    </div>
  );
};

export default Todo;
