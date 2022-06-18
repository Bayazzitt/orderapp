import React, { useReducer, useState } from 'react'
import TodoInput from './TodoInput';
import TodoTasks from './TodoTasks';
import './home.css';
import ProfilePicture from './ProfilePicture';
import { Button, Container, Row, Col } from 'react-bootstrap';

function greetingOfTheDay(){

 let date=new Date();


 let current_hour_time=date.getHours();
 

 let afternoon_start=12;
 let evening_start=16;
 let night_start=20;

 console.log(current_hour_time,afternoon_start);

 if(current_hour_time<afternoon_start){
   return 'Günaydın';

 }
 else if(current_hour_time>=afternoon_start && current_hour_time<evening_start){
   return 'Tünaydın';
 }
 else if(current_hour_time>=evening_start && current_hour_time<night_start){
   return 'İyi Akşamlar';
 }
 else if(current_hour_time>=night_start){
   return 'İyi Geceler';
 }
 else{
   return 'İyi Günler!';
 }


}




function Home({user:{user},signOut}) {


  const [edit_todo,setEditTodo]=useState(()=>null);

  
  function editTodo(edit_todo){

   setEditTodo(edit_todo);
  }


  return (
    <div style={{padding:'20px'}}>
        <Container>
          <Row>
            <Col><div className="banner-section">
        <div className="profile-picture">
        <ProfilePicture user_id={user.uid} user_name={user.displayName}/>
        </div>
        
        </div></Col>
        
            <Col className='mt-4'><div className="greeting-message">
        <h4>Selam {user.email}, {greetingOfTheDay()}</h4>
        </div>
        <Button className='mt-5' onClick={signOut} variant="danger" >Çıkış Yap</Button>
        </Col>
          </Row>
        <hr/>
        <div>
      <Row>
        <Col> <TodoInput edit_todo={edit_todo} setEditTodo={setEditTodo}/></Col>
        <Col className='mt-5' sm={6}><TodoTasks uid={user?.uid} editTodo={editTodo}/></Col>
      </Row>
        </div>
    </Container>
    </div>
  )
}

export default Home