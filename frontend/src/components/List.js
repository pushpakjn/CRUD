import axios from 'axios'
import React from 'react'
import {BiEditAlt,BiTrash} from 'react-icons/bi'
import { baseURL } from '../utils/constant'

const List = ({id,task,setUpdateUI,updateMode}) => {

    const deleteTask = () => {
        axios.delete(`${baseURL}/delete/${id}`)
        .then(res => {
            console.log(res.data);
            setUpdateUI(prev => !prev)
        }) 
    }


  return (
    <li>
        {task}
        <div className='icon-holder'>
            <BiEditAlt className='icon' onClick={()=>updateMode(id,task)}/>
            <BiTrash className='icon' onClick={deleteTask}/>
        </div>
    </li>
  )
}

export default List