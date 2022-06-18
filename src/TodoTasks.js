import React,{useEffect,useState} from 'react';
import {database} from './firebaseConfig';
import {ref,onValue,remove} from 'firebase/database';
import { FaTrash,FaPen,FaStopwatch} from 'react-icons/fa';
import EventModal from './EventModal';
import { Button } from 'react-bootstrap';


function TodoTasks({uid,editTodo}) {

const [todos,setTodos]=useState([]);   
const [show_event_counter,setShowEventCounter]=useState(false);
const [event_counter_date,setEventCounterDate]=useState(null); 
const [title,setEventTitle]=useState(null); 

useEffect(()=>{

    const todo_ref=ref(database,'todo/');

    onValue(todo_ref,snapshot=>{

        const data=snapshot.val();
        let todos=[];

        for(let key in data){
            
            let val=data[key];
            todos.push({
                ...val,
                todo_id:key
            })
        }

        todos=todos.filter(todo=>todo.uid===uid);
        


        setTodos(todos)

    });


},[uid]);

 function deleteStuff(id){
    const todo_ref=ref(database,'todo/'+id);
    remove(todo_ref);
    
    let filter_todos=todos.filter(todo=>todo.todo_id!==id);
    setTodos(filter_todos);

}

function showRemainingTimes(event_date,title){
setShowEventCounter(true);
setEventCounterDate(event_date);
setEventTitle(title);
}


  return (
    <div style={{width:'50%',maxWidth:'300px'}}>
        {
            todos.length>0 ? (
                todos.map(todo=>(
                 <details key={todo.todo_id} style={{margin:'10px 0'}}>
                  <summary>Ürün : {todo.title}</summary>
                 <span style={{fontSize:'0.9rem'}}><i>Sipariş Tarihi : {new Date(todo.stuff_on).toLocaleDateString()}</i></span>
                  <p> Adet : {todo.adet}</p>
                  <p> Açıklama : {todo.description}</p>
                  <div>
                      <Button className='mt-2' onClick={()=>deleteStuff(todo.todo_id)} variant="danger"  ><FaTrash/> Sil</Button>&nbsp;&nbsp; 
                      <Button className='mt-2'  value={todo.todo_id} onClick={()=>editTodo({...todo})}variant="warning"><FaPen/> Güncelle</Button>&nbsp;&nbsp;
                  </div>
                 
                 </details>
                ))):(
                    <p>Sipariş Yok</p>
                )
            
        }
        {
            show_event_counter===true ? <EventModal event_date={event_counter_date} setShowEventCounter={setShowEventCounter} title={title} />:''
        }
      
    </div>
  )
}

export default TodoTasks