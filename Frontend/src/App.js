
import './index.css';
import {useEffect, useState} from "react"



const API_BASE="http://localhost:4500";

function App() {
 
  const [todos,setTodos]=useState([])
  
  const [popupactive,setPopupactive]=useState(false)
  const [newTodo,setnewTodo]=useState("")


  useEffect(()=>{
     getTodos();
  //  console.log(todos)
  
},[todos])
  
  const getTodos=()=>{
       fetch("http://localhost:4500/todos")
        .then((res)=>res.json())
        .then((res)=>setTodos(res))
         .catch((err)=>console.log(err))
  }


  



const completeTodo=async(id)=>{
  console.log(id)
  const result=await fetch(`http://localhost:4500/update/${id}`)
   .then((res)=>res.json())

    setTodos(todos=>todos.map(todo=>{
      if(todo._id === result._id )
      {
         todo.isComplete = result.isComplete
      }
      return todo
    }))  
   


}

const deleteTodo=async(id)=>{

  const data = await fetch(`http://localhost:4500/delete/${id}`,{
    method:"DELETE"
  })
  .then((res)=>res.json())

  setTodos(todos=>todos.filter(todo=> todo._id !== data._id ))
  
  console.log("working")
}



// const addTodo=async()=>{
//   const data=await fetch("http://localhost:4500/addtodos",{
//     method:"POST",
//     headers:{
//       "Content-Type":"appliation/json"
//     },
//     body:JSON.stringify({
//       isComplete:false,
      
//     })

//   }).then((res)=>res.json())
//   .then((res)=>console.log(res))

//  setTodos([...todos,data])
//  setPopupactive(false)
//  setnewTodo("")
// }


const addTodo = async () => {
  const data = await fetch("http://localhost:4500/addtodos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json" 
    },
    body: JSON.stringify({
      task: newTodo 
    })
  }).then(res => res.json());

  setTodos([...todos, data]);

  setPopupactive(false);
  setnewTodo("");
}



  return (
    <div className="App">
      <h1> welome 🤗</h1>      
      <h1> your tasks 🫠 </h1>

       
      <div className="todos">
				{todos.length > 0 ? todos.map(todo => (
					<div className={
						"todo" + (todo.isComplete ? " is-complete" : "")
					} key={todo._id} >
						<div className="checkbox" onClick={() => completeTodo(todo._id)} ></div>

						<div className="text" onClick={() => completeTodo(todo._id)} >{todo.task}   </div>
            <span className="span" onClick={() => completeTodo(todo._id)} >  {todo.isComplete ? "👍🏼" : "🤔"}  </span>
             <div>
						<div className="delete-todo"  onClick={() => deleteTodo(todo._id)}>x</div>
					  </div>
          </div>
				)) : (
					<h2 className="notask" >You currently have no tasks..😄 </h2>
				)}
			</div>
      
      <div className="addPopup" onClick={()=>setPopupactive(true)} > + </div>
      {
        popupactive ? (
           <div className="popup" >
                <div className="closePopup" onClick={()=>setPopupactive(false)} > X </div>
                <div className="content" > 
                  <h3>ADD TASK</h3>
                    <input 
                     type="text"
                     className="add-todo-input"
                      onChange={(e)=>setnewTodo(e.target.value)}
                      value={newTodo}
                    />

                    <div className="button" onClick={addTodo} > create task </div>

                 </div>

           </div>  
        ):("")
      }
       
    </div>
    
  );
}

export default App;
