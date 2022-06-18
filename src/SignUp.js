import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap';
function SignUp({ signUp }) {

  const [data, setData] = useState(() => { });


  function handleInputChange({ target: { name, value } }) {
    setData({ ...data, [name]: value })
  }

  function submitForm() {
    signUp(data.username, data.password, data.phone, data.name);

  }


  return (
    <div>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>İsim</Form.Label>
          <Form.Control onChange={handleInputChange} type="text" name="name" placeholder="Tam isminizi giriniz..." />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>E-Mail Adresi</Form.Label>
          <Form.Control onChange={handleInputChange} type="email" name="username" placeholder="Email adresinizi giriniz..." />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Telefon Numarası</Form.Label>
          <Form.Control onChange={handleInputChange} type="text" name="phone" placeholder="Telefon numaranızı giriniz..." />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Parola</Form.Label>
          <Form.Control onChange={handleInputChange} type="password" name="password" placeholder="Parolanızı belirleyin..." />
        </Form.Group>
        <Button onClick={submitForm} variant="primary">
          Kaydet
        </Button>
      </Form>
    </div>
  )
}

export default SignUp