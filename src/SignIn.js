import React,{useState} from 'react'
import { Button, Form } from 'react-bootstrap';

function SignIn({signIn}) {
    const [data,setData]=useState(()=>{});


    function handleInputChange({target:{name,value}}){
      setData({...data,[name]:value})
    }
    
    function submitForm(){
    signIn(data.username,data.password,data.phoneNumber);
    
    }
    
    
      return (
        <div>
        <Form>
  <Form.Group className="mb-3" controlId="formBasicEmail">
    <Form.Label>Email adresi</Form.Label>
    <Form.Control onChange={handleInputChange} type="email"  name="username"  />
  </Form.Group>

  <Form.Group className="mb-3" controlId="formBasicPassword">
    <Form.Label>Parola</Form.Label>
    <Form.Control onChange={handleInputChange} type="password" name="password"  />
  </Form.Group>
  <Button onClick={submitForm} variant="primary">
    Giriş
  </Button>
</Form>
        </div>
        
      )
}

export default SignIn