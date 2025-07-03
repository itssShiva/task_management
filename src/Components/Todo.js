import React, { useState } from 'react';
import TodoCss from './Todo.module.css';
import {toast} from 'react-hot-toast'

const Todo = () => {
  const todoData = [
  
  ];

  const [task, setTask] = useState();
  const [alltodo, setAllTodo] = useState(todoData);

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
    setTask("");
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
  }

  return (
    <div>
      <div className={TodoCss.main}>
        <div>
          <h1>Todo Application</h1>
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
                  <i class="bi bi-pencil-square float-end text-success" onClick={()=>{
                    handleUpdate(index)
                  }}></i>
                </li>
              ))}
            </ul>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Todo;
