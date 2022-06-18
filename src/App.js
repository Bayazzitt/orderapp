import { app } from './firebaseConfig';
import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  createUserWithEmailAndPassword
} from 'firebase/auth';
import { useEffect, useState } from 'react';
import SignIn from './SignIn';
import SignUp from './SignUp';
import Home from './Home';
import "./App.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Container } from 'react-bootstrap';


function App() {

  const auth = getAuth(app);

  const [component, switchComponent] = useState(() => 'signin');
  const [user, setUser] = useState(() => ({ active: false, user: null }));

  useEffect(() => {
    onAuthStateChanged(auth, function (user) {

      if (user)
        setUser({ active: true, user })
    }, error => {
      alert('Something wen\'t wrong');
      console.error(error);
    });
  }, []);




  async function signIn(username, password) {
    try {
      const credential = await signInWithEmailAndPassword(auth, username, password);
      setUser({ active: true, user: credential.user });

    }
    catch (error) {
      console.error(error.message);
    }
  }

  async function signUp(username, password, phoneNumber, displayName) {

    try {
      const credential = await createUserWithEmailAndPassword(auth, username, password);
      await updateProfile(auth.currentUser, {
        phoneNumber,
        displayName
      });

      alert(`Hesap ${credential.user.email} adına oluşturuldu...`);
      setUser({ active: true, user: credential.user });

    }
    catch (error) {
      console.error(error.message);
    }

  }

  async function logOut() {
    await signOut(auth)
    setUser({ active: false, user: null });
  }

  if (user.active === true) {
    return (
      <Home user={user} signOut={logOut} />
    )
  }

  return (
      <div>
        <Container>

    <div style={{ padding: '10px' }}>
      <div>
        <Button onClick={() => switchComponent('signin')} variant="primary" >Giriş Yap</Button>&nbsp;
        <Button onClick={() => switchComponent('signup')} variant="primary" >Kayıt Ol</Button>
      </div><br/>
      {
        component === 'signin' ? (<SignIn signIn={signIn} />) : (<SignUp signUp={signUp} />)
      }
    </div>
      </Container>
      </div>
  );
}

export default App;
