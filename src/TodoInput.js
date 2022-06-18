import React,{useState,useEffect} from 'react';
import {app,database} from './firebaseConfig';
import {set,ref,update} from 'firebase/database';
import {
    getAuth,
    onAuthStateChanged
  } from 'firebase/auth';
  import { Button } from 'react-bootstrap';



function generateUniqueID(num){
    let chars='mnbvcxzasdfghjklqwertpoiuy0987612345';
    let str='';
    for(let i=0;i<chars.length;i++){
        let index=Math.floor(Math.random()*chars.length);
        str+=chars[index];
    }

    return str;

}

function TodoInput({edit_todo,setEditTodo}) {

    const [data,setData]=useState(()=>({complete:false}));

    const [user,setUser]=useState({active:false,user:null});

    const auth=getAuth(app); 

   
// to fetch added tasks
    useEffect(()=>{
        onAuthStateChanged(auth,function(user){
            if(user)
            setUser({active:true,user})
          },error=>{
            alert('Something wen\'t wrong');
            console.error(error);
          });
    },[]);


   // to edit todo 
  useEffect(()=>{

    if(edit_todo!==null){
      for(let key in edit_todo)
      {
        setData({
          ...data,
          ...edit_todo,
          title:edit_todo?.title,
          description:edit_todo?.description,
          stuff_on:edit_todo?.stuff_on
        })
      }
    }

  },[edit_todo])
   



    
    function handleInputChange({target:{name,value}}){
   
      setData({...data,[name]:value})
    }

    async function addStuff(){
          
        try{
            const created_ref=ref(database,'todo/'+generateUniqueID(10));
            await set(created_ref,{...data,uid:user.user?.uid});
            alert('Sipariş Eklendi');

            setData({title:'',description:'',stuff_on:''});
        }
        catch(error){
            alert('Birşeyler hatalı...');
            console.error(error.message);
        }
        

    }

    async function editStuff(edit_todo){
      
      const todo_ref=ref(database,`todo/${edit_todo.todo_id}`);

      await update(todo_ref,{
        ...data
      });
      setData({title:'',description:'',stuff_on:''});
      setEditTodo(null);
      alert('Sipariş Güncellendi');


    }


    
  return (
    <div style={{width:'50%',maxWidth:'300px'}}>
        <h2> Sipariş Oluştur </h2>
        <br></br>
         <div>
          <p>Ürün Adı :</p>
         <input 
         onChange={handleInputChange} 
         type="text" name="title" 
         placeholder='Ürün giriniz...' value={data.title} /><br/>
         <p>Sipariş Adet :</p>
         <select onChange={handleInputChange} name="adet">
          <option ></option>
          <option >1</option>
          <option >2</option>
          <option >3</option>
        </select>
         <p>Ürün Açıklaması :</p>
         <textarea onChange={handleInputChange} 
          name="description" 
          placeholder='Açıklama giriniz...'
          value={data.description}
           /><br/>
         <p>Sipariş Tarihi :</p>
         <input onChange={handleInputChange}  
         type="date" name="stuff_on" 
         placeholder='Stuff perform on'
         value={data.stuff_on}
          /> <br/><br/>
         {
           edit_todo===null?(<Button onClick={addStuff} variant="success">Ürünü Ekle</Button>):(
            <Button onClick={()=>editStuff(edit_todo)} variant="warning">Ürünü Güncelle</Button>
           )
         } 
         </div>
    </div>
  )
}

export default TodoInput;