import React,{useState,useEffect} from 'react';
import {app,storage} from './firebaseConfig'; 
import {getAuth} from 'firebase/auth';
import { FaCameraRetro } from "react-icons/fa";
import {  ref ,uploadBytes,getDownloadURL} from "firebase/storage";
import { Button } from 'react-bootstrap';

function ProfilePicture({user_name,user_id}) {

 const [profile_pic,setProfilePic]=useState(null);

 useEffect(()=>{
    const file_ref=`profile/${user_name}-${user_id}`;
    const storage_ref=ref(storage,file_ref);
    getDownloadURL(storage_ref).then(url=>{
        setProfilePic(url);
    }).catch(error=>{
        alert("Lüten profil resmi yükleyiniz...");
        console.error(error.message);
    });
    


 },[])


 function changeImage({target:{files}}){
    const image_file=files[0];
    const file_reader=new FileReader();  
    file_reader.onloadend=function(){
    const result=file_reader.result;
    setProfilePic(result);
    uploadToStorage(image_file);
    }
   file_reader.readAsDataURL(image_file);

 }

 function uploadToStorage(image_file){
    
    const file_name=`${user_name}-${user_id}`;
    const storage_ref=ref(storage,`profile/${file_name}`);

    uploadBytes(storage_ref,image_file).then(snapshot=>{

    getDownloadURL(snapshot.ref).then(url=>{
        setProfilePic(url);
        alert('Profile resmi yüklendi');
    }).catch(error=>{
        alert("Birşeyler yanlış yükleme linki hatalı...");
        console.error(error.message);
    });
        

    }).catch(error=>{
        alert("Birşeyler yanlış dosya zaten yüklü...");
        console.error(error.message);
    });

 }



  return (
    <div className='profile'>
    <div className='image' style={{
        width:'100px',height:'100px',borderRadius:'50%',border:'2px solid #222'
    }}>
    <img style={{
        width:'100%',height:'100%',borderRadius:'50%',objectFit:'cover'
    }}
    src={profile_pic} />
    </div>
       <input type="file" onChange={changeImage} id="file_input" style={{'display':'none'}}  accept='image/*'/>
      <Button style={{cursor:'pointer'}}>
       <label htmlFor='file_input' style={{cursor:'pointer'}} variant="warning"><FaCameraRetro/>&nbsp;Değiştir</label>   
      </Button>
    </div>
  )
}

export default ProfilePicture