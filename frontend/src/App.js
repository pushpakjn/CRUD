import React,{useEffect, useState} from 'react';
import axios from 'axios'
import List from "./components/List";
import { baseURL } from './utils/constant';

function App() {
  const [input,setInput] = useState('')
  const [tasks,setTasks] = useState([])
  const [updateUI,setUpdateUI] = useState(false)
  const [updateid,setUpdateid] = useState(null)
  useEffect(()=>{
    axios.get(`${baseURL}/get`)
    .then(res => {
      console.log(res.data);
      setTasks(res.data)
    });
  },[updateUI])

  const addTask = () => {
    axios.post(`${baseURL}/save`,{task:input})
    .then(res => {
      console.log(res.data);
      setInput('')
      setUpdateUI(prev => !prev)  
    })
  }

  const updateMode = (id,text) => {
    console.log(id,text);
    setInput(text);
    setUpdateid(id);
  }
  const updatTask = () => {
    axios.put(`${baseURL}/update/${updateid}`,{task:input})
    .then(res => {
      console.log(res.data);
      setInput('')
      setUpdateid(null)
      setUpdateUI(prev => !prev)
    })
  }

  return (
    <main>
      <h1 className="title">CRUD Operation</h1>
      <div className="input_holder">
        <input type="text" placeholder="Enter your task" value={input} 
        onChange={(e)=>setInput(e.target.value)} />
        <button type="submit" onClick={updateid ? updatTask : addTask}>
          {updateid ? "Update Task":"Add Task"}
          </button>
      </div>
      <ul>
        {tasks.map((task)=>(
          <List key={task._id} id={task._id} task={task.task} setUpdateUI={setUpdateUI} 
          updateMode={updateMode} />
        ))}
      </ul>
    </main>
  );
}

export default App;
